import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()

  // Replace with your actual admin email
  const ADMIN_EMAILS = ['bhanuprakash2580@gmail.com']

  if (loading) return null // Wait for session to load

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/" replace />
  }

  return children
}
