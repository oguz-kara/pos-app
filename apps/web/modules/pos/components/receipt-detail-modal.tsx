"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/modules/pos/utils";
import { RotateCcw } from "lucide-react";
import { useRefundSaleItemMutation } from "@/lib/graphql/generated";
import { toast } from "sonner";

type Sale = {
  id: string;
  receiptNo: string;
  type: "SALE" | "REFUND";
  originalSaleId: string | null;
  totalAmount: string;
  totalCost: string;
  paymentMethod: "cash" | "card";
  notes: string | null;
  createdAt: Date;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    unitPrice: string;
    unitCost: string;
    subtotal: string;
    product: {
      id: string;
      name: string;
      barcode: string | null;
      sellingPrice: string;
    };
  }>;
};

interface ReceiptDetailModalProps {
  sale: Sale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReceiptDetailModal({
  sale,
  open,
  onOpenChange,
}: ReceiptDetailModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: refundItem, isPending: isRefunding } =
    useRefundSaleItemMutation();

  const handleRefund = async (itemId: string, productName: string) => {
    if (
      !window.confirm(
        `'${productName}' ürününü iade etmek istediğinizden emin misiniz?`
      )
    ) {
      return;
    }

    try {
      await refundItem({ saleItemId: itemId });

      // Invalidate dashboard queries to show updated data
      queryClient.invalidateQueries({ queryKey: ['TodaysPulse'] });
      queryClient.invalidateQueries({ queryKey: ['SalesTrend'] });
      queryClient.invalidateQueries({ queryKey: ['TopProducts'] });
      queryClient.invalidateQueries({ queryKey: ['ProductsWithStock'] });
      queryClient.invalidateQueries({ queryKey: ['SalesHistory'] });

      toast.success(`${productName} iade edildi`);
      onOpenChange(false);
    } catch (error) {
      console.error("Refund error:", error);
      toast.error("İade işlemi başarısız oldu");
    }
  };

  const isRefund = sale.type === "REFUND";
  const totalAmount = parseFloat(sale.totalAmount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {sale.receiptNo}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {isRefund && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  İade
                </Badge>
              )}
              <Badge
                variant={sale.paymentMethod === "cash" ? "default" : "secondary"}
              >
                {sale.paymentMethod === "cash" ? "Nakit" : "Kart"}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {new Date(sale.createdAt).toLocaleString("tr-TR", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
        </DialogHeader>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead className="text-right">Miktar</TableHead>
                <TableHead className="text-right">Birim Fiyat</TableHead>
                <TableHead className="text-right">Toplam</TableHead>
                {!isRefund && <TableHead className="text-right">İşlem</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sale.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.product.name}</div>
                    {item.product.barcode && (
                      <div className="text-sm text-muted-foreground">
                        {item.product.barcode}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{Math.abs(item.quantity)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(parseFloat(item.unitPrice))}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(Math.abs(parseFloat(item.subtotal)))}
                  </TableCell>
                  {!isRefund && (
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRefund(item.id, item.product.name)}
                        disabled={isRefunding}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        İade
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Toplam:</span>
                <span className={isRefund ? "text-orange-600" : "text-green-600"}>
                  {formatCurrency(Math.abs(totalAmount))}
                </span>
              </div>
            </div>
          </div>

          {sale.notes && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Not: {sale.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
