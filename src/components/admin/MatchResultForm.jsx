import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CheckCircle2, Loader } from 'lucide-react'

export function MatchResultForm({ match, onUpdate }) {
  const [homeScore, setHomeScore] = useState(match.home_score !== null ? String(match.home_score) : '')
  const [awayScore, setAwayScore] = useState(match.away_score !== null ? String(match.away_score) : '')
  const [homeTeam, setHomeTeam] = useState(match.home_team)
  const [awayTeam, setAwayTeam] = useState(match.away_team)
  const [status, setStatus] = useState(match.status)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates = {
        home_team: homeTeam,
        away_team: awayTeam,
        status,
      }
      if (homeScore !== '' && awayScore !== '') {
        updates.home_score = Number(homeScore)
        updates.away_score = Number(awayScore)
        updates.status = 'finished'
        setStatus('finished')
      }
      await onUpdate(match.id, updates)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      alert('Error al guardar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const matchDate = new Date(match.match_date)

  return (
    <div className="card border border-gray-200 text-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-navy-700 text-xs">#{match.match_number} · {match.stage.toUpperCase()}{match.group_name ? ` · Grupo ${match.group_name}` : ''}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          status === 'finished' ? 'bg-navy-100 text-navy-700' :
          status === 'live' ? 'bg-red-100 text-red-700 animate-pulse' :
          'bg-gray-100 text-gray-600'
        }`}>{status}</span>
      </div>

      <p className="text-xs text-gray-400 mb-3">
        {format(matchDate, "EEE d MMM, HH:mm", { locale: es })} · {match.city}
      </p>

      <div className="grid grid-cols-3 gap-2 items-center mb-3">
        <input
          type="text" value={homeTeam} onChange={e => setHomeTeam(e.target.value)}
          className="input-field text-sm text-center font-semibold"
        />
        <div className="flex items-center justify-center gap-1">
          <input
            type="number" min="0" max="20" value={homeScore} onChange={e => setHomeScore(e.target.value)}
            className="w-12 text-center font-bold text-lg border-2 border-navy-300 rounded-lg py-1.5 focus:outline-none focus:border-navy-600"
            placeholder="?"
          />
          <span className="font-bold text-gray-400">-</span>
          <input
            type="number" min="0" max="20" value={awayScore} onChange={e => setAwayScore(e.target.value)}
            className="w-12 text-center font-bold text-lg border-2 border-navy-300 rounded-lg py-1.5 focus:outline-none focus:border-navy-600"
            placeholder="?"
          />
        </div>
        <input
          type="text" value={awayTeam} onChange={e => setAwayTeam(e.target.value)}
          className="input-field text-sm text-center font-semibold"
        />
      </div>

      <div className="flex items-center justify-between">
        <select
          value={status} onChange={e => setStatus(e.target.value)}
          className="input-field text-xs py-1.5 w-32"
        >
          <option value="scheduled">scheduled</option>
          <option value="live">live</option>
          <option value="finished">finished</option>
        </select>

        <button
          onClick={handleSave} disabled={loading}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            saved ? 'bg-green-100 text-green-700' : 'btn-primary'
          }`}
        >
          {loading ? <Loader size={14} className="animate-spin" /> :
           saved ? <><CheckCircle2 size={14} /> Guardado</> : 'Guardar'}
        </button>
      </div>
    </div>
  )
}
