import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function DeliveryPage() {
  return (
    <>
      <Helmet>
        <title>Delivery Info | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite font-outfit">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-syne font-bold mb-12 text-gold"
          >
            Fresh & On Time 🏎️
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-darkBg2 p-8 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <span>📍</span> Delivery Zones
              </h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex justify-between"><span>Nandipet Town</span> <span className="text-gold font-bold">Free</span></li>
                <li className="flex justify-between"><span>Within 5km</span> <span className="text-gold font-bold">₹20</span></li>
                <li className="flex justify-between"><span>5-15km</span> <span className="text-gold font-bold">₹50</span></li>
                <li className="flex justify-between"><span>Nizamabad City</span> <span className="text-gold font-bold">₹100</span></li>
              </ul>
            </div>
            <div className="bg-darkBg2 p-8 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <span>⏰</span> Order Timings
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                We bake strictly on order. Please allow <strong>2-4 hours</strong> for preparation and delivery. 
                <br/><br/>
                Orders placed after 8:00 PM will be delivered the next morning starting at 9:00 AM.
              </p>
            </div>
          </div>

          <section className="prose prose-invert max-w-none space-y-8">
            <div>
              <h3 className="text-2xl font-syne font-bold text-white mb-4">Packaging & Care</h3>
              <p className="text-white/70">
                Each order is packed in premium, food-safe boxes to maintain freshness. Our cookies are best enjoyed warm or at room temperature. We recommend storing them in an airtight container for up to 5 days.
              </p>
            </div>

            <div className="bg-gold/5 border-l-4 border-gold p-6 rounded-r-xl">
                <h4 className="text-gold font-bold mb-2">Self Pick-Up</h4>
                <p className="text-sm text-white/80">
                  Prefer to skip the delivery charge? Select <strong>Pick Up</strong> at checkout and collect your order from our kitchen in Nandipet. We'll WhatsApp you once your order is ready!
                </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
