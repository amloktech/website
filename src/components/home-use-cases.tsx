'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WebsiteGraphic } from './website-graphic';

const cases = [
  { title: 'Expand credit approvals', description: 'Bring verified cash flow into the review so borrowers can be assessed on a fuller financial picture.', graphic: 'approvals' },
  { title: 'Surface emerging risk', description: 'Connect changes in income, spending, and liquidity before they become a larger credit concern.', graphic: 'radar' },
  { title: 'Detect first-party fraud', description: 'Connect inconsistent evidence, overlapping borrowing, and related entities for investigation.', graphic: 'fraud' },
  { title: 'Understand borrower income', description: 'Reconcile deposits and revenue patterns to see how much income recurs—and when it arrives.', graphic: 'income' },
  { title: 'Align offers with risk', description: 'Compare repayment capacity with your policies to inform the amount, terms, and pricing you offer.', graphic: 'offers' },
  { title: 'Monitor portfolio health', description: 'Track movement across your book and bring changing borrower conditions into the next review.', graphic: 'portfolio' },
  { title: 'Prioritize collections', description: 'Use current financial context to guide outreach, payment timing, and approved repayment workflows.', graphic: 'collections' },
] as const;
const sectors = [
  ['Auto finance', 'Buy now, pay later', 'Earned wage access', 'Credit cards', 'Debt consolidation', 'Home equity', 'Home improvement', 'Merchant cash advance', 'Mortgages', 'Payments'],
  ['Personal loans', 'Point-of-sale financing', 'Rent payments', 'Equipment finance', 'Small-dollar lending', 'SMB lending', 'Student lending', 'Tenant screening', 'Utilities & telecom'],
];

export function HomeUseCases() {
  const sectionRef=useRef<HTMLElement>(null);
  const trackRef=useRef<HTMLDivElement>(null);
  const activeRef=useRef(0);
  const scrollTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const [active,setActive]=useState(0);
  const [inView,setInView]=useState(false);
  const stride=useCallback(()=>{const track=trackRef.current;return track?.firstElementChild?(track.firstElementChild as HTMLElement).getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap):0;},[]);
  const move=useCallback((step:number)=>{const track=trackRef.current;if(!track)return;const width=stride();if(!width)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;track.scrollTo({left:(Math.round(track.scrollLeft/width)+step)*width,behavior:reduced?'instant':'smooth'});},[stride]);
  useEffect(()=>{
    const track=trackRef.current,section=sectionRef.current;if(!track||!section)return;
    // Only reposition when the column width changes, not when a card grows taller.
    let previousWidth=0;
    const resize=new ResizeObserver(()=>{if(track.clientWidth===previousWidth)return;previousWidth=track.clientWidth;const width=stride();track.scrollTo({left:(cases.length+activeRef.current)*width,behavior:'instant'});});resize.observe(track);
    const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:.1});observer.observe(section);
    return()=>{resize.disconnect();observer.disconnect();if(scrollTimer.current)clearTimeout(scrollTimer.current);};
  },[stride]);
  const onScroll=()=>{
    const track=trackRef.current;if(!track)return;const width=stride();if(!width)return;
    const index=Math.round(track.scrollLeft/width);const normalized=((index%cases.length)+cases.length)%cases.length;activeRef.current=normalized;setActive(normalized);
    if(scrollTimer.current)clearTimeout(scrollTimer.current);
    scrollTimer.current=setTimeout(()=>{const current=trackRef.current;if(!current)return;const step=stride();const position=Math.round(current.scrollLeft/step);if(position<cases.length||position>=cases.length*2)current.scrollTo({left:(cases.length+activeRef.current)*step,behavior:'instant'});},180);
  };
  return <section className="home-use-cases" id="use-cases" aria-labelledby="use-cases-title" ref={sectionRef} data-motion={inView?'running':'paused'}>
    <div className="home-use-cases-inner">
      <header className="home-use-cases-header"><div><p className="home-use-cases-eyebrow"><i aria-hidden="true"/>Adoption of cash flow underwriting is happening now.</p><h2 id="use-cases-title">AMLOK <span className="home-heading-gradient">powers</span> a variety of <span className="home-heading-gradient">use cases</span></h2></div><div className="home-use-cases-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous use case"><ArrowLeft size={19}/></button><button type="button" onClick={()=>move(1)} aria-label="Next use case"><ArrowRight size={19}/></button></div></header>
      <div className="home-use-cases-viewport"><div className="home-use-cases-track" ref={trackRef} onScroll={onScroll} tabIndex={0} role="group" aria-roledescription="carousel" aria-label="Credit lifecycle use cases" onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}if(event.key==='Home'||event.key==='End'){event.preventDefault();trackRef.current?.scrollTo({left:(cases.length+(event.key==='Home'?0:cases.length-1))*stride(),behavior:'instant'});}}}>
        {[0,1,2].flatMap(copy=>cases.map((item,index)=><article className="home-use-case" key={`${copy}-${item.graphic}`} aria-hidden={copy!==1?true:undefined} role="group" aria-roledescription="slide" aria-label={`${index+1} of ${cases.length}: ${item.title}`}><div className="home-use-case-graphic website-graphic" aria-hidden="true"><WebsiteGraphic kind={item.graphic}/></div><div className="home-use-case-copy"><h3>{item.title}</h3><p>{item.description}</p></div></article>))}
      </div></div>
      <span className="home-use-cases-sr" aria-live="polite" aria-atomic="true">{cases[active].title}, {active+1} of {cases.length}</span>
      <div className="home-use-cases-sectors" aria-label="Lending and financial use cases">{sectors.map((row,i)=><div className={`home-use-cases-marquee row-${i}`} key={i}><div>{[0,1].map(copy=><div className="home-use-cases-sector-set" key={copy} aria-hidden={copy===1?true:undefined}>{row.map(label=><span key={label}>{label}</span>)}</div>)}</div></div>)}</div>
    </div>
  </section>;
}
