/**
 * The feel of scrolling, in one place. Same numbers and curves as the Dental
 * Growth Lab build, so both sites move the same way.
 *
 * Two layers of smoothing stack up, and the sum of them is how far the page
 * trails your hand:
 *
 * 1. SCROLL_GLIDE: how long the page keeps gliding after the wheel stops
 *    (Lenis).
 * 2. SCRUB: how long scroll linked animations take to catch up to the scroll
 *    position (GSAP). Low enough that they land with the scroll.
 *
 * Raise either number for a floatier feel, lower it for a tighter one.
 */
export const SCROLL_GLIDE = 0.8
/** Glide for jumps from the nav and in page links, which cover more ground. */
export const SCROLL_JUMP_GLIDE = 1.05
export const SCRUB = 0.2

/**
 * The work field locks onto one client at a time. When the scroll stops inside
 * it, the page glides to the nearest client, or on to the next one if you were
 * heading that way.
 *
 * - SNAP_IDLE: how long the scroll must be still before it snaps (ms).
 * - SNAP_GLIDE: how long the glide to the client takes (seconds).
 * - SNAP_THRESHOLD: how far (px) past a client counts as "heading for the
 *   next one". Under it, the page settles back, so a nudge of the trackpad
 *   does not move you on, but one click of a wheel does.
 */
export const SNAP_IDLE = 120
export const SNAP_GLIDE = 0.9
export const SNAP_THRESHOLD = 32

/** Easing for Motion (cubic bezier). Same curve as GSAP's power4.out. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
/** The GSAP name for the same curve: reveals, rises, settles. */
export const EASE_OUT = 'power4.out'
/** Wipes and tweens that move something across the whole frame. */
export const EASE_WIPE = 'power3.inOut'

/**
 * The work field pins only on screens big enough to hold it. Keep in step
 * with the .work-pinned media query in globals.css.
 */
export const WORK_PIN_MQ = '(min-width: 1024px) and (min-height: 620px)'

export const REDUCED_MQ = '(prefers-reduced-motion: reduce)'
export const FULL_MOTION_MQ = '(prefers-reduced-motion: no-preference)'

/**
 * How long the availability badge waits, untouched, before it starts pulsing
 * to get noticed (milliseconds). It stops for good once it has been hovered.
 */
export const CTA_NUDGE_DELAY = 3000
