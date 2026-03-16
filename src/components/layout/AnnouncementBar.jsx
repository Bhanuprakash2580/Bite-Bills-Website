import { X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'

export default function AnnouncementBar() {
  const { announcementVisible, setAnnouncementVisible } = useUIStore()

  if (!announcementVisible) return null

  return (
    <div className="bg-gold text-darkBg py-2 px-4 relative flex items-center justify-center overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="mx-4 text-sm font-medium">🍪 Free delivery within 5km</span>
        <span className="mx-4 text-sm font-medium">·</span>
        <span className="mx-4 text-sm font-medium">Order on WhatsApp</span>
        <span className="mx-4 text-sm font-medium">·</span>
        <span className="mx-4 text-sm font-medium">Baked Fresh Daily</span>
        <span className="mx-4 text-sm font-medium">·</span>
        <span className="mx-4 text-sm font-medium">Pay UPI or Card</span>
        <span className="mx-4 text-sm font-medium">·</span>
        <span className="mx-4 text-sm font-medium">🍪 Free delivery within 5km</span>
        <span className="mx-4 text-sm font-medium">·</span>
        <span className="mx-4 text-sm font-medium">Order on WhatsApp</span>
        <span className="mx-4 text-sm font-medium">·</span>
        <span className="mx-4 text-sm font-medium">Baked Fresh Daily</span>
        <span className="mx-4 text-sm font-medium">·</span>
        <span className="mx-4 text-sm font-medium">Pay UPI or Card</span>
      </div>
      <button 
        onClick={() => setAnnouncementVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors z-10"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}