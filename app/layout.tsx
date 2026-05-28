import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { CartDrawer } from "@/components/cart-drawer"
import { Providers } from "@/components/providers"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Theme is handled by a custom client-side ThemeProvider (components/ui/theme-provider.tsx)

export const metadata: Metadata = {
  title: "Destaque Premium | Moda Masculina",
  description:
    "Há mais de 10 anos vestindo a quebrada com o melhor da moda masculina. Chinelos Kenner, Bonés Lacoste, Camisas de Time e Seleção Brasileira.",
  keywords: [
    "moda masculina",
    "streetwear",
    "chinelos kenner",
    "bonés lacoste",
    "camisas de time",
    "seleção brasileira",
    "moda urbana",
    "estilo masculino",
  ],
  authors: [{ name: "Destaque premium" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1117",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Providers>
            {children}
            <CartDrawer />
            <WhatsAppFloat />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
