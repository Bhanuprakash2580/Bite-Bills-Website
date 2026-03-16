import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  category: 'Cookies' | 'Cupcakes' | 'Brownies';
  price: number;
  old_price?: number;
  rating: number;
  review_count: number;
  bakery_name: string;
  delivery_time: string;
  image_url: string;
  description: string;
  ingredients: string[];
  is_trending: boolean;
  discount_percent?: number;
  created_at: string;
}

export const useProducts = (filters?: {
  search?: string;
  category?: string;
  sort?: string;
  price?: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('products').select('*');

      // Apply filters
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,bakery_name.ilike.%${filters.search}%`);
      }

      if (filters?.category && filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }

      // Apply sorting
      if (filters?.sort) {
        switch (filters.sort) {
          case 'Popular':
            query = query.order('review_count', { ascending: false });
            break;
          case 'Top Rated':
            query = query.order('rating', { ascending: false });
            break;
          case 'Price Low-High':
            query = query.order('price', { ascending: true });
            break;
          case 'Price High-Low':
            query = query.order('price', { ascending: false });
            break;
          case 'Fastest Delivery':
            query = query.order('delivery_time', { ascending: true });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply price filter
      if (filters?.price) {
        switch (filters.price) {
          case 'Under ₹200':
            query = query.lt('price', 200);
            break;
          case '₹200-₹400':
            query = query.gte('price', 200).lte('price', 400);
            break;
          case 'Above ₹400':
            query = query.gt('price', 400);
            break;
        }
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const getRelatedProducts = async (productId: string, category: string, limit = 4): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .neq('id', productId)
        .order('rating', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching related products:', err);
      return [];
    }
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    getProductById,
    getRelatedProducts,
  };
};