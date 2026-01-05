"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/modules/pos/components/product-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TR } from "@/modules/pos/constants";
import { ProductFormValues } from "@/modules/pos/components/product-form";

/**
 * New Product Page
 *
 * Form to create a new product.
 */
export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormValues) => {
    // TODO: Implement create product mutation
    console.log("Create product:", data);
    router.push("/pos/products");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.addProduct}</h1>
        <p className="text-muted-foreground">Yeni ürün ekleyin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{TR.product}</CardTitle>
          <CardDescription>Ürün bilgilerini girin</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm categories={[]} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
