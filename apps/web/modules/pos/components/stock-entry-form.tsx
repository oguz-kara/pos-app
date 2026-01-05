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
import { Textarea } from "@/components/ui/textarea";
import { TR } from "../constants";

const stockLotSchema = z.object({
  productId: z.string().min(1, "Ürün seçilmeli"),
  quantity: z.coerce.number().int().min(1, "Miktar en az 1 olmalı"),
  costPrice: z.coerce.number().min(0, "Alış fiyatı 0'dan büyük olmalı"),
  supplier: z.string().optional(),
  notes: z.string().optional(),
  purchasedAt: z.string().optional(),
});

export type StockLotFormValues = z.infer<typeof stockLotSchema>;

export function StockEntryForm({
  productId,
  onSubmit,
  onCancel,
  isLoading,
}: {
  productId?: string;
  onSubmit: (data: StockLotFormValues) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}) {
  const form = useForm<StockLotFormValues>({
    resolver: zodResolver(stockLotSchema),
    defaultValues: {
      productId: productId || "",
      quantity: 1,
      costPrice: 0,
      supplier: "",
      notes: "",
      purchasedAt: new Date().toISOString().split("T")[0],
    },
  });

  const handleSubmit = async (data: StockLotFormValues) => {
    try {
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Error submitting stock:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.quantity}</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>Alınan ürün miktarı</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="costPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.costPrice}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>Birim alış fiyatı (TL)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.supplier}</FormLabel>
              <FormControl>
                <Input placeholder="Tedarikçi adı (opsiyonel)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchasedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.purchasedAt}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{TR.notes}</FormLabel>
              <FormControl>
                <Textarea placeholder="Notlar (opsiyonel)" {...field} />
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
