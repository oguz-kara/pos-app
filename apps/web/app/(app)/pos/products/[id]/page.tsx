'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useProductQuery,
  useProductStockQuery,
  useProductAnalyticsQuery,
  useProductSalesTrendQuery,
  useProductSalesHistoryQuery,
  useStockLogsQuery,
  useProductImagesQuery,
} from '@/lib/graphql/generated'
import { ProductOverviewStats } from '@/modules/pos/components/product-overview-stats'
import { ProductInfoSection } from '@/modules/pos/components/product-info-section'
import { ProductSalesChart } from '@/modules/pos/components/product-sales-chart'
import { ProductStockLotsTable } from '@/modules/pos/components/product-stock-lots-table'
import { ProductActivityTimeline } from '@/modules/pos/components/product-activity-timeline'

/**
 * Product Details Page
 * Comprehensive view of product lifecycle: purchase → stock → sale
 */
export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const [trendDays, setTrendDays] = useState(30)

  // Fetch all product data
  const {
    data: productData,
    isLoading: isLoadingProduct,
    error: productError,
  } = useProductQuery({ id }, { retry: false })

  const { data: stockData, isLoading: isLoadingStock } = useProductStockQuery({
    productId: id,
  })

  const { data: analyticsData, isLoading: isLoadingAnalytics } =
    useProductAnalyticsQuery({
      productId: id,
    })

  const { data: trendData, isLoading: isLoadingTrend } =
    useProductSalesTrendQuery({
      productId: id,
      days: trendDays,
    })

  const { data: salesHistoryData, isLoading: isLoadingSalesHistory } =
    useProductSalesHistoryQuery({
      productId: id,
      limit: 20,
    })

  const { data: stockLogsData, isLoading: isLoadingStockLogs } =
    useStockLogsQuery({
      productId: id,
      limit: 20,
    })

  const { data: imagesData } = useProductImagesQuery({ productId: id })

  const product = productData?.product
  const stock = stockData?.productStock
  const analytics = analyticsData?.productAnalytics
  const trend = trendData?.productSalesTrend || []
  const salesHistory = salesHistoryData?.productSalesHistory || []
  const stockLogs = stockLogsData?.stockLogs || []
  const images = imagesData?.productImages || []

  // Loading state
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  // Error state
  if (productError || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-red-600">Ürün bulunamadı</p>
          <Button onClick={() => router.push('/pos/products')}>
            Ürünlere Dön
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Toolbar */}
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

            {/* Center: Product Name */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-base font-medium text-gray-900">
                {product.name}
              </span>
            </div>

            {/* Right: Edit Button */}
            <Button
              onClick={() => router.push(`/pos/products/${id}/edit`)}
              className="bg-black hover:bg-black/90 gap-2"
            >
              <Edit className="h-4 w-4" />
              Düzenle
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Overview Stats */}
        {isLoadingStock || isLoadingAnalytics ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <ProductOverviewStats
            totalStock={stock?.totalStock || 0}
            averageCost={stock?.averageCost || 0}
            totalRevenue={analytics?.totalRevenue || 0}
            grossProfit={analytics?.grossProfit || 0}
            profitMargin={analytics?.profitMargin || 0}
          />
        )}

        {/* Left: Product Info (1 column) */}
        <div>
          <ProductInfoSection
            product={product}
            images={images}
            averageCost={stock?.averageCost || 0}
          />
        </div>
        <div>
          {analytics && !isLoadingAnalytics && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Toplam Satış Adedi
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {analytics.totalUnitsSold}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {trendDays} günlük dönem
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Ort. Satış Fiyatı
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    ₺{analytics.averageSalePrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    birim başına
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">İşlem Sayısı</p>
                  <p className="text-3xl font-bold mt-2">
                    {analytics.transactionCount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    tekil satış
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">İade Oranı</p>
                  <p className="text-3xl font-bold mt-2 text-orange-600">
                    {analytics.refundRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analytics.refundedUnits} iade
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Additional Metrics */}

        {/* Right: Sales Chart (2 columns) */}
        <div className="lg:col-span-2">
          {isLoadingTrend ? (
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-96 w-full" />
              </CardContent>
            </Card>
          ) : (
            <ProductSalesChart
              trend={trend}
              days={trendDays}
              onDaysChange={setTrendDays}
            />
          )}
        </div>

        {/* Stock Management */}
        {isLoadingStock ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <ProductStockLotsTable
            lots={stock?.lots || []}
            averageCost={stock?.averageCost || 0}
          />
        )}

        {/* Recent Activity */}
        {isLoadingSalesHistory || isLoadingStockLogs ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <ProductActivityTimeline
            salesHistory={salesHistory}
            stockLogs={stockLogs}
          />
        )}
      </div>
    </div>
  )
}
