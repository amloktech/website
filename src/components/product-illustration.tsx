'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { heroGradient } from '@/lib/brand';

type GlyphName = 'person' | 'document' | 'shield' | 'message' | 'calendar' | 'cursor' | 'code' | 'building' | 'check' | 'phone' | 'voice' | 'link' | 'flag';
export const illustrationDescriptions = {
  verification: 'An identity card is matched to a business document as a scan checks the evidence.',
  underwriting: 'Source documents converge into a credit memo with policy evidence and a human review gate.',
  monitoring: 'A square signal field scans a portfolio and isolates a borrower whose conditions have changed.',
  servicing: 'A borrower conversation connects an information request with an approved payment schedule.',
  investigation: 'Two records share a highlighted reference, revealing a connection for an investigator to review.',
  graph: 'A branching constellation connects financial entities across ownership, accounts, and transactions.',
  financial: 'Fragmented transaction records are reconciled into one structured financial record.',
  decision: 'Evidence passes through a policy gate, with an exception routed to the credit team.',
  simulation: 'A portfolio and its digital twin are compared side by side, with a changed scenario isolated in a raised cobalt plane.',
  customer: 'The institution’s customer experience sits above the connected AMLOK operating layers.',
  browser: 'A browser agent selects an application field and carries its source-linked evidence into a review.',
  embedded: 'An AMLOK intelligence module fits directly into an institution’s existing product interface.',
  workflow: 'An agent workflow branches between evidence requests and a human approval step.',
  api: 'Raw transaction strings pass through a structured API boundary and emerge as labeled data.',
  compliance: 'A policy shield checks an incoming document and identifies an exception for review.',
  quality: 'A field of interaction records is inspected, with one conversation enlarged for quality review.',
  builder: 'An operating procedure is translated into modular, connected agent instructions.',
  testing: 'Several scenario paths run through a sandbox and arrive at distinct test outcomes.',
  observability: 'A highlighted source passage is linked to the exact statement it supports.',
  support: 'An institution and an AMLOK specialist collaborate around a shared implementation plan.',
  channels: 'Voice, messaging, and a web experience converge into a single borrower conversation.',
  'data-security': 'A protected data vault connects residency, retention, and security review controls.',
  'white-label': 'An institution’s branded borrower flow sits above a connected AMLOK intelligence layer.',
} as const;
export type IllustrationKind = keyof typeof illustrationDescriptions;
type IllustrationFormat = 'standard' | 'compact' | 'portrait' | 'detail';

function Label({ x, y, children, tone = '', size = 12 }: { x:number; y:number; children:ReactNode; tone?:string; size?:number }) {
  return <text x={x} y={y} className={'pi-label ' + tone} style={{fontSize:size}}>{children}</text>;
}
function Box({ x, y, w, h, children, tone = '' }: { x:number; y:number; w:number; h:number; children?:ReactNode; tone?:string }) {
  return <g className={'pi-box '+tone} transform={'translate(' + x + ' ' + y + ')'}><rect width={w} height={h} className={'pi-panel ' + tone}/><path d={'M1 1H'+(w-1)} className="pi-edge-light"/>{children}</g>;
}
function Signal({ x, y, tone = '' }: { x:number; y:number; tone?:string }) {
  return <g className={'pi-signal ' + tone} transform={'translate(' + x + ' ' + y + ')'}><circle r="9" className="pi-halo"/><circle r="3.5"/></g>;
}
function Connection({ d, attention=false }: { d:string; attention?:boolean }) {
  return <><path d={d} className="pi-connection"/><path d={d} className={'pi-flow' + (attention?' secondary':'')}/></>;
}
function Glyph({ name, x=0, y=0, size=24, tone='' }: { name:GlyphName; x?:number; y?:number; size?:number; tone?:string }) {
  const paths: Record<GlyphName,string> = {
    person:'M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0ZM4 22v-4c0-5 16-5 16 0v4',
    document:'M5 2h10l4 4v16H5ZM14 2v5h5M8 11h8M8 15h8M8 19h5',
    shield:'M3 3h18v12l-9 7-9-7ZM8 11l3 3 6-7',
    message:'M2 3h20v14H9l-5 4v-4H2ZM6 8h12M6 12h8',
    calendar:'M3 4h18v18H3ZM3 9h18M7 1v6M17 1v6M7 13h3v3H7M14 13h3v3h-3',
    cursor:'M5 2v18l5-5 4 7 4-2-4-7h7Z',
    code:'m8 5-6 7 6 7M16 5l6 7-6 7M14 2l-4 20',
    building:'M4 22V3h16v19M1 22h22M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 22v-4h4v4',
    check:'m5 12 5 5L20 5',
    phone:'M6 2h12v20H6ZM6 17h12M10 20h4',
    voice:'M10 3v12M14 3v12M6 8v6c0 8 12 8 12 0V8M12 20v3M8 23h8',
    link:'m9 14 6-6M8 16l-2 2c-5 5-9-3-5-6l6-6c4-4 9 0 6 4M16 8l2-2c5-5 9 3 5 6l-6 6c-4 4-9 0-6-4',
    flag:'M5 23V2M5 3h14l-4 5 4 5H5',
  };
  return <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" className={'pi-glyph ' + tone}><path d={paths[name]}/></svg>;
}
function Caption({ children }: { children:ReactNode }) {
  return <g className="pi-caption"><path d="M24 22h9" className="pi-outline"/><Label x={42} y={26} tone="telemetry muted" size={8}>{children}</Label></g>;
}
function Paper({ x,y,w=150,h=186,title,children,tone='' }: {x:number;y:number;w?:number;h?:number;title?:string;children?:ReactNode;tone?:string}) {
  return <g className={'pi-paper '+tone} transform={'translate('+x+' '+y+')'}><path d={'M0 0H'+(w-22)+'L'+w+' 22V'+h+'H0Z'} className={'pi-panel '+tone}/><path d={'M1 1H'+(w-23)} className="pi-edge-light"/><path d={'M'+(w-22)+' 0V22H'+w} className="pi-fold"/>{title&&<Label x={16} y={35} size={11} tone="strong">{title}</Label>}{children}</g>;
}

