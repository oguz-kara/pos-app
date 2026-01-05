"use client";

import { use } from "react";
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
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDateTime } from "@/modules/pos/utils";
import { TR } from "@/modules/pos/constants";
import { Receipt } from "lucide-react";
import { useSaleQuery } from "@/lib/graphql/generated";

/**
 * Sale Detail Page
 *
 * Shows complete receipt with all items and totals.
 */
export default function SaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useSaleQuery({ id });

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (error || !data?.sale) {
    return <div>Satış bulunamadı</div>;
  }

  const sale = data.sale;

  const profit =
    parseFloat(sale.totalAmount || "0") - parseFloat(sale.totalCost || "0");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.saleDetails}</h1>
        <p className="text-muted-foreground">{TR.saleDetailsDescription}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            {TR.receiptNo} #{sale.receiptNo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sale Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">{TR.date}</p>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(new Date(sale.createdAt))}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">{TR.paymentMethod}</p>
              <Badge
                variant={
                  sale.paymentMethod === "cash" ? "default" : "secondary"
                }
              >
                {sale.paymentMethod === "cash" ? TR.cash : TR.card}
              </Badge>
            </div>
          </div>

          {sale.notes && (
            <div>
              <p className="text-sm font-medium">{TR.notes}</p>
              <p className="text-sm text-muted-foreground">{sale.notes}</p>
            </div>
          )}

          <Separator />

          {/* Items */}
          <div>
            <h3 className="font-medium mb-4">{TR.items}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{TR.productName}</TableHead>
                  <TableHead>{TR.quantity}</TableHead>
                  <TableHead>{TR.unitPrice}</TableHead>
                  <TableHead className="text-right">{TR.subtotal}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(sale.items || []).map((item) => (
                  <TableRow key={item?.id}>
                    <TableCell>{item?.product?.name}</TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>
                      {formatCurrency(parseFloat(item?.unitPrice || "0"))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(parseFloat(item?.subtotal || "0"))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-lg font-medium">
              <span>{TR.totalAmount}</span>
              <span>{formatCurrency(parseFloat(sale.totalAmount || "0"))}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{TR.totalCost}</span>
              <span>{formatCurrency(parseFloat(sale.totalCost || "0"))}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-green-600">
              <span>{TR.profit}</span>
              <span>{formatCurrency(profit)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
