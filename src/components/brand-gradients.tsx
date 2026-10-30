'use client';

import { useState, type CSSProperties } from 'react';
import { Check, Copy } from 'lucide-react';
import { gradientFields, heroGradient, tokenGroups } from '@/lib/brand';
import { ProductIllustration, type IllustrationKind } from './product-illustration';

const fields = [
  { id: 'hero', name: 'AMLOK hero', token: heroGradient.token, css: heroGradient.css, from: '#1B4FE0', to: '#052698', reference: 'Current AMLOK identity', use: 'Our established radial field for the hero and primary blue surfaces.' },
  ...gradientFields,
];

export function BrandGradients({ onCopy }: { onCopy: (value: string, label: string) => Promise<void> }) {
  const [selected, setSelected] = useState('periwinkle');
  const [grain, setGrain] = useState(true);
  const [illustration, setIllustration] = useState<IllustrationKind>('verification');
  const field = fields.find(item => item.id === selected)!;

  return <div className="ds-gradient-library">
    <div className="ds-gradient-source"><span className="ds-meta">EXPLORATION / IMAGE BACKGROUNDS</span><p>Color stops from <a href="https://www.sardine.ai/" target="_blank" rel="noreferrer">Sardine’s “Modular building blocks” section</a>, observed October 21, 2026. The examples below preserve AMLOK’s angular graphics within rounded presentation panels.</p></div>
    <div className="ds-gradient-options" role="group" aria-label="Choose a gradient background">
      {fields.map(item => <button type="button" key={item.id} className="ds-gradient-option" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>
        <span className="ds-gradient-color" style={{ background: `var(${item.token})` }} aria-hidden="true"><span>{selected === item.id ? <Check size={16}/> : null}</span></span>
        <span className="ds-gradient-option-copy"><strong>{item.name}</strong><span>{item.from} → {item.to}</span><small>{item.id === 'hero' ? 'Current identity · radial' : 'Exploration · 180° linear'}</small></span>
      </button>)}
    </div>
    <div className="ds-gradient-preview" id="gradient-preview">
      <div className="ds-gradient-stage" data-grain={grain} style={{ ...tokenGroups.Color, background: `var(${field.token})` } as CSSProperties}>
        <ProductIllustration kind={illustration} brandFill="hero"/>
      </div>
      <div className="ds-gradient-preview-copy">
        <span className="ds-meta">LIVE AMLOK COMPARISON</span>
        <h3>{field.name}</h3><p>{field.use}</p>
        <p className="ds-note">Same graphic, different field. The blue focal object and white evidence surfaces stay consistent.</p>
        <label htmlFor="gradient-illustration">Preview graphic</label>
        <select id="gradient-illustration" value={illustration} onChange={event => setIllustration(event.target.value as IllustrationKind)}>
          <option value="verification">Verification &amp; onboarding</option><option value="simulation">Digital twin simulation</option><option value="investigation">Connected evidence</option>
        </select>
        <label className="ds-gradient-grain"><input type="checkbox" checked={grain} onChange={event => setGrain(event.target.checked)}/>Subtle grain texture</label>
        <div className="ds-gradient-recipe"><code>{field.token}</code><p>{field.id === 'hero' ? 'Radial · center 50% / 42% · three blue stops' : `180° · ${field.from} at 0% · ${field.to} at 100%`}</p><button type="button" className="ds-button ds-button-secondary" onClick={() => onCopy(field.css, field.name + ' CSS')}><Copy size={16}/>Copy gradient CSS</button></div>
      </div>
    </div>
    <p className="ds-note ds-gradient-footnote">The five new fields are available in the downloadable tokens for exploration. The current homepage, logo, action colors, and hero gradient retain their existing palette. Grain is a separate, static layer and can be switched off.</p>
  </div>;
}
