import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../products/ProductCard'
import { useProducts } from '../../hooks/useProducts'

export default function BestSellers() {
  const { products, loading } = useProducts()

  // Find bestsellers, normally we'd filter by is_bestseller
  const bestsellers = products?.filter(p => p.is_bestseller).slice(0, 4) || []

  if (loading) {
    return (
      <section className="py-24 bg-darkBg text-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/50">
          Loading Bestsellers...
        </div>
      </section>
    )
  }

  if (bestsellers.length === 0) return null

  return (
    <section className="py-24 bg-darkBg text-softWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-syne font-bold mb-4">
              Our Bestsellers 🏆
            </h2>
            <p className="text-lg text-white/60">
              The crowd favorites. The repeat orders. The ones you can't go wrong with.
            </p>
          </div>
          <Link 
            to="/collections/all?sort=bestselling"
            className="group flex items-center gap-2 text-gold font-bold hover:text-white transition-colors"
          >
            Shop All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}