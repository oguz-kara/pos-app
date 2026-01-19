import { builder } from '@/lib/graphql/builder'
import type { Context } from '@/lib/graphql/context'
import * as posService from './service'

/**
 * POS GraphQL Schema
 * Object types and input types for Pothos
 */

// ========================================
// HELPER TYPES (PARTIAL SHAPES)
// ========================================

// 1. Partial File Shape (Matches what assetService returns)
interface PartialFile {
  id: string
  filename: string
  contentType: string
  size: number
  url: string
  fileHash: string | null
  createdAt: Date
}

const PartialFileType = builder
  .objectRef<PartialFile>('PartialFile')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      filename: t.exposeString('filename'),
      contentType: t.exposeString('contentType'),
      size: t.exposeInt('size'),
      url: t.exposeString('url'),
      fileHash: t.exposeString('fileHash', { nullable: true }),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
    }),
  })

// 2. Partial Product Shape (Matches what nested queries return)
interface PartialProduct {
  id: string
  name: string
  barcode: string | null
  sellingPrice: string
  isActive: boolean
  categoryId: string | null
  organizationId: string
  createdAt: Date
  updatedAt: Date
}

const PartialProductType = builder
  .objectRef<PartialProduct>('PartialProduct')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      barcode: t.exposeString('barcode', { nullable: true }),
      sellingPrice: t.exposeString('sellingPrice'),
      isActive: t.exposeBoolean('isActive'),
      categoryId: t.exposeString('categoryId', { nullable: true }),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    }),
  })

// ========================================
// OBJECT TYPES
// ========================================

export const CategoryType = builder
  .objectRef<{
    id: string
    name: string
    organizationId: string
    createdAt: Date
  }>('Category')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
    }),
  })

export const ProductType = builder
  .objectRef<{
    id: string
    name: string
    searchName: string
    barcode: string | null
    sku: string | null
    brand: string | null
    description: string | null
    sellingPrice: string
    isActive: boolean
    categoryId: string | null
    organizationId: string
    createdAt: Date
    updatedAt: Date
    category?: {
      id: string
      name: string
      organizationId: string
      createdAt: Date
    } | null
  }>('Product')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      searchName: t.exposeString('searchName'),
      barcode: t.exposeString('barcode', { nullable: true }),
      sku: t.exposeString('sku', { nullable: true }),
      brand: t.exposeString('brand', { nullable: true }),
      description: t.exposeString('description', { nullable: true }),
      sellingPrice: t.exposeString('sellingPrice'),
      isActive: t.exposeBoolean('isActive'),
      categoryId: t.exposeString('categoryId', { nullable: true }),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      category: t.field({
        type: CategoryType,
        nullable: true,
        resolve: (parent) => parent.category || null,
      }),
    }),
  })

export const ProductWithStockType = builder
  .objectRef<{
    id: string
    name: string
    searchName: string
    barcode: string | null
    sku: string | null
    brand: string | null
    description: string | null
    sellingPrice: string
    isActive: boolean
    categoryId: string | null
    organizationId: string
    createdAt: Date
    updatedAt: Date
    totalStock: number
    averageCost: number
    category?: {
      id: string
      name: string
      organizationId: string
      createdAt: Date
    } | null
  }>('ProductWithStock')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      searchName: t.exposeString('searchName'),
      barcode: t.exposeString('barcode', { nullable: true }),
      sku: t.exposeString('sku', { nullable: true }),
      brand: t.exposeString('brand', { nullable: true }),
      description: t.exposeString('description', { nullable: true }),
      sellingPrice: t.exposeString('sellingPrice'),
      isActive: t.exposeBoolean('isActive'),
      categoryId: t.exposeString('categoryId', { nullable: true }),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      totalStock: t.exposeInt('totalStock'),
      averageCost: t.exposeFloat('averageCost'),
      category: t.field({
        type: CategoryType,
        nullable: true,
        resolve: (parent) => parent.category || null,
      }),
    }),
  })

