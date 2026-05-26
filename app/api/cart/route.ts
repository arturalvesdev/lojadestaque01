import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getProductById } from "@/lib/products"

const GUEST_COOKIE = "destaque_guest_session_id"
const GUEST_SESSION_TTL_SECONDS = 30 * 24 * 60 * 60

// Convenience alias: non-null admin client (callers must guard before passing)
type AdminClient = NonNullable<ReturnType<typeof createAdminClient>>

function buildCartLineId(productId: string, size: string, color: string) {
  return `${productId}_${size}_${color}`
}

function buildGuestId() {
  return crypto.randomUUID()
}

function formatCartItem(item: any) {
  const product = getProductById(item.product_id)
  return {
    cartLineId: buildCartLineId(item.product_id, item.size, item.color),
    productId: item.product_id,
    name: item.name,
    price: item.price_cents / 100,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    category: product?.category ?? "",
  }
}

function buildResponse(data: any, guestId?: string) {
  const response = NextResponse.json(data)

  if (guestId) {
    response.cookies.set({
      name: GUEST_COOKIE,
      value: guestId,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: GUEST_SESSION_TTL_SECONDS,
    })
  }

  return response
}


async function getCurrentUser() {
  const supabase = await createClient()
  // FIX: createClient() returns null when Supabase env vars are not configured
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user ?? null
}

async function getOrCreateGuestSession(admin: AdminClient, guestId?: string) {
  const expiresAt = new Date(Date.now() + GUEST_SESSION_TTL_SECONDS * 1000).toISOString()

  if (guestId) {
    const { data: sessionData } = await admin
      .from("guest_sessions")
      .select("id")
      .eq("guest_id", guestId)
      .single()

    if (sessionData) {
      await admin
        .from("guest_sessions")
        .update({ expires_at: expiresAt })
        .eq("guest_id", guestId)
      return guestId
    }
  }

  const newGuestId = buildGuestId()
  await admin.from("guest_sessions").insert({
    guest_id: newGuestId,
    expires_at: expiresAt,
  })

  return newGuestId
}

async function getOrCreateGuestCart(admin: AdminClient, guestId: string) {
  const { data: sessionData } = await admin
    .from("guest_sessions")
    .select("id")
    .eq("guest_id", guestId)
    .single()

  if (!sessionData) {
    throw new Error("Guest session not found")
  }

  const { data: cartData } = await admin
    .from("carts")
    .select("id, subtotal_cents, item_count")
    .eq("guest_session_id", sessionData.id)
    .eq("status", "active")
    .single()

  if (cartData) {
    return { cartId: cartData.id, guestSessionId: sessionData.id }
  }

  const { data: newCart } = await admin
    .from("carts")
    .insert({
      guest_session_id: sessionData.id,
      status: "active",
      subtotal_cents: 0,
      item_count: 0,
    })
    .select("id")
    .single()

  // FIX: insert().single() can return null if the DB insert fails
  if (!newCart) {
    throw new Error("Failed to create guest cart")
  }

  return { cartId: newCart.id, guestSessionId: sessionData.id }
}

async function getOrCreateUserCart(admin: AdminClient, userId: string) {
  const { data: cartData } = await admin
    .from("carts")
    .select("id, subtotal_cents, item_count")
    .eq("user_id", userId)
    .eq("status", "active")
    .single()

  if (cartData) {
    return { cartId: cartData.id }
  }

  const { data: newCart } = await admin
    .from("carts")
    .insert({
      user_id: userId,
      status: "active",
      subtotal_cents: 0,
      item_count: 0,
    })
    .select("id")
    .single()

  // FIX: insert().single() can return null if the DB insert fails
  if (!newCart) {
    throw new Error("Failed to create user cart")
  }

  return { cartId: newCart.id }
}

async function getCartPayload(admin: AdminClient, cartId: string) {
  const { data: cartData } = await admin
    .from("carts")
    .select("id, subtotal_cents, item_count")
    .eq("id", cartId)
    .single()

  if (!cartData) {
    throw new Error("Cart not found")
  }

  const { data: items } = await admin
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId)

  return {
    id: cartData.id,
    items: (items || []).map(formatCartItem),
    subtotalCents: cartData.subtotal_cents,
    itemCount: cartData.item_count,
  }
}

async function updateCartTotals(admin: AdminClient, cartId: string) {
  const { data: items } = await admin
    .from("cart_items")
    .select("price_cents, quantity")
    .eq("cart_id", cartId)

  const subtotalCents = (items || []).reduce(
    (sum, item) => sum + item.price_cents * item.quantity,
    0
  )
  const itemCount = (items || []).reduce((sum, item) => sum + item.quantity, 0)

  await admin
    .from("carts")
    .update({ subtotal_cents: subtotalCents, item_count: itemCount })
    .eq("id", cartId)
}

async function addItemToCart(admin: AdminClient, cartId: string, item: any) {
  const { data: existing } = await admin
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", item.product_id)
    .eq("size", item.size)
    .eq("color", item.color)
    .single()

  if (existing) {
    await admin
      .from("cart_items")
      .update({ quantity: existing.quantity + item.quantity })
      .eq("id", existing.id)
  } else {
    await admin.from("cart_items").insert({
      cart_id: cartId,
      product_id: item.product_id,
      name: item.name,
      price_cents: Math.round(item.price * 100),
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    })
  }

  await updateCartTotals(admin, cartId)
}

