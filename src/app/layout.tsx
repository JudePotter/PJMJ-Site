import type { Metadata, Viewport } from 'next'
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import MotionProvider from '@/components/MotionProvider'
import Footer from '@/components/Footer'
import FloatingCta from '@/components/FloatingCta'
import WhatsAppButton from '@/components/WhatsAppButton'
import { seo, site } from '@/content/site'
import { siteUrl } from '@/lib/seo'

// Display and body. The only font preloaded: it carries the hero wordmark.
const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
  display: 'swap',
})

// Accent serif, italic only, used for a couple of words.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: 'italic',
  weight: '400',
  display: 'swap',
  preload: false,
})

// Labels.
const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${site.name}` },
  description: seo.description,
  applicationName: site.name,
  keywords: [...seo.keywords],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  alternates: { canonical: '/', languages: { 'en-GB': '/' } },
  // The social image comes from opengraph-image.tsx in this folder.
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    locale: 'en_GB',
    title: seo.shareTitle,
    description: seo.shareDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.shareTitle,
    description: seo.shareDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Where the business is, for the search engines that read it.
  other: { 'geo.region': 'GB-BNH', 'geo.placename': 'Brighton' },
  // Search Console ownership check. Set GOOGLE_SITE_VERIFICATION in Vercel to
  // the token it gives you and the tag appears. Nothing renders without it.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F3EE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-GB"
      className={`${instrumentSans.variable} ${fraunces.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Adds .js before first paint so animated things start hidden with
            no flash. Without scripts the page just shows everything. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <SmoothScroll />
        <MotionProvider>
          {/* The page. It lifts away at the very end to reveal the footer,
              which is fixed behind it. */}
          <div className="page-shell">{children}</div>
          <Footer />
          <FloatingCta />
          <WhatsAppButton />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
