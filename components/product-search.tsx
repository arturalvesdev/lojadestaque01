"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { searchProducts, type StoreProduct } from "@/lib/products"

type ProductSearchProps = {
  isOpen: boolean
  onClose: () => void
}

export function ProductSearch({ isOpen, onClose }: ProductSearchProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<StoreProduct[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSuggestions([])
      setActiveIndex(-1)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    setSuggestions(searchProducts(query))
    setActiveIndex(-1)
  }, [query])

  const goToProduct = (id: string) => {
    onClose()
    router.push(`/produto/${id}`)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault()
      goToProduct(suggestions[activeIndex].id)
    } else if (event.key === "Enter" && suggestions.length === 1) {
      event.preventDefault()
      goToProduct(suggestions[0].id)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
    >
      <motion.div className="container mx-auto px-4 py-4">
        <motion.div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar produto na loja..."
            className="w-full h-12 pl-12 pr-12 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Buscar produto"
            aria-autocomplete="list"
            aria-controls="product-search-suggestions"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar busca"
          >
            <X className="w-5 h-5" />
          </button>

          {query.trim().length > 0 && (
            <ul
              id="product-search-suggestions"
              role="listbox"
              className="absolute top-full left-0 right-0 mt-2 py-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto"
            >
              {suggestions.length > 0 ? (
                suggestions.map((product, index) => (
                  <li key={product.id} role="option" aria-selected={index === activeIndex}>
                    <button
                      type="button"
                      onClick={() => goToProduct(product.id)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full px-4 py-3 text-left transition-colors ${
                        index === activeIndex
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="block font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {product.category} · R${" "}
                        {product.price.toFixed(2).replace(".", ",")}
                      </span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-muted-foreground">
                  Nenhum produto encontrado para &quot;{query}&quot;
                </li>
              )}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
