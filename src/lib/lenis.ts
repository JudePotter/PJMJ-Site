import type Lenis from 'lenis'
import { SCROLL_JUMP_GLIDE } from './scrollFeel'

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

let instance: Lenis | null = null

/** SmoothScroll registers its Lenis instance here so any component can scroll. */
export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

/** Scroll to a position (px), gliding when Lenis is running. */
export function scrollToY(y: number, duration = SCROLL_JUMP_GLIDE) {
  if (instance) {
    instance.scrollTo(y, {
      duration,
      easing: easeOutCubic,
      force: true,
    })
  } else {
    window.scrollTo({ top: y })
  }
}

/**
 * The work field registers a "go to project n" function here, so the index and
 * the footer can jump straight to a project instead of just to the section.
 */
let goToProject: ((index: number) => void) | null = null

export function registerProjectNav(fn: ((index: number) => void) | null) {
  goToProject = fn
}

/** Returns true if it handled the jump. */
export function scrollToProject(index: number) {
  if (!goToProject) return false
  goToProject(index)
  return true
}
