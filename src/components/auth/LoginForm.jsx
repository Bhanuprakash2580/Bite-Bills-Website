import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function LoginForm({ onSuccess }) {
  const { loginWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await loginWithEmail(email, password)
    if (!error) {
      onSuccess?.()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-white/60 font-medium ml-1">Email</label>
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-darkBg border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold mt-1 transition-all"
        />
      </div>
      <div>
        <label className="text-sm text-white/60 font-medium ml-1">Password</label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-darkBg border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold mt-1 transition-all"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-darkBg font-bold text-lg py-4 rounded-xl hover:bg-goldLight transition-colors shadow-lg mt-4"
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  )
}
