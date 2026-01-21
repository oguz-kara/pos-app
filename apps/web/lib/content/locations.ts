// Location-based content for programmatic SEO
// Data sourced from TÜİK (Turkish Statistical Institute) 2023-2024

export interface Location {
  id: string;
  slug: string;
  name: string;
  type: "neighborhood" | "district";
  district?: string; // If type is neighborhood, which district it belongs to
  population: number;
  area?: number; // in km²
  description: string;
  characteristics: string[];
  landmarks?: string[];
  keywords: string[];
  priority: 1 | 2 | 3 | 4 | 5; // 1 = highest priority for SEO
  distance: {
    fromEvka3Km: number;
    deliveryZone: "immediate" | "same-day" | "next-day";
  };
  seo: {
    title: string;
    description: string;
    h1: string;
    keywords: string[];
  };
}

// ============================================================================
// BORNOVA NEIGHBORHOODS (43 active neighborhoods)
// Sorted by population (highest to lowest)
// ============================================================================

export const BORNOVA_NEIGHBORHOODS: Location[] = [
  {
    id: "erzene",
    slug: "erzene",
    name: "Erzene",
    type: "neighborhood",
    district: "Bornova",
    population: 36012,
    area: 16.885,
    description:
      "Bornova'nın en kalabalık mahallesi Erzene, modern konut projeleri ve gelişmiş sosyal donatı alanlarıyla öne çıkar.",
    characteristics: [
      "Bornova'nın en büyük mahallesi",
      "Modern konut projeleri",
      "Site yönetimleri yoğun",
      "Gelişmiş altyapı",
    ],
    landmarks: ["Erzene Parkı", "Migros AVM", "Konutlar Sitesi"],
    keywords: [
      "çiçekçi erzene",
      "nalbur erzene",
      "hırdavat erzene",
      "fidanlık erzene bornova",
    ],
    priority: 1,
    distance: {
      fromEvka3Km: 2.5,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Erzene Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Erzene'ye Evka 3'ten çiçek, fidan ve hırdavat teslimatı. Bornova'nın en kalabalık mahallesine aynı gün servis. 0545 653 45 99",
      h1: "Erzene'nin Güvenilir Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi erzene",
        "nalbur erzene bornova",
        "hırdavat erzene",
        "erzene çiçek teslimat",
      ],
    },
  },
  {
    id: "kazimdirik",
    slug: "kazimdirik",
    name: "Kazımdirik",
    type: "neighborhood",
    district: "Bornova",
    population: 35318,
    area: 5.004,
    description:
      "Ege Üniversitesi kampüsüne komşu Kazımdirik, öğrenci ve akademisyen nüfusunun yoğun olduğu merkezi bir mahalledir.",
    characteristics: [
      "Üniversite bölgesi",
      "Yüksek öğrenci nüfusu",
      "Merkezi konum",
      "Tarihi dokulu",
    ],
    landmarks: [
      "Ege Üniversitesi Kampüsü",
      "Kazımdirik Parkı",
      "Bostanlı Camii",
    ],
    keywords: [
      "çiçekçi kazımdirik",
      "nalbur kazımdirik",
      "kazımdirik bornova çiçekçi",
      "üniversite yakını hırdavat",
    ],
    priority: 1,
    distance: {
      fromEvka3Km: 3.0,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Kazımdirik Bornova | Üniversite Yakını - Kara Ticaret",
      description:
        "Kazımdirik'e Ege Üniversitesi yakınına çiçek ve hırdavat teslimatı. Öğrencilere özel hizmet. Evka 3'ten 15 dakika. 0545 653 45 99",
      h1: "Kazımdirik'in Güvenilir Çiçekçisi",
      keywords: [
        "çiçekçi kazımdirik",
        "nalbur kazımdirik bornova",
        "ege üniversitesi çiçekçi",
      ],
    },
  },
  {
    id: "yesilova",
    slug: "yesilova",
    name: "Yeşilova",
    type: "neighborhood",
    district: "Bornova",
    population: 29751,
    area: 1.311,
    description:
      "Yüksek nüfus yoğunluğuyla dikkat çeken Yeşilova, apartman ve site yaşamının hareketli olduğu modern bir mahalledir.",
    characteristics: [
      "Yüksek nüfus yoğunluğu",
      "Apartman hayatı yaygın",
      "Merkeze yakın",
      "Aktif ticaret bölgesi",
    ],
    landmarks: ["Yeşilova Çarşısı", "Bornova Metro İstasyonu (yakın)"],
    keywords: [
      "çiçekçi yeşilova",
      "nalbur yeşilova bornova",
      "yeşilova hırdavat",
    ],
    priority: 1,
    distance: {
      fromEvka3Km: 2.0,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Yeşilova Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Yeşilova'ya çiçek, fidan ve yapı malzemesi teslimatı. 30.000 kişilik mahalleye hızlı servis. Evka 3'ten 10 dakika. 0545 653 45 99",
      h1: "Yeşilova'nın Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi yeşilova bornova",
        "nalbur yeşilova",
        "yeşilova çiçek teslimat",
      ],
    },
  },
  {
    id: "ataturk",
    slug: "ataturk",
    name: "Atatürk",
    type: "neighborhood",
    district: "Bornova",
    population: 27501,
    area: 2.564,
    description:
      "Bornova'nın merkezi lokasyonlarından Atatürk Mahallesi, ticari ve konut alanlarının iç içe olduğu hareketli bir bölgedir.",
    characteristics: [
      "Merkezi konum",
      "Ticari yaşam aktif",
      "Kolay ulaşım",
      "Karışık yerleşim",
    ],
    landmarks: ["Bornova Meydanı", "Atatürk Caddesi"],
    keywords: [
      "çiçekçi atatürk bornova",
      "nalbur atatürk mahallesi",
      "atatürk bornova hırdavat",
    ],
    priority: 1,
    distance: {
      fromEvka3Km: 1.5,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Atatürk Mahallesi Bornova | Kara Ticaret",
      description:
        "Atatürk Mahallesi'ne çiçek ve hırdavat teslimatı. Bornova merkezine en yakın. Evka 3'ten 10 dakika. 0545 653 45 99",
      h1: "Atatürk Mahallesi'nin Çiçekçisi",
      keywords: [
        "çiçekçi atatürk bornova",
        "nalbur atatürk mahallesi",
        "bornova merkez çiçekçi",
      ],
    },
  },
  {
    id: "inonu",
    slug: "inonu",
    name: "İnönü",
    type: "neighborhood",
    district: "Bornova",
    population: 24742,
    area: 1.759,
    description:
      "İnönü Mahallesi, Bornova'nın yoğun nüfuslu ve gelişmiş konut bölgelerinden biridir.",
    characteristics: [
      "Yoğun konut alanı",
      "Site yaşamı",
      "Gelişmiş sosyal tesis",
      "Aile mahallesi",
    ],
    landmarks: ["İnönü Parkı", "Siteler Bölgesi"],
    keywords: ["çiçekçi inönü bornova", "nalbur inönü", "inönü hırdavat"],
    priority: 2,
    distance: {
      fromEvka3Km: 2.8,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi İnönü Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "İnönü Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Site yönetimlerine özel hizmet. 0545 653 45 99",
      h1: "İnönü Mahallesi Çiçekçisi ve Hırdavatı",
      keywords: ["çiçekçi inönü bornova", "nalbur inönü mahallesi"],
    },
  },
  {
    id: "mevlana",
    slug: "mevlana",
    name: "Mevlana",
    type: "neighborhood",
    district: "Bornova",
    population: 23284,
    area: 1.656,
    description:
      "Mevlana Mahallesi, modern konut projeleri ve gelişmiş altyapısıyla tercih edilen bir yerleşim bölgesidir.",
    characteristics: [
      "Modern yerleşim",
      "Yeni konutlar",
      "Planlı yapılaşma",
      "Gelişmiş altyapı",
    ],
    landmarks: ["Mevlana Konutları", "Park Alanları"],
    keywords: ["çiçekçi mevlana bornova", "nalbur mevlana", "mevlana hırdavat"],
    priority: 2,
    distance: {
      fromEvka3Km: 3.5,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Mevlana Bornova | Hırdavat Malzemeleri - Kara Ticaret",
      description:
        "Mevlana Mahallesi'ne çiçek ve hırdavat teslimatı. Modern konutlara özel servis. Evka 3'ten hızlı ulaşım. 0545 653 45 99",
      h1: "Mevlana Mahallesi'nin Çiçekçisi",
      keywords: ["çiçekçi mevlana bornova", "nalbur mevlana mahallesi"],
    },
  },
  {
    id: "doganlar",
    slug: "doganlar",
    name: "Doğanlar",
    type: "neighborhood",
    district: "Bornova",
    population: 20798,
    area: 2.689,
    description:
      "Doğanlar Mahallesi, Bornova'nın yerleşik ailelerinin yaşadığı sakin ve düzenli bir bölgedir.",
    characteristics: [
      "Yerleşik nüfus",
      "Sakin mahalle",
      "Aile odaklı",
      "Düzenli yerleşim",
    ],
    landmarks: ["Doğanlar Parkı"],
    keywords: ["çiçekçi doğanlar bornova", "nalbur doğanlar", "doğanlar hırdavat"],
    priority: 2,
    distance: {
      fromEvka3Km: 4.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Doğanlar Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Doğanlar Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Doğanlar'ın Güvenilir Çiçekçisi",
      keywords: ["çiçekçi doğanlar bornova", "nalbur doğanlar"],
    },
  },
  {
    id: "evka-3",
    slug: "evka-3",
    name: "Evka 3",
    type: "neighborhood",
    district: "Bornova",
    population: 20520,
    area: 2.809,
    description:
      "Mağazamızın bulunduğu Evka 3, Bornova'nın merkezi lokasyonlarından biridir. Modern siteler ve gelişmiş sosyal donatı alanlarıyla öne çıkar.",
    characteristics: [
      "Mağazamızın merkezi",
      "Modern siteler",
      "Migros AVM yakını",
      "Gelişmiş altyapı",
      "Kolay ulaşım",
    ],
    landmarks: [
      "Kara Ticaret Mağazası",
      "Migros AVM",
      "Cengiz Han Caddesi",
      "Evka 3 Sitesi",
    ],
    keywords: [
      "çiçekçi evka 3",
      "nalbur evka 3",
      "hırdavat evka 3",
      "fidanlık evka 3 bornova",
      "evka 3 çiçek",
    ],
    priority: 1,
    distance: {
      fromEvka3Km: 0,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Evka 3 Bornova | Kara Ticaret Mağazası",
      description:
        "Evka 3'te bulunan çiçekçi ve hırdavat mağazamız. 9 yıldır komşunuz. Saksılı bitkiler, fidanlar ve yapı malzemeleri. Her gün 22:00'a kadar açık. 0545 653 45 99",
      h1: "Evka 3'ün Köklü Çiçekçisi ve Hırdavatı - Kara Ticaret",
      keywords: [
        "çiçekçi evka 3",
        "nalbur evka 3 bornova",
        "hırdavat evka 3",
        "evka 3 fidanlık",
        "kara ticaret evka 3",
      ],
    },
  },
  {
    id: "rafet-pasa",
    slug: "rafet-pasa",
    name: "Rafet Paşa",
    type: "neighborhood",
    district: "Bornova",
    population: 19866,
    area: 0.698,
    description:
      "Rafet Paşa, Bornova'nın en yoğun mahallelerinden biridir. Küçük alanına rağmen yüksek nüfus barındırır.",
    characteristics: [
      "Yüksek nüfus yoğunluğu",
      "Merkezi konum",
      "Kompakt yerleşim",
      "Aktif ticaret",
    ],
    landmarks: ["Rafet Paşa Çarşısı"],
    keywords: [
      "çiçekçi rafet paşa",
      "nalbur rafet paşa bornova",
      "rafet paşa hırdavat",
    ],
    priority: 2,
    distance: {
      fromEvka3Km: 1.8,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Rafet Paşa Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Rafet Paşa'ya çiçek ve hırdavat teslimatı. Yoğun nüfuslu mahallemize hızlı servis. Evka 3'ten 15 dakika. 0545 653 45 99",
      h1: "Rafet Paşa'nın Çiçekçisi",
      keywords: ["çiçekçi rafet paşa bornova", "nalbur rafet paşa"],
    },
  },
  {
    id: "kizilay",
    slug: "kizilay",
    name: "Kızılay",
    type: "neighborhood",
    district: "Bornova",
    population: 15029,
    area: 1.242,
    description:
      "Kızılay Mahallesi, Bornova'nın düzenli ve planlı yerleşim alanlarından biridir.",
    characteristics: [
      "Düzenli yerleşim",
      "Orta yoğunluk",
      "Konut ağırlıklı",
      "Sakin ortam",
    ],
    landmarks: ["Kızılay Parkı"],
    keywords: ["çiçekçi kızılay bornova", "nalbur kızılay", "kızılay hırdavat"],
    priority: 2,
    distance: {
      fromEvka3Km: 3.2,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Kızılay Bornova | Hırdavat Malzemeleri - Kara Ticaret",
      description:
        "Kızılay Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Düzenli mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Kızılay Mahallesi Çiçekçisi",
      keywords: ["çiçekçi kızılay bornova", "nalbur kızılay mahallesi"],
    },
  },
  {
    id: "evka-4",
    slug: "evka-4",
    name: "Evka 4",
    type: "neighborhood",
    district: "Bornova",
    population: 14824,
    area: 0.979,
    description:
      "Evka 3'ün komşusu Evka 4, modern siteler ve gelişmiş sosyal tesisleriyle dikkat çeker.",
    characteristics: [
      "Evka 3'e komşu",
      "Modern konutlar",
      "Site yaşamı",
      "Yüksek yaşam kalitesi",
    ],
    landmarks: ["Evka 4 Sitesi", "Park Alanları"],
    keywords: ["çiçekçi evka 4", "nalbur evka 4 bornova", "evka 4 hırdavat"],
    priority: 1,
    distance: {
      fromEvka3Km: 0.5,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Evka 4 Bornova | Komşu Mahalle - Kara Ticaret",
      description:
        "Evka 4'e Evka 3'ten çiçek ve hırdavat teslimatı. Komşu mahallelerimize 5 dakikada servis. 0545 653 45 99",
      h1: "Evka 4'ün Çiçekçisi - Evka 3'ten Hizmet",
      keywords: ["çiçekçi evka 4", "nalbur evka 4", "evka 4 bornova çiçekçi"],
    },
  },
  {
    id: "gazi-osman-pasa",
    slug: "gazi-osman-pasa",
    name: "Gazi Osman Paşa",
    type: "neighborhood",
    district: "Bornova",
    population: 13989,
    area: 0.586,
    description:
      "Gazi Osman Paşa, kompakt yapısıyla yoğun bir yerleşim alanıdır.",
    characteristics: [
      "Yoğun yerleşim",
      "Merkeze yakın",
      "Apartman hayatı",
      "Ticari yaşam",
    ],
    landmarks: ["Gazi Osman Paşa Çarşısı"],
    keywords: [
      "çiçekçi gazi osman paşa",
      "nalbur gazi osman paşa bornova",
      "gazi osman paşa hırdavat",
    ],
    priority: 2,
    distance: {
      fromEvka3Km: 2.2,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Gazi Osman Paşa Bornova | Nalbur - Kara Ticaret",
      description:
        "Gazi Osman Paşa'ya çiçek ve hırdavat teslimatı. Merkeze yakın mahalleye hızlı servis. 0545 653 45 99",
      h1: "Gazi Osman Paşa Çiçekçisi",
      keywords: ["çiçekçi gazi osman paşa", "nalbur gazi osman paşa"],
    },
  },
  {
    id: "barbaros",
    slug: "barbaros",
    name: "Barbaros",
    type: "neighborhood",
    district: "Bornova",
    population: 11943,
    area: 0.454,
    description:
      "Barbaros Mahallesi, Bornova'nın merkezi bölgelerinden biridir.",
    characteristics: [
      "Merkezi konum",
      "Kompakt alan",
      "Konut yoğun",
      "Aktif yerleşim",
    ],
    landmarks: ["Barbaros Meydanı"],
    keywords: ["çiçekçi barbaros bornova", "nalbur barbaros", "barbaros hırdavat"],
    priority: 3,
    distance: {
      fromEvka3Km: 2.0,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Barbaros Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Barbaros Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Merkezi mahallelerimize aynı gün servis. 0545 653 45 99",
      h1: "Barbaros Mahallesi Çiçekçisi",
      keywords: ["çiçekçi barbaros bornova", "nalbur barbaros"],
    },
  },
  {
    id: "kemalpasa",
    slug: "kemalpasa",
    name: "Kemalpaşa",
    type: "neighborhood",
    district: "Bornova",
    population: 11535,
    area: 1.986,
    description:
      "Kemalpaşa Mahallesi, Bornova'nın sakin ve yerleşik ailelerinin yaşadığı bir bölgedir.",
    characteristics: [
      "Sakin mahalle",
      "Yerleşik aileler",
      "Düzenli yapı",
      "Yeşil alanlar",
    ],
    landmarks: ["Kemalpaşa Parkı"],
    keywords: [
      "çiçekçi kemalpaşa bornova",
      "nalbur kemalpaşa",
      "kemalpaşa hırdavat",
    ],
    priority: 3,
    distance: {
      fromEvka3Km: 3.8,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Kemalpaşa Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Kemalpaşa Mahallesi'ne çiçek ve hırdavat teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Kemalpaşa Mahallesi Çiçekçisi",
      keywords: ["çiçekçi kemalpaşa bornova", "nalbur kemalpaşa"],
    },
  },
  {
    id: "gurpinar",
    slug: "gurpinar",
    name: "Gürpınar",
    type: "neighborhood",
    district: "Bornova",
    population: 11458,
    area: 10.319,
    description:
      "Gürpınar, geniş alanıyla Bornova'nın kırsal karakterli mahallelerinden biridir.",
    characteristics: [
      "Geniş alan",
      "Düşük yoğunluk",
      "Kırsal karakter",
      "Müstakil evler",
    ],
    landmarks: ["Gürpınar Mevkii"],
    keywords: ["çiçekçi gürpınar bornova", "nalbur gürpınar", "gürpınar hırdavat"],
    priority: 3,
    distance: {
      fromEvka3Km: 7.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Gürpınar Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Gürpınar'a çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Gürpınar'ın Çiçekçisi",
      keywords: ["çiçekçi gürpınar bornova", "nalbur gürpınar"],
    },
  },
  {
    id: "ergene",
    slug: "ergene",
    name: "Ergene",
    type: "neighborhood",
    district: "Bornova",
    population: 11155,
    area: 0.581,
    description:
      "Ergene Mahallesi, Bornova'nın yoğun nüfuslu kompakt mahallelerinden biridir.",
    characteristics: [
      "Yoğun yerleşim",
      "Küçük alan",
      "Apartman yaşamı",
      "Merkeze yakın",
    ],
    landmarks: ["Ergene Sokakları"],
    keywords: ["çiçekçi ergene bornova", "nalbur ergene", "ergene hırdavat"],
    priority: 3,
    distance: {
      fromEvka3Km: 2.5,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Ergene Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Ergene Mahallesi'ne çiçek ve hırdavat teslimatı. Kompakt mahallelerimize hızlı servis. 0545 653 45 99",
      h1: "Ergene Mahallesi Çiçekçisi",
      keywords: ["çiçekçi ergene bornova", "nalbur ergene"],
    },
  },
  {
    id: "zafer",
    slug: "zafer",
    name: "Zafer",
    type: "neighborhood",
    district: "Bornova",
    population: 10523,
    area: 0.527,
    description:
      "Zafer Mahallesi, Bornova'nın merkezi lokasyonlarından biridir.",
    characteristics: [
      "Merkezi konum",
      "Konut yoğun",
      "Ticari alan",
      "Kolay ulaşım",
    ],
    landmarks: ["Zafer Meydanı"],
    keywords: ["çiçekçi zafer bornova", "nalbur zafer", "zafer hırdavat"],
    priority: 3,
    distance: {
      fromEvka3Km: 2.8,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Zafer Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Zafer Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Merkezi mahallelerimize aynı gün servis. 0545 653 45 99",
      h1: "Zafer Mahallesi Çiçekçisi",
      keywords: ["çiçekçi zafer bornova", "nalbur zafer mahallesi"],
    },
  },
  {
    id: "naldoken",
    slug: "naldoken",
    name: "Naldöken",
    type: "neighborhood",
    district: "Bornova",
    population: 9320,
    area: 4.762,
    description:
      "Naldöken, Bornova'nın daha sakin ve açık alanları olan mahallelerinden biridir.",
    characteristics: [
      "Sakin bölge",
      "Orta yoğunluk",
      "Açık alanlar",
      "Bahçeli evler",
    ],
    landmarks: ["Naldöken Mevkii"],
    keywords: ["çiçekçi naldöken bornova", "nalbur naldöken", "naldöken hırdavat"],
    priority: 3,
    distance: {
      fromEvka3Km: 5.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Naldöken Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Naldöken'e çiçek, fidan ve yapı malzemesi teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Naldöken'in Çiçekçisi",
      keywords: ["çiçekçi naldöken bornova", "nalbur naldöken"],
    },
  },
  {
    id: "meric",
    slug: "meric",
    name: "Meriç",
    type: "neighborhood",
    district: "Bornova",
    population: 8503,
    area: 1.383,
    description:
      "Meriç Mahallesi, Bornova'nın konut ağırlıklı mahallelerinden biridir.",
    characteristics: ["Konut ağırlıklı", "Sakin ortam", "Aile mahallesi", "Düzenli"],
    landmarks: ["Meriç Parkı"],
    keywords: ["çiçekçi meriç bornova", "nalbur meriç", "meriç hırdavat"],
    priority: 3,
    distance: {
      fromEvka3Km: 3.5,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Meriç Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Meriç Mahallesi'ne çiçek ve hırdavat teslimatı. Konut mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Meriç Mahallesi Çiçekçisi",
      keywords: ["çiçekçi meriç bornova", "nalbur meriç"],
    },
  },
  {
    id: "kosukavak",
    slug: "kosukavak",
    name: "Koşukavak",
    type: "neighborhood",
    district: "Bornova",
    population: 8066,
    area: 0.292,
    description:
      "Koşukavak, küçük alanına rağmen yoğun bir yerleşim karakterine sahiptir.",
    characteristics: [
      "Kompakt alan",
      "Yoğun yerleşim",
      "Apartman hayatı",
      "Ticari aktif",
    ],
    landmarks: ["Koşukavak Çarşısı"],
    keywords: [
      "çiçekçi koşukavak bornova",
      "nalbur koşukavak",
      "koşukavak hırdavat",
    ],
    priority: 3,
    distance: {
      fromEvka3Km: 2.3,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Koşukavak Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Koşukavak'a çiçek ve hırdavat teslimatı. Kompakt mahallelerimize hızlı servis. 0545 653 45 99",
      h1: "Koşukavak Mahallesi Çiçekçisi",
      keywords: ["çiçekçi koşukavak bornova", "nalbur koşukavak"],
    },
  },
  {
    id: "karacaoglan",
    slug: "karacaoglan",
    name: "Karacaoğlan",
    type: "neighborhood",
    district: "Bornova",
    population: 7991,
    area: 2.854,
    description:
      "Karacaoğlan Mahallesi, Bornova'nın sakin ve düzenli mahallelerinden biridir.",
    characteristics: [
      "Sakin mahalle",
      "Orta yoğunluk",
      "Düzenli yerleşim",
      "Yeşil alanlar",
    ],
    landmarks: ["Karacaoğlan Parkı"],
    keywords: [
      "çiçekçi karacaoğlan bornova",
      "nalbur karacaoğlan",
      "karacaoğlan hırdavat",
    ],
    priority: 4,
    distance: {
      fromEvka3Km: 4.2,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Karacaoğlan Bornova | Hırdavat - Kara Ticaret",
      description:
        "Karacaoğlan Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Karacaoğlan Mahallesi Çiçekçisi",
      keywords: ["çiçekçi karacaoğlan bornova", "nalbur karacaoğlan"],
    },
  },
  {
    id: "serintepe",
    slug: "serintepe",
    name: "Serintepe",
    type: "neighborhood",
    district: "Bornova",
    population: 7320,
    area: 0.313,
    description:
      "Serintepe, Bornova'nın kompakt ve yoğun mahallelerinden biridir.",
    characteristics: [
      "Kompakt alan",
      "Yoğun yerleşim",
      "Apartman bölgesi",
      "Merkeze yakın",
    ],
    landmarks: ["Serintepe Sokakları"],
    keywords: [
      "çiçekçi serintepe bornova",
      "nalbur serintepe",
      "serintepe hırdavat",
    ],
    priority: 4,
    distance: {
      fromEvka3Km: 2.7,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Serintepe Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Serintepe'ye çiçek ve hırdavat teslimatı. Merkeze yakın mahallelerimize hızlı servis. 0545 653 45 99",
      h1: "Serintepe Mahallesi Çiçekçisi",
      keywords: ["çiçekçi serintepe bornova", "nalbur serintepe"],
    },
  },
  {
    id: "birlik",
    slug: "birlik",
    name: "Birlik",
    type: "neighborhood",
    district: "Bornova",
    population: 7255,
    area: 0.377,
    description:
      "Birlik Mahallesi, Bornova'nın merkezi lokasyonlarından biridir.",
    characteristics: [
      "Merkezi konum",
      "Konut yoğun",
      "Ticari alan",
      "Apartman hayatı",
    ],
    landmarks: ["Birlik Meydanı"],
    keywords: ["çiçekçi birlik bornova", "nalbur birlik", "birlik hırdavat"],
    priority: 4,
    distance: {
      fromEvka3Km: 2.0,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Birlik Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Birlik Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Merkezi mahallelerimize aynı gün servis. 0545 653 45 99",
      h1: "Birlik Mahallesi Çiçekçisi",
      keywords: ["çiçekçi birlik bornova", "nalbur birlik"],
    },
  },
  {
    id: "camkule",
    slug: "camkule",
    name: "Çamkule",
    type: "neighborhood",
    district: "Bornova",
    population: 6741,
    area: 0.712,
    description:
      "Çamkule Mahallesi, Bornova'nın sakin ve düzenli mahallelerinden biridir.",
    characteristics: ["Sakin ortam", "Orta yoğunluk", "Konut alanı", "Düzenli"],
    landmarks: ["Çamkule Parkı"],
    keywords: ["çiçekçi çamkule bornova", "nalbur çamkule", "çamkule hırdavat"],
    priority: 4,
    distance: {
      fromEvka3Km: 3.0,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Çamkule Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Çamkule Mahallesi'ne çiçek ve hırdavat teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Çamkule Mahallesi Çiçekçisi",
      keywords: ["çiçekçi çamkule bornova", "nalbur çamkule"],
    },
  },
  {
    id: "yildirim-beyazit",
    slug: "yildirim-beyazit",
    name: "Yıldırım Beyazıt",
    type: "neighborhood",
    district: "Bornova",
    population: 6601,
    area: 0.224,
    description:
      "Yıldırım Beyazıt, Bornova'nın kompakt ve yoğun mahallelerinden biridir.",
    characteristics: [
      "Çok kompakt",
      "Yüksek yoğunluk",
      "Apartman bölgesi",
      "Merkezi",
    ],
    landmarks: ["Yıldırım Beyazıt Meydanı"],
    keywords: [
      "çiçekçi yıldırım beyazıt bornova",
      "nalbur yıldırım beyazıt",
      "yıldırım beyazıt hırdavat",
    ],
    priority: 4,
    distance: {
      fromEvka3Km: 2.5,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Yıldırım Beyazıt Bornova | Nalbur - Kara Ticaret",
      description:
        "Yıldırım Beyazıt Mahallesi'ne çiçek ve hırdavat teslimatı. Kompakt mahallelerimize hızlı servis. 0545 653 45 99",
      h1: "Yıldırım Beyazıt Mahallesi Çiçekçisi",
      keywords: ["çiçekçi yıldırım beyazıt", "nalbur yıldırım beyazıt bornova"],
    },
  },
  {
    id: "cinar",
    slug: "cinar",
    name: "Çınar",
    type: "neighborhood",
    district: "Bornova",
    population: 4591,
    area: 0.245,
    description:
      "Çınar Mahallesi, Bornova'nın sakin ve düşük yoğunluklu mahallelerinden biridir.",
    characteristics: ["Sakin mahalle", "Düşük yoğunluk", "Konut alanı", "Huzurlu"],
    landmarks: ["Çınar Sokakları"],
    keywords: ["çiçekçi çınar bornova", "nalbur çınar", "çınar hırdavat"],
    priority: 4,
    distance: {
      fromEvka3Km: 3.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Çınar Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Çınar Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Çınar Mahallesi Çiçekçisi",
      keywords: ["çiçekçi çınar bornova", "nalbur çınar"],
    },
  },
  {
    id: "umit",
    slug: "umit",
    name: "Ümit",
    type: "neighborhood",
    district: "Bornova",
    population: 4399,
    area: 0.85,
    description:
      "Ümit Mahallesi, Bornova'nın sakin konut mahallelerinden biridir.",
    characteristics: ["Sakin ortam", "Düşük yoğunluk", "Aile mahallesi", "Huzurlu"],
    landmarks: ["Ümit Parkı"],
    keywords: ["çiçekçi ümit bornova", "nalbur ümit", "ümit hırdavat"],
    priority: 4,
    distance: {
      fromEvka3Km: 4.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Ümit Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Ümit Mahallesi'ne çiçek ve hırdavat teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Ümit Mahallesi Çiçekçisi",
      keywords: ["çiçekçi ümit bornova", "nalbur ümit"],
    },
  },
  {
    id: "yesilcam",
    slug: "yesilcam",
    name: "Yeşilçam",
    type: "neighborhood",
    district: "Bornova",
    population: 4046,
    area: 0.774,
    description:
      "Yeşilçam Mahallesi, Bornova'nın yeşil alanlarıyla dikkat çeken sakin bir mahallesidir.",
    characteristics: [
      "Yeşil alanlar",
      "Sakin ortam",
      "Düşük yoğunluk",
      "Bahçeli evler",
    ],
    landmarks: ["Yeşilçam Parkı"],
    keywords: ["çiçekçi yeşilçam bornova", "nalbur yeşilçam", "yeşilçam hırdavat"],
    priority: 4,
    distance: {
      fromEvka3Km: 4.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Yeşilçam Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Yeşilçam Mahallesi'ne çiçek, fidan ve yapı malzemesi teslimatı. Yeşil mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Yeşilçam Mahallesi Çiçekçisi",
      keywords: ["çiçekçi yeşilçam bornova", "nalbur yeşilçam"],
    },
  },
  {
    id: "kavaklidere",
    slug: "kavaklidere",
    name: "Kavaklıdere",
    type: "neighborhood",
    district: "Bornova",
    population: 2952,
    area: 0,
    description:
      "Kavaklıdere, Bornova'nın küçük ve sakin mahallelerinden biridir.",
    characteristics: ["Küçük mahalle", "Sakin ortam", "Düşük yoğunluk", "Huzurlu"],
    landmarks: ["Kavaklıdere Mevkii"],
    keywords: [
      "çiçekçi kavaklıdere bornova",
      "nalbur kavaklıdere",
      "kavaklıdere hırdavat",
    ],
    priority: 5,
    distance: {
      fromEvka3Km: 5.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Kavaklıdere Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Kavaklıdere'ye çiçek ve hırdavat teslimatı. Küçük mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Kavaklıdere Mahallesi Çiçekçisi",
      keywords: ["çiçekçi kavaklıdere bornova", "nalbur kavaklıdere"],
    },
  },
  {
    id: "yunus-emre",
    slug: "yunus-emre",
    name: "Yunus Emre",
    type: "neighborhood",
    district: "Bornova",
    population: 2800,
    area: 1.403,
    description:
      "Yunus Emre Mahallesi, Bornova'nın sakin ve düşük yoğunluklu mahallelerinden biridir.",
    characteristics: ["Sakin ortam", "Düşük yoğunluk", "Açık alanlar", "Huzurlu"],
    landmarks: ["Yunus Emre Parkı"],
    keywords: [
      "çiçekçi yunus emre bornova",
      "nalbur yunus emre",
      "yunus emre hırdavat",
    ],
    priority: 5,
    distance: {
      fromEvka3Km: 4.8,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Yunus Emre Bornova | Hırdavat - Kara Ticaret",
      description:
        "Yunus Emre Mahallesi'ne çiçek ve yapı malzemesi teslimatı. Sakin mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Yunus Emre Mahallesi Çiçekçisi",
      keywords: ["çiçekçi yunus emre bornova", "nalbur yunus emre"],
    },
  },
  {
    id: "isiklar",
    slug: "isiklar",
    name: "Işıklar",
    type: "neighborhood",
    district: "Bornova",
    population: 2555,
    area: 7.581,
    description:
      "Işıklar, geniş alanıyla Bornova'nın kırsal karakterli mahallelerinden biridir.",
    characteristics: [
      "Geniş alan",
      "Düşük yoğunluk",
      "Kırsal karakter",
      "Açık alanlar",
    ],
    landmarks: ["Işıklar Mevkii"],
    keywords: ["çiçekçi ışıklar bornova", "nalbur ışıklar", "ışıklar hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 8.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Işıklar Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Işıklar'a çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Işıklar Mahallesi Çiçekçisi",
      keywords: ["çiçekçi ışıklar bornova", "nalbur ışıklar"],
    },
  },
  {
    id: "egemenlik",
    slug: "egemenlik",
    name: "Egemenlik",
    type: "neighborhood",
    district: "Bornova",
    population: 2542,
    area: 4.791,
    description:
      "Egemenlik Mahallesi, Bornova'nın geniş alanları olan mahallelerinden biridir.",
    characteristics: [
      "Geniş alan",
      "Düşük yoğunluk",
      "Açık alanlar",
      "Sakin ortam",
    ],
    landmarks: ["Egemenlik Mevkii"],
    keywords: [
      "çiçekçi egemenlik bornova",
      "nalbur egemenlik",
      "egemenlik hırdavat",
    ],
    priority: 5,
    distance: {
      fromEvka3Km: 6.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Egemenlik Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Egemenlik Mahallesi'ne çiçek ve hırdavat teslimatı. Geniş alanlı mahallelerimize özel hizmet. 0545 653 45 99",
      h1: "Egemenlik Mahallesi Çiçekçisi",
      keywords: ["çiçekçi egemenlik bornova", "nalbur egemenlik"],
    },
  },
  {
    id: "egridere",
    slug: "egridere",
    name: "Eğridere",
    type: "neighborhood",
    district: "Bornova",
    population: 1318,
    area: 2.49,
    description:
      "Eğridere, Bornova'nın küçük ve sakin mahallelerinden biridir.",
    characteristics: [
      "Küçük nüfus",
      "Çok sakin",
      "Kırsal karakter",
      "Doğal ortam",
    ],
    landmarks: ["Eğridere Mevkii"],
    keywords: ["çiçekçi eğridere bornova", "nalbur eğridere", "eğridere hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 7.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Eğridere Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Eğridere'ye çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Eğridere Mahallesi Çiçekçisi",
      keywords: ["çiçekçi eğridere bornova", "nalbur eğridere"],
    },
  },
  {
    id: "yakakoy",
    slug: "yakakoy",
    name: "Yakaköy",
    type: "neighborhood",
    district: "Bornova",
    population: 1058,
    area: 25.342,
    description:
      "Yakaköy, Bornova'nın en geniş alanına sahip kırsal karakterli mahallesidir.",
    characteristics: [
      "En geniş alan",
      "Çok düşük yoğunluk",
      "Kırsal yerleşim",
      "Köy karakteri",
    ],
    landmarks: ["Yakaköy Mevkii"],
    keywords: ["çiçekçi yakaköy bornova", "nalbur yakaköy", "yakaköy hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 12.0,
      deliveryZone: "next-day",
    },
    seo: {
      title: "Çiçekçi Yakaköy Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Yakaköy'e çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Yakaköy'ün Çiçekçisi",
      keywords: ["çiçekçi yakaköy bornova", "nalbur yakaköy"],
    },
  },
  {
    id: "karacam",
    slug: "karacam",
    name: "Karaçam",
    type: "neighborhood",
    district: "Bornova",
    population: 570,
    area: 12.013,
    description:
      "Karaçam, Bornova'nın kırsal karakterli küçük mahallelerinden biridir.",
    characteristics: [
      "Çok küçük nüfus",
      "Geniş alan",
      "Kırsal karakter",
      "Doğal ortam",
    ],
    landmarks: ["Karaçam Ormanı"],
    keywords: ["çiçekçi karaçam bornova", "nalbur karaçam", "karaçam hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 10.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Karaçam Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Karaçam'a çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Karaçam Mahallesi Çiçekçisi",
      keywords: ["çiçekçi karaçam bornova", "nalbur karaçam"],
    },
  },
  {
    id: "laka",
    slug: "laka",
    name: "Laka",
    type: "neighborhood",
    district: "Bornova",
    population: 406,
    area: 7.431,
    description: "Laka, Bornova'nın kırsal karakterli küçük mahallelerinden biridir.",
    characteristics: [
      "Çok küçük nüfus",
      "Geniş alan",
      "Kırsal yerleşim",
      "Doğal ortam",
    ],
    landmarks: ["Laka Mevkii"],
    keywords: ["çiçekçi laka bornova", "nalbur laka", "laka hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 9.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Laka Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Laka'ya çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Laka Mahallesi Çiçekçisi",
      keywords: ["çiçekçi laka bornova", "nalbur laka"],
    },
  },
  {
    id: "gokdere",
    slug: "gokdere",
    name: "Gökdere",
    type: "neighborhood",
    district: "Bornova",
    population: 367,
    area: 8.703,
    description:
      "Gökdere, Bornova'nın doğal güzellikleriyle dikkat çeken kırsal bir mahallesidir.",
    characteristics: [
      "Çok küçük nüfus",
      "Geniş alan",
      "Kırsal karakter",
      "Doğal güzellikler",
    ],
    landmarks: ["Gökdere Mevkii"],
    keywords: ["çiçekçi gökdere bornova", "nalbur gökdere", "gökdere hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 11.0,
      deliveryZone: "next-day",
    },
    seo: {
      title: "Çiçekçi Gökdere Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Gökdere'ye çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Gökdere Mahallesi Çiçekçisi",
      keywords: ["çiçekçi gökdere bornova", "nalbur gökdere"],
    },
  },
  {
    id: "cicekli",
    slug: "cicekli",
    name: "Çiçekli",
    type: "neighborhood",
    district: "Bornova",
    population: 346,
    area: 5.493,
    description:
      "Çiçekli, Bornova'nın kırsal karakterli küçük mahallelerinden biridir.",
    characteristics: [
      "Çok küçük nüfus",
      "Geniş alan",
      "Kırsal yerleşim",
      "Doğal ortam",
    ],
    landmarks: ["Çiçekli Mevkii"],
    keywords: ["çiçekçi çiçekli bornova", "nalbur çiçekli", "çiçekli hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 9.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Çiçekli Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Çiçekli Mahallesi'ne çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Çiçekli Mahallesi Çiçekçisi",
      keywords: ["çiçekçi çiçekli bornova", "nalbur çiçekli"],
    },
  },
  {
    id: "besyol",
    slug: "besyol",
    name: "Beşyol",
    type: "neighborhood",
    district: "Bornova",
    population: 278,
    area: 2.992,
    description:
      "Beşyol, Bornova'nın küçük ve sakin kırsal mahallelerinden biridir.",
    characteristics: [
      "Çok küçük nüfus",
      "Kırsal karakter",
      "Sakin ortam",
      "Doğal alan",
    ],
    landmarks: ["Beşyol Mevkii"],
    keywords: ["çiçekçi beşyol bornova", "nalbur beşyol", "beşyol hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 8.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Beşyol Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Beşyol'a çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Beşyol Mahallesi Çiçekçisi",
      keywords: ["çiçekçi beşyol bornova", "nalbur beşyol"],
    },
  },
  {
    id: "camici",
    slug: "camici",
    name: "Çamiçi",
    type: "neighborhood",
    district: "Bornova",
    population: 242,
    area: 6.938,
    description:
      "Çamiçi, Bornova'nın en küçük nüfuslu mahallelerinden biri olup kırsal karakterdedir.",
    characteristics: [
      "Çok küçük nüfus",
      "Geniş alan",
      "Kırsal yerleşim",
      "Doğal güzellik",
    ],
    landmarks: ["Çamiçi Mevkii"],
    keywords: ["çiçekçi çamiçi bornova", "nalbur çamiçi", "çamiçi hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 10.5,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Çamiçi Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Çamiçi'ye çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Çamiçi Mahallesi Çiçekçisi",
      keywords: ["çiçekçi çamiçi bornova", "nalbur çamiçi"],
    },
  },
  {
    id: "kayadibi",
    slug: "kayadibi",
    name: "Kayadibi",
    type: "neighborhood",
    district: "Bornova",
    population: 135,
    area: 12.258,
    description:
      "Kayadibi, Bornova'nın en küçük nüfuslu mahallelerinden biri olup geniş alanlı kırsal bir bölgedir.",
    characteristics: [
      "Çok küçük nüfus",
      "Çok geniş alan",
      "Kırsal karakter",
      "Doğal alan",
    ],
    landmarks: ["Kayadibi Mevkii"],
    keywords: ["çiçekçi kayadibi bornova", "nalbur kayadibi", "kayadibi hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 13.0,
      deliveryZone: "next-day",
    },
    seo: {
      title: "Çiçekçi Kayadibi Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Kayadibi'ye çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Kayadibi Mahallesi Çiçekçisi",
      keywords: ["çiçekçi kayadibi bornova", "nalbur kayadibi"],
    },
  },
  {
    id: "kurudere",
    slug: "kurudere",
    name: "Kurudere",
    type: "neighborhood",
    district: "Bornova",
    population: 55,
    area: 9.474,
    description:
      "Kurudere, Bornova'nın en küçük nüfuslu mahallelerinden biri olup tamamen kırsal karakterdedir.",
    characteristics: [
      "En küçük nüfus",
      "Geniş alan",
      "Kırsal yerleşim",
      "Doğal ortam",
    ],
    landmarks: ["Kurudere Mevkii"],
    keywords: ["çiçekçi kurudere bornova", "nalbur kurudere", "kurudere hırdavat"],
    priority: 5,
    distance: {
      fromEvka3Km: 14.0,
      deliveryZone: "next-day",
    },
    seo: {
      title: "Çiçekçi Kurudere Bornova | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Kurudere'ye çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Kurudere Mahallesi Çiçekçisi",
      keywords: ["çiçekçi kurudere bornova", "nalbur kurudere"],
    },
  },
  {
    id: "sarnickoy",
    slug: "sarnickoy",
    name: "Sarnıçköy",
    type: "neighborhood",
    district: "Bornova",
    population: 47,
    area: 3.575,
    description:
      "Sarnıçköy, Bornova'nın en küçük nüfuslu mahallesidir. Köy karakterindedir.",
    characteristics: [
      "En küçük nüfus",
      "Köy karakteri",
      "Kırsal yerleşim",
      "Doğal alan",
    ],
    landmarks: ["Sarnıçköy Mevkii"],
    keywords: [
      "çiçekçi sarnıçköy bornova",
      "nalbur sarnıçköy",
      "sarnıçköy hırdavat",
    ],
    priority: 5,
    distance: {
      fromEvka3Km: 15.0,
      deliveryZone: "next-day",
    },
    seo: {
      title: "Çiçekçi Sarnıçköy Bornova | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Sarnıçköy'e çiçek, fidan ve yapı malzemesi teslimatı. Kırsal bölgelere özel hizmet. 0545 653 45 99",
      h1: "Sarnıçköy'ün Çiçekçisi",
      keywords: ["çiçekçi sarnıçköy bornova", "nalbur sarnıçköy"],
    },
  },
];

