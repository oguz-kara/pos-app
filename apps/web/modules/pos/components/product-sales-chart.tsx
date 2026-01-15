"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "../utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SalesTrendItem {
  date: string;
  unitsSold: number;
  revenue: number;
  cost: number;
  profit: number;
}

interface ProductSalesChartProps {
  trend: SalesTrendItem[];
  days: number;
  onDaysChange: (days: number) => void;
}

export function ProductSalesChart({
  trend,
  days,
  onDaysChange,
}: ProductSalesChartProps) {
  const [view, setView] = useState<"units" | "revenue">("revenue");

  // Format chart data
  const chartData = trend.map((item) => ({
    date: new Date(item.date).toLocaleDateString("tr-TR", {
      month: "short",
      day: "numeric",
    }),
    "Satış Adedi": item.unitsSold,
    Hasılat: item.revenue,
    Maliyet: item.cost,
    Kar: item.profit,
  }));

  // Calculate totals
  const totalUnits = trend.reduce((sum, item) => sum + item.unitsSold, 0);
  const totalRevenue = trend.reduce((sum, item) => sum + item.revenue, 0);
  const avgDailySales = trend.length > 0 ? totalRevenue / trend.length : 0;

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Satış Performansı
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex border rounded-md">
              <Button
                variant={view === "revenue" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("revenue")}
                className="rounded-r-none"
              >
                Hasılat
              </Button>
              <Button
                variant={view === "units" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("units")}
                className="rounded-l-none"
              >
                Adet
              </Button>
            </div>

            {/* Time Range Selector */}
            <div className="flex border rounded-md">
              <Button
                variant={days === 7 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onDaysChange(7)}
                className="rounded-r-none rounded-l-md"
              >
                7 Gün
              </Button>
              <Button
                variant={days === 30 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onDaysChange(30)}
                className="rounded-none"
              >
                30 Gün
              </Button>
              <Button
                variant={days === 90 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onDaysChange(90)}
                className="rounded-l-none rounded-r-md"
              >
                90 Gün
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 pb-4 border-b">
          <div>
            <p className="text-sm text-muted-foreground">Toplam Satış Adedi</p>
            <p className="text-2xl font-bold">{totalUnits}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Toplam Hasılat</p>
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Günlük Ort. Satış</p>
            <p className="text-2xl font-bold">
              {formatCurrency(avgDailySales)}
            </p>
          </div>
        </div>

        {/* Chart */}
        {trend.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            {view === "revenue" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Hasılat"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Maliyet"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Kar"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", r: 3 }}
                />
              </LineChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Satış Adedi"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", r: 3 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <p>Seçili dönemde satış verisi bulunamadı</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
