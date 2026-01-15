"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/modules/pos/utils";
import { TR } from "@/modules/pos/constants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useProductsWithStockQuery } from "@/lib/graphql/generated";
import { SearchInput } from "@/modules/pos/components/search-input";
import { StockStats } from "@/modules/pos/components/stock-stats";

/**
 * Inventory Intelligence Dashboard
 *
 * High-level dashboard showing KPIs and financial view of products.
 */
export default function StockPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: productsData, isLoading } = useProductsWithStockQuery({
    search: debouncedSearch || undefined,
  });

  const productsWithStock = useMemo(() => {
    return (productsData?.productsWithStock || [])
      .filter((p) => p.id != null && p.name != null && p.sellingPrice != null)
      .map((p) => ({
        id: p.id!,
        name: p.name!,
        barcode: p.barcode ?? null,
        sellingPrice: parseFloat(p.sellingPrice ?? "0"),
        totalStock: p.totalStock ?? 0,
        averageCost: p.averageCost ?? 0,
      }));
  }, [productsData]);

  // Calculate KPI metrics
  const totalAssetValue = useMemo(() => {
    return productsWithStock.reduce(
      (sum, product) => sum + product.totalStock * product.averageCost,
      0
    );
  }, [productsWithStock]);

  const lowStockCount = useMemo(() => {
    return productsWithStock.filter((product) => product.totalStock < 10)
      .length;
  }, [productsWithStock]);

  const totalProducts = productsWithStock.length;

  // Calculate stock color and progress
  const getStockColor = (stock: number) => {
    if (stock < 20) return "text-destructive";
    if (stock > 50) return "text-green-600";
    return "text-yellow-600";
  };

  const getProgressColor = (stock: number) => {
    if (stock < 20) return "bg-destructive";
    if (stock > 50) return "bg-green-600";
    return "bg-yellow-600";
  };

  // Calculate profit margin percentage
  const calculateMargin = (cost: number, price: number) => {
    if (cost === 0) return 0;
    return Math.round(((price - cost) / price) * 100);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {TR.stockManagement}
          </h1>
          <p className="text-muted-foreground">
            Envanter analitiği ve finansal bakış
          </p>
        </div>
        <Link href="/pos/stock/entry">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {TR.addStock}
          </Button>
        </Link>
      </div>

      {/* KPI Section */}
      <StockStats
        totalAssetValue={totalAssetValue}
        lowStockCount={lowStockCount}
        totalProducts={totalProducts}
      />

      {/* Search Bar */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Ürün ara (isim veya barkod)..."
      />

      {/* Product List - Financial View */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">
              Yükleniyor...
            </div>
          ) : productsWithStock.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {search ? "Ürün bulunamadı" : TR.noProducts}
            </div>
          ) : (
            <div className="space-y-4">
              {productsWithStock.map((product) => {
                const margin = calculateMargin(
                  product.averageCost,
                  product.sellingPrice
                );
                const stockPercentage = Math.min(
                  (product.totalStock / 100) * 100,
                  100
                );

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    {/* Left: Product Name & Barcode */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-lg truncate">
                        {product.name}
                      </div>
                      {product.barcode && (
                        <div className="text-sm text-muted-foreground">
                          {product.barcode}
                        </div>
                      )}
                    </div>

                    {/* Center: Stock Meter */}
                    <div className="flex-1 mx-8">
                      <div
                        className={`text-sm font-semibold mb-1 ${getStockColor(
                          product.totalStock
                        )}`}
                      >
                        {product.totalStock} Adet
                      </div>
                      <Progress
                        value={stockPercentage}
                        indicatorClassName={getProgressColor(
                          product.totalStock
                        )}
                        className="h-3"
                      />
                    </div>

                    {/* Right: The Money */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Maliyet: {formatCurrency(product.averageCost)}
                        </div>
                        <div className="text-base font-semibold">
                          Fiyat: {formatCurrency(product.sellingPrice)}
                        </div>
                      </div>
                      {margin > 0 && (
                        <Badge
                          variant={margin > 30 ? "default" : "secondary"}
                          className="text-sm px-3 py-1"
                        >
                          {margin}% Kar
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
