import { useState } from 'react'

export default function CheckoutForm({ formData, setFormData, onSubmit }) {
  // Pass updates safely
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form id="checkout-form" onSubmit={onSubmit} className="space-y-6 bg-darkBg2 border border-white/10 rounded-2xl p-6">
      <h3 className="font-syne font-bold text-xl text-cream mb-4">Contact & Address</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-white/60 font-medium ml-1">Full Name</label>
          <input 
            required 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-white/60 font-medium ml-1">Email</label>
          <input 
            required 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-white/60 font-medium ml-1">Phone Number</label>
          <input 
            required 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
          />
        </div>
        
        <div className="space-y-1 md:col-span-2 mt-4">
          <label className="text-sm text-white/60 font-medium ml-1">Address Line 1</label>
          <input 
            required 
            type="text" 
            name="addressLine1" 
            value={formData.addressLine1} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
            placeholder="House/Flat No, Building Name"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm text-white/60 font-medium ml-1">Address Line 2 (Optional)</label>
          <input 
            type="text" 
            name="addressLine2" 
            value={formData.addressLine2} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
            placeholder="Street, Area"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-white/60 font-medium ml-1">City</label>
          <input 
            required 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-white/60 font-medium ml-1">State</label>
          <input 
            required 
            type="text" 
            name="state" 
            value={formData.state} 
            onChange={handleChange}
            className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
          />
        </div>
      </div>
    </form>
  )
}