import { motion } from 'motion/react'
import { usePrefersReducedMotion } from './useReducedMotion'

type MarqueeProps = {
  items: string[]
  reverse?: boolean
  speed?: number
  className?: string
}

export function Marquee({ items, reverse = false, speed = 28, className = '' }: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion()
  const loop = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={reducedMotion ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span key={i} className="display inline-flex items-center px-3 text-base md:text-2xl">
            {item}
            <span className="px-3 text-gold" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
