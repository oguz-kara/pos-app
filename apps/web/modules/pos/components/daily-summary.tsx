"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";
import { formatCurrency } from "../utils";
import { TR } from "../constants";

type SalesSummary = {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  salesCount: number;
};

export function DailySummary({ summary }: { summary?: SalesSummary }) {
  const revenue = summary?.totalRevenue || 0;
  const profit = summary?.totalProfit || 0;
  const cost = summary?.totalCost || 0;
  const count = summary?.salesCount || 0;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {TR.totalRevenue}
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(revenue)}</div>
          <p className="text-xs text-muted-foreground">
            {count} {TR.salesCount}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {TR.totalProfit}
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(profit)}</div>
          <p className="text-xs text-muted-foreground">
            {profitMargin.toFixed(1)}% {TR.margin}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{TR.totalCost}</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(cost)}</div>
          <p className="text-xs text-muted-foreground">{TR.costOfGoods}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{TR.salesCount}</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count}</div>
          <p className="text-xs text-muted-foreground">
            {revenue > 0 ? formatCurrency(revenue / count) : formatCurrency(0)}{" "}
            {TR.averageSale}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
