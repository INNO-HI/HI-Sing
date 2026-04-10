'use client'

import { useCallback, useEffect, useState } from 'react'
import { Navigation } from '@/sections/Navigation'
import { HomeTab } from '@/sections/HomeTab'
import { SampleTab } from '@/sections/SampleTab'
import { PricingTab } from '@/sections/PricingTab'
import { FaqTab } from '@/sections/FaqTab'
import { Footer } from '@/sections/Footer'
import type { TabId } from '@/types'
import { trackPageView } from '@/lib/analytics'

const VALID_TABS: readonly TabId[] = ['home', 'sample', 'pricing', 'faq']

function isValidTab(value: string | null): value is TabId {
  return value !== null && (VALID_TABS as readonly string[]).includes(value)
}

function readTabFromUrl(): TabId {
  if (typeof window === 'undefined') return 'home'
  const tab = new URLSearchParams(window.location.search).get('tab')
  return isValidTab(tab) ? tab : 'home'
}

export function AppClient() {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  // 최초 마운트: URL 쿼리 기반 탭 복원 + page_view 전송
  useEffect(() => {
    const initial = readTabFromUrl()
    setActiveTab(initial)
    trackPageView(initial)
  }, [])

  // 뒤로/앞으로 (popstate) 대응
  useEffect(() => {
    const onPop = () => {
      const next = readTabFromUrl()
      setActiveTab(next)
      trackPageView(next)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
    trackPageView(tab)
    // URL과 탭 상태 동기화 (pushState로 뒤로가기 가능하게)
    if (typeof window !== 'undefined') {
      const url = tab === 'home' ? '/' : `/?tab=${tab}`
      window.history.pushState({ tab }, '', url)
    }
  }, [])

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onNavigate={handleTabChange} />
      case 'sample':
        return <SampleTab onNavigate={handleTabChange} />
      case 'pricing':
        return <PricingTab />
      case 'faq':
        return <FaqTab onNavigate={handleTabChange} />
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      <main>{renderTab()}</main>
      <Footer />
    </div>
  )
}
