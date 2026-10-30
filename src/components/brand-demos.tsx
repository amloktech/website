'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, Check, FileText, Image as ImageIcon, Loader2, Search, ShieldCheck } from 'lucide-react';
import { Mark } from './ui';

export function Status({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'success' | 'warning' | 'danger' | 'neutral' }) {
  return <span className={`ds-status ds-status-${tone}`}><i aria-hidden="true" />{children}</span>;
}

export function ShieldGraphic() {
  return <svg viewBox="0 0 200 220" className="ds-shield" aria-hidden="true"><path d="M24 24H176V136L100 196 24 136Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M38 38H162V128L100 177 38 128Z" fill="currentColor" opacity=".08"/><g transform="translate(60 60) scale(2.5)"><path d="M3 26 13 6h6l10 20h-7L16 13l-3.5 7H19l3 6H3Z" fill="currentColor"/></g><path d="M16 44V16H44M156 16H184V44M16 116V144L36 160M164 160L184 144V116" fill="none" stroke="currentColor" opacity=".35"/></svg>;
}

export function RadarVisual({ paused = false, label = 'AMLOK / SIGNAL FIELD' }: { paused?: boolean; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="ds-radar" data-running={inView && !paused} role="img" aria-label="A geometric shield within a square scanning field, with connected signal points">
    <div className="ds-radar-grid"/><div className="ds-radar-frame ds-frame-outer"/><div className="ds-radar-frame ds-frame-middle"/><div className="ds-radar-frame ds-frame-inner"/>
    <svg className="ds-radar-network" viewBox="0 0 600 420" preserveAspectRatio="none" aria-hidden="true"><path d="M58 276H144V132H270V210H412V82H540M144 276H390V330H510M270 132V58M412 210H542" fill="none" stroke="currentColor" strokeWidth="1"/>{[[58,276],[144,132],[270,58],[412,82],[540,82],[390,330],[510,330],[542,210]].map(([x,y],i) => <g key={i} fill="currentColor"><circle cx={x} cy={y} r="12" opacity=".12"/><circle cx={x} cy={y} r="4"/></g>)}</svg>
    <div className="ds-scan"/><ShieldGraphic/><span className="ds-radar-caption">{label}</span><span className="ds-radar-coordinate">N 04 / E 08</span>
  </div>;
}

export function MediaPlaceholder({ label = 'Image placeholder' }: { label?: string }) {
  return <div className="ds-media-placeholder" role="img" aria-label={label}><ImageIcon size={24} aria-hidden="true"/><span>{label}</span><i aria-hidden="true"/></div>;
}

export function ComponentLab({ onOpen, onNotice }: { onOpen: () => void; onNotice: (text: string) => void }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [tab, setTab] = useState(0);
  const [saved, setSaved] = useState(false);
  const tabs = ['Overview', 'Evidence', 'Activity'];
  return <>
    <div className="ds-grid ds-grid-2">
      <article className="ds-panel"><span className="ds-meta">ACTIONS / ROUNDED CONTROLS</span><h3>One primary action.</h3><div className="ds-button-samples"><button className="ds-button" onClick={onOpen}>Review decision <ArrowRight size={16}/></button><button className="ds-button ds-button-secondary" onClick={()=>onNotice('Secondary action preview activated')}>View evidence</button><button className="ds-button ds-button-quiet" onClick={()=>onNotice('Text action preview activated')}>Export record <ArrowRight size={16}/></button><button className="ds-button" disabled>Unavailable</button><button className="ds-button ds-button-secondary" disabled aria-busy="true"><Loader2 size={16}/>Saving…</button></div><p className="ds-note">44px default height · 16–24px horizontal inset · 8px icon gap. A filled blue primary, an outlined secondary, and an unboxed tertiary. Focus remains outside the control boundary.</p></article>
      <form className="ds-panel ds-form" noValidate onSubmit={e=>{e.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError('Enter a valid work email, for example alex@company.ca.');setSaved(false);return;}setError('');setSaved(true);}}>
        <span className="ds-meta">FIELDS / VALIDATION / PREFERENCES</span><label htmlFor="ds-email">Work email <span>(required)</span></label><input id="ds-email" type="email" autoComplete="email" value={email} placeholder="alex@company.ca" aria-invalid={!!error} aria-describedby={error ? 'ds-email-error' : 'ds-email-hint'} onChange={e=>{setEmail(e.target.value);setError('');setSaved(false);}}/><p id="ds-email-hint" className="ds-note">Used for this local component preview only.</p>{error && <p className="ds-field-error" id="ds-email-error" role="alert"><AlertTriangle size={16}/>{error}</p>}
        <label className="ds-checkbox"><input type="checkbox" defaultChecked/>Include source links in the review</label><div className="ds-switch-row"><span id="ds-switch-label">Signal notifications</span><button className="ds-switch" type="button" role="switch" aria-checked={enabled} aria-labelledby="ds-switch-label" onClick={()=>setEnabled(!enabled)}><span/></button></div><button className="ds-button ds-button-secondary" type="submit">Save preference <Check size={16}/></button><p className="ds-note" role="status">{saved ? 'Preference saved for this preview.' : ''}</p>
      </form>
    </div>
    <div className="ds-panel ds-tabs-demo"><div className="ds-tabs" role="tablist" aria-label="Record preview">{tabs.map((item,index)=><button key={item} role="tab" id={`ds-tab-${index}`} aria-controls={`ds-tab-panel-${index}`} aria-selected={index===tab} tabIndex={index===tab?0:-1} onClick={()=>setTab(index)} onKeyDown={e=>{const next=e.key==='ArrowRight'?(index+1)%3:e.key==='ArrowLeft'?(index+2)%3:e.key==='Home'?0:e.key==='End'?2:null;if(next!==null){e.preventDefault();setTab(next);document.getElementById(`ds-tab-${next}`)?.focus();}}}>{item}</button>)}</div><div className="ds-tab-panel" id={`ds-tab-panel-${tab}`} role="tabpanel" aria-labelledby={`ds-tab-${tab}`} tabIndex={0}><ShieldCheck size={22}/><div><h3>{['A complete view of the file','Evidence stays within reach','A traceable sequence'][tab]}</h3><p>{['Use tabs for sibling views. Keep the selected state visible with an underline and a change in text weight.','Show source, date, owner, and freshness beside each relevant fact.','Display who changed what and when, with a path back to the original evidence.'][tab]}</p></div></div></div>
  </>;
}

