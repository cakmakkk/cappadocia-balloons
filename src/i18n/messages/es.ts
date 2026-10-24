import type { Messages } from '../types.ts';

export default {
  siteName: 'Estado de los globos en Capadocia',
  cappadocia: 'Capadocia',
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
    today: 'Hoy',
    tomorrow: 'Mañana',
    history: 'Historial',
    guides: 'Guías',
    about: 'Acerca de',
    language: 'Idioma',
  },

  flag: { green: 'Bandera verde', yellow: 'Bandera amarilla', red: 'Bandera roja', unknown: 'Sin datos' },
  outcome: { flew: 'Volaron', grounded: 'No volaron', 'not-recorded': 'Sin registro' },
  sector: (id) => `Sector ${id}`,
  areas: {
    all: 'las tres zonas de vuelo',
    some: (list, count) => (count === 1 ? `el sector ${list}` : `los sectores ${list}`),
  },
  turkeyTime: 'hora de Turquía',
  photoCredit: (author, license) => `Foto: ${author}, ${license}`,

  home: {
    title: '¿Vuelan hoy los globos en Capadocia? Estado en directo',
    description:
      'Estado en directo de los globos aerostáticos de Capadocia, directamente de la página oficial de banderas: qué zonas pueden volar esta mañana, la previsión para mañana y los días anteriores.',
    h1: '¿Vuelan hoy los globos en Capadocia?',
    status: {
      flyingNow: {
        headline: 'Sí, los globos pueden volar',
        detail: (areas, window) =>
          `Hay bandera verde en ${areas} (${window}). La decisión final sigue siendo del piloto y de la empresa de globos.`,
      },
      groundedNow: {
        headline: 'No, los globos están en tierra',
        detail: (window) => `Ninguna zona tiene bandera verde (${window}), así que ningún globo puede despegar.`,
      },
      flewThisMorning: {
        headline: 'Los globos volaron esta mañana',
        detail: (areas, window) => `Hubo bandera verde en ${areas} (${window}).`,
      },
      groundedThisMorning: {
        headline: 'Esta mañana no volaron globos',
        detail: (window) =>
          `Todas las zonas siguieron cerradas durante la ventana de la mañana (${window}).`,
      },
      morningNotRecorded: {
        headline: 'Nos perdimos la decisión de esta mañana',
        detail: 'Nuestros registros de hoy empiezan después de la ventana de la mañana. Mañana se revisará como siempre.',
      },
      waiting: {
        headline: 'La decisión de hoy aún no ha salido',
        detail: (sunrise) =>
          `Todavía es temprano en Göreme. Las banderas de la mañana suelen aparecer hacia el amanecer (${sunrise}), y esta página las revisa cada 10 minutos.`,
      },
      noData: {
        headline: 'Aún no hay estado',
        detail: 'La primera comprobación aún no se ha hecho.',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `Más tarde (${window}): se vuelve a permitir el despegue.` : `Resto del día (${window}): sin despegues.`,
    quickAnswer: 'Respuesta rápida',
    timelineTitle: 'Actualizaciones oficiales de hoy',
    source: 'Fuente: Centro de Servicios de Slots (oficial)',
    sunrise: (time) => `Amanecer ${time}`,
    checkedAt: (time) => `Comprobado a las ${time}`,
    stale: 'Puede que esté desactualizado. Recarga la página.',
    mapTitle: 'Las tres zonas de vuelo',
    mapIntro: (window) => `Banderas de la franja ${window}, hora de Turquía.`,
    mapIntroEarlier: (date, window) =>
      `Últimas banderas publicadas: ${date}, ${window}. Las de hoy aparecerán aquí en cuanto salgan.`,
    officialUpdate: (time) => `Fijada por el Centro de Servicios de Slots a las ${time}`,
    secondaryTitle: 'Regiones secundarias',
    secondaryIntro: 'Zonas más pequeñas alrededor de los valles principales, que necesitan su propia autorización de despegue.',
    region: (id) => `Región ${id}`,
    regions: (range) => `Regiones ${range}`,
    tomorrowTitle: 'Mañana por la mañana',
    thisMorningTitle: 'El tiempo de esta mañana',
    tomorrowLink: 'Ver las próximas 7 mañanas',
    recentTitle: 'Las últimas dos semanas',
    allHistory: 'Todos los días registrados',
    sourceNote:
      'Directamente de la página oficial de banderas del Centro de Servicios de Slots de Capadocia, revisada cada 10 minutos durante la mañana.',
    guidesTitle: 'Conviene saber',
  },

  tomorrow: {
    title: '¿Volarán mañana los globos en Capadocia? Previsión de 7 días',
    description:
      'Previsión para las próximas mañanas en Capadocia: viento, rachas, niebla y lluvia durante la ventana de vuelo al amanecer, con una valoración sencilla para cada día.',
    h1: '¿Volarán mañana los globos?',
    intro:
      'La decisión oficial solo se publica la misma mañana. Hasta entonces, el tiempo es la mejor pista. Esto es lo que dice la previsión para las horas en torno al amanecer en Göreme.',
    rating: {
      good: { label: 'Pinta bien', text: 'Viento suave y aire despejado durante la ventana de vuelo.' },
      borderline: { label: 'Dudoso', text: 'Algo de viento, rachas o bruma. Puede salir de cualquier manera.' },
      poor: { label: 'Poco probable', text: 'Viento, lluvia o mala visibilidad. Con un tiempo así los vuelos suelen cancelarse.' },
    },
    notOfficial: 'Es una previsión meteorológica, no una decisión oficial.',
    unavailable: 'La previsión no está disponible ahora mismo. Vuelve a mirar en un rato.',
    window: (window) => `Ventana de vuelo ${window}`,
    wind: (kmh) => `Viento ${kmh} km/h`,
    gusts: (kmh) => `rachas ${kmh} km/h`,
    visibility: (km) => `visibilidad ${km} km`,
    rain: (mm) => `lluvia ${mm} mm`,
    updated: (time) => `Previsión actualizada a las ${time}`,
    howTitle: 'Cómo valoramos una mañana',
    howText:
      'Miramos las horas desde 30 minutos antes del amanecer hasta dos horas después. Aire en calma (viento de hasta unos 12 km/h y rachas de hasta 20 km/h), buena visibilidad y sin lluvia pinta bien. Viento o rachas fuertes, niebla, lluvia o tormentas hacen que un vuelo sea poco probable. Estos límites son nuestros, no normas oficiales, y los comparamos cada día con las decisiones reales.',
    track: (flew, total) => `Cuando dijimos «pinta bien», los globos volaron ${flew} de ${total} mañanas.`,
    trackPending: (since) =>
      `Llevamos la cuenta desde el ${since} y mostraremos nuestro índice de acierto cuando hayan pasado suficientes mañanas.`,
    attribution: 'Datos meteorológicos de Open-Meteo.com',
  },

  history: {
    title: 'Historial de vuelos en globo en Capadocia: qué mañanas volaron',
    description:
      'Registro día a día de las banderas oficiales de los globos en Capadocia, sector por sector, tomado de la página del Centro de Servicios de Slots.',
    h1: 'Historial de vuelos',
    intro:
      'Todas las banderas que hemos registrado de la página oficial, de la más reciente a la más antigua. Para los vuelos al amanecer, lo que cuenta es la ventana de la mañana.',
    startNote: (date) => `Los registros empiezan el ${date}.`,
    empty: 'Todavía no hay registros.',
    morning: 'Vuelos de la mañana',
    laterWindows: 'Más tarde',
    window: 'Franja',
    rawData: 'Los datos brutos son públicos en GitHub.',
  },

  guides: {
    title: 'Guías sobre los globos de Capadocia',
    description:
      'Guías breves y prácticas sobre cómo se decide cada vuelo en globo en Capadocia y qué hacer cuando se cancela.',
    h1: 'Guías',
    intro: 'Lo que conviene saber antes de poner el despertador en Capadocia.',
    updated: (date) => `Actualizado el ${date}`,
    mapCaption: 'Las tres zonas de vuelo, dibujadas a partir del mapa oficial, con las banderas de ahora mismo.',
  },

  footer: {
    independent:
      'Una página independiente. No la gestionan la autoridad de aviación civil, la Universidad de Capadocia ni ninguna empresa de globos.',
    source: 'Página oficial de banderas',
    data: 'Datos en GitHub',
  },

  langHint: 'Lee esta página en español',
  dismiss: 'Cerrar',

  notFound: {
    title: 'Página no encontrada',
    text: 'Aquí no hay nada, pero el estado de los globos de hoy está a un clic.',
    back: 'Ver el estado de hoy',
  },
} satisfies Messages;
