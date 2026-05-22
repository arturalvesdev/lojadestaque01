"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react"

const products = [
  { id: "bone-1", name: "Boné Lacoste Sport Preto", price: 349.90 },
  { id: "bone-2", name: "Boné Lacoste Sport Branco", price: 349.90 },
  { id: "bone-3", name: "Boné Lacoste Dry Fit", price: 379.90 },
  { id: "bone-4", name: "Boné Lacoste Classic Navy", price: 329.90 },
  { id: "bone-5", name: "Boné Lacoste Verde", price: 349.90 },
  { id: "bone-6", name: "Boné Lacoste Vermelho", price: 349.90 },
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
    transition: { duration: 0.5 },
  },
}

export default function BonesLacostePage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Bonés Lacoste
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Bonés Lacoste originais com qualidade premium. 
            Estilo e elegância para o seu dia a dia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <Link key={product.id} href={`/produto/${product.id}`}>
              <motion.div variants={itemVariants} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Adicione imagem</span>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors" onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground" onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
                      <ShoppingBag className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Bonés Lacoste</span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                  <span className="text-lg font-bold text-foreground">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
