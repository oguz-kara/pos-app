import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  CheckCircle2,
  Home,
  ChevronRight,
  Star,
  Clock,
  Truck,
  Users,
  Navigation,
  ArrowRight,
  Sprout,
  Wrench,
  Store,
  Package
} from "lucide-react";
import {
  getAllLocations,
  getLocationBySlug,
  getRelatedLocations
} from "@/lib/content/locations";
import { getAllCategories } from "@/lib/content/categories";

// 1. Generate static params for all Bornova neighborhoods
export async function generateStaticParams() {
  const locations = getAllLocations();
  const bornovaNeighborhoods = locations.filter(
    loc => loc.type === "neighborhood" && loc.district === "Bornova"
  );

  return bornovaNeighborhoods.map((neighborhood) => ({
    mahalleSlug: neighborhood.slug,
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({
  params
}: {
  params: Promise<{ mahalleSlug: string }>
}): Promise<Metadata> {
  const { mahalleSlug } = await params;
  const location = getLocationBySlug(mahalleSlug);

  if (!location) return { title: "Mahalle Bulunamadı" };

  return {
    title: location.seo.title,
    description: location.seo.description,
    keywords: location.seo.keywords,
    openGraph: {
      title: location.seo.title,
      description: location.seo.description,
      type: "website",
      locale: "tr_TR",
    },
    alternates: {
      canonical: `https://karaticaret.com.tr/bornova/${location.slug}`,
    },
  };
}

// 3. Neighborhood Page
export default async function NeighborhoodPage({
  params
}: {
  params: Promise<{ mahalleSlug: string }>
}) {
  const { mahalleSlug } = await params;
  const location = getLocationBySlug(mahalleSlug);

  if (!location || location.type !== "neighborhood") notFound();

  // Get all categories
  const categories = getAllCategories();
  const plantCategories = categories.filter(c =>
    ['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(c.id)
  );
  const hardwareCategories = categories.filter(c =>
    !['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(c.id)
  );

  // Get related neighborhoods (nearby in Bornova)
  const relatedLocations = getRelatedLocations(location.id, "neighborhood")
    .filter(loc => loc.district === "Bornova")
    .slice(0, 6);

  // Determine delivery info and messaging based on location
  const isHomeNeighborhood = location.slug === "evka-3-mahallesi";
  const isVeryClose = location.distance.fromEvka3Km <= 2;
  const isClose = location.distance.fromEvka3Km <= 5;

  const getDeliveryInfo = () => {
    if (isHomeNeighborhood) {
      return {
        time: "Mağazamız burada",
        subtitle: "Kapımızı çalın, hemen yardımcı olalım",
        cost: "Ücretsiz teslimat",
        zone: "home",
        icon: Store
      };
    } else if (isVeryClose) {
      return {
        time: "15-30 dakika",
        subtitle: "Bornova içi express teslimat",
        cost: "Ücretsiz teslimat (300₺ üzeri)",
        zone: "express",
        icon: Truck
      };
    } else if (isClose) {
      return {
        time: "30-60 dakika",
        subtitle: "Bornova içi hızlı teslimat",
        cost: "Ücretsiz teslimat (500₺ üzeri)",
        zone: "fast",
        icon: Truck
      };
    } else {
      return {
        time: "1-2 saat",
        subtitle: "Aynı gün teslimat",
        cost: "Ücretsiz teslimat (500₺ üzeri)",
        zone: "same-day",
        icon: Package
      };
    }
  };

  const deliveryInfo = getDeliveryInfo();
  const DeliveryIcon = deliveryInfo.icon;

  // Hero messaging
  const getHeroMessage = () => {
    if (isHomeNeighborhood) {
      return "Mağazamız {location} kalbinde yer alıyor. Komşunuz olarak sizlere en yakın hizmet için buradayız.";
    } else if (isVeryClose) {
      return "Evka 3 mağazamızdan {location} bölgesine 15-30 dakikada teslim. Bornova içi hızlı servis.";
    } else {
      return "{location} bölgesine Evka 3'ten güvenli ve hızlı teslimat. Aynı gün içinde kapınızda.";
    }
  };

  const heroMessage = getHeroMessage().replace("{location}", location.name);

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB NAV */}
      <div className="border-b bg-slate-50/50">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
          <Link href="/" className="hover:text-primary flex items-center gap-1">
            <Home className="h-3 w-3" /> Anasayfa
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href="/bornova" className="hover:text-primary">
            Bornova
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="font-medium text-foreground">{location.name.replace(' Mahallesi', '')}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className={`relative w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-b ${isHomeNeighborhood ? 'from-green-50 to-white' : 'from-blue-50 to-white'}`}>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                {isHomeNeighborhood && (
                  <Badge className="bg-green-600 text-white border-0">
                    <Store className="h-3 w-3 mr-1" />
                    Mağazamız Burada
                  </Badge>
                )}
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  <MapPin className="h-3 w-3 mr-1" />
                  Bornova
                </Badge>
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  <Users className="h-3 w-3 mr-1" />
                  {location.population.toLocaleString('tr-TR')} nüfus
                </Badge>
                {!isHomeNeighborhood && (
                  <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                    <Navigation className="h-3 w-3 mr-1" />
                    {location.distance.fromEvka3Km.toFixed(1)} km
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                {location.name} Çiçekçi & Hırdavat
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                {heroMessage}
              </p>

              {/* Delivery Badge */}
              <div className={`inline-flex items-center gap-3 px-5 py-4 rounded-xl ${isHomeNeighborhood ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'} border`}>
                <div className={`p-2 rounded-lg ${isHomeNeighborhood ? 'bg-green-100' : 'bg-blue-100'}`}>
                  <DeliveryIcon className={`h-5 w-5 ${isHomeNeighborhood ? 'text-green-700' : 'text-blue-700'}`} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${isHomeNeighborhood ? 'text-green-900' : 'text-blue-900'}`}>
                    {deliveryInfo.time}
                  </p>
                  <p className={`text-xs ${isHomeNeighborhood ? 'text-green-700' : 'text-blue-700'}`}>
                    {deliveryInfo.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="tel:05456534599">
                  <Button size="lg" className={`w-full sm:w-auto text-base h-12 font-bold ${isHomeNeighborhood ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {isHomeNeighborhood ? "Bizi Arayın" : "Sipariş Ver"}
                  </Button>
                </a>
                <a
                  href={isHomeNeighborhood
                    ? "https://www.google.com/maps?q=38.4487,27.1942"
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' Bornova İzmir')}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 bg-white border-slate-300">
                    <MapPin className="mr-2 h-4 w-4 text-slate-500" />
                    {isHomeNeighborhood ? "Mağaza Konumu" : "Yol Tarifi"}
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 pt-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-slate-700">5.0/5</span>
                <span>Müşteri Puanı (Google)</span>
              </div>
            </div>

            {/* Right: Benefits Cards */}
            <div className="relative hidden lg:block h-[400px] w-full">
              <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full ${isHomeNeighborhood ? 'bg-green-50' : 'bg-blue-50'} opacity-50 blur-3xl`} />
              <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-orange-50 opacity-50 blur-2xl" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {location.characteristics.slice(0, 4).map((characteristic, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3 transform hover:-translate-y-1 transition-transform duration-300">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 ${isHomeNeighborhood ? 'text-green-700' : 'text-blue-700'}`} />
                      <span className="text-sm font-medium text-slate-700">{characteristic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {location.name} Bölgesine Hizmetlerimiz
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {isHomeNeighborhood
                ? "Mağazamızda bulabileceğiniz tüm ürün ve hizmetler"
                : `Evka 3'ten ${location.name} bölgesine teslim edilen ürünler`
              }
            </p>
          </div>

          {/* Plant Categories */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                <Sprout className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Fidanlık & Çiçekçilik</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plantCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/kategoriler/${category.slug}`}
                  className="group block"
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                          {category.name}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Hardware Categories */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-50 border border-orange-100">
                <Wrench className="h-6 w-6 text-orange-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Hırdavat & Yapı Malzemeleri</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hardwareCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/kategoriler/${category.slug}`}
                  className="group block"
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {category.name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {category.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL INFO SECTION */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {isHomeNeighborhood ? "Evka 3'te Yerel Hizmet" : `${location.name} İçin Özel Hizmet`}
            </h2>
            <p className="text-lg text-slate-600">
              {isHomeNeighborhood
                ? "Komşunuz olarak size özel avantajlar sunuyoruz"
                : "Bornova içi hızlı ve güvenilir teslimat"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <div className={`p-3 rounded-xl ${isHomeNeighborhood ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'} border w-fit mb-4`}>
                <Truck className={`h-6 w-6 ${isHomeNeighborhood ? 'text-green-700' : 'text-blue-700'}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isHomeNeighborhood ? "Gel-Al Servisi" : "Hızlı Teslimat"}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {isHomeNeighborhood
                  ? "Mağazamızdan doğrudan ürün alabilir, aynı zamanda teslimat hizmeti de sunuyoruz."
                  : `${location.name} bölgesine ${deliveryInfo.time.toLowerCase()} içinde teslimat. ${deliveryInfo.cost}.`
                }
              </p>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <div className="p-3 rounded-xl bg-green-50 border border-green-100 w-fit mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kalite Garantisi</h3>
              <p className="text-slate-600 leading-relaxed">
                Tüm ürünlerimizde kalite garantisi. Fidanlarımız taze ve sağlıklı, hırdavat ürünlerimiz markali.
              </p>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 w-fit mb-4">
                <Phone className="h-6 w-6 text-orange-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Uzman Destek</h3>
              <p className="text-slate-600 leading-relaxed">
                9 yıllık tecrübemizle ürün seçiminde size yardımcı oluyoruz. Telefon ile danışabilirsiniz.
              </p>
            </Card>
          </div>

          {/* Special CTA for home neighborhood */}
          {isHomeNeighborhood && (
            <div className="mt-12">
              <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
                <div className="max-w-2xl mx-auto text-center">
                  <Store className="h-12 w-12 text-green-700 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Mağazamızı Ziyaret Edin
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    Komşunuz olarak kapımız size her zaman açık. Ürünlerimizi yerinde görün, uzman ekibimizle görüşün.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://www.google.com/maps?q=38.4487,27.1942" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="bg-green-600 hover:bg-green-700">
                        <MapPin className="mr-2 h-4 w-4" />
                        Yol Tarifi Al
                      </Button>
                    </a>
                    <a href="tel:05456534599">
                      <Button size="lg" variant="outline" className="border-slate-300">
                        <Phone className="mr-2 h-4 w-4" />
                        Bizi Arayın
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* NEARBY NEIGHBORHOODS */}
      {relatedLocations.length > 0 && (
        <section className="container py-16 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Yakın Mahalleler</h2>
              <p className="text-slate-600">
                {location.name} çevresindeki diğer Bornova mahalleleri
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLocations.map((nearby) => (
                <Link
                  key={nearby.id}
                  href={`/bornova/${nearby.slug}`}
                  className="group block"
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-slate-600">
                        <Navigation className="h-3 w-3 mr-1" />
                        {nearby.distance.fromEvka3Km.toFixed(1)} km
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                      {nearby.name.replace(' Mahallesi', '')}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {nearby.population.toLocaleString('tr-TR')} nüfus
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                      <span>Detaylı Bilgi</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/bornova">
                <Button variant="outline" size="lg">
                  <MapPin className="mr-2 h-4 w-4" />
                  Tüm Bornova Mahallelerini Gör
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT CTA */}
      <section className={`${isHomeNeighborhood ? 'bg-gradient-to-br from-green-900 to-blue-900' : 'bg-slate-900'} text-white py-16 lg:py-20`}>
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isHomeNeighborhood
              ? "Evka 3'ün Köklü Fidanlığı ve Hırdavatı"
              : `${location.name} Bölgesine Teslimat`
            }
          </h2>
          <p className={`text-lg ${isHomeNeighborhood ? 'text-green-100' : 'text-slate-300'} mb-8 max-w-2xl mx-auto`}>
            {isHomeNeighborhood
              ? "2016'dan beri Evka 3'te hizmet veriyoruz. Komşunuz olarak kapımız size her zaman açık!"
              : "Fidanlık, çiçekçi ve hırdavat ihtiyaçlarınız için bizi arayın. Hızlı ve güvenilir teslimat garantisi."
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="tel:05456534599">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-base h-12 font-bold px-8">
                <Phone className="mr-2 h-4 w-4" />
                0545 653 45 99
              </Button>
            </a>
            <a
              href={isHomeNeighborhood
                ? "https://www.google.com/maps?q=38.4487,27.1942"
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' Bornova İzmir')}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-base h-12 bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8">
                <MapPin className="mr-2 h-4 w-4" />
                {isHomeNeighborhood ? "Mağazaya Gel" : "Yol Tarifi"}
              </Button>
            </a>
          </div>

          <div className={`flex items-center justify-center gap-6 text-sm ${isHomeNeighborhood ? 'text-green-200' : 'text-slate-400'}`}>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>09:00 - 22:00 Arası Açık</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>5.0/5 Müşteri Puanı</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
