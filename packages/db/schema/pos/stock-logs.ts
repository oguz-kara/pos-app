import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
  timestamp,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";
import { stockLots } from "./stock-lots";

export const stockLogTypeEnum = pgEnum("stock_log_type", [
  "PURCHASE",
  "SALE",
  "REFUND",
  "ADJUSTMENT",
]);
export const stockLogReferenceTypeEnum = pgEnum("stock_log_reference_type", [
  "sale",
  "purchase",
  "manual",
]);

export const stockLogs = pgTable(
  "stock_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    lotId: uuid("lot_id").references(() => stockLots.id, {
      onDelete: "set null",
    }),
    type: varchar("type", { length: 20 }).notNull(), // PURCHASE, SALE, REFUND, ADJUSTMENT
    quantity: integer("quantity").notNull(), // Positive for additions, negative for deductions
    referenceType: varchar("reference_type", { length: 20 }), // sale, purchase, manual
    referenceId: uuid("reference_id"), // saleId or stockLotId
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    organizationIdIdx: index("stock_logs_organization_id_idx").on(
      table.organizationId
    ),
    productIdIdx: index("stock_logs_product_id_idx").on(table.productId),
    createdAtIdx: index("stock_logs_created_at_idx").on(table.createdAt),
    typeIdx: index("stock_logs_type_idx").on(table.type),
  })
);

export const stockLogsRelations = relations(stockLogs, ({ one }) => ({
  product: one(products, {
    fields: [stockLogs.productId],
    references: [products.id],
  }),
  lot: one(stockLots, {
    fields: [stockLogs.lotId],
    references: [stockLots.id],
  }),
}));

export type StockLog = typeof stockLogs.$inferSelect;
export type NewStockLog = typeof stockLogs.$inferInsert;
