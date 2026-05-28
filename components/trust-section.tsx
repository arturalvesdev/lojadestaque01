"use client"

import { motion } from "framer-motion"

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Compra Segura",
    desc: "Seus dados protegidos em todas as etapas da compra",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Pagamento Protegido",
    desc: "PIX e cartão processados com total segurança",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
        <rect width="13" height="8" x="9" y="13" rx="2" />
        <path d="M16 13V9a2 2 0 0 0-2-2H9" />
      </svg>
    ),
    title: "Envio Rápido",
    desc: "Enviamos em até 24h úteis para todo o Brasil",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Atendimento WhatsApp",
    desc: "Suporte rápido e personalizado via WhatsApp",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function TrustSection() {
  return (
    <section className="py-12 md:py-16 border-y border-border/40 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/** Compact horizontal version for use inside product pages */
export function TrustStrip() {
  const compact = [
    { icon: "shield", label: "Compra segura" },
    { icon: "truck", label: "Envio em 24h" },
    { icon: "chat", label: "Suporte WhatsApp" },
  ]

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {compact.map(({ label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border/50 rounded-full px-3 py-1.5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          {label}
        </span>
      ))}
    </div>
  )
}
