import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GBP_SERVICES } from "@/lib/content/services";
import { GBP_CATEGORIES } from "@/lib/content/categories";
import { ArrowRight, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Kara Ticaret - Profesyonel Montaj ve Teslimat",
  description:
    "Fidan teslimatı, elektrik montajı, tesisat kurulumu ve daha fazlası. İzmir Bornova'da profesyonel montaj ve kurulum hizmetleri.",
  keywords:
    "fidan teslimatı, elektrik montajı, tesisat kurulumu, montaj hizmeti, İzmir, Bornova",
};

export default function HizmetlerPage() {
  // Get featured services (the 3 main services)
  const featuredServices = GBP_SERVICES.filter((s) =>
    ["fidan-teslimati", "elektrik-montaj-hizmeti", "tesisat-montaj-hizmeti"].includes(s.id)
  );

  // Group remaining services by category
  const servicesByCategory = GBP_CATEGORIES.map((category) => ({
    category,
    services: GBP_SERVICES.filter((s) => s.categoryId === category.id && !featuredServices.find(f => f.id === s.id)),
  })).filter((group) => group.services.length > 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container max-w-5xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Profesyonel Hizmetlerimiz
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ürün satışından montaja, teslimat ve kurulum hizmetlerine kadar geniş hizmet yelpazemizle yanınızdayız.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Öne Çıkan Hizmetler
            </h2>
            <p className="text-muted-foreground text-lg">
              En çok tercih edilen profesyonel hizmetlerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredServices.map((service, index) => {
              const category = GBP_CATEGORIES.find((c) => c.id === service.categoryId);
              const colors = [
                { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100 text-green-700 border-green-200", button: "bg-green-600 hover:bg-green-700" },
                { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-700 border-blue-200", button: "bg-blue-600 hover:bg-blue-700" },
                { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-700 border-orange-200", button: "bg-orange-600 hover:bg-orange-700" },
              ];
              const colorScheme = colors[index % 3];

              return (
                <Card key={service.id} className={`p-8 hover:shadow-xl transition-all hover:-translate-y-1 border-2 ${colorScheme.border} ${colorScheme.bg}`}>
                  <div className="mb-6">
                    <Badge variant="outline" className={`mb-3 ${colorScheme.badge} border`}>
                      {category?.name}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {service.rating && (
                    <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= service.rating!
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{service.rating} / 5</span>
                    </div>
                  )}

                  <Link href={`/kategoriler/${service.categoryId}/hizmetler/${service.slug}`} className="block">
                    <Button className={`w-full gap-2 h-12 text-base font-semibold ${colorScheme.button}`}>
                      Detaylı Bilgi Al
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Services by Category */}
      <section className="w-full py-12 md:py-16 bg-muted/30">
        <div className="container max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Tüm Hizmetlerimiz
            </h2>
            <p className="text-muted-foreground text-lg">
              Kategorilere göre hizmetlerimize göz atın
            </p>
          </div>

          <div className="space-y-12">
            {servicesByCategory.map((group) => (
              <div key={group.category.id}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{group.category.name}</h3>
                  <p className="text-muted-foreground">{group.category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/kategoriler/${service.categoryId}/hizmetler/${service.slug}`}
                      className="group"
                    >
                      <Card className="p-5 hover:shadow-md transition-all h-full">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                              {service.name}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {service.shortDescription}
                            </p>
                            {service.rating && (
                              <div className="flex items-center gap-1 mt-2">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-medium">{service.rating}</span>
                              </div>
                            )}
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aradığınız Hizmeti Bulamadınız mı?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Size nasıl yardımcı olabileceğimizi öğrenmek için bize ulaşın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="tel:+905327024707">
              <Button size="lg" variant="secondary" className="gap-2">
                Hemen Arayın: 0532 702 47 07
              </Button>
            </Link>
            <Link href="https://wa.me/905327024707" target="_blank">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 border-white/20">
                WhatsApp ile İletişime Geç
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