/* Material is shared; composition and focal objects remain specific to each story. */
function IllustrationMaterials({id}:{id:string}) {
  return <defs>
    <linearGradient id={id+'-ceramic'} x1="0" y1="0" x2="1" y2="1"><stop className="pi-stop-canvas"/><stop offset="1" className="pi-stop-ceramic"/></linearGradient>
    <linearGradient id={id+'-cobalt'} x1="0" y1="0" x2="1" y2="1"><stop className="pi-stop-signal"/><stop offset=".55" className="pi-stop-cobalt"/><stop offset="1" className="pi-stop-identity"/></linearGradient>
    <radialGradient id={id+'-hero'} cx="0" cy="0" r="1" gradientTransform={heroGradient.svgTransform}>{heroGradient.stops.map(stop=><stop key={stop.offset} offset={stop.offset} stopColor={stop.color}/>)}</radialGradient>
    <linearGradient id={id+'-soft'} x1="0" y1="0" x2="1" y2="1"><stop className="pi-stop-canvas"/><stop offset="1" className="pi-stop-blue-soft"/></linearGradient>
    <linearGradient id={id+'-scan'}><stop stopColor="var(--blue-secondary)" stopOpacity="0"/><stop offset=".5" stopColor="var(--blue-secondary)" stopOpacity=".2"/><stop offset="1" stopColor="var(--blue-secondary)" stopOpacity="0"/></linearGradient>
    <filter id={id+'-shadow'} x="-35%" y="-35%" width="180%" height="190%" colorInterpolationFilters="sRGB"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="var(--identity-blue)" floodOpacity=".06"/><feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="var(--identity-blue)" floodOpacity=".10"/></filter>
  </defs>;
}
function BrandCore({x,y,size=52}:{x:number;y:number;size?:number}) {
  return <g transform={'translate('+x+' '+y+')'} className="pi-core"><path d={'M0 0H'+size+'V'+size+'H0Z'} className="pi-blue-block pi-elevated"/><path d={'M0 '+size+'l8 5h'+size+'v-'+size+'l-8-5v'+size+'Z'} className="pi-side-face"/><svg x={size*.18} y={size*.18} width={size*.64} height={size*.64} viewBox="0 0 32 32"><path d="M3 26 13 6h6l10 20h-7L16 13l-3.5 7H19l3 6H3Z" fill="var(--on-brand)"/></svg><path d={'M1 1H'+(size-1)} className="pi-edge-light"/></g>;
}
function Badge({x,y,label,tone='blue',icon='check',w=124}:{x:number;y:number;label:string;tone?:string;icon?:GlyphName;w?:number}) {
  return <Box x={x} y={y} w={w} h={31} tone={tone==='blue'?'selected':tone==='warning'?'attention':''}><Glyph name={icon} x={10} y={8} size={15} tone={tone==='warning'?'attention':'blue'}/><Label x={33} y={20} size={9} tone={tone==='warning'?'warning':'blue'}>{label}</Label></Box>;
}
function RadarField({x=0,y=0,size=208}:{x?:number;y?:number;size?:number}) {
  return <g transform={'translate('+x+' '+y+') scale('+size/208+')'} className="pi-radar-field"><rect width="208" height="208" className="pi-blue-block pi-elevated"/>{Array.from({length:9},(_,i)=><path key={i} d={'M'+i*26+' 0V208M0 '+i*26+'H208'} className="pi-inverse-grid"/>)}{[32,60,88].map(n=><rect key={n} x={104-n} y={104-n} width={n*2} height={n*2} className="pi-radar-contour"/>)}<path d="M0 208 104 0 208 208M42 124H166" className="pi-radar-diagonal"/>{[[35,52],[78,144],[144,72],[175,156],[113,106]].map(([a,b],i)=><g key={i}><circle cx={a} cy={b} r={i===4?10:6} className="pi-radar-halo"/><circle cx={a} cy={b} r={i===4?3:2} className={i===4?'pi-radar-alert':'pi-radar-dot'}/></g>)}<g className="pi-radar-sweep"><rect x="0" y="0" width="208" height="26" className="pi-radar-band"/><path d="M0 26H208" className="pi-radar-beam"/></g><path d="M97 90h32v32H97Z" className="pi-radar-target"/></g>;
}
function DocumentLines({x=16,y=54,width=100,count=4}:{x?:number;y?:number;width?:number;count?:number}) {
  return <g>{Array.from({length:count},(_,i)=><path key={i} d={'M'+x+' '+(y+i*15)+'h'+(width-[0,19,8,34][i%4])} className="pi-document-line"/>)}</g>;
}
function Brackets({x,y,w,h}:{x:number;y:number;w:number;h:number}) {
  return <path d={'M'+x+' '+(y+12)+'V'+y+'h12M'+(x+w-12)+' '+y+'h12v12M'+(x+w)+' '+(y+h-12)+'v12h-12M'+(x+12)+' '+(y+h)+'H'+x+'v-12'} className="pi-outline"/>;
}
function PortfolioField({x=0,y=0,small=false,variant=false}:{x?:number;y?:number;small?:boolean;variant?:boolean}) {
  const cell=small?18:26, gap=small?7:10;
  return <g transform={'translate('+x+' '+y+')'}>{Array.from({length:20},(_,i)=>{
    const active=variant?[3,8,13,14].includes(i):[2,7,11].includes(i);
    return <rect key={i} x={(i%5)*(cell+gap)} y={Math.floor(i/5)*(cell+gap)} width={cell} height={cell} className={active?(variant?'pi-tile violet':'pi-tile blue'):'pi-tile'} style={{animationDelay:(i*110)+'ms'}}/>;
  })}</g>;
}

