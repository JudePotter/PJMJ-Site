import { createFileRoute } from '@tanstack/react-router'
import { KineticWord } from '#/components/motion/KineticWord'
import { ScrollReveal } from '#/components/motion/ScrollReveal'
import { TiltCard } from '#/components/motion/TiltCard'
import { tools, working } from '#/content/about'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About - PJMJ Studios' },
      {
        name: 'description',
        content:
          'A small studio taking a long view: bespoke code, security built in from the start, and ongoing care after launch.',
      },
      { property: 'og:title', content: 'About - PJMJ Studios' },
      {
        property: 'og:description',
        content:
          'A small studio taking a long view: bespoke code, security built in from the start, and ongoing care after launch.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: About,
})

const bodyCopy = [
  'PJMJ Studios exists to do the opposite of the disposable website: something considered, built once, and built properly. Every project starts from a brief taken seriously, not a template stretched to fit.',
  'That means bespoke code over page builders, structure that search engines can actually read, and a relationship that carries on past the handover, because a site that stops being looked after starts quietly failing the day it launches.',
]

function About() {
  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-6 pt-40 pb-16 md:px-12 md:pt-48 md:pb-24">
        <p className="eyebrow mb-6">About the studio</p>
        <h1 className="display text-5xl leading-[1.05] md:text-8xl">
          <KineticWord as="div" text="A small studio." />
          <KineticWord as="div" text="A long view." delay={0.15} />
        </h1>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
        <div className="font-display max-w-2xl space-y-6 text-lg leading-relaxed font-light md:text-xl">
          {bodyCopy.map((paragraph, i) => (
            <ScrollReveal key={i}>{paragraph}</ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
        <TiltCard className="rounded-sm border border-gold bg-paper p-10 md:p-16">
          <p className="display text-3xl text-racing md:text-5xl">Secure by default.</p>
          <p className="font-display mt-6 max-w-2xl leading-relaxed font-light text-muted-foreground">
            Every build is shaped by a degree in Cyber Security &amp; Digital Forensics,
            finished near the top of the class and driven by a genuine passion for online
            security and forensic work. Sensible defaults, careful data handling and an eye
            for what could go wrong are part of the build from the first line of code, not
            an afterthought bolted on before launch.
          </p>
        </TiltCard>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
        <p className="eyebrow mb-4">Tools</p>
        <h2 className="display mb-10 text-3xl md:text-5xl">What we build with.</h2>
        <ul className="flex flex-wrap gap-3">
          {tools.map((tool, i) => (
            <li
              key={tool}
              className={`display rounded-full border px-5 py-2 text-sm md:text-base ${
                i % 2 === 0 ? 'border-racing/30 text-racing' : 'border-gold/40 text-gold'
              }`}
            >
              {tool}
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full bg-racing py-24 text-paper md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="display text-3xl text-gold md:text-5xl">
            Subscriptions for ongoing care.
          </p>
          <p className="font-display mt-6 max-w-2xl text-lg leading-relaxed font-light text-paper/85 md:text-xl">
            Edits, monitoring, small improvements. Hosting led by us where useful, or we
            plug into yours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <h2 className="display mb-10 text-3xl md:text-5xl">{working.heading}</h2>
        <div className="font-display max-w-2xl space-y-6 text-lg leading-relaxed font-light md:text-xl">
          {working.paragraphs.map((paragraph, i) => (
            <ScrollReveal key={i}>{paragraph}</ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  )
}
