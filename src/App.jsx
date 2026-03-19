import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import WhatsAppButton from './components/ui/WhatsAppButton'

// Pages
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import GiftsPage from './pages/GiftsPage'
import NewArrivalsPage from './pages/NewArrivalsPage'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SuccessPage from './pages/SuccessPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import NotFoundPage from './pages/NotFoundPage'
import AboutPage from './pages/AboutPage'
import DeliveryPage from './pages/DeliveryPage'
import ContactPage from './pages/ContactPage'
import HelpPage from './pages/HelpPage'
import SecurityPage from './pages/SecurityPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import RefundPage from './pages/RefundPage'
import BlogPage from './pages/BlogPage'
import CookiesPage from './pages/CookiesPage'

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
  const { cartOpen } = useUIStore()

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

        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/collections/all" element={<MainLayout><ShopPage /></MainLayout>} />
          <Route path="/collections/new-arrivals" element={<MainLayout><NewArrivalsPage /></MainLayout>} />
          <Route path="/collections/gifts" element={<MainLayout><GiftsPage /></MainLayout>} />
          <Route path="/products/:slug" element={<MainLayout><ProductDetailPage /></MainLayout>} />
          
          <Route path="/collections/cookies" element={<MainLayout><CookiesPage /></MainLayout>} />
          
          {/* Info & Legal Pages */}
          <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
          <Route path="/delivery-info" element={<MainLayout><DeliveryPage /></MainLayout>} />
          <Route path="/help" element={<MainLayout><HelpPage /></MainLayout>} />
          <Route path="/security" element={<MainLayout><SecurityPage /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
          <Route path="/terms" element={<MainLayout><TermsPage /></MainLayout>} />
          <Route path="/privacy" element={<MainLayout><PrivacyPage /></MainLayout>} />
          <Route path="/refund-policy" element={<MainLayout><RefundPage /></MainLayout>} />

          <Route path="/cart" element={<Navigate to="/checkout" replace />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <MainLayout><CheckoutPage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <MainLayout><ProfilePage /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order-success" element={<SuccessPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
        </Routes>

      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App