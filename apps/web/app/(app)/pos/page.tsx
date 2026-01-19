'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Trash2, X, Moon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CheckoutDialog } from '@/modules/pos/components/checkout-dialog'
import { CartItemEditModal } from '@/modules/pos/components/cart-item-edit-modal'
import { CartDiscountModal } from '@/modules/pos/components/cart-discount-modal'
import { StockWarningModal, type StockIssue } from '@/modules/pos/components/stock-warning-modal'
import { CloseDayModal } from '@/modules/pos/components/close-day-modal'
import { calculateCartDiscount } from '@/modules/pos/hooks/use-cart-discount'
import { usePosKeyboard } from '@/modules/pos/hooks/use-pos-keyboard'
import { parseMultiplier } from '@/modules/pos/utils/parse-multiplier'
import { retryWithBackoff, isNetworkError } from '@/modules/pos/utils/retry'
import { formatCurrency } from '@/modules/pos/utils'
import { TR } from '@/modules/pos/constants'
import {
  useProductsWithStockQuery,
  useCreateSaleMutation,
  useTodaysCashSalesQuery,
  useTodaysCardSalesQuery,
  useTodaysRefundsQuery,
  useGenerateDailyReportMutation,
} from '@/lib/graphql/generated'
import { ProductSearchList } from '@/modules/pos/components/product-search-list'
import { toNumber } from '@/lib/utils'

type Product = {
  id: string
  name: string
  barcode: string | null
  sku: string | null
  brand: string | null
  sellingPrice: string
  totalStock?: number
}

type CartItem = {
  product: Product
  quantity: number
  unitPrice: number // Allows custom pricing/discounts
}

