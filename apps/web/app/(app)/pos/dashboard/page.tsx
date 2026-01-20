"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/modules/pos/utils";
import { TR } from "@/modules/pos/constants";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Package,
} from "lucide-react";
import {
  useTodaysPulseQuery,
  useSalesTrendQuery,
  useTopProductsQuery,
  useDashboardLowStockQuery,
} from "@/lib/graphql/generated";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PeriodType = "today" | "week" | "month";

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState<PeriodType>("today");
  const [topProductsLimit] = useState(5);
  const [lowStockThreshold] = useState(10);

  // Determine trend days based on active period
  const trendDays = activePeriod === "today" ? 7 : activePeriod === "week" ? 7 : 30;

  // Fetch dashboard data
  const { data: pulseData } = useTodaysPulseQuery();
  const { data: trendData } = useSalesTrendQuery({ days: trendDays });
  const { data: topProductsData } = useTopProductsQuery({
    limit: topProductsLimit,
  });
  const { data: lowStockData } = useDashboardLowStockQuery({
    threshold: lowStockThreshold,
  });

  const pulse = pulseData?.todaysPulse;
  const salesTrend = trendData?.salesTrend || [];
  const topProducts = topProductsData?.topProducts || [];
  const lowStockProducts = lowStockData?.dashboardLowStock || [];

  // Format sales trend data for recharts
  const chartData = salesTrend
    .filter((item) => item?.date != null)
    .map((item) => ({
      date: new Date(item.date!).toLocaleDateString("tr-TR", {
        month: "short",
        day: "numeric",
      }),
      Satış: item.sales,
      Maliyet: item.cost,
      Kar: item.profit,
    }));

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kontrol Paneli</h1>
        <p className="text-muted-foreground">
          Performans ve satış analitiği
        </p>
      </div>

      {/* Period Filter Tabs */}
      <Tabs value={activePeriod} onValueChange={(value) => setActivePeriod(value as PeriodType)}>
        <TabsList>
          <TabsTrigger value="today">{TR.today}</TabsTrigger>
          <TabsTrigger value="week">{TR.weekly}</TabsTrigger>
          <TabsTrigger value="month">{TR.monthly}</TabsTrigger>
        </TabsList>

        <TabsContent value={activePeriod} className="space-y-6 mt-6">

      {/* Today's Pulse KPIs */}
      <div className="grid grid-cols-5 gap-4">
        {/* Total Sales */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bugünkü Satış
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(pulse?.totalSales || 0)}
            </div>
          </CardContent>
        </Card>

        {/* Total Refunds */}
        <Card className="bg-white shadow-sm border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bugünkü İadeler
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {formatCurrency(pulse?.totalRefunds || 0)}
            </div>
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
              {formatCurrency(pulse?.grossProfit || 0)}
            </div>
            {pulse && pulse.totalSales != null && pulse.totalSales > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(((pulse.grossProfit || 0) / pulse.totalSales) * 100)}% Kar
                Marjı
              </p>
            )}
          </CardContent>
        </Card>

        {/* Transaction Count */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              İşlem Sayısı
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {pulse?.transactionCount || 0}
            </div>
            {pulse && pulse.transactionCount != null && pulse.transactionCount > 0 && pulse.totalSales != null && (
              <p className="text-xs text-muted-foreground mt-1">
                Ort: {formatCurrency(pulse.totalSales / pulse.transactionCount)}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Total Cost */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Toplam Maliyet
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">
              {formatCurrency(pulse?.totalCost || 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>
            {activePeriod === "today" && "Son 7 Günlük Satış Trendi"}
            {activePeriod === "week" && "Haftalık Satış Trendi (7 Gün)"}
            {activePeriod === "month" && "Aylık Satış Trendi (30 Gün)"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value: number | undefined) => formatCurrency(value || 0)}
                />
                <Legend />
                <Bar dataKey="Satış" fill="#3b82f6" />
                <Bar dataKey="Maliyet" fill="#ef4444" />
                <Bar dataKey="Kar" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Henüz veri yok
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom Row: Top Products + Low Stock */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top 5 Products */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>En Çok Satan Ürünler</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.productId}
                    className="flex items-center justify-between border-b pb-3 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-sm">
                        {index + 1}
                      </Badge>
                      <div>
                        <div className="font-semibold">{product.productName}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.quantitySold} adet satıldı
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {formatCurrency(product.revenue || 0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Henüz satış verisi yok
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Düşük Stok Uyarıları
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.map((product) => {
                  const currentStock = product.currentStock ?? 0;
                  const stockPercentage = Math.min(
                    (currentStock / lowStockThreshold) * 100,
                    100
                  );
                  const getProgressColor = () => {
                    if (currentStock === 0) return "bg-destructive";
                    if (currentStock < 5) return "bg-orange-500";
                    return "bg-yellow-500";
                  };

                  return (
                    <div
                      key={product.productId}
                      className="border-b pb-3 last:border-b-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold">
                            {product.productName}
                          </div>
                          {product.barcode && (
                            <div className="text-sm text-muted-foreground">
                              {product.barcode}
                            </div>
                          )}
                        </div>
                        <Badge
                          variant={
                            currentStock === 0
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {currentStock} adet
                        </Badge>
                      </div>
                      <Progress
                        value={stockPercentage}
                        indicatorClassName={getProgressColor()}
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Tüm ürünler yeterli stokta
              </div>
            )}
          </CardContent>
        </Card>
      </div>

        </TabsContent>
      </Tabs>
    </div>
  );
}
