import { createClient } from '@supabase/supabase-js'

// Usar variables de entorno con fallback directo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cusqdwijmmpaxcuzzntz.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Faltan credenciales de Supabase')
}

console.log('Supabase URL:', supabaseUrl ? 'OK' : 'MISSING')
console.log('Supabase Key:', supabaseKey ? 'OK' : 'MISSING')

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storageKey: 'polla-mundial-session',
  }
})