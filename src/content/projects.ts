/**
 * All six projects, in locked order. Everything the work field shows lives in
 * this one file, so editing a project means editing its entry below.
 *
 * Where each field appears (desktop layout):
 *
 *   SELECTED WORK . 01 / 06
 *   name ..................... the large title, also the index list
 *   description .............. the paragraph under the title
 *   [tags] [tags] [tags] ..... the pills under the paragraph
 *
 *   +--------------------------------------------------+
 *   | tags[0]                             name         |  top corners of the
 *   | tags[1]                             date         |  artwork
 *   | tags[2]                                          |
 *   |            the 5:4 cover or video                |
 *   +--------------------------------------------------+
 *
 *   The same tags, in the same order, are the pills under the paragraph and
 *   the labels in the top left corner of the artwork. There is no second
 *   list, so they cannot disagree. Up to four tags fit.
 *
 *   On phones the corner labels are left off. Each card instead shows the
 *   title, a line reading "sector . date", the description and the tags.
 *
 * To change a project's:
 *   pills and corner labels ... tags (one list, up to four short words)
 *   date, top right + phones .. date (free text: '2026', 'Oct 2026', 'Summer 2026')
 *   copy ...................... description
 *   link ...................... liveUrl ('' hides the Visit site link)
 *
 * Every cover and video is 5:4 and already contains the browser and phone
 * mockup on a flat background. The frame is painted that same background
 * colour, so the artwork sits in the frame with no visible edge. Take
 * frameColor from the corner of the cover.
 *
 * Assets live in /public/work/[slug]/ :
 *   cover.webp   the 5:4 artwork (also the poster until the video plays)
 *   loop.mp4     optional muted looping video, same 5:4 composition
 *
 * ADDING OR REPLACING A VIDEO: run it through the tagging script once,
 *   python3 scripts/tag-video-srgb.py public/work/[slug]/loop.mp4
 * Editing apps tag exports with a TV colour standard, and browsers then show
 * the video a shade lighter than the flat colour around it (a visible edge).
 * The script fixes the tag without re-encoding.
 */

export type Project = {
  name: string
  slug: string
  /** The small line on phone cards: "sector . date". */
  sector: string
  /** Top right of the artwork under the name, and on phone cards. */
  date: string
  /**
   * What we did. The pills under the paragraph and the labels in the top left
   * of the artwork, in this order. The one source for both. Up to four.
   */
  tags: string[]
  description: string
  /** Frame background while this project is active. Match the cover. */
  frameColor: string
  /** 5:4 artwork. */
  cover: string
  /** Muted looping video over the cover. Leave out when there is none. */
  video?: string
  /** Empty string means no public link yet. */
  liveUrl: string
}

/**
 * Text drawn on the frame (corner labels) is white or ink, whichever reads
 * better on the frame colour. Worked out from the colour so it cannot drift.
 * 0.19 is where white and ink have equal contrast.
 */
export function frameTextClass(frameColor: string): 'text-white' | 'text-ink' {
  const n = parseInt(frameColor.slice(1), 16)
  const lin = (c: number) => {
    const v = c / 255
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  const luminance =
    0.2126 * lin((n >> 16) & 255) +
    0.7152 * lin((n >> 8) & 255) +
    0.0722 * lin(n & 255)
  return luminance > 0.19 ? 'text-ink' : 'text-white'
}

export const projects: Project[] = [
  {
    name: 'Jack Olivia',
    slug: 'jack-olivia',
    sector: 'Structural engineering',
    date: '2026',
    tags: ['Design', 'Development', 'SEO'],
    description:
      'A structural engineering practice that needed a site to match the standard of their work. Big project photography up front, simple project pages, and clear prices for site visits so clients know where they stand.',
    frameColor: '#5A483A',
    cover: '/work/jack-olivia/cover.webp',
    liveUrl: 'https://www.jackolivia.com',
  },
  {
    name: 'Dental Growth Lab',
    slug: 'dental-growth-lab',
    sector: 'Dental coaching',
    date: '2026',
    tags: ['Design', 'Development', 'Copy', 'SEO'],
    description:
      'A coaching business for dental practice owners. We built the site from scratch, including the pain point cards that scatter across the page as you scroll, written in the words owners actually use.',
    frameColor: '#0075D7',
    cover: '/work/dental-growth-lab/cover.webp',
    video: '/work/dental-growth-lab/loop.mp4',
    liveUrl: '',
  },
  {
    name: 'CCE Sussex',
    slug: 'cce-sussex',
    sector: 'Civil engineering',
    date: '2026',
    tags: ['Branding', 'Design', 'Development'],
    description:
      "A civil engineering firm with 30 years of work behind them and almost nothing to show for it online. We gave them a proper brand and mark, then built a site around an animation you won't have seen anywhere else.",
    frameColor: '#E60200',
    cover: '/work/cce-sussex/cover.webp',
    video: '/work/cce-sussex/loop.mp4',
    liveUrl: 'https://www.ccesussex.co.uk',
  },
  {
    name: 'Divine Align',
    slug: 'divine-align',
    sector: 'Wellbeing',
    date: '2026',
    tags: ['Design', 'Development', 'SEO'],
    description:
      'A reflexology and Reiki practice. We kept the site gentle and easy to use: clear packages, one tap booking on WhatsApp, and local SEO so people nearby can find her.',
    frameColor: '#EFE5DA',
    cover: '/work/divine-align/cover.webp',
    liveUrl: 'https://www.divinealignhealing.co.uk',
  },
  {
    name: 'Re-Tyred',
    slug: 're-tyred',
    sector: 'Mobile tyre fitting',
    date: '2026',
    tags: ['Branding', 'Design', 'Development', 'SEO'],
    description:
      'An established tyre business launching a new mobile fitting service. They trusted us to take over their old site, so we refreshed the brand and rebuilt it around the new service, with quick routes to call out a fitter or ask for a quote.',
    frameColor: '#F17315',
    cover: '/work/re-tyred/cover.webp',
    liveUrl: 'https://retyred.co.uk',
  },
  {
    name: 'Canopy Tide',
    slug: 'canopy-tide',
    sector: 'Luxury property',
    date: '2026',
    tags: ['Design', 'Development', '3D', 'Concept'],
    description:
      'Our own side project to push what a property site can do. A made up Bali villa across seven full screen scenes, with a 3D camera that moves as you scroll, custom water and drifting particles. Built in under 48 hours.',
    frameColor: '#F2F3F0',
    cover: '/work/canopy-tide/cover.webp',
    video: '/work/canopy-tide/loop.mp4',
    liveUrl: 'https://canopytide.co.uk',
  },
]
