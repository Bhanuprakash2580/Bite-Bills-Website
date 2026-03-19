import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { formatCurrency } from '../../lib/utils'
import { toast } from 'react-hot-toast'
import {
  Phone, MessageCircle, LogOut, Package, Truck, CheckCircle, Clock,
  Plus, Globe, Instagram, Send, X, MapPin, ShoppingBag, CreditCard, Search
} from 'lucide-react'

// ── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending: {
    label: 'Pending', icon: Clock,
    cardClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    btnActive: 'bg-yellow-500 text-white border-yellow-500',
    btnIdle: 'bg-white/5 hover:bg-yellow-500/10 text-white/40 border-white/5',
  },
  preparing: {
    label: 'Preparing', icon: Package,
    cardClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    btnActive: 'bg-orange-500 text-white border-orange-500',
    btnIdle: 'bg-white/5 hover:bg-orange-500/10 text-white/40 border-white/5',
  },
  dispatch: {
    label: 'Dispatched', icon: Truck,
    cardClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    btnActive: 'bg-blue-500 text-white border-blue-500',
    btnIdle: 'bg-white/5 hover:bg-blue-500/10 text-white/40 border-white/5',
  },
  delivered: {
    label: 'Delivered', icon: CheckCircle,
    cardClass: 'bg-green-500/10 text-green-400 border-green-500/30',
    btnActive: 'bg-green-500 text-white border-green-500',
    btnIdle: 'bg-white/5 hover:bg-green-500/10 text-white/40 border-white/5',
  },
}

const STATUS_KEYS = ['pending', 'preparing', 'dispatch', 'delivered']
const ALL_TABS = ['all', ...STATUS_KEYS]

