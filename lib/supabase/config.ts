/**
 * Verifica se o Supabase está configurado com credenciais reais.
 *
 * A checagem simples (url && key) passa mesmo com os placeholders do
 * .env.example ("XXXXX...", "COLE_SUA_ANON_KEY_AQUI"), fazendo o cliente
 * tentar requisições que falham com "Invalid path specified in request URL".
 *
 * Regras de rejeição:
 * - URL deve ser https://*.supabase.co
 * - Anon key deve ser um JWT real (começa com "eyJ", mínimo 100 chars)
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return false
  if (!url.startsWith("https://") || !url.includes(".supabase.co")) return false
  // All Supabase anon keys are JWTs — they always start with "eyJ" and are long
  if (!key.startsWith("eyJ") || key.length < 100) return false

  return true
}
