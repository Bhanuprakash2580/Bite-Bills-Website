import { CreditCard, Smartphone, Banknote } from 'lucide-react'

export default function PaymentOptions({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="space-y-4">
      <h3 className="font-syne font-bold text-xl text-cream mb-4">Payment Method</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* UPI */}
        <label className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer text-center gap-3 ${
          paymentMethod === 'upi' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/20 bg-darkBg2'
        }`}>
          <Smartphone className={`w-8 h-8 ${paymentMethod === 'upi' ? 'text-gold' : 'text-white/60'}`} />
          <div>
            <div className="font-bold text-lg mb-1">UPI</div>
            <div className="text-xs text-white/50">GPay, PhonePe, Paytm</div>
          </div>
          <input
            type="radio"
            name="payment_method"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={() => setPaymentMethod('upi')}
            className="sr-only"
          />
        </label>

        {/* Card */}
        <label className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer text-center gap-3 ${
          paymentMethod === 'card' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/20 bg-darkBg2'
        }`}>
          <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-gold' : 'text-white/60'}`} />
          <div>
            <div className="font-bold text-lg mb-1">Card</div>
            <div className="text-xs text-white/50">Credit, Debit</div>
          </div>
          <input
            type="radio"
            name="payment_method"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
            className="sr-only"
          />
        </label>

        {/* COD */}
        <label className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer text-center gap-3 ${
          paymentMethod === 'cod' ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/20 bg-darkBg2'
        }`}>
          <Banknote className={`w-8 h-8 ${paymentMethod === 'cod' ? 'text-gold' : 'text-white/60'}`} />
          <div>
            <div className="font-bold text-lg mb-1">Cash on Delivery</div>
            <div className="text-xs text-white/50">Pay when delivered</div>
          </div>
          <input
            type="radio"
            name="payment_method"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  )
}
