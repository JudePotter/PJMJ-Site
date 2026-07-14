export type Project = {
  slug: string
  number: string
  title: string
  client: string
  role: string
  category: string
  summary: string
  body?: string[]
  href?: string
  linkLabel?: string
  status?: 'Live' | 'In progress'
}

export const projects: Project[] = [
  {
    slug: 'canopy-and-tide',
    number: '01',
    title: 'Canopy & Tide',
    client: 'Self-initiated',
    role: 'Design and build, solo',
    category: 'Portfolio piece · luxury real estate',
    summary:
      'A concept villa site built to prove what bespoke, scroll-driven 3D can do for property.',
    body: [
      'Canopy & Tide is the flagship demonstration of the studio’s near top-end work. Rather than a static property brochure, the whole page behaves like a guided flythrough: the camera moves through each room as you scroll, light shifts with the time of day the section is set in, and the copy leans editorial (coordinates, materials, light conditions), so the site reads as a world rather than a listing.',
      'It exists to answer a single objection: that bespoke costs more without looking different. It was built fast, in under 48 hours, to show the gap between a template villa site and a considered one is not incremental. It is the piece that anchors the "the site becomes the brand" pitch.',
    ],
    href: '',
    linkLabel: 'Visit site',
    status: 'In progress',
  },
  {
    slug: 'miller-hudson',
    number: '02',
    title: 'Miller Hudson',
    client: 'Miller Hudson',
    role: 'Design, build, client management, solo',
    category: 'Landing page · conversion funnel',
    summary: 'A conversion-focused VSL funnel for a property coaching programme.',
    body: [
      'Miller Hudson needed a single page that did one job well: turn cold traffic into applications for a 16-week coaching programme. The work started with competitor teardown, moved through a full copy and structure spec, then into a build refined across several client rounds (mentor feedback, copy rewrites, layout fixes), with careful discipline about not disturbing a design the client already liked.',
      'The typography pairs Playfair Display with Inter over a palette of deep navy, muted gold and warm off-white. Applications route through Typeform, keeping the client’s existing intake flow intact. It later opened a conversation about a Meta Pixel and an ongoing retainer, which is the kind of relationship the studio is built to grow into.',
    ],
    href: '',
    linkLabel: 'Visit site',
    status: 'Live',
  },
  {
    slug: 'crown-civil-engineering',
    number: '03',
    title: 'Crown Civil Engineering',
    client: 'Crown Civil Engineering',
    role: 'Brand identity and build, solo',
    category: 'Brand identity + website · civil engineering',
    summary: 'A ground-up brand and site for a civil engineering firm, from icon mark to code.',
    body: [
      'CCE is the studio’s fullest end-to-end example: not just a website but the identity underneath it. The palette and the custom digger-arm mark were developed through multiple iterations to give a heavy, unglamorous industry a confident, considered look rather than the usual stock-photo template.',
      'On the build side it moves into the studio’s core stack (Next.js with TypeScript, Tailwind and Framer Motion), so the motion and structure are handcoded rather than dragged together. It shows a client can come with nothing and leave with a complete visual system and a live-ready site.',
    ],
    href: '',
    linkLabel: 'Visit site',
    status: 'In progress',
  },
  {
    slug: 'retyred',
    number: '04',
    title: 'Retyred',
    client: 'Re-Tyred',
    role: 'Design, build, delivery, solo',
    category: 'Brand + website · automotive',
    summary: 'A full bespoke build taken cleanly from brief to handover and a live site.',
    body: [
      'Retyred is the proof the studio’s process works end to end, not just the design. It ran through the entire pipeline: build, live deployment, a proper service agreement, a branded invoice and a clean handover with the client owning their code.',
      'It is the reference project for how an engagement actually feels to a client from first brief to keys handed over, which is often more reassuring to a prospect than any single visual.',
    ],
    href: 'https://retyred.co.uk',
    linkLabel: 'Visit site',
    status: 'Live',
  },
  {
    slug: 'garage-rooms',
    number: '05',
    title: 'Garage Rooms',
    client: 'Garage Rooms',
    role: 'Design and build, solo',
    category: 'Website · home improvement',
    summary: 'A component-driven site with dynamic room pages and a built-in finance calculator.',
    body: [
      'Garage Rooms leans into a systemised approach: a spec-card design language that scales across dynamic room detail pages, so the catalogue stays consistent as it grows. It is more application than brochure, with a working finance calculator and a booking flow wired through an API route.',
      'It shows the studio building genuine functionality on a modern Next.js 15 App Router foundation, not just a marketing front, which matters for clients who need the site to do a job rather than just look good.',
    ],
    href: '',
    linkLabel: 'Visit site',
    status: 'In progress',
  },
  {
    slug: 'the-conservatory',
    number: '06',
    title: 'The Conservatory',
    client: 'The Conservatory, Hove',
    role: 'Creative direction and build, solo',
    category: 'Website · hospitality / retail',
    summary: 'A site for a plant shop and café, with Supabase-backed functionality behind an editorial front.',
    body: [
      'The Conservatory pairs a considered creative direction (moodboard and full spec) with a properly architected stack: Next.js on the front, Supabase for data and Resend for transactional email. It is the studio’s template for a small hospitality-retail business that needs more than a static page.',
      'As an in-progress project it is useful in the portfolio precisely because it shows the studio’s approach to a real backend, not just visuals, region-correct Supabase and email delivery included.',
    ],
    href: '',
    linkLabel: 'Visit site',
    status: 'In progress',
  },
]
