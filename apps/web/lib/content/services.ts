import { GBPService } from "./types";

/**
 * GBP Services for Kara Ticaret
 * Organized by category with detailed descriptions
 */

export const GBP_SERVICES: GBPService[] = [
  // ==================== ÇİÇEKÇİ SERVICES ====================
  {
    id: "mevsimlik-cicekler",
    slug: "mevsimlik-cicekler",
    categoryId: "cicekci",
    name: "Mevsimlik Çiçekler",
    shortDescription:
      "Balkon ve bahçelerinize renk katacak mevsimlik çiçek fideleri",
    fullDescription:
      "Balkon ve bahçelerinize renk katacak; sardunya, petunya, begonya gibi mevsimine uygun, kök yapısı güçlü fideler. Hangi çiçeğin güneşi, hangisinin gölgeyi sevdiğini belirterek, yerinize en uygun çeşidi seçmenize yardımcı oluyoruz.",
    highlights: [
      "Mevsimine uygun taze fideler",
      "Kök yapısı güçlü, tomurcuklu bitkiler",
      "Güneş/gölge ihtiyacına göre danışmanlık",
      "Sardunya, petunya, begonya ve daha fazlası",
      "Balkonda ve bahçede uzun ömürlü",
    ],
    tags: ["cicek", "mevsimlik", "balkon", "bahce"],
    seo: {
      title: "Mevsimlik Çiçek Satışı evka 3 | Sardunya, Petunya, Begonya",
      description:
        "Balkon ve bahçeler için mevsimlik çiçek fideleri. Sardunya, petunya, begonya. Uzman danışmanlık ile doğru çeşidi seçin. evka 3 Bornova.",
      keywords: [
        "mevsimlik çiçek evka 3",
        "sardunya satışı",
        "petunya fide",
        "balkon çiçeği",
      ],
    },
  },
  {
    id: "ofis-acilis-cicegi",
    slug: "ofis-acilis-cicegi",
    categoryId: "cicekci",
    name: "Ofis Açılış Çiçeği",
    shortDescription: "Yeni iş yerleri için gösterişli ve dayanıklı bitkiler",
    fullDescription:
      "Yeni iş yerleri için bakımı nispeten kolay, gösterişli ve dayanıklı saksı bitkileri. Yucca, Difenbahya veya Benjamin gibi ofis ortamında havayı temizleyen ve mekana ağırlık katan, dolgun formlu bitkiler hazırlıyoruz.",
    highlights: [
      "Ofis ortamına uygun dayanıklı bitkiler",
      "Bakımı kolay, gösterişli türler",
      "Havayı temizleyen bitkiler (Yucca, Benjamin)",
      "Dolgun formlu, prestijli görünüm",
      "İzmir içi teslimat",
    ],
    tags: ["ofis", "acilis", "kurumsal", "ic-mekan"],
    seo: {
      title: "Ofis Açılış Çiçeği İzmir | Kurumsal Bitki Hediyesi - evka 3",
      description:
        "Ofis açılışları için gösterişli saksılı bitkiler. Yucca, Benjamin, Difenbahya. İzmir içi teslimat. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "ofis açılış çiçeği izmir",
        "kurumsal bitki hediyesi",
        "yucca bitki",
        "ofis bitkisi",
      ],
    },
  },
  {
    id: "kutlama-bitkileri",
    slug: "kutlama-bitkileri",
    categoryId: "cicekci",
    name: "Kutlama ve Özel Gün Bitkileri",
    shortDescription: "Özel günler için yaşayan, kalıcı hediyeler",
    fullDescription:
      "Özel günler için geçici buketler yerine, yıllarca yaşayacak saksılı alternatifler sunuyoruz. Gönderdiğiniz çiçeğin bir hafta sonra çöpe gitmesini değil, büyüyüp hatıra kalmasını istiyorsanız doğru yerdesiniz.",
    highlights: [
      "Geçici buketlere kalıcı alternatif",
      "Yıllarca yaşayan saksılı bitkiler",
      "Özel günlere değer katan hediyeler",
      "Orkide, sukulent, salon bitkileri",
      "Hatıra olarak büyüyüp gelişen bitkiler",
    ],
    tags: ["hediye", "kutlama", "ozel-gun", "saksi"],
    seo: {
      title: "Kutlama Bitkisi Hediye | Özel Gün Saksılı Çiçek - evka 3",
      description:
        "Özel günler için yaşayan hediyeler. Saksılı bitkiler, orkide, sukulent. Yıllarca hatıra kalacak çiçekler. evka 3 Bornova.",
      keywords: [
        "kutlama bitkisi",
        "özel gün çiçeği",
        "saksılı hediye",
        "orkide hediye",
      ],
    },
  },
  {
    id: "saksi-hediye-bitkileri",
    slug: "saksi-hediye-bitkileri",
    categoryId: "cicekci",
    name: "Saksılı Hediye Bitkiler",
    shortDescription: "Şık saksılarda hazırlanmış yaşayan hediyeler",
    fullDescription:
      "Sevdiklerinize yaşayan bir hediye verin. Şık seramik veya dekoratif saksılarla hazırladığımız; sukulent aranjmanları, orkideler veya salon bitkileri. Hem göze hitap eden hem de ev ortamında uzun süre formunu koruyan seçenekler.",
    highlights: [
      "Dekoratif seramik saksılar",
      "Sukulent aranjmanları",
      "Orkide ve salon bitkileri",
      "Ev ortamında uzun ömürlü",
      "Hazır hediye paketleme",
    ],
    tags: ["hediye", "saksi", "sukulent", "orkide", "ic-mekan"],
    seo: {
      title: "Saksılı Hediye Bitki evka 3 | Sukulent, Orkide Aranjmanları",
      description:
        "Şık saksılarda hazır hediye bitkileri. Sukulent aranjmanları, orkideler, salon bitkileri. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "saksılı hediye bitki",
        "sukulent aranjman",
        "orkide saksı",
        "dekoratif bitki",
      ],
    },
  },
  {
    id: "kurumsal-bitki-tedari",
    slug: "kurumsal-bitki-tedari",
    categoryId: "cicekci",
    name: "Kurumsal Bitki Tedariği",
    shortDescription: "Ofis, otel, restoran için profesyonel bitki çözümleri",
    fullDescription:
      "Ofis, otel, restoran ve kafeler için mekanın atmosferine uygun düzenli bitki temini. Mekanınıza yeşil bir kimlik kazandıracak, kurumsal duruşunuza yakışan sağlıklı bitkiler.",
    highlights: [
      "Ofis, otel, restoran bitki tedariği",
      "Mekana özel bitki seçimi",
      "Düzenli bakım ve yenileme",
      "Kurumsal atmosfer yaratma",
      "Toplu alımlarda özel fiyat",
    ],
    tags: ["kurumsal", "toptan", "ofis", "otel", "restoran"],
    seo: {
      title: "Kurumsal Bitki Tedariği İzmir | Ofis, Otel Bitkisi - evka 3",
      description:
        "Ofis, otel, restoran için profesyonel bitki tedariği. Mekanınıza uygun bitki seçimi ve düzenli temin. İzmir. 0545 653 45 99",
      keywords: [
        "kurumsal bitki tedariği",
        "ofis bitkisi",
        "otel bitki",
        "restoran yeşillendirme",
      ],
    },
  },

  // ==================== BAHÇE ÜRÜNLERİ SERVICES ====================
  {
    id: "saksi-ciceklik-satisi",
    slug: "saksi-ciceklik-satisi",
    categoryId: "bahce-urunleri",
    name: "Saksı ve Çiçeklik Satışı",
    shortDescription: "Plastik, seramik ve toprak saksı çeşitleri",
    fullDescription:
      "Köklerin hava almasını sağlayan, drenaj delikleri düzgün açılmış saksı çeşitleri. Balkon demirlerine uygun hafif plastikler, dekorasyon için şık seramikler ve bitkiyi serin tutan toprak saksı modelleri.",
    highlights: [
      "Drenaj delikleri düzgün açılmış",
      "Balkon için hafif plastik saksılar",
      "Dekoratif seramik modeller",
      "Bitki sağlığı için toprak saksılar",
      "Her bitki türüne uygun çeşitler",
    ],
    tags: ["saksi", "ciceklik", "bahce-gereci"],
    seo: {
      title: "Saksı Satışı evka 3 | Plastik, Seramik, Toprak Saksı - Bornova",
      description:
        "Kaliteli saksı ve çiçeklik çeşitleri. Plastik, seramik, toprak saksılar. Balkon ve bahçe için. evka 3 Bornova. 0545 653 45 99",
      keywords: ["saksı satışı evka 3", "çiçeklik", "seramik saksı", "balkon saksısı"],
    },
  },
  {
    id: "bitki-topragi-torf",
    slug: "bitki-topragi-torf",
    categoryId: "bahce-urunleri",
    name: "Bitki Toprağı ve Torf Satışı",
    shortDescription: "Sterilize edilmiş kaliteli karışım topraklar",
    fullDescription:
      "Sinek ve böcek yapmayan, sterilize edilmiş kaliteli karışım topraklar. İç mekan bitkileri için özel torf, kök gelişimi için perlitli karışımlar ve bahçe dolgu toprağı seçenekleri. Çamurlaşmayan, su tutma kapasitesi yüksek ürünler.",
    highlights: [
      "Sterilize, sinek yapmayan toprak",
      "İç mekan için özel torf karışımı",
      "Perlitli kök geliştirici topraklar",
      "Yüksek su tutma kapasitesi",
      "Çamurlaşmayan yapı",
    ],
    tags: ["toprak", "torf", "bahce-gereci"],
    seo: {
      title: "Bitki Toprağı ve Torf Satışı evka 3 | Kaliteli Bahçe Toprağı",
      description:
        "Sterilize bitki toprağı, torf, perlitli karışımlar. Sinek yapmayan, kaliteli topraklar. evka 3 Bornova. 0545 653 45 99",
      keywords: ["bitki toprağı evka 3", "torf satışı", "bahçe toprağı", "perlit"],
    },
  },
  {
    id: "gubre-bitki-besini",
    slug: "gubre-bitki-besini",
    categoryId: "bahce-urunleri",
    name: "Gübre ve Bitki Besini Danışmanlığı",
    shortDescription: "Bitkiye özel gübre ve besin çözümleri",
    fullDescription:
      "Bitkinizin ihtiyacına göre yavaş salınımlı akıllı gübreler, sıvı besinler ve doğal solucan gübresi. 'Yapraklar sarardı' veya 'çiçek açmıyor' gibi sorunlarınıza göre, yakmadan besleyen doğru formülleri öneriyoruz.",
    highlights: [
      "Yavaş salınımlı akıllı gübreler",
      "Sıvı besinler - hızlı etki",
      "Doğal solucan gübresi",
      "Bitki sorununa özel öneri",
      "Yakmayan, güvenli formuller",
    ],
    tags: ["gubre", "besin", "bahce-gereci"],
    seo: {
      title: "Gübre Satışı evka 3 | Bitki Besini ve Gübre Danışmanlığı",
      description:
        "Bitkinize uygun gübre ve besin çözümleri. Sıvı gübre, solucan gübresi, uzman danışmanlık. evka 3 Bornova. 0545 653 45 99",
      keywords: ["gübre satışı evka 3", "bitki besini", "solucan gübresi", "sıvı gübre"],
    },
  },
  {
    id: "bahce-aletleri",
    slug: "bahce-aletleri",
    categoryId: "bahce-urunleri",
    name: "Bahçe Aletleri Satışı",
    shortDescription: "Sağlam ve uzun ömürlü bahçe aletleri",
    fullDescription:
      "Elinizi yormayan, sapı elinizde kalmayan sağlam el aletleri. Temiz kesim yapan budama makasları, paslanmaz çelik kürekler ve tırmıklar. Bir sezonluk değil, ömürlük kullanacağınız hırdavat kalitesinde ürünler.",
    highlights: [
      "Sağlam, ergonomik tutma sapları",
      "Keskin budama makasları",
      "Paslanmaz çelik kürek ve tırmık",
      "Uzun ömürlü malzemeler",
      "Hırdavat kalitesinde dayanıklılık",
    ],
    tags: ["bahce-aleti", "budama", "bahce-gereci"],
    seo: {
      title: "Bahçe Aletleri evka 3 | Budama Makası, Kürek, Tırmık - Bornova",
      description:
        "Dayanıklı bahçe aletleri. Budama makası, kürek, tırmık, el aletleri. Paslanmaz ve uzun ömürlü. evka 3 Bornova. 0545 653 45 99",
      keywords: ["bahçe aletleri evka 3", "budama makası", "bahçe küregi", "tırmık"],
    },
  },
  {
    id: "tohum-fide-satisi",
    slug: "tohum-fide-satisi",
    categoryId: "bahce-urunleri",
    name: "Tohum ve Fide Satışı",
    shortDescription: "Taze ve yüksek çimlenme oranlı tohumlar",
    fullDescription:
      "Çimlenme oranı yüksek, bayatlamamış sebze ve çiçek tohumları. Mevsimine göre ekebileceğiniz yerli ve standart çeşitler; maydanoz, roka, domates tohumlarından, boşlukları kapatmak için çim tohumuna kadar geniş yelpaze.",
    highlights: [
      "Yüksek çimlenme garantili tohumlar",
      "Bayatlamamış, taze stok",
      "Sebze ve çiçek tohumları",
      "Mevsime uygun çeşitler",
      "Çim tohumu - boşluk kapatma",
    ],
    tags: ["tohum", "fide", "sebze", "bahce-gereci"],
    seo: {
      title: "Tohum Satışı evka 3 | Sebze, Çiçek ve Çim Tohumu - Bornova",
      description:
        "Taze ve kaliteli tohumlar. Sebze tohumu, çiçek tohumu, çim tohumu. Yüksek çimlenme oranı. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "tohum satışı evka 3",
        "sebze tohumu",
        "çiçek tohumu",
        "çim tohumu",
      ],
    },
  },
  {
    id: "bitki-ilaci-koruma",
    slug: "bitki-ilaci-koruma",
    categoryId: "bahce-urunleri",
    name: "Bitki İlacı ve Koruma Ürünleri",
    shortDescription: "Bitki hastalıklarına karşı koruyucu ürünler",
    fullDescription:
      "Bitkilerde sık görülen unlu bit, yaprak biti ve mantar gibi sorunlara karşı amatör kullanıma uygun koruyucu ürünler. Hastalığın teşhisine yardımcı oluyor, doğru dozaj ve uygulama konusunda bilgi veriyoruz.",
    highlights: [
      "Unlu bit, yaprak biti ilacı",
      "Mantar önleyici ürünler",
      "Amatör kullanıma uygun",
      "Hastalık teşhis desteği",
      "Dozaj ve uygulama danışmanlığı",
    ],
    tags: ["bitki-ilaci", "koruma", "bahce-gereci"],
    seo: {
      title: "Bitki İlacı Satışı evka 3 | Böcek ve Mantar İlacı - Bornova",
      description:
        "Bitki koruma ürünleri. Unlu bit, yaprak biti, mantar ilacı. Uzman danışmanlık ve doğru dozaj. evka 3 Bornova. 0545 653 45 99",
      keywords: ["bitki ilacı evka 3", "unlu bit ilacı", "mantar ilacı", "yaprak biti"],
    },
  },

  // ==================== FİDANLIK SERVICES ====================
  {
    id: "fidan-kurulum",
    slug: "fidan-kurulum",
    categoryId: "fidanlik",
    name: "Fidan Kurulum Hizmeti",
    shortDescription: "Profesyonel fidan dikim ve kurulum",
    fullDescription:
      "Satın aldığınız bitkilerin bahçenize usulüne uygun şekilde dikilmesi hizmeti. Bitkinin toprağa tutunması için gerekli torf ve gübre karışımını hazırlıyor, kök boğazı seviyesini ayarlayarak ekimi yapıyoruz. Can suyunu verip, bitkiyi yaşayacak şekilde teslim ediyoruz; siz yorulmuyorsunuz.",
    highlights: [
      "Profesyonel dikim hizmeti",
      "Torf ve gübre karışımı hazırlama",
      "Kök boğazı seviye ayarı",
      "İlk sulama (can suyu)",
      "Bitkinin tutma garantisi",
    ],
    tags: ["kurulum", "dikim", "montaj"],
    seo: {
      title: "Fidan Dikim Hizmeti Bornova | Profesyonel Bitki Kurulumu",
      description:
        "Satın aldığınız fidanların profesyonel dikim hizmeti. Torf, gübre ile usulüne uygun kurulum. Bornova, İzmir. 0545 653 45 99",
      keywords: [
        "fidan dikim hizmeti",
        "bitki kurulum",
        "bahçe düzenleme",
        "fidan ekim",
      ],
    },
  },
  {
    id: "ic-mekan-bitkileri",
    slug: "ic-mekan-bitkileri",
    categoryId: "fidanlik",
    name: "Saksılı İç Mekan Bitkileri",
    shortDescription: "Salon, ofis ve kapalı alanlar için bitkiler",
    fullDescription:
      "Salon, ofis ve kapalı alanlar için Monstera, Kauçuk, Paşa Kılıcı gibi dayanıklı türler. Mekanın ışık alma durumuna göre, evinize en çok yakışacak ve uzun ömürlü olacak bitkiyi seçmenize yardımcı oluyoruz.",
    highlights: [
      "Monstera, Kauçuk, Paşa Kılıcı",
      "Az ışıkta dayanıklı türler",
      "Mekan ışığına göre öneri",
      "Uzun ömürlü salon bitkileri",
      "Bakım danışmanlığı",
    ],
    tags: ["ic-mekan", "saksi", "salon", "ofis"],
    seo: {
      title: "İç Mekan Bitkisi evka 3 | Monstera, Kauçuk, Salon Bitkileri",
      description:
        "Salon ve ofis için dayanıklı iç mekan bitkileri. Monstera, Kauçuk, Paşa Kılıcı. Işık durumuna göre danışmanlık. evka 3 Bornova.",
      keywords: [
        "iç mekan bitkisi evka 3",
        "monstera satışı",
        "kauçuk bitkisi",
        "salon bitkisi",
      ],
    },
  },
  {
    id: "dis-mekan-bitkileri",
    slug: "dis-mekan-bitkileri",
    categoryId: "fidanlik",
    name: "Saksılı Dış Mekan Bitkileri",
    shortDescription: "Balkon, teras ve bahçe için dayanıklı bitkiler",
    fullDescription:
      "Balkon, teras ve bahçeler için soğuğa ve İzmir sıcağına mukavemet gösteren ağaççıklar ve çalı grubu. Limon serviler, oya ağaçları ve peyzaj değeri yüksek, saksıda büyümeye uygun formlu çeşitler.",
    highlights: [
      "İzmir iklimine dayanıklı",
      "Sıcak ve soğuğa mukavemetli",
      "Limon servisi, oya ağacı",
      "Saksıda büyümeye uygun",
      "Peyzaj değeri yüksek türler",
    ],
    tags: ["dis-mekan", "saksi", "balkon", "teras", "bahce"],
    seo: {
      title: "Dış Mekan Bitkisi evka 3 | Balkon ve Bahçe Bitkileri - Bornova",
      description:
        "Balkon, teras ve bahçe için dayanıklı bitkiler. Limon servisi, oya ağacı. İzmir iklimine uygun. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "dış mekan bitkisi",
        "balkon bitkisi evka 3",
        "teras bitkisi",
        "bahçe bitkisi",
      ],
    },
  },
  {
    id: "meyve-fidanlari",
    slug: "meyve-fidanlari",
    categoryId: "fidanlik",
    name: "Meyve Fidanı Satışı",
    shortDescription: "Sertifikalı ve aşılı meyve fidanları",
    fullDescription:
      "Tamamı sertifikalı ve aşılı meyve fidanları. Narenciye, zeytin, ceviz, badem gibi Ege ikliminde verim alabileceğiniz sağlıklı fidanlar. İster bahçeye dikim için açık kök/tüplü, ister balkonda yetiştirmek için bodur meyve çeşitleri.",
    highlights: [
      "Sertifikalı aşılı fidanlar",
      "Narenciye, zeytin, ceviz, badem",
      "Ege iklimine uygun çeşitler",
      "Açık kök ve tüplü seçenekler",
      "Bodur meyve - balkon için",
    ],
    tags: ["meyve", "fidan", "narenciye", "zeytin"],
    seo: {
      title: "Meyve Fidanı Satışı evka 3 | Narenciye, Zeytin Fidanı - Bornova",
      description:
        "Sertifikalı aşılı meyve fidanları. Narenciye, zeytin, ceviz, badem. Bahçe ve balkon için. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "meyve fidanı evka 3",
        "narenciye fidanı",
        "zeytin fidanı",
        "limon ağacı",
      ],
    },
  },
  {
    id: "sus-peyzaj-bitkileri",
    slug: "sus-peyzaj-bitkileri",
    categoryId: "fidanlik",
    name: "Süs Bitkileri ve Peyzaj Bitkileri",
    shortDescription: "Peyzaj düzenlemeleri için formlu ağaçlar ve çalılar",
    fullDescription:
      "Peyzaj düzenlemeleri için formlu ağaçlar, çit bitkileri ve dekoratif çalılar. Bahçenize veya site girişlerine estetik katacak, yaprak döken veya her dem yeşil kalan, bakımlı bitki grupları.",
    highlights: [
      "Formlu peyzaj ağaçları",
      "Çit bitkileri - sınır belirleme",
      "Dekoratif çalılar",
      "Yaprak döken ve her dem yeşil",
      "Site girişi ve bahçe düzenleme",
    ],
    tags: ["sus", "peyzaj", "cit", "ağaç"],
    seo: {
      title: "Süs Bitkisi ve Peyzaj Bitkileri evka 3 | Çit Bitkisi - Bornova",
      description:
        "Peyzaj için formlu ağaçlar, çit bitkileri, dekoratif çalılar. Bahçe ve site düzenleme. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "süs bitkisi evka 3",
        "peyzaj bitkisi",
        "çit bitkisi",
        "bahçe düzenleme",
      ],
    },
  },
  {
    id: "bitki-bakim-danismanligi",
    slug: "bitki-bakim-danismanligi",
    categoryId: "fidanlik",
    name: "Bitki Bakım Danışmanlığı",
    shortDescription: "Profesyonel bitki bakım ve sorun çözüm desteği",
    fullDescription:
      "Sadece satış yapmıyoruz; aldığınız bitkinin sulama, gübreleme ve saksı değişimi hakkında doğru bilgiyi de veriyoruz. Bitkinin yerini sevmesi ve yaşaması için gerekli teknik desteği sağlıyoruz.",
    highlights: [
      "Sulama zamanı ve miktarı",
      "Gübreleme takvimi",
      "Saksı değişim önerileri",
      "Sorun teşhisi (sararma, dökülme)",
      "Bitki yerleşimi danışmanlığı",
    ],
    tags: ["danismanlik", "bakim", "destek"],
    seo: {
      title: "Bitki Bakım Danışmanlığı evka 3 | Uzman Destek - Bornova",
      description:
        "Bitkileriniz için profesyonel bakım danışmanlığı. Sulama, gübreleme, sorun çözümü. 9 yıllık deneyim. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "bitki bakımı danışmanlık",
        "bitki sorunu çözüm",
        "bitki sulama",
        "bitki gübreleme",
      ],
    },
  },
  {
    id: "fidan-teslimati",
    slug: "fidan-teslimati",
    categoryId: "fidanlik",
    name: "Fidan Teslimatı",
    shortDescription: "İzmir genelinde güvenli fidan teslimatı",
    fullDescription:
      "Toplu fidan alımlarında veya büyük saksılı bitkilerde 'araca nasıl sığacak' derdiniz yok. İzmir içinde Bornova, Karşıyaka, Konak gibi bölgelere bitkileri hırpalamadan, güvenli şekilde kapınıza teslim ediyoruz.",
    highlights: [
      "İzmir geneli teslimat",
      "Bitkileri hırpalamadan taşıma",
      "Büyük saksılar için özel araç",
      "Toplu alımlarda teslimat",
      "500₺+ ücretsiz teslimat",
    ],
    tags: ["teslimat", "nakliye", "kurye"],
    seo: {
      title: "Fidan Teslimatı İzmir | Bitki Nakliye Hizmeti - evka 3",
      description:
        "İzmir genelinde güvenli fidan teslimatı. Büyük bitkiler ve toplu alımlar için. 500₺ üzeri ücretsiz. 0545 653 45 99",
      keywords: [
        "fidan teslimatı izmir",
        "bitki nakliye",
        "ağaç teslimat",
        "fidan kurye",
      ],
    },
  },

  // ==================== NALBUR SERVICES ====================
  {
    id: "hirdavat-baglanti-malzeme",
    slug: "hirdavat-baglanti-malzeme",
    categoryId: "hirdavat-nalbur",
    name: "Hırdavat ve Bağlantı Malzemesi Tedariği",
    shortDescription: "Kapı kolu, menteşe, kilit ve bağlantı malzemeleri",
    fullDescription:
      "Evdeki tamiratlar için kapı kolundan menteşeye, kilit göbeğinden askı aparatına kadar geniş yedek parça stoğu. Montaj sırasında kırılmayacak, yerine tam oturacak standartlara uygun, sağlam malzemeler bulunduruyoruz.",
    highlights: [
      "Geniş yedek parça stoğu",
      "Standartlara uygun ölçüler",
      "Montajda kırılmayan kalite",
      "Kapı, mobilya aksesuarları",
      "Hızlı temin ve teslimat",
    ],
    tags: ["hirdavat", "baglanti", "kapi", "aksesuar"],
    seo: {
      title: "Hırdavat Malzemeleri evka 3 | Kapı Kolu, Menteşe, Kilit - Bornova",
      description:
        "Hırdavat ve bağlantı malzemeleri. Kapı kolu, menteşe, kilit göbeği, askı aparatı. Kaliteli yedek parça. evka 3 Bornova.",
      keywords: [
        "hırdavat evka 3",
        "kapı kolu",
        "menteşe satışı",
        "kilit göbeği",
      ],
    },
  },
  {
    id: "el-aleti-satisi",
    slug: "el-aleti-satisi",
    categoryId: "hirdavat-nalbur",
    name: "El Aleti Satışı ve Danışmanlığı",
    shortDescription: "Sağlam ve uzun ömürlü el aletleri",
    fullDescription:
      "Pense, tornavida, şerit metre, kontrol kalemi... Bunlar her evin demirbaşıdır. Bir kere kullanıp ucu bozulan, sapı elinizde kalan market malı satmıyoruz. Paslanmaya dirençli, elinize tam oturan, evladiyelik kullanacağınız sağlam takımlar.",
    highlights: [
      "Paslanmaz, dayanıklı malzeme",
      "Ergonomik tutma sapları",
      "Pense, tornavida, şerit metre",
      "Evde ve işte kullanım için",
      "Uzun ömürlü garantili ürünler",
    ],
    tags: ["el-aleti", "pense", "tornavida", "takim"],
    seo: {
      title: "El Aleti Satışı evka 3 | Pense, Tornavida, Alet Takımı - Bornova",
      description:
        "Dayanıklı el aletleri. Pense, tornavida, şerit metre, kontrol kalemi. Paslanmaz ve uzun ömürlü. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "el aleti evka 3",
        "pense satışı",
        "tornavida seti",
        "alet takımı",
      ],
    },
  },
  {
    id: "yapistirici-silikon",
    slug: "yapistirici-silikon",
    categoryId: "hirdavat-nalbur",
    name: "Yapıştırıcı ve Silikon Danışmanlığı",
    shortDescription: "Banyo, mutfak ve montaj yapıştırıcıları",
    fullDescription:
      "Banyo ve mutfak için kararmayan (anti-bakteriyel) silikonlar, çivi gerektirmeyen montaj yapıştırıcıları ve hızlı yapıştırıcılar. 'Neyi, nereye' yapıştıracağınıza göre doğru ürünü veriyor, tutmayacak malzemeye boşa para harcatmıyoruz.",
    highlights: [
      "Anti-bakteriyel banyo silikonu",
      "Montaj yapıştırıcıları (çivisiz)",
      "Hızlı yapıştırıcılar",
      "Uygulama alanına göre danışmanlık",
      "Kararmayan, dayanıklı formüller",
    ],
    tags: ["yapistirici", "silikon", "montaj"],
    seo: {
      title: "Silikon ve Yapıştırıcı Satışı evka 3 | Montaj Yapıştırıcı - Bornova",
      description:
        "Banyo silikonu, montaj yapıştırıcı, hızlı yapıştırıcı. Uygulama danışmanlığı. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "silikon satışı evka 3",
        "banyo silikonu",
        "montaj yapıştırıcı",
        "hızlı yapıştırıcı",
      ],
    },
  },
  {
    id: "kapi-mobilya-aksesuar",
    slug: "kapi-mobilya-aksesuar",
    categoryId: "hirdavat-nalbur",
    name: "Kapı ve Mobilya Aksesuarları",
    shortDescription: "Kapı kolu, menteşe, kilit ve mobilya yedek parçaları",
    fullDescription:
      "Bozulan kapı kolu, gıcırdayan menteşe, değişmesi gereken kilit göbeği veya askı aparatları. Mobilyanıza ve kapınıza tam uyum sağlayacak, montajı sırasında sorun çıkarmayan, yerine 'cuk' diye oturan yedek parçalar.",
    highlights: [
      "Tam uyumlu yedek parçalar",
      "Kapı kolu çeşitleri",
      "Sessiz menteşeler",
      "Kilit göbeği ve silindirler",
      "Mobilya askı aparatları",
    ],
    tags: ["kapi", "mobilya", "aksesuar", "yedek-parca"],
    seo: {
      title: "Kapı ve Mobilya Aksesuarları evka 3 | Yedek Parça - Bornova",
      description:
        "Kapı kolu, menteşe, kilit göbeği, mobilya aksesuarı. Tam uyumlu yedek parçalar. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "kapı aksesuarı evka 3",
        "mobilya yedek parça",
        "kapı kolu değişim",
        "menteşe",
      ],
    },
  },
  {
    id: "plastik-ev-urunleri",
    slug: "plastik-ev-urunleri",
    categoryId: "hirdavat-nalbur",
    name: "Plastik Ev Ürünleri Satışı",
    shortDescription: "Dayanıklı kova, leğen, sepet ve organizerler",
    fullDescription:
      "Temizlik kovaları, leğenler, çamaşır sepetleri ve organizerler. İncecik olup hemen çatlayanlardan değil; esnek, darbelere dayanıklı ve kaliteli plastikten üretilmiş banyo ve mutfak gereçleri.",
    highlights: [
      "Darbelere dayanıklı plastik",
      "Esnek ve çatlamayan yapı",
      "Kova, leğen, sepet",
      "Banyo ve mutfak organizerleri",
      "Uzun ömürlü ev gereçleri",
    ],
    tags: ["plastik", "ev-urunleri", "kova", "sepet"],
    seo: {
      title: "Plastik Ev Ürünleri evka 3 | Kova, Leğen, Sepet - Bornova",
      description:
        "Dayanıklı plastik ev ürünleri. Kova, leğen, çamaşır sepeti, organizer. Çatlamayan kalite. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "plastik ev ürünleri evka 3",
        "kova satışı",
        "leğen",
        "çamaşır sepeti",
      ],
    },
  },

  // ==================== AYDINLATMA SERVICES ====================
  {
    id: "aydinlatma-montaji",
    slug: "aydinlatma-montaji",
    categoryId: "aydinlatma",
    name: "Aydınlatma Montajı",
    shortDescription: "Avize, spot ve şerit LED montaj hizmeti",
    fullDescription:
      "'Avizeyi aldım ama takamıyorum' derdine son. Tavana delik delme, dübel çakma ve elektrik bağlantısını güvenle yapma işi bizde. Şerit LED döşeme, spot değişimi veya sensörlü lamba montajını temiz işçilikle yapıyoruz.",
    highlights: [
      "Avize montajı - tavan delme",
      "Spot ve panel montajı",
      "Şerit LED döşeme",
      "Elektrik bağlantı güvenliği",
      "Temiz ve hızlı işçilik",
    ],
    tags: ["montaj", "avize", "led", "elektrik"],
    seo: {
      title: "Avize Montajı evka 3 | Aydınlatma Kurulum Hizmeti - Bornova",
      description:
        "Profesyonel avize ve aydınlatma montajı. Spot, şerit LED, sensörlü lamba kurulumu. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "avize montajı evka 3",
        "aydınlatma kurulum",
        "şerit led montajı",
        "spot montajı",
      ],
    },
  },
  {
    id: "led-aydinlatma-ampul",
    slug: "led-aydinlatma-ampul",
    categoryId: "aydinlatma",
    name: "LED Aydınlatma ve Ampul Tedariği",
    shortDescription: "LED panel, spot, ampul ve projektörler",
    fullDescription:
      "Sıva altı veya sıva üstü paneller, spotlar ve projektörler. Isınma yapmayan, anında tam ışık veren ve titreme yapıp gözü bozmayan ürünler. Hem ofis hem ev için uzun ömürlü, garantili çözümler.",
    highlights: [
      "Isınma yapmayan LED teknoloji",
      "Anında tam ışık",
      "Göz yormayan kalite",
      "Panel, spot, projektör",
      "Garantili ve uzun ömürlü",
    ],
    tags: ["led", "ampul", "panel", "spot"],
    seo: {
      title: "LED Ampul ve Aydınlatma evka 3 | LED Panel, Spot - Bornova",
      description:
        "LED aydınlatma çözümleri. LED ampul, panel, spot, projektör. Enerji tasarruflu ve garantili. evka 3 Bornova. 0545 653 45 99",
      keywords: ["led ampul evka 3", "led panel", "led spot", "led projektör"],
    },
  },
  {
    id: "serit-led-dekoratif",
    slug: "serit-led-dekoratif",
    categoryId: "aydinlatma",
    name: "Şerit LED ve Dekoratif Aydınlatma",
    shortDescription: "Mutfak, tavan ve vitrin için şerit LED",
    fullDescription:
      "Mutfak tezgah altı, tavan havuzu veya vitrinler için güçlü ışık veren (3 çipli) şerit LED'ler. Arkasındaki yapışkanı hemen atmayan kaliteli seriler. Metrajına uygun trafosuyla (adaptör) hesaplayıp, lehimini yapıp çalışır vaziyette teslim ediyoruz.",
    highlights: [
      "3 çipli güçlü ışık",
      "Dayanıklı yapışkan",
      "Metrajına uygun trafo hesabı",
      "Lehim ve montaj hizmeti",
      "Mutfak, tavan, vitrin kullanımı",
    ],
    tags: ["serit-led", "dekoratif", "mutfak", "tavan"],
    seo: {
      title: "Şerit LED Satışı ve Montajı evka 3 | Dekoratif Aydınlatma - Bornova",
      description:
        "Şerit LED ve dekoratif aydınlatma. Mutfak, tavan, vitrin için. Montaj ve lehim hizmeti. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "şerit led evka 3",
        "mutfak tezgah aydınlatma",
        "tavan led",
        "dekoratif led",
      ],
    },
  },

  // ==================== BANYO MALZEMELERİ SERVICES ====================
  {
    id: "dus-basligi-hortum",
    slug: "dus-basligi-hortum",
    categoryId: "banyo-malzemeleri",
    name: "Duş Başlığı ve Hortumu",
    shortDescription: "Kireç kırıcılı duş başlığı ve çelik hortum",
    fullDescription:
      "Kireç kırıcılı, su delikleri tıkanmayan başlıklar ve basınca dayanıklı, çift kenetli çelik hortumlar. Suyu tazyikli ama yumuşak veren, montajı elinizle bile kolayca yapabileceğiniz standart ölçüde setler.",
    highlights: [
      "Kireç kırıcılı başlıklar",
      "Çift kenetli çelik hortum",
      "Basınca dayanıklı yapı",
      "Kolay montaj",
      "Standart ölçü uyumluluğu",
    ],
    tags: ["dus", "hortum", "banyo"],
    seo: {
      title: "Duş Başlığı ve Hortum Satışı evka 3 | Kireç Kırıcılı - Bornova",
      description:
        "Kaliteli duş başlığı ve çelik hortum. Kireç kırıcılı, basınca dayanıklı. Kolay montaj. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "duş başlığı evka 3",
        "duş hortumu",
        "kireç kırıcılı duş",
        "çelik hortum",
      ],
    },
  },
  {
    id: "banyo-batarya",
    slug: "banyo-batarya",
    categoryId: "banyo-malzemeleri",
    name: "Banyo Bataryası",
    shortDescription: "%100 pirinç gövdeli garantili bataryalar",
    fullDescription:
      "Gövdesi ağır, %100 pirinç malzemeden üretilmiş bataryalar. Üzerindeki krom kaplaması dökülmeyen, sıcak-soğuk kartuşu kısa sürede bozulmayan ürünler. Ucuz piyasa malı değil, uzun yıllar kullanacağınız garantili markalar.",
    highlights: [
      "%100 pirinç gövde",
      "Dökülmeyen krom kaplama",
      "Uzun ömürlü kartuş",
      "Garantili markalar",
      "Lavabo, duş, mutfak modelleri",
    ],
    tags: ["batarya", "musluk", "banyo"],
    seo: {
      title: "Banyo Bataryası Satışı evka 3 | Lavabo ve Duş Bataryası - Bornova",
      description:
        "Kaliteli banyo bataryaları. %100 pirinç gövde, garantili markalar. Lavabo, duş, mutfak. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "banyo bataryası evka 3",
        "lavabo bataryası",
        "duş bataryası",
        "musluk satışı",
      ],
    },
  },
  {
    id: "klozet-ic-takim",
    slug: "klozet-ic-takim",
    categoryId: "banyo-malzemeleri",
    name: "Klozet İç Takım",
    shortDescription: "Su kaçırmayan klozet mekanizması",
    fullDescription:
      "Su faturanızı kabartan sızıntılara son. Her rezervuar deposuna uyum sağlayan, su seviyesi ayarlanabilir mekanizmalar. Doldurma grubu sessiz çalışan, boşaltma contası zamanla erimeyen ve kaçırma yapmayan kaliteli takımlar.",
    highlights: [
      "Tüm rezervuarlara uyumlu",
      "Su seviyesi ayarlanabilir",
      "Sessiz doldurma",
      "Erimeyen contalar",
      "Su tasarrufu sağlar",
    ],
    tags: ["klozet", "ic-takim", "tesisat"],
    seo: {
      title: "Klozet İç Takım Satışı evka 3 | Su Kaçırmayan Mekanizma - Bornova",
      description:
        "Klozet iç takım ve mekanizma. Su kaçırmayan, sessiz çalışan, ayarlanabilir. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "klozet iç takım evka 3",
        "rezervuar mekanizması",
        "su kaçırma çözümü",
        "klozet tamiri",
      ],
    },
  },
  {
    id: "klozet-kapagi",
    slug: "klozet-kapagi",
    categoryId: "banyo-malzemeleri",
    name: "Klozet Kapağı",
    shortDescription: "Yavaş kapanan ve dayanıklı klozet kapakları",
    fullDescription:
      "Menteşesi paslanıp kırılmayan, klozete tam oturan (kayma yapmayan) kapaklar. İster standart, ister 'yavaş kapanan' (amortisörlü) sessiz modeller. Sararma yapmayan sert plastik (Duroplast) seçeneklerimiz mevcut.",
    highlights: [
      "Paslanmaz menteşe",
      "Kayma yapmayan oturma",
      "Yavaş kapanan (soft close) modeller",
      "Sararma yapmayan Duroplast",
      "Kolay montaj",
    ],
    tags: ["klozet", "kapak", "banyo"],
    seo: {
      title: "Klozet Kapağı Satışı evka 3 | Yavaş Kapanan Kapak - Bornova",
      description:
        "Klozet kapakları. Yavaş kapanan, sararma yapmayan, paslanmaz. Duroplast kapaklar. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "klozet kapağı evka 3",
        "yavaş kapanan klozet",
        "duroplast kapak",
        "soft close",
      ],
    },
  },
  {
    id: "banyo-aksesuarlari",
    slug: "banyo-aksesuarlari",
    categoryId: "banyo-malzemeleri",
    name: "Banyo Aksesuarları",
    shortDescription: "Paslanmaz havluluk, sabunluk ve raflar",
    fullDescription:
      "Nemli banyo ortamında paslanıp çirkinleşmeyen krom ve paslanmaz çelik aksesuarlar. Havluluk, kağıtlık, sabunluk ve köşe rafları. Montajı sağlam, vida yerleri gizli, şık ve temizliği kolay ürünler.",
    highlights: [
      "Paslanmaz krom/çelik",
      "Havluluk, kağıtlık, sabunluk",
      "Köşe rafları",
      "Sağlam montaj",
      "Temizliği kolay tasarım",
    ],
    tags: ["aksesuar", "havluluk", "banyo"],
    seo: {
      title: "Banyo Aksesuarları evka 3 | Havluluk, Sabunluk, Raf - Bornova",
      description:
        "Paslanmaz banyo aksesuarları. Havluluk, kağıtlık, sabunluk, köşe rafı. Şık ve dayanıklı. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "banyo aksesuarı evka 3",
        "havluluk satışı",
        "banyo rafı",
        "sabunluk",
      ],
    },
  },

  // ==================== TESİSAT MALZEMELERİ SERVICES ====================
  {
    id: "tesisat-malzeme-tedarik",
    slug: "tesisat-malzeme-tedarik",
    categoryId: "tesisat-malzemeleri",
    name: "Su Tesisatı Malzemesi Tedariği",
    shortDescription: "Hortum, sifon, bağlantı parçaları",
    fullDescription:
      "Patlamaya dayanıklı çelik örgülü fleks hortumlar, koku yapmayan lavabo sifonları, duş başlıkları ve sızdırmazlık ürünleri (teflon, keten). Ufak görünse de evi su basmasını önleyen kritik bağlantı parçaları.",
    highlights: [
      "Çelik örgülü fleks hortum",
      "Koku yapmayan sifonlar",
      "Sızdırmazlık malzemeleri",
      "Kritik bağlantı parçaları",
      "Su kaçağı önleme",
    ],
    tags: ["tesisat", "hortum", "sifon", "baglanti"],
    seo: {
      title: "Tesisat Malzemeleri evka 3 | Hortum, Sifon, Bağlantı - Bornova",
      description:
        "Su tesisatı malzemeleri. Fleks hortum, sifon, teflon, bağlantı parçaları. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "tesisat malzemeleri evka 3",
        "fleks hortum",
        "lavabo sifonı",
        "tesisat bağlantı",
      ],
    },
  },
  {
    id: "tesisat-montaj-hizmeti",
    slug: "tesisat-montaj-hizmeti",
    categoryId: "tesisat-malzemeleri",
    name: "Su Tesisatı Montaj Hizmeti",
    shortDescription: "Batarya değişimi, sifon tamiri, acil müdahale",
    fullDescription:
      "'Musluk damlatıyor', 'klozet su kaçırıyor' veya 'gider tıkandı' gibi sorunlarda hızlı çözüm. Batarya değişimi, sifon tamiri gibi işlemleri ehliyetli ustamızla yapıyor, ardımızda temiz ve çalışır bir tesisat bırakıyoruz.",
    highlights: [
      "Musluk damlama tamiri",
      "Klozet su kaçırma çözümü",
      "Batarya değişimi",
      "Sifon tamiri ve değişimi",
      "Ehliyetli usta ile hızlı servis",
    ],
    tags: ["montaj", "tesisat", "tamir", "servis"],
    seo: {
      title: "Tesisat Montajı ve Tamiri evka 3 | Batarya Değişimi - Bornova",
      description:
        "Profesyonel tesisat montaj ve tamir hizmeti. Musluk, batarya, sifon değişimi. Acil servis. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "tesisat montajı evka 3",
        "batarya değişimi bornova",
        "musluk tamiri",
        "sifon tamiri",
      ],
    },
  },

  // ==================== ELEKTRİK MALZEMELERİ SERVICES ====================
  {
    id: "elektrik-montaj-hizmeti",
    slug: "elektrik-montaj-hizmeti",
    categoryId: "elektrik-malzemeleri",
    name: "Elektrik Montaj Hizmeti",
    shortDescription: "Avize, priz, anahtar ve sigorta montajı",
    fullDescription:
      "Avize montajı, priz/anahtar değişimi veya sigorta yenileme işlemleri. Elektrik riskli iştir; ehliyetli ustalarımızla gelip, sorunu güvenli şekilde çözüyor ve temiz işçilikle teslim ediyoruz.",
    highlights: [
      "Ehliyetli elektrikçi",
      "Avize kurulum hizmeti",
      "Priz ve anahtar montajı",
      "Sigorta yenileme",
      "Güvenli ve temiz işçilik",
    ],
    tags: ["elektrik", "montaj", "avize", "priz"],
    seo: {
      title: "Elektrik Montajı evka 3 | Avize, Priz, Anahtar Montaj - Bornova",
      description:
        "Profesyonel elektrik montajı. Avize kurulum, priz/anahtar değişimi, sigorta montajı. Ehliyetli usta. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "elektrik montajı evka 3",
        "avize montajı bornova",
        "priz değişimi",
        "elektrikçi",
      ],
    },
  },
  {
    id: "elektrik-kablo-aksesuar",
    slug: "elektrik-kablo-aksesuar",
    categoryId: "elektrik-malzemeleri",
    name: "Elektrik Kablosu ve Aksesuar Tedariği",
    shortDescription: "TSE standartında bakır kablo ve bağlantı malzemeleri",
    fullDescription:
      "TSE standartlarında, içi tam bakır kablolar. Uzatma için yumuşak (TTR), tesisat için sert (Antigron/NYA) kablo çeşitleri. İhtiyacınız kadar metreyle kesiyoruz; ısınma yapmayan, akımı güvenle taşıyan doğru kesitte kablo veriyoruz.",
    highlights: [
      "TSE standartında tam bakır",
      "TTR (yumuşak) ve NYA (sert) kablo",
      "Metreyle kesim hizmeti",
      "Isınma yapmayan kalite",
      "Doğru kesit danışmanlığı",
    ],
    tags: ["kablo", "elektrik", "baglanti"],
    seo: {
      title: "Elektrik Kablosu Satışı evka 3 | TTR, NYA Kablo - Bornova",
      description:
        "TSE standartında elektrik kablosu. Tam bakır TTR, NYA kablo. Metreyle kesim. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "elektrik kablosu evka 3",
        "ttr kablo",
        "nya kablo",
        "bakır kablo",
      ],
    },
  },
  {
    id: "priz-anahtar-sigorta",
    slug: "priz-anahtar-sigorta",
    categoryId: "elektrik-malzemeleri",
    name: "Priz, Anahtar ve Sigorta Tedariği",
    shortDescription: "Dayanıklı priz, anahtar ve sigorta malzemeleri",
    fullDescription:
      "İç mekanizması dayanıklı, ark (kıvılcım) yapmayan ve çocuk korumalı priz çeşitleri. Evinizin dekorasyonuna uyacak modern çerçeveler, sıva altı ve sıva üstü anahtar grupları. Montajı kolay, vidası yalama olmayan kaliteli seriler.",
    highlights: [
      "Ark yapmayan mekanizma",
      "Çocuk korumalı prizler",
      "Modern dekoratif çerçeveler",
      "Sıva altı/üstü modeller",
      "Dayanıklı vida sistemi",
    ],
    tags: ["priz", "anahtar", "sigorta", "elektrik"],
    seo: {
      title: "Priz ve Anahtar Satışı evka 3 | Elektrik Malzemeleri - Bornova",
      description:
        "Kaliteli priz, anahtar ve sigorta. Çocuk korumalı, ark yapmayan. Modern tasarımlar. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "priz satışı evka 3",
        "anahtar satışı",
        "elektrik prizı",
        "sigorta",
      ],
    },
  },
  {
    id: "pil-kucuk-elektrik",
    slug: "pil-kucuk-elektrik",
    categoryId: "elektrik-malzemeleri",
    name: "Pil ve Küçük Elektrik Malzemesi",
    shortDescription: "Taze piller ve küçük elektrik aksesuarları",
    fullDescription:
      "Rafta beklemiş, voltajı düşmüş bayat pil satmıyoruz. Tarihi yeni; kumanda, saat, tartı ve oyuncaklar için alkalin ve şarjlı piller. Akma yapmayan, cihazınızı bozmayan uzun ömürlü çeşitler.",
    highlights: [
      "Taze, tarihi yeni piller",
      "Alkalin ve şarjlı çeşitler",
      "Akma yapmayan kalite",
      "Uzun ömürlü depolama",
      "Çeşitli ebatlar (AA, AAA, 9V)",
    ],
    tags: ["pil", "batarya", "elektrik"],
    seo: {
      title: "Pil Satışı evka 3 | Alkalin ve Şarjlı Piller - Bornova",
      description:
        "Taze ve kaliteli piller. Alkalin, şarjlı, çeşitli ebatlar. Akma yapmayan. evka 3 Bornova. 0545 653 45 99",
      keywords: ["pil satışı evka 3", "alkalin pil", "şarjlı pil", "batarya"],
    },
  },

  // ==================== FİDAN TOPTANCI SERVICES ====================
  {
    id: "toptan-fidan-teslimat",
    slug: "toptan-fidan-teslimat",
    categoryId: "fidan-toptanci",
    name: "Toptan Fidan Teslimat",
    shortDescription: "İzmir genelinde toplu fidan nakliyesi",
    fullDescription:
      "Peyzaj projeleri, site uygulamaları veya işletme düzenlemeleri için yaptığınız toplu alımlarda lojistik çözümler sunuyoruz. Yüksek adetli veya büyük boylu bitkilerin, canlılığını ve formunu koruyarak, ezilmeden ve hırpalanmadan transferini sağlıyoruz.",
    highlights: [
      "İzmir geneli güvenli teslimat",
      "Yüksek adetli alımlar",
      "Büyük boylu bitki taşıma",
      "Form ve canlılık koruması",
      "Peyzaj projelerine özel",
    ],
    tags: ["toptan", "teslimat", "nakliye", "peyzaj"],
    seo: {
      title: "Toptan Fidan Teslimatı İzmir | Peyzaj Projesi Lojistik - evka 3",
      description:
        "İzmir genelinde toptan fidan teslimatı. Peyzaj, site, işletme projeleri için. Güvenli nakliye. 0545 653 45 99",
      keywords: [
        "toptan fidan teslimat izmir",
        "peyzaj lojistik",
        "fidan nakliye",
        "toplu bitki taşıma",
      ],
    },
  },
  {
    id: "restoran-kafe-bitki",
    slug: "restoran-kafe-bitki",
    categoryId: "fidan-toptanci",
    name: "Restoran ve Kafe için Bitki Tedariği",
    shortDescription: "Mekan atmosferi için özel bitki seçimi",
    fullDescription:
      "Mekanınızın atmosferini güçlendiren, misafirlerinize daha keyifli bir ortam sunmanızı sağlayan bitki çözümleri. Masa üstü dekoratif bitkilerden, bahçe bölümlerindeki gölge sağlayan ağaçlara kadar; işletmenizin konseptine, insan trafiğine ve ışık durumuna uygun, bakımı yönetilebilir canlı bitkiler.",
    highlights: [
      "Konsepte uygun bitki seçimi",
      "Masa üstü dekoratif bitkiler",
      "Gölge sağlayan ağaçlar",
      "Bakımı kolay türler",
      "Yoğun trafiğe dayanıklı",
    ],
    tags: ["kurumsal", "restoran", "kafe", "toptan"],
    seo: {
      title: "Restoran ve Kafe Bitki Tedariği İzmir | Yeşil Mekan - evka 3",
      description:
        "Restoran ve kafeler için özel bitki tedariği. Atmosfer yaratma, dekoratif çözümler. İzmir. 0545 653 45 99",
      keywords: [
        "restoran bitkisi izmir",
        "kafe yeşillendirme",
        "dekoratif bitki",
        "masa bitkisi",
      ],
    },
  },
  {
    id: "otel-konaklama-bitki",
    slug: "otel-konaklama-bitki",
    categoryId: "fidan-toptanci",
    name: "Otel ve Konaklama için Bitki Tedariği",
    shortDescription: "Lobi, havuz ve oda için prestijli bitkiler",
    fullDescription:
      "Misafirlerinizi karşıladığınız lobiden, havuz başına ve oda içlerine kadar otelinizin kalitesine yakışacak peyzaj ürünleri. Tesisinizin mimarisiyle bütünleşen, görsel kalitesi yüksek, dört mevsim bakımlı görünen dayanıklı iç ve dış mekan bitkilerini projenize uygun olarak sağlıyoruz.",
    highlights: [
      "Lobi, havuz, oda bitkileri",
      "Dört mevsim bakımlı görünüm",
      "Mimariyle bütünleşen seçim",
      "Prestijli görsel kalite",
      "Projeye özel tedarik",
    ],
    tags: ["kurumsal", "otel", "konaklama", "toptan"],
    seo: {
      title: "Otel Bitki Tedariği İzmir | Konaklama Peyzajı - evka 3",
      description:
        "Oteller için profesyonel bitki tedariği. Lobi, havuz, oda bitkileri. Prestijli çözümler. İzmir. 0545 653 45 99",
      keywords: [
        "otel bitkisi izmir",
        "lobi bitkisi",
        "konaklama peyzaj",
        "havuz bitki",
      ],
    },
  },
  {
    id: "ofis-isyeri-bitki",
    slug: "ofis-isyeri-bitki",
    categoryId: "fidan-toptanci",
    name: "Ofis ve İş Yeri için Bitki Tedariği",
    shortDescription: "Çalışan verimliliği için yeşil ofis çözümleri",
    fullDescription:
      "Çalışma ortamının havasını değiştiren, çalışan motivasyonunu ve verimliliğini destekleyen yeşil ofis çözümleri. Plazaların ve ofislerin havalandırma/ışık koşullarına dayanıklı, bakımı kolay ve kurumsal kimliğinize prestij katan uzun ömürlü salon bitkileri sunuyoruz.",
    highlights: [
      "Motivasyon ve verimlilik artışı",
      "Havalandırma koşullarına uygun",
      "Bakımı kolay salon bitkileri",
      "Kurumsal prestij",
      "Uzun ömürlü türler",
    ],
    tags: ["kurumsal", "ofis", "isyeri", "toptan"],
    seo: {
      title: "Ofis Bitki Tedariği İzmir | Yeşil Ofis Çözümleri - evka 3",
      description:
        "Ofis ve iş yerleri için bitki tedariği. Çalışan verimliliğini artıran yeşil çözümler. İzmir. 0545 653 45 99",
      keywords: [
        "ofis bitkisi izmir",
        "yeşil ofis",
        "iş yeri bitkisi",
        "plaza bitkisi",
      ],
    },
  },
  {
    id: "magaza-showroom-bitki",
    slug: "magaza-showroom-bitki",
    categoryId: "fidan-toptanci",
    name: "Mağaza ve Showroom için Bitki Tedariği",
    shortDescription: "Müşteri deneyimini artıran dekoratif bitkiler",
    fullDescription:
      "Vitrin tasarımınızı ve mağaza içi dekorasyonunuzu tamamlayan, ürünlerinizin önüne geçmeden mekana değer katan bitkiler. Müşteri deneyimini iyileştiren, yapay ışık ortamlarında dahi formunu koruyabilen, mağazanızın enerjisini yükselten estetik seçenekler.",
    highlights: [
      "Vitrin ve mağaza dekoru",
      "Müşteri deneyimi iyileştirme",
      "Yapay ışıkta dayanıklı",
      "Ürünlere zarar vermeyen yerleşim",
      "Mağaza enerjisi yükseltme",
    ],
    tags: ["kurumsal", "magaza", "showroom", "toptan"],
    seo: {
      title: "Mağaza Bitki Tedariği İzmir | Showroom Dekorasyon - evka 3",
      description:
        "Mağaza ve showroom için bitki tedariği. Müşteri deneyimini artıran dekoratif çözümler. İzmir. 0545 653 45 99",
      keywords: [
        "mağaza bitkisi izmir",
        "showroom dekoru",
        "vitrin bitkisi",
        "perakende yeşil",
      ],
    },
  },
  {
    id: "kuafor-guzellik-bitki",
    slug: "kuafor-guzellik-bitki",
    categoryId: "fidan-toptanci",
    name: "Kuaför ve Güzellik Salonu için Bitkiler",
    shortDescription: "Ferah ve dinlendirici atmosfer için bitkiler",
    fullDescription:
      "Güzellik ve bakım merkezlerinde müşterilerin aradığı ferah ve dinlendirici atmosferi yaratan bitkiler. Mekanın nem dengesine ve kimyasal kullanımına uyum sağlayan, dekoratif saksılarla sunulan ve salonunuzun şıklığını tamamlayan zarif bitki türleri.",
    highlights: [
      "Ferah ve dinlendirici atmosfer",
      "Nem ve kimyasala dayanıklı",
      "Dekoratif saksı tasarımı",
      "Salon şıklığı",
      "Zarif bitki türleri",
    ],
    tags: ["kurumsal", "kuafor", "guzellik", "toptan"],
    seo: {
      title: "Kuaför ve Güzellik Salonu Bitki Tedariği İzmir - evka 3",
      description:
        "Kuaför ve güzellik salonları için özel bitki tedariği. Dinlendirici atmosfer. İzmir. 0545 653 45 99",
      keywords: [
        "kuaför bitkisi izmir",
        "güzellik salonu bitki",
        "berber bitkisi",
        "spa bitki",
      ],
    },
  },
  {
    id: "apartman-site-fidan",
    slug: "apartman-site-fidan",
    categoryId: "fidan-toptanci",
    name: "Apartman ve Site için Toptan Fidan",
    shortDescription: "Toplu konut peyzajı için ekonomik çözümler",
    fullDescription:
      "Site ve apartman bahçeleri için bütçe dostu, bakım maliyeti düşük ve bölge iklimine uyumlu peyzaj bitkileri. Çevre düzenlemesi, çit bitkileriyle sınır belirleme ve ortak kullanım alanlarını yeşillendirme projelerinizde; apartman ve site yönetimlerinin güvenilir çözüm ortağıyız.",
    highlights: [
      "Bütçe dostu fiyatlandırma",
      "Düşük bakım maliyeti",
      "Çit ve sınır bitkileri",
      "Ortak alan yeşillendirme",
      "Site yönetimi desteği",
    ],
    tags: ["toptan", "apartman", "site", "peyzaj"],
    seo: {
      title: "Apartman ve Site Fidan Satışı İzmir | Toplu Konut Peyzaj - evka 3",
      description:
        "Apartman ve siteler için toptan fidan. Bütçe dostu, düşük bakım. Peyzaj çözümleri. İzmir. 0545 653 45 99",
      keywords: [
        "apartman fidanı izmir",
        "site peyzaj",
        "toplu konut bitki",
        "çit bitkisi",
      ],
    },
  },
  {
    id: "peyzaj-firma-tedarik",
    slug: "peyzaj-firma-tedarik",
    categoryId: "fidan-toptanci",
    name: "Peyzaj Firmaları için Fidan Tedariği",
    shortDescription: "Peyzaj projelerine özel bitki tedarik desteği",
    fullDescription:
      "Peyzaj mimarları ve uygulama firmaları için proje standartlarına tam uyumlu bitki tedariği. Tasarımınızda yer alan bitkileri, istediğiniz boy, form ve adetlerde, şantiyenizin iş takvimine sadık kalarak temin ediyoruz. Projelerinizde stok ve lojistik desteğimizle yanınızdayız.",
    highlights: [
      "Proje standartlarına uyumlu",
      "İstenen boy ve form",
      "İş takvimine sadık teslimat",
      "Stok yönetimi desteği",
      "Lojistik çözümler",
    ],
    tags: ["toptan", "peyzaj", "firma", "proje"],
    seo: {
      title: "Peyzaj Firmaları Fidan Tedariği İzmir | Proje Desteği - evka 3",
      description:
        "Peyzaj firmaları için profesyonel fidan tedariği. Proje standartlarına uygun, zamanında teslimat. İzmir. 0545 653 45 99",
      keywords: [
        "peyzaj fidan tedariği",
        "peyzaj firması destek",
        "proje bitki",
        "toptan fidan",
      ],
    },
  },
  {
    id: "belediye-kamu-fidan",
    slug: "belediye-kamu-fidan",
    categoryId: "fidan-toptanci",
    name: "Belediye ve Kamu Kurumları için Fidan",
    shortDescription: "Kamu projeleri için sertifikalı dayanıklı fidanlar",
    fullDescription:
      "Okul bahçeleri, parklar, hastaneler ve kamu binaları için dayanıklılığı yüksek ağaç ve bitki grupları. Halka açık alanlardaki yoğun kullanıma dirençli, gölge sağlayan, hızlı büyüyen ve kamu projelerinin teknik şartnamelerine uygun sertifikalı fidanlar.",
    highlights: [
      "Sertifikalı fidanlar",
      "Yoğun kullanıma dayanıklı",
      "Gölge sağlayan ağaçlar",
      "Teknik şartnamelere uygun",
      "Okul, park, hastane projeleri",
    ],
    tags: ["toptan", "belediye", "kamu", "sertifikali"],
    seo: {
      title: "Belediye ve Kamu Fidan Tedariği İzmir | Sertifikalı - evka 3",
      description:
        "Belediye ve kamu kurumları için sertifikalı fidan tedariği. Park, okul, hastane projeleri. İzmir. 0545 653 45 99",
      keywords: [
        "belediye fidan izmir",
        "kamu fidan tedariği",
        "park ağacı",
        "sertifikalı fidan",
      ],
    },
  },

  // ==================== YAPI MALZEMELERİ SERVICES ====================
  {
    id: "cimento-satisi",
    slug: "cimento-satisi",
    categoryId: "yapi-malzemeleri",
    name: "Çimento Satışı",
    shortDescription: "Taze çimento - torba ve açık satış",
    fullDescription:
      "Rafta bekleyip taşlaşmış değil, taze ve toz formunu koruyan çimento. Büyük inşaat işleri için torba, evdeki ufak tamiratlar (kırık, dökük kapatma) için ihtiyacınız kadar kilo ile açık satışımız var. Gri ve beyaz çimento seçenekleri.",
    highlights: [
      "Taze, taşlaşmamış çimento",
      "Torba ve açık satış",
      "Gri ve beyaz çimento",
      "İnşaat ve tamirat için",
      "İhtiyaca göre kilogram satış",
    ],
    tags: ["cimento", "yapi", "insaat"],
    seo: {
      title: "Çimento Satışı evka 3 | Taze Torba ve Açık Çimento - Bornova",
      description:
        "Taze çimento satışı. Torba ve açık çimento, gri ve beyaz. İnşaat ve tamirat için. evka 3 Bornova. 0545 653 45 99",
      keywords: ["çimento satışı evka 3", "torba çimento", "açık çimento", "beyaz çimento"],
    },
  },
  {
    id: "alci-siva-malzeme",
    slug: "alci-siva-malzeme",
    categoryId: "yapi-malzemeleri",
    name: "Alçı ve Sıva Malzemesi Tedariği",
    shortDescription: "Kartonpiyer, saten alçı ve sıva malzemeleri",
    fullDescription:
      "Duvardaki delikleri kapatmak ve hızlı donması için 'Kartonpiyer Alçısı', pürüzsüz ve son kat yüzey elde etmek için 'Saten Alçı'. Hangi işlemi yapacağınıza göre doğru alçıyı veriyor, boşa uğraşmanızı engelliyoruz.",
    highlights: [
      "Kartonpiyer alçısı - hızlı donma",
      "Saten alçı - pürüzsüz yüzey",
      "Uygulama danışmanlığı",
      "Delik kapatma çözümleri",
      "Son kat sıva malzemeleri",
    ],
    tags: ["alci", "siva", "yapi", "tamirat"],
    seo: {
      title: "Alçı ve Sıva Satışı evka 3 | Kartonpiyer, Saten Alçı - Bornova",
      description:
        "Alçı ve sıva malzemeleri. Kartonpiyer alçı, saten alçı, duvar sıva. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "alçı satışı evka 3",
        "kartonpiyer alçı",
        "saten alçı",
        "sıva malzemesi",
      ],
    },
  },
  {
    id: "fayans-yapistirma",
    slug: "fayans-yapistirma",
    categoryId: "yapi-malzemeleri",
    name: "Fayans Yapıştırma Malzemeleri",
    shortDescription: "Fayans harçı ve derz dolgu",
    fullDescription:
      "Fayans, seramik ve mermer için yüksek tutuş gücüne sahip (Kalekim tipi) harçlar ve su geçirmeyen derz dolgular. Banyo gibi ıslak zeminlerde zamanla bırakma yapmayan, sıcak-soğuk değişimlerine dayanıklı ürünler.",
    highlights: [
      "Yüksek tutuş gücü",
      "Su geçirmez derz dolgu",
      "Islak zeminlere uygun",
      "Sıcak-soğuk dayanıklılığı",
      "Fayans, seramik, mermer için",
    ],
    tags: ["fayans", "seramik", "harç", "yapi"],
    seo: {
      title: "Fayans Harçı ve Derz Dolgu Satışı evka 3 | Seramik - Bornova",
      description:
        "Fayans yapıştırma malzemeleri. Fayans harçı, derz dolgu, seramik yapıştırıcı. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "fayans harçı evka 3",
        "derz dolgu",
        "seramik yapıştırıcı",
        "kalekim",
      ],
    },
  },
  {
    id: "insaat-baglanti-malzeme",
    slug: "insaat-baglanti-malzeme",
    categoryId: "yapi-malzemeleri",
    name: "İnşaat Bağlantı Malzemeleri",
    shortDescription: "Çivi, tel ve bağlantı elemanları",
    fullDescription:
      "Çakarken yamulmayan çelik beton çivileri, ahşap çivileri ve bağlama telleri. Paslı veya eğri büğrü ürün satmıyoruz. İster bir avuç, ister kilo ile; projenize yetecek kadar tartıp veriyoruz.",
    highlights: [
      "Yamulmayan çelik çiviler",
      "Ahşap ve beton çivileri",
      "Bağlama telleri",
      "Paslanmaz kalite",
      "Tartılı satış - gram hassasiyeti",
    ],
    tags: ["civi", "tel", "baglanti", "insaat"],
    seo: {
      title: "İnşaat Çivisi ve Bağlantı Malzemesi evka 3 | Beton Çivi - Bornova",
      description:
        "İnşaat bağlantı malzemeleri. Çelik çivi, ahşap çivi, bağlama teli. Tartılı satış. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "inşaat çivisi evka 3",
        "beton çivisi",
        "ahşap çivisi",
        "bağlama teli",
      ],
    },
  },
  {
    id: "boya-ekipmanlari",
    slug: "boya-ekipmanlari",
    categoryId: "yapi-malzemeleri",
    name: "Boya Ekipmanları Tedariği",
    shortDescription: "Fırça, rulo, maskeleme ve koruyucu malzemeler",
    fullDescription:
      "Kıl dökmeyen fırçalar, iz bırakmayan rulolar, maskeleme bantları ve hışır örtüler. Boyayı duvara sürmek kolaydır ama temiz iş çıkarmak zordur; biz işinizi kolaylaştıracak, etrafı kirletmeden çalışmanızı sağlayan kaliteli ekipmanları satıyoruz.",
    highlights: [
      "Kıl dökmeyen fırçalar",
      "İz bırakmayan rulolar",
      "Maskeleme bantları",
      "Hışır koruyucu örtü",
      "Temiz iş için kaliteli ekipman",
    ],
    tags: ["boya", "firca", "rulo", "ekipman"],
    seo: {
      title: "Boya Ekipmanları Satışı evka 3 | Fırça, Rulo, Bant - Bornova",
      description:
        "Boya fırçası, rulo, maskeleme bantı, hışır örtü. Temiz işçilik için kaliteli ekipman. evka 3 Bornova. 0545 653 45 99",
      keywords: [
        "boya fırçası evka 3",
        "boya rulosu",
        "maskeleme bantı",
        "hışır örtü",
      ],
    },
  },
  {
    id: "boya-yardimci-malzeme",
    slug: "boya-yardimci-malzeme",
    categoryId: "yapi-malzemeleri",
    name: "Boya Yardımcı Malzemeleri",
    shortDescription: "Macun, astar, zımpara ve spatula",
    fullDescription:
      "Boyanın duvarda sağlam durması ve pürüzsüz görünmesi için gereken; duvar macunu, astar, zımpara ve spatulalar. Sadece boyayı değil, zemin hazırlığı için gereken tüm malzemeleri doğru sırayla öneriyoruz.",
    highlights: [
      "Duvar macunu - pürüzsüz yüzey",
      "Astar - boya tutuşu",
      "Zımpara kağıtları",
      "Spatula çeşitleri",
      "Zemin hazırlık danışmanlığı",
    ],
    tags: ["boya", "macun", "astar", "yardimci"],
    seo: {
      title: "Boya Yardımcı Malzemeleri evka 3 | Macun, Astar, Zımpara - Bornova",
      description:
        "Boya hazırlık malzemeleri. Duvar macunu, astar, zımpara, spatula. Zemin hazırlık danışmanlığı. evka 3 Bornova.",
      keywords: [
        "duvar macunu evka 3",
        "boya astarı",
        "zımpara kağıdı",
        "spatula",
      ],
    },
  },
];

/**
 * Helper functions
 */
export function getServiceBySlug(
  categorySlug: string,
  serviceSlug: string
): GBPService | undefined {
  const category = GBP_SERVICES.find((s) => s.categoryId === categorySlug);
  if (!category) return undefined;
  return GBP_SERVICES.find(
    (s) => s.categoryId === categorySlug && s.slug === serviceSlug
  );
}

export function getServicesByCategoryId(categoryId: string): GBPService[] {
  return GBP_SERVICES.filter((service) => service.categoryId === categoryId);
}

export function getAllServices(): GBPService[] {
  return GBP_SERVICES;
}

// Re-export category functions for convenience
export { getAllCategories, getCategoryBySlug } from "./categories";
