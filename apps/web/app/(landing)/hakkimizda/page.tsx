import Image from "next/image";
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
  Users,
  Heart,
  Award,
  Home,
  ArrowLeft,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda | Kara Ticaret - evka 3 Bornova Fidanlık ve Hırdavat",
  description:
    "2016'dan beri evka 3'ün güvenilir fidanlık ve hırdavatı. Aile işletmemizin hikayesi, değerlerimiz ve neden binlerce müşteri bize güveniyor.",
  keywords: [
    "kara ticaret hakkında",
    "evka 3 fidanlık",
    "bornova hırdavat",
    "aile işletmesi",
    "yerel işletme bornova",
  ],
  openGraph: {
    title: "Hakkımızda | Kara Ticaret - evka 3'ün Köklü İşletmesi",
    description:
      "9 yıllık deneyim, üç nesil bilgi birikimi. evka 3'te hırdavat ve fidanlık hizmeti veren aile işletmemizi tanıyın.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-20 items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logos/logo-md.png"
              alt="Kara Ticaret Logo"
              width={280}
              height={64}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="tel:05456534599"
              className="flex items-center gap-1 hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">0545 653 45 99</span>
            </a>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="hidden md:inline">evka 3, Bornova</span>
            </div>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container pt-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop"
            alt="Local business heritage"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container text-center text-white">
          <Badge className="mb-4 bg-primary/90">9 Yıllık Deneyim</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-2xl">
            Hakkımızda
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
            2016&apos;dan beri evka 3&apos;ün kalbi, ailece büyüttüğümüz bir
            işletme
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Kara Ticaret</strong>, 2016 yılında evka 3 Bornova&apos;da
                faaliyete geçen, aile şirketi bir işletmedir. Üç neslin bilgi
                birikimi ve dokuz yıllık deneyimimizle, her gün binlerce
                müşterimize hizmet veriyoruz.
              </p>

              <p className="text-muted-foreground leading-relaxed mt-4">
                İşimize ilk başladığımızda, mahallede sadece küçük bir hırdavat
                dükkânıydık. Zamanla müşterilerimizin ihtiyaçlarını dinledik,
                onların isteklerine kulak verdik. Balkonlarını yeşillendirmek
                isteyenler için fidanlık bölümümüzü, evlerindeki elektrik ve
                tesisat ihtiyaçları için montaj hizmetimizi ekledik.
              </p>

              <p className="text-muted-foreground leading-relaxed mt-4">
                Bugün evka 3&apos;ün{" "}
                <strong>tek saksılı bitki satıcısı</strong> olmaktan ve her gün
                09:00&apos;dan 22:00&apos;a kadar kapılarımızı açık tutmaktan
                gurur duyuyoruz. İş sadece ürün satmak değil; güvenilir olmak,
                doğru tavsiyeyi vermek, müşterilerimizin evine değer katmaktır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Değerlerimiz
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Güven</h3>
              <p className="text-muted-foreground">
                Dokuz yıldır müşterilerimizin evlerine giren ürünlerin
                kalitesinden ve verdiğimiz tavsiyelerden sorumluyuz. Güven
                bizim en büyük sermayemiz.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Aile Ruhu</h3>
              <p className="text-muted-foreground">
                Üç neslin bilgi birikimi ve deneyimi ile çalışıyoruz. Her
                müşteriyi ailemizden biri gibi görüyor, onların
                memnuniyetini kendi mutluluğumuz olarak kabul ediyoruz.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kalite</h3>
              <p className="text-muted-foreground">
                Sadece en kaliteli malzemeleri satıyor, bitkilerin sağlıklı
                olmasına özen gösteriyor ve yedek parçaların yerine tam
                oturmasını garanti ediyoruz.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Neden Kara Ticaret?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  evka 3&apos;ün Tek Saksılı Bitki Satıcısı
                </h3>
                <p className="text-sm text-muted-foreground">
                  Balkonunuzu yeşillendirmek için en geniş iç-dış mekan bitki
                  çeşitleri sadece bizde.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Her Gün 09:00 - 22:00</h3>
                <p className="text-sm text-muted-foreground">
                  evka 3&apos;te en geç kapanan hırdavat ve fidanlığız. İşten
                  döndükten sonra bile uğrayabilirsiniz.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.0 Puan Google Yorumları</h3>
                <p className="text-sm text-muted-foreground">
                  Müşteri memnuniyeti bizim için her şeyden önemli.
                  Yorumlarımız bunu kanıtlıyor.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Home className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Yerel ve Ulaşılabilir</h3>
                <p className="text-sm text-muted-foreground">
                  evka 3 Migros karşısında, kolayca ulaşabileceğiniz bir
                  konumdayız. Teslimat hizmetimiz de mevcut.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Uzman Danışmanlık</h3>
                <p className="text-sm text-muted-foreground">
                  Sadece satmıyoruz; bitkilerinizin bakımından, doğru çiviye
                  kadar her konuda ücretsiz danışmanlık veriyoruz.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Kalite Garantisi</h3>
                <p className="text-sm text-muted-foreground">
                  Sattığımız her ürünün arkasındayız. Sorun olursa hemen çözüm
                  buluyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Sizi Tanımaktan Mutluluk Duyarız</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Mağazamıza bekleriz! Sorularınız için bizi arayabilir veya
            direkt yolu tarif alıp gelebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:05456534599">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 w-full sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                0545 653 45 99
              </Button>
            </a>
            <a
              href="https://wa.me/905456534599"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </a>
            <a
              href="https://maps.google.com/?q=Kara+Ticaret+evka 3+Bornova"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 w-full sm:w-auto"
              >
                <Navigation className="h-5 w-5" />
                Yol Tarifi Al
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Kara Ticaret</h3>
              <p className="text-sm text-muted-foreground">
                2016&apos;dan beri evka 3&apos;te hizmetinizdeyiz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">İletişim</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>0545 653 45 99</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Burcu Apt, Cengiz Han Cd No: 14, evka 3, Bornova</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Pazartesi - Pazar: 09:00 - 22:00</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Sayfalar</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/" className="text-muted-foreground hover:text-primary">
                    Ana Sayfa
                  </Link>
                </div>
                <div>
                  <Link
                    href="/hakkimizda"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Hakkımızda
                  </Link>
                </div>
                <div>
                  <Link
                    href="/iletisim"
                    className="text-muted-foreground hover:text-primary"
                  >
                    İletişim
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kara Ticaret. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
