import { useState } from 'react'
import { Search, Lock, Trophy, CheckCircle2 } from 'lucide-react'
import { teams } from '../../data/matches2026'
import { useChampionPrediction } from '../../hooks/useChampionPrediction'

const TOURNAMENT_START = new Date('2026-06-11T00:00:00')

export function ChampionPicker({ userId }) {
  const { prediction, loading, saveChampion } = useChampionPrediction(userId)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const isClosed = new Date() >= TOURNAMENT_START
  const isLocked = !!prediction || isClosed

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleConfirm = async () => {
    if (!selected) return
    setSaving(true)
    setError(null)
    try {
      await saveChampion(selected.name)
      setSelected(null)
    } catch (err) {
      setError('No se pudo guardar. Intenta de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="skeleton h-32 rounded-xl mb-8" />

  return (
    <div className="max-w-5xl mx-auto px-4 mb-10">
      <h2 className="section-title text-center mb-1">🏆 ELIGE TU CAMPEÓN</h2>
      <p className="text-center text-gray-500 text-sm mb-5">
        Acierta el campeón del mundo y gana{' '}
        <span className="font-bold text-purple-700">+10 puntos extra</span>{' '}
        · Solo puedes elegir una vez
      </p>

      {isLocked ? (
        <div className={`rounded-xl border-2 p-5 text-center ${
          prediction ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'
        }`}>
          {prediction ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy size={20} className="text-purple-600" />
                <span className="font-bold text-purple-800 text-sm uppercase tracking-wide">Tu campeón elegido</span>
                <Lock size={14} className="text-purple-400" />
              </div>
              <div className="text-5xl mb-2">
                {teams.find(t => t.name === prediction.predicted_champion)?.flag ?? '🏳️'}
              </div>
              <p className="font-display text-2xl text-navy-800 tracking-wide">
                {prediction.predicted_champion}
              </p>
              <span className="inline-block mt-3 text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                +10 pts si ganan el Mundial
              </span>
            </>
          ) : (
            <>
              <Lock size={24} className="text-gray-400 mx-auto mb-2" />
              <p className="font-semibold text-gray-600">El torneo ya comenzó</p>
              <p className="text-sm text-gray-400 mt-1">No ingresaste tu predicción de campeón a tiempo</p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar equipo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 text-sm w-full"
            />
          </div>

          {/* Teams grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4 max-h-72 overflow-y-auto pr-1">
            {filteredTeams.map(team => {
              const isSelected = selected?.name === team.name
              return (
                <button
                  key={team.name}
                  onClick={() => setSelected(isSelected ? null : team)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all text-xs font-semibold ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-800 shadow-md scale-105'
                      : 'border-gray-100 bg-white hover:border-navy-300 hover:bg-navy-50 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{team.flag}</span>
                  <span className="leading-tight text-center">{team.name}</span>
                </button>
              )
            })}
          </div>

          {/* Confirm bar */}
          {selected && (
            <div className="sticky bottom-4 bg-white border-2 border-purple-300 rounded-xl shadow-lg px-4 py-3 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selected.flag}</span>
                <div>
                  <p className="font-bold text-navy-800">{selected.name}</p>
                  <p className="text-xs text-gray-500">Tu campeón del mundo</p>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                disabled={saving}
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50"
              >
                {saving ? 'Guardando...' : <><CheckCircle2 size={16} /> Confirmar</>}
              </button>
            </div>
          )}

          {error && <p className="text-center text-sm text-red-600 mt-2">{error}</p>}
        </>
      )}
    </div>
  )
}
