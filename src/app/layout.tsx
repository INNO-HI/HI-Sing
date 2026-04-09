import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '하이싱 — 노래로 전하는 우리 가족 이야기',
  description: '마음을 직접 전하기 쑥스럽다면, 하이싱으로 먼저 전해보세요. 가족 목소리로 만드는 세상에 하나뿐인 노래. 29,000원부터.',
  keywords: ['가족 노래', '부모님 선물', '칠순 선물', '팔순 선물', '생신 선물', '결혼기념일 선물', 'AI 노래', '맞춤 노래', '목소리 선물', '하이싱', 'HI-Sing'],
  authors: [{ name: 'INNO-HI' }],
  creator: 'INNO-HI',
  metadataBase: new URL('https://hisolution.site'),
  openGraph: {
    title: '하이싱 — 노래로 전하는 우리 가족 이야기',
    description: '가족 목소리로 만드는 세상에 하나뿐인 노래. 부모님 생신, 칠순, 결혼기념일에 마음을 전해보세요.',
    url: 'https://hisolution.site',
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
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VC2RM59Z93" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VC2RM59Z93');
        `}} />
        <meta name="naver-site-verification" content="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
