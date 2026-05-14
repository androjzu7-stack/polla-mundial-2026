import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Navbar } from './components/shared/Navbar'
import { Footer } from './components/shared/Footer'
import { ProtectedRoute, AdminRoute } from './components/shared/ProtectedRoute'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Matches } from './pages/Matches'
import { Leaderboard } from './pages/Leaderboard'
import { Profile } from './pages/Profile'
import { Admin } from './pages/Admin'

function App() {
  const { user, profile, loading, signIn, signOut, updateProfile } = useAuth()

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {user && (
          <Navbar user={user} profile={profile} onSignOut={signOut} />
        )}

        <main className="flex-1">
          <Routes>
            {/* Login */}
            <Route
              path="/login"
              element={user && !loading ? <Navigate to="/" replace /> : <Login onLogin={signIn} />}
            />

            {/* Ruta de registro deshabilitada — admin crea las cuentas */}
            <Route path="/register" element={<Navigate to="/login" replace />} />

            {/* Rutas protegidas */}
            <Route path="/" element={
              <ProtectedRoute user={user} loading={loading}>
                <Home profile={profile} />
              </ProtectedRoute>
            } />
            <Route path="/matches" element={
              <ProtectedRoute user={user} loading={loading}>
                <Matches user={user} />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute user={user} loading={loading}>
                <Leaderboard user={user} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute user={user} loading={loading}>
                <Profile user={user} profile={profile} onUpdateProfile={updateProfile} />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute user={user} profile={profile} loading={loading}>
                <Admin />
              </AdminRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {user && <Footer />}
      </div>
    </BrowserRouter>
  )
}

export default App
