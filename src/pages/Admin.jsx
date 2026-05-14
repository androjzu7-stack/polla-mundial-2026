import { useState } from 'react'
import { useMatches } from '../hooks/useMatches'
import { MatchResultForm } from '../components/admin/MatchResultForm'
import { UserManager } from '../components/admin/UserManager'
import { UserImporter } from '../components/admin/UserImporter'
import { supabase } from '../lib/supabase'
import { matches2026 } from '../data/matches2026'
import { Shield, Users, Calendar, Database, Upload, Loader } from 'lucide-react'
import { STAGE_LABELS, STAGE_ORDER } from '../data/matches2026'

const TABS = [
  { id: 'matches', label: 'Partidos', icon: Calendar },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'import', label: 'Crear Cuentas', icon: Upload },
  { id: 'seed', label: 'Cargar Fixture', icon: Database },
]

export function Admin() {
  const { matches, loading, updateMatch, updateMatchResult } = useMatches()
  const [activeTab, setActiveTab] = useState('matches')
  const [stageFilter, setStageFilter] = useState('group')
  const [seeding, setSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState(null)
  const [expandedStages, setExpandedStages] = useState({ group: true })

  const handleSeedMatches = async () => {
    if (!confirm(`¿Cargar los ${matches2026.length} partidos del fixture FIFA 2026 en la base de datos?`)) return
    setSeeding(true)
    setSeedResult(null)

    try {
      // Insertar en lotes de 20
      const batchSize = 20
      let inserted = 0
      for (let i = 0; i < matches2026.length; i += batchSize) {
        const batch = matches2026.slice(i, i + batchSize)
        const { error } = await supabase.from('matches').upsert(
          batch.map(m => ({
            match_number: m.match_number,
            stage: m.stage,
            group_name: m.group_name || null,
            home_team: m.home_team,
            away_team: m.away_team,
            home_flag: m.home_flag,
            away_flag: m.away_flag,
            match_date: m.match_date,
            venue: m.venue || null,
            city: m.city || null,
            status: 'scheduled',
          })),
          { onConflict: 'match_number' }
        )
        if (error) throw error
        inserted += batch.length
      }
      setSeedResult({ success: true, count: inserted })
    } catch (err) {
      setSeedResult({ success: false, error: err.message })
    } finally {
      setSeeding(false)
    }
  }

  const filteredMatches = matches.filter(m => m.stage === stageFilter)

  const handleUpdateMatch = async (matchId, updates) => {
    if (updates.home_score !== undefined && updates.away_score !== undefined) {
      await updateMatchResult(matchId, updates.home_score, updates.away_score)
    } else {
      await updateMatch(matchId, updates)
    }
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gold-500 text-navy-900 p-2 rounded-xl">
          <Shield size={24} />
        </div>
        <div>
          <h1 className="section-title leading-none">PANEL DE ADMINISTRACIÓN</h1>
          <p className="text-sm text-gray-500">Gestión del Mundial FIFA 2026</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card text-center py-3">
          <div className="font-display text-3xl text-navy-700">{matches.length}</div>
          <p className="text-xs text-gray-500">Partidos cargados</p>
        </div>
        <div className="card text-center py-3">
          <div className="font-display text-3xl text-green-600">{matches.filter(m => m.status === 'finished').length}</div>
          <p className="text-xs text-gray-500">Finalizados</p>
        </div>
        <div className="card text-center py-3">
          <div className="font-display text-3xl text-orange-500">{matches.filter(m => m.status === 'scheduled').length}</div>
          <p className="text-xs text-gray-500">Pendientes</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === id
                ? 'border-navy-700 text-navy-700'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'matches' && (
        <div>
          <div className="flex gap-2 flex-wrap mb-5">
            {STAGE_ORDER.map(stage => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                  stageFilter === stage
                    ? 'bg-navy-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {STAGE_LABELS[stage]}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-36 rounded-xl" />)}</div>
          ) : filteredMatches.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>No hay partidos cargados en esta fase.</p>
              <p className="text-sm mt-1">Ve a la pestaña "Cargar Fixture" para cargar los datos.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredMatches.map(match => (
                <MatchResultForm
                  key={match.id}
                  match={match}
                  onUpdate={handleUpdateMatch}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && <UserManager />}

      {activeTab === 'import' && (
        <div className="py-4">
          <div className="mb-6">
            <h3 className="font-bold text-navy-800 text-lg mb-1">Crear cuentas masivamente</h3>
            <p className="text-sm text-gray-500">Pega los nombres y el sistema genera usuario y contraseña para cada uno.</p>
          </div>
          <UserImporter />
        </div>
      )}

      {activeTab === 'seed' && (
        <div className="max-w-lg mx-auto">
          <div className="card border-2 border-dashed border-navy-300">
            <div className="text-center">
              <Database size={48} className="mx-auto text-navy-400 mb-4" />
              <h3 className="font-bold text-navy-800 text-lg mb-2">Cargar Fixture FIFA 2026</h3>
              <p className="text-gray-500 text-sm mb-2">
                Carga todos los <strong>104 partidos</strong> del Mundial en la base de datos.
                Puedes ejecutarlo múltiples veces (usa upsert para no duplicar).
              </p>
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-5">
                ⚠️ Los equipos de fases eliminatorias aparecen como "Ganador P73" etc. 
                Actualízalos manualmente desde la pestaña Partidos cuando se definan.
              </p>

              <button
                onClick={handleSeedMatches}
                disabled={seeding}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                {seeding ? <><Loader size={18} className="animate-spin" /> Cargando...</> : '🚀 Cargar 104 partidos'}
              </button>

              {seedResult && (
                <div className={`mt-4 px-4 py-3 rounded-lg text-sm font-semibold ${
                  seedResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {seedResult.success
                    ? `✅ ¡Cargados ${seedResult.count} partidos exitosamente!`
                    : `❌ Error: ${seedResult.error}`}
                </div>
              )}
            </div>
          </div>

          <div className="card mt-4">
            <h4 className="font-bold text-navy-700 mb-3">📋 Instrucciones post-carga</h4>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Ve a la pestaña <strong>Partidos</strong> para ver todos los partidos cargados</li>
              <li>Cuando termine un partido, ingresa el marcador real</li>
              <li>Los puntos se calculan automáticamente al guardar el resultado</li>
              <li>Cuando avancen equipos a fases eliminatorias, edita los nombres de los equipos</li>
              <li>El ranking se actualiza en tiempo real para todos los usuarios</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
