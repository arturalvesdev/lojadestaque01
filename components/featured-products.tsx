"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/contexts/favorites-context"

const products = [
  {
    id: "1",
    name: "Chinelo Kenner Kivah NK5",
    category: "Chinelos Kenner",
    price: 189.90,
    originalPrice: 229.90,
    badge: "Mais Vendido",
    colors: ["#1a1a2e", "#2d4a3e", "#8B4513"],
  },
  {
    id: "2",
    name: "Chinelo Kenner Amp Turbo",
    category: "Chinelos Kenner",
    price: 159.90,
    badge: "Novo",
    colors: ["#1a1a2e", "#3d5a80", "#f5f5f5"],
  },
  {
    id: "3",
    name: "Boné Lacoste Sport",
    category: "Bonés Lacoste",
    price: 349.90,
    colors: ["#1a1a2e", "#f5f5f5", "#006633"],
  },
  {
    id: "4",
    name: "Camisa Brasil Oficial",
    category: "Seleção Brasileira",
    price: 299.90,
    originalPrice: 349.90,
    badge: "Destaque",
    colors: ["#FFD700", "#009739"],
  },
  {
    id: "5",
    name: "Camisa Flamengo 2024",
    category: "Camisas de Time",
    price: 279.90,
    badge: "Novo",
    colors: ["#C41E3A", "#1a1a2e"],
  },
  {
    id: "6",
    name: "Chinelo Kenner Sunset",
    category: "Chinelos Kenner",
    price: 139.90,
    originalPrice: 169.90,
    badge: "Desconto",
    colors: ["#5c5470", "#1a1a2e", "#f5f5f5"],
  },
]

function badgeClasses(badge: string): string {
  if (badge === "Desconto") return "bg-accent text-accent-foreground"
  if (badge === "Novo") return "bg-primary text-primary-foreground"
  if (badge === "Destaque") return "bg-foreground/90 text-background"
  return "bg-foreground text-background"
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function FeaturedProducts() {
  const { isFavorited, toggleFavorite } = useFavorites()

  return (
    <section id="new" className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-sm font-medium text-primary tracking-wider uppercase mb-3 block">
              Destaques
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
              Mais Vendidos
            </h2>
            <p className="text-muted-foreground text-sm">
              Peças favoritas dos nossos clientes — qualidade comprovada.
            </p>
          </div>
          <Link href="/catalogo/chinelos-kenner">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground text-sm font-medium rounded-full hover:bg-foreground/5 transition-colors group"
            >
              Ver Todos
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {products.map((product) => {
            const favorited = isFavorited(product.id)
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0

            return (
              <Link key={product.id} href={`/produto/${product.id}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group cursor-pointer"
                >
                  {/* Product Image Area */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-4 border border-border/20 group-hover:border-border/50 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Adicione imagem</span>
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
                    {product.badge && (
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${badgeClasses(product.badge)}`}>
                        {product.badge}
                      </div>
                    )}

                    {/* Discount badge (if no named badge) */}
                    {!product.badge && discount > 0 && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground">
                        -{discount}%
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                      <motion.button
                        whileTap={{ scale: 0.92 }}
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
                        whileTap={{ scale: 0.92 }}
                        className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm"
                        aria-label="Ver produto"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Color swatches */}
                    <div className="absolute bottom-3 left-3 flex gap-1.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="w-5 h-5 rounded-full border-2 border-background/70 shadow-sm"
                          style={{ backgroundColor: color }}
                          aria-label={`Cor ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1.5 px-0.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {product.category}
                    </span>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-foreground">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
