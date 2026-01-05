"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, X } from "lucide-react";
import { CheckoutDialog } from "@/modules/pos/components/checkout-dialog";
import { formatCurrency } from "@/modules/pos/utils";
import { TR } from "@/modules/pos/constants";
import {
  useProductsWithStockQuery,
  useCreateSaleMutation,
} from "@/lib/graphql/generated";
import { ProductSearchList } from "@/modules/pos/components/product-search-list";

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

export default function POSPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: productsData, isLoading } = useProductsWithStockQuery({
    search: debouncedSearch || undefined,
  });
  const createSale = useCreateSaleMutation();

  const products = (productsData?.productsWithStock || [])
    .filter((p) => p.id != null && p.name != null && p.sellingPrice != null)
    .map((p) => ({
      id: p.id!,
      name: p.name!,
      barcode: p.barcode ?? null,
      sellingPrice: String(p.sellingPrice!),
      totalStock: p.totalStock ?? undefined,
    }));

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
    setSearch("");
  }, []);

  // Keyboard shortcuts (page-specific: F2 and Escape)
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
        } else if (search) {
          setSearch("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartItems.length, checkoutOpen, search]);

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setCartItems((prev) =>
          prev.filter((item) => item.product.id !== productId)
        );
        return;
      }
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
        await createSale.mutateAsync({
          input: {
            paymentMethod,
            notes,
            items,
          },
        });
        setCartItems([]);
        setCheckoutOpen(false);
        toast.success("Satış başarıyla tamamlandı!");
      } catch (error) {
        toast.error("Satış sırasında bir hata oluştu");
        console.error("Error creating sale:", error);
      }
    },
    [cartItems, createSale]
  );

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.sellingPrice) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-1 bg-background">
      {/* Left Panel - Product Search (70%) */}
      <ProductSearchList
        search={search}
        onSearchChange={setSearch}
        products={products}
        isLoading={isLoading}
        debouncedSearch={debouncedSearch}
        onProductSelect={handleSelectProduct}
      />

      {/* Right Panel - Ticket/Cart (30%) */}
      <div className="flex-[3] flex flex-col bg-muted/30 border-l h-[calc(100vh-64px)] overflow-hidden">
        {/* Cart Header - Fixed Height */}
        <div className="shrink-0 p-6 border-b bg-background flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {cartItems.length > 0 ? `${totalItems} Ürün` : "Fiş"}
          </h2>
          {cartItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Cart Items - SCROLLABLE AREA (Takes up remaining space) */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="space-y-3 opacity-40">
              {/* Ghost Item 1 */}
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-3">
                <div className="h-5 bg-muted-foreground/10 rounded w-3/4 mb-2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted-foreground/10 rounded w-20"></div>
                  <div className="h-4 bg-muted-foreground/10 rounded w-16"></div>
                </div>
              </div>
              {/* Ghost Item 2 */}
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-3">
                <div className="h-5 bg-muted-foreground/10 rounded w-2/3 mb-2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted-foreground/10 rounded w-20"></div>
                  <div className="h-4 bg-muted-foreground/10 rounded w-16"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-background border rounded-lg p-3 relative group"
                >
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="font-medium mb-2">{item.product.name}</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="h-6 w-6 rounded border bg-background hover:bg-accent flex items-center justify-center text-lg font-semibold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="h-6 w-6 rounded border bg-background hover:bg-accent flex items-center justify-center text-lg font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-bold">
                      {formatCurrency(
                        parseFloat(item.product.sellingPrice) * item.quantity
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer - STICKY TO BOTTOM */}
        <div className="shrink-0 border-t bg-background p-6 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {/* Subtotal */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Ara Toplam</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-2xl font-bold border-t pt-4">
            <span>Toplam</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full h-14 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={() => setCheckoutOpen(true)}
            disabled={cartItems.length === 0}
          >
            {TR.checkout} (F2)
          </Button>
        </div>
      </div>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        totalAmount={totalAmount}
        onConfirm={handleCheckout}
        isLoading={createSale.isPending}
      />
    </div>
  );
}
