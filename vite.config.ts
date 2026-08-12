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
      loc: `/seal-coating/${l.slug}`,
      priority: l.slug === 'coeur-dalene' ? '0.9' : '0.8',
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
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
