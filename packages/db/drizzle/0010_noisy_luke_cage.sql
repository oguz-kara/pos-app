CREATE TABLE IF NOT EXISTS "daily_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"report_date" timestamp NOT NULL,
	"report_start_time" timestamp NOT NULL,
	"report_end_time" timestamp NOT NULL,
	"total_sales" numeric(12, 2) NOT NULL,
	"total_refunds" numeric(12, 2) NOT NULL,
	"total_cost" numeric(12, 2) NOT NULL,
	"gross_profit" numeric(12, 2) NOT NULL,
	"cash_sales" numeric(12, 2) NOT NULL,
	"card_sales" numeric(12, 2) NOT NULL,
	"cash_counted" numeric(12, 2),
	"cash_variance" numeric(12, 2),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "daily_reports_organization_id_idx" ON "daily_reports" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "daily_reports_report_date_idx" ON "daily_reports" USING btree ("report_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "daily_reports_report_end_time_idx" ON "daily_reports" USING btree ("report_end_time");