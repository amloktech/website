import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import './enterprise-system.css';
import './home-system.css';
import './website-graphics.css';
import './brand-graphics.css';
import './home-use-cases.css';
import './home-risk-gaps.css';
import './product-illustrations.css';
import './product-photography.css';
import './rounded-system.css';
import './home-navigation.css';
import './home-pricing.css';
import './home-lifecycle.css';
import './home-risk-comparison.css';
import './home-features-masonry.css';
import './home-security.css';
import './home-solutions-menu.css';
import './home-monitoring-cta.css';
import './home-resources-menu.css';
import './home-developers-menu.css';
import './site-footer.css';
import './home-faq.css';
import './mobile-system.css';
import './desktop-spacing.css';
import { SiteFooter } from '@/components/site-footer';
import { tokensCSS } from '@/lib/brand';
import { siteOrigin } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'AMLOK — Risk intelligence at the speed of capital',
  description: 'Risk intelligence and AI workflows across the credit lifecycle. Your team owns the final decision.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><style id="amlok-design-tokens">{tokensCSS}</style></head><body>{children}<SiteFooter siteOrigin={siteOrigin} /></body></html>;
}
