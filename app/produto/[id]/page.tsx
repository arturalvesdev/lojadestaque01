"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  Play,
  ShoppingBag,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { useState, use, useEffect } from "react"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"
import { getProductById } from "@/lib/products"
import { ProductOptions, areOptionsSelected } from "@/components/product/product-options"
import { TrustStrip } from "@/components/trust-section"
import {
  buildProductWhatsAppMessage,
  openWhatsApp,
} from "@/lib/whatsapp/messages"
import type { StoreProduct } from "@/lib/types/product"

type MediaItem = { type: "image" | "video"; src: string }

function buildMediaItems(product: StoreProduct): MediaItem[] {
  const images = product.images ?? (product.image ? [product.image] : [])
  const items: MediaItem[] = images.map((src) => ({ type: "image", src }))
  if (product.video) {
    items.push({ type: "video", src: product.video })
  }
  return items
}

function calcDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100)
}

function badgeClasses(badge: string): string {
  if (badge === "Mais Vendido") return "bg-foreground/10 text-foreground border-foreground/20"
  if (badge === "Novo") return "bg-primary text-primary-foreground border-transparent"
  if (badge === "Destaque") return "bg-primary/15 text-primary border-primary/25"
  if (badge === "Coleção") return "bg-accent/15 text-accent-foreground border-accent/30"
  return "bg-secondary text-foreground border-border/50"
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const { addItem } = useCart()
  const { isFavorited, toggleFavorite } = useFavorites()

  // Sticky bar: appear after scrolling past the top CTA
  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 380)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Zoom modal: close on ESC
  useEffect(() => {
    if (!zoomOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [zoomOpen])

  const product = getProductById(id)

  if (!product) {
    return (
      <main className="min-h-screen bg-background pt-24 px-4 text-center">
        <p className="text-muted-foreground">Produto não encontrado.</p>
        <Link href="/" className="text-primary mt-4 inline-block hover:underline">
          Voltar à loja
        </Link>
      </main>
    )
  }

  const mediaItems = buildMediaItems(product)
  const activeItem = mediaItems[activeIndex] ?? null
  const hasMultipleMedia = mediaItems.length > 1
  const favorited = isFavorited(product.id)
  const discount = product.originalPrice
    ? calcDiscount(product.originalPrice, product.price)
    : 0

  // Color is informational — use first color as the cart value
  const defaultColor =
    product.variants.colors.map((c) => c.name).join(" / ") ||
    product.variants.colors[0]?.name ||
    ""

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length)
  const handleNext = () =>
    setActiveIndex((i) => (i + 1) % mediaItems.length)

  const handleAddToCart = () => {
    if (!areOptionsSelected(selectedSize)) {
      toast.error("Selecione o tamanho antes de adicionar à sacola")
      return
    }

    for (let i = 0; i < quantity; i++) {
      const ok = addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize!,
        color: defaultColor,
        category: product.category,
      })
      if (!ok) break
    }
  }

  const handleWhatsApp = () => {
    const message = buildProductWhatsAppMessage(product)
    if (selectedSize) {
      openWhatsApp(
        `${message}\n\nPreferência: tamanho ${selectedSize}, cor ${defaultColor}.`
      )
    } else {
      openWhatsApp(message)
    }
  }

  const handleFavorite = () => {
    toggleFavorite(product.id)
    toast.success(
      isFavorited(product.id)
        ? "Removido dos favoritos"
        : "Adicionado aos favoritos"
    )
  }

  return (
    <main className="min-h-screen bg-background pt-20 pb-28 lg:pb-0">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8 pb-0">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar
          <span className="mx-1.5 text-border/80">/</span>
          <span className="text-foreground/50 truncate max-w-[180px]">{product.category}</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* ── Media gallery ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
          >
            {/* Main viewer */}
            <div
              className={`relative aspect-square rounded-3xl overflow-hidden bg-secondary border border-border/20 shadow-sm group/gallery ${activeItem?.type === "image" ? "cursor-zoom-in" : ""}`}
              onClick={() => activeItem?.type === "image" && setZoomOpen(true)}
            >
              {activeItem?.type === "image" ? (
                <Image
                  src={activeItem.src}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover/gallery:scale-105"
                  priority
                  unoptimized
                />
              ) : activeItem?.type === "video" ? (
                <video
                  key={activeItem.src}
                  src={activeItem.src}
                  controls
                  muted
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Sem imagem</span>
                </div>
              )}

              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none">
                  -{discount}%
                </div>
              )}

              {/* Image counter */}
              {hasMultipleMedia && (
                <div className="absolute top-4 right-4 z-10 bg-background/75 backdrop-blur-sm text-xs font-medium text-foreground/80 px-2.5 py-1 rounded-full pointer-events-none">
                  {activeIndex + 1}&nbsp;/&nbsp;{mediaItems.length}
                </div>
              )}

              {/* Zoom hint on desktop */}
              {activeItem?.type === "image" && (
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span className="bg-background/75 backdrop-blur-sm text-[10px] text-foreground/70 font-medium px-2 py-1 rounded-full">
                    Clique para ampliar
                  </span>
                </div>
              )}

              {/* Prev / Next */}
              {hasMultipleMedia && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handlePrev() }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground hover:bg-background hover:scale-105 transition-all shadow-sm"
                    aria-label="Mídia anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleNext() }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground hover:bg-background hover:scale-105 transition-all shadow-sm"
                    aria-label="Próxima mídia"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {mediaItems.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {mediaItems.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeIndex
                        ? "border-primary opacity-100"
                        : "border-transparent opacity-55 hover:opacity-100 hover:border-border"
                    }`}
                    aria-label={item.type === "video" ? "Ver vídeo" : `Ver imagem ${i + 1}`}
                  >
                    {item.type === "image" ? (
                      <div className="relative w-full h-full bg-secondary">
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          sizes="72px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <Play className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Product info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex flex-col"
          >
            {/* Category chip + badge + name */}
            <div className="mb-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block text-xs font-semibold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.badge && (
                  <span className={`inline-block text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full border ${badgeClasses(product.badge)}`}>
                    {product.badge}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price block */}
            <div className="mb-2">
              <div className="flex flex-wrap items-end gap-3 mb-1">
                <span className="text-4xl font-bold text-foreground tracking-tight">
                  R$&nbsp;{product.price.toFixed(2).replace(".", ",")}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through leading-none mb-1">
                      R$&nbsp;{product.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-2.5 py-1 rounded-full leading-none mb-1">
                      economia de R$&nbsp;{(product.originalPrice - product.price).toFixed(2).replace(".", ",")}
                    </span>
                  </>
                )}
              </div>
              {product.price >= 100 && (
                <p className="text-xs text-muted-foreground mb-3">
                  ou 3× de R$&nbsp;{(product.price / 3).toFixed(2).replace(".", ",")} sem juros no cartão
                </p>
              )}
            </div>

            {/* Shipping confidence — inline micro-strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-5 py-3 border-y border-border/25">
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true">
                  <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
                  <rect width="13" height="8" x="9" y="13" rx="2" />
                  <path d="M16 13V9a2 2 0 0 0-2-2H9" />
                </svg>
                Envio em até 24h úteis
              </span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Todo o Brasil
              </span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                Embalagem segura
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed border-b border-border/30 pb-6 mb-6">
              {product.description}
            </p>

            {/* Size + color options */}
            <ProductOptions
              product={product}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              {/* Stepper */}
              <div className="flex items-center bg-secondary/70 border border-border/50 rounded-full h-12 px-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-foreground hover:text-primary transition-colors rounded-full"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold select-none tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-foreground hover:text-primary transition-colors rounded-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary CTA */}
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 h-12 px-5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                <span>Adicionar à Sacola</span>
              </motion.button>

              {/* Favorite */}
              <motion.button
                type="button"
                onClick={handleFavorite}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all flex-shrink-0 ${
                  favorited
                    ? "border-red-400 bg-red-50 text-red-500 dark:bg-red-950/30 dark:border-red-500"
                    : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
                aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart
                  className={`w-5 h-5 ${favorited ? "fill-red-500 text-red-500" : ""}`}
                />
              </motion.button>
            </div>

            {/* Trust strip */}
            <TrustStrip />

            {/* WhatsApp — outlined, full width */}
            <motion.button
              type="button"
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-4 flex items-center justify-center gap-2 w-full h-12 rounded-full border border-[#25D366]/40 bg-[#25D366]/8 text-[#1a9e50] dark:text-[#4ade80] font-semibold hover:bg-[#25D366]/15 transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Comprar pelo WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── Zoom Lightbox ── */}
      <AnimatePresence>
        {zoomOpen && activeItem?.type === "image" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeItem.src}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 95vw, 672px"
                className="object-contain"
                unoptimized
                priority
              />
            </motion.div>

            {/* Nav in lightbox */}
            {hasMultipleMedia && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handlePrev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Mídia anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleNext() }}
                  className="absolute right-16 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Próxima mídia"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Close */}
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Fechar zoom"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {activeIndex + 1} / {mediaItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky Mobile Buy Bar ── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
          >
            <div className="bg-background/96 backdrop-blur-xl border-t border-border/50 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center gap-3">
                {/* Price + size */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground truncate leading-none mb-0.5">
                    {product.name}
                  </p>
                  <p className="font-bold text-foreground text-lg leading-tight">
                    R$&nbsp;{product.price.toFixed(2).replace(".", ",")}
                  </p>
                  {selectedSize && (
                    <p className="text-[11px] text-primary font-semibold leading-none mt-0.5">
                      Tamanho: {selectedSize}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <motion.button
                  type="button"
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.96 }}
                  className="flex-shrink-0 flex items-center gap-2 h-11 px-5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {selectedSize ? "Adicionar" : "Ver tamanhos"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
