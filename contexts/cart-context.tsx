"use client"

/**
 * Contexto da sacola — Suporta guests e usuários autenticados.
 * Guests podem adicionar produtos sem login.
 * Login é requerido apenas no checkout.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { buildCartLineId } from "@/lib/products"
import { getOrCreateGuestId, getGuestIdSync } from "@/lib/auth/guest-session"
import {
  getOrCreateGuestCart,
  getUserCart,
  addCartItem as persistAddCartItem,
  updateCartItemQuantity as persistUpdateCartItemQuantity,
  removeCartItem as persistRemoveCartItem,
  clearCart as persistClearCart,
} from "@/lib/cart/persistence"
import type { CartItem, AddToCartPayload } from "@/lib/types/cart"

type CartContextType = {
  items: CartItem[]
  addItem: (payload: AddToCartPayload) => boolean
  removeItem: (cartLineId: string) => void
  updateQuantity: (cartLineId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isLoading: boolean
  cartId: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [cartId, setCartId] = useState<string | null>(null)
  const [isLoadingCart, setIsLoadingCart] = useState(true)
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth()

  // Initialize cart on mount (guest or user)
  useEffect(() => {
    const initializeCart = async () => {
      setIsLoadingCart(true)

      try {
        if (isAuthenticated && user?.id) {
          // Load user's cart
          const userCart = await getUserCart(user.id)
          if (userCart) {
            setCartId(userCart.id)
            setItems(userCart.items)
          }
        } else {
          // Load guest cart
          const guestId = await getOrCreateGuestId()
          if (guestId) {
            const guestCart = await getOrCreateGuestCart(guestId)
            if (guestCart) {
              setCartId(guestCart.id)
              setItems(guestCart.items)
            }
          }
        }
      } catch (error) {
        console.error("Failed to initialize cart:", error)
      } finally {
        setIsLoadingCart(false)
      }
    }

    if (!isAuthLoading) {
      initializeCart()
    }
  }, [isAuthenticated, user?.id, isAuthLoading])

  /**
   * Adiciona item à sacola.
   * Funciona para guests e usuários autenticados.
   * @returns true se adicionou; false se algo deu errado
   */
  const addItem = useCallback(
    (payload: AddToCartPayload): boolean => {
      if (isAuthLoading || isLoadingCart) {
        toast.info("Aguarde, carregando sua sacola...")
        return false
      }

      if (!cartId) {
        toast.error("Falha ao carregar a sacola. Tente novamente.")
        return false
      }

      const cartLineId = buildCartLineId(
        payload.productId,
        payload.size,
        payload.color
      )

      // Update local state
      setItems((prev) => {
        const existing = prev.find((i) => i.cartLineId === cartLineId)
        if (existing) {
          return prev.map((i) =>
            i.cartLineId === cartLineId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        }
        return [
          ...prev,
          {
            ...payload,
            cartLineId,
            quantity: 1,
          },
        ]
      })

      // Persist to database (async, don't block)
      persistAddCartItem(cartId, {
        ...payload,
        cartLineId,
        quantity: 1,
      }).catch((error) => {
        console.error("Failed to persist cart item:", error)
        toast.error("Falha ao salvar item. Tente novamente.")
      })

      setIsOpen(true)
      toast.success("Produto adicionado à sacola")
      return true
    },
    [cartId, isAuthLoading, isLoadingCart]
  )

  const removeItem = (cartLineId: string) => {
    const item = items.find((i) => i.cartLineId === cartLineId)
    if (!item) {
      return
    }

    setItems((prev) => prev.filter((i) => i.cartLineId !== cartLineId))

    if (cartId) {
      persistRemoveCartItem(cartId, item).catch((error) => {
        console.error("Failed to remove cart item:", error)
        toast.error("Não foi possível remover o item. Tente novamente.")
      })
    }
  }

  const updateQuantity = (cartLineId: string, quantity: number) => {
    const item = items.find((i) => i.cartLineId === cartLineId)
    if (!item) {
      return
    }

    if (quantity <= 0) {
      removeItem(cartLineId)
      return
    }

    setItems((prev) =>
      prev.map((i) =>
        i.cartLineId === cartLineId ? { ...i, quantity } : i
      )
    )

    if (cartId) {
      persistUpdateCartItemQuantity(cartId, item, quantity).catch((error) => {
        console.error("Failed to update cart quantity:", error)
        toast.error("Não foi possível atualizar a quantidade. Tente novamente.")
      })
    }
  }

  const clearCart = () => {
    setItems([])

    if (cartId) {
      persistClearCart(cartId).catch((error) => {
        console.error("Failed to clear cart:", error)
        toast.error("Não foi possível limpar o carrinho.")
      })
    }
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        isLoading: isLoadingCart,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider")
  }
  return context
}
