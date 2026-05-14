import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function usePredictions(userId) {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPredictions = useCallback(async () => {
    if (!userId) {
      setPredictions([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*, matches(*)')
        .eq('user_id', userId)
        .order('match_id', { ascending: true })

      if (error) throw error
      setPredictions(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchPredictions()
  }, [fetchPredictions])

  const savePrediction = async (matchId, predictedHomeScore, predictedAwayScore) => {
    if (!userId) throw new Error('Debes iniciar sesión')

    const { data, error } = await supabase
      .from('predictions')
      .upsert(
        {
          user_id: userId,
          match_id: matchId,
          predicted_home_score: predictedHomeScore,
          predicted_away_score: predictedAwayScore,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,match_id' }
      )
      .select()
      .single()

    if (error) throw error
    await fetchPredictions()
    return data
  }

  const getPredictionForMatch = useCallback((matchId) => {
    return predictions.find(p => p.match_id === matchId) || null
  }, [predictions])

  return {
    predictions,
    loading,
    error,
    refetch: fetchPredictions,
    savePrediction,
    getPredictionForMatch,
  }
}
