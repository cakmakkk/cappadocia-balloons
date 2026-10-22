// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// SITE_URL sets canonical links, the sitemap and robots.txt. Set it to the
// real domain in the deploy workflow; the fallback is only for local builds.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
