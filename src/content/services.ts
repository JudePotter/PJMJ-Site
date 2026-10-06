export type Service = {
  name: string
  /** Short name used in the footer. */
  short: string
  description: string
}

export const services: Service[] = [
  {
    name: 'Design & development',
    short: 'Design & dev',
    description:
      'Bespoke, hand coded sites built around you. No templates, no page builders.',
  },
  {
    name: 'SEO',
    short: 'SEO',
    description:
      'Getting you found by the people already searching for what you do.',
  },
  {
    name: 'Branding',
    short: 'Branding',
    description:
      'Logos, colours and type that actually feel like your business.',
  },
  {
    name: 'Content & copy',
    short: 'Copy',
    description:
      'Words that sound like you and get people to pick up the phone.',
  },
  {
    name: 'Your own control panel',
    short: 'Control panel',
    description:
      'A simple CMS so you can change things yourself, whenever you like.',
  },
  {
    name: 'App development',
    short: 'Apps',
    description: 'If you need something bigger, we can build that too.',
  },
]
