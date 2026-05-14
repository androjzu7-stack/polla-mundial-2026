import { useState } from 'react'
import { useMatches } from '../hooks/useMatches'
import { usePredictions } from '../hooks/usePredictions'
import { MatchList } from '../components/matches/MatchList'
import { Search, Filter } from 'lucide-react'
import { STAGE_LABELS } from '../data/matches2026'

export function Matches({ user }) {
  const { matches, loading: matchesLoading } = useMatches()
  const { predictions, savePrediction } = usePredictions(user?.id)
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('all')

  const filteredMatches = matches.filter(m => {
    const matchesSearch = !search || 
      m.home_team.toLowerCase().includes(search.toLowerCase()) ||
      m.away_team.toLowerCase().includes(search.toLowerCase()) ||
      m.city?.toLowerCase().includes(search.toLowerCase())
    
    const matchesStage = stageFilter === 'all' || m.stage === stageFilter

    return matchesSearch && matchesStage
  })

  const now = new Date()
  const totalMatches = matches.length
  const totalPredicted = predictions.length
  const openUnpredicted = matches.filter(m => {
    const isOpen = new Date(m.match_date) > now && m.status === 'scheduled'
    const hasPrediction = predictions.some(p => p.match_id === m.id)
    return isOpen && !hasPrediction
  }).length
  const pct = totalMatches > 0 ? Math.round((totalPredicted / totalMatches) * 100) : 0

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <h1 className="section-title">📅 PARTIDOS</h1>
        <p className="text-gray-500 text-sm">
          Ingresa tus predicciones antes de que empiece cada partido.
        </p>
      </div>

      {/* Progress bar */}
      {!matchesLoading && totalMatches > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-gray-700">Tus predicciones</span>
            <span className="text-sm font-bold text-navy-700">{totalPredicted} / {totalMatches}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: pct === 100 ? '#16a34a' : pct >= 50 ? '#1e3a5f' : '#f59e0b',
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-xs">
            <span className="text-gray-400">{pct}% completado</span>
            {openUnpredicted > 0
              ? <span className="text-amber-600 font-semibold">{openUnpredicted} pendiente{openUnpredicted !== 1 ? 's' : ''}</span>
              : totalPredicted === totalMatches
                ? <span className="text-green-600 font-semibold">¡Todos predichos!</span>
                : <span className="text-gray-400">No quedan partidos abiertos</span>
            }
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar equipo o ciudad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9 text-sm"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={stageFilter}
            onChange={e => setStageFilter(e.target.value)}
            className="input-field pl-9 text-sm pr-8 appearance-none"
          >
            <option value="all">Todas las fases</option>
            {Object.entries(STAGE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Matches */}
      {matchesLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-40 rounded-xl" />)}
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold">No se encontraron partidos</p>
          <p className="text-sm mt-1">Intenta con otra búsqueda o carga el fixture desde el panel de admin</p>
        </div>
      ) : (
        <MatchList
          matches={filteredMatches}
          predictions={predictions}
          onSavePrediction={savePrediction}
        />
      )}
    </div>
  )
}
