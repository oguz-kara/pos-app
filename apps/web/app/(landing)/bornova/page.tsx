import { Metadata } from "next";
import Link from "next/link";
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
  Building2,
  Sprout,
  Wrench,
  Store
} from "lucide-react";
import {
  getAllLocations,
  getLocationBySlug
} from "@/lib/content/locations";
import { getAllCategories } from "@/lib/content/categories";

export const metadata: Metadata = {
  title: "Bornova Çiçekçi & Hırdavat | Kara Ticaret - Evka 3 Fidanlık",
  description: "Bornova genelinde çiçekçi, fidanlık ve hırdavat hizmetleri. 43 mahalle ve 523 bin nüfusa hizmet veriyoruz. Evka 3'ten hızlı teslimat. 2016'dan beri güvenilir adres.",
  keywords: "bornova çiçekçi, bornova fidanlık, bornova hırdavat, bornova nalbur, evka 3 çiçekçi, bornova teslimat, bornova fidan, bornova elektrik malzemesi",
  openGraph: {
    title: "Bornova Çiçekçi & Hırdavat | Kara Ticaret",
    description: "Bornova genelinde çiçekçi, fidanlık ve hırdavat hizmetleri. 43 mahalleye hızlı teslimat.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://karaticaret.com.tr/bornova",
  },
};

