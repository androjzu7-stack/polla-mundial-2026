import { useState } from 'react'
import { Lock, LogIn, AlertCircle, UserCheck } from 'lucide-react'

export function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const fakeEmail = `${username.trim().toLowerCase()}@polla2026.interno`
      await onLogin(fakeEmail, password)
    } catch (err) {
      setError('Usuario o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">⚽</div>
          <h1 className="text-4xl text-gold-400 font-display tracking-widest">MUNDIAL 2026</h1>
          <p className="text-gray-400 font-body mt-1">Ingresa con tu usuario y contraseña</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-display text-white tracking-wider mb-6">INICIAR SESIÓN</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-900/40 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg mb-5 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">Usuario</label>
              <div className="relative">
                <UserCheck size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="tu_usuario"
                  required
                  autoCapitalize="none"
                  autoCorrect="off"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg mt-2 shadow-lg"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />Ingresando...</>
              ) : (
                <><LogIn size={20} />Ingresar</>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            ¿Olvidaste tu contraseña? Contacta al administrador.
          </p>
        </div>
      </div>
    </div>
  )
}
