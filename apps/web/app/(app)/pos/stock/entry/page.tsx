"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/modules/pos/utils";
import { ProductSearchList } from "@/modules/pos/components/product-search-list";
import { SupplierCombobox } from "@/modules/pos/components/supplier-combobox";
import { StockEntryModal } from "@/modules/pos/components/stock-entry-modal";
import { useProductsWithStockQuery, useAddStockBulkMutation } from "@/lib/graphql/generated";
import { useQueryClient } from "@tanstack/react-query";

type Product = {
  id: string;
  name: string;
  barcode: string | null;
  sellingPrice: string;
  totalStock?: number;
  averageCost?: number | null;
};

type InvoiceItem = {
  product: Product;
  quantity: number;
  unitCost: number;
};

/**
 * Purchase Invoice Entry Page (Alış Faturası)
 *
 * Allows entering multiple products from a physical invoice in one go.
 */
export default function StockEntryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Header fields
  const [supplierId, setSupplierId] = useState<string | undefined>();
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [referenceNo, setReferenceNo] = useState("");

  // Product search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Product entry line
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const [buyingPrice, setBuyingPrice] = useState(0);

  // Staging list
  const [items, setItems] = useState<InvoiceItem[]>([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: productsData, isLoading } = useProductsWithStockQuery({
    search: debouncedSearch || undefined,
  });

  const { mutateAsync: addStockBulk, isPending: isSavingInvoice } = useAddStockBulkMutation();

  const products = (productsData?.productsWithStock || [])
    .filter((p) => p.id != null && p.name != null && p.sellingPrice != null)
    .map((p) => ({
      id: p.id!,
      name: p.name!,
      barcode: p.barcode ?? null,
      sku: p.sku ?? null,
      brand: p.brand ?? null,
      sellingPrice: String(p.sellingPrice!),
      totalStock: p.totalStock ?? undefined,
      averageCost: p.averageCost ?? null,
    }));

  const handleProductSelect = useCallback(
    (product: Product) => {
      // Don't open modal if already open
      if (isModalOpen) return;

      setSelectedProduct(product);
      setSelectedProductId(product.id);
      setSearch("");

      // Check if this product already exists in the items list
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        // Editing existing item - pre-fill with existing values
        setQuantity(existingItem.quantity);
        setBuyingPrice(existingItem.unitCost);
        setIsEditingExisting(true);
      } else {
        // Adding new item - use defaults
        setQuantity(1);
        // Smart Default: Auto-populate buying price from averageCost if available
        if (product.averageCost && product.averageCost > 0) {
          setBuyingPrice(parseFloat(product.averageCost.toFixed(2)));
        } else {
          setBuyingPrice(0);
        }
        setIsEditingExisting(false);
      }

      // Open modal for product entry
      setIsModalOpen(true);
    },
    [isModalOpen, items]
  );

  const handleAddItem = useCallback(() => {
    if (!selectedProduct) {
      toast.error("Lütfen ürün seçin");
      return;
    }
    if (quantity <= 0) {
      toast.error("Miktar 0'dan büyük olmalı");
      return;
    }
    if (buyingPrice <= 0) {
      toast.error("Alış fiyatı 0'dan büyük olmalı");
      return;
    }

    if (isEditingExisting) {
      // Update existing item
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === selectedProduct.id
            ? { ...item, quantity, unitCost: buyingPrice }
            : item
        )
      );
      toast.success(`${selectedProduct.name} güncellendi`);
    } else {
      // Add new item
      const newItem: InvoiceItem = {
        product: selectedProduct,
        quantity,
        unitCost: buyingPrice,
      };
      setItems((prev) => [...prev, newItem]);
      toast.success(`${selectedProduct.name} listeye eklendi`);
    }

    // Close modal
    setIsModalOpen(false);

    // Reset entry fields
    setSelectedProduct(null);
    setSelectedProductId(null);
    setQuantity(1);
    setBuyingPrice(0);
    setIsEditingExisting(false);

    // Focus back on search for next product
    setTimeout(() => {
      const searchInput = document.querySelector(
        'input[type="text"]'
      ) as HTMLInputElement;
      searchInput?.focus();
    }, 100);
  }, [selectedProduct, quantity, buyingPrice, isEditingExisting]);

  const handleRemoveItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleEditItem = useCallback(
    (item: InvoiceItem) => {
      // Don't open modal if already open
      if (isModalOpen) return;

      setSelectedProduct(item.product);
      setSelectedProductId(item.product.id);
      setQuantity(item.quantity);
      setBuyingPrice(item.unitCost);
      setIsEditingExisting(true);
      setIsModalOpen(true);
    },
    [isModalOpen]
  );

  const handleModalClose = useCallback((open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      // Reset editing state when modal closes
      setIsEditingExisting(false);
      setSelectedProduct(null);
      setSelectedProductId(null);
      setQuantity(1);
      setBuyingPrice(0);
    }
  }, []);

  const handleCompleteEntry = useCallback(async () => {
    if (items.length === 0) {
      toast.error("Lütfen en az bir ürün ekleyin");
      return;
    }

    try {
      await addStockBulk({
        input: {
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            costPrice: item.unitCost,
            supplierId: supplierId || null,
            notes: null,
            purchasedAt: invoiceDate ? new Date(invoiceDate) : new Date(),
          })),
          invoiceRef: referenceNo || null,
        },
      });

      toast.success("Stok girişi tamamlandı!");

      // Invalidate all stock-related queries to refresh the UI
      await queryClient.invalidateQueries({ queryKey: ['ProductsWithStock'] });
      await queryClient.invalidateQueries({ queryKey: ['ProductStock'] });
      await queryClient.invalidateQueries({ queryKey: ['StockLogs'] });
      await queryClient.invalidateQueries({ queryKey: ['StockLots'] });

      router.push("/pos/stock");
    } catch (error) {
      console.error("Stock entry error:", error);
      toast.error("Stok girişi sırasında hata oluştu");
    }
  }, [items, supplierId, invoiceDate, referenceNo, router, addStockBulk, queryClient]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = items.reduce(
    (sum, item) => sum + item.quantity * item.unitCost,
    0
  );

  return (
    <div className="flex flex-1 bg-background">
      {/* Left Panel - Product Search */}
      <ProductSearchList
        search={search}
        onSearchChange={setSearch}
        products={products}
        isLoading={isLoading}
        debouncedSearch={debouncedSearch}
        onProductSelect={handleProductSelect}
        searchPlaceholder="Ürün ara (isim veya barkod)..."
        selectedProductId={selectedProductId}
        disableKeyboardNavigation={isModalOpen}
      />

      {/* Right Panel - Invoice Entry */}
      <div className="flex-[5] flex flex-col bg-muted/30 h-[calc(100vh-64px)] overflow-hidden">
        {/* Header Section */}
        <div className="shrink-0 p-6 border-b bg-background">
          <h2 className="text-2xl font-bold mb-4">Alış Faturası Girişi</h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="supplier">Tedarikçi</Label>
              <SupplierCombobox
                value={supplierId}
                onValueChange={setSupplierId}
                placeholder="Ekle"
              />
            </div>
            <div>
              <Label htmlFor="invoice-date">Fatura Tarihi</Label>
              <Input
                id="invoice-date"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="reference-no">Referans No</Label>
              <Input
                id="reference-no"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                placeholder="Opsiyonel"
              />
            </div>
          </div>
        </div>

        {/* Staging List - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p>Henüz ürün eklenmedi</p>
              <p className="text-sm mt-2">Soldan ürün seçerek ekleyin</p>
            </div>
          ) : (
            <Card className="rounded-none">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ürün Adı</TableHead>
                      <TableHead className="text-right">Miktar</TableHead>
                      <TableHead className="text-right">
                        Birim Maliyet
                      </TableHead>
                      <TableHead className="text-right">Toplam</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow
                        key={index}
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleEditItem(item)}
                      >
                        <TableCell className="font-medium">
                          {item.product.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.unitCost)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(item.quantity * item.unitCost)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(index);
                            }}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer - Summary and Action */}
        <div className="shrink-0 border-t bg-background p-6 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Toplam Ürün Sayısı:</span>
            <span className="font-semibold">{totalItems}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold border-t pt-4">
            <span>Toplam Maliyet:</span>
            <span>{formatCurrency(totalCost)}</span>
          </div>

          <Button
            size="lg"
            className="w-full h-14 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={handleCompleteEntry}
            disabled={items.length === 0 || isSavingInvoice}
          >
            {isSavingInvoice ? "Kaydediliyor..." : `Girişi Tamamla (${items.length} Ürün)`}
          </Button>
        </div>
      </div>

      {/* Stock Entry Modal */}
      <StockEntryModal
        open={isModalOpen}
        onOpenChange={handleModalClose}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        buyingPrice={buyingPrice}
        setBuyingPrice={setBuyingPrice}
        onSubmit={handleAddItem}
        isEditing={isEditingExisting}
      />
    </div>
  );
}
