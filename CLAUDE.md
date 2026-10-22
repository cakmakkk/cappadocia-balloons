@AGENTS.md

## This project

Cappadocia Balloon Status: an SEO-first static site (Astro) in ten languages that shows whether hot air balloons may
fly in Cappadocia today, based on the official flags at https://shmkapadokya.kapadokya.edu.tr/en/, plus a weather
outlook for the coming mornings. See README.md for how the pieces fit together.

- Official times are UTC; always show Türkiye time (Europe/Istanbul) to visitors.
- Run `npm test` and `npm run check` after code changes, and build plus `npm run check:dist` before pushing pages.

## Languages

- Every piece of interface text lives in `src/i18n/messages/<code>.ts`. Add new keys to `src/i18n/types.ts` first,
  then to all ten languages; never hard-code visible text in components or views.
- Guides live in `src/content/docs/<code>/`. A new guide needs all ten translations in the same change.
- Translate for meaning, in natural everyday language, not word for word. Keep place names as in the `towns` map.
- In Turkish, avoid putting suffixes on times or numbers (write "Son kontrol: 06:57", not "06:57'de").

## Content rules

- Only state facts the official page or a cited source supports. No filler text; every page must give real value.
- Never imply the site is official or affiliated with SHGM, Kapadokya University or any operator.
- The forecast is ours, not an official decision; always say so where it appears.

## Design

- Colours are tokens on `:root` in `src/layouts/Base.astro`, redefined for dark mode. Use them, not raw colours.
- Keep pages light: no client-side frameworks and no third-party scripts. Small inline scripts are fine.
