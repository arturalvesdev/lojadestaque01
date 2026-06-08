import { NextRequest, NextResponse } from "next/server"

function isValidReelUrl(raw: string): boolean {
  try {
    const u = new URL(raw)
    const host = u.hostname.replace(/^www\./, "")
    return host === "instagram.com" && u.pathname.startsWith("/reel/")
  } catch {
    return false
  }
}

function extractOgImage(html: string): string | null {
  const m1 = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
  if (m1) return m1[1]
  const m2 = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
  if (m2) return m2[1]
  return null
}

async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const html = await res.text()
    return extractOgImage(html)
  } catch {
    return null
  }
}

async function fetchOEmbed(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = (await res.json()) as { thumbnail_url?: string }
    return data.thumbnail_url ?? null
  } catch {
    return null
  }
}

// Returns the raw CDN URL to the client.
// The browser loads it with referrerpolicy="no-referrer" — the signed token in
// the URL is self-sufficient; Instagram CDN only rejects requests that send a
// non-Instagram Referer, so omitting it entirely bypasses the hotlink check.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const raw = searchParams.get("url")

  if (!raw || !isValidReelUrl(raw)) {
    return NextResponse.json({ thumbnail: null }, { status: 400 })
  }

  let cdnUrl = await fetchOgImage(raw)
  if (!cdnUrl) cdnUrl = await fetchOEmbed(raw)

  return NextResponse.json(
    { thumbnail: cdnUrl ?? null },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  )
}
