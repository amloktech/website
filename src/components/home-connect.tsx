'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { integrationLogoRows } from './home-connect-logos';
import styles from './home-connect.module.css';

export function HomeConnect() {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => {
      panel.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return <article
    className={styles.panel}
    id="connect"
    aria-labelledby="home-connect-title"
    data-visible="false"
    ref={panelRef}
  >
    <div className={styles.wall}>
      {integrationLogoRows.map((logos, row) => <div className={styles.row} key={row}>
        <div className={styles.track} data-direction={row === 1 ? 'right' : 'left'}>
          {/* Equal-width copies make the wrap seamless, including after resizing. */}
          {[0, 1].map(copy => <div className={styles.group} role="list" aria-label={`Integration catalogue providers, row ${row + 1}`} aria-hidden={copy === 1 ? true : undefined} key={copy}>
            {logos.map(logo => <div className={styles.tile} role="listitem" title={logo.name} key={logo.name}>
              <Image src={logo.image} width={64} height={64} alt={logo.name} loading="eager" />
            </div>)}
          </div>)}
        </div>
      </div>)}
    </div>

    <div className={styles.footer}>
      <div className={styles.copy}>
        <h3 id="home-connect-title">Connect the context you need.</h3>
        <p>Integrations across KYC/KYB, credit, fraud, open banking, and PEP screening—plus flexible connections to your internal systems.</p>
      </div>
      <div className={styles.actions}>
        <a href="https://docs.amlok.io/integrations">Integrations <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </article>;
}
