import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function SignupForm({ onSuccess }) {
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signup(email, password, { full_name: name })
    if (!error) {
      onSuccess?.()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-white/60 font-medium ml-1">Full Name</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-darkBg2 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold mt-1"
        />
      </div>
      <div>
        <label className="text-sm text-white/60 font-medium ml-1">Email</label>
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-darkBg2 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold mt-1"
        />
      </div>
      <div>
        <label className="text-sm text-white/60 font-medium ml-1">Password</label>
        <input 
          type="password" 
          required 
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-darkBg2 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold mt-1"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-darkBg font-bold text-lg py-4 rounded-xl hover:bg-goldLight transition-colors shadow-lg mt-4"
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  )
}
