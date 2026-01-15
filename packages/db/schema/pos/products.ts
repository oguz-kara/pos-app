import {
  boolean,
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { organizations } from "../auth";
import { categories } from "./categories";
import { productImages } from "./product-images";

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1000 }),
    searchName: varchar("search_name", { length: 255 })
      .notNull()
      .$defaultFn(() => ""), // Database trigger will set this, but TypeScript needs a default
    barcode: varchar("barcode", { length: 100 }),
    sellingPrice: decimal("selling_price", {
      precision: 10,
      scale: 2,
    }).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    organizationIdIdx: index("products_organization_id_idx").on(
      table.organizationId
    ),
    barcodeIdx: index("products_barcode_idx").on(table.barcode),
  })
);

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  organization: one(organizations, {
    fields: [products.organizationId],
    references: [organizations.id],
  }),
  images: many(productImages),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
