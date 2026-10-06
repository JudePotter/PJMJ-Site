# PJMJ Studio

Single page, one scroll site for PJMJ Studio.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS v4
- GSAP + ScrollTrigger for scroll choreography, Lenis for smooth scroll
- Motion for small UI interactions

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run lint
npm run check
```

## Where things live

- `src/app/globals.css`: design tokens (colour, type) and the footer reveal CSS
- `src/lib/scrollFeel.ts`: the feel of scrolling in one place
- `src/content/projects.ts`: all six projects, frame colours, asset paths
- `src/content/site.ts`: contact details, availability line, and the search and share copy (`seo`)
- `src/lib/seo.ts`: canonical URL and JSON-LD. The domain defaults to https://www.pjmjstudios.co.uk; set `NEXT_PUBLIC_SITE_URL` to override it. Set `GOOGLE_SITE_VERIFICATION` to add the Search Console tag
- `src/app/opengraph-image.tsx`: the social share card, built at build time
- `src/components/petalPaths.ts`: the logo mark, traced from `public/logo.png`
- `public/work/[slug]/`: `cover.webp` (5:4 artwork) and an optional `loop.mp4` for each project. Run each new video through `python3 scripts/tag-video-srgb.py <file>` first, so browsers do not show it a shade off the frame colour
