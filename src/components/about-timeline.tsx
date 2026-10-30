'use client';

import { useEffect, useRef, useState } from 'react';

// Only the founding month is supplied. Confirm all later dates before publishing.
const milestones = [
  { date:'January 2023', title:'Web3-based community lending', description:'The company began with a focus on community lending built around Web3.', detail:'Founding story and early milestones to be added.' },
  { date:'Date to confirm', title:'SMB lending match engine', description:'A lending match engine focused on small and medium-sized businesses.', detail:'Launch date, product details, and milestones to be added.' },
  { date:'Date to confirm', title:'Non-dilutive lending products', description:'Lending products designed around access to capital without giving up equity.', detail:'Product scope and launch milestones to be added.' },
  { date:'Date to confirm', title:'A Canada-specific financial transformer', description:'Work began on a financial transformer built for the Canadian market.', detail:'Research timeline and development milestones to be added.' },
  { date:'Date to confirm', title:'A proprietary LLM for financial data and risk', description:'A proprietary language model focused on financial data and risk assessment.', detail:'Model development and validation milestones to be added.' },
  { date:'Date to confirm', title:'Expansion to the United States', description:'Extending the company’s focus beyond Canada to the U.S. market.', detail:'Timing, market coverage, and launch details to be added.' },
  { date:'Date to confirm', title:'A broader financial ecosystem', description:'Expansion into consumer lending, mortgages, auto finance, and insurtech.', detail:'Timing and milestones for each market to be added.' },
] as const;

export function AboutTimeline() {
  const rows = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = window.innerHeight / 2;
        let closest = 0;
        let distance = Infinity;
        rows.current.forEach((row, index) => {
          if (!row) return;
          const rect = row.getBoundingClientRect();
          const next = Math.abs(rect.top + rect.height / 2 - center);
          if (next < distance) { closest = index; distance = next; }
        });
        setActive(closest);
      });
    };
    update();
    window.addEventListener('scroll',update,{ passive:true });
    window.addEventListener('resize',update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll',update);
      window.removeEventListener('resize',update);
    };
  }, []);

  return <section className="about-journey" aria-labelledby="about-journey-title">
    <div className="about-inner">
      <header className="about-journey-heading">
        <div><span className="home-products-eyebrow"><i aria-hidden="true" />OUR JOURNEY</span><h2 id="about-journey-title">From lending to<br /><span className="home-heading-gradient">connected risk intelligence.</span></h2></div>
        <p>Follow the ideas and milestones that have shaped AMLOK.</p>
      </header>
      <div className="about-timeline" aria-label="Company progress timeline">
        <ol>{milestones.map((milestone,index) => <li key={milestone.title} ref={element => { rows.current[index] = element; }} data-milestone={index} className={index === active ? 'is-active' : ''}>
          <div className="about-timeline-date">{index === 0 ? <time dateTime="2023-01">{milestone.date}</time> : <span>{milestone.date}</span>}</div>
          <span className="about-timeline-marker" aria-hidden="true">{String(index + 1).padStart(2,'0')}</span>
          <article><span className="about-timeline-step">MILESTONE {String(index + 1).padStart(2,'0')}</span><h3>{milestone.title}</h3><p>{milestone.description}</p><p className="about-timeline-placeholder">{milestone.detail}</p></article>
        </li>)}</ol>
      </div>
    </div>
  </section>;
}
