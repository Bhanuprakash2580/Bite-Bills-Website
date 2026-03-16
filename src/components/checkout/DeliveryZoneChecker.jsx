import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DeliveryZoneChecker({ isEligible, distanceKm, chargeLabel, isLoading, checkPincode, error, reset, initialPincode = '' }) {
  const [pincode, setPincode] = useState(initialPincode)

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
    <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6">
      <h3 className="font-syne font-bold text-xl text-cream mb-4">Delivery Check</h3>
      
      {!isEligible && !error ? (
        <form onSubmit={handleCheck} className="flex gap-2">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter Pincode"
            className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-darkBg text-white focus:border-gold outline-none"
            required
          />
          <button 
            type="submit" 
            disabled={isLoading || pincode.length < 6}
            className="bg-gold text-darkBg px-6 rounded-xl font-bold hover:bg-goldLight transition-colors disabled:opacity-50"
          >
            {isLoading ? '...' : 'Verify'}
          </button>
        </form>
      ) : (
        <AnimatePresence mode="wait">
          {isEligible === true && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 p-4 bg-green-900/20 border border-green-500/30 rounded-xl"
            >
              <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-400 font-bold mb-1">Delivering to {pincode}</p>
                <div className="flex justify-between items-center text-sm text-green-300/80">
                  <span>Distance: {distanceKm?.toFixed(1)} km</span>
                  <span className="font-bold">Charge: {chargeLabel}</span>
                </div>
                <button type="button" onClick={handleReset} className="text-xs text-white/40 hover:text-white underline mt-3">
                  Change Pincode
                </button>
              </div>
            </motion.div>
          )}

          {(isEligible === false || error) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl"
            >
              <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-400 font-bold mb-1">No delivery to {pincode}</p>
                <p className="text-red-300/80 text-sm">{error || 'Outside 40km radius.'}</p>
                <p className="text-white/70 text-sm mt-3 font-medium">However, you can still place an order for <span className="text-gold">Store Pickup</span>.</p>
                <button type="button" onClick={handleReset} className="text-xs text-white/40 hover:text-white underline mt-3">
                  Change Pincode
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
