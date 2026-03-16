import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Eye } from 'lucide-react'
import AvailabilityBadge from '../ui/AvailabilityBadge'
import { formatCurrency } from '../../lib/utils'
import { useCartStore } from '../../store/cartStore'
import { useUIStore } from '../../store/uiStore'
import { toast } from 'react-hot-toast'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const setCartOpen = useUIStore(state => state.setCartOpen)

  // Quick Add handler
  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.is_available) {
      toast.error('This item is currently out of stock')
      return 
    }

    // Add first variant by default
    const defaultVariant = product.variants?.[0] || { size: 'Standard', price: product.base_price }
    addItem(product, defaultVariant, 1)
    setCartOpen(true)
    toast.success(`Added ${product.name} to cart`)
  }

  return (
    <Link 
      to={`/products/${product.slug}`}
      className="group block bg-darkBg2 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-300 relative flex flex-col h-full shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Availability Badge */}
      <AvailabilityBadge isAvailable={product.is_available} />

      {/* Image Gallery */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#3c2a21]">
        <img 
          src={product.images?.[0]} 
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered && product.images?.[1] ? 'opacity-0' : 'opacity-100'}`}
        />
        {product.images?.[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 transform scale-105 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        
        {/* Quick Add Overlay Mobile/Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex justify-center z-20">
          <button
            onClick={handleQuickAdd}
            disabled={!product.is_available}
            className="bg-gold text-darkBg w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-goldLight transition-colors shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.is_available ? (
              <>
                <ShoppingBag className="w-5 h-5" /> Quick Add
              </>
            ) : (
              'Out of Stock'
            )}
          </button>
        </div>
        
        {/* Always visible linear gradient at bottom to read text clearly */}
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg2/80 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow relative z-10 bg-darkBg2">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-syne font-bold text-xl text-cream leading-tight">
            {product.name}
          </h3>
          <span className="font-bold text-lg text-gold whitespace-nowrap">
            {formatCurrency(product.base_price)}
          </span>
        </div>
        
        <p className="text-white/60 text-sm mb-4 line-clamp-2 mt-auto">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/70 uppercase tracking-widest">
            {product.category}
          </span>
          {product.is_eggless && (
            <span className="px-2 py-1 bg-[#25D366]/10 text-[#25D366] rounded text-xs font-medium">
              Eggless
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
