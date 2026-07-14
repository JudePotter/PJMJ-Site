import { motion } from 'motion/react'
import { EASE } from '#/components/motion/useReducedMotion'

export function Manifesto() {
  return (
    <section className="w-full bg-racing py-28 text-paper md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="display text-3xl leading-tight md:text-6xl">
          We work fast, work smart, and exactly to your needs.
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-8 h-[2px] w-40 origin-left bg-gold"
        />
      </div>
    </section>
  )
}
