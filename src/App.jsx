import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import AuthModal from './components/auth/AuthModal'
import WhatsAppButton from './components/ui/WhatsAppButton'

// Pages
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import GiftsPage from './pages/GiftsPage'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

// Store
import { useUIStore } from './store/uiStore'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-darkBg">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      {/* Floating Buttons */}
      <WhatsAppButton />
    </div>
  )
}

function App() {
  const { cartOpen, authModalOpen } = useUIStore()

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#2A1810',
              color: '#F4E7D3',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: { iconTheme: { primary: '#C89A5A', secondary: '#2A1810' } }
          }}
        />

        <CartDrawer open={cartOpen} />
        <AuthModal open={authModalOpen} />

        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/collections/all" element={<MainLayout><ShopPage /></MainLayout>} />
          <Route path="/collections/gifts" element={<MainLayout><GiftsPage /></MainLayout>} />
          <Route path="/products/:slug" element={<MainLayout><ProductDetailPage /></MainLayout>} />
          <Route path="/cart" element={<Navigate to="/checkout" replace />} />
          <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
          <Route path="/account" element={<MainLayout><ProfilePage /></MainLayout>} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
        </Routes>

      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App