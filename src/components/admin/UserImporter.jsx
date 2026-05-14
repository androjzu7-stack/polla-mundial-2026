import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, Download, Users, CheckCircle2, AlertCircle, Loader } from 'lucide-react'

function toUsername(fullName) {
  return fullName
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 20)
}

function toPassword(fullName) {
  const firstName = fullName.split(' ')[0]
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '')
  const num = Math.floor(100 + Math.random() * 900)
  return `${firstName}${num}`
}

export function UserImporter() {
  const [rawText, setRawText] = useState('')
  const [preview, setPreview] = useState([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [step, setStep] = useState('input') // input | preview | done

  const handleGenerate = () => {
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 2)
    const users = lines.map(name => ({
      fullName: name,
      username: toUsername(name),
      password: toPassword(name),
      email: `${toUsername(name)}@polla2026.interno`,
    }))
    setPreview(users)
    setStep('preview')
  }

  const handleRegenerate = (idx) => {
    setPreview(prev => prev.map((u, i) =>
      i === idx ? { ...u, password: toPassword(u.fullName) } : u
    ))
  }

  const handleCreate = async () => {
    setLoading(true)
    const ok = []
    const fail = []

    for (const u of preview) {
      try {
        // Crear usuario en Supabase Auth
        const { data, error } = await supabase.auth.admin
          ? supabase.auth.signUp({ email: u.email, password: u.password })
          : supabase.auth.signUp({ email: u.email, password: u.password })

        if (error) throw error

        if (data?.user) {
          // Crear perfil
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              username: u.username,
              full_name: u.fullName,
              is_admin: false,
              total_points: 0,
            }, { onConflict: 'id' })

          if (profileError) throw profileError
        }
        ok.push(u)
      } catch (err) {
        fail.push({ ...u, error: err.message })
      }
    }

    setResults({ ok, fail })
    setStep('done')
    setLoading(false)
  }

  const handleDownloadCSV = () => {
    const header = 'Nombre completo,Usuario,Contraseña'
    const rows = (results?.ok || preview).map(u =>
      `"${u.fullName}","${u.username}","${u.password}"`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `usuarios-polla-mundial-2026.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setRawText('')
    setPreview([])
    setResults(null)
    setStep('input')
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* PASO 1: Ingresar nombres */}
      {step === 'input' && (
        <div className="card border border-dashed border-navy-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-navy-100 text-navy-700 p-2 rounded-lg">
              <Users size={22} />
            </div>
            <div>
              <h3 className="font-bold text-navy-800">Importar participantes</h3>
              <p className="text-xs text-gray-500">Pega la lista de nombres, uno por línea</p>
            </div>
          </div>

          <textarea
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            placeholder={`María García\nCarlos López\nJuan Martínez\nAna Rodríguez\n...`}
            rows={10}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none"
          />

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">
              {rawText.split('\n').filter(l => l.trim().length > 2).length} nombres detectados
            </span>
            <button
              onClick={handleGenerate}
              disabled={rawText.split('\n').filter(l => l.trim().length > 2).length === 0}
              className="btn-primary flex items-center gap-2"
            >
              <Upload size={16} /> Generar usuarios y contraseñas
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: Vista previa */}
      {step === 'preview' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-800 text-lg">{preview.length} cuentas listas para crear</h3>
              <p className="text-xs text-gray-500">Revisa antes de crear. Puedes regenerar contraseñas individualmente.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleReset} className="btn-outline text-sm py-1.5">Volver</button>
              <button onClick={handleDownloadCSV} className="flex items-center gap-1.5 btn-outline text-sm py-1.5">
                <Download size={14} /> Descargar CSV
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-800 text-white">
                  <th className="px-4 py-2.5 text-left font-semibold">Nombre completo</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Usuario</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Contraseña</th>
                  <th className="px-4 py-2.5 text-center font-semibold">🔄</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((u, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium text-gray-800">{u.fullName}</td>
                    <td className="px-4 py-2.5 text-navy-700 font-mono text-xs">{u.username}</td>
                    <td className="px-4 py-2.5 text-green-700 font-mono text-xs font-bold">{u.password}</td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => handleRegenerate(i)}
                        className="text-gray-400 hover:text-navy-700 transition-colors text-xs"
                        title="Regenerar contraseña"
                      >
                        🔄
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 mb-4">
            ⚠️ <strong>Descarga el CSV antes de crear las cuentas</strong> — es la única vez que verás las contraseñas.
          </div>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-lg"
          >
            {loading
              ? <><Loader size={18} className="animate-spin" /> Creando cuentas...</>
              : <><Users size={18} /> Crear {preview.length} cuentas ahora</>}
          </button>
        </div>
      )}

      {/* PASO 3: Resultado */}
      {step === 'done' && results && (
        <div>
          <div className="text-center mb-6">
            <CheckCircle2 size={56} className="text-green-500 mx-auto mb-3" />
            <h3 className="text-2xl font-display text-navy-800 tracking-wide">¡CUENTAS CREADAS!</h3>
            <p className="text-gray-500 text-sm mt-1">
              <span className="text-green-700 font-bold">{results.ok.length} exitosas</span>
              {results.fail.length > 0 && <span className="text-red-600 font-bold ml-3">{results.fail.length} fallidas</span>}
            </p>
          </div>

          {results.fail.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-bold text-red-700 mb-2 flex items-center gap-2">
                <AlertCircle size={16} /> Estas cuentas no se pudieron crear:
              </p>
              {results.fail.map((u, i) => (
                <p key={i} className="text-xs text-red-600">{u.fullName} — {u.error}</p>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={handleDownloadCSV} className="btn-primary flex items-center gap-2 flex-1 justify-center">
              <Download size={16} /> Descargar CSV con contraseñas
            </button>
            <button onClick={handleReset} className="btn-outline flex-1">
              Importar más
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Comparte el CSV por WhatsApp o imprímelo para entregar a cada participante.
          </p>
        </div>
      )}
    </div>
  )
}
