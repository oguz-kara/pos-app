ALTER TABLE "products" ADD COLUMN "sku" varchar(100);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "brand" varchar(255);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_sku_idx" ON "products" USING btree ("sku");