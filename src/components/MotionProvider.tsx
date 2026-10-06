'use client'

import { LazyMotion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

const loadFeatures = () =>
  import('@/lib/motionFeatures').then((module) => module.default)

/**
 * Motion is for small UI interactions only. It loads lazily, with just the
 * hover and tap features, and with reduced motion it drops the movement.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
