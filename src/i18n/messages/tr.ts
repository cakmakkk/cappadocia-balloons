import type { Messages } from '../types.ts';

export default {
  siteName: 'Kapadokya Balon Durumu',
  cappadocia: 'Kapadokya',
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
    today: 'Bugün',
    tomorrow: 'Yarın',
    history: 'Geçmiş',
    guides: 'Rehberler',
    about: 'Hakkında',
    language: 'Dil',
  },

  flag: { green: 'Yeşil bayrak', yellow: 'Sarı bayrak', red: 'Kırmızı bayrak', unknown: 'Veri yok' },
  outcome: { flew: 'Uçtu', grounded: 'Uçmadı', 'not-recorded': 'Kayıt yok' },
  sector: (id) => `${id} bölgesi`,
  areas: {
    all: 'üç uçuş bölgesinin hepsinde',
    some: (list) => `${list} bölgesinde`,
  },
  turkeyTime: 'Türkiye saati',

  home: {
    title: "Kapadokya'da balonlar bugün uçuyor mu? Canlı balon durumu",
    description:
      'Kapadokya sıcak hava balonlarının canlı durumu, doğrudan resmî bayrak sayfasından: bu sabah hangi bölgeler uçabiliyor, yarın için tahmin ve geçmiş günler.',
    h1: "Kapadokya'da balonlar bugün uçuyor mu?",
    status: {
      flyingNow: {
        headline: 'Evet, balonlar uçabilir',
        detail: (areas, window) =>
          `${window} arası ${areas} yeşil bayrak var. Son kararı yine pilot ve balon şirketi verir.`,
      },
      groundedNow: {
        headline: 'Hayır, balonlar şu an uçamıyor',
        detail: (window) => `${window} arası hiçbir bölgede yeşil bayrak yok, yani hiçbir balon kalkış yapamaz.`,
      },
      flewThisMorning: {
        headline: 'Balonlar bu sabah uçtu',
        detail: (areas, window) => `${window} arası ${areas} yeşil bayrak vardı.`,
      },
      groundedThisMorning: {
        headline: 'Bu sabah balon uçmadı',
        detail: (window) => `Sabah penceresi boyunca (${window}) bütün bölgeler kapalı kaldı. Bugün rüzgâr kazandı.`,
      },
      morningNotRecorded: {
        headline: 'Bu sabahki kararı kaçırdık',
        detail: 'Bugünkü kayıtlarımız sabah penceresinden sonra başlıyor. Yarın sabah her zamanki gibi kontrol edilecek.',
      },
      waiting: {
        headline: 'Bugünün kararı henüz açıklanmadı',
        detail: (sunrise) =>
          `Göreme'de daha sabah olmadı. Sabahın bayrakları genelde gün doğumuna doğru (${sunrise}) çıkar, bu sayfa da 10 dakikada bir kontrol eder.`,
      },
      noData: {
        headline: 'Henüz durum yok',
        detail: 'İlk kontrol daha yapılmadı.',
      },
    },
    laterWindow: (window, cleared) =>
      cleared ? `Günün devamı (${window}): kalkışa yine izin var.` : `Günün geri kalanı (${window}): kalkış yok.`,
    sunrise: (time) => `Gün doğumu ${time}`,
    checkedAt: (time) => `Son kontrol: ${time}`,
    stale: 'Bu bilgi eskimiş olabilir. Sayfayı yenileyin.',
    mapTitle: 'Üç uçuş bölgesi',
    mapIntro: (window) => `${window} için bayraklar, Türkiye saatiyle.`,
    mapIntroEarlier: (date, window) =>
      `Son yayımlanan bayraklar: ${date}, ${window}. Bugünkü bayraklar çıkar çıkmaz burada görünecek.`,
    officialUpdate: (time) => `Slot Hizmet Merkezi güncellemesi: ${time}`,
    secondaryTitle: 'İkincil bölgeler',
    secondaryIntro: 'Ana vadilerin çevresindeki, ayrıca kalkış onayı gereken küçük bölgeler.',
    region: (id) => `${id}. bölge`,
    regions: (range) => `${range}. bölgeler`,
    tomorrowTitle: 'Yarın sabah',
    thisMorningTitle: 'Bu sabahın havası',
    tomorrowLink: 'Önümüzdeki 7 sabahı gör',
    recentTitle: 'Son iki hafta',
    allHistory: 'Kayıtlı bütün günler',
    sourceNote:
      'Doğrudan Kapadokya Slot Hizmet Merkezi’nin resmî bayrak sayfasından, sabah boyunca 10 dakikada bir kontrol edilir.',
    guidesTitle: 'Bilmekte fayda var',
  },

  tomorrow: {
    title: "Kapadokya'da balonlar yarın uçacak mı? 7 günlük tahmin",
    description:
      'Kapadokya’da önümüzdeki sabahlar için hava tahmini: gün doğumundaki balon penceresinde rüzgâr, hamle, sis ve yağış, her gün için basit bir değerlendirmeyle.',
    h1: 'Balonlar yarın uçacak mı?',
    intro:
      'Resmî karar ancak o sabah çıkıyor. O zamana kadar en iyi ipucu hava durumu. Göreme’de gün doğumu saatleri için tahmin şöyle:',
    rating: {
      good: { label: 'Uygun görünüyor', text: 'Uçuş penceresinde hafif rüzgâr ve açık hava.' },
      borderline: { label: 'Sınırda', text: 'Biraz rüzgâr, hamle ya da pus var. İki yöne de gidebilir.' },
      poor: { label: 'Zayıf ihtimal', text: 'Rüzgâr, yağış ya da kötü görüş. Böyle havada uçuşlar çoğu zaman iptal olur.' },
    },
    notOfficial: 'Bu bir hava tahmini, resmî karar değil.',
    unavailable: 'Hava tahmini şu an alınamıyor. Biraz sonra tekrar bakın.',
    window: (window) => `Uçuş penceresi ${window}`,
    wind: (kmh) => `Rüzgâr ${kmh} km/sa`,
    gusts: (kmh) => `hamle ${kmh} km/sa`,
    visibility: (km) => `görüş ${km} km`,
    rain: (mm) => `yağış ${mm} mm`,
    updated: (time) => `Tahmin güncellemesi: ${time}`,
    howTitle: 'Bir sabahı nasıl değerlendiriyoruz',
    howText:
      'Gün doğumundan 30 dakika önceden iki saat sonrasına kadarki saatlere bakıyoruz. Durgun hava (rüzgâr yaklaşık 12 km/sa’e, hamle 20 km/sa’e kadar), iyi görüş ve yağışsız hava uygun görünür. Kuvvetli rüzgâr ya da hamle, sis, yağmur veya fırtına uçuşu zorlaştırır. Bu sınırlar resmî kural değil, bizim varsayımımız. Her gün gerçek kararlarla karşılaştırıyoruz.',
    track: (flew, total) => `“Uygun görünüyor” dediğimiz ${total} sabahın ${flew} tanesinde balonlar uçtu.`,
    trackPending: (since) =>
      `Tahminlerimizi kayda geçirmeye başladığımız tarih: ${since}. Yeterince sabah geçince isabet oranımızı burada göstereceğiz.`,
    attribution: 'Hava durumu verisi: Open-Meteo.com',
  },

  history: {
    title: 'Kapadokya balon uçuş geçmişi: balonlar hangi sabahlar uçtu',
    description:
      'Kapadokya’daki resmî balon bayraklarının gün gün, bölge bölge kaydı. Veriler Slot Hizmet Merkezi sayfasından alınır.',
    h1: 'Uçuş geçmişi',
    intro:
      'Resmî sayfadan kaydettiğimiz bütün bayraklar, en yeniden eskiye. Gün doğumu uçuşları için önemli olan sabah penceresi.',
    startNote: (date) => `İlk kayıt: ${date}.`,
    empty: 'Henüz kayıt yok.',
    morning: 'Sabah uçuşları',
    laterWindows: 'Günün devamı',
    window: 'Pencere',
    rawData: 'Ham veriler GitHub’da herkese açık.',
  },

  guides: {
    title: 'Kapadokya balon rehberleri',
    description: 'Kapadokya’da balon uçuşlarına nasıl karar verildiğini ve uçuş iptal olunca ne yapılacağını anlatan kısa rehberler.',
    h1: 'Rehberler',
    intro: 'Kapadokya’da erken kalkmadan önce bilmeye değer şeyler.',
    updated: (date) => `Güncelleme: ${date}`,
    mapCaption: 'Resmî haritadan çizilmiş üç uçuş bölgesi ve şu anki bayrakları.',
  },

  footer: {
    independent: 'Bağımsız bir sayfa. Sivil Havacılık, Kapadokya Üniversitesi ya da herhangi bir balon şirketiyle bağı yok.',
    source: 'Resmî bayrak sayfası',
    data: 'GitHub’daki veriler',
  },

  langHint: 'Bu sayfayı Türkçe okuyun',
  dismiss: 'Kapat',

  notFound: {
    title: 'Sayfa bulunamadı',
    text: 'Burada bir şey yok, ama bugünkü balon durumu bir tık uzağınızda.',
    back: 'Bugünkü durumu gör',
  },
} satisfies Messages;
