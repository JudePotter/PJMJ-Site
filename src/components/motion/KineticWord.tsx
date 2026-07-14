import { createElement } from 'react'
import { motion } from 'motion/react'
import { EASE, usePrefersReducedMotion } from './useReducedMotion'

type KineticWordProps = {
  text: string
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  finalPeriodClassName?: string
  lastWordClassName?: string
}

export function KineticWord({
  text,
  delay = 0,
  className = '',
  as = 'span',
  finalPeriodClassName,
  lastWordClassName,
}: KineticWordProps) {
  const reducedMotion = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reducedMotion) {
    return createElement(
      as,
      { className },
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay }}
      >
        {text}
      </motion.span>,
    )
  }

  let letterIndex = 0

  return createElement(
    as,
    { className },
    words.map((word, wordIdx) => {
      const isLast = wordIdx === words.length - 1
      const letters = word.split('')
      return (
        <span
          key={`${word}-${wordIdx}`}
          className={`inline-block overflow-hidden align-bottom pb-[0.08em] ${
            isLast && lastWordClassName ? lastWordClassName : ''
          }`}
        >
          <span className="inline-block">
            {letters.map((letter, i) => {
              const isFinalPeriod = isLast && letter === '.' && i === letters.length - 1
              const currentIndex = letterIndex
              letterIndex += 1
              return (
                <motion.span
                  key={i}
                  className={`inline-block ${isFinalPeriod && finalPeriodClassName ? finalPeriodClassName : ''}`}
                  initial={{ y: '110%', rotate: 8 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: delay + currentIndex * 0.04,
                  }}
                >
                  {letter}
                </motion.span>
              )
            })}
          </span>
          {!isLast && ' '}
        </span>
      )
    }),
  )
}
