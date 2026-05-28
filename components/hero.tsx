"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/fundo_destaque.svg')] bg-cover bg-center brightness-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-background/40 to-background" />
        {/* DP watermark — very subtle brand presence */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <Image
            src="/branding/logomarcaDP-cropped.png"
            alt=""
            width={400}
            height={400}
            className="w-64 h-64 md:w-80 md:h-80 object-contain opacity-[0.04] invert"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance"
          >
            <span className="text-foreground">Não seja igual,</span>
            <br />
            <span className="text-primary">se DESTAQUE</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Há mais de 10 anos vestindo a quebrada com o melhor da moda
            masculina. Estilo próprio — para quem sabe o que quer.
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9</span>
            <span className="text-sm text-muted-foreground">· +500 clientes satisfeitos</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="#collection">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Ver Catálogo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <a
              href="https://wa.me/5511947824035?text=Ol%C3%A1%2C+vim+pelo+site+e+quero+saber+mais+sobre+os+produtos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
