'use client';
import {useState} from 'react';
import type {ModuleDetail} from '@/content/modules';
import s from './modules.module.css';
export function ModuleExplorer({items}:{items:ModuleDetail['scenarios']}){
 const [active,setActive]=useState(0);const item=items[active];
 return <div className={s.explorer}><div className={s.tabs} role="tablist" aria-label="Illustrative journey">{items.map((x,i)=><button key={x.label} role="tab" id={`journey-tab-${i}`} aria-selected={i===active} aria-controls="journey-panel" tabIndex={i===active?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%items.length;else if(e.key==='ArrowLeft')next=(i+items.length-1)%items.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=items.length-1;else return;e.preventDefault();setActive(next);document.getElementById(`journey-tab-${next}`)?.focus();}}>{x.label}</button>)}</div><div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${active}`} className={s.panel}><div><span className="cp-eyebrow">ILLUSTRATIVE JOURNEY</span><h3>{item.heading}</h3><p>{item.body}</p></div><div className={s.record} key={active}>{item.rows.map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}<p>{item.result}</p></div></div></div>;
}
