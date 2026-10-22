# Cappadocia Balloon Status

Answers "Are Cappadocia balloons flying today?" for visitors, in plain language and Türkiye time.

The official flight flags (green, yellow, red per sector) are published by the Kapadokya Slot Service Center at
<https://shmkapadokya.kapadokya.edu.tr/en/>. A scheduled GitHub Action reads that page, records every change, and the
Astro site turns the records into a live status page and a day-by-day history.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 22.23.4 or later) |
| `npm run fetch` | Check the official page once and record any change |
| `npm test` | Run the parser tests |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |

## Data

- `data/history/YYYY-MM-DD.json`: every distinct state seen for that day. Committed by the workflow only when something
  changes.
- `data/latest.json`: the most recent check, including its time. Not committed; the build falls back to the newest
  history entry when it's missing.

Times on the official page are UTC. The parser keeps them as UTC ISO strings and the site converts them to
Europe/Istanbul.

## Schedule

`.github/workflows/fetch-status.yml` runs every 15 minutes from 01:00 to 08:45 UTC (04:00–11:45 Türkiye time), when the
morning decisions are made, and hourly otherwise. GitHub may start scheduled runs a few minutes late.

## Deploying

The same workflow builds and deploys to GitHub Pages on every run, and on every push to `main`, so the "last checked"
time on the site stays fresh. Commits pushed with the workflow's `GITHUB_TOKEN` don't trigger new runs.

`SITE_URL` and `BASE_PATH` come from `actions/configure-pages`, so canonical links, the sitemap and robots.txt follow
the Pages URL (`https://cakmakkk.github.io/cappadocia-balloons/`) and switch automatically to a custom domain once one
is set in the repository's Pages settings. Use `href()` from `src/lib/paths.ts` for every internal link.

To reproduce the Pages build locally (in Git Bash, `MSYS_NO_PATHCONV=1` stops it rewriting the path):

```sh
MSYS_NO_PATHCONV=1 SITE_URL=https://cakmakkk.github.io BASE_PATH=/cappadocia-balloons npm run build
```
