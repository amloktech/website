'use client';

import { useId } from 'react';
import { Activity, Gauge, Search, ShieldCheck, WalletCards } from 'lucide-react';
import { heroGradient } from '@/lib/brand';

// A common isometric plane makes the workflows read as interchangeable modules.
const project = (x: number, y: number, z = 0) => `${200 + .85 * x - .85 * y},${65 + .45 * x + .45 * y - z}`;
const face = (x: number, y: number, width: number, depth: number, z = 0) =>
  [project(x, y, z), project(x + width, y, z), project(x + width, y + depth, z), project(x, y + depth, z)].join(' ');

const modules = [
  { x: 0, y: 0, label: 'Verify', icon: ShieldCheck },
  { x: 96, y: 0, label: 'Underwrite', icon: Gauge },
  { x: 0, y: 96, label: 'Service', icon: WalletCards },
  { x: 192, y: 0, label: 'Monitor', icon: Activity },
  { x: 96, y: 96, label: 'AMLOK', icon: null },
  { x: 192, y: 96, label: 'Investigate', icon: Search },
];

export function ProductModularity() {
  const id = useId().replace(/:/g, '');
  return <svg className="home-products-modularity" viewBox="0 0 490 345" role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>Modular workflows. One connected foundation.</title>
    <desc id={`${id}-description`}>Verification, underwriting, monitoring, servicing, and investigation are separate modules connected by AMLOK risk intelligence.</desc>
    <defs>
      <radialGradient id={`${id}-blue`} cx="0" cy="0" r="1" gradientTransform={heroGradient.svgTransform}>
        {heroGradient.stops.map(stop => <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />)}
      </radialGradient>
      <linearGradient id={`${id}-white`} x2="1" y2="1">
        <stop stopColor="var(--canvas)" /><stop offset="1" stopColor="var(--blue-soft)" />
      </linearGradient>
    </defs>

    <polygon points={face(-12, -12, 298, 202, -27)} className="pm-shadow" />
    <polygon points={[project(-12,190),project(286,190),project(286,190,-17),project(-12,190,-17)].join(' ')} className="pm-foundation-front" />
    <polygon points={[project(286,-12),project(286,190),project(286,190,-17),project(286,-12,-17)].join(' ')} className="pm-foundation-side" />
    <polygon points={face(-12,-12,298,202)} fill={`url(#${id}-white)`} className="pm-foundation-top" />

    <g transform="matrix(.85 .45 -.85 .45 200 65)">
      <path d="M41 41H233M41 137H233M41 41V137M137 41V137M233 41V137" className="pm-circuit" />
      <path d="M41 41H233V137H41V41M137 41V137" className="pm-signal" />
      {modules.map(module => <rect key={module.label} x={module.x} y={module.y} width="82" height="82" className="pm-socket" />)}
    </g>

    {modules.map((module, index) => {
      const { x, y, label, icon: Icon } = module;
      const isCore = !Icon;
      const elevation = isCore ? 30 : 14;
      return <g key={label}>
        <path d={`M${project(x,y)}L${project(x,y,elevation)}M${project(x+82,y+82)}L${project(x+82,y+82,elevation)}`} className="pm-registration" />
        <g className={`pm-module${isCore ? ' pm-core' : ''}`} style={{ animationDelay: `${index * -1.3}s` }}>
          <polygon points={[project(x,y+82,elevation),project(x+82,y+82,elevation),project(x+82,y+82,elevation-8),project(x,y+82,elevation-8)].join(' ')} className="pm-module-front" />
          <polygon points={[project(x+82,y,elevation),project(x+82,y+82,elevation),project(x+82,y+82,elevation-8),project(x+82,y,elevation-8)].join(' ')} className="pm-module-side" />
          <polygon points={face(x,y,82,82,elevation)} fill={`url(#${id}-${isCore ? 'blue' : 'white'})`} className="pm-module-top" />
          <g transform={`matrix(.85 .45 -.85 .45 ${200 + .85*x - .85*y} ${65 + .45*x + .45*y - elevation})`}>
            {Icon ? <Icon x={27} y={16} width={28} height={28} strokeWidth={1.6} aria-hidden="true" /> :
              <svg x="24" y="11" width="34" height="34" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 26 13 6h6l10 20h-7L16 13l-3.5 7H19l3 6H3Z" fill="currentColor" /></svg>}
            <text x="41" y="62" textAnchor="middle">{label}</text>
          </g>
        </g>
      </g>;
    })}

    <path d="M188 306h22m54 0h22" className="pm-caption-line" />
    <circle cx="237" cy="306" r="3" className="pm-caption-dot" />
    <text x="237" y="330" textAnchor="middle" className="pm-caption">ONE CONNECTED FOUNDATION</text>
  </svg>;
}
