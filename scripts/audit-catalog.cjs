/**
 * Quality-control audit for all active products in the catalog.
 * Checks: id=slug, no duplicates, badge, description, specifications, image files on disk.
 */
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '..', 'public')

// ── Load catalog via dynamic require (strip TS, treat as JS constants)
// We parse the raw file since we can't run TSC here.
const catalogSrc = fs.readFileSync(
  path.join(__dirname, '..', 'lib', 'products', 'catalog.ts'),
  'utf8'
)

// Extract all entry keys and their id/isActive/badge/description/specifications/image/images fields
// by simple regex scanning (good enough for this structure).
const entryPattern = /^\s+"([a-z0-9\-\/]+)":\s*product\(\{/gm
const idPattern = /^\s+id:\s+"([^"]+)"/m
const isActivePattern = /^\s+isActive:\s+false/m
const badgePattern = /^\s+badge:\s+"([^"]+)"/m
const descPattern = /^\s+description:\s+"([^"]{1,})"/m
const descMultiPattern = /^\s+description:\s*\n?\s+"([^"]{1,})"/m
const specsPattern = /^\s+specifications:\s*\{([^}]+)\}/ms
const imagePattern = /^\s+image:\s+"([^"]+)"/m
const imagesPattern = /^\s+images:\s*\[([^\]]+)\]/ms
const colorImagesPattern = /colorImages:\s*\{[\s\S]+?\},/

const issues = []
const passed = []
const report = []
const seenIds = {}
const seenKeys = {}

// Split catalog into individual product blocks
const lines = catalogSrc.split('\n')
let blocks = []
let currentKey = null
let currentStart = -1

for (let i = 0; i < lines.length; i++) {
  const keyMatch = lines[i].match(/^\s+"([^"]+)":\s*product\(\{/)
  if (keyMatch) {
    if (currentKey !== null) {
      blocks.push({ key: currentKey, src: lines.slice(currentStart, i).join('\n') })
    }
    currentKey = keyMatch[1]
    currentStart = i
  }
}
if (currentKey !== null) {
  blocks.push({ key: currentKey, src: lines.slice(currentStart).join('\n') })
}

for (const { key, src } of blocks) {
  // Skip inactive products
  if (isActivePattern.test(src)) continue

  const idMatch = src.match(/id:\s+"([^"]+)"/)
  const id = idMatch ? idMatch[1] : null

  const badgeMatch = src.match(/badge:\s+"([^"]+)"/)
  const badge = badgeMatch ? badgeMatch[1] : null

  const hasDescription = /description:\s*["\\n]/.test(src) || /description:\s*\n\s+"/.test(src)

  const hasSpecifications = /specifications:\s*\{/.test(src)

  // Extract image paths
  const imagePaths = []
  const imgMatch = src.match(/image:\s+"(\/[^"]+)"/)
  if (imgMatch) imagePaths.push(imgMatch[1])

  const imgsBlockMatch = src.match(/images:\s*\[([\s\S]+?)\]/)
  if (imgsBlockMatch) {
    const urls = [...imgsBlockMatch[1].matchAll(/"(\/[^"]+)"/g)].map(m => m[1])
    imagePaths.push(...urls)
  }

  const colorImgsMatch = src.match(/colorImages:\s*\{([\s\S]+?)\n\s+\}/)
  if (colorImgsMatch) {
    // Only capture URL strings (start with /products/)
    const urls = [...colorImgsMatch[1].matchAll(/"(\/[^"]+)"/g)].map(m => m[1])
    imagePaths.push(...urls)
  }

  const productIssues = []

  // 1. id = slug
  if (id !== key) productIssues.push(`ID mismatch: key="${key}" id="${id}"`)

  // 2. Duplicate key
  if (seenKeys[key]) {
    productIssues.push(`Duplicate catalog key: "${key}"`)
  } else {
    seenKeys[key] = true
  }

  // 3. Duplicate id
  if (id) {
    if (seenIds[id]) {
      productIssues.push(`Duplicate id: "${id}"`)
    } else {
      seenIds[id] = true
    }
  }

  // 4. Badge check (newly imported = Novo expected; we just report what it is)
  const badgeStatus = badge ? `"${badge}"` : 'no badge'

  // 5. Description
  if (!hasDescription) productIssues.push('Empty/missing description')

  // 6. Specifications
  if (!hasSpecifications) productIssues.push('Missing specifications')

  // 7. Image files on disk
  const missingImages = []
  const uniquePaths = [...new Set(imagePaths)]
  for (const imgPath of uniquePaths) {
    const fullPath = path.join(publicDir, imgPath)
    if (!fs.existsSync(fullPath)) {
      missingImages.push(imgPath)
    }
  }
  if (missingImages.length > 0) {
    productIssues.push(`Missing image files: ${missingImages.join(', ')}`)
  }

  const entry = {
    key,
    id,
    badge: badgeStatus,
    images: uniquePaths.length,
    missingImages,
    issues: productIssues,
  }

  if (productIssues.length > 0) {
    issues.push(entry)
  } else {
    passed.push(entry)
  }
}

console.log('\n══════════════════════════════════════════')
console.log('  CATALOG AUDIT — QUALITY CONTROL REPORT')
console.log('══════════════════════════════════════════\n')

console.log(`Active products scanned: ${passed.length + issues.length}`)
console.log(`Passed: ${passed.length}`)
console.log(`Issues found: ${issues.length}`)

if (issues.length > 0) {
  console.log('\n── ISSUES ──────────────────────────────────')
  for (const p of issues) {
    console.log(`\n[FAIL] ${p.key}`)
    for (const issue of p.issues) console.log(`  ✗ ${issue}`)
  }
} else {
  console.log('\n── ALL PRODUCTS PASS ────────────────────────')
}

console.log('\n── FULL ACTIVE PRODUCT LIST ─────────────────')
for (const p of [...passed, ...issues]) {
  const status = p.issues.length === 0 ? '✓' : '✗'
  console.log(`${status} ${p.key} | badge: ${p.badge} | images: ${p.images}`)
}

console.log('\n══════════════════════════════════════════\n')
process.exit(issues.length > 0 ? 1 : 0)
