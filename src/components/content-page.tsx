import { BrandText } from './ui';
import { ServiceStatus } from './service-status';
import { LegalPage } from './legal-page';
import { legalPolicies } from '@/content/legal';
import { IndustryPage, IndustriesOverview } from './industry-page';
import { industries } from '@/content/industries';
import { ModulePage, ModulesOverview } from './module-page';
import { moduleDetails } from '@/content/modules';
import { UseCasePage, UseCasesOverview } from './use-case-page';
import { useCaseDetails } from '@/content/use-cases';
import { ArrowUpRight, Check, ChevronRight, FileText, Layers, Network, ShieldCheck } from 'lucide-react';
import { PageActions } from './page-actions';
import { SiteHeader } from './site-header';
import { ProductIllustration } from './product-illustration';
import { HomePricing } from './home-pricing';
import { ResearchLibrary } from './research-library';
import { ResearchListing } from './research-listing';
import { BlogArticle, BlogPage } from './blog-page';
import { blogPosts } from '@/content/blog-posts';
import { findPublication } from '@/lib/publications';
import { PublicationPage } from './publication-page';
import { ManifestoPage } from './manifesto-page';
import { RiskSimulationPage } from './risk-simulation-page';
import { MonitoringPage } from './monitoring-page';
import { UnderwritingPage } from './underwriting-page';
import { ContactComposer, CopyGuide, IntegrationDirectory, PricingEstimator } from './page-tools';
import { findSitePage, type SitePageContent } from '@/lib/site-content';
import { siteOrigin } from '@/lib/site-config';
import pageIndex from '@/content/page-index.json';

const groupNames: Record<string,string> = {products:'Products',platform:'Platform',solutions:'Use cases',modules:'Modules',industries:'Industries',developers:'Developers',compare:'Comparisons',blog:'Journal'};
const groupPaths: Record<string,string> = {products:'/products',platform:'/platform',solutions:'/solutions',modules:'/modules',industries:'/industries',developers:'/developers',compare:'/compare',blog:'/blog'};
const directoryGroups: Record<string,string> = {Platform:'Platform & products',platform:'Platform & products',products:'Platform & products',integrations:'Platform & products',pricing:'Platform & products',solutions:'Solutions & modules',modules:'Solutions & modules',industries:'Industries',developers:'Developers',changelog:'Developers',status:'Developers',research:'Resources','case-studies':'Resources',whitepapers:'Resources','industry-guides':'Resources',blog:'Resources',Company:'Company',manifesto:'Company',careers:'Company','security-compliance':'Company',contact:'Company','get-started':'Company',compare:'Comparisons',privacy:'Policies',cookies:'Policies',terms:'Policies','site-map':'Resources'};

function PageCards({slugs,compact=false}:{slugs:string[];compact?:boolean}) {
  return <div className={`cp-link-grid${compact?' is-compact':''}`}>{slugs.map(slug=>{const page=findSitePage(slug);return page?<a className="cp-link-card" href={'/'+page.slug} key={slug}>{!compact&&<div className="cp-card-art"><ProductIllustration kind={page.visual}/></div>}<span className="cp-eyebrow"><BrandText>{groupNames[slug.split('/')[0]]||'Explore Amlok'}</BrandText></span><h3>{page.label}</h3><p>{page.description}</p><span className="cp-text-link">Explore <ArrowUpRight size={17} aria-hidden="true"/></span></a>:null;})}</div>;
}

function Comparison({page}:{page:SitePageContent}) {
  const comparison=page.comparison!;
  return <section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-section-heading"><span className="cp-eyebrow">SCOPE BEFORE FEATURES</span><h2>Two perspectives on <span className="home-heading-gradient">your stack.</span></h2><p>{comparison.category}. Compare the job each product performs and the systems that remain responsible for the final action.</p></div><div className="cp-comparison-grid"><article><span className="cp-eyebrow">DOCUMENTED VENDOR FOCUS</span><h3>{comparison.vendor}</h3><ul>{comparison.vendorStrengths.map(item=><li key={item}><Layers size={19}/><span>{item}</span></li>)}</ul></article><article className="is-amlok"><span className="cp-eyebrow">CONNECTED RISK INTELLIGENCE</span><h3>Amlok</h3><ul>{comparison.amlokFit.map(item=><li key={item}><Network size={19}/><span>{item}</span></li>)}</ul></article></div><div className="cp-comparison-notes"><h3>Questions to bring to your evaluation.</h3>{comparison.considerations.map((item,index)=><p key={item}><span>{String(index+1).padStart(2,'0')}</span>{item}</p>)}</div><p className="cp-small">Based on official product information reviewed 31 October 2026. Product scope can change. Confirm the capabilities and commercial terms relevant to your deployment with each provider.</p></div></section>;
}

