/**
 * Tipos relacionados aos produtos da loja.
 * Centralizados para manter consistência em todo o projeto.
 */

/** Cor disponível para seleção no produto */
export type ProductColor = {
  name: string
  hex?: string
}

/** Variantes (tamanho e cor) que o cliente deve escolher antes de comprar */
export type ProductVariants = {
  sizes: string[]
  colors: ProductColor[]
}

/** Produto completo exibido na loja */
export type StoreProduct = {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  description: string
  variants: ProductVariants
  badge?: string
  /** URL da imagem principal (relativa a /public) */
  image?: string
  /** URLs de todas as imagens em ordem de exibição */
  images?: string[]
  /** URL do vídeo do produto (relativa a /public) */
  video?: string
}
