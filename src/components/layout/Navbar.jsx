import { Link } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ShoppingBag, User, Menu, X, LogOut, Package, MapPin, Settings } from 'lucide-react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'
import { useAuth } from '../../hooks/useAuth'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function Navbar() {
  const { setCartOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const cartCount = useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0))
  const { isAuthenticated, logout, name } = useAuth()

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Items', path: '/collections/all' },
    { label: 'New Arrivals', path: '/collections/new-arrivals' },
    { label: 'Gifts', path: '/collections/gifts' },
    { label: 'About', path: '/#about' },
    { label: 'Orders', path: '/account' }
  ]

  const handleAuthClick = () => {
    if (!isAuthenticated) {
      window.location.href = '/login'
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

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.path}
                  className="text-white/80 hover:text-gold font-medium text-sm transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-white/80 hover:text-gold font-medium text-sm transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <a href={BUSINESS_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="text-[#25D366] hover:opacity-80 transition-opacity" aria-label="WhatsApp">
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a href={BUSINESS_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="text-[#E1306C] hover:opacity-80 transition-opacity" aria-label="Instagram">
              <FaInstagram className="w-6 h-6" />
            </a>
            {/* User Profile Dropdown */}
            {isAuthenticated ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-2 text-softWhite hover:text-gold transition-colors group outline-none">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-all">
                      <User className="w-4 h-4 text-gold" />
                    </div>
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content 
                    className="z-[50] min-w-[200px] bg-darkBg2 border border-white/10 rounded-2xl p-2 shadow-2xl animate-in fade-in zoom-in duration-200"
                    sideOffset={10}
                    align="end"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                       <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-0.5">Welcome back</p>
                       <p className="text-sm font-bold text-white truncate">{name}</p>
                    </div>

                    <DropdownMenu.Item asChild>
                      <Link to="/account" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl outline-none cursor-pointer transition-colors">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item asChild>
                      <Link to="/account?tab=orders" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl outline-none cursor-pointer transition-colors">
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item asChild>
                      <Link to="/account?tab=addresses" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl outline-none cursor-pointer transition-colors">
                        <MapPin className="w-4 h-4" /> Addresses
                      </Link>
                    </DropdownMenu.Item>

                    <div className="h-px bg-white/5 my-2" />

                    <DropdownMenu.Item 
                      onClick={logout}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl outline-none cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className="fill-darkBg2" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <button
                onClick={() => window.location.href = '/login'}
                className="text-softWhite hover:text-gold transition-colors"
                aria-label="Login"
              >
                <User className="w-5 h-5" />
              </button>
            )}
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
            <Link to={isAuthenticated ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors">
              <User className="w-8 h-8" />
              <span className="text-xs font-bold">{isAuthenticated ? 'Account' : 'Login'}</span>
            </Link>
            {isAuthenticated && (
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="flex flex-col items-center gap-2 text-red-400/80 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-8 h-8" />
                <span className="text-xs font-bold">Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}