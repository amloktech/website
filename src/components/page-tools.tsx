'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, Download, Search } from 'lucide-react';
import { ProductIllustration, type IllustrationKind } from './product-illustration';
import { integrationLogoRows } from './home-connect-logos';

const categories: Record<string, string> = {
  Shopify:'Commerce',Stripe:'Payments',PayPal:'Payments',Square:'Payments',Amazon:'Commerce',Walmart:'Commerce',eBay:'Commerce',Etsy:'Commerce','Adobe Commerce':'Commerce',WooCommerce:'Commerce',BigCommerce:'Commerce',Wix:'Commerce',
  'Microsoft Dynamics 365':'Enterprise',Salesforce:'Enterprise',QuickBooks:'Accounting',Xero:'Accounting',Oracle:'Enterprise',SAP:'Enterprise',Workday:'Enterprise',Sage:'Accounting',Zoho:'Enterprise',FreshBooks:'Accounting',Webflow:'Commerce',Squarespace:'Commerce',
  'Mastercard Open Finance':'Financial data',Plaid:'Financial data',Flinks:'Financial data',FICO:'Financial data',Experian:'Financial data',nCino:'Lending systems',Lightspeed:'Payments',Clover:'Payments',Temenos:'Lending systems',Adyen:'Payments',PrestaShop:'Commerce',GoDaddy:'Commerce',
};

