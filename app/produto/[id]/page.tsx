"use client"

import { motion } from "framer-motion"
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
} from "lucide-react"
import { useState, use } from "react"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-context"
import { useFavorites } from "@/contexts/favorites-context"
import { getProductById } from "@/lib/products"
import { ProductOptions, areOptionsSelected } from "@/components/product/product-options"
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

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { addItem } = useCart()
  const { isFavorited, toggleFavorite } = useFavorites()

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
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Media gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main viewer */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
              {activeItem?.type === "image" ? (
                <Image
                  src={activeItem.src}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
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

              {/* Prev / Next buttons */}
              {hasMultipleMedia && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-sm"
                    aria-label="Mídia anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-sm"
                    aria-label="Próxima mídia"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dot indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {mediaItems.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i === activeIndex
                            ? "bg-foreground w-4"
                            : "bg-foreground/40"
                        }`}
                        aria-label={`Ir para mídia ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {mediaItems.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {mediaItems.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeIndex
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                    aria-label={item.type === "video" ? "Ver vídeo" : `Ver imagem ${i + 1}`}
                  >
                    {item.type === "image" ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          sizes="64px"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <span className="text-sm text-primary uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            <ProductOptions
              product={product}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-medium text-foreground">Quantidade:</span>
              <div className="flex items-center border border-border rounded-full">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-foreground hover:text-primary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-foreground hover:text-primary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Adicionar à Sacola
              </motion.button>
              <motion.button
                type="button"
                onClick={handleFavorite}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 border font-semibold rounded-full transition-colors ${
                  favorited
                    ? "border-red-400 bg-red-50 text-red-500 dark:bg-red-950/30 dark:border-red-500"
                    : "border-foreground/20 text-foreground hover:bg-foreground/5"
                }`}
                aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart
                  className={`w-5 h-5 ${favorited ? "fill-red-500 text-red-500" : ""}`}
                />
              </motion.button>
            </div>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="mt-6 flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors w-full sm:w-auto"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Comprar pelo WhatsApp
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
