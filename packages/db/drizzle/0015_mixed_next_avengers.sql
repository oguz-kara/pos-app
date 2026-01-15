-- Update existing NULL values to 'SALE' before setting NOT NULL
UPDATE "sales" SET "type" = 'SALE' WHERE "type" IS NULL;--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "type" SET DEFAULT 'SALE';--> statement-breakpoint
ALTER TABLE "sales" ALTER COLUMN "type" SET NOT NULL;