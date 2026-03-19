import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../hooks/useAuth'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'

export default function LoginPage() {
  const { loginWithGoogle, loading: authLoading } = useAuth()
  const [view, setView] = useState('login')

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center px-4 py-12 relative overflow-hidden text-softWhite">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full -ml-32 -mb-32 blur-3xl opacity-20"></div>

      <Helmet><title>{view === 'login' ? 'Login' : 'Sign Up'} | Bite Bills</title></Helmet>

      <div className="bg-darkBg2 p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white/5 max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧁</div>
          <h1 className="text-3xl font-syne font-bold text-gold">
            {view === 'login' ? 'Welcome Back!' : 'Start Your Sweet Journey'}
          </h1>
          <p className="text-white/40 mt-2 font-medium">
            {view === 'login' 
              ? 'Login to place your order' 
              : 'Create an account to join the club'}
          </p>
        </div>

        {/* OAuth Provider */}
        <button 
          onClick={loginWithGoogle}
          disabled={authLoading}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-xl font-bold text-white hover:bg-white/10 transition-all mb-8 shadow-sm disabled:opacity-50"
        >
          {authLoading ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <span className="relative px-4 bg-darkBg2 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Or email login</span>
        </div>

        {view === 'login' ? (
          <LoginForm onSuccess={() => window.location.href = '/'} />
        ) : (
          <SignupForm onSuccess={() => setView('login')} />
        )}

        <div className="mt-8 text-center text-white/40 font-medium">
          {view === 'login' ? (
            <p>Don't have an account? <button onClick={() => setView('signup')} className="text-gold font-bold hover:text-white transition-colors">Sign up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setView('login')} className="text-gold font-bold hover:text-white transition-colors">Log in</button></p>
          )}
        </div>
      </div>
    </div>
  )
}
