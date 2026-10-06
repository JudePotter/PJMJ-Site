'use client'

import { useEffect, useRef } from 'react'
import { CTA_NUDGE_DELAY, REDUCED_MQ } from '@/lib/scrollFeel'

/**
 * The "taking on clients" badge: a link to the contact section. At rest it is
 * an outlined pill. Hover or focus fills it lime, pulses it and slides an
 * arrow in (all CSS, see .status-cta in globals.css).
 *
 * If it is on screen (active) and nobody has hovered or focused it after
 * CTA_NUDGE_DELAY, it gives the same pulse on its own to get noticed, and
 * stops for good once it has been touched. data-nudge is set on the element
 * directly, so React never re-renders for it.
 */
export default function StatusCta({
  label,
  fontSize,
  active = true,
  className = '',
}: {
  label: string
  /** CSS font size. Everything else in the pill scales from it. */
  fontSize: string
  /** The nudge timer only runs while this is true. */
  active?: boolean
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const touched = useRef(false)

  useEffect(() => {
    const cta = ref.current
    if (!cta) return
    const settle = () => {
      touched.current = true
      cta.removeAttribute('data-nudge')
    }
    cta.addEventListener('pointerenter', settle)
    cta.addEventListener('focus', settle)

    let timer: number | undefined
    if (active && !touched.current && !window.matchMedia(REDUCED_MQ).matches) {
      timer = window.setTimeout(
        () => cta.setAttribute('data-nudge', ''),
        CTA_NUDGE_DELAY,
      )
    }

    return () => {
      window.clearTimeout(timer)
      cta.removeAttribute('data-nudge')
      cta.removeEventListener('pointerenter', settle)
      cta.removeEventListener('focus', settle)
    }
  }, [active])

  return (
    <a
      ref={ref}
      href="#say-hello"
      className={`status-cta t-label inline-flex w-fit items-center gap-[0.9em] rounded-full border border-ink px-[1.2em] py-[0.85em] text-ink ${className}`}
      style={{ fontSize }}
    >
      <span className="live-dot h-[0.8em] w-[0.8em] shrink-0 rounded-full bg-live" />
      <span>
        {label}
        <span className="sr-only">. Get in touch</span>
      </span>
      <span className="status-cta-arrow" aria-hidden="true">
        →
      </span>
    </a>
  )
}
