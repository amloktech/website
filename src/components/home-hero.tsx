'use client';
import { HomeFaq } from './home-faq';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, ArrowUpRight, Building2, Check, ChevronDown, CircleAlert, Gauge, Globe, Image as ImageIcon, Layers, Play, Search, ShieldCheck, WalletCards, X } from 'lucide-react';
import { HomePricing } from './home-pricing';
import { HomeUseCases } from './home-use-cases';
import { HomeRiskGaps } from './home-risk-gaps';
import { HomeRiskComparison } from './home-risk-comparison';
import { HomeSecurity } from './home-security';
import { SiteHeader } from './site-header';
import { HomeMonitoringCta } from './home-monitoring-cta';
import { ProductModularity } from './product-modularity';
import { ProductPhotography } from './product-photography';
import { ProductIllustration, type IllustrationKind } from './product-illustration';

const capabilityGraphics: IllustrationKind[] = ['financial', 'decision', 'simulation', 'monitoring'];
const featureGraphics: IllustrationKind[] = ['compliance', 'quality', 'builder', 'testing', 'observability', 'support', 'channels', 'data-security', 'white-label'];


const capabilities = [
  { title: 'Financial Intelligence', description: 'Streamline onboarding & KYB, resolve fragmented data, enrich transaction data, and map financial ecosystems.' },
  { title: 'Decision Intelligence', description: 'Automate explainable credit decision workflows using configurable policies, evidence, and institutional risk criteria.' },
  { title: 'Digital Twin Simulation', description: 'Simulate credit policies, portfolio strategies, and economic scenarios against your existing book to understand potential risk, return, and exposure before making changes.' },
  { title: 'Continuous Monitoring', description: 'Detect changing borrower risk before portfolio loss utilizing real-time transaction dynamics, graph intelligence, and behavioral analysis, flagging stackers and drift.' },
];

const platformFeatures = [
  { title: 'Compliance Engine', description: 'Pre-trained on FDCPA, TILA, UDAAP, RESPA, and TCPA. Kastle’s AI agents are specialized for large banks and IMBs, with compliance at their core.' },
  { title: '100% QA Coverage', description: 'Ensure every interaction, whether through AI or humans, is compliant with key lending and servicing regulations. Real time monitoring with automated scorecards.' },
  { title: 'Agent Builder', description: 'Turn SOPs into AI agents using natural language. No more rigid systems that require professional services to build and maintain.', wide: true },
  { title: 'Simulation Testing', description: 'AI Testing AI. Test edge cases before they hit production. Train on real call scenarios. Expand capabilities safely. Launch with confidence.' },
  { title: 'Transparent Observability', description: 'Using proprietary inference technology, all of Kastle’s AI responses are fully explainable with in-built reasoning that also lead to improved performance.' },
  { title: 'Dedicated Support', description: 'Your AI partner for the next decade. Our team works closely with yours to ensure adoption, impact, and long-term success.', wide: true },
  { title: 'True Omnichannel Lending and Servicing', description: 'Kastle provides one centralized AI engine for consumer lending, resolving borrower issues instantly, in every language, and across every channel. Say goodbye to stitched-together call center tools with siloed, disjointed logic.', wide: true },
  { title: 'Data residency, retention, security review', description: 'Align data residency and retention requirements with your institution’s policies. Review security controls and deployment requirements with our team.' },
  { title: 'White-label flow under your own brand', description: 'Deliver a consistent borrower experience under your own brand, with your identity, messaging, and customer relationship at the forefront.' },
];

