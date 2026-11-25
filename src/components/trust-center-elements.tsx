'use client';

import { useEffect, useId, useState } from 'react';
import { BookOpen, Building2, ChevronLeft, ChevronRight, ExternalLink, Layers, Pause, Play, RotateCcw } from 'lucide-react';
import { Wordmark } from './ui';
import type { TrustCategory, TrustControl, TrustFramework } from '@/content/trust-center';
import s from './trust-center.module.css';

const guidanceBadges: Partial<Record<TrustFramework['badge'], { title: string; subtitle: string }>> = {
  pipeda: { title: 'PIPEDA', subtitle: 'PRIVACY' },
  'quebec-law25': { title: 'LAW 25', subtitle: 'QUÉBEC' },
  'alberta-pipa': { title: 'PIPA', subtitle: 'ALBERTA' },
  'bc-pipa': { title: 'PIPA', subtitle: 'B.C.' },
  'osfi-b10': { title: 'OSFI', subtitle: 'B-10' },
  'osfi-b13': { title: 'OSFI', subtitle: 'B-13' },
  'osfi-e23': { title: 'OSFI', subtitle: 'E-23' },
  'canadian-sanctions': { title: 'SANCTIONS', subtitle: 'CANADA' },
  fintrac: { title: 'FINTRAC', subtitle: 'AML / ATF' },
  'consumer-driven-banking': { title: 'BANKING', subtitle: 'CANADA' },
};

export function FrameworkBadge({ kind }: { kind: TrustFramework['badge'] }) {
  const gradient = `trust-seal-${useId().replace(/:/g, '')}`;
  const guidance = guidanceBadges[kind];
  if (kind === 'fdx') return <svg className={s.certificationBadge} viewBox="0 0 100 100" aria-hidden="true">
    <rect x="6" y="6" width="88" height="88" rx="16" fill="#f0f6fd" stroke="#cbddeb"/>
    <path d="M26 30h46m-9-8 9 8-9 8M74 70H28m9-8-9 8 9 8" fill="none" stroke="#376fa0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="50" y="58" fill="#17395f" textAnchor="middle" fontSize="26" fontWeight="700" fontFamily="Arial,sans-serif">FDX</text>
  </svg>;
  if (kind === 'soc2') return <img className={s.certificationBadge} src="/images/trust/soc2-badge.webp" alt="" width={64} height={64}/>;
  if (kind === 'soc3') return <svg className={s.certificationBadge} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill="#17395f"/><circle cx="50" cy="50" r="43" fill="none" stroke="#d2e1ed" strokeWidth="1.2"/>
    <text x="50" y="28" fill="#d2e1ed" textAnchor="middle" fontSize="8" letterSpacing="1.5" fontFamily="Arial,sans-serif">ASSURANCE</text>
    <text x="50" y="55" fill="#fff" textAnchor="middle" fontSize="24" fontWeight="700" fontFamily="Arial,sans-serif">SOC 3</text>
    <path d="M29 64h42" stroke="#8fb6ce"/><text x="50" y="77" fill="#d2e1ed" textAnchor="middle" fontSize="8" letterSpacing="1" fontFamily="Arial,sans-serif">GENERAL USE</text>
  </svg>;
  if (kind === 'iso27001' || kind === 'iso42001') return <svg className={s.certificationBadge} viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#275488"/><stop offset="1" stopColor="#142f58"/></linearGradient></defs>
    <circle cx="50" cy="50" r="48" fill={`url(#${gradient})`}/><circle cx="50" cy="50" r="44" fill="none" stroke="#fff" strokeWidth="1.1"/>
    <g stroke="#b1c9e1" strokeWidth=".7" fill="none" opacity=".45"><circle cx="50" cy="49" r="30"/><ellipse cx="50" cy="49" rx="15" ry="30"/><path d="M20 49h60M24 36h52M24 62h52M50 19v60"/></g>
    <text x="50" y="52" fill="#fff" textAnchor="middle" fontSize="28" fontWeight="800" fontFamily="Arial,sans-serif">ISO</text><text x="50" y="70" fill="#fff" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="Arial,sans-serif">{kind === 'iso42001' ? '42001' : '27001'}</text>
  </svg>;
  if (kind === 'aiuc-1') return <svg className={s.certificationBadge} viewBox="0 0 100 100" aria-hidden="true">
    <rect x="6" y="6" width="88" height="88" rx="20" fill="#17395f"/>
    <rect x="11" y="11" width="78" height="78" rx="16" fill="none" stroke="#b1c9e1" strokeWidth="1"/>
    <path d="M34 26h32M34 75h32" stroke="#8fb6ce" strokeWidth="1.5"/>
    <text x="50" y="48" fill="#fff" textAnchor="middle" fontSize="22" fontWeight="700" fontFamily="Arial,sans-serif">AIUC-1</text>
    <text x="50" y="64" fill="#d2e1ed" textAnchor="middle" fontSize="8" letterSpacing=".8" fontFamily="Arial,sans-serif">FRAMEWORK</text>
  </svg>;
  if (guidance) return <svg className={s.certificationBadge} viewBox="0 0 100 100" aria-hidden="true">
    <rect x="6" y="6" width="88" height="88" rx="16" fill="#f4f6fa" stroke="#d5dce7"/>
    <path d="m50 15 4 9 5-3-2 11 8-4-1 5 6 2-13 10 1 4-7-1v8h-2v-8l-7 1 1-4-13-10 6-2-1-5 8 4-2-11 5 3Z" fill="#be3741"/>
    <text x="50" y="71" fill="#263b58" textAnchor="middle" fontSize={guidance.title.length > 7 ? 10 : guidance.title.length > 4 ? 14 : 19} fontWeight="700" fontFamily="Arial,sans-serif">{guidance.title}</text><text x="50" y="85" fill="#586b85" textAnchor="middle" fontSize="10" fontFamily="Arial,sans-serif">{guidance.subtitle}</text>
  </svg>;
  return <svg className={s.certificationBadge} viewBox="0 0 100 100" aria-hidden="true"><path d="M13 21 77 8l13 59-65 13Z" fill="#31747b"/><path d="m20 26 54-11 11 47-54 12Z" fill="#3c8990"/><text x="54" y="54" fill="#fff" fontSize="34" fontWeight="900" textAnchor="middle" fontFamily="Arial,sans-serif" transform="rotate(-11 50 45)">PCI</text><text x="50" y="92" fill="#326a72" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Arial,sans-serif">DSS</text></svg>;
}

