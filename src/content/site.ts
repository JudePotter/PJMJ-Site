export const site = {
  name: 'PJMJ Studio',
  email: 'webdev@judepotter.net',
  /** As written on the Google Business Profile. Keep the two the same. */
  phone: '+44 7950 694900',
  /** The same number for tel: links and structured data (no spaces). */
  phoneTel: '+447950694900',
  /** The Google Business Profile (Maps listing). */
  googleProfile: 'https://share.google/PkHepjthPyfASlmjj',
  /**
   * The "write a review" link from the Business Profile (Share review form).
   * PLACEHOLDER: empty hides the "Leave us a review" link in the footer. Paste
   * the link here and it appears.
   */
  googleReview: '',
  linkedin: 'https://uk.linkedin.com/in/jude-potter-0bba4b1b5',
  // PLACEHOLDER: swap for the real Instagram profile.
  instagram: 'https://www.instagram.com/',
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
 * Search and sharing copy. Titles stay under about 60 characters and the
 * description under about 160, so they are not cut off in results.
 */
export const seo = {
  /** The page title in search results: the thing people search, then the brand. */
  title: 'Brighton Web Developer | Hand Coded Websites | PJMJ Studio',
  /** The title on social cards, where the line is the point. */
  shareTitle: 'PJMJ Studio | Websites people actually remember',
  description:
    'PJMJ Studio is a Brighton web developer. We hand code websites, with SEO, branding and copy, for businesses that don’t do templates. You own it, all of it.',
  shareDescription:
    'Hand coded in Brighton for businesses that don’t do templates. Design, development, SEO, branding and copy. You own it, all of it.',
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
