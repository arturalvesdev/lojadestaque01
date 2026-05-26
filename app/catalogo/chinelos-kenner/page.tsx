"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react"

const kennerProducts = [
  { id: "kenner-1", name: "Chinelo Kenner Kivah NK5", price: 189.90 },
  { id: "kenner-2", name: "Chinelo Kenner Amp Turbo", price: 159.90 },
  { id: "kenner-3", name: "Chinelo Kenner Sunset", price: 139.90 },
  { id: "kenner-4", name: "Chinelo Kenner Action X1", price: 179.90 },
  { id: "kenner-5", name: "Chinelo Kenner Leve TRK", price: 149.90 },
  { id: "kenner-6", name: "Chinelo Kenner Rhaco S", price: 199.90 },
  { id: "kenner-7", name: "Chinelo Kenner NK5 Preto", price: 189.90 },
  { id: "kenner-8", name: "Chinelo Kenner Kivah Caramelo", price: 189.90 },
  { id: "kenner-9", name: "Chinelo Kenner TRK Marrom", price: 169.90 },
  { id: "kenner-10", name: "Chinelo Kenner Summer Edition", price: 209.90 },
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

export default function ChinelosKennerPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Chinelos Kenner
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Os melhores chinelos Kenner com conforto e estilo. 
            Qualidade premium para o seu dia a dia.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {kennerProducts.map((product) => (
            <Link key={product.id} href={`/produto/${product.id}`}>
              <motion.div
                variants={itemVariants}
                className="group cursor-pointer"
              >
                {/* Product Image Placeholder */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Adicione imagem</span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
                      aria-label="Adicionar aos favoritos"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground"
                      aria-label="Adicionar ao carrinho"
                      onClick={(e) => e.preventDefault()}
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Chinelos Kenner
                  </span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
