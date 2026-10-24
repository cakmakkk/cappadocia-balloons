import type { Messages } from '../types.ts';

export default {
  siteName: '카파도키아 열기구 현황',
  cappadocia: '카파도키아',
  towns: {
    avanos: '아바노스',
    cavusin: '차우신',
    goreme: '괴레메',
    uchisar: '우치히사르',
    ortahisar: '오르타히사르',
    urgup: '위르귑',
    mustafapasa: '무스타파파샤',
  },

  nav: {
    today: '오늘',
    tomorrow: '내일',
    history: '기록',
    guides: '가이드',
    about: '소개',
    language: '언어',
  },

  flag: { green: '초록 깃발', yellow: '노란 깃발', red: '빨간 깃발', unknown: '정보 없음' },
  outcome: { flew: '비행함', grounded: '비행 안 함', 'not-recorded': '기록 없음' },
  sector: (id) => `${id} 구역`,
  areas: {
    all: '세 비행 구역 모두',
    some: (list) => `${list} 구역`,
  },
  turkeyTime: '튀르키예 시간',
  photoCredit: (author, license) => `사진: ${author}, ${license}`,
  photoAlt: {
    flying: '해 뜰 무렵 카파도키아의 바위 지형 위로 떠오르는 열기구',
    grounded: '맑은 하늘 아래 우치히사르 근처의 계곡과 요정의 굴뚝',
    night: '카파도키아의 일출을 배경으로 한 열기구 실루엣',
  },

  home: {
    title: '오늘 카파도키아 열기구 뜨나요? 실시간 비행 현황',
    titleDated: (date) => `오늘 카파도키아 열기구 뜨나요? 실시간 현황 · ${date}`,
    description:
      '공식 깃발 페이지에서 바로 가져온 카파도키아 열기구 실시간 현황. 오늘 아침 어느 구역이 비행할 수 있는지, 내일 전망과 지난 기록까지 확인하세요.',
    h1: '오늘 카파도키아 열기구 뜨나요?',
    status: {
      flyingNow: {
        headline: '네, 열기구 비행이 허가됐어요',
        detail: (areas, window) =>
          `${areas}에 초록 깃발이 올라와 있어요 (${window}). 최종 결정은 조종사와 열기구 업체가 내려요.`,
      },
      groundedNow: {
        headline: '아니요, 열기구가 뜨지 못해요',
        detail: (window) => `초록 깃발이 올라온 구역이 없어요 (${window}). 어떤 열기구도 이륙할 수 없어요.`,
      },
      flewThisMorning: {
        headline: '오늘 아침 열기구가 떴어요',
        detail: (areas, window) => `${areas}에 초록 깃발이 있었어요 (${window}).`,
      },
      groundedThisMorning: {
        headline: '오늘 아침에는 열기구가 뜨지 않았어요',
        detail: (window) => `아침 비행 시간대 내내 모든 구역이 닫혀 있었어요 (${window}).`,
      },
      morningNotRecorded: {
        headline: '오늘 아침 결정은 기록하지 못했어요',
        detail: '오늘 기록은 아침 비행 시간대 이후부터 시작돼요. 내일 아침에는 평소처럼 확인해요.',
      },
      waiting: {
        headline: '오늘 결정은 아직 나오지 않았어요',
        detail: (sunrise) =>
          `괴레메는 아직 이른 시간이에요. 아침 깃발은 보통 해 뜰 무렵(${sunrise})에 올라오고, 이 페이지는 10분마다 확인해요.`,
      },
      noData: {
        headline: '아직 현황이 없어요',
        detail: '첫 확인이 아직 실행되지 않았어요.',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `이후 시간대 (${window}): 다시 이륙 가능.` : `남은 시간대 (${window}): 이륙 불가.`,
    quickAnswer: '한눈에 보기',
    timelineTitle: '오늘의 공식 업데이트',
    source: '출처: 슬롯 서비스 센터(공식)',
    sunrise: (time) => `일출 ${time}`,
    checkedAt: (time) => `${time} 확인`,
    stale: '정보가 오래됐을 수 있어요. 페이지를 새로고침하세요.',
    mapTitle: '비행 구역: A·B·C 구역',
    mapIntro: (window) => `${window} 깃발, 튀르키예 시간 기준.`,
    mapIntroEarlier: (date, window) =>
      `마지막으로 발표된 깃발: ${date} ${window}. 오늘 깃발이 나오면 바로 여기에 표시돼요.`,
    officialUpdate: (time) => `슬롯 서비스 센터 발표 ${time}`,
    secondaryTitle: '보조 구역',
    secondaryIntro: '주요 계곡 주변의 작은 구역으로, 따로 이륙 승인을 받아야 해요.',
    region: (id) => `${id}번 구역`,
    regions: (range) => `${range}번 구역`,
    tomorrowTitle: '내일 아침 열기구 전망',
    thisMorningTitle: '오늘 아침 날씨',
    tomorrowLink: '앞으로 7일 보기',
    recentTitle: '최근 2주 열기구 비행',
    allHistory: '전체 기록 보기',
    sourceNote: '카파도키아 슬롯 서비스 센터의 공식 깃발 페이지에서 바로 가져오며, 아침에는 10분마다 확인해요.',
    guidesTitle: '알아두면 좋은 정보',
    faqTitle: '자주 묻는 질문',
    faq: [
      {
        q: '열기구 비행 여부는 누가 결정하나요?',
        a: '튀르키예 민간항공청(SHGM) 네브셰히르 사무소가 매일 아침 날씨를 판단하고, 슬롯 서비스 센터 페이지에 비행 구역마다 깃발을 올려요. 이 사이트는 그 페이지를 읽어 와요.',
      },
      {
        q: '결정은 몇 시에 나오나요?',
        a: '해 뜨기 조금 전이에요. 저희 첫 기록에서는 아침 깃발이 일출 35~40분 전에 올라왔고, 비행 시간대는 일출 약 30분 전에 열렸어요.',
      },
      {
        q: '노란 깃발은 무슨 뜻인가요?',
        a: '빨간 깃발과 마찬가지로 이륙할 수 없다는 뜻이에요. 초록 깃발일 때만 이륙할 수 있어요.',
      },
      {
        q: '초록 깃발인 날에도 비행이 취소될 수 있나요?',
        a: '네. 초록 깃발은 이륙을 허가할 뿐, 최종 결정은 조종사와 열기구 업체가 내려요.',
      },
      {
        q: '내일 열기구가 뜰까요?',
        a: '공식 결정은 내일 아침에야 나와요. 그 전까지는 저희 7일 전망이 아침마다 날씨를 평가해 드려요.',
      },
      {
        q: '공식 사이트인가요?',
        a: '아니요. 공식 깃발을 읽어 기록하는 독립 페이지예요. 열기구 투어를 팔지 않아요.',
      },
    ],
  },

  tomorrow: {
    title: '내일 카파도키아 열기구 뜰까요? 7일 전망',
    description:
      '카파도키아의 다가오는 아침 날씨 전망. 일출 무렵 열기구 비행 시간대의 바람, 돌풍, 안개, 비를 보고 날마다 간단히 평가해요.',
    h1: '내일 열기구 뜰까요?',
    intro:
      '공식 결정은 그날 아침에야 나와요. 그 전까지는 날씨가 가장 좋은 힌트예요. 괴레메의 일출 전후 시간대 예보는 다음과 같아요.',
    rating: {
      good: { label: '좋아 보여요', text: '비행 시간대에 바람이 약하고 하늘이 맑아요.' },
      borderline: { label: '애매해요', text: '바람이나 돌풍, 옅은 안개가 있어요. 어느 쪽이든 될 수 있어요.' },
      poor: { label: '어려워 보여요', text: '바람, 비 또는 시야 불량. 이런 날씨에는 비행이 자주 취소돼요.' },
    },
    notOfficial: '날씨 예보일 뿐, 공식 결정이 아니에요.',
    unavailable: '지금은 날씨 예보를 불러올 수 없어요. 잠시 후 다시 확인하세요.',
    window: (window) => `비행 시간대 ${window}`,
    wind: (kmh) => `바람 ${kmh}km/h`,
    gusts: (kmh) => `돌풍 ${kmh}km/h`,
    visibility: (km) => `시정 ${km}km`,
    rain: (mm) => `강수 ${mm}mm`,
    updated: (time) => `예보 업데이트 ${time}`,
    howTitle: '아침을 평가하는 방법',
    howText:
      '일출 30분 전부터 일출 2시간 후까지의 시간을 봐요. 바람이 잔잔하고(풍속 약 12km/h, 돌풍 20km/h 이하) 시야가 좋고 비가 없으면 좋아 보여요. 강한 바람이나 돌풍, 안개, 비, 뇌우가 있으면 비행 가능성이 낮아요. 이 기준은 공식 규정이 아닌 저희 자체 기준이며, 매일 실제 결정과 비교하고 있어요.',
    track: (flew, total) => `“좋아 보여요”라고 한 ${total}번의 아침 중 ${flew}번 열기구가 떴어요.`,
    trackPending: (since) => `${since}부터 예보 적중 여부를 기록하고 있어요. 충분한 날이 쌓이면 적중률을 보여드릴게요.`,
    attribution: '날씨 데이터: Open-Meteo.com',
  },

  history: {
    title: '카파도키아 열기구 비행 기록: 어느 아침에 열기구가 떴을까',
    description:
      '카파도키아 상공의 공식 열기구 깃발을 구역별로, 하루하루 기록했어요. 슬롯 서비스 센터 페이지에서 가져온 자료예요.',
    h1: '비행 기록',
    intro: '공식 페이지에서 기록한 모든 깃발을 최신순으로 보여드려요. 일출 비행에서는 아침 비행 시간대가 중요해요.',
    startNote: (date) => `기록 시작일: ${date}`,
    empty: '아직 기록이 없어요.',
    morning: '아침 비행',
    laterWindows: '이후 시간대',
    window: '시간대',
    rawData: '원본 데이터는 GitHub에 공개되어 있어요.',
  },

  guides: {
    title: '카파도키아 열기구 가이드',
    description: '카파도키아 열기구 비행이 어떻게 결정되는지, 취소되면 무엇을 해야 하는지 알려주는 짧고 실용적인 가이드.',
    h1: '가이드',
    intro: '카파도키아에서 새벽 알람을 맞추기 전에 알아두면 좋은 것들.',
    updated: (date) => `업데이트: ${date}`,
    mapCaption: '공식 지도를 바탕으로 그린 세 비행 구역과 현재 깃발.',
    sunriseCaption: '매월 15일 괴레메의 일출 시각(튀르키예 시간).',
    monthColumn: '월',
    sunriseColumn: '일출',
  },

  footer: {
    independent: '독립적으로 운영되는 페이지예요. 민간항공청, 카파도키아 대학교, 열기구 업체와 관련이 없어요.',
    source: '공식 깃발 페이지',
    data: 'GitHub 데이터',
    languages: '다른 언어',
  },

  langHint: '이 페이지를 한국어로 보기',
  dismiss: '닫기',

  notFound: {
    title: '페이지를 찾을 수 없어요',
    text: '여기에는 아무것도 없어요. 오늘의 열기구 현황은 클릭 한 번이면 볼 수 있어요.',
    back: '오늘 현황 보기',
  },
} satisfies Messages;
