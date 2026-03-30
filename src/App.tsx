import { useState } from 'react'
import { Navigation } from '@/sections/Navigation'
import { HomeTab } from '@/sections/HomeTab'
import { SampleTab } from '@/sections/SampleTab'
import { PricingTab } from '@/sections/PricingTab'
import { FaqTab } from '@/sections/FaqTab'
import { Footer } from '@/sections/Footer'

export type TabId = 'home' | 'sample' | 'pricing' | 'faq'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onNavigate={setActiveTab} />
      case 'sample':
        return <SampleTab />
      case 'pricing':
        return <PricingTab />
      case 'faq':
        return <FaqTab />
    }
  }

  return (
    <div className="relative min-h-screen bg-ivory-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderTab()}
      </main>
      <Footer />
    </div>
  )
}

export default App
