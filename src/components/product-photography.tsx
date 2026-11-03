import Image from 'next/image';
import { Activity, ArrowDown, ArrowUpRight, Building2, Check, FileCheck2, FileText, Link2, Mail, Search, ShieldCheck, UserRound } from 'lucide-react';
import { Mark } from './ui';

type Workflow = 'verification' | 'underwriting' | 'monitoring' | 'servicing' | 'investigation';

const photographs = {
  verification: {
    src: '/images/workflows/verification.webp',
    alt: 'A business owner and advisor reviewing onboarding records together.',
    action: 'Verify',
    details: ['Applicant identity', 'Business & ownership', 'Evidence completeness', 'Screening checks'],
  },
  underwriting: {
    src: '/images/workflows/underwriting.webp',
    alt: 'Credit professionals reviewing financial records and a laptop at a meeting table.',
    action: 'Underwrite',
    details: ['Repayment capacity', 'Credit-policy fit', 'Unresolved risks', 'Ongoing reassessment'],
  },
  monitoring: {
    src: '/images/workflows/monitoring.webp',
    alt: 'A business owner and operations manager reviewing warehouse inventory with a tablet.',
    action: 'Monitor',
    details: ['Borrower performance', 'Transaction signals', 'Related entities', 'Early warning'],
  },
  servicing: {
    src: '/images/workflows/servicing.webp',
    alt: 'A customer support professional helping a customer while reviewing account information.',
    action: 'Service',
    details: ['Information requests', 'Account inquiries', 'Payment reminders', 'Repayment workflows'],
  },
  investigation: {
    src: '/images/workflows/investigation.webp',
    alt: 'Two analysts comparing business records during an evidence review.',
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
    <div className="workflow-photo-result"><Check size={14} /><span>{labels[step]}</span></div>
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
  </figure>;
}
