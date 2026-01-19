'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ChevronLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { TagInput } from '@/components/ui/tag-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CategoryCombobox } from '@/modules/pos/components/category-combobox'
import {
  AssetManager,
  type AssetManagerValue,
} from '@/modules/pos/components/asset-manager'
import {
  useCreateProductMutation,
  useAttachProductImageMutation,
} from '@/lib/graphql/generated'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const productSchema = z.object({
  name: z.string().min(1, 'Ürün adı gereklidir').max(255),
  searchName: z.string().max(255).optional(),
  barcode: z.string().optional(),
  sku: z.string().max(100).optional(),
  brand: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  sellingPrice: z.coerce.number().min(0.01, "Satış fiyatı 0'dan büyük olmalı"),
  categoryId: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

/**
 * Product Create Page - Shopify/Square POS Style
 * Clean, high-density workspace with minimal header noise
 */
export default function ProductCreatePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [images, setImages] = useState<AssetManagerValue>({})

  // Create product mutation
  const createProductMutation = useCreateProductMutation()

  // Attach product image mutation
  const attachImageMutation = useAttachProductImageMutation()

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      searchName: '',
      barcode: '',
      sku: '',
      brand: '',
      description: '',
      sellingPrice: 0,
      categoryId: '',
    },
  })

  // Handle form submission
  const handleSubmit = async (data: ProductFormValues) => {
    try {
      // Step 1: Create the product
      const result = await createProductMutation.mutateAsync({
        input: {
          name: data.name,
          searchName: data.searchName || null,
          barcode: data.barcode || null,
          sku: data.sku || null,
          brand: data.brand || null,
          description: data.description || null,
          sellingPrice: data.sellingPrice,
          categoryId: data.categoryId || null,
        },
      })

      if (!result.createProduct?.id) {
        throw new Error('Product creation failed')
      }

      const productId = result.createProduct.id

      // Step 2: Attach images if any were selected
      const allImageIds = [
        ...(images.featuredImageId ? [images.featuredImageId] : []),
        ...(images.galleryImageIds || []),
      ]

      for (let i = 0; i < allImageIds.length; i++) {
        const fileId = allImageIds[i]
        const isPrimary = fileId === images.featuredImageId

        await attachImageMutation.mutateAsync({
          input: {
            productId,
            fileId,
            isPrimary,
          },
        })
      }

      // Success!
      toast.success('Ürün oluşturuldu')
      queryClient.invalidateQueries({ queryKey: ['Products'] })
      queryClient.invalidateQueries({ queryKey: ['ProductsWithStock'] })
      router.push('/pos/products')
    } catch (error: any) {
      toast.error(error.message || 'Oluşturma başarısız')
    }
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
              onClick={() => router.push('/pos/products')}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Geri
            </Button>

            {/* Center: Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-base font-medium text-gray-900">
                Yeni Ürün
              </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => router.push('/pos/products')}
              >
                İptal
              </Button>
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                disabled={createProductMutation.isPending}
                className="bg-black hover:bg-black/90"
              >
                {createProductMutation.isPending
                  ? 'Oluşturuluyor...'
                  : 'Oluştur'}
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
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                              />
                            </FormControl>
                            <p className="text-xs text-gray-500">
                              Ürün aramasını kolaylaştırmak için alternatif
                              isimler veya anahtar kelimeler ekleyin
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
                {/* Card: Organization */}
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

                      <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              SKU / Stok Kodu
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ürün stok kodu"
                                className="h-10"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">
                              Marka
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ürün markası"
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
                                value={typeof field.value === 'number' ? field.value : 0}
                                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Stock Info Note */}
                      <div className="pt-3 border-t">
                        <p className="text-xs text-gray-500">
                          Stok bilgileri ürün oluşturulduktan sonra Stok
                          Yönetiminden eklenebilir
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
