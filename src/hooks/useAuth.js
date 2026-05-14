import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return data || null
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    let ignore = false

    const init = async () => {
      try {
        // Intentar refrescar el token primero
        const { data: { session }, error } = await supabase.auth.getSession()

        if (ignore) return

        if (error || !session) {
          // Si no hay sesión válida, limpiar todo
          await supabase.auth.signOut()
          setUser(null)
          setProfile(null)
          setLoading(false)
          return
        }

        // Verificar si el token está por vencer y refrescarlo
        const expiresAt = session.expires_at
        const now = Math.floor(Date.now() / 1000)
        
        if (expiresAt && expiresAt < now + 60) {
          // Token vencido o por vencer, refrescar
          const { data: refreshed } = await supabase.auth.refreshSession()
          if (!ignore && refreshed.session) {
            setUser(refreshed.session.user)
            const p = await fetchProfile(refreshed.session.user.id)
            if (!ignore) {
              setProfile(p)
              setLoading(false)
            }
            return
          }
        }

        setUser(session.user)
        const p = await fetchProfile(session.user.id)
        if (!ignore) {
          setProfile(p)
          setLoading(false)
        }
      } catch (e) {
        console.error('Auth error:', e)
        if (!ignore) {
          setUser(null)
          setProfile(null)
          setLoading(false)
        }
      }
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (ignore) return

        if (event === 'SIGNED_OUT' || !session) {
          setUser(null)
          setProfile(null)
          setLoading(false)
          return
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session.user)
          const p = await fetchProfile(session.user.id)
          if (!ignore) {
            setProfile(p)
            setLoading(false)
          }
        }
      }
    )

    return () => {
      ignore = true
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signUp = async (email, password, username, fullName) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        username: username.trim().toLowerCase(),
        full_name: fullName.trim(),
        is_admin: false,
        total_points: 0,
      })
    }
    return data
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
    setLoading(false)
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates) => {
    if (!user) return
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    if (error) throw error
    setProfile(data)
    return data
  }

  return {
    user,
    profile,
    loading,
    isAdmin: profile?.is_admin ?? false,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }
}