const records = [
  {name:'Northstar Foods',id:'EX-1042',stage:'Underwriting',status:'In review',exposure:'$240,000',source:'Financial statements · 30 Sep 2026',tone:'warning' as const},
  {name:'Cedar Logistics',id:'EX-1043',stage:'Monitoring',status:'Current',exposure:'$180,000',source:'Transaction feed · 20 Oct 2026',tone:'success' as const},
  {name:'Harbour Supply',id:'EX-1044',stage:'Verification',status:'Needs evidence',exposure:'$320,000',source:'Ownership declaration · 18 Oct 2026',tone:'danger' as const},
];

export function DataWorkspace() {
  const [query,setQuery]=useState('');
  const [sort,setSort]=useState(false);
  const [selected,setSelected]=useState(records[0]);
  const [restored,setRestored]=useState(false);
  const rows=records.filter(r=>`${r.name} ${r.status} ${r.stage}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort?b.name.localeCompare(a.name):a.name.localeCompare(b.name));
  return <>
    <div className="ds-workspace"><div className="ds-workspace-bar"><span><Mark/>Credit workspace</span><Status tone="neutral">Illustrative data</Status></div><div className="ds-workspace-toolbar"><label className="ds-search"><Search size={18}/><input type="search" aria-label="Search sample borrowers" placeholder="Search borrowers or status" value={query} onChange={e=>setQuery(e.target.value)}/></label><span className="ds-meta">{rows.length} RECORDS</span></div>
      <div className="ds-workspace-body"><div className="ds-table-scroll" role="region" tabIndex={0} aria-label="Sample borrower table"><table className="ds-table"><thead><tr><th aria-sort={sort?'descending':'ascending'}><button onClick={()=>setSort(!sort)}>Borrower {sort?'↓':'↑'}</button></th><th>Workflow</th><th>Status</th><th className="ds-numeric">Exposure</th></tr></thead><tbody>{rows.map(row=><tr key={row.id} data-selected={selected.id===row.id}><td><button className="ds-record-link" onClick={()=>setSelected(row)} aria-label={`View evidence for ${row.name}`}>{row.name}</button><small>{row.id}</small></td><td>{row.stage}</td><td><Status tone={row.tone}>{row.status}</Status></td><td className="ds-numeric">{row.exposure}</td></tr>)}</tbody></table>{!rows.length && <div className="ds-empty"><Search size={24}/><h4>No matching borrowers</h4><p>Try a name, workflow, or status.</p><button className="ds-button ds-button-secondary" onClick={()=>setQuery('')}>Clear search</button></div>}</div>
      <aside className="ds-evidence" aria-live="polite"><span className="ds-meta">EVIDENCE / SELECT A RECORD</span><h3>{selected.name}</h3><Status tone={selected.tone}>{selected.status}</Status><div className="ds-evidence-source"><FileText size={18}/><span>{selected.source}<small>Example source · not a customer record</small></span></div><p>Keep the evidence beside the decision. The full record and its history stay available.</p></aside></div>
    </div>
    <div className="ds-grid ds-grid-3 ds-state-grid"><article className="ds-panel"><Loader2 size={22}/><h3>Loading</h3><div className="ds-skeleton"/><div className="ds-skeleton ds-skeleton-short"/><p>Reserve the final layout. Show progress text for work that takes time. Offer cancellation for long tasks.</p></article><article className="ds-panel"><FileText size={22}/><h3>Empty</h3><p>No evidence has been added. Explain what belongs here and offer a specific next step.</p><span className="ds-meta">ACTION: ADD DOCUMENTS</span></article><article className="ds-panel"><AlertTriangle size={22}/><h3>{restored?'Recovered':'Connection interrupted'}</h3><p role="status">{restored?'The preview connection is restored. Preserve the user’s filters and selection.':'Keep the previous result visible with a stale-data label. Explain the recovery action.'}</p><button className="ds-button ds-button-secondary" onClick={()=>setRestored(!restored)}>{restored?'Reset example':'Retry preview'}</button></article></div>
  </>;
}

export function ChartSpecimen() {
  return <div className="ds-chart-specimen"><div className="ds-chart-heading"><div><span className="ds-meta">ILLUSTRATIVE PORTFOLIO / CAD</span><h3>Exposure by workflow</h3></div><span className="ds-note">Snapshot · 20 Oct 2026</span></div><div className="ds-chart" role="img" aria-label="Example exposure: Verification 32%, Underwriting 48%, Monitoring 72%, Servicing 40%">{[['Verification',32],['Underwriting',48],['Monitoring',72],['Servicing',40]].map(([name,value])=><div key={name}><span>{name}</span><div><i style={{width:`${value}%`}}/></div><strong>{value}%</strong></div>)}</div><p className="ds-note">Direct labels, visible units, a consistent baseline, and square bars. Use a table alternative for precise values; never imply that a risk signal is a probability unless it is calibrated.</p></div>;
}

export function FieldPatterns() {
  const [reviewType,setReviewType]=useState('Standard review');
  const [note,setNote]=useState('');
  const [density,setDensity]=useState('Comfortable');
  return <div className="ds-grid ds-grid-2 ds-field-patterns">
    <div className="ds-panel ds-form"><span className="ds-meta">CHOICE / CONTEXT / READ-ONLY</span>
      <label htmlFor="ds-review-type">Review workflow</label>
      <select id="ds-review-type" value={reviewType} onChange={e=>setReviewType(e.target.value)}><option>Standard review</option><option>Enhanced review</option><option>Policy exception review</option></select>
      <label htmlFor="ds-record-id">Record ID</label><input id="ds-record-id" value="EX-1042" readOnly aria-describedby="ds-readonly-hint"/>
      <p id="ds-readonly-hint" className="ds-note">Read-only values stay selectable and readable. Disabled fields are reserved for unavailable actions.</p>
      <fieldset className="ds-radio-group"><legend>Workspace density</legend>{['Comfortable','Compact'].map(value=><label key={value}><input type="radio" name="ds-density" value={value} checked={density===value} onChange={()=>setDensity(value)}/><span>{value}</span></label>)}</fieldset>
    </div>
    <div className="ds-panel ds-form"><span className="ds-meta">LONG-FORM INPUT / AUDIT CONTEXT</span>
      <label htmlFor="ds-review-note">Reviewer note <span>(optional)</span></label>
      <textarea id="ds-review-note" rows={5} maxLength={400} value={note} onChange={e=>setNote(e.target.value)} aria-describedby="ds-review-note-hint" placeholder="Explain the evidence or policy consideration behind this review."/>
      <p id="ds-review-note-hint" className="ds-note">Keep personal data out of this example. {note.length}/400 characters.</p>
      <div className="ds-field-summary"><Status tone="neutral">{reviewType}</Status><p>Describe what changed, why it matters, and who should act next. A field’s label remains visible after a value is entered.</p></div>
    </div>
  </div>;
}
