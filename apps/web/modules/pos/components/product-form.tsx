"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategorySelect } from "./category-select";
import { TR } from "../constants";

type Category = {
  id: string;
  name: string;
};

const productSchema = z.object({
  name: z.string().min(1, "Ürün adı gerekli").max(255),
  barcode: z.string().optional(),
  sellingPrice: z.coerce.number().min(0, "Fiyat 0'dan büyük olmalı"),
  categoryId: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm({
  categories,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: {
  categories: Category[];
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      barcode: defaultValues?.barcode || "",
      sellingPrice: defaultValues?.sellingPrice || 0,
      categoryId: defaultValues?.categoryId || "",
    },
  });

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      await onSubmit(data);
      if (!defaultValues) {
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.productName}</FormLabel>
              <FormControl>
                <Input placeholder="Ürün adı" {...field} />
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
              <FormLabel>{TR.barcode}</FormLabel>
              <FormControl>
                <Input placeholder="Barkod (opsiyonel)" {...field} />
              </FormControl>
              <FormDescription>Opsiyonel - Hızlı arama için</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sellingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.sellingPrice}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>Satış fiyatı (TL)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.category}</FormLabel>
              <FormControl>
                <CategorySelect
                  categories={categories}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Kategori seçin (opsiyonel)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {TR.cancel}
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {TR.save}
          </Button>
        </div>
      </form>
    </Form>
  );
}
