/**
 * Cart persistence layer
 * Handles saving/loading carts from Supabase and localStorage.
 */

import { createClient } from "@/lib/supabase/client"
import { getGuestIdSync } from "@/lib/auth/guest-session"
import type { CartItem } from "@/lib/types/cart"

export interface StoredCart {
  id: string
  items: CartItem[]
  subtotalCents: number
  itemCount: number
}

/**
 * Get or create a guest cart in Supabase
 */
export async function getOrCreateGuestCart(
  guestSessionId: string
): Promise<StoredCart | null> {
  try {
    const supabase = createClient()

    // Find guest_sessions.id by guest_id
    const { data: sessionData } = await supabase
      .from("guest_sessions")
      .select("id")
      .eq("guest_id", guestSessionId)
      .single()

    if (!sessionData) {
      return null
    }

    // Find or create cart for this guest session
    let { data: cartData } = await supabase
      .from("carts")
      .select("id, subtotal_cents, item_count")
      .eq("guest_session_id", sessionData.id)
      .eq("status", "active")
      .single()

    if (!cartData) {
      // Create new cart
      const { data: newCart } = await supabase
        .from("carts")
        .insert({
          guest_session_id: sessionData.id,
          status: "active",
          subtotal_cents: 0,
          item_count: 0,
        })
        .select("id, subtotal_cents, item_count")
        .single()

      cartData = newCart
    }

    if (!cartData) {
      return null
    }

    // Load cart items
    const { data: items } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", cartData.id)

    return {
      id: cartData.id,
      items: (items || []).map((item) => ({
        cartLineId: `${item.product_id}_${item.size}_${item.color}`,
        productId: item.product_id,
        name: item.name,
        price: item.price_cents / 100,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        category: "", // Will be filled by cart context
      })),
      subtotalCents: cartData.subtotal_cents,
      itemCount: cartData.item_count,
    }
  } catch (error) {
    console.error("Failed to get/create guest cart:", error)
    return null
  }
}

/**
 * Get authenticated user's active cart
 */
export async function getUserCart(userId: string): Promise<StoredCart | null> {
  try {
    const supabase = createClient()

    // Find or create cart for this user
    let { data: cartData } = await supabase
      .from("carts")
      .select("id, subtotal_cents, item_count")
      .eq("user_id", userId)
      .eq("status", "active")
      .single()

    if (!cartData) {
      // Create new cart
      const { data: newCart } = await supabase
        .from("carts")
        .insert({
          user_id: userId,
          status: "active",
          subtotal_cents: 0,
          item_count: 0,
        })
        .select("id, subtotal_cents, item_count")
        .single()

      cartData = newCart
    }

    if (!cartData) {
      return null
    }

    // Load cart items
    const { data: items } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", cartData.id)

    return {
      id: cartData.id,
      items: (items || []).map((item) => ({
        cartLineId: `${item.product_id}_${item.size}_${item.color}`,
        productId: item.product_id,
        name: item.name,
        price: item.price_cents / 100,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        category: "", // Will be filled by cart context
      })),
      subtotalCents: cartData.subtotal_cents,
      itemCount: cartData.item_count,
    }
  } catch (error) {
    console.error("Failed to get/create user cart:", error)
    return null
  }
}

/**
 * Add item to cart
 */
export async function addCartItem(
  cartId: string,
  item: CartItem
): Promise<boolean> {
  try {
    const supabase = createClient()

    // Check if item already exists (same product, size, color)
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("cart_id", cartId)
      .eq("product_id", item.productId)
      .eq("size", item.size)
      .eq("color", item.color)
      .single()

    if (existing) {
      // Update quantity
      await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + item.quantity })
        .eq("id", existing.id)
    } else {
      // Insert new item
      await supabase.from("cart_items").insert({
        cart_id: cartId,
        product_id: item.productId,
        name: item.name,
        price_cents: Math.round(item.price * 100),
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })
    }

    // Update cart totals
    await updateCartTotals(cartId)

    return true
  } catch (error) {
    console.error("Failed to add cart item:", error)
    return false
  }
}

