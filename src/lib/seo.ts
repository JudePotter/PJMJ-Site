import { services } from '@/content/services'
import { seo, site } from '@/content/site'

/**
 * The canonical origin, used for canonical links, the sitemap, social images
 * and structured data. NEXT_PUBLIC_SITE_URL wins when it is set (and not
 * blank). Otherwise it is the live domain, so previews and local builds still
 * point their canonical at the real site. Trailing slashes are stripped.
 */
const DEFAULT_SITE_URL = 'https://www.pjmjstudios.co.uk'

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, '')

const ids = {
  business: `${siteUrl}/#business`,
  website: `${siteUrl}/#website`,
  page: `${siteUrl}/#webpage`,
}

/**
 * Structured data for the one page: the business, the site and the page,
 * linked together. Only facts that are on the site go in here.
 */
export function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ids.business,
        name: site.name,
        alternateName: 'PJMJ',
        url: siteUrl,
        description: seo.description,
        slogan: 'Websites people actually remember',
        email: site.email,
        telephone: site.phoneTel,
        hasMap: site.googleProfile,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo512.png`,
          width: 512,
          height: 512,
        },
        image: `${siteUrl}/logo512.png`,
        // Locality only, on purpose: no streetAddress or postcode.
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Brighton',
          addressRegion: 'East Sussex',
          addressCountry: 'GB',
        },
        areaServed: [
          { '@type': 'City', name: 'Brighton' },
          { '@type': 'City', name: 'Hove' },
          { '@type': 'AdministrativeArea', name: 'Sussex' },
          { '@type': 'Country', name: 'United Kingdom' },
        ],
        knowsAbout: [
          'Web development',
          'Web design',
          'Search engine optimisation',
          'Branding',
          'Copywriting',
        ],
        // The Instagram link is still a placeholder (see site.ts), so it is
        // left out until there is a real profile.
        sameAs: [site.googleProfile, site.linkedin],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: services.map((service) => ({
            '@type': 'Service',
            name: service.name,
            description: service.description,
            provider: { '@id': ids.business },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': ids.website,
        url: siteUrl,
        name: site.name,
        inLanguage: 'en-GB',
        publisher: { '@id': ids.business },
      },
      {
        '@type': 'WebPage',
        '@id': ids.page,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: 'en-GB',
        isPartOf: { '@id': ids.website },
        about: { '@id': ids.business },
      },
    ],
  }
}
