'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDateTime } from '../utils'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  searchName: string
  barcode: string | null
  description: string | null
  sellingPrice: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  category?: {
    id: string
    name: string
  } | null
}

interface ProductImage {
  id: string
  fileId: string
  isPrimary: boolean
  displayOrder: number
  file: {
    id: string
    filename: string
    url: string
  }
}

interface ProductInfoSectionProps {
  product: Product
  images: ProductImage[]
  averageCost: number
}

export function ProductInfoSection({
  product,
  images,
  averageCost,
}: ProductInfoSectionProps) {
  const primaryImage = images.find((img) => img.isPrimary)
  const galleryImages = images
    .filter((img) => !img.isPrimary)
    .sort((a, b) => a.displayOrder - b.displayOrder)

  const sellingPrice = parseFloat(product.sellingPrice)
  const markup =
    averageCost > 0 ? ((sellingPrice - averageCost) / averageCost) * 100 : 0

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Ürün Bilgileri
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-4">
        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="space-y-3">
            {primaryImage && (
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={primaryImage.file.url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square overflow-hidden rounded border bg-gray-50"
                  >
                    <Image
                      src={img.file.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Basic Details */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Ürün Adı
            </p>
            <p className="text-base font-semibold">{product.name}</p>
          </div>

          {product.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Açıklama
              </p>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>
          )}

          {product.searchName && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Arama Terimleri
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.searchName.split(',').map((term, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {term.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Organization Info */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Kategori
            </p>
            {product.category ? (
              <Badge variant="secondary">{product.category.name}</Badge>
            ) : (
              <p className="text-sm text-gray-500">Kategori yok</p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Barkod</p>
            <p className="text-sm font-mono">{product.barcode || '—'}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Durum</p>
            <Badge variant={product.isActive ? 'default' : 'secondary'}>
              {product.isActive ? 'Aktif' : 'Pasif'}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Satış Fiyatı
            </p>
            <p className="text-base font-bold">
              {formatCurrency(sellingPrice)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Ort. Maliyet
            </p>
            <p className="text-sm">{formatCurrency(averageCost)}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Kar Marjı
            </p>
            <p className="text-sm font-semibold text-green-600">
              {markup.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="pt-4 text-xs text-muted-foreground space-y-1">
          <p>Oluşturuldu: {formatDateTime(product.createdAt)}</p>
          <p>Güncellendi: {formatDateTime(product.updatedAt)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
