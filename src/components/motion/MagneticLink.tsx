import { type ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from './useReducedMotion'

type MagneticLinkProps = {
  children: ReactNode
  className?: string
  radius?: number
  strength?: number
} & Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'className' | 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
>

export function MagneticLink({
  children,
  className = '',
  radius = 80,
  strength = 0.4,
  ...anchorProps
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = event.clientX - centerX
    const distY = event.clientY - centerY
    const distance = Math.hypot(distX, distY)

    if (distance < radius) {
      x.set(distX * strength)
      y.set(distY * strength)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (reducedMotion) {
    return (
      <a ref={ref} className={className} data-magnet {...anchorProps}>
        {children}
      </a>
    )
  }

  return (
    <motion.a
      ref={ref}
      className={className}
      data-magnet
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      {...anchorProps}
    >
      {children}
    </motion.a>
  )
}
