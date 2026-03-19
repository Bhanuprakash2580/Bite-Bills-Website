import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') setIsAdmin(true)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123') { 
      localStorage.setItem('adminAuth', 'true')
      setIsAdmin(true)
      setError('')
      toast.success('Access Granted')
    } else {
      setError('Invalid Access Key!')
      setPassword('')
      toast.error('Access Denied')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAdmin(false)
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center px-4">
        <Helmet><title>Admin Login | Bite Bills</title></Helmet>
        <div className="bg-darkBg2 p-8 rounded-[2rem] border border-white/10 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-2xl font-syne font-bold text-gold">Admin Access</h2>
            <p className="text-white/40 text-sm mt-1">Bite Bills Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-darkBg border border-white/10 rounded-xl px-4 py-4 text-white focus:border-gold outline-none"
            />
            {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}
            <button className="w-full bg-gold text-darkBg font-bold py-4 rounded-xl hover:bg-goldLight transition-all">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Admin Dashboard | Bite Bills</title></Helmet>
      <AdminDashboard onLogout={handleLogout} />
    </>
  )
}