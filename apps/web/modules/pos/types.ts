import type { InferSelectModel, InferInsertModel } from "@jetframe/db";
import {
  categories,
  products,
  stockLots,
  sales,
  saleItems,
} from "@jetframe/db";

/**
 * POS TypeScript Types
 * Inferred from database schema
 */

// Category Types
export type Category = InferSelectModel<typeof categories>;
export type NewCategory = Omit<
  InferInsertModel<typeof categories>,
  "id" | "organizationId" | "createdAt"
>;

// Product Types
export type Product = InferSelectModel<typeof products>;
export type NewProduct = Omit<
  InferInsertModel<typeof products>,
  "id" | "organizationId" | "createdAt" | "updatedAt"
>;

export type ProductWithStock = Product & {
  totalStock: number;
  averageCost: number;
  category?: Category | null;
};

// Stock Lot Types
export type StockLot = InferSelectModel<typeof stockLots>;
export type NewStockLot = Omit<
  InferInsertModel<typeof stockLots>,
  "id" | "organizationId" | "createdAt"
>;

export type StockInfo = {
  productId: string;
  totalStock: number;
  averageCost: number;
  lots: StockLot[];
};

// Sale Types
export type Sale = InferSelectModel<typeof sales>;
export type NewSale = Omit<
  InferInsertModel<typeof sales>,
  "id" | "organizationId" | "receiptNo" | "createdAt"
>;

export type SaleWithItems = Sale & {
  items: SaleItemWithProduct[];
};

// Sale Item Types
export type SaleItem = InferSelectModel<typeof saleItems>;
export type NewSaleItem = Omit<InferInsertModel<typeof saleItems>, "id" | "createdAt">;

export type SaleItemWithProduct = SaleItem & {
  product: Product;
};

// Cart Types (Frontend only)
export type CartItem = {
  product: Product;
  quantity: number;
};

// Sale Summary Types
export type SalesSummary = {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  salesCount: number;
  startDate: Date;
  endDate: Date;
};

// Input Types for GraphQL
export type CreateProductInput = Omit<NewProduct, "isActive">;
export type UpdateProductInput = Partial<CreateProductInput> & { isActive?: boolean };

export type AddStockLotInput = {
  productId: string;
  quantity: number;
  costPrice: number;
  supplier?: string | null;
  notes?: string | null;
  purchasedAt?: Date;
};

export type CreateSaleInput = {
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  paymentMethod: "cash" | "card";
  notes?: string | null;
};
