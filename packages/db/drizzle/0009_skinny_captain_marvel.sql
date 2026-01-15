CREATE TYPE "public"."sale_type" AS ENUM('SALE', 'REFUND');--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "type" "sale_type" DEFAULT 'SALE' NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "original_sale_id" uuid;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sales_type_idx" ON "sales" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sales_original_sale_id_idx" ON "sales" USING btree ("original_sale_id");