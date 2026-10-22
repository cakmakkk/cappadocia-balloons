// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH set canonical links, the sitemap and robots.txt.
// The deploy workflow sets them for GitHub Pages; the fallbacks are for local builds.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
