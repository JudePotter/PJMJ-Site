import Hero from '@/components/Hero'
import WorkField from '@/components/work/WorkField'
import Services from '@/components/Services'
import OwnItBand from '@/components/OwnItBand'
import { structuredData } from '@/lib/seo'

export default function Home() {
  return (
    <main>
      {/* Structured data for search engines. JSON.stringify does not escape
          "<", so it is swapped for its unicode form to keep the tag safe. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <WorkField />
      <Services />
      <OwnItBand />
      {/* "say hello" lands here: the very end of the page, which uncovers
          the footer. */}
      <div id="say-hello" aria-hidden="true" />
    </main>
  )
}
