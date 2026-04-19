import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '텀블벅 캠페인 미리보기',
  description: '하이싱 텀블벅 캠페인 페이지 내부 미리보기',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: '/tumblbuk' },
}

export default function TumblbukLayout({ children }: { children: React.ReactNode }) {
  return children
}
