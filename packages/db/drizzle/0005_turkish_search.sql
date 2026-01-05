-- Enable pg_trgm extension for trigram fuzzy matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

--> statement-breakpoint

-- Create Turkish character normalization function
CREATE OR REPLACE FUNCTION normalize_turkish(text TEXT)
RETURNS TEXT AS $$
BEGIN
  IF text IS NULL OR text = '' THEN
    RETURN '';
  END IF;

  RETURN LOWER(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    -- Handle uppercase first
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(text,
      'İ', 'i'),  -- Turkish dotted capital I
      'I', 'i'),  -- Turkish dotless capital I
      'Ç', 'c'),
      'Ğ', 'g'),
      'Ö', 'o'),
      'Ş', 's'),
      'Ü', 'u'),
    -- Handle lowercase
      'ç', 'c'),
      'ğ', 'g'),
      'ı', 'i'),
      'ö', 'o'),
      'ş', 's'),
      'ü', 'u')
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

--> statement-breakpoint

-- Add search_name column to products table
ALTER TABLE "products" ADD COLUMN "search_name" varchar(255);

--> statement-breakpoint

-- Populate search_name for existing products
UPDATE "products" SET "search_name" = normalize_turkish("name");

--> statement-breakpoint

-- Make search_name NOT NULL after populating
ALTER TABLE "products" ALTER COLUMN "search_name" SET NOT NULL;

--> statement-breakpoint

-- Create trigger function to auto-update search_name
CREATE OR REPLACE FUNCTION update_product_search_name()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_name := normalize_turkish(NEW.name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--> statement-breakpoint

-- Create trigger to auto-update search_name on INSERT or UPDATE
CREATE TRIGGER products_search_name_trigger
  BEFORE INSERT OR UPDATE OF name
  ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_product_search_name();

--> statement-breakpoint

-- Create GIN trigram indexes for fuzzy search
CREATE INDEX IF NOT EXISTS "products_search_name_trgm_idx" ON "products" USING gin ("search_name" gin_trgm_ops);

--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "products_barcode_trgm_idx" ON "products" USING gin ("barcode" gin_trgm_ops);

--> statement-breakpoint

-- Create regular index on search_name for exact/prefix matches
CREATE INDEX IF NOT EXISTS "products_search_name_idx" ON "products" USING btree ("search_name");
