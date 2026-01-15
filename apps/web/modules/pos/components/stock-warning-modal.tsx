"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatCurrency } from "../utils";
import { AlertTriangle, Package } from "lucide-react";

type Product = {
  id: string;
  name: string;
  barcode: string | null;
  sellingPrice: string;
  totalStock?: number;
};

type CartItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
};

type StockIssue = {
  product: Product;
  requestedQty: number;
  availableStock: number;
  shortage: number;
};

interface StockWarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issues: StockIssue[];
  onProceed: () => void;
  onCancel: () => void;
}

export function StockWarningModal({
  open,
  onOpenChange,
  issues,
  onProceed,
  onCancel,
}: StockWarningModalProps) {
  const criticalIssues = issues.filter(
    (issue) => issue.availableStock <= 0
  );
  const lowStockIssues = issues.filter(
    (issue) => issue.availableStock > 0 && issue.availableStock < issue.requestedQty
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            Stok Uyarısı
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Sepetteki bazı ürünlerde stok yetersizliği tespit edildi. Yine de devam
            etmek ister misiniz?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {/* Critical Issues (No Stock) */}
          {criticalIssues.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Stokta Yok ({criticalIssues.length} ürün)
              </h4>
              <div className="space-y-2">
                {criticalIssues.map((issue) => (
                  <div
                    key={issue.product.id}
                    className="p-3 bg-red-50 border-2 border-red-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-red-900">
                          {issue.product.name}
                        </p>
                        <p className="text-sm text-red-700">
                          İstenen: {issue.requestedQty} adet
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-red-600">Mevcut Stok</p>
                        <p className="text-xl font-black text-red-700">
                          {issue.availableStock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low Stock Issues */}
          {lowStockIssues.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-600 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Yetersiz Stok ({lowStockIssues.length} ürün)
              </h4>
              <div className="space-y-2">
                {lowStockIssues.map((issue) => (
                  <div
                    key={issue.product.id}
                    className="p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-yellow-900">
                          {issue.product.name}
                        </p>
                        <p className="text-sm text-yellow-700">
                          İstenen: {issue.requestedQty} adet
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-yellow-600">Mevcut Stok</p>
                        <p className="text-xl font-black text-yellow-700">
                          {issue.availableStock}
                        </p>
                        <p className="text-xs text-yellow-600">
                          Eksik: {issue.shortage} adet
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Not:</strong> Negatif stok ile satış yapılacaktır. Bu
              durumda sistem FIFO mantığıyla son alım lotundan düşüm yapacaktır.
            </p>
          </div>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-3">
          <AlertDialogCancel onClick={onCancel} className="w-full sm:w-auto">
            İptal Et
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onProceed}
            className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700"
          >
            Yine de Devam Et
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export type { StockIssue };
