"use client"

/**
 * Agrupa todos os providers da aplicação (ordem importa).
 * Auth primeiro — o carrinho depende do login.
 */

import type { ReactNode } from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </CartProvider>
    </AuthProvider>
  )
}
