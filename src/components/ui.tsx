import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Mark({ className = '' }: { className?: string }) {
  return <svg className={className} width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M3 26 13 6h6l10 20h-7L16 13l-3.5 7H19l3 6H3Z" fill="currentColor" /></svg>;
}

export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`wordmark ${className}`}><Mark /><span>amlok</span></span>;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'blue' | 'secondary' | 'ghost'; children: ReactNode }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

export function Badge({ tone = 'neutral', children }: { tone?: 'neutral' | 'blue' | 'success' | 'warning' | 'danger'; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}><span className="status-dot" />{children}</span>;
}
