import type { Metadata } from 'next'
import Script from 'next/script'
import { StickyTumblbugCTA } from '@/components/StickyTumblbugCTA'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hisolution.site'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-VC2RM59Z93'

export const metadata: Metadata = {
  title: {
    default: '하이싱 — 노래로 전하는 우리 가족 이야기',
    template: '%s | 하이싱',
  },
  description: '부모님 생신·칠순·팔순·결혼기념일 선물로 세상에 하나뿐인 가족 노래. 하이싱이 가족 목소리로 AI 맞춤 노래를 만들어드려요. 29,000원부터.',
  keywords: ['하이싱', 'HI-Sing', '가족 노래', '부모님 선물', '칠순 선물', '팔순 선물', '생신 선물', '결혼기념일 선물', 'AI 노래', '맞춤 노래', '목소리 선물', '감동 선물', '효도 선물'],
  authors: [{ name: 'INNO-HI' }],
  creator: 'INNO-HI',
  publisher: 'INNO-HI',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '하이싱 — 노래로 전하는 우리 가족 이야기',
    description: '가족 목소리로 만드는 세상에 하나뿐인 노래. 부모님 생신, 칠순, 결혼기념일에 마음을 전해보세요.',
    url: SITE_URL,
    siteName: '하이싱',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/images/og-preview.png', width: 1200, height: 630, alt: '하이싱 — 노래로 전하는 우리 가족 이야기' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '하이싱 — 노래로 전하는 우리 가족 이야기',
    description: '가족 목소리로 만드는 세상에 하나뿐인 노래. 29,000원부터.',
    images: ['/images/og-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/favicon.svg' },
  verification: {
    other: {
      'naver-site-verification': [
        'c47db65c74b788613ed0c852ccb4d4d106d50338',
        'ff53d26d415c382bd91a3dab03c482df6bd4e5b9',
      ],
    },
  },
  category: 'music',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: '하이싱',
      alternateName: 'HI-Sing',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      description: '가족 목소리로 만드는 AI 맞춤 노래 서비스',
      sameAs: [] as string[],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: '하이싱',
      description: '노래로 전하는 우리 가족 이야기',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'ko-KR',
    },
    {
      '@type': 'Service',
      name: '하이싱 가족 노래 제작',
      provider: { '@id': `${SITE_URL}/#organization` },
      serviceType: 'AI 맞춤 노래 제작',
      areaServed: 'KR',
      offers: {
        '@type': 'Offer',
        price: '29000',
        priceCurrency: 'KRW',
        availability: 'https://schema.org/InStock',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Script
          id="jsonld-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <StickyTumblbugCTA />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `}
        </Script>
      </body>
    </html>
  )
}
