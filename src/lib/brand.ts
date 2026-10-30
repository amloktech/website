export const brand = {
  name: 'AMLOK', version: '2.0.0', reviewed: '2026-10-23',
  principle: 'Clear by design. Connected by signals.',
};

/** The existing hero field, shared by CSS surfaces and SVG illustration fills. */
const heroGradientStops = [
  { offset: 0, color: 'var(--blue-deep)' },
  { offset: .42, color: 'var(--hero-blue-middle)' },
  { offset: 1, color: 'var(--identity-blue)' },
] as const;
export const heroGradient = {
  name: 'AMLOK hero gradient',
  token: '--gradient-hero',
  css: `radial-gradient(ellipse at 50% 42%, ${heroGradientStops.map(stop => `${stop.color} ${stop.offset * 100}%`).join(', ')})`,
  stops: heroGradientStops,
  // CSS farthest-corner ellipse in SVG object-bounding-box coordinates.
  svgTransform: 'translate(0.5 0.42) scale(0.7071067812 0.8202438662)',
} as const;

/** Image-backdrop exploration: observed Sardine product-slide stops, 2026-10-21. */
export const gradientFields = [
  { id: 'orchid', name: 'Orchid mist', token: '--gradient-orchid', from: '#FBEAF9', to: '#E8B9E5', reference: 'Device and behavior', use: 'A gentle field for identity and relationship illustrations.' },
  { id: 'periwinkle', name: 'Periwinkle blue', token: '--gradient-periwinkle', from: '#D8E3FA', to: '#7198F4', reference: 'Onboarding', use: 'The closest companion to AMLOK blue for product imagery.' },
  { id: 'lavender', name: 'Lavender light', token: '--gradient-lavender', from: '#BB9FE7', to: '#E2D7F4', reference: 'Fraud prevention', use: 'A darker top that opens into light, suited to simulation imagery.' },
  { id: 'lagoon', name: 'Lagoon depth', token: '--gradient-lagoon', from: '#C2EFF4', to: '#0D775E', reference: 'Cyber security', use: 'A deeper field that gives white evidence surfaces strong separation.' },
  { id: 'apricot', name: 'Apricot warmth', token: '--gradient-apricot', from: '#FCDCCF', to: '#F8713A', reference: 'AML compliance', use: 'A warm counterpoint for a featured workflow or editorial graphic.' },
].map(field => ({ ...field, css: `linear-gradient(180deg, ${field.from} 0%, ${field.to} 100%)` }));

/** Shared marketing layout, matched to Sardine's measured content area. */
export const siteLayout = { contentMax: 1280, desktopGutter: 48, compactGutter: 20, desktopBreakpoint: 1024 } as const;

/** Source of truth for the site and the downloadable design tokens. */
export const tokenGroups = {
  Color: {
    '--canvas': '#ffffff', '--ink': '#101828', '--surface': '#f5f7fb',
    '--surface-raised': '#ffffff', '--line': '#d7deeb', '--line-strong': '#8290a8',
    '--muted': '#58657b', '--identity-blue': '#052698', '--blue': 'var(--identity-blue)', '--blue-secondary': '#2567ff',
    '--blue-secondary-hover': '#174fc9', '--blue-deep': '#1b4fe0', '--blue-soft': '#eaf1ff',
    '--blue-field': '#1239b0', '--navy': 'var(--blue-field)',
    '--hero-blue-middle': '#1140c3',
    '--on-brand': '#ffffff',
    '--on-brand-muted': 'color-mix(in srgb, var(--on-brand) 85%, var(--blue-field))',
    '--on-brand-line': 'color-mix(in srgb, var(--on-brand) 24%, transparent)',
    '--on-brand-surface': 'color-mix(in srgb, var(--on-brand) 8%, transparent)',
    '--signal-violet': '#7b3ff2', '--signal-violet-soft': '#f2ebff',
    '--signal-orange': '#f15a24', '--signal-orange-soft': '#fff0e8',
    '--signal-green': '#41b978', '--signal-green-soft': '#e8f6ee',
    '--success-bg': '#e8f6ee', '--success-fg': '#087b46',
    '--warning-bg': '#fff7e0', '--warning-fg': '#815600',
    '--danger-bg': '#fff0f0', '--danger-fg': '#b42336',
    '--action-fill': '#052698', '--action-ink': '#ffffff', '--focus': '#2567ff',
  },
  Gradient: {
    '--gradient-hero': heroGradient.css,
    ...Object.fromEntries(gradientFields.map(field => [field.token, field.css])),
  },
  Geometry: {
    '--radius-xs': '4px', '--radius-sm': '8px', '--radius-control': '10px',
    '--radius-inner': '12px', '--radius-card': '20px', '--radius-panel': '24px',
    '--radius-media': '20px', '--radius-overlay': '16px', '--radius-pill': '999px', '--radius-signal': '50%',
    '--border-width': '1px', '--focus-width': '2px',
  },
  Surfaces: {
    '--shadow-color': '#101828',
    '--border-subtle': 'color-mix(in srgb, var(--ink) 8%, transparent)',
    '--border-default': 'color-mix(in srgb, var(--ink) 12%, transparent)',
    '--edge-inset': 'inset 0 0 0 1px var(--border-subtle)',
    '--shadow-button': '0 1px 2px color-mix(in srgb, var(--shadow-color) 6%, transparent)',
    '--shadow-raised': '0 2px 4px color-mix(in srgb, var(--shadow-color) 3%, transparent), 0 12px 32px color-mix(in srgb, var(--shadow-color) 5%, transparent)',
    '--shadow-overlay': '0 4px 12px color-mix(in srgb, var(--shadow-color) 6%, transparent), 0 24px 64px color-mix(in srgb, var(--shadow-color) 12%, transparent)',
    '--shadow-navigation': '0 4px 24px color-mix(in srgb, var(--shadow-color) 4%, transparent)',
  },
  Layout: {
    '--site-content-max': `${siteLayout.contentMax}px`,
    '--site-min-gutter': `${siteLayout.desktopGutter}px`,
    '--site-gutter': 'max(var(--site-min-gutter), calc((100vw - var(--site-content-max)) / 2))',
    '--site-content-width': 'min(var(--site-content-max), calc(100vw - var(--site-gutter) - var(--site-gutter)))',
    '--page-max': '1200px', '--section-gap': '64px', '--space-section': 'clamp(64px, 7vw, 112px)',
    '--space-section-content': '48px', '--space-heading-body': '24px', '--space-copy-actions': '24px',
    '--space-actions-media': '32px', '--space-media-caption': '16px', '--space-card-gap': '24px',
    '--space-card-inset': '24px', '--media-panel-height': '240px', '--control-height': '44px',
    '--control-height-compact': '40px', '--control-height-marketing': '48px', '--reading-width': '65ch',
    '--menu-panel-padding': '24px', '--menu-media-height': '292px',
  },
  Typography: {
    '--font-sans': "'Inter Variable', Inter, ui-sans-serif, system-ui, sans-serif",
    '--font-mono': "'JetBrains Mono Variable', ui-monospace, monospace",
    '--text-section-heading': 'clamp(36px, 4.4vw, 62px)',
    '--text-section-description': 'clamp(16px, 1.25vw, 18px)',
    '--text-risk-card-title': 'clamp(18px, 2vw, 28px)',
    '--text-body': '16px', '--text-secondary': '14px', '--text-label': '12px',
    '--menu-link-size': '14px', '--menu-title-size': '16px', '--menu-description-size': '12px', '--menu-label-size': '10px',
    '--leading-body': '1.6', '--leading-heading': '1.08',
  },
  Motion: {
    '--motion-fast': '150ms', '--motion-base': '200ms', '--motion-slow': '400ms',
    '--motion-scan': '4000ms', '--ease-out': 'cubic-bezier(.16, 1, .3, 1)',
  },
  Layers: {
    '--z-dropdown': '20', '--z-sticky': '30', '--z-navigation': '40',
    '--z-overlay': '50', '--z-notification': '80', '--z-access': '100',
  },
} as const;

