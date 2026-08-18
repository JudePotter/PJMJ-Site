import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { KineticWord } from '#/components/motion/KineticWord'
import { ScrollReveal } from '#/components/motion/ScrollReveal'
import { Marquee } from '#/components/motion/Marquee'
import { TiltCard } from '#/components/motion/TiltCard'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact - PJMJ Studios' },
      {
        name: 'description',
        content:
          'One inbox, real replies, no funnel. Get in touch with PJMJ Studios about a build, retained SEO, or ongoing care.',
      },
      { property: 'og:title', content: 'Contact - PJMJ Studios' },
      {
        property: 'og:description',
        content:
          'One inbox, real replies, no funnel. Get in touch with PJMJ Studios about a build, retained SEO, or ongoing care.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Contact,
})

const paragraphs = [
  'No forms to fill in, no funnel to sit in. An email reaches a person who reads it and writes back, usually the same day.',
  'Some conversations turn into a build straight away. Others start as a rough idea, a question about SEO, or just a site that needs looking after; all of it is worth writing in about.',
  'Whatever the starting point, expect a proper reply: specific, honest about scope and timeline, and never a generic template response.',
]

const metaCards = [
  { label: 'Reply time', value: '24 hours' },
  { label: 'Based in', value: 'UK, working remote anywhere in the world' },
  { label: 'Best for', value: 'Sites, CMS, portfolio' },
]

function Contact() {
  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-6 pt-40 pb-16 md:px-12 md:pt-48 md:pb-24">
        <p className="eyebrow mb-6">Get in touch</p>
        <h1 className="display text-5xl leading-[1.05] md:text-8xl">
          <KineticWord
            as="div"
            text="Let's make something genuinely excellent."
            lastWordClassName="text-racing"
            finalPeriodClassName="text-gold"
          />
        </h1>
      </section>

      <Marquee
        items={['Available for projects', 'Retained SEO', 'Ongoing care', 'Say hello']}
        className="border-y border-rule py-4 text-racing"
      />

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-3 md:px-12 md:py-32">
        <div>
          <p className="display text-2xl md:text-3xl">One inbox. Real replies. No funnel.</p>
        </div>
        <div className="md:col-span-2">
          <div className="font-display max-w-2xl space-y-6 text-lg leading-relaxed font-light md:text-xl">
            {paragraphs.map((paragraph, i) => (
              <ScrollReveal key={i}>{paragraph}</ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-6 md:px-12 md:pb-8">
        <TiltCard className="group relative overflow-hidden rounded-sm bg-racing">
          <a
            href="mailto:Webdev@judepotter.net"
            className="relative flex flex-col items-start justify-between gap-4 px-8 py-7 text-paper transition-colors duration-500 group-hover:text-racing md:flex-row md:items-center md:px-16 md:py-10"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100" />
            <span className="display relative z-10 text-2xl md:text-4xl">
              Webdev@judepotter.net
            </span>
            <ArrowUpRight
              className="relative z-10 shrink-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
              size={32}
            />
          </a>
        </TiltCard>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-12 md:pb-24">
        <TiltCard className="group relative overflow-hidden rounded-sm border border-racing bg-paper">
          <a
            href="https://copy-doc.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col items-start justify-between gap-4 px-8 py-7 text-racing transition-colors duration-500 group-hover:text-paper md:flex-row md:items-center md:px-16 md:py-10"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-racing transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100" />
            <span className="relative z-10 max-w-2xl">
              <span className="display block text-xl md:text-3xl">Ready to go right now?</span>
              <span className="font-display mt-2 block text-sm leading-relaxed font-light opacity-80 md:text-base">
                If you already know you want to build, skip the back and forth. Click below and
                you&apos;ll land on the exact brief doc I send clients when it&apos;s time to
                start. If it feels right, we can begin today.
              </span>
            </span>
            <ArrowUpRight
              className="relative z-10 shrink-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
              size={32}
            />
          </a>
        </TiltCard>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid grid-cols-1 gap-6 border-t border-rule pt-12 md:grid-cols-3">
          {metaCards.map((card) => (
            <div key={card.label}>
              <p className="eyebrow mb-3">{card.label}</p>
              <p className="display text-xl text-racing md:text-2xl">{card.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