// ============================================================================
// SERVICE DISTRICTS (8 districts)
// ============================================================================

export const SERVICE_DISTRICTS: Location[] = [
  {
    id: "bornova-district",
    slug: "bornova",
    name: "Bornova",
    type: "district",
    population: 448737,
    area: 220.0,
    description:
      "İzmir'in en büyük ilçelerinden Bornova, Ege Üniversitesi ve gelişmiş konut projelerine ev sahipliği yapar. Mağazamızın bulunduğu Evka 3, Bornova'nın merkezi lokasyonlarındandır.",
    characteristics: [
      "Ege Üniversitesi merkezi",
      "Yüksek nüfus yoğunluğu",
      "Gelişmiş altyapı",
      "Merkezi konum",
      "İzmir'in 3. büyük ilçesi",
    ],
    landmarks: [
      "Ege Üniversitesi",
      "Bornova Metro",
      "Optimum AVM",
      "Evka 3",
      "Kazımdirik",
    ],
    keywords: [
      "çiçekçi bornova",
      "nalbur bornova",
      "hırdavat bornova izmir",
      "fidanlık bornova",
      "bornova çiçek teslimat",
    ],
    priority: 1,
    distance: {
      fromEvka3Km: 0,
      deliveryZone: "immediate",
    },
    seo: {
      title: "Çiçekçi Bornova İzmir | Kara Ticaret Evka 3",
      description:
        "Bornova'nın güvenilir çiçekçisi ve nalburunuz. 43 mahalleye hızlı teslimat. Evka 3'te mağazamız. 9 yıllık tecrübe. 0545 653 45 99",
      h1: "Bornova'nın Köklü Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi bornova",
        "nalbur bornova izmir",
        "hırdavat bornova",
        "fidanlık bornova",
        "bornova yapı malzemeleri",
      ],
    },
  },
  {
    id: "bayrakli-district",
    slug: "bayrakli",
    name: "Bayraklı",
    type: "district",
    population: 299589,
    area: 38.7,
    description:
      "İzmir'in yeni finans ve iş merkezi Bayraklı, modern konut ve ofis projeleriyle hızla gelişiyor. Folkart Towers ve Mavişehir gibi önemli merkezlere ev sahipliği yapar.",
    characteristics: [
      "Finans merkezi",
      "Modern yapılaşma",
      "İş merkezleri",
      "Plaza bölgesi",
      "Yüksek gelir grubu",
    ],
    landmarks: [
      "Folkart Towers",
      "Mavişehir",
      "Bayraklı İş Merkezi",
      "Yapı Kredi Plaza",
    ],
    keywords: [
      "çiçekçi bayraklı",
      "ofis açılış çiçeği bayraklı",
      "nalbur bayraklı izmir",
      "bayraklı çiçek teslimat",
      "kurumsal çiçek bayraklı",
    ],
    priority: 2,
    distance: {
      fromEvka3Km: 8.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Bayraklı İzmir | Ofis Açılış Çiçeği Teslimatı",
      description:
        "Bayraklı'ya çiçek ve bitki teslimatı. Ofis açılışları için özel hizmet. Folkart Towers, Mavişehir bölgesi. Evka 3'ten aynı gün. 0545 653 45 99",
      h1: "Bayraklı'nın Çiçekçisi - Kurumsal Hizmet",
      keywords: [
        "çiçekçi bayraklı",
        "ofis açılış çiçeği bayraklı",
        "nalbur bayraklı",
        "kurumsal çiçek izmir",
      ],
    },
  },
  {
    id: "karsiyaka-district",
    slug: "karsiyaka",
    name: "Karşıyaka",
    type: "district",
    population: 341580,
    area: 51.3,
    description:
      "İzmir'in en sevilen ilçelerinden Karşıyaka, sahil şeridi ve eski mahalle dokusuyla tanınır. Karşıyaka Çarşısı ve Mavibahçe AVM gibi önemli ticaret merkezlerine sahiptir.",
    characteristics: [
      "Sahil şeridi",
      "Eski İzmir dokusu",
      "Yoğun ticari yaşam",
      "Kalabalık ilçe",
      "Kültürel merkez",
    ],
    landmarks: [
      "Karşıyaka Çarşısı",
      "Mavibahçe AVM",
      "Bostanlı Sahili",
      "Karşıyaka İskelesi",
    ],
    keywords: [
      "çiçekçi karşıyaka",
      "nalbur karşıyaka izmir",
      "hırdavat karşıyaka",
      "karşıyaka çiçek teslimat",
      "fidanlık karşıyaka",
    ],
    priority: 2,
    distance: {
      fromEvka3Km: 12.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Karşıyaka İzmir | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Karşıyaka'ya çiçek, fidan ve hırdavat teslimatı. Bostanlı, Çarşı, Mavibahçe bölgelerine servis. Evka 3'ten aynı gün. 0545 653 45 99",
      h1: "Karşıyaka'nın Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi karşıyaka",
        "nalbur karşıyaka",
        "hırdavat karşıyaka izmir",
        "fidanlık karşıyaka",
      ],
    },
  },
  {
    id: "buca-district",
    slug: "buca",
    name: "Buca",
    type: "district",
    population: 523193,
    area: 179.0,
    description:
      "İzmir'in en kalabalık ilçesi Buca, Dokuz Eylül Üniversitesi'ne ev sahipliği yapar. Modern konut projeleri ve gelişmiş sosyal donatı alanlarıyla dikkat çeker.",
    characteristics: [
      "İzmir'in en büyük ilçesi",
      "Üniversite şehri",
      "Modern yapılaşma",
      "Genç nüfus",
      "Site yaşamı yoğun",
    ],
    landmarks: [
      "Dokuz Eylül Üniversitesi",
      "Barış Mah.",
      "Kozağaç",
      "Buca Koop Sitesi",
    ],
    keywords: [
      "çiçekçi buca",
      "nalbur buca izmir",
      "hırdavat buca",
      "buca çiçek teslimat",
      "fidanlık buca",
    ],
    priority: 2,
    distance: {
      fromEvka3Km: 10.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Buca İzmir | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Buca'ya çiçek, fidan ve yapı malzemesi teslimatı. İzmir'in en kalabalık ilçesine hizmet. Site yönetimlerine özel. 0545 653 45 99",
      h1: "Buca'nın Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi buca",
        "nalbur buca",
        "hırdavat buca izmir",
        "buca yapı malzemeleri",
      ],
    },
  },
  {
    id: "konak-district",
    slug: "konak",
    name: "Konak",
    type: "district",
    population: 322393,
    area: 27.5,
    description:
      "İzmir'in merkez ilçesi Konak, Saat Kulesi ve Kemeraltı Çarşısı gibi tarihi mekanlarıyla tanınır. Ticari yaşamın en yoğun olduğu bölgedir.",
    characteristics: [
      "Merkez ilçe",
      "Tarihi doku",
      "Yoğun ticaret",
      "Kültür merkezi",
      "Turizm bölgesi",
    ],
    landmarks: [
      "Saat Kulesi",
      "Kemeraltı Çarşısı",
      "Konak Meydanı",
      "Kordon",
      "Alsancak",
    ],
    keywords: [
      "çiçekçi konak",
      "nalbur konak izmir",
      "hırdavat konak",
      "konak çiçek teslimat",
      "alsancak çiçekçi",
    ],
    priority: 3,
    distance: {
      fromEvka3Km: 15.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Konak İzmir | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Konak'a çiçek ve hırdavat teslimatı. Alsancak, Kemeraltı, Kordon bölgelerine servis. İzmir merkeze hizmet. 0545 653 45 99",
      h1: "Konak'ın Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi konak",
        "nalbur konak",
        "hırdavat konak izmir",
        "alsancak çiçekçi",
      ],
    },
  },
  {
    id: "balcova-district",
    slug: "balcova",
    name: "Balçova",
    type: "district",
    population: 76613,
    area: 23.8,
    description:
      "Balçova, termal kaynakları ve teleferik tesisleriyle tanınan turistik bir ilçedir. Modern konut projeleri ve yeşil alanlarıyla yaşam kalitesi yüksektir.",
    characteristics: [
      "Termal turizm",
      "Teleferik",
      "Yeşil alanlar",
      "Modern konutlar",
      "Yüksek yaşam kalitesi",
    ],
    landmarks: ["Balçova Termal", "İzmir Teleferik", "Agamemnon Kaplıcaları"],
    keywords: [
      "çiçekçi balçova",
      "nalbur balçova izmir",
      "hırdavat balçova",
      "balçova çiçek teslimat",
    ],
    priority: 3,
    distance: {
      fromEvka3Km: 18.0,
      deliveryZone: "next-day",
    },
    seo: {
      title: "Çiçekçi Balçova İzmir | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Balçova'ya çiçek, fidan ve yapı malzemesi teslimatı. Termal bölgesi ve modern konutlara servis. 0545 653 45 99",
      h1: "Balçova'nın Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi balçova",
        "nalbur balçova",
        "hırdavat balçova izmir",
        "balçova yapı malzemeleri",
      ],
    },
  },
  {
    id: "narlidere-district",
    slug: "narlidere",
    name: "Narlıdere",
    type: "district",
    population: 61732,
    area: 49.0,
    description:
      "Narlıdere, İzmir'in sahil şeridinde yer alan elit bir ilçedir. Sahil yaşamı, modern konutlar ve yüksek yaşam standardıyla tanınır.",
    characteristics: [
      "Sahil şeridi",
      "Elit yerleşim",
      "Modern konutlar",
      "Yüksek yaşam kalitesi",
      "Sakin ortam",
    ],
    landmarks: [
      "Narlıdere Sahili",
      "Migros İçmeler",
      "Modern Site Projeleri",
    ],
    keywords: [
      "çiçekçi narlıdere",
      "nalbur narlıdere izmir",
      "hırdavat narlıdere",
      "narlıdere çiçek teslimat",
    ],
    priority: 3,
    distance: {
      fromEvka3Km: 20.0,
      deliveryZone: "next-day",
    },
    seo: {
      title: "Çiçekçi Narlıdere İzmir | Nalbur ve Hırdavat - Kara Ticaret",
      description:
        "Narlıdere'ye çiçek ve hırdavat teslimatı. Sahil bölgesi, modern konutlar ve sitelere servis. 0545 653 45 99",
      h1: "Narlıdere'nin Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi narlıdere",
        "nalbur narlıdere",
        "hırdavat narlıdere izmir",
      ],
    },
  },
  {
    id: "karabaglar-district",
    slug: "karabaglar",
    name: "Karabağlar",
    type: "district",
    population: 473058,
    area: 51.0,
    description:
      "İzmir'in en kalabalık ikinci ilçesi Karabağlar, yoğun konut ve ticaret alanlarıyla dikkat çeker. Geniş yerleşim alanı ve yüksek nüfus yoğunluğu vardır.",
    characteristics: [
      "İzmir'in 2. büyük ilçesi",
      "Yoğun nüfus",
      "Geniş ticaret alanı",
      "Konut yoğun",
      "Merkeze yakın",
    ],
    landmarks: ["Forum Bornova AVM (yakın)", "Korutürk Mah.", "Zeytinlik"],
    keywords: [
      "çiçekçi karabağlar",
      "nalbur karabağlar izmir",
      "hırdavat karabağlar",
      "karabağlar çiçek teslimat",
    ],
    priority: 2,
    distance: {
      fromEvka3Km: 7.0,
      deliveryZone: "same-day",
    },
    seo: {
      title: "Çiçekçi Karabağlar İzmir | Hırdavat ve Nalbur - Kara Ticaret",
      description:
        "Karabağlar'a çiçek, fidan ve yapı malzemesi teslimatı. İzmir'in 2. büyük ilçesine hızlı servis. 0545 653 45 99",
      h1: "Karabağlar'ın Çiçekçisi ve Hırdavatı",
      keywords: [
        "çiçekçi karabağlar",
        "nalbur karabağlar",
        "hırdavat karabağlar izmir",
      ],
    },
  },
];

