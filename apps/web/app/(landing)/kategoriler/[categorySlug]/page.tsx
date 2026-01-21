import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  MapPin,
  Phone,
  CheckCircle2,
  Sprout,
  Wrench,
  Home,
  ChevronRight,
  Star
} from "lucide-react";
import {
  getAllCategories,
  getServicesByCategoryId
} from "@/lib/content/services"; // Check your path

// 1. Static Generation
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getAllCategories().find((c) => c.slug === categorySlug);

  if (!category) return { title: "Kategori Bulunamadı" };

  return {
    title: category.seo.title,
    description: category.seo.description,
    keywords: category.seo.keywords,
  };
}

// 3. The Refactored Category Page
export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = getAllCategories().find((c) => c.slug === categorySlug);

  if (!category) notFound();

  const services = getServicesByCategoryId(category.id);

  // Dynamic Theme Config
  const isPlantCategory = ['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(category.id);

  // Theme Colors
  const theme = {
    primary: isPlantCategory ? "text-green-700" : "text-orange-700",
    bg: isPlantCategory ? "bg-green-50" : "bg-orange-50",
    bgDark: isPlantCategory ? "bg-green-900" : "bg-orange-900",
    border: isPlantCategory ? "border-green-100" : "border-orange-100",
    badge: isPlantCategory ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800",
    icon: isPlantCategory ? Sprout : Wrench,
    gradient: isPlantCategory ? "from-green-50 to-white" : "from-orange-50 to-white",
  };

  const Icon = theme.icon;

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB NAV */}
      <div className="border-b bg-slate-50/50">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
          <Link href="/" className="hover:text-primary flex items-center gap-1">
            <Home className="h-3 w-3" /> Anasayfa
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="font-medium text-foreground">{category.name}</span>
        </div>
      </div>

      {/* HERO SECTION: Split Layout */}
      <section className={`relative w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-b ${theme.gradient}`}>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme.bg} border ${theme.border}`}>
                  <Icon className={`h-8 w-8 ${theme.primary}`} />
                </div>
                <Badge variant="outline" className="text-slate-600 bg-white/50 backdrop-blur">
                  {services.length} Hizmet Mevcut
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                {category.name}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                {category.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href="tel:05456534599">
                  <Button size="lg" className={`w-full sm:w-auto text-base h-12 font-bold ${isPlantCategory ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Bizi Arayın
                  </Button>
                </a>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 bg-white border-slate-300">
                  <MapPin className="mr-2 h-4 w-4 text-slate-500" />
                  Konum Al
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 pt-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-slate-700">5.0/5</span>
                <span>Müşteri Puanı (Google)</span>
              </div>
            </div>

            {/* Right: Visual Abstract */}
            <div className="relative hidden lg:block h-[400px] w-full">
              {/* Decorative Circles */}
              <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full ${theme.bg} opacity-50 blur-3xl`} />
              <div className={`absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full ${isPlantCategory ? 'bg-blue-50' : 'bg-yellow-50'} opacity-50 blur-2xl`} />

              {/* Card Stack Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {category.benefits.slice(0, 4).map((benefit, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3 transform hover:-translate-y-1 transition-transform duration-300">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 ${theme.primary}`} />
                      <span className="text-sm font-medium text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL SERVICES LIST */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              evka 3 ve Bornova bölgesinde sunduğumuz profesyonel {category.name.toLowerCase()} çözümleri
            </p>
          </div>

          <div className="space-y-0">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/kategoriler/${category.slug}/hizmetler/${service.slug}`}
                className="group block border-b border-slate-100 hover:bg-slate-50/50 transition-all duration-200"
              >
                <div className="py-8 px-4 md:px-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed mb-4">
                        {service.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="text-xs font-medium text-slate-500 px-3 py-1 rounded-full bg-slate-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 pt-1">
                      <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 mb-4">
              {services.length} profesyonel hizmet seçeneği mevcut
            </p>
            <a href="tel:05456534599">
              <Button size="lg" className="gap-2">
                <Phone className="h-4 w-4" />
                Detaylı Bilgi İçin Arayın
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ / HELP SECTION */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-slate-500">Müşterilerimizin {category.name.toLowerCase()} hakkında en çok merak ettikleri</p>
          </div>

          <Card className="p-6 md:p-8 bg-white shadow-sm border-slate-200">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-slate-100">
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-primary">
                  Bornova içine teslimat yapıyor musunuz?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Evet. Özellikle hacimli ürünlerde ve toplu alımlarda Bornova, Bayraklı ve Karşıyaka bölgelerine kendi aracımızla teslimat yapıyoruz. 500₺ üzeri siparişlerde evka 3 ve çevresine ücretsiz teslimatımız mevcuttur.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b-slate-100">
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-primary">
                  Hangi günler açıksınız?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Kara Ticaret haftanın her günü (Pazar dahil) 09:00 - 22:00 saatleri arasında hizmet vermektedir.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-primary">
                  Montaj hizmetiniz var mı?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  Evet, sattığımız teknik ürünlerin (elektrik, aydınlatma, tesisat) montajı için ehliyetli ustalarımız mevcuttur. Bitki grubunda da saksı değişimi ve dikim desteği sağlıyoruz.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

    </div>
  );
}