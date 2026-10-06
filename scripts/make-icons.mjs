#!/usr/bin/env node
/**
 * Rebuilds every icon from the logo geometry in src/components/petalPaths.ts,
 * the same shape the site header uses, so the icons can never drift from it.
 * Run it after the logo or the palette changes:
 *
 *     node scripts/make-icons.mjs
 *
 * Needs Node 22.18 or newer (it reads the .ts file directly) and sharp, which
 * Next.js already installs.
 *
 * Writes:
 *   src/app/icon.svg          the tab icon. Full detail, with a simplified mark
 *                             that takes over below 40px (see the media query)
 *   src/app/favicon.ico       16 and 32 pixel, simplified mark, transparent
 *   src/app/apple-icon.png    180 pixel, on the page colour, with padding
 *   public/logo192.png        manifest icons, on the page colour, with padding
 *   public/logo512.png        (also used as the logo in the structured data)
 *
 * Why two marks: at 16 pixels the veins and the thin outline blur into a muddy
 * olive blob. The simplified mark drops the veins and draws a solid outline.
 */

import { createRequire } from 'node:module'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sharp = createRequire(path.join(root, 'package.json'))('sharp')
const P = await import(
  pathToFileURL(path.join(root, 'src/components/petalPaths.ts')).href
)

const INK = '#111111'
const LIME = '#D7F75B'
const COBALT = '#2B4BFF'
const PAGE = '#F5F3EF'
const { x: CX, y: CY } = P.PETAL_CENTRE

/** The mark as it appears in the header: lime, ink outline, cobalt veins. */
const fine = `<path d="${P.PETAL_FILL}" fill="${LIME}"/>
<path d="${P.PETAL_OUTLINE}" fill="${INK}" fill-rule="evenodd"/>
<path d="${P.PETAL_VEINS}" fill="none" stroke="${COBALT}" stroke-width="${P.PETAL_VEIN_WIDTH}" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="${CX}" cy="${CY}" r="${P.PETAL_CENTRE.r}" fill="${COBALT}" stroke="${INK}" stroke-width="${P.PETAL_RING_WIDTH}"/>`

/** For tiny sizes: no veins, a solid outline, a bolder centre. */
const small = `<path d="${P.PETAL_FILL}" fill="${LIME}" stroke="${INK}" stroke-width="34" stroke-linejoin="round"/>
<circle cx="${CX}" cy="${CY}" r="62" fill="${COBALT}" stroke="${INK}" stroke-width="24"/>`

const svgText = (viewBox, body, { background, size } = {}) => {
  const [x, y, w, h] = viewBox
  const dims = size ? ` width="${size}" height="${size}"` : ''
  const fill = background
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${background}"/>`
    : ''
  return `<svg xmlns="http://www.w3.org/2000/svg"${dims} viewBox="${x} ${y} ${w} ${h}">${fill}${body}</svg>`
}

/** The exact visible bounds of the mark, found by drawing it into a big box. */
async function markBounds() {
  const [vx, vy, vw] = [-200, -300, 1200]
  const n = 2400
  const { data } = await sharp(
    Buffer.from(svgText([vx, vy, vw, vw], fine, { size: n })),
  )
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let [x0, y0, x1, y1] = [n, n, 0, 0]
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (data[(y * n + x) * 4 + 3] > 20) {
        x0 = Math.min(x0, x)
        x1 = Math.max(x1, x)
        y0 = Math.min(y0, y)
        y1 = Math.max(y1, y)
      }
    }
  }
  const k = vw / n
  return {
    x: vx + x0 * k,
    y: vy + y0 * k,
    w: (x1 - x0 + 1) * k,
    h: (y1 - y0 + 1) * k,
  }
}

/** A square view box centred on the mark, with padding on each side. */
function square(b, padding) {
  const side = Math.max(b.w, b.h) / (1 - 2 * padding)
  return [b.x + b.w / 2 - side / 2, b.y + b.h / 2 - side / 2, side, side]
}

/** Draw big, then shrink: the smooth edges that tiny icons need. */
async function png(viewBox, body, px, background) {
  const big = px * 8
  const image = sharp(
    Buffer.from(svgText(viewBox, body, { background, size: big })),
  ).resize(px, px, { kernel: 'lanczos3' })
  // Icons on the page colour are fully opaque, so nothing shows through.
  return (background ? image.removeAlpha() : image).png().toBuffer()
}

/** An .ico holding PNG images. Every current browser reads these. */
function ico(images) {
  const head = Buffer.alloc(6 + 16 * images.length)
  head.writeUInt16LE(1, 2)
  head.writeUInt16LE(images.length, 4)
  let offset = head.length
  images.forEach(({ px, data }, i) => {
    const at = 6 + 16 * i
    head.writeUInt8(px, at)
    head.writeUInt8(px, at + 1)
    head.writeUInt16LE(1, at + 4)
    head.writeUInt16LE(32, at + 6)
    head.writeUInt32LE(data.length, at + 8)
    head.writeUInt32LE(offset, at + 12)
    offset += data.length
  })
  return Buffer.concat([head, ...images.map((i) => i.data)])
}

const bounds = await markBounds()
const tab = square(bounds, 0.03)

// The tab icon. The media query is evaluated against the size the browser
// draws the icon at, so tab sizes get the simplified mark and anything bigger
// gets the full one. A browser that ignores it just shows the full mark.
const [tx, ty, tw, th] = tab.map((n) => Math.round(n * 10) / 10)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${tx} ${ty} ${tw} ${th}">
<style>.small{display:none}@media (max-width:40px){.fine{display:none}.small{display:inline}}</style>
<g class="fine">
${fine}
</g>
<g class="small">
${small}
</g>
</svg>
`
await writeFile(path.join(root, 'src/app/icon.svg'), iconSvg)

await writeFile(
  path.join(root, 'src/app/favicon.ico'),
  ico(
    await Promise.all(
      [16, 32].map(async (px) => ({ px, data: await png(tab, small, px) })),
    ),
  ),
)

await writeFile(
  path.join(root, 'src/app/apple-icon.png'),
  await png(square(bounds, 0.17), fine, 180, PAGE),
)
for (const px of [192, 512]) {
  await writeFile(
    path.join(root, `public/logo${px}.png`),
    await png(square(bounds, 0.13), fine, px, PAGE),
  )
}

console.log(
  'icons written: icon.svg, favicon.ico, apple-icon.png, logo192.png, logo512.png',
)