// ============================================================================
// ALL LOCATIONS (Combined array for easy access)
// ============================================================================

export const ALL_LOCATIONS: Location[] = [
  ...BORNOVA_NEIGHBORHOODS,
  ...SERVICE_DISTRICTS,
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all locations (districts + neighborhoods)
 */
export function getAllLocations(): Location[] {
  return ALL_LOCATIONS;
}

/**
 * Get location by slug
 */
export function getLocationBySlug(slug: string): Location | undefined {
  return ALL_LOCATIONS.find((loc) => loc.slug === slug);
}

/**
 * Get related/nearby locations based on distance and type
 */
export function getRelatedLocations(
  locationId: string,
  type?: "district" | "neighborhood",
  maxResults: number = 6
): Location[] {
  const location = ALL_LOCATIONS.find((loc) => loc.id === locationId);
  if (!location) return [];

  return ALL_LOCATIONS
    .filter((loc) => {
      // Exclude the current location
      if (loc.id === locationId) return false;

      // Filter by type if specified
      if (type && loc.type !== type) return false;

      return true;
    })
    .sort((a, b) => {
      // Sort by distance from the current location (approximate by distance from Evka-3)
      const distA = Math.abs(a.distance.fromEvka3Km - location.distance.fromEvka3Km);
      const distB = Math.abs(b.distance.fromEvka3Km - location.distance.fromEvka3Km);
      return distA - distB;
    })
    .slice(0, maxResults);
}

/**
 * Get all neighborhoods in a specific district
 */
export function getNeighborhoodsByDistrict(district: string): Location[] {
  return ALL_LOCATIONS.filter(
    (loc) => loc.type === "neighborhood" && loc.district === district
  );
}

/**
 * Get all locations by priority level
 */
export function getLocationsByPriority(priority: 1 | 2 | 3 | 4 | 5): Location[] {
  return ALL_LOCATIONS.filter((loc) => loc.priority === priority);
}

/**
 * Get all locations by delivery zone
 */
export function getLocationsByDeliveryZone(
  zone: "immediate" | "same-day" | "next-day"
): Location[] {
  return ALL_LOCATIONS.filter((loc) => loc.distance.deliveryZone === zone);
}

/**
 * Get all districts (excluding neighborhoods)
 */
export function getAllDistricts(): Location[] {
  return SERVICE_DISTRICTS;
}

/**
 * Get all Bornova neighborhoods
 */
export function getAllBornovaNeighborhoods(): Location[] {
  return BORNOVA_NEIGHBORHOODS;
}

/**
 * Get locations within a certain distance from Evka-3
 */
export function getLocationsByDistance(maxKm: number): Location[] {
  return ALL_LOCATIONS.filter((loc) => loc.distance.fromEvka3Km <= maxKm);
}

/**
 * Get high-priority locations (Priority 1-2) - for homepage/priority display
 */
export function getHighPriorityLocations(): Location[] {
  return ALL_LOCATIONS.filter((loc) => loc.priority <= 2);
}

/**
 * Search locations by name or keyword
 */
export function searchLocations(query: string): Location[] {
  const lowerQuery = query.toLowerCase();
  return ALL_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(lowerQuery) ||
      loc.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery)) ||
      loc.description.toLowerCase().includes(lowerQuery)
  );
}
