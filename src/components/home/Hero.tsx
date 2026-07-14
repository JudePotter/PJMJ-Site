import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { KineticWord } from '#/components/motion/KineticWord'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6])
  const filter = useTransform(blur, (value) => `blur(${value}px)`)

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-32 pb-16 md:pt-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full bg-gold/20 blur-[100px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full bg-racing/20 blur-[110px]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        style={{ scale, opacity, filter }}
        className="relative mx-auto flex max-w-[1400px] flex-col gap-10 px-6 md:px-12"
      >
        <p className="eyebrow">PJMJ Studios · Portfolio</p>

        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h1 className="display text-[11vw] leading-[0.95] font-normal md:text-[9rem]">
            <KineticWord as="div" text="PJMJ" />
            <KineticWord as="div" text="Studios." delay={0.15} finalPeriodClassName="text-gold" />
          </h1>

          <div className="max-w-sm shrink-0 md:pb-4">
            <p className="display text-xl text-racing md:text-2xl">
              Web Developer &amp; SEO Specialist
            </p>
            <p className="font-display mt-4 leading-relaxed font-light text-muted-foreground">
              A small studio building bespoke, editorial websites, designed to be found,
              made to last, and looked after long after launch.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
