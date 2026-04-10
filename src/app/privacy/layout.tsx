'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/sections/Navigation'
import { Footer } from '@/sections/Footer'
import type { TabId } from '@/types'
import { trackPageView } from '@/lib/analytics'

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    trackPageView('privacy')
  }, [])

  // 홈으로 이동하면서 해당 탭 활성화 — AppClient가 ?tab= 파라미터를 읽어 처리함
  const handleTabChange = (tab: TabId) => {
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
