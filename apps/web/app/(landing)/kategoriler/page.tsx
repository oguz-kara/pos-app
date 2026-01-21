import { Metadata } from "next";
import Link from "next/link";
import {
    Sprout,
    Wrench,
    ArrowRight,
    Leaf,
    Lightbulb,
    Bath,
    Droplets,
    Zap,
    Truck,
    BrickWall,
    Home,
    ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllCategories } from "@/lib/content/services"; // Adjust path to matches your project
import { GBPCategory } from "@/lib/content/types";

export const metadata: Metadata = {
    title: "Tüm Kategoriler | Kara Ticaret - Evka 3 Bornova",
    description: "Fidanlık, Hırdavat, Elektrik, Aydınlatma ve Tesisat kategorilerimiz. Evka-3 ve Bornova için aradığınız tüm ürün grupları.",
};

// Icon Mapping Helper
const iconMap = {
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

export default function CategoriesIndexPage() {
    const categories = getAllCategories();

    // Split categories into your two main business verticals
    const plantCategories = categories.filter(cat =>
        ['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(cat.id)
    );

    const hardwareCategories = categories.filter(cat =>
        !['cicekci', 'fidanlik', 'bahce-urunleri', 'fidan-toptanci'].includes(cat.id)
    );

    return (
        <div className="min-h-screen bg-slate-50/50">

            {/* BREADCRUMB */}
            <div className="bg-white border-b sticky top-0 z-20">
                <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary flex items-center gap-1">
                        <Home className="h-3 w-3" /> Anasayfa
                    </Link>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                    <span className="font-medium text-foreground">Kategoriler</span>
                </div>
            </div>

            <main className="container py-16 md:py-24">

                {/* PAGE HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                        Ürün ve Hizmet Kategorileri
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        Evka-3 mağazamıza 1000den fazla ürün çeşidi ile hizmet veriyoruz.
                        İhtiyacınız olan departmanı seçin.
                    </p>
                </div>

                {/* SECTION 1: GARDEN & PLANTS (Green Theme) */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-green-700" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Fidanlık ve Bahçe</h2>
                            <p className="text-slate-500">İç-dış mekan bitkileri, peyzaj ve bakım ürünleri</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plantCategories.map((category) => (
                            <CategoryCard key={category.id} category={category} theme="green" />
                        ))}
                    </div>
                </div>

                {/* SECTION 2: HARDWARE & TECHNICAL (Orange/Blue Theme) */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                            <Wrench className="h-6 w-6 text-blue-700" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Hırdavat ve Teknik</h2>
                            <p className="text-slate-500">Tamirat, montaj, elektrik ve yapı malzemeleri</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hardwareCategories.map((category) => (
                            <CategoryCard key={category.id} category={category} theme="orange" />
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

// REUSABLE CARD COMPONENT
function CategoryCard({ category, theme }: { category: GBPCategory, theme: 'green' | 'orange' }) {
    // @ts-expect-error xxx
    const Icon = iconMap[category.id] || Sprout;

    const styles = {
        green: {
            hoverBorder: "group-hover:border-green-300",
            iconBg: "bg-green-50 group-hover:bg-green-100",
            iconColor: "text-green-600",
            arrowColor: "group-hover:text-green-600"
        },
        orange: {
            hoverBorder: "group-hover:border-orange-300",
            iconBg: "bg-orange-50 group-hover:bg-orange-100",
            iconColor: "text-orange-600",
            arrowColor: "group-hover:text-orange-600"
        }
    };

    const currentStyle = styles[theme];

    return (
        <Link href={`/kategori/${category.slug}`} className="group block h-full">
            <Card className={`h-full p-6 border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg ${currentStyle.hoverBorder} flex flex-col`}>

                <div className="flex justify-between items-start mb-6">
                    <div className={`h-14 w-14 rounded-2xl ${currentStyle.iconBg} flex items-center justify-center transition-colors`}>
                        <Icon className={`h-7 w-7 ${currentStyle.iconColor}`} />
                    </div>
                    <ArrowRight className={`h-5 w-5 text-slate-300 transition-colors ${currentStyle.arrowColor}`} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700">
                    {category.name}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {category.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                    {category.benefits.slice(0, 2).map((benefit: string, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-slate-50 text-slate-600 font-normal">
                            {benefit.split(' ')[0]}...
                        </Badge>
                    ))}
                </div>

            </Card>
        </Link>
    );
}