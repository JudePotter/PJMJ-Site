'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { frameTextClass, projects } from '@/content/projects'
import { registerProjectNav, scrollToY } from '@/lib/lenis'
import { canAutoplayVideo } from '@/lib/media'
import {
  EASE_OUT,
  EASE_WIPE,
  REDUCED_MQ,
  SCRUB,
  SNAP_GLIDE,
  SNAP_IDLE,
  SNAP_THRESHOLD,
  WORK_PIN_MQ,
} from '@/lib/scrollFeel'
import Reveal from '../Reveal'
import DeviceStage from './DeviceStage'
import { ProjectTags, VisitLink } from './ProjectMeta'

const N = projects.length

/*
 * The pinned timeline runs in "project units". Project i is the active one
 * from i to i + HOLD, then the next project wipes in over TRANS units.
 * STEP_VH is how much scroll (in screen heights) one unit costs.
 */
const HOLD = 0.4
const TRANS = 0.6
const STEP_VH = 0.9

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The work field. Two layouts from one set of data:
 *
 * - Big screens: the section pins while you scroll through all six projects.
 *   The frame wipes from one project to the next, its colour tweens to the
 *   client's, and the index on the left shifts so the new name grows.
 * - Everything else: plain stacked cards, image on top, text underneath.
 *
 * The media query that picks between them lives in WORK_PIN_MQ.
 */
