import { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'
import { useProducts } from '../hooks/useProducts'

export default function ShopPage() {
  const { products, loading } = useProducts()
  const location = useLocation()
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  // Parse URL query params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const categoryQuery = params.get('category')
    const sortQuery = params.get('sort')
    
    if (categoryQuery) setActiveCategory(categoryQuery)
    if (sortQuery) setSortBy(sortQuery)
  }, [location.search])

  const categories = useMemo(() => {
    if (!products) return []
    const cats = new Set(products.map(p => p.category))
    return Array.from(cats).filter(Boolean)
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...(products || [])]

    // Filter Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // Filter Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q)
      )
    }

    // Sort
    switch (sortBy) {
      case 'bestselling':
        result.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0))
        break
      case 'price-low':
        result.sort((a, b) => a.base_price - b.base_price)
        break
      case 'price-high':
        result.sort((a, b) => b.base_price - a.base_price)
        break
      case 'new':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
      case 'featured':
      default:
        result.sort((a, b) => a.display_order - b.display_order)
        break
    }

    return result
  }, [products, activeCategory, searchQuery, sortBy])

  return (
    <>
      <Helmet>
        <title>Order Cookies Online | Bite Bills</title>
        <meta name="description" content="Shop the best freshly baked cookies, brownies, and cupcakes." />
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-syne font-bold mb-4">
              All Treats 🍪
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Baked fresh. Delivered hot. Exactly how they should be.
            </p>
          </div>

          <ProductFilters 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <ProductGrid 
            products={filteredAndSortedProducts} 
            loading={loading} 
          />
          
        </div>
      </main>
    </>
  )
}