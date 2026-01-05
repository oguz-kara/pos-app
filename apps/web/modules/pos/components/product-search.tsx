"use client";

import { useState, useEffect, useRef } from "react";
import { SearchInput } from "./search-input";
import { TR } from "../constants";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  barcode: string | null;
  sellingPrice: string;
  totalStock?: number;
};

export function ProductSearch({
  products = [],
  onSelectProduct,
  search = "",
  onSearchChange,
  autoFocus = false,
}: {
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  search?: string;
  onSearchChange?: (search: string) => void;
  autoFocus?: boolean;
}) {
  const [localQuery, setLocalQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled search
  const query = onSearchChange ? search : localQuery;
  const setQuery = onSearchChange || setLocalQuery;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Products are already filtered by server, just show them
  const filteredProducts = query ? products : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredProducts.length === 0) {
      if (e.key === "Enter" && query) {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredProducts.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredProducts[selectedIndex]) {
          handleSelect(filteredProducts[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        if (onSearchChange) {
          onSearchChange("");
        } else {
          setLocalQuery("");
        }
        break;
    }
  };

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    if (onSearchChange) {
      onSearchChange("");
    } else {
      setLocalQuery("");
    }
    setIsOpen(false);
    setSelectedIndex(0);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={(value) => {
          setQuery(value);
          setIsOpen(true);
          setSelectedIndex(0);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => query && setIsOpen(true)}
        placeholder={`${TR.search} (${TR.productName} veya ${TR.barcode})`}
        autoFocus={autoFocus}
      />

      {isOpen && filteredProducts.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-80 overflow-auto"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "px-4 py-3 cursor-pointer hover:bg-accent",
                index === selectedIndex && "bg-accent"
              )}
              onClick={() => handleSelect(product)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{product.name}</p>
                  {product.barcode && (
                    <p className="text-sm text-muted-foreground">
                      {product.barcode}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {parseFloat(product.sellingPrice).toFixed(2)} TL
                  </p>
                  {product.totalStock !== undefined && (
                    <p className="text-sm text-muted-foreground">
                      Stok: {product.totalStock}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
