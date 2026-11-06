export type ProjectionInput = {
  mode: 'count' | 'native';
  denominator?: number;
};

export type ComparisonMetric = {
  label: string;
  baseline: number;
  amlok: number;
  unit: '%' | '';
  direction?: 'lower';
};

// Counts are scenario expectations, never observations from an institution's files.
// Retain fractional expectations; only round when formatting the presentation.
export function calculateProjection(metric: ComparisonMetric, input: ProjectionInput) {
  if (![metric.baseline, metric.amlok].every(Number.isFinite) || metric.baseline <= 0 || metric.amlok < 0) {
    throw new Error(`Invalid comparison values: ${metric.label}`);
  }
  if (input.mode === 'count' && (metric.unit !== '%' || !Number.isInteger(input.denominator) || input.denominator! <= 0 || Math.max(metric.baseline, metric.amlok) > 100)) {
    throw new Error(`A count projection requires percentage rates and a positive integer population: ${metric.label}`);
  }
  const scale = input.mode === 'count' ? input.denominator! / 100 : 1;
  const baseline = metric.baseline * scale;
  const projected = metric.amlok * scale;
  return {
    baseline,
    projected,
    change: projected - baseline,
    relativeChange: (metric.amlok - metric.baseline) / metric.baseline * 100,
    rateChange: metric.amlok - metric.baseline,
    improved: metric.direction === 'lower' ? projected < baseline : projected > baseline,
    unit: input.mode === 'count' ? 'records' : metric.unit === '%' ? '%' : 'index points',
  };
}

export function formatProjectionNumber(value: number) {
  return new Intl.NumberFormat('en-CA', { maximumFractionDigits: 2 }).format(value);
}
