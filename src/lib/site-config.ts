import pageIndex from '@/content/page-index.json';

// Production is canonical, including when this export is served on a preview host.
export const siteOrigin = 'https://amlok.io';

// Add completed, indexable pages here as they are published.
// /brand is intentionally excluded because its metadata specifies noindex.
export const sitemapPaths = pageIndex.map(page => page.path);
