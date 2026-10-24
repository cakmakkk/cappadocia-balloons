import type { Messages } from '../types.ts';

export default {
  siteName: 'カッパドキア気球フライト情報',
  cappadocia: 'カッパドキア',
  towns: {
    avanos: 'アヴァノス',
    cavusin: 'チャヴシン',
    goreme: 'ギョレメ',
    uchisar: 'ウチヒサール',
    ortahisar: 'オルタヒサール',
    urgup: 'ユルギュップ',
    mustafapasa: 'ムスタファパシャ',
  },

  nav: {
    today: '今日',
    tomorrow: '明日',
    history: '記録',
    guides: 'ガイド',
    about: 'このサイトについて',
    language: '言語',
  },

  flag: { green: '緑の旗', yellow: '黄色の旗', red: '赤の旗', unknown: 'データなし' },
  outcome: { flew: '飛んだ', grounded: '欠航', 'not-recorded': '記録なし' },
  sector: (id) => `セクター${id}`,
  areas: {
    all: '3つの飛行エリアすべて',
    some: (list) => `セクター${list}`,
  },
  turkeyTime: 'トルコ時間',
  photoCredit: (author, license) => `写真：${author}、${license}`,

  home: {
    title: '今日カッパドキアの気球は飛ぶ？リアルタイム運航状況',
    description:
      '公式の旗のページから直接取得した、カッパドキアの熱気球のリアルタイム運航状況。今朝どのエリアで飛べるか、明日の見通し、過去の記録がわかります。',
    h1: '今日カッパドキアの気球は飛ぶ？',
    status: {
      flyingNow: {
        headline: 'はい、気球は飛行できます',
        detail: (areas, window) =>
          `${areas}に緑の旗が出ています（${window}）。最終的な判断はパイロットと気球会社が行います。`,
      },
      groundedNow: {
        headline: 'いいえ、気球は飛べません',
        detail: (window) => `緑の旗が出ているエリアはありません（${window}）。どの気球も離陸できません。`,
      },
      flewThisMorning: {
        headline: '今朝、気球は飛びました',
        detail: (areas, window) => `${areas}に緑の旗が出ていました（${window}）。`,
      },
      groundedThisMorning: {
        headline: '今朝は気球が飛びませんでした',
        detail: (window) => `朝の時間帯（${window}）はすべてのエリアが閉鎖されたままでした。`,
      },
      morningNotRecorded: {
        headline: '今朝の決定は記録できませんでした',
        detail: '今日の記録は朝の時間帯の後から始まっています。明日の朝はいつも通り確認します。',
      },
      waiting: {
        headline: '今日の決定はまだ出ていません',
        detail: (sunrise) =>
          `ギョレメはまだ早朝です。朝の旗はふつう日の出（${sunrise}）ごろに出ます。このページは10分ごとに確認しています。`,
      },
      noData: {
        headline: 'まだ情報がありません',
        detail: '最初の確認がまだ行われていません。',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `その後（${window}）：再び離陸可能。` : `この日の残り（${window}）：離陸不可。`,
    quickAnswer: '結論',
    timelineTitle: '今日の公式発表',
    source: '出典：スロット・サービス・センター（公式）',
    sunrise: (time) => `日の出 ${time}`,
    checkedAt: (time) => `${time} 確認`,
    stale: '情報が古い可能性があります。ページを再読み込みしてください。',
    mapTitle: '3つの飛行エリア',
    mapIntro: (window) => `${window}の旗（トルコ時間）。`,
    mapIntroEarlier: (date, window) =>
      `最後に発表された旗：${date} ${window}。今日の旗が出たらすぐここに表示されます。`,
    officialUpdate: (time) => `スロット・サービス・センター発表 ${time}`,
    secondaryTitle: 'サブエリア',
    secondaryIntro: '主要な谷の周辺にある小さなエリアで、個別の離陸承認が必要です。',
    region: (id) => `エリア${id}`,
    regions: (range) => `エリア${range}`,
    tomorrowTitle: '明日の朝',
    thisMorningTitle: '今朝の天気',
    tomorrowLink: 'この先7日間を見る',
    recentTitle: '直近2週間',
    allHistory: 'すべての記録を見る',
    sourceNote: 'カッパドキアのスロット・サービス・センターの公式な旗のページから直接取得し、朝の間は10分ごとに確認しています。',
    guidesTitle: '知っておきたいこと',
  },

  tomorrow: {
    title: '明日カッパドキアの気球は飛ぶ？7日間の見通し',
    description:
      'カッパドキアのこれからの朝の天気見通し。日の出前後の気球の時間帯の風、突風、霧、雨をもとに、毎日を簡単に評価します。',
    h1: '明日、気球は飛ぶ？',
    intro: '公式の決定は当日の朝にしか出ません。それまでは天気がいちばんの手がかりです。ギョレメの日の出前後の予報はこちら。',
    rating: {
      good: { label: '良さそう', text: '飛行時間帯は風が弱く、空気も澄んでいます。' },
      borderline: { label: '微妙', text: '風や突風、もやが少しあります。どちらに転ぶかわかりません。' },
      poor: { label: '厳しそう', text: '風、雨、または視界不良。こうした天気では欠航になることが多いです。' },
    },
    notOfficial: '天気予報であり、公式の決定ではありません。',
    unavailable: '現在、天気予報を取得できません。しばらくしてからもう一度ご確認ください。',
    window: (window) => `飛行時間帯 ${window}`,
    wind: (kmh) => `風 ${kmh}km/h`,
    gusts: (kmh) => `突風 ${kmh}km/h`,
    visibility: (km) => `視程 ${km}km`,
    rain: (mm) => `降水 ${mm}mm`,
    updated: (time) => `予報更新 ${time}`,
    howTitle: '朝の評価のしかた',
    howText:
      '日の出の30分前から2時間後までの時間を見ています。風が穏やか（風速約12km/h、突風20km/hまで）で視界が良く、雨がなければ「良さそう」です。強い風や突風、霧、雨、雷雨があると飛ぶ可能性は低くなります。この基準は公式のルールではなく私たち独自のもので、毎日実際の決定と照らし合わせています。',
    track: (flew, total) => `「良さそう」と予報した${total}回の朝のうち、${flew}回は気球が飛びました。`,
    trackPending: (since) => `${since}から予報の的中を記録しています。十分な日数がたまったら、的中率をお見せします。`,
    attribution: '気象データ：Open-Meteo.com',
  },

  history: {
    title: 'カッパドキア気球フライト記録：どの朝に気球が飛んだか',
    description:
      'カッパドキア上空の公式な気球の旗を、セクターごとに毎日記録しています。データはスロット・サービス・センターのページから取得しています。',
    h1: 'フライト記録',
    intro: '公式ページから記録したすべての旗を新しい順に表示しています。日の出フライトで重要なのは朝の時間帯です。',
    startNote: (date) => `記録開始：${date}`,
    empty: 'まだ記録がありません。',
    morning: '朝のフライト',
    laterWindows: 'その後の時間帯',
    window: '時間帯',
    rawData: '元データはGitHubで公開しています。',
  },

  guides: {
    title: 'カッパドキア気球ガイド',
    description: 'カッパドキアの気球フライトがどのように決まるのか、欠航したらどうすればいいのかをまとめた短く実用的なガイド。',
    h1: 'ガイド',
    intro: 'カッパドキアで早起きする前に知っておきたいこと。',
    updated: (date) => `更新日：${date}`,
    mapCaption: '公式地図をもとに描いた3つの飛行エリアと現在の旗。',
  },

  footer: {
    independent: '独立したページです。民間航空局、カッパドキア大学、気球会社とは関係ありません。',
    source: '公式の旗のページ',
    data: 'GitHubのデータ',
  },

  langHint: 'このページを日本語で読む',
  dismiss: '閉じる',

  notFound: {
    title: 'ページが見つかりません',
    text: 'ここには何もありませんが、今日の気球の状況はワンクリックで見られます。',
    back: '今日の状況を見る',
  },
} satisfies Messages;
