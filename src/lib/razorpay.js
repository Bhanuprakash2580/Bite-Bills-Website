export async function initiateRazorpayPayment({ amount, orderId, customerName, customerEmail, customerPhone, onSuccess, onFailure }) {
  if (!window.Razorpay) {
    onFailure({ error: 'Razorpay SDK failed to load' });
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // fallback for dev
    amount: Math.round(amount * 100), // in paise
    currency: 'INR',
    name: 'Bite Bills',
    description: 'Cookie Order Payment',
    order_id: orderId, // from Razorpay Orders API or custom generated
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone
    },
    theme: { color: '#C89A5A' }, // gold
    handler: function (response) {
      onSuccess(response);
    },
  }

  try {
    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', function (response) {
      onFailure(response.error);
    });
    rzp.open()
  } catch (error) {
    onFailure(error);
  }
}