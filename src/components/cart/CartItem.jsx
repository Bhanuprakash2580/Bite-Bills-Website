import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { formatCurrency } from '../../lib/utils'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex gap-4 bg-darkBg2 p-4 rounded-2xl border border-white/5 relative group">
      {/* Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 pb-1">
        <div className="flex justify-between pr-8">
          <h4 className="font-syne font-bold text-cream text-lg leading-tight mb-1">{item.name}</h4>
        </div>
        
        <p className="text-sm font-medium text-white/40 mb-2">{item.size}</p>
        
        <div className="mt-auto flex justify-between items-center">
          {/* Quantity Controls */}
          <div className="flex items-center bg-darkBg border border-white/10 rounded-full h-8">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-full flex items-center justify-center text-white/60 hover:text-gold transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-full flex items-center justify-center text-white/60 hover:text-gold transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="font-bold text-gold">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button 
        onClick={() => removeItem(item.id)}
        className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
