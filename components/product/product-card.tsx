"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { useFavorites } from "@/contexts/favorites-context"
import type { StoreProduct } from "@/lib/types/product"

function badgeClasses(badge: string): string {
  if (badge === "Mais Vendido") return "bg-foreground/10 text-foreground border border-foreground/20"
  if (badge === "Novo") return "bg-primary text-primary-foreground"
  if (badge === "Destaque") return "bg-foreground/90 text-background"
  if (badge === "Coleção") return "bg-accent/20 text-accent-foreground border border-accent/30"
  return "bg-secondary text-foreground"
}

const categoryMeta: Record<string, { abbr: string; gradient: string }> = {
  "Chinelos Kenner": {
    abbr: "NK",
    gradient: "bg-gradient-to-br from-secondary via-muted/50 to-card",
  },
  "Bonés": {
    abbr: "BN",
    gradient: "bg-gradient-to-br from-secondary via-emerald-950/25 to-card",
  },
  "Camisas de Time": {
    abbr: "CT",
    gradient: "bg-gradient-to-br from-secondary via-blue-950/20 to-card",
  },
  "Seleção Brasileira": {
    abbr: "SB",
    gradient: "bg-gradient-to-br from-secondary via-yellow-950/20 to-card",
  },
}

function NoImageFallback({ category, name }: { category: string; name: string }) {
  const meta = categoryMeta[category] ?? { abbr: category.slice(0, 2).toUpperCase(), gradient: "bg-secondary" }
  return (
    <div className={`absolute inset-0 ${meta.gradient} overflow-hidden`}>
      <span className="absolute inset-0 flex items-center justify-center font-black text-[100px] leading-none tracking-tighter select-none text-foreground/[0.05] pointer-events-none">
        {meta.abbr}
      </span>
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-xs font-medium text-muted-foreground/60 line-clamp-2 leading-snug">
          {name}
        </p>
      </div>
    </div>
  )
}

/**
 * Resolves the best hover image from an ordered image list.
 * Priority: perspectiva (any index after 0) → second image → null.
 */
function resolveHoverImg(imgs: string[]): string | null {
  if (imgs.length < 2) return null
  const perspImg = imgs.slice(1).find((src) => src.includes("perspectiva"))
  return perspImg ?? imgs[1]
}

type ProductCardProps = {
  product: StoreProduct
  aspectRatio?: "square" | "portrait"
  sizes?: string
}

export function ProductCard({
  product,
  aspectRatio = "square",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: ProductCardProps) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const favorited = isFavorited(product.id)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const colorEntries = product.colorImages ? Object.entries(product.colorImages) : []
  const hasColorVariants = colorEntries.length > 0
  const [activeColor, setActiveColor] = useState<string>(colorEntries[0]?.[0] ?? "")

  // Main image: color principal → product.image → first from images[]
  const mainImage = product.image ?? product.images?.[0] ?? null

  // Hover image for products without colorImages:
  // perspectiva anywhere in images[] → images[1] → null
  const hoverImage = !hasColorVariants
    ? resolveHoverImg(product.images ?? (mainImage ? [mainImage] : []))
    : null

  return (
    <Link href={`/produto/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group cursor-pointer"
      >
        {/* ── Image area ── */}
        <div
          className={`relative ${
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          } rounded-2xl overflow-hidden bg-secondary mb-3.5 border border-border/20 group-hover:border-border/50 transition-colors duration-200`}
        >
          {hasColorVariants ? (
            /*
             * Stacked layers — one principal + one hover image per color.
             * Opacity toggled by activeColor state; hover fades in perspectiva/second image.
             * All images are pre-rendered so color switching is instant (no flicker).
             */
            <>
              {colorEntries.map(([color, imgs]) => {
                const hImg = resolveHoverImg(imgs)
                return (
                  <Image
                    key={`p-${color}`}
                    src={imgs[0]}
                    alt={`${product.name} — ${color}`}
                    fill
                    sizes={sizes}
                    className={`object-cover transition-all duration-300 ${
                      activeColor === color
                        ? hImg
                          ? "opacity-100 group-hover:opacity-0"
                          : "opacity-100 group-hover:scale-105"
                        : "opacity-0"
                    }`}
                    unoptimized
                  />
                )
              })}
              {colorEntries.map(([color, imgs]) => {
                const hImg = resolveHoverImg(imgs)
                if (!hImg) return null
                return (
                  <Image
                    key={`h-${color}`}
                    src={hImg}
                    alt={`${product.name} — ${color}`}
                    fill
                    sizes={sizes}
                    className={`object-cover transition-opacity duration-300 ${
                      activeColor === color
                        ? "opacity-0 group-hover:opacity-100"
                        : "opacity-0"
                    }`}
                    unoptimized
                  />
                )
              })}
            </>
          ) : mainImage ? (
            /*
             * Single-image or images[] products.
             * Cross-fade to hover image when available; scale-only when not.
             */
            <>
              <Image
                src={mainImage}
                alt={product.name}
                fill
                sizes={sizes}
                className={`object-cover transition-all duration-300 ${
                  hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                }`}
                unoptimized
              />
              {hoverImage && (
                <Image
                  src={hoverImage}
                  alt={product.name}
                  fill
                  sizes={sizes}
                  className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  unoptimized
                />
              )}
            </>
          ) : (
            <NoImageFallback category={product.category} name={product.name} />
          )}

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Badge */}
          {product.badge && discount === 0 && (
            <div
              className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide pointer-events-none ${badgeClasses(product.badge)}`}
            >
              {product.badge}
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary text-primary-foreground pointer-events-none">
              -{discount}%
            </div>
          )}

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              className={`w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors shadow-sm ${
                favorited
                  ? "bg-red-50 dark:bg-red-950/40 text-red-500"
                  : "bg-background/90 text-foreground hover:text-primary"
              }`}
              aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(product.id)
              }}
            >
              <Heart className={`w-4 h-4 ${favorited ? "fill-red-500" : ""}`} />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm"
              aria-label="Ver produto"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* ── Product info ── */}
        <div className="space-y-1 px-0.5">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
            {product.category}
          </span>
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-base font-bold text-foreground">
              R$&nbsp;{product.price.toFixed(2).replace(".", ",")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                R$&nbsp;{product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          {/* Color swatches — only for products with colorImages */}
          {hasColorVariants && (
            <div
              className="flex items-center gap-2.5 pt-2"
              onClick={(e) => e.preventDefault()}
            >
              <div className="flex items-center gap-1.5">
                {colorEntries.map(([color]) => {
                  const colorData = product.variants.colors.find((c) => c.name === color)
                  const isActive = activeColor === color
                  return (
                    <motion.button
                      key={color}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setActiveColor(color)}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setActiveColor(color)
                      }}
                      aria-label={`Selecionar cor ${color}`}
                      aria-pressed={isActive}
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                        isActive
                          ? "ring-2 ring-primary ring-offset-1 border-transparent scale-110"
                          : "border-border/50 hover:border-border/80"
                      }`}
                      style={{ backgroundColor: colorData?.hex ?? "#888888" }}
                    />
                  )
                })}
              </div>
              <span className="text-[10px] text-muted-foreground leading-none">
                {activeColor}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
