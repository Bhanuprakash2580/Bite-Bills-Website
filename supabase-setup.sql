-- Supabase SQL Setup for Nandipet’s Favorite Bakery
-- Run this in your Supabase SQL Editor to create the database tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table (bakery menu items)
CREATE TABLE IF NOT EXISTS products (
  _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  _createdDate TIMESTAMPTZ DEFAULT NOW(),
  _updatedDate TIMESTAMPTZ DEFAULT NOW(),
  itemName TEXT,
  itemPrice NUMERIC,
  itemImage TEXT,
  itemDescription TEXT,
  ingredients TEXT,
  category TEXT,
  is_bestseller BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- Product Reviews table
CREATE TABLE IF NOT EXISTS productreviews (
  _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  _createdDate TIMESTAMPTZ DEFAULT NOW(),
  _updatedDate TIMESTAMPTZ DEFAULT NOW(),
  reviewText TEXT,
  rating NUMERIC,
  productName TEXT,
  reviewerName TEXT,
  reviewDate DATE
);

-- Newsletter Subscribers table
CREATE TABLE IF NOT EXISTS newslettersubscribers (
  _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  _createdDate TIMESTAMPTZ DEFAULT NOW(),
  _updatedDate TIMESTAMPTZ DEFAULT NOW(),
  emailAddress TEXT UNIQUE,
  subscriptionDate TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  firstName TEXT,
  lastName TEXT
);

-- Orders table (Sales and customer orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  order_number TEXT UNIQUE,
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT,
  phone TEXT,
  address TEXT,
  items JSONB,
  total NUMERIC,
  delivery_date DATE,
  special_instructions TEXT,
  order_source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  delivery_method TEXT DEFAULT 'home_delivery'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_itemName ON products(itemName);
CREATE INDEX IF NOT EXISTS idx_productreviews_productName ON productreviews(productName);
CREATE INDEX IF NOT EXISTS idx_newslettersubscribers_email ON newslettersubscribers(emailAddress);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE productreviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newslettersubscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on productreviews" ON productreviews FOR SELECT USING (true);
CREATE POLICY "Allow public read access on newslettersubscribers" ON newslettersubscribers FOR SELECT USING (true);

-- Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert on products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert on productreviews" ON productreviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert on newslettersubscribers" ON newslettersubscribers FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- RLS Policies for orders
CREATE POLICY "Allow authenticated insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow admin full access on orders" ON orders FOR ALL USING (true);