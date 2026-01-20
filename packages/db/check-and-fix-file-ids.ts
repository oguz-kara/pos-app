/**
 * Database Cleanup Script: Check and Fix Invalid File IDs
 *
 * This script checks for any file records with invalid UUIDs and reports them.
 * Run this to diagnose issues with file records that have non-UUID IDs.
 *
 * Usage:
 *   npx tsx packages/db/check-and-fix-file-ids.ts
 */

import { db } from "./index";
import { files } from "./schema/files";
import { sql } from "drizzle-orm";

/**
 * UUID validation regex
 */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validate that a string is a valid UUID
 */
function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

async function checkAndReportInvalidFileIds() {
  console.log("🔍 Checking for invalid file IDs...\n");

  try {
    // Get all files
    const allFiles = await db.select().from(files);

    console.log(`📊 Total files in database: ${allFiles.length}`);

    // Check for invalid UUIDs
    const invalidFiles = allFiles.filter(
      (file) => !isValidUUID(file.id.toString())
    );

    if (invalidFiles.length === 0) {
      console.log("✅ All file IDs are valid UUIDs!");
      return;
    }

    console.log(`\n❌ Found ${invalidFiles.length} files with invalid UUIDs:\n`);

    invalidFiles.forEach((file) => {
      console.log(`  - ID: ${file.id}`);
      console.log(`    Filename: ${file.filename}`);
      console.log(`    Organization: ${file.organizationId}`);
      console.log(`    Created: ${file.createdAt}`);
      console.log(`    URL: ${file.url}`);
      console.log("");
    });

    console.log("\n⚠️  WARNING: These files have non-UUID IDs.");
    console.log(
      "This usually indicates data corruption or migration issues."
    );
    console.log("\nRecommended actions:");
    console.log(
      "1. Check if these files are still accessible at their URLs"
    );
    console.log("2. Consider deleting these records if they're not in use");
    console.log(
      "3. If needed, you can manually delete with: DELETE FROM files WHERE id = '<invalid-id>';"
    );
    console.log("\nTo check if these files are in use, run:");
    invalidFiles.forEach((file) => {
      console.log(
        `  SELECT * FROM product_images WHERE file_id = '${file.id}';`
      );
    });
  } catch (error) {
    console.error("❌ Error checking file IDs:", error);
    throw error;
  }
}

// Run the check
checkAndReportInvalidFileIds()
  .then(() => {
    console.log("\n✅ Check complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Check failed:", error);
    process.exit(1);
  });
