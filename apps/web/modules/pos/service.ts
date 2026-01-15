import {
  db,
  eq,
  and,
  desc,
  asc,
  sql,
  gte,
  lte,
  gt,
  categories,
  products,
  stockLots,
  stockLogs,
  suppliers,
  sales,
  saleItems,
  dailyReports,
} from '@jetframe/db'
import type {
  NewCategory,
  Category,
  NewProduct,
  Product,
  NewStockLot,
  StockLot,
  StockInfo,
  NewStockLog,
  StockLog,
  StockLogWithProduct,
  NewSupplier,
  Supplier,
  CreateSaleInput,
  Sale,
  SaleWithItems,
  SalesSummary,
  ProductWithStock,
  AddStockBulkInput,
  DailyReport,
  NewDailyReport,
  GenerateDailyReportInput,
} from './types'

/**
 * POS Service Layer
 * Business logic for categories, products, stock, and sales
 */

// ========================================
// UTILITIES
// ========================================

/**
 * Generate receipt number in format: YYYY-NNNNNN (e.g., 2025-000042)
 * Auto-increments based on current year
 */
async function generateReceiptNumber(organizationId: string): Promise<string> {
  const currentYear = new Date().getFullYear()
  const yearPrefix = currentYear.toString()

  // Get the highest receipt number for the current year
  // Exclude receipts with -DUP suffix (duplicates that were fixed)
  const result = await db.execute(sql`
    SELECT receipt_no
    FROM sales
    WHERE organization_id = ${organizationId}
      AND receipt_no LIKE ${yearPrefix + '-%'}
      AND receipt_no NOT LIKE '%-DUP%'
    ORDER BY receipt_no DESC
    LIMIT 1
  `)

  let nextNumber = 1

  const lastSale = Array.isArray(result) && result.length > 0 ? result[0] : null

  if (lastSale?.receipt_no) {
    // Extract the number part: "2026-000042" -> "000042"
    const parts = lastSale.receipt_no.split('-')
    if (parts.length >= 2) {
      const lastNumber = parseInt(parts[1] || '0', 10)
      nextNumber = lastNumber + 1
    }
  }

  // Pad to 6 digits
  const paddedNumber = nextNumber.toString().padStart(6, '0')
  return `${yearPrefix}-${paddedNumber}`
}

// ========================================
// CATEGORIES
// ========================================

export async function createCategory(
  organizationId: string,
  data: NewCategory,
): Promise<Category> {
  const [category] = await db
    .insert(categories)
    .values({
      ...data,
      organizationId,
    })
    .returning()
  return category!
}

export async function getCategories(
  organizationId: string,
): Promise<Category[]> {
  return db.query.categories.findMany({
    where: eq(categories.organizationId, organizationId),
    orderBy: [asc(categories.name)],
  })
}

export async function updateCategory(
  id: string,
  organizationId: string,
  data: Partial<NewCategory>,
): Promise<Category> {
  const [updated] = await db
    .update(categories)
    .set(data)
    .where(
      and(eq(categories.id, id), eq(categories.organizationId, organizationId)),
    )
    .returning()

  if (!updated) {
    throw new Error('Category not found')
  }

  return updated
}

export async function deleteCategory(
  id: string,
  organizationId: string,
): Promise<boolean> {
  const result = await db
    .delete(categories)
    .where(
      and(eq(categories.id, id), eq(categories.organizationId, organizationId)),
    )
  return true
}

// ========================================
// PRODUCTS
// ========================================

export async function createProduct(
  organizationId: string,
  data: NewProduct,
): Promise<Product> {
  const [product] = await db
    .insert(products)
    .values({
      ...data,
      organizationId,
      updatedAt: new Date(),
    })
    .returning()
  return product!
}

