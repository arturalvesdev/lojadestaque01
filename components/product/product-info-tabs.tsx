"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check, Star } from "lucide-react"
import type { StoreProduct } from "@/lib/types/product"

type AccordionItemProps = {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function AccordionItem({ title, defaultOpen = false, children }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[0.9375rem] font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="ml-4 flex-shrink-0"
        >
          <ChevronDown className="w-4.5 h-4.5 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type Props = {
  product: StoreProduct
}

export function ProductInfoTabs({ product }: Props) {
  const hasHighlights = (product.highlights?.length ?? 0) > 0
  const specs = product.specifications
  const hasSpecs = specs && Object.values(specs).some(Boolean)

  return (
    <section className="mt-14 pt-8 border-t border-border/30">
      {/* Descrição */}
      <AccordionItem title="Descrição" defaultOpen>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </AccordionItem>

      {/* Destaques */}
      {hasHighlights && (
        <AccordionItem title="Destaques">
          <ul className="space-y-3">
            {product.highlights!.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-muted-foreground leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </AccordionItem>
      )}

      {/* Especificações */}
      {hasSpecs && (
        <AccordionItem title="Especificações">
          <dl className="divide-y divide-border/20">
            {specs!.marca && (
              <div className="flex items-center gap-4 py-2.5">
                <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-36 flex-shrink-0">
                  Marca
                </dt>
                <dd className="text-sm text-foreground">{specs!.marca}</dd>
              </div>
            )}
            {specs!.modelo && (
              <div className="flex items-center gap-4 py-2.5">
                <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-36 flex-shrink-0">
                  Modelo
                </dt>
                <dd className="text-sm text-foreground">{specs!.modelo}</dd>
              </div>
            )}
            {specs!.categoria && (
              <div className="flex items-center gap-4 py-2.5">
                <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-36 flex-shrink-0">
                  Categoria
                </dt>
                <dd className="text-sm text-foreground">{specs!.categoria}</dd>
              </div>
            )}
            {specs!.uso && (
              <div className="flex items-center gap-4 py-2.5">
                <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-36 flex-shrink-0">
                  Uso indicado
                </dt>
                <dd className="text-sm text-foreground">{specs!.uso}</dd>
              </div>
            )}
          </dl>
        </AccordionItem>
      )}

      {/* Avaliações — Placeholder */}
      <AccordionItem title="Avaliações dos Clientes">
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-border/40 fill-border/20" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Em breve avaliações verificadas de clientes.
          </p>
        </div>
      </AccordionItem>
    </section>
  )
}
