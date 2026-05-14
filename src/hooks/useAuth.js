import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId) => {
    for (let i = 0; i < 3; i++) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()
        if (data) return data
        if (error) console.warn('Profile fetch attempt', i + 1, error.message)
      } catch (e) {
        console.warn('Profile fetch error:', e)
      }
      await new Promise(r => setTimeout(r, 500))
    }
    return null
  }, [])

  useEffect(() => {
    let ignore = false

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (ignore) return

        if (session?.user) {
          setUser(session.user)
          const p = await fetchProfile(session.user.id)
          if (!ignore) {
            setProfile(p)
          }
        } else {
          setUser(null)
          setProfile(null)
        }
      } catch (e) {
        console.error('Auth init error:', e)
        if (!ignore) {
          setUser(null)
          setProfile(null)
        }
      } finally {
        if (!ignore) setLoading(false)
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

        if (event === 'SIGNED_IN') {
          setLoading(true)
          setUser(session.user)
          const p = await fetchProfile(session.user.id)
          if (!ignore) {
            setProfile(p)
            setLoading(false)
          }
        }

        if (event === 'TOKEN_REFRESHED' && session?.user) {
          setUser(session.user)
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
