/**
 * Cart persistence layer
 * Handles saving/loading carts through a secure server API and localStorage fallback.
 */

import { getProductById } from "@/lib/products"
import type { CartItem } from "@/lib/types/cart"

export interface StoredCart {
  id: string
  items: CartItem[]
  subtotalCents: number
  itemCount: number
}

type CartOwner =
  | { type: "guest"; id: string }
  | { type: "user"; id: string }

const LOCAL_CART_PREFIX = "destaquepremium_local_cart"
const API_CART_ROUTE = "/api/cart"

function getLocalStorageKey(owner: CartOwner) {
  return `${LOCAL_CART_PREFIX}:${owner.type}:${owner.id}`
}

function parseLocalCartId(cartId: string): CartOwner | null {
  if (cartId.startsWith("guest:")) {
    return { type: "guest", id: cartId.replace("guest:", "") }
  }
  if (cartId.startsWith("user:")) {
    return { type: "user", id: cartId.replace("user:", "") }
  }
  return null
}

function readLocalCart(owner: CartOwner): StoredCart | null {
  if (typeof window === "undefined") return null
  try {
    const value = localStorage.getItem(getLocalStorageKey(owner))
    return value ? (JSON.parse(value) as StoredCart) : null
  } catch {
    return null
  }
}

function writeLocalCart(owner: CartOwner, cart: StoredCart) {
  if (typeof window === "undefined") return
  localStorage.setItem(getLocalStorageKey(owner), JSON.stringify(cart))
}

function buildLocalCart(owner: CartOwner): StoredCart {
  const cart: StoredCart = {
    id: `${owner.type}:${owner.id}`,
    items: [],
    subtotalCents: 0,
    itemCount: 0,
  }
  writeLocalCart(owner, cart)
  return cart
}

function updateLocalCartTotals(cart: StoredCart): StoredCart {
  const subtotalCents = cart.items.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0
  )
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  return { ...cart, subtotalCents, itemCount }
}

function enrichCategory(item: CartItem): CartItem {
  if (item.category) return item
  const product = getProductById(item.productId)
  return {
    ...item,
    category: product?.category ?? "",
  }
}

function normalizeLocalCartItems(items: CartItem[]): CartItem[] {
  return items.map(enrichCategory)
}

async function requestCartApi<T>(path: string, init: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      credentials: "include",
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  }
}

async function fetchCartFromApi(): Promise<StoredCart | null> {
  return requestCartApi<StoredCart>(API_CART_ROUTE, {
    method: "GET",
  })
}

async function postCartAction<T>(body: unknown): Promise<T | null> {
  return requestCartApi<T>(API_CART_ROUTE, {
    method: "POST",
    body: JSON.stringify(body),
  })
}

async function patchCartAction<T>(body: unknown): Promise<T | null> {
  return requestCartApi<T>(API_CART_ROUTE, {
    method: "PATCH",
    body: JSON.stringify(body),
  })
}

async function deleteCartAction<T>(body: unknown): Promise<T | null> {
  return requestCartApi<T>(API_CART_ROUTE, {
    method: "DELETE",
    body: JSON.stringify(body),
  })
}

function getOrCreateLocalCart(owner: CartOwner): StoredCart {
  const existing = readLocalCart(owner)
  return existing ?? buildLocalCart(owner)
}

export async function getOrCreateGuestCart(
  guestSessionId: string
): Promise<StoredCart | null> {
  const owner: CartOwner = {
    type: "guest",
    id: guestSessionId || "fallback",
  }

  const cart = await fetchCartFromApi()
  if (cart) {
    return cart
  }

  return getOrCreateLocalCart(owner)
}

export async function getUserCart(userId: string): Promise<StoredCart | null> {
  const owner: CartOwner = { type: "user", id: userId }
  const cart = await fetchCartFromApi()
  if (cart) {
    return cart
  }
  return getOrCreateLocalCart(owner)
}

function getLocalCartOwner(cartId: string): CartOwner | null {
  return parseLocalCartId(cartId)
}

