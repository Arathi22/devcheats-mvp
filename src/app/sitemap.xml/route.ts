import { cheatsheets } from '@/data/cheatsheets';
import { learningPaths } from '@/data/learning-paths';

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const urls = [origin, `${origin}/learning-paths`, `${origin}/progress`, ...learningPaths.map((path) => `${origin}/learning-paths/${path.slug}`), ...cheatsheets.map((sheet) => `${origin}/cheatsheets/${sheet.slug}`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
