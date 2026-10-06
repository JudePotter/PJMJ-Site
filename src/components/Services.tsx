'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { EASE_OUT, FULL_MOTION_MQ, REDUCED_MQ } from '@/lib/scrollFeel'
import { services } from '@/content/services'

export default function Services() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const q = gsap.utils.selector(root)
    const head = q('[data-svc-head]')
    const lines = q('.svc-line')
    const rows = q('.svc-content')
    const mm = gsap.matchMedia()

    mm.add(FULL_MOTION_MQ, () => {
      // Divider lines draw in left to right, then rows stagger up.
      gsap
        .timeline({
          defaults: { ease: EASE_OUT },
          scrollTrigger: { trigger: root, start: 'top 62%', once: true },
        })
        .fromTo(
          head,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0,
        )
        .fromTo(
          lines,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.3, ease: 'power3.inOut', stagger: 0.09 },
          0.2,
        )
        .fromTo(
          rows,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 },
          0.35,
        )
    })

    mm.add(REDUCED_MQ, () => {
      gsap.set(lines, { scaleX: 1 })
      gsap.fromTo(
        [...head, ...rows],
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power1.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        },
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="services"
      ref={rootRef}
      aria-labelledby="services-heading"
      className="px-(--gutter) pt-[clamp(3rem,6vw,5.5rem)]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2
          id="services-heading"
          data-svc-head
          className="t-display"
          style={{ fontSize: 'var(--fs-h2)' }}
        >
          What we do
        </h2>
        <p data-svc-head className="t-label text-body md:pb-3">
          Six things, done properly
        </p>
      </div>

      <ol className="mt-[clamp(2rem,4vw,3.5rem)]">
        {services.map((service, i) => (
          <li key={service.name} className="svc-row relative">
            <span className="svc-fill" aria-hidden="true" />
            <span className="svc-line top-0" aria-hidden="true" />
            {i === services.length - 1 && (
              <span className="svc-line bottom-0" aria-hidden="true" />
            )}
            <div className="svc-content relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-2 gap-y-3 py-6 md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,26rem)] md:py-8">
              <span className="t-label text-body">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="font-medium leading-[1.05] tracking-[-0.035em]"
                style={{ fontSize: 'var(--fs-service)' }}
              >
                {service.name}
              </h3>
              <p className="col-start-2 text-[0.95rem] leading-[1.45] text-body md:col-start-3 md:text-[1.0625rem]">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
