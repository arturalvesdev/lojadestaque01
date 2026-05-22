/**
 * Tipos de autenticação e perfil do cliente.
 */

/** Perfil do usuário salvo no banco (Supabase) */
export type UserProfile = {
  id: string
  email: string
  display_name: string | null
  created_at: string
}

/** Estado exposto pelo contexto de autenticação */
export type AuthUser = {
  id: string
  email: string
  displayName: string | null
}
