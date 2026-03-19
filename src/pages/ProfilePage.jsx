import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  LogOut, Edit2, Save, X, Plus, Trash2, Home, Briefcase, MapPin,
  Package, CheckCircle2, Clock, Truck, XCircle, Lock, User,
  ChevronRight, ShoppingBag
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'
import { toast } from 'react-hot-toast'

// ── Status helpers ────────────────────────────────────────────────────────────
const ORDER_STATUS_STEPS = ['pending', 'preparing', 'dispatch', 'delivered']

const STATUS_META = {
  pending:   { label: 'Pending',      color: 'text-yellow-400', bg: 'bg-yellow-400/15', border: 'border-yellow-400/40' },
  preparing: { label: 'Preparing',    color: 'text-blue-400',   bg: 'bg-blue-400/15',   border: 'border-blue-400/40'  },
  dispatch:  { label: 'Dispatched',   color: 'text-purple-400', bg: 'bg-purple-400/15', border: 'border-purple-400/40' },
  delivered: { label: 'Delivered ✅', color: 'text-green-400',  bg: 'bg-green-400/15',  border: 'border-green-400/40'  },
}

const PAYMENT_META = {
  paid:    { label: 'PAID',    color: 'text-green-400',  bg: 'bg-green-400/15'  },
  pending: { label: 'PENDING', color: 'text-yellow-400', bg: 'bg-yellow-400/15' },
  failed:  { label: 'FAILED',  color: 'text-red-400',    bg: 'bg-red-400/15'    },
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ name, size = 'lg' }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'BB'
  const sz = size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-10 h-10 text-sm'
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center font-bold text-darkBg shrink-0`}>
      {initials}
    </div>
  )
}

function StatusBadge({ status, type = 'order' }) {
  const meta = type === 'payment' ? PAYMENT_META[status] : STATUS_META[status]
  if (!meta) return <span className="text-white/40 text-xs">{status}</span>
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.bg} ${meta.color}`}>
      {meta.label}
    </span>
  )
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 rounded-lg bg-gold/10 text-gold">
        <Icon className="w-5 h-5" />
      </div>
      <h2 className="text-xl font-syne font-bold text-cream">{title}</h2>
    </div>
  )
}

