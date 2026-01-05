import {
  db,
  eq,
  and,
  desc,
  asc,
  sql,
  gte,
  lte,
  categories,
  products,
  stockLots,
  sales,
  saleItems,
} from "@jetframe/db";
import type {
  NewCategory,
  Category,
  NewProduct,
  Product,
  NewStockLot,
  StockLot,
  StockInfo,
  CreateSaleInput,
  Sale,
  SaleWithItems,
  SalesSummary,
  ProductWithStock,
} from "./types";

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
  const currentYear = new Date().getFullYear();
  const yearPrefix = currentYear.toString();

  // Get the last receipt number for the current year
  const lastSale = await db.query.sales.findFirst({
    where: and(
      eq(sales.organizationId, organizationId),
      sql`${sales.receiptNo} LIKE ${yearPrefix + "-%"}`
    ),
    orderBy: [desc(sales.createdAt)],
  });

  let nextNumber = 1;

  if (lastSale?.receiptNo) {
    // Extract the number part (after the dash)
    const parts = lastSale.receiptNo.split("-");
    if (parts.length === 2) {
      const lastNumber = parseInt(parts[1] || "0", 10);
      nextNumber = lastNumber + 1;
    }
  }

  // Pad to 6 digits
  const paddedNumber = nextNumber.toString().padStart(6, "0");
  return `${yearPrefix}-${paddedNumber}`;
}

// ========================================
// CATEGORIES
// ========================================

export async function createCategory(
  organizationId: string,
  data: NewCategory
): Promise<Category> {
  const [category] = await db
    .insert(categories)
    .values({
      ...data,
      organizationId,
    })
    .returning();
  return category!;
}

export async function getCategories(organizationId: string): Promise<Category[]> {
  return db.query.categories.findMany({
    where: eq(categories.organizationId, organizationId),
    orderBy: [asc(categories.name)],
  });
}

export async function updateCategory(
  id: string,
  organizationId: string,
  data: Partial<NewCategory>
): Promise<Category> {
  const [updated] = await db
    .update(categories)
    .set(data)
    .where(and(eq(categories.id, id), eq(categories.organizationId, organizationId)))
    .returning();

  if (!updated) {
    throw new Error("Category not found");
  }

  return updated;
}

export async function deleteCategory(
  id: string,
  organizationId: string
): Promise<boolean> {
  const result = await db
    .delete(categories)
    .where(and(eq(categories.id, id), eq(categories.organizationId, organizationId)));
  return true;
}

// ========================================
// PRODUCTS
// ========================================

export async function createProduct(
  organizationId: string,
  data: NewProduct
): Promise<Product> {
  const [product] = await db
    .insert(products)
    .values({
      ...data,
      organizationId,
      updatedAt: new Date(),
    })
    .returning();
  return product!;
}

