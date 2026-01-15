'use client'

import { useEffect, useRef, RefObject } from 'react'
import { SearchInput } from './search-input'
import { ProductListSkeleton } from './product-list-skeleton'
import { CategoryFilter } from './category-filter'
import { formatCurrency } from '../utils'
import { useKeyboardNavigation } from '../hooks/use-keyboard-navigation'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Category = {
  id: string
  name: string
}

type Product = {
  id: string
  name: string
  barcode: string | null
  sellingPrice: string
  totalStock?: number
  category?: Category | null
}

type CartItem = {
  product: Product
  quantity: number
  unitPrice: number
}

interface ProductSearchListProps {
  search: string
  onSearchChange: (value: string) => void
  products: Product[]
  isLoading: boolean
  debouncedSearch: string
  onProductSelect: (product: Product) => void
  cartItems?: CartItem[]
  searchPlaceholder?: string
  className?: string
  wrapperClassName?: string
  categories?: Category[]
  selectedCategory?: string | null
  onCategoryChange?: (categoryId: string | null) => void
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
  selectedProductId?: string | null
  disableKeyboardNavigation?: boolean
  searchInputRef?: RefObject<HTMLInputElement | null>
  hideSearch?: boolean
}

export function ProductSearchList({
  search,
  onSearchChange,
  products,
  isLoading,
  debouncedSearch,
  onProductSelect,
  cartItems = [],
  searchPlaceholder = 'Ürün ara (isim veya barkod)...',
  className,
  wrapperClassName = 'flex-[7] flex flex-col border-r',
  categories = [],
  selectedCategory = null,
  onCategoryChange,
  onEdit,
  onDelete,
  selectedProductId = null,
  disableKeyboardNavigation = false,
  hideSearch = false,
  searchInputRef,
}: ProductSearchListProps) {
  const { selectedIndex, shouldScroll } = useKeyboardNavigation({
    items: products,
    onSelect: onProductSelect,
    enabled: !disableKeyboardNavigation,
  })

  const selectedItemRef = useRef<HTMLButtonElement>(null)

  // Scroll selected item into view ONLY when arrow keys are used
  useEffect(() => {
    if (selectedItemRef.current && shouldScroll && !disableKeyboardNavigation) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [selectedIndex, shouldScroll, disableKeyboardNavigation])

  // Create a map of productId -> quantity for quick lookup
  const cartQuantityMap = new Map(
    cartItems.map((item) => [item.product.id, item.quantity]),
  )

  return (
    <div className={cn(wrapperClassName, 'flex-[5]')}>
      {/* Search Bar - Fixed at top */}
      {hideSearch ? null : (
        <div className="p-6 border-b bg-background">
          <SearchInput
            ref={searchInputRef}
            placeholder={searchPlaceholder}
            value={search}
            onChange={onSearchChange}
            autoFocus
          />
        </div>
      )}

      {/* Category Filter Pills */}
      {categories.length > 0 && onCategoryChange && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      )}

      {/* Product List - Scrollable */}
      <div className={`flex-1 overflow-y-auto ${className || ''}`}>
        {isLoading || search !== debouncedSearch ? (
          <ProductListSkeleton />
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>
              {search
                ? 'Ürün bulunamadı'
                : 'Aramaya başlamak için yukarıya yazın'}
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {products.map((product, index) => {
              const quantity = cartQuantityMap.get(product.id) || 0
              const stock = product.totalStock ?? 0

              // Smart stock indicator logic
              let stockColorClass = 'text-sm text-muted-foreground'
              if (stock < 10) {
                stockColorClass =
                  'text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md'
              } else if (stock < 20) {
                stockColorClass =
                  'text-sm font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md'
              }

              const handleClick = () => {
                if (onEdit) {
                  onEdit(product)
                } else {
                  onProductSelect(product)
                }
              }

              const handleDelete = (e: React.MouseEvent) => {
                e.stopPropagation()
                if (onDelete) {
                  onDelete(product)
                }
              }

              // Check if this product is the selected one (for purchase invoice highlighting)
              const isSelectedProduct = selectedProductId === product.id

              return (
                <button
                  key={product.id}
                  ref={index === selectedIndex ? selectedItemRef : null}
                  onClick={handleClick}
                  className={`group w-full p-4 rounded-lg border-2 text-left transition-all hover:border-primary hover:bg-accent relative ${
                    isSelectedProduct
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : index === selectedIndex
                        ? 'border-primary bg-accent'
                        : 'border-border'
                  }`}
                >
                  {/* Quantity Badge */}
                  {quantity > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-green-500 text-white border-0 flex items-center justify-center p-0 text-xs font-bold">
                      {quantity}
                    </Badge>
                  )}

                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      {product.barcode && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.barcode}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4 flex items-start gap-3">
                      <div>
                        <div className="font-bold text-lg">
                          {formatCurrency(parseFloat(product.sellingPrice))}
                        </div>
                        {product.totalStock !== undefined && (
                          <div className={stockColorClass}>
                            Stok: {product.totalStock}
                          </div>
                        )}
                      </div>

                      {/* Delete Icon - Shows on hover */}
                      {onDelete && (
                        <button
                          onClick={handleDelete}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                          aria-label="Sil"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
