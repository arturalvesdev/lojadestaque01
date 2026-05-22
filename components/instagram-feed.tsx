"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"

const instagramPosts = [
  {
    id: 1,
    href: "https://www.instagram.com/reel/DXRp7GbDVeD/",
  },
  {
    id: 2,
    href: "https://www.instagram.com/reel/DXfF3ntEo6q/",
  },
  {
    id: 3,
    href: "https://www.instagram.com/reel/DW2EwP0iWFH/",
  },
  {
    id: 4,
    href: "https://www.instagram.com/reel/DWt1zceEYiu/",
  },
  {
    id: 5,
    href: "https://www.instagram.com/reel/DWmBob5ho2X/",
  },
  {
    id: 6,
    href: "https://www.instagram.com/reel/DWmBob5ho2X/",
  },
]

function InstagramPostCard({
  post,
  index,
}: {
  post: (typeof instagramPosts)[0]
  index: number
}) {
  const [thumbnail, setThumbnail] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/instagram-thumbnail?url=${encodeURIComponent(post.href)}`)
      .then((res) => res.json())
      .then((data: { thumbnail_url?: string | null }) => {
        if (!cancelled && data.thumbnail_url) {
          setThumbnail(data.thumbnail_url)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [post.href])

  return (
    <motion.a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="group relative aspect-square rounded-xl overflow-hidden bg-secondary"
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={`Reel do Instagram ${post.id}`}
          fill
          unoptimized
          className="object-cover transition-all duration-300 group-hover:blur-md group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 16vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse" />
      )}

      <motion.div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-all duration-300 group-hover:bg-background/40">
        <Instagram className="w-7 h-7 text-foreground opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 drop-shadow-lg" />
      </motion.div>
    </motion.a>
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
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
            @destaquedosurf_
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Siga Nossa Loja
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nos acompanhe no Instagram e esteja atento às novidades.
            <span className="text-primary font-semibold"> @destaquedosurf_</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {instagramPosts.map((post, index) => (
            <InstagramPostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <motion.a
            href="https://www.instagram.com/destaquedosurf_/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 text-foreground font-medium rounded-full hover:bg-foreground/5 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            Seguir no Instagram
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
