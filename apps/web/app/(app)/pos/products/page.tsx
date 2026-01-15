"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/modules/pos/components/search-input";
import { ProductSearchList } from "@/modules/pos/components/product-search-list";
import { useProductsWithStockQuery } from "@/lib/graphql/generated";

/**
 * Products List Page
 *
 * Shows all products with search, filtering, and stock status.
 */
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useProductsWithStockQuery({
    search: debouncedSearch || undefined,
  });

  const products = (data?.productsWithStock || [])
    .filter(
      (p) =>
        p.id != null &&
        p.name != null &&
        p.sellingPrice != null &&
        p.isActive != null
    )
    .map((p) => ({
      id: p.id!,
      name: p.name!,
      barcode: p.barcode ?? null,
      sellingPrice: String(p.sellingPrice!),
      totalStock: p.totalStock ?? undefined,
    }));

  const handleProductSelect = (product: {
    id: string;
    name: string;
    barcode: string | null;
    sellingPrice: string;
    totalStock?: number;
  }) => {
    router.push(`/pos/products/${product.id}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Control Bar - Shopify/Square POS Style */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between gap-4 p-4">
          {/* Left: Search */}
          <div className="flex-1 max-w-lg">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Ürün ara (isim veya barkod)..."
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Filter Button (Placeholder) */}
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>

            {/* Add Product Button */}
            <Button
              onClick={() => router.push("/pos/products/new")}
              className="gap-2 bg-black hover:bg-black/90"
            >
              <Plus className="h-4 w-4" />
              Ürün Ekle
            </Button>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="flex-1 overflow-hidden">
        <ProductSearchList
          search={search}
          onSearchChange={setSearch}
          products={products}
          isLoading={isLoading}
          debouncedSearch={debouncedSearch}
          onProductSelect={handleProductSelect}
          wrapperClassName="h-full flex flex-col"
          hideSearch
        />
      </div>
    </div>
  );
}
