"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@/components/product/product-card"
import { storeProducts } from "@/lib/products/catalog"

const CURATED_IDS = [
  "kenner-nk6-preto-grafite",
  "bone-nike-club",
  "bone-lacoste-sport-2026",
  "camisa-selecao-amarela-jogador",
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
}

export function CuratedSelection() {
  const products = CURATED_IDS.map((id) => storeProducts[id]).filter(
    (p) => p && p.isActive !== false
  )

  if (products.length === 0) return null

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/20">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4 block">
            Curadoria
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Seleção Destaque
                <br className="hidden sm:block" />
                <span className="text-primary"> Premium</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg text-sm md:text-base leading-relaxed">
                Uma curadoria especial com os destaques da temporada.
              </p>
            </div>
          </div>
          {/* Elegant divider */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-border via-border/60 to-transparent" />
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                product={product}
                aspectRatio="portrait"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
