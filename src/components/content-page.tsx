import { ArrowRight, ArrowUpRight, Check, ChevronRight, FileText, Layers, Network, ShieldCheck } from 'lucide-react';
import { SiteHeader } from './site-header';
import { ProductIllustration } from './product-illustration';
import { HomePricing } from './home-pricing';
import { ResearchLibrary } from './research-library';
import { BlogArticle, BlogPage } from './blog-page';
import { blogPosts } from '@/content/blog-posts';
import { ContactComposer, CopyGuide, GuidedDemo, HelpDirectory, IntegrationDirectory, PricingEstimator } from './page-tools';
import { findSitePage, type SitePageContent } from '@/lib/site-content';
import { siteOrigin } from '@/lib/site-config';
import partners from '@/content/partners.json';
import pageIndex from '@/content/page-index.json';

const groupNames: Record<string,string> = {products:'Products',platform:'Platform',solutions:'Use cases',modules:'Modules',industries:'Industries',developers:'Developers',compare:'Comparisons',blog:'Journal'};
const groupPaths: Record<string,string> = {products:'/products',platform:'/platform',solutions:'/solutions',modules:'/modules',industries:'/industries',developers:'/developers',compare:'/compare',blog:'/blog'};
const directoryGroups: Record<string,string> = {Platform:'Platform & products',platform:'Platform & products',products:'Platform & products',integrations:'Platform & products',pricing:'Platform & products',solutions:'Solutions & modules',modules:'Solutions & modules',industries:'Industries',developers:'Developers',changelog:'Developers',status:'Developers',research:'Resources',blog:'Resources','help-center':'Resources','demo-center':'Resources',Company:'Company',manifesto:'Company',partners:'Company',careers:'Company','security-compliance':'Company',contact:'Company','get-started':'Company',compare:'Comparisons',privacy:'Policies',cookies:'Policies',terms:'Policies','site-map':'Resources'};

function PageCards({slugs,compact=false}:{slugs:string[];compact?:boolean}) {
  return <div className={`cp-link-grid${compact?' is-compact':''}`}>{slugs.map(slug=>{const page=findSitePage(slug);return page?<a className="cp-link-card" href={'/'+page.slug} key={slug}>{!compact&&<div className="cp-card-art"><ProductIllustration kind={page.visual}/></div>}<span className="cp-eyebrow">{groupNames[slug.split('/')[0]]||'Explore AMLOK'}</span><h3>{page.label}</h3><p>{page.description}</p><span className="cp-text-link">Explore <ArrowUpRight size={17} aria-hidden="true"/></span></a>:null;})}</div>;
}

function Partners() {
  return <section className="cp-section cp-muted"><div className="cp-inner cp-partner-grid">
    {partners.map((partner,index)=><article className="cp-partner-card" key={partner.name}>
      <div className="cp-partner-art"><img src={partner.logo} alt={partner.name} width={240} height={110}/></div>
      <div className="cp-partner-copy">
        <span className="cp-eyebrow">{['Venture backing','Industry community','Startup programme'][index]}</span>
        <h2>{partner.name}</h2><p>{partner.description}</p>
        <a className="cp-text-link" href={partner.url}>Explore the relationship <ArrowUpRight size={17}/></a>
      </div>
    </article>)}
  </div></section>;
}

function Comparison({page}:{page:SitePageContent}) {
  const comparison=page.comparison!;
  return <section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-section-heading"><span className="cp-eyebrow">SCOPE BEFORE FEATURES</span><h2>Two perspectives on <span className="home-heading-gradient">your stack.</span></h2><p>{comparison.category}. Compare the job each product performs and the systems that remain responsible for the final action.</p></div><div className="cp-comparison-grid"><article><span className="cp-eyebrow">DOCUMENTED VENDOR FOCUS</span><h3>{comparison.vendor}</h3><ul>{comparison.vendorStrengths.map(item=><li key={item}><Layers size={19}/><span>{item}</span></li>)}</ul></article><article className="is-amlok"><span className="cp-eyebrow">CONNECTED RISK INTELLIGENCE</span><h3>AMLOK</h3><ul>{comparison.amlokFit.map(item=><li key={item}><Network size={19}/><span>{item}</span></li>)}</ul></article></div><div className="cp-comparison-notes"><h3>Questions to bring to your evaluation.</h3>{comparison.considerations.map((item,index)=><p key={item}><span>{String(index+1).padStart(2,'0')}</span>{item}</p>)}</div><p className="cp-small">Based on official product information reviewed 31 October 2026. Product scope can change. Confirm the capabilities and commercial terms relevant to your deployment with each provider.</p></div></section>;
}

