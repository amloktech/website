import content from '@/content/site-pages.json';
import type { IllustrationKind } from '@/components/product-illustration';

export type ContentItem = { title: string; body: string };
export type ContentLink = { title: string; url: string };
export type SitePageContent = {
  slug: string; label: string; title: string; accent: string; description: string;
  visual: IllustrationKind; kind: string;
  sections: Array<ContentItem & { items?: ContentItem[]; href?: string }>;
  steps: ContentItem[]; faq: Array<{ question: string; answer: string }>;
  sources: ContentLink[]; related: string[]; cards?: string[]; links?: ContentLink[];
  primary?: { label: string; href: string }; notice?: string;
  comparison?: { vendor: string; category: string; vendorStrengths: string[]; amlokFit: string[]; considerations: string[] };
};

export const sitePages = content as SitePageContent[];
export function findSitePage(slug: string) { return sitePages.find(page => page.slug === slug); }
