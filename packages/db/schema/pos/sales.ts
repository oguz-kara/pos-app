import {
  decimal,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { organizations } from "../auth";
import { saleItems } from "./sale-items";

export const paymentMethodEnum = pgEnum("payment_method", ["cash", "card"]);
export const saleTypeEnum = pgEnum("sale_type", ["SALE", "REFUND"]);

export const sales: any = pgTable(
  "sales",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    receiptNo: varchar("receipt_no", { length: 50 }).notNull().unique(), // "2025-000001" - Must be unique
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    totalCost: decimal("total_cost", { precision: 10, scale: 2 }).notNull(), // for profit calc
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    type: saleTypeEnum("type").default('SALE').notNull(), // SALE or REFUND
    originalSaleId: uuid("original_sale_id").references((): any => sales.id, { onDelete: "set null" }), // reference to original sale if this is a refund
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table): any => ({
    organizationIdCreatedAtIdx: index(
      "sales_organization_id_created_at_idx"
    ).on(table.organizationId, table.createdAt),
    receiptNoIdx: index("sales_receipt_no_idx").on(table.receiptNo),
  })
);

export const salesRelations = relations(sales, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [sales.organizationId],
    references: [organizations.id],
  }),
  items: many(saleItems),
}));

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
