/**
 * Product cache layer
 * In-memory cache with TTL to minimize database queries
 */

import type { StoreProduct } from "@/lib/types/product"
import {
  getProductFromDB,
  getProductBySlug as getProductBySlugDB,
  getProductsByCategory as getProductsByCategoryDB,
  searchProductsDB,
  getAllProductsFromDB,
} from "@/lib/products/db"

const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

interface CacheEntry<T> {
  value: T
  timestamp: number
}

interface Cache {
  byId: Map<string, CacheEntry<StoreProduct | undefined>>
  bySlug: Map<string, CacheEntry<StoreProduct | undefined>>
  byCategory: Map<string, CacheEntry<StoreProduct[]>>
  all: CacheEntry<StoreProduct[]> | null
}

const cache: Cache = {
  byId: new Map(),
  bySlug: new Map(),
  byCategory: new Map(),
  all: null,
}

function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL_MS
}

function getCacheOrNull<T>(
  cacheEntry: CacheEntry<T> | undefined
): T | null {
  if (!cacheEntry) return null
  if (!isCacheValid(cacheEntry.timestamp)) return null
  return cacheEntry.value
}

/**
 * Get product by ID with caching
 */
export async function getProductById(id: string): Promise<StoreProduct | undefined> {
  // Check cache first
  const cached = getCacheOrNull(cache.byId.get(id))
  if (cached !== null) {
    return cached
  }

  // Fetch from DB
  const product = await getProductFromDB(id)

  // Store in cache
  cache.byId.set(id, {
    value: product,
    timestamp: Date.now(),
  })

  return product
}

/**
 * Get product by slug with caching
 */
export async function getProductBySlug(slug: string): Promise<StoreProduct | undefined> {
  // Check cache first
  const cached = getCacheOrNull(cache.bySlug.get(slug))
  if (cached !== null) {
    return cached
  }

  // Fetch from DB
  const product = await getProductBySlugDB(slug)

  // Store in cache
  cache.bySlug.set(slug, {
    value: product,
    timestamp: Date.now(),
  })

  return product
}

/**
 * Get all products with caching
 */
export async function getAllProducts(): Promise<StoreProduct[]> {
  // Check cache first
  if (cache.all && isCacheValid(cache.all.timestamp)) {
    return cache.all.value
  }

  // Fetch from DB
  const products = await getAllProductsFromDB()

  // Store in cache
  cache.all = {
    value: products,
    timestamp: Date.now(),
  }

  return products
}

/**
 * Get products by category with caching
 */
export async function getProductsByCategory(
  category: string
): Promise<StoreProduct[]> {
  // Check cache first
  const cached = getCacheOrNull(cache.byCategory.get(category))
  if (cached !== null) {
    return cached
  }

  // Fetch from DB
  const products = await getProductsByCategoryDB(category)

  // Store in cache
  cache.byCategory.set(category, {
    value: products,
    timestamp: Date.now(),
  })

  return products
}

/**
 * Search products with caching (keyed by query)
 */
export async function searchProducts(
  query: string,
  limit = 8
): Promise<StoreProduct[]> {
  // Search results are not cached (query-specific)
  return searchProductsDB(query, limit)
}

/**
 * Invalidate cache (called when products are updated)
 */
export function invalidateProductCache(): void {
  cache.byId.clear()
  cache.bySlug.clear()
  cache.byCategory.clear()
  cache.all = null
}

/**
 * Invalidate specific product from cache
 */
export function invalidateProductCacheById(id: string): void {
  cache.byId.delete(id)
  // Also invalidate all products cache since it might be affected
  cache.all = null
}

/**
 * Invalidate category cache
 */
export function invalidateCategoryCacheByName(category: string): void {
  cache.byCategory.delete(category)
  // Also invalidate all products cache
  cache.all = null
}
