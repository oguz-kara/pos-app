// Load environment variables first (for standalone scripts)
import { config } from "dotenv";
import { resolve } from "path";

// Try to load .env from apps/web/ if it exists
try {
  config({ path: resolve(__dirname, "../../apps/web/.env") });
} catch (e) {
  // Ignore if .env doesn't exist (e.g., in production with env vars set)
}

import { drizzle } from "drizzle-orm/postgres-js";
import { is } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import postgres from "postgres";

// Import all schemas
import * as auth from "./schema/auth";
import * as billing from "./schema/billing";
import * as ai from "./schema/ai";
import * as files from "./schema/files";
import * as notifications from "./schema/notifications";
import * as pos from "./schema/pos";

// Create postgres connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });

// Helper to filter schema to only include tables and relations
// This excludes enums and TypeScript types
const filterSchema = (
  schemaModule: Record<string, any>
) => {
  const filtered: Record<string, any> = {};
  for (const [key, value] of Object.entries(schemaModule)) {
    // Skip TypeScript types (they're not objects at runtime)
    if (typeof value !== "object" || value === null) {
      continue;
    }

    try {
      // Check if it's a PgTable using Drizzle's is() function
      if (is(value, PgTable)) {
        filtered[key] = value;
        continue;
      }
      // Include relations (they have specific Drizzle relation properties)
      // Relations have either 'relationName' or are created by the relations() function
      if (value.isRelation || key.endsWith("Relations")) {
        filtered[key] = value;
        continue;
      }
    } catch (e) {
      // Silently skip items that cause errors
    }
  }
  return filtered;
};

// Create drizzle instance with filtered schema
export const db = drizzle(client, {
  schema: {
    ...filterSchema(auth),
    ...filterSchema(billing),
    ...filterSchema(ai),
    ...filterSchema(files),
    ...filterSchema(notifications),
    ...filterSchema(pos),
  },
});

// Export schemas
export * from "./schema/auth";
export * from "./schema/billing";
export * from "./schema/ai";
export * from "./schema/files";
export * from "./schema/notifications";
export * from "./schema/pos";
export * from "./utils/pagination";
export * from "./utils/turkish-normalize";

// Export drizzle-orm operators and types to ensure single instance
export {
  eq,
  and,
  or,
  desc,
  asc,
  sql,
  inArray,
  gte,
  lte,
  gt,
  lt,
  like,
  count,
} from "drizzle-orm";
export type { InferSelectModel, InferInsertModel } from "drizzle-orm";
