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
    resolve: async (_parent, _args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getCategories(ctx.session.activeOrganizationId)
    },
  }),
)

builder.mutationField('createCategory', (t) =>
  t.field({
    type: CategoryType,
    args: { input: t.arg({ type: CreateCategoryInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.createCategory(ctx.session.activeOrganizationId, input)
    },
  }),
)

builder.mutationField('updateCategory', (t) =>
  t.field({
    type: CategoryType,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateCategoryInput, required: true }),
    },
    resolve: async (_parent, { id, input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      // Filter out null values - convert to undefined for service layer
      const cleanInput = {
        ...input,
        name: input.name ?? undefined,
      }
      return posService.updateCategory(ctx.session.activeOrganizationId, id, cleanInput)
    },
  }),
)

builder.mutationField('deleteCategory', (t) =>
  t.boolean({
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_parent, { id }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      await posService.deleteCategory(ctx.session.activeOrganizationId, id)
      return true
    },
  }),
)

// Products
builder.queryField('products', (t) =>
  t.field({
    type: [ProductType],
    args: {
      categoryId: t.arg.string({ required: false }),
      search: t.arg.string({ required: false }),
      isActive: t.arg.boolean({ required: false }),
    },
    resolve: async (_parent, args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getProducts(ctx.session.activeOrganizationId, {
        categoryId: args.categoryId ?? undefined,
        search: args.search ?? undefined,
        isActive: args.isActive ?? undefined,
      })
    },
  }),
)

builder.queryField('product', (t) =>
  t.field({
    type: ProductType,
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_parent, { id }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getProduct(id, ctx.session.activeOrganizationId)
    },
  }),
)

builder.queryField('productsWithStock', (t) =>
  t.field({
    type: [ProductWithStockType],
    args: {
      categoryId: t.arg.string({ required: false }),
      search: t.arg.string({ required: false }),
      lowStockOnly: t.arg.boolean({ required: false }),
      threshold: t.arg.int({ required: false }),
    },
    resolve: async (_parent, args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getProductsWithStock(ctx.session.activeOrganizationId, {
        categoryId: args.categoryId ?? undefined,
        search: args.search ?? undefined,
        lowStockOnly: args.lowStockOnly ?? undefined,
        threshold: args.threshold ?? undefined,
      })
    },
  }),
)

builder.mutationField('createProduct', (t) =>
  t.field({
    type: ProductType,
    args: { input: t.arg({ type: CreateProductInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.createProduct(ctx.session.activeOrganizationId, {
        name: input.name,
        searchName: input.searchName || undefined,
        barcode: input.barcode || undefined,
        sku: input.sku || undefined,
        brand: input.brand || undefined,
        description: input.description || undefined,
        sellingPrice: input.sellingPrice.toString(),
        categoryId: input.categoryId || undefined,
      })
    },
  }),
)

builder.mutationField('updateProduct', (t) =>
  t.field({
    type: ProductType,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateProductInput, required: true }),
    },
    resolve: async (_parent, { id, input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const updateData: Partial<{
        name: string
        searchName: string | undefined
        barcode: string | undefined
        sku: string | undefined
        brand: string | undefined
        description: string | undefined
        sellingPrice: string
        categoryId: string | undefined
        isActive: boolean
      }> = {}
      if (input.name !== undefined && input.name !== null) updateData.name = input.name
      if (input.searchName !== undefined) updateData.searchName = input.searchName || undefined
      if (input.barcode !== undefined) updateData.barcode = input.barcode || undefined
      if (input.sku !== undefined) updateData.sku = input.sku || undefined
      if (input.brand !== undefined) updateData.brand = input.brand || undefined
      if (input.description !== undefined) updateData.description = input.description || undefined
      if (input.sellingPrice !== undefined && input.sellingPrice !== null) updateData.sellingPrice = input.sellingPrice.toString()
      if (input.categoryId !== undefined) updateData.categoryId = input.categoryId || undefined
      if (input.isActive !== undefined && input.isActive !== null) updateData.isActive = input.isActive
      return posService.updateProduct(id, ctx.session.activeOrganizationId, updateData)
    },
  }),
)

