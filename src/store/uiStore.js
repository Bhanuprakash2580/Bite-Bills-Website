import { create } from 'zustand'

export const useUIStore = create((set) => ({
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  authModalOpen: false,
  setAuthModalOpen: (open) => set({ authModalOpen: open }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  announcementVisible: true,
  setAnnouncementVisible: (visible) => set({ announcementVisible: visible }),
}))