function Verification({step}:{step:number}) {
  return <><Caption>VERIFY / CONNECT THE EVIDENCE</Caption>
    <g className="pi-context"><Paper x={47} y={67} w={207} h={200} title="Business registration"><Glyph name="building" x={18} y={59} size={34} tone="blue"/><DocumentLines x={69} y={68} width={107} count={3}/><path d="M18 116H185" className="pi-grid"/><Label x={18} y={140} size={11}>Example Co.</Label><Label x={18} y={161} size={9} tone="muted">Ownership · source 01</Label><DocumentLines x={18} y={181} width={117} count={1}/></Paper></g>
    <Connection d="M155 174H300V126"/>
    <g className="pi-hover-card"><Box x={160} y={75} w={285} h={144}><rect x={0} width={5} height={144} className="pi-blue-block"/><rect x={20} y={20} width={76} height={100} className="pi-blue-block"/><path d="M20 120 58 40 96 120" className="pi-facet-line"/><Glyph name="person" x={38} y={42} size={40} tone="inverse"/><Label x={113} y={35} size={9} tone="telemetry muted">APPLICANT / 024</Label><Label x={113} y={62} size={19} tone="strong">Identity resolved</Label><Label x={113} y={83} size={10} tone="muted">Connected to the business.</Label><path d="M113 98H265" className="pi-grid"/><Glyph name="check" x={113} y={108} size={17} tone="blue"/><Label x={137} y={121} size={10}>Evidence matched</Label><g className="pi-scan-id"><path d="M13 22H103" className="pi-scan-line"/></g></Box></g>
    <Badge x={278} y={238} w={166} label={['Identity match','Ownership linked','Evidence complete','Screening reviewed'][step%4]}/>
  </>;
}
function Underwriting({step}:{step:number}) {
  const items=['Repayment capacity','Credit-policy fit','Unresolved risks','Reassessment'];
  return <><Caption>UNDERWRITE / EVIDENCE INTO JUDGMENT</Caption>
    <Paper x={30} y={82} w={175} h={176} title="Borrower evidence"><DocumentLines width={126} count={4}/><Glyph name="link" x={17} y={139} size={17} tone="blue"/><Label x={43} y={152} size={9} tone="muted">3 linked sources</Label></Paper>
    <path d="M192 121H260" className="pi-connection"/>
    <Box x={222} y={49} w={229} h={213}><rect width={229} height={64} className="pi-blue-block"/><Label x={18} y={23} size={9} tone="inverse telemetry">AMLOK / CREDIT MEMO</Label><Label x={18} y={48} size={20} tone="inverse">A clearer decision.</Label>{items.map((s,i)=><g key={s}><rect x={12} y={76+i*28} width={205} height={26} className={step===i?'pi-selection':'pi-clear'}/><Glyph name={i===2?'flag':'check'} x={21} y={81+i*28} size={15} tone={i===2?'attention':'blue'}/><Label x={47} y={93+i*28} size={11}>{s}</Label></g>)}</Box>
    <BrandCore x={171} y={131} size={48}/><Badge x={274} y={265} w={177} label="Final decision: your team" icon="person"/>
  </>;
}
function Monitoring() {
  return <><Caption>MONITOR / A SIGNAL IN THE NOISE</Caption><RadarField x={48} y={49} size={226}/>
    <Connection attention d="M171 164H307V150"/>
    <Box x={285} y={108} w={171} h={103}><Label x={16} y={24} size={8} tone="telemetry muted">BORROWER / 024</Label><Label x={16} y={50} size={17} tone="strong">Change detected.</Label><path d="M16 64H155" className="pi-grid"/><Signal x={22} y={84} tone="attention"/><Label x={38} y={88} size={10} tone="warning">Compare with baseline</Label></Box>
    <Badge x={292} y={228} w={151} label="Evidence attached" icon="link"/>
  </>;
}
function Servicing({step}:{step:number}) {
  return <><Caption>SERVICE / CONTEXT IN EVERY CONVERSATION</Caption>
    <Box x={58} y={57} w={285} h={185}><Label x={19} y={27} size={9} tone="telemetry muted">BORROWER CONVERSATION</Label><path d="M19 43H264" className="pi-grid"/><Glyph name="person" x={19} y={58} size={23}/><Label x={55} y={72} size={12}>Your latest documents are ready.</Label><Label x={55} y={92} size={9} tone="muted">Connected to your account</Label><DocumentLines x={55} y={126} width={166} count={2}/></Box>
    <g className="pi-hover-card"><path d="M112 169H385V230H366V246L344 230H112Z" className="pi-blue-block pi-elevated"/><Glyph name="check" x={129} y={185} size={23} tone="inverse"/><Label x={164} y={194} size={12} tone="inverse">Received. Your team has the context.</Label><Label x={164} y={214} size={9} tone="inverse muted">Ready for the next step.</Label></g>
    <Box x={321} y={53} w={126} h={103}><Label x={14} y={22} size={8} tone="telemetry blue">NEXT PAYMENT</Label><Label x={14} y={66} size={39} tone="strong">28</Label><Label x={70} y={61} size={11} tone="muted">OCT</Label><path d="M14 79H111" className="pi-grid"/><Label x={14} y={94} size={8} tone="muted">Schedule connected</Label></Box>
    <Label x={58} y={279} size={8} tone="telemetry blue">{['INFORMATION REQUEST','ACCOUNT CONTEXT','PAYMENT REMINDER','APPROVED REPAYMENT'][step%4]}</Label>
  </>;
}
function Investigation({step}:{step:number}) {
  return <><Caption>INVESTIGATE / SEE THE HIDDEN CONNECTION</Caption>
    <Box x={35} y={60} w={194} h={161}><Glyph name="building" x={17} y={17} size={28} tone="blue"/><Label x={59} y={30} size={12} tone="strong">Application 024</Label><Label x={59} y={47} size={8} tone="muted">Business record</Label><DocumentLines x={17} y={74} width={151} count={2}/><rect x={13} y={108} width={168} height={33} className="pi-attention-fill"/><Label x={24} y={129} size={10}>120 Example Street</Label></Box>
    <Box x={256} y={105} w={194} h={161}><rect width={194} height={5} className="pi-blue-block"/><Glyph name="person" x={17} y={20} size={26} tone="blue"/><Label x={59} y={33} size={12} tone="strong">Entity record 018</Label><Label x={59} y={50} size={8} tone="muted">Related evidence</Label><DocumentLines x={17} y={77} width={151} count={2}/><rect x={13} y={108} width={168} height={33} className="pi-attention-fill"/><Label x={24} y={129} size={10}>120 Example Street</Label></Box>
    <Connection attention d="M216 184H241V229H269"/><Signal x={241} y={205} tone="attention"/>
    <Badge x={279} y={57} w={170} label={['Shared reference','Context required','Compare evidence','Related entity'][step%4]} tone="warning" icon="link"/>
  </>;
}
function RiskGraph() {
  const nodes=[[55,83],[118,48],[178,85],[254,58],[324,82],[417,54],[433,154],[370,226],[283,262],[202,229],[119,256],[46,202],[25,142],[140,153],[235,145],[333,157]];
  const edges=[[0,1],[0,12],[0,13],[1,2],[2,3],[2,13],[2,14],[3,4],[4,5],[4,14],[4,15],[5,6],[6,7],[7,8],[7,15],[8,9],[8,14],[9,10],[9,13],[10,11],[11,12],[11,13],[13,14],[14,15]];
  return <><Caption>RESEARCH / FINANCIAL RELATIONSHIPS, RESOLVED</Caption>{edges.map(([a,b],i)=><Connection key={i} d={'M'+nodes[a][0]+' '+nodes[a][1]+'L'+nodes[b][0]+' '+nodes[b][1]}/>)}{nodes.map(([x,y],i)=><g key={i}><rect x={x-9} y={y-9} width={18} height={18} className={i%3===0?'pi-blue-block':'pi-panel pi-elevated'}/>{i%3===0&&<circle cx={x} cy={y} r={2} className="pi-radar-dot"/>}</g>)}<Box x={169} y={115} w={153} h={65} tone="brand"><Label x={15} y={22} size={8} tone="telemetry muted">CONNECTED ENTITY</Label><Label x={15} y={48} size={20}>Puppy Store</Label></Box><Label x={29} y={63} size={8} tone="muted">Ownership</Label><Label x={351} y={100} size={8} tone="muted">Transactions</Label><Label x={61} y={284} size={8} tone="muted">Accounts</Label><Label x={353} y={252} size={8} tone="muted">Counterparties</Label></>;
}
function Financial() {
  return <><Caption>FINANCIAL INTELLIGENCE / CONNECT THE PICTURE</Caption>
    {['INTERAC E-TRF','STRIPE PAYOUT','PAD 09411'].map((a,i)=><Box key={a} x={26+i*12} y={65+i*58} w={197} h={46}><Glyph name={i===2?'building':'document'} x={12} y={13} size={19} tone="blue"/><Label x={42} y={20} size={8} tone="telemetry muted">{a}</Label><Label x={42} y={36} size={12}>{['+$12,480.00','+$3,250.00','−$1,840.00'][i]}</Label></Box>)}
    <Connection d="M232 156H279"/><BrandCore x={214} y={132} size={43}/>
    <Box x={281} y={64} w={174} h={193} tone="brand"><Label x={17} y={27} size={8} tone="telemetry">RESOLVED RECORD</Label><Label x={17} y={57} size={19}>Example Co.</Label><path d="M17 73H157" className="pi-inverse-grid"/>{[['ENTITY','Business identified'],['CATEGORY','Operating revenue'],['EVIDENCE','Source linked']].map(([a,b],i)=><g key={a}><Label x={17} y={94+i*38} tone="telemetry muted" size={7}>{a}</Label><Label x={17} y={110+i*38} size={11}>{b}</Label></g>)}</Box>
  </>;
}
function Decision() {
  return <><Caption>DECISION INTELLIGENCE / YOUR POLICY. YOUR CONTROL.</Caption>
    {[0,1,2].map(i=><Box key={i} x={28+i*6} y={66+i*56} w={106} h={40}><Glyph name={i===0?'document':i===1?'building':'link'} x={12} y={11} size={19} tone="blue"/><Label x={41} y={25} size={10}>{['Evidence','Policy','Context'][i]}</Label></Box>)}
    <Connection d="M136 142H179M253 142H284V89H321M284 142V217H321"/>
    <path d="M174 62H251l18 18v148h-77l-18-18Z" className="pi-blue-block pi-elevated"/><path d="M251 62v148h-77M251 210l18 18" className="pi-facet-line"/><Glyph name="shield" x={201} y={118} size={38} tone="inverse"/>
    <Box x={315} y={62} w={140} h={61}><Glyph name="check" x={12} y={19} size={23} tone="blue"/><Label x={45} y={27} size={11}>Within criteria</Label><Label x={45} y={44} size={8} tone="muted">Policy aligned</Label></Box><Box x={315} y={185} w={140} h={66}><Glyph name="person" x={12} y={18} size={25} tone="blue"/><Label x={45} y={28} size={11}>Your team</Label><Label x={45} y={46} size={8} tone="muted">Reviews exceptions</Label></Box><Signal x={284} y={142}/>
    <Label x={173} y={273} size={8} tone="telemetry blue">POLICY ENGINE</Label>
  </>;
}
function Simulation() {
  return <><Caption>DIGITAL TWIN / TEST ANOTHER REALITY</Caption>
    <path d="M35 199H197l30 19H65ZM255 184H417l30 19H285Z" className="pi-floor-shadow"/>
    <g transform="translate(37 58)"><path d="M0 17 24 0H184V162l-24 17H0Z" className="pi-side-face"/><Box x={0} y={17} w={160} h={162}><Label x={15} y={25} size={10} tone="strong">Your portfolio</Label><g transform="translate(15 45) scale(.86)"><PortfolioField small/></g><Label x={15} y={149} size={8} tone="muted">Baseline / preserved</Label></Box><path d="M0 17 24 0H184L160 17Z" className="pi-facet-top"/></g>
    <path d="M207 151h38m-6-6 6 6-6 6" className="pi-outline"/>
    <g className="pi-twin-shift"><g transform="translate(257 43)"><path d="M0 17 24 0H184V162l-24 17H0Z" className="pi-side-face"/><Box x={0} y={17} w={160} h={162} tone="brand"><Label x={15} y={25} size={10}>Digital twin</Label><g transform="translate(15 45) scale(.86)"><PortfolioField small variant/></g><Label x={15} y={149} size={8} tone="muted">Scenario / revised policy</Label></Box><path d="M0 17 24 0H184L160 17Z" className="pi-facet-top blue"/></g></g>
    <Badge x={165} y={257} w={154} label="Original stays unchanged" icon="shield"/>
  </>;
}
function Customer() {
  return <><Caption>CUSTOMER / YOUR EXPERIENCE ON TOP</Caption>
    {[0,1,2].map(i=><g key={i}><path d={'M91 '+(143+i*33)+'H352L394 '+(166+i*33)+'H133Z'} className={i===2?'pi-blue-block':'pi-facet-top'}/><path d={'M133 '+(166+i*33)+'V'+(178+i*33)+'H394V'+(166+i*33)+'Z'} className={i===2?'pi-side-face':'pi-selection'}/><path d={'M91 '+(143+i*33)+'v12l42 23v-12Z'} className="pi-side-face"/></g>)}
    <Box x={111} y={48} w={282} h={108}><Glyph name="building" x={20} y={24} size={38} tone="blue"/><Label x={74} y={42} size={19} tone="strong">Your institution</Label><Label x={74} y={64} size={10} tone="muted">Brand · relationship · decision</Label><path d="M20 86H261" className="pi-grid"/></Box><Connection d="M86 92H57V217H91"/><Signal x={57} y={143}/><Label x={140} y={280} size={8} tone="telemetry blue">AMLOK / THE OPERATING LAYERS</Label>
  </>;
}
function Browser() {
  return <><Caption>BROWSER AGENTS / WORK WHERE YOU WORK</Caption>
    <Box x={27} y={47} w={363} h={222}><rect width={363} height={29} className="pi-chrome"/><Signal x={18} y={14}/><Label x={36} y={18} size={8} tone="telemetry muted">YOUR EXISTING SYSTEM</Label><rect x={1} y={30} width={50} height={191} className="pi-chrome"/>{['person','document','calendar'].map((n,i)=><Glyph key={n} name={n as GlyphName} x={16} y={52+i*46} size={19}/>)}<Label x={70} y={63} tone="strong" size={18}>Borrower application</Label><Label x={70} y={89} size={10} tone="muted">Financial statements</Label><Box x={69} y={104} w={273} h={42} tone="selected"><Glyph name="document" x={12} y={11} size={20} tone="blue"/><Label x={44} y={26} size={11}>Statement_2026.pdf</Label><Glyph name="check" x={241} y={13} size={18} tone="blue"/></Box><Brackets x={62} y={97} w={287} h={56}/><DocumentLines x={70} y={174} width={171} count={2}/></Box>
    <g className="pi-agent-cursor"><Glyph name="cursor" x={310} y={170} size={37} tone="blue"/></g>
    <Box x={252} y={227} w={204} h={49} tone="brand"><Signal x={20} y={24}/><Label x={38} y={22} size={12}>Evidence captured</Label><Label x={38} y={38} size={8} tone="muted">Original source stays attached</Label></Box>
  </>;
}
function Embedded() {
  return <><Caption>EMBEDDED / PART OF YOUR PRODUCT</Caption>
    <Box x={29} y={49} w={385} h={215}><rect width={385} height={30} className="pi-chrome"/><Label x={16} y={19} size={9} tone="telemetry">YOUR PRODUCT</Label><rect x={15} y={47} width={103} height={151} className="pi-chrome"/><Glyph name="person" x={49} y={64} size={33}/><Label x={27} y={124} size={10}>Borrower profile</Label><DocumentLines x={27} y={144} width={72} count={2}/><Label x={145} y={64} size={11} tone="strong">Financial context</Label><DocumentLines x={145} y={91} width={217} count={4}/></Box>
    <g className="pi-module-insert"><Box x={193} y={117} w={252} h={154} tone="brand"><Label x={18} y={25} size={8} tone="telemetry muted">AMLOK / CONNECTED INTELLIGENCE</Label><Label x={18} y={57} size={20}>The complete picture.</Label><Label x={18} y={80} size={10} tone="muted">Evidence. Context. Next steps.</Label><path d="M18 96H234" className="pi-inverse-grid"/><Glyph name="document" x={18} y={113} size={22} tone="inverse"/><Label x={52} y={124} size={11}>Borrower file connected</Label><Label x={52} y={141} size={8} tone="muted">Inside your existing workspace</Label></Box></g>
  </>;
}
function Workflow() {
  return <><Caption>WORKFLOW AGENTS / COORDINATE THE WORK</Caption>
    <Connection d="M130 151H195M259 151H290V85H335M290 151V222H335"/>
    <Box x={24} y={115} w={114} h={70}><Glyph name="document" x={15} y={17} size={25} tone="blue"/><Label x={50} y={29} size={12}>New file</Label><Label x={15} y={56} size={9} tone="muted">Evidence received</Label></Box>
    <BrandCore x={190} y={119} size={65}/><Label x={176} y={211} size={8} tone="telemetry blue">WORKFLOW AGENT</Label>
    <Box x={324} y={54} w={133} h={67}><Glyph name="check" x={13} y={14} size={20} tone="blue"/><Label x={44} y={28} size={11}>Verify evidence</Label><Label x={14} y={52} size={9} tone="muted">Source checks complete</Label></Box><Box x={324} y={187} w={133} h={68}><Glyph name="person" x={13} y={14} size={22} tone="blue"/><Label x={44} y={29} size={11}>Your team</Label><Label x={14} y={53} size={9} tone="muted">Approval before action</Label></Box>
    <Badge x={154} y={50} w={136} label="Your policy, applied" icon="shield"/>
  </>;
}
function Api() {
  return <><Caption>API / INTELLIGENCE AT THE BOUNDARY</Caption>
    {['INTERAC E-TRF ***a2','STRIPE MSP DEPOSIT','PAD SPF*94110NT'].map((s,i)=><Box key={s} x={23+i*9} y={73+i*54} w={190} h={39}><Label x={12} y={24} size={10} tone="code">{s}</Label></Box>)}
    <Connection d="M221 143H265"/>
    <Box x={255} y={54} w={202} h={215} tone="brand"><Label x={18} y={25} size={8} tone="telemetry muted">AMLOK / STRUCTURED RESPONSE</Label><path d="M18 38H184" className="pi-inverse-grid"/><Label x={18} y={64} size={18} tone="code">{'{'}</Label>{[['entity','example_business'],['category','operating_revenue'],['evidence','source_01']].map(([a,b],i)=><g key={a}><Label x={34} y={85+i*38} size={9} tone="code muted">{a+':'}</Label><Label x={34} y={102+i*38} size={10} tone="code">{b}</Label></g>)}<Label x={18} y={205} size={18} tone="code">{'}'}</Label></Box><Glyph name="code" x={214} y={128} size={33} tone="blue"/>
  </>;
}
function Compliance() {
  return <><Caption>COMPLIANCE / POLICY THROUGHOUT THE WORK</Caption>
    <Paper x={41} y={62} w={181} h={200} title="Policy requirements"><DocumentLines width={133} count={5}/><rect x={13} y={144} width={154} height={27} className="pi-selection"/><Label x={24} y={162} size={10}>Evidence + consent</Label></Paper><Connection d="M222 157H281"/>
    <path d="M281 53H428V180L354 237 281 180Z" className="pi-blue-block pi-elevated"/><path d="M294 66H415V174L354 220 294 174Z" className="pi-facet-line"/><path d="m324 126 22 22 41-48" className="pi-shield-check"/><path d="M354 53V237" className="pi-facet-line"/>
    <Badge x={247} y={250} w={201} label="Exceptions reach your team" icon="flag" tone="warning"/>
  </>;
}
function Quality() {
  return <><Caption>QUALITY / EACH INTERACTION MATTERS</Caption>
    <g transform="translate(29 66)">{Array.from({length:30},(_,i)=><g key={i} transform={'translate('+((i%6)*33)+' '+(Math.floor(i/6)*36)+')'}><rect width={25} height={27} className={i===14?'pi-panel attention':i%4===0?'pi-blue-block':'pi-panel'}/><Glyph name={i===14?'flag':'check'} x={5} y={6} size={15} tone={i===14?'attention':i%4===0?'inverse':'blue'}/></g>)}</g>
    <Connection d="M107 151H260V125H288"/><Brackets x={91} y={132} w={37} h={39}/>
    <Box x={274} y={68} w={180} h={188}><rect width={180} height={48} className="pi-blue-block"/><Glyph name="message" x={15} y={13} size={23} tone="inverse"/><Label x={49} y={28} size={11} tone="inverse">Interaction 014</Label><Label x={16} y={78} size={16} tone="strong">Context in focus.</Label><DocumentLines x={16} y={97} width={144} count={3}/><rect x={13} y={122} width={154} height={25} className="pi-attention-fill"/><Label x={23} y={139} size={10} tone="warning">Review this response</Label><Label x={16} y={172} size={9} tone="muted">Source evidence attached</Label></Box>
  </>;
}
function Builder() {
  return <><Caption>AGENT BUILDER / TURN PROCEDURE INTO ACTION</Caption>
    <Paper x={25} y={66} w={188} h={200} title="Your operating procedure"><Label x={16} y={69} size={11}>1. Collect the evidence.</Label><Label x={16} y={99} size={11}>2. Apply your policy.</Label><Label x={16} y={129} size={11}>3. Ask for approval.</Label><DocumentLines y={159} width={136} count={2}/></Paper><Connection d="M213 161H271"/>
    {[['Collect evidence','document'],['Evaluate policy','shield'],['Request approval','person']].map(([label,icon],i)=><g key={label} transform={'translate('+(263+i*10)+' '+(50+i*70)+')'}><path d="M0 0 12-7h155l-12 7Z" className="pi-facet-top"/><path d="M155 0 167-7v53l-12 7Z" className="pi-side-face"/><Box x={0} y={0} w={155} h={53} tone={i===1?'brand':''}><Glyph name={icon as GlyphName} x={13} y={14} size={25} tone={i===1?'inverse':'blue'}/><Label x={49} y={23} size={10}>{label.split(' ')[0]}</Label><Label x={49} y={39} size={10}>{label.split(' ')[1]}</Label></Box></g>)}
  </>;
}
function Testing() {
  return <><Caption>TESTING / EXPLORE THE EDGE CASES</Caption>
    <Box x={28} y={102} w={111} h={86} tone="brand"><Glyph name="document" x={17} y={17} size={28} tone="inverse"/><Label x={17} y={66} size={13}>Sample file</Label></Box><Connection d="M139 145H183V74H260M183 145H260M183 145V229H260"/>
    {['Missing evidence','Policy exception','Changed conditions'].map((s,i)=><Box key={s} x={249} y={49+i*78} w={201} h={58}><rect width={4} height={58} className={i===1?'pi-attention-fill':'pi-blue-block'}/><Glyph name={i===1?'flag':'check'} x={15} y={18} size={22} tone={i===1?'attention':'blue'}/><Label x={48} y={25} size={11}>{s}</Label><Label x={48} y={43} size={8} tone="muted">{i===1?'Escalation expected':'Expected behavior checked'}</Label></Box>)}
    <Label x={28} y={264} size={8} tone="telemetry blue">SANDBOX / BEFORE DEPLOYMENT</Label>
  </>;
}
function Observability() {
  return <><Caption>OBSERVABILITY / FOLLOW IT TO THE SOURCE</Caption>
    <Paper x={40} y={52} w={210} h={224} title="Source document"><DocumentLines width={166} count={3}/><rect x={13} y={105} width={183} height={46} className="pi-blue-block"/><Label x={23} y={124} size={10} tone="inverse">Cash receipts reconciled</Label><Label x={23} y={141} size={10} tone="inverse">with the source records.</Label><DocumentLines y={177} width={166} count={2}/><Label x={167} y={213} size={8} tone="telemetry muted">P.04</Label></Paper><Connection d="M237 182H278V143H299"/>
    <Box x={277} y={91} w={179} h={123}><Label x={16} y={25} size={8} tone="telemetry blue">ASSESSMENT EXCERPT</Label><Label x={16} y={53} size={15} tone="strong">Income evidence</Label><Label x={16} y={74} size={15} tone="strong">is source-linked.</Label><Glyph name="link" x={16} y={91} size={16} tone="blue"/><Label x={40} y={104} size={9} tone="blue">[1] Source · page 4</Label></Box>
    <path d="M365 214V238" className="pi-connection"/><Label x={292} y={259} size={9} tone="muted">The evidence stays connected.</Label>
  </>;
}
function Support() {
  return <><Caption>SUPPORT / A SHARED PATH FORWARD</Caption>
    <Box x={115} y={47} w={263} h={213}><Label x={18} y={29} size={10} tone="telemetry blue">IMPLEMENTATION PLAN</Label><path d="M18 43H244" className="pi-grid"/>{['Connect the workspace','Configure your policies','Review the first workflow'].map((s,i)=><g key={s}><Glyph name={i===2?'document':'check'} x={18} y={65+i*42} size={20} tone="blue"/><Label x={49} y={79+i*42} size={11}>{s}</Label></g>)}</Box>
    <Box x={28} y={100} w={129} h={75}><Glyph name="person" x={15} y={14} size={25} tone="blue"/><Label x={15} y={58} size={11}>Your team</Label></Box>
    <Box x={312} y={182} w={139} h={81} tone="brand"><Glyph name="message" x={16} y={15} size={26} tone="inverse"/><Label x={16} y={62} size={12}>AMLOK specialist</Label></Box>
  </>;
}
function Channels() {
  return <><Caption>OMNICHANNEL / ONE BORROWER. EVERY CHANNEL.</Caption>
    <Box x={28} y={65} w={111} h={161}><rect x={10} y={21} width={91} height={117} className="pi-chrome"/><Glyph name="phone" x={39} y={45} size={37} tone="blue"/><Label x={22} y={112} size={11}>Your product</Label></Box>
    <Box x={179} y={45} w={111} h={72}><Glyph name="message" x={14} y={16} size={25} tone="blue"/><Label x={47} y={34} size={10}>Messaging</Label><DocumentLines x={14} y={55} width={80} count={1}/></Box>
    <Box x={179} y={187} w={111} h={72}><Glyph name="voice" x={14} y={16} size={25} tone="blue"/><Label x={47} y={35} size={11}>Voice</Label>{[10,16,23,15,10].map((h,i)=><path key={i} d={'M'+(50+i*7)+' '+(64-h)+'v'+h} className="pi-voice-line"/>)}</Box>
    <Connection d="M139 145H324M290 81H324V145M290 223H324V145H356"/>
    <Box x={353} y={100} w={105} h={108} tone="brand"><Glyph name="person" x={36} y={16} size={31} tone="inverse"/><Label x={12} y={68} size={11}>One borrower</Label><Label x={12} y={88} size={9} tone="muted">Shared context</Label></Box><Signal x={324} y={145}/>
  </>;
}
function DataSecurity() {
  return <><Caption>DATA / CONTROL AT EVERY LAYER</Caption>
    <Connection d="M130 110H216M130 176H216M130 242H216"/>
    {['Residency','Retention','Security review'].map((label,i)=><Box key={label} x={30} y={82+i*66} w={142} h={45}><Glyph name={i===0?'building':i===1?'calendar':'check'} x={12} y={12} size={21} tone="blue"/><Label x={43} y={28} size={10}>{label}</Label></Box>)}
    <g transform="translate(218 69)"><path d="M0 0 19-12h173l-19 12Z" className="pi-facet-top blue"/><path d="M173 0 192-12v179l-19 12Z" className="pi-side-face"/><Box x={0} y={0} w={173} h={179} tone="brand"><Glyph name="shield" x={60} y={26} size={52} tone="inverse"/><Label x={24} y={110} size={17}>Protected data</Label><path d="M22 126H151M22 144H151" className="pi-inverse-grid"/><Label x={24} y={164} size={9} tone="inverse">Your controls. Connected.</Label></Box></g>
  </>;
}
function WhiteLabel() {
  return <><Caption>YOUR BRAND / ONE CONNECTED EXPERIENCE</Caption>
    <Box x={68} y={205} w={328} h={59} tone="brand"><Glyph name="link" x={21} y={18} size={25} tone="inverse"/><Label x={61} y={35} size={13}>AMLOK intelligence underneath</Label></Box>
    <Connection d="M235 186V205"/>
    <g transform="translate(99 57)"><path d="M0 0 17-11h262l-17 11Z" className="pi-facet-top"/><path d="M262 0 279-11v155l-17 11Z" className="pi-side-face"/><Box x={0} y={0} w={262} h={155}><rect width={262} height={37} className="pi-blue-block"/><Glyph name="building" x={13} y={9} size={20} tone="inverse"/><Label x={43} y={24} size={11} tone="inverse">YOUR BRAND</Label><Label x={19} y={65} size={16} tone="strong">A familiar experience.</Label><path d="M19 82H243M19 100H196" className="pi-document-line"/><rect x={18} y={119} width={108} height={22} className="pi-blue-block"/><Label x={42} y={134} size={9} tone="inverse">Continue</Label><Glyph name="check" x={214} y={119} size={23} tone="blue"/></Box></g>
  </>;
}
function Scene({kind,step}:{kind:IllustrationKind;step:number}) {
  switch(kind) {
    case 'verification':return <Verification step={step}/>;
    case 'underwriting':return <Underwriting step={step}/>;
    case 'monitoring':return <Monitoring/>;
    case 'servicing':return <Servicing step={step}/>;
    case 'investigation':return <Investigation step={step}/>;
    case 'graph':return <RiskGraph/>;
    case 'financial':return <Financial/>;
    case 'decision':return <Decision/>;
    case 'simulation':return <Simulation/>;
    case 'customer':return <Customer/>;
    case 'browser':return <Browser/>;
    case 'embedded':return <Embedded/>;
    case 'workflow':return <Workflow/>;
    case 'api':return <Api/>;
    case 'compliance':return <Compliance/>;
    case 'quality':return <Quality/>;
    case 'builder':return <Builder/>;
    case 'testing':return <Testing/>;
    case 'observability':return <Observability/>;
    case 'support':return <Support/>;
    case 'channels':return <Channels/>;
    case 'data-security':return <DataSecurity/>;
    case 'white-label':return <WhiteLabel/>;
  }
}

