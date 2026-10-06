export const site = {
  name: 'PJMJ Studio',
  email: 'webdev@judepotter.net',
  /** As written on the Google Business Profile. Keep the two the same. */
  phone: '+44 7950 694900',
  /** The same number for tel: links and structured data (no spaces). */
  phoneTel: '+447950694900',
  /**
   * The WhatsApp button (bottom right) opens a chat with the number above and
   * this message already typed, so a visitor only has to press send.
   */
  whatsappMessage:
    "Hi, I'm interested in a website. Could we book a meeting, please?",
  /** The Google Business Profile (Maps listing). */
  googleProfile: 'https://share.google/PkHepjthPyfASlmjj',
  /**
   * The "write a review" link from the Business Profile (Share review form).
   * PLACEHOLDER: empty hides the "Leave us a review" link in the footer. Paste
   * the link here and it appears.
   */
  googleReview: '',
  linkedin: 'https://uk.linkedin.com/in/jude-potter-0bba4b1b5',
  instagram: 'https://www.instagram.com/pjmj.studio/',
  location: 'Brighton, UK',
  status: 'Currently taking on clients for Winter 2026',
  /** The short version, on the floating bubble. */
  statusShort: 'Taking on new clients for Winter 26',
  /** The short blurb in the footer. Plain words about who and where. */
  about:
    'PJMJ Studio is a Brighton web developer and designer. We hand code websites, with SEO, branding and copy, for businesses across Sussex and beyond.',
  year: 2026,
} as const

/**
 * Search and sharing copy. The title stays under about 60 characters and the
 * description under about 160, so they are not cut off in results. The same
 * title and description are used for the page, the social cards (Open Graph
 * and Twitter) and the structured data.
 */
export const seo = {
  title: 'PJMJ Studio | Web Designer in Brighton & Hove',
  description:
    'Bespoke, hand coded websites for small businesses in Brighton, Hove and Sussex. Designed to be found, built to last, and yours to own.',
  keywords: [
    'Brighton web developer',
    'web designer Brighton',
    'web design Brighton',
    'website developer Brighton',
    'bespoke websites Brighton',
    'hand coded websites',
    'SEO Brighton',
    'branding Brighton',
    'copywriting',
  ],
} as const

export const nav = [
  { label: 'work', href: '#work' },
  { label: 'services', href: '#services' },
  { label: 'you own it', href: '#you-own-it' },
  { label: 'say hello', href: '#say-hello' },
] as const
