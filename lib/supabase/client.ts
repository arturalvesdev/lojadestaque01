/**
 * Cliente Supabase para uso no navegador (Client Components).
 */

import { createBrowserClient } from "@supabase/ssr"
import { isSupabaseConfigured } from "@/lib/supabase/config"

/** Cria cliente Supabase no browser — retorna null se credenciais inválidas ou não configuradas */
export function createClient() {
  if (!isSupabaseConfigured()) return null

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createBrowserClient(url, key)
}
