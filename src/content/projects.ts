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
 *   | cornerLeft[0]                       name         |  top corners of the
 *   | cornerLeft[1]                       date         |  artwork
 *   |                                                  |
 *   |            the 5:4 cover or video                |
 *   +--------------------------------------------------+
 *
 *   On phones the corners are left off. Each card instead shows the title,
 *   a line reading "sector . date", the description and the tags.
 *
 * To change a project's:
 *   pills under the name ...... tags
 *   text top left of artwork .. cornerLeft (one line per item, two or three
 *                               short lines look best)
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
 * PLACEHOLDER: dates all read 2026 until the real ones are in.
 */

export type Project = {
  name: string
  slug: string
  /** The small line on phone cards: "sector . date". */
  sector: string
  /** Top right of the artwork under the name, and on phone cards. */
  date: string
  /** The pills under the paragraph. */
  tags: string[]
  /** Top left of the artwork, one line per item. */
  cornerLeft: string[]
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
    tags: ['Design', 'Development', 'Copy'],
    cornerLeft: ['Design', 'Development'],
    description:
      'A structural engineering practice that wanted a site as considered as its work. We designed, built and wrote it, with project pages that let the buildings lead and clear pricing for site visits and advice.',
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
    cornerLeft: ['Design', 'Development'],
    description:
      'A coaching brand for practice owners who are tired of being the emergency department. We built the whole thing from a blank page, including the scattered pain point cards that drift as you scroll.',
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
    cornerLeft: ['Branding', 'Design'],
    description:
      'A civil engineering and building firm with no brand and no website. We built the identity first, a cream, navy and red palette with a bespoke mark, then a site that explains the whole job from start to finish.',
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
    cornerLeft: ['Design', 'Development'],
    description:
      'A reflexology and Reiki practice that wanted booking to feel as calm as the treatments. We designed and built a soft, unhurried site with clear packages and a one tap route to book on WhatsApp, set up so local clients can find it.',
    frameColor: '#EFE5DA',
    cover: '/work/divine-align/cover.webp',
    liveUrl: 'https://www.divinealignhealing.co.uk',
  },
  {
    name: 'Re-Tyred',
    slug: 're-tyred',
    sector: 'Mobile tyre fitting',
    date: '2026',
    tags: ['Branding', 'Design', 'Development'],
    cornerLeft: ['Branding', 'Design'],
    description:
      'A mobile tyre fitting business covering West and East Sussex. We took it from brand to build, with a bold identity and a fast, clear site that gets people to call out or ask for a quote in a tap.',
    frameColor: '#F17315',
    cover: '/work/re-tyred/cover.webp',
    liveUrl: 'https://retyred.co.uk',
  },
  {
    name: 'Canopy Tide',
    slug: 'canopy-tide',
    sector: 'Luxury property',
    date: '2026',
    tags: ['Design', 'Development', '3D'],
    cornerLeft: ['Design', 'Development'],
    description:
      'A self initiated showpiece for luxury property. A fictional Bali villa told across seven full screen scenes, with a scroll driven 3D camera, a custom water shader and drifting particles, built in under 48 hours.',
    frameColor: '#F2F3F0',
    cover: '/work/canopy-tide/cover.webp',
    video: '/work/canopy-tide/loop.mp4',
    liveUrl: 'https://canopytide.co.uk',
  },
]