/* Small cards are composed independently: no miniature dashboard or scaled-down chart. */
function CompactScene({kind}:{kind:IllustrationKind}) {
  if(kind==='financial')return <>
    {[0,1,2].map(i=><Box key={i} x={18+i*7} y={30+i*48} w={154} h={38}><Glyph name="document" x={11} y={11} size={17} tone="blue"/><Label x={37} y={23} size={9} tone="code">{['ETRF ***a2','STRIPE MSP','PAD 09411'][i]}</Label></Box>)}
    <Box x={166} y={58} w={134} h={112} tone="brand"><Glyph name="link" x={15} y={15} size={24} tone="inverse"/><Label x={15} y={62} size={14}>One clear record.</Label><Label x={15} y={83} size={9} tone="muted">Entity + transaction</Label><Label x={15} y={100} size={9} tone="muted">+ source evidence</Label></Box>
  </>;
  if(kind==='decision')return <>
    <Connection d="M59 61H115M59 103H115M59 145H115M166 103H207V63H244M207 103V148H244"/>{[61,103,145].map((y,i)=><Box key={y} x={24} y={y-16} w={42} h={33}><Glyph name={i===1?'building':'document'} x={11} y={7} size={21} tone="blue"/></Box>)}
    <path d="M116 29H163l13 13v131h-47l-13-13Z" className="pi-blue-block pi-elevated"/><path d="M163 29v131h-47M163 160l13 13" className="pi-facet-line"/><Glyph name="shield" x={131} y={89} size={28} tone="inverse"/>
    <Box x={238} y={38} w={61} h={48}><Glyph name="check" x={18} y={12} size={25} tone="blue"/></Box><Box x={238} y={124} w={61} h={48}><Glyph name="person" x={18} y={11} size={25} tone="blue"/></Box><Signal x={207} y={103}/><Label x={91} y={197} size={8} tone="telemetry">YOUR POLICY. YOUR DECISION.</Label>
  </>;
  if(kind==='simulation')return <>
    <g transform="translate(18 43)"><path d="M0 0 16-9h118l-16 9Z" className="pi-facet-top"/><path d="M118 0 134-9v128l-16 9Z" className="pi-side-face"/><Box x={0} y={0} w={118} h={128}><Label x={12} y={23} size={12} tone="strong">Portfolio</Label><g transform="translate(12 42) scale(.65)"><PortfolioField small/></g></Box></g>
    <g className="pi-twin-shift"><g transform="translate(173 29)"><path d="M0 0 16-9h118l-16 9Z" className="pi-facet-top blue"/><path d="M118 0 134-9v128l-16 9Z" className="pi-side-face"/><Box x={0} y={0} w={118} h={128} tone="brand"><Label x={12} y={23} size={12}>Digital twin</Label><g transform="translate(12 42) scale(.65)"><PortfolioField small variant/></g></Box></g></g>
    <path d="M149 106h17m-5-5 5 5-5 5" className="pi-outline"/><Label x={75} y={197} size={8} tone="telemetry muted">EXPLORE. COMPARE. DECIDE.</Label>
  </>;
  return <><RadarField x={25} y={20} size={166}/><Connection attention d="M115 105H223V118"/><Box x={169} y={113} w={134} h={68}><Signal x={18} y={19} tone="attention"/><Label x={14} y={43} size={13} tone="strong">Change detected.</Label><Label x={14} y={59} size={8} tone="muted">Bring the context into review.</Label></Box></>;
}

