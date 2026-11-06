import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculateProjection } from '../src/lib/case-projection-math.ts';
import { buildProjectionExport } from './case-study-projections.mjs';

test('count projections preserve population and distinguish relative gain from percentage points', () => {
  const result = calculateProjection({ label: 'Coverage', baseline: 70, amlok: 85, unit: '%' }, { mode: 'count', denominator: 1000 });
  assert.equal(result.baseline, 700);
  assert.equal(result.projected, 850);
  assert.equal(result.change, 150);
  assert.equal(result.rateChange, 15);
  assert.ok(Math.abs(result.relativeChange - 21.4285714286) < 1e-8);
});

test('normalized AML burden is an index, not a count, cost, or time estimate', () => {
  const metric = { label: 'AML burden', baseline: 100, amlok: 65, unit: '', direction: 'lower' };
  const result = calculateProjection(metric, { mode: 'native' });
  assert.equal(result.unit, 'index points');
  assert.equal(result.relativeChange, -35);
  assert.equal(result.improved, true);
  assert.throws(() => calculateProjection(metric, { mode: 'count', denominator: 1000 }));
});

test('error reductions retain the direction, denominator, and fractional expectations', () => {
  const metric = { label: 'Classification error', baseline: 2.8, amlok: 2.66, unit: '%', direction: 'lower' };
  const result = calculateProjection(metric, { mode: 'count', denominator: 10000 });
  assert.equal(result.baseline, 280);
  assert.equal(result.projected, 266);
  assert.equal(result.change, -14);
  assert.ok(Math.abs(result.relativeChange + 5) < 1e-8);
  assert.ok(Math.abs(calculateProjection(metric, { mode: 'count', denominator: 100 }).projected - 2.66) < 1e-8);
  const forecast = calculateProjection({ ...metric, baseline: 20, amlok: 18.5 }, { mode: 'native' });
  assert.equal(forecast.change, -1.5);
  assert.equal(forecast.relativeChange, -7.5);
});

test('invalid populations and comparison inputs fail instead of producing misleading numbers', () => {
  const metric = { label: 'Coverage', baseline: 70, amlok: 85, unit: '%' };
  for (const denominator of [0, -1, 1.5, NaN, Infinity, undefined]) {
    assert.throws(() => calculateProjection(metric, { mode: 'count', denominator }));
  }
  for (const baseline of [0, NaN, Infinity, -1]) assert.throws(() => calculateProjection({ ...metric, baseline }, { mode: 'native' }));
});

test('every case has two auditable scenarios and the download matches current source data', () => {
  const exported = buildProjectionExport();
  const sourceCases = JSON.parse(readFileSync(new URL('../src/content/case-studies.json', import.meta.url), 'utf8'));
  const cards = JSON.parse(readFileSync(new URL('../src/content/case-study-cards.json', import.meta.url), 'utf8'));
  assert.equal(exported.cases.length, 14);
  assert.deepEqual(exported.cases.map(item => item.slug).sort(), sourceCases.map(item => item.slug).sort());
  for (const item of exported.cases) {
    assert.equal(item.projections.length, 2);
    assert.ok(item.validationProtocol && item.requiredEvidence && item.interpretationLimit);
    for (const projection of item.projections) {
      assert.ok(projection.assumption && projection.population && projection.meaning);
      assert.equal(projection.calculated.improved, true);
      assert.notEqual(projection.calculated.unit, 'currency');
    }
    const card = cards.find(card => card.slug === item.slug);
    for (const [key, value] of Object.entries(card.projection)) assert.equal(value, item.projections[0][key]);
  }
  const downloaded = JSON.parse(readFileSync(new URL('../public/downloads/case-study-projections.json', import.meta.url), 'utf8'));
  assert.deepEqual(downloaded, exported);
});
