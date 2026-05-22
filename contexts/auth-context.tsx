"use client"

/**
 * Contexto de autenticação.
 * Usa Supabase quando configurado; senão usa armazenamento local (dev).
 * Também gerencia merge de carrinhos quando guest faz login.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import { createClient } from "@/lib/supabase/client"
import { isSupabaseConfigured } from "@/lib/supabase/config"
import { localGetSession, localSignOut } from "@/lib/auth/local-store"
import { linkGuestToUser, getGuestIdSync } from "@/lib/auth/guest-session"
import { mergeGuestCartToUser } from "@/lib/cart/persistence"
import type { AuthUser } from "@/lib/types/auth"

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  needsDisplayName: boolean
  /** true = Supabase no .env.local | false = modo local temporário */
  usesDatabase: boolean
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const supabaseEnabled =
  typeof window !== "undefined"
    ? Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
    : isSupabaseConfigured()

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = supabaseEnabled ? createClient() : null

  const loadSupabaseProfile = useCallback(
    async (userId: string, email: string) => {
      if (!supabase) {
        setUser({ id: userId, email, displayName: null })
        return
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", userId)
          .single()

        if (error) {
          setUser({ id: userId, email, displayName: null })
        } else {
          setUser({
            id: userId,
            email,
            displayName: data?.display_name ?? null,
          })
        }

        // Merge guest cart if this is a new login
        const guestId = getGuestIdSync()
        if (guestId) {
          try {
            await mergeGuestCartToUser(guestId, userId)
            await linkGuestToUser(userId)
          } catch (error) {
            console.error("Failed to merge guest cart:", error)
          }
        }
      } catch {
        setUser({ id: userId, email, displayName: null })
      }
    },
    [supabase]
  )

  const refreshProfile = useCallback(async () => {
    if (!supabaseEnabled) {
      setUser(localGetSession())
      return
    }
    if (!supabase) return
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    if (authUser?.email) {
      await loadSupabaseProfile(authUser.id, authUser.email)
    }
  }, [supabase, loadSupabaseProfile])

  useEffect(() => {
    if (!supabaseEnabled) {
      setUser(localGetSession())
      setIsLoading(false)
      return
    }

    if (!supabase) {
      setIsLoading(false)
      return
    }

    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user?.email) {
        await loadSupabaseProfile(session.user.id, session.user.email)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user?.email) {
        await loadSupabaseProfile(session.user.id, session.user.email)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase, loadSupabaseProfile])

  const signOut = async () => {
    if (supabaseEnabled && supabase) {
      await supabase.auth.signOut()
    } else {
      localSignOut()
    }
    setUser(null)
  }

  const needsDisplayName = Boolean(user && !user.displayName?.trim())

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        needsDisplayName,
        usesDatabase: supabaseEnabled,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}

