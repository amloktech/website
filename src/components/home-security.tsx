import { ArrowUpRight, FileCheck2, KeyRound, LockKeyhole, Network, ShieldCheck } from 'lucide-react';

const controls = [
  { icon: LockKeyhole, title: 'Data protection', description: 'Review encryption, permitted processing locations, and retention requirements for your deployment.' },
  { icon: KeyRound, title: 'Scoped access', description: 'Define tenant boundaries, approved access, and credential responsibilities before connecting live data.' },
  { icon: Network, title: 'Evidence & accountability', description: 'Keep source permissions, assessment evidence, and institutional decision ownership explicit.' },
  { icon: FileCheck2, title: 'Security due diligence', description: 'Review applicable policies, provider assurance materials, and incident-response responsibilities with Amlok.' },
] as const;

export function HomeSecurity() {
  return <section className="home-security" id="security-compliance" aria-labelledby="home-security-title">
    <div className="home-security-inner">
      <span className="home-products-eyebrow"><i aria-hidden="true" />SECURITY AND COMPLIANCE</span>
      <div className="home-security-intro">
        <div className="home-security-copy">
          <h2 id="home-security-title">Security throughout <span className="home-heading-gradient">the lifecycle.</span></h2>
          <p>Amlok protects the information behind financial decisions. Define processing scope, data access, retention, and deployment responsibilities with your institution, from the first connection through ongoing portfolio monitoring.</p>
        </div>
        <div className="home-security-status">
          <div className="home-security-status-card"><span className="home-security-status-icon"><ShieldCheck size={24} aria-hidden="true" /></span><div><h3>Controls aligned to your deployment</h3><p>Security requirements and responsibilities reviewed together.</p></div></div>
          <div className="home-security-status-card"><span className="home-security-status-icon"><FileCheck2 size={24} aria-hidden="true" /></span><div><h3>SOC 2 &amp; ISO/IEC 27001 <span>CONTROL ALIGNMENT</span></h3><p>Review the applicable control evidence and assurance scope.</p></div></div>
        </div>
      </div>
      <div className="home-security-controls">
        {controls.map(({ icon: Icon, title, description }) => <article className="home-security-control" key={title}>
          <Icon size={25} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
      <a className="cp-text-link home-security-details" href="/security-compliance">Review security &amp; compliance <ArrowUpRight size={17} aria-hidden="true" /></a>
    </div>
  </section>;
}
