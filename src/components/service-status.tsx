'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import type { Health, PublicStatusReport } from '../../worker';
import { currentPublicHealth, currentServiceHealth, isPublicStatusReport } from '@/lib/public-status';
import styles from './service-status.module.css';

const labels: Record<Health, string> = { operational: 'Available', degraded: 'Issue detected', unknown: 'Availability unconfirmed' };
const descriptions = {
  website: 'Checks that the homepage is available from AMLOK’s Cloudflare asset delivery. This does not test external DNS or every page.',
  documentation: 'Checks the public documentation homepage over HTTPS. This does not test product API behavior.',
};

export function ServiceStatus() {
  const [report, setReport] = useState<PublicStatusReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState(0);
  const active = useRef<AbortController | null>(null);
  const mounted = useRef(false);
  const refresh = useCallback(async () => {
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    const timeout = setTimeout(() => controller.abort(), 10000);
    setLoading(true);
    try {
      const response = await fetch('/api/status', { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) throw new Error('Status unavailable');
      const next: unknown = await response.json();
      if (!isPublicStatusReport(next)) throw new Error('Invalid status report');
      if (mounted.current && active.current === controller) { setReport(next); setFailed(false); }
    } catch {
      if (mounted.current && active.current === controller) setFailed(true);
    } finally {
      clearTimeout(timeout);
      if (active.current === controller) {
        active.current = null;
        if (mounted.current) { setNow(Date.now()); setLoading(false); }
      }
    }
  }, []);
  useEffect(() => {
    mounted.current = true;
    void refresh();
    const polling = setInterval(() => { if (!document.hidden) void refresh(); }, 60000);
    const clock = setInterval(() => setNow(Date.now()), 15000);
    return () => { mounted.current = false; clearInterval(polling); clearInterval(clock); active.current?.abort(); active.current = null; };
  }, [refresh]);

  const health = currentPublicHealth(report, failed, now);
  const stale = !!report && now - Date.parse(report.checked_at) > 120000;
  const heading = loading && !report ? 'Checking public services…' : health === 'operational' ? 'Public website services are available.' : health === 'degraded' ? 'A public service needs attention.' : 'Current availability is unconfirmed.';
  return <section className={`cp-section ${styles.section}`} id="public-status" aria-labelledby="live-status-title"><div className="cp-inner">
    <div className={styles.summary}>
      <div><span className="cp-eyebrow">LIVE CHECKS / PUBLIC WEB SERVICES</span><h2 id="live-status-title"><i className={styles.dot} data-health={health}/>{heading}</h2><p>Checks run on request and refresh every minute. Results may be cached for up to 60 seconds.</p></div>
      <button className={styles.refresh} type="button" onClick={() => void refresh()} disabled={loading}><RefreshCw size={17} aria-hidden="true"/>{loading ? 'Checking…' : 'Refresh status'}</button>
    </div>
    <p className={styles.observation} role="status">{report ? `${failed || stale ? 'Last successful report' : 'Last checked'}: ${new Date(report.checked_at).toLocaleString()}` : loading ? 'Retrieving current observations.' : 'The status report could not be retrieved. Please retry or contact support.'}{failed && report ? ' The latest refresh failed; the previous result is not current.' : stale ? ' This report is stale; availability is unconfirmed.' : ''}</p>
    <div className={styles.grid}>
      {(['website', 'documentation'] as const).map(id => {
        const service = report?.services.find(item => item.id === id);
        const status = currentServiceHealth(service, report, failed, now);
        return <article key={id} className={styles.card}><span className={styles.badge} data-health={status}><i/>{loading && !report ? 'Checking' : labels[status]}</span><h3>{id === 'website' ? 'Website delivery' : 'Documentation'}</h3><p>{descriptions[id]}</p>{service && !failed && !stale && <span className={styles.timing}>Last probe: {service.response_time_ms} ms</span>}</article>;
      })}
      <article className={styles.card}><span className={styles.badge} data-health="unknown"><i/>Not connected</span><h3>Product APIs &amp; workflows</h3><p>API, assessments, data connections, and webhook telemetry are not connected to this public page. Check your institution’s environment for their status.</p><a href="https://docs.amlok.io/api-reference/endpoints/platform/service-status">Environment status reference <ArrowUpRight size={15} aria-hidden="true"/></a></article>
    </div>
    <a className={styles.endpoint} href="/api/status">View the public status endpoint <ArrowUpRight size={15} aria-hidden="true"/></a>
  </div></section>;
}
