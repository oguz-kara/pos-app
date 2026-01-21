"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/marketing/page-header";
import { PageFooter } from "@/components/marketing/page-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { Search, Phone } from "lucide-react";
import { useProductsQuery } from "@/lib/graphql/generated";
import { getAllCategories } from "@/lib/content/categories";
import { CONTACT_INFO } from "@/lib/content/types";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryTag, setSelectedCategoryTag] = useState<
    string | undefined
  >(undefined);

  const gbpCategories = getAllCategories();

  // Fetch products
  const { data, isLoading, error } = useProductsQuery({
    search: searchTerm || undefined,
    isActive: true,
  });

  const products = data?.products || [];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />

      {/* Breadcrumb */}
      <div className="container pt-4">
        <Breadcrumb items={[{ label: "Ürünler" }]} />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2074&auto=format&fit=crop"
            alt="Products"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-2xl">
            Ürünlerimiz
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
            Binlerce ürün, tek adres
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ürün ara... (isim, barkod, SKU)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategoryTag}
              onValueChange={(value) =>
                setSelectedCategoryTag(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue placeholder="Tüm Kategoriler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                {gbpCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white min-h-[500px]">
        <div className="container">
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Ürünler yükleniyor...</p>
            </div>
          ) : null}

          {/* Error State */}
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">
                Ürünler yüklenirken bir hata oluştu.
              </p>
              <p className="text-sm text-muted-foreground">
                Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
              </p>
            </div>
          ) : null}

          {/* No Results */}
          {!isLoading && !error && products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl font-semibold mb-2">Ürün bulunamadı</p>
              <p className="text-muted-foreground mb-6">
                Arama kriterlerinizi değiştirmeyi deneyin veya bize ulaşın.
              </p>
              <a href={`tel:${CONTACT_INFO.phone}`}>
                <Button className="gap-2">
                  <Phone className="h-4 w-4" />
                  Bizi Arayın
                </Button>
              </a>
            </div>
          ) : null}

          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                <strong>{products.length}</strong> ürün bulundu
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image Placeholder */}
                    <div className="aspect-square bg-muted/30 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        📦
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-2">
                        {product.name}
                      </h3>

                      {product.description ? (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {product.description}
                        </p>
                      ) : null}

                      {/* SKU/Barcode */}
                      <div className="text-xs text-muted-foreground mb-3">
                        {product.sku && <div>SKU: {product.sku}</div>}
                        {product.barcode && <div>Barkod: {product.barcode}</div>}
                      </div>

                      {/* Price CTA */}
                      <div className="pt-3 border-t">
                        <a href={`tel:${CONTACT_INFO.phone}`}>
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <Phone className="h-3 w-3" />
                            Fiyat Bilgisi Al
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ürünlerimiz Hakkında Bilgi
            </h2>
            <p className="text-muted-foreground mb-6">
              Tüm ürünlerimiz mağazamızda mevcuttur. Stok durumu ve fiyat
              bilgisi için lütfen bizi arayın. Toplu alımlarda özel fiyat
              avantajlarımızdan yararlanabilirsiniz.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">✓</div>
                <h3 className="font-semibold mb-1">Kaliteli Ürünler</h3>
                <p className="text-sm text-muted-foreground">
                  Tüm ürünlerimiz güvenilir tedarikçilerden
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold mb-1">Teslimat</h3>
                <p className="text-sm text-muted-foreground">
                  500₺ üzeri ücretsiz teslimat
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold mb-1">Toptan Fiyat</h3>
                <p className="text-sm text-muted-foreground">
                  Toplu alımlarda özel indirimler
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Fiyat ve Stok Bilgisi İçin Bizi Arayın"
        description="Ürünlerimiz hakkında detaylı bilgi, güncel fiyatlar ve stok durumu için bizimle iletişime geçin."
      />

      <PageFooter />
    </div>
  );
}
