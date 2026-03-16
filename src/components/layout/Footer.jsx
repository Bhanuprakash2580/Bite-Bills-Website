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
              Handcrafted cookies baked on order. Delivered within {BUSINESS_CONFIG.delivery.maxRadiusKm}km.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href={BUSINESS_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-[#E1306C] transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href={BUSINESS_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="text-white hover:text-[#25D366] transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
              {BUSINESS_CONFIG.socials.facebook && (
                 <a href={BUSINESS_CONFIG.socials.facebook} target="_blank" rel="noreferrer" className="text-white hover:text-[#1877F2] transition-colors">
                   <FaFacebook className="w-6 h-6" />
                 </a>
              )}
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h3 className="font-syne font-bold text-lg text-white mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/collections/all?category=cookies" className="hover:text-gold transition-colors">Cookies</Link></li>
              <li><Link to="/collections/gifts" className="hover:text-gold transition-colors">Gifts</Link></li>
              <li><Link to="/collections/all?sort=bestselling" className="hover:text-gold transition-colors">Bestsellers</Link></li>
              <li><Link to="/collections/all?sort=new" className="hover:text-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Info Col */}
          <div>
            <h3 className="font-syne font-bold text-lg text-white mb-6">Info</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="/#how-to-order" className="hover:text-gold transition-colors">How to Order</a></li>
              <li><a href="/#delivery-info" className="hover:text-gold transition-colors">Delivery Info</a></li>
              <li><a href="/#contact" className="hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="font-syne font-bold text-lg text-white mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <span>{BUSINESS_CONFIG.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">💬</span>
                <a href={BUSINESS_CONFIG.socials.whatsapp} className="hover:text-[#25D366] underline underline-offset-4 decoration-white/30">WhatsApp Us</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <span>{BUSINESS_CONFIG.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">⏰</span>
                <span>Open: 9am – 9pm daily</span>
              </li>
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