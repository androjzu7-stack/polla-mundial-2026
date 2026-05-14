import { Navigate } from 'react-router-dom'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-5xl mb-4">⚽</div>
        <p className="text-navy-700 font-semibold">Cargando...</p>
      </div>
    </div>
  )
}

export function ProtectedRoute({ user, loading, children }) {
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return children
}

export function AdminRoute({ user, profile, loading, children }) {
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (profile && !profile.is_admin) return <Navigate to="/" replace />
  // Si no hay profile aún pero hay user, mostrar loading brevemente
  if (!profile) return <LoadingScreen />
  return children
}
