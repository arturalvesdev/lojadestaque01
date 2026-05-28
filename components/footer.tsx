"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"

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
    { name: "Novidades", href: "#" },
    { name: "Chinelos Kenner", href: "/catalogo/chinelos-kenner" },
    { name: "Bonés Lacoste", href: "/catalogo/bones-lacoste" },
    { name: "Camisas de Time", href: "/catalogo/camisas-time" },
    { name: "Seleção Brasileira", href: "/catalogo/selecao-brasileira" },
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
  { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/destaquedosurf_/" },
  { 
    name: "WhatsApp", 
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/branding/logomarcaDestaquecompleta.png"
                  alt="Destaque Premium"
                  width={860}
                  height={288}
                  className="h-12 w-auto dark:invert"
                />
              </motion.div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Há mais de 10 anos vestindo a quebrada com o melhor da
              moda masculina.
            </p>
            
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
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
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
            <ul className="space-y-4">
              <li>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeAddress.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
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
                  href="tel:+5511947824035" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  +55 11 94782-4035
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                10h às 19h
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
              © 2026 Destaque premium. Todos os direitos reservados.
            </p>

            {/* Payment Methods with Logos */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground mr-2">Pagamento:</span>
              {/* Visa */}
              <div className="h-6 w-10 bg-white rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 16" className="h-full w-full">
                  <path fill="#1A1F71" d="M19.5 1.5l-3.3 13h-2.7l3.3-13h2.7zm11.2 8.4l1.4-3.9.8 3.9h-2.2zm3 4.6h2.5l-2.2-13h-2.3c-.5 0-1 .3-1.2.8l-4.2 12.2h2.9l.6-1.6h3.6l.3 1.6zm-7.3-4.2c0-3.4-4.7-3.6-4.7-5.1 0-.5.5-.9 1.4-.9.8 0 1.5.2 2 .4l.4-1.8c-.5-.2-1.3-.4-2.2-.4-2.4 0-4 1.3-4 3.1 0 2.2 3 2.4 3 3.7 0 .7-.6 1.2-1.6 1.2-1 0-1.8-.3-2.3-.5l-.4 1.9c.5.2 1.5.4 2.5.4 2.6 0 4.3-1.3 4.3-3.2M11.4 1.5L6.3 14.5H3.4L1 3.7c-.1-.5-.3-.6-.7-.8C-.2 2.6-.1 2.5-.1 2.5l.1-.6h4.4c.6 0 1.1.4 1.2 1l1.1 5.8 2.8-6.8h2.9z"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="h-6 w-10 bg-white rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 48 30" className="h-full w-full">
                  <circle fill="#EB001B" cx="15" cy="15" r="15"/>
                  <circle fill="#F79E1B" cx="33" cy="15" r="15"/>
                  <path fill="#FF5F00" d="M18 15c0-4.1 2.1-7.7 5.3-9.8C20.6 3.1 17.4 2 14 2 6.8 2 1 7.8 1 15s5.8 13 13 13c3.4 0 6.6-1.1 9.3-3.2-3.2-2.1-5.3-5.7-5.3-9.8z"/>
                </svg>
              </div>
              {/* Pix */}
              <div className="h-6 w-10 bg-white rounded flex items-center justify-center p-1">
                <svg viewBox="0 0 512 512" className="h-full w-full">
                  <path fill="#32BCAD" d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138-97.139c-20.33-20.33-53.328-20.33-73.658 0L139.929 391.47l-27.36-.28z"/>
                  <path fill="#32BCAD" d="M112.57 120.81c20.056 0 38.928 7.808 53.12 22l76.693 76.692c5.385 5.404 14.765 5.384 20.15 0l76.989-76.989c14.191-14.172 33.045-21.98 53.12-21.98h15.098L310.6 217.67c-20.33 20.33-53.328 20.33-73.658 0L139.929 120.53l-27.36.28z"/>
                </svg>
              </div>
              {/* Boleto */}
              <div className="px-2 py-1 bg-white rounded text-xs text-gray-700 font-medium">
                Boleto
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link href="/politica-de-troca" className="text-muted-foreground hover:text-primary transition-colors">
                Troca e Devolução
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacidade
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
