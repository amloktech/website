import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { retrovalidationMetrics } from '../src/content/retrovalidation.ts';
import { calculateProjection } from '../src/lib/case-projection-math.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const clean = number => Math.round(number * 1e10) / 1e10;

export function buildProjectionExport() {
  const analyses = readJson('src/content/case-study-analysis.json');
  const cases = readJson('src/content/case-studies.json');
  return {
    title: 'Amlok financial risk case projections',
    version: 1,
    status: 'Modeled scenarios, not institution-specific replay results',
    inputSource: 'https://amlok.io/#retrovalidation',
    methodology: 'Apply the supplied approximate baseline and Amlok comparison rates to an explicitly assumed population, or preserve the native index/error measure. Transferability to each case is assumed, not measured. Metrics are separate dimensions and cannot be added together. No avoided loss, penalty, or cost is estimated.',
    formulas: {
      count: 'Assumed population × comparison rate ÷ 100',
      change: 'Projected value − baseline value',
      relativeChange: '(Amlok rate − baseline rate) ÷ baseline rate × 100',
    },
    cases: analyses.map(analysis => {
      const item = cases.find(item => item.slug === analysis.slug);
      if (!item) throw new Error(`Missing source case: ${analysis.slug}`);
      return {
        slug: analysis.slug,
        institution: item.institution,
        intervention: analysis.thesis,
        requiredEvidence: analysis.access,
        historicalSources: item.sources,
        projections: analysis.projections.map(spec => {
          const metric = retrovalidationMetrics.find(metric => metric.id === spec.metricId);
          if (!metric) throw new Error(`Unknown metric: ${spec.metricId}`);
          const result = calculateProjection(metric, spec);
          return {
            ...spec,
            metric: metric.label,
            comparisonInputs: { baseline: metric.baseline, amlok: metric.amlok, unit: metric.unit || 'normalized burden index', approximate: true },
            calculated: Object.fromEntries(Object.entries(result).map(([key, value]) => [key, typeof value === 'number' ? clean(value) : value])),
          };
        }),
        validationProtocol: analysis.validation,
        interpretationLimit: analysis.limit,
      };
    }),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = resolve(root, 'public/downloads/case-study-projections.json');
  const content = `${JSON.stringify(buildProjectionExport(), null, 2)}\n`;
  if (process.argv.includes('--check')) {
    if (readFileSync(output, 'utf8') !== content) throw new Error('Projection download is stale. Regenerate with scripts/case-study-projections.mjs.');
    console.log('Projection download matches the 14 case analyses and current comparison inputs.');
  } else {
    mkdirSync(resolve(root, 'public/downloads'), { recursive: true });
    writeFileSync(output, content);
    console.log('Calculated 28 scenarios across 14 cases and saved the downloadable inputs and results.');
  }
}
