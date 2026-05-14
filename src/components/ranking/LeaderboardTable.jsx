import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' }

export function LeaderboardTable({ currentUserId }) {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, total_points')
      .order('total_points', { ascending: false })
      .limit(100)

    if (!error) setPlayers(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchLeaderboard()

    // Tiempo real: actualizar cuando cambie cualquier perfil
    const channel = supabase
      .channel('leaderboard-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, () => {
        fetchLeaderboard()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton h-14 rounded-lg" />
        ))}
      </div>
    )
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">🏆</div>
        <p>Aún no hay puntajes registrados</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy-800 text-white">
            <th className="px-4 py-3 text-left font-display tracking-wider text-gold-400">#</th>
            <th className="px-4 py-3 text-left font-display tracking-wider">JUGADOR</th>
            <th className="px-4 py-3 text-center font-display tracking-wider text-gold-400">PUNTOS</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => {
            const pos = idx + 1
            const isMe = player.id === currentUserId
            const medal = MEDALS[pos]

            return (
              <tr
                key={player.id}
                className={`border-t border-gray-100 transition-colors ${
                  isMe
                    ? 'bg-gold-50 border-l-4 border-l-gold-500'
                    : pos <= 3
                    ? 'bg-navy-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="px-4 py-3">
                  <span className={`font-bold text-base ${
                    pos === 1 ? 'text-gold-500' :
                    pos === 2 ? 'text-gray-500' :
                    pos === 3 ? 'text-amber-700' :
                    'text-gray-400'
                  }`}>
                    {medal || pos}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isMe ? 'bg-gold-500 text-navy-900' : 'bg-navy-200 text-navy-700'
                    }`}>
                      {player.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={`font-bold ${isMe ? 'text-navy-800' : 'text-gray-800'}`}>
                        {player.username}
                        {isMe && <span className="ml-2 text-xs text-gold-600 font-normal">(tú)</span>}
                      </p>
                      {player.full_name && (
                        <p className="text-xs text-gray-400">{player.full_name}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-display text-2xl ${
                    pos === 1 ? 'text-gold-500' :
                    isMe ? 'text-navy-700' :
                    'text-gray-700'
                  }`}>
                    {player.total_points}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