function SecurityScope() {
  const items=[['Data protection','Encryption, scoped access, tenant separation, and deployment-specific data handling.'],['Control alignment','Review applicable SOC 2 and ISO/IEC 27001 control evidence and assurance scope.'],['AI governance','Define intended use, evaluate representative outputs, and keep review and accountability explicit.'],['Institutional review','Request the security documentation and supporting materials relevant to your deployment.']];
  return <section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-section-heading"><span className="cp-eyebrow">A SCOPED SECURITY REVIEW</span><h2>Understand the controls. <span className="home-heading-gradient">Inspect the evidence.</span></h2></div><div className="cp-trust-grid">{items.map(([title,body],index)=>{const Icon=[ShieldCheck,Check,Network,FileText][index];return <article key={title}><Icon size={30}/><h3>{title}</h3><p>{body}</p></article>;})}</div><p className="cp-small">Assurance materials apply to their stated entity, service, period, and deployment. Provider reports and control alignment are not interchangeable with a certification of every Amlok workflow.</p></div></section>;
}

export function ContentPage({page}:{page:SitePageContent}) {
  const policy = legalPolicies.find(item => item.slug === page.slug);
  if (policy) return <LegalPage policy={policy}/>;
  if (page.slug === 'industries') return <IndustriesOverview/>;
  const industry = industries.find(item => `industries/${item.slug}` === page.slug);
  if (industry) return <IndustryPage industry={industry}/>;
  if (page.slug === 'modules') return <ModulesOverview/>;
  if (page.slug in moduleDetails) return <ModulePage detail={moduleDetails[page.slug as keyof typeof moduleDetails]}/>;
  if (page.slug === 'solutions') return <UseCasesOverview page={page}/>;
  const useCase = useCaseDetails.find(item => item.slug === page.slug);
  if (useCase) return <UseCasePage detail={useCase}/>;
  if (page.slug === 'platform/risk-simulation') return <RiskSimulationPage page={page}/>;
  if (page.slug === 'products/portfolio-monitoring') return <MonitoringPage page={page}/>;
  if (page.slug === 'products/underwriting') return <UnderwritingPage page={page}/>;
  if (page.kind === 'manifesto') return <ManifestoPage page={page}/>;
  if (page.slug === 'blog') return <BlogPage/>;
  const publication = findPublication(page.slug);
  if (publication) return <PublicationPage publication={publication}/>;
  const blogPost = blogPosts.find(post => page.slug === `blog/${post.slug}`);
  if (blogPost) return <BlogArticle page={page} post={blogPost}/>;
  const group=page.slug.split('/')[0];
  const legal=page.kind==='legal';
  const researchCollection = ['research','whitepapers','industry-guides'].includes(page.slug);
  const collectionLabel = page.slug==='whitepapers'?'whitepapers':page.slug==='industry-guides'?'industry guides':'research';
  const editorial=['article','manifesto','legal'].includes(page.kind);
  const breadcrumb=[{name:'Home',item:siteOrigin},...(page.slug.includes('/')?[{name:groupNames[group]||group,item:siteOrigin+(groupPaths[group]||'/')}]:[]),{name:page.label,item:siteOrigin+'/'+page.slug}];
  const schema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:breadcrumb.map((item,index)=>({'@type':'ListItem',position:index+1,...item}))};
  return <main className={`home-page cp-page cp-${page.kind}`} id="top">
    <SiteHeader/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <section className={`cp-hero${editorial?' is-editorial':''}`} aria-labelledby="page-title"><div className="cp-inner">
      <nav className="cp-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><ChevronRight size={13}/>{page.slug.includes('/')&&<><a href={groupPaths[group]}>{groupNames[group]}</a><ChevronRight size={13}/></>}<span aria-current="page">{page.label}</span></nav>
      <div className="cp-hero-grid"><div className="cp-hero-copy"><span className="cp-eyebrow"><i/><BrandText>{page.label}</BrandText></span><h1 id="page-title">{page.title}<br/><span className="home-heading-gradient">{page.accent}</span></h1><p>{page.description}</p>{!legal&&(page.slug==='status'?<div className="cp-actions"><a className="cp-button" href="#public-status">Check live status <ArrowUpRight size={17} aria-hidden="true"/></a><a className="cp-button cp-button-secondary" href="mailto:support@amlok.io">Contact support <ArrowUpRight size={17} aria-hidden="true"/></a></div>:<PageActions/>)}{page.kind==='article'&&<span className="cp-article-meta">Amlok Editorial · 31 October 2026 · 3 minute read</span>}</div>{!editorial&&(page.kind==='research'?<div className="cp-research-graphic"><ProductIllustration kind={page.visual} brandFill="hero"/></div>:<div className="cp-hero-visual"><div className="cp-visual-top"><span>Amlok / CONNECTED INTELLIGENCE</span><i/></div><ProductIllustration kind={page.visual} brandFill="hero"/><div className="cp-visual-bottom"><span>Evidence</span><span>Context</span><span>Human judgment</span></div></div>)}</div>
    </div></section>
    {page.slug==='status'&&<ServiceStatus/>}
    {page.notice&&<div className="cp-inner"><p className="cp-notice">{page.notice}</p></div>}
    {page.cards&&<section className="cp-section cp-muted"><div className="cp-inner"><PageCards slugs={page.cards}/></div></section>}
    {page.kind==='integrations'&&<IntegrationDirectory/>}
    {page.kind==='contact'&&<ContactComposer/>}
    {page.kind==='pricing'&&<><HomePricing/><PricingEstimator/></>}
    {page.slug==='research'&&<ResearchLibrary/>}
    {(page.slug==='whitepapers'||page.slug==='industry-guides')&&<ResearchListing collection={page.slug}/>}
    {page.kind==='sitemap'&&<section className="cp-section"><div className="cp-inner cp-site-map">{Object.entries(Object.groupBy(pageIndex,page=>directoryGroups[page.category]||'Explore Amlok')).map(([group,entries])=><nav key={group} aria-label={group}><h2>{group}</h2><ul>{entries?.map(entry=><li key={entry.path}><a href={entry.path}>{entry.title}<ArrowUpRight size={14}/></a></li>)}</ul></nav>)}</div></section>}
    {page.kind==='comparison'&&<Comparison page={page}/>}
    {page.slug==='security-compliance'&&<SecurityScope/>}
    {page.slug==='developers/integration-prompt'&&<CopyGuide/>}
    {page.slug==='developers/agent-skills'&&<CopyGuide skill/>}
    {page.slug==='changelog'&&<section className="cp-section cp-muted"><div className="cp-inner cp-version"><span className="cp-pill">CURRENT DOCUMENTED REFERENCE</span><h2>API 1.4.2</h2><p>A starting point for reviewing your client against the published contract. Confirm the version supported by your institution’s environment.</p><a className="cp-text-link" href="https://docs.amlok.io/api-reference/versioning">Versioning & compatibility <ArrowUpRight size={17}/></a></div></section>}
    {page.sections.length>0&&<div className={editorial?'cp-editorial-body':undefined}>{page.sections.map((section,index)=><section className="cp-section cp-content-section" key={section.title}><div className="cp-inner"><div className="cp-section-intro">{editorial&&<span className="cp-eyebrow"><BrandText>{legal?'Amlok / INFORMATION':`PERSPECTIVE ${String(index+1).padStart(2,'0')}`}</BrandText></span>}<h2>{section.title}</h2><p>{section.body}</p>{section.href&&<a className="cp-text-link" href={section.href}>View notices <ArrowUpRight size={16}/></a>}</div>{section.items&&<div className="cp-feature-grid">{section.items.map((item,itemIndex)=><article key={item.title}><span className="cp-feature-number">{String(itemIndex+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>}</div></section>)}</div>}
    {page.steps.length>0&&<section className="cp-section cp-workflow"><div className="cp-inner"><span className="cp-eyebrow">FROM EVIDENCE TO ACTION</span><h2>A clear path <span>through the workflow.</span></h2><ol className="cp-step-grid">{page.steps.map((step,index)=><li key={step.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol></div></section>}
    {page.links&&<section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-section-heading"><span className="cp-eyebrow">BUILD WITH THE RIGHT REFERENCES</span><h2>Tools and documentation.</h2></div><div className="cp-download-grid">{page.links.map(link=><a key={link.url} href={link.url}><FileText size={22}/><span>{link.title}</span><ArrowUpRight size={17}/></a>)}</div></div></section>}
    {page.faq.length>0&&<section className="cp-section"><div className="cp-inner cp-faq"><span className="cp-eyebrow">COMMON QUESTIONS</span><h2>A little more context.</h2>{page.faq.map(item=><details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>}
    {page.related.length>0&&<section className="cp-section cp-muted"><div className="cp-inner"><div className="cp-related-heading"><span className="cp-eyebrow">KEEP EXPLORING</span><h2>Connect the next piece.</h2></div><PageCards slugs={page.related} compact/></div></section>}
    {!legal&&page.slug!=='contact'&&<section className="cp-section cp-closing"><div className="cp-inner">{researchCollection?<><span className="cp-eyebrow"><i/>KEEP READING</span><h2>More perspectives.<br/><span className="home-heading-gradient">A clearer view of risk.</span></h2><div className="cp-actions"><a className="cp-button" href="#all-posts">Explore {collectionLabel} <ArrowUpRight size={18} aria-hidden="true"/></a></div></>:<><span className="cp-eyebrow"><i/><BrandText>BUILD WITH Amlok</BrandText></span><h2>Make the full picture<br/><span className="home-heading-gradient">part of your next decision.</span></h2><PageActions/></>}</div></section>}
  </main>;
}
