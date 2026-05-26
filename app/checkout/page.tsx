/**
 * Página de checkout
 * - Exibe resumo do carrinho
 * - Requer autenticação (login/register)
 * - Redireciona para shipping após autenticação
 */

"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, totalPrice, isLoading: isCartLoading } = useCart()
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const [showRegister, setShowRegister] = useState(false)

  if (isCartLoading || isAuthLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  // If the user is already authenticated, explain the current checkout flow.
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
          <div className="bg-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Você já está logado</h2>
            <p className="text-muted-foreground mb-6">
              O fluxo de envio completo ainda não foi implementado neste momento.
              Por enquanto, revise sua sacola e finalize o pedido pelo WhatsApp.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Voltar às Compras
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If cart is empty, show message
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
          <div className="bg-secondary rounded-lg p-8 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Seu carrinho está vazio
            </p>
            <Link
              href="/catalogo/chinelos-kenner"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Voltar às Compras
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Summary */}
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Resumo do Carrinho</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.cartLineId}
                    className="flex justify-between items-center pb-4 border-b border-border"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.size} / {item.color}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-border">
                <span>Total:</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Authentication Forms */}
            <div className="bg-secondary rounded-lg p-6">
              {showRegister ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Criar Conta</h2>
                  <RegisterForm onBack={() => setShowRegister(false)} />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Entrar</h2>
                  <LoginForm
                    onSwitchToRegister={() => setShowRegister(true)}
                  />
                </>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-secondary rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Pedido</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete:</span>
                  <span>Calculado depois</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Impostos:</span>
                  <span>Calculado depois</span>
                </div>
              </div>

              <div className="text-lg font-bold flex justify-between mb-6">
                <span>Total:</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                Após fazer login, você poderá adicionar endereço de entrega e
                escolher o método de pagamento
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
