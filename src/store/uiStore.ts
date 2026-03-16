import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          return { theme: newTheme };
        });
      },

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
    }),
    {
      name: 'bite-bills-ui',
    }
  )
);

// Initialize theme on app start
if (typeof window !== 'undefined') {
  const theme = localStorage.getItem('bite-bills-ui');
  if (theme) {
    const parsedTheme = JSON.parse(theme);
    document.documentElement.classList.toggle('dark', parsedTheme.state.theme === 'dark');
  }
}