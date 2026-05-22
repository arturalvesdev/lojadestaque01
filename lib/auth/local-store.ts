/**
 * Autenticação local (localStorage) — usada quando o Supabase ainda não está configurado.
 * Apenas para desenvolvimento/testes. Em produção use Supabase.
 */

import type { AuthUser } from "@/lib/types/auth"

type StoredUser = {
  id: string
  email: string
  password: string
  displayName: string | null
}

const USERS_KEY = "destaquepremium_users"
const SESSION_KEY = "destaquepremium_session"

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toAuthUser(u: StoredUser): AuthUser {
  return { id: u.id, email: u.email, displayName: u.displayName }
}

export function localGetSession(): AuthUser | null {
  if (typeof window === "undefined") return null
  const sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId) return null
  const user = readUsers().find((u) => u.id === sessionId)
  return user ? toAuthUser(user) : null
}

export function localSignUp(
  email: string,
  password: string
): { user: AuthUser | null; error?: string } {
  const users = readUsers()
  const normalized = email.trim().toLowerCase()

  if (users.some((u) => u.email === normalized)) {
    return { user: null, error: "Este e-mail já possui cadastro." }
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email: normalized,
    password,
    displayName: null,
  }

  writeUsers([...users, newUser])
  localStorage.setItem(SESSION_KEY, newUser.id)
  return { user: toAuthUser(newUser) }
}

export function localSignIn(
  email: string,
  password: string
): { user: AuthUser | null; error?: string } {
  const normalized = email.trim().toLowerCase()
  const user = readUsers().find(
    (u) => u.email === normalized && u.password === password
  )

  if (!user) {
    return { user: null, error: "not_found" }
  }

  localStorage.setItem(SESSION_KEY, user.id)
  return { user: toAuthUser(user) }
}

export function localUpdateDisplayName(
  userId: string,
  displayName: string
): boolean {
  const users = readUsers()
  const index = users.findIndex((u) => u.id === userId)
  if (index === -1) return false
  users[index].displayName = displayName.trim()
  writeUsers(users)
  return true
}

export function localSignOut() {
  localStorage.removeItem(SESSION_KEY)
}
