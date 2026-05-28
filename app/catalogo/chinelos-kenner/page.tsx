"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react"
import { storeProducts } from "@/lib/products/catalog"

const KENNER_IDS = [
  "kenner-nk6-offwhite-azul-royal",
  "kenner-nk6-preto-grafite",
  "kenner-nk6-vermelho-preto",
  "kenner-summer-azul-royal-branco",
  "kenner-summer-branco-preto",
  "kenner-summer-preto-branco",
]

const kennerProducts = KENNER_IDS.map((id) => storeProducts[id]).filter(Boolean)

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
            Chinelos Kenner
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Os melhores chinelos Kenner com conforto e estilo.
            Qualidade premium para o seu dia a dia.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {kennerProducts.map((product) => (
            <Link key={product.id} href={`/produto/${product.id}`}>
              <motion.div variants={itemVariants} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary mb-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Sem imagem</span>
                    </div>
                  )}

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
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
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
