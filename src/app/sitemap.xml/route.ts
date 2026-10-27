import { cheatsheets } from '@/data/cheatsheets';
import { learningPaths } from '@/data/learning-paths';
import { getConfiguredSiteUrl } from '@/lib/site-url';

const publicPaths = [
  '/',
  '/learning-paths',
  '/tools',
  '/tools/json-formatter',
  '/tools/url-encoder',
  '/tools/base64',
  '/tools/regex-tester',
  ...learningPaths.map((path) => `/learning-paths/${path.slug}`),
  ...cheatsheets.map((sheet) => `/cheatsheets/${sheet.slug}`),
];

function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export function GET(request: Request) {
  const siteUrl = getConfiguredSiteUrl() ?? new URL(request.url);
  const urls = publicPaths.map((path) => `<url><loc>${escapeXml(new URL(path, siteUrl).toString())}</loc></url>`).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
