import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Clock, Package, MapPin, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'

export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth()
  const navigate = useNavigate()
  
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/')
    }
  }, [authLoading, isAuthenticated, navigate])

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          
        if (!error && data) {
          setOrders(data)
        }
        setLoadingOrders(false)
      }
      
      fetchOrders()

      // Realtime orders update
      const channel = supabase
        .channel('user-orders')
        .on('postgres_changes', 
          { event: 'UPDATE', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` },
          (payload) => {
            setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o))
          }
        )
        .subscribe()

      return () => supabase.removeChannel(channel)
    }
  }, [user])

  if (authLoading || !user) {
    return <div className="min-h-screen bg-darkBg flex items-center justify-center text-white">Loading...</div>
  }

  const getStatusDisplay = (status) => {
    switch(status) {
      case 'pending': return { icon: <Clock className="w-5 h-5" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Pending Confirmation' }
      case 'confirmed': return { icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Confirmed' }
      case 'baking': return { icon: <Package className="w-5 h-5" />, color: 'text-orange-400', bg: 'bg-orange-400/10', label: 'Baking 🍪' }
      case 'out_for_delivery': return { icon: <Truck className="w-5 h-5" />, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Out for Delivery 🚚' }
      case 'delivered': return { icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Delivered ✅' }
      case 'cancelled': return { icon: <XCircle className="w-5 h-5" />, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Cancelled' }
      default: return { icon: <Clock className="w-5 h-5" />, color: 'text-white/50', bg: 'bg-white/5', label: status }
    }
  }

  return (
    <>
      <Helmet><title>My Account | Bite Bills</title></Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 bg-darkBg2 p-8 rounded-2xl border border-white/5">
            <div>
              <h1 className="text-3xl md:text-4xl font-syne font-bold mb-2">
                Hi, {user.user_metadata?.full_name || 'Cookie Lover'} 👋
              </h1>
              <p className="text-white/60">{user.email}</p>
            </div>
            <button 
              onClick={() => { logout(); navigate('/') }}
              className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors font-medium border border-white/10 px-4 py-2 rounded-lg hover:border-red-400/50"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-syne font-bold text-cream">Order History</h2>
            
            {loadingOrders ? (
              <p className="text-white/50">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="bg-darkBg2 border border-white/5 rounded-2xl p-8 text-center">
                <p className="text-white/60 mb-4">You haven't placed any orders yet.</p>
                <a href="/collections/all" className="text-gold font-bold hover:underline">Start Shopping</a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const statusInfo = getStatusDisplay(order.status)
                  return (
                    <div key={order.id} className="bg-darkBg2 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-gold/30 transition-colors">
                      <div className="flex flex-col md:flex-row gap-6 justify-between">
                        
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-cream">{order.order_number}</h3>
                            <span className="text-white/40 text-sm">
                              {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          
                          <div className="text-white/70 text-sm mb-4">
                            {order.items?.map(i => `${i.quantity}x ${i.name} (${i.size})`).join(', ')}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm font-medium">
                            <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${statusInfo.bg} ${statusInfo.color}`}>
                              {statusInfo.icon} {statusInfo.label}
                            </div>
                            <div className="px-3 py-1 bg-white/5 rounded-full flex items-center gap-1.5 text-white/70">
                              <MapPin className="w-4 h-4" /> {order.delivery_method === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
                            </div>
                          </div>
                        </div>

                        {/* Order Total & Action */}
                        <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                          <div className="text-left md:text-right mb-4 md:mb-0">
                            <span className="text-sm text-white/50 block mb-1">Total Amount</span>
                            <span className="text-2xl font-bold text-gold">{formatCurrency(order.total)}</span>
                          </div>
                          <span className="text-xs text-white/40 bg-darkBg px-2 py-1 rounded">
                            {order.payment_method.toUpperCase()} • {order.payment_status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
// Temporary import icons missing in scope above
import { Truck, XCircle } from 'lucide-react'