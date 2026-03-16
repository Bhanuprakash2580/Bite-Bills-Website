-- Supabase SQL Setup for Bite Bills Bakery
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
  category TEXT
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_itemName ON products(itemName);
CREATE INDEX IF NOT EXISTS idx_productreviews_productName ON productreviews(productName);
CREATE INDEX IF NOT EXISTS idx_newslettersubscribers_email ON newslettersubscribers(emailAddress);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE productreviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newslettersubscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on productreviews" ON productreviews FOR SELECT USING (true);
CREATE POLICY "Allow public read access on newslettersubscribers" ON newslettersubscribers FOR SELECT USING (true);

-- Allow authenticated users to insert/update (you may want to restrict this)
CREATE POLICY "Allow authenticated insert on products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update on products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert on productreviews" ON productreviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert on newslettersubscribers" ON newslettersubscribers FOR INSERT WITH CHECK (auth.role() = 'authenticated');