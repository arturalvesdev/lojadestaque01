import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Script from "next/script"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { CartDrawer } from "@/components/cart-drawer"
import { Providers } from "@/components/providers"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Theme is handled by `next-themes` ThemeProvider (components/ui/theme-provider.tsx)

export const metadata: Metadata = {
  title: "Destaque premium | Vestindo a Quebrada",
  description:
    "Destaque premium - A mais de 10 anos vestindo a quebrada. Referência em Morato. Chinelos Kenner, Bonés Lacoste, Camisas de Time e Seleção Brasileira.",
  keywords: [
    "chinelos kenner",
    "bonés lacoste",
    "camisas de time",
    "seleção brasileira",
    "francisco morato",
    "streetwear",
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
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