export async function addCartItem(
  cartId: string,
  item: CartItem
): Promise<boolean> {
  const localOwner = getLocalCartOwner(cartId)
  if (localOwner) {
    const cart = readLocalCart(localOwner) ?? buildLocalCart(localOwner)
    const existing = cart.items.find(
      (stored) =>
        stored.productId === item.productId &&
        stored.size === item.size &&
        stored.color === item.color
    )

    if (existing) {
      existing.quantity += item.quantity
    } else {
      cart.items.push({ ...item })
    }

    writeLocalCart(localOwner, updateLocalCartTotals(cart))
    return true
  }

  const response = await postCartAction<StoredCart>({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  })

  return response !== null
}

export async function updateCartItemQuantity(
  cartId: string,
  item: CartItem,
  quantity: number
): Promise<boolean> {
  const localOwner = getLocalCartOwner(cartId)
  if (localOwner) {
    const cart = readLocalCart(localOwner)
    if (!cart) return false

    const found = cart.items.find(
      (stored) =>
        stored.productId === item.productId &&
        stored.size === item.size &&
        stored.color === item.color
    )

    if (!found) return false

    if (quantity <= 0) {
      cart.items = cart.items.filter((stored) => stored !== found)
    } else {
      found.quantity = quantity
    }

    writeLocalCart(localOwner, updateLocalCartTotals(cart))
    return true
  }

  const response = await patchCartAction<StoredCart>({
    productId: item.productId,
    size: item.size,
    color: item.color,
    quantity,
  })

  return response !== null
}

export async function removeCartItem(
  cartId: string,
  item: CartItem
): Promise<boolean> {
  const localOwner = getLocalCartOwner(cartId)
  if (localOwner) {
    const cart = readLocalCart(localOwner)
    if (!cart) return false

    cart.items = cart.items.filter(
      (stored) =>
        !(
          stored.productId === item.productId &&
          stored.size === item.size &&
          stored.color === item.color
        )
    )

    writeLocalCart(localOwner, updateLocalCartTotals(cart))
    return true
  }

  const response = await deleteCartAction<StoredCart>({
    productId: item.productId,
    size: item.size,
    color: item.color,
  })

  return response !== null
}

export async function clearCart(cartId: string): Promise<boolean> {
  const localOwner = getLocalCartOwner(cartId)
  if (localOwner) {
    const cart = readLocalCart(localOwner)
    if (!cart) return false
    writeLocalCart(localOwner, buildLocalCart(localOwner))
    return true
  }

  const response = await deleteCartAction<StoredCart>({ action: "clear" })
  return response !== null
}

export async function updateCartTotals(cartId: string): Promise<void> {
  const localOwner = getLocalCartOwner(cartId)
  if (localOwner) {
    const cart = readLocalCart(localOwner)
    if (!cart) return
    writeLocalCart(localOwner, updateLocalCartTotals(cart))
  }
}

export async function mergeGuestCartToUser(
  guestSessionId: string,
  userId: string
): Promise<boolean> {
  if (!guestSessionId) {
    return true
  }

  const cart = await fetchCartFromApi()
  if (cart) {
    return true
  }

  const guestOwner: CartOwner = { type: "guest", id: guestSessionId }
  const userOwner: CartOwner = { type: "user", id: userId }

  const guestCart = readLocalCart(guestOwner)
  if (!guestCart || guestCart.items.length === 0) {
    return true
  }

  const userCart = readLocalCart(userOwner) ?? buildLocalCart(userOwner)

  for (const guestItem of guestCart.items) {
    const existingItem = userCart.items.find(
      (stored) =>
        stored.productId === guestItem.productId &&
        stored.size === guestItem.size &&
        stored.color === guestItem.color
    )

    if (existingItem) {
      existingItem.quantity += guestItem.quantity
    } else {
      userCart.items.push({ ...guestItem })
    }
  }

  writeLocalCart(userOwner, updateLocalCartTotals(userCart))
  writeLocalCart(guestOwner, buildLocalCart(guestOwner))
  return true
}
