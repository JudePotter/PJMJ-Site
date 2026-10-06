'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { EASE_OUT, FULL_MOTION_MQ, REDUCED_MQ } from '@/lib/scrollFeel'

/**
 * Rolls its children up from below into place once, the first time they
 * scroll into view. Same rise, duration and easing as the Dental Growth Lab
 * Reveal. With reduced motion it is a plain fade.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()

    mm.add(FULL_MOTION_MQ, () => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: EASE_OUT,
          delay,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    })
    mm.add(REDUCED_MQ, () => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.6,
          delay,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        },
      )
    })

    return () => mm.revert()
  }, [y, delay])

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  )
}
