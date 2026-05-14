/**
 * Calcula los puntos ganados por una predicción dado el resultado real.
 * @param {Object} prediction - { predicted_home_score, predicted_away_score }
 * @param {Object} result - { home_score, away_score }
 * @returns {number} 0, 1 o 3 puntos
 */
export function calculatePoints(prediction, result) {
  if (result.home_score === null || result.away_score === null) return 0
  if (prediction.predicted_home_score === null || prediction.predicted_away_score === null) return 0

  const exactMatch =
    prediction.predicted_home_score === result.home_score &&
    prediction.predicted_away_score === result.away_score

  if (exactMatch) return 3

  const getResultLabel = (home, away) => {
    if (home > away) return 'home'
    if (away > home) return 'away'
    return 'draw'
  }

  const realResult = getResultLabel(result.home_score, result.away_score)
  const predResult = getResultLabel(
    prediction.predicted_home_score,
    prediction.predicted_away_score
  )

  return realResult === predResult ? 1 : 0
}

/**
 * Retorna un label descriptivo para los puntos obtenidos
 */
export function getPointsLabel(points) {
  switch (points) {
    case 3: return { text: 'Marcador exacto ✓', color: 'text-green-700', bg: 'bg-green-50' }
    case 1: return { text: 'Resultado correcto', color: 'text-blue-700', bg: 'bg-blue-50' }
    case 0: return { text: 'Sin puntos', color: 'text-gray-500', bg: 'bg-gray-50' }
    default: return { text: 'Pendiente', color: 'text-yellow-700', bg: 'bg-yellow-50' }
  }
}

/**
 * Calcula estadísticas de un array de predicciones
 */
export function calcUserStats(predictions) {
  const finished = predictions.filter(p => p.matches?.status === 'finished')
  const exact = finished.filter(p => p.points_earned === 3).length
  const correct = finished.filter(p => p.points_earned === 1).length
  const wrong = finished.filter(p => p.points_earned === 0).length
  const total = predictions.reduce((acc, p) => acc + (p.points_earned || 0), 0)

  return { exact, correct, wrong, total, finished: finished.length }
}
