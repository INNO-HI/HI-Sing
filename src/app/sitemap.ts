import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hisolution.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/tumblbuk`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