export const ProductImageType = builder
  .objectRef<{
    id: string
    productId: string
    fileId: string
    isPrimary: boolean
    displayOrder: number
    createdAt: Date
    updatedAt: Date
    // Using the strict PartialFile interface
    file: PartialFile
  }>('ProductImage')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      productId: t.exposeString('productId'),
      fileId: t.exposeString('fileId'),
      isPrimary: t.exposeBoolean('isPrimary'),
      displayOrder: t.exposeInt('displayOrder'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      file: t.field({
        type: PartialFileType, // Using the implemented Partial Ref
        resolve: (parent) => parent.file,
      }),
    }),
  })

export const StockLotType = builder
  .objectRef<{
    id: string
    productId: string
    supplierId: string | null
    quantity: number
    remaining: number
    costPrice: string
    supplier: string | null
    notes: string | null
    purchasedAt: Date
    organizationId: string
    createdAt: Date
  }>('StockLot')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      productId: t.exposeString('productId'),
      supplierId: t.exposeString('supplierId', { nullable: true }),
      quantity: t.exposeInt('quantity'),
      remaining: t.exposeInt('remaining'),
      costPrice: t.exposeString('costPrice'),
      supplier: t.exposeString('supplier', { nullable: true }),
      notes: t.exposeString('notes', { nullable: true }),
      purchasedAt: t.expose('purchasedAt', { type: 'DateTime' }),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
    }),
  })

export const StockInfoType = builder
  .objectRef<{
    productId: string
    totalStock: number
    averageCost: number
    lots: Array<{
      id: string
      productId: string
      supplierId: string | null
      quantity: number
      remaining: number
      costPrice: string
      supplier: string | null
      notes: string | null
      purchasedAt: Date
      organizationId: string
      createdAt: Date
    }>
  }>('StockInfo')
  .implement({
    fields: (t) => ({
      productId: t.exposeString('productId'),
      totalStock: t.exposeInt('totalStock'),
      averageCost: t.exposeFloat('averageCost'),
      lots: t.field({
        type: [StockLotType],
        resolve: (parent) => parent.lots,
      }),
    }),
  })

export const StockLogType = builder
  .objectRef<{
    id: string
    organizationId: string
    productId: string
    lotId: string | null
    type: string
    quantity: number
    referenceType: string | null
    referenceId: string | null
    notes: string | null
    createdAt: Date
    // Using strict PartialProduct interface
    product?: PartialProduct
  }>('StockLog')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      organizationId: t.exposeString('organizationId'),
      productId: t.exposeString('productId'),
      lotId: t.exposeString('lotId', { nullable: true }),
      type: t.exposeString('type'),
      quantity: t.exposeInt('quantity'),
      referenceType: t.exposeString('referenceType', { nullable: true }),
      referenceId: t.exposeString('referenceId', { nullable: true }),
      notes: t.exposeString('notes', { nullable: true }),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      product: t.field({
        type: PartialProductType, // Using the implemented Partial Ref
        nullable: true,
        resolve: (parent) => parent.product || null,
      }),
    }),
  })

export const SupplierType = builder
  .objectRef<{
    id: string
    name: string
    contactPerson: string | null
    phone: string | null
    email: string | null
    address: string | null
    notes: string | null
    organizationId: string
    createdAt: Date
    updatedAt: Date
  }>('Supplier')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      contactPerson: t.exposeString('contactPerson', { nullable: true }),
      phone: t.exposeString('phone', { nullable: true }),
      email: t.exposeString('email', { nullable: true }),
      address: t.exposeString('address', { nullable: true }),
      notes: t.exposeString('notes', { nullable: true }),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    }),
  })