// ── Status Tracker ────────────────────────────────────────────────────────────
function OrderStatusTracker({ order }) {
  const stepLabels = {
    pending:   { label: 'Order Placed',    icon: Clock     },
    preparing: { label: 'Preparing',       icon: Package   },
    dispatch:  { label: 'Out for Delivery', icon: Truck     },
    delivered: { label: 'Delivered',        icon: CheckCircle2 },
  }
  const currentIdx = ORDER_STATUS_STEPS.indexOf(order.status)

  return (
    <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6">
      <SectionHeader icon={Truck} title="Live Order Tracker" />
      <p className="text-xs text-white/40 mb-5">Order #{order.order_number}</p>
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/10 z-0">
          <div
            className="h-full bg-gold transition-all duration-700"
            style={{ width: `${(currentIdx / (ORDER_STATUS_STEPS.length - 1)) * 100}%` }}
          />
        </div>
        <div className="relative z-10 flex justify-between">
          {ORDER_STATUS_STEPS.map((step, idx) => {
            const { label, icon: Icon } = stepLabels[step]
            const done = idx <= currentIdx
            return (
              <div key={step} className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  done ? 'bg-gold border-gold text-darkBg' : 'bg-darkBg border-white/20 text-white/30'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs text-center leading-tight ${done ? 'text-gold font-semibold' : 'text-white/40'}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Address Book ──────────────────────────────────────────────────────────────
function AddressBook({ userId }) {
  const [addresses, setAddresses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editIdx, setEditIdx] = useState(null)
  const [form, setForm] = useState({ label: 'Home', address: '', city: '', pincode: '' })
  const [saving, setSaving] = useState(false)

  const fetchAddresses = useCallback(async () => {
    const { data } = await supabase
      .from('profiles')
      .select('addresses')
      .eq('id', userId)
      .single()
    if (data?.addresses) setAddresses(data.addresses)
  }, [userId])

  useEffect(() => { fetchAddresses() }, [fetchAddresses])

  const saveAddresses = async (updated) => {
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, addresses: updated }, { onConflict: 'id' })
    if (error) toast.error('Failed to save address.')
    else { setAddresses(updated); toast.success('Addresses saved!') }
    setSaving(false)
  }

  const handleSave = async () => {
    if (!form.address || !form.city || !form.pincode) {
      toast.error('Please fill all address fields.')
      return
    }
    let updated
    if (editIdx !== null) {
      updated = addresses.map((a, i) => i === editIdx ? form : a)
    } else {
      updated = [...addresses, form]
    }
    await saveAddresses(updated)
    setShowForm(false)
    setEditIdx(null)
    setForm({ label: 'Home', address: '', city: '', pincode: '' })
  }

  const handleDelete = async (idx) => {
    const updated = addresses.filter((_, i) => i !== idx)
    await saveAddresses(updated)
  }

  const startEdit = (idx) => {
    setForm(addresses[idx])
    setEditIdx(idx)
    setShowForm(true)
  }

  const LABEL_ICONS = {
    Home: <Home className="w-4 h-4" />,
    Work: <Briefcase className="w-4 h-4" />,
    Other: <MapPin className="w-4 h-4" />,
  }

  return (
    <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <SectionHeader icon={MapPin} title="Address Book" />
        <button
          onClick={() => { setShowForm(true); setEditIdx(null); setForm({ label: 'Home', address: '', city: '', pincode: '' }) }}
          className="flex items-center gap-1.5 text-sm text-gold hover:text-amber-300 font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>

      {addresses.length === 0 && !showForm && (
        <p className="text-white/40 text-sm text-center py-6">No saved addresses yet.</p>
      )}

      <div className="space-y-3">
        {addresses.map((addr, idx) => (
          <div key={idx} className="flex items-start gap-3 p-4 bg-darkBg rounded-xl border border-white/5">
            <div className="mt-0.5 text-gold">{LABEL_ICONS[addr.label] || <MapPin className="w-4 h-4" />}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gold/80 uppercase tracking-wider mb-1">{addr.label}</div>
              <div className="text-sm text-white/80">{addr.address}</div>
              <div className="text-xs text-white/40 mt-0.5">{addr.city} — {addr.pincode}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(idx)} className="p-1.5 text-white/40 hover:text-gold transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(idx)} className="p-1.5 text-white/40 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="mt-4 p-4 bg-darkBg rounded-xl border border-gold/20 space-y-3">
          <div className="flex gap-2">
            {['Home', 'Work', 'Other'].map(lbl => (
              <button
                key={lbl}
                onClick={() => setForm(p => ({ ...p, label: lbl }))}
                className={`flex-1 text-sm py-2 rounded-lg font-semibold border transition-all ${
                  form.label === lbl ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/50 hover:border-white/20'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
          <textarea
            rows="2"
            placeholder="Full address"
            value={form.address}
            onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
            className="w-full bg-darkBg2 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="City"
              value={form.city}
              onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
              className="bg-darkBg2 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
            />
            <input
              placeholder="Pincode"
              value={form.pincode}
              onChange={e => setForm(p => ({ ...p, pincode: e.target.value }))}
              className="bg-darkBg2 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-gold text-darkBg py-2 rounded-lg font-bold text-sm hover:bg-amber-400 transition disabled:opacity-50"
            >
              <Save className="inline w-3.5 h-3.5 mr-1" />{saving ? 'Saving...' : 'Save Address'}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditIdx(null) }}
              className="px-4 py-2 text-white/40 hover:text-white border border-white/10 rounded-lg text-sm transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── MAIN ProfilePage ──────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  // Profile edit state
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' })
  const [savingProfile, setSavingProfile] = useState(false)

  // Change password state
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
  const [savingPassword, setSavingPassword] = useState(false)

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [authLoading, isAuthenticated, navigate])

  // ── Fetch orders ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return

    setProfileForm({
      name: user.user_metadata?.full_name || '',
      phone: user.user_metadata?.phone || '',
    })

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (!error && data) setOrders(data)
      setOrdersLoading(false)
    }
    fetchOrders()

    // Realtime subscription for order updates
    const channel = supabase
      .channel(`profile-orders-${user.id}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setOrders(prev => [payload.new, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o))
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [user])

  // ── Save profile ────────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    setSavingProfile(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: profileForm.name, phone: profileForm.phone }
    })
    if (error) toast.error('Failed to update profile.')
    else { toast.success('Profile updated!'); setEditingProfile(false) }
    setSavingProfile(false)
  }

  // ── Change password ─────────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    if (passwordForm.newPass !== passwordForm.confirm) {
      toast.error('Passwords do not match.')
      return
    }
    if (passwordForm.newPass.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }
    setSavingPassword(true)
    const { error } = await supabase.auth.updateUser({ password: passwordForm.newPass })
    if (error) toast.error(error.message || 'Failed to change password.')
    else {
      toast.success('Password changed successfully!')
      setChangingPassword(false)
      setPasswordForm({ current: '', newPass: '', confirm: '' })
    }
    setSavingPassword(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center">
        <div className="text-gold animate-pulse text-lg">Loading your profile...</div>
      </div>
    )
  }

  const fullName = user.user_metadata?.full_name || 'Cookie Lover'
  const activeOrder = orders.find(o => o.status !== 'delivered' && o.status !== 'cancelled')

  return (
    <>
      <Helmet><title>My Account | Bite Bills</title></Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* ── SECTION 1: Profile Header ─────────────────────────────────── */}
          <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Avatar name={fullName} size="lg" />
              <div className="flex-1 min-w-0">
                {editingProfile ? (
                  <div className="space-y-2">
                    <input
                      value={profileForm.name}
                      onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Full Name"
                      className="w-full bg-darkBg border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                    />
                    <input
                      value={profileForm.phone}
                      onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="Phone Number"
                      className="w-full bg-darkBg border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleSaveProfile}
                        disabled={savingProfile}
                        className="px-4 py-1.5 bg-gold text-darkBg rounded-lg text-sm font-bold hover:bg-amber-400 transition disabled:opacity-50"
                      >
                        {savingProfile ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="px-4 py-1.5 border border-white/10 text-white/50 rounded-lg text-sm hover:text-white transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-syne font-bold text-cream">{fullName}</h1>
                    <p className="text-white/50 text-sm mt-0.5">{user.email}</p>
                    {user.user_metadata?.phone && (
                      <p className="text-white/40 text-xs mt-0.5">📞 {user.user_metadata.phone}</p>
                    )}
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="mt-3 flex items-center gap-1.5 text-xs text-gold hover:text-amber-300 font-semibold transition"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Profile
                    </button>
                  </>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs text-white/30">Member since</div>
                <div className="text-sm text-white/60 font-medium">
                  {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: Address Book ───────────────────────────────────── */}
          <AddressBook userId={user.id} />

          {/* ── SECTION 3: My Orders ──────────────────────────────────────── */}
          <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6 shadow-xl">
            <SectionHeader icon={ShoppingBag} title="My Orders" />

            {ordersLoading ? (
              <div className="text-center py-10 text-white/40">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingBag className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/50 mb-4">No orders yet. Start shopping!</p>
                <a
                  href="/collections/all"
                  className="inline-flex items-center gap-1.5 text-gold font-bold hover:text-amber-300 transition"
                >
                  Browse Products <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border border-white/5 rounded-xl p-4 hover:border-gold/20 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="font-bold text-cream text-sm">{order.order_number || `#${order.id.slice(0, 8)}`}</span>
                        <span className="text-white/30 text-xs ml-3">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <StatusBadge status={order.status} type="order" />
                        <StatusBadge status={order.payment_status} type="payment" />
                      </div>
                    </div>

                    {/* Items list */}
                    <div className="text-xs text-white/50 space-y-0.5 mb-3">
                      {Array.isArray(order.items) && order.items.map((item, i) => (
                        <div key={i}>
                          {item.quantity}× {item.name}
                          {item.size && item.size !== 'Standard' ? ` (${item.size})` : ''} —{' '}
                          <span className="text-white/40">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1">
                      <span className="text-xs text-white/40 uppercase">
                        {order.payment_method} · {order.delivery_date ? `Delivery: ${order.delivery_date}` : ''}
                      </span>
                      <span className="text-gold font-bold">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── SECTION 4: Order Status Tracker ──────────────────────────── */}
          {activeOrder && <OrderStatusTracker order={activeOrder} />}

          {/* ── SECTION 5: Account Actions ────────────────────────────────── */}
          <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6 shadow-xl">
            <SectionHeader icon={Lock} title="Account Settings" />

            {/* Change Password */}
            <div className="mb-4">
              <button
                onClick={() => setChangingPassword(v => !v)}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-cream transition font-medium"
              >
                <Lock className="w-4 h-4 text-gold" />
                Change Password
              </button>

              {changingPassword && (
                <div className="mt-4 space-y-2">
                  <input
                    type="password"
                    placeholder="New password"
                    value={passwordForm.newPass}
                    onChange={e => setPasswordForm(p => ({ ...p, newPass: e.target.value }))}
                    className="w-full bg-darkBg border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordForm.confirm}
                    onChange={e => setPasswordForm(p => ({ ...p, confirm: e.target.value }))}
                    className="w-full bg-darkBg border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-gold"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleChangePassword}
                      disabled={savingPassword}
                      className="px-4 py-2 bg-gold text-darkBg rounded-lg text-sm font-bold hover:bg-amber-400 transition disabled:opacity-50"
                    >
                      {savingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                    <button
                      onClick={() => setChangingPassword(false)}
                      className="px-4 py-2 border border-white/10 text-white/50 rounded-lg text-sm hover:text-white transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <hr className="border-white/5 my-4" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 text-sm font-semibold text-red-400/80 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>

        </div>
      </main>
    </>
  )
}