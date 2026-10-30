import Image from 'next/image';
import { Activity, ArrowDown, ArrowUpRight, Building2, Check, FileCheck2, FileText, Link2, Mail, Search, ShieldCheck, UserRound } from 'lucide-react';
import { Mark } from './ui';

type Workflow = 'verification' | 'underwriting' | 'monitoring' | 'servicing' | 'investigation';

const photographs = {
  verification: {
    src: '/images/workflow-verify-studio.avif',
    alt: 'A ceramic artist at her workbench, surrounded by handmade pottery in a daylight studio.',
    photographer: 'Mina Rad',
    href: 'https://unsplash.com/photos/a-woman-sitting-at-a-table-in-front-of-a-window-lz_zy3NEyDI',
    action: 'Verify',
    details: ['Applicant identity', 'Business & ownership', 'Evidence completeness', 'Screening checks'],
  },
  underwriting: {
    src: '/images/workflow-underwrite-planning.avif',
    alt: 'A team reviewing architectural plans and calculations together at a wooden worktable.',
    photographer: 'Pedro Miranda',
    href: 'https://unsplash.com/photos/people-reviewing-architectural-blueprints-on-desk-3QzMBrvCeyQ',
    action: 'Underwrite',
    details: ['Repayment capacity', 'Credit-policy fit', 'Unresolved risks', 'Ongoing reassessment'],
  },
  monitoring: {
    src: '/images/workflow-monitor-warehouse.avif',
    alt: 'Two colleagues with a scanner and clipboard walking through blue shelving in a working warehouse.',
    photographer: 'Centre for Ageing Better',
    href: 'https://unsplash.com/photos/women-walking-through-warehouse-aisle-ZlOlRnWk8zU',
    action: 'Monitor',
    details: ['Borrower performance', 'Transaction signals', 'Related entities', 'Early warning'],
  },
  servicing: {
    src: '/images/workflow-service-florist.avif',
    alt: 'A florist carefully preparing a fresh bouquet beside a wooden counter in her flower shop.',
    photographer: 'Waldemar Brandt',
    href: 'https://unsplash.com/photos/woman-wearing-gray-cardigan-holding-flower-bouquet-q3RGXuBc_SU',
    action: 'Service',
    details: ['Information requests', 'Account inquiries', 'Payment reminders', 'Repayment workflows'],
  },
  investigation: {
    src: '/images/workflow-investigate-review.avif',
    alt: 'An over-the-shoulder view of a professional comparing paper records at a naturally lit meeting table.',
    photographer: 'Anastassia Anufrieva',
    href: 'https://unsplash.com/photos/a-woman-sitting-at-a-table-reading-a-paper-ecHGTPfjNfA',
    action: 'Investigate',
    details: ['Suspicious activity', 'Screening matches', 'Inconsistent evidence', 'Related-entity concerns'],
  },
} as const;

function OverlayLabel({ action }: { action: string }) {
  return <div className="workflow-photo-label"><Mark /><span>AMLOK / {action}</span></div>;
}

function VerificationOverlay({ step }: { step: number }) {
  const labels = ['Identity linked', 'Ownership connected', 'Evidence assembled', 'Screening ready'];
  return <div className="workflow-photo-overlay workflow-identity" aria-hidden="true">
    <OverlayLabel action="Verify" />
    <div className="workflow-identity-chain">
      <span className={step === 0 ? 'is-selected' : ''}><UserRound /><small>Applicant</small></span>
      <i><Link2 /></i>
      <span className={step === 1 ? 'is-selected' : ''}><Building2 /><small>Business</small></span>
      <i><Link2 /></i>
      <span className={step > 1 ? 'is-selected' : ''}>{step === 3 ? <ShieldCheck /> : <FileCheck2 />}<small>{step === 3 ? 'Screening' : 'Evidence'}</small></span>
    </div>
    <div className="workflow-photo-result"><Check size={14} /><span>{labels[step]}</span><span className="workflow-photo-example">Illustrative</span></div>
  </div>;
}

function UnderwritingOverlay({ step }: { step: number }) {
  const labels = ['Repayment capacity', 'Credit-policy fit', 'Questions to resolve', 'Assessment refreshed'];
  const rows = [
    ['Cash flow evidence', 'Obligations reviewed'],
    ['Policy criteria', 'Supporting rationale'],
    ['Missing evidence', 'Reviewer questions'],
    ['Updated evidence', 'Changes since review'],
  ];
  return <div className="workflow-photo-overlay workflow-assessment" aria-hidden="true">
    <div className="workflow-assessment-sheet"><OverlayLabel action="Underwrite" /><strong>{labels[step]}</strong><span>Evidence into assessment</span></div>
    <div className="workflow-assessment-evidence">{rows[step].map(label => <span key={label}><FileCheck2 size={15} />{label}</span>)}</div>
    <div className="workflow-assessment-footer"><span>Prepared for your team</span><ArrowUpRight size={16} /></div>
  </div>;
}

