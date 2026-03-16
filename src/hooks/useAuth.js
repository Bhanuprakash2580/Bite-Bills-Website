import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import { toast } from 'react-hot-toast'

export function useAuth() {
  const { user, session, loading, isAdmin, setUser, setLoading, signOut } = useAuthStore()

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null, session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null, session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setLoading])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast.success('Welcome back!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const signup = async (email, password, metadata = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      })
      if (error) throw error
      toast.success('Account created successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const logout = async () => {
    try {
      await signOut()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  return {
    user,
    session,
    loading,
    isAdmin,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  }
}