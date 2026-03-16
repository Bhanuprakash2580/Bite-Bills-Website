import { Link } from 'react-router-dom'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'
import { useAuth } from '../../hooks/useAuth'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function Navbar() {
  const { setCartOpen, setAuthModalOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const cartCount = useCartStore((state) => state.getCartCount())
  const { isAuthenticated, isAdmin } = useAuth()

  const navLinks = [
    { label: 'Cookies', path: '/collections/all?category=cookies' },
    { label: 'Gifts', path: '/collections/gifts' },
    { label: 'How to Order', path: '/#how-to-order' },
    { label: 'About', path: '/#about' }
  ]

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // Just let it navigate to /account which we map below
    } else {
      setAuthModalOpen(true)
    }
  }

  return (
    <nav className="fixed w-full z-40 bg-darkBg text-softWhite border-b border-darkBg2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex flex-shrink-0 items-center gap-2">
            <span className="font-syne font-bold text-2xl tracking-tighter hover:text-gold transition-colors">
              Bite Bills 🍪
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.path.startsWith('/#') ? link.path : undefined}
                className="text-white/80 hover:text-gold font-medium text-sm transition-colors"
              >
                {link.path.startsWith('/#') ? link.label : <Link to={link.path}>{link.label}</Link>}
              </a>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-gold font-bold text-sm">
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <a href={BUSINESS_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="text-[#25D366] hover:opacity-80 transition-opacity" aria-label="WhatsApp">
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a href={BUSINESS_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="text-[#E1306C] hover:opacity-80 transition-opacity" aria-label="Instagram">
              <FaInstagram className="w-6 h-6" />
            </a>
            <button 
              onClick={() => {
                if(isAuthenticated) {
                  window.location.href = '/account'
                } else {
                  setAuthModalOpen(true)
                }
              }} 
              className="text-softWhite hover:text-gold transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="text-softWhite hover:text-gold transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-darkBg text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button + Cart */}
          <div className="flex items-center space-x-4 md:hidden">
            <button 
              onClick={() => setCartOpen(true)}
              className="text-softWhite relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-darkBg text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-softWhite"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-darkBg border-t border-darkBg2 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
               {link.path.startsWith('/#') ? (
                 <a 
                   href={link.path}
                   onClick={() => setMobileMenuOpen(false)}
                   className="block px-3 py-4 text-base font-medium text-white/90 hover:text-gold hover:bg-darkBg2 rounded-md"
                 >
                   {link.label}
                 </a>
               ) : (
                 <Link 
                   to={link.path}
                   onClick={() => setMobileMenuOpen(false)}
                   className="block px-3 py-4 text-base font-medium text-white/90 hover:text-gold hover:bg-darkBg2 rounded-md"
                 >
                   {link.label}
                 </Link>
               )}
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-darkBg2 flex justify-around">
            <a href={BUSINESS_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-[#25D366]">
              <FaWhatsapp className="w-8 h-8" />
              <span className="text-xs">WhatsApp</span>
            </a>
            <a href={BUSINESS_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 text-[#E1306C]">
              <FaInstagram className="w-8 h-8" />
              <span className="text-xs">Instagram</span>
            </a>
            <button onClick={() => { setMobileMenuOpen(false); handleAuthClick() }} className="flex flex-col items-center gap-2 text-white">
              <User className="w-8 h-8" />
              <span className="text-xs">{isAuthenticated ? 'Account' : 'Login'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}