export async function getProducts(
  organizationId: string,
  options?: {
    categoryId?: string
    search?: string
    isActive?: boolean
  },
): Promise<Product[]> {
  const conditions = [eq(products.organizationId, organizationId)]

  if (options?.categoryId) {
    conditions.push(eq(products.categoryId, options.categoryId))
  }

  if (options?.isActive !== undefined) {
    conditions.push(eq(products.isActive, options.isActive))
  }

  // If no search query, return all products matching filters
  if (!options?.search) {
    return db.query.products.findMany({
      where: and(...conditions),
      orderBy: [asc(products.name)],
      with: {
        category: true,
      },
    })
  }

  // Turkish-aware fuzzy search with multi-strategy relevance scoring
  const { normalizeTurkish } = await import('@jetframe/db')
  const normalizedSearch = normalizeTurkish(options.search)

  // Multi-strategy search with relevance scoring:
  // 1. Exact match on search_name (score: 100)
  // 2. Starts with search_name (score: 80)
  // 3. Contains in search_name (score: 60)
  // 4. Exact match on barcode (score: 90)
  // 5. Trigram similarity on search_name (score: similarity * 50)
  // 6. Trigram similarity on barcode (score: similarity * 45)

  const results = await db.execute(sql`
    WITH search_results AS (
      SELECT
        p.*,
        CASE
          -- Exact match on normalized name (highest priority)
          WHEN p.search_name = ${normalizedSearch}::text THEN 100
          -- Starts with (prefix match)
          WHEN p.search_name LIKE ${normalizedSearch + '%'}::text THEN 80
          -- Contains (substring match)
          WHEN p.search_name LIKE ${'%' + normalizedSearch + '%'}::text THEN 60
          -- Exact barcode match
          WHEN p.barcode = ${options.search}::text THEN 90
          -- Trigram similarity on search_name (fuzzy matching)
          WHEN similarity(p.search_name::text, ${normalizedSearch}::text) > 0.1
            THEN similarity(p.search_name::text, ${normalizedSearch}::text) * 50
          -- Trigram similarity on barcode
          WHEN p.barcode IS NOT NULL AND similarity(p.barcode::text, ${options.search}::text) > 0.1
            THEN similarity(p.barcode::text, ${options.search}::text) * 45
          ELSE 0
        END as relevance
      FROM products p
      WHERE
        p.organization_id = ${organizationId}::uuid
        ${options.categoryId ? sql`AND p.category_id = ${options.categoryId}::uuid` : sql``}
        ${options.isActive !== undefined ? sql`AND p.is_active = ${options.isActive}::boolean` : sql``}
        AND (
          -- Exact or prefix/substring matches
          p.search_name = ${normalizedSearch}::text
          OR p.search_name LIKE ${normalizedSearch + '%'}::text
          OR p.search_name LIKE ${'%' + normalizedSearch + '%'}::text
          OR p.barcode = ${options.search}::text
          -- Trigram similarity matches (threshold: 0.1 = very lenient for typos)
          OR similarity(p.search_name::text, ${normalizedSearch}::text) > 0.1
          OR (p.barcode IS NOT NULL AND similarity(p.barcode::text, ${options.search}::text) > 0.1)
        )
    )
    SELECT * FROM search_results
    WHERE relevance > 0
    ORDER BY relevance DESC, search_results.name ASC
  `)

  // Fetch categories for each product
  // Note: db.execute returns snake_case column names from database
  const rows = Array.isArray(results) ? results : results.rows || []
  const productsWithCategories = await Promise.all(
    rows.map(async (product: any) => {
      const categoryId = product.category_id
      if (!categoryId) {
        return {
          ...product,
          // Map snake_case to camelCase for TypeScript
          organizationId: product.organization_id,
          categoryId: product.category_id,
          searchName: product.search_name,
          sellingPrice: product.selling_price,
          isActive: product.is_active,
          createdAt: new Date(product.created_at),
          updatedAt: new Date(product.updated_at),
          category: null,
        }
      }
      const category = await db.query.categories.findFirst({
        where: eq(categories.id, categoryId),
      })
      return {
        ...product,
        // Map snake_case to camelCase for TypeScript
        organizationId: product.organization_id,
        categoryId: product.category_id,
        searchName: product.search_name,
        sellingPrice: product.selling_price,
        isActive: product.is_active,
        createdAt: new Date(product.created_at),
        updatedAt: new Date(product.updated_at),
        category,
      }
    }),
  )

  return productsWithCategories as Product[]
}

export async function getProduct(
  id: string,
  organizationId: string,
): Promise<Product | undefined> {
  return db.query.products.findFirst({
    where: and(
      eq(products.id, id),
      eq(products.organizationId, organizationId),
    ),
    with: {
      category: true,
    },
  })
}

export async function getProductsWithStock(
  organizationId: string,
  options?: {
    categoryId?: string
    search?: string
    lowStockOnly?: boolean
    threshold?: number
  },
): Promise<ProductWithStock[]> {
  const productsList = await getProducts(organizationId, {
    categoryId: options?.categoryId,
    search: options?.search,
    isActive: true,
  })

  const productsWithStock = await Promise.all(
    productsList.map(async (product) => {
      const stockInfo = await getProductStock(product.id, organizationId)
      return {
        ...product,
        totalStock: stockInfo.totalStock,
        averageCost: stockInfo.averageCost,
      }
    }),
  )

  // Filter by low stock if requested
  if (options?.lowStockOnly) {
    const threshold = options.threshold || 10
    return productsWithStock.filter((p) => p.totalStock <= threshold)
  }

  return productsWithStock
}

export async function updateProduct(
  id: string,
  organizationId: string,
  data: Partial<NewProduct>,
): Promise<Product> {
  const [updated] = await db
    .update(products)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(eq(products.id, id), eq(products.organizationId, organizationId)),
    )
    .returning()

  if (!updated) {
    throw new Error('Product not found')
  }

  return updated
}

export async function deleteProduct(
  id: string,
  organizationId: string,
): Promise<boolean> {
  await db
    .delete(products)
    .where(
      and(eq(products.id, id), eq(products.organizationId, organizationId)),
    )
  return true
}

// ========================================
// STOCK MANAGEMENT
// ========================================

/**
 * Get total stock for a product (sum of all remaining quantities)
 */
export async function getProductStock(
  productId: string,
  organizationId: string,
): Promise<StockInfo> {
  const rawLots = await db.query.stockLots.findMany({
    where: and(
      eq(stockLots.productId, productId),
      eq(stockLots.organizationId, organizationId),
    ),
    orderBy: [asc(stockLots.purchasedAt)],
    with: {
      supplier: true,
    },
  })

  // Map lots to include supplier name from relation
  const lots = rawLots.map((lot) => {
    // When using 'with: { supplier: true }', the supplier property becomes the relation object
    // We need to preserve the original structure and add supplier name if available
    const supplierName = lot.supplier?.name || lot.supplier || null
    return {
      ...lot,
      supplier: supplierName as string | null,
    }
  })

  let totalStock = 0
  let weightedCost = 0
  let totalQuantity = 0

  for (const lot of lots) {
    totalStock += lot.remaining

    // Only include positive remaining quantities in cost calculation
    if (lot.remaining > 0) {
      const cost = parseFloat(lot.costPrice)
      weightedCost += cost * lot.remaining
      totalQuantity += lot.remaining
    }
  }

  const averageCost = totalQuantity > 0 ? weightedCost / totalQuantity : 0

  return {
    productId,
    totalStock,
    averageCost,
    lots,
  }
}

