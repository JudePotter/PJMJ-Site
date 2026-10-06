'use client'

import { useLayoutEffect, useRef } from 'react'
import { m } from 'motion/react'
import { gsap } from '@/lib/gsap'
import {
  EASE,
  EASE_OUT,
  FULL_MOTION_MQ,
  REDUCED_MQ,
  SCRUB,
} from '@/lib/scrollFeel'
import { site } from '@/content/site'

export default function OwnItBand() {
  const rootRef = useRef<HTMLElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const band = bandRef.current
    if (!root || !band) return
    const q = gsap.utils.selector(band)
    const lines = q('.band-line-inner')
    const rest = q('[data-band-in]')
    const mm = gsap.matchMedia()

    mm.add(FULL_MOTION_MQ, () => {
      // The band scales up slightly as it enters, then the heading splits and
      // reveals line by line.
      gsap.fromTo(
        band,
        { scale: 0.94, transformOrigin: '50% 100%' },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: band,
            start: 'top bottom',
            end: 'top 55%',
            scrub: SCRUB,
          },
        },
      )

      gsap
        .timeline({
          defaults: { ease: EASE_OUT },
          scrollTrigger: { trigger: band, start: 'top 72%', once: true },
        })
        .fromTo(
          lines,
          { yPercent: 118, autoAlpha: 1 },
          { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.14 },
          0,
        )
        .fromTo(
          rest,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
          0.35,
        )
    })

    mm.add(REDUCED_MQ, () => {
      gsap.set(lines, { yPercent: 0 })
      gsap.fromTo(
        [...lines, ...rest],
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power1.out',
          scrollTrigger: { trigger: band, start: 'top 80%', once: true },
        },
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="you-own-it"
      ref={rootRef}
      aria-labelledby="own-heading"
      className="px-(--gutter) pt-[clamp(3.5rem,6vw,5.5rem)] pb-[clamp(3rem,5vw,4.5rem)]"
    >
      <div
        ref={bandRef}
        className="grid items-center gap-10 rounded-[clamp(1.25rem,2.1vw,1.9rem)] bg-cobalt px-[clamp(1.5rem,5.1vw,4.6rem)] py-[clamp(2.5rem,5vw,4.25rem)] text-white md:grid-cols-[1.15fr_1fr] md:gap-[4vw]"
      >
        <h2
          id="own-heading"
          className="t-display"
          style={{ fontSize: 'var(--fs-band)' }}
        >
          <span className="band-line">
            <span className="band-line-inner">You own it.</span>
          </span>{' '}
          <span className="band-line">
            <span className="band-line-inner t-accent text-lime">
              All of it.
            </span>
          </span>
        </h2>

        <div>
          <p
            data-band-in
            className="max-w-[34em] text-[1.0625rem] leading-[1.45] md:text-[1.125rem]"
          >
            Every line of code, every login, your own GitHub repo. No lock in.
            Each build is quoted to the job, then a simple monthly fee keeps it
            running and looked after, so your site never gets left to rot. Tell
            us what you need and we’ll come back with a number.
          </p>
          {/* GSAP animates this wrapper in, Motion handles the hover on the
              link inside it, so the two never fight over transform. */}
          <div
            data-band-in
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <m.a
              href={`mailto:${site.email}?subject=New%20project`}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-[0.9375rem] font-semibold text-ink"
            >
              Start a project
              <m.span
                aria-hidden="true"
                variants={{ hover: { x: 4 } }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                →
              </m.span>
            </m.a>
            <p className="text-[1.0625rem] leading-[1.3] md:text-[1.125rem]">
              <span className="text-white/75">or email </span>
              <a
                href={`mailto:${site.email}`}
                className="font-medium underline decoration-white/40 underline-offset-[0.28em] transition-colors duration-300 hover:decoration-lime"
              >
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
