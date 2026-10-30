'use client';

import { isHoverPointer, useMenuHover } from '@/lib/use-menu-hover';

import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowUpRight, Building2, ChevronDown, FileCheck2, Fingerprint, FlaskConical, Landmark, Network, PanelsTopLeft, ShieldCheck, WalletCards } from 'lucide-react';

export const solutionProducts = [
  { title:'Deal Underwriting', description:'Turn borrower evidence into policy-aligned credit assessments, with your team owning the final decision.', href:'#product-underwriting', icon:FileCheck2 },
  { title:'Portfolio monitoring', description:'Follow changing borrower conditions and surface emerging risk after capital is deployed.', href:'#product-monitoring', icon:Activity },
  { title:'Risk Simulation', description:'Test credit policies and portfolio scenarios before putting capital at risk.', href:'#loan-scale-slide-1', icon:FlaskConical },
  { title:'Foundational risk graph', description:'Connecting entities, transactions, and relationships to understand how financial risk moves.', href:'#risk-operations', icon:Network },
] as const;
export const solutionModules = [
  { title:'Verification & onboarding', description:'Connect applicant, business, and ownership evidence.', href:'#product-verification', icon:Fingerprint },
  { title:'Credit underwriting', description:'Assess capacity, policy fit, and unresolved risks.', href:'#product-underwriting', icon:FileCheck2 },
  { title:'Monitoring & early warning', description:'Follow changing borrower conditions.', href:'#product-monitoring', icon:Activity },
  { title:'Servicing & collections', description:'Support borrower-facing account workflows.', href:'#product-servicing', icon:WalletCards },
  { title:'Fraud & compliance operations', description:'Investigate suspicious activity and connected evidence.', href:'#product-investigation', icon:ShieldCheck },
  { title:'Risk simulation', description:'Test credit policies and portfolio scenarios before deployment.', href:'#loan-scale-slide-1', icon:FlaskConical },
  { title:'White-label experiences', description:'Bring AMLOK intelligence into your own branded customer journey.', href:'#loan-scale-slide-2', icon:PanelsTopLeft },
] as const;

export const solutionIndustries = [
  { title:'Consumer Lending', description:'Understand affordability, obligations, and changing borrower risk.', detail:'Combine verified financial activity, identity evidence, institution-owned policy, and ongoing behavioural signals across the consumer credit lifecycle.', href:'#consumer-risk-gaps' },
  { title:'Business Lending', description:'Resolve business risk from application through repayment.', detail:'Connect business financial activity, ownership, obligations, and ongoing risk signals from application through repayment.', href:'#risk-gaps' },
  { title:'Financial Institutions', description:'Add continuous intelligence to existing lending workflows.', detail:'Bring connected financial evidence and institution-owned policies into the lending workflows your teams already use.', href:'#platform' },
  { title:'Fintech', description:'Embed explainable risk intelligence through one API.', detail:'Connect financial intelligence, risk signals, and explainable assessments directly to your products through one API.', href:'#loan-scale-slide-4' },
  { title:'Insurtech', description:'Connect financial evidence and changing counterparty risk.', detail:'Connect financial evidence, business relationships, and ongoing signals to support underwriting and monitor changing counterparty risk.', href:'#platform' },
] as const;
export const solutionUseCases = [
  { title:'Entity & fraud resolution', description:'See the business and people behind each application.', detail:'See the business and people behind each application. Connect identity, ownership, and related-entity evidence for investigation.', href:'#product-investigation' },
  { title:'Cash-flow intelligence', description:'Turn fragmented activity into verified financial signals.', detail:'Turn fragmented activity into verified financial signals, with source evidence and financial relationships connected to each assessment.', href:'#platform' },
  { title:'Underwriting intelligence', description:'Move from fragmented data to policy-ready decisions.', detail:'Move from fragmented data to policy-ready decisions. Assess repayment capacity, credit-policy fit, and unresolved risks with supporting evidence.', href:'#product-underwriting' },
  { title:'Decision automation', description:'Apply institution-owned policy consistently.', detail:'Apply institution-owned policy consistently across your workflows, with explainable evidence and human oversight.', href:'#platform' },
  { title:'Portfolio monitoring', description:'Detect deterioration before a missed payment.', detail:'Detect deterioration before a missed payment. Follow changing financial activity and borrower behaviour with ongoing context.', href:'#product-monitoring' },
  { title:'Portfolio simulation', description:'Explore policies and scenarios before deployment.', href:'#loan-scale-slide-1' },
  { title:'Borrower servicing & collections', description:'Guide outreach with current account context.', href:'#product-servicing' },
] as const;

