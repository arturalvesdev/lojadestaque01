"use client"

/**
 * Formulário de entrar — somente e-mail e senha.
 */

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import {
  localSignIn,
} from "@/lib/auth/local-store"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

type LoginFormProps = {
  onSwitchToRegister: () => void
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showNotRegistered, setShowNotRegistered] = useState(false)
  const { usesDatabase, refreshProfile } = useAuth()
  const supabase = usesDatabase ? createClient() : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowNotRegistered(false)
    setLoading(true)

    if (usesDatabase && supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      setLoading(false)

      if (error) {
        if (
          error.message.toLowerCase().includes("invalid") ||
          error.message.toLowerCase().includes("credentials")
        ) {
          setShowNotRegistered(true)
        } else {
          toast.error(error.message)
        }
        return
      }

      await refreshProfile()
      toast.success("Login realizado com sucesso!")
      return
    }

    // Modo local (sem Supabase configurado)
    const { user, error } = localSignIn(email, password)
    setLoading(false)

    if (error === "not_found" || !user) {
      setShowNotRegistered(true)
      return
    }

    await refreshProfile()
    toast.success("Login realizado!")
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="loginEmail" className="block text-sm font-medium mb-2">
            E-mail
          </label>
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword" className="block text-sm font-medium mb-2">
            Senha
          </label>
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
            minLength={6}
          />
        </div>

        {showNotRegistered && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm">
            <p className="text-foreground font-medium mb-2">
              Esta conta ainda não foi cadastrada.
            </p>
            <p className="text-muted-foreground mb-3">
              Crie sua conta para comprar na Destaque premium.
            </p>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary font-semibold hover:underline"
            >
              Fazer cadastro agora →
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
        </button>
      </form>
    </div>
  )
}
