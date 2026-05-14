import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Trophy, Calendar, User, LogOut, Shield, Menu, X, Home } from 'lucide-react'

export function Navbar({ user, profile, onSignOut }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await onSignOut()
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/matches', label: 'Partidos', icon: Calendar },
    { to: '/leaderboard', label: 'Ranking', icon: Trophy },
    { to: '/profile', label: 'Mi Perfil', icon: User },
    ...(profile?.is_admin ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-navy-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-wider text-gold-400 hover:text-gold-300 transition-colors">
            <span className="text-2xl">⚽</span>
            <span className="hidden sm:inline">POLLA MUNDIAL 2026</span>
            <span className="sm:hidden">MUNDIAL 26</span>
          </Link>

          {/* Desktop nav */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive(to)
                      ? 'bg-gold-500 text-navy-900'
                      : 'hover:bg-navy-700 text-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}

              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-navy-600">
                <div className="text-right">
                  <p className="text-xs text-gray-400">Hola,</p>
                  <p className="text-sm font-bold text-gold-400">{profile?.username || 'usuario'}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-red-900/30 hover:text-red-400 text-gray-400 transition-all"
                  title="Cerrar sesión"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Mobile hamburger */}
          {user && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-navy-700 transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {user && mobileOpen && (
        <div className="md:hidden bg-navy-900 border-t border-navy-700 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  isActive(to)
                    ? 'bg-gold-500 text-navy-900'
                    : 'hover:bg-navy-700 text-gray-200'
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-navy-700">
              <div className="px-4 py-2 text-sm text-gray-400">
                Sesión de: <span className="text-gold-400 font-bold">{profile?.username}</span>
              </div>
              <button
                onClick={() => { handleSignOut(); setMobileOpen(false) }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 font-semibold w-full transition-all"
              >
                <LogOut size={20} />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
