import { Link } from 'react-router-dom'
import { Trophy, Calendar, TrendingUp, Star } from 'lucide-react'
import { ChampionPicker } from '../components/champion/ChampionPicker'

export function Home({ user, profile }) {
  const features = [
    { icon: Calendar, title: 'Predice Partidos', desc: 'Ingresa tu marcador exacto antes de cada partido. ¡3 puntos si lo clavás!' },
    { icon: TrendingUp, title: 'Ranking en Vivo', desc: 'Tabla de posiciones que se actualiza en tiempo real con cada resultado.' },
    { icon: Star, title: 'Elige al Campeón', desc: 'Antes del primer partido apuesta quién levantará la copa. ¡Vale 10 puntos!' },
    { icon: Trophy, title: 'Compite con tus Colegas', desc: 'Demuestra que sabes de fútbol. El mejor predictor gana la gloria eterna.' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white -mx-4 px-4 pt-16 pb-20 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 text-white/5 font-display text-[200px] leading-none select-none">26</div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="text-6xl mb-4">⚽</div>
          <h1 className="font-display text-5xl md:text-7xl text-gold-400 tracking-widest mb-2">
            POLLA MUNDIAL
          </h1>
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-widest mb-6">
            FIFA 2026
          </h2>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8 font-body">
            Predice los resultados de los <strong className="text-gold-400">104 partidos</strong> del Mundial
            y compite con tus colegas por ser el mejor pronosticador.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/matches" className="btn-gold text-lg py-3 px-8 inline-block">
              📅 Ver Partidos
            </Link>
            <Link to="/leaderboard" className="btn-outline border-white text-white hover:bg-white hover:text-navy-900 text-lg py-3 px-8 inline-block">
              🏆 Ver Ranking
            </Link>
          </div>

          {profile && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 text-sm">
              <span className="text-gray-400">Bienvenido,</span>
              <span className="text-gold-400 font-bold">{profile.full_name || profile.username}</span>
              <span className="text-gray-400">·</span>
              <span className="text-white font-bold">{profile.total_points} pts</span>
            </div>
          )}
        </div>
      </div>

      {/* Champion picker */}
      {user && <ChampionPicker userId={user.id} />}

      {/* Sistema de puntos */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="section-title text-center mb-2">SISTEMA DE PUNTOS</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Así se ganan los puntos en cada partido</p>
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="card-hover border-2 border-green-200 bg-green-50 flex sm:flex-col sm:text-center items-center gap-4 sm:gap-2">
            <div className="text-4xl font-display text-green-700 w-14 text-center shrink-0">3</div>
            <div>
              <p className="font-bold text-green-800">Marcador Exacto</p>
              <p className="text-xs text-green-600 mt-1 leading-relaxed">¡Resultado perfecto! Si predijiste 2-1 y el partido terminó 2-1, son tuyos los 3 puntos.</p>
            </div>
          </div>
          <div className="card-hover border-2 border-blue-200 bg-blue-50 flex sm:flex-col sm:text-center items-center gap-4 sm:gap-2">
            <div className="text-4xl font-display text-blue-700 w-14 text-center shrink-0">1</div>
            <div>
              <p className="font-bold text-blue-800">Resultado Correcto</p>
              <p className="text-xs text-blue-600 mt-1 leading-relaxed">Sabías quién iba a ganar aunque no el marcador exacto. Si predijiste 1-0 y ganó 3-0, ¡igual sumas!</p>
            </div>
          </div>
          <div className="card-hover border-2 border-purple-200 bg-purple-50 flex sm:flex-col sm:text-center items-center gap-4 sm:gap-2">
            <div className="text-4xl font-display text-purple-700 w-14 text-center shrink-0">+10</div>
            <div>
              <p className="font-bold text-purple-800">Campeón del Mundo</p>
              <p className="text-xs text-purple-600 mt-1 leading-relaxed">¿Sabes quién levantará la copa? Elige tu campeón antes del primer partido y gana 10 puntos extra que pueden voltear la tabla.</p>
            </div>
          </div>
        </div>

        {/* Tip motivador */}
        <div className="mt-5 bg-gold-50 border border-gold-200 rounded-xl px-5 py-3 text-center">
          <p className="text-sm text-gold-800">
            💡 <strong>Tip:</strong> Predice todos los partidos de la fase de grupos antes del <strong>11 de junio</strong>. ¡Cada punto cuenta para el ranking!
          </p>
        </div>
      </div>

      {/* ¿Cómo jugar? */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="section-title text-center mb-6">¿CÓMO JUGAR?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-hover flex gap-4">
              <div className="bg-navy-100 text-navy-700 rounded-xl p-3 h-fit">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-navy-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dinámica del torneo */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="section-title text-center mb-6">LA DINÁMICA</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card text-center border-t-4 border-gold-400">
            <div className="text-3xl mb-2">1️⃣</div>
            <h3 className="font-bold text-navy-800 mb-1">Antes del 11 de junio</h3>
            <p className="text-sm text-gray-600">Predice todos los 72 partidos de la fase de grupos y elige tu campeón del mundo.</p>
          </div>
          <div className="card text-center border-t-4 border-navy-400">
            <div className="text-3xl mb-2">2️⃣</div>
            <h3 className="font-bold text-navy-800 mb-1">Eliminatorias</h3>
            <p className="text-sm text-gray-600">Cuando se conozcan los equipos, tienes 24 horas para predecir cada ronda eliminatoria.</p>
          </div>
          <div className="card text-center border-t-4 border-green-400">
            <div className="text-3xl mb-2">3️⃣</div>
            <h3 className="font-bold text-navy-800 mb-1">Sigue el Ranking</h3>
            <p className="text-sm text-gray-600">El ranking se actualiza en tiempo real. ¡El mejor pronosticador se lleva la gloria!</p>
          </div>
        </div>
      </div>

      {/* Mundial info */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-2xl p-6 text-white">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-display text-4xl text-gold-400">48</div>
              <p className="text-sm text-gray-300">Equipos</p>
            </div>
            <div>
              <div className="font-display text-4xl text-gold-400">104</div>
              <p className="text-sm text-gray-300">Partidos</p>
            </div>
            <div>
              <div className="font-display text-4xl text-gold-400">3</div>
              <p className="text-sm text-gray-300">Países sede</p>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            🇺🇸 Estados Unidos · 🇨🇦 Canadá · 🇲🇽 México<br />
            <span className="text-gold-400 font-semibold">11 junio — 19 julio 2026</span>
          </p>
        </div>
      </div>
    </div>
  )
}
