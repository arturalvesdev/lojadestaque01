"use client"

import { motion } from "framer-motion"

const reviews = [
  {
    name: "Rafael M.",
    initials: "RM",
    text: "Recebi o chinelo Kenner em 3 dias, qualidade impecável. Igual ao da foto. Recomendo demais!",
    rating: 5,
    date: "há 3 dias",
    product: "Kenner NK6",
    color: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  {
    name: "Lucas S.",
    initials: "LS",
    text: "Atendimento excelente pelo WhatsApp. Tirei todas as dúvidas antes de comprar. Muito satisfeito.",
    rating: 5,
    date: "há 5 dias",
    product: "Boné Lacoste",
    color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "Bruno T.",
    initials: "BT",
    text: "Comprei dois bonés e chegaram bem embalados. Produto original e preço justo.",
    rating: 5,
    date: "há 1 semana",
    product: "Boné Lacoste Sport",
    color: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  {
    name: "Diego F.",
    initials: "DF",
    text: "Loja de confiança. Já é minha terceira compra aqui. Sempre entrega no prazo.",
    rating: 5,
    date: "há 2 semanas",
    product: "Camisa Brasil",
    color: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  },
  {
    name: "Thiago P.",
    initials: "TP",
    text: "Camisa do time exatamente como esperado. Qualidade top e envio rápido. Valeu!",
    rating: 5,
    date: "há 2 semanas",
    product: "Camisa Flamengo",
    color: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  },
  {
    name: "Matheus R.",
    initials: "MR",
    text: "Bom produto, bom preço. WhatsApp responde rápido. Com certeza voltarei a comprar.",
    rating: 5,
    date: "há 3 semanas",
    product: "Kenner Summer",
    color: "bg-primary/15 text-primary",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-3.5 h-3.5 ${i < count ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ReviewsSection() {
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
            Avaliações
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            O que dizem nossos clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9</span>
            <span className="text-sm text-muted-foreground">· baseado em +200 avaliações</span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Mais de 10 anos atendendo com qualidade. Veja o que nossos clientes têm a dizer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariants}
              className="bg-card border border-border/40 rounded-2xl p-6 flex flex-col gap-4 hover:border-border/70 transition-colors"
            >
              {/* Header: avatar + name + verified */}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${review.color}`}>
                  {review.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{review.name}</span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Compra verificada
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    <span className="text-[10px] text-muted-foreground/60">·</span>
                    <span className="text-[10px] text-muted-foreground">{review.product}</span>
                  </div>
                </div>
              </div>

              <Stars count={review.rating} />

              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
