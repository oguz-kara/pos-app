CREATE TABLE IF NOT EXISTS "stock_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"lot_id" uuid,
	"type" varchar(20) NOT NULL,
	"quantity" integer NOT NULL,
	"reference_type" varchar(20),
	"reference_id" uuid,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock_logs" ADD CONSTRAINT "stock_logs_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stock_logs" ADD CONSTRAINT "stock_logs_lot_id_stock_lots_id_fk" FOREIGN KEY ("lot_id") REFERENCES "public"."stock_lots"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stock_logs_organization_id_idx" ON "stock_logs" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stock_logs_product_id_idx" ON "stock_logs" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stock_logs_created_at_idx" ON "stock_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stock_logs_type_idx" ON "stock_logs" USING btree ("type");