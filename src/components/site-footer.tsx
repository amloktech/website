'use client';

import { useSiteLanguage } from '@/lib/use-site-language';
import { usePathname } from 'next/navigation';
import { Github, Globe, Linkedin, Mail } from 'lucide-react';
import { Wordmark } from './ui';
import { solutionProducts, solutionModules, solutionIndustries, solutionUseCases } from './solutions-menu';
import { developerGroups } from './developers-menu';
import { resourceGroups } from './resources-menu';

const providers = [
  { name:'ChatGPT', url:'https://chatgpt.com/?q=', logo:'chatgpt' },
  { name:'Claude', url:'https://claude.ai/new?q=', logo:'claude' },
  { name:'Perplexity', url:'https://www.perplexity.ai/?q=', logo:'perplexity' },
  { name:'Google AI Mode', url:'https://www.google.com/search?udm=50&q=', logo:'google-ai' },
  { name:'Grok', url:'https://grok.com/?q=', logo:'grok' },
];
type FooterLink = {label:string;href:string};
function FooterGroup({title,links,splitAt}:{title:string;links:readonly FooterLink[];splitAt?:number}) {
  const columns=splitAt?[links.slice(0,splitAt),links.slice(splitAt)]:[links];
  return <nav className={`site-footer-group${splitAt?' is-split':''}`} aria-label={`Footer ${title}`}><h2>{title}</h2><div className="site-footer-link-columns">{columns.map((column,index)=><ul key={index}>{column.map(link=><li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>)}</div></nav>;
}
const homeLink = (href:string) => href.startsWith('#')?`/${href}`:href;

export function SiteFooter() {
  const pathname=usePathname();
  const [language,setLanguage]=useSiteLanguage();
  if(pathname.startsWith('/brand'))return null;
  const pageUrl=`https://amlok.io${pathname}`;
  const prompt=encodeURIComponent(`Please read ${pageUrl} and summarise this page for me. Explain what AMLOK is, what this page covers, who it is for, the products and pricing described, and how a developer can integrate it. Cite the URL in your answer.`);
  return <footer className="site-footer" aria-label="AMLOK footer">
    <div className="site-footer-summary"><div className="site-footer-inner"><p>Ask an AI to summarise this page</p><div className="site-footer-ai">{providers.map(({name,url,logo})=><a key={name} href={`${url}${prompt}`} target="_blank" rel="noopener noreferrer" aria-label={`Summarise this page with ${name}`} title={name}><img src={`/${logo}-logo.svg`} width={20} height={20} alt="" aria-hidden="true"/></a>)}</div></div></div>
    <div className="site-footer-inner">
      <div className="site-footer-primary">
        <div className="site-footer-identity"><a className="site-footer-logo" href="/" aria-label="AMLOK home"><Wordmark/></a><p className="site-footer-tagline">Infrastructure for risk intelligence.</p><p>Continuously connecting entities, transactions, and relationships across the credit lifecycle.</p><div className="site-footer-partners"><h2>Partnering</h2><img src="https://amlok.io/logos/cla-lenders.svg" alt="Canadian Lenders Association"/><img src="https://amlok.io/logos/nvidia-inception.svg" alt="NVIDIA Inception Program"/></div><p className="site-footer-location">Toronto, Canada · Headquarters</p><a className="site-footer-email" href="mailto:support@amlok.tech"><Mail size={15} aria-hidden="true"/>support@amlok.tech</a></div>
        <FooterGroup title="Solutions" links={solutionUseCases.map(item=>({label:item.title,href:homeLink(item.href)}))}/>
        <FooterGroup title="Products" links={solutionProducts.map(item=>({label:item.title,href:homeLink(item.href)}))}/><FooterGroup title="Modules" links={solutionModules.map(item=>({label:item.title,href:homeLink(item.href)}))}/>
        <FooterGroup title="Industries" links={solutionIndustries.map(item=>({label:item.title,href:homeLink(item.href)}))}/>
      </div>
      <div className="site-footer-secondary">
        <FooterGroup title="Developers" splitAt={6} links={[...developerGroups.flatMap<FooterLink>(group=>[...group.links]),{label:'Quickstart',href:'https://amlok-docs.mintlify.site/overview/introduction'}]}/>
        <FooterGroup title="Resources" links={resourceGroups[0].links}/>
        <FooterGroup title="Pricing & Compare" links={[
          {label:'Pricing',href:'/#pricing'},
          {label:'vs Prism Data',href:'/compare/prism-data'},
          {label:'vs Flinks',href:'/compare/flinks'},
          {label:'vs Judi AI',href:'/compare/judi-ai'},
          {label:'vs Covaleyo',href:'/compare/covaleyo'},
          {label:'vs Intellifi',href:'/compare/intellifi'},
          {label:'vs Inverité Insights',href:'/compare/inverite-insights'},
        ]}/>
        <FooterGroup title="Company" links={[...resourceGroups[1].links,{label:'Brand guidelines',href:'/brand'}]}/>
      </div>
    </div>
    <div className="site-footer-bottom"><div className="site-footer-inner"><div className="site-footer-legal"><span>© 2026 AMLOK</span><a href="/privacy">Privacy</a><a href="/cookies">Cookies</a><a href="/terms">Terms of business</a><a href="mailto:support@amlok.tech">Contact</a></div><div className="site-footer-controls"><a href="/links/linkedin" aria-label="AMLOK on LinkedIn" title="LinkedIn"><Linkedin size={20} aria-hidden="true"/></a><a href="/links/github" aria-label="AMLOK on GitHub" title="GitHub"><Github size={20} aria-hidden="true"/></a><a href="/links/x" aria-label="AMLOK on X" title="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L1 2h6.5l4.4 6.7L18.9 2Zm-1.1 18h1.7L6.6 3.9H4.8L17.8 20Z"/></svg></a><label className="site-footer-language"><Globe size={19} aria-hidden="true"/><select aria-label="Footer language" value={language} onChange={event=>setLanguage(event.target.value)}><option value="English">English</option><option value="Français">Français</option></select></label></div></div></div>
  </footer>;
}
