import { useState } from 'react'
import { usePredictions } from '../hooks/usePredictions'
import { calcUserStats, getPointsLabel } from '../lib/scoring'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Save, User, Trophy, Target, CheckCircle2, X } from 'lucide-react'

export function Profile({ user, profile, onUpdateProfile }) {
  const { predictions, loading } = usePredictions(user?.id)
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [saving, setSaving] = useState(false)

  const stats = calcUserStats(predictions)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onUpdateProfile({ full_name: fullName })
      setEditing(false)
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const finishedPredictions = predictions.filter(p => p.matches?.status === 'finished')
    .sort((a, b) => new Date(a.matches?.match_date) - new Date(b.matches?.match_date))

  return (
    <div className="page-container animate-fade-in">
      <h1 className="section-title mb-6">👤 MI PERFIL</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card text-center">
            <div className="w-20 h-20 bg-navy-700 text-gold-400 rounded-full flex items-center justify-center text-4xl font-display mx-auto mb-3 shadow-lg">
              {profile?.username?.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-bold text-xl text-navy-800">{profile?.username}</h2>
            {editing ? (
              <div className="mt-3 space-y-2">
                <input
                  type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="input-field text-sm text-center"
                />
                <div className="flex gap-2 justify-center">
                  <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-1.5 flex items-center gap-1">
                    <Save size={14} /> {saving ? 'Guardando...' : 'Guardar'}
                  </button>
                  <button onClick={() => { setEditing(false); setFullName(profile?.full_name || '') }}
                    className="btn-outline text-sm py-1.5 flex items-center gap-1">
                    <X size={14} /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-500 text-sm mt-1">{profile?.full_name || 'Sin nombre completo'}</p>
                <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
                <button onClick={() => setEditing(true)}
                  className="mt-3 text-sm text-navy-600 hover:text-navy-800 font-semibold underline">
                  Editar nombre
                </button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="card">
            <h3 className="font-bold text-navy-700 mb-4 flex items-center gap-2"><Trophy size={18} /> Mis Estadísticas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Puntos totales</span>
                <span className="font-display text-3xl text-gold-500">{profile?.total_points || 0}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">✅ Marcador exacto</span>
                <span className="font-bold text-green-700">{stats.exact} <span className="text-xs text-gray-400">× 3pts</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">🎯 Resultado correcto</span>
                <span className="font-bold text-blue-700">{stats.correct} <span className="text-xs text-gray-400">× 1pt</span></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">❌ Incorrectas</span>
                <span className="font-bold text-gray-400">{stats.wrong}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Partidos jugados</span>
                <span className="font-bold text-navy-700">{stats.finished}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Predicciones guardadas</span>
                <span className="font-bold text-navy-700">{predictions.length}</span>
              </div>
              {stats.finished > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">% de aciertos</span>
                  <span className="font-bold text-navy-700">
                    {Math.round(((stats.exact + stats.correct) / stats.finished) * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Predictions history */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="font-bold text-navy-700 mb-4 flex items-center gap-2">
              <Target size={18} /> Historial de Predicciones
            </h3>
            {loading ? (
              <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="skeleton h-14 rounded-lg" />)}</div>
            ) : finishedPredictions.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-4xl mb-3">📋</div>
                <p>Aún no hay partidos terminados</p>
                <p className="text-sm mt-1">¡Ve a predecir tus partidos!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {finishedPredictions.map(pred => {
                  const match = pred.matches
                  if (!match) return null
                  const pointsInfo = getPointsLabel(pred.points_earned)

                  return (
                    <div key={pred.id} className={`flex items-center justify-between rounded-lg px-4 py-3 border ${pointsInfo.bg} border-gray-100`}>
                      <div className="flex items-center gap-3">
                        <div className={`text-lg font-display font-bold min-w-[28px] text-center ${
                          pred.points_earned === 3 ? 'text-green-700' :
                          pred.points_earned === 1 ? 'text-blue-700' : 'text-gray-400'
                        }`}>
                          +{pred.points_earned}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-800">
                            {match.home_flag} {match.home_team} <span className="text-gray-400 font-normal">vs</span> {match.away_team} {match.away_flag}
                          </p>
                          <p className="text-xs text-gray-500">
                            Mi predicción: <strong>{pred.predicted_home_score}-{pred.predicted_away_score}</strong>
                            {' · '}Real: <strong>{match.home_score}-{match.away_score}</strong>
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-xs font-bold ${pointsInfo.color}`}>{pointsInfo.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {format(new Date(match.match_date), 'd MMM', { locale: es })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