export function SolutionsMenu({onOpen,otherMenuOpen,homeHref=''}:{onOpen:()=>void;otherMenuOpen:boolean;homeHref?:string}) {
  const [open,setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(()=>{if(otherMenuOpen)setOpen(false);},[otherMenuOpen]);
  useEffect(()=>{
    if(!open)return;
    const dismiss = (event:PointerEvent) => {if(event.target instanceof Node&&!root.current?.contains(event.target))setOpen(false);};
    const escape = (event:KeyboardEvent) => {if(event.key==='Escape'){setOpen(false);trigger.current?.focus();}};
    const resize = () => {if(window.innerWidth<1024)setOpen(false);};
    document.addEventListener('pointerdown',dismiss);
    document.addEventListener('keydown',escape);
    window.addEventListener('resize',resize);
    return()=>{document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',escape);window.removeEventListener('resize',resize);};
  },[open]);
  const hover = useMenuHover(() => { onOpen(); setOpen(true); }, () => setOpen(false));
  return <div className="home-solutions-menu" ref={root} {...hover} data-open={open} onBlur={event=>{if(event.relatedTarget&&!event.currentTarget.contains(event.relatedTarget))setOpen(false);}}>
    <button className="home-solutions-trigger" ref={trigger} type="button" aria-expanded={open} aria-controls="home-solutions-panel" onClick={()=>{if(isHoverPointer()){onOpen();setOpen(true);}else{if(!open)onOpen();setOpen(!open);}}} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();onOpen();setOpen(true);requestAnimationFrame(()=>root.current?.querySelector<HTMLAnchorElement>('.home-solutions-product')?.focus());}}}>Solutions <ChevronDown size={12} aria-hidden="true" /></button>
    {open&&<div className="home-solutions-panel" id="home-solutions-panel" aria-label="Solutions">
      <div className="home-solutions-products" aria-label="Our products">
        {solutionProducts.map(({title,description,href,icon:Icon})=><a className="home-solutions-product" href={`${homeHref}${href}`} onClick={()=>setOpen(false)} key={title}><Icon size={23} aria-hidden="true"/><strong>{title}<ArrowUpRight size={15} aria-hidden="true"/></strong><small>{description}</small></a>)}
      </div>
      <div className="home-solutions-directory">
        <div className="home-solutions-list"><h2>Use cases</h2>{solutionUseCases.map(item=><a className="home-solutions-item" href={`${homeHref}${item.href}`} onClick={()=>setOpen(false)} key={item.title}><span>{item.title}</span><ArrowUpRight size={15} aria-hidden="true"/></a>)}<a className="home-solutions-all" href={`${homeHref}#use-cases`} onClick={()=>setOpen(false)}>All use cases <ArrowUpRight size={16} aria-hidden="true"/></a></div>
        <div className="home-solutions-list"><h2>By module</h2>{solutionModules.map(({title,href,icon:Icon})=><a className="home-solutions-item" href={`${homeHref}${href}`} onClick={()=>setOpen(false)} key={title}><Icon size={19} aria-hidden="true"/><span>{title}</span><ArrowUpRight size={15} aria-hidden="true"/></a>)}<a className="home-solutions-all" href={`${homeHref}#products`} onClick={()=>setOpen(false)}>All modules <ArrowUpRight size={16} aria-hidden="true"/></a></div>
        <div className="home-solutions-list"><h2>By industry</h2>{solutionIndustries.map((item,index)=>{const Icon=[WalletCards,Building2,Landmark,Network,ShieldCheck][index];return <a className="home-solutions-item home-solutions-industry" href={`${homeHref}${item.href}`} onClick={()=>setOpen(false)} key={item.title}><Icon size={20} aria-hidden="true"/><span><strong>{item.title}<ArrowUpRight size={15} aria-hidden="true"/></strong><small>{['Personal · Auto · Mortgage · Student · Rent','SMB · Commercial · Business financing','Banks · Credit unions · Alternative lenders','Digital lenders · Embedded finance · Platforms','Trade credit · Surety · Premium finance'][index]}</small></span></a>;})}<a className="home-solutions-all" href={`${homeHref}#risk-gaps`} onClick={()=>setOpen(false)}>Explore industries <ArrowUpRight size={16} aria-hidden="true"/></a></div>
        </div>
    </div>}
  </div>;
}
