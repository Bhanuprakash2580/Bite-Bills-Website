import { MapPin, Store } from 'lucide-react'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function DeliveryChargeDisplay({ method, setMethod, isEligible, deliveryCharge }) {
  return (
    <div className="space-y-4">
      <h3 className="font-syne font-bold text-xl text-cream mb-4">How should we get it to you?</h3>

      <label className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${
        method === 'delivery' 
          ? 'border-gold bg-gold/5' 
          : 'border-white/10 hover:border-white/20 bg-darkBg2'
      } ${!isEligible ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}>
        <div className="flex h-6 items-center">
          <input
            type="radio"
            name="delivery_method"
            value="delivery"
            checked={method === 'delivery'}
            onChange={() => setMethod('delivery')}
            disabled={!isEligible}
            className="w-5 h-5 accent-gold cursor-pointer disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-1">
              <MapPin className="w-5 h-5 text-gold" /> Home Delivery
            </div>
            <p className="text-white/60 text-sm">Delivered piping hot to your door within our active radius.</p>
          </div>
          {isEligible && (
            <div className="text-right">
              {deliveryCharge === 0 ? (
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Free</span>
              ) : (
                <span className="text-gold font-bold text-xl">₹{Math.round(deliveryCharge)}</span>
              )}
            </div>
          )}
        </div>
      </label>

      <label className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${
        method === 'pickup' 
          ? 'border-gold bg-gold/5' 
          : 'border-white/10 hover:border-white/20 bg-darkBg2'
      }`}>
        <div className="flex h-6 items-center">
          <input
            type="radio"
            name="delivery_method"
            value="pickup"
            checked={method === 'pickup'}
            onChange={() => setMethod('pickup')}
            className="w-5 h-5 accent-gold cursor-pointer"
          />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-1">
              <Store className="w-5 h-5 text-gold" /> Store Pickup
            </div>
            <p className="text-white/60 text-sm line-clamp-2">Collect directly from {BUSINESS_CONFIG.address}</p>
          </div>
          <div className="text-right">
             <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Free</span>
          </div>
        </div>
      </label>
    </div>
  )
}
