'use client'

import { useRouter } from 'next/navigation'
import { Navigation } from '@/sections/Navigation'
import { Footer } from '@/sections/Footer'
import type { TabId } from '@/types'

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleTabChange = (tab: TabId) => {
    // 홈으로 이동 후 해당 탭 활성화 — 쿼리 파라미터로 전달
    router.push(`/?tab=${tab}`)
  }

  return (
    <div className="relative min-h-screen bg-white">
      <Navigation activeTab={'home' as TabId} onTabChange={handleTabChange} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
