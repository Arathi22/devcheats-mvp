import type { MetadataRoute } from 'next';
import { getConfiguredSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getConfiguredSiteUrl();
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/favorites', '/saved-snippets', '/progress', '/playground'] },
    ...(siteUrl ? { sitemap: new URL('/sitemap.xml', siteUrl).toString() } : {}),
  };
}
