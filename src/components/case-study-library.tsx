'use client';

import { useId, useState } from 'react';
import { ArrowDown, ArrowUpRight, Search, X } from 'lucide-react';
import { caseStudyCards, caseStudySectors, caseStudyTypes, caseStudyWorkflows } from '@/lib/case-study-listing';
import type { CaseStudyCard } from '@/lib/case-studies';
import { getCaseProjection } from '@/lib/case-projection-values';
import { formatProjectionNumber } from '@/lib/case-projection-math';
import photography from '@/content/case-study-photography.json';
import styles from './case-studies.module.css';

export function InstitutionLogo({ logos, institution, inverse = false }: { logos: string[]; institution: string; inverse?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <div className={`${styles.logos} ${inverse ? styles.inverseLogos : ''}`} aria-label={institution} role="img">
    <svg className={styles.logoFilters} aria-hidden="true" width="0" height="0"><defs>
      <filter id={`${id}-light`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .8504 2.8608 .2888 0 -3" /></filter>
      <filter id={`${id}-dark`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.4252 -1.4304 -.1444 0 2" />
        <feComponentTransfer><feFuncA type="linear" slope="3" intercept="-.3" /></feComponentTransfer>
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
    </defs></svg>
    {logos.map(logo => {
      const tone = logo.includes('home-capital') || logo.includes('td.png') ? 'light' : logo.includes('bridging-finance') ? 'dark' : null;
      if (logo.includes('td.png')) return <span key={logo} className={styles.tdBank} aria-hidden="true"><img src={logo} alt="" loading="lazy" style={inverse ? { filter: `url(#${id}-light)` } : undefined} /><span>Bank</span></span>;
      return <img key={logo} src={logo} alt="" loading="lazy" style={inverse && tone ? { filter: `url(#${id}-${tone})` } : undefined} />;
    })}
  </div>;
}

export function CaseStudyGraphic({ logos, institution, slug, image }: { logos: string[]; institution: string; slug: string; image: string }) {
  const photo = (photography as Record<string, { image: string; position: string }>)[slug];
  return <div className={styles.dataGraphic} role="img" aria-label={`${institution} case study, connected to Amlok's analysis.`}>
    <img className={styles.institutionPhoto} src={photo?.image ?? image} alt="" loading="lazy" decoding="async" style={{ objectPosition: photo?.position ?? '70% center' }} />
    <div className={styles.photoGradient} aria-hidden="true" />
    <div className={styles.graphicContent} aria-hidden="true">
      <div className={styles.institutionNode}><InstitutionLogo logos={logos} institution={institution} inverse /></div>
      <svg className={styles.dataPaths} viewBox="0 0 44 100" preserveAspectRatio="none" fill="none">
        <path className={styles.dataRail} d="M12 0 V100 M32 0 V100" />
        <path className={styles.dataOutbound} d="M12 0 V98" />
        <path className={styles.dataInbound} d="M32 2 V100" />
        <path className={styles.dataArrows} d="m7 92 5 6 5-6 M27 8l5-6 5 6" />
      </svg>
      <span className={styles.amlokEndpoint}>Amlok</span>
    </div>
  </div>;
}

export function CaseCard({ item }: { item: CaseStudyCard }) {
  const projection = getCaseProjection({ ...item.projection, mode: item.projection.mode === 'count' ? 'count' : 'native' });
  const isCount = item.projection.mode === 'count';
  const gain = formatProjectionNumber(Math.abs(isCount ? projection.change : projection.relativeChange));
  return <article className={styles.card}>
    <a href={`/case-studies/${item.slug}`} className={styles.cardLink}>
      <div className={styles.cardImage}>
        <CaseStudyGraphic logos={item.logos} institution={item.institution} slug={item.slug} image={item.image} />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.sector}>{item.sector}</span>
        <p className={styles.institution}>{item.institution}</p>
        <h3>{item.title}</h3>
        <p className={styles.summary}>{item.summary}</p>
        <div className={styles.cardFact}><strong>{item.fact.value}</strong><span>{item.fact.label}</span></div>
        <div className={styles.cardProjection}><span>MODELED OPPORTUNITY</span><p><strong>{isCount && projection.change > 0 ? '+' : ''}{gain}{isCount ? '' : '%'}</strong> {item.projection.outcome}</p><small>{isCount ? `Per ${formatProjectionNumber(item.projection.denominator!)} ${item.projection.population}` : 'Normalized index: 100 → 65'}</small></div>
        <span className={styles.readLink}>Explore the analysis <ArrowUpRight size={17} aria-hidden="true" /></span>
      </div>
    </a>
  </article>;
}

export function CaseStudyLibrary({ home = false }: { home?: boolean }) {
  const id = useId();
  const [type, setType] = useState('All cases');
  const [sector, setSector] = useState('All industries');
  const [workflow, setWorkflow] = useState('All workflows');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(home ? 6 : caseStudyCards.length);
  const filtered = caseStudyCards.filter(item =>
    (type === 'All cases' || item.type === type) &&
    (sector === 'All industries' || item.sector === sector) &&
    (workflow === 'All workflows' || item.workflows.includes(workflow)) &&
    `${item.institution} ${item.title} ${item.summary} ${item.sector} ${item.workflows.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const visible = filtered.slice(0, limit);
  const hasFilters = type !== 'All cases' || sector !== 'All industries' || workflow !== 'All workflows' || query !== '';
  function reset() { setType('All cases'); setSector('All industries'); setWorkflow('All workflows'); setQuery(''); setLimit(home ? 6 : caseStudyCards.length); }
  function resetLimit() { setLimit(home ? 6 : caseStudyCards.length); }

  const typeFilters = <div className={styles.tabs} role="group" aria-label="Filter case studies by institution type">
      {caseStudyTypes.map(value => <button type="button" key={value} aria-pressed={type === value} onClick={() => { setType(value); resetLimit(); }}>
        {value}<span>{value === 'All cases' ? caseStudyCards.length : caseStudyCards.filter(item => item.type === value).length}</span>
      </button>)}
    </div>;

  return <div className={styles.library}>
    {home ? <header className={styles.sectionHeading}>
      <span className="home-products-eyebrow"><i aria-hidden="true" />CASE STUDIES</span>
      <h2 id="case-studies-title"><span className={styles.titleLead}>Real cases. </span><span className={`home-heading-gradient ${styles.titleLine}`}><span className={styles.titlePhrase}>A more connected</span>{' '}<span className={styles.titlePhrase}>view of risk.</span></span></h2>
      <div className={styles.headingAside}><p>Explore what happened, how Amlok could have changed the review, and what the numbers could look like. Each case connects historical evidence with a specific intervention and calculated projections.</p><a href="/case-studies">Explore the case library <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      {typeFilters}
    </header> : typeFilters}
    <div className={styles.filters}>
      <label className={styles.search}><span className={styles.srOnly}>Search case studies</span><Search size={19} aria-hidden="true" /><input type="search" placeholder="Search institutions or topics" value={query} onChange={event => { setQuery(event.target.value); resetLimit(); }} /></label>
      <label className={styles.select}><span>Industry</span><select aria-label="Industry" value={sector} onChange={event => { setSector(event.target.value); resetLimit(); }}>{['All industries', ...caseStudySectors].map(value => <option key={value}>{value}</option>)}</select></label>
      <label className={styles.select}><span>Risk workflow</span><select aria-label="Risk workflow" value={workflow} onChange={event => { setWorkflow(event.target.value); resetLimit(); }}>{['All workflows', ...caseStudyWorkflows].map(value => <option key={value}>{value}</option>)}</select></label>
    </div>
    <div className={styles.resultsBar}>
      <p role="status" aria-live="polite" aria-atomic="true">{filtered.length === 0 ? 'No matching case studies' : `Showing ${visible.length} of ${filtered.length} case ${filtered.length === 1 ? 'study' : 'studies'}`}</p>
      {hasFilters && <button type="button" onClick={reset}>Clear filters <X size={14} aria-hidden="true" /></button>}
    </div>
    <div className={styles.grid} id={`${id}-results`}>
      {visible.map(item => <CaseCard key={item.slug} item={item} />)}
    </div>
    {filtered.length === 0 && <div className={styles.empty}><Search size={30} aria-hidden="true" /><h3>No cases match this combination.</h3><p>Try a broader industry, a different workflow, or another search term.</p><button type="button" onClick={reset}>Show all cases <ArrowUpRight size={17} aria-hidden="true" /></button></div>}
    {visible.length < filtered.length && <div className={styles.more}><button type="button" aria-controls={`${id}-results`} onClick={() => setLimit(value => value + 6)}>Show more case studies <ArrowDown size={17} aria-hidden="true" /></button></div>}
  </div>;
}

export function HomeCaseStudies() {
  return <section className={styles.section} id="case-studies" aria-labelledby="case-studies-title">
    <div className={styles.inner}>
      <CaseStudyLibrary home />
    </div>
  </section>;
}
