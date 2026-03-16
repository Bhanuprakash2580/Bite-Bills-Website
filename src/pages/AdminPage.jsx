import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import { supabase } from '../lib/supabase'

import AdminLayout from '../components/admin/AdminLayout'
import DashboardStats from '../components/admin/DashboardStats'
import OrdersManager from '../components/admin/OrdersManager'
import ProductsManager from '../components/admin/ProductsManager'
import DeliveryManager from '../components/admin/DeliveryManager'
import RevenueChart from '../components/admin/RevenueChart'

export default function AdminPage() {
  const { user, isAdmin, isAuthenticated, loading: authLoading } = useAuth()
  const { products } = useProducts()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard, orders, products, delivery
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !isAdmin) {
        navigate('/')
      }
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate])

  useEffect(() => {
    if (isAdmin) {
      // Setup realtime orders full sync
      const fetchInitialOrders = async () => {
        const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
        if (data) setOrders(data)
        setLoadingOrders(false)
      }

      fetchInitialOrders()

      const channel = supabase.channel('admin-orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchInitialOrders)
        .subscribe()

      return () => supabase.removeChannel(channel)
    }
  }, [isAdmin])

  if (authLoading || !isAdmin || loadingOrders) {
    return <div className="min-h-screen bg-darkBg flex items-center justify-center text-white">Loading Admin...</div>
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-syne font-bold text-cream mb-2">Overview</h2>
              <p className="text-white/60">Here's what's happening at Bite Bills today.</p>
            </div>
            <DashboardStats orders={orders} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RevenueChart orders={orders} />
              {/* Recent Orders Preview */}
              <div className="bg-darkBg2 border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-syne font-bold text-lg text-cream">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-gold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0,4).map(o => (
                    <div key={o.id} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="font-bold text-white/90">{o.order_number}</div>
                        <div className="text-xs text-white/50">{o.delivery_address?.name || o.guest_name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gold font-bold">₹{o.total}</div>
                        <div className={`text-xs ${o.status === 'pending' ? 'text-orange-400' : 'text-green-400'}`}>
                          {o.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 'orders':
        return <OrdersManager orders={orders} />
      case 'products':
        return <ProductsManager products={products} />
      case 'delivery':
        return <DeliveryManager />
      default:
        return null
    }
  }

  return (
    <>
      <Helmet><title>Admin Dashboard | Bite Bills</title></Helmet>
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </AdminLayout>
    </>
  )
}