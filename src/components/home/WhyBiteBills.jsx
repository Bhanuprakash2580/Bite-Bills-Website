import { motion } from 'framer-motion'

export default function WhyBiteBills() {
  return (
    <section className="bg-softWhite text-darkBg py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6">
              Why Bite Bills?
            </h2>
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-syne font-bold text-choco mb-2">1. Baked Fresh on Order</h4>
                <p className="text-darkBg/80 leading-relaxed">
                  We don't do stale. The moment you place your order, we fire up the oven. Your cookies go from dough to delivery box in under 3 hours for local deliveries.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-syne font-bold text-choco mb-2">2. Unmatched Ingredients</h4>
                <p className="text-darkBg/80 leading-relaxed">
                  Pure French butter, Belgian chocolate, and Madagascar vanilla. We never compromise on quality because you can taste the difference in every single crumb.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-syne font-bold text-choco mb-2">3. Zero Preservatives</h4>
                <p className="text-darkBg/80 leading-relaxed">
                  Real food spoils, which is exactly why our cookies hit different. We use absolutely zero chemical preservatives or artificial flavor enhancers.
                </p>
              </div>
            </div>
            
            {/* Pull Quote */}
            <blockquote className="mt-12 pl-6 border-l-4 border-gold italic text-2xl font-playfair text-darkBg/90">
              "The best cookies in the city, hands down. The Nutella Lava is an experience."
            </blockquote>
          </motion.div>

          {/* Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-4 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80" 
              alt="Baking process" 
              className="rounded-2xl w-full h-64 object-cover mt-12 shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80" 
              alt="Chocolate stretch" 
              className="rounded-2xl w-full h-80 object-cover shadow-xl"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-darkBg w-32 h-32 rounded-full flex items-center justify-center font-bold font-syne text-xl text-center shadow-2xl border-4 border-softWhite rotate-12">
              100% Eggless
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}