export function IntegrationDirectory() {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const providers=integrationLogoRows.flat();
  const filtered=providers.filter(item=>(category==='All'||categories[item.name]===category)&&`${item.name} ${categories[item.name]}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <section className="cp-section cp-muted" id="catalogue" aria-labelledby="catalogue-title"><div className="cp-inner">
    <div className="cp-section-heading"><span className="cp-eyebrow">CONNECTION CATALOGUE</span><h2 id="catalogue-title">Your evidence. <span className="home-heading-gradient">Connected.</span></h2><p>Explore a selection from the documented catalogue. Confirm provider coverage and availability for your deployment.</p></div>
    <div className="cp-filter-bar"><label className="cp-search"><Search size={19}/><input type="search" aria-label="Search integrations" placeholder="Search providers or categories" value={query} onChange={event=>setQuery(event.target.value)}/></label><label className="cp-select-label">Category<select value={category} onChange={event=>setCategory(event.target.value)}>{['All',...new Set(Object.values(categories))].map(value=><option key={value}>{value}</option>)}</select></label></div>
    <p className="cp-result-count" role="status">{filtered.length} {filtered.length===1?'provider':'providers'}</p>
    <div className="cp-provider-grid">{filtered.map(item=><a className="cp-provider" href="https://docs.amlok.io/integrations" key={item.name}><span className="cp-provider-logo"><img src={item.image} alt="" width={64} height={64} loading="lazy"/></span><span><strong>{item.name}</strong><small>{categories[item.name]}</small></span><ArrowUpRight size={17}/></a>)}</div>
    {!filtered.length&&<div className="cp-empty"><h3>No matching providers</h3><p>Try another name or category, or discuss a connection with our team.</p><button className="cp-button is-secondary" onClick={()=>{setQuery('');setCategory('All');}}>Clear filters</button></div>}
  </div></section>;
}

export function PricingEstimator() {
  const [underwritings,setUnderwritings]=useState(100);
  const [accounts,setAccounts]=useState(200);
  const [tier,setTier]=useState('Standard');
  const rates:Record<string,[number,number]>={Standard:[8,5],Advanced:[25,8],Complex:[45,12]};
  const rate=rates[tier];
  const money=(value:number)=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(value);
  return <section className="cp-section cp-muted" aria-labelledby="estimate-title"><div className="cp-inner cp-estimator"><div><span className="cp-eyebrow">PLAN YOUR USAGE</span><h2 id="estimate-title">Make the numbers <span className="home-heading-gradient">work for you.</span></h2><p>Estimate product usage at published rates. Your agreement determines final rates and any commitments. Provider fees and taxes are separate.</p><label>Workload tier<select value={tier} onChange={event=>setTier(event.target.value)}>{Object.keys(rates).map(value=><option key={value}>{value}</option>)}</select></label><label>Underwritings per month<input type="number" min="0" max="1000000" value={underwritings} onChange={event=>setUnderwritings(Math.min(1000000,Math.max(0,Number(event.target.value)||0)))}/></label><label>Active monitored accounts<input type="number" min="0" max="1000000" value={accounts} onChange={event=>setAccounts(Math.min(1000000,Math.max(0,Number(event.target.value)||0)))}/></label></div><div className="cp-estimate-total" aria-live="polite"><span className="cp-eyebrow">ESTIMATED MONTHLY PRODUCT USAGE</span><strong>{money(underwritings*rate[0]+accounts*rate[1])}</strong><span>CAD · Shared credit balance</span><dl><div><dt>Insights · {underwritings.toLocaleString()} × {money(rate[0])}</dt><dd>{money(underwritings*rate[0])}</dd></div><div><dt>Signal · {accounts.toLocaleString()} × {money(rate[1])}</dt><dd>{money(accounts*rate[1])}</dd></div></dl><p>Usage estimate only. This is not a quote or a payment amount.</p><a className="cp-button" href="/contact">Discuss your volume <ArrowUpRight size={17}/></a></div></div></section>;
}

export function ContactComposer() {
  const [draft,setDraft]=useState<string|null>(null);
  return <section className="cp-section cp-muted" id="enquiry"><div className="cp-inner cp-contact-layout"><div><span className="cp-eyebrow">START A CONVERSATION</span><h2>What would you like <span className="home-heading-gradient">to build?</span></h2><p>Prepare a short introduction for our team. This form opens a draft in your email app so you can review it before sending.</p><a className="cp-text-link" href="mailto:support@amlok.tech">support@amlok.tech <ArrowUpRight size={17}/></a><p className="cp-small">Please keep borrower data, account credentials, and sensitive documents out of this message.</p></div><form className="cp-contact-form" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);const body=`Name: ${data.get('name')}\nWork email: ${data.get('email')}\nInstitution: ${data.get('institution')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`;const href=`mailto:support@amlok.tech?subject=${encodeURIComponent('AMLOK — '+data.get('interest'))}&body=${encodeURIComponent(body)}`;setDraft(href);window.location.href=href;}}>
      <div className="cp-form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={120}/></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength={180}/></label></div><label>Institution<input name="institution" autoComplete="organization" required maxLength={160}/></label><label>I’m interested in<select name="interest"><option>Product demo</option><option>Underwriting</option><option>Portfolio monitoring</option><option>Technical integration</option><option>Security review</option><option>Partnerships</option><option>Account support</option></select></label><label>A little about your workflow<textarea name="message" rows={5} required maxLength={2500} placeholder="What are you working on, and where could a more connected view help?"/></label><button className="cp-button" type="submit">Open email draft <ArrowUpRight size={17}/></button><p className="cp-small">By continuing, you choose to share the information in your email with AMLOK. <a href="/privacy">Privacy information</a>.</p>{draft&&<p className="cp-form-status" role="status">Your draft is ready. <a href={draft}>Open it in your email app</a>, then review and send it.</p>}
    </form></div></section>;
}

const journeys:Array<{label:string;kind:IllustrationKind;steps:Array<{title:string;body:string}>}>=[
  {label:'Underwriting',kind:'underwriting',steps:[{title:'Connect the evidence',body:'An application, authorized sources, and a ready input manifest define the assessment.'},{title:'Assess the context',body:'Review capacity, obligations, and policy fit with the supporting records.'},{title:'Review the result',body:'Your team resolves open questions and owns the final credit decision.'}]},
  {label:'Monitoring',kind:'behaviour-insights',steps:[{title:'Start from a baseline',body:'Use the approved underwriting context as the reference for ongoing review.'},{title:'Follow new evidence',body:'Compare newly available records with the borrower’s established pattern.'},{title:'Review the signal',body:'Inspect the evidence behind a change before your institution decides what to do.'}]},
  {label:'Investigation',kind:'investigation',steps:[{title:'Notice a connection',body:'Two records share an identifier that warrants a closer look.'},{title:'Trace the evidence',body:'Check source records, entity context, and the relationship behind the match.'},{title:'Resolve the question',body:'Document what the evidence supports. A possible match alone is not a finding of fraud.'}]},
];
export function GuidedDemo() {
  const [journey,setJourney]=useState(0);const [step,setStep]=useState(0);const current=journeys[journey];
  return <section className="cp-section cp-muted" id="walkthrough" aria-labelledby="walkthrough-title"><div className="cp-inner"><span className="cp-eyebrow">ILLUSTRATIVE PRODUCT WALKTHROUGH</span><h2 id="walkthrough-title">Follow the evidence.</h2><div className="cp-tabs" aria-label="Choose a workflow">{journeys.map((item,index)=><button key={item.label} type="button" aria-pressed={journey===index} onClick={()=>{setJourney(index);setStep(0);}}>{item.label}</button>)}</div><div className="cp-demo"><div className="cp-demo-art"><ProductIllustration key={current.kind} kind={current.kind} step={step}/><span>Illustrative workflow · No live borrower data</span></div><div className="cp-demo-copy"><span className="cp-eyebrow">STEP {String(step+1).padStart(2,'0')} / 03</span><div aria-live="polite"><h3>{current.steps[step].title}</h3><p>{current.steps[step].body}</p></div><div className="cp-demo-controls">{current.steps.map((item,index)=><button key={item.title} aria-label={`Step ${index+1}: ${item.title}`} aria-pressed={index===step} onClick={()=>setStep(index)}>{index+1}</button>)}</div><button className="cp-button" onClick={()=>setStep(value=>(value+1)%current.steps.length)}>{step===2?'Replay journey':'Next step'} <ArrowRight size={17}/></button></div></div></div></section>;
}

const prompt=`Build an AMLOK integration for our institution’s approved workflow.

Start with https://docs.amlok.io/llms.txt and the OpenAPI contract at https://docs.amlok.io/openapi/amlok-v1.json. Read the quickstart, product scope, integration security, and relevant sandbox journey before implementing endpoints. Use the current contract for exact operation names and schemas.

Ask the developer to provide the framework, intended Insights or Signal journey, workspace scope, and institution-issued sandbox base URL. Read API credentials from the server environment; never put secrets in client code, logs, prompts, or source control.

Implement input validation, workspace authorization, explicit asynchronous states, safe retries, and error handling. Verify webhook signatures against raw bytes; persist accepted events and deduplicate deliveries before processing. Retrieve authoritative results and their source evidence.

Keep approval, borrower outreach, payments, and consequential interventions in institution-owned systems. Do not invent API endpoints or convert missing evidence into a valid zero.

Validate against the provisioned sandbox, including expired access, incomplete evidence, repeated requests, duplicate events, and unavailable providers. Summarize tested behavior and remaining deployment requirements for engineering review.`;
export function CopyGuide({skill=false}:{skill?:boolean}) {
  const [state,setState]=useState<'idle'|'copied'|'failed'>('idle');
  const text=skill?`---\nname: amlok-integration\ndescription: Implement and review institution-authorized AMLOK API integrations.\n---\n\n# AMLOK integration guide\n\n${prompt}\n`:prompt;
  return <section className="cp-section cp-muted"><div className="cp-inner cp-guide"><div className="cp-section-heading"><span className="cp-eyebrow">{skill?'REUSABLE INTEGRATION GUIDE':'COPYABLE DEVELOPER BRIEF'}</span><h2>{skill?'A practical starting point.':'Give your agent the context.'}</h2><p>Adapt this guide to your environment and workflow. It contains instructions and references, not credentials or an API client.</p></div><div className="cp-code"><div className="cp-code-bar"><span>{skill?'SKILL.md':'integration-brief.txt'}</span><button onClick={async()=>{try{await navigator.clipboard.writeText(text);setState('copied');}catch{setState('failed');}}}>{state==='copied'?<Check size={16}/>:<Copy size={16}/>} {state==='copied'?'Copied':'Copy'}</button></div><pre tabIndex={0}>{text}</pre></div><p role="status" className="cp-small">{state==='failed'?'Clipboard access is unavailable. Select the text above or download the guide.':state==='copied'?'Copied to clipboard.':'Keep secrets and borrower information outside your instructions.'}</p><a className="cp-text-link" href={skill?'/downloads/amlok-integration-SKILL.md':'/downloads/amlok-integration-brief.txt'} download><Download size={17}/> Download {skill?'skill guide':'integration brief'}</a></div></section>;
}

const helpGuides=[
  {title:'Get access and prepare your workspace',category:'Getting started',url:'/api-reference/onboarding',body:'Environment setup, credentials, and your institution’s integration scope.'},
  {title:'Complete your first API journey',category:'Developers',url:'/api-reference/quickstart',body:'Follow the first request through to a useful result.'},
  {title:'Connect your evidence sources',category:'Integrations',url:'/integrations',body:'Explore the catalogue and confirm provider coverage.'},
  {title:'Test with synthetic records',category:'Developers',url:'/api-reference/sandbox-journeys',body:'Validate product journeys and expected failure states.'},
  {title:'Understand product billing',category:'Billing',url:'/pricing/overview',body:'Review rates, workload tiers, and shared credits.'},
  {title:'Manage your account',category:'Account',url:'/support/account-management',body:'Find guidance for account access and portal controls.'},
  {title:'Troubleshoot an integration',category:'Developers',url:'/support/troubleshooting',body:'Gather the right diagnostics and identify the next step.'},
  {title:'Request security information',category:'Security',url:'/security/due-diligence',body:'Prepare for your institution’s review.'},
  {title:'Report a production issue',category:'Support',url:'/support/severity-and-escalation',body:'Understand severity, escalation, and support contacts.'},
];
export function HelpDirectory() {
  const [query,setQuery]=useState('');
  const filtered=useMemo(()=>helpGuides.filter(item=>`${item.title} ${item.category} ${item.body}`.toLowerCase().includes(query.toLowerCase().trim())),[query]);
  return <section className="cp-section cp-muted"><div className="cp-inner"><label className="cp-search cp-help-search"><Search size={20}/><input aria-label="Search help guides" placeholder="Search billing, onboarding, webhooks…" value={query} onChange={event=>setQuery(event.target.value)} type="search"/></label><p className="cp-result-count" role="status">{filtered.length} guides</p><div className="cp-link-grid">{filtered.map(item=><a className="cp-link-card" key={item.title} href={'https://docs.amlok.io'+item.url}><span className="cp-eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.body}</p><span className="cp-text-link">Read the guide <ArrowUpRight size={17}/></span></a>)}</div>{!filtered.length&&<p className="cp-empty">No guide matches that search. Try another term or <a href="/contact">contact support</a>.</p>}</div></section>;
}
