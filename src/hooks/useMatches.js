import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useMatches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: true })

      if (error) throw error
      setMatches(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()

    // Escuchar cambios en tiempo real
    const channel = supabase
      .channel('matches-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => {
        fetchMatches()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const updateMatch = async (matchId, updates) => {
    const { data, error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', matchId)
      .select()
      .single()

    if (error) throw error
    await fetchMatches()
    return data
  }

  const updateMatchResult = async (matchId, homeScore, awayScore) => {
    const updates = {
      home_score: homeScore,
      away_score: awayScore,
      status: 'finished',
    }
    const match = await updateMatch(matchId, updates)

    // Recalcular puntos
    await supabase.rpc('recalculate_points_for_match', { p_match_id: matchId })

    return match
  }

  return {
    matches,
    loading,
    error,
    refetch: fetchMatches,
    updateMatch,
    updateMatchResult,
  }
}
