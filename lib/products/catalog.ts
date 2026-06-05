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
    isActive: false,
    name: "Chinelo Kenner Kivah NK5",
    price: 189.9,
    originalPrice: 229.9,
    badge: "Mais Vendido",
    category: "Chinelos Kenner",
    description:
      "O clássico Kenner Kivah NK5 com palmilha anatômica e design moderno. Conforto para o dia todo.",
    highlights: [
      "Palmilha anatômica que acompanha o formato natural do pé",
      "Tira em EVA de alta densidade com acabamento sofisticado",
      "Solado resistente e antiderrapante",
      "Design clássico e versátil para uso diário",
      "Disponível em numeração do 37 ao 44",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "Kivah NK5",
      categoria: "Chinelos",
      uso: "Casual / Uso diário",
    },
  }),
  "2": product({
    id: "2",
    isActive: false,
    name: "Chinelo Kenner Amp Turbo",
    price: 159.9,
    category: "Chinelos Kenner",
    description:
      "Chinelo Kenner Amp Turbo com tecnologia de amortecimento superior. Ideal para caminhadas longas.",
    highlights: [
      "Tecnologia de amortecimento que reduz o impacto em cada passo",
      "Palmilha extra espessa para maior conforto",
      "Tira larga com encaixe seguro",
      "Solado de alta durabilidade",
      "Perfeito para quem está muito tempo em pé",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "Amp Turbo",
      categoria: "Chinelos",
      uso: "Casual / Caminhada",
    },
  }),
  "3": product({
    id: "3",
    isActive: false,
    name: "Boné Lacoste Sport",
    price: 349.9,
    category: "Bonés Lacoste",
    description:
      "Boné Lacoste Sport original com ajuste perfeito e tecido respirável. Elegância e esporte em um só produto.",
    highlights: [
      "Bordado premium do logo Lacoste na frente",
      "Fecho ajustável na traseira para tamanho personalizado",
      "Tecido com alta respirabilidade",
      "Aba estruturada para proteção solar eficiente",
      "Acabamento interno macio e confortável",
    ],
    specifications: {
      marca: "Lacoste",
      modelo: "Sport",
      categoria: "Bonés",
      uso: "Casual / Esporte",
    },
  }),
  "4": product({
    id: "4",
    isActive: false,
    name: "Camisa Brasil Oficial",
    price: 299.9,
    originalPrice: 349.9,
    category: "Seleção Brasileira",
    description:
      "Camisa oficial da Seleção Brasileira. Vista as cores do Brasil com orgulho e qualidade premium.",
    highlights: [
      "Veste as cores do Brasil com orgulho",
      "Tecido leve e confortável para uso diário",
      "Modelagem regular que valoriza o visual",
      "Estampa de alta qualidade com cores duradouras",
      "Acabamento premium à altura da maior seleção do mundo",
    ],
    specifications: {
      marca: "CBF",
      modelo: "Oficial",
      categoria: "Seleção Brasileira",
      uso: "Torcida / Casual",
    },
  }),
  "5": product({
    id: "5",
    isActive: false,
    name: "Camisa Flamengo 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Flamengo 2024. Rubro-negro de coração, qualidade de torcedor.",
    highlights: [
      "Representa a paixão do maior clube do Brasil",
      "Tecido leve e confortável para uso no dia a dia",
      "Estampa e bordados de alta qualidade",
      "Cores rubro-negras que mantêm a intensidade após lavagens",
      "Modelagem regular para diferentes estilos",
    ],
    specifications: {
      marca: "Flamengo",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "6": product({
    id: "6",
    isActive: false,
    name: "Chinelo Kenner Sunset",
    price: 139.9,
    originalPrice: 169.9,
    category: "Chinelos Kenner",
    description:
      "Chinelo Kenner Sunset com cores vibrantes e palmilha macia. Estilo para o verão.",
    highlights: [
      "Cores vibrantes que combinam com o estilo praiano",
      "Palmilha macia para máximo conforto",
      "Design leve e despojado ideal para o verão",
      "Solado flexível com boa aderência",
      "Perfeito para praia, piscina e passeios casuais",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "Sunset",
      categoria: "Chinelos",
      uso: "Praia / Casual",
    },
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
    highlights: [
      "Palmilha anatômica com suporte para uso prolongado",
      "Tira em EVA de alta densidade — conforto e durabilidade",
      "Solado antiderrapante com boa aderência em diferentes superfícies",
      "Combinação off-white e azul royal para looks modernos",
      "Disponível nos números 37 ao 44",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "NK6",
      categoria: "Chinelos",
      uso: "Casual / Uso diário",
    },
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
    highlights: [
      "Palmilha de alta absorção para conforto em longas caminhadas",
      "Tira em EVA de alta densidade com acabamento premium",
      "Solado antiderrapante resistente ao desgaste",
      "Combinação atemporal preto e grafite — combina com tudo",
      "O modelo mais vendido do catálogo Kenner",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "NK6",
      categoria: "Chinelos",
      uso: "Casual / Uso diário",
    },
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
    highlights: [
      "Palmilha anatômica para suporte e conforto prolongado",
      "Design arrojado vermelho e preto para quem gosta de se destacar",
      "Solado resistente com excelente durabilidade",
      "Tira em EVA de alta densidade — firme sem apertar",
      "Numeração completa do 37 ao 44",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "NK6",
      categoria: "Chinelos",
      uso: "Casual / Uso diário",
    },
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
    highlights: [
      "Construção ultra-leve pensada para os dias mais quentes",
      "Palmilha macia com textura confortável",
      "Solado flexível que acompanha o movimento natural",
      "Combinação azul royal e branco para looks despojados",
      "Ideal para praia, piscina e passeios ao ar livre",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "Summer",
      categoria: "Chinelos",
      uso: "Praia / Casual",
    },
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
    highlights: [
      "Combinação clássica branco e preto que vai com qualquer look",
      "Leveza superior para uso prolongado sem cansaço",
      "Palmilha macia e confortável",
      "Solado flexível com boa aderência em superfícies úmidas",
      "Design clean e versátil para diversas ocasiões",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "Summer",
      categoria: "Chinelos",
      uso: "Praia / Casual",
    },
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
    highlights: [
      "Fundo preto com detalhes brancos para um visual elegante e versátil",
      "Construção leve para uso durante todo o dia",
      "Palmilha macia com absorção de impacto",
      "Solado flexível e confortável",
      "Combinação que funciona em qualquer ocasião casual",
    ],
    specifications: {
      marca: "Kenner",
      modelo: "Summer",
      categoria: "Chinelos",
      uso: "Praia / Casual",
    },
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
    isActive: false,
    name: "Boné Lacoste Sport Preto",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport na cor preta clássica. Elegância e esporte em um só produto.",
    highlights: [
      "Logo Lacoste bordado com precisão na frente",
      "Fecho ajustável traseiro para encaixe perfeito",
      "Tecido respirável que mantém a cabeça fresca",
      "Aba estruturada com proteção solar eficaz",
      "Preto clássico — combina com qualquer visual",
    ],
    specifications: {
      marca: "Lacoste",
      modelo: "Sport",
      categoria: "Bonés",
      uso: "Casual / Esporte",
    },
  }),
  "bone-2": product({
    id: "bone-2",
    isActive: false,
    name: "Boné Lacoste Sport Branco",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport branco com logo bordado. Perfeito para dias ensolarados.",
    highlights: [
      "Logo Lacoste bordado em destaque no branco imaculado",
      "Fecho ajustável para personalização do tamanho",
      "Tecido respirável ideal para dias quentes",
      "Aba firme para proteção solar",
      "Visual clean e sofisticado",
    ],
    specifications: {
      marca: "Lacoste",
      modelo: "Sport",
      categoria: "Bonés",
      uso: "Casual / Verão",
    },
  }),
  "bone-3": product({
    id: "bone-3",
    isActive: false,
    name: "Boné Lacoste Dry Fit",
    price: 379.9,
    category: "Bonés Lacoste",
    description:
      "Boné Lacoste com tecnologia Dry Fit. Mantém você fresco durante atividades físicas.",
    highlights: [
      "Tecnologia Dry Fit que afasta o suor da pele",
      "Tecido de secagem rápida para conforto em atividades intensas",
      "Fecho ajustável para melhor performance",
      "Aba estruturada sem comprometer a mobilidade",
      "Ideal para treinos, corridas e atividades ao ar livre",
    ],
    specifications: {
      marca: "Lacoste",
      modelo: "Dry Fit",
      categoria: "Bonés",
      uso: "Esporte / Atividade física",
    },
  }),
  "bone-4": product({
    id: "bone-4",
    isActive: false,
    name: "Boné Lacoste Classic Navy",
    price: 329.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Classic na cor navy. Estilo atemporal com qualidade premium.",
    highlights: [
      "Cor navy atemporal que combina com qualquer estilo",
      "Bordado refinado do icônico logo Lacoste",
      "Fecho ajustável para conforto personalizado",
      "Aba estruturada com acabamento cuidadoso",
      "Design clássico que nunca sai de moda",
    ],
    specifications: {
      marca: "Lacoste",
      modelo: "Classic",
      categoria: "Bonés",
      uso: "Casual / Urbano",
    },
  }),
  "bone-5": product({
    id: "bone-5",
    isActive: false,
    name: "Boné Lacoste Verde",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport verde. Cor vibrante com o estilo clássico da marca.",
    highlights: [
      "Verde vibrante para quem gosta de se destacar",
      "Logo Lacoste bordado com alta definição",
      "Tecido respirável para uso confortável no calor",
      "Fecho ajustável de fácil regulagem",
      "Estilo Lacoste inconfundível em cor marcante",
    ],
    specifications: {
      marca: "Lacoste",
      modelo: "Sport",
      categoria: "Bonés",
      uso: "Casual / Esporte",
    },
  }),
  "bone-6": product({
    id: "bone-6",
    isActive: false,
    name: "Boné Lacoste Vermelho",
    price: 349.9,
    category: "Bonés Lacoste",
    description: "Boné Lacoste Sport vermelho. Destaque-se com estilo e qualidade.",
    highlights: [
      "Vermelho intenso para um visual marcante e confiante",
      "Logo Lacoste bordado com acabamento premium",
      "Fecho ajustável para maior versatilidade de uso",
      "Tecido respirável para dias quentes",
      "Para quem não passa despercebido",
    ],
    specifications: {
      marca: "Lacoste",
      modelo: "Sport",
      categoria: "Bonés",
      uso: "Casual / Esporte",
    },
  }),
  // ─── Boné Nike Club ──────────────────────────────────────────────────────────
  "bone-nike-club": product({
    id: "bone-nike-club",
    name: "Boné Nike Club",
    price: 180,
    badge: "Novo",
    category: "Bonés Lacoste",
    image: "/products/bones/bone-nike-club/branco/principal.avif",
    images: [
      "/products/bones/bone-nike-club/branco/principal.avif",
      "/products/bones/bone-nike-club/branco/costas.avif",
    ],
    colorImages: {
      "Branco": [
        "/products/bones/bone-nike-club/branco/principal.avif",
        "/products/bones/bone-nike-club/branco/costas.avif",
      ],
      "Cinza": [
        "/products/bones/bone-nike-club/cinza/principal.avif",
        "/products/bones/bone-nike-club/cinza/costas.avif",
      ],
      "Preto": [
        "/products/bones/bone-nike-club/preto/principal.avif",
        "/products/bones/bone-nike-club/preto/costas.avif",
      ],
    },
    description:
      "O Boné Nike Club combina estilo, versatilidade e conforto em uma peça essencial para o dia a dia. Seu visual minimalista e atemporal permite composições casuais e esportivas, tornando-se uma escolha prática para diferentes ocasiões. Ideal para quem busca um acessório versátil, com identidade marcante e acabamento cuidadosamente selecionado.",
    highlights: [
      "Visual clássico e versátil",
      "Modelo Nike Club",
      "Ajuste confortável",
      "Ideal para uso diário",
      "Combina com diferentes estilos",
      "Acabamento selecionado",
    ],
    specifications: {
      marca: "Nike Club",
      modelo: "Club",
      categoria: "Boné",
      uso: "Casual",
    },
    variants: {
      sizes: ["Único"],
      colors: [
        { name: "Branco", hex: "#F5F5F5" },
        { name: "Cinza", hex: "#9CA3AF" },
        { name: "Preto", hex: "#1a1a1a" },
      ],
    },
  }),
  "time-1": product({
    id: "time-1",
    isActive: false,
    name: "Camisa Flamengo 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Flamengo 2024. Rubro-negro de coração, qualidade de torcedor.",
    highlights: [
      "Representa o maior time do Brasil com orgulho",
      "Tecido leve e confortável para uso diário",
      "Listras rubro-negras com cores vibrantes e duradouras",
      "Estampa e detalhes de alta qualidade",
      "Modelagem regular para diferentes biotipos",
    ],
    specifications: {
      marca: "Flamengo",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "time-2": product({
    id: "time-2",
    isActive: false,
    name: "Camisa Corinthians 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Corinthians 2024. Fiel até o fim, qualidade premium.",
    highlights: [
      "Veste a camisa do Timão com orgulho e qualidade",
      "Listras verticais preto e branco inconfundíveis",
      "Tecido leve e respirável para uso prolongado",
      "Acabamento e detalhes de alta qualidade",
      "Para o fiel que não abre mão do estilo",
    ],
    specifications: {
      marca: "Corinthians",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "time-3": product({
    id: "time-3",
    isActive: false,
    name: "Camisa Palmeiras 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Palmeiras 2024. Verdão com qualidade e estilo.",
    highlights: [
      "Verde Palmeiras em tom vibrante e duradouro",
      "Tecido confortável para o dia a dia do torcedor",
      "Detalhes e estampas de alta qualidade",
      "Modelagem regular que veste bem em diferentes tamanhos",
      "Representa um dos clubes mais vitoriosos do Brasil",
    ],
    specifications: {
      marca: "Palmeiras",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "time-4": product({
    id: "time-4",
    isActive: false,
    name: "Camisa São Paulo 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do São Paulo 2024. Tricolor paulista com qualidade premium.",
    highlights: [
      "Tricolor clássico — branco com listras vermelha e preta",
      "Tecido de qualidade para uso confortável",
      "Acabamento apurado que honra a tradição do clube",
      "Modelagem regular para ampla faixa de tamanhos",
      "Para o torcedor que valoriza identidade e estilo",
    ],
    specifications: {
      marca: "São Paulo FC",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "time-5": product({
    id: "time-5",
    isActive: false,
    name: "Camisa Santos 2024",
    price: 269.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Santos 2024. Peixe com estilo e tradição.",
    highlights: [
      "Branco clássico e puro que define o Santos FC",
      "Tecido leve e confortável para o dia a dia",
      "Acabamento de qualidade que resiste a lavagens",
      "Modelagem regular com bom caimento",
      "Homenagem à tradição e história do Peixe",
    ],
    specifications: {
      marca: "Santos FC",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "time-6": product({
    id: "time-6",
    isActive: false,
    name: "Camisa Vasco 2024",
    price: 269.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Vasco 2024. Gigante da colina com qualidade premium.",
    highlights: [
      "Cruz de Malta inconfundível — símbolo do Gigante da Colina",
      "Tecido confortável e de boa respirabilidade",
      "Estampa e detalhes de alta definição",
      "Modelagem regular para diferentes estilos",
      "Para o vascaíno que carrega o clube no coração",
    ],
    specifications: {
      marca: "Vasco da Gama",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "time-7": product({
    id: "time-7",
    isActive: false,
    name: "Camisa Grêmio 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Grêmio 2024. Imortal tricolor com estilo gaúcho.",
    highlights: [
      "Tricolor gaúcho — azul, preto e branco inconfundíveis",
      "Tecido respirável para o torcedor de todas as estações",
      "Acabamento apurado que representa a grandeza do clube",
      "Modelagem regular com bom caimento",
      "Para o gremista que leva o escudo com orgulho",
    ],
    specifications: {
      marca: "Grêmio FBPA",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "time-8": product({
    id: "time-8",
    isActive: false,
    name: "Camisa Internacional 2024",
    price: 279.9,
    category: "Camisas de Time",
    description: "Camisa oficial do Internacional 2024. Colorado de coração, qualidade premium.",
    highlights: [
      "Vermelho Colorado que representa paixão e bravura",
      "Tecido de qualidade para uso no dia a dia",
      "Detalhes e estampas com acabamento premium",
      "Modelagem regular para diferentes biotipos",
      "Para o colorado que ostenta o escudo com orgulho",
    ],
    specifications: {
      marca: "Sport Club Internacional",
      modelo: "Temporada 2024",
      categoria: "Camisas de Time",
      uso: "Torcida / Casual",
    },
  }),
  "brasil-1": product({
    id: "brasil-1",
    isActive: false,
    name: "Camisa Brasil Oficial Home",
    price: 299.9,
    badge: "Destaque",
    category: "Seleção Brasileira",
    description:
      "Camisa oficial da Seleção Brasileira modelo Home. Amarelo canarinho com qualidade premium.",
    highlights: [
      "Amarelo canarinho — a cor mais conhecida do futebol mundial",
      "Tecido leve e confortável para uso diário e nas torcidas",
      "Modelagem regular que valoriza o visual",
      "Acabamento premium à altura da maior seleção do mundo",
      "Representa o Brasil em cada detalhe",
    ],
    specifications: {
      marca: "CBF",
      modelo: "Home 2024",
      categoria: "Seleção Brasileira",
      uso: "Torcida / Casual",
    },
  }),
  "brasil-2": product({
    id: "brasil-2",
    isActive: false,
    name: "Camisa Brasil Oficial Away",
    price: 299.9,
    category: "Seleção Brasileira",
    description:
      "Camisa oficial da Seleção Brasileira modelo Away. Azul elegante com detalhes premium.",
    highlights: [
      "Azul canarinho elegante — segundo uniforme da Seleção",
      "Detalhes em verde e amarelo que reforçam a identidade nacional",
      "Tecido leve e de boa respirabilidade",
      "Modelagem regular para diferentes biotipos",
      "Para o torcedor que valoriza todos os uniformes do Brasil",
    ],
    specifications: {
      marca: "CBF",
      modelo: "Away 2024",
      categoria: "Seleção Brasileira",
      uso: "Torcida / Casual",
    },
  }),
  "brasil-3": product({
    id: "brasil-3",
    isActive: false,
    name: "Camisa Brasil Treino",
    price: 249.9,
    category: "Seleção Brasileira",
    description: "Camisa de treino da Seleção Brasileira. Conforto e estilo para torcer.",
    highlights: [
      "Desenvolvida para máximo conforto em uso cotidiano",
      "Tecido respirável que acompanha qualquer atividade",
      "Design mais casual e despojado que o uniforme oficial",
      "Cores vibrantes com elementos da Seleção",
      "Ótima opção para o dia a dia do torcedor",
    ],
    specifications: {
      marca: "CBF",
      modelo: "Treino 2024",
      categoria: "Seleção Brasileira",
      uso: "Treino / Casual",
    },
  }),
  "brasil-4": product({
    id: "brasil-4",
    isActive: false,
    name: "Camisa Brasil Retrô 1970",
    price: 349.9,
    badge: "Coleção",
    category: "Seleção Brasileira",
    description:
      "Camisa retrô da Seleção Brasileira 1970. O time mais bonito da história do futebol.",
    highlights: [
      "Peça colecionável que homenageia o Brasil de 1970",
      "Pelé, Tostão, Rivelino — a geração de ouro do futebol mundial",
      "Design fiel ao uniforme histórico da Copa do Mundo de 1970",
      "Acabamento premium em estilo retrô",
      "Presente perfeito para quem ama a história do futebol brasileiro",
    ],
    specifications: {
      marca: "CBF",
      modelo: "Retrô 1970",
      categoria: "Seleção Brasileira",
      uso: "Coleção / Casual",
    },
  }),
  "brasil-5": product({
    id: "brasil-5",
    isActive: false,
    name: "Camisa Brasil Retrô 1994",
    price: 349.9,
    category: "Seleção Brasileira",
    description: "Camisa retrô da Seleção Brasileira 1994. O tetra que marcou gerações.",
    highlights: [
      "Homenagem ao Tetra Campeonato do Brasil nos EUA em 1994",
      "Romário, Bebeto, Mazinho — a geração que fez o Brasil sonhar",
      "Design fiel ao uniforme icônico da Copa de 1994",
      "Acabamento premium em estilo retrô autêntico",
      "Peça colecionável de alto valor sentimental",
    ],
    specifications: {
      marca: "CBF",
      modelo: "Retrô 1994",
      categoria: "Seleção Brasileira",
      uso: "Coleção / Casual",
    },
  }),
  "brasil-6": product({
    id: "brasil-6",
    isActive: false,
    name: "Camisa Brasil Retrô 2002",
    price: 349.9,
    category: "Seleção Brasileira",
    description:
      "Camisa retrô da Seleção Brasileira 2002. O penta com Ronaldo, Ronaldinho e companhia.",
    highlights: [
      "Celebra o Penta Campeonato do Mundo conquistado no Japão e Coreia",
      "Ronaldo Fenômeno, Ronaldinho, Rivaldo — a geração pentacampeã",
      "Design fiel ao uniforme que entrou para a história do futebol",
      "Acabamento retrô premium com detalhes autênticos",
      "A camisa de uma geração que jamais será esquecida",
    ],
    specifications: {
      marca: "CBF",
      modelo: "Retrô 2002",
      categoria: "Seleção Brasileira",
      uso: "Coleção / Casual",
    },
  }),
  // ─── Camisa Seleção Amarela Jogador ──────────────────────────────────────────
  "camisa-selecao-amarela-jogador": product({
    id: "camisa-selecao-amarela-jogador",
    name: "Camisa Seleção Brasileira Amarela Jogador",
    price: 299.9,
    badge: "Novo",
    category: "Seleção Brasileira",
    image: "/products/selecao-brasileira/camisa-selecao-amarela-jogador/principal.jpeg",
    images: [
      "/products/selecao-brasileira/camisa-selecao-amarela-jogador/principal.jpeg",
      "/products/selecao-brasileira/camisa-selecao-amarela-jogador/escudo.jpeg",
      "/products/selecao-brasileira/camisa-selecao-amarela-jogador/aerofit.jpeg",
      "/products/selecao-brasileira/camisa-selecao-amarela-jogador/patrocinio.jpeg",
    ],
    description:
      "A camisa amarela da Seleção Brasileira no estilo jogador — o visual clássico que representa décadas de história e o orgulho de um país inteiro. Feita para quem quer torcer com identidade ou incorporar o estilo esportivo brasileiro no dia a dia.",
    highlights: [
      "Visual clássico da Seleção Brasileira — amarelo canarinho inconfundível",
      "Modelagem estilo jogador para um caimento mais próximo do corpo",
      "Ideal para torcer e usar no dia a dia com estilo",
      "Acabamento selecionado com atenção aos detalhes",
      "Peça versátil para composições casuais e esportivas",
    ],
    specifications: {
      marca: "Seleção Brasileira",
      modelo: "Amarela Jogador",
      categoria: "Camisa de Seleção",
      uso: "Casual / Torcida",
    },
    variants: {
      sizes: ["P", "M", "G", "GG", "XG"],
      colors: [
        { name: "Amarelo", hex: "#FFD700" },
        { name: "Verde", hex: "#009C3B" },
      ],
    },
  }),
}

/** Lista de produtos ativos (sem duplicar nomes na busca) */
const catalogList = Object.values(storeProducts).filter((p) => p.isActive !== false)

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
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

/** Conta produtos ativos de uma categoria */
export function getProductCountByCategory(category: string): number {
  return Object.values(storeProducts).filter(
    (p) => p.category === category && p.isActive !== false
  ).length
}

/** Gera ID único da linha no carrinho (produto + especificações) */
export function buildCartLineId(productId: string, size: string, color: string) {
  return `${productId}::${size}::${color}`
}
