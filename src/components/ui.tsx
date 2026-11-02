import { useId, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { heroGradient } from '@/lib/brand';

export function Mark({ className = '', gradient = false }: { className?: string; gradient?: boolean }) {
  const gradientId = `amlok-mark-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return <svg className={className} width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    {gradient && <defs><radialGradient id={gradientId} cx="0" cy="0" r="1" gradientTransform={heroGradient.svgTransform}>{heroGradient.stops.map(stop=><stop key={stop.offset} offset={stop.offset} stopColor={stop.color}/>)}</radialGradient></defs>}
    <path d="M3 26 13 6h6l10 20h-7L16 13l-3.5 7H19l3 6H3Z" fill={gradient ? `url(#${gradientId})` : 'currentColor'} />
  </svg>;
}

export function Wordmark({ className = '', gradient = false }: { className?: string; gradient?: boolean }) {
  return <span className={`wordmark ${gradient ? 'wordmark-gradient' : ''} ${className}`}><Mark gradient={gradient}/><span>amlok</span></span>;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'blue' | 'secondary' | 'ghost'; children: ReactNode }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

export function Badge({ tone = 'neutral', children }: { tone?: 'neutral' | 'blue' | 'success' | 'warning' | 'danger'; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}><span className="status-dot" />{children}</span>;
}
