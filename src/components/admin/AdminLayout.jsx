import { useState } from 'react'
import { LayoutDashboard, Package, ShoppingCart, Truck, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function AdminLayout({ children, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'delivery', label: 'Delivery Settings', icon: <Truck className="w-5 h-5" /> },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-darkBg text-softWhite flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-darkBg2 border-b border-white/10 sticky top-0 z-50">
        <h1 className="font-syne font-bold text-xl text-gold">BB Admin</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-darkBg2 border-r border-white/10 transform transition-transform duration-300 md:translate-x-0 flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:block">
          <h1 className="font-syne font-bold text-2xl tracking-tighter text-gold">
            Bite Bills <span className="text-white">Admin</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 md:mt-0">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left font-medium ${
                activeTab === item.id 
                  ? 'bg-gold/10 text-gold border border-gold/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors text-left font-medium"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}