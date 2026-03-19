import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'
import { initiateRazorpayPayment } from '../lib/razorpay'
import { formatCurrency } from '../lib/utils'
import { FaWhatsapp } from 'react-icons/fa'
import { CreditCard, Smartphone, Banknote, ShoppingBag } from 'lucide-react'
import { toast } from 'react-hot-toast'
import CheckoutForm from '../components/checkout/CheckoutForm'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getCartTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()

  // 'upi' | 'cod' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    address: '',
    delivery_date: '',
    special_instructions: ''
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/collections/all')
    }
  }, [items, navigate])

  const total = getCartTotal()

  // Check if all required form fields are filled
  const isFormComplete =
    formData.name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.delivery_date.trim() !== ''

  // Build WhatsApp message
  const buildWhatsAppMessage = (orderId, payStatus) => {
    const orderSummary = items
      .map(item => `- ${item.name} x${item.quantity} @ ${formatCurrency(item.price)}`)
      .join('\n')
    return encodeURIComponent(
      `*New Order: ${orderId.slice(0, 8)}* 🎂\n\n` +
      `*Payment:* ${payStatus}\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Address:* ${formData.address}\n\n` +
      `*Items:*\n${orderSummary}\n\n` +
      `*Total:* ${formatCurrency(total)}\n` +
      `*Delivery Date:* ${formData.delivery_date}\n` +
      (formData.special_instructions ? `*Instructions:* ${formData.special_instructions}\n` : '') +
      `\nPlease confirm my order! Thank you.`
    )
  }

  // ── FIX A, B, C: Unified order handler ───────────────────────────────────────
  const handlePlaceOrder = async () => {
    if (!isFormComplete) {
      toast.error('Please fill in all required fields.')
      return
    }
    if (items.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    setIsProcessing(true)

    try {
      // 1. Prepare EXACT columns for Supabase
      const orderData = {
        user_id: user?.id || null,
        name: formData.name, // adding to satisfy old column not-null requirement
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        delivery_date: formData.delivery_date,
        special_instructions: formData.special_instructions || null,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size || item.variant || 'Standard'
        })),
        total: total,
        order_source: 'website',
        status: 'pending',
        payment_method: paymentMethod === 'upi' ? 'online' : paymentMethod,
        payment_status: 'pending',
      }

      // ── ONLINE (UPI/Card via Razorpay) ──────────────────────────────────
      if (paymentMethod === 'upi') {
        initiateRazorpayPayment({
          amount: total,
          customerName: formData.name,
          customerEmail: user?.email || '',
          customerPhone: formData.phone,
          onSuccess: async (response) => {
            try {
              // Now save order ON SUCCESS only
              const finalOrderData = {
                ...orderData,
                payment_status: 'paid',
                payment_id: response.razorpay_payment_id
              }
              const { error: insertError } = await supabase
                .from('orders')
                .insert([finalOrderData])

              if (insertError) throw insertError

              clearCart()
              toast.success('Payment Successful! Order Placed! 🎉')
              navigate('/success') // user req: /success
            } catch (err) {
              console.error('Error saving order after payment:', err)
              toast.error('Payment succeeded but order save failed. Contact admin.')
            } finally {
              setIsProcessing(false)
            }
          },
          onFailure: (error) => {
            console.error('Payment failed or cancelled:', error)
            toast.error('Payment failed. Please try again.')
            setIsProcessing(false)
          },
        })
        return // Leave handlePlaceOrder, razorpay handles the rest
      }

      // ── CASH ON DELIVERY (COD) ───────────────────────────────────────────
      if (paymentMethod === 'cod') {
        const { error: orderError } = await supabase
          .from('orders')
          .insert([orderData])

        if (orderError) {
          toast.error(`Error saving order: ${orderError.message}`)
          setIsProcessing(false)
          return
        }

        clearCart()
        toast.success('Order placed successfully!')
        navigate('/success') 
        return
      }

      // ── WHATSAPP ─────────────────────────────────────────────────────────
      if (paymentMethod === 'whatsapp') {
        const { data: savedOrder, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select()
          .single()

        if (orderError) {
          toast.error(`Error saving order: ${orderError.message}`)
          setIsProcessing(false)
          return
        }

        const msg = buildWhatsAppMessage(savedOrder.id, 'Requesting via WhatsApp 📱')
        window.open(`https://wa.me/917288039532?text=${msg}`, '_blank')

        clearCart()
        toast.success('Order saved! Opening WhatsApp...')
        navigate('/success')
        return
      }

    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'An unexpected error occurred.')
      setIsProcessing(false)
    }
  }

  // ── FIX C: Render single button based on payment method ─────────────────
  const renderSubmitButton = () => {
    const baseClass =
      'w-full py-4 rounded-xl font-bold text-lg transition-all tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

    if (paymentMethod === 'upi') {
      return (
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !isFormComplete}
          className={`${baseClass} bg-gold text-darkBg hover:bg-amber-400 shadow-xl shadow-gold/20 uppercase`}
        >
          {isProcessing ? 'Processing...' : <><CreditCard className="w-5 h-5" /> Pay Now</>}
        </button>
      )
    }

    if (paymentMethod === 'whatsapp') {
      return (
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !isFormComplete}
          className={`${baseClass} bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-xl shadow-green-500/20 uppercase`}
        >
          {isProcessing ? 'Processing...' : <><FaWhatsapp className="w-5 h-5" /> Order via WhatsApp</>}
        </button>
      )
    }

    if (paymentMethod === 'cod') {
      return (
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !isFormComplete}
          className={`${baseClass} bg-amber-700/80 text-white hover:bg-amber-700 border border-amber-600/40 uppercase`}
        >
          {isProcessing ? 'Processing...' : <><Banknote className="w-5 h-5" /> Place Order</>}
        </button>
      )
    }
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">

            {/* ── Left Col: Order Form + Payment Method ── */}
            <div className="lg:col-span-7 space-y-6">
              <CheckoutForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={(e) => e.preventDefault()}
              />

              {/* ── Payment Method Selector ── */}
              <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="font-syne font-bold text-xl text-cream mb-5">Payment Method</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Card / UPI */}
                  <label
                    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      paymentMethod === 'upi'
                        ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10'
                        : 'border-white/10 hover:border-white/25 bg-darkBg'
                    }`}
                  >
                    <Smartphone className={`w-7 h-7 ${paymentMethod === 'upi' ? 'text-gold' : 'text-white/50'}`} />
                    <div>
                      <div className={`font-bold text-sm ${paymentMethod === 'upi' ? 'text-gold' : 'text-white'}`}>Card / UPI</div>
                      <div className="text-xs text-white/40 mt-0.5">GPay, PhonePe, Card</div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="sr-only"
                    />
                  </label>

                  {/* WhatsApp */}
                  <label
                    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      paymentMethod === 'whatsapp'
                        ? 'border-[#25D366] bg-[#25D366]/10 shadow-lg shadow-green-500/10'
                        : 'border-white/10 hover:border-white/25 bg-darkBg'
                    }`}
                  >
                    <FaWhatsapp className={`w-7 h-7 ${paymentMethod === 'whatsapp' ? 'text-[#25D366]' : 'text-white/50'}`} />
                    <div>
                      <div className={`font-bold text-sm ${paymentMethod === 'whatsapp' ? 'text-[#25D366]' : 'text-white'}`}>WhatsApp</div>
                      <div className="text-xs text-white/40 mt-0.5">Order via chat</div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value="whatsapp"
                      checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')}
                      className="sr-only"
                    />
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      paymentMethod === 'cod'
                        ? 'border-amber-600 bg-amber-700/10 shadow-lg shadow-amber-700/10'
                        : 'border-white/10 hover:border-white/25 bg-darkBg'
                    }`}
                  >
                    <Banknote className={`w-7 h-7 ${paymentMethod === 'cod' ? 'text-amber-500' : 'text-white/50'}`} />
                    <div>
                      <div className={`font-bold text-sm ${paymentMethod === 'cod' ? 'text-amber-400' : 'text-white'}`}>COD</div>
                      <div className="text-xs text-white/40 mt-0.5">Pay at your door</div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="sr-only"
                    />
                  </label>
                </div>

                {!isFormComplete && (
                  <p className="text-xs text-amber-400/80 mt-4 text-center">
                    ⚠️ Fill in all required fields (Name, Phone, Address, Date) to enable the checkout button.
                  </p>
                )}
              </div>
            </div>

            {/* ── Right Col: Order Summary ── */}
            <div className="lg:col-span-5">
              <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6 lg:sticky lg:top-32 shadow-2xl">
                <h3 className="font-syne font-bold text-xl text-gold mb-5 border-b border-white/10 pb-3">
                  <ShoppingBag className="inline w-5 h-5 mr-2 mb-0.5" />
                  Order Summary
                </h3>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-lg bg-black/20 overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-sm text-cream leading-tight truncate">{item.name}</h5>
                        <p className="text-white/40 text-xs mt-0.5">
                          {item.size || item.variant || 'Standard'} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-gold font-bold text-sm shrink-0">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-white/10 mb-6">
                  <span className="text-lg font-bold font-syne text-gold">Total</span>
                  <span className="text-2xl font-bold text-white">{formatCurrency(total)}</span>
                </div>

                {/* FIX C: Render context button */}
                {renderSubmitButton()}

                <p className="text-[10px] text-white/30 mt-4 text-center leading-relaxed">
                  {paymentMethod === 'upi' && '* Secure payment via Razorpay. Your details are never stored.'}
                  {paymentMethod === 'whatsapp' && '* Your order will be confirmed via WhatsApp.'}
                  {paymentMethod === 'cod' && '* Cash on Delivery available. Pay when your order arrives.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}