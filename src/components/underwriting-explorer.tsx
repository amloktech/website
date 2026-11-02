'use client';

import { useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, FileCheck2, RotateCcw } from 'lucide-react';
import { underwritingAudiences, underwritingStages } from '@/content/underwriting';
import { BookingLink } from './booking-link';
import { UnderwritingGraph } from './underwriting-visuals';
import styles from './underwriting.module.css';

function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number, length: number, select: (index: number) => void) {
  let next = index;
  if (event.key === 'ArrowRight') next = (index + 1) % length;
  else if (event.key === 'ArrowLeft') next = (index + length - 1) % length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = length - 1;
  else return;
  event.preventDefault();
  select(next);
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
}

export function UnderwritingAudiences() {
  const [selected, setSelected] = useState(0);
  const audience = underwritingAudiences[selected];
  return <>
    <div className={styles.tabs} role="tablist" aria-label="Underwriting teams">
      {underwritingAudiences.map((item,index) => <button key={item.id} type="button" role="tab" id={`team-tab-${item.id}`} aria-selected={selected === index} aria-controls={`team-panel-${item.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => moveTab(event,index,underwritingAudiences.length,setSelected)}>{item.label}<ArrowUpRight size={17}/></button>)}
    </div>
    {underwritingAudiences.map((item,index) => <div key={item.id} role="tabpanel" id={`team-panel-${item.id}`} aria-labelledby={`team-tab-${item.id}`} hidden={selected !== index} tabIndex={0}>
      {selected === index && <div className={styles.audiencePanel}>
        <div className={styles.audienceCopy}>
          <span className={styles.mono}>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p>
          <ul className={styles.questions}>{item.questions.map(([title,description]) => <li key={title}><Check size={17}/><div><strong>{title}</strong><p>{description}</p></div></li>)}</ul>
          <BookingLink className={styles.textLink}>{item.cta}<ArrowUpRight size={17}/></BookingLink>
          <a href={item.guide} className={styles.guideLink}>Read the industry guide <ArrowRight size={15}/></a>
        </div>
        <figure className={styles.audienceArt}>
          <div className={styles.artTop}><span>CONNECTED CONTEXT</span><span>ILLUSTRATIVE</span></div>
          <UnderwritingGraph subject={audience.subject} nodes={audience.nodes}/>
          <figcaption><strong>{item.insight}</strong><div className={styles.eventChain}>{item.chain.map((step,stepIndex) => <span key={step}>{stepIndex > 0 && <ChevronRight size={13} aria-hidden="true"/>}{step}</span>)}</div><p>{item.note}</p></figcaption>
        </figure>
      </div>}
    </div>)}
  </>;
}

export function UnderwritingWorkflow() {
  const [selected, setSelected] = useState(0);
  return <div className={styles.workflow}>
    <div className={styles.workflowTabs} role="tablist" aria-label="Underwriting stages">
      {underwritingStages.map((stage,index) => <button key={stage.title} type="button" role="tab" id={`stage-tab-${index}`} aria-selected={selected === index} aria-controls={`stage-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => moveTab(event,index,underwritingStages.length,setSelected)}><span>{String(index+1).padStart(2,'0')}</span>{stage.title}<ArrowRight size={17} aria-hidden="true"/></button>)}
    </div>
    {underwritingStages.map((stage,index) => <div key={stage.title} role="tabpanel" id={`stage-panel-${index}`} aria-labelledby={`stage-tab-${index}`} hidden={selected !== index} tabIndex={0}>
      {selected === index && <div className={styles.workflowPanel}>
        <div><span className={styles.mono}>STEP {String(index+1).padStart(2,'0')} / {stage.title}</span><h3>{stage.label}</h3><p>{stage.description}</p><strong className={styles.takeaway}>{stage.takeaway}</strong></div>
        <div className={styles.workflowArtifact}><div><FileCheck2 size={22}/><span>{stage.artifact}</span><span className={styles.exampleTag}>Example</span></div><dl>{stage.rows.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}<Check size={13}/></dd></div>)}</dl></div>
      </div>}
    </div>)}
  </div>;
}

const formatCad = (amount: number) => new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(amount);

export function UnderwritingScenario() {
  const [decline, setDecline] = useState(0);
  const receipts = 100000 * (1 - decline / 100);
  const operatingCosts = 70000;
  const debtService = 15000;
  const coverage = (receipts - operatingCosts) / debtService;
  const residual = receipts - operatingCosts - debtService;
  return <div className={styles.scenario}>
    <div className={styles.artTop}><span>BUSINESS CASH FLOW / ILLUSTRATIVE</span><span>CAD / MONTH</span></div>
    <div className={styles.scenarioControl}><label htmlFor="receipts-decline">Reduction in eligible receipts<strong>{decline}%</strong></label><input type="range" id="receipts-decline" min="0" max="30" step="1" value={decline} aria-valuetext={`${decline}% reduction in eligible monthly receipts`} onChange={event => setDecline(Number(event.target.value))}/><div><span>Base case</span><span>30% reduction</span></div></div>
    <div className={styles.cashBars}>{[['Eligible receipts',receipts],['Operating outflows',operatingCosts],['Scheduled debt service',debtService]].map(([label,value],index) => <div key={label}><div><span>{label}</span><strong>{formatCad(Number(value))}</strong></div><div className={styles.barTrack}><i className={index ? styles.costBar : styles.receiptBar} style={{width:`${Number(value)/1000}%`}}/></div></div>)}</div>
    <div className={styles.scenarioResult} aria-live="polite" aria-atomic="true"><div><span>Cash-flow coverage proxy</span><strong>{coverage.toFixed(2)}<small>×</small></strong></div><div data-negative={residual < 0}><span>Cash remaining after debt service</span><strong>{formatCad(residual)}</strong></div></div>
    <div className={styles.scenarioFoot}><span>Change an assumption. Inspect the calculation.</span><button type="button" onClick={() => setDecline(0)} disabled={decline === 0}><RotateCcw size={13}/>Reset</button></div>
    <p className={styles.calculation}>(Receipts − operating outflows) ÷ scheduled debt service. Costs and debt payments are held constant. This mechanical example is not a forecast, approval rule, or model performance result.</p>
  </div>;
}
