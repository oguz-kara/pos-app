import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from apps/web/.env
dotenv.config({ path: path.resolve(__dirname, "../../apps/web/.env") });

export default defineConfig({
  schema: [
    "./schema/auth.ts",
    "./schema/billing.ts",
    "./schema/ai.ts",
    "./schema/files.ts",
    "./schema/pos/categories.ts",
    "./schema/pos/products.ts",
    "./schema/pos/product-images.ts",
    "./schema/pos/stock-lots.ts",
    "./schema/pos/stock-logs.ts",
    "./schema/pos/suppliers.ts",
    "./schema/pos/sales.ts",
    "./schema/pos/sale-items.ts",
    "./schema/pos/daily-reports.ts",
  ],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
