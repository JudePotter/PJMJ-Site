import { createFileRoute } from '@tanstack/react-router'
import { Marquee } from '#/components/motion/Marquee'
import { Hero } from '#/components/home/Hero'
import { RecentWork } from '#/components/home/RecentWork'
import { PinnedPitch } from '#/components/home/PinnedPitch'
import { Approach } from '#/components/home/Approach'
import { Manifesto } from '#/components/home/Manifesto'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'PJMJ Studios - Web Developer & SEO Specialist' },
      {
        name: 'description',
        content:
          'PJMJ Studios builds bespoke, editorial websites, designed to be found, made to last, and cared for long after launch.',
      },
      { property: 'og:title', content: 'PJMJ Studios - Web Developer & SEO Specialist' },
      {
        property: 'og:description',
        content:
          'A small studio building bespoke, editorial websites, designed to be found, made to last, and cared for long after launch.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <main>
      <Hero />
      <Marquee
        items={['Well made', 'Found easily', 'Cared for', 'Built to last']}
        className="border-y border-rule py-4 text-racing"
      />
      <RecentWork />
      <PinnedPitch />
      <Approach />
      <Manifesto />
    </main>
  )
}
