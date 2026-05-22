/**
 * Mensagens do WhatsApp personalizadas por produto e para pedidos do carrinho.
 */

import type { CartItem } from "@/lib/types/cart"
import type { StoreProduct } from "@/lib/types/product"

const WHATSAPP_NUMBER = "5511947824035"

/** Formata valor em reais (pt-BR) */
function formatPrice(value: number) {
  return value.toFixed(2).replace(".", ",")
}

/**
 * Saudação específica conforme o tipo/nome do produto.
 * Cada categoria recebe um tom diferente e coerente.
 */
export function buildProductWhatsAppMessage(product: StoreProduct): string {
  const name = product.name
  const category = product.category.toLowerCase()

  if (category.includes("chinelo") || category.includes("kenner")) {
    return `Olá! Tudo bem? Quero saber mais sobre o *${name}*. Qual numeração vocês têm disponível?`
  }

  if (category.includes("boné") || category.includes("lacoste")) {
    return `Olá! Gostaria de informações sobre o *${name}*. Tem disponível na loja?`
  }

  if (category.includes("seleção") || category.includes("brasil")) {
    return `Olá! Sou torcedor e tenho interesse na *${name}*. Podem me passar tamanhos e valores?`
  }

  if (category.includes("time") || category.includes("camisa")) {
    return `Olá! Quero comprar a *${name}*. Quais tamanhos estão disponíveis?`
  }

  return `Olá! Vim pelo site da Destaque premium e tenho interesse no *${name}*. Podem me ajudar?`
}

/**
 * Monta a mensagem completa do pedido da sacola com todas as especificações.
 */
export function buildCartCheckoutMessage(
  items: CartItem[],
  totalPrice: number,
  customerName?: string | null
): string {
  const greeting = customerName
    ? `Olá! Sou *${customerName}* e gostaria de finalizar meu pedido na Destaque premium:`
    : "Olá! Gostaria de finalizar meu pedido na Destaque premium:"

  const lines = items.map((item, index) => {
    const subtotal = item.price * item.quantity
    return (
      `${index + 1}. *${item.name}*\n` +
      `   • Tamanho: ${item.size}\n` +
      `   • Cor: ${item.color}\n` +
      `   • Quantidade: ${item.quantity}\n` +
      `   • Subtotal: R$ ${formatPrice(subtotal)}`
    )
  })

  return [
    greeting,
    "",
    "📦 *Itens do pedido:*",
    "",
    ...lines,
    "",
    `💰 *Total: R$ ${formatPrice(totalPrice)}*`,
    "",
    "Aguardo confirmação. Obrigado!",
  ].join("\n")
}

/** Abre o WhatsApp com a mensagem informada */
export function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

export { WHATSAPP_NUMBER }
