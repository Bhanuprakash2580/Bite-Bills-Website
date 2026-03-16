import { useState } from 'react'
import { Search, MapPin, Edit, Truck, CheckCircle, Package } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { formatCurrency } from '../../lib/utils'
import { toast } from 'react-hot-toast'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function OrdersManager({ orders }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState(null)

  const filteredOrders = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false
    if (search && !o.order_number.toLowerCase().includes(search.toLowerCase()) && !o.delivery_address?.name?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId)
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
      
      if (error) throw error
      toast.success(`Order marked as ${newStatus}`)
      
      // Send WhatsApp update mock
      if (newStatus === 'confirmed' || newStatus === 'out_for_delivery') {
        const order = orders.find(o => o.id === orderId)
        const phone = order?.delivery_address?.phone || order?.guest_phone
        if (phone) {
          const msg = encodeURIComponent(`Hi ${order.delivery_address?.name}, your Bite Bills order ${order.order_number} is now ${newStatus.replace('_', ' ')}! 🍪`)
          window.open(`https://wa.me/91${phone.replace(/\D/g,'').slice(-10)}?text=${msg}`, '_blank')
        }
      }
    } catch (error) {
      toast.error('Failed to update status')
      console.error(error)
    } finally {
      setUpdating(null)
    }
  }

  const getSourceBadge = (source) => {
    switch(source) {
      case 'website': return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">🌐 Website</span>
      case 'whatsapp': return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">💬 WhatsApp</span>
      case 'instagram': return <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs font-medium">📸 Instagram</span>
      case 'walkin': return <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-medium">🏪 Walk-in</span>
      default: return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs font-medium">Unknown</span>
    }
  }

  return (
    <div className="bg-darkBg2 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
      {/* Header & Filters */}
      <div className="p-6 border-b border-white/10 space-y-4">
        <h2 className="text-2xl font-syne font-bold text-cream">Orders Dashboard</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text"
              placeholder="Search order # or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-darkBg border border-white/10 rounded-lg text-white focus:border-gold outline-none"
            />
          </div>
          
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-darkBg border border-white/10 text-white py-2 px-4 rounded-lg focus:border-gold outline-none"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="baking">Baking</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm text-white/80 whitespace-nowrap">
          <thead className="text-xs uppercase bg-white/5 text-white/60 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="px-6 py-4 font-medium">Order</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Customer & Details</th>
              <th className="px-6 py-4 font-medium">Status / Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-white/40">No orders found.</td>
              </tr>
            ) : filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-colors">
                
                {/* Order Details */}
                <td className="px-6 py-4 align-top">
                  <div className="font-bold text-cream mb-1">{order.order_number}</div>
                  <div className="text-white/50 text-xs mb-2">
                    {new Date(order.created_at).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })}
                  </div>
                  <div className="font-syne font-bold text-gold">{formatCurrency(order.total)}</div>
                  <div className="text-xs text-white/40">
                    Via {order.payment_method.toUpperCase()} • {order.payment_status}
                  </div>
                </td>
                
                {/* Source */}
                <td className="px-6 py-4 align-top">
                  {getSourceBadge(order.order_source || 'website')}
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium">
                    {order.delivery_method === 'pickup' ? (
                      <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded">Store Pickup</span>
                    ) : (
                      <span className="text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Delivery ({order.distance_km?.toFixed(1) || '?'}km)</span>
                    )}
                  </div>
                </td>

                {/* Customer Items & Address */}
                <td className="px-6 py-4 align-top max-w-xs whitespace-normal">
                  <div className="font-bold text-cream">
                    {order.delivery_address?.name || order.guest_name}
                  </div>
                  <div className="text-white/60 text-xs mb-3">
                    {order.delivery_address?.phone || order.guest_phone}
                  </div>
                  
                  {/* Items compact list */}
                  <div className="bg-darkBg rounded p-2 text-xs border border-white/5 mb-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="mb-1 truncate">
                        <span className="text-white/40">{item.quantity}x</span> {item.name} <span className="text-white/40">({item.size})</span>
                      </div>
                    ))}
                  </div>

                  {order.delivery_method === 'delivery' && (
                    <div className="text-xs text-white/50 flex gap-1">
                      <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">
                        {order.delivery_address?.line1}, {order.delivery_address?.line2}, {order.delivery_address?.pincode}
                      </span>
                    </div>
                  )}
                  {order.gift_message && (
                    <div className="mt-2 text-xs bg-gold/10 text-gold p-2 rounded border border-gold/20 italic">
                      " {order.gift_message} "
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 align-top">
                  <select
                    disabled={updating === order.id}
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-bold w-full outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer ${
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                      order.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                      order.status === 'baking' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                      order.status === 'out_for_delivery' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' :
                      order.status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                      'bg-red-500/20 text-red-500 border border-red-500/50'
                    }`}
                  >
                    <option value="pending" className="bg-darkBg text-white">Pending</option>
                    <option value="confirmed" className="bg-darkBg text-white">Confirmed</option>
                    <option value="baking" className="bg-darkBg text-white">Baking</option>
                    <option value="out_for_delivery" className="bg-darkBg text-white">Out for Delivery</option>
                    <option value="delivered" className="bg-darkBg text-white">Delivered</option>
                    <option value="cancelled" className="bg-darkBg text-white">Cancelled</option>
                  </select>
                  
                  {updating === order.id && <div className="text-xs text-center mt-2 animate-pulse">Updating...</div>}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
