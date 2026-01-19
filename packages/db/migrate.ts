import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../apps/web/.env") });

const runMigrations = async () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  console.log("🔄 Running database migrations...");

  // Create connection for migrations
  const migrationConnection = postgres(databaseUrl, { max: 1 });
  const db = drizzle(migrationConnection);

  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Migrations completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  } finally {
    await migrationConnection.end();
  }
};

runMigrations().catch((err) => {
  console.error(err);
  process.exit(1);
});
