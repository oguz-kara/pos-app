"use client";

import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: string;
  name: string;
  barcode: string | null;
  sellingPrice: string;
  totalStock?: number;
  averageCost?: number | null;
};

type StockEntryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  buyingPrice: number;
  setBuyingPrice: (price: number) => void;
  onSubmit: () => void;
  isEditing?: boolean;
};

export function StockEntryModal({
  open,
  onOpenChange,
  product,
  quantity,
  setQuantity,
  buyingPrice,
  setBuyingPrice,
  onSubmit,
  isEditing = false,
}: StockEntryModalProps) {
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const buyingPriceInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus quantity input when modal opens
  useEffect(() => {
    if (open && quantityInputRef.current) {
      setTimeout(() => {
        quantityInputRef.current?.focus();
        quantityInputRef.current?.select();
      }, 100);
    }
  }, [open]);

  const handleQuantityKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      buyingPriceInputRef.current?.focus();
      buyingPriceInputRef.current?.select();
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      onSubmit();
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
          <div className="flex items-center gap-2 pt-2">
            {isEditing && (
              <Badge variant="default" className="text-sm">
                Düzenleniyor
              </Badge>
            )}
            {product.barcode && (
              <Badge variant="outline" className="text-sm">
                Barkod: {product.barcode}
              </Badge>
            )}
            {product.totalStock !== undefined && (
              <Badge variant="secondary" className="text-sm">
                Mevcut Stok: {product.totalStock}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div>
            <Label htmlFor="modal-quantity" className="text-base">
              Miktar
            </Label>
            <Input
              ref={quantityInputRef}
              id="modal-quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              onKeyDown={handleQuantityKeyDown}
              className="text-2xl font-semibold h-14 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="modal-buying-price" className="text-base">
              Alış Fiyatı
            </Label>
            <Input
              ref={buyingPriceInputRef}
              id="modal-buying-price"
              type="number"
              step="0.01"
              min="0"
              value={buyingPrice || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setBuyingPrice(value ? parseFloat(value.toFixed(2)) : 0);
              }}
              onKeyDown={handlePriceKeyDown}
              placeholder="0.00"
              className="text-2xl font-semibold h-14 mt-2"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
