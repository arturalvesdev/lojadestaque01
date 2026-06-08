import { NextRequest, NextResponse } from "next/server"

/** Only allow instagram.com/reel/ paths */
function isValidReelUrl(raw: string): boolean {
  try {
    const u = new URL(raw)
    const host = u.hostname.replace(/^www\./, "")
    return host === "instagram.com" && u.pathname.startsWith("/reel/")
  } catch {
    return false
  }
}

/** Pull the og:image value out of raw HTML. */
function extractOgImage(html: string): string | null {
  // property first, content second
  const m1 = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
  if (m1) return m1[1]
  // content first, property second
  const m2 = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
  if (m2) return m2[1]
  return null
}

/**
 * Fetch the Reel page HTML using the Facebook crawler User-Agent.
 * Meta/Instagram explicitly renders og:image tags for this UA to support
 * link previews — so it's the most reliable way to get the thumbnail.
 */
async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
      // Cache for 24 h at the Next.js fetch layer
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const html = await res.text()
    return extractOgImage(html)
  } catch {
    return null
  }
}

/**
 * Fallback: Instagram oEmbed (less reliable for Reels but worth trying)
 */
async function fetchOEmbed(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null
    const data = (await res.json()) as { thumbnail_url?: string }
    return data.thumbnail_url ?? null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url")

  if (!raw || !isValidReelUrl(raw)) {
    return NextResponse.json({ thumbnail: null }, { status: 400 })
  }

  // Primary: og:image HTML scraping — most reliable for Reels
  let thumbnail = await fetchOgImage(raw)

  // Fallback: oEmbed API
  if (!thumbnail) {
    thumbnail = await fetchOEmbed(raw)
  }

  return NextResponse.json({ thumbnail: thumbnail ?? null })
}
