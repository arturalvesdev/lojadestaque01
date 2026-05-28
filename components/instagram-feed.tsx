"use client"

import { motion } from "framer-motion"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function InstagramFeed() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase">
            @destaquedosurf_
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Siga Nossa Loja
          </h2>

          <p className="text-muted-foreground max-w-lg">
            Nos acompanhe no Instagram e fique por dentro das novidades,
            lançamentos e promoções exclusivas.{" "}
            <span className="text-primary font-semibold">@destaquedosurf_</span>
          </p>

          <motion.a
            href="https://www.instagram.com/destaquedosurf_/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 inline-flex items-center gap-2 px-8 py-3.5 border border-foreground/20 text-foreground font-medium rounded-full hover:bg-foreground/5 transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
            Seguir no Instagram
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
