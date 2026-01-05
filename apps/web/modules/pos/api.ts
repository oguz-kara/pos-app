import { builder } from "@/lib/graphql/builder";
import * as posService from "./service";
import {
  CategoryType,
  ProductType,
  ProductWithStockType,
  StockLotType,
  StockInfoType,
  SaleType,
  SaleWithItemsType,
  SalesSummaryType,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateProductInput,
  UpdateProductInput,
  AddStockLotInput,
  CreateSaleInput,
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
        barcode: args.input.barcode || null,
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
      if (args.input.barcode !== undefined)
        updateData.barcode = args.input.barcode || null;
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

builder.queryField("lowStockProducts", (t) =>
  t.field({
    type: [ProductWithStockType],
    args: {
      threshold: t.arg.int({ required: false }),
    },
    resolve: async (_, args, ctx) => {
      return posService.getProductsWithStock(getOrgId(ctx), {
        lowStockOnly: true,
        threshold: args.threshold || 10,
      });
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
        supplier: args.input.supplier || null,
        notes: args.input.notes || null,
        purchasedAt: args.input.purchasedAt || new Date(),
      });
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
