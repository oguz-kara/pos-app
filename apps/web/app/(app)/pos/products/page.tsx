"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductSearchList } from "@/modules/pos/components/product-search-list";
import {
  useProductsWithStockQuery,
} from "@/lib/graphql/generated";

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

  const handleProductSelect = (product: { id: string; name: string; barcode: string | null; sellingPrice: string; totalStock?: number }) => {
    router.push(`/pos/products/${product.id}`);
  };

  return (
    <div className="space-y-6">
      <ProductSearchList
        search={search}
        onSearchChange={setSearch}
        products={products}
        isLoading={isLoading}
        debouncedSearch={debouncedSearch}
        onProductSelect={handleProductSelect}
        wrapperClassName="flex flex-col border rounded-lg"
      />
    </div>
  );
}
