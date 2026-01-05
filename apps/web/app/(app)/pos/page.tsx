"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, X } from "lucide-react";
import { CheckoutDialog } from "@/modules/pos/components/checkout-dialog";
import { CartItemEditModal } from "@/modules/pos/components/cart-item-edit-modal";
import { CartDiscountModal } from "@/modules/pos/components/cart-discount-modal";
import { calculateCartDiscount } from "@/modules/pos/hooks/use-cart-discount";
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
  unitPrice: number; // Allows custom pricing/discounts
};

export default function POSPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);

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
      return [
        ...prev,
        {
          product,
          quantity: 1,
          unitPrice: parseFloat(product.sellingPrice),
        },
      ];
    });
    toast.success(`${product.name} sepete eklendi`);
    setSearch("");
  }, []);

  // Keyboard shortcuts (page-specific: Space for checkout, Escape to clear search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      const isTypingField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Space - Open checkout (only if not typing and cart has items)
      if (e.key === " " && !isTypingField) {
        if (cartItems.length > 0) {
          e.preventDefault(); // Prevent page scroll
          setCheckoutOpen(true);
        }
      }
      // Escape - Clear search
      if (e.key === "Escape") {
        if (search) {
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

  const handleUpdateCartItem = useCallback((updatedItem: CartItem) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === updatedItem.product.id ? updatedItem : item
      )
    );
  }, []);

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

  // Calculate current total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = useCallback(
    async (paymentMethod: "cash" | "card", notes?: string) => {
      const items = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
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

  const handleApplyDiscount = useCallback(
    (targetTotal: number) => {
      const discountedItems = calculateCartDiscount(cartItems, targetTotal);
      setCartItems(discountedItems);
      toast.success("İndirim uygulandı");
    },
    [cartItems]
  );

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
        cartItems={cartItems}
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
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.product.id}
                    className="bg-background border rounded-lg p-3 relative group cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setEditingItem(item)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.product.id);
                      }}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="font-medium mb-2">{item.product.name}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateQuantity(
                              item.product.id,
                              item.quantity - 1
                            );
                          }}
                          className="h-6 w-6 rounded border bg-background hover:bg-accent flex items-center justify-center text-lg font-semibold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateQuantity(
                              item.product.id,
                              item.quantity + 1
                            );
                          }}
                          className="h-6 w-6 rounded border bg-background hover:bg-accent flex items-center justify-center text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-bold">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                );
              })}
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

          {/* Discount/Round Button */}
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-base"
              onClick={() => setDiscountModalOpen(true)}
            >
              İndirim / Yuvarla
            </Button>
          )}

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full h-14 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={() => setCheckoutOpen(true)}
            disabled={cartItems.length === 0}
          >
            {TR.checkout} (Space)
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

      {/* Cart Item Edit Modal */}
      <CartItemEditModal
        open={editingItem !== null}
        onOpenChange={(open) => {
          if (!open) setEditingItem(null);
        }}
        item={editingItem}
        onSave={handleUpdateCartItem}
        onRemove={handleRemoveItem}
      />

      {/* Cart Discount Modal */}
      <CartDiscountModal
        open={discountModalOpen}
        onOpenChange={setDiscountModalOpen}
        currentTotal={totalAmount}
        onApply={handleApplyDiscount}
      />
    </div>
  );
}
