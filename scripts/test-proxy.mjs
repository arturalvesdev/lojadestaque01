// Tests the all-in-one approach: og:image fetch → immediate CDN proxy in same process
const REELS = [
  "https://www.instagram.com/reel/DZP6lu6B4yl/",
  "https://www.instagram.com/reel/DZDuFDLyDhJ/",
]

function extractOgImage(html) {
  const m1 = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
  if (m1) return m1[1]
  const m2 = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
  if (m2) return m2[1]
  return null
}

const strategies = [
  {
    label: "facebookexternalhit UA",
    headers: {
      "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    },
  },
  {
    label: "bare (no headers)",
    headers: {},
  },
  {
    label: "Chrome UA + Referer + Origin",
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://www.instagram.com/",
      Origin: "https://www.instagram.com",
    },
  },
]

for (const reel of REELS) {
  console.log(`\nTesting: ${reel}`)

  // Step 1: get og:image URL
  let cdnUrl = null
  try {
    const r1 = await fetch(reel, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        Accept: "text/html",
      },
    })
    const html = await r1.text()
    cdnUrl = extractOgImage(html)
    console.log(`  Step 1 (og:image): ${cdnUrl ? "✓ found" : "✗ not found"}`)
    if (cdnUrl) console.log(`    ${cdnUrl.slice(0, 90)}...`)
  } catch (e) {
    console.log(`  Step 1 error: ${e.message}`)
  }

  if (!cdnUrl) continue

  // Step 2: try all header strategies immediately (same process, same IP)
  for (const strategy of strategies) {
    try {
      const r2 = await fetch(cdnUrl, { headers: strategy.headers })
      const buf = await r2.arrayBuffer()
      const ct = r2.headers.get("content-type")
      console.log(`  Step 2 [${strategy.label}]: ${r2.ok ? "✓" : "✗"} HTTP ${r2.status}, ${ct}, ${buf.byteLength} bytes`)
      if (r2.ok) break
    } catch (e) {
      console.log(`  Step 2 [${strategy.label}] error: ${e.message}`)
    }
  }
}
