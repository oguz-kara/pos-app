"use client";

import { useRouter } from "next/navigation";
import { StockEntryForm } from "@/modules/pos/components/stock-entry-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TR } from "@/modules/pos/constants";

/**
 * Stock Entry Page
 *
 * Form to add a new stock lot (purchase entry).
 */
export default function StockEntryPage() {
  const router = useRouter();

  // TODO: Fetch products for dropdown
  const products: any[] = [];

  const handleSubmit = async (data: any) => {
    // TODO: Implement add stock lot mutation
    console.log("Add stock lot:", data);
    router.push("/pos/stock");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.ADD_STOCK}</h1>
        <p className="text-muted-foreground">
          Yeni stok girişi yapın
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{TR.STOCK_ENTRY_DETAILS}</CardTitle>
          <CardDescription>
            Alış bilgilerini girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockEntryForm products={products} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