/**
 * Add new stock lot
 */
export async function addStockLot(
  organizationId: string,
  data: NewStockLot,
): Promise<StockLot> {
  const [lot] = await db
    .insert(stockLots)
    .values({
      ...data,
      organizationId,
      remaining: data.quantity, // Initially, remaining = quantity
    })
    .returning()
  return lot!
}

/**
 * Add multiple stock lots in a single transaction (Bulk Invoice Entry)
 * Creates stock lots and corresponding stock logs atomically
 */
export async function addStockBulk(
  organizationId: string,
  data: AddStockBulkInput,
): Promise<StockLot[]> {
  return await db.transaction(async (tx) => {
    const createdLots: StockLot[] = []

    for (const item of data.items) {
      // 1. Create stock lot
      const [lot] = await tx
        .insert(stockLots)
        .values({
          ...item,
          organizationId,
          remaining: item.quantity,
        })
        .returning()

      createdLots.push(lot!)

      // 2. Create stock log entry
      await tx.insert(stockLogs).values({
        organizationId,
        productId: item.productId,
        lotId: lot!.id,
        type: 'PURCHASE',
        quantity: item.quantity,
        referenceType: 'purchase',
        referenceId: lot!.id,
        notes: data.invoiceRef ? `Invoice: ${data.invoiceRef}` : item.notes,
      })
    }

    return createdLots
  })
}

/**
 * Create a stock log entry
 * Helper function for audit trail
 */
export async function createStockLog(
  organizationId: string,
  data: NewStockLog,
): Promise<StockLog> {
  const [log] = await db
    .insert(stockLogs)
    .values({
      ...data,
      organizationId,
    })
    .returning()
  return log!
}

/**
 * Get stock logs for a product (with optional filters)
 */
export async function getStockLogs(
  organizationId: string,
  filters?: {
    productId?: string
    type?: string
    startDate?: Date
    endDate?: Date
    limit?: number
  },
): Promise<StockLogWithProduct[]> {
  const conditions = [eq(stockLogs.organizationId, organizationId)]

  if (filters?.productId) {
    conditions.push(eq(stockLogs.productId, filters.productId))
  }

  if (filters?.type) {
    conditions.push(eq(stockLogs.type, filters.type))
  }

  if (filters?.startDate) {
    conditions.push(gte(stockLogs.createdAt, filters.startDate))
  }

  if (filters?.endDate) {
    conditions.push(lte(stockLogs.createdAt, filters.endDate))
  }

  const logs = await db.query.stockLogs.findMany({
    where: and(...conditions),
    orderBy: [desc(stockLogs.createdAt)],
    limit: filters?.limit || 100,
    with: {
      product: true,
    },
  })

  return logs as StockLogWithProduct[]
}

/**
 * Get stock lots for a product
 */
export async function getStockLots(
  productId: string,
  organizationId: string,
): Promise<StockLot[]> {
  const rawLots = await db.query.stockLots.findMany({
    where: and(
      eq(stockLots.productId, productId),
      eq(stockLots.organizationId, organizationId),
    ),
    orderBy: [asc(stockLots.purchasedAt)],
    with: {
      supplier: true,
    },
  })

  // Map lots to include supplier name from relation
  return rawLots.map((lot) => {
    const supplierName = lot.supplier?.name || lot.supplier || null
    return {
      ...lot,
      supplier: supplierName as string | null,
    }
  })
}

/**
 * FIFO Stock Deduction Algorithm
 * Deducts stock from oldest lots first
 * ALLOWS negative stock (no error thrown)
 * Returns total cost for profit calculation + lot deductions for audit trail
 */
export async function deductStock(
  productId: string,
  organizationId: string,
  quantity: number,
  tx: any = db, // Accept transaction context or use default db
): Promise<{
  totalCost: number
  lotDeductions: Array<{ lotId: string; quantity: number }>
}> {
  const lots = await tx.query.stockLots.findMany({
    where: and(
      eq(stockLots.productId, productId),
      eq(stockLots.organizationId, organizationId),
    ),
    orderBy: [asc(stockLots.purchasedAt)],
  })

  if (lots.length === 0) {
    // No stock lots exist - create a placeholder lot with 0 cost
    return { totalCost: 0, lotDeductions: [] }
  }

  let remaining = quantity
  let totalCost = 0
  const lotDeductions: Array<{ lotId: string; quantity: number }> = []

  // Deduct from oldest lots first (FIFO)
  for (const lot of lots) {
    if (remaining <= 0) break

    const deduct = Math.min(lot.remaining, remaining)
    const cost = parseFloat(lot.costPrice)
    totalCost += deduct * cost

    // Track lot deduction for audit trail
    lotDeductions.push({ lotId: lot.id, quantity: deduct })

    // Update lot remaining
    await tx
      .update(stockLots)
      .set({ remaining: lot.remaining - deduct })
      .where(eq(stockLots.id, lot.id))

    remaining -= deduct
  }

  // If still remaining, deduct from last lot (goes negative)
  if (remaining > 0 && lots.length > 0) {
    const lastLot = lots[lots.length - 1]!
    const cost = parseFloat(lastLot.costPrice)
    totalCost += remaining * cost

    // Track negative deduction
    lotDeductions.push({ lotId: lastLot.id, quantity: remaining })

    await tx
      .update(stockLots)
      .set({ remaining: lastLot.remaining - remaining })
      .where(eq(stockLots.id, lastLot.id))
  }

  return { totalCost, lotDeductions }
}

