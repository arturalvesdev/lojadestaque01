/**
 * Guest session management
 * Handles anonymous user identification and tracking without authentication.
 */

// Guest session persistence is handled by the server-side cart API.

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
    return guestId
  }

  // Create new guest session
  if (!guestId) {
    guestId = generateGuestId()
    localStorage.setItem(GUEST_ID_KEY, guestId)
  }

  // The cart API will establish a secure guest session on the first request.

  return guestId
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

  if (typeof window === "undefined") {
    return
  }

  try {
    // The server-side cart API will merge or link guest sessions on auth.
    clearGuestId()
  } catch (error) {
    console.error("Failed to link guest to user:", error)
  }
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
