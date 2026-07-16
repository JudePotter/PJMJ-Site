import { useRef } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import { SiteHeader } from '#/components/SiteHeader'
import { SiteFooter } from '#/components/SiteFooter'
import { ScrollProgress } from '#/components/motion/ScrollProgress'
import { CursorBlob } from '#/components/motion/CursorBlob'
import {
  INTRO_HTML_CLASS,
  INTRO_OVERLAY_ID,
  INTRO_SESSION_KEY,
  INTRO_SPLASH_ID,
  LogoIntro,
} from '#/components/motion/LogoIntro'

const introBlockingScript = `(function(){try{if(sessionStorage.getItem('${INTRO_SESSION_KEY}'))return;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;document.documentElement.classList.add('${INTRO_HTML_CLASS}');}catch(e){}})();`

const introCriticalCss = `
#${INTRO_SPLASH_ID} { display: none; }
html.${INTRO_HTML_CLASS} body > *:not(#${INTRO_SPLASH_ID}):not(#${INTRO_OVERLAY_ID}) { display: none !important; }
html.${INTRO_HTML_CLASS} #${INTRO_SPLASH_ID} {
  display: flex !important;
  position: fixed;
  inset: 0;
  align-items: center;
  justify-content: center;
  background: #faf7f0;
  z-index: 200;
}
`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'PJMJ Studios - Web Developer & SEO Specialist',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Inter:wght@400;500&display=swap',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '48x48',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const logoRef = useRef<HTMLSpanElement>(null)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: introCriticalCss }} />
        <script dangerouslySetInnerHTML={{ __html: introBlockingScript }} />
      </head>
      <body className="bg-paper text-ink">
        <div id={INTRO_SPLASH_ID} aria-hidden>
          <img src="/logo.png" alt="" style={{ width: 220, height: 'auto' }} />
        </div>
        <ScrollProgress />
        <CursorBlob />
        <LogoIntro targetRef={logoRef} />
        <SiteHeader logoRef={logoRef} />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
