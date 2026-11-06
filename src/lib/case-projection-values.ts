import { retrovalidationMetrics } from '@/content/retrovalidation';
import { calculateProjection, type ProjectionInput } from './case-projection-math';

export function getCaseProjection(spec: ProjectionInput & { metricId: string }) {
  const metric = retrovalidationMetrics.find(item => item.id === spec.metricId);
  if (!metric) throw new Error(`Unknown case projection metric: ${spec.metricId}`);
  return { metric, ...calculateProjection(metric, spec) };
}
