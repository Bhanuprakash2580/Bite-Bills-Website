import ProductCard from './ProductCard'
import SkeletonCard from '../ui/SkeletonCard'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24 bg-darkBg2 rounded-2xl border border-white/5">
        <div className="text-4xl mb-4">🍪</div>
        <h3 className="text-xl font-syne font-bold text-cream mb-2">No cookies found</h3>
        <p className="text-white/60">Try adjusting your filters or category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
