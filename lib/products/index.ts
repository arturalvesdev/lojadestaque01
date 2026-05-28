/**
 * Ponto de entrada do módulo de produtos.
 * Importe sempre daqui: import { getProductById } from "@/lib/products"
 *
 * SYNC (catalog-backed) — fonte primária atual, sempre disponível:
 *   getProductById, searchProducts
 *
 * ASYNC (DB-backed) — preservado para uso futuro com Supabase:
 *   getProductByIdDB, searchProductsDB, getProductBySlug,
 *   getAllProducts, getProductsByCategory
 */

// ─── SYNC API — catalog estático (fonte primária) ───────────────────────────
// Estas são as versões síncronas usadas por pages, components e cart.
// Não requerem await. Funcionam em client e server sem depender do banco.
export {
  getProductById,
  searchProducts,
  buildCartLineId,
  getProductCountByCategory,
} from "@/lib/products/catalog"

// ─── ASYNC API — DB-backed (para uso futuro quando Supabase estiver pronto) ──
// Exportados com sufixo DB para evitar colisão de nomes.
// Não use estes em componentes React ou funções síncronas.
export {
  getProductById as getProductByIdDB,
  searchProducts as searchProductsDB,
  getProductBySlug,
  getAllProducts,
  getProductsByCategory,
} from "@/lib/products/cache"

// ─── CACHE INVALIDATION (admin features) ─────────────────────────────────────
export {
  invalidateProductCache,
  invalidateProductCacheById,
  invalidateCategoryCacheByName,
} from "@/lib/products/cache"

// ─── UTILITIES ────────────────────────────────────────────────────────────────
export { getDefaultVariantsByCategory } from "@/lib/products/variants"

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type { StoreProduct, ProductVariants, ProductColor } from "@/lib/types/product"
