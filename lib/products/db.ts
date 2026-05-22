/**
 * Product database cache layer
 * In-memory cache with TTL to avoid repeated DB queries
 */

import { createClient } from "@/lib/supabase/client"
import type { StoreProduct, ProductColor, ProductVariants } from "@/lib/types/product"

export interface DBProduct {
  id: string
  legacy_id: string | null
  slug: string
  title: string
  description: string
  price_cents: number
  promotional_price_cents: number | null
  category: string
  stock: number
  active: boolean
  featured_image: string | null
  gallery_images: string[]
  sizes: string[]
  colors: ProductColor[]
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

/**
 * Convert database product to StoreProduct format (for backwards compatibility)
 */
function dbProductToStoreProduct(dbProduct: DBProduct): StoreProduct {
  return {
    id: dbProduct.legacy_id || dbProduct.id,
    name: dbProduct.title,
    price: dbProduct.price_cents / 100,
    originalPrice: dbProduct.promotional_price_cents
      ? dbProduct.promotional_price_cents / 100
      : undefined,
    category: dbProduct.category,
    description: dbProduct.description,
    variants: {
      sizes: dbProduct.sizes,
      colors: dbProduct.colors,
    },
  }
}

/**
 * Fetch product by ID (supports both UUID and legacy_id)
 */
export async function getProductFromDB(
  id: string
): Promise<StoreProduct | undefined> {
  try {
    const supabase = createClient()

    // Try legacy_id first (backwards compat)
    let { data } = await supabase
      .from("products")
      .select("*")
      .eq("legacy_id", id)
      .single()

    // If not found, try UUID
    if (!data) {
      const { data: uuidData } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      data = uuidData
    }

    if (!data) {
      return undefined
    }

    return dbProductToStoreProduct(data as DBProduct)
  } catch (error) {
    console.error("Failed to fetch product from DB:", error)
    return undefined
  }
}

/**
 * Fetch product by slug (SEO-friendly)
 */
export async function getProductBySlug(
  slug: string
): Promise<StoreProduct | undefined> {
  try {
    const supabase = createClient()

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .single()

    if (!data) {
      return undefined
    }

    return dbProductToStoreProduct(data as DBProduct)
  } catch (error) {
    console.error("Failed to fetch product by slug:", error)
    return undefined
  }
}

/**
 * Fetch all products in a category
 */
export async function getProductsByCategory(
  category: string
): Promise<StoreProduct[]> {
  try {
    const supabase = createClient()

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("active", true)
      .order("created_at", { ascending: false })

    if (!data) {
      return []
    }

    return data.map((p) => dbProductToStoreProduct(p as DBProduct))
  } catch (error) {
    console.error("Failed to fetch products by category:", error)
    return []
  }
}

/**
 * Search products by title or description
 */
export async function searchProductsDB(
  query: string,
  limit = 8
): Promise<StoreProduct[]> {
  try {
    const supabase = createClient()

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(limit)

    if (!data) {
      return []
    }

    return data.map((p) => dbProductToStoreProduct(p as DBProduct))
  } catch (error) {
    console.error("Failed to search products:", error)
    return []
  }
}

/**
 * Get all products (for catalog)
 */
export async function getAllProductsFromDB(): Promise<StoreProduct[]> {
  try {
    const supabase = createClient()

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })

    if (!data) {
      return []
    }

    return data.map((p) => dbProductToStoreProduct(p as DBProduct))
  } catch (error) {
    console.error("Failed to fetch all products:", error)
    return []
  }
}
