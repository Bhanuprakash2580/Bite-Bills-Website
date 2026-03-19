import { Link } from 'react-router-dom'
import { CheckCircle, ShoppingBag, MessageCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { BUSINESS_CONFIG } from '../constants/businessConfig'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center px-4 py-20 translate-y-[-5%] overflow-hidden">
      <Helmet>
        <title>Order Success | Bite Bills</title>
      </Helmet>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-darkBg2 border border-white/5 p-10 rounded-[2.5rem] text-center shadow-2xl relative z-10">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-4xl font-syne font-bold text-white mb-4">Order Placed!</h1>
        <p className="text-white/60 mb-10 leading-relaxed font-medium">
          Thank you for choosing Bite Bills. Your fresh bakes are being prepared with love and will reach you soon! 🍪
        </p>

        <div className="space-y-4">
          <Link 
            to="/account" 
            className="block w-full bg-gold text-darkBg font-bold py-4 rounded-xl hover:bg-goldLight transition-all shadow-lg shadow-gold/20"
          >
            View Order History
          </Link>
          
          <Link 
            to="/collections/all" 
            className="block w-full bg-white/5 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all border border-white/5"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Need help?</p>
          <a 
            href={BUSINESS_CONFIG.socials.whatsapp} 
            target="_blank" 
            className="flex items-center justify-center gap-2 text-green-400 font-bold hover:text-green-300 transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
