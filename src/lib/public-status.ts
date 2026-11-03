import type { Health, PublicStatusReport, ServiceCheck } from '../../worker';

const healthValues: Health[] = ['operational', 'degraded', 'unknown'];
const isHealth = (value: unknown): value is Health => typeof value === 'string' && healthValues.includes(value as Health);
const isTimestamp = (value: unknown): value is string => typeof value === 'string' && Number.isFinite(Date.parse(value));

export function isPublicStatusReport(value: unknown): value is PublicStatusReport {
  if (!value || typeof value !== 'object') return false;
  const report = value as Record<string, unknown>;
  if (report.scope !== 'public-web' || !isHealth(report.status) || !isTimestamp(report.checked_at) || !Array.isArray(report.services) || report.services.length !== 2) return false;
  const ids = new Set<string>();
  for (const service of report.services) {
    if (!service || typeof service !== 'object' || !['website', 'documentation'].includes(service.id) || typeof service.name !== 'string' || !isHealth(service.status) || !isTimestamp(service.checked_at) || typeof service.response_time_ms !== 'number' || !Number.isFinite(service.response_time_ms) || service.response_time_ms < 0) return false;
    ids.add(service.id);
  }
  return ids.size === 2;
}

export function currentPublicHealth(report: PublicStatusReport | null, failed: boolean, now: number): Health {
  if (!report || failed) return 'unknown';
  // An old report or a clock ahead of the observer is not a current health signal.
  if ([report.checked_at, ...report.services.map(service => service.checked_at)].some(time => now - Date.parse(time) > 120000 || Date.parse(time) - now > 60000)) return 'unknown';
  return report.services.some(service => service.status === 'degraded') ? 'degraded' : report.services.some(service => service.status === 'unknown') ? 'unknown' : report.status;
}

export function currentServiceHealth(service: ServiceCheck | undefined, report: PublicStatusReport | null, failed: boolean, now: number): Health {
  if (!service || !report || failed) return 'unknown';
  if ([report.checked_at, service.checked_at].some(time => now - Date.parse(time) > 120000 || Date.parse(time) - now > 60000)) return 'unknown';
  return service.status;
}
