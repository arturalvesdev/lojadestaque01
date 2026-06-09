"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock, Truck } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const footerLinks = {
  shop: [
    { name: "Novidades", href: "/#new" },
    { name: "Chinelos Kenner", href: "/catalogo/chinelos-kenner" },
    { name: "Bonés", href: "/catalogo/bones-lacoste" },
    { name: "Camisas de Time", href: "/catalogo/camisas-time" },
    { name: "Seleção Brasileira", href: "/catalogo/selecao-brasileira" },
    { name: "Sobre nós", href: "/sobre" },
  ],
  info: [
    { name: "Política de Troca", href: "/politica-de-troca" },
    { name: "Política de Envio", href: "/politica-de-envio" },
  ],
}

const storeAddress = {
  line1: "Rua Geronimo Caetano Garcia, 270",
  line2: "Francisco Morato, São Paulo",
  cep: "07901-000",
  mapsQuery:
    "Rua Geronimo Caetano Garcia, 270, Francisco Morato, São Paulo, 07901-000",
}

const socialLinks = [
  { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/oficial_destaque?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  {
    name: "WhatsApp",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    href: "https://wa.me/5511947824035"
  },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
          {/* Brand Column — 2 cols */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/branding/logomarcaDestaquecompleta-cropped.png"
                  alt="Destaque Premium"
                  width={1303}
                  height={403}
                  className="h-12 w-auto dark:invert"
                />
              </motion.div>
            </Link>
            <p className="text-muted-foreground mb-5 max-w-sm text-sm leading-relaxed">
              Produtos selecionados com qualidade real. Vestindo o Brasil com
              estilo, conforto e autenticidade.
            </p>

            {/* Shipping + coverage */}
            <div className="flex flex-col gap-2 mb-5">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Envio para todo o Brasil em até 24h úteis após confirmação do pedido.</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Atendimento para todo o Brasil</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Loja
            </h4>
            <ul className="space-y-1">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info / Policies */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Informações
            </h4>
            <ul className="space-y-1">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeAddress.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    {storeAddress.line1}
                    <br />
                    {storeAddress.line2}
                    <br />
                    {storeAddress.cep}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511947824035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors py-1.5 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">+55 11 94782-4035</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground py-1">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Seg–Sáb, 10h às 19h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2026 Destaque Premium. Todos os direitos reservados.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Pagamento:</span>

              {/* PIX */}
              <div className="flex items-center gap-1 h-7 px-2.5 bg-white rounded border border-gray-100">
                <svg viewBox="0 0 512 512" className="h-3.5 w-3.5" aria-hidden="true">
                  <path fill="#32BCAD" d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138-97.139c-20.33-20.33-53.328-20.33-73.658 0L139.929 391.47l-27.36-.28zM112.57 120.81c20.056 0 38.928 7.808 53.12 22l76.693 76.692c5.385 5.404 14.765 5.384 20.15 0l76.989-76.989c14.191-14.172 33.045-21.98 53.12-21.98h15.098L310.6 217.67c-20.33 20.33-53.328 20.33-73.658 0L139.929 120.53l-27.36.28z"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-700">PIX</span>
              </div>

              {/* Cartão de Crédito */}
              <div className="flex items-center gap-1 h-7 px-2.5 bg-white rounded border border-gray-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-700">Crédito</span>
              </div>

              {/* Cartão de Débito */}
              <div className="flex items-center gap-1 h-7 px-2.5 bg-white rounded border border-gray-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                  <line x1="5" y1="15" x2="9" y2="15"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-700">Débito</span>
              </div>

              {/* Boleto */}
              <div className="flex items-center gap-1 h-7 px-2.5 bg-white rounded border border-gray-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M3 3h2v18H3zM7 3h1v18H7zM10 3h2v18h-2zM14 3h1v18h-1zM17 3h2v18h-2zM21 3h1v18h-1z"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-700">Boleto</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-1 text-sm">
              <Link href="/politica-de-troca" className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                Troca e Devolução
              </Link>
              <span className="text-border/60">·</span>
              <Link href="/politica-de-envio" className="px-3 py-2 text-muted-foreground hover:text-primary transition-colors">
                Envio
              </Link>
            </div>
          </div>

          {/* Final Message */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm italic">
              &quot;Até agora nos ajudou o Senhor!&quot;
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
