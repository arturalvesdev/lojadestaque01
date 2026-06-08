import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustSection } from "@/components/trust-section"
import { CuratedSelection } from "@/components/curated-selection"
import { Collections } from "@/components/collections"
import { FeaturedProducts } from "@/components/featured-products"
import { ReviewsSection } from "@/components/reviews-section"
import { InstagramFeed } from "@/components/instagram-feed"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustSection />
      <CuratedSelection />
      <Collections />
      <FeaturedProducts />
      <ReviewsSection />
      <InstagramFeed />
      <WhatsAppCTA />
      <Footer />
    </main>
  )
}