async function patchItemQuantity(admin: AdminClient, cartId: string, productId: string, size: string, color: string, quantity: number) {
  if (quantity <= 0) {
    await admin
      .from("cart_items")
      .delete()
      .match({ cart_id: cartId, product_id: productId, size, color })
  } else {
    await admin
      .from("cart_items")
      .update({ quantity })
      .match({ cart_id: cartId, product_id: productId, size, color })
  }

  await updateCartTotals(admin, cartId)
}

async function removeItemFromCart(admin: AdminClient, cartId: string, productId: string, size: string, color: string) {
  await admin
    .from("cart_items")
    .delete()
    .match({ cart_id: cartId, product_id: productId, size, color })

  await updateCartTotals(admin, cartId)
}

async function clearCartItems(admin: AdminClient, cartId: string) {
  await admin.from("cart_items").delete().eq("cart_id", cartId)
  await updateCartTotals(admin, cartId)
}

async function mergeGuestCart(admin: AdminClient, guestId: string, userId: string) {
  // Use a transactional RPC on the DB to perform the merge atomically.
  const { error } = await admin.rpc("merge_guest_cart", {
    guest_id_text: guestId,
    target_user_id: userId,
  })

  if (error) {
    throw error
  }
}

async function getOrCreateCart(admin: AdminClient, user: any, guestId?: string) {
  if (user?.id) {
    return getOrCreateUserCart(admin, user.id)
  }

  if (!guestId) {
    throw new Error("Guest id missing")
  }

  return getOrCreateGuestCart(admin, guestId)
}

async function getCartResponse(admin: AdminClient, cartId: string) {
  return getCartPayload(admin, cartId)
}

async function handleCurrentCart(req: NextRequest) {
  const user = await getCurrentUser()
  const admin = createAdminClient()

  if (!admin) {
    return NextResponse.json({ error: "Server missing SUPABASE_SERVICE_ROLE_KEY" }, { status: 500 })
  }

  const guestCookie = req.cookies.get(GUEST_COOKIE)?.value
  let guestId = guestCookie ?? undefined

  if (user && guestId) {
    await mergeGuestCart(admin, guestId, user.id)
    const response = await getCartResponse(admin, (await getOrCreateUserCart(admin, user.id)).cartId)
    const nextResponse = buildResponse(response)
    // FIX: Next.js 15 cookies.delete() accepts a single options object, not (name, options)
    nextResponse.cookies.delete({ name: GUEST_COOKIE, path: "/" })
    return nextResponse
  }

  if (!user) {
    guestId = await getOrCreateGuestSession(admin, guestId)
  }

  const cart = await getCartResponse(admin, (await getOrCreateCart(admin, user, guestId)).cartId)
  return buildResponse(cart, guestId)
}

export async function GET(req: NextRequest) {
  try {
    return await handleCurrentCart(req)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    const user = await getCurrentUser()
    const admin = createAdminClient()

    if (!admin) {
      return NextResponse.json({ error: "Server missing SUPABASE_SERVICE_ROLE_KEY" }, { status: 500 })
    }

    const guestCookie = req.cookies.get(GUEST_COOKIE)?.value
    const guestId = user ? undefined : await getOrCreateGuestSession(admin, guestCookie ?? undefined)

    const cart = await getOrCreateCart(admin, user, guestId)
    await addItemToCart(admin, cart.cartId, {
      product_id: payload.productId,
      name: payload.name,
      price: payload.price,
      quantity: payload.quantity ?? 1,
      size: payload.size,
      color: payload.color,
    })

    const response = await getCartResponse(admin, cart.cartId)
    return buildResponse(response, guestId)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to add cart item" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json()
    const user = await getCurrentUser()
    const admin = createAdminClient()

    if (!admin) {
      return NextResponse.json({ error: "Server missing SUPABASE_SERVICE_ROLE_KEY" }, { status: 500 })
    }

    const guestCookie = req.cookies.get(GUEST_COOKIE)?.value
    const guestId = user ? undefined : await getOrCreateGuestSession(admin, guestCookie ?? undefined)

    const cart = await getOrCreateCart(admin, user, guestId)
    await patchItemQuantity(
      admin,
      cart.cartId,
      payload.productId,
      payload.size,
      payload.color,
      payload.quantity
    )

    const response = await getCartResponse(admin, cart.cartId)
    return buildResponse(response, guestId)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}))
    const user = await getCurrentUser()
    const admin = createAdminClient()

    if (!admin) {
      return NextResponse.json({ error: "Server missing SUPABASE_SERVICE_ROLE_KEY" }, { status: 500 })
    }

    const guestCookie = req.cookies.get(GUEST_COOKIE)?.value
    const guestId = user ? undefined : await getOrCreateGuestSession(admin, guestCookie ?? undefined)

    const cart = await getOrCreateCart(admin, user, guestId)

    if (payload.action === "clear") {
      await clearCartItems(admin, cart.cartId)
    } else {
      await removeItemFromCart(
        admin,
        cart.cartId,
        payload.productId,
        payload.size,
        payload.color
      )
    }

    const response = await getCartResponse(admin, cart.cartId)
    return buildResponse(response, guestId)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}
