"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/modules/pos/components/product-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TR } from "@/modules/pos/constants";

/**
 * Edit Product Page
 *
 * Form to edit an existing product.
 */
export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // TODO: Fetch product by ID from GraphQL
  const product = null;

  const handleSubmit = async (data: any) => {
    // TODO: Implement update product mutation
    console.log("Update product:", params.id, data);
    router.push("/pos/products");
  };

  if (!product) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{TR.EDIT_PRODUCT}</h1>
        <p className="text-muted-foreground">
          Ürün bilgilerini düzenleyin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{TR.PRODUCT_DETAILS}</CardTitle>
          <CardDescription>
            Ürün bilgilerini güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
