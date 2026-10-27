import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin = process.env.SITE_URL || 'https://home-facility-services.cosmicdrake16.chatgpt.site';
const publicBuild = process.env.SITE_INDEXABLE === 'true';
const routes = ['/', '/about/', '/services/', '/clients/', '/contact/', '/privacy/', '/facility-planning/', ...['housekeeping','security','water-wash','plumbing','electrical-maintenance','staffing'].map(s => `/services/${s}/`)];
const titles = new Set(); const descriptions = new Set();
for (const route of routes) {
  const html = fs.readFileSync(`out${route}index.html`, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  assert(title && description, `Metadata missing: ${route}`);
  assert(!titles.has(title), `Duplicate title: ${route}`); titles.add(title);
  assert(!descriptions.has(description), `Duplicate description: ${route}`); descriptions.add(description);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `H1: ${route}`);
  assert(html.includes(`rel="canonical" href="${origin}${route}"`), `Canonical: ${route}`);
  assert(html.includes(`property="og:url" content="${origin}${route}"`), `Open Graph: ${route}`);
  assert(html.includes(`name="robots" content="${publicBuild ? 'index, follow' : 'noindex, nofollow'}"`), `Robots: ${route}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  assert(schemas.some(s => s['@type'] === 'LocalBusiness'), `Business schema: ${route}`);
  if (route !== '/') assert(schemas.some(s => s['@type'] === 'BreadcrumbList'), `Breadcrumb schema: ${route}`);
  if (/^\/services\/.+/.test(route)) {
    assert(schemas.some(s => s['@type'] === 'Service' && s.url === origin + route), `Service schema: ${route}`);
    assert.equal((html.match(/<details>/g) || []).length, 3, `Service FAQ count: ${route}`);
  }
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)[^" ]*"/g)) {
    const path = decodeURIComponent(match[1]);
    assert(fs.existsSync(`out${path}`) || fs.existsSync(`out${path}/index.html`), `Missing local target ${path} on ${route}`);
  }
}
const robots = fs.readFileSync('out/robots.txt', 'utf8');
const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, publicBuild ? routes.length : 0);
if (publicBuild) {
  assert(robots.includes('Allow: /') && robots.includes(`${origin}/sitemap.xml`));
  for (const route of routes) assert(sitemap.includes(`<loc>${origin}${route}</loc>`));
} else assert(robots.includes('Disallow: /'));
console.log(`PASS: ${routes.length} pages; unique metadata, canonicals, social tags, headings, JSON-LD, FAQs, internal links and ${publicBuild ? 'public' : 'private'} indexing configuration.`);
