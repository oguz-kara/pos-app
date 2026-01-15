"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getStockStatus, getStockStatusLabel } from "../utils";
import { Package, Boxes, DollarSign, TrendingUp } from "lucide-react";

interface ProductOverviewStatsProps {
  totalStock: number;
  averageCost: number;
  totalRevenue: number;
  grossProfit: number;
  profitMargin: number;
}

export function ProductOverviewStats({
  totalStock,
  averageCost,
  totalRevenue,
  grossProfit,
  profitMargin,
}: ProductOverviewStatsProps) {
  const inventoryValue = totalStock * averageCost;
  const stockStatus = getStockStatus(totalStock);
  const stockLabel = getStockStatusLabel(totalStock);

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Current Stock Level */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Mevcut Stok
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalStock}</div>
          <div className="mt-2">
            <Badge variant={stockStatus}>{stockLabel}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">birim</p>
        </CardContent>
      </Card>

      {/* Inventory Value */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Envanter Değeri
          </CardTitle>
          <Boxes className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatCurrency(inventoryValue)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ort. maliyet: {formatCurrency(averageCost)}/birim
          </p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Toplam Hasılat
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Seçili dönem
          </p>
        </CardContent>
      </Card>

      {/* Gross Profit */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Brüt Kar
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {formatCurrency(grossProfit)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Kar marjı: {profitMargin.toFixed(1)}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
