"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { X, Heart, Trash2 } from "lucide-react"
import { useFavorites } from "@/contexts/favorites-context"

export function FavoritesDrawer() {
  const { isOpen, setIsOpen, getFavoriteProducts, toggleFavorite, favoritesCount } =
    useFavorites()

  const products = getFavoriteProducts()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Favoritos</h2>
                {favoritesCount > 0 && (
                  <span className="text-xs font-medium text-muted-foreground">
                    ({favoritesCount})
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                aria-label="Fechar favoritos"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                  <Heart className="w-12 h-12 text-muted-foreground/30" />
                  <p className="text-muted-foreground font-medium">
                    Nenhum favorito ainda
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Toque no coração em qualquer produto para salvar aqui.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex gap-4 items-center group"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/produto/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-secondary relative"
                      >
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Heart className="w-5 h-5 text-muted-foreground/30" />
                          </div>
                        )}
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/produto/${product.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block font-medium text-foreground text-sm leading-snug hover:text-primary transition-colors line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm font-bold text-foreground mt-1">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        className="flex-shrink-0 p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-destructive/10"
                        aria-label={`Remover ${product.name} dos favoritos`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {products.length > 0 && (
              <div className="px-6 py-4 border-t border-border">
                <Link
                  href="/catalogo/chinelos-kenner"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 px-6 rounded-full border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors text-sm"
                >
                  Ver Catálogo Completo
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
