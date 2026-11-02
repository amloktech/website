import { BlogAuthor } from './blog-author';
import Image from 'next/image';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { SiteHeader } from './site-header';
import { PublicationPrint } from './publication-tools';
import { findPublication, type Publication, type PublicationFigure } from '@/lib/publications';
import { siteOrigin } from '@/lib/site-config';
import styles from './publication.module.css';

function Citation({ id, publication }: { id: string; publication: Publication }) {
  const index = publication.sources.findIndex(source => source.id === id);
  return <sup className={styles.citation}><a href={`#source-${id}`} aria-label={`Source ${index + 1}: ${publication.sources[index]?.title}`}>[{index + 1}]</a></sup>;
}

function Text({ text, publication }: { text: string; publication: Publication }) {
  return <>{text.split(/(\[\@[a-z0-9-]+\])/g).map((part, index) => {
    const match = part.match(/^\[\@([a-z0-9-]+)\]$/);
    return match ? <Citation key={index} id={match[1]} publication={publication}/> : part;
  })}</>;
}

function Figure({ figure, number, publication }: { figure: PublicationFigure; number: number; publication: Publication }) {
  const max = figure.max ?? Math.max(...(figure.values ?? []).map(value => value.value));
  return <figure className={styles.figure}>
    <div className={styles.figureTop}><span>FIG. {String(number).padStart(2, '0')}</span><span>{figure.label}</span></div>
    <h3>{figure.title}</h3>
    {figure.kind === 'bars' ? <div className={styles.chart} role="img" aria-label={`${figure.title}. ${figure.values?.map(value => `${value.label}: ${value.display}`).join('; ')}. ${figure.unit ?? ''}`}>
      {figure.values?.map(value => <div className={styles.barRow} key={value.label}><div className={styles.barLabel}><span>{value.label}</span><strong>{value.display}</strong></div><div className={styles.barTrack}><span style={{ width: `${max ? value.value / max * 100 : 0}%` }}/></div></div>)}
      <div className={styles.axis}><span>0</span><span>{max.toLocaleString('en-CA')} {figure.unit}</span></div>
    </div> : <ol className={styles.flow}>{figure.steps?.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span><strong>{step.title}</strong><p>{step.detail}</p>{index < (figure.steps?.length ?? 0) - 1 && <span className={styles.flowArrow} aria-hidden="true">→</span>}</li>)}</ol>}
    <figcaption><Text text={figure.caption} publication={publication}/>{figure.sources.map(id => <Citation key={id} id={id} publication={publication}/>)}</figcaption>
    {figure.values && <details className={styles.dataDetails}><summary>View figure data</summary><table><caption>{figure.title} — underlying values</caption><thead><tr><th scope="col">Measure</th><th scope="col">Value</th></tr></thead><tbody>{figure.values.map(value => <tr key={value.label}><th scope="row">{value.label}</th><td>{value.display}</td></tr>)}</tbody></table></details>}
  </figure>;
}

