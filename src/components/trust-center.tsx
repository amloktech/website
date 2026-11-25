'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Bell, Building2, Check, ChevronDown, ChevronRight, Copy, ExternalLink, FileText, Info, LockKeyhole, Mail, MapPin, Search, Shield, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Wordmark } from './ui';
import { ControlCategoryTable, FrameworkBadge, TrustMediaOverview } from './trust-center-elements';
import { trustCategories, trustContact, trustControls, trustFaqs, trustFrameworkGroups, trustFrameworks, trustResources, trustSubprocessors, type TrustResource } from '@/content/trust-center';
import { trustTopics } from '@/content/trust-center-topics';
import { TrustDocuments, TrustTopicDetail, TrustTopicGrid } from './trust-center-sections';
import s from './trust-center.module.css';

const tabs = ['Overview', 'Resources', 'Controls', 'Subprocessors', 'FAQ', 'Updates', 'Media'] as const;
type Tab = typeof tabs[number];
type RequestKind = 'access' | 'updates' | 'question' | 'issue' | 'reclaim';
type Modal = { kind: RequestKind; resource?: string } | { kind: 'framework'; id: string };
const contact = trustContact.email;
const updates = [
  { category: 'Privacy & legal', name: 'Review our current privacy and connection policies', description: 'Find how information is handled across the website, Console, and connected merchant services, including how to make a privacy request.', href: '/privacy', label: 'Read privacy policy' },
  { category: 'Service availability', name: 'Check public service availability', description: 'The service status page reports website and documentation availability. Product workflow telemetry and a historical uptime percentage are not published here.', href: '/status', label: 'View service status' },
  { category: 'Security resources', name: 'Start a deployment-specific security review', description: 'Use our due diligence guide to discuss processing locations, providers, retention, support access, and the evidence required for your institution.', href: 'https://docs.amlok.io/security/due-diligence', label: 'Open the review guide' },
];

function External({ children, href, className = '' }: { children: ReactNode; href: string; className?: string }) {
  return <a className={className} href={href} {...(href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}<ExternalLink size={14} aria-hidden="true" /></a>;
}

function SectionTitle({ title, count, action, onClick }: { title: string; count?: number; action?: string; onClick?: () => void }) {
  return <div className={s.sectionTitle}><h2>{title}{count !== undefined && <span className={s.count}>{count}</span>}</h2>{action && <button className={s.textButton} onClick={onClick}>{action}<ChevronRight size={15}/></button>}</div>;
}

function SearchField({ value, onChange, placeholder, label }: { value: string; onChange: (value: string) => void; placeholder: string; label: string }) {
  return <label className={s.searchField}><Search size={18} aria-hidden="true"/><input aria-label={label} value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder}/>{value && <button type="button" aria-label={`Clear ${label.toLowerCase()}`} onClick={() => onChange('')}><X size={16}/></button>}</label>;
}

const providerLogoAssets: Record<string, string> = {
  azure: 'azure.svg', microsoft: 'microsoft.svg', stripe: 'stripe.svg',
  flinks: 'flinks.jpg', plaid: 'plaid.png',
  google: 'google.png', github: 'github.svg', baselayer: 'baselayer.png',
  cloudflare: 'cloudflare.svg', mintlify: 'mintlify.svg', 'cal-com': 'cal.svg',
};

function ProviderLogo({ id }: { id: string }) {
  const asset = providerLogoAssets[id];
  return <span className={s.vendorLogo} aria-hidden="true"><img src={`/images/trust/providers/${asset}`} alt="" width={28} height={28}/></span>;
}

