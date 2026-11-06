'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Copy, Download, Search } from 'lucide-react';
import { PageActions } from './page-actions';
import integrationCatalogue from '@/content/integrations.json';

const integrationCategories = [...new Set(integrationCatalogue.map(item => item.category))];
const integrationPageSize = 12;
const integrationProviders = [...integrationCatalogue].sort((a,b) =>
  Number(b.status==='Active beta')-Number(a.status==='Active beta') || a.name.localeCompare(b.name)
);

export function IntegrationDirectory() {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const [status,setStatus]=useState('All');
  const [limit,setLimit]=useState(integrationPageSize);
  const filtered=integrationProviders.filter(item=>(category==='All'||item.category===category)&&(status==='All'||item.status===status)&&`${item.name} ${item.category} ${item.productType}`.toLowerCase().includes(query.toLowerCase().trim()));
  const visible=filtered.slice(0,limit);
  return <section className="cp-section cp-muted" id="catalogue" aria-labelledby="catalogue-title"><div className="cp-inner">
    <div className="cp-section-heading"><span className="cp-eyebrow">CONNECTION CATALOGUE</span><h2 id="catalogue-title">Your evidence. <span className="home-heading-gradient">Connected.</span></h2><p>Explore {integrationProviders.length} integrations across {integrationCategories.length} categories. Find your provider, check availability, and open its documentation for coverage and connection details.</p></div>
    <div className="cp-filter-bar">
      <label className="cp-search"><Search size={19} aria-hidden="true"/><input type="search" aria-label="Search integrations" placeholder="Search integrations" value={query} onChange={event=>{setQuery(event.target.value);setLimit(integrationPageSize);}}/></label>
      <label className="cp-select-label">Category<span className="cp-select-control"><select aria-label="Category" value={category} onChange={event=>{setCategory(event.target.value);setLimit(integrationPageSize);}}><option value="All">All categories</option>{integrationCategories.map(value=><option key={value}>{value}</option>)}</select><ChevronDown size={16} aria-hidden="true"/></span></label>
      <label className="cp-select-label">Availability<span className="cp-select-control"><select aria-label="Availability" value={status} onChange={event=>{setStatus(event.target.value);setLimit(integrationPageSize);}}><option value="All">All statuses</option><option>Active beta</option><option>In Review</option></select><ChevronDown size={16} aria-hidden="true"/></span></label>
    </div>
    <div className="cp-catalogue-summary"><p className="cp-result-count" role="status" aria-atomic="true">Showing {visible.length} of {filtered.length} {filtered.length===1?'integration':'integrations'}</p><a href="https://docs.amlok.io/integrations/status">View integration status <ArrowUpRight size={14} aria-hidden="true"/></a></div>
    <div className="cp-provider-grid" id="integration-results">{visible.map(item=><a className="cp-provider" href={item.href} key={item.id}><span className="cp-provider-logo"><img src={item.image} alt="" width={64} height={64} loading="lazy"/></span><span className="cp-provider-copy"><strong>{item.name}</strong><small>{item.category}</small><span className={`cp-provider-status${item.status==='Active beta'?' is-active':''}`}>{item.status==='Active beta'?'Active · Beta':'In review'}</span></span><ArrowUpRight size={17} aria-hidden="true"/></a>)}</div>
    {visible.length<filtered.length&&<div className="cp-catalogue-more"><button type="button" aria-controls="integration-results" onClick={()=>setLimit(value=>value+integrationPageSize)}>See more integrations <ArrowDown size={17} aria-hidden="true"/></button></div>}
    {!filtered.length&&<div className="cp-empty"><h3>No matching integrations</h3><p>Try another name, category, or availability status.</p><button className="cp-button is-secondary" onClick={()=>{setQuery('');setCategory('All');setStatus('All');setLimit(integrationPageSize);}}>Clear filters</button></div>}
  </div></section>;
}

function usageCount(value: string) {
  return Math.min(1000000, Math.max(1, Math.trunc(Number(value) || 1)));
}

export function PricingEstimator() {
  const [underwritings,setUnderwritings]=useState(100);
  const [accounts,setAccounts]=useState(200);
  const [tier,setTier]=useState('Standard');
  const rates:Record<string,[number,number]>={Standard:[8,5],Advanced:[25,8],Complex:[45,12]};
  const rate=rates[tier];
  const money=(value:number)=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(value);
  return <section className="cp-section cp-muted" aria-labelledby="estimate-title"><div className="cp-inner cp-estimator"><div><span className="cp-eyebrow">PLAN YOUR USAGE</span><h2 id="estimate-title">Make the numbers <span className="home-heading-gradient">work for you.</span></h2><p>Estimate product usage at published rates. Your agreement determines final rates and any commitments. Provider fees and taxes are separate.</p><label>Workload tier<select value={tier} onChange={event=>setTier(event.target.value)}>{Object.keys(rates).map(value=><option key={value}>{value}</option>)}</select></label><label>Underwritings per month<input type="number" min="1" max="1000000" step="1" value={underwritings} onChange={event=>setUnderwritings(usageCount(event.target.value))}/></label><label>Active monitored accounts<input type="number" min="1" max="1000000" step="1" value={accounts} onChange={event=>setAccounts(usageCount(event.target.value))}/></label></div><div className="cp-estimate-total" aria-live="polite"><span className="cp-eyebrow">ESTIMATED MONTHLY PRODUCT USAGE</span><strong>{money(underwritings*rate[0]+accounts*rate[1])}</strong><span>CAD · Shared credit balance</span><dl><div><dt>Insights · {underwritings.toLocaleString()} × {money(rate[0])}</dt><dd>{money(underwritings*rate[0])}</dd></div><div><dt>Signal · {accounts.toLocaleString()} × {money(rate[1])}</dt><dd>{money(accounts*rate[1])}</dd></div></dl><p>Usage estimate only. This is not a quote or a payment amount.</p><PageActions/></div></div></section>;
}

