"use client"

/**
 * Cadastro com e-mail e senha → depois define o nome na loja.
 */

import { useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { localSignUp } from "@/lib/auth/local-store"
import { useAuth } from "@/contexts/auth-context"
import { DisplayNameForm } from "@/components/auth/display-name-form"
import { toast } from "sonner"

type RegisterStep = "email" | "name"

type RegisterFormProps = {
  onBack?: () => void
}

export function RegisterForm({ onBack }: RegisterFormProps) {
  const [step, setStep] = useState<RegisterStep>("email")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { usesDatabase, refreshProfile } = useAuth()
  const supabase = usesDatabase ? createClient() : null

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setLoading(true)

    if (usesDatabase && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      })

      setLoading(false)

      if (error) {
        if (error.message.toLowerCase().includes("registered")) {
          toast.error("Este e-mail já possui cadastro. Use Entrar.")
        } else {
          toast.error(error.message)
        }
        return
      }

      if (data.user && !data.session) {
        toast.success("Verifique seu e-mail para confirmar o cadastro.")
        return
      }

      setStep("name")
      toast.success("Conta criada! Escolha seu nome na loja.")
      return
    }

    // Modo local
    const { user, error } = localSignUp(email, password)
    setLoading(false)

    if (error) {
      toast.error(error)
      return
    }

    if (user) {
      await refreshProfile()
      setStep("name")
      toast.success("Conta criada! Escolha seu nome na loja.")
    }
  }

  if (step === "name") {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Quase lá!</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Defina como você quer aparecer nos pedidos.
        </p>
        <DisplayNameForm />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para entrar
        </button>
      )}

      <p className="text-muted-foreground text-sm">
        Crie sua conta com e-mail e senha:
      </p>

      <form onSubmit={handleEmailSignup} className="space-y-4">
        <div>
          <label htmlFor="regEmail" className="block text-sm font-medium mb-2">
            E-mail
          </label>
          <input
            id="regEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>
        <div>
          <label htmlFor="regPassword" className="block text-sm font-medium mb-2">
            Senha
          </label>
          <input
            id="regPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="regConfirm" className="block text-sm font-medium mb-2">
            Confirmar senha
          </label>
          <input
            id="regConfirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Criar conta"}
        </button>
      </form>
    </div>
  )
}
