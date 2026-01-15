"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateTime } from "../utils";
import {
  ShoppingCart,
  Package,
  RotateCcw,
  Edit,
  ArrowRight,
} from "lucide-react";

interface SalesHistoryItem {
  saleId: string;
  receiptNo: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  paymentMethod: string;
  saleType: string;
  createdAt: string;
}

interface StockLog {
  id: string;
  type: string;
  quantity: number;
  notes: string | null;
  createdAt: string;
}

interface ProductActivityTimelineProps {
  salesHistory: SalesHistoryItem[];
  stockLogs: StockLog[];
}

type Activity = {
  id: string;
  type: "sale" | "refund" | "stock" | "adjustment";
  timestamp: Date;
  description: string;
  quantity: number;
  value?: number;
  receiptNo?: string;
  paymentMethod?: string;
  notes?: string | null;
};

export function ProductActivityTimeline({
  salesHistory,
  stockLogs,
}: ProductActivityTimelineProps) {
  // Combine and sort activities
  const activities: Activity[] = [
    ...salesHistory.map((sale) => ({
      id: sale.saleId,
      type: (sale.saleType === "REFUND" ? "refund" : "sale") as Activity["type"],
      timestamp: new Date(sale.createdAt),
      description:
        sale.saleType === "REFUND" ? "İade edildi" : "Satıldı",
      quantity: Math.abs(sale.quantity),
      value: parseFloat(sale.subtotal),
      receiptNo: sale.receiptNo,
      paymentMethod: sale.paymentMethod,
    })),
    ...stockLogs.map((log) => ({
      id: log.id,
      type: (log.type === "ADJUSTMENT" ? "adjustment" : "stock") as Activity["type"],
      timestamp: new Date(log.createdAt),
      description:
        log.type === "PURCHASE"
          ? "Stok eklendi"
          : log.type === "ADJUSTMENT"
          ? "Stok düzeltmesi"
          : "Stok hareketi",
      quantity: Math.abs(log.quantity),
      notes: log.notes,
    })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Take last 20 activities
  const recentActivities = activities.slice(0, 20);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "sale":
        return (
          <div className="bg-blue-100 text-blue-600 rounded-full p-2">
            <ShoppingCart className="h-4 w-4" />
          </div>
        );
      case "refund":
        return (
          <div className="bg-orange-100 text-orange-600 rounded-full p-2">
            <RotateCcw className="h-4 w-4" />
          </div>
        );
      case "stock":
        return (
          <div className="bg-green-100 text-green-600 rounded-full p-2">
            <Package className="h-4 w-4" />
          </div>
        );
      case "adjustment":
        return (
          <div className="bg-purple-100 text-purple-600 rounded-full p-2">
            <Edit className="h-4 w-4" />
          </div>
        );
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "sale":
        return "text-blue-600";
      case "refund":
        return "text-orange-600";
      case "stock":
        return "text-green-600";
      case "adjustment":
        return "text-purple-600";
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Son Hareketler
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDateTime(activity.timestamp)}
                      </p>
                    </div>

                    {/* Quantity Badge */}
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {activity.type === "refund" || activity.type === "adjustment"
                          ? "-"
                          : "+"}
                        {activity.quantity}
                      </Badge>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    {activity.receiptNo && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="font-mono text-xs">
                          #{activity.receiptNo}
                        </span>
                      </div>
                    )}

                    {activity.value !== undefined && (
                      <div className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="font-semibold">
                          {formatCurrency(activity.value)}
                        </span>
                      </div>
                    )}

                    {activity.paymentMethod && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.paymentMethod === "cash" ? "Nakit" : "Kart"}
                      </Badge>
                    )}

                    {activity.notes && (
                      <p className="text-xs text-muted-foreground italic">
                        {activity.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Henüz hareket kaydı bulunmuyor</p>
          </div>
        )}

        {activities.length > 20 && (
          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Son 20 hareket gösteriliyor • Toplam: {activities.length}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