// ========================================
// SUPPLIERS
// ========================================

export async function createSupplier(
  organizationId: string,
  data: NewSupplier,
): Promise<Supplier> {
  const [supplier] = await db
    .insert(suppliers)
    .values({
      ...data,
      organizationId,
    })
    .returning()
  return supplier!
}

export async function getSuppliers(
  organizationId: string,
): Promise<Supplier[]> {
  return db.query.suppliers.findMany({
    where: eq(suppliers.organizationId, organizationId),
    orderBy: [asc(suppliers.name)],
  })
}

export async function getSupplier(
  id: string,
  organizationId: string,
): Promise<Supplier | null> {
  const supplier = await db.query.suppliers.findFirst({
    where: and(
      eq(suppliers.id, id),
      eq(suppliers.organizationId, organizationId),
    ),
  })
  return supplier || null
}

export async function updateSupplier(
  id: string,
  organizationId: string,
  data: Partial<NewSupplier>,
): Promise<Supplier> {
  const [updated] = await db
    .update(suppliers)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(eq(suppliers.id, id), eq(suppliers.organizationId, organizationId)),
    )
    .returning()
  return updated!
}

export async function deleteSupplier(
  id: string,
  organizationId: string,
): Promise<boolean> {
  const result = await db
    .delete(suppliers)
    .where(
      and(eq(suppliers.id, id), eq(suppliers.organizationId, organizationId)),
    )
  return true
}

// ========================================
// SALES
// ========================================

/**
 * Create a new sale
 * 1. Calculate totals
 * 2. Deduct stock (FIFO)
 * 3. Create sale + sale_items records
 * 4. Generate receipt number
 *
 * WRAPPED IN DATABASE TRANSACTION for atomicity:
 * - Receipt number generation
 * - Stock deduction (FIFO)
 * - Sale and sale items creation
 * - Stock log creation
 * All succeed or all fail together (prevents partial sales/stock inconsistencies)
 */
export async function createSale(
  organizationId: string,
  data: CreateSaleInput,
): Promise<SaleWithItems> {
  return await db.transaction(async (tx) => {
    // Generate receipt number (WITHIN TRANSACTION)
    const receiptNo = await generateReceiptNumber(organizationId)

    // Calculate totals and costs
    let totalAmount = 0
    let totalCost = 0

    const itemsWithCost = await Promise.all(
      data.items.map(async (item) => {
        const subtotal = item.quantity * item.unitPrice
        totalAmount += subtotal

        // Deduct stock and get cost (FIFO) + lot deductions for audit (WITHIN TRANSACTION)
        const { totalCost: itemCost, lotDeductions } = await deductStock(
          item.productId,
          organizationId,
          item.quantity,
          tx, // Pass transaction context
        )
        totalCost += itemCost

        const unitCost = item.quantity > 0 ? itemCost / item.quantity : 0

        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice.toString(),
          unitCost: unitCost.toString(),
          subtotal: subtotal.toString(),
          lotDeductions, // Store for stock log creation
        }
      }),
    )

    // Create sale record (WITHIN TRANSACTION)
    const [sale] = await tx
      .insert(sales)
      .values({
        organizationId,
        receiptNo,
        totalAmount: totalAmount.toString(),
        totalCost: totalCost.toString(),
        paymentMethod: data.paymentMethod,
        type: 'SALE', // Explicitly set type to SALE
        notes: data.notes,
      })
      .returning()

    // Create sale items (WITHIN TRANSACTION)
    const createdItems = await tx
      .insert(saleItems)
      .values(
        itemsWithCost.map((item) => ({
          saleId: sale!.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          unitCost: item.unitCost,
          subtotal: item.subtotal,
        })),
      )
      .returning()

    // Create stock logs for audit trail (SALE type) (WITHIN TRANSACTION)
    await Promise.all(
      itemsWithCost.flatMap((item) =>
        item.lotDeductions.map((deduction) =>
          tx.insert(stockLogs).values({
            organizationId,
            productId: item.productId,
            lotId: deduction.lotId,
            type: 'SALE',
            quantity: -deduction.quantity, // Negative for stock deduction
            referenceType: 'sale',
            referenceId: sale!.id,
            notes: `Sale ${receiptNo}`,
          }),
        ),
      ),
    )

    // Fetch products for each item (WITHIN TRANSACTION)
    const itemsWithProducts = await Promise.all(
      createdItems.map(async (item) => {
        const product = await tx.query.products.findFirst({
          where: eq(products.id, item.productId),
        })
        return {
          ...item,
          product: product!,
        }
      }),
    )

    return {
      ...sale!,
      items: itemsWithProducts,
    }
  })
}

/**
 * Get sales for date range
 */
