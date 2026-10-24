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

- The look is a calm, professional status tool: Inter, neutral stone colours, one terracotta accent, real photos.
  No illustrations or cartoon styling.
- Colours are tokens on `:root` in `src/layouts/Base.astro`, redefined for dark mode. Use them, not raw colours.
- Hero photos come from Wikimedia Commons and are listed with their credits in `src/data/photos.ts`; every photo
  shown must carry its credit. Wolfgang Moroder's photo must not be used in the share image or on social media.
- Keep pages light: no client-side frameworks and no third-party scripts. Small inline scripts are fine.
- Nothing may move after load (CLS 0): don't insert content from scripts; floating UI like the language hint goes in
  a fixed position. The one exception is `src/scripts/live.ts`, which rewrites the status card, map and regions
  when the official page says something newer than the build.
- Anything the live update fills must be rendered at build time too, with the same texts (`describe()` and the
  messages files), so the page is complete without JavaScript.
