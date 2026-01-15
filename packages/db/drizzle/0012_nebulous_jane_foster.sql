CREATE TYPE "public"."stock_log_reference_type" AS ENUM('sale', 'purchase', 'manual');--> statement-breakpoint
CREATE TYPE "public"."stock_log_type" AS ENUM('PURCHASE', 'SALE', 'REFUND', 'ADJUSTMENT');--> statement-breakpoint
DROP INDEX IF EXISTS "stock_lots_supplier_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "sales_type_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "sales_original_sale_id_idx";--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "type" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "stock_lots" ADD COLUMN "supplier" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sales" ADD CONSTRAINT "sales_original_sale_id_sales_id_fk" FOREIGN KEY ("original_sale_id") REFERENCES "public"."sales"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
