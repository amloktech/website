'use client';

import { isHoverPointer, useMenuHover } from '@/lib/use-menu-hover';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

// Shared by desktop navigation, mobile navigation, and the footer.
export const resourceGroups = [
  {title:'Read & Explore',links:[
    {label:'Research',href:'/research'},
    {label:'Blog',href:'/blog'},
    {label:'Help Center',href:'/help-center'},
    {label:'Demo Center',href:'/demo-center'},
  ]},
  {title:'Company',links:[
    {label:'About us',href:'/about-us'},
    {label:'Manifesto',href:'/manifesto'},
    {label:'Partners',href:'/partners'},
    {label:'Careers',href:'/careers'},
    {label:'Security & Compliance',href:'/security-compliance'},
    {label:'Contact',href:'/contact'},
  ]},
] as const;

export function ResourcesMenu({open,onOpen,onClose}:{open:boolean;onOpen:()=>void;onClose:()=>void}) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const outside=(event:PointerEvent)=>{if(event.target instanceof Node&&!root.current?.contains(event.target))onClose();};
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){onClose();trigger.current?.focus();}};
    const resize=()=>{if(window.innerWidth<1024)onClose();};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);window.addEventListener('resize',resize);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);window.removeEventListener('resize',resize);};
  },[open,onClose]);
  const hover = useMenuHover(onOpen,onClose);
  return <div className="home-resource-menu" ref={root} {...hover} data-open={open} onBlur={event=>{if(event.relatedTarget&&!event.currentTarget.contains(event.relatedTarget))onClose();}}>
    <button className="home-resource-trigger" ref={trigger} type="button" aria-expanded={open} aria-controls="home-resource-panel" onClick={()=>{if(isHoverPointer())onOpen();else if(open)onClose();else onOpen();}} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();onOpen();requestAnimationFrame(()=>root.current?.querySelector<HTMLAnchorElement>('.home-resource-feature')?.focus());}}}>Resources <ChevronDown size={12} aria-hidden="true"/></button>
    {open&&<div className="home-resource-panel" id="home-resource-panel" aria-label="Resources">
      <a className="home-resource-feature" href="/about-us" onClick={onClose}>
        <Image src="/images/amlok-team-updated.jpg" unoptimized alt="The AMLOK team together in their workspace." fill sizes="(max-width: 1200px) 50vw, 620px" />
        <div className="home-resource-feature-copy"><h2>Meet the team</h2><p>The people behind connected risk intelligence.</p><span>Read about AMLOK <ArrowUpRight size={16} aria-hidden="true"/></span></div>
      </a>
      {resourceGroups.map(group=><div className="home-resource-links" key={group.title}><h2>{group.title}</h2>{group.links.map(link=><a href={link.href} key={link.label} onClick={onClose}>{link.label}<ArrowUpRight size={15} aria-hidden="true"/></a>)}</div>)}
    </div>}
  </div>;
}