function PortraitScene({kind}:{kind:IllustrationKind}) {
  if(kind==='monitoring')return <><Label x={21} y={25} size={8} tone="telemetry blue">PORTFOLIO / LIVE SIGNALS</Label><RadarField x={32} y={49} size={256}/><Box x={18} y={244} w={277} h={99}><Label x={17} y={25} size={8} tone="telemetry muted">BORROWER 024 / EVIDENCE ATTACHED</Label><Label x={17} y={53} size={20} tone="strong">A change worth reviewing.</Label><Signal x={23} y={77} tone="attention"/><Label x={40} y={81} size={11} tone="warning">New conditions. Original context.</Label></Box><Badge x={66} y={361} w={230} label="Review against the original assessment" icon="link"/></>;
  return <><Label x={21} y={25} size={8} tone="telemetry blue">DEAL / EVIDENCE INTO ASSESSMENT</Label><Box x={37} y={71} w={247} h={280} tone="selected"/><Box x={21} y={51} w={247} h={280}><rect width={247} height={88} className="pi-blue-block"/><Label x={18} y={27} size={8} tone="telemetry inverse">AMLOK / CREDIT MEMO</Label><Label x={18} y={58} size={25} tone="inverse">Coffee &amp; Co</Label><Label x={18} y={76} size={9} tone="inverse muted">Prepared from linked borrower evidence</Label>{['Repayment capacity','Policy alignment','Unresolved questions'].map((label,i)=><g key={label}><path d={'M17 '+(103+i*43)+'H229'} className="pi-grid"/><Glyph name={i===2?'flag':'check'} x={18} y={117+i*43} size={19} tone={i===2?'attention':'blue'}/><Label x={49} y={131+i*43} size={12}>{label}</Label></g>)}<rect x={15} y={240} width={217} height={25} className="pi-selection"/><Label x={27} y={257} size={10} tone="blue">Final decision: your team</Label></Box><Badge x={62} y={367} w={236} label="Sources stay with the assessment" icon="link"/></>;
}

