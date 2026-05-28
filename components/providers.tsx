"use client"

/**
 * Agrupa todos os providers da aplicação (ordem importa).
 * Auth primeiro — o carrinho depende do login.
 */

import type { ReactNode } from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { FavoritesDrawer } from "@/components/favorites-drawer"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          {children}
          <FavoritesDrawer />
          <Toaster position="top-center" richColors closeButton />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}