export const SaleItemType = builder
  .objectRef<{
    id: string
    saleId: string
    productId: string
    quantity: number
    unitPrice: string
    unitCost: string
    subtotal: string
    createdAt: Date
    // Using strict PartialProduct interface
    product: PartialProduct
  }>('SaleItem')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      saleId: t.exposeString('saleId'),
      productId: t.exposeString('productId'),
      quantity: t.exposeInt('quantity'),
      unitPrice: t.exposeString('unitPrice'),
      unitCost: t.exposeString('unitCost'),
      subtotal: t.exposeString('subtotal'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      product: t.field({
        type: PartialProductType, // Using the implemented Partial Ref
        resolve: (parent) => parent.product,
      }),
    }),
  })

export const SaleType = builder
  .objectRef<{
    id: string
    receiptNo: string
    type: 'SALE' | 'REFUND'
    originalSaleId: string | null
    totalAmount: string
    totalCost: string
    paymentMethod: 'cash' | 'card'
    notes: string | null
    organizationId: string
    createdAt: Date
  }>('Sale')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      receiptNo: t.exposeString('receiptNo'),
      type: t.exposeString('type'),
      originalSaleId: t.exposeString('originalSaleId', { nullable: true }),
      totalAmount: t.exposeString('totalAmount'),
      totalCost: t.exposeString('totalCost'),
      paymentMethod: t.exposeString('paymentMethod'),
      notes: t.exposeString('notes', { nullable: true }),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
    }),
  })

export const SaleWithItemsType = builder
  .objectRef<{
    id: string
    receiptNo: string
    type: 'SALE' | 'REFUND'
    originalSaleId: string | null
    totalAmount: string
    totalCost: string
    paymentMethod: 'cash' | 'card'
    notes: string | null
    organizationId: string
    createdAt: Date
    items: Array<{
      id: string
      saleId: string
      productId: string
      quantity: number
      unitPrice: string
      unitCost: string
      subtotal: string
      createdAt: Date
      // Using strict PartialProduct interface
      product: PartialProduct
    }>
  }>('SaleWithItems')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      receiptNo: t.exposeString('receiptNo'),
      type: t.exposeString('type'),
      originalSaleId: t.exposeString('originalSaleId', { nullable: true }),
      totalAmount: t.exposeString('totalAmount'),
      totalCost: t.exposeString('totalCost'),
      paymentMethod: t.exposeString('paymentMethod'),
      notes: t.exposeString('notes', { nullable: true }),
      organizationId: t.exposeString('organizationId'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      items: t.field({
        type: [SaleItemType],
        resolve: (parent) => parent.items,
      }),
    }),
  })

export const SalesSummaryType = builder
  .objectRef<{
    totalRevenue: number
    totalCost: number
    totalProfit: number
    salesCount: number
    startDate: Date
    endDate: Date
  }>('SalesSummary')
  .implement({
    fields: (t) => ({
      totalRevenue: t.exposeFloat('totalRevenue'),
      totalCost: t.exposeFloat('totalCost'),
      totalProfit: t.exposeFloat('totalProfit'),
      salesCount: t.exposeInt('salesCount'),
      startDate: t.expose('startDate', { type: 'DateTime' }),
      endDate: t.expose('endDate', { type: 'DateTime' }),
    }),
  })

export const DailyReportType = builder
  .objectRef<{
    id: string
    organizationId: string
    reportDate: Date
    reportStartTime: Date
    reportEndTime: Date
    totalSales: string
    totalRefunds: string
    totalCost: string
    grossProfit: string
    cashSales: string
    cardSales: string
    cashCounted: string | null
    cashVariance: string | null
    notes: string | null
    createdAt: Date
  }>('DailyReport')
  .implement({
    fields: (t) => ({
      id: t.exposeID('id'),
      organizationId: t.exposeString('organizationId'),
      reportDate: t.expose('reportDate', { type: 'DateTime' }),
      reportStartTime: t.expose('reportStartTime', { type: 'DateTime' }),
      reportEndTime: t.expose('reportEndTime', { type: 'DateTime' }),
      totalSales: t.exposeString('totalSales'),
      totalRefunds: t.exposeString('totalRefunds'),
      totalCost: t.exposeString('totalCost'),
      grossProfit: t.exposeString('grossProfit'),
      cashSales: t.exposeString('cashSales'),
      cardSales: t.exposeString('cardSales'),
      cashCounted: t.exposeString('cashCounted', { nullable: true }),
      cashVariance: t.exposeString('cashVariance', { nullable: true }),
      notes: t.exposeString('notes', { nullable: true }),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
    }),
  })

