import { pgTable, uuid, decimal, timestamp, text, index } from "drizzle-orm/pg-core";
import { organizations } from "../auth";

export const dailyReports = pgTable(
  "daily_reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    reportDate: timestamp("report_date").notNull(), // The date this report represents
    reportStartTime: timestamp("report_start_time").notNull(), // When this period started (last close time or start of day)
    reportEndTime: timestamp("report_end_time").notNull(), // When this close happened (NOW)
    totalSales: decimal("total_sales", { precision: 12, scale: 2 }).notNull(), // Sum of all SALE amounts
    totalRefunds: decimal("total_refunds", { precision: 12, scale: 2 }).notNull(), // Sum of all REFUND amounts (absolute)
    totalCost: decimal("total_cost", { precision: 12, scale: 2 }).notNull(), // Sum of costs
    grossProfit: decimal("gross_profit", { precision: 12, scale: 2 }).notNull(), // totalSales - totalRefunds - totalCost
    cashSales: decimal("cash_sales", { precision: 12, scale: 2 }).notNull(), // Cash transactions only
    cardSales: decimal("card_sales", { precision: 12, scale: 2 }).notNull(), // Card transactions only
    cashCounted: decimal("cash_counted", { precision: 12, scale: 2 }), // Physical cash counted (nullable until entered)
    cashVariance: decimal("cash_variance", { precision: 12, scale: 2 }), // cashCounted - cashSales
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    organizationIdIdx: index("daily_reports_organization_id_idx").on(table.organizationId),
    reportDateIdx: index("daily_reports_report_date_idx").on(table.reportDate),
    reportEndTimeIdx: index("daily_reports_report_end_time_idx").on(table.reportEndTime),
  })
);

export type DailyReport = typeof dailyReports.$inferSelect;
export type NewDailyReport = typeof dailyReports.$inferInsert;
