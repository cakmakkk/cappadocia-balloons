import type { Messages } from '../types.ts';

export default {
  siteName: '卡帕多奇亚热气球动态',
  cappadocia: '卡帕多奇亚',
  towns: {
    avanos: '阿瓦诺斯',
    cavusin: '恰乌辛',
    goreme: '格雷梅',
    uchisar: '乌奇希萨尔',
    ortahisar: '奥塔希萨尔',
    urgup: '于尔居普',
    mustafapasa: '穆斯塔法帕夏',
  },

  nav: {
    today: '今天',
    tomorrow: '明天',
    history: '记录',
    guides: '指南',
    about: '关于',
    language: '语言',
  },

  flag: { green: '绿旗', yellow: '黄旗', red: '红旗', unknown: '无数据' },
  outcome: { flew: '已飞', grounded: '停飞', 'not-recorded': '无记录' },
  sector: (id) => `${id}区`,
  areas: {
    all: '全部三个飞行区',
    some: (list) => `${list}区`,
  },
  turkeyTime: '土耳其时间',

  home: {
    title: '今天卡帕多奇亚热气球能飞吗？实时飞行状态',
    description:
      '直接来自官方旗帜页面的卡帕多奇亚热气球实时状态：今天早上哪些区域可以飞、明天的展望以及过去每一天的记录。',
    h1: '今天卡帕多奇亚热气球能飞吗？',
    status: {
      flyingNow: {
        headline: '能飞，热气球已获准起飞',
        detail: (areas, window) => `${areas}挂出绿旗（${window}）。最终仍由飞行员和热气球公司决定。`,
      },
      groundedNow: {
        headline: '不能，热气球停飞',
        detail: (window) => `没有任何区域挂出绿旗（${window}），所有热气球都不能起飞。`,
      },
      flewThisMorning: {
        headline: '今天早上热气球飞了',
        detail: (areas, window) => `${areas}曾挂出绿旗（${window}）。`,
      },
      groundedThisMorning: {
        headline: '今天早上热气球没有飞',
        detail: (window) => `早上的飞行时段（${window}）所有区域都保持关闭。今天风赢了。`,
      },
      morningNotRecorded: {
        headline: '我们错过了今天早上的决定',
        detail: '今天的记录从早上飞行时段之后才开始。明天早上会照常检查。',
      },
      waiting: {
        headline: '今天的决定还没出来',
        detail: (sunrise) => `格雷梅现在还早。早上的旗帜通常在日出（${sunrise}）前后公布，本页面每10分钟检查一次。`,
      },
      noData: {
        headline: '暂无状态',
        detail: '第一次检查还没有运行。',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `之后（${window}）：再次允许起飞。` : `当天其余时间（${window}）：不能起飞。`,
    sunrise: (time) => `日出 ${time}`,
    checkedAt: (time) => `${time} 检查`,
    stale: '信息可能已过时，请刷新页面。',
    mapTitle: '三个飞行区',
    mapIntro: (window) => `${window}的旗帜（土耳其时间）。`,
    mapIntroEarlier: (date, window) => `最近一次公布的旗帜：${date} ${window}。今天的旗帜一公布就会显示在这里。`,
    officialUpdate: (time) => `时刻服务中心于 ${time} 设定`,
    secondaryTitle: '次要区域',
    secondaryIntro: '主要山谷周边的较小区域，需要单独的起飞许可。',
    region: (id) => `${id}号区域`,
    regions: (range) => `${range}号区域`,
    tomorrowTitle: '明天早上',
    thisMorningTitle: '今天早上的天气',
    tomorrowLink: '查看未来7天',
    recentTitle: '最近两周',
    allHistory: '查看全部记录',
    sourceNote: '直接来自卡帕多奇亚时刻服务中心（Slot Service Center）的官方旗帜页面，早上每10分钟检查一次。',
    guidesTitle: '实用信息',
  },

  tomorrow: {
    title: '明天卡帕多奇亚热气球能飞吗？未来7天展望',
    description: '卡帕多奇亚未来几个早上的天气展望：日出前后热气球飞行时段的风、阵风、雾和降雨，并为每天给出简单评估。',
    h1: '明天热气球能飞吗？',
    intro: '官方决定要到当天早上才会公布。在那之前，天气是最好的参考。以下是格雷梅日出前后的天气预报。',
    rating: {
      good: { label: '看起来不错', text: '飞行时段风小、空气清透。' },
      borderline: { label: '难说', text: '有一些风、阵风或薄雾，飞与不飞都有可能。' },
      poor: { label: '可能性小', text: '有风、下雨或能见度差。这样的天气航班常常取消。' },
    },
    notOfficial: '这是天气预报，不是官方决定。',
    unavailable: '暂时无法获取天气预报，请稍后再看。',
    window: (window) => `飞行时段 ${window}`,
    wind: (kmh) => `风速 ${kmh} 公里/小时`,
    gusts: (kmh) => `阵风 ${kmh} 公里/小时`,
    visibility: (km) => `能见度 ${km} 公里`,
    rain: (mm) => `降水 ${mm} 毫米`,
    updated: (time) => `预报更新于 ${time}`,
    howTitle: '我们如何评估一个早上',
    howText:
      '我们查看日出前30分钟到日出后两小时的天气。风小（风速约12公里/小时以内、阵风20公里/小时以内）、能见度好且无雨，就是“看起来不错”。强风或强阵风、雾、雨或雷暴会让飞行可能性变小。这些标准是我们自己定的，不是官方规定，我们每天都会和实际决定进行对照。',
    track: (flew, total) => `在我们说“看起来不错”的${total}个早上中，热气球飞了${flew}次。`,
    trackPending: (since) => `我们从${since}开始记录预报结果，等积累了足够多的早上，就会在这里公布准确率。`,
    attribution: '天气数据来自 Open-Meteo.com',
  },

  history: {
    title: '卡帕多奇亚热气球飞行记录：哪些早上飞了',
    description: '按区域逐日记录卡帕多奇亚上空的官方热气球旗帜，数据来自时刻服务中心页面。',
    h1: '飞行记录',
    intro: '我们从官方页面记录的所有旗帜，按时间从新到旧排列。对日出飞行来说，关键是早上的飞行时段。',
    startNote: (date) => `记录开始于${date}。`,
    empty: '还没有记录。',
    morning: '早上的飞行',
    laterWindows: '之后的时段',
    window: '时段',
    rawData: '原始数据在 GitHub 上公开。',
  },

  guides: {
    title: '卡帕多奇亚热气球指南',
    description: '简短实用的指南：卡帕多奇亚热气球飞行如何决定，以及航班取消后该怎么办。',
    h1: '指南',
    intro: '在卡帕多奇亚定闹钟早起之前，值得了解的事。',
    updated: (date) => `更新于${date}`,
    mapCaption: '根据官方地图绘制的三个飞行区，显示当前旗帜。',
  },

  footer: {
    independent: '独立网站，与民航局、卡帕多奇亚大学及任何热气球公司均无关联。',
    source: '官方旗帜页面',
    data: 'GitHub 上的数据',
  },

  langHint: '用简体中文阅读本页',
  dismiss: '关闭',

  notFound: {
    title: '页面未找到',
    text: '这里什么也没有，不过今天的热气球状态只需点一下。',
    back: '查看今天的状态',
  },
} satisfies Messages;
