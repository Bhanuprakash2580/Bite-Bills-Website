import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { mockProducts } from '../constants/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    supabase.from('products').select('*').order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          console.warn('Supabase fetch failed or empty, using mock data:', error?.message)
          setProducts(mockProducts)
        } else {
          setProducts(data)
        }
        setLoading(false)
      })

    // Real-time subscription
    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setProducts(prev =>
              prev.map(p => p.id === payload.new.id ? payload.new : p)
            )
          } else if (payload.eventType === 'INSERT') {
             setProducts(prev => [...prev, payload.new])
          } else if (payload.eventType === 'DELETE') {
             setProducts(prev => prev.filter(p => p.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { products, loading }
}