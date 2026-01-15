"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/modules/pos/utils";
import { Receipt, RotateCcw, Filter, X } from "lucide-react";
import { useSalesHistoryQuery } from "@/lib/graphql/generated";
import { ReceiptDetailModal } from "@/modules/pos/components/receipt-detail-modal";
import { SearchInput } from "@/modules/pos/components/search-input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Sale = {
  id: string;
  receiptNo: string;
  type: "SALE" | "REFUND";
  originalSaleId: string | null;
  totalAmount: string;
  totalCost: string;
  paymentMethod: "cash" | "card";
  notes: string | null;
  createdAt: Date;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    unitPrice: string;
    unitCost: string;
    subtotal: string;
    product: {
      id: string;
      name: string;
      barcode: string | null;
      sellingPrice: string;
    };
  }>;
};

export default function SalesPage() {
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: salesData, isLoading } = useSalesHistoryQuery({
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    limit: 100,
  });

  const sales = (salesData?.salesHistory || []) as Sale[];

  // Filter sales by search term
  const filteredSales = sales.filter((sale) => {
    if (!debouncedSearch) return true;
    const searchLower = debouncedSearch.toLowerCase();
    return (
      sale.receiptNo.toLowerCase().includes(searchLower) ||
      sale.items.some((item) =>
        item.product.name.toLowerCase().includes(searchLower)
      )
    );
  });

  const handleSaleClick = (sale: Sale) => {
    setSelectedSale(sale);
    setModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSelectedSale(null);
    }
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters = startDate || endDate;

  return (
    <div className="flex flex-col h-full">
      {/* Control Bar - Shopify/Square POS Style */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between gap-4 p-4">
          {/* Left: Search */}
          <div className="flex-1 max-w-lg">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Fiş ara (fiş no veya ürün adı)..."
            />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Filtreleri Temizle
              </Button>
            )}

            {/* Filter Button */}
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant={hasActiveFilters ? "default" : "ghost"}
                  size="icon"
                  className="h-10 w-10"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtrele</SheetTitle>
                  <SheetDescription>
                    Tarih aralığına göre satışları filtreleyin
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="start-date">Başlangıç Tarihi</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">Bitiş Tarihi</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    onClick={() => setFilterOpen(false)}
                    className="w-full"
                  >
                    Uygula
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Sales List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Yükleniyor...</p>
          </div>
        ) : filteredSales.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Receipt className="h-12 w-12 mb-2 opacity-50" />
            <p>
              {search || hasActiveFilters
                ? "Kayıt bulunamadı"
                : "Henüz satış yok"}
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filteredSales.map((sale) => {
              const isRefund = sale.type === "REFUND";
              const totalAmount = parseFloat(sale.totalAmount);
              const itemCount = sale.items.reduce(
                (sum, item) => sum + Math.abs(item.quantity),
                0
              );

              return (
                <button
                  key={sale.id}
                  onClick={() => handleSaleClick(sale)}
                  className="w-full p-4 rounded-lg border-2 text-left transition-all hover:border-primary hover:bg-accent border-border"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isRefund ? (
                          <RotateCcw className="h-5 w-5 text-orange-600 flex-shrink-0" />
                        ) : (
                          <Receipt className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        )}
                        <h3 className="font-semibold text-lg">
                          {sale.receiptNo}
                        </h3>
                        {isRefund && (
                          <Badge
                            variant="outline"
                            className="text-orange-600 border-orange-600"
                          >
                            İade
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>
                          {new Date(sale.createdAt).toLocaleString("tr-TR", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                        <span>•</span>
                        <Badge
                          variant={
                            sale.paymentMethod === "cash"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {sale.paymentMethod === "cash" ? "Nakit" : "Kart"}
                        </Badge>
                        <span>•</span>
                        <span>{itemCount} ürün</span>
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <div className="font-bold text-lg">
                        {formatCurrency(totalAmount)}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedSale && (
        <ReceiptDetailModal
          sale={selectedSale}
          open={modalOpen}
          onOpenChange={handleModalClose}
        />
      )}
    </div>
  );
}
