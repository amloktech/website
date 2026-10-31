'use client';

import Image from 'next/image';
import { ArrowRight, LockKeyhole, Search, ShieldCheck } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styles from './embedded-connection-widget.module.css';

const connections = [
  { name: 'TD Canada Trust', category: 'Banking', logo: 'td.png' },
  { name: 'RBC Royal Bank', category: 'Banking', logo: 'rbc.svg' },
  { name: 'Scotiabank', category: 'Banking', logo: 'scotiabank.svg' },
  { name: 'BMO Bank of Montreal', category: 'Banking', logo: 'bmo.svg' },
  { name: 'CIBC', category: 'Banking', logo: 'cibc.svg' },
  { name: 'National Bank', category: 'Banking', logo: 'national-bank.svg' },
  { name: 'Stripe', category: 'Payments', logo: 'stripe.svg' },
  { name: 'Shopify', category: 'E-commerce', logo: 'shopify.svg' },
  { name: 'QuickBooks Online', category: 'Accounting', logo: 'quickbooks.svg' },
  { name: 'Square', category: 'Payments', logo: 'square.svg' },
  { name: 'Xero', category: 'Accounting', logo: 'xero.svg' },
  { name: 'PayPal', category: 'Payments', logo: 'paypal.svg' },
];

/** An animated product illustration, not a live account-connection form. */
export function EmbeddedConnectionWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!widget || !viewport || !track) return;

    // The list and scrollbar share one animation clock; measure their travel at every size.
    const measure = () => {
      const height = viewport.clientHeight;
      const contentHeight = track.scrollHeight;
      const thumbHeight = Math.max(28, height * height / Math.max(contentHeight, 1));
      widget.style.setProperty('--list-overflow', `${Math.max(0, contentHeight - height)}px`);
      widget.style.setProperty('--thumb-height', `${thumbHeight}px`);
      widget.style.setProperty('--thumb-overflow', `${Math.max(0, height - thumbHeight)}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return <div className={styles.widget} ref={widgetRef} aria-hidden="true">
    <div className={styles.header}>
      <div className={styles.brandRow}>
        <Image src="/brand/amlok-logo-blue.svg" width={83} height={20} alt="" />
        <span><LockKeyhole size={12} />Secure connection</span>
      </div>
      <div className={styles.title}>Connect your accounts</div>
      <div className={styles.description}>Choose a bank or business integration.</div>
      <div className={styles.search}><Search size={15} /><span>Search banks &amp; integrations</span></div>
    </div>

    <div className={styles.listArea}>
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track} ref={trackRef}>
          {connections.map(connection => <div className={styles.option} key={connection.name}>
            <span className={styles.logo}><Image src={`/images/integrations/${connection.logo}`} width={32} height={32} alt="" loading="eager" /></span>
            <span className={styles.optionCopy}><strong>{connection.name}</strong><span>{connection.category}</span></span>
            <ArrowRight size={15} className={styles.arrow} />
          </div>)}
        </div>
      </div>
      <div className={styles.scrollbar}><span className={styles.thumb} /></div>
      <div className={styles.cursor}>
        <svg width="26" height="33" viewBox="0 0 26 33" fill="none"><path d="M4 2V25L10 19L15 30L20 28L15 17H24L4 2Z" fill="var(--canvas)" stroke="var(--blue)" strokeWidth="1.7" strokeLinejoin="round" /></svg>
        <span className={styles.wheel}><i /></span>
      </div>
    </div>

    <div className={styles.footer}><ShieldCheck size={13} /><span>Your accounts. One connected view.</span></div>
  </div>;
}
