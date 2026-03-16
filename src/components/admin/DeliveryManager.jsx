import { useState, useEffect } from 'react'
import { MapPin, Truck, Settings } from 'lucide-react'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function DeliveryManager() {
  const [settings, setSettings] = useState({
    radius: 40,
    free_radius: 5,
    per_km_charge: 10,
    base_charge: 0,
    store_enabled: true,
    delivery_enabled: true
  })

  // In a real app, you would fetch these from a 'store_settings' table in Supabase
  // Here we just use local state representing the DB for demonstration

  const handleSave = (e) => {
    e.preventDefault()
    // Mock save
    alert('Delivery settings saved to database!')
  }

  return (
    <div className="bg-darkBg2 border border-white/5 rounded-2xl p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
        <Truck className="w-8 h-8 text-gold" />
        <div>
          <h2 className="text-2xl font-syne font-bold text-cream">Delivery Rules</h2>
          <p className="text-white/50 text-sm">Configure your active zones and charges.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Toggles */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
          <div>
            <div className="font-bold text-cream mb-1">Enable Home Delivery</div>
            <div className="text-sm text-white/50">Allow customers to request delivery.</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.delivery_enabled}
              onChange={(e) => setSettings({...settings, delivery_enabled: e.target.checked})}
            />
            <div className="w-11 h-6 bg-darkBg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
          </label>
        </div>

        {/* Zones */}
        <div className="space-y-4 pt-4">
          <h4 className="font-bold text-cream flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" /> Radius Configuration
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Max Radius (km)</label>
              <input 
                type="number"
                value={settings.radius}
                onChange={(e) => setSettings({...settings, radius: Number(e.target.value)})}
                className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Free Delivery Up To (km)</label>
              <input 
                type="number"
                value={settings.free_radius}
                onChange={(e) => setSettings({...settings, free_radius: Number(e.target.value)})}
                className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4 pt-4">
          <h4 className="font-bold text-cream flex items-center gap-2">
            <Settings className="w-4 h-4 text-gold" /> Automatic Pricing
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Charge per extra km (₹)</label>
              <input 
                type="number"
                value={settings.per_km_charge}
                onChange={(e) => setSettings({...settings, per_km_charge: Number(e.target.value)})}
                className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Base Charge (₹)</label>
              <input 
                type="number"
                value={settings.base_charge}
                onChange={(e) => setSettings({...settings, base_charge: Number(e.target.value)})}
                className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                disabled
              />
              <p className="text-xs text-white/40 mt-1">Currently fixed to 0</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button type="submit" className="w-full bg-gold text-darkBg py-4 rounded-xl font-bold hover:bg-goldLight transition-colors">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
