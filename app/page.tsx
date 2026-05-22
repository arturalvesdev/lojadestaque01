import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Collections } from "@/components/collections"
import { FeaturedProducts } from "@/components/featured-products"
import { InstagramFeed } from "@/components/instagram-feed"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Collections />
      <FeaturedProducts />
      <InstagramFeed />
      <WhatsAppCTA />
      <Footer />
    </main>
  )
}
