import { HomeMonitoringCta } from './home-monitoring-cta';
import { Activity, ArrowRight, ArrowUpRight, Check, ChevronRight, Code2, FileSearch, Layers3, Network, ShieldCheck } from 'lucide-react';
import { underwritingAudiences, underwritingFaqs } from '@/content/underwriting';
import type { SitePageContent } from '@/lib/site-content';
import { siteOrigin } from '@/lib/site-config';
import { BookingLink } from './booking-link';
import { SiteHeader } from './site-header';
import { UnderwritingAudiences, UnderwritingScenario, UnderwritingWorkflow } from './underwriting-explorer';
import { AssessmentPreview, EvidenceReconciliation, UnderwritingGraph } from './underwriting-visuals';
import styles from './underwriting.module.css';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className={`cp-eyebrow ${styles.eyebrow}`}><i aria-hidden="true"/>{children}</span>;
}

export function UnderwritingPage({ page }: { page: SitePageContent }) {
  const schema = {
    '@context':'https://schema.org', '@type':'BreadcrumbList',
    itemListElement: [
      { '@type':'ListItem',position:1,name:'Home',item:siteOrigin },
      { '@type':'ListItem',position:2,name:'Products',item:`${siteOrigin}/products` },
      { '@type':'ListItem',position:3,name:'AMLOK Insights',item:`${siteOrigin}/products/underwriting` },
    ],
  };
  return <main className={`home-page cp-page ${styles.page}`} id="top">
    <SiteHeader/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <section className={styles.hero} aria-labelledby="page-title">
      <div className="cp-inner">
        <nav className="cp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13} aria-hidden="true"/><a href="/products">Products</a><ChevronRight size={13} aria-hidden="true"/><span aria-current="page">AMLOK Insights</span></nav>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}><Eyebrow>AMLOK INSIGHTS / UNDERWRITING</Eyebrow><h1 id="page-title">{page.title}<br/><span className="home-heading-gradient">{page.accent}</span></h1><p>{page.description}</p><div className={styles.actions}><BookingLink className={styles.primary}>Explore your underwriting workflow<ArrowUpRight size={18}/></BookingLink><a className={styles.textLink} href="#underwriting-teams">Find your use case<ArrowRight size={17}/></a></div><p className={styles.heroNote}><ShieldCheck size={16}/>Connected evidence. Reviewable reasoning. Your decision.</p></div>
          <figure className={styles.heroArt}><div className={styles.artTop}><span>BEYOND THE APPLICATION</span><span className={styles.liveDot}>CONNECTED CONTEXT</span></div><UnderwritingGraph/><figcaption>Income. Obligations. Relationships.<br/><strong>The context that shapes the deal.</strong></figcaption></figure>
        </div>
        <div className={styles.sourceStrip}><span>BUILD THE PICTURE WITH</span><ul>{['Banking','Payments','Commerce','Accounting','Documents','Permitted external evidence'].map(source => <li key={source}>{source}</li>)}</ul></div>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="ecosystem-title">
      <div className="cp-inner">
        <div className={styles.splitHeading}><div><Eyebrow>THE ECOSYSTEM VIEW</Eyebrow><h2 id="ecosystem-title">A deal is a network<br/><span className="home-heading-gradient">of relationships.</span></h2></div><p>The application introduces the customer. Their accounts, income sources, commitments, and counterparties explain how the financial relationship works. AMLOK helps you bring those connections into the assessment, within the evidence you are authorized to use.</p></div>
        <div className={styles.principles}>{[
          [Network,'See connected exposure','Understand who and what is linked to the deal. Keep supported relationships, candidate matches, and unresolved questions distinct.'],
          [Layers3,'Reconcile the financial story','Follow activity across records and systems. Separate new economic activity from transfers, financing, and duplicate representations.'],
          [FileSearch,'Make the reasoning reviewable','Keep source records, calculation inputs, and policy context close to each finding so your team can examine the case.'],
        ].map(([Icon,title,description]) => { const Graphic = Icon as typeof Network; return <article key={String(title)}><Graphic size={27}/><h3>{String(title)}</h3><p>{String(description)}</p></article>; })}</div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.wash}`} id="underwriting-teams" aria-labelledby="teams-title">
      <div className="cp-inner"><div className={styles.sectionHeading}><Eyebrow>BUILT FOR YOUR UNDERWRITING DESK</Eyebrow><h2 id="teams-title">Different deals.<br/><span className="home-heading-gradient">The context each one deserves.</span></h2><p>Explore the questions, relationships, and evidence that matter to your team.</p></div><UnderwritingAudiences/></div>
    </section>

    <section className={styles.section} aria-labelledby="evidence-title">
      <div className={`cp-inner ${styles.storyRow}`}>
        <div className={styles.storyCopy}><Eyebrow>FROM RECORDS TO UNDERSTANDING</Eyebrow><h2 id="evidence-title">Make the evidence<br/><span className="home-heading-gradient">work together.</span></h2><p>Give underwriters a consistent financial view assembled from the agreed sources. Document interpretation and reconciliation become part of the same analysis, with the underlying evidence available for review.</p><div className={styles.featureList}>{[
          ['Know what is in the file.','Establish the evidence window, source coverage, and missing inputs before treating a file as complete.'],
          ['Understand what a transaction represents.','Examine income, operating activity, transfers, financing, and obligations in the context of related records.'],
          ['Keep discrepancies visible.','Surface conflicting values and uncertain matches as review questions, with the source and scope attached.'],
        ].map(([title,body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div><BookingLink className={styles.textLink}>Walk through your evidence workflow<ArrowUpRight size={17}/></BookingLink></div>
        <EvidenceReconciliation/>
      </div>
    </section>

    <section className={`${styles.section} ${styles.scenarioSection}`} aria-labelledby="scenario-title">
      <div className={`cp-inner ${styles.storyRow}`}>
        <div className={styles.storyCopy}><Eyebrow>CAPACITY IN CONTEXT</Eyebrow><h2 id="scenario-title">Understand what<br/><span className="home-heading-gradient">changes the answer.</span></h2><p>A base-case cash-flow figure is one part of the assessment. The assumptions behind it matter just as much: collection timing, income variability, operating costs, and the obligations that still need to be paid.</p><p>This simple business example shows how a change in receipts affects cash available for debt service. Move the slider to inspect the relationship.</p><ul className={styles.plainList}><li><Check size={16}/>Explicit inputs and a consistent period</li><li><Check size={16}/>Calculations your team can inspect</li><li><Check size={16}/>Assumptions separated from observed facts</li></ul><a className={styles.textLink} href="https://docs.amlok.io/research/business-underwriting">Explore the assessment methodology<ArrowUpRight size={17}/></a></div>
        <UnderwritingScenario/>
      </div>
    </section>

    <section className={styles.section} id="underwriting-workflow" aria-labelledby="workflow-title"><div className="cp-inner"><div className={styles.sectionHeading}><Eyebrow>ONE CONNECTED WORKFLOW</Eyebrow><h2 id="workflow-title">From the first record<br/><span className="home-heading-gradient">to the next review.</span></h2><p>Give every stage a clear purpose, a defined scope, and an output the next person can use.</p></div><UnderwritingWorkflow/></div></section>

    <section className={`${styles.section} ${styles.wash}`} aria-labelledby="output-title">
      <div className={`cp-inner ${styles.storyRow}`}>
        <AssessmentPreview/>
        <div className={styles.storyCopy}><Eyebrow>BUILT FOR UNDERWRITER REVIEW</Eyebrow><h2 id="output-title">A clear assessment.<br/><span className="home-heading-gradient">A traceable decision.</span></h2><p>Insights produces the structured findings and underwriting summary or credit memo agreed for your workflow. Your team can examine the result against its own policy, risk appetite, and product requirements.</p><div className={styles.featureList}>{[
          ['Evidence and calculations','Follow an observation back to the records and inputs that support it.'],
          ['Exceptions and open questions','Identify the information that still needs confirmation and the conditions that require judgment.'],
          ['A preserved assessment','Keep the evidence snapshot and original reasoning available for future review.'],
        ].map(([title,body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div><BookingLink className={styles.textLink}>Walk through an underwriting assessment<ArrowUpRight size={17}/></BookingLink></div>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="continuity-title"><div className="cp-inner">
      <div className={styles.continuity}><div><Eyebrow>INSIGHTS + SIGNAL</Eyebrow><h2 id="continuity-title">Keep the context<br/><span className="home-heading-gradient">after the decision.</span></h2><p>The original assessment becomes a starting point for monitoring. AMLOK Signal compares permitted new evidence with that baseline, surfaces changes for review, and preserves the history behind the relationship.</p><a className={styles.textLink} href="/products/portfolio-monitoring">Explore portfolio monitoring<ArrowUpRight size={17}/></a></div><div className={styles.bridge} aria-label="Insights assessment connects to new evidence and a Signal review"><div><FileSearch/><span>Insights</span><strong>Original assessment</strong></div><span className={styles.bridgeConnection} aria-hidden="true"/><div><Activity/><span>Signal</span><strong>Change in context</strong></div><p>Your team decides when and how to act.</p></div></div>
      <div className={styles.integration}><div><Code2 size={26}/><h3>Bring the assessment into your operating model.</h3><p>Start with a defined underwriting use case, agree the sources and outputs, and connect the results to your team’s existing systems.</p></div><div className={styles.integrationActions}><a className={styles.primary} href="https://docs.amlok.io/api-reference/overview">Explore API<ArrowUpRight size={18}/></a><a className={styles.textLink} href="/integrations">Explore integrations<ArrowRight size={16}/></a></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="underwriting-faq"><div className={`cp-inner ${styles.faqGrid}`}><div><Eyebrow>BEFORE YOUR FIRST ASSESSMENT</Eyebrow><h2 id="underwriting-faq">A few questions<br/><span className="home-heading-gradient">worth asking.</span></h2><a className={styles.textLink} href="/pricing">Explore pricing<ArrowUpRight size={17}/></a></div><div className={styles.faq}>{underwritingFaqs.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

    <HomeMonitoringCta/>
  </main>;
}
