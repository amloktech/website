import type { CSSProperties } from 'react';
import { ArrowRight, Check, FileText, Landmark, Link2, Network, ReceiptText, ShieldCheck, Users, Wallet } from 'lucide-react';
import styles from './underwriting.module.css';

const graphIcons = [Landmark, ReceiptText, Users, Wallet, Network, ShieldCheck];
const graphPositions = [[50,13],[17,32],[83,32],[17,70],[83,70],[50,88]];
const graphPaths = ['M340 68V260','M116 166Q240 166 340 260','M564 166Q440 166 340 260','M116 364Q240 364 340 260','M564 364Q440 364 340 260','M340 458V260'];

export function UnderwritingGraph({ subject = 'The deal', nodes = ['Accounts', 'Income & cash flow', 'People & ownership', 'Obligations', 'Counterparties', 'Assets & agreements'] }: { subject?: string; nodes?: readonly string[] }) {
  return <div className={styles.graph} aria-label={`${subject}, connected to ${nodes.join(', ')}`} role="img">
    <svg className={styles.graphLines} viewBox="0 0 680 520" preserveAspectRatio="none" aria-hidden="true">
      <ellipse cx="340" cy="260" rx="236" ry="184" className={styles.graphOrbit}/>
      <ellipse cx="340" cy="260" rx="156" ry="118" className={styles.graphOrbit}/>
      {graphPaths.map((d,index) => <g key={d}><path d={d} className={styles.graphLine}/><path d={d} pathLength="100" className={styles.graphFlow} style={{animationDelay:`${index * -.9}s`}}/></g>)}
    </svg>
    {nodes.map((node,index) => { const Icon = graphIcons[index]; return <div className={styles.graphNode} key={node} style={{left:`${graphPositions[index][0]}%`,top:`${graphPositions[index][1]}%`}} aria-hidden="true"><Icon/><span>{node}</span><i/></div>; })}
    <div className={styles.graphCore} aria-hidden="true"><span>CONNECTED ASSESSMENT</span><strong>{subject}</strong><span className={styles.coreEvidence}><Link2 size={12}/>Evidence attached</span></div>
  </div>;
}

export function EvidenceReconciliation() {
  return <figure className={styles.evidenceArt}>
    <div className={styles.artTop}><span>RECONCILIATION / ILLUSTRATIVE</span><Link2 size={17}/></div>
    <div className={styles.evidenceSources}>{[
      ['Commerce', 'Order placed', 'Source record 01'],
      ['Payments', 'Settlement issued', 'Source record 02'],
      ['Banking', 'Deposit received', 'Source record 03'],
    ].map(([source,event,reference],index) => <div className={styles.sourceCard} key={source} style={{'--sequence':index} as CSSProperties}><span><FileText size={15}/>{source}</span><strong>{event}</strong><small>{reference}</small><Check size={15}/></div>)}</div>
    <div className={styles.mergeLines} aria-hidden="true"><i/><i/><i/></div>
    <div className={styles.resolvedEvent}><span><Network size={22}/>ONE ECONOMIC EVENT</span><strong>Follow the money.<br/>Preserve the evidence.</strong><p>Linked records · Reconciled cash flow</p></div>
    <figcaption>Connect the records before counting the revenue.</figcaption>
  </figure>;
}

export function AssessmentPreview() {
  return <figure className={styles.assessment}>
    <div className={styles.artTop}><span>AMLOK INSIGHTS / ILLUSTRATIVE OUTPUT</span><FileText size={17}/></div>
    <header><span>UNDERWRITING SNAPSHOT</span><strong>A clearer case<br/>for your next decision.</strong></header>
    <div className={styles.assessmentRows}>
      {[
        ['Capacity', 'Income, cash flow & obligations', 'Supporting calculations'],
        ['Relationships', 'Entities, accounts & counterparties', 'Linked evidence'],
        ['Policy context', 'Criteria, conditions & exceptions', 'Institution-defined'],
      ].map(([title,detail,note],index) => <div key={title} style={{'--sequence':index} as CSSProperties}><Check size={17}/><span><strong>{title}</strong><small>{detail}</small></span><em>{note}</em></div>)}
    </div>
    <div className={styles.openQuestion}><span>OPEN QUESTION</span><p>Confirm the supporting evidence for an unresolved obligation.</p></div>
    <figcaption><Users size={16}/>Final decision: your team<ArrowRight size={16}/></figcaption>
  </figure>;
}
