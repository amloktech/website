import type { Metadata } from 'next';
import Image from 'next/image';
import { Compass, Network } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { ProductIllustration } from '@/components/product-illustration';
import { AboutTimeline } from '@/components/about-timeline';
import { HomeMonitoringCta } from '@/components/home-monitoring-cta';
import './about-us.css';

export const metadata: Metadata = {
  alternates: { canonical: '/about-us' },
  title:'About us — AMLOK',
  description:'Risk is a movie, not a picture. Meet the team building connected risk intelligence across the credit lifecycle, and explore AMLOK’s mission and vision.',
};

export default function AboutUsPage() {
  return <main className="home-page about-page" id="top">
    <SiteHeader />
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-inner">
        <span className="home-products-eyebrow"><i aria-hidden="true" />ABOUT AMLOK</span>
        <div className="about-intro">
          <h1 id="about-title">Risk is a movie,<br /><span className="home-heading-gradient">not a picture.</span></h1>
          <p>Financial lives keep moving. We’re building the intelligence to understand the whole story, and how it changes over time.</p>
        </div>
        <figure className="about-team">
          <div className="about-team-photo"><Image src="/images/amlok-team-updated.jpg" unoptimized alt="The five-person AMLOK team together in a shared workspace." width={1029} height={778} sizes="(max-width: 767px) 100vw, 1280px" priority /><div className="about-photo-frame" aria-hidden="true"><i /><i /></div></div>
          {/* Photo attribution retained for the future terms page: <figcaption><span>The team behind AMLOK</span><span>Photo: AMLOK</span></figcaption> */}
        </figure>
      </div>
    </section>
    <section className="about-company" aria-labelledby="about-company-title">
      <div className="about-inner about-company-grid">
        <div className="about-company-heading"><span className="home-products-eyebrow"><i aria-hidden="true" />WHY WE’RE BUILDING</span><h2 id="about-company-title">A connected view.<br /><span className="home-heading-gradient">A clearer decision.</span></h2>
          <div className="about-company-copy"><p>AMLOK is building risk intelligence infrastructure for lenders and financial institutions. We connect entities, transactions, and relationships so teams can understand borrowers in the context of the wider financial ecosystem.</p><p>A single application or statement captures a moment. Income changes, obligations evolve, and new relationships emerge. Our platform brings financial evidence and ongoing signals together across verification, underwriting, monitoring, and servicing.</p><p>We help teams see how risk moves, trace the evidence behind an assessment, and apply their own policies consistently. The institution stays in control of the customer relationship and every final decision.</p></div>
        </div>
        <figure className="about-ecosystem-graphic"><ProductIllustration kind="graph"/><figcaption>Entities, transactions, and relationships. One connected financial ecosystem.</figcaption></figure>
      </div>
    </section>
    <section className="about-purpose" aria-labelledby="about-purpose-title">
      <div className="about-inner">
      <header className="about-purpose-heading"><span className="home-products-eyebrow"><i aria-hidden="true" />OUR PURPOSE</span><h2 id="about-purpose-title">What <span className="home-heading-gradient">guides us.</span></h2></header>
      <div className="about-purpose-grid">
        <article><span className="about-purpose-icon"><Network size={27} aria-hidden="true" /></span><h2>Our mission</h2><p>Map the financial ecosystem and turn its entities, transactions, and relationships into actionable risk intelligence.</p></article>
        <article><span className="about-purpose-icon"><Compass size={27} aria-hidden="true" /></span><h2>Our vision</h2><p>A financial ecosystem where understanding risk is never the bottleneck to deploying capital.</p></article>
      </div>
      </div>
    </section>
    <AboutTimeline />
    <HomeMonitoringCta apiHref="/#loan-scale-slide-4" />
  </main>;
}