export async function getProducts(
  organizationId: string,
  options?: {
    categoryId?: string;
    search?: string;
    isActive?: boolean;
  }
): Promise<Product[]> {
  const conditions = [eq(products.organizationId, organizationId)];

  if (options?.categoryId) {
    conditions.push(eq(products.categoryId, options.categoryId));
  }

  if (options?.isActive !== undefined) {
    conditions.push(eq(products.isActive, options.isActive));
  }

  // If no search query, return all products matching filters
  if (!options?.search) {
    return db.query.products.findMany({
      where: and(...conditions),
      orderBy: [asc(products.name)],
      with: {
        category: true,
      },
    });
  }

  // Turkish-aware fuzzy search with multi-strategy relevance scoring
  const { normalizeTurkish } = await import("@jetframe/db");
  const normalizedSearch = normalizeTurkish(options.search);

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
          WHEN p.search_name LIKE ${normalizedSearch + "%"}::text THEN 80
          -- Contains (substring match)
          WHEN p.search_name LIKE ${"%" + normalizedSearch + "%"}::text THEN 60
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
          OR p.search_name LIKE ${normalizedSearch + "%"}::text
          OR p.search_name LIKE ${"%" + normalizedSearch + "%"}::text
          OR p.barcode = ${options.search}::text
          -- Trigram similarity matches (threshold: 0.1 = very lenient for typos)
          OR similarity(p.search_name::text, ${normalizedSearch}::text) > 0.1
          OR (p.barcode IS NOT NULL AND similarity(p.barcode::text, ${options.search}::text) > 0.1)
        )
    )
    SELECT * FROM search_results
    WHERE relevance > 0
    ORDER BY relevance DESC, search_results.name ASC
  `);

  // Fetch categories for each product
  // Note: db.execute returns snake_case column names from database
  const rows = Array.isArray(results) ? results : (results.rows || []);
  const productsWithCategories = await Promise.all(
    rows.map(async (product: any) => {
      const categoryId = product.category_id;
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
        };
      }
      const category = await db.query.categories.findFirst({
        where: eq(categories.id, categoryId),
      });
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
      };
    })
  );

  return productsWithCategories as Product[];
}

export async function getProduct(
  id: string,
  organizationId: string
): Promise<Product | undefined> {
  return db.query.products.findFirst({
    where: and(eq(products.id, id), eq(products.organizationId, organizationId)),
    with: {
      category: true,
    },
  });
}

export async function getProductsWithStock(
  organizationId: string,
  options?: {
    categoryId?: string;
    search?: string;
    lowStockOnly?: boolean;
    threshold?: number;
  }
): Promise<ProductWithStock[]> {
  const productsList = await getProducts(organizationId, {
    categoryId: options?.categoryId,
    search: options?.search,
    isActive: true,
  });

  const productsWithStock = await Promise.all(
    productsList.map(async (product) => {
      const stockInfo = await getProductStock(product.id, organizationId);
      return {
        ...product,
        totalStock: stockInfo.totalStock,
        averageCost: stockInfo.averageCost,
      };
    })
  );

  // Filter by low stock if requested
  if (options?.lowStockOnly) {
    const threshold = options.threshold || 10;
    return productsWithStock.filter((p) => p.totalStock <= threshold);
  }

  return productsWithStock;
}

export async function updateProduct(
  id: string,
  organizationId: string,
  data: Partial<NewProduct>
): Promise<Product> {
  const [updated] = await db
    .update(products)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(products.id, id), eq(products.organizationId, organizationId)))
    .returning();

  if (!updated) {
    throw new Error("Product not found");
  }

  return updated;
}

export async function deleteProduct(
  id: string,
  organizationId: string
): Promise<boolean> {
  await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.organizationId, organizationId)));
  return true;
}

// ========================================
// STOCK MANAGEMENT
// ========================================

/**
 * Get total stock for a product (sum of all remaining quantities)
 */
export async function getProductStock(
  productId: string,
  organizationId: string
): Promise<StockInfo> {
  const lots = await db.query.stockLots.findMany({
    where: and(
      eq(stockLots.productId, productId),
      eq(stockLots.organizationId, organizationId)
    ),
    orderBy: [asc(stockLots.purchasedAt)],
  });

  let totalStock = 0;
  let weightedCost = 0;
  let totalQuantity = 0;

  for (const lot of lots) {
    totalStock += lot.remaining;

    // Only include positive remaining quantities in cost calculation
    if (lot.remaining > 0) {
      const cost = parseFloat(lot.costPrice);
      weightedCost += cost * lot.remaining;
      totalQuantity += lot.remaining;
    }
  }

  const averageCost = totalQuantity > 0 ? weightedCost / totalQuantity : 0;

  return {
    productId,
    totalStock,
    averageCost,
    lots,
  };
}

/**
 * Add new stock lot
 */
export async function addStockLot(
  organizationId: string,
  data: NewStockLot
): Promise<StockLot> {
  const [lot] = await db
    .insert(stockLots)
    .values({
      ...data,
      organizationId,
      remaining: data.quantity, // Initially, remaining = quantity
    })
    .returning();
  return lot!;
}

/**
 * Get stock lots for a product
 */
export async function getStockLots(
  productId: string,
  organizationId: string
): Promise<StockLot[]> {
  return db.query.stockLots.findMany({
    where: and(
      eq(stockLots.productId, productId),
      eq(stockLots.organizationId, organizationId)
    ),
    orderBy: [asc(stockLots.purchasedAt)],
  });
}

/**
 * FIFO Stock Deduction Algorithm
 * Deducts stock from oldest lots first
 * ALLOWS negative stock (no error thrown)
 * Returns total cost for profit calculation
 */
export async function deductStock(
  productId: string,
  organizationId: string,
  quantity: number
): Promise<{ totalCost: number }> {
  const lots = await db.query.stockLots.findMany({
    where: and(
      eq(stockLots.productId, productId),
      eq(stockLots.organizationId, organizationId)
    ),
    orderBy: [asc(stockLots.purchasedAt)],
  });

  if (lots.length === 0) {
    // No stock lots exist - create a placeholder lot with 0 cost
    return { totalCost: 0 };
  }

  let remaining = quantity;
  let totalCost = 0;

  // Deduct from oldest lots first (FIFO)
  for (const lot of lots) {
    if (remaining <= 0) break;

    const deduct = Math.min(lot.remaining, remaining);
    const cost = parseFloat(lot.costPrice);
    totalCost += deduct * cost;

    // Update lot remaining
    await db
      .update(stockLots)
      .set({ remaining: lot.remaining - deduct })
      .where(eq(stockLots.id, lot.id));

    remaining -= deduct;
  }

  // If still remaining, deduct from last lot (goes negative)
  if (remaining > 0 && lots.length > 0) {
    const lastLot = lots[lots.length - 1]!;
    const cost = parseFloat(lastLot.costPrice);
    totalCost += remaining * cost;

    await db
      .update(stockLots)
      .set({ remaining: lastLot.remaining - remaining })
      .where(eq(stockLots.id, lastLot.id));
  }

  return { totalCost };
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
 */
export async function createSale(
  organizationId: string,
  data: CreateSaleInput
): Promise<SaleWithItems> {
  // Generate receipt number
  const receiptNo = await generateReceiptNumber(organizationId);

  // Calculate totals and costs
  let totalAmount = 0;
  let totalCost = 0;

  const itemsWithCost = await Promise.all(
    data.items.map(async (item) => {
      const subtotal = item.quantity * item.unitPrice;
      totalAmount += subtotal;

      // Deduct stock and get cost (FIFO)
      const { totalCost: itemCost } = await deductStock(
        item.productId,
        organizationId,
        item.quantity
      );
      totalCost += itemCost;

      const unitCost = item.quantity > 0 ? itemCost / item.quantity : 0;

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toString(),
        unitCost: unitCost.toString(),
        subtotal: subtotal.toString(),
      };
    })
  );

  // Create sale record
  const [sale] = await db
    .insert(sales)
    .values({
      organizationId,
      receiptNo,
      totalAmount: totalAmount.toString(),
      totalCost: totalCost.toString(),
      paymentMethod: data.paymentMethod,
      notes: data.notes,
    })
    .returning();

  // Create sale items
  const createdItems = await db
    .insert(saleItems)
    .values(
      itemsWithCost.map((item) => ({
        saleId: sale!.id,
        ...item,
      }))
    )
    .returning();

  // Fetch products for each item
  const itemsWithProducts = await Promise.all(
    createdItems.map(async (item) => {
      const product = await db.query.products.findFirst({
        where: eq(products.id, item.productId),
      });
      return {
        ...item,
        product: product!,
      };
    })
  );

  return {
    ...sale!,
    items: itemsWithProducts,
  };
}

/**
 * Get sales for date range
 */
export async function getSales(
  organizationId: string,
  startDate?: Date,
  endDate?: Date
): Promise<Sale[]> {
  const conditions = [eq(sales.organizationId, organizationId)];

  if (startDate) {
    conditions.push(gte(sales.createdAt, startDate));
  }

  if (endDate) {
    conditions.push(lte(sales.createdAt, endDate));
  }

  return db.query.sales.findMany({
    where: and(...conditions),
    orderBy: [desc(sales.createdAt)],
  });
}

/**
 * Get sale by ID with items
 */
export async function getSale(
  id: string,
  organizationId: string
): Promise<SaleWithItems | undefined> {
  const sale = await db.query.sales.findFirst({
    where: and(eq(sales.id, id), eq(sales.organizationId, organizationId)),
  });

  if (!sale) {
    return undefined;
  }

  const items = await db.query.saleItems.findMany({
    where: eq(saleItems.saleId, id),
  });

  const itemsWithProducts = await Promise.all(
    items.map(async (item) => {
      const product = await db.query.products.findFirst({
        where: eq(products.id, item.productId),
      });
      return {
        ...item,
        product: product!,
      };
    })
  );

  return {
    ...sale,
    items: itemsWithProducts,
  };
}

/**
 * Get sales summary (total revenue, profit, count)
 */
export async function getSalesSummary(
  organizationId: string,
  startDate: Date,
  endDate: Date
): Promise<SalesSummary> {
  const salesList = await getSales(organizationId, startDate, endDate);

  let totalRevenue = 0;
  let totalCost = 0;

  for (const sale of salesList) {
    totalRevenue += parseFloat(sale.totalAmount);
    totalCost += parseFloat(sale.totalCost);
  }

  const totalProfit = totalRevenue - totalCost;

  return {
    totalRevenue,
    totalCost,
    totalProfit,
    salesCount: salesList.length,
    startDate,
    endDate,
  };
}
