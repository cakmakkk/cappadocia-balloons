import type { Messages } from '../types.ts';

export default {
  siteName: 'Stato delle mongolfiere in Cappadocia',
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
    today: 'Oggi',
    tomorrow: 'Domani',
    history: 'Storico',
    guides: 'Guide',
    about: 'Chi siamo',
    language: 'Lingua',
  },

  flag: { green: 'Bandiera verde', yellow: 'Bandiera gialla', red: 'Bandiera rossa', unknown: 'Nessun dato' },
  outcome: { flew: 'Volato', grounded: 'A terra', 'not-recorded': 'Nessun dato' },
  sector: (id) => `Settore ${id}`,
  areas: {
    all: 'tutte e tre le zone di volo',
    some: (list, count) => (count === 1 ? `il settore ${list}` : `i settori ${list}`),
  },
  turkeyTime: 'ora turca',
  photoCredit: (author, license) => `Foto: ${author}, ${license}`,
  photoAlt: {
    flying: 'Mongolfiere che salgono sopra le formazioni rocciose della Cappadocia all’alba',
    grounded: 'Valli e camini delle fate vicino a Uçhisar sotto un cielo sereno',
    night: 'La sagoma di una mongolfiera contro l’alba in Cappadocia',
  },

  home: {
    title: 'Oggi volano le mongolfiere in Cappadocia? Stato in tempo reale',
    titleDated: (date) => `Oggi volano le mongolfiere in Cappadocia? Stato in tempo reale · ${date}`,
    description:
      'Lo stato in tempo reale delle mongolfiere in Cappadocia, direttamente dalla pagina ufficiale delle bandiere: quali zone possono volare stamattina, le previsioni per domani e i giorni passati.',
    h1: 'Oggi volano le mongolfiere in Cappadocia?',
    status: {
      flyingNow: {
        headline: 'Sì, le mongolfiere possono volare',
        detail: (areas, window) =>
          `C’è bandiera verde su ${areas} (${window}). La decisione finale spetta comunque al pilota e alla compagnia.`,
      },
      groundedNow: {
        headline: 'No, le mongolfiere restano a terra',
        detail: (window) => `Nessuna zona ha la bandiera verde (${window}), quindi nessuna mongolfiera può decollare.`,
      },
      flewThisMorning: {
        headline: 'Stamattina le mongolfiere hanno volato',
        detail: (areas, window) => `C’era bandiera verde su ${areas} (${window}).`,
      },
      groundedThisMorning: {
        headline: 'Stamattina niente mongolfiere',
        detail: (window) =>
          `Tutte le zone sono rimaste chiuse durante la finestra del mattino (${window}).`,
      },
      morningNotRecorded: {
        headline: 'Ci siamo persi la decisione di stamattina',
        detail: 'I nostri dati di oggi iniziano dopo la finestra del mattino. Domattina si controlla come sempre.',
      },
      waiting: {
        headline: 'La decisione di oggi non è ancora uscita',
        detail: (sunrise) =>
          `A Göreme è ancora presto. Le bandiere del mattino di solito compaiono verso l’alba (${sunrise}) e questa pagina controlla ogni 10 minuti.`,
      },
      noData: {
        headline: 'Nessuno stato per ora',
        detail: 'Il primo controllo non è ancora stato fatto.',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `Più tardi (${window}): di nuovo via libera al decollo.` : `Resto della giornata (${window}): nessun decollo.`,
    quickAnswer: 'Risposta rapida',
    timelineTitle: 'Aggiornamenti ufficiali di oggi',
    source: 'Fonte: Slot Service Center (ufficiale)',
    sunrise: (time) => `Alba ${time}`,
    checkedAt: (time) => `Controllato alle ${time}`,
    stale: 'Potrebbe non essere aggiornato. Ricarica la pagina.',
    mapTitle: 'Zone di volo: settori A, B e C',
    mapIntro: (window) => `Bandiere per la fascia ${window}, ora turca.`,
    mapIntroEarlier: (date, window) =>
      `Ultime bandiere pubblicate: ${date}, ${window}. Quelle di oggi compariranno qui appena escono.`,
    officialUpdate: (time) => `Impostata dallo Slot Service Center alle ${time}`,
    secondaryTitle: 'Zone secondarie',
    secondaryIntro: 'Aree più piccole intorno alle valli principali, che richiedono un’autorizzazione al decollo separata.',
    region: (id) => `Zona ${id}`,
    regions: (range) => `Zone ${range}`,
    tomorrowTitle: 'Previsioni per domattina',
    thisMorningTitle: 'Il meteo di stamattina',
    tomorrowLink: 'Vedi le prossime 7 mattine',
    recentTitle: 'Voli in mongolfiera nelle ultime due settimane',
    allHistory: 'Tutti i giorni registrati',
    sourceNote:
      'Direttamente dalla pagina ufficiale delle bandiere dello Slot Service Center della Cappadocia, controllata ogni 10 minuti durante la mattina.',
    guidesTitle: 'Da sapere',
    faqTitle: 'Domande frequenti',
    faq: [
      {
        q: 'Chi decide se le mongolfiere volano?',
        a: 'L’ufficio di Nevşehir dell’autorità dell’aviazione civile turca (SHGM) valuta il meteo ogni mattina e pubblica una bandiera per ogni zona di volo sulla pagina dello Slot Service Center. Questo sito legge quella pagina.',
      },
      {
        q: 'A che ora viene pubblicata la decisione?',
        a: 'Poco prima dell’alba. Nei nostri primi dati le bandiere del mattino sono comparse 35–40 minuti prima dell’alba, e la finestra di volo si è aperta circa mezz’ora prima.',
      },
      {
        q: 'Cosa significa la bandiera gialla?',
        a: 'Niente decollo, come con la bandiera rossa. Solo la bandiera verde consente il decollo.',
      },
      {
        q: 'Il mio volo può essere annullato anche in una mattina verde?',
        a: 'Sì. La bandiera verde consente il decollo, ma la decisione finale spetta al pilota e alla compagnia.',
      },
      {
        q: 'Domani volano le mongolfiere?',
        a: 'La decisione ufficiale arriva solo domattina. Fino ad allora, le nostre previsioni a 7 giorni valutano il meteo di ogni mattina.',
      },
      {
        q: 'È un sito ufficiale?',
        a: 'No. È una pagina indipendente che legge e registra le bandiere ufficiali. Non vende voli in mongolfiera.',
      },
    ],
  },

  tomorrow: {
    title: 'Domani volano le mongolfiere in Cappadocia? Previsioni a 7 giorni',
    description:
      'Previsioni per le prossime mattine in Cappadocia: vento, raffiche, nebbia e pioggia nella finestra di volo all’alba, con una valutazione semplice per ogni giorno.',
    h1: 'Domani volano le mongolfiere?',
    intro:
      'La decisione ufficiale arriva solo la mattina stessa. Fino ad allora il meteo è la guida migliore: ecco cosa dicono le previsioni per le ore intorno all’alba a Göreme.',
    rating: {
      good: { label: 'Sembra buono', text: 'Vento debole e aria limpida nella finestra di volo.' },
      borderline: { label: 'Incerto', text: 'Un po’ di vento, raffiche o foschia. Può andare in entrambi i modi.' },
      poor: { label: 'Improbabile', text: 'Vento, pioggia o scarsa visibilità. Con questo tempo i voli vengono spesso annullati.' },
    },
    notOfficial: 'Sono previsioni meteo, non una decisione ufficiale.',
    unavailable: 'Le previsioni non sono disponibili al momento. Riprova tra poco.',
    window: (window) => `Finestra di volo ${window}`,
    wind: (kmh) => `Vento ${kmh} km/h`,
    gusts: (kmh) => `raffiche ${kmh} km/h`,
    visibility: (km) => `visibilità ${km} km`,
    rain: (mm) => `pioggia ${mm} mm`,
    updated: (time) => `Previsioni aggiornate alle ${time}`,
    howTitle: 'Come valutiamo una mattina',
    howText:
      'Guardiamo le ore da 30 minuti prima dell’alba a due ore dopo. Aria calma (vento fino a circa 12 km/h, raffiche fino a 20 km/h), buona visibilità e niente pioggia: sembra buono. Vento o raffiche forti, nebbia, pioggia o temporali rendono un volo improbabile. Questi limiti sono nostri, non regole ufficiali, e li confrontiamo ogni giorno con le decisioni reali.',
    track: (flew, total) => `Quando abbiamo detto «sembra buono», le mongolfiere hanno volato ${flew} mattine su ${total}.`,
    trackPending: (since) =>
      `Teniamo il conto dal ${since} e mostreremo i nostri risultati quando saranno passate abbastanza mattine.`,
    attribution: 'Dati meteo di Open-Meteo.com',
  },

  history: {
    title: 'Storico dei voli in mongolfiera in Cappadocia: le mattine in cui si è volato',
    description:
      'Registro giorno per giorno delle bandiere ufficiali delle mongolfiere in Cappadocia, settore per settore, dalla pagina dello Slot Service Center.',
    h1: 'Storico dei voli',
    intro:
      'Tutte le bandiere che abbiamo registrato dalla pagina ufficiale, dalla più recente. Per i voli all’alba conta la finestra del mattino.',
    startNote: (date) => `I dati partono dal ${date}.`,
    empty: 'Ancora nessun dato.',
    morning: 'Voli del mattino',
    laterWindows: 'Più tardi',
    window: 'Fascia',
    rawData: 'I dati grezzi sono pubblici su GitHub.',
  },

  guides: {
    title: 'Guide sulle mongolfiere in Cappadocia',
    description:
      'Guide brevi e pratiche su come si decide ogni volo in mongolfiera in Cappadocia e cosa fare quando viene annullato.',
    h1: 'Guide',
    intro: 'Le cose da sapere prima di puntare la sveglia in Cappadocia.',
    updated: (date) => `Aggiornato il ${date}`,
    mapCaption: 'Le tre zone di volo, disegnate dalla mappa ufficiale, con le bandiere di adesso.',
    sunriseCaption: 'Alba a Göreme il 15 di ogni mese, ora turca.',
    monthColumn: 'Mese',
    sunriseColumn: 'Alba',
  },

  footer: {
    independent:
      'Una pagina indipendente. Non è gestita dall’autorità dell’aviazione civile, dall’Università della Cappadocia né da alcuna compagnia di mongolfiere.',
    source: 'Pagina ufficiale delle bandiere',
    data: 'Dati su GitHub',
    languages: 'Altre lingue',
  },

  langHint: 'Leggi questa pagina in italiano',
  dismiss: 'Chiudi',

  notFound: {
    title: 'Pagina non trovata',
    text: 'Qui non c’è niente, ma lo stato delle mongolfiere di oggi è a un clic.',
    back: 'Vedi lo stato di oggi',
  },
} satisfies Messages;
