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
  Mail,
} from "lucide-react";
import type { Metadata } from "next";
import { CONTACT_INFO } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "İletişim | Kara Ticaret - evka 3 Bornova",
  description:
    "Kara Ticaret ile iletişime geçin. evka 3 Bornova'daki mağazamızı ziyaret edin veya bizi arayın. Telefon: 0545 653 45 99. Her gün 09:00-22:00 açık.",
  keywords: [
    "kara ticaret iletişim",
    "evka 3 hırdavat telefon",
    "bornova fidanlık adres",
    "kara ticaret nerede",
    "evka 3 çalışma saatleri",
  ],
  openGraph: {
    title: "İletişim | Kara Ticaret - evka 3 Bornova",
    description:
      "Bizi arayın, mesaj gönderin veya mağazamızı ziyaret edin. Her gün 09:00-22:00 hizmetinizdeyiz.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop"
            alt="Contact us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-2xl">
            İletişim
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
            Size nasıl yardımcı olabiliriz?
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Bizimle İletişime Geçin
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {/* Phone */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Telefon</h3>
              <p className="text-muted-foreground mb-4">
                Bizi hemen arayın
              </p>
              <a href={`tel:${CONTACT_INFO.phone}`}>
                <Button className="gap-2 w-full">
                  <Phone className="h-4 w-4" />
                  0545 653 45 99
                </Button>
              </a>
            </Card>

            {/* WhatsApp */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">
                Mesaj gönderin
              </p>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2 w-full">
                  <MessageCircle className="h-4 w-4" />
                  Mesaj Gönder
                </Button>
              </a>
            </Card>

            {/* Directions */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Yol Tarifi</h3>
              <p className="text-muted-foreground mb-4">
                Mağazamıza gelin
              </p>
              <a
                href="https://maps.google.com/?q=Kara+Ticaret+evka 3+Bornova"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2 w-full">
                  <Navigation className="h-4 w-4" />
                  Tarif Al
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Mağaza Bilgileri</h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-muted-foreground">
                      {CONTACT_INFO.address.street}
                    </p>
                    <p className="text-muted-foreground">
                      {CONTACT_INFO.address.district}, {CONTACT_INFO.address.city}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      📍 evka 3 Migros karşısı
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                    <p className="text-muted-foreground">
                      <strong>Pazartesi - Pazar:</strong> {CONTACT_INFO.hours.weekdays}
                    </p>
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      ✓ Her gün açığız! evka 3&apos;te en geç kapanan işletme
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      0545 653 45 99
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-posta</h3>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Konumumuz</h2>
              <Card className="overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.8642!2d27.2106!3d38.4552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDI3JzE4LjciTiAyN8KwMTInMzguMiJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kara Ticaret Harita"
                />
              </Card>
              <p className="text-sm text-muted-foreground mt-4">
                🚗 Kolay park imkanı | 🚌 Toplu taşıma ile ulaşılabilir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-6">
            Hizmet Bölgelerimiz
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            İzmir&apos;in aşağıdaki ilçelerine teslimat yapıyoruz. 500₺ ve
            üzeri siparişlerde teslimat <strong>ücretsiz</strong>!
          </p>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {CONTACT_INFO.serviceAreas.map((area) => (
              <Badge
                key={area}
                variant="outline"
                className="text-base py-2 px-4"
              >
                <MapPin className="h-4 w-4 mr-2" />
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Sorularınız mı Var?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Ürünlerimiz, hizmetlerimiz veya teslimat ile ilgili her türlü
            sorunuz için bize ulaşın. Size yardımcı olmaktan mutluluk duyarız!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${CONTACT_INFO.phone}`}>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 w-full sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                Hemen Ara
              </Button>
            </a>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Mesaj
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
