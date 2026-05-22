/**
 * Página de conta — entrar, cadastrar e definir nome na loja.
 */

import { Suspense } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountPanel } from "@/components/auth/account-panel"
import { ArrowLeft } from "lucide-react"

export default function ContaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 pt-28 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar à loja
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Minha Conta
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Entre ou cadastre-se para adicionar produtos à sacola e finalizar
            pedidos pelo WhatsApp.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <AccountPanel />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}
