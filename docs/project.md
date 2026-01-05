# CLAUDE.md - POS Module for JetFrame

## Project Context

This is a **Point of Sale (POS) module** for a hardware and flower shop in İzmir, Turkey. The shop sells:
- Hardware items (plastics, electronics, faucet parts, etc.)
- Flower bouquets and plants

The store currently has no digital system - everything is managed old school. We need a simple, fast POS system to:
- Enter and manage products
- Track stock with different purchase prices
- Process sales quickly
- View daily/weekly/monthly revenue and profit reports

## Tech Stack (JetFrame)

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle
- **API:** GraphQL (Pothos + Yoga)
- **UI:** Shadcn + Tailwind
- **Auth:** Better-Auth (personal organizations)
- **i18n:** Frontend-only with `t()` function

## Critical Business Rules

### Stock Lots System

**Problem:** Same product can be purchased at different prices at different times.

**Solution:** Use `stock_lots` table - each purchase is a separate record with its own cost price.

```
Product: "Samsung USB Cable"
├── Lot 1: 50 pcs @ 25 TL (Jan 2024)
├── Lot 2: 30 pcs @ 28 TL (Feb 2024)  
└── Lot 3: 100 pcs @ 22 TL (Mar 2024 - bulk discount)
```

### FIFO Stock Deduction

When selling, always deduct from **oldest stock first** (First In, First Out).

**Important:** 
- Do NOT track which specific lot each sale came from (no `stock_lot_id` in sale_items)
- Just use FIFO to deduct from `stock_lots.remaining`
- Calculate average cost at time of sale for profit calculation

### Negative Stock Allowed

**Do NOT throw errors for insufficient stock.** Stock can go negative. This handles:
- Data entry mistakes
- Sales made before stock entry
- Real-world edge cases

Just show a warning in UI when stock is low or negative.

## Database Schema

### Categories

