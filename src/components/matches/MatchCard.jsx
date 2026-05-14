import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Clock, MapPin, Save, CheckCircle2 } from 'lucide-react'
import { getPointsLabel } from '../../lib/scoring'

function getMatchStatus(match) {
  const now = new Date()
  const matchDate = new Date(match.match_date)

  if (match.status === 'finished') return 'finished'
  if (match.status === 'live') return 'live'
  if (now >= matchDate) return 'closed'
  return 'open'
}

const STATUS_CONFIG = {
  open:     { label: 'Abierto',    class: 'badge-open' },
  closed:   { label: 'Cerrado',   class: 'badge-closed' },
  live:     { label: '🔴 En Vivo', class: 'badge-live' },
  finished: { label: 'Finalizado', class: 'badge-finished' },
}

export function MatchCard({ match, prediction, onSavePrediction }) {
  const status = getMatchStatus(match)
  const statusConfig = STATUS_CONFIG[status]
  const isOpen = status === 'open'

  const [homeInput, setHomeInput] = useState(
    prediction ? String(prediction.predicted_home_score) : ''
  )
  const [awayInput, setAwayInput] = useState(
    prediction ? String(prediction.predicted_away_score) : ''
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const matchDate = new Date(match.match_date)

  const handleSave = async () => {
    if (homeInput === '' || awayInput === '') return
    setSaving(true)
    try {
      await onSavePrediction(match.id, Number(homeInput), Number(awayInput))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const pointsInfo = prediction && status === 'finished'
    ? getPointsLabel(prediction.points_earned)
    : null

  return (
    <div className={`card-hover transition-all duration-200 ${status === 'live' ? 'border-red-400 border-2 shadow-red-100 shadow-md' : ''}`}>
      {/* Header: Stage info & status */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500 font-semibold">
          Partido #{match.match_number}
          {match.group_name && <span className="ml-1.5 text-navy-600">· Grupo {match.group_name}</span>}
        </div>
        <span className={statusConfig.class}>{statusConfig.label}</span>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center gap-3">
        {/* Home team */}
        <div className="flex-1 text-right">
          <div className="text-2xl mb-1">{match.home_flag}</div>
          <p className="font-bold text-navy-800 text-sm leading-tight">{match.home_team}</p>
        </div>

        {/* Score / VS */}
        <div className="flex flex-col items-center gap-1">
          {status === 'finished' ? (
            <div className="bg-navy-800 text-white font-display text-2xl px-4 py-1 rounded-lg tracking-wider">
              {match.home_score} - {match.away_score}
            </div>
          ) : (
            <div className="text-navy-400 font-display text-xl tracking-widest">VS</div>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1 text-left">
          <div className="text-2xl mb-1">{match.away_flag}</div>
          <p className="font-bold text-navy-800 text-sm leading-tight">{match.away_team}</p>
        </div>
      </div>

      {/* Date & venue */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {format(matchDate, "EEE d 'de' MMM, HH:mm", { locale: es })} (hora local)
        </span>
        {match.city && (
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {match.city}
          </span>
        )}
      </div>

      {/* Prediction section */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        {isOpen ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-600 shrink-0">Tu predicción:</span>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="number" min="0" max="20"
                value={homeInput} onChange={e => setHomeInput(e.target.value)}
                className="w-14 text-center font-bold text-lg border-2 border-navy-300 rounded-lg py-1.5 focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                placeholder="0"
              />
              <span className="font-bold text-gray-400">-</span>
              <input
                type="number" min="0" max="20"
                value={awayInput} onChange={e => setAwayInput(e.target.value)}
                className="w-14 text-center font-bold text-lg border-2 border-navy-300 rounded-lg py-1.5 focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
                placeholder="0"
              />
              <button
                onClick={handleSave}
                disabled={saving || homeInput === '' || awayInput === ''}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                  saved
                    ? 'bg-green-100 text-green-700'
                    : 'bg-navy-700 hover:bg-navy-800 text-white'
                } disabled:opacity-50`}
              >
                {saved ? <><CheckCircle2 size={16} /> ¡Guardado!</> : saving ? 'Guardando...' : <><Save size={16} /> Guardar</>}
              </button>
            </div>
          </div>
        ) : prediction ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Tu predicción:</span>
              <span className="font-bold text-navy-700 text-lg">
                {prediction.predicted_home_score} - {prediction.predicted_away_score}
              </span>
            </div>
            {pointsInfo && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pointsInfo.bg} ${pointsInfo.color}`}>
                +{prediction.points_earned} pts · {pointsInfo.text}
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No ingresaste predicción para este partido</p>
        )}
      </div>
    </div>
  )
}
