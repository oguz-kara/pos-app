import { builder } from "@/lib/graphql/builder";

/**
 * POS GraphQL Schema
 * Object types and input types for Pothos
 */

// ========================================
// OBJECT TYPES
// ========================================

export const CategoryType = builder
  .objectRef<{
    id: string;
    name: string;
    organizationId: string;
    createdAt: Date;
  }>("Category")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      organizationId: t.exposeString("organizationId"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
    }),
  });

export const ProductType = builder
  .objectRef<{
    id: string;
    name: string;
    barcode: string | null;
    sellingPrice: string;
    isActive: boolean;
    categoryId: string | null;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    category?: {
      id: string;
      name: string;
      organizationId: string;
      createdAt: Date;
    } | null;
  }>("Product")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      barcode: t.exposeString("barcode", { nullable: true }),
      sellingPrice: t.exposeString("sellingPrice"),
      isActive: t.exposeBoolean("isActive"),
      categoryId: t.exposeString("categoryId", { nullable: true }),
      organizationId: t.exposeString("organizationId"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
      updatedAt: t.expose("updatedAt", { type: "DateTime" }),
      category: t.field({
        type: CategoryType,
        nullable: true,
        resolve: (parent) => parent.category || null,
      }),
    }),
  });

export const ProductWithStockType = builder
  .objectRef<{
    id: string;
    name: string;
    barcode: string | null;
    sellingPrice: string;
    isActive: boolean;
    categoryId: string | null;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
    totalStock: number;
    averageCost: number;
    category?: {
      id: string;
      name: string;
      organizationId: string;
      createdAt: Date;
    } | null;
  }>("ProductWithStock")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      barcode: t.exposeString("barcode", { nullable: true }),
      sellingPrice: t.exposeString("sellingPrice"),
      isActive: t.exposeBoolean("isActive"),
      categoryId: t.exposeString("categoryId", { nullable: true }),
      organizationId: t.exposeString("organizationId"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
      updatedAt: t.expose("updatedAt", { type: "DateTime" }),
      totalStock: t.exposeInt("totalStock"),
      averageCost: t.exposeFloat("averageCost"),
      category: t.field({
        type: CategoryType,
        nullable: true,
        resolve: (parent) => parent.category || null,
      }),
    }),
  });

export const StockLotType = builder
  .objectRef<{
    id: string;
    productId: string;
    quantity: number;
    remaining: number;
    costPrice: string;
    supplier: string | null;
    notes: string | null;
    purchasedAt: Date;
    organizationId: string;
    createdAt: Date;
  }>("StockLot")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      productId: t.exposeString("productId"),
      quantity: t.exposeInt("quantity"),
      remaining: t.exposeInt("remaining"),
      costPrice: t.exposeString("costPrice"),
      supplier: t.exposeString("supplier", { nullable: true }),
      notes: t.exposeString("notes", { nullable: true }),
      purchasedAt: t.expose("purchasedAt", { type: "DateTime" }),
      organizationId: t.exposeString("organizationId"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
    }),
  });

export const StockInfoType = builder
  .objectRef<{
    productId: string;
    totalStock: number;
    averageCost: number;
    lots: Array<{
      id: string;
      productId: string;
      quantity: number;
      remaining: number;
      costPrice: string;
      supplier: string | null;
      notes: string | null;
      purchasedAt: Date;
      organizationId: string;
      createdAt: Date;
    }>;
  }>("StockInfo")
  .implement({
    fields: (t) => ({
      productId: t.exposeString("productId"),
      totalStock: t.exposeInt("totalStock"),
      averageCost: t.exposeFloat("averageCost"),
      lots: t.field({
        type: [StockLotType],
        resolve: (parent) => parent.lots,
      }),
    }),
  });

export const SaleItemType = builder
  .objectRef<{
    id: string;
    saleId: string;
    productId: string;
    quantity: number;
    unitPrice: string;
    unitCost: string;
    subtotal: string;
    createdAt: Date;
    product: {
      id: string;
      name: string;
      barcode: string | null;
      sellingPrice: string;
      isActive: boolean;
      categoryId: string | null;
      organizationId: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }>("SaleItem")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      saleId: t.exposeString("saleId"),
      productId: t.exposeString("productId"),
      quantity: t.exposeInt("quantity"),
      unitPrice: t.exposeString("unitPrice"),
      unitCost: t.exposeString("unitCost"),
      subtotal: t.exposeString("subtotal"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
      product: t.field({
        type: ProductType,
        resolve: (parent) => parent.product,
      }),
    }),
  });

