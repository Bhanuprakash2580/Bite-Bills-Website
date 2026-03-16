import { useState } from 'react'
import { X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function AuthModal({ open }) {
  const { setAuthModalOpen } = useUIStore()
  const [view, setView] = useState('login') // 'login' | 'signup'

  if (!open) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={() => setAuthModalOpen(false)}
      >
        <div 
          className="bg-darkBg w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 pb-2">
            <h2 className="text-2xl font-syne font-bold text-softWhite">
              {view === 'login' ? 'Welcome Back 🍪' : 'Join the Club 🎉'}
            </h2>
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 pt-4">
            {view === 'login' ? (
              <LoginForm onSuccess={() => setAuthModalOpen(false)} />
            ) : (
              <SignupForm onSuccess={() => setAuthModalOpen(false)} />
            )}

            {/* Toggle View */}
            <div className="mt-6 text-center text-sm text-white/50 font-medium">
              {view === 'login' ? (
                <p>Don't have an account? <button onClick={() => setView('signup')} className="text-gold hover:underline">Sign up</button></p>
              ) : (
                <p>Already have an account? <button onClick={() => setView('login')} className="text-gold hover:underline">Log in</button></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}