export function PublicationPage({ publication: p }: { publication: Publication }) {
  const blog = p.format === 'Article';
  const industryGuide = p.slug.startsWith('industry-guides/');
  const collection = blog ? 'Blog' : industryGuide ? 'Industry Guides' : 'Research';
  const collectionHref = blog ? '/blog' : industryGuide ? '/industry-guides' : '/research';
  const date = new Date(`${p.date}T12:00:00Z`).toLocaleDateString('en-CA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const schema = { '@context': 'https://schema.org', '@type': blog ? 'BlogPosting' : 'Article', headline: `${p.title} ${p.accent}`, description: p.description, datePublished: p.date, dateModified: p.date, author: { '@type': 'Organization', name: 'AMLOK', url: siteOrigin }, publisher: { '@type': 'Organization', name: 'AMLOK', url: siteOrigin }, image: new URL(`/images/publications/${p.slug.split('/').pop()}.png`, siteOrigin).href, mainEntityOfPage: new URL(`/${p.slug}`, siteOrigin).href, citation: p.sources.map(source => source.url) };
  let figureNumber = 0;
  return <main className={`home-page cp-page ${styles.page}`} id="top">
    <SiteHeader/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <header className={styles.hero}><div className="cp-inner">
      <nav className="cp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13}/><a href={collectionHref}>{collection}</a><ChevronRight size={13}/><span aria-current="page">{blog || industryGuide ? p.category : p.format}</span></nav>
      <div className={styles.heroGrid}><div><span className="cp-eyebrow"><i/>{p.format} / {p.category}</span><h1>{p.title} <span className="home-heading-gradient">{p.accent}</span></h1><p className={styles.deck}>{p.description}</p>{!blog && <div className={styles.byline}><Image src="/brand/amlok-mark-blue.svg" alt="" width={32} height={32}/><strong>AMLOK</strong><span><time dateTime={p.date}>{date}</time> · {p.readMinutes} min read</span></div>}<div className={styles.heroActions}><a href="#overview" className="cp-button">Read {blog ? 'article' : p.format.toLowerCase()} <ArrowUpRight size={17}/></a><PublicationPrint/></div></div><div className={styles.cover}><Image src={p.image} width={1200} height={650} priority alt={`AMLOK ${p.format.toLowerCase()} cover: ${p.title} ${p.accent}`}/>{blog && <div style={{marginTop:24}}><BlogAuthor post={{author:'AMLOK',readMinutes:p.readMinutes,topic:p.category}}/></div>}</div></div>
    </div></header>
    <div className={`cp-inner ${styles.readingLayout}`}>
      <aside className={styles.sidebar}><nav aria-label="In this publication"><span className="cp-eyebrow">IN THIS {blog ? 'ARTICLE' : p.format.toUpperCase()}</span><a href="#overview">At a glance</a>{p.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a>)}<a href="#references">Sources & methodology</a></nav></aside>
      <article className={styles.body}>
        <section id="overview" className={styles.overview}><span className="cp-eyebrow">AT A GLANCE</span><h2>The idea in brief.</h2><p><Text text={p.abstract} publication={p}/></p><ul>{p.takeaways.map(item => <li key={item}><Text text={item} publication={p}/></li>)}</ul><div className={styles.evidence}><strong>Evidence & scope</strong><p><Text text={p.evidence} publication={p}/></p></div></section>
        {p.sections.map(section => <section id={section.id} className={styles.section} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}><Text text={paragraph} publication={p}/></p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}><Text text={item} publication={p}/></li>)}</ul>}{section.figure && <Figure figure={section.figure} number={++figureNumber} publication={p}/>}{section.table && <div className={styles.tableWrap} role="region" aria-label={section.table.caption} tabIndex={0}><table><caption>{section.table.caption}{section.table.sources.map(id => <Citation key={id} id={id} publication={p}/>)}</caption><thead><tr>{section.table.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>}{section.takeaway && <aside className={styles.takeaway}><span>THE PRACTICAL IMPLICATION</span><p><Text text={section.takeaway} publication={p}/></p></aside>}</section>)}
        <section id="references" className={styles.references}><span className="cp-eyebrow">FOLLOW THE EVIDENCE</span><h2>Sources & methodology.</h2><p>Sources reviewed 2 November 2026. Figures identify their population, period, and units. Scenarios marked illustrative are AMLOK calculations using stated assumptions, not observed customer outcomes.</p><ol>{p.sources.map((source, index) => <li id={`source-${source.id}`} key={source.id}><span className={styles.sourceNumber}>{index + 1}</span><div><a href={source.url}>{source.title}<ArrowUpRight size={15} aria-hidden="true"/></a><span>{source.publisher}</span><p>{source.note}</p></div></li>)}</ol></section>
      </article>
    </div>
    <section className={styles.related}><div className="cp-inner"><span className="cp-eyebrow">CONTINUE READING</span><h2>Connect the next idea.</h2><div className={styles.relatedGrid}>{p.related.map(slug => { const next = findPublication(slug); return next ? <a key={slug} href={`/${slug}`}><Image src={next.image} width={1200} height={650} alt=""/><span>{next.format} · {next.category}</span><h3>{next.title} {next.accent}</h3><span className={styles.readLink}>Read {next.format.toLowerCase()} <ArrowUpRight size={17}/></span></a> : null; })}</div></div></section>
  </main>;
}