export function ControlCategoryTable({ category, controls }: { category: TrustCategory; controls: TrustControl[] }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(controls.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  if (!controls.length) return null;
  return <section className={s.controlTableSection} aria-labelledby={`control-category-${category.id}`}>
    <h3 id={`control-category-${category.id}`}>{category.name}<span className={s.count}>{controls.length}</span></h3>
    <div className={s.controlTableWrap}><table className={s.controlTable}><thead><tr><th scope="col">Control</th><th scope="col">Status</th></tr></thead><tbody>{controls.slice(start, start + pageSize).map(control => <tr key={control.id}><td><strong>{control.name}</strong><p>{control.description}</p><a href={control.href} {...(control.href.startsWith('https://') ? {target:'_blank',rel:'noopener noreferrer'} : {})}>Documentation<ExternalLink size={12}/></a></td><td><span className={control.status === 'Documented' ? s.publicTag : s.neutralTag}>{control.status}</span></td></tr>)}</tbody></table></div>
    <nav className={s.pagination} aria-label={`${category.name} pagination`}><span>{start + 1}–{Math.min(start + pageSize, controls.length)} of {controls.length}</span><button aria-label={`Previous ${category.name} page`} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={17}/></button><span>Page {currentPage} of {pageCount}</span><button aria-label={`Next ${category.name} page`} disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={17}/></button></nav>
  </section>;
}

const overviewSteps = [
  { label: 'Connect', title: 'Start with permitted data.', description: 'Connect authorized sources to build a clearer picture of the applicant and their business.' },
  { label: 'Understand', title: 'Bring the evidence together.', description: 'Connect entities, transactions, and relationships to support a risk assessment.' },
  { label: 'Monitor', title: 'Follow a changing risk picture.', description: 'Monitor changing borrower conditions throughout the life of a portfolio.' },
  { label: 'Decide', title: 'Keep decisions with your team.', description: 'Your institution owns its credit policies, review process, and lending decisions.' },
];

export function TrustMediaOverview({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === overviewSteps.length - 1) setPlaying(false);
      else setStep(step + 1);
    }, 3600);
    return () => window.clearTimeout(timer);
  }, [playing, step]);
  return <article className={`${s.mediaFeature} ${compact ? s.compactMedia : ''}`}>
    <div className={s.mediaPlayer}>
      <div className={s.mediaPlayerTop}><Wordmark/><span>Platform overview</span></div>
      <div className={s.playerDiagram} data-step={step} data-playing={playing}><span className={s.diagramNode}><Layers size={22}/></span><span className={s.flowLine}/><span className={s.diagramNode}><BookOpen size={22}/></span><span className={s.flowLine}/><span className={s.diagramNode}><Building2 size={22}/></span></div>
      <div className={s.playerCaption} aria-live={playing ? 'off' : 'polite'}><strong>{overviewSteps[step].title}</strong><p>{overviewSteps[step].description}</p></div>
      <div className={s.playerControls}><button aria-label={playing ? 'Pause platform overview' : 'Play platform overview'} onClick={() => { if (step === overviewSteps.length - 1 && !playing) setStep(0); setPlaying(!playing); }}>{playing ? <Pause size={17}/> : <Play size={17}/>}</button><div className={s.playerSteps}>{overviewSteps.map((item, index) => <button key={item.label} aria-label={`Overview step ${index + 1}: ${item.label}`} aria-current={step === index ? 'step' : undefined} onClick={() => {setStep(index);setPlaying(false);}}><span/><small>{item.label}</small></button>)}</div><button aria-label="Restart platform overview" onClick={() => {setStep(0);setPlaying(false);}}><RotateCcw size={16}/></button></div>
    </div>
    <div className={s.mediaCopy}><h3>Introducing Amlok</h3><p>Infrastructure for risk intelligence, built around the credit lifecycle.</p><a className={s.inlineLink} href="https://docs.amlok.io/security/overview" target="_blank" rel="noopener noreferrer">Explore the platform<ExternalLink size={14}/></a></div>
  </article>;
}
