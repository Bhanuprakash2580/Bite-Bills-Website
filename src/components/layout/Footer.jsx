import { Link } from 'react-router-dom'
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function Footer() {
  return (
    <footer className="bg-darkBg text-softWhite/80 pt-16 pb-8 border-t border-darkBg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <h2 className="font-syne font-bold text-3xl text-white tracking-tighter">
              Bite Bills 🍪
            </h2>
            <p className="text-sm">
              Real ingredients. Real passion. Nizamabad’s favorite cookies and eggless cakes baked fresh on order.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href={BUSINESS_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-[#E1306C] transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href={BUSINESS_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="text-white hover:text-[#25D366] transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h3 className="font-syne font-bold text-lg text-white mb-6">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/collections/all" className="hover:text-gold transition-colors">Shop All</Link></li>
              <li><Link to="/collections/new-arrivals" className="hover:text-gold transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections/gifts" className="hover:text-gold transition-colors">Gifts & Combos</Link></li>
              <li><Link to="/collections/cookies" className="hover:text-gold transition-colors">Cookies</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Bakery Blog</Link></li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h3 className="font-syne font-bold text-lg text-white mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-gold transition-colors">About Bite Bills</Link></li>
              <li><Link to="/delivery-info" className="hover:text-gold transition-colors">Delivery Info</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/help" className="hover:text-gold transition-colors">Help & Support</Link></li>
              <li><Link to="/security" className="hover:text-gold transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h3 className="font-syne font-bold text-lg text-white mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-gold transition-colors">Refund Policy</Link></li>
              <li><Link to="/login" className="hover:text-gold transition-colors">Customer Login</Link></li>
              <li><Link to="/admin" className="hover:text-gold transition-colors text-white/10 italic">Internal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-darkBg2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-softWhite/50">
            &copy; {new Date().getFullYear()} Bite Bills. All rights reserved.
          </p>
          <div className="flex gap-2">
            {/* Simple text or SVG icons for payments */}
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-white">UPI</span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-white">Visa</span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-white">Mastercard</span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-white">Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}