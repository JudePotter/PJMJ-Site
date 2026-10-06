'use client'

import { useLayoutEffect, useRef } from 'react'
import { projects } from '@/content/projects'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { scrollToProject, scrollToY } from '@/lib/lenis'

const COLUMN_LABEL = 't-label text-muted-dark'
const LINK =
  'block text-left text-[0.9375rem] leading-[1.9] text-footer-text transition-colors duration-300 hover:text-lime'

/**
 * The footer. It is fixed to the bottom of the screen, behind the page shell,
 * so it is hidden until the very end of the page, when the shell lifts away
 * and uncovers it. It measures itself and publishes its height as --footer-h,
 * which the shell uses as its bottom margin so the last scroll position shows
 * the whole footer. Same mechanism as the Dental Growth Lab footer.
 */
export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const wordBoxRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const footer = ref.current
    const box = wordBoxRef.current
    const word = wordRef.current
    if (!footer || !box || !word) return
    const root = document.documentElement

    // The letters sit in the same clipping masks as the hero wordmark, so the
    // round ones (P, S, o) are shaved flat on their right edge, the same as in
    // the header. That makes the visible width the width of the boxes, less
    // the gap the first letter's left side bearing leaves.
    const leftBearing = () => {
      const context = document.createElement('canvas').getContext('2d')
      const first = [...site.name][0]
      if (!context || !first) return 0
      const style = getComputedStyle(word)
      context.font = `${style.fontWeight} 100px ${style.fontFamily}`
      return -context.measureText(first).actualBoundingBoxLeft
    }

    // Size the giant wordmark so its visible edges meet the page margins.
    const fit = () => {
      word.style.fontSize = '100px'
      word.style.marginLeft = '0'
      const bearing = leftBearing()
      const ink = word.getBoundingClientRect().width - bearing
      if (ink <= 0) return
      const size = Math.min(
        (100 * box.clientWidth) / ink,
        window.innerHeight * 0.42,
      )
      word.style.fontSize = `${size}px`
      word.style.marginLeft = `${(-bearing * size) / 100}px`
    }

    let lastWidth = 0
    const publish = () => {
      if (box.clientWidth !== lastWidth) {
        lastWidth = box.clientWidth
        fit()
      }
      const height = footer.offsetHeight
      // If the footer is ever taller than the screen, let it flow after the
      // page instead of sitting fixed behind it, so nothing is cut off.
      const tooTall = height > window.innerHeight
      footer.toggleAttribute('data-static', tooTall)
      root.style.setProperty('--footer-h', tooTall ? '0px' : `${height}px`)
    }

    publish()
    footer.setAttribute('data-ready', '')
    const observer = new ResizeObserver(publish)
    observer.observe(footer)
    window.addEventListener('resize', publish)
    document.fonts?.ready
      .then(() => {
        lastWidth = 0
        publish()
      })
      .catch(() => {})

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', publish)
      root.style.removeProperty('--footer-h')
    }
  }, [])

  const goToProject = (index: number) => {
    if (scrollToProject(index)) return
    const work = document.getElementById('work')
    if (work) scrollToY(work.getBoundingClientRect().top + window.scrollY)
  }

  return (
    <footer ref={ref} className="site-footer overflow-x-clip">
      <div className="relative px-(--gutter) pt-[clamp(2.5rem,6vh,5rem)] pb-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <p className="max-w-[10.5em] text-[clamp(1.6rem,2.5vw,2.25rem)] leading-[1.12] font-medium tracking-[-0.035em] text-footer-text">
              Got something in mind?
              <br />
              Let’s have a chat.
            </p>
            <p className="mt-5 max-w-[26em] text-[0.875rem] leading-[1.55] text-muted-dark">
              {site.about}
            </p>
          </div>

          <nav aria-label="Work">
            <p className={COLUMN_LABEL}>Work</p>
            <ul className="mt-3">
              {projects.map((project, i) => (
                <li key={project.slug}>
                  <button
                    type="button"
                    onClick={() => goToProject(i)}
                    className={LINK}
                  >
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className={COLUMN_LABEL}>Services</p>
            <ul className="mt-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a href="#services" className={LINK}>
                    {service.short}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <p className={COLUMN_LABEL}>Contact</p>
            <ul className="mt-3">
              <li>
                <a href={`mailto:${site.email}`} className={LINK}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneTel}`} className={LINK}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.googleProfile}
                  target="_blank"
                  rel="noopener"
                  className={LINK}
                >
                  Find us on Google
                </a>
              </li>
              {site.googleReview && (
                <li>
                  <a
                    href={site.googleReview}
                    target="_blank"
                    rel="noopener"
                    className={LINK}
                  >
                    Leave us a review
                  </a>
                </li>
              )}
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-[0.9375rem] leading-[1.9] text-footer-text">
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div
          ref={wordBoxRef}
          aria-hidden="true"
          className="mt-[clamp(2rem,6vh,4.5rem)] overflow-x-clip"
        >
          <span
            ref={wordRef}
            className="t-display inline-block whitespace-nowrap text-lime"
            style={{ fontSize: '19vw' }}
          >
            {[...site.name].map((ch, i) =>
              ch === ' ' ? (
                <span key={i} className="inline-block w-[0.2em]">
                  {' '}
                </span>
              ) : (
                <span key={i} className="hero-mask">
                  <span className="inline-block">{ch}</span>
                </span>
              ),
            )}
          </span>
        </div>

        <div className="t-label mt-4 flex justify-between gap-4 text-muted-dark">
          <p>
            © {site.name} {site.year}
          </p>
          <p>Hand coded in Brighton</p>
        </div>
      </div>
    </footer>
  )
}
