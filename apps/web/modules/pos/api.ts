import { builder } from "@/lib/graphql/builder";
import * as posService from "./service";
import * as assetService from "./services/asset-service";
import {
  CategoryType,
  ProductType,
  ProductWithStockType,
  ProductImageType,
  StockLotType,
  StockInfoType,
  StockLogType,
  SupplierType,
  SaleType,
  SaleWithItemsType,
  SalesSummaryType,
  DailyReportType,
  TodaysPulseType,
  SalesTrendItemType,
  TopProductType,
  LowStockItemType,
  FileUsageType,
  ProductSalesHistoryItemType,
  ProductAnalyticsType,
  ProductSalesTrendItemType,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateProductInput,
  UpdateProductInput,
  AddStockLotInput,
  AddStockBulkInput,
  CreateSupplierInput,
  UpdateSupplierInput,
  CreateSaleInput,
  GenerateDailyReportInput,
  AttachProductImageInput,
  DetachProductImageInput,
  SetPrimaryImageInput,
  ReorderProductImagesInput,
} from "./schema";

/**
 * POS GraphQL API Layer
 * Thin resolvers that delegate to service layer
 *
 * NOTE: Auth is disabled - using hardcoded organization ID from seed data
 */

// Hardcoded organization ID from seed data
// TODO: Enable auth and use getOrgId(ctx) instead
const DEFAULT_ORG_ID = "c9a7278c-7f73-43aa-bfc4-8c19e4458b69";

const getOrgId = (ctx: any): string => {
  return ctx.session?.activeOrganizationId || DEFAULT_ORG_ID;
};

// ========================================
// CATEGORY QUERIES
// ========================================

builder.queryField("categories", (t) =>
  t.field({
    type: [CategoryType],
    resolve: async (_, __, ctx) => {
      return posService.getCategories(getOrgId(ctx));
    },
  })
);

// ========================================
// CATEGORY MUTATIONS
// ========================================

builder.mutationField("createCategory", (t) =>
  t.field({
    type: CategoryType,
    args: {
      input: t.arg({ type: CreateCategoryInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.createCategory(getOrgId(ctx), {
        name: args.input.name,
      });
    },
  })
);

builder.mutationField("updateCategory", (t) =>
  t.field({
    type: CategoryType,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateCategoryInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.updateCategory(
        args.id,
        getOrgId(ctx),
        args.input
      );
    },
  })
);

builder.mutationField("deleteCategory", (t) =>
  t.field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.deleteCategory(args.id, getOrgId(ctx));
    },
  })
);

// ========================================
// PRODUCT QUERIES
// ========================================

builder.queryField("products", (t) =>
  t.field({
    type: [ProductType],
    args: {
      categoryId: t.arg.string({ required: false }),
      search: t.arg.string({ required: false }),
      isActive: t.arg.boolean({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getProducts(getOrgId(ctx), {
        categoryId: args.categoryId || undefined,
        search: args.search || undefined,
        isActive: args.isActive ?? undefined,
      });
    },
  })
);

builder.queryField("product", (t) =>
  t.field({
    type: ProductType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const product = await posService.getProduct(
        args.id,
        getOrgId(ctx)
      );
      if (!product) throw new Error("Product not found");
      return product;
    },
  })
);

builder.queryField("productsWithStock", (t) =>
  t.field({
    type: [ProductWithStockType],
    args: {
      categoryId: t.arg.string({ required: false }),
      search: t.arg.string({ required: false }),
      lowStockOnly: t.arg.boolean({ required: false }),
      threshold: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getProductsWithStock(getOrgId(ctx), {
        categoryId: args.categoryId || undefined,
        search: args.search || undefined,
        lowStockOnly: args.lowStockOnly || undefined,
        threshold: args.threshold || undefined,
      });
    },
  })
);

// ========================================
// PRODUCT MUTATIONS
// ========================================

builder.mutationField("createProduct", (t) =>
  t.field({
    type: ProductType,
    args: {
      input: t.arg({ type: CreateProductInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.createProduct(getOrgId(ctx), {
        name: args.input.name,
        searchName: args.input.searchName || null,
        barcode: args.input.barcode || null,
        description: args.input.description || null,
        sellingPrice: args.input.sellingPrice.toString(),
        categoryId: args.input.categoryId || null,
      });
    },
  })
);

builder.mutationField("updateProduct", (t) =>
  t.field({
    type: ProductType,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateProductInput, required: true }),
    },
    resolve: async (_, args, ctx) => {

      const updateData: any = {};
      if (args.input.name !== undefined) updateData.name = args.input.name;
      if (args.input.searchName !== undefined)
        updateData.searchName = args.input.searchName || null;
      if (args.input.barcode !== undefined)
        updateData.barcode = args.input.barcode || null;
      if (args.input.description !== undefined)
        updateData.description = args.input.description || null;
      if (args.input.sellingPrice !== undefined)
        updateData.sellingPrice = args.input.sellingPrice.toString();
      if (args.input.categoryId !== undefined)
        updateData.categoryId = args.input.categoryId || null;
      if (args.input.isActive !== undefined)
        updateData.isActive = args.input.isActive;

      return posService.updateProduct(
        args.id,
        getOrgId(ctx),
        updateData
      );
    },
  })
);