function DetailScene({kind}:{kind:IllustrationKind}) {
  if(kind==='customer')return <Customer/>;
  if(kind==='verification')return <><Caption>ONBOARDING / THE IDENTITY COMES TOGETHER</Caption>
    {['Applicant','Business','Ownership'].map((name,i)=><g key={name} transform={'translate('+(30+i*147)+' '+(75+(i===1?-24:0))+')'}><Box x={0} y={0} w={124} h={161} tone={i===1?'brand':''}><Glyph name={i===0?'person':i===1?'building':'link'} x={39} y={26} size={46} tone={i===1?'inverse':'blue'}/><Label x={16} y={105} size={15}>{name}</Label><path d="M16 122H108" className={i===1?'pi-inverse-grid':'pi-grid'}/><Label x={16} y={144} size={9} tone="muted">Evidence connected</Label></Box></g>)}<Connection d="M92 236V267H386V236M240 212V267"/><Signal x={240} y={267}/>
  </>;
  if(kind==='underwriting')return <><Caption>UNDERWRITING / ASSESS THE WHOLE FILE</Caption><path d="M31 92H157l17 18h274v153H31Z" className="pi-selection"/><Paper x={54} y={57} w={168} h={179} title="Capacity"><DocumentLines width={120} count={5}/></Paper><Paper x={247} y={43} w={168} h={179} title="Policy fit"><DocumentLines width={120} count={5}/></Paper><Box x={102} y={181} w={273} h={69} tone="brand"><Glyph name="person" x={19} y={20} size={30} tone="inverse"/><Label x={65} y={29} size={14} tone="inverse">Your team owns the judgment.</Label><Label x={65} y={49} size={10} tone="inverse">Evidence prepared. Questions surfaced.</Label></Box></>;
  if(kind==='monitoring')return <><Caption>MONITORING / EVERY CHANGE HAS CONTEXT</Caption>
    <path d="M50 154H424" className="pi-connection"/>{[73,181,289,407].map((x,i)=><g key={x}><rect x={x-7} y={147} width={14} height={14} className={i===3?'pi-attention-fill':'pi-blue-block'}/><Label x={x-24} y={184} size={8} tone="telemetry muted">{['FUNDED','MONTH 01','MONTH 02','TODAY'][i]}</Label></g>)}
    <Box x={28} y={47} w={178} h={77} tone="brand"><Label x={16} y={30} size={16}>Original assessment</Label><Label x={16} y={53} size={10} tone="muted">The baseline stays attached.</Label></Box><Connection d="M73 124V147"/>
    <Box x={258} y={211} w={198} h={64}><Signal x={21} y={28} tone="attention"/><Label x={43} y={28} size={14} tone="strong">New evidence arrived.</Label><Label x={43} y={49} size={9} tone="muted">Compare. Reassess. Respond.</Label></Box><Connection attention d="M407 161V211"/>
  </>;
  if(kind==='servicing')return <><Caption>SERVICING / CONTEXT FOLLOWS THE CUSTOMER</Caption>
    <Box x={146} y={42} w={195} h={233}><rect width={195} height={40} className="pi-blue-block"/><Glyph name="person" x={13} y={11} size={20} tone="inverse"/><Label x={43} y={25} size={11} tone="inverse">Your institution</Label><path d="M15 59H161V105H37l-11 9v-9H15Z" className="pi-chrome"/><Label x={27} y={79} size={11}>Can you confirm</Label><Label x={27} y={96} size={11}>my next payment?</Label><path d="M36 131H182V185H166v11l-13-11H36Z" className="pi-blue-block"/><Label x={49} y={152} size={10} tone="inverse">Your account context</Label><Label x={49} y={171} size={10} tone="inverse">is already connected.</Label><path d="M79 220h37" className="pi-document-line"/></Box>
    <Box x={30} y={170} w={146} h={79}><Glyph name="calendar" x={13} y={19} size={30} tone="blue"/><Label x={53} y={33} size={12}>Next payment</Label><Label x={53} y={53} size={9} tone="muted">Schedule attached</Label></Box><Signal x={360} y={118}/><Label x={374} y={122} size={8} tone="blue">CONNECTED</Label>
  </>;
  return <><Caption>INVESTIGATION / CONNECT WHAT WAS SEPARATE</Caption>
    <Box x={30} y={55} w={184} h={134}><rect width={184} height={38} className="pi-blue-block"/><Label x={16} y={25} size={13} tone="inverse">Borrower record</Label><Label x={16} y={62} size={10} tone="muted">Associated account</Label><rect x={13} y={81} width={158} height={31} className="pi-attention-fill"/><Label x={24} y={102} size={12} tone="code">ACCT •••• 0142</Label></Box>
    <Box x={272} y={117} w={184} h={134}><Label x={16} y={29} size={16} tone="strong">Connected entity</Label><Label x={16} y={62} size={10} tone="muted">Associated account</Label><rect x={13} y={81} width={158} height={31} className="pi-attention-fill"/><Label x={24} y={102} size={12} tone="code">ACCT •••• 0142</Label></Box><Connection attention d="M214 152H243V214H272"/><Signal x={243} y={181} tone="attention"/><Label x={67} y={283} size={9} tone="muted">Shared evidence. A connection worth investigating.</Label>
  </>;
}

