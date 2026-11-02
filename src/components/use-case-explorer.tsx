'use client';
import {useState,type KeyboardEvent} from 'react';
import {ArrowRight,Check,FileSearch} from 'lucide-react';
import type {UseCaseDetail} from '@/content/use-cases';
import shared from './underwriting.module.css';
import styles from './use-case.module.css';
export function UseCaseExplorer({detail}:{detail:UseCaseDetail}){
 const [selected,setSelected]=useState(0);
 function keyboard(event:KeyboardEvent<HTMLButtonElement>,i:number){const n=event.key==='ArrowRight'?(i+1)%detail.cases.length:event.key==='ArrowLeft'?(i+detail.cases.length-1)%detail.cases.length:event.key==='Home'?0:event.key==='End'?detail.cases.length-1:null;if(n===null)return;event.preventDefault();setSelected(n);event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[n]?.focus();}
 return <><div className={shared.tabs} role="tablist" aria-label={`${detail.label} examples`}>{detail.cases.map((x,i)=><button type="button" role="tab" key={x.label} id={`case-tab-${i}`} aria-controls={`case-panel-${i}`} aria-selected={selected===i} tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={e=>keyboard(e,i)}>{x.label}<ArrowRight size={16}/></button>)}</div>{detail.cases.map((x,i)=><div role="tabpanel" key={x.label} id={`case-panel-${i}`} aria-labelledby={`case-tab-${i}`} hidden={selected!==i} tabIndex={0}>{selected===i&&<div className={styles.exampleGrid}><div><span className={shared.mono}>ILLUSTRATIVE EVIDENCE REVIEW</span><h3>{x.title}</h3><p>{x.observation}</p><strong className={styles.checkTitle}>Questions for the review</strong><ul>{x.checks.map(check=><li key={check}><Check size={16}/>{check}</li>)}</ul></div><figure className={styles.evidence}><div className={shared.artTop}><span>THE RECORDS IN CONTEXT</span><FileSearch size={18}/></div><dl>{x.records.map(([label,value],j)=><div key={label}><dt><span>0{j+1}</span>{label}</dt><dd>{value}</dd></div>)}</dl><figcaption><span>REVIEWABLE FINDING</span><strong>{x.result}</strong></figcaption><p>Fictional example. Evidence requirements and conclusions depend on the agreed workflow.</p></figure></div>}</div>)}</>;
}
