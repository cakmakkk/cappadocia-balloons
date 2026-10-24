// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// SITE_URL and BASE_PATH set canonical links, hreflang links, the sitemap and
// robots.txt. The deploy workflow sets them for GitHub Pages; the fallbacks
// are for local builds.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  // The CSS is small; inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'cyrillic'],
      // A metric-matched system-ui fallback, so text doesn't reflow when Inter arrives.
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
