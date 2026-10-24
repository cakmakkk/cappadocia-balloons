import type { Messages } from '../types.ts';

export default {
  siteName: 'Ballonstatus Kappadokien',
  cappadocia: 'Kappadokien',
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
    today: 'Heute',
    tomorrow: 'Morgen',
    history: 'Verlauf',
    guides: 'Ratgeber',
    about: 'Über uns',
    language: 'Sprache',
  },

  flag: { green: 'Grüne Flagge', yellow: 'Gelbe Flagge', red: 'Rote Flagge', unknown: 'Keine Daten' },
  outcome: { flew: 'Geflogen', grounded: 'Am Boden', 'not-recorded': 'Keine Daten' },
  sector: (id) => `Sektor ${id}`,
  areas: {
    all: 'allen drei Fluggebieten',
    some: (list, count) => (count === 1 ? `Sektor ${list}` : `den Sektoren ${list}`),
  },
  turkeyTime: 'türkische Zeit',
  photoCredit: (author, license) => `Foto: ${author}, ${license}`,
  photoAlt: {
    flying: 'Heißluftballons steigen bei Sonnenaufgang über den Felsformationen Kappadokiens auf',
    grounded: 'Täler und Feenkamine bei Uçhisar unter klarem Himmel',
    night: 'Ein einzelner Heißluftballon als Silhouette vor dem Sonnenaufgang über Kappadokien',
  },

  home: {
    titleDated: (date) => `Fliegen heute die Ballons in Kappadokien? Live-Status · ${date}`,
    description:
      'Live-Status der Heißluftballons in Kappadokien, direkt von der offiziellen Flaggenseite: welche Gebiete heute Morgen fliegen dürfen, die Aussichten für morgen und alle vergangenen Tage.',
    h1: 'Fliegen heute die Ballons in Kappadokien?',
    status: {
      flyingNow: {
        headline: 'Ja, die Ballons dürfen fliegen',
        detail: (areas, window) =>
          `Grüne Flagge über ${areas} (${window}). Die letzte Entscheidung treffen trotzdem Pilot und Ballonfirma.`,
      },
      groundedNow: {
        headline: 'Nein, die Ballons bleiben am Boden',
        detail: (window) => `Kein Gebiet hat eine grüne Flagge (${window}), also darf kein Ballon starten.`,
      },
      flewThisMorning: {
        headline: 'Heute Morgen sind die Ballons geflogen',
        detail: (areas, window) => `Es gab eine grüne Flagge über ${areas} (${window}).`,
      },
      groundedThisMorning: {
        headline: 'Heute Morgen keine Ballons',
        detail: (window) => `Alle Gebiete blieben im Morgenfenster geschlossen (${window}).`,
      },
      morningNotRecorded: {
        headline: 'Die Entscheidung von heute Morgen haben wir verpasst',
        detail: 'Unsere Aufzeichnungen für heute beginnen nach dem Morgenfenster. Morgen früh wird wie gewohnt geprüft.',
      },
      waiting: {
        headline: 'Die heutige Entscheidung ist noch nicht da',
        detail: (sunrise) =>
          `In Göreme ist es noch früh. Die Flaggen für den Morgen erscheinen meist gegen Sonnenaufgang (${sunrise}). Lass diese Seite offen: Sie prüft die offizielle Seite alle 5 Minuten.`,
      },
      noData: {
        headline: 'Noch kein Status',
        detail: 'Die erste Prüfung ist noch nicht gelaufen.',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `Später am Tag (${window}): Starts wieder erlaubt.` : `Rest des Tages (${window}): keine Starts.`,
    quickAnswer: 'Kurz gesagt',
    timelineTitle: 'Heutige offizielle Updates',
    source: 'Quelle: Slot Service Center (offiziell)',
    sunrise: (time) => `Sonnenaufgang ${time}`,
    checkedAt: (time) => `Geprüft um ${time}`,
    liveAt: (time) => `Live von der offiziellen Seite: ${time}`,
    stale: 'Die offizielle Seite war nicht erreichbar, daher ist das möglicherweise veraltet.',
    mapTitle: 'Fluggebiete: Sektoren A, B und C',
    mapIntro: (window) => `Flaggen für ${window}, türkische Zeit.`,
    mapIntroEarlier: (date, window) =>
      `Zuletzt veröffentlichte Flaggen: ${date}, ${window}. Die von heute erscheinen hier, sobald sie da sind.`,
    secondaryTitle: 'Nebengebiete',
    secondaryIntro: 'Kleinere Gebiete rund um die Haupttäler, die eine eigene Startfreigabe brauchen.',
    region: (id) => `Gebiet ${id}`,
    regions: (range) => `Gebiete ${range}`,
    tomorrowTitle: 'Ballon-Aussichten für morgen früh',
    thisMorningTitle: 'Das Wetter heute Morgen',
    tomorrowLink: 'Die nächsten 7 Morgen ansehen',
    recentTitle: 'Ballonflüge der letzten zwei Wochen',
    allHistory: 'Alle erfassten Tage',
    sourceNote:
      'Direkt von der offiziellen Flaggenseite des Kapadokya Slot Service Center: Diese Seite liest sie live, wenn du sie öffnest, und alle 5 Minuten, solange sie offen bleibt.',
    guidesTitle: 'Gut zu wissen',
    faqTitle: 'Häufige Fragen',
    faq: [
      {
        q: 'Wer entscheidet, ob die Ballons fliegen?',
        a: 'Das Büro der türkischen Zivilluftfahrtbehörde (SHGM) in Nevşehir prüft jeden Morgen das Wetter und veröffentlicht auf der Seite des Slot Service Center eine Flagge für jedes Fluggebiet. Diese Seite liest sie aus.',
      },
      {
        q: 'Um wie viel Uhr kommt die Entscheidung?',
        a: 'Kurz vor Sonnenaufgang. In unseren ersten Aufzeichnungen erschienen die Morgenflaggen 35 bis 40 Minuten vor Sonnenaufgang, das Flugfenster öffnete etwa eine halbe Stunde davor.',
      },
      {
        q: 'Was bedeutet eine gelbe Flagge?',
        a: 'Kein Start, genau wie bei Rot. Nur eine grüne Flagge erlaubt den Start.',
      },
      {
        q: 'Kann mein Flug an einem grünen Morgen trotzdem ausfallen?',
        a: 'Ja. Eine grüne Flagge erlaubt den Start, aber die letzte Entscheidung treffen Pilot und Ballonfirma.',
      },
      {
        q: 'Fliegen die Ballons morgen?',
        a: 'Die offizielle Entscheidung kommt erst morgen früh. Bis dahin bewertet unsere 7-Tage-Aussicht das Wetter für jeden Morgen.',
      },
      {
        q: 'Ist das eine offizielle Seite?',
        a: 'Nein. Es ist eine unabhängige Seite, die die offiziellen Flaggen ausliest und speichert. Sie verkauft keine Ballonfahrten.',
      },
    ],
  },

  tomorrow: {
    title: 'Fliegen morgen die Ballons in Kappadokien? 7-Tage-Aussicht',
    description:
      'Wetteraussichten für die nächsten Morgen in Kappadokien: Wind, Böen, Nebel und Regen im Ballonfenster um Sonnenaufgang, mit einer einfachen Einschätzung für jeden Tag.',
    h1: 'Fliegen die Ballons morgen?',
    intro:
      'Die offizielle Entscheidung kommt erst am Morgen selbst. Bis dahin ist das Wetter der beste Hinweis. Das sagt die Vorhersage für die Stunden um Sonnenaufgang in Göreme:',
    rating: {
      good: { label: 'Sieht gut aus', text: 'Schwacher Wind und klare Luft im Flugfenster.' },
      borderline: { label: 'Grenzwertig', text: 'Etwas Wind, Böen oder Dunst. Es kann so oder so ausgehen.' },
      poor: { label: 'Unwahrscheinlich', text: 'Wind, Regen oder schlechte Sicht. Bei solchem Wetter fallen Flüge oft aus.' },
    },
    notOfficial: 'Eine Wettervorhersage, keine offizielle Entscheidung.',
    unavailable: 'Die Wettervorhersage ist gerade nicht verfügbar. Schau gleich noch einmal vorbei.',
    window: (window) => `Flugfenster ${window}`,
    wind: (kmh) => `Wind ${kmh} km/h`,
    gusts: (kmh) => `Böen ${kmh} km/h`,
    visibility: (km) => `Sicht ${km} km`,
    rain: (mm) => `Regen ${mm} mm`,
    updated: (time) => `Vorhersage aktualisiert um ${time}`,
    howTitle: 'So bewerten wir einen Morgen',
    howText:
      'Wir schauen auf die Stunden von 30 Minuten vor bis zwei Stunden nach Sonnenaufgang. Ruhige Luft (Wind bis etwa 12 km/h, Böen bis 20 km/h), gute Sicht und kein Regen sieht gut aus. Starker Wind oder Böen, Nebel, Regen oder Gewitter machen einen Flug unwahrscheinlich. Diese Grenzen sind unsere eigenen, keine offiziellen Regeln, und wir gleichen sie jeden Tag mit den echten Entscheidungen ab.',
    track: (flew, total) => `Wenn wir „sieht gut aus“ gesagt haben, sind die Ballons an ${flew} von ${total} Morgen geflogen.`,
    trackPending: (since) =>
      `Wir führen seit dem ${since} Buch und zeigen unsere Trefferquote, sobald genug Morgen vergangen sind.`,
    attribution: 'Wetterdaten von Open-Meteo.com',
  },

  history: {
    title: 'Ballonflüge in Kappadokien: an welchen Morgen die Ballons flogen',
    description:
      'Tag für Tag die offiziellen Ballonflaggen über Kappadokien, Sektor für Sektor, von der Seite des Slot Service Center.',
    h1: 'Flugverlauf',
    intro:
      'Alle Flaggen, die wir von der offiziellen Seite erfasst haben, die neuesten zuerst. Für Flüge bei Sonnenaufgang zählt das Morgenfenster.',
    startNote: (date) => `Die Aufzeichnungen beginnen am ${date}.`,
    empty: 'Noch nichts erfasst.',
    morning: 'Morgenflüge',
    laterWindows: 'Später am Tag',
    window: 'Zeitfenster',
    rawData: 'Die Rohdaten sind öffentlich auf GitHub.',
  },

  guides: {
    title: 'Ratgeber zu Ballonfahrten in Kappadokien',
    description:
      'Kurze, praktische Ratgeber dazu, wie über Ballonflüge in Kappadokien entschieden wird und was zu tun ist, wenn einer ausfällt.',
    h1: 'Ratgeber',
    intro: 'Was man wissen sollte, bevor in Kappadokien der Wecker klingelt.',
    updated: (date) => `Aktualisiert am ${date}`,
    mapCaption: 'Die drei Fluggebiete nach der offiziellen Karte, mit den aktuellen Flaggen.',
    sunriseCaption: 'Sonnenaufgang in Göreme am 15. jedes Monats, türkische Zeit.',
    monthColumn: 'Monat',
    sunriseColumn: 'Sonnenaufgang',
  },

  footer: {
    independent:
      'Eine unabhängige Seite. Nicht betrieben von der Zivilluftfahrtbehörde, der Universität Kappadokien oder einer Ballonfirma.',
    source: 'Offizielle Flaggenseite',
    data: 'Daten auf GitHub',
    languages: 'Andere Sprachen',
  },

  langHint: 'Diese Seite auf Deutsch lesen',
  dismiss: 'Schließen',

  notFound: {
    title: 'Seite nicht gefunden',
    text: 'Hier gibt es nichts, aber der heutige Ballonstatus ist nur einen Klick entfernt.',
    back: 'Zum heutigen Status',
  },
} satisfies Messages;
