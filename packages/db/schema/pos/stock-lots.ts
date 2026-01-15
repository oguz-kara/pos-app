import {
  decimal,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { organizations } from "../auth";
import { products } from "./products";
import { suppliers } from "./suppliers";

export const stockLots = pgTable(
  "stock_lots",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    supplierId: uuid("supplier_id").references(() => suppliers.id, {
      onDelete: "set null",
    }),
    quantity: integer("quantity").notNull(), // purchased quantity
    remaining: integer("remaining").notNull(), // current remaining (can be negative)
    costPrice: decimal("cost_price", { precision: 10, scale: 2 }).notNull(),
    supplier: varchar("supplier", { length: 255 }), // optional (legacy field, use supplierId instead)
    notes: text("notes"), // optional
    purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    organizationIdIdx: index("stock_lots_organization_id_idx").on(
      table.organizationId
    ),
    productIdPurchasedAtIdx: index("stock_lots_product_id_purchased_at_idx").on(
      table.productId,
      table.purchasedAt
    ),
  })
);

export const stockLotsRelations = relations(stockLots, ({ one }) => ({
  product: one(products, {
    fields: [stockLots.productId],
    references: [products.id],
  }),
  supplier: one(suppliers, {
    fields: [stockLots.supplierId],
    references: [suppliers.id],
  }),
  organization: one(organizations, {
    fields: [stockLots.organizationId],
    references: [organizations.id],
  }),
}));

export type StockLot = typeof stockLots.$inferSelect;
export type NewStockLot = typeof stockLots.$inferInsert;
