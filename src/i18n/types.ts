import type { TownId } from '../data/sectors.ts';
import type { Rating } from '../lib/forecast.ts';
import type { DayOutcome, Flag, Scene } from '../lib/status-core.ts';

/**
 * Every piece of interface text. Each language file must provide all of it
 * (`satisfies Messages`), so a missing translation fails the type check.
 *
 * Arguments are already formatted for the language: times like "06:25–10:30",
 * lists like "A and B", dates like "Friday 23 October".
 */
export interface Messages {
  siteName: string;
  /** The region's name in this language, e.g. "Kapadokya". */
  cappadocia: string;
  towns: Record<TownId, string>;

  nav: {
    today: string;
    tomorrow: string;
    history: string;
    guides: string;
    about: string;
    language: string;
  };

  flag: Record<Flag, string>;
  outcome: Record<DayOutcome, string>;
  sector: (id: string) => string;
  /** "all three areas" or "sectors A and B". */
  areas: { all: string; some: (list: string, count: number) => string };
  turkeyTime: string;
  photoCredit: (author: string, license: string) => string;
  /** Alt text for the hero photo shown in each scene. */
  photoAlt: Record<Scene, string>;

  home: {
    /** The page title with today's date, e.g. "… · Saturday 24 October". */
    titleDated: (date: string) => string;
    description: string;
    h1: string;
    status: {
      flyingNow: { headline: string; detail: (areas: string, window: string) => string };
      groundedNow: { headline: string; detail: (window: string) => string };
      flewThisMorning: { headline: string; detail: (areas: string, window: string) => string };
      groundedThisMorning: { headline: string; detail: (window: string) => string };
      morningNotRecorded: { headline: string; detail: string };
      waiting: { headline: string; detail: (sunrise: string) => string };
      noData: { headline: string; detail: string };
    };
    laterWindow: (window: string, cleared: boolean) => string;
    quickAnswer: string;
    timelineTitle: string;
    /** Link text to the official page. */
    source: string;
    sunrise: (time: string) => string;
    checkedAt: (time: string) => string;
    /** Shown after the browser has read the official page itself. */
    liveAt: (time: string) => string;
    stale: string;
    mapTitle: string;
    mapIntro: (window: string) => string;
    /** When today's flags aren't out yet and the map shows an earlier day's. */
    mapIntroEarlier: (date: string, window: string) => string;
    secondaryTitle: string;
    secondaryIntro: string;
    region: (id: string) => string;
    /** All secondary regions at once, e.g. "Regions 2–5". */
    regions: (range: string) => string;
    tomorrowTitle: string;
    /** Same card, between midnight and the morning window. */
    thisMorningTitle: string;
    tomorrowLink: string;
    recentTitle: string;
    allHistory: string;
    sourceNote: string;
    guidesTitle: string;
    faqTitle: string;
    /** Shown on the page and as FAQPage structured data. Plain text only. */
    faq: { q: string; a: string }[];
  };

  tomorrow: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    rating: Record<Rating, { label: string; text: string }>;
    notOfficial: string;
    unavailable: string;
    window: (window: string) => string;
    wind: (kmh: string) => string;
    gusts: (kmh: string) => string;
    visibility: (km: string) => string;
    rain: (mm: string) => string;
    updated: (time: string) => string;
    howTitle: string;
    howText: string;
    track: (flew: string, total: string) => string;
    trackPending: (since: string) => string;
    attribution: string;
  };

  history: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    startNote: (date: string) => string;
    empty: string;
    morning: string;
    laterWindows: string;
    window: string;
    rawData: string;
  };

  guides: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    updated: (date: string) => string;
    mapCaption: string;
    sunriseCaption: string;
    monthColumn: string;
    sunriseColumn: string;
  };

  footer: {
    independent: string;
    source: string;
    data: string;
    languages: string;
  };

  /** Shown to visitors whose browser prefers this language, written in it. */
  langHint: string;
  dismiss: string;

  notFound: {
    title: string;
    text: string;
    back: string;
  };
}