function ResourceRow({ resource, request, compact = false }: { resource: TrustResource; request: (id: string) => void; compact?: boolean }) {
  const contents = <><span className={s.fileIcon}><FileText size={20}/></span><span className={s.resourceCopy}><strong>{resource.name}</strong><span>{compact ? resource.category : resource.description}</span></span>{resource.access === 'restricted' ? <LockKeyhole size={15} aria-label="Restricted resource"/> : resource.href?.startsWith('mailto:') ? <Mail size={15} aria-hidden="true"/> : <ExternalLink size={15} aria-hidden="true"/>}</>;
  return resource.access === 'public' && resource.href
    ? <a className={s.resourceRow} href={resource.href} {...(resource.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{contents}</a>
    : <button className={s.resourceRow} onClick={() => request(resource.id)}>{contents}</button>;
}

export function TrustCenter() {
  const [tab, setTab] = useState<Tab>('Overview');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [controlQuery, setControlQuery] = useState('');
  const [controlCategory, setControlCategory] = useState('all');
  const [resourceQuery, setResourceQuery] = useState('');
  const [resourceCategory, setResourceCategory] = useState('All resources');
  const [resourceAccess, setResourceAccess] = useState('all');
  const [resourceCollection, setResourceCollection] = useState('all');
  const [accessLevel, setAccessLevel] = useState('full');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [accessError, setAccessError] = useState('');
  const [vendorQuery, setVendorQuery] = useState('');
  const [faqQuery, setFaqQuery] = useState('');
  const [faqCategory, setFaqCategory] = useState('All topics');
  const [openedFaq, setOpenedFaq] = useState<string | null>(null);
  const [modal, setModal] = useState<Modal | null>(null);
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | string[]>>({});
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const requestSummary = useRef<HTMLTextAreaElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const syncHash = () => {
      const view = window.location.hash.slice(1).toLowerCase();
      const topic = trustTopics.find(item => `topic-${item.id}` === view);
      const nextTab = tabs.find(item => item.toLowerCase() === view);
      if (view && !nextTab && !topic) return;
      setActiveTopic(topic?.id || null);
      setTab(nextTab || 'Overview');
      setQuery('');
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.current?.focus(); }
    };
    window.addEventListener('keydown', shortcut);
    return () => { window.removeEventListener('hashchange', syncHash); window.removeEventListener('popstate', syncHash); window.removeEventListener('keydown', shortcut); };
  }, []);

  useEffect(() => {
    if (!modal) return;
    previousFocus.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    dialog.current?.querySelector('button')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; previousFocus.current?.focus(); };
  }, [modal]);

  useEffect(() => { if (draft) requestSummary.current?.focus(); }, [draft]);

  function navigate(next: Tab, focus = false) {
    setTab(next); setQuery(''); setActiveTopic(null);
    window.history.pushState(null, '', `#${next.toLowerCase()}`);
    if (focus) requestAnimationFrame(() => panel.current?.focus());
  }
  function openTopic(id: string) {
    setActiveTopic(id); setTab('Overview'); setQuery('');
    window.history.pushState(null, '', `#topic-${id}`);
    requestAnimationFrame(() => { panel.current?.focus(); panel.current?.scrollIntoView({ block: 'start' }); });
  }
  function askTopicQuestion(message: string) { openModal({ kind: 'question' }); setFormValues({ message }); }
  function openModal(next: Modal) { setSelectedResources(next.kind === 'access' && next.resource ? [next.resource] : []); setAccessLevel(next.kind === 'access' && next.resource ? 'limited' : 'full'); setAccessError(''); setDraft(null); setFormValues({}); setCopied(false); setCopyError(false); setModal(next); }
  function closeModal() { dialog.current?.close(); setModal(null); }
  function request(resource?: string) { openModal({ kind: 'access', resource }); }
  function fieldValue(name: string) { return typeof formValues[name] === 'string' ? formValues[name] : ''; }

  const normalizedQuery = query.trim().toLowerCase();
  const matches = (item: { name: string; description: string }, value: string) => `${item.name} ${item.description}`.toLowerCase().includes(value.trim().toLowerCase());
  const resourcesFound = trustResources.filter(item => matches(item, normalizedQuery));
  const controlsFound = trustControls.filter(item => matches(item, normalizedQuery));
  const faqsFound = trustFaqs.filter(item => matches(item, normalizedQuery));
  const vendorsFound = trustSubprocessors.filter(item => matches(item, normalizedQuery));
  const selectedTopic = trustTopics.find(item => item.id === activeTopic);
  const topicsFound = trustTopics.filter(item => `${item.name} ${item.description} ${item.items.map(detail => `${detail.name} ${detail.description}`).join(' ')}`.toLowerCase().includes(normalizedQuery));
  const resultsCount = topicsFound.length + resourcesFound.length + controlsFound.length + faqsFound.length + vendorsFound.length;
  const filteredControls = trustControls.filter(item => (controlCategory === 'all' || item.category === controlCategory) && matches(item, controlQuery));
  const filteredResources = trustResources.filter(item => (resourceCategory === 'All resources' || item.category === resourceCategory) && (resourceAccess === 'all' || item.access === resourceAccess) && (resourceCollection === 'all' || item.collection === resourceCollection) && matches(item, resourceQuery));
  const collections = ['Security reports', 'Policies & agreements', 'Documentation', 'Archived reports'];
  function showResources(collection: string) { setResourceCollection(collection); setResourceQuery(''); setResourceCategory('All resources'); setResourceAccess('all'); navigate('Resources', true); }
  const resourceCategories = ['All resources', ...new Set(trustResources.map(item => item.category))];
  const filteredVendors = trustSubprocessors.filter(item => `${item.name} ${item.description} ${item.category} ${item.scope} ${item.relationship} ${item.dataCategories}`.toLowerCase().includes(vendorQuery.trim().toLowerCase()));
  const faqCategories = ['All topics', ...new Set(trustFaqs.map(item => item.category))];
  const filteredFaqs = trustFaqs.filter(item => matches(item, faqQuery) && (faqCategory === 'All topics' || item.category === faqCategory));

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modal || modal.kind === 'framework') return;
    const data = new FormData(event.currentTarget);
    if (modal.kind === 'access' && accessLevel === 'limited' && data.getAll('resources').length === 0) { setAccessError('Select at least one resource, or choose full access.'); return; }
    if (modal.kind === 'updates' && data.getAll('topics').length === 0) { setAccessError('Select at least one update topic.'); return; }
    setAccessError('');
    setCopied(false); setCopyError(false);
    setFormValues({ ...Object.fromEntries(data.entries()), resources: data.getAll('resources').map(String), topics: data.getAll('topics').map(String) } as Record<string, string | string[]>);
    const names = data.getAll('resources').map(id => trustResources.find(item => item.id === id)?.name).filter(Boolean);
    const subjects = { access: 'Trust Center: security review request', updates: 'Trust Center: update subscription request', question: 'Trust Center: security question', issue: 'Trust Center: security issue report', reclaim: 'Trust Center: reclaim document access' };
    const body = [
      data.get('firstName') ? `Name: ${data.get('firstName')} ${data.get('lastName')}` : '',
      `Work email: ${data.get('email')}`,
      data.get('company') ? `Company: ${data.get('company')}` : '',
      data.get('reason') ? `Relationship: ${data.get('reason')}` : '',
      modal.kind === 'access' ? `Access level: ${accessLevel === 'full' ? 'Full access to review materials' : 'Limited access to selected materials'}` : '',
      names.length ? `Requested resources: ${names.join(', ')}` : '',
      modal.kind === 'updates' ? `Requested updates: ${data.getAll('topics').join(', ') || 'All trust center updates'}` : '',
      `\n${data.get('message') || (modal.kind === 'updates' ? 'Please let me know how to receive future security and privacy updates.' : modal.kind === 'reclaim' ? 'Please help restore my previously approved access to trust center materials.' : 'Please contact me to discuss available security review materials and any confidentiality requirements.')}`,
    ].filter(Boolean).join('\n');
    setDraft({ subject: subjects[modal.kind], body });
  }

  async function copyDraft() {
    if (!draft) return;
    try { await navigator.clipboard.writeText(`To: ${contact}\nSubject: ${draft.subject}\n\n${draft.body}`); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }

  const faqList = (items: typeof trustFaqs) => <div className={s.faqList}>{items.map(item => <details key={item.id} open={openedFaq === item.id}><summary onClick={event => { event.preventDefault(); setOpenedFaq(openedFaq === item.id ? null : item.id); }}>{item.name}<ChevronDown size={17}/></summary><div><p>{item.description}</p>{item.href && <External href={item.href}>Read more</External>}</div></details>)}</div>;

  return <div className={s.portal}>
    <a className={s.skip} href="#trust-content">Skip to trust center content</a>
    <div className={s.backdrop} aria-hidden="true"/>
    <div className={s.container}>
      <header className={s.intro}>
        <div className={s.topbar}>
          <a className={s.identity} href="/" aria-label="Amlok home"><Wordmark/><span className={s.identityDivider}/><span className={s.portalName}>Trust Center</span></a>
          <div className={s.topActions}><button className={s.iconButton} aria-label="Subscribe to trust updates" title="Subscribe to updates" onClick={() => openModal({ kind: 'updates' })}><Bell size={19}/></button><button className={s.primaryButton} onClick={() => request()}><LockKeyhole size={16}/>Request access</button></div>
        </div>
        <div className={s.introCopy}><h1>Trust starts with transparency.</h1><p>Welcome to Amlok’s Trust Center. Explore how we approach security, privacy, and responsible AI across the credit lifecycle. Find the resources and controls you need to make an informed assessment.</p></div>
        <div className={s.introLinks}><a href={`mailto:${contact}`}><Mail size={16}/>{contact}</a><a href="/privacy"><Shield size={16}/>Privacy policy</a><External href="https://docs.amlok.io/security/overview">Security documentation</External><span><MapPin size={16}/>Toronto, Canada</span></div>
      </header>
      <nav className={s.tabs} role="tablist" aria-label="Trust center sections">{tabs.map((item, index) => <button key={item} id={`trust-tab-${item.toLowerCase()}`} role="tab" aria-selected={tab === item} aria-controls="trust-content" tabIndex={tab === item ? 0 : -1} onClick={() => navigate(item)} onKeyDown={event => {
        let next: number | undefined;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); navigate(tabs[next]); document.getElementById(`trust-tab-${tabs[next].toLowerCase()}`)?.focus(); }
      }}>{item}</button>)}</nav>
      <div className={s.globalSearch}><Search size={18}/><input ref={searchInput} aria-label="Search trust center" placeholder="Search topics, controls, documents, and answers" value={query} onChange={event => setQuery(event.target.value)}/>{query && <button className={s.iconButton} aria-label="Clear search" onClick={() => setQuery('')}><X size={17}/></button>}</div>

      <main><div id="trust-content" className={s.content} ref={panel} tabIndex={-1} role="tabpanel" aria-labelledby={`trust-tab-${tab.toLowerCase()}`}>
        {normalizedQuery ? <section><SectionTitle title="Search results" count={resultsCount}/><p className={s.sectionDescription} role="status">{resultsCount} {resultsCount === 1 ? 'result' : 'results'} for “{query}”</p>{resultsCount === 0 && <div className={s.empty}><Search size={28}/><h3>No matching results</h3><p>Try a topic such as encryption, privacy, or access.</p><button className={s.secondaryButton} onClick={() => setQuery('')}>Clear search</button></div>}{topicsFound.length > 0 && <div className={s.searchGroup}><h3>Security & trust topics</h3><div className={s.card}>{topicsFound.map(topic => <button className={s.resultRow} key={topic.id} onClick={() => openTopic(topic.id)}><Shield size={18}/><span><strong>{topic.name}</strong><small>{topic.description}</small></span><ChevronRight size={17}/></button>)}</div></div>}{resourcesFound.length > 0 && <div className={s.searchGroup}><h3>Resources</h3><div className={s.card}>{resourcesFound.map(resource => <ResourceRow key={resource.id} resource={resource} request={request}/>)}</div></div>}{controlsFound.length > 0 && <div className={s.searchGroup}><h3>Controls</h3><div className={s.card}>{controlsFound.map(control => <button className={s.resultRow} key={control.id} onClick={() => { setControlQuery(control.name); setControlCategory('all'); navigate('Controls', true); }}><Shield size={18}/><span><strong>{control.name}</strong><small>{control.description}</small></span><ChevronRight size={17}/></button>)}</div></div>}{vendorsFound.length > 0 && <div className={s.searchGroup}><h3>Subprocessors & service providers</h3><div className={s.card}>{vendorsFound.map(vendor => <button className={s.resultRow} key={vendor.id} onClick={() => { setVendorQuery(vendor.name); navigate('Subprocessors', true); }}><ProviderLogo id={vendor.id}/><span><strong>{vendor.name}</strong><small>{vendor.description}</small></span><ChevronRight size={17}/></button>)}</div></div>}{faqsFound.length > 0 && <div className={s.searchGroup}><h3>Answers</h3>{faqList(faqsFound)}</div>}</section> : selectedTopic ? <TrustTopicDetail topic={selectedTopic} back={() => navigate('Overview', true)} request={request} question={askTopicQuestion}/> : <>
          {tab === 'Overview' && <div className={s.overview}>
            <aside className={s.sidebar}>
              {trustFrameworkGroups.map(group => <section key={group.id} className={s.frameworkGroup} aria-labelledby={`framework-group-${group.id}`}>
                <div className={s.sectionTitle}><h2 id={`framework-group-${group.id}`}>{group.name}</h2></div>
                <div className={s.card}><div className={s.frameworkList} data-group={group.id}>
                  {trustFrameworks.filter(framework => framework.group === group.id).map(framework => <button key={framework.id} className={s.framework} onClick={() => openModal({ kind: 'framework', id: framework.id })}>
                    <FrameworkBadge kind={framework.badge}/><span><strong>{framework.name}</strong>{framework.subtitle && <small className={s.frameworkSubtitle}>{framework.subtitle}</small>}</span><ChevronRight size={16}/>
                  </button>)}
                </div></div>
              </section>)}
              <section><SectionTitle title="Resources" action="View all" onClick={() => showResources('all')}/><div className={s.card}>{['Security reports','Archived reports'].map(collection => { const items = trustResources.filter(item => item.collection === collection); return <div key={collection} className={s.reportGroup}><h3>{collection}</h3>{items.slice(0,4).map(resource => <ResourceRow compact key={resource.id} resource={resource} request={request}/>)}{items.length > 4 && <button className={s.collectionMore} onClick={() => showResources(collection)}>View {items.length - 4} more<ChevronRight size={14}/></button>}</div>; })}</div></section>
              <section className={s.helpCard}><span className={s.helpIcon}><Mail size={20}/></span><h3>Here to help with your review.</h3><p>Have a questionnaire or a question about your deployment?</p><button className={s.secondaryButton} onClick={() => openModal({ kind: 'question' })}>Contact our team</button></section>
              <div className={s.companyCard}><Building2 size={17}/><div><strong>Amlok Tech Inc.</strong><span>Toronto, Ontario, Canada</span><External href="https://amlok.io/">Visit website</External></div></div>
            </aside>
            <div className={s.mainColumn}>
              <TrustDocuments request={request} viewAll={() => showResources('all')}/>
              <TrustTopicGrid open={openTopic} viewControls={() => navigate('Controls', true)}/>
              <section><SectionTitle title="Subprocessors" count={trustSubprocessors.length} action="View all" onClick={() => navigate('Subprocessors', true)}/><div className={`${s.card} ${s.vendorPreview}`}>{trustSubprocessors.map(vendor => <button className={s.vendorCompact} key={vendor.id} onClick={() => { setVendorQuery(vendor.name); navigate('Subprocessors', true); }}><ProviderLogo id={vendor.id}/><span><strong>{vendor.name}</strong><small>{vendor.category}</small><small className={s.vendorRegion}><MapPin size={11}/>{vendor.location}</small></span><ChevronRight size={16}/></button>)}</div></section>
              <section><SectionTitle title="Frequently asked questions" action="View all" onClick={() => navigate('FAQ', true)}/>{faqList(trustFaqs.slice(0, 4))}</section>
              <section><SectionTitle title="Trust center updates" action="View all" onClick={() => navigate('Updates', true)}/><div className={s.overviewUpdates}>{updates.slice(0,2).map(update => <article key={update.name} className={`${s.card} ${s.updatePreview}`}><span className={s.eyebrow}>{update.category}</span><h3>{update.name}</h3><details className={s.updateReadMore}><summary>Read more<ChevronDown size={15}/></summary><p>{update.description}</p><External className={s.inlineLink} href={update.href}>{update.label}</External></details></article>)}</div></section>
              <section><SectionTitle title="Media" action="View all" onClick={() => navigate('Media', true)}/><TrustMediaOverview compact/></section>
              <section className={s.reviewBanner}><span><LockKeyhole size={23}/></span><div><h3>Start your security review</h3><p>Tell us which materials your team needs.</p></div><button className={s.primaryButton} onClick={() => request()}>Request access</button></section>
            </div>
          </div>}

          {tab === 'Resources' && <section><SectionTitle title="Resources" count={trustResources.length}/><p className={s.sectionDescription}>Security reports, policies, and Canadian regulatory guidance for your review.</p>
            <div className={s.toolbar}><SearchField value={resourceQuery} onChange={setResourceQuery} placeholder="Search resources" label="Search resources"/><label className={s.select}><SlidersHorizontal size={16}/><select aria-label="Resource category" value={resourceCategory} onChange={event => setResourceCategory(event.target.value)}>{resourceCategories.map(category => <option key={category}>{category}</option>)}</select><ChevronDown size={16}/></label><label className={s.select}><select aria-label="Resource access" value={resourceAccess} onChange={event => setResourceAccess(event.target.value)}><option value="all">All access types</option><option value="public">Public</option><option value="restricted">Restricted</option></select><ChevronDown size={16}/></label></div>
            <div className={s.collectionTabs} aria-label="Resource collections"><button aria-pressed={resourceCollection === 'all'} onClick={() => setResourceCollection('all')}>All resources</button>{collections.map(collection => <button key={collection} aria-pressed={resourceCollection === collection} onClick={() => setResourceCollection(collection)}>{collection}</button>)}</div>
            <p className={s.resultCount} role="status">{filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}</p>
            {collections.map(collection => { const items = filteredResources.filter(item => item.collection === collection); return items.length > 0 && <section key={collection} className={s.resourceCollection}><h3>{collection}<span className={s.count}>{items.length}</span></h3><div className={s.resourceGrid}>{items.map(resource => <article className={s.documentCard} key={resource.id}><div className={s.documentMeta}><span className={s.fileIcon}><FileText size={22}/></span><span className={resource.access === 'public' ? s.publicTag : s.neutralTag}>{resource.status}</span></div><span className={s.eyebrow}>{resource.category}</span><h4>{resource.name}</h4><p>{resource.description}</p>{resource.access === 'public' && resource.href ? <External className={s.inlineLink} href={resource.href}>{resource.actionLabel || 'View resource'}</External> : <button className={s.textButton} onClick={() => request(resource.id)}><LockKeyhole size={14}/>Request access</button>}</article>)}</div></section>; })}
            {filteredResources.length === 0 && <div className={s.empty}><FileText size={28}/><h3>No resources found</h3><p>Try another term or category.</p><button className={s.secondaryButton} onClick={() => {setResourceQuery('');setResourceCategory('All resources');setResourceAccess('all');setResourceCollection('all');}}>Reset filters</button></div>}
          </section>}

          {tab === 'Controls' && <section><SectionTitle title="Controls" count={trustControls.length}/><p className={s.sectionDescription}>Explore Amlok’s documented security approach and the details confirmed for each deployment.</p><SearchField value={controlQuery} onChange={setControlQuery} placeholder="Search controls" label="Search controls"/><div className={s.controlsLayout}><nav className={s.categoryNav} aria-label="Control categories"><button aria-pressed={controlCategory === 'all'} onClick={() => setControlCategory('all')}>All controls<span>{trustControls.length}</span></button>{trustCategories.map(category => <button key={category.id} aria-pressed={controlCategory === category.id} onClick={() => setControlCategory(category.id)}>{category.name}<span>{trustControls.filter(item => item.category === category.id).length}</span></button>)}</nav><div className={s.controlsList}><p className={s.controlResultCount} role="status">{filteredControls.length} controls</p>{trustCategories.map(category => <ControlCategoryTable key={`${category.id}-${controlQuery}`} category={category} controls={filteredControls.filter(control => control.category === category.id)}/>)}{filteredControls.length === 0 && <div className={s.empty}><Search size={26}/><h3>No matching controls</h3><button className={s.secondaryButton} onClick={() => {setControlQuery('');setControlCategory('all');}}>Reset filters</button></div>}<p className={s.controlNote}>“Documented” refers to published practices, not an independent audit or live control test.</p></div></div></section>}

          {tab === 'Subprocessors' && <section><SectionTitle title="Subprocessors" count={trustSubprocessors.length}/><p className={s.sectionDescription}>Review the providers supporting Amlok’s platform, financial-data connections, sign-in, billing, software delivery, website, and documentation. Each entry identifies its role and the information involved.</p><div className={s.infoPanel}><Info size={19}/><div><strong>Canadian processing, clearly defined roles</strong><p>Amlok-related service processing is contractually restricted to Canada, including storage, backups, and support access. Core platform hosting runs in Azure Canada Central. Locations below describe Amlok’s contracted processing arrangements, not provider headquarters. Identity providers, data sources, and development tools have distinct roles; a listing does not mean every provider receives every customer’s records.</p><External href="https://docs.amlok.io/security/hosting-and-subprocessors">Hosting and subprocessor guidance</External></div></div><SearchField value={vendorQuery} onChange={setVendorQuery} placeholder="Search providers" label="Search subprocessors"/><div className={s.vendorTable}>{filteredVendors.map(vendor => <article className={s.vendorFull} key={vendor.id}><div className={s.vendorIdentity}><ProviderLogo id={vendor.id}/><div><h3>{vendor.name}</h3><span className={s.neutralTag}>{vendor.category}</span></div></div><div><p>{vendor.description}</p><span className={s.scopeLabel}>{vendor.scope}</span><dl className={s.vendorFacts}><div><dt>Service relationship</dt><dd>{vendor.relationship}</dd></div><div><dt>Data involved</dt><dd>{vendor.dataCategories}</dd></div><div><dt>Review scope</dt><dd>{vendor.responsibilities}</dd></div></dl></div><div className={s.vendorLocation}><span className={s.eyebrow}>Contracted processing</span><span><MapPin size={14}/>{vendor.location}</span><External href={vendor.providerHref || vendor.href}>Provider details</External></div></article>)}</div>{filteredVendors.length === 0 && <div className={s.empty}><p>No providers match your search.</p><button className={s.secondaryButton} onClick={() => setVendorQuery('')}>Clear search</button></div>}<div className={s.bottomCallout}><div><h3>Review your service provider register</h3><p>Review the service scope, Canadian processing commitments, and provider terms that apply to your deployment.</p></div><button className={s.secondaryButton} onClick={() => openModal({kind:'question'})}>Contact our team</button></div></section>}

          {tab === 'FAQ' && <section><SectionTitle title="Frequently asked questions" count={trustFaqs.length}/><p className={s.sectionDescription}>Straightforward answers for your security and procurement review.</p><SearchField value={faqQuery} onChange={setFaqQuery} placeholder="Search questions" label="Search frequently asked questions"/><div className={s.faqTopics} role="group" aria-label="Filter questions by topic">{faqCategories.map(category => <button key={category} aria-pressed={faqCategory === category} onClick={() => setFaqCategory(category)}>{category}<span>{trustFaqs.filter(item => category === 'All topics' || item.category === category).length}</span></button>)}</div><p className={s.faqResultCount} role="status">Showing {filteredFaqs.length} of {trustFaqs.length} answers</p><div className={s.faqPage}>{faqList(filteredFaqs)}</div>{filteredFaqs.length === 0 && <div className={s.empty}><p>No answers match your search.</p><button className={s.secondaryButton} onClick={() => { setFaqQuery(''); setFaqCategory('All topics'); }}>Reset filters</button></div>}<div className={s.bottomCallout}><div><h3>Need a more specific answer?</h3><p>Our team can help with your institution’s review.</p></div><button className={s.secondaryButton} onClick={() => openModal({kind:'question'})}>Ask a question</button></div></section>}

          {tab === 'Updates' && <section><SectionTitle title="Trust center updates"/><div className={s.bottomCallout}><div><h3>Stay informed</h3><p>Ask to receive security, privacy, and provider updates.</p></div><button className={s.primaryButton} onClick={() => openModal({kind:'updates'})}><Bell size={16}/>Subscribe</button></div><div className={s.updatesGrid}>{updates.map(update => <article key={update.name} className={s.documentCard}><span className={s.eyebrow}>{update.category}</span><h3>{update.name}</h3><p>{update.description}</p><External className={s.inlineLink} href={update.href}>{update.label}</External></article>)}</div></section>}

          {tab === 'Media' && <section><SectionTitle title="Media & platform overview"/><p className={s.sectionDescription}>A closer look at the platform, its governance, and the boundaries of your deployment.</p><div className={s.mediaGrid}><TrustMediaOverview/><article className={s.mediaFeature}><div className={s.aiVisual}><span><Sparkles size={36}/></span><div><span>Governance</span><span>Evidence</span><span>Human oversight</span></div></div><div className={s.mediaCopy}><span className={s.eyebrow}>Responsible AI</span><h3>Review the model behind the insight.</h3><p>Understand the AI governance questions, model validation, and institution-specific controls that belong in a deployment review.</p><External className={s.inlineLink} href="https://docs.amlok.io/security/ai-governance">Read AI governance</External></div></article></div></section>}
        </>}
      </div></main>
      <footer className={s.footer}><a href="/" aria-label="Amlok home"><Wordmark/></a><span>© {new Date().getFullYear()} Amlok Tech Inc.</span><nav aria-label="Trust center footer"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/status">Service status</a><button onClick={() => openModal({kind:'issue'})}>Report an issue</button></nav></footer>
    </div>

    {modal && <dialog ref={dialog} className={s.dialog} aria-labelledby="trust-dialog-title" onCancel={closeModal} onClick={event => {if(event.target === event.currentTarget) closeModal();}}><div className={s.dialogInner}><button className={s.closeButton} autoFocus aria-label="Close dialog" onClick={closeModal}><X size={21}/></button>
      {modal.kind === 'framework' ? (() => {
        const framework = trustFrameworks.find(item => item.id === modal.id)!;
        const resource = trustResources.find(item => item.id === framework.resourceId)!;
        return <>
          <div className={s.frameworkModalBadge}><FrameworkBadge kind={framework.badge}/></div>
          <h2 id="trust-dialog-title">{framework.name}</h2>
          <span className={s.eyebrow}>{framework.category}</span>
          <p>{framework.description}</p>
          <div className={s.frameworkRelated}><FileText size={20}/><span>{resource.name}</span>{resource.access === 'restricted' ? <LockKeyhole size={15}/> : resource.href?.startsWith('mailto:') ? <Mail size={15}/> : <ExternalLink size={15}/>}</div>
          <External className={s.inlineLink} href={framework.href}>{framework.hrefLabel || 'About this framework'}</External>
          <div className={s.dialogActions}>
            <button className={s.secondaryButton} onClick={closeModal}>Close</button>
            {resource.access === 'public' && resource.href
              ? <External className={s.primaryButton} href={resource.href}>{resource.actionLabel || 'View resource'}</External>
              : <button className={s.primaryButton} onClick={() => {closeModal(); requestAnimationFrame(() => request(framework.resourceId));}}>Request access</button>}
          </div>
        </>;
      })() : <>
        <span className={s.modalIcon}>{modal.kind === 'updates' ? <Bell size={24}/> : modal.kind === 'access' ? <LockKeyhole size={24}/> : <Mail size={24}/>}</span>
        <h2 id="trust-dialog-title">{draft ? 'Your request is ready' : { access:'Request access',updates:'Subscribe to updates',question:'Contact our team',issue:'Report a security issue',reclaim:'Reclaim access' }[modal.kind]}</h2>
        {draft ? <><p>Review your request, then send it from your email app. Nothing has been submitted yet.</p><div className={s.draftAddress}><span>To</span><strong>{contact}</strong></div><label className={s.field}>Request summary<textarea ref={requestSummary} aria-label="Request summary" readOnly rows={9} value={`Subject: ${draft.subject}\n\n${draft.body}`}/></label><div className={s.dialogActions}><button className={s.secondaryButton} onClick={copyDraft}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Copied' : 'Copy request'}</button><a className={s.primaryButton} href={`mailto:${contact}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}><Mail size={16}/>Open email draft</a></div><p className={s.formNote} role="status">{copyError ? 'Copy is unavailable. Select and copy the request summary above.' : copied ? 'Request copied. Paste it into an email to our team.' : 'Your email app handles delivery. Access or update subscriptions require confirmation from our team.'}</p><button className={s.textButton} onClick={() => setDraft(null)}>Edit request</button></> : <>
          <p>{modal.kind === 'access' ? 'Tell us about your security review and the materials you need. Our team will coordinate access and any confidentiality requirements.' : modal.kind === 'updates' ? 'Receive notifications about security, privacy, and provider updates.' : modal.kind === 'reclaim' ? 'Use the email associated with your previous request. Our team can help you restore access to your approved resources.' : modal.kind === 'issue' ? 'Share a brief description of the issue. Please do not include credentials, personal financial data, or confidential customer records.' : 'Ask a security question or let us know about your questionnaire.'}</p>
          <form onSubmit={prepareRequest}>{modal.kind === 'access' && <p className={s.reclaimPrompt}>Already have access? <button type="button" className={s.textButton} onClick={() => openModal({kind:'reclaim'})}>Reclaim access</button></p>}<div className={s.formGrid}>{modal.kind !== 'updates' && modal.kind !== 'reclaim' && <><label className={s.field}>First name<input defaultValue={fieldValue('firstName')} name="firstName" autoComplete="given-name" required maxLength={80}/></label><label className={s.field}>Last name<input defaultValue={fieldValue('lastName')} name="lastName" autoComplete="family-name" required maxLength={80}/></label></>}<label className={`${s.field} ${s.fullWidth}`}>Work email<input defaultValue={fieldValue('email')} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></label>{modal.kind !== 'updates' && modal.kind !== 'reclaim' && <label className={`${s.field} ${s.fullWidth}`}>Company<input defaultValue={fieldValue('company')} name="company" autoComplete="organization" required maxLength={120}/></label>}
            {modal.kind === 'access' && <><label className={`${s.field} ${s.fullWidth}`}>Reason for access<span className={s.select}><select name="reason" aria-label="Reason for access" required defaultValue={fieldValue('reason')}><option value="" disabled>Select a reason</option><option>Prospective customer</option><option>Existing customer</option><option>Partner or other</option></select><ChevronDown size={16}/></span></label><fieldset className={s.fullWidth}><legend>Access level</legend><div className={s.accessOptions}><label><input type="radio" name="accessLevel" value="full" checked={accessLevel === 'full'} onChange={() => {setAccessLevel('full');setAccessError('');}}/><span>Full access<small>All review materials</small></span></label><label><input type="radio" name="accessLevel" value="limited" checked={accessLevel === 'limited'} onChange={() => setAccessLevel('limited')}/><span>Limited access<small>Select specific resources</small></span></label></div></fieldset>{accessLevel === 'limited' && <fieldset className={s.fullWidth}><legend>Requested materials</legend><div className={s.requestResourceList}>{trustResources.filter(item => item.access === 'restricted').map(resource => <label className={s.checkbox} key={resource.id}><input type="checkbox" name="resources" value={resource.id} checked={selectedResources.includes(resource.id)} onChange={event => { setSelectedResources(current => event.target.checked ? [...current, resource.id] : current.filter(id => id !== resource.id)); setAccessError(''); }}/><span>{resource.name}</span></label>)}</div>{accessError && <p className={s.formError} role="alert">{accessError}</p>}</fieldset>}</>}
            {modal.kind === 'updates' && <fieldset className={s.fullWidth}><legend>Updates you are interested in</legend>{['Security & assurance', 'Privacy & policies', 'Subprocessors'].map(topic => <label className={s.checkbox} key={topic}><input type="checkbox" name="topics" value={topic} defaultChecked={Array.isArray(formValues.topics) ? formValues.topics.includes(topic) : true}/><span>{topic}</span></label>)}{accessError && <p className={s.formError} role="alert">{accessError}</p>}</fieldset>}
            {modal.kind !== 'updates' && modal.kind !== 'reclaim' && <label className={`${s.field} ${s.fullWidth}`}>{modal.kind === 'issue' ? 'Issue description' : 'Additional details'}<textarea defaultValue={fieldValue('message')} name="message" rows={3} maxLength={4000} required={modal.kind === 'issue' || modal.kind === 'question'} placeholder={modal.kind === 'issue' ? 'What did you observe, and where?' : 'How can we help with your review?'}/></label>}
          </div><p className={s.formNote}>This form prepares an email. Your information stays in this browser until you choose to send it. <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</a></p><div className={s.dialogActions}><button className={s.secondaryButton} type="button" onClick={closeModal}>Cancel</button><button className={s.primaryButton} type="submit">Prepare request<Mail size={16}/></button></div></form>
        </>}
      </>}
    </div></dialog>}
  </div>;
}
