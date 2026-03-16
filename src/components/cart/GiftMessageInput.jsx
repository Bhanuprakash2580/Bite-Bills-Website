import { useState } from 'react'
import { Gift, ChevronDown, ChevronUp } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

export default function GiftMessageInput() {
  const { giftMessage, setGiftMessage } = useCartStore()
  const [isOpen, setIsOpen] = useState(!!giftMessage)

  return (
    <div className="bg-darkBg2 rounded-xl border border-white/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Gift className={`w-5 h-5 ${isOpen || giftMessage ? 'text-gold' : 'text-white/40'}`} />
          <span className="font-syne font-bold text-cream">Add a Gift Message?</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          <textarea
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Type your message here... We'll handwritten it on a premium card. ✨"
            className="w-full bg-darkBg border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:border-gold focus:outline-none min-h-[100px] resize-none"
            maxLength={150}
          />
          <div className="flex justify-between mt-2 text-xs">
            <span className="text-gold">Free handwritten card included!</span>
            <span className={`${giftMessage.length >= 150 ? 'text-red-400' : 'text-white/30'}`}>
              {giftMessage.length}/150
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
