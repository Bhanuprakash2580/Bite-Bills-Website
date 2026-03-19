import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Our Story | Bite Bills</title>
        <meta name="description" content="Discover the story behind Nandipet’s Favorite Bakery." />
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-syne font-bold mb-6 text-gold">Baked with Love in Nandipet ❤️</h1>
            <p className="text-xl text-white/70 leading-relaxed font-medium capitalize prose prose-invert">
              A journey of thousand cookies started with a single bowl of dough.
            </p>
          </motion.div>

          <div className="space-y-12 text-lg text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-syne font-bold text-white mb-4 italic">The Beginning</h2>
              <p>
                Bite Bills started in a small home kitchen in 2023 with one simple goal: to create the perfect eggless cookie that doesn't compromise on taste or texture. What began as a passionate hobby quickly turned into Nandipet's favorite destination for sweet treats.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-syne font-bold text-white mb-4 italic">Our Mission</h2>
              <p>
                We believe that every bite should tell a story. That's why we use only real butter, premium chocolate, and zero artificial preservatives. We are proud to be 100% vegetarian and eggless, making our treats accessible to everyone in our community.
              </p>
            </section>

            <section className="bg-darkBg2 p-8 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-syne font-bold text-gold mb-4">Why Nizamabad Loves Us</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                <li className="flex items-start gap-4">
                  <span className="text-2xl">🧈</span>
                  <div>
                    <h3 className="font-bold text-white">Pure Butter</h3>
                    <p className="text-sm">No margerine, no compromises. Just pure dairy goodness.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="font-bold text-white">Freshly Baked</h3>
                    <p className="text-sm">We bake strictly on order. Your cookies are literally warm from the oven.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl">🥚❌</span>
                  <div>
                    <h3 className="font-bold text-white">100% Eggless</h3>
                    <p className="text-sm">Specializing in moisture-rich eggless recipes that melt in your mouth.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h3 className="font-bold text-white">Truly Local</h3>
                    <p className="text-sm">Proudly rooted in Nandipet. We serve our neighbors first.</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="text-center pt-8">
              <p className="italic font-syne text-xl text-gold">"From our oven to your heart."</p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
