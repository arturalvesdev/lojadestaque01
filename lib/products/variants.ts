/**
 * Variantes padrão (tamanho e cor) por categoria de produto.
 * Usado quando o produto não define variantes próprias no catálogo.
 */

import type { ProductVariants } from "@/lib/types/product"

/** Tamanhos comuns para chinelos */
const FLIP_FLOP_SIZES = ["37", "38", "39", "40", "41", "42", "43", "44"]

/** Tamanhos para camisas e camisetas */
const SHIRT_SIZES = ["P", "M", "G", "GG", "XG"]

/** Bonés geralmente têm tamanho único ajustável */
const CAP_SIZES = ["Único"]

/**
 * Retorna tamanhos e cores padrão conforme a categoria do produto.
 */
export function getDefaultVariantsByCategory(category: string): ProductVariants {
  const lower = category.toLowerCase()

  if (lower.includes("chinelo") || lower.includes("kenner")) {
    return {
      sizes: FLIP_FLOP_SIZES,
      colors: [
        { name: "Preto", hex: "#1a1a2e" },
        { name: "Branco", hex: "#f5f5f5" },
        { name: "Azul", hex: "#3d5a80" },
        { name: "Marrom", hex: "#8B4513" },
      ],
    }
  }

  if (lower.includes("boné") || lower.includes("bone") || lower.includes("lacoste")) {
    return {
      sizes: CAP_SIZES,
      colors: [
        { name: "Preto", hex: "#1a1a2e" },
        { name: "Branco", hex: "#f5f5f5" },
        { name: "Verde", hex: "#006633" },
        { name: "Vermelho", hex: "#C41E3A" },
        { name: "Navy", hex: "#1e3a5f" },
      ],
    }
  }

  if (
    lower.includes("camisa") ||
    lower.includes("time") ||
    lower.includes("seleção") ||
    lower.includes("brasil")
  ) {
    return {
      sizes: SHIRT_SIZES,
      colors: [
        { name: "Padrão oficial" },
        { name: "Alternativa" },
      ],
    }
  }

  return {
    sizes: ["Único"],
    colors: [{ name: "Padrão" }],
  }
}
