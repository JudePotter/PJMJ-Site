import { useEffect, useRef, useState } from 'react'
import { motion, useAnimate } from 'motion/react'
import { Logo } from '#/components/Logo'
import { EASE } from './useReducedMotion'

export const INTRO_SESSION_KEY = 'pjmj-intro-played'
export const INTRO_HTML_CLASS = 'pjmj-intro'
export const INTRO_SPLASH_ID = 'logo-splash'
export const INTRO_OVERLAY_ID = 'logo-intro-overlay'

type LogoIntroProps = {
  targetRef: React.RefObject<HTMLElement | null>
}

export function LogoIntro({ targetRef }: LogoIntroProps) {
  const [scope, animate] = useAnimate()
  const [active, setActive] = useState(false)
  const [landed, setLanded] = useState(false)
  const [startSize, setStartSize] = useState(280)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    if (!document.documentElement.classList.contains(INTRO_HTML_CLASS)) return
    if (!targetRef.current) return

    sessionStorage.setItem(INTRO_SESSION_KEY, '1')
    setStartSize(Math.min(320, Math.max(180, Math.min(window.innerWidth, window.innerHeight) * 0.4)))
    setActive(true)
  }, [targetRef])

  useEffect(() => {
    if (!active || !scope.current || !targetRef.current) return

    // The real site is still hidden behind the blocking-script CSS at this
    // point; the overlay we just rendered is already opaque on top of it, so
    // it's safe to reveal the site now without any flash underneath.
    document.documentElement.classList.remove(INTRO_HTML_CLASS)
    document.getElementById(INTRO_SPLASH_ID)?.style.setProperty('display', 'none')

    const target = targetRef.current.getBoundingClientRect()
    const body = document.body
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const run = async () => {
      try {
        await animate(
          scope.current,
          { scale: [0, 1.2, 0.92, 1], rotate: [-280, 16, -8, 0], opacity: [0, 1, 1, 1] },
          { duration: 1.1, times: [0, 0.55, 0.8, 1], ease: 'circOut' },
        )
        await animate(scope.current, { scale: [1, 1.06, 1] }, { duration: 0.55, ease: 'easeInOut' })

        const targetX = target.left + target.width / 2 - window.innerWidth / 2
        const targetY = target.top + target.height / 2 - window.innerHeight / 2
        const targetScale = target.width / startSize

        setLanded(true)
        await animate(
          scope.current,
          { x: targetX, y: targetY, scale: targetScale, rotate: 360 },
          { duration: 0.9, ease: EASE },
        )
      } finally {
        body.style.overflow = previousOverflow
        setActive(false)
      }
    }

    void run()

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [active, animate, scope, startSize, targetRef])

  if (!active) return null

  return (
    <div
      id={INTRO_OVERLAY_ID}
      className={`fixed inset-0 z-[200] flex items-center justify-center ${landed ? 'pointer-events-none' : ''}`}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 bg-paper"
        initial={{ opacity: 1 }}
        animate={{ opacity: landed ? 0 : 1 }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeInOut' }}
      />
      <div
        ref={scope}
        style={{ width: startSize, height: startSize, opacity: 0, transform: 'scale(0) rotate(-280deg)' }}
        className="relative flex items-center justify-center"
      >
        <Logo
          size={startSize}
          className="h-auto w-full drop-shadow-[0_0_50px_rgba(211,175,55,0.4)]"
        />
      </div>
    </div>
  )
}
