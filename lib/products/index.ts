/**
 * Ponto de entrada do módulo de produtos.
 * Importe sempre daqui: import { getProductById } from "@/lib/products"
 */

// Export cached product functions (DB-backed)
export {
  getProductById,
  getProductBySlug,
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from "@/lib/products/cache"

// Export cache invalidation (for future admin features)
export {
  invalidateProductCache,
  invalidateProductCacheById,
  invalidateCategoryCacheByName,
} from "@/lib/products/cache"

// Export from catalog for backwards compatibility
export { buildCartLineId } from "@/lib/products/catalog"

export { getDefaultVariantsByCategory } from "@/lib/products/variants"

export type { StoreProduct, ProductVariants, ProductColor } from "@/lib/types/product"
