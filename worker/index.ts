export type Health = 'operational' | 'degraded' | 'unknown';
export type ServiceCheck = {
  id: 'website' | 'documentation';
  name: string;
  status: Health;
  checked_at: string;
  response_time_ms: number;
};
export type PublicStatusReport = {
  scope: 'public-web';
  status: Health;
  checked_at: string;
  services: ServiceCheck[];
};

const probeTimeout = 5000;

async function checkService(id: ServiceCheck['id'], name: string, run: (signal: AbortSignal) => Promise<Response>): Promise<ServiceCheck> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), probeTimeout);
  let status: Health = 'unknown';
  try {
    const response = await run(controller.signal);
    status = response.ok ? 'operational' : 'degraded';
    await response.body?.cancel();
  } catch {
    // A timeout or unreachable probe cannot confirm the service's availability.
  } finally {
    clearTimeout(timer);
  }
  return { id, name, status, checked_at: new Date().toISOString(), response_time_ms: Date.now() - started };
}

export async function collectStatus(assets: Pick<Env['ASSETS'], 'fetch'>, fetchPublic: typeof fetch = fetch): Promise<PublicStatusReport> {
  const services = await Promise.all([
    checkService('website', 'Website delivery', signal => assets.fetch(new Request('https://amlok.io/', { method: 'HEAD', signal }))),
    checkService('documentation', 'Documentation', signal => fetchPublic('https://docs.amlok.io/', { method: 'HEAD', redirect: 'follow', signal })),
  ]);
  const status: Health = services.some(service => service.status === 'degraded') ? 'degraded' : services.some(service => service.status === 'unknown') ? 'unknown' : 'operational';
  return { scope: 'public-web', status, checked_at: new Date().toISOString(), services };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/status' && url.pathname !== '/api/status/') return env.ASSETS.fetch(request);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    // One cache key per host, independent of caller query strings. Only fixed public
    // targets are probed; no credentials, caller-supplied hosts, or customer data.
    const key = new Request(new URL('/api/status', url));
    const cache = await caches.open('amlok-public-status-v1');
    const cached = await cache.match(key);
    if (cached) return request.method === 'HEAD' ? new Response(null, cached) : cached;
    const report = await collectStatus(env.ASSETS);
    const response = Response.json(report, { headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=60',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
    } });
    ctx.waitUntil(cache.put(key, response.clone()).catch(() => console.warn('Public status cache write failed')));
    return request.method === 'HEAD' ? new Response(null, response) : response;
  },
} satisfies ExportedHandler<Env>;
