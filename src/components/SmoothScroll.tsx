'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { easeOutCubic, scrollToY, setLenis } from '@/lib/lenis'
import { REDUCED_MQ, SCROLL_GLIDE } from '@/lib/scrollFeel'

/**
 * Site wide smooth scroll (Lenis), wired into GSAP's ticker so the scrubbed
 * sequences read the same scroll position Lenis is driving.
 *
 * It also owns in page navigation: a hash link glides to its section.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(REDUCED_MQ).matches

    let lenis: Lenis | null = null
    let tick: ((time: number) => void) | null = null

    if (!prefersReduced) {
      const instance = new Lenis({
        duration: SCROLL_GLIDE,
        easing: easeOutCubic,
        smoothWheel: true,
      })
      lenis = instance
      setLenis(instance)

      instance.on('scroll', ScrollTrigger.update)
      tick = (time: number) => instance.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    // Pinned, scroll scrubbed sections measure their scroll range on mount.
    // Web fonts swapping in afterwards (or images loading late) can reflow
    // the page and desync that range from the real scroll position, so
    // re-measure once layout has settled.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => {})
    window.addEventListener('load', refresh)

    const targetY = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }
      const anchor = (e.target as Element | null)?.closest?.(
        'a[href]',
      ) as HTMLAnchorElement | null
      if (
        !anchor ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return
      }
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname !== window.location.pathname || !url.hash) return

      const target = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      )
      if (!target) return

      e.preventDefault()
      scrollToY(targetY(target))
      window.history.pushState(null, '', url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick, true)

    // Landing on a hash (for example the old /contact redirect): wait for the
    // pinned sections to measure, then go there.
    let landing: number | undefined
    if (window.location.hash) {
      landing = window.setTimeout(() => {
        ScrollTrigger.refresh()
        const el = document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        )
        if (!el) return
        if (lenis) {
          lenis.scrollTo(targetY(el), { immediate: true, force: true })
        } else {
          window.scrollTo({ top: targetY(el) })
        }
      }, 160)
    }

    return () => {
      window.clearTimeout(landing)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('load', refresh)
      if (tick) gsap.ticker.remove(tick)
      lenis?.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
