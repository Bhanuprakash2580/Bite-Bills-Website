import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-darkBg text-softWhite">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1920&q=85&auto=format&fit=crop"
          alt="Freshly baked cookies"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/80 to-darkBg/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {/* Tag */}
          <motion.span 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-gold font-medium mb-6 text-sm backdrop-blur-sm"
          >
            Baked Fresh strictly on Order
          </motion.span>

          {/* Headline */}
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl md:text-7xl lg:text-8xl font-syne font-bold tracking-tight text-white mb-6 leading-[0.9]"
          >
            Cookies that <span className="text-gold">absolutely</span> <br/> SLAP
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Every bite tells a story — baked fresh, made with love, just for you. 🍪✨
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/collections/all"
              className="px-8 py-4 rounded-full bg-gold text-darkBg font-bold text-lg hover:bg-goldLight transition-colors shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2"
            >
              Order Now
            </Link>
            
            <a 
              href={BUSINESS_CONFIG.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:bg-[#1ebd5a] transition-colors shadow-lg hover:shadow-[#25D366]/20 flex items-center justify-center gap-2"
            >
              Order on WhatsApp 💬
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave/Gradient to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-darkBg2 to-transparent"></div>
    </section>
  )
}