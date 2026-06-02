"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, Star, Sparkles, Trophy } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Confiança",
    description:
      "Cada produto passa por uma seleção rigorosa antes de entrar no catálogo. Só vendemos o que acreditamos.",
  },
  {
    icon: Star,
    title: "Qualidade",
    description:
      "Trabalhamos com marcas reconhecidas e produtos de alto padrão. Nada de promessas vazias.",
  },
  {
    icon: Sparkles,
    title: "Estilo",
    description:
      "Design que faz diferença — da embalagem ao produto final. Cada detalhe conta.",
  },
  {
    icon: Trophy,
    title: "Experiência",
    description:
      "Do primeiro clique à entrega na sua porta, cada etapa é pensada para você.",
  },
]

const inViewInitial = { opacity: 0, y: 28 } as const
const inViewAnimate = { opacity: 1, y: 0 } as const
const inViewTransition = { duration: 0.7 }

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/85" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative container mx-auto px-4 text-center pt-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-background/45 mb-6"
          >
            Nossa Marca
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-bold tracking-tight leading-none mb-8"
          >
            Destaque
            <br />
            <span className="text-background/25">Premium</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-lg md:text-xl text-background/55 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Mais do que uma loja. Uma marca construída para quem valoriza estilo,
            qualidade e autenticidade.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-background/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-background/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Nossa História ── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={inViewInitial}
              whileInView={inViewAnimate}
              transition={inViewTransition}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5">
                Nossa História
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10 text-foreground leading-tight">
                Nasceu da paixão
                <br />
                por produtos de verdade.
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-[1.05rem]">
                <p>
                  A Destaque Premium nasceu de uma necessidade simples: encontrar produtos de
                  qualidade real, sem promessas vazias e sem complicações. Sabemos que cada compra
                  é uma escolha — e queremos que você se sinta seguro em cada decisão.
                </p>
                <p>
                  Selecionamos cada item do nosso catálogo com cuidado. Não trabalhamos com
                  tudo — trabalhamos com o que realmente vale. Marcas como Kenner e Lacoste estão
                  aqui porque entregam o que prometem: conforto, durabilidade e estilo que duram
                  além da temporada.
                </p>
                <p>
                  Nossa missão é simples: ser a loja em que você confia para presentear, para se
                  vestir bem e para descobrir produtos que fazem diferença no dia a dia.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Nossos Valores ── */}
      <section className="py-24 md:py-36 bg-secondary/25">
        <div className="container mx-auto px-4">
          <motion.div
            initial={inViewInitial}
            whileInView={inViewAnimate}
            transition={inViewTransition}
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-5">
              O que nos move
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Nossos Valores
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="group bg-background border border-border/50 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/18 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nossa Missão ── */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={inViewInitial}
              whileInView={inViewAnimate}
              transition={inViewTransition}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
                Nossa Missão
              </p>
              <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                &ldquo;Levar produtos selecionados para todo o Brasil através de uma experiência
                moderna, segura e premium.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={inViewInitial}
            whileInView={inViewAnimate}
            transition={inViewTransition}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Conheça nossa coleção
            </h2>
            <p className="text-background/55 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Produtos selecionados. Qualidade garantida. Entrega para todo o Brasil.
            </p>
            <Link
              href="/#collection"
              className="inline-flex items-center justify-center h-14 px-10 bg-background text-foreground font-semibold rounded-full hover:bg-background/90 transition-all hover:scale-105 text-base"
            >
              Ver Produtos
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
