import { ArrowUpRight, ChevronRight, FileText } from 'lucide-react';
import { SiteHeader } from './site-header';
import { CaseCard, CaseStudyLibrary, CaseStudyGraphic } from './case-study-library';
import { AmlokCaseAnalysis } from './case-study-analysis';
import { HomeMonitoringCta } from './home-monitoring-cta';
import { caseStudies, type CaseStudy } from '@/lib/case-studies';
import { caseStudyCards } from '@/lib/case-study-listing';
import { siteOrigin } from '@/lib/site-config';
import styles from './case-studies.module.css';

export function CaseStudiesPage() {
  return <main className={`home-page cp-page ${styles.page}`} id="top">
    <SiteHeader />
    <section className={styles.indexHero}><div className={styles.inner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><span aria-current="page">Case studies</span></nav>
      <span className="home-products-eyebrow"><i aria-hidden="true" />THE CASE LIBRARY</span>
      <h1>Risk leaves a trail.<br /><span className="home-heading-gradient">Learn to read it.</span></h1>
      <p>Fourteen financial risk cases. Explore what happened, the evidence Amlok could connect, and calculated scenarios showing how underwriting, monitoring, and investigation could improve.</p>
      <div className={styles.indexStats}><span><strong>14</strong> public cases</span><span><strong>5</strong> risk workflows</span><span><FileText size={20} aria-hidden="true" /> Sources with every case</span></div>
    </div></section>
    <section className={styles.indexLibrary} aria-label="Browse case studies"><div className={styles.inner}>
      <p className={styles.scope}>Historical events, specific Amlok interventions, and modeled improvements. Every case includes source records, calculation inputs, and the assumptions behind its projections.</p>
      <CaseStudyLibrary />
    </div></section>
    <HomeMonitoringCta />
  </main>;
}

function SourceRefs({ numbers, item }: { numbers: number[]; item: CaseStudy }) {
  return <span className={styles.sourceRefs}>{numbers.map(number => <a key={number} href={`#source-${number}`} aria-label={`Source ${number}: ${item.sources[number - 1]?.title}`}>[{number}]</a>)}</span>;
}

export function CaseStudyPage({ item }: { item: CaseStudy }) {
  const related = caseStudies.filter(other => other.slug !== item.slug).sort((a, b) => Number(b.type === item.type) - Number(a.type === item.type)).slice(0, 3);
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: item.title, description: item.summary, author: { '@type': 'Organization', name: 'Amlok', url: siteOrigin }, mainEntityOfPage: `${siteOrigin}/case-studies/${item.slug}`, citation: item.sources.map(source => source.url) };
  const sections = [['context', 'What happened'], ['signals', 'The signals to connect'], ['workflow', 'The Amlok intervention'], ['projections', 'Modeled impact'], ['sources', 'Sources & scope']];
  return <main className={`home-page cp-page ${styles.page}`} id="top">
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className={styles.detailHero}><div className={styles.inner}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><a href="/case-studies">Case studies</a><ChevronRight size={13} /><span aria-current="page">{item.institution}</span></nav>
      <div className={styles.heroGrid}><div>
        <span className="home-products-eyebrow"><i aria-hidden="true" />PUBLIC CASE STUDY</span>
        <p className={styles.heroInstitution}>{item.institution}</p>
        <h1>{item.title}</h1><p className={styles.heroSummary}>{item.summary}</p>
        <div className={styles.tags}><span>{item.type}</span><span>{item.sector}</span></div>
      </div><div className={styles.heroImage}><CaseStudyGraphic logos={item.logos} institution={item.institution} slug={item.slug} image={item.image} /></div></div>
      <div className={styles.facts}>{item.facts.map(fact => <div key={fact.label}><strong>{fact.value}</strong><p>{fact.label} <SourceRefs numbers={[fact.source]} item={item} /></p></div>)}</div>
      <p className={styles.scope}>Historical case analysis · Event period: {item.period} · Not an Amlok customer outcome. Currency and measurement scope are stated with each figure.</p>
    </div></header>
    <div className={`${styles.inner} ${styles.articleLayout}`}>
      <aside className={styles.sidebar}><nav aria-label="On this page"><span>IN THIS CASE</span>{sections.map(([id, title]) => <a key={id} href={`#${id}`}>{title}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</nav><div className={styles.sidebarNote}><span>THE CORE QUESTION</span><p>{item.questions[0]}</p></div></aside>
      <article className={styles.article}>
        <section id="context"><span className={styles.kicker}>01 / THE PUBLIC RECORD</span><h2>What happened.</h2>{item.context.map(text => <p key={text}>{text}</p>)}<p className={styles.citationLine}>Source record <SourceRefs numbers={item.contextSources} item={item} /></p><div className={styles.problem}><span>THE RISK MECHANISM</span><p>{item.problem}</p></div></section>
        {item.chart && <figure className={styles.chart}><figcaption><h3>{item.chart.title}</h3><span>{item.chart.unit}</span></figcaption>{item.chart.bars.map(bar => <div key={bar.label} className={styles.chartRow}><div><span>{bar.label}</span><strong>{bar.value.toLocaleString('en-CA')}</strong></div><div className={styles.barTrack}><i style={{ width: `${bar.value / Math.max(...item.chart!.bars.map(point => point.value)) * 100}%` }} /></div></div>)}<p>{item.chart.note} <SourceRefs numbers={[item.chart.source]} item={item} /></p></figure>}
        <section id="signals"><span className={styles.kicker}>02 / CONNECT THE SIGNALS</span><h2>From individual facts to a fuller picture.</h2><div className={styles.signalPanels}><div><span className={styles.panelLabel}>Documented in the source record</span><ul>{item.evidence.map(text => <li key={text}>{text}</li>)}</ul><SourceRefs numbers={item.contextSources} item={item} /></div><div><span className={styles.panelLabel}>Questions for retrospective review</span><ul>{item.questions.map(text => <li key={text}>{text}</li>)}</ul></div></div><p className={styles.small}>The review questions are analytical prompts. They do not establish that particular data was available to the institution at the time, or that a different process would have changed the outcome.</p></section>
        <AmlokCaseAnalysis slug={item.slug} institution={item.institution} />
        <section id="sources" className={styles.sources}><span className={styles.kicker}>05 / EVIDENCE & SCOPE</span><h2>Read the source material.</h2><p>{item.boundary}</p><ol>{item.sources.map((source, index) => <li key={source.url} id={`source-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span><div><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={16} aria-hidden="true" /></a><small>{source.type}</small></div></li>)}</ol><p className={styles.small}>Amlok’s interpretation is independent of the institutions discussed. Public records are limited to their stated scope and period. Historical figures describe the source events; the separately labeled Amlok scenarios are calculated projections. Institution names and logos do not imply affiliation or endorsement.</p></section>
      </article>
    </div>
    <section className={styles.related}><div className={styles.inner}><span className="home-products-eyebrow"><i aria-hidden="true" />KEEP EXPLORING</span><div className={styles.relatedHeading}><h2>Another case.<br /><span className="home-heading-gradient">A different risk connection.</span></h2><a href="/case-studies">View all case studies <ArrowUpRight size={18} aria-hidden="true" /></a></div><div className={styles.grid}>{related.map(other => <CaseCard key={other.slug} item={caseStudyCards.find(card => card.slug === other.slug)!} />)}</div></div></section>
    <HomeMonitoringCta />
  </main>;
}
