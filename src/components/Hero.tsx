'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { m } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { EASE, FULL_MOTION_MQ, SCRUB } from '@/lib/scrollFeel'
import { nav, site } from '@/content/site'
import PetalMark from './PetalMark'
import StatusCta from './StatusCta'

const WORD = 'PJMJ Studio'

/** Delay and rise for the CSS intro (see .hero-in in globals.css). */
const intro = (delay: string, rise = '24px') =>
  ({ '--delay': delay, '--rise': rise }) as CSSProperties

/**
 * The hero intro is pure CSS (globals.css), so it plays the moment the page
 * paints. The only JavaScript here is the petal turning slowly as you scroll
 * the whole page, and the nav hover nudge.
 */
export default function Hero() {
  const petalRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const petal = petalRef.current
    if (!petal) return
    const mm = gsap.matchMedia()

    mm.add(FULL_MOTION_MQ, () => {
      gsap.to(petal, {
        rotation: 720,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: 'max',
          scrub: SCRUB,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <header className="px-(--gutter) pt-[clamp(1.25rem,4.8vw,4.4rem)] pb-[clamp(1rem,2vw,1.75rem)]">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
        <h1
          className="t-display flex items-center whitespace-nowrap text-ink"
          style={{ fontSize: 'var(--fs-wordmark)' }}
        >
          {/* The outer span lines the mark up with the lettering. The inner
              one spins, about the middle of the flower. */}
          <span className="mr-[0.1em] -mt-[0.06em] inline-block h-[0.9em] w-[0.9em] shrink-0">
            <span
              ref={petalRef}
              aria-hidden="true"
              className="block h-full w-full will-change-transform"
            >
              <span className="hero-petal block h-full w-full">
                <PetalMark className="h-full w-full" />
              </span>
            </span>
          </span>
          {/* The real heading text, for screen readers and search engines. The
              lettering below is drawn per letter, so it is hidden from both. */}
          <span className="sr-only">{site.name}, Brighton web developer</span>
          <span aria-hidden="true">
            {[...WORD].map((ch, i) =>
              ch === ' ' ? (
                <span key={i} className="inline-block w-[0.2em]">
                  {' '}
                </span>
              ) : (
                <span key={i} className="hero-mask">
                  <span
                    className="hero-letter"
                    style={{ '--i': i } as CSSProperties}
                  >
                    {ch}
                  </span>
                </span>
              ),
            )}
            <span className="hero-mask">
              <span
                className="hero-letter text-cobalt"
                style={{ '--i': WORD.length } as CSSProperties}
              >
                .
              </span>
            </span>
          </span>
        </h1>

        <nav aria-label="Primary" className="md:pt-[0.4vw]">
          <ul className="flex flex-wrap gap-x-5 md:flex-col md:items-end md:gap-y-0.5">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className="hero-in"
                style={intro(`${1 + i * 0.08}s`, '10px')}
              >
                <m.a
                  href={item.href}
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`block py-1.5 leading-[1.25] transition-colors duration-300 hover:text-ink md:py-0.5 xl:py-0 ${
                    i === 0 ? 'text-ink' : 'text-grey'
                  }`}
                  style={{ fontSize: 'var(--fs-nav)' }}
                >
                  {item.label}
                </m.a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <p
          className="hero-in leading-[1.14] tracking-[-0.025em] text-ink"
          style={{ fontSize: 'var(--fs-strap)', ...intro('0.75s') }}
        >
          <span className="block">
            We build websites people{' '}
            <mark className="hero-mark t-accent rounded-[0.14em] px-[0.2em] py-[0.02em] text-ink [box-decoration-break:clone]">
              actually remember.
            </mark>
          </span>
          <span className="block max-w-[20em]">
            Hand coded in Brighton for businesses that don’t do templates.
          </span>
        </p>

        {/* Availability is the thing a visitor most needs to know, so it is a
            badge of its own, and it doubles as the way in to the contact
            section. The wrapper takes the intro fade so the link's own hover
            animation never restarts it. */}
        <div className="hero-in w-fit" style={intro('1.1s', '12px')}>
          <StatusCta
            label={site.status}
            fontSize="clamp(0.72rem, 0.935vw, 0.935rem)"
            className="text-balance sm:whitespace-nowrap"
          />
        </div>
      </div>
    </header>
  )
}
