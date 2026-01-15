import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/**
 * Files Database Schema
 * Multi-tenant: All records belong to an organization
 * Stores metadata for uploaded files (actual files stored in object storage)
 */

export const files = pgTable(
  "files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull(),
    // Foreign key: references organizations(id) ON DELETE CASCADE
    userId: uuid("user_id").notNull(),
    // Foreign key: references users(id)
    key: text("key").notNull().unique(), // Storage key (path in object storage)
    filename: text("filename").notNull(), // Original filename
    contentType: text("content_type").notNull(), // MIME type
    size: integer("size").notNull(), // File size in bytes
    url: text("url").notNull(), // Public URL to access file
    fileHash: text("file_hash"), // SHA-256 hash for duplicate detection
    metadata: jsonb("metadata"), // Additional metadata (e.g., image dimensions, etc.)
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_files_organization_id").on(table.organizationId),
    index("idx_files_user_id").on(table.userId),
    index("idx_files_key").on(table.key),
    index("idx_files_file_hash").on(table.fileHash),
  ]
);