```typescript
// packages/db/schema/pos/categories.ts
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

### Products

```typescript
// packages/db/schema/pos/products.ts
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  categoryId: uuid('category_id').references(() => categories.id),
  name: varchar('name', { length: 255 }).notNull(),
  barcode: varchar('barcode', { length: 100 }), // optional
  sellingPrice: decimal('selling_price', { precision: 10, scale: 2 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Index for barcode lookup
// Index for organizationId
```

### Stock Lots

```typescript
// packages/db/schema/pos/stock-lots.ts
export const stockLots = pgTable('stock_lots', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  productId: uuid('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(), // purchased quantity
  remaining: integer('remaining').notNull(), // current remaining (can be negative)
  costPrice: decimal('cost_price', { precision: 10, scale: 2 }).notNull(),
  supplier: varchar('supplier', { length: 255 }), // optional
  notes: text('notes'), // optional
  purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Index for productId + purchasedAt (for FIFO queries)
// Index for organizationId
```

### Sales

```typescript
// packages/db/schema/pos/sales.ts
export const paymentMethodEnum = pgEnum('payment_method', ['cash', 'card']);

export const sales = pgTable('sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id),
  receiptNo: varchar('receipt_no', { length: 50 }).notNull(), // "2024-000001"
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  totalCost: decimal('total_cost', { precision: 10, scale: 2 }).notNull(), // for profit calc
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Index for organizationId + createdAt (for reports)
```

### Sale Items

```typescript
// packages/db/schema/pos/sale-items.ts
export const saleItems = pgTable('sale_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  saleId: uuid('sale_id').notNull().references(() => sales.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(), // price at sale time
  unitCost: decimal('unit_cost', { precision: 10, scale: 2 }).notNull(), // avg cost at sale time
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Index for saleId
```

## Module Structure

```
modules/pos/
├── components/
│   ├── product-search.tsx       # Quick product search (name/barcode)
│   ├── cart.tsx                 # Shopping cart
│   ├── cart-item.tsx            # Single cart item
│   ├── checkout-dialog.tsx      # Payment modal
│   ├── quick-sale.tsx           # Main POS screen
│   ├── product-form.tsx         # Add/edit product
│   ├── category-select.tsx      # Category dropdown
│   ├── stock-entry-form.tsx     # Add new stock lot
│   ├── stock-status-badge.tsx   # Shows stock level with color
│   ├── low-stock-alert.tsx      # Dashboard warning
│   ├── daily-summary.tsx        # Today's sales summary
│   └── report-charts.tsx        # Revenue/profit charts
├── hooks/
│   ├── use-cart.ts              # Cart state management
│   ├── use-products.ts          # Product queries
│   ├── use-categories.ts        # Category queries
│   ├── use-stock.ts             # Stock queries
│   └── use-sales.ts             # Sales queries/mutations
├── service.ts                   # Business logic
├── api.ts                       # GraphQL resolvers
├── interface.ts                 # TypeScript types
└── constants.ts                 # Payment methods, etc.
```

## Pages

```
app/[locale]/(app)/pos/
├── page.tsx                     # Quick sale screen (main POS)
├── products/
│   ├── page.tsx                 # Product list
│   ├── new/page.tsx             # Add product
│   └── [id]/page.tsx            # Edit product
├── categories/
│   └── page.tsx                 # Manage categories
├── stock/
│   ├── page.tsx                 # Stock overview (all products)
│   └── entry/page.tsx           # New stock entry
├── sales/
│   ├── page.tsx                 # Sales history
│   └── [id]/page.tsx            # Sale detail
└── reports/
    └── page.tsx                 # Daily/weekly/monthly reports
```

## Key Service Functions

### Stock Service

```typescript
// Get total stock for a product (sum of all remaining)
function getProductStock(productId: string): number

// Get average cost price (weighted by remaining quantities)
function getAverageCostPrice(productId: string): number

// Deduct stock using FIFO (updates stock_lots.remaining)
// Does NOT throw error - allows negative stock
function deductStock(productId: string, quantity: number): { totalCost: number }

// Add new stock lot
function addStockLot(data: NewStockLot): StockLot
```

### Sales Service

```typescript
// Create a new sale
// 1. Calculate totals
// 2. Deduct stock (FIFO)
// 3. Create sale + sale_items records
// 4. Generate receipt number
function createSale(items: CartItem[], paymentMethod: PaymentMethod): Sale

// Get sales for date range
function getSales(startDate: Date, endDate: Date): Sale[]

// Get sales summary (total revenue, profit, count)
function getSalesSummary(startDate: Date, endDate: Date): SalesSummary
```

## MVP Features

| Feature | Priority | Description |
|---------|----------|-------------|
| Product CRUD | P0 | Add, edit, list, delete products |
| Category CRUD | P0 | Simple category management |
| Stock Entry | P0 | Add stock lots with cost price |
| Quick Sale | P0 | Search → Add to cart → Checkout |
| FIFO Deduction | P0 | Auto deduct from oldest stock |
| Sales History | P0 | List past sales |
| Daily Report | P0 | Today's revenue and profit |
| Weekly/Monthly Report | P1 | Aggregate reports |
| Low Stock Warning | P1 | Show products with low stock |

## NOT in MVP (Future)

- Barcode scanner integration
- Receipt/invoice printing
- Customer management (credit/debt tracking)
- Supplier management
- Excel export
- Multi-user (cashier roles)
- Discounts/promotions

## UI Guidelines

1. **Quick Sale Screen** - Should be the main landing page, optimized for speed
2. **Big buttons** - Easy to tap on tablet/touch screen
3. **Keyboard shortcuts** - For power users (Enter to add, F2 to checkout, etc.)
4. **Turkish language** - Use `t()` for all strings
5. **Minimal clicks** - Every extra click slows down sales

## GraphQL API

### Queries

```graphql
# Products
products(categoryId: ID, search: String): [Product!]!
product(id: ID!): Product

# Categories  
categories: [Category!]!

# Stock
productStock(productId: ID!): StockInfo!
stockLots(productId: ID!): [StockLot!]!
lowStockProducts(threshold: Int = 10): [Product!]!

# Sales
sales(startDate: DateTime, endDate: DateTime): [Sale!]!
sale(id: ID!): Sale
salesSummary(startDate: DateTime!, endDate: DateTime!): SalesSummary!
```

### Mutations

```graphql
# Products
createProduct(input: CreateProductInput!): Product!
updateProduct(id: ID!, input: UpdateProductInput!): Product!
deleteProduct(id: ID!): Boolean!

# Categories
createCategory(name: String!): Category!
updateCategory(id: ID!, name: String!): Category!
deleteCategory(id: ID!): Boolean!

# Stock
addStockLot(input: AddStockLotInput!): StockLot!

# Sales
createSale(input: CreateSaleInput!): Sale!
```

## Implementation Order

1. **Database schema** - Create all tables with Drizzle
2. **Categories** - Simple CRUD (warmup)
3. **Products** - CRUD with category relation
4. **Stock Lots** - Entry form + FIFO logic
5. **Quick Sale** - Cart + checkout flow
6. **Sales History** - List + detail views
7. **Reports** - Summary calculations + charts

## Testing Checklist

- [ ] Can add product with price
- [ ] Can add stock with different cost prices
- [ ] Sale correctly deducts stock (FIFO)
- [ ] Sale calculates correct profit (revenue - cost)
- [ ] Negative stock doesn't break anything
- [ ] Daily report shows correct totals
- [ ] Receipt number auto-increments