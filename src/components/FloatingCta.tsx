'use client'

import { useEffect, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { site } from '@/content/site'
import StatusCta from './StatusCta'

/**
 * A small "taking on new clients" bubble, fixed bottom left. It arrives with
 * the work section and goes again when the "You own it" band, which has its
 * own way in to contact, comes on screen. Same badge and same hover as the
 * one in the hero.
 */
export default function FloatingCta() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#work',
      start: 'top 8%',
      endTrigger: '#you-own-it',
      end: 'top 85%',
      onToggle: (self) => setShown(self.isActive),
    })
    return () => trigger.kill()
  }, [])

  return (
    <div className="floating-cta" data-shown={shown} inert={!shown}>
      <StatusCta
        label={site.statusShort}
        fontSize="clamp(0.68rem, 0.8vw, 0.78rem)"
        active={shown}
        className="bg-bg"
      />
    </div>
  )
}
