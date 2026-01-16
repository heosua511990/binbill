-- Add product_type column to products table
ALTER TABLE public.products 
ADD COLUMN product_type text DEFAULT NULL;

-- Optional: Create an index for faster filtering
CREATE INDEX idx_products_product_type ON public.products(product_type);

-- Update some existing rows with sample types (optional)
UPDATE public.products SET product_type = 'Headphones' WHERE name ILIKE '%Headphones%' OR name ILIKE '%Earbuds%';
UPDATE public.products SET product_type = 'Watch' WHERE name ILIKE '%Watch%';
UPDATE public.products SET product_type = 'Speaker' WHERE name ILIKE '%Speaker%';
UPDATE public.products SET product_type = 'Camera' WHERE name ILIKE '%Camera%';
UPDATE public.products SET product_type = 'Laptop' WHERE name ILIKE '%MacBook%' OR name ILIKE '%Laptop%';
