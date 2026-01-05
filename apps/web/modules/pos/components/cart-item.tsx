"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils";

type Product = {
  id: string;
  name: string;
  sellingPrice: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  const subtotal =
    parseFloat(item.product.sellingPrice) * item.quantity;

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex-1">
        <p className="font-medium">{item.product.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(item.product.sellingPrice)} x {item.quantity}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() =>
              onUpdateQuantity(
                item.product.id,
                Math.max(1, item.quantity - 1)
              )
            }
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-semibold">
            {item.quantity}
          </span>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() =>
              onUpdateQuantity(item.product.id, item.quantity + 1)
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-24 text-right font-semibold">
          {formatCurrency(subtotal)}
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onRemove(item.product.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
