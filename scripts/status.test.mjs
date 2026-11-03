import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker, { collectStatus } from '../worker/index.ts';
import { currentPublicHealth, currentServiceHealth, isPublicStatusReport } from '../src/lib/public-status.ts';

const assets = { fetch: async () => new Response(null, { status: 200 }) };
const ok = async () => new Response(null, { status: 200 });

test('reports only the two fixed public surfaces and keeps caller input out of probes', async () => {
  const requests = [];
  const report = await collectStatus({ fetch: async request => { requests.push([request.url, request.method]); return ok(); } }, async (url, options) => { requests.push([url, options.method]); return ok(); });
  assert.deepEqual(requests, [['https://amlok.io/', 'HEAD'], ['https://docs.amlok.io/', 'HEAD']]);
  assert.equal(report.status, 'operational');
  assert.equal(report.scope, 'public-web');
  assert.deepEqual(report.services.map(service => service.id), ['website', 'documentation']);
  assert.ok(isPublicStatusReport(report));
});

test('HTTP failures degrade availability; unreachable probes remain unknown', async () => {
  const degraded = await collectStatus(assets, async () => new Response(null, { status: 503 }));
  assert.equal(degraded.status, 'degraded');
  const unknown = await collectStatus(assets, async () => { throw new TypeError('unreachable'); });
  assert.equal(unknown.status, 'unknown');
  assert.equal(unknown.services[0].status, 'operational');
  assert.equal(currentServiceHealth(unknown.services[0], unknown, false, Date.now()), 'operational');
  assert.equal(currentServiceHealth(unknown.services[1], unknown, false, Date.now()), 'unknown');
});

test('a stalled external probe is bounded and cannot appear healthy', async () => {
  const report = await collectStatus(assets, (_, options) => new Promise((resolve, reject) => options.signal.addEventListener('abort', () => reject(new Error('timeout')), { once: true })));
  assert.equal(report.status, 'unknown');
});

test('a failed refresh, stale observation, or future timestamp cannot show operational', async () => {
  const report = await collectStatus(assets, ok);
  const now = Date.now();
  assert.equal(currentPublicHealth(report, false, now), 'operational');
  assert.equal(currentPublicHealth(report, true, now), 'unknown');
  assert.equal(currentPublicHealth(report, false, now + 121000), 'unknown');
  assert.equal(currentPublicHealth(report, false, now - 61000), 'unknown');
  report.services[0].checked_at = new Date(now - 121000).toISOString();
  assert.equal(currentPublicHealth(report, false, now), 'unknown');
});

test('rejects incomplete and malformed telemetry', async () => {
  const report = await collectStatus(assets, ok);
  assert.equal(isPublicStatusReport({ ...report, scope: 'all-products' }), false);
  assert.equal(isPublicStatusReport({ ...report, checked_at: 'invalid' }), false);
  assert.equal(isPublicStatusReport({ ...report, services: [] }), false);
  assert.equal(isPublicStatusReport({ ...report, services: [report.services[0], report.services[0]] }), false);
  assert.equal(isPublicStatusReport({ ...report, services: [{ ...report.services[0], status: 'green' }, report.services[1]] }), false);
});

test('worker only allows GET and HEAD for status and delegates ordinary pages to assets', async () => {
  const response = await worker.fetch(new Request('https://amlok.io/api/status', { method: 'POST' }), { ASSETS: assets }, {});
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('Allow'), 'GET, HEAD');
  let delegated;
  await worker.fetch(new Request('https://amlok.io/research'), { ASSETS: { fetch: request => { delegated = request.url; return ok(); } } }, {});
  assert.equal(delegated, 'https://amlok.io/research');
});

test('caches GET reports under a query-free key and serves HEAD without a body', async context => {
  let stored;
  const keys = [];
  const cache = {
    match: async key => { keys.push(key.url); return stored?.clone(); },
    put: async (key, response) => { keys.push(key.url); stored = response; },
  };
  context.mock.method(globalThis, 'fetch', ok);
  const originalCache = Object.getOwnPropertyDescriptor(globalThis, 'caches');
  Object.defineProperty(globalThis, 'caches', { configurable: true, value: { open: async () => cache } });
  context.after(() => { if (originalCache) Object.defineProperty(globalThis, 'caches', originalCache); else delete globalThis.caches; });
  const pending = [];
  const ctx = { waitUntil: promise => pending.push(promise) };
  const response = await worker.fetch(new Request('https://amlok.io/api/status?target=https://example.com'), { ASSETS: assets }, ctx);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex');
  assert.match(response.headers.get('Cache-Control'), /s-maxage=60/);
  assert.equal((await response.json()).scope, 'public-web');
  await Promise.all(pending);
  const head = await worker.fetch(new Request('https://amlok.io/api/status', { method: 'HEAD' }), { ASSETS: assets }, ctx);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.ok(keys.every(key => key === 'https://amlok.io/api/status'));
});
