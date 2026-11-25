'use client';

import { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Award, BookOpen, Building2, ClipboardList, Database, ExternalLink, FileBarChart, FileCheck2, FileText, Fingerprint, Globe, Info, KeyRound, Laptop, LockKeyhole, Network, Scale, Server, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { trustControls, trustResources, type TrustResource } from '@/content/trust-center';
import { trustTopics, type TrustTopic } from '@/content/trust-center-topics';
import s from './trust-center.module.css';

const topicIcons: Record<string, LucideIcon> = {
  'risk-profile': FileCheck2, 'product-security': ShieldCheck, reports: FileBarChart,
  'self-assessments': ClipboardList, 'data-security': Database, 'app-security': LockKeyhole,
  ai: Sparkles, legal: Scale, 'data-privacy': Fingerprint, 'access-control': KeyRound,
  infrastructure: Server, 'endpoint-security': Laptop, 'network-security': Network,
  'corporate-security': Building2, policies: FileText, 'security-grades': Award,
};

export const overviewDocumentIds = [
  'trust-whitepaper', 'security-overview', 'security-faqs', 'pci-aoc', 'penetration-test',
  'platform-security', 'soc1-review', 'soc2-report', 'iso-certificate', 'soc3-report',
  'iso42001-certificate', 'caiq', 'sig-lite', 'data-processing-agreement',
  'ai-risk-assessment', 'penetration-test-methodology', 'business-continuity',
  'incident-response-plan', 'secure-product-lifecycle', 'platform-architecture',
  'institutional-subprocessor-register',
] as const;

function DocumentLink({ resource, request }: { resource: TrustResource; request: (id: string) => void }) {
  const contents = <><span className={s.fileIcon}><FileText size={20}/></span><span className={s.documentTileCopy}><small>{resource.category}</small><strong>{resource.name}</strong></span>{resource.access === 'restricted' ? <LockKeyhole size={15} aria-label="Request access"/> : <ExternalLink size={15} aria-hidden="true"/>}</>;
  return resource.access === 'public' && resource.href
    ? <a className={s.documentTile} href={resource.href} title={resource.description} {...(resource.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{contents}</a>
    : <button className={s.documentTile} onClick={() => request(resource.id)} title={resource.description}>{contents}</button>;
}

export function TrustDocuments({ request, viewAll }: { request: (id?: string) => void; viewAll: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const documents = overviewDocumentIds.map(id => trustResources.find(resource => resource.id === id)!);
  return <section className={s.documentsPanel} aria-labelledby="trust-documents-title">
    <div className={s.sectionTitle}><h2 id="trust-documents-title"><FileText size={21}/>Documents<span className={s.count}>{documents.length}</span></h2><button className={s.primaryButton} onClick={() => request()}><LockKeyhole size={14}/>Get access</button></div>
    <p className={s.documentsIntro}>Read public guidance or request the materials relevant to your review.</p>
    <div id="trust-document-list" className={s.documentTiles}>{(expanded ? documents : documents.slice(0, 6)).map(resource => <DocumentLink key={resource.id} resource={resource} request={request}/>)}</div>
    <div className={s.documentsActions}><button className={s.textButton} aria-expanded={expanded} aria-controls="trust-document-list" onClick={() => setExpanded(!expanded)}>{expanded ? 'View less' : `View ${documents.length - 6} more`}{expanded ? <ArrowUp size={15}/> : <ArrowDown size={15}/>}</button><button className={s.textButton} onClick={viewAll}>All resources<ArrowRight size={15}/></button></div>
  </section>;
}

export function TrustTopicGrid({ open, viewControls }: { open: (id: string) => void; viewControls: () => void }) {
  return <section aria-labelledby="trust-topics-title">
    <div className={s.sectionTitle}><h2 id="trust-topics-title">Security & trust<span className={s.count}>{trustTopics.length}</span></h2><button className={s.textButton} onClick={viewControls}>All controls<ArrowRight size={15}/></button></div>
    <div className={s.topicGrid}>{trustTopics.map(topic => {
      const Icon = topicIcons[topic.id] || ShieldCheck;
      return <article key={topic.id} className={s.topicCard}>
        <h3><Icon size={21}/>{topic.name}</h3>
        <ul>{topic.previewItemIds.map(id => { const item = topic.items.find(entry => entry.id === id)!; return <li key={id}><span className={s.topicItemMark} aria-hidden="true">{item.status === 'Documented' ? <FileText size={12}/> : <Info size={12}/>}</span>{item.name}</li>; })}</ul>
        <button className={s.textButton} aria-label={`View ${topic.name}`} onClick={() => open(topic.id)}>View more<ArrowRight size={16}/></button>
      </article>;
    })}</div>
  </section>;
}

export function TrustTopicDetail({ topic, back, request, question }: { topic: TrustTopic; back: () => void; request: (id: string) => void; question: (message: string) => void }) {
  const Icon = topicIcons[topic.id] || ShieldCheck;
  return <section aria-labelledby="trust-topic-title">
    <button className={`${s.textButton} ${s.topicBack}`} onClick={back}><ArrowLeft size={16}/>Back to overview</button>
    <header className={s.topicIntro}><span className={s.topicLargeIcon}><Icon size={25}/></span><div><h2 id="trust-topic-title">{topic.name}</h2><p>{topic.description}</p></div></header>
    <div className={s.topicDetails}>{topic.items.map(item => {
      const controls = (item.controlIds || []).map(id => trustControls.find(control => control.id === id)!);
      const resources = (item.resourceIds || []).map(id => trustResources.find(resource => resource.id === id)!);
      return <article className={s.topicDetailCard} key={item.id}>
        <div className={s.topicDetailHeading}><h3>{item.name}</h3><span className={item.status === 'Documented' ? s.publicTag : s.neutralTag}>{item.status}</span></div>
        <p>{item.description}</p>
        {controls.length > 0 && <div className={s.topicEvidence}><h4>Related controls</h4>{controls.map(control => <a key={control.id} href={control.href} target="_blank" rel="noopener noreferrer"><ShieldCheck size={15}/>{control.name}<ExternalLink size={13}/></a>)}</div>}
        {resources.length > 0 && <div className={s.topicEvidence}><h4>Supporting materials</h4>{resources.map(resource => resource.access === 'public' && resource.href ? <a key={resource.id} href={resource.href} {...(resource.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><BookOpen size={15}/>{resource.name}<ExternalLink size={13}/></a> : <button key={resource.id} onClick={() => request(resource.id)}><LockKeyhole size={15}/>{resource.name}<ArrowRight size={13}/></button>)}</div>}
        {item.href && <a className={s.inlineLink} href={item.href} {...(item.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><Globe size={15}/>{topic.id === 'security-grades' ? 'Visit assessment service' : 'Read more'}<ExternalLink size={13}/></a>}
        {item.requestLabel && <button className={`${s.textButton} ${s.topicRequest}`} onClick={() => question(`Please share the applicable scope, availability, and supporting evidence for ${item.name} in ${topic.name}.`)}>{item.requestLabel}<ArrowRight size={15}/></button>}
      </article>;
    })}</div>
    <div className={s.bottomCallout}><div><h3>Review this topic with our team</h3><p>Discuss your service scope and the supporting evidence your institution needs.</p></div><button className={s.secondaryButton} onClick={() => question(`I would like to review ${topic.name} and the supporting materials for our intended use of Amlok.`)}>Ask a question</button></div>
  </section>;
}
