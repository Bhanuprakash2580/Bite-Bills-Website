import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Minus, Plus, ShoppingBag, Truck } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'
import { useUIStore } from '../store/uiStore'
import { useDeliveryCharge } from '../hooks/useDeliveryCharge'
import { formatCurrency } from '../lib/utils'
import AvailabilityBadge from '../components/ui/AvailabilityBadge'
import { toast } from 'react-hot-toast'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { products, loading: productsLoading } = useProducts()
  const addItem = useCartStore(state => state.addItem)
  const setCartOpen = useUIStore(state => state.setCartOpen)
  const { checkPincode, chargeLabel, isEligible, isLoading: deliveryLoading, reset } = useDeliveryCharge()

  const [quantity, setQuantity] = useState(1)
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [pincode, setPincode] = useState('')

  const product = useMemo(() => {
    return products?.find(p => p.slug === slug)
  }, [products, slug])

  if (productsLoading) {
    return <div className="min-h-screen bg-darkBg flex items-center justify-center text-white">Loading...</div>
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center text-white p-4 text-center">
        <h1 className="text-4xl font-syne font-bold mb-4">Product Not Found</h1>
        <p className="mb-8 text-white/60">The cookie monster might have eaten this page.</p>
        <Link to="/collections/all" className="bg-gold text-darkBg px-6 py-3 rounded-full font-bold">Back to Shop</Link>
      </div>
    )
  }

  const selectedVariant = product.variants?.[selectedVariantIdx] || { size: 'Standard', price: product.base_price }

  const handleAddToCart = () => {
    if (!product.is_available) return
    addItem(product, selectedVariant, quantity)
    setCartOpen(true)
    toast.success(`Added ${quantity} to cart`)
  }

  const handlePincodeCheck = (e) => {
    e.preventDefault()
    if (pincode.length >= 6) {
      checkPincode(pincode)
    }
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Bite Bills — Baked Fresh on Order</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/collections/all" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left: Images */}
            <div className="space-y-4">
              <div className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-darkBg2 border border-white/5">
                <AvailabilityBadge isAvailable={product.is_available} />
                <img 
                  src={product.images?.[activeImageIdx] || product.images?.[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              {product.images?.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImageIdx === idx ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-syne font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-bold text-gold mb-6">
                  {formatCurrency(selectedVariant.price)}
                </p>
                <p className="text-white/80 text-lg leading-relaxed mix-blend-plus-lighter">
                  {product.description}
                </p>
              </div>

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mb-8 border-y border-white/10 py-6">
                  <h4 className="font-syne font-bold mb-4">Choose Size / Options:</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`px-6 py-3 rounded-xl border transition-all ${
                          selectedVariantIdx === idx 
                            ? 'border-gold bg-gold/10 text-white shadow-inner font-bold' 
                            : 'border-white/20 text-white/70 hover:border-white/50 bg-darkBg2'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Quantity */}
                <div className="flex items-center border border-white/20 rounded-full bg-darkBg2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:text-gold transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:text-gold transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.is_available}
                  className="flex-1 bg-gold text-darkBg font-bold text-lg rounded-full py-4 flex items-center justify-center gap-2 hover:bg-goldLight transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-gold/10"
                >
                  {product.is_available ? (
                    <>
                      <ShoppingBag className="w-5 h-5" /> Add to Cart — {formatCurrency(selectedVariant.price * quantity)}
                    </>
                  ) : (
                    'Out of Stock'
                  )}
                </button>
              </div>

              {/* Delivery Checker Box inside Product Page */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4 text-cream font-syne font-bold">
                  <Truck className="w-5 h-5" /> Check Delivery Status
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                      reset()
                    }}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-darkBg text-white focus:border-gold outline-none"
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={deliveryLoading || pincode.length < 6}
                    className="bg-white/10 px-6 rounded-xl hover:bg-white/20 transition-colors font-medium disabled:opacity-50"
                  >
                    {deliveryLoading ? '...' : 'Check'}
                  </button>
                </form>
                
                {isEligible === true && (
                  <p className="text-green-400 text-sm font-medium">✅ We deliver to you! Charge: {chargeLabel}</p>
                )}
                {isEligible === false && (
                  <p className="text-red-400 text-sm font-medium">❌ Outside 40km delivery radius. Pickup available.</p>
                )}
              </div>

              {/* Ingredients List */}
              {product.ingredients?.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="font-syne font-bold mb-3 text-cream">Made With:</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </>
  )
}