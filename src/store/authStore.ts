import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role?: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ error?: string }>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      initialize: () => {
        // Check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            const user: User = {
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name,
              avatar_url: session.user.user_metadata?.avatar_url,
              role: session.user.user_metadata?.role || 'user',
            };
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        });

        // Listen for auth changes
        supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user) {
            const user: User = {
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name,
              avatar_url: session.user.user_metadata?.avatar_url,
              role: session.user.user_metadata?.role || 'user',
            };
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        });
      },

      signIn: async (email, password) => {
        set({ isLoading: true });
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        set({ isLoading: false });

        if (error) {
          return { error: error.message };
        }

        return {};
      },

      signUp: async (email, password, name) => {
        set({ isLoading: true });
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role: 'user',
            },
          },
        });

        set({ isLoading: false });

        if (error) {
          return { error: error.message };
        }

        return {};
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      },

      resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          return { error: error.message };
        }

        return {};
      },

      updateProfile: async (updates) => {
        if (!get().user) {
          return { error: 'Not authenticated' };
        }

        const { error } = await supabase.auth.updateUser({
          data: updates,
        });

        if (error) {
          return { error: error.message };
        }

        // Update local state
        set({ user: { ...get().user!, ...updates } });

        return {};
      },
    }),
    {
      name: 'bite-bills-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);