'use client';

import Image from 'next/image';
import { ResearchAction } from './research-action';
import { useEffect, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { industryGuides, industryGroups, researchLibrary } from '@/content/research-resources';
import styles from './research-library.module.css';

const filters = [
  { value: 'all', label: 'All Types' },
  { value: 'whitepaper', label: 'Whitepaper' },
  { value: 'guide', label: 'Guide' },
  { value: 'report', label: 'Report' },
] as const;
type ResearchFilter = typeof filters[number]['value'];
function validFilter(value: string | null): ResearchFilter {
  return filters.find(filter => filter.value === value)?.value ?? 'all';
}
const searchable = (value: string) => value.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
const industryFilters = [{ value: 'all', label: 'All industries' }, ...industryGroups.map(label => ({ value: label.toLowerCase().replaceAll(' ', '-'), label }))];
const validIndustry = (value: string | null) => industryFilters.find(filter => filter.value === value)?.value ?? 'all';

export function ResearchListing({ collection }: { collection?: 'whitepapers' | 'industry-guides' }) {
  const fixedCategory = collection === 'whitepapers' ? 'whitepaper' : collection === 'industry-guides' ? 'guide' : undefined;
  const collectionLabel = collection === 'whitepapers' ? 'whitepapers' : collection === 'industry-guides' ? 'industry guides' : 'research';
  const previewLabel = collection === 'whitepapers' ? 'whitepaper' : collection === 'industry-guides' ? 'industry guide' : 'research';
  const [category, setCategory] = useState<ResearchFilter>(fixedCategory ?? 'all');
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('all');
  const isIndustryLibrary = collection === 'industry-guides';

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      setCategory(fixedCategory ?? validFilter(params.get('category')));
      setQuery(params.get('q') ?? '');
      setIndustry(validIndustry(params.get('industry')));
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [fixedCategory]);

  function update(nextCategory: ResearchFilter, nextQuery: string, addHistory = false, nextIndustry = industry) {
    nextCategory = fixedCategory ?? nextCategory;
    setCategory(nextCategory);
    setQuery(nextQuery);
    setIndustry(nextIndustry);
    const url = new URL(window.location.href);
    if (fixedCategory || nextCategory === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', nextCategory);
    if (nextQuery.trim()) url.searchParams.set('q', nextQuery.trim());
    else url.searchParams.delete('q');
    if (isIndustryLibrary && nextIndustry !== 'all') url.searchParams.set('industry', nextIndustry);
    else url.searchParams.delete('industry');
    url.hash = 'all-posts';
    if (url.href !== window.location.href) {
      if (addHistory) window.history.pushState(null, '', url);
      else window.history.replaceState(null, '', url);
    }
  }

  const terms = searchable(query).trim().split(/\s+/).filter(Boolean);
  const source = isIndustryLibrary ? industryGuides : researchLibrary;
  const selectedIndustry = industryFilters.find(filter => filter.value === industry)?.label;
  const matches = source.filter(resource => {
    const text = searchable(`${resource.gradientTitle} ${resource.title} ${resource.description} ${resource.category} ${resource.industry ?? ''} ${resource.format}`);
    return (category === 'all' || resource.format.toLowerCase() === category) && (!isIndustryLibrary || industry === 'all' || resource.industry === selectedIndustry) && terms.every(term => text.includes(term));
  });
  const isFiltered = (!fixedCategory && category !== 'all') || query.trim().length > 0 || (isIndustryLibrary && industry !== 'all');

  return <section className={styles.library} id="all-posts" aria-labelledby="research-library-title">
    <div className="cp-inner">
      <div className={styles.libraryHeading}>
        <h2 id="research-library-title">Explore the {collectionLabel}.</h2>
        <p>{collection === 'whitepapers' ? 'Deeper perspectives on connected evidence and changing risk.' : isIndustryLibrary ? 'Find your subsegment. Understand the evidence, the workflow and the opportunity.' : 'Reports, whitepapers, and guides with evidence you can inspect.'}</p>
      </div>
      {isIndustryLibrary && <div className={styles.industryFilters} role="group" aria-label="Industry groups">
        {industryFilters.map(filter => <button key={filter.value} type="button" aria-pressed={industry === filter.value} aria-controls="research-results" onClick={() => update(category, query, true, filter.value)}>{filter.label}<span>{filter.value === 'all' ? industryGuides.length : industryGuides.filter(guide => guide.industry === filter.label).length}</span></button>)}
      </div>}
      <div className={`${styles.toolbar}${fixedCategory ? ` ${styles.collectionToolbar}` : ''}`}>
        {isIndustryLibrary && <label className={styles.mobileFilter}><span>Industry:</span><select aria-label="Industry" value={industry} onChange={event => update(category, query, true, validIndustry(event.target.value))}>{industryFilters.map(filter => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select><ChevronDown size={17} aria-hidden="true"/></label>}
        {!fixedCategory && <>
        <div className={styles.typeFilters} role="group" aria-label="Research types">
          {filters.map(filter => <button key={filter.value} type="button" aria-pressed={category === filter.value} aria-controls="research-results" onClick={() => update(filter.value, query, true)}>{filter.label}</button>)}
        </div>
        <label className={styles.mobileFilter}>
          <span>Type:</span>
          <select aria-label="Research type" value={category} onChange={event => update(validFilter(event.target.value), query, true)}>{filters.map(filter => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select>
          <ChevronDown size={17} aria-hidden="true"/>
        </label>
        </>}
        <div className={styles.search} role="search" aria-label={`${collectionLabel} library`}>
          <Search size={18} aria-hidden="true"/>
          <input type="search" aria-label={`Search ${collectionLabel}`} placeholder={`Search ${collectionLabel}…`} value={query} onChange={event => update(category, event.target.value)} aria-controls="research-results"/>
          {query && <button type="button" aria-label="Clear search" onClick={() => update(category, '')}><X size={16} aria-hidden="true"/></button>}
        </div>
      </div>
      <div className={styles.resultsMeta}>
        <p role="status" aria-live="polite" aria-atomic="true">{matches.length} {previewLabel} {matches.length === 1 ? 'publication' : 'publications'}{query.trim() ? ` matching “${query.trim()}”` : ''}</p>
        {isFiltered && <button type="button" onClick={() => update('all', '', true, 'all')}>Clear filters <X size={13} aria-hidden="true"/></button>}
      </div>
      <div id="research-results" className={styles.results}>
        {matches.map(resource => {
          const title = `${'gradientTitle' in resource ? resource.gradientTitle + ' ' : ''}${resource.title}`;
          return <article key={resource.image} className={styles.card}>
            <div className={styles.cardArt}><Image src={`/images/resources/${resource.image}.svg`} alt={`AMLOK research book: ${title}`} width={1200} height={650} sizes="(max-width: 767px) 100vw, 264px"/></div>
            <div className={styles.cardCopy}>
              <div className={styles.tags}><span>{resource.format}</span><i aria-hidden="true"/><span>{isIndustryLibrary ? resource.industry : resource.category}</span></div>
              <h3><a href={resource.href}>{title}</a></h3>
              <p>{resource.description}</p>
              <span className={styles.preview} id={`research-status-${resource.image}`}>{resource.readMinutes} min read · AMLOK</span>
              <div className={styles.cardActions}><ResearchAction resource={resource} availabilityId={`research-status-${resource.image}`}/></div>
            </div>
          </article>;
        })}
      </div>
      {!matches.length && <div className={styles.empty}><Search size={30} aria-hidden="true"/><h3>No matching {collectionLabel}.</h3><p>Try another topic or clear your filters to explore the collection.</p><button className="cp-button" type="button" onClick={() => update('all', '', true, 'all')}>View all {collectionLabel}</button></div>}
    </div>
  </section>;
}
