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

export function SiteFooter({siteOrigin}:{siteOrigin:string}) {
  const pathname=usePathname();
  const [language,setLanguage]=useSiteLanguage();
  if(pathname.startsWith('/brand'))return null;
  const pageUrl=`${siteOrigin}${pathname}`;
  const prompt=encodeURIComponent(`Please read ${pageUrl} and summarise this page for me. Explain what AMLOK is, what this page covers, who it is for, the products and pricing described, and how a developer can integrate it. Cite the URL in your answer.`);
  return <footer className="site-footer" aria-label="AMLOK footer">
    <div className="site-footer-summary"><div className="site-footer-inner"><p>Ask an AI to summarise this page</p><div className="site-footer-ai">{providers.map(({name,url,logo})=><a key={name} href={`${url}${prompt}`} target="_blank" rel="noopener noreferrer" aria-label={`Summarise this page with ${name}`} title={name}><img src={`/${logo}-logo.svg`} width={20} height={20} alt="" aria-hidden="true"/></a>)}</div></div></div>
    <div className="site-footer-inner">
      <div className="site-footer-primary">
        <div className="site-footer-identity"><a className="site-footer-logo" href="/" aria-label="AMLOK home"><Wordmark/></a><p className="site-footer-tagline">Infrastructure for risk intelligence.</p><p>Continuously connecting entities, transactions, and relationships across the credit lifecycle.</p><div className="site-footer-partners">
          <h2>Backed by</h2>
          <div className="site-footer-partner-logos">
            <img src="/images/partners/lvlup-ventures.png" alt="LvlUp Ventures" width={380} height={38}/>
            <img src="https://amlok.io/logos/cla-lenders.svg" alt="Canadian Lenders Association"/>
            <img src="https://amlok.io/logos/nvidia-inception.svg" alt="NVIDIA Inception Program"/>
          </div>
        </div><p className="site-footer-location">Toronto, Canada · Headquarters</p><a className="site-footer-email" href="mailto:support@amlok.tech"><Mail size={15} aria-hidden="true"/>support@amlok.tech</a></div>
        <FooterGroup title="Solutions" links={solutionUseCases.map(item=>({label:item.title,href:homeLink(item.href)}))}/>
        <FooterGroup title="Products" links={solutionProducts.map(item=>({label:item.title,href:homeLink(item.href)}))}/><FooterGroup title="Modules" links={solutionModules.map(item=>({label:item.title,href:homeLink(item.href)}))}/>
        <FooterGroup title="Industries" links={solutionIndustries.map(item=>({label:item.title,href:homeLink(item.href)}))}/>
      </div>
      <div className="site-footer-secondary">
        <FooterGroup title="Developers" splitAt={6} links={[...developerGroups.flatMap<FooterLink>(group=>[...group.links]),{label:'Quickstart',href:'https://docs.amlok.io/api-reference/quickstart'}]}/>
        <FooterGroup title="Resources" links={resourceGroups[0].links}/>
        <FooterGroup title="Pricing & Compare" links={[
          {label:'Pricing',href:'/pricing'},
          {label:'vs Prism Data',href:'/compare/prism-data'},
          {label:'vs Flinks',href:'/compare/flinks'},
          {label:'vs Judi AI',href:'/compare/judi-ai'},
          {label:'vs Covaleyo',href:'/compare/covaleyo'},
          {label:'vs Intellifi',href:'/compare/intellifi'},
          {label:'vs Inverité Insights',href:'/compare/inverite-insights'},
        ]}/>
        <FooterGroup title="Company" links={[...resourceGroups[1].links,{label:'Brand guidelines',href:'/brand'},{label:'Site map',href:'/site-map'}]}/>
      </div>
    </div>
    <div className="site-footer-bottom"><div className="site-footer-inner"><div className="site-footer-legal"><span>© 2026 AMLOK</span><a href="/privacy">Privacy</a><a href="/cookies">Cookies</a><a href="/terms">Terms of business</a><a href="/contact">Contact</a></div><div className="site-footer-controls"><a href="https://www.linkedin.com/company/amlok" aria-label="AMLOK on LinkedIn" title="LinkedIn"><Linkedin size={20} aria-hidden="true"/></a><a href="https://github.com/amloktech" aria-label="AMLOK on GitHub" title="GitHub"><Github size={20} aria-hidden="true"/></a><label className="site-footer-language"><Globe size={19} aria-hidden="true"/><select aria-label="Footer language" value={language} onChange={event=>setLanguage(event.target.value)}><option value="English">English</option><option value="Français">Français</option></select></label></div></div></div>
  </footer>;
}
