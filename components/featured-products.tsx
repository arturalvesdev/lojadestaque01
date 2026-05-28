"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product/product-card"
import { storeProducts } from "@/lib/products/catalog"

const FEATURED_IDS = [
  "kenner-nk6-preto-grafite",
  "kenner-summer-preto-branco",
  "kenner-nk6-offwhite-azul-royal",
  "kenner-summer-azul-royal-branco",
  "kenner-nk6-vermelho-preto",
  "kenner-summer-branco-preto",
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
  const products = FEATURED_IDS.map((id) => storeProducts[id]).filter(Boolean)

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
              Coleção Kenner
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
              NK6 &amp; Summer
            </h2>
            <p className="text-muted-foreground text-sm">
              Os modelos mais queridos — conforto e estilo que falam por si.
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
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                product={product}
                aspectRatio="portrait"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
