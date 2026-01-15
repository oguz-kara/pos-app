"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "../utils";
import { AlertTriangle } from "lucide-react";

interface StockLot {
  id: string;
  quantity: number;
  remaining: number;
  costPrice: string;
  supplier: string | null;
  supplierId: string | null;
  notes: string | null;
  purchasedAt: string;
  createdAt: string;
}

interface ProductStockLotsTableProps {
  lots: StockLot[];
  averageCost: number;
}

export function ProductStockLotsTable({
  lots,
  averageCost,
}: ProductStockLotsTableProps) {
  // Sort by purchase date (FIFO order - oldest first)
  const sortedLots = [...lots].sort(
    (a, b) =>
      new Date(a.purchasedAt).getTime() - new Date(b.purchasedAt).getTime()
  );

  const totalQuantity = lots.reduce((sum, lot) => sum + lot.quantity, 0);
  const totalRemaining = lots.reduce((sum, lot) => sum + lot.remaining, 0);
  const totalValue = lots.reduce(
    (sum, lot) => sum + lot.remaining * parseFloat(lot.costPrice),
    0
  );

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Stok Hareketleri (FIFO)
          </CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Toplam Alınan: </span>
              <span className="font-semibold">{totalQuantity} birim</span>
            </div>
            <div>
              <span className="text-muted-foreground">Kalan: </span>
              <span className="font-semibold">{totalRemaining} birim</span>
            </div>
            <div>
              <span className="text-muted-foreground">Stok Değeri: </span>
              <span className="font-semibold">{formatCurrency(totalValue)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {lots.length > 0 ? (
          <>
            {/* Average Cost Indicator */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Ağırlıklı Ortalama Maliyet:</span>{" "}
                <span className="text-lg font-bold text-blue-700">
                  {formatCurrency(averageCost)}
                </span>{" "}
                / birim
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alım Tarihi</TableHead>
                    <TableHead>Tedarikçi</TableHead>
                    <TableHead className="text-right">Alınan Miktar</TableHead>
                    <TableHead className="text-right">Kalan Miktar</TableHead>
                    <TableHead className="text-right">Birim Maliyet</TableHead>
                    <TableHead className="text-right">Toplam Değer</TableHead>
                    <TableHead>Notlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLots.map((lot) => {
                    const lotValue = lot.remaining * parseFloat(lot.costPrice);
                    const isLow = lot.remaining < 5 && lot.remaining > 0;
                    const isNegative = lot.remaining < 0;

                    return (
                      <TableRow key={lot.id}>
                        <TableCell>
                          <span className="text-sm">
                            {formatDate(lot.purchasedAt)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {lot.supplier ? (
                            <span className="text-sm font-medium">
                              {lot.supplier}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm">{lot.quantity}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span
                              className={`text-sm font-semibold ${
                                isNegative
                                  ? "text-red-600"
                                  : isLow
                                  ? "text-orange-600"
                                  : ""
                              }`}
                            >
                              {lot.remaining}
                            </span>
                            {isLow && (
                              <Badge variant="outline" className="text-xs">
                                Düşük
                              </Badge>
                            )}
                            {isNegative && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Negatif
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-medium">
                            {formatCurrency(parseFloat(lot.costPrice))}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-semibold">
                            {formatCurrency(lotValue)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {lot.notes ? (
                            <span className="text-xs text-muted-foreground">
                              {lot.notes}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Henüz stok hareketi bulunmuyor</p>
            <p className="text-sm mt-1">
              Stok eklemek için Stok Yönetimi sayfasına gidin
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
