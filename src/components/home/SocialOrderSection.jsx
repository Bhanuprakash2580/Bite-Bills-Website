import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function SocialOrderSection() {
  return (
    <section className="bg-cream py-0 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Instagram Side */}
        <div className="flex-1 bg-white p-12 md:p-24 flex flex-col items-center justify-center text-center relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f09433]/5 via-[#dc2743]/5 to-[#bc1888]/5 group-hover:opacity-100 transition-opacity opacity-0 pointer-events-none"></div>
          <FaInstagram className="w-20 h-20 text-[#E1306C] mb-6" />
          <h2 className="text-3xl md:text-5xl font-syne font-bold text-darkBg mb-4">
            Follow & DM to Order
          </h2>
          <p className="text-darkBg/70 text-lg mb-2 font-medium">@{BUSINESS_CONFIG.instagram} on Instagram</p>
          <p className="text-darkBg/60 mb-8">DM us your order any time 📸</p>
          <a
            href={BUSINESS_CONFIG.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Follow on Instagram
          </a>
        </div>

        {/* WhatsApp Side */}
        <div className="flex-1 bg-softWhite p-12 md:p-24 flex flex-col items-center justify-center text-center relative group">
          <div className="absolute inset-0 bg-[#25D366]/5 group-hover:opacity-100 transition-opacity opacity-0 pointer-events-none"></div>
          <FaWhatsapp className="w-20 h-20 text-[#25D366] mb-6" />
          <h2 className="text-3xl md:text-5xl font-syne font-bold text-darkBg mb-4">
            Chat to Order
          </h2>
          <p className="text-darkBg/70 text-lg mb-2 font-medium">{BUSINESS_CONFIG.whatsapp}</p>
          <p className="text-darkBg/60 mb-8">We reply within minutes 💬</p>
          <a
            href={BUSINESS_CONFIG.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}