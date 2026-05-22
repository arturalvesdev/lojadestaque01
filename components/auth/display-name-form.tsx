"use client"

/**
 * Define o nome do cliente na loja (após cadastro).
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { localUpdateDisplayName } from "@/lib/auth/local-store"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export function DisplayNameForm() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { user, usesDatabase, refreshProfile } = useAuth()
  const router = useRouter()
  const supabase = usesDatabase ? createClient() : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()

    if (trimmed.length < 2) {
      toast.error("Digite um nome com pelo menos 2 caracteres")
      return
    }

    if (!user) return

    setLoading(true)

    if (usesDatabase && supabase) {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: trimmed })
        .eq("id", user.id)

      setLoading(false)

      if (error) {
        toast.error(
          "Não foi possível salvar. Execute o schema.sql no Supabase."
        )
        return
      }
    } else {
      localUpdateDisplayName(user.id, trimmed)
      setLoading(false)
    }

    await refreshProfile()
    toast.success(`Bem-vindo(a), ${trimmed}!`)
    router.push("/")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium mb-2">
          Como quer ser chamado(a) na loja?
        </label>
        <input
          id="displayName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Artur, João..."
          className="w-full h-12 px-4 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          maxLength={40}
          required
        />
        <p className="text-xs text-muted-foreground mt-2">
          Esse nome aparece nos pedidos pelo WhatsApp.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continuar"}
      </button>
    </form>
  )
}
