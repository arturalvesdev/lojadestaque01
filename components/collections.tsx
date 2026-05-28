"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProductCountByCategory } from "@/lib/products"

const collections = [
  {
    id: 1,
    name: "Chinelos Kenner",
    abbr: "NK",
    category: "Chinelos Kenner",
    description: "Conforto e estilo",
    href: "/catalogo/chinelos-kenner",
    image: "/products/kenner/kenner-summer-preto-branco/principal.png",
    gradient: "bg-gradient-to-br from-secondary via-muted/50 to-card",
  },
  {
    id: 2,
    name: "Bonés Lacoste",
    abbr: "BL",
    category: "Bonés Lacoste",
    description: "Esporte premium",
    href: "/catalogo/bones-lacoste",
    image: null,
    gradient: "bg-gradient-to-br from-secondary via-emerald-950/30 to-card",
  },
  {
    id: 3,
    name: "Camisas de Time",
    abbr: "CT",
    category: "Camisas de Time",
    description: "Vista seu clube",
    href: "/catalogo/camisas-time",
    image: null,
    gradient: "bg-gradient-to-br from-secondary via-blue-950/25 to-card",
  },
  {
    id: 4,
    name: "Seleção Brasileira",
    abbr: "SB",
    category: "Seleção Brasileira",
    description: "Orgulho nacional",
    href: "/catalogo/selecao-brasileira",
    image: null,
    gradient: "bg-gradient-to-br from-secondary via-yellow-950/25 to-card",
  },
]

function formatCount(n: number): string {
  return n === 1 ? "1 modelo" : `${n} modelos`
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

export function Collections() {
  return (
    <section id="collection" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
            Explore
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Nosso Catálogo
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Peças selecionadas para o visual masculino. Curadoria com
            foco em qualidade, estilo e identidade.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {collections.map((collection) => {
            const count = getProductCountByCategory(collection.category)
            return (
              <Link key={collection.id} href={collection.href}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] relative overflow-hidden bg-secondary">
                    {collection.image ? (
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className={`absolute inset-0 ${collection.gradient} overflow-hidden`}>
                        <span className="absolute inset-0 flex items-center justify-center font-black text-[100px] leading-none tracking-tighter select-none text-foreground/[0.05] pointer-events-none">
                          {collection.abbr}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-xs text-primary font-medium tracking-wider uppercase">
                          {formatCount(count)}
                        </span>
                        <h3 className="text-xl font-bold text-foreground mt-1">
                          {collection.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {collection.description}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
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
