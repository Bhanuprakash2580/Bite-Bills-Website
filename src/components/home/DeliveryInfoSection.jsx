import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeliveryCharge } from '../../hooks/useDeliveryCharge'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function DeliveryInfoSection() {
  const [pincode, setPincode] = useState('')
  const { isEligible, deliveryCharge, chargeLabel, distanceKm, isLoading, error, checkPincode, reset } = useDeliveryCharge()

  const handleCheck = (e) => {
    e.preventDefault()
    if (pincode.length >= 6) {
      checkPincode(pincode)
    }
  }

  const handleReset = () => {
    setPincode('')
    reset()
  }

  return (
    <section id="delivery-info" className="bg-darkBg py-24 border-y border-white/5 relative overflow-hidden text-softWhite">
      {/* Abstract concentric circles background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] rounded-full border border-dashed border-white"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-white"></div>
        <div className="absolute w-[200px] h-[200px] rounded-full border border-solid border-gold"></div>
        <div className="absolute w-4 h-4 rounded-full bg-gold"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6">
          Fresh Delivery to Your Door 🚚
        </h2>
        <p className="text-lg text-white/70 mb-12">
          Baked fresh when you order. Delivered straight to your doorstep across Our Bakery.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-darkBg2 border border-white/10 rounded-xl p-6 hover:border-gold/50 transition-colors">
            <div className="text-3xl mb-3">📍</div>
            <h4 className="font-syne font-bold text-lg text-cream mb-1">City Limits</h4>
            <p className="text-gold font-bold">FREE Delivery</p>
          </div>
          <div className="bg-darkBg2 border border-white/10 rounded-xl p-6 hover:border-gold/50 transition-colors">
            <div className="text-3xl mb-3">🛵</div>
            <h4 className="font-syne font-bold text-lg text-cream mb-1">Within 5 km</h4>
            <p className="text-gold font-bold text-sm">₹0 Charges</p>
          </div>
          <div className="bg-darkBg2 border border-white/10 rounded-xl p-6 hover:border-gold/50 transition-colors">
            <div className="text-3xl mb-3">🚗</div>
            <h4 className="font-syne font-bold text-lg text-cream mb-1">5–15 km</h4>
            <p className="text-white/60 text-sm">₹{BUSINESS_CONFIG.delivery.perKmCharge}/km</p>
          </div>
          <div className="bg-darkBg2 border border-white/10 rounded-xl p-6 opacity-80">
            <div className="text-3xl mb-3">📍</div>
            <h4 className="font-syne font-bold text-lg text-cream mb-1">Pick Up</h4>
            <p className="text-white/60 text-sm">From Our Store</p>
          </div>
        </div>

        {/* Pincode Checker Box */}
        <div className="bg-white rounded-2xl p-8 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
          <h3 className="text-2xl font-syne font-bold text-darkBg mb-2">Check availability</h3>
          <p className="text-darkBg/70 mb-6 text-sm">Not sure if we deliver to you? Enter your pincode below:</p>
          
          <form onSubmit={handleCheck} className="flex gap-2">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit Pincode"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-gold focus:outline-none text-darkBg text-lg font-medium placeholder:text-slate-400"
              required
            />
            <button
              type="submit"
              disabled={isLoading || pincode.length < 6}
              className="bg-darkBg text-white px-6 py-3 rounded-xl font-bold hover:bg-darkBg/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Checking...' : 'Check'}
            </button>
          </form>

          {/* Results Area */}
          <AnimatePresence mode="wait">
             {isEligible === true && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }} 
                 animate={{ opacity: 1, height: 'auto' }} 
                 exit={{ opacity: 0, height: 0 }}
                 className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 text-left"
               >
                 <div className="flex gap-3">
                   <div className="text-green-600 text-xl">✅</div>
                   <div>
                     <p className="text-green-800 font-bold">We deliver to you!</p>
                     <p className="text-green-700 text-sm mt-1">
                       Distance: {distanceKm?.toFixed(1)} km <br/>
                       Estimated Charge: <span className="font-bold">{chargeLabel}</span>
                     </p>
                     <button onClick={handleReset} className="text-xs text-green-600 underline mt-2">Check another</button>
                   </div>
                 </div>
               </motion.div>
             )}
             
             {(isEligible === false || error) && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }} 
                 animate={{ opacity: 1, height: 'auto' }} 
                 exit={{ opacity: 0, height: 0 }}
                 className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 text-left"
               >
                 <div className="flex gap-3">
                   <div className="text-red-600 text-xl">❌</div>
                   <div>
                     <p className="text-red-800 font-bold">Sorry, we can't deliver here</p>
                     <p className="text-red-700 text-sm mt-1">{error || 'Outside our local delivery radius.'}</p>
                     <p className="text-red-700 text-sm mt-2 font-medium">You can still order online and Pick Up from our store — Free!</p>
                     <button onClick={handleReset} className="text-xs text-red-600 underline mt-2">Check another</button>
                   </div>
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
          
          <p className="mt-6 text-xs text-darkBg/50">
            Note: You can always pick up from our store for free!
          </p>
        </div>
      </div>
    </section>
  )
}