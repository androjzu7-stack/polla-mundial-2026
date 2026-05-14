import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Shield, User, Download } from 'lucide-react'

export function UserManager() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('total_points', { ascending: false })

    if (!error) setUsers(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  const toggleAdmin = async (userId, currentAdmin) => {
    await supabase.from('profiles').update({ is_admin: !currentAdmin }).eq('id', userId)
    fetchUsers()
  }

  const exportCSV = () => {
    const header = ['Posición', 'Usuario', 'Nombre completo', 'Puntos', 'Admin']
    const rows = users.map((u, i) => [i + 1, u.username, u.full_name || '', u.total_points, u.is_admin ? 'Sí' : 'No'])
    const csv = [header, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ranking-mundial-2026-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div className="skeleton h-40 rounded-xl" />

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{users.length} usuarios registrados</p>
        <button onClick={exportCSV} className="flex items-center gap-2 btn-outline text-sm py-1.5 px-3">
          <Download size={15} /> Exportar CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">#</th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Usuario</th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">Nombre</th>
              <th className="px-4 py-3 text-center text-gray-600 font-semibold">Puntos</th>
              <th className="px-4 py-3 text-center text-gray-600 font-semibold">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400 font-bold">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-navy-200 text-navy-700 flex items-center justify-center font-bold text-xs">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-800">{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.full_name || '—'}</td>
                <td className="px-4 py-3 text-center font-display text-xl text-navy-700">{user.total_points}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleAdmin(user.id, user.is_admin)}
                    className={`flex items-center gap-1 mx-auto text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                      user.is_admin
                        ? 'bg-gold-100 text-gold-800 hover:bg-gold-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-navy-100 hover:text-navy-700'
                    }`}
                    title={user.is_admin ? 'Quitar admin' : 'Hacer admin'}
                  >
                    {user.is_admin ? <Shield size={12} /> : <User size={12} />}
                    {user.is_admin ? 'Admin' : 'Usuario'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
