'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Mark } from './ui';

// Keep each claim tied to its original population and reporting period.
const riskGaps = [
  {
    id: 'visibility', title: 'Visibility', stat: '52%', summary: 'Micro-businesses required to give a personal guarantee.',
    detail: 'In CFIB’s 2022 financing data, 52% of micro-businesses had to provide a personal guarantee to get approved. A business deserves to be understood beyond its collateral.',
    source: 'CFIB · 2022 financing data',
    href: 'https://www.cfib-fcei.ca/en/media/more-small-businesses-needed-financing-over-the-last-decade-but-collateral-requirements-and-interest-rates-make-it-harder-and-more-expensive',
  },
  {
    id: 'veracity', title: 'Veracity', stat: '31%', summary: 'Year-over-year rise in first-party fraud rates.',
    detail: 'First-party fraud rates in Canada rose 31% from Q4 2024 to Q4 2025. Applicants using real identities can still misrepresent their financial position. Identity alone is not the full story.',
    source: 'Equifax Canada · Q4 2025',
    href: 'https://www.globenewswire.com/news-release/2026/04/15/3274231/0/en/first-party-fraud-rises-amidst-economic-pressures.html',
  },
  {
    id: 'velocity', title: 'Velocity', stat: '50%', summary: 'Less decision time with automated credit preparation.',
    detail: 'McKinsey reports that automating credit-paper preparation typically cuts SME lending decision time by 50%. Less time assembling information means more time assessing the business.',
    source: 'McKinsey & Company · May 2022',
    href: 'https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/how-banks-can-reimagine-lending-to-small-and-medium-size-enterprises',
  },
  {
    id: 'vigilance', title: 'Vigilance', stat: '286K+', summary: 'Canadian businesses missed a credit payment.',
    detail: 'More than 286,000 Canadian businesses missed at least one credit payment in Q2 2025. An assessment at origination cannot tell you everything about a borrower’s position today.',
    source: 'Equifax Canada · Q2 2025',
    href: 'https://www.globenewswire.com/news-release/2025/09/16/3150588/0/en/small-businesses-face-pressure-as-delinquencies-remain-elevated-and-uncertainty-continues-in-trade-relations.html',
  },
] as const;

const consumerRiskGaps = [
  {
    id: 'personal', title: 'Personal credit', stat: '1.4M+', summary: 'Canadians missed a credit payment in Q1 2025.',
    detail: 'Equifax counted more than 1.4 million consumers who missed at least one payment across credit products in Q1 2025. Personal lending needs a view of the borrower’s whole budget, including commitments beyond the application.',
    source: 'Equifax Canada · Q1 2025',
    href: 'https://www.globenewswire.com/news-release/2025/05/27/3088428/0/en/Non-Mortgage-Delinquencies-Reach-Levels-Not-Seen-Since-2009.html',
  },
  {
    id: 'auto', title: 'Auto finance', stat: '15.3%', summary: 'Year-over-year rise in auto-loan delinquency rates.',
    detail: 'Canada’s overall auto-loan delinquency rate reached 1.08% in Q1 2025, up 15.3% from a year earlier. The vehicle is only part of the assessment; changing income and other payments shape affordability over the life of the loan.',
    source: 'Equifax Canada · Q1 2025',
    href: 'https://www.globenewswire.com/news-release/2025/05/27/3088428/0/en/Non-Mortgage-Delinquencies-Reach-Levels-Not-Seen-Since-2009.html',
  },
  {
    id: 'mortgages', title: 'Mortgages', stat: '~15%', summary: 'Projected payment increase for a five-year renewal cohort.',
    detail: 'The Bank of Canada’s 2026 report projects an average payment rise of about 15% for the remaining pandemic-era, five-year fixed-payment mortgages renewing over the following 12 months. Most borrowers are expected to manage it, but individual income and obligations still matter.',
    source: 'Bank of Canada · Financial Stability Report 2026',
    href: 'https://www.bankofcanada.ca/publications/financial-stability-report/financial-stability-report-2026/households/',
  },
  {
    id: 'education', title: 'Student financing', stat: '51%', summary: '2020 bachelor’s graduates left school with student debt.',
    detail: 'Statistics Canada reports that 51% of the class of 2020 in its bachelor’s category owed education debt at graduation. The table excludes graduates who pursued further study before the 2023 interview. Repayment planning needs to account for the transition from study to work.',
    source: 'Statistics Canada · Class of 2020, published 2024',
    href: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710003601',
  },
  {
    id: 'rent', title: 'Rent payments', stat: '33.7%', summary: 'Renter households spent 30% or more of income on housing.',
    detail: 'In the 2024 Canadian Housing Survey, 33.7% of renter households spent at least 30% of their before-tax income on shelter, including rent and utilities. Understanding payment capacity means seeing housing costs alongside credit commitments and changes in earnings.',
    source: 'Statistics Canada · 2024 housing data, published 2026',
    href: 'https://www150.statcan.gc.ca/n1/daily-quotidien/260921/dq260921a-eng.htm',
  },
] as const;

