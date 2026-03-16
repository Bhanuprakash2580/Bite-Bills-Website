import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { useDeliveryCharge } from '../hooks/useDeliveryCharge'
import { supabase } from '../lib/supabase'
import { initiateRazorpayPayment } from '../lib/razorpay'
import { formatCurrency } from '../lib/utils'
import { toast } from 'react-hot-toast'
import CheckoutForm from '../components/checkout/CheckoutForm'
import DeliveryZoneChecker from '../components/checkout/DeliveryZoneChecker'
import DeliveryChargeDisplay from '../components/checkout/DeliveryChargeDisplay'
import PaymentOptions from '../components/checkout/PaymentOptions'
import OrderSuccess from '../components/checkout/OrderSuccess'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getCartTotal, clearCart, giftMessage } = useCartStore()
  const { user } = useAuthStore()
  
  const { isEligible, deliveryCharge, chargeLabel, distanceKm, isLoading: deliveryLoading, error: deliveryError, checkPincode, reset: resetDelivery } = useDeliveryCharge()

  const [deliveryMethod, setDeliveryMethod] = useState('delivery') // 'delivery' | 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('upi') // 'upi' | 'card' | 'cod'
  const [isProcessing, setIsProcessing] = useState(false)
  const [successOrderId, setSuccessOrderId] = useState(null)

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: 'Hyderabad', // Defaulting to Hyderabad based on coordinates in config
    state: 'Telangana',
    pincode: ''
  })

  useEffect(() => {
    if (items.length === 0 && !successOrderId) {
      navigate('/collections/all')
    }
  }, [items, successOrderId, navigate])

  const subtotal = getCartTotal()
  const finalDeliveryCharge = deliveryMethod === 'pickup' ? 0 : (deliveryCharge || 0)
  const total = subtotal + finalDeliveryCharge

  const handlePlaceOrder = async () => {
    if (deliveryMethod === 'delivery' && !isEligible) {
      toast.error('Please verify your pincode for delivery first.')
      return
    }
    
    // Trigger required validation
    const form = document.getElementById('checkout-form')
    if (form && !form.checkValidity()) {
      form.reportValidity()
      return
    }

    setIsProcessing(true)

    try {
      // 1. Generate Order ID
      const orderNumber = `BB-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`
      
      const orderData = {
        order_number: orderNumber,
        user_id: user?.id || null,
        guest_name: user ? null : formData.name,
        guest_email: user ? null : formData.email,
        guest_phone: user ? null : formData.phone,
        items: items,
        subtotal,
        delivery_charge: finalDeliveryCharge,
        discount: 0,
        total,
        delivery_address: {
          name: formData.name,
          phone: formData.phone,
          line1: formData.addressLine1,
          line2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
        },
        delivery_method: deliveryMethod,
        distance_km: distanceKm,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'pending', // Will update after RZP success
        status: 'pending',
        gift_message: giftMessage,
        order_source: 'website'
      }

      // If COD, insert direct to supabase and finish
      if (paymentMethod === 'cod') {
        const { error } = await supabase.from('orders').insert([orderData])
        if (error) throw error

        clearCart()
        setSuccessOrderId(orderNumber)
      } else {
        // If Online Payment, trigger Razorpay
        initiateRazorpayPayment({
          amount: total,
          orderId: orderNumber, // Usually backend creates a real RZP order, here simulating with our ID
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          onSuccess: async (response) => {
            // Payment Success
            orderData.payment_status = 'paid'
            orderData.razorpay_payment_id = response.razorpay_payment_id
            orderData.status = 'confirmed'
            
            const { error } = await supabase.from('orders').insert([orderData])
            if (error) {
              console.error(error)
              toast.error('Payment successful but order creation failed. Contact support.')
              setSuccessOrderId(orderNumber)
            } else {
              clearCart()
              setSuccessOrderId(orderNumber)
            }
            setIsProcessing(false)
          },
          onFailure: (err) => {
            console.error('Payment Error', err)
            toast.error('Payment failed or cancelled.')
            setIsProcessing(false)
          }
        })
        return // return early, state resets handled in callback
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (successOrderId) {
    return <OrderSuccess orderId={successOrderId} />
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left Col: Forms & Flow */}
            <div className="lg:col-span-7 space-y-8">
              
              <CheckoutForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={(e) => e.preventDefault()}
              />

              <DeliveryZoneChecker
                isEligible={isEligible}
                distanceKm={distanceKm}
                chargeLabel={chargeLabel}
                isLoading={deliveryLoading}
                checkPincode={checkPincode}
                error={deliveryError}
                reset={resetDelivery}
                initialPincode={formData.pincode}
              />

              <DeliveryChargeDisplay
                method={deliveryMethod}
                setMethod={setDeliveryMethod}
                isEligible={isEligible}
                deliveryCharge={deliveryCharge}
              />

              <PaymentOptions
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

            </div>

            {/* Right Col: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-darkBg2 border border-white/10 rounded-2xl p-6 lg:sticky lg:top-32">
                <h3 className="font-syne font-bold text-xl text-cream mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-black/20 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h5 className="font-bold text-sm text-cream leading-tight">{item.name}</h5>
                        <p className="text-white/50 text-xs mt-1">{item.size} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center text-gold font-bold text-sm shrink-0">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6 mb-6">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Delivery</span>
                    {deliveryMethod === 'pickup' ? (
                      <span className="text-green-400">Free Pickup</span>
                    ) : (
                      <span>{chargeLabel || 'Pending'}</span>
                    )}
                  </div>
                  {giftMessage && (
                    <div className="flex justify-between text-white/70">
                      <span>Gift Card</span>
                      <span className="text-green-400 font-bold">Free</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-6 pb-8">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-syne font-bold text-gold">
                    {formatCurrency(total)}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || (deliveryMethod === 'delivery' && !isEligible)}
                  className="w-full bg-gold text-darkBg py-4 rounded-xl font-bold text-lg hover:bg-goldLight transition-colors shadow-2xl shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatCurrency(total)}`}
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}