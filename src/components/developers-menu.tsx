'use client';

import { isHoverPointer, useMenuHover } from '@/lib/use-menu-hover';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export const developerGroups = [
  {title:'Build',links:[
    {label:'Documentation',href:'https://amlok-docs.mintlify.site/'},
    {label:'API Reference',href:'/developers/api-reference'},
    {label:'MCP Server',href:'/developers/mcp'},
    {label:'SDKs',href:'/developers/sdks'},
    {label:'Webhooks',href:'/developers/webhooks'},
  ]},
  {title:'Ship',links:[
    {label:'Integration prompt',href:'/developers/integration-prompt'},
    {label:'Sandbox',href:'/developers/sandbox'},
    {label:'Agent Skills',href:'/developers/agent-skills'},
    {label:'Changelog',href:'/changelog'},
    {label:'Service Status',href:'/status'},
  ]},
] as const;
const terminalLines = [
  {text:'$ codex',tone:'command'},
  {text:'> Integrate AMLOK risk intelligence',tone:'prompt'},
  {text:'↻ Reading AMLOK documentation',tone:'muted'},
  {text:'✓ API client scaffolded',tone:'success'},
  {text:'✓ Request validation added',tone:'success'},
  {text:'✓ Monitoring workflow prepared',tone:'success'},
  {text:'→ Integration ready for review',tone:'ready'},
] as const;

export function DevelopersMenu({open,onOpen,onClose}:{open:boolean;onOpen:()=>void;onClose:()=>void}) {
  const root=useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const [step,setStep]=useState(0);
  useEffect(()=>{
    if(!open)return;
    setStep(0);
    const timer=window.setInterval(()=>setStep(value=>(value+1)%12),650);
    return()=>window.clearInterval(timer);
  },[open]);
  useEffect(()=>{
    if(!open)return;
    const outside=(event:PointerEvent)=>{if(event.target instanceof Node&&!root.current?.contains(event.target))onClose();};
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){onClose();trigger.current?.focus();}};
    const resize=()=>{if(window.innerWidth<1024)onClose();};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);window.addEventListener('resize',resize);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);window.removeEventListener('resize',resize);};
  },[open,onClose]);
  const hover = useMenuHover(onOpen,onClose);
  return <div className="home-developer-menu" ref={root} {...hover} data-open={open} onBlur={event=>{if(event.relatedTarget&&!event.currentTarget.contains(event.relatedTarget))onClose();}}>
    <button className="home-developer-trigger" ref={trigger} type="button" aria-expanded={open} aria-controls="home-developer-panel" onClick={()=>{if(isHoverPointer())onOpen();else if(open)onClose();else onOpen();}} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();onOpen();requestAnimationFrame(()=>root.current?.querySelector<HTMLAnchorElement>('a')?.focus());}}}>Developers <ChevronDown size={12} aria-hidden="true"/></button>
    {open&&<div className="home-developer-panel" id="home-developer-panel" aria-label="Developer resources">
      <div className="home-developer-terminal">
        <div className="home-developer-terminal-header"><span>~/AMLOK · ZSH</span><span className="home-developer-demo"><i/>DEMO</span></div>
        <div className="home-developer-terminal-body" role="img" aria-label="Animated example: Codex reads AMLOK documentation, scaffolds an API client, adds request validation, and prepares a monitoring workflow for review.">
          <div aria-hidden="true">{terminalLines.map((line,index)=><div className={`home-developer-line ${line.tone}${index<=step?' is-visible':''}`} key={line.text}>{line.text}{index===0&&step===0&&<span className="home-developer-cursor">▍</span>}</div>)}</div>
        </div>
        <a className="home-developer-quickstart" href="https://amlok-docs.mintlify.site/overview/introduction" onClick={onClose}><span><strong>Quickstart</strong><small>BUILD WITH AMLOK</small></span><span>Read the quickstart <ArrowUpRight size={16} aria-hidden="true"/></span></a>
      </div>
      {developerGroups.map(group=><div className="home-developer-links" key={group.title}><h2>{group.title}</h2>{group.links.map(link=><a href={link.href} key={link.label} onClick={onClose}>{link.label}<ArrowUpRight size={15} aria-hidden="true"/></a>)}</div>)}
    </div>}
  </div>;
}
