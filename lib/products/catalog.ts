/**
 * Catálogo completo de produtos da Destaque premium.
 * Cada produto inclui variantes (tamanho e cor) obrigatórias na compra.
 */

import type { StoreProduct } from "@/lib/types/product"
import { getDefaultVariantsByCategory } from "@/lib/products/variants"

/** Monta produto com variantes automáticas pela categoria */
function product(
  data: Omit<StoreProduct, "variants"> & { variants?: StoreProduct["variants"] }
): StoreProduct {
  return {
    ...data,
    variants: data.variants ?? getDefaultVariantsByCategory(data.category),
  }
}

/**
 * Registro de todos os produtos — chave = ID usado na URL (/produto/[id])
 */
export const storeProducts: Record<string, StoreProduct> = {
  "1": product({
    id: "1",
    name: "Chinelo Kenner Kivah NK5",
    price: 189.9,
    originalPrice: 229.9,
    badge: "Mais Vendido",
    category: "Chinelos Kenner",
    description:
      "O clássico Kenner Kivah NK5 com palmilha anatômica e design moderno. Conforto para o dia todo.",
  }),
  "2": product({
    id: "2",
    name: "Chinelo Kenner Amp Turbo",
    price: 159.9,
    category: "Chinelos Kenner",
    description:
      "Chinelo Kenner Amp Turbo com tecnologia de amortecimento superior. Ideal para caminhadas longas.",
  }),
  "3": product({
    id: "3",
    name: "Boné Lacoste Sport",
    price: 349.9,
    category: "Bonés Lacoste",
    description:
      "Boné Lacoste Sport original com ajuste perfeito e tecido respirável. Elegância e esporte em um só produto.",
  }),
  "4": product({
    id: "4",
    name: "Camisa Brasil Oficial",
    price: 299.9,
    originalPrice: 349.9,
    category: "Seleção Brasileira",
    description:
      "Camisa oficial da Seleção Brasileira. Vista as cores do Brasil com orgulho e qualidade premium.",
  }),
  "5": product({
    id: "5",
    name: "Camisa Flamengo 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Flamengo 2024. Rubro-negro de coração, qualidade de torcedor.",
  }),
  "6": product({
    id: "6",
    name: "Chinelo Kenner Sunset",
    price: 139.9,
    originalPrice: 169.9,
    category: "Chinelos Kenner",
    description:
      "Chinelo Kenner Sunset com cores vibrantes e palmilha macia. Estilo para o verão.",
  }),
  // ─── Kenner NK6 ──────────────────────────────────────────────────────────────
  "kenner-nk6-offwhite-azul-royal": product({
    id: "kenner-nk6-offwhite-azul-royal",
    name: "Kenner NK6 Off-White / Azul Royal",
    price: 189.9,
    badge: "Novo",
    category: "Chinelos Kenner",
    image: "/products/kenner/kenner-nk6-offwhite-azul-royal/frontal.png",
    images: [
      "/products/kenner/kenner-nk6-offwhite-azul-royal/frontal.png",
      "/products/kenner/kenner-nk6-offwhite-azul-royal/lateral.png",
      "/products/kenner/kenner-nk6-offwhite-azul-royal/perspectiva.png",
      "/products/kenner/kenner-nk6-offwhite-azul-royal/sola.png",
    ],
    video: "/products/kenner/kenner-nk6-offwhite-azul-royal/video.mp4",
    description:
      "Chinelo Kenner NK6 nas cores off-white e azul royal. Design premium com palmilha anatômica e acabamento sofisticado.",
    variants: {
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
      colors: [
        { name: "Off-White", hex: "#F5F0E8" },
        { name: "Azul Royal", hex: "#3A5DC8" },
      ],
    },
  }),
  "kenner-nk6-preto-grafite": product({
    id: "kenner-nk6-preto-grafite",
    name: "Kenner NK6 Preto / Grafite",
    price: 189.9,
    badge: "Mais Vendido",
    category: "Chinelos Kenner",
    image: "/products/kenner/kenner-nk6-preto-grafite/principal.png",
    images: [
      "/products/kenner/kenner-nk6-preto-grafite/principal.png",
      "/products/kenner/kenner-nk6-preto-grafite/frontal.png",
      "/products/kenner/kenner-nk6-preto-grafite/lateral.png",
      "/products/kenner/kenner-nk6-preto-grafite/perspectiva.png",
    ],
    video: "/products/kenner/kenner-nk6-preto-grafite/video.mp4",
    description:
      "Chinelo Kenner NK6 nas cores preto e grafite. Estilo clássico com palmilha de alta absorção e durabilidade premium.",
    variants: {
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
      colors: [
        { name: "Preto", hex: "#1a1a1a" },
        { name: "Grafite", hex: "#555555" },
      ],
    },
  }),
  "kenner-nk6-vermelho-preto": product({
    id: "kenner-nk6-vermelho-preto",
    name: "Kenner NK6 Vermelho / Preto",
    price: 189.9,
    category: "Chinelos Kenner",
    image: "/products/kenner/kenner-nk6-vermelho-preto/principal.png",
    images: [
      "/products/kenner/kenner-nk6-vermelho-preto/principal.png",
      "/products/kenner/kenner-nk6-vermelho-preto/frontal.png",
      "/products/kenner/kenner-nk6-vermelho-preto/lateral.png",
      "/products/kenner/kenner-nk6-vermelho-preto/sola.png",
    ],
    video: "/products/kenner/kenner-nk6-vermelho-preto/video.mp4",
    description:
      "Chinelo Kenner NK6 nas cores vermelho e preto. Design arrojado com palmilha anatômica e solado resistente.",
    variants: {
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
      colors: [
        { name: "Vermelho", hex: "#CC1100" },
        { name: "Preto", hex: "#1a1a1a" },
      ],
    },
  }),
  // ─── Kenner Summer ────────────────────────────────────────────────────────────
  "kenner-summer-azul-royal-branco": product({
    id: "kenner-summer-azul-royal-branco",
    name: "Kenner Summer Azul Royal / Branco",
    price: 169.9,
    category: "Chinelos Kenner",
    image: "/products/kenner/kenner-summer-azul-royal-branco/principal.png",
    images: [
      "/products/kenner/kenner-summer-azul-royal-branco/principal.png",
      "/products/kenner/kenner-summer-azul-royal-branco/frontal.png",
      "/products/kenner/kenner-summer-azul-royal-branco/lateral.png",
      "/products/kenner/kenner-summer-azul-royal-branco/perspectiva.png",
      "/products/kenner/kenner-summer-azul-royal-branco/full-view.png",
    ],
    video: "/products/kenner/kenner-summer-azul-royal-branco/video.mp4",
    description:
      "Chinelo Kenner Summer nas cores azul royal e branco. Leve, fresco e estiloso para os dias quentes.",
    variants: {
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
      colors: [
        { name: "Azul Royal", hex: "#3A5DC8" },
        { name: "Branco", hex: "#F5F5F5" },
      ],
    },
  }),
  "kenner-summer-branco-preto": product({
    id: "kenner-summer-branco-preto",
    name: "Kenner Summer Branco / Preto",
    price: 169.9,
    category: "Chinelos Kenner",
    image: "/products/kenner/kenner-summer-branco-preto/principal.png",
    images: [
      "/products/kenner/kenner-summer-branco-preto/principal.png",
      "/products/kenner/kenner-summer-branco-preto/frontal.png",
      "/products/kenner/kenner-summer-branco-preto/lateral.png",
      "/products/kenner/kenner-summer-branco-preto/perspectiva.png",
    ],
    video: "/products/kenner/kenner-summer-branco-preto/video.mp4",
    description:
      "Chinelo Kenner Summer nas cores branco e preto. Combinação clássica com o conforto do modelo Summer.",
    variants: {
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
      colors: [
        { name: "Branco", hex: "#F5F5F5" },
        { name: "Preto", hex: "#1a1a1a" },
      ],
    },
  }),
  "kenner-summer-preto-branco": product({
    id: "kenner-summer-preto-branco",
    name: "Kenner Summer Preto / Branco",
    price: 169.9,
    category: "Chinelos Kenner",
    image: "/products/kenner/kenner-summer-preto-branco/principal.png",
    images: [
      "/products/kenner/kenner-summer-preto-branco/principal.png",
      "/products/kenner/kenner-summer-preto-branco/frontal.png",
      "/products/kenner/kenner-summer-preto-branco/lateral.png",
      "/products/kenner/kenner-summer-preto-branco/perspectiva.png",
    ],
    video: "/products/kenner/kenner-summer-preto-branco/video.mp4",
    description:
      "Chinelo Kenner Summer nas cores preto e branco. Versatilidade e estilo para qualquer ocasião.",
    variants: {
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44"],
      colors: [
        { name: "Preto", hex: "#1a1a1a" },
        { name: "Branco", hex: "#F5F5F5" },
      ],
    },
  }),
  "bone-1": product({
    id: "bone-1",
    name: "Boné Lacoste Sport Preto",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport na cor preta clássica. Elegância e esporte em um só produto.",
  }),
  "bone-2": product({
    id: "bone-2",
    name: "Boné Lacoste Sport Branco",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport branco com logo bordado. Perfeito para dias ensolarados.",
  }),
  "bone-3": product({
    id: "bone-3",
    name: "Boné Lacoste Dry Fit",
    price: 379.9,
    category: "Bonés Lacoste",
    description:
      "Boné Lacoste com tecnologia Dry Fit. Mantém você fresco durante atividades físicas.",
  }),
  "bone-4": product({
    id: "bone-4",
    name: "Boné Lacoste Classic Navy",
    price: 329.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Classic na cor navy. Estilo atemporal com qualidade premium.",
  }),
  "bone-5": product({
    id: "bone-5",
    name: "Boné Lacoste Verde",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport verde. Cor vibrante com o estilo clássico da marca.",
  }),
  "bone-6": product({
    id: "bone-6",
    name: "Boné Lacoste Vermelho",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport vermelho. Destaque-se com estilo e qualidade.",
  }),
  "time-1": product({
    id: "time-1",
    name: "Camisa Flamengo 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Flamengo 2024. Rubro-negro de coração, qualidade de torcedor.",
  }),
  "time-2": product({
    id: "time-2",
    name: "Camisa Corinthians 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Corinthians 2024. Fiel até o fim, qualidade premium.",
  }),
  "time-3": product({
    id: "time-3",
    name: "Camisa Palmeiras 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Palmeiras 2024. Verdão com qualidade e estilo.",
  }),
  "time-4": product({
    id: "time-4",
    name: "Camisa São Paulo 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do São Paulo 2024. Tricolor paulista com qualidade premium.",
  }),
  "time-5": product({
    id: "time-5",
    name: "Camisa Santos 2024",
    price: 269.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Santos 2024. Peixe com estilo e tradição.",
  }),
  "time-6": product({
    id: "time-6",
    name: "Camisa Vasco 2024",
    price: 269.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Vasco 2024. Gigante da colina com qualidade premium.",
  }),
  "time-7": product({
    id: "time-7",
    name: "Camisa Grêmio 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Grêmio 2024. Imortal tricolor com estilo gaúcho.",
  }),
  "time-8": product({
    id: "time-8",
    name: "Camisa Internacional 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Internacional 2024. Colorado de coração, qualidade premium.",
  }),
  "brasil-1": product({
    id: "brasil-1",
    name: "Camisa Brasil Oficial Home",
    price: 299.9,
    badge: "Destaque",
    category: "Seleção Brasileira",
    description:
      "Camisa oficial da Seleção Brasileira modelo Home. Amarelo canarinho com qualidade premium.",
  }),
  "brasil-2": product({
    id: "brasil-2",
    name: "Camisa Brasil Oficial Away",
    price: 299.9,
    category: "Seleção Brasileira",
    description:
      "Camisa oficial da Seleção Brasileira modelo Away. Azul elegante com detalhes premium.",
  }),
  "brasil-3": product({
    id: "brasil-3",
    name: "Camisa Brasil Treino",
    price: 249.9,
    category: "Seleção Brasileira",
    description: "Camisa de treino da Seleção Brasileira. Conforto e estilo para torcer.",
  }),
  "brasil-4": product({
    id: "brasil-4",
    name: "Camisa Brasil Retrô 1970",
    price: 349.9,
    badge: "Coleção",
    category: "Seleção Brasileira",
    description:
      "Camisa retrô da Seleção Brasileira 1970. O time mais bonito da história do futebol.",
  }),
  "brasil-5": product({
    id: "brasil-5",
    name: "Camisa Brasil Retrô 1994",
    price: 349.9,
    category: "Seleção Brasileira",
    description: "Camisa retrô da Seleção Brasileira 1994. O tetra que marcou gerações.",
  }),
  "brasil-6": product({
    id: "brasil-6",
    name: "Camisa Brasil Retrô 2002",
    price: 349.9,
    category: "Seleção Brasileira",
    description:
      "Camisa retrô da Seleção Brasileira 2002. O penta com Ronaldo, Ronaldinho e companhia.",
  }),
}

/** Lista única de produtos (sem duplicar nomes na busca) */
const catalogList = Object.values(storeProducts)

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

/** Busca produtos pelo nome (parcial) */
export function searchProducts(query: string, limit = 8): StoreProduct[] {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return []

  const seenNames = new Set<string>()

  return catalogList
    .filter((item) => {
      const normalizedName = normalizeText(item.name)
      if (!normalizedName.includes(normalizedQuery)) return false
      if (seenNames.has(normalizedName)) return false
      seenNames.add(normalizedName)
      return true
    })
    .slice(0, limit)
}

/** Busca um produto pelo ID da URL */
export function getProductById(id: string): StoreProduct | undefined {
  return storeProducts[id]
}

/** Conta produtos de uma categoria */
export function getProductCountByCategory(category: string): number {
  return Object.values(storeProducts).filter((p) => p.category === category).length
}

/** Gera ID único da linha no carrinho (produto + especificações) */
export function buildCartLineId(productId: string, size: string, color: string) {
  return `${productId}::${size}::${color}`
}
