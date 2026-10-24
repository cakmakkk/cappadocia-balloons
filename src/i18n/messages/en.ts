import type { Messages } from '../types.ts';

export default {
  siteName: 'Cappadocia Balloon Status',
  cappadocia: 'Cappadocia',
  towns: {
    avanos: 'Avanos',
    cavusin: 'Çavuşin',
    goreme: 'Göreme',
    uchisar: 'Uçhisar',
    ortahisar: 'Ortahisar',
    urgup: 'Ürgüp',
    mustafapasa: 'Mustafapaşa',
  },

  nav: {
    today: 'Today',
    tomorrow: 'Tomorrow',
    history: 'History',
    guides: 'Guides',
    about: 'About',
    language: 'Language',
  },

  flag: { green: 'Green flag', yellow: 'Yellow flag', red: 'Red flag', unknown: 'No data' },
  outcome: { flew: 'Flew', grounded: 'Grounded', 'not-recorded': 'No record' },
  sector: (id) => `Sector ${id}`,
  areas: {
    all: 'all three flight areas',
    some: (list, count) => (count === 1 ? `sector ${list}` : `sectors ${list}`),
  },
  turkeyTime: 'Türkiye time',
  photoCredit: (author, license) => `Photo: ${author}, ${license}`,

  home: {
    title: 'Are Cappadocia balloons flying today? Live balloon status',
    description:
      'Live hot air balloon status for Cappadocia, straight from the official flag page: which areas can fly this morning, the outlook for tomorrow and every past day.',
    h1: 'Are Cappadocia balloons flying today?',
    status: {
      flyingNow: {
        headline: 'Yes, the balloons are cleared to fly',
        detail: (areas, window) =>
          `Green flag over ${areas} for ${window}. Your pilot and balloon company still make the final call.`,
      },
      groundedNow: {
        headline: 'No, the balloons are grounded',
        detail: (window) => `No area has a green flag for ${window}, so no balloon can take off.`,
      },
      flewThisMorning: {
        headline: 'The balloons flew this morning',
        detail: (areas, window) => `There was a green flag over ${areas} between ${window}.`,
      },
      groundedThisMorning: {
        headline: 'No balloons this morning',
        detail: (window) => `Every area stayed closed during the morning window (${window}).`,
      },
      morningNotRecorded: {
        headline: "We missed this morning's decision",
        detail: 'Our records for today start after the morning window. Tomorrow morning is checked as usual.',
      },
      waiting: {
        headline: "Today's decision isn't out yet",
        detail: (sunrise) =>
          `It's still early in Göreme. The flags for the morning usually appear around sunrise (${sunrise}), and this page checks every 10 minutes.`,
      },
      noData: {
        headline: 'No status yet',
        detail: "The first check hasn't run yet.",
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `Later today (${window}): take-off allowed again.` : `Rest of the day (${window}): no take-off.`,
    quickAnswer: 'Quick answer',
    timelineTitle: "Today's official updates",
    source: 'Source: Slot Service Center (official)',
    sunrise: (time) => `Sunrise ${time}`,
    checkedAt: (time) => `Checked at ${time}`,
    stale: 'This may be out of date. Refresh the page.',
    mapTitle: 'The three flight areas',
    mapIntro: (window) => `Flags for ${window}, Türkiye time.`,
    mapIntroEarlier: (date, window) =>
      `The last flags published, for ${date}, ${window}. Today's will show here as soon as they're out.`,
    officialUpdate: (time) => `Set by the Slot Service Center at ${time}`,
    secondaryTitle: 'Secondary regions',
    secondaryIntro: 'Smaller areas around the main valleys, which need their own take-off approval.',
    region: (id) => `Region ${id}`,
    regions: (range) => `Regions ${range}`,
    tomorrowTitle: 'Tomorrow morning',
    thisMorningTitle: "This morning's weather",
    tomorrowLink: 'See the next 7 mornings',
    recentTitle: 'The last two weeks',
    allHistory: 'Every recorded day',
    sourceNote:
      'Straight from the official flag page of the Kapadokya Slot Service Center, checked every 10 minutes through the morning.',
    guidesTitle: 'Good to know',
  },

  tomorrow: {
    title: 'Will Cappadocia balloons fly tomorrow? 7-day outlook',
    description:
      'Weather outlook for the next mornings in Cappadocia: wind, gusts, fog and rain during the balloon window around sunrise, with a simple rating for each day.',
    h1: 'Will the balloons fly tomorrow?',
    intro:
      'The official decision only comes out on the morning itself. Until then the weather is the best guide, so here is what the forecast says for the hours around sunrise in Göreme.',
    rating: {
      good: { label: 'Looks good', text: 'Light wind and clear air during the flight window.' },
      borderline: { label: 'Borderline', text: 'Some wind, gusts or haze. It could go either way.' },
      poor: { label: 'Unlikely', text: 'Wind, rain or poor visibility. Flights are often called off in weather like this.' },
    },
    notOfficial: 'A weather forecast, not an official decision.',
    unavailable: "The weather forecast isn't available right now. Check back in a little while.",
    window: (window) => `Flight window ${window}`,
    wind: (kmh) => `Wind ${kmh} km/h`,
    gusts: (kmh) => `gusts ${kmh} km/h`,
    visibility: (km) => `visibility ${km} km`,
    rain: (mm) => `rain ${mm} mm`,
    updated: (time) => `Forecast updated at ${time}`,
    howTitle: 'How we rate a morning',
    howText:
      'We look at the hours from 30 minutes before sunrise to two hours after. Calm air (wind up to about 12 km/h, gusts up to 20 km/h), good visibility and no rain looks good. Strong wind or gusts, fog, rain or storms make a flight unlikely. These limits are our own, not official rules, and we check them against the real decisions every day.',
    track: (flew, total) => `When we said “looks good”, the balloons flew on ${flew} of ${total} mornings.`,
    trackPending: (since) =>
      `We have been keeping score since ${since} and will show our track record once enough mornings have passed.`,
    attribution: 'Weather data by Open-Meteo.com',
  },

  history: {
    title: 'Cappadocia balloon flight history: which mornings the balloons flew',
    description:
      'Day-by-day record of the official balloon flags over Cappadocia, sector by sector, taken from the Slot Service Center page.',
    h1: 'Flight history',
    intro:
      'Every flag we have recorded from the official page, newest first. The morning window is the one that matters for sunrise flights.',
    startNote: (date) => `Records start on ${date}.`,
    empty: 'Nothing recorded yet.',
    morning: 'Morning flights',
    laterWindows: 'Later in the day',
    window: 'Window',
    rawData: 'The raw data is public on GitHub.',
  },

  guides: {
    title: 'Cappadocia balloon guides',
    description: 'Short, practical guides to how balloon flights in Cappadocia are decided and what to do when one is cancelled.',
    h1: 'Guides',
    intro: 'The things worth knowing before an early alarm in Cappadocia.',
    updated: (date) => `Updated ${date}`,
    mapCaption: 'The three flight areas, drawn from the official map, with right now’s flags.',
  },

  footer: {
    independent: 'An independent page. Not run by the civil aviation authority, Kapadokya University or any balloon company.',
    source: 'Official flag page',
    data: 'Data on GitHub',
  },

  langHint: 'Read this page in English',
  dismiss: 'Close',

  notFound: {
    title: 'Page not found',
    text: "There's nothing here, but today's balloon status is one click away.",
    back: "See today's status",
  },
} satisfies Messages;
