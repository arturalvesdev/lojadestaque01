"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { getProductById } from "@/lib/products"
import type { StoreProduct } from "@/lib/types/product"

const FAVORITES_KEY = "destaquepremium_favorites"

type FavoritesContextType = {
  favorites: string[]
  favoritesCount: number
  isFavorited: (id: string) => boolean
  toggleFavorite: (id: string) => void
  getFavoriteProducts: () => StoreProduct[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) setFavorites(JSON.parse(stored) as string[])
    } catch {}
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const isFavorited = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  )

  const getFavoriteProducts = useCallback(
    () =>
      favorites
        .map((id) => getProductById(id))
        .filter((p): p is StoreProduct => p !== undefined),
    [favorites]
  )

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorited,
        toggleFavorite,
        getFavoriteProducts,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites deve ser usado dentro de FavoritesProvider")
  return ctx
}