const productGroups = [
  {
    key: 'verification', action: 'Verify', phase: 'Pre-funding', title: 'Verification & Onboarding',
    lede: 'Establish who the applicant is, whether the business and ownership information are credible, and whether required evidence is complete.', icon: ShieldCheck,
    items: [
      ['Applicant identity', 'Verify the applicant and key principals against reliable identity evidence.'],
      ['Business & ownership', 'Confirm the business is active and map credible ownership and control.'],
      ['Evidence completeness', 'Identify missing, inconsistent, or outdated documents before review.'],
      ['Screening checks', 'Surface relevant watchlist and compliance matches for review.'],
    ],
  },
  {
    key: 'underwriting', action: 'Underwrite', phase: 'Full lifecycle', title: 'Credit Underwriting',
    lede: 'Assess repayment capacity, credit-policy fit, and unresolved risks, and support reassessment as borrower conditions change.', icon: Gauge,
    items: [
      ['Repayment capacity', 'Reconcile financial information and assess the borrower’s ability to repay.'],
      ['Credit-policy fit', 'Compare the full borrower picture with your institution’s policy and criteria.'],
      ['Unresolved risks', 'Highlight gaps, inconsistencies, and risk signals that need human attention.'],
      ['Ongoing reassessment', 'Refresh the assessment as new evidence or borrower conditions change.'],
    ],
  },
  {
    key: 'monitoring', action: 'Monitor', phase: 'Post-funding', title: 'Portfolio Monitoring & Early Warning',
    lede: 'Detect changes in borrower risk relative to the original credit assessment and ongoing requirements.', icon: Activity,
    items: [
      ['Borrower performance', 'Track financial health and repayment behavior against the original assessment.'],
      ['Transaction signals', 'Surface material changes and unusual activity in connected cash flows.'],
      ['Related entities', 'Connect borrower, owner, and transaction relationships as they evolve.'],
      ['Early warning', 'Prioritize emerging risk against ongoing requirements and portfolio exposure.'],
    ],
  },
  {
    key: 'servicing', action: 'Service', phase: 'Post-funding', title: 'Servicing & Collections',
    lede: 'Execute borrower-facing workflows including information requests, account inquiries, payment reminders, and approved repayment or collections processes.', icon: WalletCards,
    items: [
      ['Information requests', 'Request and track borrower information needed to service the account.'],
      ['Account inquiries', 'Respond to account questions with current, consistent account context.'],
      ['Payment reminders', 'Send timely reminders based on payment schedules and account status.'],
      ['Repayment workflows', 'Support approved repayment and collections processes with clear oversight.'],
    ],
  },
  {
    key: 'investigation', action: 'Investigate', phase: 'Full lifecycle', title: 'Fraud & Compliance Operations',
    lede: 'Investigate suspicious activity, screening matches, inconsistent evidence, and related-entity concerns.', icon: CircleAlert,
    items: [
      ['Suspicious activity', 'Bring unusual patterns and behavior changes into an investigator’s view.'],
      ['Screening matches', 'Resolve potential sanctions and compliance matches with supporting evidence.'],
      ['Inconsistent evidence', 'Compare submitted information across documents, sources, and transactions.'],
      ['Related-entity concerns', 'Trace connected parties and relationships that may change the risk picture.'],
    ],
  },
] as const;

const productItemIcons = [ShieldCheck, Layers, Activity, Building2];

