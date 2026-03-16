import { IndianRupee, ShoppingCart, Clock, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'

export default function DashboardStats({ orders }) {
  const today = new Date().setHours(0,0,0,0)
  
  const todaysOrders = orders.filter(o => new Date(o.created_at).setHours(0,0,0,0) === today)
  const pendingOrders = orders.filter(o => o.status === 'pending')
  const totalRevenue = orders.reduce((sum, o) => sum + (o.payment_status === 'paid' ? o.total : 0), 0)
  
  const stats = [
    {
      title: "Today's Orders",
      value: todaysOrders.length,
      icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
      bg: "bg-blue-400/10",
      trend: "+12% from yesterday"
    },
    {
      title: "Pending Action",
      value: pendingOrders.length,
      icon: <Clock className="w-6 h-6 text-orange-400" />,
      bg: "bg-orange-400/10",
      trend: "Requires confirmation"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: <IndianRupee className="w-6 h-6 text-green-400" />,
      bg: "bg-green-400/10",
      trend: "+8% this week"
    },
    {
      title: "Conversion Rate",
      value: "4.2%",
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      bg: "bg-purple-400/10",
      trend: "Steady"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-darkBg2 border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
          <h3 className="text-white/60 font-medium text-sm mb-1">{stat.title}</h3>
          <p className="text-3xl font-syne font-bold text-cream mb-2">{stat.value}</p>
          <p className="text-xs text-white/40">{stat.trend}</p>
        </div>
      ))}
    </div>
  )
}
