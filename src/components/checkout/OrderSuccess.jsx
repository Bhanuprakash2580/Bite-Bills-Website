import { Link } from 'react-router-dom'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function OrderSuccess({ orderId }) {
  const whatsappMsg = encodeURIComponent(`Hi Bite Bills! I just placed order ${orderId}. Can I get an update?`)

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-darkBg2 border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gold/5 animate-pulse pointer-events-none"></div>

        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
        
        <h2 className="text-4xl font-syne font-bold mb-2">Order Confirmed!</h2>
        <p className="text-xl text-white/60 mb-8 font-medium">Order ID: <span className="text-gold">{orderId}</span></p>

        <div className="bg-darkBg rounded-xl p-6 mb-8 border border-white/5">
          <h4 className="font-bold text-lg mb-2 text-cream">Estimated Time</h4>
          <p className="text-white/70">2-3 hours for local areas. Next day for distances over 20km.</p>
        </div>

        <div className="flex flex-col gap-4">
          <a 
            href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#1ebd5a] transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Get updates on WhatsApp
          </a>

          <Link 
            to="/" 
            className="font-bold text-white/60 hover:text-white py-4 transition-colors"
          >
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  )
}
