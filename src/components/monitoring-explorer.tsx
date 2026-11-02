'use client';
import {useState,type KeyboardEvent} from 'react';
import {ArrowUpRight,Check,Activity,Database} from 'lucide-react';
import {monitoringCases,monitoringTeams} from '@/content/monitoring';
import {BookingLink} from './booking-link';
import {UnderwritingGraph} from './underwriting-visuals';
import shared from './underwriting.module.css';
import styles from './monitoring.module.css';
function keyboard(event:KeyboardEvent<HTMLButtonElement>,index:number,length:number,select:(n:number)=>void) {
 const next=event.key==='ArrowRight'?(index+1)%length:event.key==='ArrowLeft'?(index+length-1)%length:event.key==='Home'?0:event.key==='End'?length-1:null;
 if(next===null)return; event.preventDefault();select(next);event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
}
export function SignalExplorer(){
 const [selected,setSelected]=useState(0);const item=monitoringCases[selected];
 return <div className={styles.explorer}>
 <div className={styles.signalTabs} role="tablist" aria-label="Monitoring examples">{monitoringCases.map((entry,i)=><button type="button" role="tab" key={entry.id} id={`signal-tab-${entry.id}`} aria-controls={`signal-panel-${entry.id}`} aria-selected={i===selected} tabIndex={i===selected?0:-1} onClick={()=>setSelected(i)} onKeyDown={e=>keyboard(e,i,monitoringCases.length,setSelected)}>{entry.label}</button>)}</div>
 {monitoringCases.map((entry,i)=><div role="tabpanel" key={entry.id} id={`signal-panel-${entry.id}`} aria-labelledby={`signal-tab-${entry.id}`} hidden={i!==selected} tabIndex={0}>{i===selected&&<div className={styles.signalPanel}>
 <div className={styles.signalVisual}><div className={shared.artTop}><span>{item.context}</span><span>ILLUSTRATIVE</span></div><h3>{item.metric}</h3><div className={styles.comparison}><div><span>Baseline</span><strong>{item.baseline}</strong></div><div><span>New evidence</span><strong>{item.current}</strong></div></div><svg viewBox="0 0 440 120" role="img" aria-label={`${item.metric}: ${item.baseline} at baseline; ${item.current} in new evidence. Illustrative trend.`}><path d="M0 30H440 M0 60H440 M0 90H440" className={styles.gridLine}/><polyline points={item.points} className={styles.trend}/>{item.id==='coverage'&&<path d="M280 45H420" className={styles.missing}/>}</svg><div className={styles.chartLabels}><span>BASELINE WINDOW</span><span>{item.change}</span></div><div className={styles.signalStatus}>{item.id==='coverage'?<Database size={16}/>:<Activity size={16}/>}<span>{item.status}</span></div><p className={styles.note}>{item.note}</p></div>
 <div className={styles.signalCopy}><span className={shared.mono}>FROM OBSERVATION TO REVIEW</span><h3>{item.title}</h3><dl><dt>What changed</dt><dd>{item.observation}</dd><dt>Why review it</dt><dd>{item.interpretation}</dd></dl><strong>Before drawing a conclusion</strong><ul>{item.checks.map(check=><li key={check}><Check size={15}/>{check}</li>)}</ul></div>
 </div>}</div>)}
 </div>;
}
export function MonitoringTeams(){
 const [selected,setSelected]=useState(0);
 return <><div className={shared.tabs} role="tablist" aria-label="Portfolio teams">{monitoringTeams.map((team,i)=><button type="button" role="tab" key={team.id} id={`monitor-team-${team.id}`} aria-controls={`monitor-panel-${team.id}`} aria-selected={selected===i} tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={e=>keyboard(e,i,monitoringTeams.length,setSelected)}>{team.label}<ArrowUpRight size={17}/></button>)}</div>
 {monitoringTeams.map((team,i)=><div role="tabpanel" key={team.id} id={`monitor-panel-${team.id}`} aria-labelledby={`monitor-team-${team.id}`} hidden={selected!==i} tabIndex={0}>{selected===i&&<div className={shared.audiencePanel}><div className={shared.audienceCopy}><h3>{team.title}</h3><p>{team.description}</p><ul className={shared.questions}>{team.items.map(([title,description])=><li key={title}><Check size={17}/><div><strong>{title}</strong><p>{description}</p></div></li>)}</ul><BookingLink className={shared.textLink}>{team.cta}<ArrowUpRight size={17}/></BookingLink><a href={team.guide} className={shared.guideLink}>Explore the industry guide<ArrowUpRight size={15}/></a></div><figure className={shared.audienceArt}><div className={shared.artTop}><span>CONNECTED MONITORING</span><span>ILLUSTRATIVE</span></div><UnderwritingGraph subject="The relationship" nodes={team.nodes}/><figcaption><strong>A change has a context. Keep it connected.</strong><p>Monitor the evidence your institution is authorized to use. Your team determines the response.</p></figcaption></figure></div>}</div>)}</>;
}
