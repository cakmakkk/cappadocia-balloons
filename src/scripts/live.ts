// Reads the official flag page from the visitor's browser (it allows
// cross-origin requests) and brings the status card, hero photo, map and
// regions up to the minute, using the same rules and texts as the build.
// If the official page can't be read, the recorded status stays as it is.

import { longDate, time, timeRange } from '../i18n/format.ts';
import type { Locale } from '../i18n/locales.ts';
import type { Messages } from '../i18n/types.ts';
import { describe } from '../lib/describe.ts';
import { parseShmDocument } from '../lib/parse-shm-dom.ts';
import { stateSignature } from '../lib/shm-format.ts';
import {
  homeState,
  localDate,
  officialUpdates,
  sceneOf,
  SOURCE_URL,
  type DayHistory,
  type Flag,
  type OfficialUpdate,
  type Snapshot,
} from '../lib/status-core.ts';
import { sunriseOn } from '../lib/sun.ts';

interface LiveData {
  locale: Locale;
  latest: Snapshot | null;
  days: DayHistory[];
}

const REFRESH_EVERY = 5 * 60_000;
// The official page often takes several seconds to answer.
const TIMEOUT = 15_000;
const RETRY_AFTER = 30_000;
const STALE_AFTER = 120 * 60_000;
const FLAGS: Flag[] = ['green', 'yellow', 'red', 'unknown'];
// One small chunk per language, loaded only for the page's own language.
const messageFiles = import.meta.glob<{ default: Messages }>('../i18n/messages/*.ts');

const live = (name: string) => document.querySelector<HTMLElement>(`[data-live="${name}"]`);

async function readOfficialPage() {
  const response = await fetch(SOURCE_URL, { cache: 'no-store', signal: AbortSignal.timeout(TIMEOUT) });
  if (!response.ok) throw new Error(`Official page returned HTTP ${response.status}`);
  const html = await response.text();
  return parseShmDocument(new DOMParser().parseFromString(html, 'text/html'), html);
}

/** Adds a reading to the days, filed under its window's date as the recorder does. */
function withReading(days: DayHistory[], snapshot: Snapshot, today: string): DayHistory[] {
  const date = snapshot.sectors[0].window?.date ?? today;
  let day = days.find((d) => d.date === date);
  if (!day) {
    day = { date, states: [] };
    days.push(day);
  }
  const last = day.states.at(-1);
  if (!last || stateSignature(last) !== stateSignature(snapshot)) {
    day.states.push({ firstSeenAt: snapshot.checkedAt, sectors: snapshot.sectors, secondary: snapshot.secondary });
  }
  return days;
}

function setFlag(badge: Element, flag: Flag, t: Messages) {
  badge.classList.remove(...FLAGS.map((f) => `flag-${f}`));
  badge.classList.add(`flag-${flag}`);
  badge.textContent = t.flag[flag];
}

function span(className: string, text: string) {
  const el = document.createElement('span');
  el.className = className;
  el.textContent = text;
  return el;
}

/** Same markup as the timeline rows in StatusCard.astro. */
function timelineRow(t: Messages, locale: Locale, update: OfficialUpdate) {
  const row = document.createElement('li');
  const flags = span('flags', '');
  for (const { id, flag } of update.flags) {
    const chip = span(`chip chip-${flag}`, id);
    chip.title = `${t.sector(id)}: ${t.flag[flag]}`;
    chip.append(span('visually-hidden', ` ${t.flag[flag]}`));
    flags.append(chip);
  }
  row.append(span('when', time(locale, update.at)), flags);
  if (update.window) row.append(span('window', timeRange(locale, update.window.start, update.window.end)));
  return row;
}