export function ContactComposer() {
  const [draft,setDraft]=useState<string|null>(null);
  return <section className="cp-section cp-muted" id="enquiry"><div className="cp-inner cp-contact-layout"><div><span className="cp-eyebrow">START A CONVERSATION</span><h2>What would you like <span className="home-heading-gradient">to build?</span></h2><p>Prepare a short introduction for our team. This form opens a draft in your email app so you can review it before sending.</p><a className="cp-text-link" href="mailto:support@amlok.io">support@amlok.io <ArrowUpRight size={17}/></a><p className="cp-small">Please keep borrower data, account credentials, and sensitive documents out of this message.</p></div><form className="cp-contact-form" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);const body=`Name: ${data.get('name')}\nWork email: ${data.get('email')}\nInstitution: ${data.get('institution')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`;const href=`mailto:support@amlok.io?subject=${encodeURIComponent('Amlok: '+data.get('interest'))}&body=${encodeURIComponent(body)}`;setDraft(href);window.location.href=href;}}>
      <div className="cp-form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={120}/></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength={180}/></label></div><label>Institution<input name="institution" autoComplete="organization" required maxLength={160}/></label><label>I’m interested in<select name="interest"><option>Product demo</option><option>Underwriting</option><option>Portfolio monitoring</option><option>Technical integration</option><option>Security review</option><option>Partnerships</option><option>Account support</option></select></label><label>A little about your workflow<textarea name="message" rows={5} required maxLength={2500} placeholder="What are you working on, and where could a more connected view help?"/></label><button className="cp-button" type="submit">Open email draft <ArrowUpRight size={17}/></button><p className="cp-small">By continuing, you choose to share the information in your email with Amlok. <a href="/privacy">Privacy information</a>.</p>{draft&&<p className="cp-form-status" role="status">Your draft is ready. <a href={draft}>Open it in your email app</a>, then review and send it.</p>}
    </form></div></section>;
}

const prompt=`Build an Amlok integration for our institution’s approved workflow.

Start with https://docs.amlok.io/llms.txt and the OpenAPI contract at https://docs.amlok.io/openapi/amlok-v1.json. Read the quickstart, product scope, integration security, and relevant sandbox journey before implementing endpoints. Use the current contract for exact operation names and schemas.

Ask the developer to provide the framework, intended Insights or Signal journey, workspace scope, and institution-issued sandbox base URL. Read API credentials from the server environment; never put secrets in client code, logs, prompts, or source control.

Implement input validation, workspace authorization, explicit asynchronous states, safe retries, and error handling. Verify webhook signatures against raw bytes; persist accepted events and deduplicate deliveries before processing. Retrieve authoritative results and their source evidence.

Keep approval, borrower outreach, payments, and consequential interventions in institution-owned systems. Do not invent API endpoints or convert missing evidence into a valid zero.

Validate against the provisioned sandbox, including expired access, incomplete evidence, repeated requests, duplicate events, and unavailable providers. Summarize tested behavior and remaining deployment requirements for engineering review.`;
export function CopyGuide({skill=false}:{skill?:boolean}) {
  const [state,setState]=useState<'idle'|'copied'|'failed'>('idle');
  const text=skill?`---\nname: amlok-integration\ndescription: Implement and review institution-authorized Amlok API integrations.\n---\n\n# Amlok integration guide\n\n${prompt}\n`:prompt;
  return <section className="cp-section cp-muted"><div className="cp-inner cp-guide"><div className="cp-section-heading"><span className="cp-eyebrow">{skill?'REUSABLE INTEGRATION GUIDE':'COPYABLE DEVELOPER BRIEF'}</span><h2>{skill?'A practical starting point.':'Give your agent the context.'}</h2><p>Adapt this guide to your environment and workflow. It contains instructions and references, not credentials or an API client.</p></div><div className="cp-code"><div className="cp-code-bar"><span>{skill?'SKILL.md':'integration-brief.txt'}</span><button onClick={async()=>{try{await navigator.clipboard.writeText(text);setState('copied');}catch{setState('failed');}}}>{state==='copied'?<Check size={16}/>:<Copy size={16}/>} {state==='copied'?'Copied':'Copy'}</button></div><pre tabIndex={0}>{text}</pre></div><p role="status" className="cp-small">{state==='failed'?'Clipboard access is unavailable. Select the text above or download the guide.':state==='copied'?'Copied to clipboard.':'Keep secrets and borrower information outside your instructions.'}</p><a className="cp-text-link" href={skill?'/downloads/amlok-integration-SKILL.md':'/downloads/amlok-integration-brief.txt'} download><Download size={17}/> Download {skill?'skill guide':'integration brief'}</a></div></section>;
}