function SecurityScope() {
  const items=[['Data protection','Encryption, scoped access, tenant separation, and deployment-specific data handling.'],['Control alignment','Review applicable SOC 2 and ISO/IEC 27001 control evidence and assurance scope.'],['AI governance','Define intended use, evaluate representative outputs, and keep review and accountability explicit.'],['Institutional review','Request the security documentation and supporting materials relevant to your deployment.']];
  return <section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-section-heading"><span className="cp-eyebrow">A SCOPED SECURITY REVIEW</span><h2>Understand the controls. <span className="home-heading-gradient">Inspect the evidence.</span></h2></div><div className="cp-trust-grid">{items.map(([title,body],index)=>{const Icon=[ShieldCheck,Check,Network,FileText][index];return <article key={title}><Icon size={30}/><h3>{title}</h3><p>{body}</p></article>;})}</div><p className="cp-small">Assurance materials apply to their stated entity, service, period, and deployment. Provider reports and control alignment are not interchangeable with a certification of every AMLOK workflow.</p></div></section>;
}

export function ContentPage({page}:{page:SitePageContent}) {
  if (page.slug === 'blog') return <BlogPage/>;
  const blogPost = blogPosts.find(post => page.slug === `blog/${post.slug}`);
  if (blogPost) return <BlogArticle page={page} post={blogPost}/>;
  const group=page.slug.split('/')[0];
  const legal=page.kind==='legal';
  const editorial=['article','manifesto','legal'].includes(page.kind);
  const primary=page.primary||{label:page.kind==='article'?'Explore the platform':page.kind==='research'?'Explore the library':page.kind==='demo'?'Start the walkthrough':page.kind==='integrations'?'Explore integrations':'Talk to us',href:page.kind==='article'?'/platform':page.kind==='research'?'#all-posts':page.kind==='demo'?'#walkthrough':page.kind==='integrations'?'#catalogue':page.slug==='contact'?'#enquiry':'/contact'};
  const breadcrumb=[{name:'Home',item:siteOrigin},...(page.slug.includes('/')?[{name:groupNames[group]||group,item:siteOrigin+(groupPaths[group]||'/')}]:[]),{name:page.label,item:siteOrigin+'/'+page.slug}];
  const schema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:breadcrumb.map((item,index)=>({'@type':'ListItem',position:index+1,...item}))};
  return <main className={`home-page cp-page cp-${page.kind}`} id="top">
    <SiteHeader/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <section className={`cp-hero${editorial?' is-editorial':''}`} aria-labelledby="page-title"><div className="cp-inner">
      <nav className="cp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13}/>{page.slug.includes('/')&&<><a href={groupPaths[group]}>{groupNames[group]}</a><ChevronRight size={13}/></>}<span aria-current="page">{page.label}</span></nav>
      <div className="cp-hero-grid"><div className="cp-hero-copy"><span className="cp-eyebrow"><i/>{page.label}</span><h1 id="page-title">{page.title}<br/><span className="home-heading-gradient">{page.accent}</span></h1><p>{page.description}</p>{!legal&&<div className="cp-actions"><a className="cp-button" href={primary.href}>{primary.label}<ArrowUpRight size={18}/></a>{page.slug!=='developers'&&page.kind!=='research'&&<a className="cp-text-link" href={page.kind==='developer'?'/developers':'/developers/api-reference'}>{page.kind==='developer'?'Developer overview':'Explore API'}<ArrowRight size={17}/></a>}</div>}{page.kind==='article'&&<span className="cp-article-meta">AMLOK Editorial · 31 October 2026 · 3 minute read</span>}</div>{!editorial&&(page.kind==='research'?<div className="cp-research-graphic"><ProductIllustration kind={page.visual} brandFill="hero"/></div>:<div className="cp-hero-visual"><div className="cp-visual-top"><span>AMLOK / CONNECTED INTELLIGENCE</span><i/></div><ProductIllustration kind={page.visual} brandFill="hero"/><div className="cp-visual-bottom"><span>Evidence</span><span>Context</span><span>Human judgment</span></div></div>)}</div>
    </div></section>
    {page.notice&&<div className="cp-inner"><p className="cp-notice">{page.notice}</p></div>}
    {page.cards&&<section className="cp-section cp-muted"><div className="cp-inner"><PageCards slugs={page.cards}/></div></section>}
    {page.kind==='integrations'&&<IntegrationDirectory/>}
    {page.kind==='contact'&&<ContactComposer/>}
    {page.kind==='pricing'&&<><HomePricing/><PricingEstimator/></>}
    {page.kind==='demo'&&<GuidedDemo/>}
    {page.kind==='research'&&<ResearchLibrary/>}
    {page.kind==='partners'&&<Partners/>}
    {page.kind==='help'&&<HelpDirectory/>}
    {page.kind==='sitemap'&&<section className="cp-section"><div className="cp-inner cp-site-map">{Object.entries(Object.groupBy(pageIndex,page=>directoryGroups[page.category]||'Explore AMLOK')).map(([group,entries])=><nav key={group} aria-label={group}><h2>{group}</h2><ul>{entries?.map(entry=><li key={entry.path}><a href={entry.path}>{entry.title}<ArrowUpRight size={14}/></a></li>)}</ul></nav>)}</div></section>}
    {page.kind==='comparison'&&<Comparison page={page}/>}
    {page.slug==='security-compliance'&&<SecurityScope/>}
    {page.slug==='developers/integration-prompt'&&<CopyGuide/>}
    {page.slug==='developers/agent-skills'&&<CopyGuide skill/>}
    {page.slug==='changelog'&&<section className="cp-section cp-muted"><div className="cp-inner cp-version"><span className="cp-pill">CURRENT DOCUMENTED REFERENCE</span><h2>API 1.4.2</h2><p>A starting point for reviewing your client against the published contract. Confirm the version supported by your institution’s environment.</p><a className="cp-text-link" href="https://docs.amlok.io/api-reference/versioning">Versioning & compatibility <ArrowUpRight size={17}/></a></div></section>}
    {page.sections.length>0&&<div className={editorial?'cp-editorial-body':undefined}>{page.sections.map((section,index)=><section className="cp-section cp-content-section" key={section.title}><div className="cp-inner"><div className="cp-section-intro">{editorial&&<span className="cp-eyebrow">{legal?'AMLOK / INFORMATION':`PERSPECTIVE ${String(index+1).padStart(2,'0')}`}</span>}<h2>{section.title}</h2><p>{section.body}</p>{section.href&&<a className="cp-text-link" href={section.href}>View notices <ArrowUpRight size={16}/></a>}</div>{section.items&&<div className="cp-feature-grid">{section.items.map((item,itemIndex)=><article key={item.title}><span className="cp-feature-number">{String(itemIndex+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>}</div></section>)}</div>}
    {page.steps.length>0&&<section className="cp-section cp-workflow"><div className="cp-inner"><span className="cp-eyebrow">FROM EVIDENCE TO ACTION</span><h2>A clear path <span>through the workflow.</span></h2><ol className="cp-step-grid">{page.steps.map((step,index)=><li key={step.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol></div></section>}
    {page.links&&<section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-section-heading"><span className="cp-eyebrow">BUILD WITH THE RIGHT REFERENCES</span><h2>Tools and documentation.</h2></div><div className="cp-download-grid">{page.links.map(link=><a key={link.url} href={link.url}><FileText size={22}/><span>{link.title}</span><ArrowUpRight size={17}/></a>)}</div></div></section>}
    {page.faq.length>0&&<section className="cp-section"><div className="cp-inner cp-faq"><span className="cp-eyebrow">COMMON QUESTIONS</span><h2>A little more context.</h2>{page.faq.map(item=><details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>}
    {page.related.length>0&&<section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-related-heading"><span className="cp-eyebrow">KEEP EXPLORING</span><h2>Connect the next piece.</h2></div><PageCards slugs={page.related} compact/></div></section>}
    {!legal&&page.slug!=='contact'&&<section className="cp-section cp-closing"><div className="cp-inner"><span className="cp-eyebrow"><i/>BUILD WITH AMLOK</span><h2>Make the full picture<br/><span className="home-heading-gradient">part of your next decision.</span></h2><a className="cp-button" href="/contact">Let’s talk <ArrowUpRight size={18}/></a></div></section>}
  </main>;
}
