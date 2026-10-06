<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PJMJ Studio site

Single page, one scroll site. Next.js App Router, TypeScript, Tailwind v4, GSAP + ScrollTrigger, Lenis, Motion.

- Motion feel (easing, scrub, glide) lives in `src/lib/scrollFeel.ts`. Change it there, not per component.
- Colour and type tokens live in `src/app/globals.css` under `@theme`. Use only those colours.
- Project data lives in `src/content/projects.ts`. Placeholder assets live in `public/work/[slug]/`.
- No em dashes or en dashes anywhere in copy, comments or code.
- Respect `prefers-reduced-motion`: big motion falls back to simple fades.
