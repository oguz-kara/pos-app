"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "../utils";
import { Trash2, Package } from "lucide-react";

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

interface CartItemEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CartItem | null;
  onSave: (item: CartItem) => void;
  onRemove: (productId: string) => void;
}

export function CartItemEditModal({
  open,
  onOpenChange,
  item,
  onSave,
  onRemove,
}: CartItemEditModalProps) {
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("0");
  const [targetTotal, setTargetTotal] = useState("");

  const quantityInputRef = useRef<HTMLInputElement>(null);

  // Initialize form when item changes
  useEffect(() => {
    if (item) {
      setQuantity(item.quantity.toString());
      setUnitPrice(item.unitPrice.toFixed(2));
      setTargetTotal("");
    }
  }, [item]);

  // Auto-focus quantity input when modal opens
  useEffect(() => {
    if (open && quantityInputRef.current) {
      setTimeout(() => {
        quantityInputRef.current?.focus();
        quantityInputRef.current?.select();
      }, 100);
    }
  }, [open]);

  if (!item) return null;

  const originalPrice = parseFloat(item.product.sellingPrice);
  const quantityNum = parseFloat(quantity) || 1;
  let unitPriceNum = parseFloat(unitPrice) || 0;

  // If target total is set, calculate unit price from it
  if (targetTotal && targetTotal.trim() !== "") {
    const targetTotalNum = parseFloat(targetTotal) || 0;
    unitPriceNum = quantityNum > 0 ? targetTotalNum / quantityNum : 0;
  }

  const calculatedTotal = quantityNum * unitPriceNum;
  const discountPerItem = originalPrice - unitPriceNum;
  const totalDiscount = discountPerItem * quantityNum;
  const discountPercentage =
    originalPrice > 0 ? (discountPerItem / originalPrice) * 100 : 0;

  const handleSave = () => {
    // Round to 2 decimal places
    const roundedUnitPrice = Math.round(Math.max(0.01, unitPriceNum) * 100) / 100;
    const roundedQuantity = Math.max(0.01, quantityNum);

    onSave({
      ...item,
      quantity: roundedQuantity,
      unitPrice: roundedUnitPrice,
    });
    onOpenChange(false);
  };

  // Auto-round price inputs on blur
  const handleUnitPriceBlur = () => {
    const rounded = Math.round(parseFloat(unitPrice) * 100) / 100;
    if (!isNaN(rounded)) {
      setUnitPrice(rounded.toFixed(2));
    }
  };

  const handleTargetTotalBlur = () => {
    const rounded = Math.round(parseFloat(targetTotal) * 100) / 100;
    if (!isNaN(rounded) && targetTotal) {
      setTargetTotal(rounded.toFixed(2));
    }
  };

  const handleRemove = () => {
    onRemove(item.product.id);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {item.product.name}
          </DialogTitle>
          {item.product.totalStock !== undefined && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Package className="h-4 w-4" />
              <span>Stok: {item.product.totalStock}</span>
            </div>
          )}
        </DialogHeader>

        {/* Form */}
        <div className="space-y-6 py-4" onKeyDown={handleKeyDown}>
          {/* Quantity Input */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-base font-semibold">
              Miktar
            </Label>
            <Input
              ref={quantityInputRef}
              id="quantity"
              type="number"
              step="0.01"
              min="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="text-xl h-14 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Unit Price Input */}
          <div className="space-y-2">
            <Label htmlFor="unitPrice" className="text-base font-semibold">
              Birim Fiyat
            </Label>
            <Input
              id="unitPrice"
              type="number"
              step="0.01"
              min="0.01"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              onBlur={handleUnitPriceBlur}
              disabled={!!targetTotal}
              className="text-lg h-12 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground">
              Orijinal: {formatCurrency(originalPrice)}
            </p>
          </div>

          {/* Target Total Input */}
          <div className="space-y-2">
            <Label htmlFor="targetTotal" className="text-base font-semibold">
              Hedef Toplam (Opsiyonel)
            </Label>
            <Input
              id="targetTotal"
              type="number"
              step="0.01"
              min="0.01"
              value={targetTotal}
              onChange={(e) => setTargetTotal(e.target.value)}
              onBlur={handleTargetTotalBlur}
              placeholder="İndirim için hedef toplam girin"
              className="text-lg h-12 focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-muted-foreground">
              Bu değer girilirse, birim fiyat otomatik hesaplanır
            </p>
          </div>

          {/* Calculated Summary */}
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ara Toplam:</span>
              <span className="font-bold text-lg">
                {formatCurrency(calculatedTotal)}
              </span>
            </div>

            {totalDiscount > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">İndirim:</span>
                  <span className="font-semibold text-red-600">
                    -{formatCurrency(totalDiscount)} (
                    {discountPercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Birim İndirim:</span>
                  <span className="font-semibold text-red-600">
                    -{formatCurrency(discountPerItem)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            onClick={handleRemove}
            className="w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Sepetten Çıkar
          </Button>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-initial"
            >
              İptal
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 sm:flex-initial bg-primary "
            >
              Kaydet (Enter)
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
