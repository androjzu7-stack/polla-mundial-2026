import { LeaderboardTable } from '../components/ranking/LeaderboardTable'

export function Leaderboard({ user }) {
  return (
    <div className="page-container animate-fade-in">
      <div className="mb-6">
        <h1 className="section-title">🏆 TABLA DE POSICIONES</h1>
        <p className="text-gray-500 text-sm">
          Actualización en tiempo real. ¿Dónde estás tú?
        </p>
      </div>

      {/* Scoring reminder */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm">
          <span className="font-bold text-green-700">3 pts</span>
          <span className="text-green-600">Marcador exacto</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm">
          <span className="font-bold text-blue-700">1 pt</span>
          <span className="text-blue-600">Resultado correcto</span>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-1.5 text-sm">
          <span className="font-bold text-purple-700">+1 pt</span>
          <span className="text-purple-600">Campeón correcto</span>
        </div>
      </div>

      <LeaderboardTable currentUserId={user?.id} />
    </div>
  )
}
