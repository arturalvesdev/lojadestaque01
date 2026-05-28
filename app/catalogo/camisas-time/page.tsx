"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { storeProducts } from "@/lib/products/catalog"
import { ProductCard } from "@/components/product/product-card"

const camisasProducts = Object.values(storeProducts).filter(
  (p) => p.category === "Camisas de Time"
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export default function CamisasTimePage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase mb-3 block">
            Coleção
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Camisas de Time
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Cada camisa carrega uma história. Vista seu clube com o orgulho de quem torce de verdade — qualidade premium do primeiro ao último jogo.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {camisasProducts.map((product) => (
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
    </main>
  )
}