builder.mutationField('deleteProduct', (t) =>
  t.boolean({
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_parent, { id }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      await posService.deleteProduct(id, ctx.session.activeOrganizationId)
      return true
    },
  }),
)

// ========================================
// STOCK QUERIES & MUTATIONS
// ========================================

builder.queryField('productStock', (t) =>
  t.field({
    type: StockInfoType,
    args: { productId: t.arg.string({ required: true }) },
    resolve: async (_parent, { productId }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getProductStock(productId, ctx.session.activeOrganizationId)
    },
  }),
)

builder.queryField('stockLots', (t) =>
  t.field({
    type: [StockLotType],
    args: { productId: t.arg.string({ required: true }) },
    resolve: async (_parent, { productId }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getStockLots(productId, ctx.session.activeOrganizationId)
    },
  }),
)

builder.queryField('stockLogs', (t) =>
  t.field({
    type: [StockLogType],
    args: {
      productId: t.arg.string({ required: false }),
      type: t.arg.string({ required: false }),
      startDate: t.arg({ type: 'DateTime', required: false }),
      endDate: t.arg({ type: 'DateTime', required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_parent, args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getStockLogs(ctx.session.activeOrganizationId, {
        productId: args.productId ?? undefined,
        type: args.type ?? undefined,
        startDate: args.startDate ?? undefined,
        endDate: args.endDate ?? undefined,
        limit: args.limit ?? undefined,
      })
    },
  }),
)

builder.mutationField('addStockLot', (t) =>
  t.field({
    type: StockLotType,
    args: { input: t.arg({ type: AddStockLotInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.addStockLot(ctx.session.activeOrganizationId, {
        productId: input.productId,
        quantity: input.quantity,
        costPrice: input.costPrice.toString(),
        purchasedAt: input.purchasedAt ?? new Date(),
        supplierId: input.supplierId || undefined,
        notes: input.notes || undefined,
      })
    },
  }),
)

builder.mutationField('addStockBulk', (t) =>
  t.field({
    type: [StockLotType],
    args: { input: t.arg({ type: AddStockBulkInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.addStockBulk(ctx.session.activeOrganizationId, {
        items: input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          costPrice: item.costPrice,
          supplierId: item.supplierId ?? undefined,
          notes: item.notes ?? undefined,
          purchasedAt: item.purchasedAt ?? new Date(),
        })),
        invoiceRef: input.invoiceRef ?? undefined,
      })
    },
  }),
)

// ========================================
// SUPPLIER QUERIES & MUTATIONS
// ========================================

builder.queryField('suppliers', (t) =>
  t.field({
    type: [SupplierType],
    resolve: async (_parent, _args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getSuppliers(ctx.session.activeOrganizationId)
    },
  }),
)

builder.queryField('supplier', (t) =>
  t.field({
    type: SupplierType,
    nullable: true,
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_parent, { id }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getSupplier(id, ctx.session.activeOrganizationId)
    },
  }),
)

builder.mutationField('createSupplier', (t) =>
  t.field({
    type: SupplierType,
    args: { input: t.arg({ type: CreateSupplierInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const data: {
        name: string
        contactPerson?: string
        phone?: string
        email?: string
        address?: string
        notes?: string
      } = { name: input.name }
      if (input.contactPerson) data.contactPerson = input.contactPerson
      if (input.phone) data.phone = input.phone
      if (input.email) data.email = input.email
      if (input.address) data.address = input.address
      if (input.notes) data.notes = input.notes
      return posService.createSupplier(ctx.session.activeOrganizationId, data)
    },
  }),
)

builder.mutationField('updateSupplier', (t) =>
  t.field({
    type: SupplierType,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateSupplierInput, required: true }),
    },
    resolve: async (_parent, { id, input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const data: Partial<{
        name: string
        contactPerson: string | null
        phone: string | null
        email: string | null
        address: string | null
        notes: string | null
      }> = {}
      if (input.name) data.name = input.name
      if (input.contactPerson !== undefined) data.contactPerson = input.contactPerson
      if (input.phone !== undefined) data.phone = input.phone
      if (input.email !== undefined) data.email = input.email
      if (input.address !== undefined) data.address = input.address
      if (input.notes !== undefined) data.notes = input.notes
      return posService.updateSupplier(id, ctx.session.activeOrganizationId, data)
    },
  }),
)

builder.mutationField('deleteSupplier', (t) =>
  t.boolean({
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_parent, { id }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      await posService.deleteSupplier(id, ctx.session.activeOrganizationId)
      return true
    },
  }),
)

// ========================================
// SALES QUERIES & MUTATIONS
// ========================================

builder.queryField('sale', (t) =>
  t.field({
    type: SaleWithItemsType,
    nullable: true,
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_parent, { id }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const sale = await posService.getSale(id, ctx.session.activeOrganizationId)
      if (!sale) return null
      // Type assertion: service returns correct runtime shape, structural types don't fully align
      return sale as unknown as typeof SaleWithItemsType.$inferType | null
    },
  }),
)

