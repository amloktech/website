'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Globe, Search, X } from 'lucide-react';
import { Wordmark } from './ui';
import { useSiteLanguage } from '@/lib/use-site-language';
import { MobileNavigation } from './mobile-navigation';
import { SolutionsMenu } from './solutions-menu';
import { ResourcesMenu } from './resources-menu';
import { DevelopersMenu } from './developers-menu';
import pageIndex from '@/content/page-index.json';

const languages = [
  { label: 'English', englishName: '' },
  { label: 'Français', englishName: 'French' },
];
type SearchEntry = { title: string; description: string; category: 'Pages' | 'Sections'; href: string; keywords: string };
const searchIndex: SearchEntry[] = [
  ...pageIndex.map(page => ({ title: page.title, description: page.description, category: 'Pages' as const, href: page.path, keywords: `${page.category} ${page.path} ${page.title}`.toLowerCase() })),
  { title: 'AMLOK design system', description: 'Identity, graphics, and interface guidelines.', category: 'Pages', href: '/brand', keywords: 'brand identity design colors typography logo' },
];

export function SiteHeader({isHome=false}:{isHome?:boolean}) {
  const [language, setLanguage] = useSiteLanguage();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchResult, setActiveSearchResult] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(!isHome);
  const homeHref = isHome ? '' : '/';
  const languageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const signupLabelRef = useRef<HTMLSpanElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const alignMenu = () => {
      const label = signupLabelRef.current;
      if (!label || !headerRef.current || window.innerWidth < 1024) return;
      headerRef.current.style.setProperty('--desktop-menu-right', `${document.documentElement.clientWidth - label.getBoundingClientRect().right}px`);
    };
    alignMenu();
    const observer = new ResizeObserver(alignMenu);
    if (headerRef.current) observer.observe(headerRef.current);
    if (signupLabelRef.current) observer.observe(signupLabelRef.current);
    window.addEventListener('resize', alignMenu);
    return () => { observer.disconnect(); window.removeEventListener('resize', alignMenu); };
  }, []);
  const searchResults = useMemo(() => {
    const terms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return searchIndex.map(item => ({item, score: terms.reduce((score, term) => score + (item.title.toLowerCase().includes(term) ? 4 : 0) + (item.description.toLowerCase().includes(term) ? 2 : 0) + (item.keywords.includes(term) ? 1 : 0), 0)}))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(result => result.item);
  }, [searchQuery]);

  useEffect(() => {
    if(searchOpen||languageMenuOpen){setResourcesOpen(false);setDevelopersOpen(false);}
  },[searchOpen,languageMenuOpen]);

  useEffect(() => {
    function updateHeader() { setHeaderScrolled(!isHome || window.scrollY > 32); }
    updateHeader();
    window.addEventListener('scroll', updateHeader, {passive:true});
    return () => window.removeEventListener('scroll', updateHeader);
  }, [isHome]);

  useEffect(() => {
    if (searchOpen) {
      setActiveSearchResult(0);
      window.requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [searchOpen]);

  function selectSearchResult(result: SearchEntry) {
    setSearchOpen(false);
    setSearchQuery('');
    if (result.href.startsWith('/') || !isHome) {
      window.location.assign(result.href.startsWith('#') ? '/' + result.href : result.href);
      return;
    }
    window.requestAnimationFrame(() => document.querySelector(result.href)?.scrollIntoView({behavior: 'smooth', block: 'start'}));
  }

  useEffect(() => {
    function closeMenu(event: PointerEvent) {
      if (event.target instanceof Node && !languageRef.current?.contains(event.target)) setLanguageMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setLanguageMenuOpen(false);
        setSearchOpen(false);
      }
    }
    document.addEventListener('pointerdown', closeMenu);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return <>

    <header ref={headerRef} className={`home-header ${headerScrolled ? 'is-scrolled' : ''}`}>
      <a href={`${homeHref}#top`} className="home-logo" aria-label="Amlok home"><Wordmark /></a>
      <nav className="home-nav" aria-label="Main navigation">
        <SolutionsMenu homeHref={homeHref} otherMenuOpen={searchOpen||languageMenuOpen||resourcesOpen||developersOpen} onOpen={()=>{setSearchOpen(false);setLanguageMenuOpen(false);setResourcesOpen(false);setDevelopersOpen(false);}} />
        <DevelopersMenu open={developersOpen} onOpen={()=>{setSearchOpen(false);setLanguageMenuOpen(false);setResourcesOpen(false);setDevelopersOpen(true);}} onClose={()=>setDevelopersOpen(false)} />
        <ResourcesMenu open={resourcesOpen} onOpen={()=>{setSearchOpen(false);setLanguageMenuOpen(false);setDevelopersOpen(false);setResourcesOpen(true);}} onClose={()=>setResourcesOpen(false)} />
        <a href="/pricing">Pricing</a>
        <div className="home-search-control">
          <button className="home-search-button" type="button" aria-label={searchOpen ? 'Close search' : 'Search Amlok'} aria-expanded={searchOpen} onClick={() => {setSearchOpen(!searchOpen); setLanguageMenuOpen(false);}}>{searchOpen ? <X size={19}/> : <Search size={19}/>}</button>
        </div>
      </nav>
      <div className="home-header-actions">
        <div className="language-picker" ref={languageRef}>
          <button className="language-trigger" type="button" aria-label={`Choose language. Current language: ${language}`} aria-haspopup="listbox" aria-expanded={languageMenuOpen} onClick={() => setLanguageMenuOpen(!languageMenuOpen)}><Globe size={21}/></button>
          {languageMenuOpen && <div className="language-popover">
            <span className="language-heading">LANGUAGE</span>
            <div role="listbox" aria-label="Language">
              {languages.map(({label, englishName}) => <button key={label} type="button" role="option" aria-selected={language === label} className={`language-option ${language === label ? 'selected' : ''}`} onClick={() => {setLanguage(label); setLanguageMenuOpen(false);}}><span>{label}</span>{englishName && <span className="language-english-name">{englishName}</span>}{language === label && <Check className="language-check" size={19}/>}</button>)}
            </div>
          </div>}
        </div>
        <a className="home-signup" href="/get-started"><span ref={signupLabelRef}>Sign up</span> <ArrowUpRight size={19}/></a>
        <a className="home-site-cta home-header-cta" href="/contact">Talk to us</a>
      </div>
      <MobileNavigation homeHref={homeHref} language={language} languages={languages} onLanguageChange={setLanguage} searchOpen={searchOpen}
        onSearch={() => { setSearchOpen(!searchOpen); setLanguageMenuOpen(false); }}
        onOpen={() => { setSearchOpen(false); setLanguageMenuOpen(false); }} />
    </header>

    {searchOpen && <div className={`home-search-layer ${headerScrolled ? 'is-scrolled' : ''}`} onMouseDown={event => {if (event.target === event.currentTarget) setSearchOpen(false);}}>
      <section className="home-search-dialog" role="dialog" aria-modal="true" aria-label="Search Amlok">
        <div className="home-search-field">
          <Search size={20} aria-hidden="true" />
          <input ref={searchInputRef} id="home-search" type="search" role="combobox" aria-label="Search query" aria-autocomplete="list" aria-controls="home-search-results" aria-expanded={searchResults.length > 0} aria-activedescendant={searchResults.length ? `home-search-option-${activeSearchResult}` : undefined} placeholder="Search pages, sections..." value={searchQuery} onChange={event => {setSearchQuery(event.target.value); setActiveSearchResult(0);}} onKeyDown={event => {
            if (event.key === 'ArrowDown' && searchResults.length) {event.preventDefault(); setActiveSearchResult(index => (index + 1) % searchResults.length);}
            if (event.key === 'ArrowUp' && searchResults.length) {event.preventDefault(); setActiveSearchResult(index => (index + searchResults.length - 1) % searchResults.length);}
            if (event.key === 'Enter' && searchResults.length) {event.preventDefault(); selectSearchResult(searchResults[activeSearchResult]);}
          }} />
          <kbd>ESC</kbd>
        </div>
        {searchQuery.trim() && <div className="home-search-results" id="home-search-results" role="listbox" aria-label="Search results">
          {searchResults.length ? <>
            {(['Pages', 'Sections'] as const).map(category => {
              const results = searchResults.filter(result => result.category === category);
              if (!results.length) return null;
              return <div className="home-search-group" key={category} role="group" aria-label={category}>
                <span className="home-search-category">{category}</span>
                {results.map(result => {
                  const index = searchResults.indexOf(result);
                  return <button className={`home-search-result ${index === activeSearchResult ? 'active' : ''}`} id={`home-search-option-${index}`} type="button" role="option" aria-selected={index === activeSearchResult} key={result.title} onMouseEnter={() => setActiveSearchResult(index)} onClick={() => selectSearchResult(result)}>
                    <span><strong>{result.title}</strong><small>{result.description}</small></span><ArrowUpRight size={16} aria-hidden="true" />
                  </button>;
                })}
              </div>;
            })}
          </> : <p className="home-search-empty">No results for “{searchQuery.trim()}”</p>}
        </div>}
        <p className="home-search-sr-only">Search every Amlok page and platform section.</p>
      </section>
    </div>}

  </>;
}
