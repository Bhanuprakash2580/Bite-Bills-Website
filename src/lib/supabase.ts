import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Temporarily disable Supabase connection for testing
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables. Please check your .env file.')
// }

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database table names (matching your existing interfaces)
export const TABLES = {
  PRODUCTS: 'products',
  PRODUCT_REVIEWS: 'productreviews',
  NEWSLETTER_SUBSCRIBERS: 'newslettersubscribers'
} as const