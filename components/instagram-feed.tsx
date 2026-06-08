"use client"

import { useState, useEffect } from "react"
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

const reels = [
  { id: 1, href: "https://www.instagram.com/reel/DZP6lu6B4yl/" },
  { id: 2, href: "https://www.instagram.com/reel/DZDuFDLyDhJ/" },
  { id: 3, href: "https://www.instagram.com/reel/DW2EwP0iWFH/" },
  { id: 4, href: "https://www.instagram.com/reel/DWt1zceEYiu/" },
  { id: 5, href: "https://www.instagram.com/reel/DWmBob5ho2X/" },
  { id: 6, href: "https://www.instagram.com/reel/DWmBob5ho2X/" },
]

type ThumbnailMap = Record<number, string | null>

function ReelCard({
  href,
  thumbnail,
  index,
}: {
  href: string
  thumbnail: string | null
  index: number
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="group relative aspect-square rounded-xl overflow-hidden bg-secondary border border-border/20"
      aria-label="Ver reel no Instagram"
    >
      {thumbnail ? (
        /* Real thumbnail from og:image */
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Darkening overlay on hover */}
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/35" />
        </>
      ) : (
        /* Fallback gradient when no thumbnail available */
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted/60 to-secondary/80 transition-opacity duration-300 group-hover:opacity-60" />
      )}

      {/* Play / Instagram icon overlay — always visible */}
      <div className="absolute inset-0 flex items-center justify-center">
        <InstagramIcon
          className={`w-7 h-7 transition-all duration-300 group-hover:scale-110 ${
            thumbnail
              ? "text-white/70 group-hover:text-white"
              : "text-muted-foreground/30 group-hover:text-foreground"
          }`}
        />
      </div>
    </motion.a>
  )
}

export function InstagramFeed() {
  const [thumbnails, setThumbnails] = useState<ThumbnailMap>({})

  useEffect(() => {
    // Fire all thumbnail requests in parallel after mount — does not block render
    reels.forEach((reel) => {
      fetch(`/api/instagram-thumbnail?url=${encodeURIComponent(reel.href)}`)
        .then((res) => (res.ok ? res.json() : { thumbnail: null }))
        .then((data: { thumbnail: string | null }) => {
          setThumbnails((prev) => ({ ...prev, [reel.id]: data.thumbnail }))
        })
        .catch(() => {
          setThumbnails((prev) => ({ ...prev, [reel.id]: null }))
        })
    })
  }, [])

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
            @destaquedosurf_
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Siga Nossa Loja
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nos acompanhe no Instagram e esteja atento às novidades.{" "}
            <span className="text-primary font-semibold">@destaquedosurf_</span>
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {reels.map((reel, index) => (
            <ReelCard
              key={reel.id}
              href={reel.href}
              thumbnail={thumbnails[reel.id] ?? null}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <motion.a
            href="https://www.instagram.com/oficial_destaque?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground font-medium rounded-full hover:bg-foreground/5 transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
            Seguir no Instagram
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
