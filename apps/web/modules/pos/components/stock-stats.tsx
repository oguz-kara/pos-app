"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingDown, Boxes } from "lucide-react";
import { formatCurrency } from "@/modules/pos/utils";

interface StockStatsProps {
  totalAssetValue: number;
  lowStockCount: number;
  totalProducts: number;
}

export function StockStats({
  totalAssetValue,
  lowStockCount,
  totalProducts,
}: StockStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Total Asset Value */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Toplam Envanter Değeri
          </CardTitle>
          <Boxes className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(totalAssetValue)}</div>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Düşük Stok Uyarısı
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-destructive">{lowStockCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            10 adet altında
          </p>
        </CardContent>
      </Card>

      {/* Total Products */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Toplam Ürün
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalProducts}</div>
        </CardContent>
      </Card>
    </div>
  );
}
