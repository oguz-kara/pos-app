export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  submenu?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export const navigationConfig: NavigationItem[] = [
  {
    label: "Anasayfa",
    href: "/",
  },
  {
    label: "Çiçekçi & Fidanlık",
    href: "/kategoriler/cicekci",
    description: "Mevsimlik çiçekler, iç-dış mekan bitkileri ve bahçe ürünleri",
    submenu: [
      {
        label: "Mevsimlik Çiçekler",
        href: "/kategoriler/cicekci/hizmetler/mevsimlik-cicekler",
        description: "Sezon çiçekleri ve özel gün bitkileri"
      },
      {
        label: "İç Mekan Bitkileri",
        href: "/kategoriler/fidanlik/hizmetler/ic-mekan-bitkileri",
        description: "Saksılı ofis ve ev bitkileri"
      },
      {
        label: "Dış Mekan Bitkileri",
        href: "/kategoriler/fidanlik/hizmetler/dis-mekan-bitkileri",
        description: "Bahçe bitkileri ve peyzaj bitkileri"
      },
      {
        label: "Meyve Fidanları",
        href: "/kategoriler/fidanlik/hizmetler/meyve-fidanlari",
        description: "Meyve ağacı fidanları ve fidan teslimatı"
      },
      {
        label: "Süs Bitkileri & Peyzaj",
        href: "/kategoriler/fidanlik/hizmetler/sus-peyzaj-bitkileri",
        description: "Dekoratif bitkiler ve peyzaj çözümleri"
      },
      {
        label: "Toprak, Torf & Gübre",
        href: "/kategoriler/bahce-urunleri/hizmetler/bitki-topragi-torf",
        description: "Bitki toprağı, gübre ve bitki besini"
      },
      {
        label: "Saksı & Çiçeklik",
        href: "/kategoriler/bahce-urunleri/hizmetler/saksi-ciceklik-satisi",
        description: "Her boyut ve tarzda saksılar"
      }
    ]
  },
  {
    label: "Hırdavat & Yapı Malzemeleri",
    href: "/kategoriler/hirdavat-nalbur",
    description: "Elektrik, tesisat, banyo ve yapı malzemeleri",
    submenu: [
      {
        label: "Elektrik Malzemeleri",
        href: "/kategoriler/elektrik-malzemeleri",
        description: "Kablo, priz, anahtar, sigorta ve elektrik aksesuarları"
      },
      {
        label: "Su Tesisatı Malzemeleri",
        href: "/kategoriler/tesisat-malzemeleri",
        description: "Boru, vana ve tesisat bağlantı malzemeleri"
      },
      {
        label: "Banyo Malzemeleri",
        href: "/kategoriler/banyo-malzemeleri",
        description: "Batarya, musluk, duş başlığı, klozet ve aksesuarlar"
      },
      {
        label: "Aydınlatma",
        href: "/kategoriler/aydinlatma",
        description: "LED ampul, şerit LED ve dekoratif aydınlatma"
      },
      {
        label: "El Aletleri & Bağlantı",
        href: "/kategoriler/hirdavat-nalbur/hizmetler/el-aleti-satisi",
        description: "El aletleri, hırdavat ve bağlantı malzemeleri"
      },
      {
        label: "Boya & Yapıştırıcılar",
        href: "/kategoriler/hirdavat-nalbur/hizmetler/yapistirici-silikon",
        description: "Silikon, yapıştırıcı ve boya ekipmanları"
      },
      {
        label: "Yapı Malzemeleri",
        href: "/kategoriler/yapi-malzemeleri",
        description: "Çimento, alçı, sıva ve fayans malzemeleri"
      }
    ]
  },
  {
    label: "Hizmetlerimiz",
    href: "/hizmetler",
    description: "Montaj, teslimat ve danışmanlık hizmetlerimiz",
    submenu: [
      {
        label: "Elektrik Montaj Hizmeti",
        href: "/kategoriler/elektrik-malzemeleri/hizmetler/elektrik-montaj-hizmeti",
        description: "Avize, priz, anahtar ve sigorta montajı"
      },
      {
        label: "Tesisat Montaj Hizmeti",
        href: "/kategoriler/tesisat-malzemeleri/hizmetler/tesisat-montaj-hizmeti",
        description: "Batarya değişimi, sifon tamiri, acil müdahale"
      },
      {
        label: "Fidan Teslimatı",
        href: "/kategoriler/fidanlik/hizmetler/fidan-teslimati",
        description: "İzmir genelinde güvenli fidan teslimatı"
      },
      {
        label: "Bitki Bakım Danışmanlığı",
        href: "/kategoriler/fidanlik/hizmetler/bitki-bakim-danismanligi",
        description: "Bitki bakımı ve fidan seçimi konusunda uzman desteği"
      }
    ]
  },
  {
    label: "İletişim",
    href: "/iletisim",
  }
];
