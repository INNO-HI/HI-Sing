'use client'

import { useRouter } from 'next/navigation'
import { Navigation } from '@/sections/Navigation'
import { Footer } from '@/sections/Footer'
import type { TabId } from '@/types'

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

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
