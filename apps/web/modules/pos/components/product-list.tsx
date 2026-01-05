"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils";
import { TR } from "../constants";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  barcode?: string | null;
  sellingPrice: string;
  isActive: boolean;
  categoryId?: string | null;
  stock?: number;
};

export function ProductList({
  products,
  onDelete,
  search = "",
  onSearchChange,
}: {
  products: Product[];
  onDelete?: (id: string) => void;
  search?: string;
  onSearchChange?: (search: string) => void;
}) {
  const [localSearch, setLocalSearch] = useState("");

  // Use controlled or uncontrolled search
  const searchValue = onSearchChange ? search : localSearch;
  const setSearchValue = onSearchChange || setLocalSearch;

  // No client-side filtering - let the server handle it with Turkish-aware search
  const filteredProducts = products;

  return (
    <div className="space-y-4">
      {/* Search Bar + Add Button */}
      <div className="flex items-center border-b bg-background">
        <div className="p-4 flex-1">
          <SearchInput
            placeholder="Ürün ara (isim veya barkod)..."
            value={searchValue}
            onChange={setSearchValue}
            autoFocus
          />
        </div>
        <Link href="/pos/products/new">
          <Button size="lg" className="h-12 px-6">
            <Plus className="mr-2 h-5 w-5" />
            {TR.addProduct}
          </Button>
        </Link>
      </div>

      {/* Product List */}
      <div className="space-y-3 bg-gray-50 rounded-lg px-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {TR.noData}
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                {/* Left: Product Name + Barcode */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{product.name}</p>
                  {product.barcode ? (
                    <p className="text-sm text-muted-foreground">
                      {product.barcode}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">-</p>
                  )}
                </div>

                {/* Right: Price + Stock + Actions */}
                <div className="flex items-center gap-0">
                  {/* Price & Stock (Stacked) */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {formatCurrency(parseFloat(product.sellingPrice))}
                    </p>
                    {product.stock !== undefined ? (
                      <p className="text-sm text-muted-foreground">
                        Stok: {product.stock}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">-</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 ml-4">
                    <Link href={`/pos/products/${product.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
