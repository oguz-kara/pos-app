/**
 * Migration script to handle supplier data migration from varchar to foreign key
 *
 * This script:
 * 1. Creates the suppliers table
 * 2. Migrates unique supplier names from stock_lots to the suppliers table
 * 3. Updates stock_lots to reference supplier IDs
 * 4. Drops the old supplier varchar column
 *
 * Run with: pnpm tsx packages/db/migrate-suppliers.ts
 */

import { db } from "./index";
import { suppliers, stockLots } from "./schema/pos";
import { sql } from "drizzle-orm";

async function migrateSuppliers() {
  console.log("Starting supplier migration...");

  try {
    // Step 1: Extract unique suppliers from stock_lots
    console.log("Step 1: Extracting unique supplier names...");
    const uniqueSuppliers = await db.execute(sql`
      SELECT DISTINCT supplier, organization_id
      FROM stock_lots
      WHERE supplier IS NOT NULL AND supplier != ''
      ORDER BY supplier
    `);

    console.log(`Found ${uniqueSuppliers.rows.length} unique suppliers`);

    // Step 2: Insert suppliers into the new table
    console.log("Step 2: Creating supplier records...");
    const supplierMap = new Map<string, string>();

    for (const row of uniqueSuppliers.rows) {
      const supplierName = row.supplier as string;
      const orgId = row.organization_id as string;

      const [newSupplier] = await db
        .insert(suppliers)
        .values({
          name: supplierName,
          organizationId: orgId,
        })
        .returning({ id: suppliers.id });

      supplierMap.set(`${orgId}:${supplierName}`, newSupplier.id);
      console.log(`  Created supplier: ${supplierName} (${newSupplier.id})`);
    }

    // Step 3: Update stock_lots to use supplier_id
    console.log("Step 3: Updating stock lots with supplier IDs...");

    for (const [key, supplierId] of supplierMap.entries()) {
      const [orgId, supplierName] = key.split(":");

      await db.execute(sql`
        UPDATE stock_lots
        SET supplier_id = ${supplierId}
        WHERE supplier = ${supplierName} AND organization_id = ${orgId}
      `);
    }

    // Step 4: Drop the old supplier column
    console.log("Step 4: Dropping old supplier column...");
    await db.execute(sql`
      ALTER TABLE stock_lots DROP COLUMN IF EXISTS supplier
    `);

    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

// Run migration
migrateSuppliers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
