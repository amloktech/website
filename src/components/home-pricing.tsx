import { Activity, ArrowRight, Bot, ChartNoAxesCombined, CreditCard, Database, FileCheck2, FileText, Headphones, Layers, Palette, RefreshCw, Scale, SlidersHorizontal, WalletCards } from 'lucide-react';

const docs = 'https://docs.amlok.io';

// Enterprise billing model: /pricing/overview and /pricing/contract-terms.
// Monthly minimum and annual prepayment apply to Enterprise only (user clarification, 2026-10-28).
// Website starting rates confirmed by the user on 2026-10-28.
// Enterprise legal, data, Slack support, and 99.99% SLA copy confirmed by the user on 2026-10-28.
const usageFeatures = [
  { icon: FileCheck2, text: <><strong>AMLOK Insights</strong> from CAD 8 per underwriting</> },
  { icon: Activity, text: <><strong>AMLOK Signal</strong> from CAD 5 per active account / month</> },
  { icon: Palette, text: <>White-label flow under your own brand</> },
  { icon: WalletCards, text: <>One shared credit balance across all products</> },
  { icon: RefreshCw, text: <>Change-driven reassessment included with Signal</> },
  { icon: Layers, text: <>Unused credits roll over while your account is active</> },
  { icon: CreditCard, text: <>Portal billing, payment methods, and automatic top-ups</> },
  { icon: Bot, text: <><strong>AI support</strong>: AI agent in client portal, docs, and email.</> },
];

const enterpriseFeatures = [
  { icon: ChartNoAxesCombined, text: <>Negotiated unit rates and volume discounts</> },
  { icon: SlidersHorizontal, text: <>Agreed workload limits and complexity tiers</> },
  { icon: FileText, text: <>A monthly commitment tailored to expected usage</> },
  { icon: RefreshCw, text: <>Annual reviews of usage, growth, and pricing</> },
  { icon: Scale, text: <>Custom legal terms and a 99.99% uptime SLA</> },
  { icon: Database, text: <>Data residency, retention, security review</> },
  { icon: Headphones, text: <span className="home-pricing-support"><strong>Priority human support</strong> 24/7 shared <span className="home-pricing-slack"><img src="/brand/slack-mark.svg" width="18" height="18" alt="" />Slack</span> channel,<br />dedicated forward deployed engineer.</span> },
];

export function HomePricing() {
  return <section className="home-pricing" id="pricing" aria-labelledby="home-pricing-title">
    <div className="home-pricing-inner">
      <header className="home-pricing-heading">
        <span className="home-pricing-eyebrow"><i aria-hidden="true" />TWO PLANS. ONE SHARED BALANCE.</span>
        <h2 id="home-pricing-title">Pay as you go. <span className="home-pricing-title-scale home-heading-gradient">Scale to Enterprise.</span></h2>
        <p>One credit balance for underwriting and portfolio monitoring. Start with published usage rates, or agree custom pricing for your volume and workflows.</p>
      </header>

      <div className="home-pricing-grid">
        <article className="home-pricing-card is-featured" aria-labelledby="pricing-usage-title">
          <span className="home-pricing-badge">USAGE-BASED</span>
          <h3 id="pricing-usage-title">Pay as you go</h3>
          <div className="home-pricing-price"><strong><span>From CAD</span> 13</strong><span>UNDERWRITING + MONITORING / MONTH</span></div>
          <p className="home-pricing-billing">Add credits as needed and pay for the underwriting and portfolio monitoring you use.</p>
          <div className="home-pricing-features">
            <h4>One wallet. Usage-based rates.</h4>
            <ul>{usageFeatures.map(({ icon: Icon, text }, index) => <li key={index}><Icon size={20} aria-hidden="true" /><span>{text}</span></li>)}</ul>
          </div>
          <div className="home-pricing-actions">
            <a className="home-pricing-details" href={`${docs}/pricing/overview`}>See all product rates <ArrowRight size={17} aria-hidden="true" /></a>
            <a className="home-pricing-cta" href="/get-started">Get started</a>
          </div>
        </article>

        <article className="home-pricing-card" aria-labelledby="pricing-enterprise-title">
          <h3 id="pricing-enterprise-title">Enterprise</h3>
          <div className="home-pricing-price"><strong>Custom</strong><span>TAILORED AGREEMENT</span></div>
          <p className="home-pricing-billing"><strong>Everything in Pay as you go</strong> with a comprehensive package of Enterprise ready benefits.</p>
          <div className="home-pricing-features">
            <h4>The same shared wallet, tailored to your scale.</h4>
            <ul>{enterpriseFeatures.map(({ icon: Icon, text }, index) => <li key={index}><Icon size={20} aria-hidden="true" /><span>{text}</span></li>)}</ul>
          </div>
          <div className="home-pricing-actions">
            <a className="home-pricing-details" href={`${docs}/pricing/contract-terms`}>Explore agreement terms <ArrowRight size={17} aria-hidden="true" /></a>
            <a className="home-pricing-cta" href="/contact">Talk to us</a>
          </div>
        </article>
      </div>

      <p className="home-pricing-note">All rates are in CAD. Unit rates vary by workload complexity. Volume discounts apply automatically as usage grows - no negotiation, no sales call.</p>
    </div>
  </section>;
}