export default function POSPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CartItem | null>(null)
  const [discountModalOpen, setDiscountModalOpen] = useState(false)
  const [closeDayModalOpen, setCloseDayModalOpen] = useState(false)
  const [clearCartDialogOpen, setClearCartDialogOpen] = useState(false)
  const [showRestorePrompt, setShowRestorePrompt] = useState(false)
  const [savedCart, setSavedCart] = useState<CartItem[] | null>(null)
  const [stockWarningOpen, setStockWarningOpen] = useState(false)
  const [stockIssues, setStockIssues] = useState<StockIssue[]>([])
  const [pendingCheckout, setPendingCheckout] = useState(false)

  // Refs for keyboard navigation
  const searchInputRef = useRef<HTMLInputElement>(null)
  const latestCartItemRef = useRef<HTMLInputElement>(null)

  // Debounce search input with multiplier parsing
  useEffect(() => {
    const timer = setTimeout(() => {
      const { searchTerm } = parseMultiplier(search)
      setDebouncedSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  // Restore cart from localStorage on mount
  useEffect(() => {
    const savedCartData = localStorage.getItem('pos-cart')
    if (savedCartData) {
      try {
        const parsed = JSON.parse(savedCartData)
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          setSavedCart(parsed)
          setShowRestorePrompt(true)
        }
      } catch (error) {
        console.error('Failed to restore cart:', error)
        localStorage.removeItem('pos-cart')
      }
    }
  }, [])

  // Auto-save cart to localStorage (every 5 seconds after changes)
  useEffect(() => {
    if (cartItems.length === 0) {
      // Clear localStorage when cart is empty
      localStorage.removeItem('pos-cart')
      return
    }

    const timer = setTimeout(() => {
      try {
        localStorage.setItem('pos-cart', JSON.stringify(cartItems))
      } catch (error) {
        console.error('Failed to save cart:', error)
      }
    }, 5000) // 5 second delay

    return () => clearTimeout(timer)
  }, [cartItems])

  const { data: productsData, isLoading } = useProductsWithStockQuery({
    search: debouncedSearch || undefined,
  })
  const createSale = useCreateSaleMutation()
  const generateDailyReport = useGenerateDailyReportMutation()

  // Get today's date range for sales queries
  const { todayStart, todayEnd } = useMemo(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    return { todayStart: start, todayEnd: end }
  }, [])

  const { data: cashSalesData } = useTodaysCashSalesQuery({
    startDate: todayStart,
    endDate: todayEnd,
  })
  const { data: cardSalesData } = useTodaysCardSalesQuery({
    startDate: todayStart,
    endDate: todayEnd,
  })
  const { data: refundsData } = useTodaysRefundsQuery({
    startDate: todayStart,
    endDate: todayEnd,
  })

  console.log({ cashSalesData, cardSalesData, refundsData })

  const products = (productsData?.productsWithStock || [])
    .filter((p) => p.id != null && p.name != null && p.sellingPrice != null)
    .map((p) => ({
      id: p.id!,
      name: p.name!,
      barcode: p.barcode ?? null,
      sku: p.sku ?? null,
      brand: p.brand ?? null,
      sellingPrice: String(p.sellingPrice!),
      totalStock: p.totalStock ?? undefined,
    }))

  const handleSelectProduct = useCallback(
    (product: Product) => {
      // Parse multiplier from search string
      const { quantity: multiplierQty } = parseMultiplier(search)

      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id)
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + multiplierQty }
              : item,
          )
        }
        return [
          ...prev,
          {
            product,
            quantity: multiplierQty,
            unitPrice: parseFloat(product.sellingPrice),
          },
        ]
      })

      const message =
        multiplierQty > 1
          ? `${multiplierQty}x ${product.name} sepete eklendi`
          : `${product.name} sepete eklendi`
      toast.success(message)
      setSearch('')

      // Focus the latest cart item's quantity input after a short delay
      setTimeout(() => {
        latestCartItemRef.current?.focus()
        latestCartItemRef.current?.select()
      }, 100)
    },
    [search],
  )

  // Keyboard shortcuts (page-specific: Space for checkout, Escape to clear search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement
      const isTypingField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      // Space - Open checkout (only if not typing and cart has items)
      if (e.key === ' ' && !isTypingField) {
        if (cartItems.length > 0) {
          e.preventDefault() // Prevent page scroll
          validateStockAndOpenCheckout()
        }
      }
      // Escape - Clear search
      if (e.key === 'Escape') {
        if (search) {
          setSearch('')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cartItems.length, checkoutOpen, search])

  const handleUpdateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setCartItems((prev) =>
          prev.filter((item) => item.product.id !== productId),
        )
        return
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      )
    },
    [],
  )

  const handleUpdateCartItem = useCallback((updatedItem: CartItem) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === updatedItem.product.id ? updatedItem : item,
      ),
    )
  }, [])

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const handleClearCart = useCallback(() => {
    setClearCartDialogOpen(true)
  }, [])

  const confirmClearCart = useCallback(() => {
    setCartItems([])
    toast.info('Sepet temizlendi')
    setClearCartDialogOpen(false)
  }, [])

  const handleRestoreCart = useCallback(() => {
    if (savedCart) {
      setCartItems(savedCart)
      toast.success(`${savedCart.length} ürün geri yüklendi`)
      setSavedCart(null)
      setShowRestorePrompt(false)
    }
  }, [savedCart])

  const handleDismissRestore = useCallback(() => {
    localStorage.removeItem('pos-cart')
    setSavedCart(null)
    setShowRestorePrompt(false)
    toast.info('Kaydedilmiş sepet silindi')
  }, [])

  // Validate stock before checkout
  const validateStockAndOpenCheckout = useCallback(() => {
    const issues: StockIssue[] = []

    // Check each cart item for stock issues
    cartItems.forEach((item) => {
      const availableStock = item.product.totalStock ?? 0
      const requestedQty = item.quantity

      if (availableStock < requestedQty) {
        issues.push({
          product: item.product,
          requestedQty,
          availableStock,
          shortage: requestedQty - availableStock,
        })
      }
    })

    // If issues found, show warning modal
    if (issues.length > 0) {
      setStockIssues(issues)
      setStockWarningOpen(true)
      setPendingCheckout(true)
    } else {
      // No issues, proceed directly to checkout
      setCheckoutOpen(true)
    }
  }, [cartItems])

  const handleStockWarningProceed = useCallback(() => {
    setStockWarningOpen(false)
    setPendingCheckout(false)
    setCheckoutOpen(true)
    // Log the override decision
    console.warn('Stock warning overridden:', stockIssues)
    toast.warning('Negatif stok ile satış yapılacak')
  }, [stockIssues])

  const handleStockWarningCancel = useCallback(() => {
    setStockWarningOpen(false)
    setPendingCheckout(false)
    toast.info('Satış iptal edildi')
  }, [])

  // Helper function to get stock badge styling
  const getStockBadgeStyle = (stock: number) => {
    if (stock <= 0) {
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300',
        label: 'Stokta Yok',
      }
    } else if (stock < 5) {
      return {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
        label: `Kritik: ${stock}`,
      }
    } else if (stock < 20) {
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        label: `Az Stok: ${stock}`,
      }
    } else {
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        label: `Stok: ${stock}`,
      }
    }
  }

  // Calculate current total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  )

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = useCallback(
    async (paymentMethod: 'cash' | 'card', notes?: string) => {
      const items = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))

      try {
        // Use retry logic for network failures
        await retryWithBackoff(
          () =>
            createSale.mutateAsync({
              input: {
                paymentMethod,
                notes,
                items,
              },
            }),
          {
            maxAttempts: 3,
            baseDelay: 1000,
            onRetry: (attempt, error) => {
              console.warn(`Sale attempt ${attempt} failed:`, error)
              toast.loading(`Yeniden deneniyor... (Deneme ${attempt}/3)`, {
                id: 'sale-retry',
              })
            },
          }
        )

        // Success! Invalidate dashboard queries to show updated data
        queryClient.invalidateQueries({ queryKey: ['TodaysPulse'] })
        queryClient.invalidateQueries({ queryKey: ['SalesTrend'] })
        queryClient.invalidateQueries({ queryKey: ['TopProducts'] })
        queryClient.invalidateQueries({ queryKey: ['ProductsWithStock'] })
        queryClient.invalidateQueries({ queryKey: ['SalesHistory'] })

        // Clear cart and localStorage
        setCartItems([])
        setCheckoutOpen(false)
        localStorage.removeItem('pos-cart')
        toast.success('Satış başarıyla tamamlandı!', { id: 'sale-retry' })
      } catch (error) {
        const err = error as Error

        // Dismiss any retry toasts
        toast.dismiss('sale-retry')

        if (isNetworkError(err)) {
          // Network error - cart saved in localStorage for recovery
          toast.error(
            'Ağ hatası: Satış tamamlanamadı. Sepet kaydedildi, lütfen tekrar deneyin.',
            { duration: 5000 }
          )
        } else {
          // Business logic error (validation, etc.)
          toast.error('Satış sırasında bir hata oluştu: ' + err.message)
        }

        console.error('Error creating sale:', error)
        // Keep cart in localStorage for recovery attempt
      }
    },
    [cartItems, createSale, queryClient],
  )

  const handleApplyDiscount = useCallback(
    (targetTotal: number) => {
      const currentTotal = cartItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      )

      // Validation: Prevent negative or zero target totals
      if (targetTotal <= 0) {
        toast.error('Hedef tutar 0 TRY veya daha düşük olamaz')
        return
      }

      // Validation: Prevent price increases (discount making total higher)
      if (targetTotal > currentTotal) {
        toast.error('Hedef tutar mevcut toplam tutardan yüksek olamaz')
        return
      }

      // Validation: Warn for large discounts (> 50%)
      const discountPercent = ((currentTotal - targetTotal) / currentTotal) * 100
      if (discountPercent > 50) {
        // Allow override but warn
        toast.warning(`Büyük indirim uygulanıyor: %${discountPercent.toFixed(0)}`)
      }

      const discountedItems = calculateCartDiscount(cartItems, targetTotal)
      setCartItems(discountedItems)
      toast.success('İndirim uygulandı')
    },
    [cartItems],
  )

  const handleCloseDay = useCallback(
    async (cashCounted: number, notes: string) => {
      try {
        await generateDailyReport.mutateAsync({
          input: {
            cashCounted,
            notes: notes || undefined,
          },
        })

        // Refetch sales data to reset for the new day
        // The mutation will have saved the report and the next queries will start fresh
        toast.success('Gün sonu raporu başarıyla oluşturuldu!')
      } catch (error) {
        console.error('Error generating daily report:', error)
        toast.error('Gün sonu raporu oluşturulurken bir hata oluştu')
        throw error // Re-throw so the modal knows it failed
      }
    },
    [generateDailyReport],
  )

  // Check if any modal is open to disable keyboard navigation
  const isAnyModalOpen =
    checkoutOpen ||
    editingItem !== null ||
    discountModalOpen ||
    closeDayModalOpen

  // Calculate today's cash and card sales totals for Z-Report
  const todaysCashSales = (cashSalesData?.salesHistory || []).reduce(
    (sum, sale) => sum + toNumber(sale.totalAmount),
    0,
  )
  const todaysCardSales = (cardSalesData?.salesHistory || []).reduce(
    (sum, sale) => sum + toNumber(sale.totalAmount),
    0,
  )

  // Calculate total refunds (all refunds are cash - negative amounts in DB)
  const todaysRefunds = (refundsData?.salesHistory || []).reduce(
    (sum, refund) => sum + Math.abs(toNumber(refund.totalAmount)),
    0,
  )

  // Expected cash in drawer = cash sales - refunds
  const expectedCashInDrawer = todaysCashSales - todaysRefunds

  // Keyboard navigation hook for ping-pong focus
  const { focusSearch } = usePosKeyboard({
    searchInputRef,
    latestCartItemRef,
    onTabFromSearch: () => {
      // Tab from search will be handled by the hook itself
    },
    enabled: !isAnyModalOpen,
  })

  return (
    <div className="flex flex-1 bg-background">
      {/* Left Panel - Product Search (70%) */}
      <ProductSearchList
        search={search}
        onSearchChange={setSearch}
        products={products}
        isLoading={isLoading}
        debouncedSearch={debouncedSearch}
        onProductSelect={handleSelectProduct}
        cartItems={cartItems}
        disableKeyboardNavigation={isAnyModalOpen}
        searchInputRef={searchInputRef}
      />

      {/* Right Panel - Ticket/Cart (30%) */}
      <div className="flex-[3] flex flex-col bg-muted/30 border-l h-[calc(100vh-64px)] overflow-hidden">
        {/* Cart Header - Fixed Height */}
        <div className="shrink-0 p-6 border-b bg-background flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {cartItems.length > 0 ? `${totalItems} Ürün` : 'Fiş'}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCloseDayModalOpen(true)}
              className="text-muted-foreground hover:text-primary"
            >
              <Moon className="h-4 w-4 mr-1" />
              Gün Sonu
            </Button>
            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Cart Items - SCROLLABLE AREA (Takes up remaining space) */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="space-y-3 opacity-40">
              {/* Ghost Item 1 */}
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-3">
                <div className="h-5 bg-muted-foreground/10 rounded w-3/4 mb-2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted-foreground/10 rounded w-20"></div>
                  <div className="h-4 bg-muted-foreground/10 rounded w-16"></div>
                </div>
              </div>
              {/* Ghost Item 2 */}
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-3">
                <div className="h-5 bg-muted-foreground/10 rounded w-2/3 mb-2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted-foreground/10 rounded w-20"></div>
                  <div className="h-4 bg-muted-foreground/10 rounded w-16"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, index) => {
                const isLatestItem = index === cartItems.length - 1 // Most recent item is last
                const stockLevel = item.product.totalStock ?? 0
                const stockBadge = getStockBadgeStyle(stockLevel)

                return (
                  <div
                    key={item.product.id}
                    className="bg-background border rounded-lg p-3 relative group cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setEditingItem(item)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveItem(item.product.id)
                      }}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{item.product.name}</div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${stockBadge.bg} ${stockBadge.text} ${stockBadge.border}`}
                      >
                        {stockBadge.label}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUpdateQuantity(
                              item.product.id,
                              item.quantity - 1,
                            )
                          }}
                          className="h-6 w-6 rounded border bg-background hover:bg-accent flex items-center justify-center text-lg font-semibold"
                        >
                          -
                        </button>
                        <Input
                          ref={isLatestItem ? latestCartItemRef : null}
                          type="number"
                          value={item.quantity}
                          data-cart-quantity-input="true"
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value) || 0
                            handleUpdateQuantity(item.product.id, newQty)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              focusSearch()
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className="w-16 h-6 text-center font-semibold p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                            )
                          }}
                          className="h-6 w-6 rounded border bg-background hover:bg-accent flex items-center justify-center text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-bold">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Cart Footer - STICKY TO BOTTOM */}
        <div className="shrink-0 border-t bg-background p-6 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {/* Subtotal */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Ara Toplam</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-2xl font-bold border-t pt-4">
            <span>Toplam</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>

          {/* Discount/Round Button */}
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-base"
              onClick={() => setDiscountModalOpen(true)}
            >
              İndirim / Yuvarla
            </Button>
          )}

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full h-14 text-lg shadow-lg hover:shadow-xl transition-all"
            onClick={validateStockAndOpenCheckout}
            disabled={cartItems.length === 0}
          >
            {TR.checkout} (Space)
          </Button>
        </div>
      </div>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        totalAmount={totalAmount}
        onConfirm={handleCheckout}
        isLoading={createSale.isPending}
      />

      {/* Cart Item Edit Modal */}
      <CartItemEditModal
        open={editingItem !== null}
        onOpenChange={(open) => {
          if (!open) setEditingItem(null)
        }}
        item={editingItem}
        onSave={handleUpdateCartItem}
        onRemove={handleRemoveItem}
      />

      {/* Cart Discount Modal */}
      <CartDiscountModal
        open={discountModalOpen}
        onOpenChange={setDiscountModalOpen}
        currentTotal={totalAmount}
        onApply={handleApplyDiscount}
      />

      {/* Close Day Modal */}
      <CloseDayModal
        open={closeDayModalOpen}
        onOpenChange={setCloseDayModalOpen}
        expectedCashSales={todaysCashSales}
        expectedCardSales={todaysCardSales}
        totalRefunds={todaysRefunds}
        onSubmit={handleCloseDay}
      />

      {/* Stock Warning Modal */}
      <StockWarningModal
        open={stockWarningOpen}
        onOpenChange={setStockWarningOpen}
        issues={stockIssues}
        onProceed={handleStockWarningProceed}
        onCancel={handleStockWarningCancel}
      />

      {/* Restore Cart Prompt */}
      <AlertDialog open={showRestorePrompt} onOpenChange={setShowRestorePrompt}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>🔄 Sepet Geri Yükleme</AlertDialogTitle>
            <AlertDialogDescription>
              Kayıtlı bir sepet bulundu ({savedCart?.length || 0} ürün). Geri yüklemek ister misiniz?
              {savedCart && savedCart.length > 0 && (
                <div className="mt-3 p-3 bg-muted rounded-lg text-sm">
                  <strong>İçerik:</strong>
                  <ul className="mt-2 space-y-1">
                    {savedCart.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs">
                        • {item.product.name} x{item.quantity}
                      </li>
                    ))}
                    {savedCart.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        ... ve {savedCart.length - 3} ürün daha
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDismissRestore}>
              Hayır, Sil
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRestoreCart}>
              Evet, Geri Yükle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear Cart Confirmation Dialog */}
      <AlertDialog open={clearCartDialogOpen} onOpenChange={setClearCartDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sepeti Temizle</AlertDialogTitle>
            <AlertDialogDescription>
              Sepeti temizlemek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearCart}>Temizle</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