function MonitoringOverlay({ step }: { step: number }) {
  const stages = ['Baseline', 'Current view', 'Next review'];
  const labels = ['Follow the business', 'Follow the transactions', 'Follow the connections', 'Surface a change'];
  return <div className="workflow-photo-overlay workflow-monitor" aria-hidden="true">
    <OverlayLabel action="Monitor" />
    <div className="workflow-monitor-title"><Activity size={21} /><strong>{labels[step]}</strong><span className="workflow-monitor-live">LIVE</span></div>
    <div className="workflow-monitor-track">{stages.map((label, index) => <span key={label} className={index === (step === 3 ? 2 : 1) ? 'is-selected' : ''}><i /><small>{label}</small></span>)}</div>
    <div className="workflow-monitor-foot"><span>{photographs.monitoring.details[step]}</span><span>Connected signals</span></div>
  </div>;
}

function ServicingOverlay({ step }: { step: number }) {
  const trails = [
    ['Request sent', 'Evidence received', 'Ready for review'],
    ['Inquiry received', 'Context assembled', 'Response prepared'],
    ['Schedule checked', 'Reminder prepared', 'Delivery tracked'],
    ['Plan approved', 'Next step assigned', 'Progress tracked'],
  ];
  return <div className="workflow-photo-overlay workflow-service" aria-hidden="true">
    <OverlayLabel action="Service" />
    <strong>{['Keep work moving', 'A clearer response', 'The right moment', 'A path forward'][step]}</strong>
    <div className="workflow-service-trail">{trails[step].map((label, index) => <div key={label}><span>{index === 0 ? <Mail size={15} /> : index === 1 ? <FileText size={15} /> : <Check size={15} />}</span><small>{label}</small>{index < 2 && <ArrowDown className="workflow-service-arrow" size={12} />}</div>)}</div>
    <span className="workflow-service-foot">Your process. Connected.</span>
  </div>;
}

function InvestigationOverlay({ step }: { step: number }) {
  const labels = ['Connect the context', 'Resolve the match', 'Compare the evidence', 'Trace the relationship'];
  return <div className="workflow-photo-overlay workflow-investigation" aria-hidden="true">
    <OverlayLabel action="Investigate" />
    <strong>{labels[step]}</strong>
    <div className="workflow-source-comparison">
      <div><FileText size={17} /><small>{step === 3 ? 'Entity A' : 'Source A'}</small><i /><i /><i /></div>
      <span className="workflow-source-link"><Search size={18} /></span>
      <div><FileText size={17} /><small>{step === 3 ? 'Entity B' : 'Source B'}</small><i /><i /><i /></div>
    </div>
    <div className="workflow-photo-result"><Link2 size={14} /><span>Evidence linked for review</span></div>
  </div>;
}

const overlays = {
  verification: VerificationOverlay,
  underwriting: UnderwritingOverlay,
  monitoring: MonitoringOverlay,
  servicing: ServicingOverlay,
  investigation: InvestigationOverlay,
};

export function ProductPhotography({ kind, step = 0 }: { kind: Workflow; step?: number }) {
  const photo = photographs[kind];
  const Overlay = overlays[kind];
  return <figure className="workflow-photography" data-workflow={kind}>
    <div className="workflow-photo-stage">
      {/* Keep all five local photographs mounted so scrolling never reveals an empty frame. */}
      {(Object.entries(photographs) as [Workflow, typeof photographs[Workflow]][]).map(([key, item]) => <Image
        key={key} src={item.src} alt={key === kind ? item.alt : ''} fill
        sizes="(min-width: 901px) 600px, 1px"
        className={`workflow-photo-image workflow-photo-image--${key}${key === kind ? ' is-visible' : ''}`}
        aria-hidden={key !== kind}
      />)}
      <div className="workflow-photo-wash" aria-hidden="true" />
      <div className="workflow-photo-corners" aria-hidden="true"><i /><i /><i /><i /></div>
      <Overlay step={Math.min(3, Math.max(0, step))} />
    </div>
    {/* Photo attribution retained for the future terms page: <figcaption><span>Illustrative photography</span><a href={photo.href} target="_blank" rel="noopener noreferrer">{photo.photographer} / Unsplash<span className="home-risk-gaps-sr"> (opens in a new tab)</span></a></figcaption> */}
  </figure>;
}