/**
 * Update item quantity
 */
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<boolean> {
  try {
    const supabase = createClient()

    if (quantity <= 0) {
      // Delete item if quantity is 0 or negative
      await supabase.from("cart_items").delete().eq("id", itemId)
    } else {
      // Update quantity
      await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId)
    }

    return true
  } catch (error) {
    console.error("Failed to update cart item quantity:", error)
    return false
  }
}

/**
 * Remove item from cart
 */
export async function removeCartItem(itemId: string): Promise<boolean> {
  try {
    const supabase = createClient()
    await supabase.from("cart_items").delete().eq("id", itemId)
    return true
  } catch (error) {
    console.error("Failed to remove cart item:", error)
    return false
  }
}

/**
 * Clear all items from cart
 */
export async function clearCart(cartId: string): Promise<boolean> {
  try {
    const supabase = createClient()
    await supabase.from("cart_items").delete().eq("cart_id", cartId)
    await updateCartTotals(cartId)
    return true
  } catch (error) {
    console.error("Failed to clear cart:", error)
    return false
  }
}

/**
 * Update cart totals (subtotal, item_count)
 */
export async function updateCartTotals(cartId: string): Promise<void> {
  try {
    const supabase = createClient()

    // Get all items in cart
    const { data: items } = await supabase
      .from("cart_items")
      .select("price_cents, quantity")
      .eq("cart_id", cartId)

    if (!items) {
      return
    }

    // Calculate totals
    const subtotalCents = items.reduce(
      (sum, item) => sum + item.price_cents * item.quantity,
      0
    )
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    // Update cart
    await supabase
      .from("carts")
      .update({ subtotal_cents: subtotalCents, item_count: itemCount })
      .eq("id", cartId)
  } catch (error) {
    console.error("Failed to update cart totals:", error)
  }
}

/**
 * Merge guest cart into user cart
 * Called when a guest logs in/registers
 */
export async function mergeGuestCartToUser(
  guestSessionId: string,
  userId: string
): Promise<boolean> {
  try {
    const supabase = createClient()

    // Find guest_sessions.id by guest_id
    const { data: sessionData } = await supabase
      .from("guest_sessions")
      .select("id")
      .eq("guest_id", guestSessionId)
      .single()

    if (!sessionData) {
      return false
    }

    // Find guest's cart
    const { data: guestCart } = await supabase
      .from("carts")
      .select("id")
      .eq("guest_session_id", sessionData.id)
      .eq("status", "active")
      .single()

    if (!guestCart) {
      // No guest cart to merge
      return true
    }

    // Get guest's items
    const { data: guestItems } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_id", guestCart.id)

    if (!guestItems || guestItems.length === 0) {
      // No items to merge
      return true
    }

    // Find or create user's cart
    let { data: userCart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "active")
      .single()

    if (!userCart) {
      // Create user's cart
      const { data: newUserCart } = await supabase
        .from("carts")
        .insert({
          user_id: userId,
          status: "active",
          subtotal_cents: 0,
          item_count: 0,
        })
        .select("id")
        .single()

      userCart = newUserCart
    }

    if (!userCart) {
      return false
    }

    // Merge items: copy guest items to user cart
    for (const guestItem of guestItems) {
      // Check if user already has this item
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("cart_id", userCart.id)
        .eq("product_id", guestItem.product_id)
        .eq("size", guestItem.size)
        .eq("color", guestItem.color)
        .single()

      if (existingItem) {
        // Update quantity (add guest quantity to user quantity)
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + guestItem.quantity })
          .eq("id", existingItem.id)
      } else {
        // Insert guest item into user cart
        await supabase.from("cart_items").insert({
          cart_id: userCart.id,
          product_id: guestItem.product_id,
          name: guestItem.name,
          price_cents: guestItem.price_cents,
          quantity: guestItem.quantity,
          size: guestItem.size,
          color: guestItem.color,
        })
      }
    }

    // Update user's cart totals
    await updateCartTotals(userCart.id)

    // Mark guest cart as merged
    await supabase
      .from("carts")
      .update({ status: "merged" })
      .eq("id", guestCart.id)

    return true
  } catch (error) {
    console.error("Failed to merge guest cart:", error)
    return false
  }
}
