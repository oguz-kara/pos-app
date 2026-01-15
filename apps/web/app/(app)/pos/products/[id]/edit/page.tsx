"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronLeft, ImageIcon, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CategoryCombobox } from "@/modules/pos/components/category-combobox";
import { AssetManager, type AssetManagerValue } from "@/modules/pos/components/asset-manager";
import {
  useProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useProductImagesQuery,
  useAttachProductImageMutation,
  useDetachProductImageMutation,
  useSetPrimaryImageMutation,
} from "@/lib/graphql/generated";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(1, "Ürün adı gereklidir").max(255),
  searchName: z.string().max(255).optional(),
  barcode: z.string().optional(),
  description: z.string().max(1000).optional(),
  sellingPrice: z.coerce.number().min(0.01, "Satış fiyatı 0'dan büyük olmalı"),
  categoryId: z.string().optional(),
  isActive: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

/**
 * Product Edit Page - Shopify/Square POS Style
 * Clean, high-density workspace with minimal header noise
 */
export default function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = use(params);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [images, setImages] = useState<AssetManagerValue>({});

  // Fetch product data
  const {
    data: productData,
    isLoading: isLoadingProduct,
    error: productError,
  } = useProductQuery({ id }, { retry: false });

  // Fetch product images
  const { data: imagesData } = useProductImagesQuery({ productId: id });

  // Update product mutation
  const updateProductMutation = useUpdateProductMutation({
    onError: (error: any) => {
      toast.error(error.message || "Kaydetme başarısız");
    },
  });

  // Delete product mutation
  const deleteProductMutation = useDeleteProductMutation({
    onSuccess: () => {
      toast.success("Ürün silindi");
      queryClient.invalidateQueries({ queryKey: ["Products"] });
      router.push("/pos/products");
    },
    onError: (error: any) => {
      toast.error(error.message || "Silme başarısız");
    },
  });

  // Image mutations
  const attachImageMutation = useAttachProductImageMutation();
  const detachImageMutation = useDetachProductImageMutation();
  const setPrimaryImageMutation = useSetPrimaryImageMutation();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      searchName: "",
      barcode: "",
      description: "",
      sellingPrice: 0,
      categoryId: "",
      isActive: true,
    },
  });

  const product = productData?.product;
  const productImages = imagesData?.productImages || [];

  // Update form when product data loads
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        searchName: product.searchName || "",
        barcode: product.barcode || "",
        description: product.description || "",
        sellingPrice: parseFloat(product.sellingPrice),
        categoryId: product.categoryId || "",
        isActive: product.isActive,
      });
    }
  }, [product, form]);

  // Update images state when product images load
  useEffect(() => {
    if (productImages.length > 0) {
      const featuredImage = productImages.find((img) => img.isPrimary);
      const galleryImages = productImages
        .filter((img) => !img.isPrimary)
        .sort((a, b) => a.displayOrder - b.displayOrder);

      setImages({
        featuredImageId: featuredImage?.fileId,
        galleryImageIds: galleryImages.map((img) => img.fileId),
      });
    }
  }, [productImages]);

  // Handle form submission
  const handleSubmit = async (data: ProductFormValues) => {
    try {
      // Step 1: Update product details
      await updateProductMutation.mutateAsync({
        id,
        input: {
          name: data.name,
          searchName: data.searchName || null,
          barcode: data.barcode || null,
          description: data.description || null,
          sellingPrice: data.sellingPrice,
          categoryId: data.categoryId || null,
          isActive: data.isActive,
        },
      });

      // Step 2: Sync images
      const currentImageIds = productImages.map((img) => img.fileId);
      const newImageIds = [
        ...(images.featuredImageId ? [images.featuredImageId] : []),
        ...(images.galleryImageIds || []),
      ];

      // Detach removed images
      const toRemove = currentImageIds.filter((id) => !newImageIds.includes(id));
      for (const fileId of toRemove) {
        await detachImageMutation.mutateAsync({
          input: { productId: id, fileId },
        });
      }

      // Attach new images
      const toAdd = newImageIds.filter((id) => !currentImageIds.includes(id));
      for (const fileId of toAdd) {
        const isPrimary = fileId === images.featuredImageId;
        await attachImageMutation.mutateAsync({
          input: { productId: id, fileId, isPrimary },
        });
      }

      // Update primary image if changed
      const currentPrimaryId = productImages.find((img) => img.isPrimary)?.fileId;
      if (images.featuredImageId && images.featuredImageId !== currentPrimaryId) {
        await setPrimaryImageMutation.mutateAsync({
          input: { productId: id, fileId: images.featuredImageId },
        });
      }

      // All operations complete - invalidate queries and redirect
      toast.success("Ürün kaydedildi");
      queryClient.invalidateQueries({ queryKey: ["Product"] });
      queryClient.invalidateQueries({ queryKey: ["Products"] });
      queryClient.invalidateQueries({ queryKey: ["ProductsWithStock"] });
      queryClient.invalidateQueries({ queryKey: ["ProductImages"] });
      router.push("/pos/products");
    } catch (error: any) {
      toast.error(error instanceof Error ? error.message : "Kaydetme başarısız");
      console.error("Submit error:", error);
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    await deleteProductMutation.mutateAsync({ id });
    setDeleteDialogOpen(false);
  };

  // Loading state
  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (productError || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-red-600">Ürün bulunamadı</p>
          <Button onClick={() => router.push("/pos/products")}>
            Ürünlere Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Toolbar - Shopify Style */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.push("/pos/products")}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Geri
            </Button>

            {/* Center: Product Name (Optional) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-base font-medium text-gray-900">
                {product.name}
              </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push("/pos/products")}
              >
                İptal
              </Button>
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                disabled={updateProductMutation.isPending}
                className="bg-black hover:bg-black/90"
              >
                {updateProductMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content (col-span-2) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Card A: Product Details */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Ürün Adı
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ürün adı"
                                className="text-base h-11"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="searchName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Eş Anlamlılar & Etiketler
                            </FormLabel>
                            <FormControl>
                              <TagInput
                                placeholder="Örn: W-40, Pas Sökücü (Enter'a basın)..."
                                name={field.name}
                                value={field.value || ""}
                                onChange={(value) => field.onChange(value)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            </FormControl>
                            <p className="text-xs text-gray-500">
                              Ürün aramasını kolaylaştırmak için alternatif isimler veya anahtar kelimeler ekleyin
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Açıklama
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ürün açıklaması..."
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Card B: Media */}
                <Card>
                  <CardContent className="pt-6">
                    <Label className="text-sm font-semibold mb-3 block">
                      Medya
                    </Label>
                    <AssetManager
                      value={images}
                      onChange={setImages}
                      maxGalleryImages={5}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Sidebar (col-span-1) */}
              <div className="space-y-6">
                {/* Card C: Status */}
                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm font-semibold">
                                Durum
                              </FormLabel>
                              <p className="text-xs text-gray-500">
                                Ürün satışa sunulsun mu?
                              </p>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                          <div className="mt-2">
                            <Badge
                              variant={field.value ? "default" : "secondary"}
                            >
                              {field.value ? "Aktif" : "Pasif"}
                            </Badge>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Card D: Organization */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Kategori
                            </FormLabel>
                            <FormControl>
                              <CategoryCombobox
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="Kategori seçin"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="barcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Barkod
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Barkod numarası"
                                className="h-10"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Card E: Pricing */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="sellingPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Satış Fiyatı (₺)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="h-11 text-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Stock Info (Read-only) */}
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Toplam Stok</span>
                          <span className="font-medium text-gray-900">
                            - birim
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Stok bilgileri Stok Yönetimi'nden güncellenir
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delete Button */}
                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="pt-6">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setDeleteDialogOpen(true)}
                      disabled={deleteProductMutation.isPending}
                      className="w-full"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Ürünü Sil
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ürünü sil?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{product.name}</strong> kalıcı olarak silinecek. Bu işlem
              geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteProductMutation.isPending ? "Siliniyor..." : "Sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
