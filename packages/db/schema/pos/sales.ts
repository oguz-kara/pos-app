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
import { organizations } from "../auth";

export const paymentMethodEnum = pgEnum("payment_method", ["cash", "card"]);

export const sales = pgTable(
  "sales",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    receiptNo: varchar("receipt_no", { length: 50 }).notNull(), // "2025-000001"
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    totalCost: decimal("total_cost", { precision: 10, scale: 2 }).notNull(), // for profit calc
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    organizationIdCreatedAtIdx: index(
      "sales_organization_id_created_at_idx"
    ).on(table.organizationId, table.createdAt),
    receiptNoIdx: index("sales_receipt_no_idx").on(table.receiptNo),
  })
);

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;
