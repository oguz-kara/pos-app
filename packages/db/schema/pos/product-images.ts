import {
  pgTable,
  uuid,
  boolean,
  integer,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";
import { files } from "../files";

/**
 * Product Images Database Schema
 * Junction table linking products to their image assets
 * Supports multiple images per product with ordering and primary image designation
 */

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    fileId: uuid("file_id")
      .notNull()
      .references(() => files.id, { onDelete: "cascade" }),
    isPrimary: boolean("is_primary").default(false).notNull(),
    displayOrder: integer("display_order").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    // Index for fast product image lookups
    index("idx_product_images_product_id").on(table.productId),
    // Index for fast file usage lookups (check if file is in use)
    index("idx_product_images_file_id").on(table.fileId),
    // Composite index for primary image queries
    index("idx_product_images_product_primary").on(
      table.productId,
      table.isPrimary
    ),
    // Ensure a file is only attached to a product once
    unique("unique_product_file").on(table.productId, table.fileId),
  ]
);

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  file: one(files, {
    fields: [productImages.fileId],
    references: [files.id],
  }),
}));

export type ProductImage = typeof productImages.$inferSelect;
export type NewProductImage = typeof productImages.$inferInsert;
