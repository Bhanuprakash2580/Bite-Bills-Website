import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import { BUSINESS_CONFIG } from '../constants/businessConfig'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Bite Bills</title>
      </Helmet>

      <main className="bg-darkBg min-h-screen pt-28 pb-24 text-softWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-syne font-bold mb-4 text-gold">Get in Touch 👋</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Questions? Special requests? Or just want to talk cookies? We're here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info Section */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-darkBg2 p-8 rounded-3xl border border-white/5 space-y-4">
                  <FaWhatsapp className="w-8 h-8 text-[#25D366]" />
                  <h3 className="text-xl font-bold">WhatsApp Us</h3>
                  <p className="text-white/60 text-sm">Best for instant support and order updates.</p>
                  <a href={BUSINESS_CONFIG.socials.whatsapp} target="_blank" rel="noreferrer" className="inline-block text-gold font-bold group">
                    Chat Now <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </a>
                </div>
                <div className="bg-darkBg2 p-8 rounded-3xl border border-white/5 space-y-4">
                  <FaPhone className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-bold">Call Us</h3>
                  <p className="text-white/60 text-sm">Speak directly with our head baker.</p>
                  <a href={`tel:${BUSINESS_CONFIG.phone}`} className="inline-block text-gold font-bold group">
                    {BUSINESS_CONFIG.phone} <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </a>
                </div>
              </div>

              <div className="bg-darkBg2 p-8 rounded-3xl border border-white/5 flex gap-6">
                <div className="p-4 bg-darkBg rounded-2xl h-fit">
                  <FaMapMarkerAlt className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Location</h3>
                  <p className="text-white/60 leading-relaxed">
                    Main Road, Nandipet Town<br/>
                    Nizamabad District, Telangana 503212
                  </p>
                </div>
              </div>

              <div className="bg-darkBg2 p-8 rounded-3xl border border-white/5 flex gap-6">
                <div className="p-4 bg-darkBg rounded-2xl h-fit">
                  <FaEnvelope className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-white/60">hello@bitebills.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-darkBg2 rounded-3xl border border-white/5 overflow-hidden relative min-h-[400px]">
                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  <div className="space-y-4">
                    <FaMapMarkerAlt className="w-12 h-12 text-gold mx-auto opacity-50" />
                    <p className="text-white/40 font-medium">Map currently loading or offline.<br/>Visit us at Main Road, Nandipet.</p>
                  </div>
                </div>
                {/* Embed map if needed */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
