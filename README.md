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

Not set up yet. Build with `SITE_URL` set to the real domain so canonical links, the sitemap and robots.txt point to it:

```sh
SITE_URL=https://example.com npm run build
```

Commits pushed by the workflow's `GITHUB_TOKEN` don't trigger other workflows, so a deploy step should run inside
`fetch-status.yml` after the fetch (build and publish on every run, so the "last checked" time stays fresh).