function ProductsSection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const groupRefs = useRef<Array<HTMLElement | null>>([]);
  const group = productGroups[activeGroup];

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const current = entries.find(entry => entry.isIntersecting);
      if (!current) return;
      const index = Number((current.target as HTMLElement).dataset.productIndex);
      if (Number.isInteger(index)) setActiveGroup(index);
    }, { rootMargin: '-48% 0px -48% 0px', threshold: 0 });
    groupRefs.current.forEach(element => { if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  const scrollToGroup = (index: number) => {
    setActiveGroup(index);
    groupRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return <section className="home-products" id="products" aria-labelledby="home-products-title">
    <div className="home-products-inner">
      <header className="home-products-heading">
        <div className="home-products-heading-copy">
          <span className="home-products-eyebrow"><i aria-hidden="true" />PRODUCTS</span>
          <h2 id="home-products-title"><span className="home-products-title-line">Building blocks for <span className="home-heading-gradient">risk intelligence</span></span><span className="home-products-title-line">across the <span className="home-heading-gradient">credit lifecycle</span></span></h2>
        </div>
        <ProductModularity />
      </header>
      <div className="home-products-layout">
        <div className="home-products-sticky">
          <div className="home-products-sticky-art"><ProductPhotography kind={group.key} step={selectedItems[group.key] ?? 0} /></div>
        </div>
        <div className="home-products-list">
          {productGroups.map((item, groupIndex) => {
            const Icon = item.icon;
            const selected = selectedItems[item.key] ?? 0;
            return <article id={`product-${item.key}`} className={`home-products-group${groupIndex === activeGroup ? ' is-active' : ''}`} key={item.key} data-product-index={groupIndex} ref={element => { groupRefs.current[groupIndex] = element; }}>
              <div className="home-products-mobile-art"><div className="home-products-art is-compact"><ProductIllustration kind={item.key} step={selected}/></div></div>
              <div className="home-products-group-meta">
                <span className="home-products-group-label"><span><Icon size={16} aria-hidden="true" /></span>{item.action}</span>
                <span className="home-products-group-phase">{item.phase}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="home-products-lede">{item.lede}</p>
              <div className="home-products-items">
                {item.items.map(([label, description], itemIndex) => {
                  const ItemIcon = productItemIcons[(itemIndex + item.key.length) % productItemIcons.length];
                  const isActive = groupIndex === activeGroup && selected === itemIndex;
                  return <button className={`home-products-item${isActive ? ' is-active' : ''}`} type="button" key={label} aria-current={isActive ? 'true' : undefined} aria-expanded={isActive} onClick={() => {
                    setSelectedItems(previous => ({ ...previous, [item.key]: itemIndex }));
                    if (groupIndex !== activeGroup) scrollToGroup(groupIndex);
                    else setActiveGroup(groupIndex);
                  }}>
                    <span className="home-products-item-title"><ItemIcon size={16} aria-hidden="true" /><strong>{label}</strong></span>
                    <span className="home-products-item-copy">{description}</span>
                  </button>;
                })}
              </div>
            </article>;
          })}
        </div>
      </div>
    </div>
  </section>;
}

const customerLayers = [
  { label: 'Verification & onboarding', title: 'Verification & Onboarding', phase: 'PRE-FUNDING', description: 'Establishes who the applicant is, whether the business and ownership information are credible, and whether the required evidence is complete.' },
  { label: 'Credit underwriting', title: 'Credit Underwriting', phase: 'FULL LIFECYCLE', description: 'Turns borrower information into an assessment of repayment capacity, credit-policy fit, and unresolved risks.' },
  { label: 'Portfolio monitoring & early warning', title: 'Portfolio Monitoring & Early Warning', phase: 'POST-FUNDING', description: 'Detects how borrower risk changes after funding relative to the original assessment and ongoing requirements.' },
  { label: 'Servicing & collections', title: 'Servicing & Collections', phase: 'POST-FUNDING', description: 'Completes borrower-facing work: information requests, account inquiries, payment reminders, and approved repayment or collections workflows.' },
  { label: 'Fraud & compliance operations', title: 'Fraud & Compliance Operations', phase: 'FULL LIFECYCLE', description: 'Investigates suspicious activity, screening matches, inconsistent evidence, and related-entity concerns.' },
] as const;

function CustomerLayersSection() {
  const [activeLayer, setActiveLayer] = useState(-1);
  const active = activeLayer < 0 ? null : customerLayers[activeLayer];

  return <section className="home-customer-layers" id="customer-layers" aria-labelledby="customer-layers-title">
    <div className="home-customer-layers-inner">
      <header className="home-customer-layers-heading">
        <span className="home-products-eyebrow"><i aria-hidden="true" />BUILT AROUND YOUR CUSTOMER</span>
        <h2 id="customer-layers-title">You own the <span className="home-heading-gradient">customer relationship.</span><br />We run the <span className="home-heading-gradient">layers underneath.</span></h2>
        <p>Your institution stays in control of the customer and every final decision.<br />AMLOK strengthens the intelligence and operations across the full credit lifecycle.</p>
      </header>
      <div className="home-products-layer-layout">
        <div className="home-products-stack" aria-label="Customer and credit lifecycle layers">
          <button className={`home-products-top-layer${activeLayer < 0 ? ' is-active' : ''}`} type="button" aria-pressed={activeLayer < 0} onClick={() => setActiveLayer(-1)} onMouseEnter={() => setActiveLayer(-1)}>
            <span className="home-products-customer-label"><i aria-hidden="true" />CUSTOMER</span>
            <strong>Your customer relationship</strong>
            <span className="home-products-customer-sub">Your brand · Your policies · Your decision</span>
          </button>
          <div className="home-products-stack-label"><i aria-hidden="true" />AMLOK · RISK INTELLIGENCE INFRASTRUCTURE</div>
          <div className="home-products-stack-layers">
            {customerLayers.map((layer, index) => <button key={layer.label} className={`home-products-layer${activeLayer === index ? ' is-active' : ''}`} type="button" aria-pressed={activeLayer === index} onClick={() => setActiveLayer(index)} onMouseEnter={() => setActiveLayer(index)} onFocus={() => setActiveLayer(index)}>
              <span className="home-products-layer-face" aria-hidden="true"><i /></span>
              <span className="home-products-layer-body"><span className="home-products-layer-index">0{index + 1}</span><strong>{layer.label}</strong></span>
              <span className="home-products-layer-phase">{layer.phase}</span>
            </button>)}
          </div>
        </div>
        <div className="home-products-layer-detail" aria-live="polite" aria-atomic="true">
          <div className="home-products-layer-detail-image">
            <ProductIllustration kind={activeLayer < 0 ? 'customer' : productGroups[activeLayer].key} format="detail"/>
          </div>
          {active ? <>
            <h3>{active.title}</h3>
            <p key={activeLayer}>{active.description}</p>
          </> : <>
            <h3>Your customer relationship</h3>
            <p>Your institution owns the customer relationship, brand, and final credit decision. AMLOK works behind the scenes to strengthen the intelligence your team brings to every interaction.</p>
          </>}
        </div>
      </div>
    </div>
  </section>;
}

const loanScaleSlides = [
  {
    surface: 'BROWSER AGENTS',
    title: 'Work directly in the systems you already use.',
    description: 'No integration required. Train AMLOK agents to work directly in your existing systems, navigating applications and executing your financial risk workflows alongside your team.',
    graphic: 'browser',
  },
  {
    surface: 'DIGITAL TWIN SIMULATOR',
    title: 'Test decisions before putting capital at risk.',
    description: 'Simulate changes before putting capital at risk. Test credit policies, portfolio strategies, and economic scenarios against a digital twin of your existing book to understand potential outcomes before deployment.',
    graphic: 'simulation',
  },
  {
    surface: 'EMBEDDINGS',
    title: 'Connect borrower experiences to AMLOK intelligence.',
    description: 'Deploy ready-made borrower and underwriter experiences for intake, onboarding, underwriting, and ongoing servicing, all connected to AMLOK intelligence and agents.',
    graphic: 'embedded',
  },
  {
    surface: 'WORKFLOW AGENTS',
    title: 'Deploy agents for specialized financial risk work.',
    description: 'Pre-built agents for specialized financial risk work. Deploy configurable workflows for verification, underwriting, portfolio monitoring, fraud and compliance, servicing, and collections, adapted to your institution’s policies and processes.',
    graphic: 'workflow',
  },
  {
    surface: 'API',
    title: 'Bring AMLOK intelligence into your products.',
    description: 'Bring AMLOK intelligence directly into your existing products and systems. Access entity and transaction intelligence, risk signals, financial analysis, monitoring, and agent capabilities through a unified API.',
    graphic: 'api',
  },
] as const;

function LoanScaleSection() {
  return <section className="home-loan-scale" id="loan-scale" aria-labelledby="loan-scale-title">
    <div className="home-loan-scale-inner">
      <header className="home-loan-scale-intro">
        <span className="home-loan-scale-eyebrow">AI-POWERED CREDIT LIFECYCLE</span>
        <h2 id="loan-scale-title">AI that lets you scale loan volume, engage more customers, and lower risk.</h2>
        <p>AMLOK gives financial institutions the intelligence and tools to strengthen decisions across the full credit lifecycle—from verification and underwriting to monitoring, simulation, and servicing. Your team owns the final decision.</p>
      </header>

      <div className="home-lifecycle-rows">
        {loanScaleSlides.map((slide, index) => <article
          className={`home-lifecycle-row${index % 2 === 1 ? ' is-reversed' : ''}`}
          id={`loan-scale-slide-${index}`}
          aria-labelledby={`home-lifecycle-title-${index}`}
          key={slide.graphic}
        >
          <div className="home-lifecycle-copy">
            <span className="home-lifecycle-label">{slide.surface}</span>
            <h3 id={`home-lifecycle-title-${index}`}>{slide.title}</h3>
            <p>{slide.description}</p>
          </div>
          <div className="home-lifecycle-visual home-loan-scale-art">
            <ProductIllustration kind={slide.graphic}/>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

function FeaturesIntegrationsSection() {
  const renderFeature = (index:number) => {
    const feature = platformFeatures[index];
    return <article className="home-features-card" data-feature={featureGraphics[index]} key={feature.title}>
      <div className="home-features-media"><ProductIllustration kind={featureGraphics[index]}/></div>
      <div className="home-features-card-copy"><h3>{feature.title === 'True Omnichannel Lending and Servicing' ? <>True Omnichannel <span className="home-mobile-title-line">Lending and Servicing</span></> : feature.title === 'White-label flow under your own brand' ? <>White-label flow <span className="home-mobile-title-line">under your own brand</span></> : feature.title}</h3><p>{feature.description}</p></div>
    </article>;
  };
  return <section className="home-features" id="features-integrations" aria-labelledby="home-features-title">
    <div className="home-features-inner">
      <header className="home-features-heading">
        <span className="home-features-eyebrow"><i aria-hidden="true" />FEATURES &amp; INTEGRATIONS</span>
        <div className="home-features-heading-copy">
          <h2 id="home-features-title"><span className="home-heading-gradient">Enterprise-grade</span><br />platform for large lenders</h2>
          <p>Amlok is built on how the best lenders work: streamlined operations, clean data at every step, and a customer experience worth defending.</p>
        </div>
      </header>
      <div className="home-features-grid">
        {[[0,1,7],[2,3,8],[5,6,4]].map((column,index)=><div className="home-features-column" key={index}>{column.map(renderFeature)}</div>)}
      </div>
    </div>
  </section>;
}

const caseStudyCategories = ['All cases', 'Banks', 'Credit unions', 'Alternative lenders', 'Fintech'] as const;
type CaseStudyCategory = (typeof caseStudyCategories)[number];
const caseStudyPlaceholders: { name: string; category: Exclude<CaseStudyCategory, 'All cases'> }[] = [
  { name: 'Major Canadian bank', category: 'Banks' },
  { name: 'Canadian credit union', category: 'Credit unions' },
  { name: 'Canadian alternative lender', category: 'Alternative lenders' },
  { name: 'Canadian fintech', category: 'Fintech' },
];

function CaseStudiesSection() {
  const [category, setCategory] = useState<CaseStudyCategory>('All cases');
  const [query, setQuery] = useState('');
  const visibleCases = useMemo(() => caseStudyPlaceholders.filter(item => {
    const matchesCategory = category === 'All cases' || item.category === category;
    const matchesQuery = `${item.name} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return <section className="home-case-studies" id="case-studies" aria-labelledby="case-studies-title">
    <div className="home-case-studies-inner">
      <header className="home-case-studies-heading">
        <span className="home-products-eyebrow"><i aria-hidden="true" />RESEARCH &amp; CASE STUDIES</span>
        <h2 id="case-studies-title">Risk problems, re-examined.</h2>
        <p>We’re developing retrospective case studies of publicly documented risk challenges across Canadian banks, credit unions, alternative lenders, and fintechs. Each analysis will use validated public sources to map the problem, the signals available at the time, and how AMLOK intelligence could have supported a better-informed response.</p>
      </header>

      <div className="home-case-studies-toolbar">
        <div className="home-case-studies-categories" aria-label="Filter case studies by institution type">
          {caseStudyCategories.map(item => <button key={item} type="button" className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <label className="home-case-studies-search">
          <Search size={17} aria-hidden="true" />
          <input type="search" aria-label="Search institutions" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search institutions…" />
        </label>
      </div>

      <div className="home-case-studies-grid" aria-live="polite">
        {visibleCases.map((item, index) => <article className="home-case-study-card" key={item.name}>
          <div className="home-case-study-logo" role="img" aria-label={`${item.category} logo placeholder`}><ImageIcon size={23} aria-hidden="true" /><span>Logo placeholder</span></div>
          <div className="home-case-study-meta"><span>{item.category}</span><span>CANADA</span></div>
          <h3>{item.name}</h3>
          <p>Retrospective case study · In development</p>
          <span className="home-case-study-signal" aria-hidden="true"><i style={{ '--case-delay': `${index * 45}ms` } as React.CSSProperties} /></span>
        </article>)}
        {visibleCases.length === 0 && <p className="home-case-studies-empty">No institution placeholders match that search. Try another term or category.</p>}
      </div>
    </div>
  </section>;
}

export function HomeHero() {
  return <main className="home-page" id="top">
    <SiteHeader isHome />

    <section className="home-hero is-content-only" aria-labelledby="home-title">
      <div className="home-atmosphere" aria-hidden="true"><div className="home-monitoring-wash" /></div>
      <div className="home-copy">
        <span className="home-kicker"><span />RISK IS A MOVIE, NOT A PHOTO</span>
        <h1 id="home-title"><span className="home-headline">Infrastructure for<br />risk intelligence</span></h1>
        <p className="home-description"><span className="home-description-line">We <strong>make risk move at the speed of capital</strong> by deploying <strong>specialized AI agents that work across the credit lifecycle:</strong></span>{' '}<span className="home-description-line">underwriting opportunities, monitoring deployed capital, simulating portfolio decisions, and acting as risk changes.</span></p>
        <div className="home-partners" aria-label="Partnering with">
          <span className="home-partners-label">PARTNERING WITH</span>
          <div className="home-partner-logos">
            <img className="home-partner-logo home-partner-cla" src="https://amlok.io/logos/cla-lenders.svg" alt="Canadian Lenders Association" />
            <img className="home-partner-logo home-partner-nvidia" src="https://amlok.io/logos/nvidia-inception.svg" alt="NVIDIA Inception Program" />
          </div>
        </div>
        <div className="home-hero-actions">
          <a className="home-hero-button home-hero-button-primary" href="#platform">See how it works <ArrowUpRight size={18} strokeWidth={1.8} /></a>
          <a className="home-hero-button home-hero-button-secondary" href="#platform">Talk to us <ArrowUpRight size={18} strokeWidth={1.8} /></a>
        </div>
      </div>

      {/* Temporarily hidden; retain the video block for restoration. */}
      {/* <figure className="home-hero-video" aria-label="AMLOK overview video placeholder">
        <figcaption className="home-hero-video-content">
          <span className="home-hero-video-play" aria-hidden="true"><Play size={28} fill="currentColor" strokeWidth={1.5}/></span>
          <span className="home-hero-video-label">Video placeholder</span>
        </figcaption>
      </figure> */}
      <div className="home-hero-validation" aria-label="Retrospective model validation">
        <div className="home-hero-validation-heading">
          <p>Models retrospectively validated on 275,019 deals from</p>
          <a className="home-validation-research" href="/research">Research results <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="home-validation-logos">
          <span className="home-validation-td-bank" role="img" aria-label="TD Bank"><img className="home-validation-td" src="https://www.td.com/content/dam/tdb/images/navigation-header-and-footer/td-logo-desktop.png" alt="" aria-hidden="true"/><span aria-hidden="true">Bank</span></span>
          <img src="https://us.cibc.com/content/dam/global-assets/logos/cibc-logos/no-tagline/cibc-logo-colour-142x36.svg" alt="CIBC" />
          <img src="/vancity-logo.svg" alt="Vancity" />
          <img src="/atb-logo.svg" alt="ATB" />
          <img src="/laurentian-bank-white.svg" alt="Laurentian Bank" />
          <img src="https://www.trezcapital.com/wp-content/themes/trezcapital/img/trez-logo.svg" alt="Trez Capital" />
          <img src="https://www.desjardins.com/content/dam/images/logos/commun/logo-desjardins-en.svg" alt="Desjardins" />
          <img src="https://www.canadadrives.ca/img/logo/cd-logo-black2x.png" alt="Canada Drives" />
          <img src="https://images.ctfassets.net/fh625txf4dd5/tKuZ2ppr4fF5b5MT2YWfZ/a2cb4fc1d68cf44a1f6553b9b2ad9dc6/goeasy-logo.svg" alt="goeasy" />
          <img src="https://cdn.prod.website-files.com/65fde10e62e6a7603e9221cc/660190120ed591c2ca6658f4_clearco-logo-black.webp" alt="Clearco" />
          <img src="https://www.romspen.com/wp-content/themes/romspen/dist/assets/img/romspen-logo-color.svg" alt="Romspen" />
          <img src="https://www.lendefied.com/wp-content/uploads/2024/01/Lendefied.gif" alt="Lendefied" />
        </div>
      </div>
    </section>

    <section className="home-risk-operations" id="risk-operations" aria-labelledby="risk-operations-title">
      <div className="home-risk-operations-inner">
        <h2 id="risk-operations-title"><span className="home-heading-gradient">Risk operations</span> at the speed of <span className="home-heading-gradient">capital</span></h2>
        <div className="home-risk-operations-grid">
          <article className="home-risk-operations-card fraud-ops-card">
            <div className="home-risk-operations-copy">
              <span className="home-risk-operations-type"><i aria-hidden="true"/>PRODUCT</span>
              <h3>Deal Underwriting</h3>
              <p>AI agents read borrower files, reconcile financials, and surface policy-aligned risk signals so credit teams can move faster and more consistently. Your team owns the final decision.</p>
              <a href="#platform">Learn more <ArrowUpRight size={18} aria-hidden="true"/></a>
            </div>
            <div className="home-risk-operations-visual">
              <div className="home-risk-operations-graphic"><ProductIllustration kind="underwriting" format="portrait" brandFill="hero"/></div>
            </div>
          </article>

          <article className="home-risk-operations-card aml-ops-card">
            <div className="home-risk-operations-copy">
              <span className="home-risk-operations-type"><i aria-hidden="true"/>PRODUCT</span>
              <h3>Portfolio monitoring</h3>
              <p>Continuously monitor borrowers, transactions, and connected entities after funding. Surface emerging risk and changing repayment behavior early, so teams can act before it affects the portfolio.</p>
              <a href="#platform">Learn more <ArrowUpRight size={18} aria-hidden="true"/></a>
            </div>
            <div className="home-risk-operations-visual">
              <div className="home-risk-operations-graphic"><ProductIllustration kind="monitoring" format="portrait" brandFill="hero"/></div>
            </div>
          </article>

          <article className="home-risk-operations-card whitepaper-card">
            <div className="home-risk-operations-copy">
              <span className="home-risk-operations-type"><i aria-hidden="true"/>RESEARCH</span>
              <h3>Building a foundational risk graph</h3>
              <p>We’re building a risk intelligence AI model to remove intelligence as a bottleneck to deploying capital. By connecting borrowers, transactions, and related entities, it will help institutions see how risk moves across a portfolio over time.</p>
              <a href="#platform">Learn more <ArrowUpRight size={18} aria-hidden="true"/></a>
            </div>
            <div className="home-risk-operations-visual whitepaper-image-area">
              <div className="home-risk-operations-graphic"><ProductIllustration kind="graph" brandFill="hero"/></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <HomeRiskGaps />

    <section className="home-platform-section" id="platform" aria-labelledby="home-platform-title">
      <div className="home-platform-inner">
        <div className="home-platform-intro">
          <span className="home-platform-eyebrow"><i aria-hidden="true" />HOW WE CLOSE THE GAP</span>
          <h2 id="home-platform-title"><span>One platform.</span><span>Assess, decide, simulate, and monitor.</span></h2>
          <p>Connect the full financial picture across borrowers, transactions, and portfolios to uncover relationships, surface risk as it changes, and equip your team to make clearer, faster decisions throughout the credit lifecycle.</p>
          <div className="home-platform-actions">
            <a className="home-platform-signup" href="#platform">Sign up</a>
            <a className="home-platform-contact" href="#platform">Talk to us <ArrowUpRight size={18} strokeWidth={1.8} /></a>
          </div>
        </div>
        <div className="home-capability-grid">
          {capabilities.map((capability, index) => <article className="home-capability-card" key={capability.title}>
            <div className="home-capability-media">
              <ProductIllustration kind={capabilityGraphics[index]} format="compact"/>
            </div>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <ProductsSection />
    <HomeUseCases />
    <CustomerLayersSection />
    <HomeRiskComparison />
    <LoanScaleSection />
    <HomeSecurity />
    <FeaturesIntegrationsSection />
    <HomePricing />
    <HomeFaq />
    <HomeMonitoringCta />
    {/* Temporarily hidden; keep the section available to restore. */}
    {/* <CaseStudiesSection /> */}
  </main>;
}
