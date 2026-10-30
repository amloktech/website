'use client';

import { useId } from 'react';
import { ArrowDownLeft, Banknote, Check, CircleAlert, UserRound } from 'lucide-react';

export type WebsiteGraphicKind = 'approvals' | 'radar' | 'fraud' | 'income' | 'offers' | 'portfolio' | 'collections';

function ApprovalGraphic() {
  const id = useId().replace(/:/g, '');
  return <div className="adoption-approval">
    <div className="adoption-telemetry">Credit assessment</div>
    <div className="adoption-legend"><span><i/>Approved</span><span><i/>Further review</span></div>
    <svg viewBox="0 0 320 224" fill="none">
      <defs>
        <pattern id={`approval-${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V6" stroke="var(--blue)" strokeWidth="2"/></pattern>
        <linearGradient id={`approval-ceramic-${id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--canvas)"/><stop offset="1" stopColor="var(--blue-soft)"/></linearGradient>
        <linearGradient id={`approval-cobalt-${id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--blue-secondary)"/><stop offset=".55" stopColor="var(--blue-field)"/><stop offset="1" stopColor="var(--identity-blue)"/></linearGradient>
      </defs>
      <g className="adoption-ring-object">
        <g transform="translate(0 7)">
          <circle cx="160" cy="111" r="78" stroke="var(--line)" strokeWidth="17"/>
          <circle className="adoption-ring" cx="160" cy="111" r="78" stroke="var(--identity-blue)" strokeWidth="17" pathLength="100" strokeDasharray="58 42" transform="rotate(-90 160 111)"/>
        </g>
        <circle cx="160" cy="111" r="78" stroke={`url(#approval-ceramic-${id})`} strokeWidth="17"/>
        <circle className="adoption-ring" cx="160" cy="111" r="78" stroke={`url(#approval-cobalt-${id})`} strokeWidth="17" pathLength="100" strokeDasharray="58 42" transform="rotate(-90 160 111)"/>
        <circle cx="160" cy="111" r="78" stroke={`url(#approval-${id})`} strokeWidth="17" pathLength="100" strokeDasharray="12 88" strokeDashoffset="-58" transform="rotate(-90 160 111)"/>
        <circle cx="160" cy="111" r="87" stroke="var(--canvas)" strokeOpacity=".5" strokeWidth=".7"/>
      </g>
      <text x="160" y="115" textAnchor="middle" fill="var(--muted)" fontSize="11">APPROVAL REVIEW</text>
    </svg>
    <div className="adoption-graphic-note"><span className="adoption-hatched-key"/>Additional cash flow context</div>
  </div>;
}
function RadarGraphic() {
  return <div className="adoption-radar"><div className="adoption-radar-grid"/><div className="adoption-radar-frame"><i/><i/><i/><b className="adoption-radar-cross horizontal"/><b className="adoption-radar-cross vertical"/><span className="adoption-radar-point point-one"/><span className="adoption-radar-point point-two"/><span className="adoption-radar-point point-alert"/><span className="adoption-radar-scan"/></div><span className="adoption-radar-label adoption-telemetry">Signal scan / active</span></div>;
}
function FraudGraphic() {
  return <div className="adoption-fraud"><div className="adoption-flags"><span><CircleAlert size={13}/>Signals for review</span><ul><li>Cash reserves declining</li><li>Revenue evidence incomplete</li><li>Concurrent borrowing detected</li></ul></div><div className="adoption-telemetry">Borrower file / 024</div><div className="adoption-mini-file"><strong>Business credit</strong><span>Institution: Example lender</span><span>Requested: CAD 85,000</span><span>Term: 24 months</span></div></div>;
}
function IncomeGraphic() {
  return <div className="adoption-income"><div className="adoption-deposit"><Banknote size={18}/><div><strong>Operating revenue</strong><small>Oct 15 · recurring deposit</small></div><b>+$12,480</b></div><div className="adoption-deposit secondary"><ArrowDownLeft size={16}/><div><strong>Contract payment</strong><small>Oct 08 · verified source</small></div><b>+$3,250</b></div><div className="adoption-income-bars">{[88,62,73,91,69,82].map((height,i)=><i className={i>2?'projected':''} key={i} style={{'--bar-height':`${height}%`,'--bar-delay':`${i*100}ms`} as React.CSSProperties}/>)}</div><div className="adoption-axis"><span>Observed income</span><span>Expected pattern</span></div></div>;
}
function OffersGraphic() {
  return <div className="adoption-offers"><div className="adoption-capacity"><span>Repayment capacity</span><div className="adoption-capacity-track">{Array.from({length:8},(_,i)=><i key={i}/>)}<b/></div><div className="adoption-axis"><span>Lower</span><span>Higher</span></div></div><div className="adoption-offer-file"><span className="adoption-telemetry">Offer scenario</span><div className="adoption-offer-tags"><span>For review</span><span><Check size={11}/>Policy aligned</span></div><strong>Working capital</strong><div><span>Principal</span><b>CAD 60,000</b></div><div><span>Term</span><b>18 months</b></div></div></div>;
}
function PortfolioGraphic() {
  const id = useId().replace(/:/g, '');
  return <div className="adoption-portfolio"><div className="adoption-telemetry">Liquidity / last six months</div><div className="adoption-trend-plane"><svg viewBox="0 0 320 215" fill="none"><defs><linearGradient id={`portfolio-area-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--blue-secondary)" stopOpacity=".18"/><stop offset="1" stopColor="var(--blue-secondary)" stopOpacity="0"/></linearGradient></defs>{[30,65,100,135,170,205].map(y=><path key={y} d={`M12 ${y}H308`} stroke="var(--line)"/>)}<path d="M12 85C45 85 51 72 80 76S122 64 153 67S190 62 210 79S259 108 308 144V205H12Z" fill={`url(#portfolio-area-${id})`}/><path className="adoption-trend" d="M12 85C45 85 51 72 80 76S122 64 153 67S190 62 210 79S259 108 308 144" stroke="var(--blue-secondary)" strokeWidth="2.5" pathLength="100"/><circle className="adoption-trend-point" cx="308" cy="144" r="4" fill="var(--signal-orange)"/></svg></div><div className="adoption-trend-alert"><CircleAlert size={12}/>Cash buffer declining</div><div className="adoption-axis"><span>May</span><span>October</span></div></div>;
}
function CollectionsGraphic() {
  return <div className="adoption-collections"><div className="adoption-code"><pre>{`{\n  "borrower": "example_024",\n  "cash_inflow": 12480.00,\n  "currency": "CAD",\n  "next_deposit": "Oct 30",\n  "payment_status": "review"\n}\n\n{\n  "workflow": "repayment",\n  "next_step": "contact",\n  "approval": "required"\n}`}</pre></div><div className="adoption-person"><UserRound size={36} strokeWidth={1.4}/></div><span className="adoption-collections-tag"><Check size={12}/>Human-approved workflow</span></div>;
}
export function WebsiteGraphic({kind}:{kind:WebsiteGraphicKind}) {
  switch(kind) {case 'approvals':return <ApprovalGraphic/>;case 'radar':return <RadarGraphic/>;case 'fraud':return <FraudGraphic/>;case 'income':return <IncomeGraphic/>;case 'offers':return <OffersGraphic/>;case 'portfolio':return <PortfolioGraphic/>;case 'collections':return <CollectionsGraphic/>;}
}

