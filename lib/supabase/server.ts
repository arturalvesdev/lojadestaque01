/**
 * Cliente Supabase para Server Components e Route Handlers.
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { isSupabaseConfigured } from "@/lib/supabase/config"

export async function createClient() {
  if (!isSupabaseConfigured()) return null

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const cookieStore = await cookies()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Ignorado em Server Components estáticos
        }
      },
    },
  })
}
