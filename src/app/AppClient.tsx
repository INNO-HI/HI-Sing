'use client'

import { useState, useCallback } from 'react'
import { Navigation } from '@/sections/Navigation'
import { HomeTab } from '@/sections/HomeTab'
import { SampleTab } from '@/sections/SampleTab'
import { PricingTab } from '@/sections/PricingTab'
import { FaqTab } from '@/sections/FaqTab'
import { Footer } from '@/sections/Footer'
import type { TabId } from '@/types'
import { trackPageView, trackCTAClick } from '@/lib/analytics'

export function AppClient() {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
    trackPageView(tab)
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
      <main>
        {renderTab()}
      </main>
      <Footer />
    </div>
  )
}
