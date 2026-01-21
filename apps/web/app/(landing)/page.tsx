import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Navigation,
  Star,
  Sprout,
  Wrench,
  Truck,
  Home,
  Lightbulb,
  Bath,
  Droplets,
  Zap,
  Leaf,
  BrickWall,
  ArrowRight,
} from "lucide-react";
import { GBP_CATEGORIES } from "@/lib/content/categories";
import { GBP_SERVICES } from "@/lib/content/services";
import { CUSTOMER_REVIEWS, GOOGLE_REVIEW_URL } from "@/lib/content/reviews";

// Icon Mapper: Connects category IDs to Lucide Icons
const iconMap: Record<string, typeof Sprout> = {
  cicekci: Sprout,
  "bahce-urunleri": Leaf,
  fidanlik: Sprout,
  "hirdavat-nalbur": Wrench,
  aydinlatma: Lightbulb,
  "banyo-malzemeleri": Bath,
  "tesisat-malzemeleri": Droplets,
  "elektrik-malzemeleri": Zap,
  "fidan-toptanci": Truck,
  "yapi-malzemeleri": BrickWall,
};

export default function LandingPage() {
  // Get popular services for "Quick Links" section
  const popularServices = GBP_SERVICES.filter((s) =>
    ["fidan-teslimati", "elektrik-montaj-hizmeti", "tesisat-montaj-hizmeti"].includes(s.id)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Portal Approach */}
      <section className="relative w-full h-[650px] md:h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/kara-ticaret-hero.jpg"
            alt="Kara Ticaret Evka 3 Fidanlık ve Hırdavat"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container flex flex-col items-center justify-center gap-6 px-4 text-center mt-10">
          <Badge variant="secondary" className="mb-2 px-4 py-1 text-sm bg-yellow-400 text-black hover:bg-yellow-500 border-none">
            📍 Evka 3&apos;ün 9 Yıllık Güvenilir Komşusu
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl max-w-5xl text-white drop-shadow-xl">
            Bahçeniz Yeşersin,<br />
            <span className="text-yellow-400">Eviniz Yenilensin.</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl drop-shadow-md font-medium leading-relaxed">
            Bornova&apos;nın en geniş <strong>bitki çeşitleri</strong> ve <strong>hırdavat çözümleri</strong> tek çatı altında.
            Adrese teslimat ve profesyonel montaj hizmeti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-lg">
            <Link href="/kategoriler/fidanlik" className="w-full">
              <Button size="lg" className="w-full h-16 text-lg gap-3 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-900/20 border-2 border-green-400/20">
                <Sprout className="h-6 w-6" />
                Fidanlık & Bitki
              </Button>
            </Link>
            <Link href="/kategoriler/nalbur" className="w-full">
              <Button size="lg" className="w-full h-16 text-lg gap-3 bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-900/20 border-2 border-orange-400/20">
                <Wrench className="h-6 w-6" />
                Hırdavat & Nalbur
              </Button>
            </Link>
          </div>

          {/* Mobile Quick Contact */}
          <div className="mt-6 flex items-center gap-2 text-white/80 text-sm md:hidden">
            <Phone className="h-4 w-4" />
            <a href="tel:05456534599" className="underline underline-offset-4">0545 653 45 99</a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="w-full bg-white border-b shadow-sm relative z-20">
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Clock className="h-5 w-5" />
                <span>09:00 - 22:00</span>
              </div>
              <span className="text-sm text-muted-foreground">Her gün açığız (Pazar dahil)</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Truck className="h-5 w-5" />
                <span>Adrese Teslimat</span>
              </div>
              <span className="text-sm text-muted-foreground">Bornova, Bayraklı ve Karşıyaka</span>
            </div>
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>5.0 Müşteri Puanı</span>
              </div>
              <span className="text-sm text-muted-foreground">Google İşletme Profili</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Trust Signals */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Evka 3&apos;ün güvenilir adresi olarak, kaliteli ürün ve hizmetimizle yanınızdayız.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                  <Sprout className="h-7 w-7 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">500+ Bitki Çeşidi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  İç mekan bitkilerinden meyve fidanlarına, mevsimlik çiçeklerden süs bitkilerine kadar geniş bir ürün yelpazesi sunuyoruz. Aradığınız pek çok çeşidi bizde bulabilirsiniz.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                  <Wrench className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Bahçe ve Hırdavat Tek Noktada</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bitki alışverişinizle birlikte saksı, toprak ve bakım aletleri gibi ihtiyaçlarınızı da tek adresten temin edebilir, zamandan tasarruf edebilirsiniz.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                  <Home className="h-7 w-7 text-orange-500" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">2016&apos;dan Beri Güvenle</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Evka 3 bölgesinde yıllardır aynı adresteyiz. Bornova&apos;nın güvenilir aile işletmesi olarak, yüksek müşteri memnuniyeti ve 5.0 Google puanımızla hizmet veriyoruz.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Bornova ve Çevresine Teslimat</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bornova başta olmak üzere Bayraklı, Karşıyaka ve Buca bölgelerine hizmet sağlıyoruz. Hacimli ürünlerde ve toplu siparişlerde nakliye desteği sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Categories Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Neye İhtiyacınız Var?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Evka 3&apos;teki mağazamızda 1000+ çeşit ürün ile hizmetinizdeyiz.
            İster saksı değiştirin, ister musluk tamir edin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GBP_CATEGORIES.map((category) => {
            const IconComponent = iconMap[category.id] || Sprout;
            const isGreen = ["cicekci", "fidanlik", "bahce-urunleri", "fidan-toptanci"].includes(
              category.id
            );

            return (
              <Link key={category.id} href={`/kategoriler/${category.slug}`} className="group">
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-100 group-hover:border-primary/50">
                  <div className="relative h-48 overflow-hidden">
                    {category.image ? (
                      <>
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <IconComponent className="h-10 w-10 text-white drop-shadow-lg" />
                        </div>
                      </>
                    ) : (
                      <div
                        className={`h-full ${isGreen
                          ? "bg-gradient-to-br from-green-50 to-green-100"
                          : "bg-gradient-to-br from-orange-50 to-orange-100"
                          } flex items-center justify-center`}
                      >
                        <IconComponent
                          className={`h-16 w-16 ${isGreen ? "text-green-600" : "text-orange-600"}`}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Ürünleri İncele <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Services - Minimal Modern Design */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Sadece Satmıyoruz, Yapıyoruz
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ürün montajı ve kurulum hizmetlerimizle yanınızdayız
            </p>
          </div>

          <div className="space-y-1 mb-12">
            {popularServices.map((service) => (
              <Link
                key={service.id}
                href={`/kategoriler/${service.categoryId}/hizmetler/${service.slug}`}
                className="group block py-6 px-4 border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {service.shortDescription}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/hizmetler">
              <Button variant="outline" size="lg" className="gap-2">
                Tüm Hizmetlerimizi Görüntüle
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Hizmet Bölgelerimiz</h2>

          <div className="max-w-4xl mx-auto">
            {/* Google Maps Embed */}
            <div className="w-full h-[400px] rounded-lg overflow-hidden bg-muted mb-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.4!2d27.19!3d38.44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDI2JzI0LjAiTiAyN8KwMTEnMjQuMCJF!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <Card className="p-6">
              <div className="flex items-start gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Konum</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Evka 3 Migros&apos;un hemen karşısında, ulaşımı kolay merkezi konumdayız.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Burcu Apt, Cengiz Han Cd No:14, Evka 3, Bornova, İzmir 35050
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Hizmet Alanı</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Mağazamızdan perakende satışın yanı sıra; Bornova, Bayraklı ve Karşıyaka başta olmak üzere İzmir&apos;in birçok noktasına toplu sipariş teslimatı yapıyoruz.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Bornova", "Bayraklı", "Karşıyaka", "Buca", "Konak", "Balçova", "Narlıdere", "Karabağlar"].map((district) => (
                    <Badge key={district} variant="secondary">{district}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Müşterilerimiz Ne Diyor?</h2>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-semibold">5.0 / 5</span>
            <span className="text-muted-foreground">— Google&apos;da 6 Değerlendirme</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {CUSTOMER_REVIEWS.slice(0, 4).map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-2">
                  &quot;{review.content}&quot;
                </p>
                <p className="text-sm font-semibold">— {review.author}</p>
                {review.service && (
                  <p className="text-xs text-muted-foreground mt-1">{review.service}</p>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">Google&apos;da Yorum Yap →</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">İletişim ve Çalışma Saatleri</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Adres</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-7">
                    Burcu Apt, Cengiz Han Cd No:14, Evka 3<br />
                    Bornova, İzmir 35050
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Çalışma Saatleri</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-7">
                    Her gün 09:00 - 22:00
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Telefon</h3>
                  </div>
                  <a href="tel:05456534599" className="text-sm text-primary ml-7 hover:underline">
                    0545 653 45 99
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">WhatsApp</h3>
                  </div>
                  <a href="https://wa.me/905456534599" className="text-sm text-primary ml-7 hover:underline" target="_blank" rel="noopener noreferrer">
                    0545 653 45 99
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Google Maps</h3>
                  </div>
                  <a href="https://maps.google.com/?q=Burcu+Apt+Cengiz+Han+Cd+No:14+Evka 3+Bornova+İzmir" className="text-sm text-primary ml-7 hover:underline" target="_blank" rel="noopener noreferrer">
                    Yol Tarifi Al
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
