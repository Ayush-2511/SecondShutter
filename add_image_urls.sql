-- Add image_urls array column to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';
