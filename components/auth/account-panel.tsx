"use client"

/**
 * Painel da página /conta — Entrar, Cadastrar e perfil logado.
 */

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { LogOut, User, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { DisplayNameForm } from "@/components/auth/display-name-form"
import { toast } from "sonner"

type Tab = "login" | "register"

export function AccountPanel() {
  const [tab, setTab] = useState<Tab>("login")
  const {
    user,
    isLoading,
    isAuthenticated,
    needsDisplayName,
    usesDatabase,
    signOut,
  } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const t = searchParams.get("tab")
    if (t === "cadastro" || t === "register") setTab("register")
    if (t === "entrar" || t === "login") setTab("login")
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isAuthenticated && needsDisplayName) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-2">Bem-vindo(a)!</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Para finalizar seu cadastro, escolha seu nome na loja.
        </p>
        <DisplayNameForm />
      </motion.div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-8 max-w-md mx-auto text-center"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-1">
          Olá, {user.displayName || "Cliente"}!
        </h2>
        <p className="text-muted-foreground text-sm mb-6">{user.email}</p>
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="h-12 flex items-center justify-center bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90"
          >
            Continuar comprando
          </Link>
          <button
            type="button"
            onClick={async () => {
              await signOut()
              toast.success("Você saiu da sua conta")
              router.refresh()
            }}
            className="h-12 flex items-center justify-center gap-2 border border-border rounded-full hover:bg-secondary text-muted-foreground"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-md mx-auto"
    >
      {!usesDatabase && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Modo local ativo</p>
            <p className="text-muted-foreground mt-1">
              O Supabase ainda não está no <code className="text-xs">.env.local</code>.
              O login funciona no navegador. Para banco profissional, siga{" "}
              <code className="text-xs">docs/CONFIGURACAO.md</code>.
            </p>
          </div>
        </div>
      )}

      <div className="flex rounded-full bg-secondary p-1 mb-8">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors ${
            tab === "login"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors ${
            tab === "register"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          Cadastrar
        </button>
      </div>

      {tab === "login" ? (
        <LoginForm onSwitchToRegister={() => setTab("register")} />
      ) : (
        <RegisterForm onBack={() => setTab("login")} />
      )}
    </motion.div>
  )
}
