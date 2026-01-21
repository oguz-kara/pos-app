import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  MapPin,
  Phone,
  CheckCircle2,
  Home,
  ChevronRight,
  Star,
  Clock,
  Award
} from "lucide-react";
import {
  getAllServices,
  getServicesByCategoryId
} from "@/lib/content/services";
import { getAllCategories } from "@/lib/content/categories";

// 1. Generate static params for all services
export async function generateStaticParams() {
  const categories = getAllCategories();
  const services = getAllServices();

  const params = [];
  for (const category of categories) {
    const categoryServices = services.filter(s => s.categoryId === category.id);
    for (const service of categoryServices) {
      params.push({
        categorySlug: category.slug,
        serviceSlug: service.slug,
      });
    }
  }

  return params;
}

// 2. Generate metadata
export async function generateMetadata({
  params
}: {
  params: Promise<{ categorySlug: string; serviceSlug: string }>
}): Promise<Metadata> {
  const { categorySlug, serviceSlug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return { title: "Kategori Bulunamadı" };

  const services = getServicesByCategoryId(category.id);
  const service = services.find((s) => s.slug === serviceSlug);

  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
  };
}

// 3. Service Detail Page
export default async function ServicePage({
  params
}: {
  params: Promise<{ categorySlug: string; serviceSlug: string }>
}) {
  const { categorySlug, serviceSlug } = await params;

  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) notFound();

  const services = getServicesByCategoryId(category.id);
  const service = services.find((s) => s.slug === serviceSlug);

  if (!service) notFound();

  // Get related services from the same category
  const relatedServices = services
    .filter(s => s.id !== service.id)
    .slice(0, 3);

  // Dynamic theme based on category
  const isPlantCategory = ['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(category.id);
  const theme = {
    primary: isPlantCategory ? "text-green-700" : "text-orange-700",
    bg: isPlantCategory ? "bg-green-50" : "bg-orange-50",
    bgDark: isPlantCategory ? "bg-green-900" : "bg-orange-900",
    border: isPlantCategory ? "border-green-200" : "border-orange-200",
    badge: isPlantCategory ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800",
    button: isPlantCategory ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700",
    gradient: isPlantCategory ? "from-green-50 to-white" : "from-orange-50 to-white",
  };

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB NAV */}
      <div className="border-b bg-slate-50/50">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto">
          <Link href="/" className="hover:text-primary flex items-center gap-1">
            <Home className="h-3 w-3" /> Anasayfa
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href={`/kategoriler/${category.slug}`} className="hover:text-primary">
            {category.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="font-medium text-foreground">{service.name}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className={`relative w-full py-12 lg:py-20 overflow-hidden bg-gradient-to-b ${theme.gradient}`}>
        <div className="container relative z-10">
          <div className="max-w-4xl">

            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className={`${theme.badge} border-0`}>
                {category.name}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-slate-700">5.0/5</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              {service.name}
            </h1>

            {/* Short Description */}
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {service.shortDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:05456534599">
                <Button size="lg" className={`w-full sm:w-auto text-base h-12 font-bold ${theme.button}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Bizi Arayın
                </Button>
              </a>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 bg-white border-slate-300">
                <MapPin className="mr-2 h-4 w-4 text-slate-500" />
                Konum Al
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE DETAILS */}
      <section className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Full Description */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Hizmet Detayları</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Öne Çıkan Özellikler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`mt-0.5 p-1.5 rounded-lg ${theme.bg}`}>
                      <CheckCircle2 className={`h-4 w-4 ${theme.primary}`} />
                    </div>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">İlgili Konular</h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 text-sm font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">

              {/* Contact Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">İletişim Bilgileri</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${theme.bg}`}>
                      <Phone className={`h-4 w-4 ${theme.primary}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Telefon</p>
                      <a href="tel:05456534599" className="font-semibold text-slate-900 hover:text-primary">
                        0545 653 45 99
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${theme.bg}`}>
                      <MapPin className={`h-4 w-4 ${theme.primary}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Adres</p>
                      <p className="text-sm font-medium text-slate-900">evka 3, Bornova</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${theme.bg}`}>
                      <Clock className={`h-4 w-4 ${theme.primary}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Çalışma Saatleri</p>
                      <p className="text-sm font-medium text-slate-900">09:00 - 22:00</p>
                    </div>
                  </div>
                </div>

                <a href="tel:05456534599">
                  <Button className={`w-full mt-6 ${theme.button}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen Ara
                  </Button>
                </a>
              </div>

              {/* Why Us Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Award className={`h-5 w-5 ${theme.primary}`} />
                  <h3 className="text-lg font-bold text-slate-900">Neden Biz?</h3>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 ${theme.primary} shrink-0`} />
                    <span>9 yıllık tecrübe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 ${theme.primary} shrink-0`} />
                    <span>evka 3'ün güvenilir adresi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 ${theme.primary} shrink-0`} />
                    <span>Uzman danışmanlık hizmeti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 ${theme.primary} shrink-0`} />
                    <span>Haftanın 7 günü açık</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="container">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">İlgili Hizmetler</h2>
              <p className="text-slate-600">
                {category.name} kategorisindeki diğer hizmetlerimiz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.id}
                  href={`/kategoriler/${category.slug}/hizmetler/${relatedService.slug}`}
                  className="group block"
                >
                  <div className="h-full bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                      {relatedService.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {relatedService.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <span>Detaylı Bilgi</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
