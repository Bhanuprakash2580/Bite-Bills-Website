import { useState } from 'react'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'admin123') { // Hardcoded password
      localStorage.setItem('isAdmin', 'true')
      onLogin()
    } else {
      setError('Invalid password!')
    }
  }

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center px-4">
      <div className="bg-darkBg2 border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-syne font-bold text-gold mb-2">Admin Login</h2>
          <p className="text-white/60">Enter password to manage orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-cream font-medium ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-gold text-darkBg font-bold py-4 rounded-xl hover:bg-goldLight transition-all uppercase tracking-widest shadow-lg shadow-gold/20"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
