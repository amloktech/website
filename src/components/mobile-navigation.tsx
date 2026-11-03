'use client';

import { BookingLink } from './booking-link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Globe, Menu, Search, X } from 'lucide-react';
import { Wordmark } from './ui';
import { solutionIndustries, solutionModules, solutionProducts, solutionUseCases } from './solutions-menu';
import { resourceGroups } from './resources-menu';
import { developerGroups } from './developers-menu';

const navigationGroups = [
  { title: 'Solutions', links: [] },
  { title: 'Developers', links: [
    { label: 'Agents & API', href: '#loan-scale' },
    { label: 'Features & integrations', href: '#features-integrations' },
  ] },
  { title: 'Resources', links: [] },
];

type MobileNavigationProps = {
  homeHref?: string;
  language: string;
  languages: ReadonlyArray<{ label: string; englishName: string }>;
  onLanguageChange: (language: string) => void;
  searchOpen: boolean;
  onSearch: () => void;
  onOpen: () => void;
};

export function MobileNavigation({ homeHref='', language, languages, onLanguageChange, searchOpen, onSearch, onOpen }: MobileNavigationProps) {
  const destination = (href:string) => href.startsWith('#') ? homeHref + href : href;
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    // The native modal contains keyboard focus and makes the page behind it inert.
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return <>
    <div className="home-mobile-controls">
      <button className="home-mobile-icon" type="button" aria-label={searchOpen ? 'Close search' : 'Search Amlok'} aria-expanded={searchOpen} onClick={onSearch}>
        {searchOpen ? <X aria-hidden="true" /> : <Search aria-hidden="true" />}
      </button>
      <button className="home-mobile-icon" type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="home-mobile-menu" aria-expanded={open} onClick={() => {
        onOpen();
        setExpandedGroup(null);
        setOpen(true);
      }}><Menu aria-hidden="true" /></button>
    </div>

    <dialog className="home-mobile-menu" id="home-mobile-menu" ref={dialogRef} aria-label="AMLOK navigation" onCancel={event => { event.preventDefault(); closeMenu(); }} onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select:not([disabled])')).filter(element => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
    }}>
      <div className="home-mobile-menu-header">
        <a className="home-logo" href={destination("#top")} aria-label="Amlok home" onClick={closeMenu}><Wordmark gradient /></a>
        <div className="home-mobile-menu-tools">
          <button className="home-mobile-icon" type="button" aria-label="Search Amlok" onClick={() => { closeMenu(); onSearch(); }}><Search aria-hidden="true" /></button>
          <button className="home-mobile-icon" type="button" aria-label="Close menu" ref={closeRef} onClick={closeMenu}><X aria-hidden="true" /></button>
        </div>
      </div>

      <div className="home-mobile-menu-body">
        <nav className="home-mobile-nav" aria-label="Mobile navigation">
          {navigationGroups.map(group => {
            const expanded = expandedGroup === group.title;
            const panelId = `mobile-navigation-${group.title.toLowerCase()}`;
            return <div className="home-mobile-nav-group" key={group.title}>
              <button className="home-mobile-nav-heading" type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpandedGroup(expanded ? null : group.title)}>
                {group.title}<ChevronDown aria-hidden="true" />
              </button>
              <ul className={`home-mobile-subnav${group.title === 'Solutions' ? ' home-mobile-solutions' : ''}`} id={panelId} hidden={!expanded}>
                {group.title==='Solutions'?<>
                  <li className="home-mobile-solutions-section">
                    <h3>Products</h3>
                    <ul className="home-mobile-product-cards">
                      {solutionProducts.map(({title,description,href,icon:Icon}) => <li key={title}><a className="home-mobile-product-card" href={destination(href)} onClick={closeMenu}><Icon size={22} aria-hidden="true"/><span><strong>{title}</strong><small>{description}</small></span><ArrowUpRight size={17} aria-hidden="true"/></a></li>)}
                    </ul>
                  </li>
                  {[{label:'Use cases',items:solutionUseCases,href:'/solutions',all:'All use cases'},{label:'Modules',items:solutionModules,href:'/modules',all:'All modules'},{label:'Industries',items:solutionIndustries,href:'/industries',all:'Explore industries'}].map(category => <li className="home-mobile-solutions-section" key={category.label}>
                    <h3>{category.label}</h3>
                    <ul>{category.items.map(item => <li key={item.title}><a className="home-mobile-solution-link" href={destination(item.href)} onClick={closeMenu}><span>{item.title}</span><ArrowUpRight size={17} aria-hidden="true"/></a></li>)}</ul>
                    <a className="home-mobile-solutions-all" href={category.href} onClick={closeMenu}>{category.all}<ArrowUpRight size={17} aria-hidden="true"/></a>
                  </li>)}
                </>:group.title==='Developers'?developerGroups.map(category=><li className="home-mobile-solution-category" key={category.title}><span>{category.title}</span><ul>{category.links.map(link=><li key={link.label}><a href={link.href} onClick={closeMenu}>{link.label}<ArrowUpRight size={15} aria-hidden="true"/></a></li>)}</ul></li>):group.title==='Resources'?<>
                  <li><a href="/about-us" onClick={closeMenu}>Meet the team <ArrowUpRight size={16} aria-hidden="true" /></a></li>
                  {resourceGroups.map(category=><li className="home-mobile-solution-category" key={category.title}><span>{category.title}</span><ul>{category.links.map(link=><li key={link.label}><a href={link.href} onClick={closeMenu}>{link.label}<ArrowUpRight size={15} aria-hidden="true"/></a></li>)}</ul></li>)}
                </>:group.links.map(link => <li key={link.href}><a href={destination(link.href)} onClick={closeMenu}>{link.label}<ArrowUpRight size={15} aria-hidden="true"/></a></li>)}
              </ul>
            </div>;
          })}
          <a className="home-mobile-nav-heading" href="/pricing" onClick={closeMenu}>Pricing</a>
        </nav>

        <div className="home-mobile-menu-actions">
          <BookingLink className="home-mobile-contact" onClick={closeMenu}>Talk to us <ArrowUpRight aria-hidden="true" /></BookingLink>
          <a className="home-mobile-signup" href="/get-started" onClick={closeMenu}>Sign up</a>
        </div>

        <div className="home-mobile-language">
          <Globe aria-hidden="true" />
          <select aria-label="Language" value={language} onChange={event => onLanguageChange(event.target.value)}>
            {languages.map(option => <option key={option.label} value={option.label}>{option.label}{option.englishName ? ` · ${option.englishName}` : ''}</option>)}
          </select>
          <ChevronDown aria-hidden="true" />
        </div>
      </div>
    </dialog>
  </>;
}
