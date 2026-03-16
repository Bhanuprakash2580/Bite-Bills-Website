import { useMemo } from 'react'

export default function RevenueChart({ orders }) {
  // Simple mock chart using pure CSS
  const data = useMemo(() => {
    // Get last 7 days
    const days = []
    const amounts = []
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' })
      
      const dayStart = new Date(d).setHours(0,0,0,0)
      const dayEnd = new Date(d).setHours(23,59,59,999)
      
      const dayOrders = orders.filter(o => {
        const t = new Date(o.created_at).getTime()
        return t >= dayStart && t <= dayEnd && o.payment_status === 'paid'
      })
      
      const total = dayOrders.reduce((sum, o) => sum + o.total, 0)
      
      days.push(dayStr)
      amounts.push(total)
    }
    
    return { days, amounts }
  }, [orders])

  const max = Math.max(...data.amounts, 1000) // minimum scale

  return (
    <div className="bg-darkBg2 border border-white/5 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-syne font-bold text-lg text-cream">7 Day Revenue</h3>
        <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">Paid Only</span>
      </div>

      <div className="h-64 flex items-end justify-between gap-2 pt-8 relative">
        {/* Y Axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-xs text-white/20">
          <div className="border-t border-white/5 w-full text-right pt-1">{max.toFixed()}</div>
          <div className="border-t border-white/5 w-full text-right pt-1">{(max/2).toFixed()}</div>
          <div className="border-t border-white/5 w-full text-right pt-1">0</div>
        </div>

        {/* Bars */}
        {data.amounts.map((amount, i) => (
          <div key={i} className="w-full flex flex-col items-center justify-end h-full z-10 group relative">
            <div 
              className="w-full bg-gold/80 rounded-t-md transition-all hover:bg-gold cursor-pointer"
              style={{ height: `${(amount / max) * 100}%`, minHeight: amount > 0 ? '4px' : '0' }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap transition-opacity">
                ₹{amount}
              </div>
            </div>
            <span className="text-xs text-white/50 mt-4">{data.days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
