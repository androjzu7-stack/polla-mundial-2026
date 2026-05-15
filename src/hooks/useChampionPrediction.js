import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useChampionPrediction(userId) {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    supabase
      .from('champion_predictions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data }) => {
        setPrediction(data || null)
        setLoading(false)
      })
  }, [userId])

  const saveChampion = async (teamName) => {
    const { data, error } = await supabase
      .from('champion_predictions')
      .upsert({ user_id: userId, predicted_champion: teamName }, { onConflict: 'user_id' })
      .select()
      .single()
    if (error) throw error
    setPrediction(data)
    return data
  }

  return { prediction, loading, saveChampion }
}
