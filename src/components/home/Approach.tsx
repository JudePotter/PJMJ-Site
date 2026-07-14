import { TiltCard } from '#/components/motion/TiltCard'

const approach = [
  {
    title: 'Build',
    copy: 'Bespoke code, handwritten and considered: no templates, no page builders, no shortcuts that show up later.',
  },
  {
    title: 'Find',
    copy: 'Structure and content built so search engines and real people find their way to you, not just a homepage.',
  },
  {
    title: 'Keep',
    copy: 'Sites need looking after. We stay close after launch: edits, monitoring, small improvements, ongoing.',
  },
]

export function Approach() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
      <p className="eyebrow mb-4">How we work</p>
      <h2 className="display mb-16 max-w-2xl text-4xl md:text-6xl">Approach.</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {approach.map((item) => (
          <TiltCard
            key={item.title}
            className="rounded-sm border border-rule bg-paper p-10"
          >
            <p className="display text-3xl text-racing">{item.title}</p>
            <p className="font-display mt-4 leading-relaxed font-light text-muted-foreground">
              {item.copy}
            </p>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
