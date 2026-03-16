// REVIEWS DISABLED FOR LAUNCH — uncomment below to enable in HomePage.jsx
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      verified: true,
      text: "The Nutella Lava cookies genuinely changed my life. They arrived still warm and the center was perfectly gooey. Ordering again tomorrow!",
      rating: 5,
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Rahul T.",
      verified: true,
      text: "Best brownies in the city. Delivery was super fast within the 5km free zone. The packaging is completely premium too.",
      rating: 5,
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Priya K.",
      verified: true,
      text: "Got the assorted gift box for a friend's birthday and she loved it. The classic butter cookies melt in your mouth.",
      rating: 5,
      date: "3 weeks ago"
    }
  ]

  return (
    <section className="py-24 bg-darkBg2 text-softWhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-4">
            Hear From Our Fans 🗣️
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-gold w-6 h-6" />
            ))}
          </div>
          <p className="text-white/60 text-lg">
            4.9/5 Average Rating based on 500+ orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-darkBg border border-white/5 rounded-2xl p-8 hover:border-gold/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-gold w-4 h-4" />
                ))}
              </div>
              <p className="text-white/80 italic mb-6">"{review.text}"</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-goldLight/20 rounded-full flex items-center justify-center text-gold font-bold font-syne">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide">{review.name}</h4>
                    {review.verified && <span className="text-xs text-green-400">Verified Buyer</span>}
                  </div>
                </div>
                <span className="text-white/40 text-xs">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
