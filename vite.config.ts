import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { BUSINESS_INFO } from './src/config/businessInfo';
import { LOCATIONS } from './src/data/locations';

/**
 * Emits robots.txt and sitemap.xml at build time from the same config the app
 * reads. Previously these were hand-maintained files that still pointed at the
 * template's original domain — generating them means the URL list can never
 * drift from the routes that actually exist.
 */
function seoFiles(): Plugin {
  const site = BUSINESS_INFO.contact.website.replace(/\/+$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/services', priority: '0.9', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.9', changefreq: 'monthly' },
    { loc: '/gallery', priority: '0.7', changefreq: 'monthly' },
    { loc: '/about', priority: '0.7', changefreq: 'monthly' },
    ...LOCATIONS.map((l) => ({
      loc: `/asphalt-paving/${l.slug}`,
      /* Grand Rapids is the primary target and carries the higher priority.
         This condition previously named 'coeur-dalene', a city in Idaho left
         over from the template's earlier client, so it matched nothing and
         the main city page was ranked no higher than the outlying ones. */
      priority: l.slug === 'grand-rapids' ? '0.9' : '0.8',
      changefreq: 'monthly',
    })),
    { loc: '/sitemap', priority: '0.3', changefreq: 'yearly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${site}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  const robots = `# robots.txt for ${BUSINESS_INFO.name}
User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

  return {
    name: 'psc-seo-files',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
    },
  };
}

/**
 * Per-route HTML, so a crawler's first fetch is not an empty shell.
 *
 * This is a client-rendered app: every URL used to return the identical
 * index.html with one generic title, no description and no canonical, because
 * SEOHead writes those tags after React mounts. Google will usually render the
 * JavaScript and get there eventually, but "eventually" is doing a lot of work
 * across eighteen near-identical city pages — that is exactly the situation
 * where pages get treated as duplicates or dropped. Other crawlers and every
 * link-preview scraper never run the JavaScript at all.
 *
 * So the build writes a real HTML file per route with that route's title,
 * description, canonical and Open Graph tags already in the markup. The app
 * still boots normally and SEOHead still runs; this only makes sure the first
 * response is already correct. Vercel checks the filesystem before applying
 * the SPA rewrite, so these files are served in preference to it.
 */
function prerenderRoutes(): Plugin {
  const site = BUSINESS_INFO.contact.website.replace(/\/+$/, '');
  const name = BUSINESS_INFO.name;
  const phone = BUSINESS_INFO.contact.phone;

  const routes: { path: string; title: string; description: string }[] = [
    {
      path: '/services',
      title: `Asphalt Paving Services & Process | Tar & Chip, Resurfacing | ${name}`,
      description:
        'Exactly how we build an asphalt surface, step by step: ground prep, stone base, hot mix. Plus tar and chip, resurfacing, milling and straight answers on cost, minimums and season.',
    },
    {
      path: '/gallery',
      title: `Gallery | Asphalt Paving, Tar & Chip and Resurfacing | ${name}`,
      description: `Driveways, private lanes and estate approaches across West Michigan, from base to finished surface. Recent work by ${name}.`,
    },
    {
      path: '/about',
      title: `About ${name} | Asphalt Contractor in Grand Rapids, MI`,
      description: `Who you are dealing with, how we price, and what we will and will not tell you about your surface. ${name}, Grand Rapids and West Michigan.`,
    },
    {
      path: '/contact',
      title: `Free Asphalt Paving Estimate | Call ${phone} | ${name}`,
      description: `Request a free written estimate for asphalt paving, resurfacing, tar and chip or sealcoating across Grand Rapids and West Michigan. Call or text ${phone}.`,
    },
    {
      path: '/sitemap',
      title: `Sitemap | ${name}`,
      description: `Every page on the ${name} site, including the West Michigan service-area pages.`,
    },
    ...LOCATIONS.map((l) => ({
      path: `/asphalt-paving/${l.slug}`,
      title: `Asphalt Paving in ${l.city}, ${l.state} | Driveways & Parking Lots | ${name}`,
      description: `Asphalt paving, tar and chip, resurfacing and sealcoating in ${l.city}, ${l.stateName}. Free written estimates on driveways and parking lots across ${l.county}. Call ${phone}.`,
    })),
  ];

  const esc = (v: string) =>
    v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  return {
    name: 'psc-prerender-routes',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const shell = bundle['index.html'];
      if (!shell || shell.type !== 'asset') return;
      const html = String(shell.source);

      for (const route of routes) {
        const canonical = `${site}${route.path}`;
        const head = [
          `<title>${esc(route.title)}</title>`,
          `<meta name="description" content="${esc(route.description)}" />`,
          `<link rel="canonical" href="${canonical}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:url" content="${canonical}" />`,
          `<meta property="og:title" content="${esc(route.title)}" />`,
          `<meta property="og:description" content="${esc(route.description)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
        ].join('\n    ');

        /* Strip the shell's own description BEFORE injecting, not after —
           doing it the other way round removed the description this block had
           just added, leaving every page with a canonical and no summary. */
        const page = html
          .replace(/<meta name="description"[^>]*>/g, '')
          .replace(/<title>[\s\S]*?<\/title>/, head);

        this.emitFile({
          type: 'asset',
          fileName: `${route.path.replace(/^\//, '')}/index.html`,
          source: page,
        });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles(), prerenderRoutes()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
  },
});