export const TodaysPulseType = builder
  .objectRef<{
    totalSales: number
    totalCost: number
    grossProfit: number
    transactionCount: number
    totalRefunds: number
  }>('TodaysPulse')
  .implement({
    fields: (t) => ({
      totalSales: t.exposeFloat('totalSales'),
      totalCost: t.exposeFloat('totalCost'),
      grossProfit: t.exposeFloat('grossProfit'),
      transactionCount: t.exposeInt('transactionCount'),
      totalRefunds: t.exposeFloat('totalRefunds'),
    }),
  })

export const SalesTrendItemType = builder
  .objectRef<{
    date: string
    sales: number
    cost: number
    profit: number
  }>('SalesTrendItem')
  .implement({
    fields: (t) => ({
      date: t.exposeString('date'),
      sales: t.exposeFloat('sales'),
      cost: t.exposeFloat('cost'),
      profit: t.exposeFloat('profit'),
    }),
  })

export const TopProductType = builder
  .objectRef<{
    productId: string
    productName: string
    quantitySold: number
    revenue: number
  }>('TopProduct')
  .implement({
    fields: (t) => ({
      productId: t.exposeID('productId'),
      productName: t.exposeString('productName'),
      quantitySold: t.exposeInt('quantitySold'),
      revenue: t.exposeFloat('revenue'),
    }),
  })

export const LowStockItemType = builder
  .objectRef<{
    productId: string
    productName: string
    currentStock: number
    barcode: string | null
  }>('LowStockItem')
  .implement({
    fields: (t) => ({
      productId: t.exposeID('productId'),
      productName: t.exposeString('productName'),
      currentStock: t.exposeInt('currentStock'),
      barcode: t.exposeString('barcode', { nullable: true }),
    }),
  })

// ========================================
// INPUT TYPES
// ========================================

export const CreateCategoryInput = builder.inputType('CreateCategoryInput', {
  fields: (t) => ({
    name: t.string({
      required: true,
      validate: { minLength: 1, maxLength: 255 },
    }),
  }),
})

export const UpdateCategoryInput = builder.inputType('UpdateCategoryInput', {
  fields: (t) => ({
    name: t.string({
      required: false,
      validate: { minLength: 1, maxLength: 255 },
    }),
  }),
})

export const CreateProductInput = builder.inputType('CreateProductInput', {
  fields: (t) => ({
    name: t.string({
      required: true,
      validate: { minLength: 1, maxLength: 255 },
    }),
    searchName: t.string({ required: false, validate: { maxLength: 255 } }),
    barcode: t.string({ required: false }),
    sku: t.string({ required: false, validate: { maxLength: 100 } }),
    brand: t.string({ required: false, validate: { maxLength: 255 } }),
    description: t.string({ required: false, validate: { maxLength: 1000 } }),
    sellingPrice: t.float({
      required: true,
      validate: { min: 0.01, max: 999999.99 },
    }),
    categoryId: t.string({ required: false }),
  }),
})

