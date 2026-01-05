"use client";

import { Button } from "@/components/ui/button";
import { CartItemComponent } from "./cart-item";
import { formatCurrency } from "../utils";
import { TR } from "../constants";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  sellingPrice: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}) {
  const totalAmount = items.reduce(
    (sum, item) =>
      sum + parseFloat(item.product.sellingPrice) * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <ShoppingCart className="h-16 w-16 mb-4" />
        <p className="text-lg font-medium">{TR.cart} boş</p>
        <p className="text-sm">Ürün aramak için yukarıdaki arama kutusunu kullanın</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {TR.cart} ({totalItems} ürün)
        </h2>
        <Button variant="ghost" size="sm" onClick={onClearCart}>
          {TR.clearCart}
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-2">
        {items.map((item) => (
          <CartItemComponent
            key={item.product.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}
      </div>

      <div className="border-t p-4 space-y-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>{TR.totalAmount}</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={onCheckout}
        >
          {TR.checkout} (F2)
        </Button>
      </div>
    </div>
  );
}
