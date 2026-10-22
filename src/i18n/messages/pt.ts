import type { Messages } from '../types.ts';

export default {
  siteName: 'Status dos balões na Capadócia',
  cappadocia: 'Capadócia',
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
    today: 'Hoje',
    tomorrow: 'Amanhã',
    history: 'Histórico',
    guides: 'Guias',
    about: 'Sobre',
    language: 'Idioma',
  },

  flag: { green: 'Bandeira verde', yellow: 'Bandeira amarela', red: 'Bandeira vermelha', unknown: 'Sem dados' },
  outcome: { flew: 'Voaram', grounded: 'Em terra', 'not-recorded': 'Sem registro' },
  sector: (id) => `Setor ${id}`,
  areas: {
    all: 'as três áreas de voo',
    some: (list, count) => (count === 1 ? `o setor ${list}` : `os setores ${list}`),
  },
  turkeyTime: 'horário da Turquia',

  home: {
    title: 'Os balões da Capadócia voam hoje? Status ao vivo',
    description:
      'Status ao vivo dos balões de ar quente na Capadócia, direto da página oficial de bandeiras: quais áreas podem voar nesta manhã, a previsão para amanhã e todos os dias anteriores.',
    h1: 'Os balões da Capadócia voam hoje?',
    status: {
      flyingNow: {
        headline: 'Sim, os balões estão liberados para voar',
        detail: (areas, window) =>
          `Bandeira verde sobre ${areas} (${window}). A decisão final ainda é do piloto e da empresa de balonismo.`,
      },
      groundedNow: {
        headline: 'Não, os balões estão em terra',
        detail: (window) => `Nenhuma área tem bandeira verde (${window}), então nenhum balão pode decolar.`,
      },
      flewThisMorning: {
        headline: 'Os balões voaram nesta manhã',
        detail: (areas, window) => `Houve bandeira verde sobre ${areas} (${window}).`,
      },
      groundedThisMorning: {
        headline: 'Nada de balões nesta manhã',
        detail: (window) => `Todas as áreas ficaram fechadas durante a janela da manhã (${window}). Hoje o vento venceu.`,
      },
      morningNotRecorded: {
        headline: 'Perdemos a decisão desta manhã',
        detail: 'Nossos registros de hoje começam depois da janela da manhã. Amanhã cedo a verificação segue normal.',
      },
      waiting: {
        headline: 'A decisão de hoje ainda não saiu',
        detail: (sunrise) =>
          `Ainda é cedo em Göreme. As bandeiras da manhã costumam aparecer perto do nascer do sol (${sunrise}), e esta página verifica a cada 10 minutos.`,
      },
      noData: {
        headline: 'Ainda sem status',
        detail: 'A primeira verificação ainda não foi feita.',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `Mais tarde (${window}): decolagem liberada de novo.` : `Resto do dia (${window}): sem decolagens.`,
    sunrise: (time) => `Nascer do sol ${time}`,
    checkedAt: (time) => `Verificado às ${time}`,
    stale: 'Pode estar desatualizado. Recarregue a página.',
    mapTitle: 'As três áreas de voo',
    mapIntro: (window) => `Bandeiras para ${window}, horário da Turquia.`,
    mapIntroEarlier: (date, window) =>
      `Últimas bandeiras publicadas: ${date}, ${window}. As de hoje aparecem aqui assim que saírem.`,
    officialUpdate: (time) => `Definida pelo Slot Service Center às ${time}`,
    secondaryTitle: 'Regiões secundárias',
    secondaryIntro: 'Áreas menores ao redor dos vales principais, que precisam de uma autorização de decolagem própria.',
    region: (id) => `Região ${id}`,
    tomorrowTitle: 'Amanhã cedo',
    thisMorningTitle: 'O tempo nesta manhã',
    tomorrowLink: 'Ver as próximas 7 manhãs',
    recentTitle: 'As últimas duas semanas',
    allHistory: 'Todos os dias registrados',
    sourceNote:
      'Direto da página oficial de bandeiras do Slot Service Center da Capadócia, verificada a cada 10 minutos durante a manhã.',
    guidesTitle: 'Bom saber',
  },

  tomorrow: {
    title: 'Os balões da Capadócia vão voar amanhã? Previsão de 7 dias',
    description:
      'Previsão para as próximas manhãs na Capadócia: vento, rajadas, neblina e chuva na janela de voo ao nascer do sol, com uma avaliação simples para cada dia.',
    h1: 'Os balões vão voar amanhã?',
    intro:
      'A decisão oficial só sai na própria manhã. Até lá, o tempo é a melhor pista. Veja o que diz a previsão para as horas em torno do nascer do sol em Göreme.',
    rating: {
      good: { label: 'Parece bom', text: 'Vento fraco e ar limpo durante a janela de voo.' },
      borderline: { label: 'Incerto', text: 'Algum vento, rajadas ou névoa. Pode dar certo ou não.' },
      poor: { label: 'Pouco provável', text: 'Vento, chuva ou pouca visibilidade. Com esse tempo os voos costumam ser cancelados.' },
    },
    notOfficial: 'É uma previsão do tempo, não uma decisão oficial.',
    unavailable: 'A previsão do tempo não está disponível agora. Volte daqui a pouco.',
    window: (window) => `Janela de voo ${window}`,
    wind: (kmh) => `Vento ${kmh} km/h`,
    gusts: (kmh) => `rajadas ${kmh} km/h`,
    visibility: (km) => `visibilidade ${km} km`,
    rain: (mm) => `chuva ${mm} mm`,
    updated: (time) => `Previsão atualizada às ${time}`,
    howTitle: 'Como avaliamos uma manhã',
    howText:
      'Olhamos as horas de 30 minutos antes do nascer do sol até duas horas depois. Ar calmo (vento de até uns 12 km/h, rajadas de até 20 km/h), boa visibilidade e sem chuva parece bom. Vento ou rajadas fortes, neblina, chuva ou tempestades tornam um voo pouco provável. Esses limites são nossos, não regras oficiais, e os comparamos todos os dias com as decisões reais.',
    track: (flew, total) => `Quando dissemos “parece bom”, os balões voaram em ${flew} de ${total} manhãs.`,
    trackPending: (since) =>
      `Registramos nossas previsões desde ${since} e vamos mostrar nosso índice de acerto quando passarem manhãs suficientes.`,
    attribution: 'Dados meteorológicos de Open-Meteo.com',
  },

  history: {
    title: 'Histórico de voos de balão na Capadócia: em quais manhãs os balões voaram',
    description:
      'Registro dia a dia das bandeiras oficiais dos balões na Capadócia, setor por setor, tirado da página do Slot Service Center.',
    h1: 'Histórico de voos',
    intro:
      'Todas as bandeiras que registramos da página oficial, das mais recentes às mais antigas. Para os voos ao nascer do sol, o que importa é a janela da manhã.',
    startNote: (date) => `Os registros começam em ${date}.`,
    empty: 'Ainda não há registros.',
    morning: 'Voos da manhã',
    laterWindows: 'Mais tarde',
    window: 'Janela',
    rawData: 'Os dados brutos são públicos no GitHub.',
  },

  guides: {
    title: 'Guias sobre os balões da Capadócia',
    description:
      'Guias curtos e práticos sobre como cada voo de balão na Capadócia é decidido e o que fazer quando ele é cancelado.',
    h1: 'Guias',
    intro: 'O que vale saber antes de programar o despertador na Capadócia.',
    updated: (date) => `Atualizado em ${date}`,
    mapCaption: 'As três áreas de voo, desenhadas a partir do mapa oficial, com as bandeiras de agora.',
  },

  footer: {
    independent:
      'Uma página independente. Não é mantida pela autoridade de aviação civil, pela Universidade da Capadócia nem por nenhuma empresa de balonismo.',
    source: 'Página oficial de bandeiras',
    data: 'Dados no GitHub',
  },

  langHint: 'Leia esta página em português',
  dismiss: 'Fechar',

  notFound: {
    title: 'Página não encontrada',
    text: 'Não há nada aqui, mas o status dos balões de hoje está a um clique.',
    back: 'Ver o status de hoje',
  },
} satisfies Messages;