// ── Helpers ───────────────────────────────────────────────────────────────────
function getSourceBadge(source) {
  const map = {
    instagram: { label: 'Instagram', bg: 'bg-pink-500/10 text-pink-400 border-pink-500/20', icon: '📸' },
    whatsapp:  { label: 'WhatsApp',  bg: 'bg-green-500/10 text-green-400 border-green-500/20', icon: '📱' },
    website:   { label: 'Website',   bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',   icon: '🌐' },
  }
  return map[source] || map.website
}

function calculateTotal(order) {
  if (order.total && order.total > 0) return order.total
  if (Array.isArray(order.items)) {
    return order.items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  }
  return 0
}

// ── Order Card ────────────────────────────────────────────────────────────────
function OrderCard({ order, onStatusUpdate }) {
  const [updating, setUpdating] = useState(false)

  const handleStatus = async (newStatus) => {
    setUpdating(true)
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', order.id)
    if (error) toast.error('Failed to update status')
    else toast.success(`Marked as ${STATUS_CONFIG[newStatus]?.label || newStatus}`)
    setUpdating(false)
  }

  const source = getSourceBadge(order.order_source)
  const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
  const StatusIcon = statusConf.icon
  const total = calculateTotal(order)
  const displayItems = Array.isArray(order.items) ? order.items : []
  const dateStr = order.delivery_date
    ? new Date(order.delivery_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'ASAP'
  const createdStr = new Date(order.created_at).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="bg-darkBg2 border border-white/10 rounded-[1.75rem] p-6 hover:border-gold/30 transition-all shadow-xl group">
      
      {/* ── Header row ── */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">
            #{order.order_number || order.id.slice(0, 8)} · {createdStr}
          </p>
          <h3 className="text-xl font-syne font-bold text-cream group-hover:text-gold transition-colors leading-tight">
            {order.customer_name}
          </h3>
          <a
            href={`tel:${order.phone}`}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white mt-1 transition w-fit"
          >
            <Phone className="w-3.5 h-3.5" /> {order.phone}
          </a>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Source badge */}
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${source.bg}`}>
            {source.icon} {source.label}
          </span>
          {/* Status badge */}
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusConf.cardClass} flex items-center gap-1`}>
            <StatusIcon className="w-3 h-3" /> {statusConf.label}
          </span>
        </div>
      </div>

      {/* ── Address (always visible) ── */}
      <div className="bg-black/20 border border-white/5 rounded-xl p-4 mb-4">
        <p className="text-[10px] font-bold text-gold/60 uppercase tracking-widest mb-2 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Delivery Address
        </p>
        <p className="text-white/80 text-sm leading-relaxed">
          {order.address || <span className="text-white/30 italic">No address provided</span>}
        </p>
        <p className="text-gold text-xs font-bold mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Delivery Date: {dateStr}
        </p>
      </div>

      {/* ── Items Ordered ── */}
      <div className="bg-black/20 border border-white/5 rounded-xl p-4 mb-4">
        <p className="text-[10px] font-bold text-gold/60 uppercase tracking-widest mb-2 flex items-center gap-1">
          <ShoppingBag className="w-3 h-3" /> Items Ordered
        </p>
        {displayItems.length > 0 ? (
          <div className="space-y-1">
            {displayItems.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-white/70">
                  {item.quantity}× {item.name}
                  {item.size && item.size !== 'Standard' ? ` (${item.size})` : ''}
                </span>
                <span className="text-white/40">{formatCurrency((item.price || 0) * (item.quantity || 1))}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm italic">
            {typeof order.items === 'string' ? order.items : 'No item details'}
          </p>
        )}
        <div className="flex justify-between items-center border-t border-white/5 mt-3 pt-3">
          <span className="text-xs text-white/40 font-semibold">Total</span>
          <span className="text-gold font-bold text-lg">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* ── Payment + Special Instructions ── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
          order.payment_status === 'paid'
            ? 'bg-green-500/10 text-green-400 border-green-500/20'
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          <CreditCard className="w-3 h-3" />
          {(order.payment_status || 'pending').toUpperCase()} via {(order.payment_method || 'N/A').toUpperCase()}
        </span>
        {order.payment_id && (
          <span className="text-[10px] text-white/30">Ref: {order.payment_id.slice(-8)}</span>
        )}
      </div>

      {order.special_instructions && (
        <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2 mb-4">
          <p className="text-[10px] text-amber-400/60 font-bold uppercase tracking-wider mb-0.5">Special Instructions</p>
          <p className="text-amber-300/80 text-xs">{order.special_instructions}</p>
        </div>
      )}

      {/* ── Contact buttons ── */}
      <div className="flex gap-3 mb-5">
        <a
          href={`tel:${order.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition border border-white/5 text-sm"
        >
          <Phone className="w-4 h-4" /> Call
        </a>
        <a
          href={`https://wa.me/91${order.phone?.replace(/\D/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-bold py-3 rounded-xl transition border border-green-500/20 text-sm"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>

      {/* ── Status update buttons ── */}
      <div className="grid grid-cols-4 gap-2 border-t border-white/5 pt-4">
        {STATUS_KEYS.map(s => {
          const conf = STATUS_CONFIG[s]
          const Icon = conf.icon
          const isActive = order.status === s
          return (
            <button
              key={s}
              onClick={() => handleStatus(s)}
              disabled={updating}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all border text-[9px] font-bold uppercase disabled:opacity-50 ${
                isActive ? conf.btnActive : conf.btnIdle
              }`}
            >
              <Icon className="w-4 h-4" />
              {conf.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── MAIN AdminDashboard ───────────────────────────────────────────────────────
export default function AdminDashboard({ onLogout }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showManualForm, setShowManualForm] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [manualLoading, setManualLoading] = useState(false)
  const [newOrder, setNewOrder] = useState({
    customer_name: '', phone: '', address: '', items: '',
    total: '', delivery_date: '', order_source: 'whatsapp',
    status: 'pending', payment_method: 'cod', payment_status: 'pending'
  })

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) toast.error('Error fetching orders')
    else setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
    const channel = supabase
      .channel('admin-orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const handleManualSubmit = async (e) => {
    e.preventDefault()
    setManualLoading(true)

    const orderPayload = {
      customer_name: newOrder.customer_name,
      phone: newOrder.phone,
      address: newOrder.address,
      items: newOrder.items ? [{
        name: newOrder.items,
        quantity: 1,
        price: parseFloat(newOrder.total) || 0,
        size: 'Standard'
      }] : [],
      total: parseFloat(newOrder.total) || 0,
      delivery_date: newOrder.delivery_date,
      order_source: newOrder.order_source,
      status: 'pending',
      payment_method: newOrder.payment_method,
      payment_status: newOrder.payment_status,
      order_number: `BB-${Math.floor(100000 + Math.random() * 900000)}`,
    }

    const { error } = await supabase.from('orders').insert([orderPayload])
    if (error) toast.error('Error adding manual order: ' + error.message)
    else {
      toast.success('Manual order added!')
      setShowManualForm(false)
      setNewOrder({
        customer_name: '', phone: '', address: '', items: '',
        total: '', delivery_date: '', order_source: 'whatsapp',
        status: 'pending', payment_method: 'cod', payment_status: 'pending'
      })
    }
    setManualLoading(false)
  }

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    revenue: orders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + calculateTotal(o), 0),
    codPending: orders.filter(o => o.payment_method === 'cod' && o.payment_status === 'pending').length,
  }

  // Filter + search
  const filteredOrders = orders.filter(order => {
    const matchTab = activeTab === 'all' || order.status === activeTab
    const q = searchQuery.toLowerCase()
    const matchSearch = !q ||
      (order.customer_name || '').toLowerCase().includes(q) ||
      (order.phone || '').includes(q) ||
      (order.order_number || '').toLowerCase().includes(q) ||
      (order.address || '').toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center font-syne text-2xl text-gold animate-pulse">
        Loading Bite Bills Admin...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-darkBg pb-20">

      {/* ── Top Nav ── */}
      <nav className="bg-darkBg2 border-b border-white/10 px-4 py-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧺</span>
            <h1 className="text-2xl font-syne font-bold text-gold tracking-tight">Bite Bills Admin</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-400 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl transition font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-8">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: stats.total, color: 'text-white' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
            { label: 'Preparing', value: stats.preparing, color: 'text-orange-400' },
            { label: 'Revenue (Paid)', value: formatCurrency(stats.revenue), color: 'text-green-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-darkBg2 border border-white/5 p-5 rounded-2xl shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">{label}</p>
              <h4 className={`text-3xl font-syne font-bold ${color}`}>{value}</h4>
            </div>
          ))}
        </div>

        {/* ── Header + Add Order button ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-syne font-bold text-cream">Orders</h2>
            <p className="text-white/40 text-sm mt-1">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} shown
              {stats.codPending > 0 && (
                <span className="ml-2 text-amber-400">· {stats.codPending} COD payment pending</span>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowManualForm(true)}
            className="flex items-center gap-2 bg-gold text-darkBg px-5 py-2.5 rounded-xl font-bold hover:bg-amber-400 transition shadow-lg shadow-gold/20 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Manual Order
          </button>
        </div>

        {/* ── Search + Filter Tabs ── */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, phone, or order ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-darkBg2 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 transition"
            />
          </div>
          <div className="flex bg-darkBg2 p-1 rounded-xl border border-white/10 overflow-x-auto gap-0.5">
            {ALL_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === tab ? 'bg-gold text-darkBg shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All' : STATUS_CONFIG[tab]?.label || tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Empty state ── */}
        {filteredOrders.length === 0 ? (
          <div className="bg-darkBg2 border border-white/5 p-16 rounded-3xl text-center">
            <Package className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-lg font-syne">No orders match your filters.</p>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="mt-3 text-gold text-sm font-bold hover:underline">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} onStatusUpdate={fetchOrders} />
            ))}
          </div>
        )}
      </div>

      {/* ── Manual Order Modal ── */}
      {showManualForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-darkBg2 border border-white/10 w-full max-w-xl rounded-3xl shadow-2xl relative">
            <button
              onClick={() => setShowManualForm(false)}
              className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-7">
              <h2 className="text-2xl font-syne font-bold text-gold mb-6 flex items-center gap-2">
                <Send className="w-6 h-6" /> Add Manual Order
              </h2>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gold/60 uppercase tracking-wider block mb-1">Customer Name *</label>
                    <input
                      required type="text" value={newOrder.customer_name}
                      onChange={e => setNewOrder({ ...newOrder, customer_name: e.target.value })}
                      placeholder="Full name"
                      className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gold/60 uppercase tracking-wider block mb-1">Phone *</label>
                    <input
                      required type="tel" value={newOrder.phone}
                      onChange={e => setNewOrder({ ...newOrder, phone: e.target.value })}
                      placeholder="10-digit number"
                      className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gold/60 uppercase tracking-wider block mb-1">Delivery Address *</label>
                  <textarea
                    required rows="2" value={newOrder.address}
                    onChange={e => setNewOrder({ ...newOrder, address: e.target.value })}
                    placeholder="Full delivery address"
                    className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gold/60 uppercase tracking-wider block mb-1">Items Description *</label>
                    <input
                      required type="text" value={newOrder.items}
                      onChange={e => setNewOrder({ ...newOrder, items: e.target.value })}
                      placeholder="e.g. 1kg Choco Cake"
                      className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gold/60 uppercase tracking-wider block mb-1">Order Total (₹)</label>
                    <input
                      type="number" value={newOrder.total}
                      onChange={e => setNewOrder({ ...newOrder, total: e.target.value })}
                      placeholder="e.g. 650"
                      className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gold/60 uppercase tracking-wider block mb-1">Delivery Date *</label>
                    <input
                      required type="date" value={newOrder.delivery_date}
                      onChange={e => setNewOrder({ ...newOrder, delivery_date: e.target.value })}
                      className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gold/60 uppercase tracking-wider block mb-1">Source</label>
                    <select
                      value={newOrder.order_source}
                      onChange={e => setNewOrder({ ...newOrder, order_source: e.target.value })}
                      className="w-full bg-darkBg border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="whatsapp">WhatsApp 📱</option>
                      <option value="instagram">Instagram 📸</option>
                      <option value="website">Website 🌐</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={manualLoading}
                  className="w-full bg-gold text-darkBg font-bold py-3.5 rounded-xl hover:bg-amber-400 transition text-sm disabled:opacity-50"
                >
                  {manualLoading ? 'Saving...' : 'Save Manual Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
