import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

// One page, so one entry. Add routes here if the site ever grows more.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