export const UpdateProductInput = builder.inputType('UpdateProductInput', {
  fields: (t) => ({
    name: t.string({
      required: false,
      validate: { minLength: 1, maxLength: 255 },
    }),
    searchName: t.string({ required: false, validate: { maxLength: 255 } }),
    barcode: t.string({ required: false }),
    sku: t.string({ required: false, validate: { maxLength: 100 } }),
    brand: t.string({ required: false, validate: { maxLength: 255 } }),
    description: t.string({ required: false, validate: { maxLength: 1000 } }),
    sellingPrice: t.float({
      required: false,
      validate: { min: 0.01, max: 999999.99 },
    }),
    categoryId: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
})

export const AddStockLotInput = builder.inputType('AddStockLotInput', {
  fields: (t) => ({
    productId: t.string({ required: true }),
    quantity: t.int({ required: true, validate: { min: 1, max: 10000 } }),
    costPrice: t.float({
      required: true,
      validate: { min: 0.01, max: 999999.99 },
    }),
    supplierId: t.string({ required: false }),
    notes: t.string({ required: false }),
    purchasedAt: t.field({ type: 'DateTime', required: false }),
  }),
})

export const CreateSaleItemInput = builder.inputType('CreateSaleItemInput', {
  fields: (t) => ({
    productId: t.string({ required: true }),
    quantity: t.int({ required: true, validate: { min: 1, max: 10000 } }),
    unitPrice: t.float({
      required: true,
      validate: { min: 0.01, max: 999999.99 },
    }),
  }),
})

export const CreateSaleInput = builder.inputType('CreateSaleInput', {
  fields: (t) => ({
    items: t.field({
      type: [CreateSaleItemInput],
      required: true,
      validate: { minLength: 1 },
    }),
    paymentMethod: t.string({ required: true }),
    notes: t.string({ required: false }),
  }),
})

export const CreateSupplierInput = builder.inputType('CreateSupplierInput', {
  fields: (t) => ({
    name: t.string({
      required: true,
      validate: { minLength: 1, maxLength: 255 },
    }),
    contactPerson: t.string({ required: false }),
    phone: t.string({ required: false }),
    email: t.string({ required: false }),
    address: t.string({ required: false }),
    notes: t.string({ required: false }),
  }),
})

export const UpdateSupplierInput = builder.inputType('UpdateSupplierInput', {
  fields: (t) => ({
    name: t.string({
      required: false,
      validate: { minLength: 1, maxLength: 255 },
    }),
    contactPerson: t.string({ required: false }),
    phone: t.string({ required: false }),
    email: t.string({ required: false }),
    address: t.string({ required: false }),
    notes: t.string({ required: false }),
  }),
})

export const GenerateDailyReportInput = builder.inputType(
  'GenerateDailyReportInput',
  {
    fields: (t) => ({
      cashCounted: t.float({ required: false }),
      notes: t.string({ required: false }),
    }),
  },
)

export const AddStockBulkInput = builder.inputType('AddStockBulkInput', {
  fields: (t) => ({
    items: t.field({
      type: [AddStockLotInput],
      required: true,
      validate: { minLength: 1 },
    }),
    invoiceRef: t.string({ required: false }),
  }),
})

export const AttachProductImageInput = builder.inputType(
  'AttachProductImageInput',
  {
    fields: (t) => ({
      productId: t.string({ required: true }),
      fileId: t.string({ required: true }),
      isPrimary: t.boolean({ required: false }),
    }),
  },
)

export const DetachProductImageInput = builder.inputType(
  'DetachProductImageInput',
  {
    fields: (t) => ({
      productId: t.string({ required: true }),
      fileId: t.string({ required: true }),
    }),
  },
)

export const SetPrimaryImageInput = builder.inputType('SetPrimaryImageInput', {
  fields: (t) => ({
    productId: t.string({ required: true }),
    fileId: t.string({ required: true }),
  }),
})

export const ReorderProductImagesInput = builder.inputType(
  'ReorderProductImagesInput',
  {
    fields: (t) => ({
      productId: t.string({ required: true }),
      imageIds: t.stringList({ required: true }),
    }),
  },
)

export const FileUsageType = builder
  .objectRef<{
    inUse: boolean
    productCount: number
  }>('FileUsage')
  .implement({
    fields: (t) => ({
      inUse: t.exposeBoolean('inUse'),
      productCount: t.exposeInt('productCount'),
    }),
  })

// ========================================
// PRODUCT ANALYTICS TYPES
// ========================================

export const ProductSalesHistoryItemType = builder
  .objectRef<{
    saleId: string
    receiptNo: string
    quantity: number
    unitPrice: string
    unitCost: string
    subtotal: string
    paymentMethod: string
    saleType: string
    createdAt: Date
  }>('ProductSalesHistoryItem')
  .implement({
    fields: (t) => ({
      saleId: t.exposeString('saleId'),
      receiptNo: t.exposeString('receiptNo'),
      quantity: t.exposeInt('quantity'),
      unitPrice: t.exposeString('unitPrice'),
      unitCost: t.exposeString('unitCost'),
      subtotal: t.exposeString('subtotal'),
      paymentMethod: t.exposeString('paymentMethod'),
      saleType: t.exposeString('saleType'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
    }),
  })

export const ProductAnalyticsType = builder
  .objectRef<{
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
  }>('ProductAnalytics')
  .implement({
    fields: (t) => ({
      totalRevenue: t.exposeFloat('totalRevenue'),
      totalUnitsSold: t.exposeInt('totalUnitsSold'),
      totalCost: t.exposeFloat('totalCost'),
      grossProfit: t.exposeFloat('grossProfit'),
      profitMargin: t.exposeFloat('profitMargin'),
      averageSalePrice: t.exposeFloat('averageSalePrice'),
      firstSaleDate: t.expose('firstSaleDate', {
        type: 'DateTime',
        nullable: true,
      }),
      lastSaleDate: t.expose('lastSaleDate', {
        type: 'DateTime',
        nullable: true,
      }),
      transactionCount: t.exposeInt('transactionCount'),
      refundedUnits: t.exposeInt('refundedUnits'),
      refundRate: t.exposeFloat('refundRate'),
    }),
  })

export const ProductSalesTrendItemType = builder
  .objectRef<{
    date: string
    unitsSold: number
    revenue: number
    cost: number
    profit: number
  }>('ProductSalesTrendItem')
  .implement({
    fields: (t) => ({
      date: t.exposeString('date'),
      unitsSold: t.exposeInt('unitsSold'),
      revenue: t.exposeFloat('revenue'),
      cost: t.exposeFloat('cost'),
      profit: t.exposeFloat('profit'),
    }),
  })

// ========================================
// QUERIES & MUTATIONS
// ========================================

// Categories
builder.queryField('categories', (t) =>
  t.field({
    type: [CategoryType],
    authScopes: { member: true },
    resolve: async (_parent, _args, ctx: Context) => {
      const orgId = ctx.organization?.id
      if (!orgId) throw new Error('Organization context required')
      return posService.listCategories(orgId)
    },
  }),
)

builder.mutationField('createCategory', (t) =>
  t.field({
    type: CategoryType,
    authScopes: { member: true },
    args: { input: t.arg({ type: CreateCategoryInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      const orgId = ctx.organization?.id
      if (!orgId) throw new Error('Organization context required')
      return posService.createCategory(orgId, input)
    },
  }),
)

builder.mutationField('updateCategory', (t) =>
  t.field({
    type: CategoryType,
    authScopes: { member: true },
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateCategoryInput, required: true }),
    },
    resolve: async (_parent, { id, input }, ctx: Context) => {
      const orgId = ctx.organization?.id
      if (!orgId) throw new Error('Organization context required')
      return posService.updateCategory(orgId, id, input)
    },
  }),
)

builder.mutationField('deleteCategory', (t) =>
  t.boolean({
    authScopes: { member: true },
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_parent, { id }, ctx: Context) => {
      const orgId = ctx.organization?.id
      if (!orgId) throw new Error('Organization context required')
      await posService.deleteCategory(orgId, id)
      return true
    },
  }),
)
