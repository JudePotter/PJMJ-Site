import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from './useReducedMotion'

export function CursorBlob() {
  const reducedMotion = usePrefersReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 120, damping: 18 })
  const springY = useSpring(y, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const query = window.matchMedia('(min-width: 769px) and (pointer: fine)')
    setIsDesktop(query.matches)
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isDesktop || reducedMotion) return

    const move = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)
      const target = event.target as HTMLElement
      setActive(Boolean(target.closest('a, button, [data-magnet]')))
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isDesktop, reducedMotion, visible, x, y])

  if (!isDesktop || reducedMotion) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 h-6 w-6 rounded-full bg-gold"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        filter: 'blur(6px)',
        mixBlendMode: 'multiply',
        opacity: visible ? 1 : 0,
      }}
      animate={{
        scale: active ? 3 : 1,
        opacity: active ? 0.55 : visible ? 0.9 : 0,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    />
  )
}
