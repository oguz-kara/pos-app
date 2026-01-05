"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductSearch } from "./product-search";
import { Cart } from "./cart";
import { CheckoutDialog } from "./checkout-dialog";
import { TR } from "../constants";
import { toast } from "sonner";

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
};

export function QuickSale({
  products = [],
  search = "",
  onSearchChange,
  onCreateSale,
  isCreatingSale,
}: {
  products?: Product[];
  search?: string;
  onSearchChange?: (search: string) => void;
  onCreateSale: (
    items: { productId: string; quantity: number; unitPrice: number }[],
    paymentMethod: "cash" | "card",
    notes?: string
  ) => Promise<void>;
  isCreatingSale?: boolean;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F2 - Open checkout
      if (e.key === "F2") {
        e.preventDefault();
        if (cartItems.length > 0) {
          setCheckoutOpen(true);
        }
      }
      // Escape - Clear search or close checkout
      if (e.key === "Escape") {
        if (checkoutOpen) {
          setCheckoutOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartItems.length, checkoutOpen]);

  const handleSelectProduct = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} sepete eklendi`);
  }, []);

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    },
    []
  );

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
    toast.info("Ürün sepetten çıkarıldı");
  }, []);

  const handleClearCart = useCallback(() => {
    if (confirm("Sepeti temizlemek istediğinizden emin misiniz?")) {
      setCartItems([]);
      toast.info("Sepet temizlendi");
    }
  }, []);

  const handleCheckout = useCallback(
    async (paymentMethod: "cash" | "card", notes?: string) => {
      const items = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: parseFloat(item.product.sellingPrice),
      }));

      try {
        await onCreateSale(items, paymentMethod, notes);
        setCartItems([]);
        setCheckoutOpen(false);
        toast.success("Satış başarıyla tamamlandı!");
      } catch (error) {
        toast.error("Satış sırasında bir hata oluştu");
        console.error("Error creating sale:", error);
      }
    },
    [cartItems, onCreateSale]
  );

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.sellingPrice) * item.quantity,
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Product Search - Left Side */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{TR.quickSale}</h1>
          <p className="text-muted-foreground">
            Ürün arayın ve sepete ekleyin. Enter tuşu ile ürün ekleyin, F2 ile
            ödemeye geçin.
          </p>
        </div>
        <ProductSearch
          products={products}
          onSelectProduct={handleSelectProduct}
          search={search}
          onSearchChange={onSearchChange}
          autoFocus
        />
      </div>

      {/* Cart - Right Side */}
      <div className="border rounded-lg overflow-hidden">
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onCheckout={() => setCheckoutOpen(true)}
        />
      </div>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        totalAmount={totalAmount}
        onConfirm={handleCheckout}
        isLoading={isCreatingSale}
      />
    </div>
  );
}
