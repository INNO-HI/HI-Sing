import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hisolution.site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/payment/', '/tumblbuk'] },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/api/', '/payment/', '/tumblbuk'] },
      { userAgent: 'Yeti', allow: '/', disallow: ['/api/', '/payment/', '/tumblbuk'] },
      { userAgent: 'NaverBot', allow: '/', disallow: ['/api/', '/payment/', '/tumblbuk'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
