'use client';
import {useState} from 'react';
import Image from 'next/image';
import {ArrowUpRight,Check,Activity} from 'lucide-react';
import type {IndustryDetail} from '@/content/industries';
import s from './industry.module.css';
export function IndustrySegments({industry:d}:{industry:IndustryDetail}){
 const [active,setActive]=useState(0);const item=d.segments[active];
 return <div className={s.explorer}><div className={s.tabs} role="tablist" aria-label={`${d.label} subsegments`}>{d.segments.map((x,i)=><button key={x.name} role="tab" id={`segment-${i}`} aria-controls="segment-panel" aria-selected={i===active} tabIndex={i===active?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%d.segments.length;else if(e.key==='ArrowLeft')n=(i+d.segments.length-1)%d.segments.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=d.segments.length-1;else return;e.preventDefault();setActive(n);document.getElementById(`segment-${n}`)?.focus();}}>{x.name}</button>)}</div><div className={s.segmentPanel} id="segment-panel" role="tabpanel" aria-labelledby={`segment-${active}`}><div className={s.segmentCopy}><span className="cp-eyebrow">{d.label} / {item.name}</span><h3>{item.headline}</h3><p>{item.body}</p><h4>Bring the evidence together</h4><ul>{item.evidence.map(x=><li key={x}><Check size={17}/>{x}</li>)}</ul><div className={s.watch}><Activity size={20}/><div><strong>Keep watching</strong><p>{item.watch}</p></div></div><a className={s.guide} href={`/industry-guides/${item.guide}`}>Read the {item.name.toLowerCase()} guide<ArrowUpRight size={18}/></a></div><figure className={s.segmentPhoto}><Image src={`/images/industries/${d.image}.webp`} alt={d.alt} fill sizes="(max-width:800px) 100vw, 50vw"/><div className={s.photoLabel}><span>{item.name.toUpperCase()} / REVIEW CONTEXT</span><strong>{item.question}</strong></div></figure></div></div>;
}
