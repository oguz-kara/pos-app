import { decimal, index, integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";
import { sales } from "./sales";

export const saleItems = pgTable(
  "sale_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    saleId: uuid("sale_id")
      .notNull()
      .references(() => sales.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull(),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(), // price at sale time
    unitCost: decimal("unit_cost", { precision: 10, scale: 2 }).notNull(), // avg cost at sale time
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    saleIdIdx: index("sale_items_sale_id_idx").on(table.saleId),
  })
);

export type SaleItem = typeof saleItems.$inferSelect;
export type NewSaleItem = typeof saleItems.$inferInsert;