export default function WorkField() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const pinnedVideos = useRef<(HTMLVideoElement | null)[]>([])
  const stackVideos = useRef<(HTMLVideoElement | null)[]>([])
  const goToRef = useRef<(index: number) => void>(() => {})

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const mm = gsap.matchMedia()

    mm.add({ pinned: WORK_PIN_MQ, reduce: REDUCED_MQ }, (ctx) => {
      const { pinned, reduce } = (ctx.conditions ?? {}) as Record<
        string,
        boolean
      >

      if (!pinned) {
        // Stacked cards: nothing to scrub, just let the index jump to a card.
        registerProjectNav((i) => {
          const card = section.querySelector<HTMLElement>(`[data-card="${i}"]`)
          if (card) {
            scrollToY(card.getBoundingClientRect().top + window.scrollY - 24)
          }
        })
        return () => registerProjectNav(null)
      }

      const stage = stageRef.current
      const frame = frameRef.current
      const left = leftRef.current
      const counter = counterRef.current
      if (!stage || !frame || !left || !counter) return

      const q = gsap.utils.selector(stage)
      const slides = q('[data-slide]') as HTMLElement[]
      const rows = q('[data-row]') as HTMLElement[]
      const smalls = q('[data-small]') as HTMLElement[]
      const bigs = q('[data-big]') as HTMLElement[]

      // Row heights are measured, not guessed, and re-measured on every
      // ScrollTrigger refresh (resize, fonts loading).
      const collapsed = () => smalls[0].offsetHeight + 10
      const expanded = (i: number) => bigs[i].offsetHeight + 24

      // Which project is active, and whether the section is on screen. The
      // active project's video plays and the rest pause.
      let active = 0
      let inView = false

      // Videos start downloading only once they are needed (preload="none"
      // in DeviceStage), so the active one and the next one are fetched ahead
      // of time. That way a video is ready to play the moment you land on it.
      const warm = (i: number) => {
        const video = pinnedVideos.current[i]
        if (!video || video.dataset.warm || reduce || !canAutoplayVideo())
          return
        video.dataset.warm = 'true'
        video.preload = 'auto'
        video.load()
      }

      const syncVideos = () => {
        if (inView) {
          warm(active)
          warm(active + 1)
        }
        pinnedVideos.current.forEach((video, i) => {
          if (!video) return
          if (inView && !reduce && i === active && canAutoplayVideo())
            video.play().catch(() => {})
          else video.pause()
        })
      }

      const setActive = (index: number) => {
        if (index === active) return
        active = index
        counter.textContent = pad(index + 1)
        ctx.add(() => {
          gsap.fromTo(
            counter,
            { yPercent: 80, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: EASE_OUT,
              overwrite: true,
            },
          )
        })
        rows.forEach((row, j) => {
          if (j === index) row.setAttribute('aria-current', 'true')
          else row.removeAttribute('aria-current')
        })
        syncVideos()
      }

      gsap.set(frame, { transformOrigin: '50% 55%' })
      if (reduce) gsap.set(slides, { clipPath: 'none' })

      // Entry: the frame scales up from smaller as the section arrives, so it
      // feels like falling into the work. Reduced motion skips the scale.
      if (reduce) {
        gsap.set(left, { autoAlpha: 1 })
      } else {
        gsap.fromTo(
          frame,
          { scale: 0.84 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 98%',
              end: 'top 20%',
              scrub: SCRUB,
            },
          },
        )
        gsap.fromTo(
          left,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 90%',
              end: 'top 35%',
              scrub: SCRUB,
            },
          },
        )
      }

      const total = N - 1 + HOLD
      const tl: gsap.core.Timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${Math.round(total * window.innerHeight * STEP_VH)}`,
          pin: true,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          // A project becomes the active one halfway through its wipe in.
          const passed = Math.floor(tl.time() - (HOLD + TRANS / 2)) + 1
          setActive(Math.min(N - 1, Math.max(0, passed)))
        },
      })

      for (let i = 0; i < N - 1; i++) {
        const next = i + 1
        const at = i + HOLD
        // From the second transition on, a property already has an earlier
        // tween that owns its starting value, so these must not render early.
        const later = i > 0

        // The next project wipes in from the bottom (a clip path reveal).
        // Each slide carries its own background colour, so the new client's
        // colour arrives together with its artwork and no strip of the wrong
        // colour shows beside it. Reduced motion crossfades instead.
        if (reduce) {
          tl.fromTo(
            slides[next],
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: TRANS, ease: 'power1.inOut' },
            at,
          )
        } else {
          tl.fromTo(
            slides[next],
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: TRANS,
              ease: EASE_WIPE,
            },
            at,
          )
          // Drift: the artwork settles a little as the wipe passes.
          tl.fromTo(
            slides[next].querySelector('.stage-media'),
            { yPercent: 5, scale: 1.03 },
            { yPercent: 0, scale: 1, duration: TRANS, ease: EASE_OUT },
            at,
          )
        }
        tl.set(slides[i], { autoAlpha: 0 }, at + TRANS)

        // Corner labels crossfade.
        tl.fromTo(
          q(`[data-label="${i}"]`),
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -8,
            duration: TRANS * 0.45,
            ease: 'power2.in',
            immediateRender: !later,
          },
          at,
        )
        tl.fromTo(
          q(`[data-label="${next}"]`),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: TRANS * 0.5, ease: 'power2.out' },
          at + TRANS * 0.5,
        )

        // The index shifts: the old row closes up and fades to ghost, the new
        // row opens and its name grows in. Description and tags crossfade.
        tl.fromTo(
          rows[i],
          { height: () => expanded(i) },
          {
            height: () => collapsed(),
            duration: TRANS,
            ease: EASE_WIPE,
            immediateRender: !later,
          },
          at,
        )
        tl.fromTo(
          rows[next],
          { height: () => collapsed() },
          { height: () => expanded(next), duration: TRANS, ease: EASE_WIPE },
          at,
        )
        tl.fromTo(
          bigs[i],
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -12,
            duration: TRANS * 0.4,
            ease: 'power2.in',
            immediateRender: !later,
          },
          at,
        )
        tl.fromTo(
          smalls[i],
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: TRANS * 0.5,
            ease: 'power1.out',
            immediateRender: !later,
          },
          at + TRANS * 0.5,
        )
        tl.fromTo(
          smalls[next],
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: TRANS * 0.4, ease: 'power1.in' },
          at,
        )
        tl.fromTo(
          bigs[next],
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: TRANS * 0.55, ease: 'power2.out' },
          at + TRANS * 0.45,
        )
      }

      // The last project holds before the stage lets go.
      tl.to({}, { duration: HOLD }, N - 1)

      const st = tl.scrollTrigger
      if (!st) return

      // Where each client sits on the page (px). Measured fresh on every call,
      // because ScrollTrigger re-measures on resize.
      const restY = (index: number) =>
        st.start + (index / total) * (st.end - st.start) + (index > 0 ? 4 : 0)

      const goTo = (index: number) => scrollToY(restY(index))
      goToRef.current = goTo
      registerProjectNav(goTo)

      // Lock onto one client at a time, so nobody has to scroll down and back
      // up to see a video. Nothing is forced: it only happens once the scroll
      // has been still for a moment inside the pinned range, and a scroll that
      // keeps going carries straight on. Reduced motion keeps plain scrolling.
      let snapTimer: number | undefined
      let lastY = window.scrollY
      let startY = lastY
      let moving = false
      let heading = 0

      const settle = () => {
        moving = false
        const y = window.scrollY
        const rests = projects.map((_, i) => restY(i))
        if (y < rests[0] - 1 || y > st.end + 1) return

        let target: number
        const cameFromInside = startY >= rests[0] - 1 && startY <= st.end + 1
        if (
          cameFromInside &&
          heading > 0 &&
          y > rests[N - 1] + SNAP_THRESHOLD
        ) {
          return // heading out past the last client: let the page go
        }

        let behind = 0
        rests.forEach((rest, i) => {
          if (rest <= y + 0.5) behind = i
        })
        const ahead = Math.min(behind + 1, N - 1)

        if (!cameFromInside) {
          // Just arrived from above or below: land on whichever is nearest.
          target = y - rests[behind] > rests[ahead] - y ? ahead : behind
        } else if (heading >= 0) {
          target = y - rests[behind] > SNAP_THRESHOLD ? ahead : behind
        } else {
          target =
            ahead > behind && rests[ahead] - y > SNAP_THRESHOLD ? behind : ahead
        }
        if (Math.abs(rests[target] - y) > 1)
          scrollToY(rests[target], SNAP_GLIDE)
      }

      const onScroll = () => {
        const y = window.scrollY
        if (!moving) {
          moving = true
          startY = lastY
        }
        if (y !== lastY) {
          heading = y > lastY ? 1 : -1
          lastY = y
        }
        window.clearTimeout(snapTimer)
        snapTimer = window.setTimeout(settle, SNAP_IDLE)
      }
      if (!reduce)
        window.addEventListener('scroll', onScroll, { passive: true })

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          inView = self.isActive
          syncVideos()
        },
      })

      return () => {
        window.removeEventListener('scroll', onScroll)
        window.clearTimeout(snapTimer)
        registerProjectNav(null)
        goToRef.current = () => {}
        pinnedVideos.current.forEach((video) => video?.pause())
        counter.textContent = pad(1)
      }
    })

    return () => mm.revert()
  }, [])

  // Stacked cards: play a card's video while it is mostly on screen.
  useEffect(() => {
    if (window.matchMedia(REDUCED_MQ).matches || !canAutoplayVideo()) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) video.play().catch(() => {})
          else video.pause()
        }
      },
      { threshold: 0.55 },
    )
    stackVideos.current.forEach((video) => video && observer.observe(video))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={sectionRef} aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">
        Selected work
      </h2>
      {/* Big screens: pinned. The wrapper trims the empty space around the
          frame (see .work-pull in globals.css). */}
      <div className="work-pull">
        <div ref={stageRef} className="work-pinned h-svh">
          <div className="work-grid">
            <div
              ref={leftRef}
              className="work-left work-frame-h flex flex-col justify-between"
            >
              <div>
                <p className="t-label">
                  Selected work ·{' '}
                  <span className="inline-block overflow-hidden align-bottom">
                    <span ref={counterRef} className="inline-block">
                      01
                    </span>
                  </span>{' '}
                  / {pad(N)}
                </p>

                <ol className="mt-7">
                  {projects.map((project, i) => (
                    <li
                      key={project.slug}
                      data-row={i}
                      className="idx-row"
                      aria-current={i === 0 ? 'true' : undefined}
                    >
                      <button
                        type="button"
                        data-small
                        className="idx-small"
                        onClick={() => goToRef.current(i)}
                      >
                        {project.name}
                      </button>
                      <div data-big className="idx-big invisible opacity-0">
                        <h3 className="idx-name">{project.name}</h3>
                        <p className="mt-3.5 text-[0.9rem] leading-[1.5] text-body">
                          {project.description}
                        </p>
                        <ProjectTags tags={project.tags} />
                        <VisitLink project={project} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p
                className="t-label text-body"
                style={{ textTransform: 'none' }}
              >
                scroll ↑↓
              </p>
            </div>

            <div
              ref={frameRef}
              className="work-frame work-frame-h rounded-xl"
              style={{ backgroundColor: projects[0].frameColor }}
            >
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  data-slide={i}
                  className="absolute inset-0"
                  style={{
                    zIndex: i + 1,
                    backgroundColor: project.frameColor,
                  }}
                >
                  <DeviceStage
                    project={project}
                    sizes="(min-width: 1024px) 1075px, 100vw"
                    videoRef={(el) => {
                      pinnedVideos.current[i] = el
                    }}
                  />
                </div>
              ))}

              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between p-[clamp(1rem,2vw,1.9rem)] text-[0.875rem] leading-[1.3]">
                <div className="grid">
                  {projects.map((project, i) => (
                    <div
                      key={project.slug}
                      data-label={i}
                      className={frameTextClass(project.frameColor)}
                      style={{ gridArea: '1 / 1' }}
                    >
                      {project.tags.map((tag) => (
                        <div key={tag}>{tag}</div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="grid text-right">
                  {projects.map((project, i) => (
                    <div
                      key={project.slug}
                      data-label={i}
                      className={frameTextClass(project.frameColor)}
                      style={{ gridArea: '1 / 1' }}
                    >
                      <div>{project.name}</div>
                      <div>{project.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Everything else: stacked cards. */}
      <div className="work-stacked px-(--gutter) pt-[clamp(1.25rem,3vw,2.5rem)]">
        <p className="t-label mb-8">Selected work</p>
        <ol className="flex flex-col gap-14">
          {projects.map((project, i) => {
            const card = (
              <>
                <div
                  className="work-frame aspect-[5/4] rounded-xl"
                  style={{ backgroundColor: project.frameColor }}
                >
                  <DeviceStage
                    project={project}
                    sizes="100vw"
                    eager={i === 0}
                    videoRef={(el) => {
                      stackVideos.current[i] = el
                    }}
                  />
                </div>

                <div className="mt-6">
                  <h3 className="idx-name">{project.name}</h3>
                  <p className="t-label mt-3 text-body">
                    {project.sector} · {project.date}
                  </p>
                  <p className="mt-4 max-w-[34em] text-[0.95rem] leading-[1.5] text-body">
                    {project.description}
                  </p>
                  <ProjectTags tags={project.tags} />
                  <VisitLink project={project} />
                </div>
              </>
            )

            // The first card can be on screen at load on a phone, so it must
            // not wait on JavaScript to appear. The rest roll up on scroll.
            return (
              <li key={project.slug} data-card={i}>
                {i === 0 ? card : <Reveal>{card}</Reveal>}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
