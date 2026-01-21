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
  Wrench
} from "lucide-react";
import {
  getAllLocations,
  getLocationBySlug,
  getRelatedLocations
} from "@/lib/content/locations";
import { getAllCategories } from "@/lib/content/categories";

// 1. Generate static params for all districts (exclude Bornova - it has its own page)
export async function generateStaticParams() {
  const locations = getAllLocations();
  const districts = locations.filter(
    loc => loc.type === "district" && loc.slug !== "bornova"
  );

  return districts.map((district) => ({
    districtSlug: district.slug,
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({
  params
}: {
  params: Promise<{ districtSlug: string }>
}): Promise<Metadata> {
  const { districtSlug } = await params;
  const location = getLocationBySlug(districtSlug);

  if (!location) return { title: "Bölge Bulunamadı" };

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
      canonical: `https://karaticaret.com.tr/${location.slug}`,
    },
  };
}

// 3. District Page
export default async function DistrictPage({
  params
}: {
  params: Promise<{ districtSlug: string }>
}) {
  const { districtSlug } = await params;
  const location = getLocationBySlug(districtSlug);

  if (!location || location.type !== "district") notFound();

  // Get all categories to display services available
  const categories = getAllCategories();
  const plantCategories = categories.filter(c =>
    ['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(c.id)
  );
  const hardwareCategories = categories.filter(c =>
    !['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(c.id)
  );

  // Get related locations (other nearby districts)
  const relatedLocations = getRelatedLocations(location.id, "district").slice(0, 3);

  // Determine delivery info based on distance
  const getDeliveryInfo = () => {
    if (location.distance.fromEvka3Km <= 5) {
      return {
        time: "1-2 saat içinde",
        cost: "Ücretsiz teslimat (500₺ üzeri)",
        zone: "immediate"
      };
    } else if (location.distance.fromEvka3Km <= 10) {
      return {
        time: "Aynı gün teslimat",
        cost: "Ücretsiz teslimat (750₺ üzeri)",
        zone: "same-day"
      };
    } else {
      return {
        time: "1-2 iş günü",
        cost: "Teslimat ücreti sipariş tutarına göre",
        zone: "scheduled"
      };
    }
  };

  const deliveryInfo = getDeliveryInfo();

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB NAV */}
      <div className="border-b bg-slate-50/50">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
          <Link href="/" className="hover:text-primary flex items-center gap-1">
            <Home className="h-3 w-3" /> Anasayfa
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="font-medium text-foreground">{location.name}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  <MapPin className="h-3 w-3 mr-1" />
                  {location.type === "district" ? "İlçe" : "Mahalle"}
                </Badge>
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  <Users className="h-3 w-3 mr-1" />
                  {location.population.toLocaleString('tr-TR')} nüfus
                </Badge>
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  <Navigation className="h-3 w-3 mr-1" />
                  {location.distance.fromEvka3Km.toFixed(1)} km uzaklık
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                {location.name} Çiçekçi & Hırdavat
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                {location.description}
              </p>

              {/* Delivery Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-200">
                <Truck className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-sm font-bold text-green-900">{deliveryInfo.time}</p>
                  <p className="text-xs text-green-700">{deliveryInfo.cost}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="tel:05456534599">
                  <Button size="lg" className="w-full sm:w-auto text-base h-12 font-bold bg-blue-600 hover:bg-blue-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen Sipariş Ver
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' İzmir')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 bg-white border-slate-300">
                    <MapPin className="mr-2 h-4 w-4 text-slate-500" />
                    Yol Tarifi Al
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 pt-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-slate-700">5.0/5</span>
                <span>Müşteri Puanı (Google)</span>
              </div>
            </div>

            {/* Right: Quick Info Cards */}
            <div className="relative hidden lg:block h-[400px] w-full">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-50 opacity-50 blur-3xl" />
              <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-green-50 opacity-50 blur-2xl" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {location.characteristics.slice(0, 4).map((characteristic, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3 transform hover:-translate-y-1 transition-transform duration-300">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-700" />
                      <span className="text-sm font-medium text-slate-700">{characteristic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES SECTION */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {location.name} Bölgesine Sunduğumuz Hizmetler
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Evka 3 mağazamızdan {location.name} bölgesine teslim edilen tüm ürün ve hizmetlerimiz
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

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Neden {location.name} Bölgesinde Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-lg text-slate-600">
              2016'dan beri İzmir'in güvenilir adresi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-slate-200">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 w-fit mb-4">
                <Truck className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hızlı Teslimat</h3>
              <p className="text-slate-600 leading-relaxed">
                {location.name} bölgesine {deliveryInfo.time.toLowerCase()} teslimat garantisi. Acil ihtiyaçlarınız için aynı gün servisimiz mevcuttur.
              </p>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <div className="p-3 rounded-xl bg-green-50 border border-green-100 w-fit mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kaliteli Ürünler</h3>
              <p className="text-slate-600 leading-relaxed">
                Fidanlıkta taze ve sağlıklı bitkiler, hırdavatta markali ve garantili ürünler. Kaliteden ödün vermiyoruz.
              </p>
            </Card>

            <Card className="p-6 bg-white border-slate-200">
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 w-fit mb-4">
                <Clock className="h-6 w-6 text-orange-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">7/24 İletişim</h3>
              <p className="text-slate-600 leading-relaxed">
                Haftanın 7 günü 09:00-22:00 arası açığız. Acil ihtiyaçlarınız için telefonla ulaşabilirsiniz.
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50 border-blue-100">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {location.name} Bölgesi İçin Özel Kampanya
                </h3>
                <p className="text-lg text-slate-700 mb-6">
                  İlk siparişinizde %10 indirim! Telefon ile sipariş verirken kampanya kodunu belirtin.
                </p>
                <a href="tel:05456534599">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Kampanyadan Yararlan
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* RELATED LOCATIONS */}
      {relatedLocations.length > 0 && (
        <section className="container py-16 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Diğer Hizmet Bölgelerimiz</h2>
              <p className="text-slate-600">
                {location.name} yakınındaki diğer teslimat bölgelerimiz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedLocations.map((relatedLocation) => (
                <Link
                  key={relatedLocation.id}
                  href={`/${relatedLocation.slug}`}
                  className="group block"
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-slate-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {relatedLocation.distance.fromEvka3Km.toFixed(1)} km
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedLocation.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {relatedLocation.population.toLocaleString('tr-TR')} nüfus
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                      <span>Detaylı Bilgi</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT CTA SECTION */}
      <section className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {location.name} Bölgesine Teslimat İçin Bize Ulaşın
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Fidanlık, çiçekçi ve hırdavat ihtiyaçlarınız için bizi arayın. Uzman ekibimiz size en uygun çözümü sunacaktır.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="tel:05456534599">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-base h-12 font-bold px-8">
                <Phone className="mr-2 h-4 w-4" />
                0545 653 45 99
              </Button>
            </a>
            <a
              href={`https://www.google.com/maps?q=38.4487,27.1942`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-base h-12 bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8">
                <MapPin className="mr-2 h-4 w-4" />
                Mağaza Konumu
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
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
