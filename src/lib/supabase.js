import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase init - URL:', supabaseUrl ? 'OK' : 'MISSING', '| Key:', supabaseKey ? 'OK' : 'MISSING')

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
})

// Debug: verificar que getSession funciona
supabase.auth.getSession().then(({ data, error }) => {
  console.log('getSession result:', data?.session ? 'HAS SESSION' : 'NO SESSION', error ? 'ERROR: ' + error.message : '')
})