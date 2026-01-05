"use client";

import { SearchInput } from "./search-input";
import { ProductListSkeleton } from "./product-list-skeleton";
import { formatCurrency } from "../utils";
import { useKeyboardNavigation } from "../hooks/use-keyboard-navigation";

type Product = {
  id: string;
  name: string;
  barcode: string | null;
  sellingPrice: string;
  totalStock?: number;
};

interface ProductSearchListProps {
  search: string;
  onSearchChange: (value: string) => void;
  products: Product[];
  isLoading: boolean;
  debouncedSearch: string;
  onProductSelect: (product: Product) => void;
  searchPlaceholder?: string;
  className?: string;
  wrapperClassName?: string;
}

export function ProductSearchList({
  search,
  onSearchChange,
  products,
  isLoading,
  debouncedSearch,
  onProductSelect,
  searchPlaceholder = "Ürün ara (isim veya barkod)...",
  className,
  wrapperClassName = "flex-[7] flex flex-col border-r",
}: ProductSearchListProps) {
  const selectedIndex = useKeyboardNavigation({
    items: products,
    onSelect: onProductSelect,
  });
  return (
    <div className={wrapperClassName}>
      {/* Search Bar - Fixed at top */}
      <div className="p-6 border-b bg-background">
        <SearchInput
          placeholder={searchPlaceholder}
          value={search}
          onChange={onSearchChange}
          autoFocus
        />
      </div>

      {/* Product List - Scrollable */}
      <div className={`flex-1 overflow-y-auto ${className || ""}`}>
        {isLoading || search !== debouncedSearch ? (
          <ProductListSkeleton />
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>
              {search
                ? "Ürün bulunamadı"
                : "Aramaya başlamak için yukarıya yazın"}
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => onProductSelect(product)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-primary hover:bg-accent ${
                  index === selectedIndex
                    ? "border-primary bg-accent"
                    : "border-border"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    {product.barcode && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.barcode}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-bold text-lg">
                      {formatCurrency(parseFloat(product.sellingPrice))}
                    </div>
                    {product.totalStock !== undefined && (
                      <div className="text-sm text-muted-foreground">
                        Stok: {product.totalStock}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
