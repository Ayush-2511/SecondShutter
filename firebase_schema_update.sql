-- Firebase Migration Script

-- 1. Drop ALL RLS policies on ALL tables in the public schema dynamically!
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname, tablename 
        FROM pg_policies 
        WHERE schemaname = 'public' 
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
    END LOOP;
END $$;

-- 2. Disable RLS on all tables
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    ) LOOP
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', r.tablename);
    END LOOP;
END $$;

-- 3. Drop foreign keys that depend on users.id
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_seller_id_fkey;
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;
ALTER TABLE public.cart_items DROP CONSTRAINT IF EXISTS cart_items_user_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE public.trade_ins DROP CONSTRAINT IF EXISTS trade_ins_user_id_fkey;

-- 4. Change users.id to TEXT so it can store Firebase UIDs
ALTER TABLE public.users ALTER COLUMN id TYPE TEXT;

-- 5. Change related columns to TEXT
ALTER TABLE public.products ALTER COLUMN seller_id TYPE TEXT;
ALTER TABLE public.cart_items ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE public.orders ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE public.trade_ins ALTER COLUMN user_id TYPE TEXT;

-- 6. Re-add the foreign keys
ALTER TABLE public.products
ADD CONSTRAINT products_seller_id_fkey
FOREIGN KEY (seller_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE public.cart_items
ADD CONSTRAINT cart_items_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE public.orders
ADD CONSTRAINT orders_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

ALTER TABLE public.trade_ins
ADD CONSTRAINT trade_ins_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
