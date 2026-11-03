'use client';

import { useEffect, useRef, useState } from 'react';
import timeline from '@/content/about-timeline.json';

type TimelineBlock = { type: 'paragraph'; text: string } | { type: 'list'; items: string[] };
type Milestone = { date: string; dateTime?: string; phase: string; title: string; blocks: TimelineBlock[] };
const milestones = timeline.milestones as Milestone[];

function TimelineCopy({ blocks }: { blocks: TimelineBlock[] }) {
  return <div className="about-timeline-copy">{blocks.map((block, index) => block.type === 'list'
    ? <ul key={index}>{block.items.map(item => <li key={item}>{item}</li>)}</ul>
    : <p key={index}>{block.text}</p>)}</div>;
}

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

  return <section className="about-journey" id="journey" aria-labelledby="about-journey-title">
    <div className="about-inner">
      <header className="about-journey-heading">
        <div><span className="home-products-eyebrow"><i aria-hidden="true" />OUR JOURNEY</span><h2 id="about-journey-title">From capital access to<br /><span className="home-heading-gradient">connected risk intelligence.</span></h2></div>
        <p><span className="about-journey-period">{timeline.period}</span>Follow the ideas and milestones that have shaped Amlok.</p>
      </header>
      <div className="about-timeline" aria-label="Company progress timeline">
        <ol>{milestones.map((milestone,index) => <li key={milestone.title} ref={element => { rows.current[index] = element; }} data-milestone={index} className={index === active ? 'is-active' : ''}>
          <div className="about-timeline-date">{milestone.dateTime ? <time dateTime={milestone.dateTime}>{milestone.date}</time> : <span>{milestone.date}</span>}</div>
          <span className="about-timeline-marker" aria-hidden="true">{String(index + 1).padStart(2,'0')}</span>
          <article><span className="about-timeline-step">{milestone.phase}</span><h3>{milestone.title}</h3><TimelineCopy blocks={milestone.blocks} /></article>
        </li>)}</ol>
      </div>
      <aside className="about-journey-today" id="amlok-today" aria-labelledby="about-today-title">
        <header className="about-today-header">
          <div><span className="home-products-eyebrow"><i aria-hidden="true" />OCTOBER 2026</span><h2 id="about-today-title">Amlok <span className="home-heading-gradient">today.</span></h2></div>
          <p>{timeline.today.introduction}</p>
        </header>
        <div className="about-today-grid">
          {[timeline.today.platform, timeline.today.milestones].map(section => <section className="about-today-detail" key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
            <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>
          </section>)}
        </div>
        <div className="about-today-grid about-today-story">
          <section className="about-today-detail">
            <h3>{timeline.today.evolution.title}</h3>
            {timeline.today.evolution.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>
          <section className="about-today-detail">
            <h3>{timeline.today.purpose.title}</h3>
            <p className="about-today-statement">{timeline.today.purpose.statement}</p>
            {timeline.today.purpose.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>
        </div>
      </aside>
    </div>
  </section>;
}
