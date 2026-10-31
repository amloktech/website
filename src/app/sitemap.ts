import type { MetadataRoute } from 'next';
import { siteOrigin, sitemapPaths } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths.map(path => ({
    url: new URL(path, siteOrigin).href,
  }));
}
