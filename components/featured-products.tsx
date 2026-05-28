"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"
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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
              Destaques
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Mais Vendidos
            </h2>
          </div>
          <Link href="/catalogo/chinelos-kenner">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="self-start md:self-auto px-6 py-3 border border-foreground/20 text-foreground font-medium rounded-full hover:bg-foreground/5 transition-colors"
            >
              Ver Todos
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
            return (
              <Link key={product.id} href={`/produto/${product.id}`}>
                <motion.div variants={itemVariants} className="group cursor-pointer">
                  {/* Product Image Placeholder */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Adicione imagem</span>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <div
                        className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          product.badge === "Desconto"
                            ? "bg-accent text-accent-foreground"
                            : product.badge === "Novo"
                            ? "bg-primary text-primary-foreground"
                            : "bg-foreground text-background"
                        }`}
                      >
                        {product.badge}
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
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
                        <Heart
                          className={`w-5 h-5 ${favorited ? "fill-red-500" : ""}`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground"
                        aria-label="Ver produto"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Color Options */}
                    <div className="absolute bottom-4 left-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-background/50"
                          style={{ backgroundColor: color }}
                          aria-label={`Cor ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
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
