/**
 * Tipos do carrinho de compras (sacola).
 */

/** Item adicionado à sacola — inclui especificações obrigatórias */
export type CartItem = {
  /** ID único: produto + tamanho + cor */
  cartLineId: string
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  category: string
}

/** Dados mínimos para adicionar um item (sem quantidade) */
export type AddToCartPayload = Omit<CartItem, "cartLineId" | "quantity">
