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

  const isReady = !loading

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {user && (
          <Navbar user={user} profile={profile} onSignOut={signOut} />
        )}

        <main className="flex-1">
          <Routes>
            <Route
              path="/login"
              element={isReady && user ? <Navigate to="/" replace /> : <Login onLogin={signIn} />}
            />
            <Route path="/register" element={<Navigate to="/login" replace />} />

            <Route path="/" element={
              <ProtectedRoute user={isReady ? user : null} loading={!isReady}>
                <Home profile={profile} />
              </ProtectedRoute>
            } />
            <Route path="/matches" element={
              <ProtectedRoute user={isReady ? user : null} loading={!isReady}>
                <Matches user={user} />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute user={isReady ? user : null} loading={!isReady}>
                <Leaderboard user={user} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute user={isReady ? user : null} loading={!isReady}>
                <Profile user={user} profile={profile} onUpdateProfile={updateProfile} />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute user={isReady ? user : null} profile={profile} loading={!isReady}>
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
