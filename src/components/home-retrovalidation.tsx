'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, Clock3, FileSearch, Info, Network, ScanLine } from 'lucide-react';
import { retrovalidationGroups, retrovalidationMetrics, type RetrovalidationGroup } from '@/content/retrovalidation';
import { ResearchInstitutionLogos } from './research-institution-logos';
import styles from './home-retrovalidation.module.css';

const formatNumber = (value: number) => value.toLocaleString('en-CA', { maximumFractionDigits: 2 });

function RelativeChange({ baseline, amlok }: { baseline: number; amlok: number }) {
  const change = (amlok - baseline) / baseline * 100;
  return <>{change > 0 ? '+' : '−'}{formatNumber(Math.abs(change))}%</>;
}

function ChangeTooltip({ metric }: { metric: typeof retrovalidationMetrics[number] }) {
  const [open, setOpen] = useState(false);
  const [below, setBelow] = useState(false);
  const root = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();
  const change = (metric.amlok - metric.baseline) / metric.baseline * 100;
  const difference = Math.abs(metric.amlok - metric.baseline);

  const show = () => {
    setBelow((root.current?.getBoundingClientRect().top ?? 0) < 310);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissOnEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissOnEscape);
    };
  }, [open]);

  return <span ref={root} className={styles.tooltipRoot}
    onPointerEnter={event => { if (event.pointerType === 'mouse') show(); }}
    onPointerLeave={event => { if (event.pointerType === 'mouse') setOpen(false); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button type="button" className={styles.tooltipTrigger}
      aria-label={`Explain relative change: ${metric.label}`}
      aria-describedby={open ? tooltipId : undefined}
      onFocus={show} onClick={show}>
      <Info size={15} aria-hidden="true" />
    </button>
    {open && <span id={tooltipId} role="tooltip" className={styles.tooltip} data-below={below}>
      <span className={styles.tooltipContent}>
        <b>{metric.label}</b>
        <span>Relative change = (Amlok − baseline) ÷ baseline × 100.</span>
        <span className={styles.formula}>({formatNumber(metric.amlok)} − {formatNumber(metric.baseline)}) ÷ {formatNumber(metric.baseline)} × 100 = <RelativeChange baseline={metric.baseline} amlok={metric.amlok} /></span>
        <span>About {formatNumber(Math.abs(change))}% {change < 0 ? 'lower' : 'higher'} than the baseline{metric.unit === '%' ? `, equivalent to ${formatNumber(difference)} percentage points ${change < 0 ? 'less' : 'more'}` : ''}.</span>
        {metric.note && <span>{metric.note}</span>}
        <span className={styles.tooltipNote}>Calculated from the approximate proposed comparison values.</span>
      </span>
    </span>}
  </span>;
}

export function HomeRetrovalidation() {
  const [group, setGroup] = useState<RetrovalidationGroup | 'all'>('all');
  const visibleMetrics = retrovalidationMetrics.filter(metric => group === 'all' || metric.group === group);
  const description = retrovalidationGroups.find(item => item.id === group)?.description ?? 'All 12 dimensions in the proposed connected-data comparison.';

  return <section className={styles.section} id="retrovalidation" aria-labelledby="retrovalidation-title">
    <div className={styles.inner}>
      <header className={styles.header}>
        <div>
          <span className="home-products-eyebrow"><i aria-hidden="true" />RETROSPECTIVE RESEARCH</span>
          <h2 id="retrovalidation-title">More of the picture.<br /><span className="home-heading-gradient">Earlier signs of risk.</span></h2>
        </div>
        <div className={styles.intro}>
          <p>Our retrovalidation work looks back at historical deals to examine what connected data makes visible: more assessable information, clearer financial relationships, and earlier signals of distress.</p>
          <a href="/research" className={styles.researchLink}>Explore the research <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </header>

      <div className={styles.dataset}>
        <span className={styles.onBlueLabel}>REPORTED RESEARCH FIGURES</span>
        <dl className={styles.datasetStats}>
          <div><dt>Closed deals studied</dt><dd>275,019</dd></div>
          <div><dt>Metadata records</dt><dd>6,322,690</dd></div>
          <div><dt>Avg. data points per business</dt><dd>1,300</dd></div>
        </dl>
        <div className={styles.institutions}>
          <ResearchInstitutionLogos className={styles.logos} />
        </div>
      </div>

      <div className={styles.findings} aria-label="Reported retrovalidation findings">
        <article className={styles.finding}>
          <div className={styles.findingLabel}><FileSearch size={19} aria-hidden="true" /><h3>Assessable information</h3></div>
          <p className={`${styles.value} ${styles.valuePair}`}><span>40<small>%</small></span><ArrowRight aria-label="increased to" size={22} /><strong>82<small>%</small></strong></p>
          <div className={styles.pairedBars} aria-hidden="true"><i style={{ width: '40%' }} /><i style={{ width: '82%' }} /></div>
          <p className={styles.findingCopy}><strong>+42 percentage points</strong><span>of assessable information.</span></p>
        </article>
        <article className={styles.finding}>
          <div className={styles.findingLabel}><ScanLine size={19} aria-hidden="true" /><h3>Transaction clarity</h3></div>
          <p className={styles.value}>60–85<small>%</small></p>
          <div className={styles.rangeBar} style={{ '--range-start': '60%', '--range-end': '85%' } as CSSProperties} aria-hidden="true"><i /><b /></div>
          <p className={styles.findingCopy}><span>Previously unreadable</span><span>transaction value resolved.</span></p>
        </article>
        <article className={styles.finding}>
          <div className={styles.findingLabel}><Network size={19} aria-hidden="true" /><h3>Default signals</h3></div>
          <p className={styles.value}>25–45<small>%</small></p>
          <div className={styles.rangeBar} style={{ '--range-start': '25%', '--range-end': '45%' } as CSSProperties} aria-hidden="true"><i /><b /></div>
          <p className={styles.findingCopy}><span>Signal-bearing defaults flagged</span><span>in retrospective analysis.</span></p>
        </article>
        <article className={styles.finding}>
          <div className={styles.findingLabel}><Clock3 size={19} aria-hidden="true" /><h3>Earlier warning</h3></div>
          <p className={styles.value}>6–8<small>weeks</small></p>
          <div className={styles.timeline} aria-hidden="true"><span>Signal detected</span><i /><span>Distress event</span></div>
          <p className={styles.findingCopy}><span>Distress detected earlier.</span><span>More time to review risk.</span></p>
        </article>
      </div>

      <div className={styles.comparison}>
        <div className={styles.comparisonHeader}>
          <div><span className={styles.label}>CONNECTED-DATA VALIDATION</span><h3>Look inside the comparison.</h3></div>
        </div>
        <div className={styles.filters} role="group" aria-label="Comparison categories">
          <button type="button" aria-pressed={group === 'all'} aria-controls="retrovalidation-comparison" onClick={() => setGroup('all')}>All metrics<span>12</span></button>
          {retrovalidationGroups.map(item => <button type="button" key={item.id} aria-pressed={group === item.id} aria-controls="retrovalidation-comparison" onClick={() => setGroup(item.id)}>{item.label}<span>{retrovalidationMetrics.filter(metric => metric.group === item.id).length}</span></button>)}
        </div>
        <p className={styles.categoryDescription} aria-live="polite">{description}</p>
        <div id="retrovalidation-comparison" className={styles.tableWrapper}>
          <table className={styles.table} aria-describedby="retrovalidation-comparison-note">
            <caption className="sr-only">Proposed comparison of connected-data measurements against the baseline</caption>
            <thead><tr><th scope="col">Measurement</th><th scope="col">Baseline</th><th scope="col">Amlok</th><th scope="col">Relative change</th></tr></thead>
            <tbody>{visibleMetrics.map(metric => <tr key={metric.label}>
              <th scope="row">{metric.label}</th>
              <td><span className={styles.mobileLabel} aria-hidden="true">Baseline</span><span>{formatNumber(metric.baseline)}{metric.unit}</span></td>
              <td><span className={styles.mobileLabel} aria-hidden="true">Amlok</span><strong>≈{formatNumber(metric.amlok)}{metric.unit}</strong></td>
              <td><span className={styles.mobileLabel} aria-hidden="true">Change</span><span className={styles.changeValue}><span className={styles.delta}>≈<RelativeChange baseline={metric.baseline} amlok={metric.amlok} /></span><ChangeTooltip metric={metric} /></span></td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className={styles.notes} id="retrovalidation-comparison-note">
          <p>Approximate values · Source: Amlok retrovalidation research.</p>
        </div>
      </div>
    </div>
  </section>;
}
