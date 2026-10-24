# Cappadocia Balloon Status

Answers "Are Cappadocia balloons flying today?" for visitors, in ten languages and in Türkiye time.

Live: <https://cakmakkk.github.io/cappadocia-balloons/>

The official flight flags (green, yellow, red per sector) are published by the Kapadokya Slot Service Center at
<https://shmkapadokya.kapadokya.edu.tr/en/>. A scheduled GitHub Action reads that page and a weather forecast,
records every change, and the Astro site turns the records into a live status page, a 7-day outlook, a day-by-day
history and short guides.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 22.23.4 or later) |
| `npm run fetch` | Check the official page and the forecast once, record any change |
| `npm test` | Parser, status, forecast and translation-completeness tests |
| `npm run check` | Type check, including every translation against `Messages` |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |
| `npm run check:dist` | Check canonical links, hreflang, internal links and titles in `dist/` |

## How it fits together

- `scripts/lib/parse-shm.mjs` parses the official page; `scripts/fetch-status.mjs` records state changes.
- `scripts/lib/forecast.mjs` rates each morning's weather from Open-Meteo; `scripts/fetch-forecast.mjs` saves it and
  keeps the outlook we gave the evening before each morning, so we can check our record.
- `src/lib/status.ts` decides what today looks like: the morning window is the one that opens within an hour of
  sunrise, and a morning "flew" if any sector was green during it.
- `src/data/sectors.ts` holds the official polygons of sectors A, B and C and the towns in them.
- Pages are thin routes in `src/pages/` (English at the root, other languages under `src/pages/[locale]/`) that render
  views from `src/views/`.

## Photos

Hero photos are from Wikimedia Commons under CC BY-SA licences, credited on the page (`src/data/photos.ts`):
Wolfgang Moroder (balloons flying), Bernard Gagnon (valley near Uçhisar) and MusikAnimal (sunrise, also used mirrored
in `public/og.png`). Wolfgang Moroder asks not to use his photo on social media, so it stays out of the share image.

## Data

- `data/history/YYYY-MM-DD.json`: every distinct state seen that day. Committed when something changes.
- `data/forecasts/YYYY-MM-DD.json`: the outlook we published the evening before that morning. Committed once a day.
- `data/latest.json`, `data/forecast.json`: the latest check and outlook. Not committed; rebuilt on every run.

Times on the official page are UTC. The parser keeps them as UTC ISO strings and the site shows Europe/Istanbul time.

## Languages

English (root), Turkish, Spanish, Italian, German, Portuguese (Brazil), Russian, Korean, Japanese and Simplified
Chinese.

- Interface text: `src/i18n/messages/<code>.ts`, each checked against `src/i18n/types.ts`.
- Guides and the about page: `src/content/docs/<code>/*.md`. Every language needs every file (tested).
- To add a language: add it to `src/i18n/locales.ts`, add a messages file and a docs folder.

| Language | Status |
| --- | --- |
| English | Source |
| Turkish | Waiting for a review by the owner |
| Spanish, Italian, German, Portuguese, Russian, Korean, Japanese, Chinese | Machine-assisted, waiting for a native review |

## Schedule

`.github/workflows/fetch-status.yml` runs every 10 minutes from 00:03 to 07:53 UTC (03:03–10:53 Türkiye time), when
the morning decisions are made, and hourly otherwise. GitHub may start scheduled runs a few minutes late.

## Deploying and SEO

The same workflow builds and deploys to GitHub Pages on every run and every push to `main`. `SITE_URL` and
`BASE_PATH` come from `actions/configure-pages`, so canonical links, hreflang links, the sitemap and robots.txt follow
the Pages URL and switch to a custom domain once one is set in the Pages settings. Use `href()` from
`src/lib/paths.ts` for every internal link.

Search engine verification tags are read from repository variables (Settings → Secrets and variables → Actions →
Variables): `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `NAVER_SITE_VERIFICATION`, `YANDEX_VERIFICATION`.
Set only the token (the `content` value of the meta tag).

On `*.github.io/<repo>/`, robots.txt isn't at the domain root, so search engines ignore it; submit
`sitemap.xml` through each search engine's console instead.

The free Open-Meteo API is for non-commercial use only. Switch to a paid plan or another source before adding ads or
affiliate links.

To reproduce the Pages build locally (in Git Bash, `MSYS_NO_PATHCONV=1` stops it rewriting the path):

```sh
MSYS_NO_PATHCONV=1 SITE_URL=https://cakmakkk.github.io BASE_PATH=/cappadocia-balloons npm run build
MSYS_NO_PATHCONV=1 SITE_URL=https://cakmakkk.github.io BASE_PATH=/cappadocia-balloons npm run check:dist
```
