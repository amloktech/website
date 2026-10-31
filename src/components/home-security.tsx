import { ShieldCheck } from 'lucide-react';

const assurances = [
  { kind:'soc-ii', name:'AICPA SOC 2 Type II', status:'Compliant' },
  { kind:'soc-i', name:'AICPA SOC 2 Type I', status:'Compliant' },
  { kind:'iso', name:'ISO/IEC 27001', status:'Compliant' },
  { kind:'iso-ai', name:'ISO/IEC 42001', status:'Compliant' },
  { kind:'eu-ai-act', name:'EU AI Act — Regulation (EU) 2024/1689', status:'Compliant' },
  { kind:'aiuc', name:'AIUC-1', status:'Compliant' },
  { kind:'ibeta', name:'iBeta ISO 30107-3 Level 1', status:'Compliant' },
  { kind:'hipaa', name:'HIPAA', status:'Compliant' },
  { kind:'eidas', name:'eIDAS', status:'Compliant' },
  { kind:'fsm', name:'FSM JMSTV', status:'Compliant' },
] as const;

// Fixed SVG coordinates keep server and browser markup identical.
const assuranceStars = [[80,16],[94.5,19.885],[105.115,30.5],[109,45],[105.115,59.5],[94.5,70.115],[80,74],[65.5,70.115],[54.885,59.5],[51,45],[54.885,30.5],[65.5,19.885]] as const;

function AssuranceMark({kind}:{kind:typeof assurances[number]['kind']}) {
  if(kind==='soc-i'||kind==='soc-ii')return <><text x="80" y="38" fontSize="24" fontWeight="300">AICPA</text><text x="80" y="70" fontSize="25" fontWeight="300">SOC 2</text><text x="80" y="94" fontSize="16">TYPE {kind==='soc-ii'?'II':'I'}</text></>;
  if(kind==='iso'||kind==='iso-ai')return <><g stroke="currentColor" strokeWidth="1" fill="none"><circle cx="80" cy="45" r="29"/><ellipse cx="80" cy="45" rx="15" ry="29"/><ellipse cx="80" cy="45" rx="25" ry="29"/><path d="M52 34h56M51 55h58M59 22q21 12 42 0M59 68q21-12 42 0"/></g><rect x="40" y="30" width="80" height="31" fill="white"/><text x="80" y="58" fontSize="35" fontWeight="900">ISO</text><text x="80" y="99" fontSize="18" fontFamily="monospace" fontWeight="700">{kind==='iso-ai'?'42001':'27001'}</text></>;
  if(kind==='ibeta')return <><text x="80" y="54" fontSize="42" fontWeight="800" letterSpacing="-4">iBeta</text><text x="80" y="80" fontSize="14" fontWeight="700" fontFamily="monospace">ISO30107-3</text><text x="80" y="99" fontSize="15" fontWeight="600">LEVEL 1</text></>;
  if(kind==='fsm')return <><text x="80" y="64" fontSize="49" fontWeight="900" letterSpacing="-1">FSM</text><text x="80" y="98" fontSize="17" fontWeight="700">JMSTV</text></>;
  if(kind==='eu-ai-act')return <><text x="80" y="44" fontSize="30" fontWeight="700">EU</text><text x="80" y="76" fontSize="26" fontWeight="700">AI ACT</text><text x="80" y="99" fontSize="12" fontFamily="monospace">2024/1689</text></>;
  if(kind==='aiuc')return <><text x="80" y="55" fontSize="30" fontWeight="800" letterSpacing="-1">AIUC-1</text><text x="80" y="80" fontSize="10" fontWeight="600">SAFETY · SECURITY</text><text x="80" y="98" fontSize="10" fontWeight="600">RELIABILITY</text></>;
  return <><g>{assuranceStars.map(([x,y],i)=><text key={i} x={x} y={y} fontSize="11" dominantBaseline="central">★</text>)}</g>{kind==='hipaa'?<path d="m66 44 9 9 18-22" stroke="currentColor" strokeWidth="4" fill="none"/>:<g stroke="currentColor" strokeWidth="3" fill="none"><rect x="73" y="40" width="15" height="17" rx="2"/><path d="M76 40v-5a5 5 0 0 1 10 0v5M80 46v5"/></g>}<text x="80" y="100" fontSize="18" fontWeight="700">{kind==='hipaa'?'HIPAA':'eIDAS'}</text></>;
}

export function HomeSecurity() {
  return <section className="home-security" id="security-compliance" aria-labelledby="home-security-title">
    <div className="home-security-inner">
      <span className="home-products-eyebrow"><i aria-hidden="true" />SECURITY AND COMPLIANCE</span>
      <div className="home-security-intro">
        <div className="home-security-copy">
          <h2 id="home-security-title">Compliant by <span className="home-heading-gradient">design.</span></h2>
          <p>Amlok is built on infrastructure and verification services designed for regulated financial workflows. Deployment boundaries, data residency, encryption, evidence lineage, access controls, and retention policies are selected with the institution, not added after integration.</p>
        </div>
        <div className="home-security-status">
          <div className="home-security-status-card"><span className="home-security-status-icon"><ShieldCheck size={24} aria-hidden="true" /></span><div><h3>Institution-ready controls</h3><p>Mapped to each deployment model</p></div></div>
          <div className="home-security-status-card"><span className="home-security-status-icon"><i aria-hidden="true" /></span><div><h3>SOC 2 Type I &amp; II <span>IN PROGRESS</span></h3><p>Independent controls and audit-readiness program underway.</p></div></div>
        </div>
      </div>
      <div className="home-security-assurances" aria-label="Standards, regulations, and assurance coverage">
        {assurances.map(({kind,name,status})=><div className="home-security-badge" key={kind} role="img" aria-label={`${name}: ${status}. Coverage varies by service and deployment; see scope note below.`}>
          <svg viewBox="0 0 160 112" aria-hidden="true" focusable="false" textAnchor="middle"><AssuranceMark kind={kind}/></svg>
          <span>{status}</span>
        </div>)}
      </div>
      <p className="home-security-scope">Standards, regulatory requirements, and assurance coverage shown here may be addressed by Amlok, its cloud infrastructure, or selected subprocessors. Applicable requirements and compliance scope vary by service and deployment; supporting evidence is provided during institutional security review.</p>
    </div>
  </section>;
}
