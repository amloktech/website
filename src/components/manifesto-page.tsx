import { ArrowDown, ArrowUpRight, ChevronRight, Compass, Network } from 'lucide-react';
import { companyPurpose } from '@/content/company-purpose';
import pageIndex from '@/content/page-index.json';
import { findSitePage, type SitePageContent } from '@/lib/site-content';
import { siteOrigin } from '@/lib/site-config';
import { PageActions } from './page-actions';
import { SiteHeader } from './site-header';
import styles from './manifesto.module.css';

export function ManifestoPage({ page }: { page: SitePageContent }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteOrigin },
      { '@type': 'ListItem', position: 2, name: page.label, item: `${siteOrigin}/manifesto` },
    ],
  };

  return <main className={`home-page cp-page ${styles.page}`} id="top">
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className={styles.hero} aria-labelledby="page-title">
      <div className="cp-inner">
        <nav className="cp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13} aria-hidden="true" /><span aria-current="page">Our manifesto</span></nav>
        <span className="cp-eyebrow"><i aria-hidden="true" />OUR MANIFESTO</span>
        <h1 id="page-title">{page.title}<br /><span className="home-heading-gradient">{page.accent}</span></h1>
        <div className={styles.heroBottom}>
          <div><p className={styles.description}>{page.description}</p><PageActions /></div>
          <a className={styles.readLink} href="#convictions"><span>THE FUTURE WE’RE BUILDING<br /><strong>Ten convictions. One purpose.</strong></span><ArrowDown size={22} aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section className={styles.opening} aria-labelledby="why-title">
      <div className={`cp-inner ${styles.openingGrid}`}>
        <div><span className="cp-eyebrow"><i aria-hidden="true" />WHY WE EXIST</span><h2 id="why-title">Capital moves.<br /><span className="home-heading-gradient">Understanding should, too.</span></h2></div>
        <div className={styles.prose}>
          <p>Capital gives people and businesses room to move: to buy a home, finance a vehicle, stock a shop, or build something that does not exist yet. Every decision to provide it depends on an understanding of risk. The quality of that understanding shapes which opportunities become possible.</p>
          <p>Yet the evidence behind a decision is often scattered across applications, statements, ledgers, and systems. Teams spend time reconstructing the same financial life. An assessment becomes a snapshot, even as income, obligations, and relationships keep changing.</p>
          <p>We founded Amlok to help close that gap. We are building infrastructure that connects financial evidence, makes its meaning easier to examine, and carries that understanding through the life of a credit relationship. Our ambition is to improve how capital is accessed, allocated, and managed.</p>
        </div>
      </div>
    </section>

    <section className={styles.purpose} aria-label="Our mission and vision">
      <div className="cp-inner">
        <div className={styles.purposePanel}>
          <article><Network size={28} aria-hidden="true" /><h2>Our mission</h2><p>{companyPurpose.mission}</p></article>
          <article><Compass size={28} aria-hidden="true" /><h2>Our vision</h2><p>{companyPurpose.vision}</p></article>
        </div>
      </div>
    </section>

    <section className={styles.convictions} id="convictions" aria-label="Our ten convictions">
      <div className={`cp-inner ${styles.readingGrid}`}>
        <aside className={styles.contents}>
          <span className="cp-eyebrow">WHAT WE BELIEVE</span>
          <nav aria-label="Manifesto chapters"><ol>{page.sections.map((section, index) => <li key={section.title}><a href={`#conviction-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>)}</ol></nav>
          <p>These convictions guide what we build, how we evaluate it, and the responsibility we take for it.</p>
        </aside>
        <div className={styles.chapters}>
          {page.sections.map((section, index) => <section className={styles.chapter} key={section.title} id={`conviction-${index + 1}`} aria-labelledby={`conviction-title-${index + 1}`}>
            <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h2 id={`conviction-title-${index + 1}`}>{section.title}</h2>
            <div className={styles.prose}>{section.body.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>)}
        </div>
      </div>
    </section>

    <section className={styles.commitment} aria-labelledby="commitment-title">
      <div className={`cp-inner ${styles.commitmentGrid}`}>
        <div><span className="cp-eyebrow"><i aria-hidden="true" />THE WORK AHEAD</span><h2 id="commitment-title">Make understanding<br /><span className="home-heading-gradient">move with capital.</span></h2></div>
        <div className={styles.prose}>
          <p>Our vision is a direction, and our mission is the work required to get there. We will advance it by connecting evidence carefully, testing our assumptions, learning from institutions, and making the reasoning behind risk easier to inspect.</p>
          <p>We want financial teams to spend more of their time understanding opportunities, exercising judgment, and serving their customers. We want the context assembled for one decision to remain useful when the next decision arrives.</p>
          <p>That is the future we are building: a financial ecosystem where understanding risk is never the bottleneck to deploying capital.</p>
          <PageActions />
        </div>
      </div>
    </section>

    <section className={styles.related} aria-labelledby="explore-title">
      <div className="cp-inner">
        <h2 className="cp-eyebrow" id="explore-title">PUTTING OUR CONVICTIONS TO WORK</h2>
        <div className={styles.relatedGrid}>{page.related.map(slug => {
          const label = findSitePage(slug)?.label ?? pageIndex.find(item => item.path === `/${slug}`)?.title;
          if (!label) return null;
          return <a key={slug} href={`/${slug}`}><span>{label}</span><ArrowUpRight size={21} aria-hidden="true" /></a>;
        })}</div>
      </div>
    </section>
  </main>;
}
