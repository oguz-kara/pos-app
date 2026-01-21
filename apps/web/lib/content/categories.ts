import { GBPCategory } from "./types";

/**
 * GBP Categories for Kara Ticaret
 * Based on Google Business Profile categories and the 90-day roadmap
 */

export const GBP_CATEGORIES: GBPCategory[] = [
  {
    id: "cicekci",
    slug: "cicekci",
    name: "Çiçekçi",
    description:
      "Mevsimlik çiçekler, ofis açılış çiçekleri, kutlama bitkileri ve saksılı hediye bitkileri. Evka 3'ün güvenilir çiçekçisi olarak özel günlerinize değer katıyoruz.",
    icon: "🌸",
    isPrimary: true,
    image: "/images/cicekci-category.jpg",
    benefits: [
      "Mevsimlik çiçekler - taze ve köklü fideler",
      "Ofis açılış ve kutlama çiçekleri",
      "Saksılı hediye bitkileri - yaşayan hediyeler",
      "Kurumsal bitki tedariği",
      "İzmir geneli teslimat",
    ],
    seo: {
      title: "Çiçekçi Evka 3 Bornova | Mevsimlik Çiçek ve Hediye Bitkileri",
      description:
        "Evka 3'ün güvenilir çiçekçisi. Mevsimlik çiçekler, ofis açılış çiçekleri, kutlama bitkileri ve saksılı hediye seçenekleri. İzmir geneli teslimat. 0545 653 45 99",
      keywords: [
        "çiçekçi Evka 3",
        "çiçekçi bornova",
        "mevsimlik çiçek",
        "ofis açılış çiçeği",
        "hediye bitkisi",
        "saksılı çiçek",
      ],
    },
  },
  {
    id: "bahce-urunleri",
    slug: "bahce-urunleri",
    name: "Bahçe Ürünleri",
    description:
      "Saksı, toprak, gübre, bahçe aletleri, tohum ve bitki koruma ürünleri. Bahçeniz için ihtiyacınız olan her şey tek çatı altında.",
    icon: "🌿",
    isPrimary: false,
    image: "/images/bahce-urunleri-category.jpg",
    benefits: [
      "Kaliteli saksı ve çiçeklik çeşitleri",
      "Sterilize bitki toprağı ve torf",
      "Doğru gübre danışmanlığı",
      "Sağlam bahçe aletleri",
      "Taze tohum ve fide",
      "Bitki koruma ürünleri",
    ],
    seo: {
      title: "Bahçe Ürünleri Evka 3 | Saksı, Toprak, Gübre ve Bahçe Aletleri",
      description:
        "Bahçeniz için kaliteli saksı, bitki toprağı, gübre, bahçe aletleri ve tohum. Uzman danışmanlık ile doğru ürünü bulun. Evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "bahçe ürünleri Evka 3",
        "saksı satışı",
        "bitki toprağı",
        "gübre bornova",
        "bahçe aletleri",
        "tohum satışı",
      ],
    },
  },
  {
    id: "fidanlik",
    slug: "fidanlik",
    name: "Fidanlar",
    description:
      "Saksılı iç-dış mekan bitkileri, meyve fidanları, süs bitkileri ve mevsimlik çiçekler. 2016'dan beri Evka 3'ün tek saksılı bitki satıcısı. Kurulum hizmeti ve bitki bakım danışmanlığı sunuyoruz.",
    icon: "🌱",
    isPrimary: false,
    image: "/images/fidanlar-category.jpg",
    benefits: [
      "Evka 3'ün tek saksılı bitki satıcısı",
      "İç ve dış mekan için geniş bitki çeşidi",
      "Sertifikalı aşılı meyve fidanları",
      "Profesyonel kurulum hizmeti",
      "Uzman bitki bakım danışmanlığı",
      "İzmir geneli fidan teslimatı",
    ],
    seo: {
      title: "Fidanlık Evka 3 Bornova | Saksılı Bitkiler ve Meyve Fidanları",
      description:
        "Evka 3'ün tek fidanlığı. İç-dış mekan bitkileri, sertifikalı meyve fidanları, süs bitkileri. Kurulum hizmeti ve bakım danışmanlığı. 0545 653 45 99",
      keywords: [
        "fidanlık Evka 3",
        "fidanlık bornova",
        "saksılı bitki",
        "meyve fidanı",
        "iç mekan bitkisi",
        "fidan teslimatı izmir",
      ],
    },
  },
  {
    id: "hirdavat-nalbur",
    slug: "hirdavat-nalbur",
    name: "Hırdavat - Nalbur",
    description:
      "Hırdavat ve bağlantı malzemeleri, el aletleri, yapıştırıcılar, kapı-mobilya aksesuarları ve plastik ev ürünleri. Kaliteli malzeme, uzman danışmanlık.",
    icon: "🔨",
    isPrimary: false,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop&q=80",
    benefits: [
      "Geniş hırdavat ve bağlantı malzemesi stoğu",
      "Sağlam, paslanmaz el aletleri",
      "Doğru yapıştırıcı danışmanlığı",
      "Kapı ve mobilya yedek parçaları",
      "Dayanıklı plastik ev ürünleri",
    ],
    seo: {
      title: "Nalbur Evka 3 Bornova | Hırdavat ve El Aletleri",
      description:
        "Evka 3'ün güvenilir nalburiyesi. Hırdavat malzemeleri, el aletleri, yapıştırıcılar, kapı aksesuarları. Her gün 22:00'a kadar açık. 0545 653 45 99",
      keywords: [
        "nalbur Evka 3",
        "hırdavat bornova",
        "el aleti satışı",
        "yapıştırıcı",
        "kapı kolu",
        "mobilya aksesuarı",
      ],
    },
  },
  {
    id: "aydinlatma",
    slug: "aydinlatma",
    name: "Aydınlatma",
    description:
      "LED aydınlatma, ampuller, şerit LED ve dekoratif aydınlatma ürünleri. Profesyonel montaj hizmeti ile evlerinize ve işletmenize ışık katıyoruz.",
    icon: "💡",
    isPrimary: false,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80",
    benefits: [
      "Uzun ömürlü LED aydınlatma çözümleri",
      "Şerit LED montaj hizmeti",
      "Dekoratif aydınlatma seçenekleri",
      "Profesyonel avize montajı",
      "Enerji tasarruflu ürünler",
    ],
    seo: {
      title: "Aydınlatma Mağazası Evka 3 | LED, Ampul ve Şerit LED Montajı",
      description:
        "LED aydınlatma, şerit LED, ampuller ve dekoratif aydınlatma. Profesyonel montaj hizmeti. Evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "aydınlatma Evka 3",
        "led ampul",
        "şerit led montajı",
        "avize montajı bornova",
        "dekoratif aydınlatma",
      ],
    },
  },
  {
    id: "banyo-malzemeleri",
    slug: "banyo-malzemeleri",
    name: "Banyo Malzemeleri",
    description:
      "Duş başlıkları, bataryalar, klozet takımları ve banyo aksesuarları. Kaliteli, paslanmaz ve garantili ürünler.",
    icon: "🚿",
    isPrimary: false,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    benefits: [
      "Kireç kırıcılı duş başlıkları",
      "%100 pirinç bataryalar",
      "Su kaçırmayan klozet iç takımları",
      "Paslanmaz banyo aksesuarları",
      "Garantili markalar",
    ],
    seo: {
      title: "Banyo Malzemeleri Evka 3 | Batarya, Duş Başlığı, Klozet Takımı",
      description:
        "Kaliteli banyo malzemeleri. Duş başlıkları, bataryalar, klozet takımları ve aksesuarlar. Garantili ürünler. Evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "banyo malzemeleri Evka 3",
        "batarya satışı bornova",
        "duş başlığı",
        "klozet kapağı",
        "banyo aksesuarı",
      ],
    },
  },
  {
    id: "tesisat-malzemeleri",
    slug: "tesisat-malzemeleri",
    name: "Su Tesisatı Malzemeleri",
    description:
      "Tesisat malzemeleri, bataryalar, hortumlar ve profesyonel montaj hizmeti. Musluk damlatma, klozet kaçırma gibi sorunlara hızlı çözüm.",
    icon: "🔧",
    isPrimary: false,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&fit=crop&q=80",
    benefits: [
      "Çelik örgülü fleks hortumlar",
      "Koku yapmayan sifonlar",
      "Profesyonel montaj hizmeti",
      "Acil tesisat tamiri",
      "Kaliteli batarya ve musluklar",
    ],
    seo: {
      title: "Su Tesisatı Malzemeleri Evka 3 | Tesisat Montaj Hizmeti",
      description:
        "Tesisat malzemeleri ve profesyonel montaj. Hortum, sifon, batarya satışı ve montajı. Acil tamir hizmeti. Evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "tesisat malzemeleri Evka 3",
        "tesisat montajı bornova",
        "batarya değişimi",
        "musluk tamiri",
        "sifon değişimi",
      ],
    },
  },
  {
    id: "elektrik-malzemeleri",
    slug: "elektrik-malzemeleri",
    name: "Elektrik Malzemeleri",
    description:
      "Elektrik kabloları, prizler, anahtarlar, sigorta malzemeleri ve profesyonel montaj hizmeti. TSE standartlarında güvenilir ürünler.",
    icon: "⚡",
    isPrimary: false,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    benefits: [
      "TSE standartında tam bakır kablolar",
      "Dayanıklı priz ve anahtar seçenekleri",
      "Profesyonel elektrik montajı",
      "Güvenli sigorta sistemleri",
      "Uzun ömürlü piller",
    ],
    seo: {
      title: "Elektrik Malzemeleri Evka 3 | Kablo, Priz, Elektrik Montajı",
      description:
        "TSE standartında elektrik malzemeleri. Kablo, priz, anahtar, sigorta. Profesyonel montaj hizmeti. Evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "elektrik malzemeleri Evka 3",
        "elektrik kablosu bornova",
        "priz anahtar",
        "elektrik montajı",
        "sigorta malzemesi",
      ],
    },
  },
  {
    id: "fidan-toptanci",
    slug: "fidan-toptanci",
    name: "Toptan Fidan",
    description:
      "Toptan fidan satışı ve teslimat. Apartman, site, otel, restoran ve peyzaj firmaları için profesyonel bitki tedariği. İzmir genelinde hizmet.",
    icon: "🚚",
    isPrimary: false,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
    benefits: [
      "Toplu alımlarda özel fiyat",
      "Kurumsal bitki tedariği",
      "İzmir geneli güvenli teslimat",
      "Peyzaj projelerine destek",
      "Site ve apartman çözümleri",
      "Otel, restoran, kafe tedariği",
    ],
    seo: {
      title: "Toptan Fidan Satışı İzmir | Kurumsal Bitki Tedariği - Evka 3",
      description:
        "İzmir genelinde toptan fidan satışı ve teslimat. Apartman, otel, restoran için kurumsal bitki tedariği. Peyzaj firmalarına özel çözümler. 0545 653 45 99",
      keywords: [
        "toptan fidan satışı izmir",
        "kurumsal bitki tedariği",
        "apartman fidanı",
        "peyzaj firması fidan",
        "otel bitki tedariği",
      ],
    },
  },
  {
    id: "yapi-malzemeleri",
    slug: "yapi-malzemeleri",
    name: "Yapı Malzemeleri",
    description:
      "Çimento, alçı, sıva, fayans yapıştırıcı, boya malzemeleri ve inşaat bağlantı elemanları. İnşaattan ev tamiratına her ihtiyacınız için.",
    icon: "🏗️",
    isPrimary: false,
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&auto=format&fit=crop&q=80",
    benefits: [
      "Taze çimento - açık satış",
      "Saten alçı ve kartonpiyer alçısı",
      "Su geçirmez fayans harçları",
      "Kaliteli boya ekipmanları",
      "Paslanmaz inşaat çivileri",
    ],
    seo: {
      title: "Yapı Malzemeleri Evka 3 | Çimento, Alçı, Sıva, Boya Malzemesi",
      description:
        "Yapı ve tamirat malzemeleri. Çimento, alçı, fayans harçı, boya ekipmanları. Evka 3 Bornova. Her gün 22:00'a kadar açık. 0545 653 45 99",
      keywords: [
        "yapı malzemeleri Evka 3",
        "çimento satışı bornova",
        "alçı satışı",
        "fayans harçı",
        "boya malzemesi",
      ],
    },
  },
];

/**
 * Helper functions
 */
export function getCategoryBySlug(slug: string): GBPCategory | undefined {
  return GBP_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getPrimaryCategory(): GBPCategory | undefined {
  return GBP_CATEGORIES.find((cat) => cat.isPrimary);
}

export function getAllCategories(): GBPCategory[] {
  return GBP_CATEGORIES;
}
