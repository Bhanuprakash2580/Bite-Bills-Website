import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { BUSINESS_CONFIG } from '../../constants/businessConfig'

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Instagram Button */}
      <a
        href={BUSINESS_CONFIG.socials.instagram}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform group"
        aria-label="Order on Instagram"
      >
        <FaInstagram className="w-8 h-8" />
        <span className="absolute right-16 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Order on Instagram
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={BUSINESS_CONFIG.socials.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform animate-pulse group"
        aria-label="Order on WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
        <span className="absolute right-16 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Order on WhatsApp
        </span>
      </a>
    </div>
  )
}