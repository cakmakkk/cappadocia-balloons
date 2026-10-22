@AGENTS.md

## This project

Cappadocia Balloon Status: an English, SEO-first static site (Astro) that shows whether hot air balloons may fly in
Cappadocia today, based on the official flags published at https://shmkapadokya.kapadokya.edu.tr/en/.

- `scripts/lib/parse-shm.mjs` parses the official page; `scripts/fetch-status.mjs` records changes into `data/`.
- `src/lib/status.ts` loads the data at build time; pages live in `src/pages/`.
- Official times are UTC; always show Türkiye time (Europe/Istanbul) to visitors.
- Run `npm test` after touching the parser, and `npm run build` before committing page changes.

## Content rules

- Only state facts the official page or a cited source supports. No filler text; every page must give real value.
- Never imply the site is official or affiliated with SHGM, Kapadokya University or any operator.
- Keep pages light: no client-side frameworks, no third-party scripts.
