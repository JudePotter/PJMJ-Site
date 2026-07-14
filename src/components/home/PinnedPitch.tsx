import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export function PinnedPitch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])

  const layer1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1])
  const layer2Opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 1])
  const layer3Opacity = useTransform(scrollYProgress, [0.55, 0.8, 1], [0, 1, 1])

  return (
    <section ref={containerRef} className="relative md:h-[150vh]">
      <div className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center md:sticky md:top-0 md:h-screen md:gap-4 md:overflow-hidden md:px-12 md:py-0">
        <motion.p
          style={{ y: layer1Y, opacity: layer1Opacity }}
          className="display text-4xl md:text-7xl"
        >
          For your brand,
        </motion.p>
        <motion.p
          style={{ y: layer2Y, opacity: layer2Opacity }}
          className="display text-4xl text-racing md:text-7xl"
        >
          not just launch week.
        </motion.p>
        <motion.p
          style={{ y: layer3Y, opacity: layer3Opacity }}
          className="display text-4xl text-gold md:text-7xl"
        >
          Made well. Kept well.
        </motion.p>
      </div>
    </section>
  )
}
