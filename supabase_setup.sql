-- ==========================================
-- BITE BILLS SUPABASE STRUCTURE
-- Full SQL Setup (Products, Orders, Profiles)
-- ==========================================

-- 1. Create or ensure PROFILES table exists
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  full_name TEXT,
  phone TEXT,
  addresses JSONB DEFAULT '[]'::jsonb
);

-- Turn on RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Create ORDERS table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users,
  order_number TEXT NOT NULL DEFAULT ('BB-' || floor(random() * (999999-100000+1) + 100000)::text),
  customer_name TEXT,
  phone TEXT,
  address TEXT,
  items JSONB,
  total NUMERIC,
  status TEXT DEFAULT 'pending', -- pending, preparing, dispatch, delivered
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed
  payment_id TEXT,
  delivery_date DATE,
  special_instructions TEXT,
  order_source TEXT DEFAULT 'website' -- website, whatsapp, instagram
);

-- Turn on RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies for orders
CREATE POLICY "Users can view own orders." ON public.orders
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert own orders." ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
-- Note: Admin updates would typically bypass RLS if using a service role key,
-- or you can add a policy confirming admin status.

-- 3. Create PRODUCTS table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  base_price NUMERIC NOT NULL,
  is_available BOOLEAN DEFAULT true,
  is_bestseller BOOLEAN DEFAULT false,
  is_eggless BOOLEAN DEFAULT true,
  tags TEXT[] DEFAULT '{}',
  variants JSONB DEFAULT '[]'::jsonb,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  ingredients TEXT[],
  display_order INTEGER DEFAULT 0
);

-- Turn on RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Products are viewable by everyone." ON public.products
  FOR SELECT USING (true);
-- Admin can manage products via dashboard or direct SQL

-- ==========================================
-- REALTIME SUBSCRIPTIONS
-- ==========================================
-- Enable Replication for realtime updates on orders and products
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE orders, products;

-- ==========================================
-- IMPORTANT NOTICE:
-- By default I've left the products table empty because `useProducts.js` 
-- automatically falls back to `mockProducts` in `src/constants/products.js`
-- if the Supabase table is empty. 
-- 
-- If you want to move products into Supabase, you can copy the data
-- from `src/constants/products.js` and INSERT here. For now, the mock file
-- acts as the primary source of truth perfectly fine!
-- ==========================================
