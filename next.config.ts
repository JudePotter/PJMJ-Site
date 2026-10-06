import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The whole stylesheet is a few KB, so inline it and skip the render
  // blocking request on first load.
  experimental: { inlineCss: true },

  // The dev only "N" badge sits bottom left by default, and the floating
  // contact bubble and the WhatsApp button live in the bottom corners.
  // Nothing here reaches production.
  devIndicators: { position: 'top-right' },

  // Work covers are crisp UI mockups, so they are served at 90. Next only
  // allows qualities that are listed here.
  images: { qualities: [75, 90] },

  // The old multi page site is now a single scroll. Old URLs land on the
  // matching part of the page. Temporary (307) until the redesign is live.
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: false },
      { source: '/contact', destination: '/#say-hello', permanent: false },
      { source: '/admin', destination: '/', permanent: false },
    ]
  },
}

export default nextConfig
