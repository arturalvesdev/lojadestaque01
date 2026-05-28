"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag, Search, User, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"
import { ProductSearch } from "@/components/product-search"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navLinks = [
  { name: "Início", href: "/" },
  { name: "Catálogo", href: "#collection" },
  { name: "Novidades", href: "#new" },
  { name: "Contato", href: "#whatsapp-cta" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { isAuthenticated } = useAuth()
  const { favoritesCount, setIsOpen: setFavoritesOpen } = useFavorites()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Main Navigation */}
      <nav className={`relative backdrop-blur-xl border-b transition-all duration-300 ${scrolled ? "bg-background/95 border-border/50 shadow-sm" : "bg-background/70 border-transparent"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
                {/* Mobile: DP symbol */}
                <Image
                  src="/branding/logomarcaDP.png"
                  alt="Destaque Premium"
                  width={400}
                  height={400}
                  className="block md:hidden h-9 w-auto dark:invert"
                  priority
                />
                {/* Desktop: full logo */}
                <Image
                  src="/branding/logomarcaDestaquecompleta.png"
                  alt="Destaque Premium"
                  width={860}
                  height={288}
                  className="hidden md:block h-9 w-auto dark:invert"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                type="button"
                onClick={() => setIsSearchOpen((open) => !open)}
                className={`p-2 transition-colors ${
                  isSearchOpen
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
                aria-label="Buscar"
                aria-expanded={isSearchOpen}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setFavoritesOpen(true)}
                className="relative p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Favoritos"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
              <ThemeToggle />
              <Link
                href="/conta"
                className={`hidden sm:flex p-2 transition-colors ${
                  isAuthenticated
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
                aria-label="Minha conta"
              >
                <User className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 text-foreground hover:text-primary transition-colors relative" 
                aria-label="Carrinho"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <ProductSearch
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden overflow-hidden bg-background border-b border-border"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/conta"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              Minha conta
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}
