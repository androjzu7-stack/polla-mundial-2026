import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function LoadingScreen({ onTimeout }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onTimeout])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">⚽</div>
        <p className="text-navy-700 font-semibold">Cargando...</p>
      </div>
    </div>
  )
}

export function ProtectedRoute({ user, loading, children }) {
  const [timedOut, setTimedOut] = useState(false)

  if (timedOut) return <Navigate to="/login" replace />
  if (loading) return <LoadingScreen onTimeout={() => setTimedOut(true)} />
  if (!user) return <Navigate to="/login" replace />
  return children
}

export function AdminRoute({ user, profile, loading, children }) {
  const [timedOut, setTimedOut] = useState(false)

  if (timedOut) return <Navigate to="/login" replace />
  if (loading) return <LoadingScreen onTimeout={() => setTimedOut(true)} />
  if (!user) return <Navigate to="/login" replace />
  if (!profile) return <LoadingScreen onTimeout={() => setTimedOut(true)} />
  if (!profile.is_admin) return <Navigate to="/" replace />
  return children
}
