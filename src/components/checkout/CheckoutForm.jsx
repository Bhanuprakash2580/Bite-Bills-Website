import { useState } from 'react'

export default function CheckoutForm({ formData, setFormData, onSubmit }) {
  // Pass updates safely
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form id="checkout-form" onSubmit={onSubmit} className="space-y-6 bg-darkBg2 border border-white/10 rounded-2xl p-6 shadow-xl">
      <h3 className="font-syne font-bold text-2xl text-gold mb-6 border-b border-white/10 pb-2">Order Details</h3>

      <div className="grid grid-cols-1 gap-6 text-left">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm text-cream font-semibold ml-1 block">Full Name *</label>
          <input 
            required 
            type="text" 
            name="name" 
            placeholder="Enter your full name"
            value={formData.name} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm text-cream font-semibold ml-1 block">Phone Number *</label>
          <input 
            required 
            type="tel" 
            name="phone" 
            placeholder="Enter 10-digit mobile number"
            value={formData.phone} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all"
          />
        </div>

        {/* Full Address */}
        <div className="space-y-2">
          <label className="text-sm text-cream font-semibold ml-1 block">Delivery Address *</label>
          <textarea 
            required 
            name="address" 
            rows="3"
            placeholder="Enter your complete delivery address"
            value={formData.address || ''} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all"
          ></textarea>
        </div>

        {/* Delivery Date */}
        <div className="space-y-2">
          <label className="text-sm text-cream font-semibold ml-1 block">Delivery Date *</label>
          <input 
            required 
            type="date" 
            name="delivery_date" 
            value={formData.delivery_date} 
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all"
          />
        </div>

        {/* Special Instructions */}
        <div className="space-y-2">
          <label className="text-sm text-cream font-semibold ml-1 block">Special Instructions (Optional)</label>
          <textarea 
            name="special_instructions" 
            rows="2"
            placeholder="E.g. Less sugar, Eggless, Message on cake..."
            value={formData.special_instructions} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all"
          ></textarea>
        </div>
      </div>
    </form>
  )
}