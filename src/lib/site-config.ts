import pageIndex from '@/content/page-index.json';

// Set SITE_URL at build time when the website moves to its custom domain.
export const siteOrigin = new URL(
  process.env.SITE_URL || 'https://website.a-6fa.workers.dev',
).origin;

// Add completed, indexable pages here as they are published.
// /brand is intentionally excluded because its metadata specifies noindex.
export const sitemapPaths = pageIndex.map(page => page.path);
