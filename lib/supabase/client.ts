/**
 * Cliente Supabase para uso no navegador (Client Components).
 */

import { createBrowserClient } from "@supabase/ssr"

/** Cria cliente Supabase no browser — retorna null se variáveis não configuradas */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  return createBrowserClient(url, key)
}
