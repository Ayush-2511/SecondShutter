-- 1. Wipe the existing seeded products so they don't break our new schema
DELETE FROM public.products;

-- 2. Add the seller_id column, making it reference the users table
ALTER TABLE public.products
ADD COLUMN seller_id UUID REFERENCES public.users(id) NOT NULL;

-- 3. Update Row Level Security (RLS) policies for the Marketplace
-- Allow ANYONE to read products
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

-- Allow Authenticated users to INSERT products (tied to their user ID)
DROP POLICY IF EXISTS "Users can insert their own products" ON public.products;
CREATE POLICY "Users can insert their own products" 
ON public.products FOR INSERT 
WITH CHECK (auth.uid() = seller_id);