builder.queryField('salesHistory', (t) =>
  t.field({
    type: [SaleWithItemsType],
    args: {
      startDate: t.arg({ type: 'DateTime', required: false }),
      endDate: t.arg({ type: 'DateTime', required: false }),
      paymentMethod: t.arg.string({ required: false }),
      type: t.arg.string({ required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_parent, args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const history = await posService.getSalesHistory(ctx.session.activeOrganizationId, {
        startDate: args.startDate ?? undefined,
        endDate: args.endDate ?? undefined,
        paymentMethod: args.paymentMethod ?? undefined,
        type: args.type ?? undefined,
        limit: args.limit ?? undefined,
      })
      // Type assertion: service returns correct runtime shape, structural types don't fully align
      return history as unknown as typeof SaleWithItemsType.$inferType[]
    },
  }),
)

builder.queryField('salesTrend', (t) =>
  t.field({
    type: [SalesTrendItemType],
    args: { days: t.arg.int({ required: false }) },
    resolve: async (_parent, { days }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getSalesTrend(ctx.session.activeOrganizationId, days ?? 7)
    },
  }),
)

builder.mutationField('createSale', (t) =>
  t.field({
    type: SaleWithItemsType,
    args: { input: t.arg({ type: CreateSaleInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const sale = await posService.createSale(ctx.session.activeOrganizationId, {
        items: input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        paymentMethod: input.paymentMethod as 'cash' | 'card',
        notes: input.notes ?? undefined,
      })
      // Type assertion: service returns correct runtime shape, structural types don't fully align
      return sale as unknown as typeof SaleWithItemsType.$inferType
    },
  }),
)

builder.mutationField('refundSaleItem', (t) =>
  t.field({
    type: SaleType,
    args: { saleItemId: t.arg.string({ required: true }) },
    resolve: async (_parent, { saleItemId }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const refund = await posService.processSaleRefund(ctx.session.activeOrganizationId, saleItemId)
      // Type assertion: service returns correct runtime shape, structural types don't fully align
      return refund as unknown as typeof SaleType.$inferType
    },
  }),
)

// ========================================
// DASHBOARD & REPORTS
// ========================================

builder.queryField('todaysPulse', (t) =>
  t.field({
    type: TodaysPulseType,
    resolve: async (_parent, _args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getTodaysPulse(ctx.session.activeOrganizationId)
    },
  }),
)

builder.queryField('topProducts', (t) =>
  t.field({
    type: [TopProductType],
    args: {
      limit: t.arg.int({ required: false }),
      startDate: t.arg({ type: 'DateTime', required: false }),
      endDate: t.arg({ type: 'DateTime', required: false }),
    },
    resolve: async (_parent, args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getTopProducts(
        ctx.session.activeOrganizationId,
        args.limit ?? 5,
        args.startDate ?? undefined,
        args.endDate ?? undefined,
      )
    },
  }),
)

builder.queryField('dashboardLowStock', (t) =>
  t.field({
    type: [LowStockItemType],
    args: { threshold: t.arg.int({ required: false }) },
    resolve: async (_parent, { threshold }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getLowStockProducts(ctx.session.activeOrganizationId, threshold ?? 10)
    },
  }),
)

builder.queryField('dailyReports', (t) =>
  t.field({
    type: [DailyReportType],
    args: {
      startDate: t.arg({ type: 'DateTime', required: false }),
      endDate: t.arg({ type: 'DateTime', required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_parent, args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getDailyReports(ctx.session.activeOrganizationId, {
        startDate: args.startDate ?? undefined,
        endDate: args.endDate ?? undefined,
        limit: args.limit ?? undefined,
      })
    },
  }),
)

builder.mutationField('generateDailyReport', (t) =>
  t.field({
    type: DailyReportType,
    args: { input: t.arg({ type: GenerateDailyReportInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.generateDailyReport(ctx.session.activeOrganizationId, {
        cashCounted: input.cashCounted ?? undefined,
        notes: input.notes ?? undefined,
      })
    },
  }),
)

builder.queryField('todaysCashSales', (t) =>
  t.field({
    type: SalesSummaryType,
    args: {
      startDate: t.arg({ type: 'DateTime', required: true }),
      endDate: t.arg({ type: 'DateTime', required: true }),
    },
    resolve: async (_parent, { startDate, endDate }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const history = await posService.getSalesHistory(ctx.session.activeOrganizationId, {
        startDate,
        endDate,
        paymentMethod: 'cash',
        type: 'SALE',
      })

      let totalRevenue = 0
      let totalCost = 0

      for (const sale of history) {
        totalRevenue += parseFloat(sale.totalAmount)
        totalCost += parseFloat(sale.totalCost)
      }

      return {
        totalRevenue,
        totalCost,
        totalProfit: totalRevenue - totalCost,
        salesCount: history.length,
        startDate,
        endDate,
      }
    },
  }),
)

builder.queryField('todaysCardSales', (t) =>
  t.field({
    type: SalesSummaryType,
    args: {
      startDate: t.arg({ type: 'DateTime', required: true }),
      endDate: t.arg({ type: 'DateTime', required: true }),
    },
    resolve: async (_parent, { startDate, endDate }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const history = await posService.getSalesHistory(ctx.session.activeOrganizationId, {
        startDate,
        endDate,
        paymentMethod: 'card',
        type: 'SALE',
      })

      let totalRevenue = 0
      let totalCost = 0

      for (const sale of history) {
        totalRevenue += parseFloat(sale.totalAmount)
        totalCost += parseFloat(sale.totalCost)
      }

      return {
        totalRevenue,
        totalCost,
        totalProfit: totalRevenue - totalCost,
        salesCount: history.length,
        startDate,
        endDate,
      }
    },
  }),
)

builder.queryField('todaysRefunds', (t) =>
  t.field({
    type: SalesSummaryType,
    args: {
      startDate: t.arg({ type: 'DateTime', required: true }),
      endDate: t.arg({ type: 'DateTime', required: true }),
    },
    resolve: async (_parent, { startDate, endDate }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const history = await posService.getSalesHistory(ctx.session.activeOrganizationId, {
        startDate,
        endDate,
        type: 'REFUND',
      })

      let totalRevenue = 0
      let totalCost = 0

      for (const sale of history) {
        totalRevenue += Math.abs(parseFloat(sale.totalAmount))
        totalCost += Math.abs(parseFloat(sale.totalCost))
      }

      return {
        totalRevenue,
        totalCost,
        totalProfit: totalRevenue - totalCost,
        salesCount: history.length,
        startDate,
        endDate,
      }
    },
  }),
)

// ========================================
// PRODUCT ANALYTICS
// ========================================

builder.queryField('productAnalytics', (t) =>
  t.field({
    type: ProductAnalyticsType,
    args: {
      productId: t.arg.string({ required: true }),
      startDate: t.arg({ type: 'DateTime', required: false }),
      endDate: t.arg({ type: 'DateTime', required: false }),
    },
    resolve: async (_parent, { productId, startDate, endDate }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getProductAnalytics(productId, ctx.session.activeOrganizationId, {
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
      })
    },
  }),
)

builder.queryField('productSalesHistory', (t) =>
  t.field({
    type: [ProductSalesHistoryItemType],
    args: {
      productId: t.arg.string({ required: true }),
      startDate: t.arg({ type: 'DateTime', required: false }),
      endDate: t.arg({ type: 'DateTime', required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_parent, args, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getProductSalesHistory(
        args.productId,
        ctx.session.activeOrganizationId,
        {
          startDate: args.startDate ?? undefined,
          endDate: args.endDate ?? undefined,
          limit: args.limit ?? undefined,
        },
      )
    },
  }),
)

builder.queryField('productSalesTrend', (t) =>
  t.field({
    type: [ProductSalesTrendItemType],
    args: {
      productId: t.arg.string({ required: true }),
      days: t.arg.int({ required: true }),
    },
    resolve: async (_parent, { productId, days }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      return posService.getProductSalesTrend(
        productId,
        ctx.session.activeOrganizationId,
        days,
      )
    },
  }),
)

builder.queryField('productWithAnalytics', (t) =>
  t.field({
    type: ProductType,
    nullable: true,
    args: {
      productId: t.arg.string({ required: true }),
      days: t.arg.int({ required: false }),
    },
    resolve: async (_parent, { productId }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      // This query is just a convenience wrapper that returns the product
      // The client can call productAnalytics and productStock separately
      return posService.getProduct(productId, ctx.session.activeOrganizationId)
    },
  }),
)

// ========================================
// PRODUCT IMAGES
// ========================================

builder.queryField('productImages', (t) =>
  t.field({
    type: [ProductImageType],
    args: { productId: t.arg.string({ required: true }) },
    resolve: async (_parent, { productId }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const { getProductImages } = await import('./services/asset-service')
      return getProductImages(ctx.session.activeOrganizationId, productId)
    },
  }),
)

builder.mutationField('attachProductImage', (t) =>
  t.field({
    type: ProductImageType,
    args: { input: t.arg({ type: AttachProductImageInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const { attachImageToProduct } = await import('./services/asset-service')
      return attachImageToProduct(ctx.session.activeOrganizationId, {
        productId: input.productId,
        fileId: input.fileId,
        isPrimary: input.isPrimary ?? false,
      })
    },
  }),
)

builder.mutationField('detachProductImage', (t) =>
  t.boolean({
    args: { input: t.arg({ type: DetachProductImageInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const { detachImageFromProduct } = await import('./services/asset-service')
      await detachImageFromProduct(ctx.session.activeOrganizationId, {
        productId: input.productId,
        fileId: input.fileId,
      })
      return true
    },
  }),
)

builder.mutationField('setPrimaryImage', (t) =>
  t.boolean({
    args: { input: t.arg({ type: SetPrimaryImageInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const { setPrimaryImage } = await import('./services/asset-service')
      await setPrimaryImage(ctx.session.activeOrganizationId, {
        productId: input.productId,
        fileId: input.fileId,
      })
      return true
    },
  }),
)

builder.mutationField('reorderProductImages', (t) =>
  t.boolean({
    args: { input: t.arg({ type: ReorderProductImagesInput, required: true }) },
    resolve: async (_parent, { input }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const { reorderProductImages } = await import('./services/asset-service')
      await reorderProductImages(ctx.session.activeOrganizationId, {
        productId: input.productId,
        imageIds: input.imageIds,
      })
      return true
    },
  }),
)

builder.queryField('fileUsage', (t) =>
  t.field({
    type: FileUsageType,
    args: { fileId: t.arg.string({ required: true }) },
    resolve: async (_parent, { fileId }, ctx: Context) => {
      if (!ctx.session) throw new Error('Not authenticated')
      const { isFileInUse } = await import('./services/asset-service')
      return isFileInUse(ctx.session.activeOrganizationId, fileId)
    },
  }),
)
