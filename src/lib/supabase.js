import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

export async function uploadProductImage(file, productSlug) {
  const fileName = `${productSlug}-${Date.now()}.${file.name.split('.').pop()}`
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { upsert: true })
    
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)
    
  return publicUrl
}