import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,

  setUser: (user, session) => set({ 
    user, 
    session, 
    isAdmin: user?.email === import.meta.env.VITE_ADMIN_EMAIL || user?.email === 'admin@bitebills.in' 
  }),
  
  setLoading: (loading) => set({ loading }),
  
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null, isAdmin: false })
  }
}))