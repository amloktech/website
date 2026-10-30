import { Mark } from './ui';

function KnightAvatar() {
  return <svg className="knight-avatar" viewBox="0 0 360 430" role="img" aria-label="A friendly Amlok knight mascot holding a blue shield with the Amlok A mark">
    <ellipse cx="178" cy="402" rx="112" ry="13" fill="#052698" opacity=".12" />
    <path d="M168 76C137 49 150 22 162 42c5-28 23-28 27 0 14-24 28-8 18 17 24-15 31 5 8 23l-24 15h-23l-20-10Z" fill="#fffdf5" stroke="#172c55" strokeWidth="7" strokeLinejoin="round" />
    <path d="M179 94v25" stroke="#172c55" strokeWidth="8" strokeLinecap="round" />
    <path d="M92 197c-4-59 26-99 86-101 61 0 91 41 88 100l-13 54H99Z" fill="#fffdf5" stroke="#172c55" strokeWidth="8" strokeLinejoin="round" />
    <path d="M104 175 178 128l78 48-7 27h-140Z" fill="#f5f4ec" stroke="#172c55" strokeWidth="7" strokeLinejoin="round" />
    <path d="M125 175v21m27-37v37m27-54v54m28-37v37m26-21v21" stroke="#3c9dea" strokeWidth="12" strokeLinecap="round" />
    <path d="M110 198c24-10 111-10 136 0l-6 39c-23 25-101 25-124 0Z" fill="#55a9e9" stroke="#172c55" strokeWidth="7" strokeLinejoin="round" />
    <path d="M147 216v11m62-11v11" stroke="#172c55" strokeWidth="10" strokeLinecap="round" />
    <path d="M119 265c-20-2-36 10-42 30l-7 58c-2 19 24 23 30 5l16-45m126-48c20-1 35 11 41 30l13 43c5 19-20 27-28 9l-20-43" fill="#fffdf5" stroke="#172c55" strokeWidth="8" strokeLinejoin="round" />
    <path d="M111 266c34 17 103 17 136 0l9 69c-41 22-113 22-154 0Z" fill="#fffdf5" stroke="#172c55" strokeWidth="8" strokeLinejoin="round" />
    <path d="M120 287c32 14 87 14 118 0m-117 31c34 13 82 13 115 0" fill="none" stroke="#172c55" strokeWidth="6" />
    <text x="178" y="318" textAnchor="middle" fill="#172c55" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="19" letterSpacing="-1">AMLOK</text>
    <path d="M132 344h94l-4 25c-26 14-61 14-87 0Z" fill="#fffdf5" stroke="#172c55" strokeWidth="7" strokeLinejoin="round" />
    <path d="m145 369-20 34c-5 10 1 18 12 18h43c12 0 17-10 11-19l-22-33m45 0-2 33c-1 11 6 19 17 19h43c13 0 17-11 8-20l-30-32" fill="#fffdf5" stroke="#172c55" strokeWidth="8" strokeLinejoin="round" />
    <path d="M138 420h48m58 0h47" stroke="#172c55" strokeWidth="7" strokeLinecap="round" />
    <path d="M270 236 322 253l-4 80c-16 17-34 26-54 34-20-9-37-19-51-37v-80Z" fill="#052698" stroke="#172c55" strokeWidth="8" strokeLinejoin="round" />
    <path d="m271 264 24 49h-13l-11-22-11 22h-13Z" fill="#fff" />
    <path d="M224 274c-14 3-22 14-20 26l10 29c5 12 20 13 27 1l7-20" fill="#fffdf5" stroke="#172c55" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function BrandAvatar() {
  return <>
        <div className="avatar-feature">
          <div className="avatar-art"><div className="avatar-grid"/><div className="avatar-orbit avatar-orbit-one"/><div className="avatar-orbit avatar-orbit-two"/><KnightAvatar/><span className="avatar-art-label">AMLOK / THE SIGNAL KNIGHT</span></div>
          <div className="avatar-copy"><span className="micro-label">A FRIENDLY GUIDE</span><h3>Strong enough to protect.<br/>Warm enough to trust.</h3><p>The knight brings a human face to Amlok. His shield carries the A as a sign of confidence, so the mascot and identity feel like one system.</p><div className="avatar-points"><div><span>01</span><p><strong>Keep the character</strong><br/>Recognizable armor, plume, and blue visor.</p></div><div><span>02</span><p><strong>Make the mark matter</strong><br/>The A becomes a bold, readable shield.</p></div><div><span>03</span><p><strong>Use with purpose</strong><br/>Guide onboarding, explain security, and add warmth.</p></div></div></div>
        </div>
        <div className="avatar-system"><div className="avatar-shield-tile"><span className="micro-label">SHIELD / PRIMARY</span><div className="shield-sample"><Mark/></div><span className="small-muted">Amlok blue · white A</span></div><div className="avatar-usage"><span className="micro-label">CHARACTER ROLE</span><h3>Guide, protector, companion.</h3><p>Use the full knight for human moments and the shield alone when space is tight. Keep the A centered, high contrast, and large enough to read.</p><div className="avatar-tags"><span>ONBOARDING</span><span>SECURITY TIPS</span><span>EMPTY STATES</span></div></div><div className="avatar-mini"><span className="micro-label">SMALL-SCALE MARK</span><div className="mini-armor"><span className="mini-plume"/><span className="mini-visor"/><span className="mini-shield"><Mark/></span></div><span className="small-muted">Silhouette first · details second</span></div></div>
  </>;
}
