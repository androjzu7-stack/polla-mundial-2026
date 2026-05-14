import { MatchCard } from './MatchCard'
import { STAGE_LABELS, STAGE_ORDER } from '../../data/matches2026'

export function MatchList({ matches, predictions, onSavePrediction }) {
  // Agrupar partidos por fase
  const grouped = STAGE_ORDER.reduce((acc, stage) => {
    const stageMatches = matches.filter(m => m.stage === stage)
    if (stageMatches.length > 0) {
      acc[stage] = stageMatches
    }
    return acc
  }, {})

  // Sub-agrupar la fase de grupos por letra de grupo
  const renderGroupStage = (stageMatches) => {
    const groups = {}
    stageMatches.forEach(m => {
      const g = m.group_name || 'Sin grupo'
      if (!groups[g]) groups[g] = []
      groups[g].push(m)
    })

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([group, gMatches]) => (
      <div key={group} className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-navy-700 text-gold-400 font-display text-lg w-9 h-9 rounded-full flex items-center justify-center shadow">
            {group}
          </div>
          <h3 className="text-base font-bold text-navy-700">Grupo {group}</h3>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {gMatches.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              prediction={predictions.find(p => p.match_id === match.id) || null}
              onSavePrediction={onSavePrediction}
            />
          ))}
        </div>
      </div>
    ))
  }

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([stage, stageMatches]) => (
        <section key={stage}>
          {/* Stage header */}
          <div className="flex items-center gap-4 mb-5">
            <h2 className="section-title whitespace-nowrap">{STAGE_LABELS[stage]}</h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-navy-300 to-transparent" />
            <span className="text-xs text-gray-400 font-semibold">{stageMatches.length} partidos</span>
          </div>

          {stage === 'group'
            ? renderGroupStage(stageMatches)
            : (
              <div className="grid gap-3 sm:grid-cols-2">
                {stageMatches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    prediction={predictions.find(p => p.match_id === match.id) || null}
                    onSavePrediction={onSavePrediction}
                  />
                ))}
              </div>
            )
          }
        </section>
      ))}
    </div>
  )
}
