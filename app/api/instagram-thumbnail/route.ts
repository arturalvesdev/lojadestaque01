import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url || !url.includes("instagram.com")) {
    return NextResponse.json({ thumbnail_url: null }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`,
      { next: { revalidate: 86400 } }
    )

    if (!response.ok) {
      return NextResponse.json({ thumbnail_url: null })
    }

    const data = (await response.json()) as { thumbnail_url?: string }
    return NextResponse.json({ thumbnail_url: data.thumbnail_url ?? null })
  } catch {
    return NextResponse.json({ thumbnail_url: null })
  }
}
