// src/lib/razorpay.js

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function initiateRazorpayPayment({ 
  amount, 
  orderId, 
  customerName, 
  customerEmail, 
  customerPhone, 
  onSuccess, 
  onFailure 
}) {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  if (!res) {
    onFailure({ error: 'Razorpay SDK failed to load. Are you online?' })
    return
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', 
    amount: Math.round(amount * 100), // convert to paise
    currency: 'INR',
    name: 'Bite Bills',
    description: 'Fresh Bakes Order Payment',
    // order_id: orderId, // Note: standard Razorpay docs require order_id to come from backend /v1/orders. If passing purely custom ID front-end, DO NOT pass it as razorpay order_id, just pass receipt or leave it out. For simple capture, don't pass order_id unless strictly generated via backend.
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone
    },
    theme: {
      color: '#C89A5A' // gold theme
    },
    handler: function (response) {
      onSuccess(response)
    }
  }

  try {
    const paymentObject = new window.Razorpay(options)
    
    paymentObject.on('payment.failed', function (response) {
      onFailure(response.error)
    })
    
    paymentObject.open()
  } catch (err) {
    onFailure(err)
  }
}