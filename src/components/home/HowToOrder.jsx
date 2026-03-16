import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'
import { FaWhatsapp, FaInstagram, FaGlobe } from 'react-icons/fa'

export default function HowToOrder() {
  const methods = [
    {
      icon: <FaGlobe className="w-10 h-10 text-gold" />,
      title: "Order Online",
      description: "Browse our menu and checkout securely right here on our website.",
      btnText: "Shop Now",
      btnLink: "/collections/all",
      btnClass: "bg-white/10 text-white hover:bg-gold hover:text-darkBg",
      isAnchor: false
    },
    {
      icon: <FaWhatsapp className="w-10 h-10 text-[#25D366]" />,
      title: "Order on WhatsApp",
      description: "Send us a message and we'll help you place your order instantly.",
      btnText: "Chat Now",
      btnLink: BUSINESS_CONFIG.socials.whatsapp,
      btnClass: "bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white",
      isAnchor: true,
      subText: BUSINESS_CONFIG.whatsapp
    },
    {
      icon: <FaInstagram className="w-10 h-10 text-[#E1306C]" />,
      title: "Order on Instagram",
      description: "DM us your cravings on Instagram and we'll take it from there.",
      btnText: "DM Us",
      btnLink: BUSINESS_CONFIG.socials.instagram,
      btnClass: "bg-[#E1306C]/20 text-[#E1306C] hover:bg-[#E1306C] hover:text-white",
      isAnchor: true,
      subText: `@${BUSINESS_CONFIG.instagram}`
    }
  ]

  return (
    <section id="how-to-order" className="py-24 bg-darkBg text-softWhite relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-4">
            3 Ways to Order 🍪
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Choose the method that works best for you. We're ready to bake!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-darkBg2 border border-white/5 rounded-2xl p-8 hover:border-gold/50 transition-colors group flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-darkBg rounded-full flex items-center justify-center mb-6 shadow-inner">
                {m.icon}
              </div>
              <h3 className="text-2xl font-syne font-bold mb-3">{m.title}</h3>
              <p className="text-white/70 mb-8 flex-grow">{m.description}</p>
              
              {m.isAnchor ? (
                <a 
                  href={m.btnLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-4 rounded-xl font-bold transition-all ${m.btnClass}`}
                >
                  {m.btnText}
                </a>
              ) : (
                <Link 
                  to={m.btnLink}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${m.btnClass}`}
                >
                  {m.btnText}
                </Link>
              )}

              {m.subText && (
                <p className="mt-4 text-sm font-medium text-white/40 tracking-wide font-syne">
                  {m.subText}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}