type RiskGap = { id: string; title: string; stat: string; summary: string; detail: string; source: string; href: string };

function RiskGapAccordion({ gaps, prefix }: { gaps: readonly RiskGap[]; prefix: string }) {
  const [activeGap, setActiveGap] = useState<string | null>(gaps[0].id);

  return <div className="home-risk-gaps-accordion">
    {gaps.map(gap => {
      const isOpen = activeGap === gap.id;
      const id = `${prefix}-${gap.id}`;
      return <div className="home-risk-gap" key={gap.id} data-open={isOpen}>
        <h3>
          <button id={`${id}-trigger`} type="button" aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={() => setActiveGap(isOpen ? null : gap.id)}>
            <span className="home-risk-gap-stat">{gap.stat}</span>
            <span className="home-risk-gap-label"><strong>{gap.title}</strong><span>{gap.summary}</span></span>
            <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </h3>
        <div className="home-risk-gap-panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`} hidden={!isOpen}>
          <p>{gap.detail}</p>
          <a href={gap.href} target="_blank" rel="noopener noreferrer">{gap.source}<ArrowUpRight size={14} aria-hidden="true" /><span className="home-risk-gaps-sr"> (opens in a new tab)</span></a>
        </div>
      </div>;
    })}
  </div>;
}

export function HomeRiskGaps() {
  return <section className="home-risk-gaps" id="risk-gaps" aria-labelledby="risk-gaps-title">
    <div className="home-risk-gaps-inner">
      <div className="home-risk-gaps-content">
        <p className="home-risk-gaps-eyebrow"><i aria-hidden="true" />THE RISK GAP</p>
        <h2 id="risk-gaps-title">Risk assessment<br />has blind spots.</h2>
        <p className="home-risk-gaps-intro">Business risk evolves continuously. Too often, the infrastructure assessing it is built around snapshots.</p>

        <RiskGapAccordion gaps={riskGaps} prefix="risk-gap" />
      </div>

      <figure className="home-risk-gaps-figure">
        <div className="home-risk-gaps-photo">
          <Image src="/images/small-business-barista.avif" alt="Overhead view of a barista in a pale-blue shirt pouring milk into coffee beside a white counter and stainless-steel espresso machine." fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1023px) 48vw, (max-width: 1375px) 45vw, 608px" />
          <div className="home-risk-gaps-photo-frame" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="home-risk-gaps-photo-note">
            <div className="home-risk-gaps-photo-note-label"><Mark /><span>BEHIND EVERY ASSESSMENT</span></div>
            <p>A real business.<br />A story still unfolding.</p>
            <div className="home-risk-gaps-signal" aria-hidden="true"><i /><span /><i /><span /><i /></div>
          </div>
        </div>
        {/* Photo attribution retained for the future terms page: <figcaption><span>Illustrative photography</span><a href="https://unsplash.com/photos/man-wearing-blue-shirt-pouring-coffee-in-his-cup-31QfYo1h32o" target="_blank" rel="noopener noreferrer">Photo: Lee Campbell / Unsplash<span className="home-risk-gaps-sr"> (opens in a new tab)</span></a></figcaption> */}
      </figure>
    </div>

    <div className="home-risk-gaps-inner home-risk-gaps-consumer" id="consumer-risk-gaps" role="group" aria-labelledby="consumer-risk-gaps-title">
      <figure className="home-risk-gaps-figure">
        <div className="home-risk-gaps-photo">
          <Image src="/images/consumer-family-home.avif" alt="Parents with their young child on the front steps of a pale-grey house with white trim." fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1023px) 48vw, (max-width: 1375px) 45vw, 608px" />
          <div className="home-risk-gaps-photo-frame" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="home-risk-gaps-photo-note">
            <div className="home-risk-gaps-photo-note-label"><Mark /><span>BEHIND EVERY APPLICATION</span></div>
            <p>A life in motion.<br />A future taking shape.</p>
            <div className="home-risk-gaps-signal" aria-hidden="true"><i /><span /><i /><span /><i /></div>
          </div>
        </div>
        {/* Photo attribution retained for the future terms page: <figcaption><span>Illustrative photography</span><a href="https://unsplash.com/photos/a-couple-of-people-that-are-sitting-in-front-of-a-house-6mHNgUK1hDk" target="_blank" rel="noopener noreferrer">Photo: Jennifer Kalenberg / Unsplash<span className="home-risk-gaps-sr"> (opens in a new tab)</span></a></figcaption> */}
      </figure>

      <div className="home-risk-gaps-content">
        <p className="home-risk-gaps-eyebrow"><i aria-hidden="true" />THE RISK GAP</p>
        <h2 id="consumer-risk-gaps-title">Life moves forward.<br />Risk moves with it.</h2>
        <p className="home-risk-gaps-intro">A first car. A home. An education. Behind every application, income, commitments, and circumstances keep changing.</p>
        <RiskGapAccordion gaps={consumerRiskGaps} prefix="consumer-risk-gap" />
      </div>
    </div>
  </section>;
}