builder.mutationField("deleteProduct", (t) =>
  t.field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.deleteProduct(args.id, getOrgId(ctx));
    },
  })
);

// ========================================
// STOCK QUERIES
// ========================================

builder.queryField("productStock", (t) =>
  t.field({
    type: StockInfoType,
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getProductStock(
        args.productId,
        getOrgId(ctx)
      );
    },
  })
);

builder.queryField("stockLots", (t) =>
  t.field({
    type: [StockLotType],
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getStockLots(
        args.productId,
        getOrgId(ctx)
      );
    },
  })
);

// ========================================
// STOCK MUTATIONS
// ========================================

builder.mutationField("addStockLot", (t) =>
  t.field({
    type: StockLotType,
    args: {
      input: t.arg({ type: AddStockLotInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.addStockLot(getOrgId(ctx), {
        productId: args.input.productId,
        quantity: args.input.quantity,
        costPrice: args.input.costPrice.toString(),
        supplierId: args.input.supplierId || null,
        notes: args.input.notes || null,
        purchasedAt: args.input.purchasedAt || new Date(),
      });
    },
  })
);

builder.mutationField("addStockBulk", (t) =>
  t.field({
    type: [StockLotType],
    args: {
      input: t.arg({ type: AddStockBulkInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.addStockBulk(getOrgId(ctx), {
        items: args.input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          costPrice: item.costPrice.toString(),
          supplierId: item.supplierId || null,
          notes: item.notes || null,
          purchasedAt: item.purchasedAt || new Date(),
        })),
        invoiceRef: args.input.invoiceRef || null,
      });
    },
  })
);

// ========================================
// STOCK LOG QUERIES
// ========================================

builder.queryField("stockLogs", (t) =>
  t.field({
    type: [StockLogType],
    args: {
      productId: t.arg.string({ required: false }),
      type: t.arg.string({ required: false }),
      startDate: t.arg({ type: "DateTime", required: false }),
      endDate: t.arg({ type: "DateTime", required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getStockLogs(getOrgId(ctx), {
        productId: args.productId || undefined,
        type: args.type || undefined,
        startDate: args.startDate || undefined,
        endDate: args.endDate || undefined,
        limit: args.limit || undefined,
      });
    },
  })
);

// ========================================
// SUPPLIER QUERIES
// ========================================

builder.queryField("suppliers", (t) =>
  t.field({
    type: [SupplierType],
    resolve: async (_, __, ctx) => {
      return posService.getSuppliers(getOrgId(ctx));
    },
  })
);

builder.queryField("supplier", (t) =>
  t.field({
    type: SupplierType,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getSupplier(args.id, getOrgId(ctx));
    },
  })
);

// ========================================
// SUPPLIER MUTATIONS
// ========================================

builder.mutationField("createSupplier", (t) =>
  t.field({
    type: SupplierType,
    args: {
      input: t.arg({ type: CreateSupplierInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.createSupplier(getOrgId(ctx), {
        name: args.input.name,
        contactPerson: args.input.contactPerson || null,
        phone: args.input.phone || null,
        email: args.input.email || null,
        address: args.input.address || null,
        notes: args.input.notes || null,
      });
    },
  })
);

builder.mutationField("updateSupplier", (t) =>
  t.field({
    type: SupplierType,
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateSupplierInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.updateSupplier(args.id, getOrgId(ctx), {
        ...(args.input.name && { name: args.input.name }),
        ...(args.input.contactPerson !== undefined && { contactPerson: args.input.contactPerson }),
        ...(args.input.phone !== undefined && { phone: args.input.phone }),
        ...(args.input.email !== undefined && { email: args.input.email }),
        ...(args.input.address !== undefined && { address: args.input.address }),
        ...(args.input.notes !== undefined && { notes: args.input.notes }),
      });
    },
  })
);

builder.mutationField("deleteSupplier", (t) =>
  t.field({
    type: "Boolean",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.deleteSupplier(args.id, getOrgId(ctx));
    },
  })
);

// ========================================
// SALE QUERIES
// ========================================

builder.queryField("sales", (t) =>
  t.field({
    type: [SaleType],
    args: {
      startDate: t.arg({ type: "DateTime", required: false }),
      endDate: t.arg({ type: "DateTime", required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getSales(
        getOrgId(ctx),
        args.startDate || undefined,
        args.endDate || undefined
      );
    },
  })
);

builder.queryField("sale", (t) =>
  t.field({
    type: SaleWithItemsType,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      const sale = await posService.getSale(
        args.id,
        getOrgId(ctx)
      );
      if (!sale) throw new Error("Sale not found");
      return sale;
    },
  })
);

builder.queryField("salesSummary", (t) =>
  t.field({
    type: SalesSummaryType,
    args: {
      startDate: t.arg({ type: "DateTime", required: true }),
      endDate: t.arg({ type: "DateTime", required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getSalesSummary(
        getOrgId(ctx),
        args.startDate,
        args.endDate
      );
    },
  })
);

// ========================================
// SALE MUTATIONS
// ========================================

builder.mutationField("createSale", (t) =>
  t.field({
    type: SaleWithItemsType,
    args: {
      input: t.arg({ type: CreateSaleInput, required: true }),
    },
    resolve: async (_, args, ctx) => {

      const paymentMethod = args.input.paymentMethod as "cash" | "card";
      if (paymentMethod !== "cash" && paymentMethod !== "card") {
        throw new Error('Payment method must be "cash" or "card"');
      }

      return posService.createSale(getOrgId(ctx), {
        items: args.input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        paymentMethod,
        notes: args.input.notes || null,
      });
    },
  })
);

// ========================================
// SALES HISTORY & REFUNDS
// ========================================

builder.queryField("salesHistory", (t) =>
  t.field({
    type: [SaleWithItemsType],
    args: {
      startDate: t.arg({ type: "DateTime", required: false }),
      endDate: t.arg({ type: "DateTime", required: false }),
      paymentMethod: t.arg.string({ required: false }),
      type: t.arg.string({ required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getSalesHistory(getOrgId(ctx), {
        startDate: args.startDate || undefined,
        endDate: args.endDate || undefined,
        paymentMethod: args.paymentMethod || undefined,
        type: args.type || undefined,
        limit: args.limit || undefined,
      });
    },
  })
);

builder.mutationField("refundSaleItem", (t) =>
  t.field({
    type: SaleType,
    args: {
      saleItemId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.processSaleRefund(getOrgId(ctx), args.saleItemId);
    },
  })
);

// ========================================
// DAILY REPORTS (Z-REPORT)
// ========================================

builder.queryField("dailyReports", (t) =>
  t.field({
    type: [DailyReportType],
    args: {
      startDate: t.arg({ type: "DateTime", required: false }),
      endDate: t.arg({ type: "DateTime", required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getDailyReports(getOrgId(ctx), {
        startDate: args.startDate || undefined,
        endDate: args.endDate || undefined,
        limit: args.limit || undefined,
      });
    },
  })
);

builder.mutationField("generateDailyReport", (t) =>
  t.field({
    type: DailyReportType,
    args: {
      input: t.arg({ type: GenerateDailyReportInput, required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.generateDailyReport(getOrgId(ctx), {
        cashCounted: args.input.cashCounted ?? null,
        notes: args.input.notes ?? null,
      });
    },
  })
);

// ========================================
// DASHBOARD ANALYTICS
// ========================================

builder.queryField("todaysPulse", (t) =>
  t.field({
    type: TodaysPulseType,
    resolve: async (_, __, ctx) => {
      return posService.getTodaysPulse(getOrgId(ctx));
    },
  })
);

builder.queryField("salesTrend", (t) =>
  t.field({
    type: [SalesTrendItemType],
    args: {
      days: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getSalesTrend(getOrgId(ctx), args.days || 7);
    },
  })
);

builder.queryField("topProducts", (t) =>
  t.field({
    type: [TopProductType],
    args: {
      limit: t.arg.int({ required: false }),
      startDate: t.arg({ type: "DateTime", required: false }),
      endDate: t.arg({ type: "DateTime", required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getTopProducts(
        getOrgId(ctx),
        args.limit || 5,
        args.startDate || undefined,
        args.endDate || undefined
      );
    },
  })
);

builder.queryField("lowStockProducts", (t) =>
  t.field({
    type: [LowStockItemType],
    args: {
      threshold: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getLowStockProducts(getOrgId(ctx), args.threshold || 10);
    },
  })
);

// ========================================
// PRODUCT IMAGES QUERIES & MUTATIONS
// ========================================

/**
 * Get all images for a product
 */
builder.queryField("productImages", (t) =>
  t.field({
    type: [ProductImageType],
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (_, { productId }, ctx) => {
      return assetService.getProductImages(getOrgId(ctx), productId);
    },
  })
);

/**
 * Attach an image to a product
 */
builder.mutationField("attachProductImage", (t) =>
  t.field({
    type: ProductImageType,
    args: {
      input: t.arg({ type: AttachProductImageInput, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      return assetService.attachImageToProduct(getOrgId(ctx), {
        productId: input.productId,
        fileId: input.fileId,
        isPrimary: input.isPrimary || false,
      });
    },
  })
);

/**
 * Detach an image from a product
 */
builder.mutationField("detachProductImage", (t) =>
  t.field({
    type: "Boolean",
    args: {
      input: t.arg({ type: DetachProductImageInput, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      await assetService.detachImageFromProduct(getOrgId(ctx), {
        productId: input.productId,
        fileId: input.fileId,
      });
      return true;
    },
  })
);

/**
 * Set primary image for a product
 */
builder.mutationField("setPrimaryImage", (t) =>
  t.field({
    type: "Boolean",
    args: {
      input: t.arg({ type: SetPrimaryImageInput, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      await assetService.setPrimaryImage(getOrgId(ctx), {
        productId: input.productId,
        fileId: input.fileId,
      });
      return true;
    },
  })
);

/**
 * Reorder product images
 */
builder.mutationField("reorderProductImages", (t) =>
  t.field({
    type: "Boolean",
    args: {
      input: t.arg({ type: ReorderProductImagesInput, required: true }),
    },
    resolve: async (_, { input }, ctx) => {
      await assetService.reorderProductImages(getOrgId(ctx), {
        productId: input.productId,
        imageIds: input.imageIds,
      });
      return true;
    },
  })
);

/**
 * Check if a file is in use by products
 * Useful for preventing deletion of files that are attached to products
 */
builder.queryField("fileUsage", (t) =>
  t.field({
    type: FileUsageType,
    args: {
      fileId: t.arg.string({ required: true }),
    },
    resolve: async (_, { fileId }, ctx) => {
      return assetService.isFileInUse(getOrgId(ctx), fileId);
    },
  })
);

// ========================================
// PRODUCT ANALYTICS QUERIES
// ========================================

/**
 * Get sales history for a specific product
 */
builder.queryField("productSalesHistory", (t) =>
  t.field({
    type: [ProductSalesHistoryItemType],
    args: {
      productId: t.arg.string({ required: true }),
      startDate: t.arg({ type: "DateTime", required: false }),
      endDate: t.arg({ type: "DateTime", required: false }),
      limit: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getProductSalesHistory(
        args.productId,
        getOrgId(ctx),
        {
          startDate: args.startDate || undefined,
          endDate: args.endDate || undefined,
          limit: args.limit || undefined,
        }
      );
    },
  })
);

/**
 * Get aggregated analytics for a specific product
 */
builder.queryField("productAnalytics", (t) =>
  t.field({
    type: ProductAnalyticsType,
    args: {
      productId: t.arg.string({ required: true }),
      startDate: t.arg({ type: "DateTime", required: false }),
      endDate: t.arg({ type: "DateTime", required: false }),
      days: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getProductAnalytics(
        args.productId,
        getOrgId(ctx),
        {
          startDate: args.startDate || undefined,
          endDate: args.endDate || undefined,
          days: args.days || undefined,
        }
      );
    },
  })
);

/**
 * Get daily sales trend for a specific product
 */
builder.queryField("productSalesTrend", (t) =>
  t.field({
    type: [ProductSalesTrendItemType],
    args: {
      productId: t.arg.string({ required: true }),
      days: t.arg.int({ required: true }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getProductSalesTrend(
        args.productId,
        getOrgId(ctx),
        args.days
      );
    },
  })
);
