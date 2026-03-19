import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useUIStore } from '../../store/uiStore'
import CartItem from './CartItem'
import GiftMessageInput from './GiftMessageInput'
import { formatCurrency } from '../../lib/utils'

export default function CartDrawer({ open }) {
  const { setCartOpen } = useUIStore()
  const { items } = useCartStore()
  const navigate = useNavigate()
  const total = useCartStore((state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))

  const handleCheckout = () => {
    setCartOpen(false)
    navigate('/checkout')
  }

  // If not open and no transition libraries used specifically for the drawer wrapper, we can conditionally render or use classes
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-darkBg border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-syne font-bold text-softWhite flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-gold" />
            Your Box 🍪
          </h2>
          <button 
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-white/50 h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 opacity-50" />
              </div>
              <p className="text-lg">Your box is looking a little empty.</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="text-gold font-bold hover:underline"
              >
                Add some treats
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Gift Message Component */}
              <div className="border-t border-white/10 pt-6">
                <GiftMessageInput />
              </div>
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-darkBg2 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/70 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gold">{formatCurrency(total)}</span>
            </div>
            
            <p className="text-xs text-white/40 mb-4 text-center">
              Delivery charges and taxes calculated at checkout.
            </p>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-gold text-darkBg font-bold text-lg py-4 rounded-xl hover:bg-goldLight transition-colors shadow-xl shadow-gold/20"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  )
}