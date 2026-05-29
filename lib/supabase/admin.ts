/**
 * Supabase admin client for server-only cart operations.
 * Uses the service role key and must never be exposed to the browser.
 */
import { createClient } from "@supabase/supabase-js"
import { isSupabaseConfigured } from "@/lib/supabase/config"

export function createAdminClient() {
  // URL + anon key must be real before we trust the service role key
  if (!isSupabaseConfigured()) return null

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  // Service role keys are also JWTs — reject placeholder values
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key || !key.startsWith("eyJ") || key.length < 100) return null

  return createClient(url, key)
}
