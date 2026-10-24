# Cappadocia Balloon Status

Answers "Are Cappadocia balloons flying today?" for visitors, in ten languages and in Türkiye time.

Live: <https://cakmakkk.github.io/cappadocia-balloons/>

The official flight flags (green, yellow, red per sector) are published by the Kapadokya Slot Service Center at
<https://shmkapadokya.kapadokya.edu.tr/en/>. A scheduled GitHub Action reads that page and a weather forecast,
records every change, and the Astro site turns the records into a status page, a 7-day outlook, a day-by-day
history and short guides. In the visitor's browser, the home page then reads the official page itself, so the answer
is current to the minute even when the last build is not.

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
- `src/lib/status-core.ts` decides what today looks like: the morning window is the one that opens within an hour of
  sunrise, and a morning "flew" if any sector was green during it. It has no file access, so the build
  (`src/lib/status.ts` adds the loaders) and the browser run the same rules.
- `src/scripts/live.ts` runs on the home page and the flags guide. The official page allows cross-origin requests, so
  the browser fetches it, parses it with `src/lib/parse-shm-dom.ts` (kept in step with the build parser by
  `parse-shm-dom.test.ts`) and updates the status card, timeline, hero photo, map and regions in place, every 5
  minutes while the tab is visible. Elements it fills carry `data-live` attributes. If the official page can't be
  read, it keeps the recorded flags and, after two hours, says they may be out of date.
- `src/data/sectors.ts` holds the official polygons of sectors A, B and C and the towns in them.
- Pages are thin routes in `src/pages/` (English at the root, other languages under `src/pages/[locale]/`) that render
  views from `src/views/`.

## Photos

Hero photos are from Wikimedia Commons under CC BY-SA licences, credited on the page (`src/data/photos.ts`):
Wolfgang Moroder (balloons flying), Bernard Gagnon (valley near Uçhisar) and MusikAnimal (sunrise, also used mirrored
in `public/og.jpg`). Wolfgang Moroder asks not to use his photo on social media, so it stays out of the share image.

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

`.github/workflows/fetch-status.yml` is scheduled every 10 minutes from 00:03 to 07:53 UTC (03:03–10:53 Türkiye
time), when the morning decisions are made, and hourly otherwise. In practice GitHub skips or delays many scheduled
runs, so the records and the search snippet can lag; the live read in the browser covers visitors. For a steady
rebuild, trigger the workflow from an external scheduler (for example cron-job.org calling the `workflow_dispatch`
API with a fine-grained token that has Actions: read and write on this repository).

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

What the pages do for search:

- Every page lists all ten language versions (hreflang plus x-default), in the page head and in `sitemap.xml`.
- The home page title carries today's date and its meta description today's answer, rebuilt on every run.
- JSON-LD: WebSite, WebPage, FAQPage (the visible questions on the home page), BreadcrumbList, Article for guides
  and Dataset for the history.
- Inter comes through Astro's Fonts API with a metric-matched fallback, CSS is inlined and only the subsets a
  language needs are preloaded, which keeps layout shift at 0. Lighthouse (mobile): 94–97 performance, 100 for
  accessibility, best practices and SEO.
- After each push, the `indexnow` job sends every sitemap URL to IndexNow (Bing, Yandex, Naver and others). The key
  is the 32-character `.txt` file in `public/`.

The free Open-Meteo API is for non-commercial use only. Switch to a paid plan or another source before adding ads or
affiliate links.

To reproduce the Pages build locally (in Git Bash, `MSYS_NO_PATHCONV=1` stops it rewriting the path):

```sh
MSYS_NO_PATHCONV=1 SITE_URL=https://cakmakkk.github.io BASE_PATH=/cappadocia-balloons npm run build
MSYS_NO_PATHCONV=1 SITE_URL=https://cakmakkk.github.io BASE_PATH=/cappadocia-balloons npm run check:dist
```