export const SaleType = builder
  .objectRef<{
    id: string;
    receiptNo: string;
    totalAmount: string;
    totalCost: string;
    paymentMethod: "cash" | "card";
    notes: string | null;
    organizationId: string;
    createdAt: Date;
  }>("Sale")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      receiptNo: t.exposeString("receiptNo"),
      totalAmount: t.exposeString("totalAmount"),
      totalCost: t.exposeString("totalCost"),
      paymentMethod: t.exposeString("paymentMethod"),
      notes: t.exposeString("notes", { nullable: true }),
      organizationId: t.exposeString("organizationId"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
    }),
  });

export const SaleWithItemsType = builder
  .objectRef<{
    id: string;
    receiptNo: string;
    totalAmount: string;
    totalCost: string;
    paymentMethod: "cash" | "card";
    notes: string | null;
    organizationId: string;
    createdAt: Date;
    items: Array<{
      id: string;
      saleId: string;
      productId: string;
      quantity: number;
      unitPrice: string;
      unitCost: string;
      subtotal: string;
      createdAt: Date;
      product: {
        id: string;
        name: string;
        barcode: string | null;
        sellingPrice: string;
        isActive: boolean;
        categoryId: string | null;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }>;
  }>("SaleWithItems")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      receiptNo: t.exposeString("receiptNo"),
      totalAmount: t.exposeString("totalAmount"),
      totalCost: t.exposeString("totalCost"),
      paymentMethod: t.exposeString("paymentMethod"),
      notes: t.exposeString("notes", { nullable: true }),
      organizationId: t.exposeString("organizationId"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
      items: t.field({
        type: [SaleItemType],
        resolve: (parent) => parent.items,
      }),
    }),
  });

export const SalesSummaryType = builder
  .objectRef<{
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
    salesCount: number;
    startDate: Date;
    endDate: Date;
  }>("SalesSummary")
  .implement({
    fields: (t) => ({
      totalRevenue: t.exposeFloat("totalRevenue"),
      totalCost: t.exposeFloat("totalCost"),
      totalProfit: t.exposeFloat("totalProfit"),
      salesCount: t.exposeInt("salesCount"),
      startDate: t.expose("startDate", { type: "DateTime" }),
      endDate: t.expose("endDate", { type: "DateTime" }),
    }),
  });

// ========================================
// INPUT TYPES
// ========================================

export const CreateCategoryInput = builder.inputType("CreateCategoryInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1, maxLength: 255 } }),
  }),
});

export const UpdateCategoryInput = builder.inputType("UpdateCategoryInput", {
  fields: (t) => ({
    name: t.string({ required: false, validate: { minLength: 1, maxLength: 255 } }),
  }),
});

export const CreateProductInput = builder.inputType("CreateProductInput", {
  fields: (t) => ({
    name: t.string({ required: true, validate: { minLength: 1, maxLength: 255 } }),
    barcode: t.string({ required: false }),
    sellingPrice: t.float({ required: true }),
    categoryId: t.string({ required: false }),
  }),
});

export const UpdateProductInput = builder.inputType("UpdateProductInput", {
  fields: (t) => ({
    name: t.string({ required: false, validate: { minLength: 1, maxLength: 255 } }),
    barcode: t.string({ required: false }),
    sellingPrice: t.float({ required: false }),
    categoryId: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});

export const AddStockLotInput = builder.inputType("AddStockLotInput", {
  fields: (t) => ({
    productId: t.string({ required: true }),
    quantity: t.int({ required: true, validate: { min: 1 } }),
    costPrice: t.float({ required: true, validate: { min: 0 } }),
    supplier: t.string({ required: false }),
    notes: t.string({ required: false }),
    purchasedAt: t.field({ type: "DateTime", required: false }),
  }),
});

export const CreateSaleItemInput = builder.inputType("CreateSaleItemInput", {
  fields: (t) => ({
    productId: t.string({ required: true }),
    quantity: t.int({ required: true, validate: { min: 1 } }),
    unitPrice: t.float({ required: true, validate: { min: 0 } }),
  }),
});

export const CreateSaleInput = builder.inputType("CreateSaleInput", {
  fields: (t) => ({
    items: t.field({
      type: [CreateSaleItemInput],
      required: true,
      validate: { minLength: 1 },
    }),
    paymentMethod: t.string({ required: true }),
    notes: t.string({ required: false }),
  }),
});
