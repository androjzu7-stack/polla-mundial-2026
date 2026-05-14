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

  const totalPredicted = predictions.length
  const totalOpen = matches.filter(m => {
    const now = new Date()
    return new Date(m.match_date) > now && m.status === 'scheduled'
  }).length

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="section-title">📅 PARTIDOS</h1>
        <p className="text-gray-500 text-sm">
          Ingresa tus predicciones antes de que empiece cada partido.
          {' '}<span className="text-navy-700 font-semibold">{totalPredicted} predicciones guardadas</span>
          {totalOpen > 0 && <span className="text-green-600 ml-2">· {totalOpen} partidos abiertos</span>}
        </p>
      </div>

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
