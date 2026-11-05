import pageIndex from '@/content/page-index.json';

// Production is canonical, including when this export is served on a preview host.
export const siteOrigin = 'https://amlok.io';
export const siteTitle = 'Infrastructure for risk intelligence';
export const siteDescription = 'We make risk move at the speed of capital.';
export const siteSocialImage = {
  url: '/images/amlok-home-social.png',
  width: 3450,
  height: 1918,
  type: 'image/png',
  alt: 'Amlok: Infrastructure for risk intelligence. We make risk move at the speed of capital.',
};

// Add completed, indexable pages here as they are published.
// /brand is intentionally excluded because its metadata specifies noindex.
export const sitemapPaths = pageIndex.map(page => page.path);