export async function getSales(
  organizationId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<Sale[]> {
  const conditions = [eq(sales.organizationId, organizationId)]

  if (startDate) {
    conditions.push(gte(sales.createdAt, startDate))
  }

  if (endDate) {
    conditions.push(lte(sales.createdAt, endDate))
  }

  return db.query.sales.findMany({
    where: and(...conditions),
    orderBy: [desc(sales.createdAt)],
  })
}

/**
 * Get sale by ID with items
 */
export async function getSale(
  id: string,
  organizationId: string,
): Promise<SaleWithItems | undefined> {
  const sale = await db.query.sales.findFirst({
    where: and(eq(sales.id, id), eq(sales.organizationId, organizationId)),
  })

  if (!sale) {
    return undefined
  }

  const items = await db.query.saleItems.findMany({
    where: eq(saleItems.saleId, id),
  })

  const itemsWithProducts = await Promise.all(
    items.map(async (item) => {
      const product = await db.query.products.findFirst({
        where: eq(products.id, item.productId),
      })
      return {
        ...item,
        product: product!,
      }
    }),
  )

  return {
    ...sale,
    items: itemsWithProducts,
  }
}

/**
 * Get sales summary (total revenue, profit, count)
 */
export async function getSalesSummary(
  organizationId: string,
  startDate: Date,
  endDate: Date,
): Promise<SalesSummary> {
  const salesList = await getSales(organizationId, startDate, endDate)

  let totalRevenue = 0
  let totalCost = 0

  for (const sale of salesList) {
    totalRevenue += parseFloat(sale.totalAmount)
    totalCost += parseFloat(sale.totalCost)
  }

  const totalProfit = totalRevenue - totalCost

  return {
    totalRevenue,
    totalCost,
    totalProfit,
    salesCount: salesList.length,
    startDate,
    endDate,
  }
}

/**
 * Get sales history with filters (for sales list page)
 * Supports filtering by date range and payment method
 */
export async function getSalesHistory(
  organizationId: string,
  filters?: {
    startDate?: Date
    endDate?: Date
    paymentMethod?: string
    type?: string // 'SALE' or 'REFUND'
    limit?: number
  },
): Promise<SaleWithItems[]> {
  const conditions = [eq(sales.organizationId, organizationId)]

  if (filters?.startDate) {
    conditions.push(gte(sales.createdAt, filters.startDate))
  }

  if (filters?.endDate) {
    conditions.push(lte(sales.createdAt, filters.endDate))
  }

  if (filters?.paymentMethod) {
    conditions.push(eq(sales.paymentMethod, filters.paymentMethod as any))
  }

  if (filters?.type) {
    conditions.push(eq(sales.type, filters.type as any))
  }

  const salesList = await db.query.sales.findMany({
    where: and(...conditions),
    orderBy: [desc(sales.createdAt)],
    limit: filters?.limit || 100,
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
  })

  return salesList as SaleWithItems[]
}

/**
 * Process a sale item refund (Immutable Ledger Principle)
 * Creates a NEW negative transaction instead of modifying history
 * Restores stock to exact FIFO lots using stock_logs audit trail
 */
export async function processSaleRefund(
  organizationId: string,
  saleItemId: string,
): Promise<Sale> {
  return await db.transaction(async (tx) => {
    // 1. Get the original sale item
    const originalItem = await tx.query.saleItems.findFirst({
      where: eq(saleItems.id, saleItemId),
      with: {
        sale: true,
        product: true,
      },
    })

    if (!originalItem) {
      throw new Error('Sale item not found')
    }

    // 2. Check if this item has already been refunded
    const existingRefund = await tx.query.sales.findFirst({
      where: and(
        eq(sales.organizationId, organizationId),
        eq(sales.type, 'REFUND'),
        eq(sales.originalSaleId, originalItem.saleId),
      ),
      with: {
        items: {
          where: eq(saleItems.productId, originalItem.productId),
        },
      },
    })

    if (existingRefund && existingRefund.items.length > 0) {
      throw new Error('This item has already been refunded')
    }

    // 3. Get stock logs for this sale to find the exact lots that were deducted
    const relatedLogs = await tx.query.stockLogs.findMany({
      where: and(
        eq(stockLogs.organizationId, organizationId),
        eq(stockLogs.productId, originalItem.productId),
        eq(stockLogs.referenceType, 'sale'),
        eq(stockLogs.referenceId, originalItem.saleId),
        eq(stockLogs.type, 'SALE'),
      ),
      orderBy: [stockLogs.createdAt],
    })

    // 4. Generate refund receipt number
    const refundReceiptNo = `${originalItem.sale.receiptNo}-R`

    // 5. Create NEW negative sale (TODAY's date, type='REFUND')
    const [refundSale] = await tx
      .insert(sales)
      .values({
        organizationId,
        type: 'REFUND',
        originalSaleId: originalItem.saleId,
        receiptNo: refundReceiptNo,
        totalAmount: (-parseFloat(originalItem.subtotal)).toString(),
        totalCost: (
          -parseFloat(originalItem.unitCost) * originalItem.quantity
        ).toString(),
        paymentMethod: originalItem.sale.paymentMethod,
        notes: `Refund for ${originalItem.sale.receiptNo}`,
        createdAt: new Date(), // TODAY - not the original sale date!
      })
      .returning()

    // 6. Create negative sale item
    await tx.insert(saleItems).values({
      saleId: refundSale!.id,
      productId: originalItem.productId,
      quantity: -originalItem.quantity, // Negative quantity
      unitPrice: originalItem.unitPrice,
      unitCost: originalItem.unitCost,
      subtotal: (-parseFloat(originalItem.subtotal)).toString(),
    })

    // 7. FIFO Reversal: Restore stock to the exact lots
    for (const log of relatedLogs) {
      if (!log.lotId) continue

      // Restore the lot quantity (add back the deducted amount)
      const quantityToRestore = Math.abs(log.quantity)

      await tx
        .update(stockLots)
        .set({
          remaining: sql`${stockLots.remaining} + ${quantityToRestore}`,
        })
        .where(eq(stockLots.id, log.lotId))

      // 8. Create stock log entry (type='REFUND', positive quantity)
      await tx.insert(stockLogs).values({
        organizationId,
        productId: originalItem.productId,
        lotId: log.lotId,
        type: 'REFUND',
        quantity: quantityToRestore, // Positive for stock restoration
        referenceType: 'sale',
        referenceId: refundSale!.id,
        notes: `Refund for ${originalItem.sale.receiptNo}`,
      })
    }

    return refundSale!
  })
}

// ========================================
// DAILY REPORTS (Z-REPORT)
// ========================================

/**
 * Generate a daily report (Z-Report) with timestamp-based closing
 * Implements "Renault Factory Fix #2" - Timestamp windows, not date-based
 * INCLUDES all transaction types (SALE + REFUND) for cash drawer accuracy
 */
export async function generateDailyReport(
  organizationId: string,
  input: GenerateDailyReportInput,
): Promise<DailyReport> {
  // 1. Get last report's end time (or start of today if no reports)
  const lastReport = await db.query.dailyReports.findFirst({
    where: eq(dailyReports.organizationId, organizationId),
    orderBy: [desc(dailyReports.reportEndTime)],
  })

  const startTime = lastReport?.reportEndTime ?? getStartOfDay(new Date())
  const endTime = new Date() // NOW - this is when closing happens

  // 2. Query ALL sales/refunds in this TIME WINDOW (not date!)
  // CRITICAL: Do NOT filter by type - include both SALE and REFUND
  const salesInPeriod = await db.query.sales.findMany({
    where: and(
      eq(sales.organizationId, organizationId),
      gt(sales.createdAt, startTime), // After last close
      lte(sales.createdAt, endTime), // Until now
    ),
  })

  // 3. Calculate totals by type
  let totalSalesAmount = 0
  let totalRefundsAmount = 0
  let totalCostAmount = 0
  let cashSalesAmount = 0
  let cardSalesAmount = 0

  for (const sale of salesInPeriod) {
    const amount = parseFloat(sale.totalAmount)
    const cost = parseFloat(sale.totalCost)

    if (sale.type === 'SALE') {
      totalSalesAmount += amount
      totalCostAmount += cost

      // Cash/Card breakdown for SALES
      if (sale.paymentMethod === 'cash') {
        cashSalesAmount += amount
      } else {
        cardSalesAmount += amount
      }
    } else if (sale.type === 'REFUND') {
      // Refunds are negative in DB, store absolute value
      totalRefundsAmount += Math.abs(amount)

      // Subtract refunds from cash/card totals (they reduce the drawer)
      if (sale.paymentMethod === 'cash') {
        cashSalesAmount += amount // amount is negative, so this reduces cash
      } else {
        cardSalesAmount += amount
      }
    }
  }

  // 4. Calculate gross profit: Sales - Refunds - Cost
  const grossProfit = totalSalesAmount - totalRefundsAmount - totalCostAmount

  // 5. Calculate cash variance if counted
  const cashCounted = input.cashCounted ?? null
  const cashVariance =
    cashCounted !== null ? cashCounted - cashSalesAmount : null

  // 6. Create the daily report
  const [report] = await db
    .insert(dailyReports)
    .values({
      organizationId,
      reportDate: new Date(), // The date we're reporting on
      reportStartTime: startTime, // Last close time (or start of day)
      reportEndTime: endTime, // NOW - this close time
      totalSales: totalSalesAmount.toFixed(2),
      totalRefunds: totalRefundsAmount.toFixed(2),
      totalCost: totalCostAmount.toFixed(2),
      grossProfit: grossProfit.toFixed(2),
      cashSales: cashSalesAmount.toFixed(2),
      cardSales: cardSalesAmount.toFixed(2),
      cashCounted: cashCounted !== null ? cashCounted.toFixed(2) : null,
      cashVariance: cashVariance !== null ? cashVariance.toFixed(2) : null,
      notes: input.notes || null,
    })
    .returning()

  return report!
}

/**
 * Get daily reports with optional filters
 */
export async function getDailyReports(
  organizationId: string,
  filters?: {
    startDate?: Date
    endDate?: Date
    limit?: number
  },
): Promise<DailyReport[]> {
  const conditions = [eq(dailyReports.organizationId, organizationId)]

  if (filters?.startDate) {
    conditions.push(gte(dailyReports.reportDate, filters.startDate))
  }

  if (filters?.endDate) {
    conditions.push(lte(dailyReports.reportDate, filters.endDate))
  }

  const reports = await db.query.dailyReports.findMany({
    where: and(...conditions),
    orderBy: [desc(dailyReports.reportEndTime)],
    limit: filters?.limit || 50,
  })

  return reports
}

/**
 * Helper function to get start of day (00:00:00)
 */
function getStartOfDay(date: Date): Date {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  return start
}

// ========================================
// DASHBOARD ANALYTICS
// ========================================

/**
 * Get today's pulse - Real-time sales, cost, and profit for today
 * Shows GROSS sales (refunds tracked separately, not subtracted)
 */
export async function getTodaysPulse(organizationId: string): Promise<{
  totalSales: number
  totalCost: number
  grossProfit: number
  transactionCount: number
  totalRefunds: number
}> {
  const startOfToday = getStartOfDay(new Date())
  const now = new Date()

  // Get ALL transactions (both SALE and REFUND)
  const todaysTransactions = await db.query.sales.findMany({
    where: and(
      eq(sales.organizationId, organizationId),
      gte(sales.createdAt, startOfToday),
      lte(sales.createdAt, now),
    ),
  })

  let totalSales = 0
  let totalCost = 0
  let totalRefunds = 0
  let saleCount = 0

  for (const transaction of todaysTransactions) {
    const amount = parseFloat(transaction.totalAmount)
    const cost = parseFloat(transaction.totalCost)

    if (transaction.type === 'SALE') {
      totalSales += amount
      totalCost += cost
      saleCount++
    } else if (transaction.type === 'REFUND') {
      // Refunds have negative amounts in DB, store absolute value
      totalRefunds += Math.abs(amount)
    }
  }

  const grossProfit = totalSales - totalCost

  return {
    totalSales,
    totalCost,
    grossProfit,
    transactionCount: saleCount,
    totalRefunds,
  }
}

/**
 * Get sales trend for last N days
 * Returns daily totals grouped by date
 */
export async function getSalesTrend(
  organizationId: string,
  days: number = 7,
): Promise<
  Array<{
    date: string
    sales: number
    cost: number
    profit: number
  }>
> {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const salesInPeriod = await db.query.sales.findMany({
    where: and(
      eq(sales.organizationId, organizationId),
      gte(sales.createdAt, startDate),
      lte(sales.createdAt, endDate),
      eq(sales.type, 'SALE'),
    ),
    orderBy: [sales.createdAt],
  })

  // Group by date
  const dailyMap = new Map<string, { sales: number; cost: number }>()

  for (const sale of salesInPeriod) {
    const dateKey = sale.createdAt.toISOString().split('T')[0] // YYYY-MM-DD
    const existing = dailyMap.get(dateKey) || { sales: 0, cost: 0 }
    existing.sales += parseFloat(sale.totalAmount)
    existing.cost += parseFloat(sale.totalCost)
    dailyMap.set(dateKey, existing)
  }

  // Convert to array and calculate profit
  const trend = Array.from(dailyMap.entries()).map(([date, data]) => ({
    date,
    sales: data.sales,
    cost: data.cost,
    profit: data.sales - data.cost,
  }))

  return trend
}

/**
 * Get top N products by quantity sold
 * Aggregates sale_items to find best sellers
 */
export async function getTopProducts(
  organizationId: string,
  limit: number = 5,
  startDate?: Date,
  endDate?: Date,
): Promise<
  Array<{
    productId: string
    productName: string
    quantitySold: number
    revenue: number
  }>
> {
  const conditions = [
    eq(sales.organizationId, organizationId),
    eq(sales.type, 'SALE'),
  ]

  if (startDate) {
    conditions.push(gte(sales.createdAt, startDate))
  }

  if (endDate) {
    conditions.push(lte(sales.createdAt, endDate))
  }

  // Get all sales in period with items
  const salesWithItems = await db.query.sales.findMany({
    where: and(...conditions),
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
  })

  // Aggregate by product
  const productMap = new Map<
    string,
    { name: string; quantity: number; revenue: number }
  >()

  for (const sale of salesWithItems) {
    for (const item of sale.items) {
      const existing = productMap.get(item.productId) || {
        name: item.product.name,
        quantity: 0,
        revenue: 0,
      }
      existing.quantity += item.quantity
      existing.revenue += parseFloat(item.subtotal)
      productMap.set(item.productId, existing)
    }
  }

  // Convert to array and sort by quantity
  const topProducts = Array.from(productMap.entries())
    .map(([productId, data]) => ({
      productId,
      productName: data.name,
      quantitySold: data.quantity,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, limit)

  return topProducts
}

/**
 * Get low stock products (items below critical threshold)
 */
export async function getLowStockProducts(
  organizationId: string,
  threshold: number = 10,
): Promise<
  Array<{
    productId: string
    productName: string
    currentStock: number
    barcode: string | null
  }>
> {
  const productsWithStock = await getProductsWithStock(organizationId)

  const lowStockItems = productsWithStock
    .filter((p) => p.totalStock < threshold)
    .map((p) => ({
      productId: p.id,
      productName: p.name,
      currentStock: p.totalStock,
      barcode: p.barcode,
    }))
    .sort((a, b) => a.currentStock - b.currentStock)

  return lowStockItems
}

// ========================================
// PRODUCT ANALYTICS
// ========================================

/**
 * Get sales history for a specific product
 */
export async function getProductSalesHistory(
  productId: string,
  organizationId: string,
  options?: {
    startDate?: Date
    endDate?: Date
    limit?: number
  },
): Promise<
  Array<{
    saleId: string
    receiptNo: string
    quantity: number
    unitPrice: string
    unitCost: string
    subtotal: string
    paymentMethod: string
    saleType: string
    createdAt: Date
  }>
> {
  const conditions = [
    eq(saleItems.productId, productId),
  ]

  // Build where conditions
  const saleIdSubquery = db
    .select({ id: sales.id })
    .from(sales)
    .where(eq(sales.organizationId, organizationId))

  if (options?.startDate) {
    conditions.push(gte(saleItems.createdAt, options.startDate))
  }

  if (options?.endDate) {
    conditions.push(lte(saleItems.createdAt, options.endDate))
  }

  const items = await db.query.saleItems.findMany({
    where: and(...conditions),
    with: {
      sale: true,
    },
    orderBy: [desc(saleItems.createdAt)],
    limit: options?.limit || 100,
  })

  return items
    .filter((item) => item.sale.organizationId === organizationId)
    .map((item) => ({
      saleId: item.saleId,
      receiptNo: item.sale.receiptNo,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      unitCost: item.unitCost,
      subtotal: item.subtotal,
      paymentMethod: item.sale.paymentMethod,
      saleType: item.sale.type,
      createdAt: item.createdAt,
    }))
}

/**
 * Get aggregated analytics for a specific product
 */
export async function getProductAnalytics(
  productId: string,
  organizationId: string,
  options?: {
    startDate?: Date
    endDate?: Date
    days?: number
  },
): Promise<{
  totalRevenue: number
  totalUnitsSold: number
  totalCost: number
  grossProfit: number
  profitMargin: number
  averageSalePrice: number
  firstSaleDate: Date | null
  lastSaleDate: Date | null
  transactionCount: number
  refundedUnits: number
  refundRate: number
}> {
  // Calculate date range
  let startDate = options?.startDate
  let endDate = options?.endDate

  if (options?.days && !startDate) {
    endDate = new Date()
    startDate = new Date()
    startDate.setDate(startDate.getDate() - options.days)
  }

  // Get sales history
  const salesHistory = await getProductSalesHistory(productId, organizationId, {
    startDate,
    endDate,
    limit: 10000, // Get all for analytics
  })

  // Calculate metrics
  let totalRevenue = 0
  let totalCost = 0
  let totalUnitsSold = 0
  let refundedUnits = 0
  const uniqueSales = new Set<string>()
  let firstSaleDate: Date | null = null
  let lastSaleDate: Date | null = null

  for (const item of salesHistory) {
    const quantity = Math.abs(item.quantity)
    const subtotal = parseFloat(item.subtotal)
    const cost = parseFloat(item.unitCost) * quantity

    if (item.saleType === 'REFUND') {
      refundedUnits += quantity
      totalRevenue -= subtotal
      totalCost -= cost
    } else {
      totalRevenue += subtotal
      totalCost += cost
      totalUnitsSold += quantity
    }

    uniqueSales.add(item.saleId)

    if (!firstSaleDate || item.createdAt < firstSaleDate) {
      firstSaleDate = item.createdAt
    }
    if (!lastSaleDate || item.createdAt > lastSaleDate) {
      lastSaleDate = item.createdAt
    }
  }

  const grossProfit = totalRevenue - totalCost
  const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0
  const averageSalePrice = totalUnitsSold > 0 ? totalRevenue / totalUnitsSold : 0
  const refundRate = totalUnitsSold > 0 ? (refundedUnits / totalUnitsSold) * 100 : 0

  return {
    totalRevenue,
    totalUnitsSold,
    totalCost,
    grossProfit,
    profitMargin,
    averageSalePrice,
    firstSaleDate,
    lastSaleDate,
    transactionCount: uniqueSales.size,
    refundedUnits,
    refundRate,
  }
}

/**
 * Get daily sales trend for a specific product
 */
export async function getProductSalesTrend(
  productId: string,
  organizationId: string,
  days: number = 30,
): Promise<
  Array<{
    date: string
    unitsSold: number
    revenue: number
    cost: number
    profit: number
  }>
> {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Get sales history
  const salesHistory = await getProductSalesHistory(productId, organizationId, {
    startDate,
    endDate,
    limit: 10000,
  })

  // Group by date
  const dateMap = new Map<
    string,
    { unitsSold: number; revenue: number; cost: number }
  >()

  for (const item of salesHistory) {
    const dateKey = item.createdAt.toISOString().split('T')[0]!
    const existing = dateMap.get(dateKey) || {
      unitsSold: 0,
      revenue: 0,
      cost: 0,
    }

    const quantity = item.quantity
    const subtotal = parseFloat(item.subtotal)
    const cost = parseFloat(item.unitCost) * Math.abs(quantity)

    if (item.saleType === 'REFUND') {
      existing.revenue -= subtotal
      existing.cost -= cost
    } else {
      existing.unitsSold += quantity
      existing.revenue += subtotal
      existing.cost += cost
    }

    dateMap.set(dateKey, existing)
  }

  // Fill in missing dates and convert to array
  const trend: Array<{
    date: string
    unitsSold: number
    revenue: number
    cost: number
    profit: number
  }> = []

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split('T')[0]!
    const data = dateMap.get(dateKey) || {
      unitsSold: 0,
      revenue: 0,
      cost: 0,
    }

    trend.push({
      date: dateKey,
      unitsSold: data.unitsSold,
      revenue: data.revenue,
      cost: data.cost,
      profit: data.revenue - data.cost,
    })
  }

  return trend
}