export function ProductIllustration({ kind, step=0, className='', format='standard', brandFill='cobalt' }: { kind:IllustrationKind; step?:number; className?:string; format?:IllustrationFormat; brandFill?:'cobalt'|'hero' }) {
  const id='pi-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
  const materials={'--pi-ceramic':`url(#${id}-ceramic)`,'--pi-cobalt':`url(#${id}-${brandFill})`,'--pi-soft':`url(#${id}-soft)`,'--pi-scan':`url(#${id}-scan)`,'--pi-shadow':`url(#${id}-shadow)`} as CSSProperties;
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.05});
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  return <div ref={ref} style={materials} className={'product-illustration '+className} data-illustration={kind} data-format={format} data-brand-fill={brandFill} data-motion={visible?'running':'paused'} role="img" aria-label={'Illustrative graphic: '+illustrationDescriptions[kind]}>
    <svg viewBox={format==='portrait'?'0 0 320 414':format==='compact'?'0 0 320 206':'0 0 480 300'} fill="none" aria-hidden="true" focusable="false"><IllustrationMaterials id={id}/>{format==='portrait'?<PortraitScene kind={kind}/>:format==='compact'?<CompactScene kind={kind}/>:format==='detail'?<DetailScene kind={kind}/>:<Scene kind={kind} step={step}/>}</svg>
  </div>;
}

export function ProductIllustrationLibrary() {
  const [kind,setKind]=useState<IllustrationKind>('verification');
  return <div className="ds-product-graphics"><span className="ds-meta">PRODUCT &amp; WORKFLOW GRAPHICS / LIVE REFERENCE</span><div className="ds-illustration-families">{(['verification','monitoring','simulation','servicing','embedded','observability'] as IllustrationKind[]).map(item=><button key={item} type="button" onClick={()=>setKind(item)} aria-pressed={kind===item}><ProductIllustration kind={item}/><span>{item.charAt(0).toUpperCase()+item.slice(1)}</span></button>)}</div><label htmlFor="product-graphic-example">Choose a homepage illustration</label><select id="product-graphic-example" value={kind} onChange={event=>setKind(event.target.value as IllustrationKind)}>{Object.keys(illustrationDescriptions).map(key=><option key={key} value={key}>{key.charAt(0).toUpperCase()+key.slice(1)}</option>)}</select><div className="ds-illustration-selected"><ProductIllustration kind={kind}/></div><p className="ds-note">{illustrationDescriptions[kind]} Shared colors and geometry create consistency; the subject determines the composition. Documents, scans, conversations, modular systems, and source connections each tell a different story. All sample data is fictional.</p></div>;
}