export const darkTokens = {
  '--shadow-color': '#000000',
  '--canvas': '#09162d', '--ink': '#f4f7ff', '--surface': '#101f38', '--surface-raised': '#162740',
  '--line': '#33445f', '--line-strong': '#7184a3', '--muted': '#b4c2d8',
  '--blue': '#9cbaff', '--blue-soft': '#182e58', '--action-fill': '#a9c3ff',
  '--action-ink': 'var(--blue-field)', '--focus': '#9cbaff',
  '--success-bg': '#11372b', '--success-fg': '#8ce0af',
  '--warning-bg': '#3d3012', '--warning-fg': '#f4d17a',
  '--danger-bg': '#451d2b', '--danger-fg': '#ffadba',
} as const;

export const colors = [
  { name: 'AMLOK blue', hex: '#052698', token: '--blue', use: 'Identity, primary actions, trusted structure', light: false },
  { name: 'Signal blue', hex: '#2567FF', token: '--blue-secondary', use: 'Focus, selected signals, chart emphasis', light: false },
  { name: 'Cobalt blue', hex: tokenGroups.Color['--blue-field'].toUpperCase(), token: '--blue-field', use: 'Blue brand panels, reversed identity, and signal fields', light: false },
  { name: 'Canvas', hex: '#FFFFFF', token: '--canvas', use: 'Primary reading and decision surfaces', light: true },
  { name: 'Surface', hex: '#F5F7FB', token: '--surface', use: 'Secondary regions and image placeholders', light: true },
  { name: 'Ink', hex: '#101828', token: '--ink', use: 'Headings, values, and primary text', light: false },
  { name: 'Insight violet', hex: '#7B3FF2', token: '--signal-violet', use: 'Simulation and distinct chart series', light: false },
  { name: 'Attention orange', hex: '#F15A24', token: '--signal-orange', use: 'Attention markers; use semantic text colors', light: true },
  { name: 'Signal green', hex: '#41B978', token: '--signal-green', use: 'Live or positive markers; always labeled', light: true },
];

const declarations = (tokens: Record<string, string>) => Object.entries(tokens).map(([key, value]) => `  ${key}: ${value};`).join('\n');
export const tokensCSS = `/* AMLOK ${brand.version} — Rounded surfaces / Precise graphics / Clear signals. Source: /brand */
:root {
${Object.values(tokenGroups).map(declarations).join('\n')}
}
[data-amlok-theme="dark"] {
${declarations(darkTokens)}
}
@media (max-width: ${siteLayout.desktopBreakpoint - 1}px) { :root { --site-min-gutter: ${siteLayout.compactGutter}px; } }
@media (prefers-reduced-motion: reduce) {
  :root { --motion-fast: 0ms; --motion-base: 0ms; --motion-slow: 0ms; }
}
`;
