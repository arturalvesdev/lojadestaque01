/**
 * Guest session management
 * Handles anonymous user identification and tracking without authentication.
 */

import { createClient } from "@/lib/supabase/client"

const GUEST_ID_KEY = "destaquepremium_guest_id"
const GUEST_SESSION_TTL = 30 * 24 * 60 * 60 * 1000 // 30 days in ms

/**
 * Generate a unique guest ID.
 * Format: "guest_" + timestamp + random string
 */
function generateGuestId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 15)
  return `guest_${timestamp}_${random}`
}

/**
 * Get or create guest session.
 * Checks localStorage first, creates if needed.
 * @returns guest_id string
 */
export async function getOrCreateGuestId(): Promise<string> {
  if (typeof window === "undefined") {
    // Server-side: can't access localStorage
    return ""
  }

  // Check if guest_id already exists in localStorage
  let guestId = localStorage.getItem(GUEST_ID_KEY)

  if (guestId) {
    // Validate it exists in Supabase (might be expired)
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from("guest_sessions")
        .select("id")
        .eq("guest_id", guestId)
        .single()

      if (data) {
        // Session exists and is valid
        return guestId
      }
    } catch {
      // Session doesn't exist or expired, create new
      guestId = null
    }
  }

  // Create new guest session
  if (!guestId) {
    guestId = generateGuestId()
    localStorage.setItem(GUEST_ID_KEY, guestId)
  }

  // Register in Supabase
  try {
    const supabase = createClient()
    const expiresAt = new Date(Date.now() + GUEST_SESSION_TTL)

    await supabase.from("guest_sessions").insert({
      guest_id: guestId,
      expires_at: expiresAt.toISOString(),
    })
  } catch (error) {
    // If insert fails (duplicate), that's fine - guest_id already exists
    console.debug("Guest session already exists:", error)
  }

  return guestId
}

/**
 * Get current guest ID from localStorage (client-side only)
 * @returns guest_id or null if not set
 */
export function getGuestIdSync(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  return localStorage.getItem(GUEST_ID_KEY)
}

/**
 * Check if user is currently a guest
 */
export function isGuest(): boolean {
  return getGuestIdSync() !== null
}

/**
 * Clear guest session (called when user logs in)
 */
export function clearGuestId(): void {
  if (typeof window === "undefined") {
    return
  }
  localStorage.removeItem(GUEST_ID_KEY)
}

/**
 * Update guest session with user ID when they authenticate
 */
export async function linkGuestToUser(userId: string): Promise<void> {
  const guestId = getGuestIdSync()

  if (!guestId) {
    // No guest session to link
    return
  }

  try {
    const supabase = createClient()

    // Update guest_session to link with user_id
    await supabase
      .from("guest_sessions")
      .update({ user_id: userId })
      .eq("guest_id", guestId)

    // Clear localStorage (no longer need guest_id now that we have user_id)
    clearGuestId()
  } catch (error) {
    console.error("Failed to link guest to user:", error)
  }
}
