"use client"

import { motion } from "framer-motion"

const reviews = [
  {
    name: "Rafael M.",
    text: "Recebi o chinelo Kenner em 3 dias, qualidade impecável. Igual ao da foto. Recomendo demais!",
    rating: 5,
  },
  {
    name: "Lucas S.",
    text: "Atendimento excelente pelo WhatsApp. Tirei todas as dúvidas antes de comprar. Muito satisfeito.",
    rating: 5,
  },
  {
    name: "Bruno T.",
    text: "Comprei dois bonés e chegaram bem embalados. Produto original e preço justo.",
    rating: 5,
  },
  {
    name: "Diego F.",
    text: "Loja de confiança. Já é minha terceira compra aqui. Sempre entrega no prazo.",
    rating: 5,
  },
  {
    name: "Thiago P.",
    text: "Camisa do time exatamente como esperado. Qualidade top e envio rápido. Valeu!",
    rating: 5,
  },
  {
    name: "Matheus R.",
    text: "Bom produto, bom preço. WhatsApp responde rápido. Com certeza voltarei a comprar.",
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < count ? "fill-primary text-primary" : "fill-muted text-muted"}`}
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
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
              className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col gap-4"
            >
              <Stars count={review.rating} />
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-sm font-semibold text-foreground">{review.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