export default function BornovaPage() {
  // Get Bornova district data
  const bornovaDistrict = getLocationBySlug("bornova");

  // Get all Bornova neighborhoods
  const allLocations = getAllLocations();
  const bornovaNeighborhoods = allLocations
    .filter(loc => loc.district === "Bornova" && loc.type === "neighborhood")
    .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

  // Priority neighborhoods (10k+ population)
  const priorityNeighborhoods = bornovaNeighborhoods
    .filter(n => n.priority <= 2)
    .sort((a, b) => b.population - a.population);

  // All categories
  const categories = getAllCategories();

  if (!bornovaDistrict) {
    return <div>Bornova bilgisi bulunamadı</div>;
  }

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB NAV */}
      <div className="border-b bg-slate-50/50">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
          <Link href="/" className="hover:text-primary flex items-center gap-1">
            <Home className="h-3 w-3" /> Anasayfa
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="font-medium text-foreground">Bornova</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-green-50 via-blue-50 to-white">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  <Building2 className="h-3 w-3 mr-1" />
                  Ana Bölgemiz
                </Badge>
                <Badge variant="outline" className="text-green-700 bg-green-50 backdrop-blur border-green-200">
                  <Store className="h-3 w-3 mr-1" />
                  Mağazamız Burada
                </Badge>
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  <Users className="h-3 w-3 mr-1" />
                  {bornovaDistrict.population.toLocaleString('tr-TR')} nüfus
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Bornova'nın Güvenilir <span className="text-green-600">Fidanlık</span> ve <span className="text-orange-600">Hırdavat</span> Adresi
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                {bornovaDistrict.description} 43 mahalleye hızlı ve güvenilir teslimat hizmeti sunuyoruz.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center p-3 rounded-xl bg-white border border-slate-100">
                  <div className="text-3xl font-bold text-slate-900">43</div>
                  <div className="text-xs text-slate-500 mt-1">Mahalle</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-slate-100">
                  <div className="text-3xl font-bold text-slate-900">9+</div>
                  <div className="text-xs text-slate-500 mt-1">Yıl Tecrübe</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-slate-100">
                  <div className="text-3xl font-bold text-slate-900">5.0</div>
                  <div className="text-xs text-slate-500 mt-1">Google Puan</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="tel:05456534599">
                  <Button size="lg" className="w-full sm:w-auto text-base h-12 font-bold bg-green-600 hover:bg-green-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen Ara
                  </Button>
                </a>
                <a
                  href="https://www.google.com/maps?q=38.4487,27.1942"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 bg-white border-slate-300">
                    <MapPin className="mr-2 h-4 w-4 text-slate-500" />
                    Mağaza Konumu
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 pt-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium text-slate-700">09:00 - 22:00</span>
                <span>Haftanın Her Günü Açık</span>
              </div>
            </div>

            {/* Right: Visual Abstract */}
            <div className="relative hidden lg:block h-[400px] w-full">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-50 opacity-50 blur-3xl" />
              <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-blue-50 opacity-50 blur-2xl" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {[
                    { icon: Sprout, text: "Taze fidanlar", color: "green" },
                    { icon: Wrench, text: "Kaliteli hırdavat", color: "orange" },
                    { icon: Truck, text: "Hızlı teslimat", color: "blue" },
                    { icon: CheckCircle2, text: "Uzman destek", color: "green" }
                  ].map((item, i) => {
                    const IconComponent = item.icon;
                    const colorClasses = {
                      green: "bg-green-50 border-green-100 text-green-700",
                      orange: "bg-orange-50 border-orange-100 text-orange-700",
                      blue: "bg-blue-50 border-blue-100 text-blue-700"
                    };
                    return (
                      <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3 transform hover:-translate-y-1 transition-transform duration-300">
                        <div className={`p-1.5 rounded-lg border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITY NEIGHBORHOODS */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Bornova'da Hizmet Verdiğimiz Öncelikli Mahalleler
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              En yoğun nüfusa sahip mahallelerimize özel hızlı teslimat ve aynı gün servis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityNeighborhoods.slice(0, 12).map((neighborhood) => {
              const deliveryTime = neighborhood.distance.fromEvka3Km <= 2
                ? "15-30 dakika"
                : neighborhood.distance.fromEvka3Km <= 5
                  ? "30-60 dakika"
                  : "1-2 saat";

              const isHomeNeighborhood = neighborhood.slug === "evka-3-mahallesi";

              return (
                <Link
                  key={neighborhood.id}
                  href={`/bornova/${neighborhood.slug}`}
                  className="group block"
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 relative overflow-hidden">
                    {isHomeNeighborhood && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-600 text-white border-0">
                          <Store className="h-3 w-3 mr-1" />
                          Mağazamız
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-slate-600">
                        <Users className="h-3 w-3 mr-1" />
                        {neighborhood.population.toLocaleString('tr-TR')}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                      {neighborhood.name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{deliveryTime}</span>
                      {neighborhood.distance.fromEvka3Km <= 3 && (
                        <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200 text-xs ml-auto">
                          Ücretsiz
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                      <span>Detaylı Bilgi</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Toplam {bornovaNeighborhoods.length} mahalleye hizmet veriyoruz
            </p>
          </div>
        </div>
      </section>

      {/* ALL NEIGHBORHOODS LIST */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container max-w-5xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Tüm Bornova Mahalleleri</h2>
            <p className="text-slate-600">
              Bornova genelinde tüm mahallelerimize teslimat yapıyoruz
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-white border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bornovaNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.id}
                  href={`/bornova/${neighborhood.slug}`}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-green-600 transition-colors truncate">
                      {neighborhood.name.replace(' Mahallesi', '')}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Bornova Geneline Sunduğumuz Hizmetler
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fidanlık, çiçekçilik ve hırdavat kategorilerinde geniş ürün yelpazesi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const isPlantCategory = ['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(category.id);
              const theme = {
                bg: isPlantCategory ? "bg-green-50" : "bg-orange-50",
                border: isPlantCategory ? "border-green-100" : "border-orange-100",
                icon: isPlantCategory ? Sprout : Wrench,
                textColor: isPlantCategory ? "text-green-700" : "text-orange-700",
                hoverColor: isPlantCategory ? "group-hover:text-green-600" : "group-hover:text-orange-600"
              };
              const IconComponent = theme.icon;

              return (
                <Link
                  key={category.id}
                  href={`/kategoriler/${category.slug}`}
                  className="group block"
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200">
                    <div className={`p-3 rounded-xl ${theme.bg} border ${theme.border} w-fit mb-4`}>
                      <IconComponent className={`h-6 w-6 ${theme.textColor}`} />
                    </div>
                    <h3 className={`text-xl font-bold text-slate-900 mb-2 transition-colors ${theme.hoverColor}`}>
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {category.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Neden Bornova'da Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-lg text-slate-600">
              2016'dan beri Evka 3'ün güvenilir adresi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bornovaDistrict.characteristics.map((characteristic, index) => (
              <Card key={index} className="p-6 bg-white border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-slate-700 leading-relaxed">
                      {characteristic}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-16 lg:py-20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bornova Genelinde Hizmetinizdeyiz
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            43 mahallede fidanlık, çiçekçi ve hırdavat ihtiyaçlarınız için bizi arayın. Mağazamız Evka 3'te sizi bekliyor!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="tel:05456534599">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-base h-12 font-bold px-8">
                <Phone className="mr-2 h-4 w-4" />
                0545 653 45 99
              </Button>
            </a>
            <a
              href="https://www.google.com/maps?q=38.4487,27.1942"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-base h-12 bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8">
                <MapPin className="mr-2 h-4 w-4" />
                Mağazaya Gel
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-green-200">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>Evka 3 Mahallesi</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>09:00 - 22:00</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>5.0/5</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