function render(t: Messages, locale: Locale, snapshot: Snapshot, history: DayHistory[], now: Date) {
  const today = localDate(now);
  const sunrise = sunriseOn(today);
  const state = homeState(snapshot, history, now);
  const text = describe(t, locale, state, sunrise);

  // The home page title and hero carry today's date.
  const heroDate = live('date');
  if (heroDate) {
    heroDate.textContent = longDate(locale, today);
    document.title = t.home.titleDated(longDate(locale, today));
  }

  const card = live('status');
  if (card) {
    card.classList.remove('status-go', 'status-stop', 'status-wait');
    card.classList.add(`status-${text.tone}`);
    live('headline')!.textContent = text.headline;
    live('detail')!.textContent = text.detail;
    const later = live('later')!;
    later.textContent = text.later ?? '';
    later.hidden = !text.later;
    const updates = officialUpdates(history.find((day) => day.date === today) ?? { date: today, states: [] });
    const timeline = live('timeline')!;
    timeline.hidden = updates.length === 0;
    timeline.querySelector('ol')!.replaceChildren(...updates.map((update) => timelineRow(t, locale, update)));
    live('sunrise')!.textContent = t.home.sunrise(time(locale, sunrise));
  }

  const scene = sceneOf(state);
  document.querySelectorAll<HTMLElement>('[data-live-scene]').forEach((el) => {
    el.hidden = el.dataset.liveScene !== scene;
  });

  for (const { id, flag } of snapshot.sectors) {
    document.querySelectorAll(`[data-live-area="${id}"]`).forEach((el) => {
      el.classList.remove(...FLAGS.map((f) => `area-${f}`));
      el.classList.add(`area-${flag}`);
    });
    document.querySelectorAll(`[data-live-flag="${id}"] .flag`).forEach((el) => setFlag(el, flag, t));
  }
  const mapTitle = live('map-title');
  if (mapTitle) mapTitle.textContent = snapshot.sectors.map((s) => `${t.sector(s.id)}: ${t.flag[s.flag]}`).join(', ');
  const window = snapshot.sectors[0].window;
  const intro = live('map-intro');
  if (intro && window) {
    const range = timeRange(locale, window.start, window.end);
    intro.textContent =
      window.date === today ? t.home.mapIntro(range) : t.home.mapIntroEarlier(longDate(locale, window.date), range);
  }

  // Secondary regions read as one line when they share a flag, as a list otherwise.
  const allRegions = live('regions-all');
  const regionList = live('regions-list');
  if (allRegions && regionList && snapshot.secondary.length > 0) {
    const shared = new Set(snapshot.secondary.map((area) => area.flag)).size === 1;
    allRegions.hidden = !shared;
    regionList.hidden = shared;
    allRegions.querySelectorAll('.flag').forEach((el) => setFlag(el, snapshot.secondary[0].flag, t));
    for (const area of snapshot.secondary) {
      document.querySelectorAll(`[data-live-region="${area.id}"] .flag`).forEach((el) => setFlag(el, area.flag, t));
    }
  }
}

function start(data: LiveData) {
  const checked = live('checked');
  // The last status we know of: what the build recorded, then each live reading.
  let known = data.latest;
  let checkedText = checked?.textContent ?? '';
  let lastTry = 0;
  let failures = 0;

  async function update() {
    lastTry = Date.now();
    const t = (await messageFiles[`../i18n/messages/${data.locale}.ts`]()).default;
    try {
      const { sectors, secondary } = await readOfficialPage();
      if (sectors.length === 0) throw new Error('No sectors found on the official page');
      const now = new Date();
      known = { checkedAt: now.toISOString(), source: SOURCE_URL, sectors, secondary };
      render(t, data.locale, known, withReading(data.days, known, localDate(now)), now);
      failures = 0;
      checkedText = t.home.liveAt(time(data.locale, known.checkedAt));
      if (checked) {
        checked.textContent = checkedText;
        checked.classList.remove('is-stale');
      }
    } catch {
      // A slow moment on the official side is common: try once more soon.
      if (++failures === 1) setTimeout(update, RETRY_AFTER);
      // Meanwhile give the answer the last known flags give at this moment, and say so once they are old.
      if (!known) return;
      const now = new Date();
      render(t, data.locale, known, data.days, now);
      if (checked && now.getTime() - Date.parse(known.checkedAt) > STALE_AFTER) {
        checked.textContent = `${checkedText} · ${t.home.stale}`;
        checked.classList.add('is-stale');
      }
    }
  }

  // Read again every few minutes, but only while someone is looking.
  update();
  setInterval(() => document.visibilityState === 'visible' && update(), REFRESH_EVERY);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && Date.now() - lastTry > REFRESH_EVERY) update();
  });
}

const dataEl = document.getElementById('live-data');
if (dataEl) start(JSON.parse(dataEl.textContent!) as LiveData);
