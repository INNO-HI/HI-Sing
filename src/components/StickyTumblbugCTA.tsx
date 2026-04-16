'use client'

import { useEffect, useState } from 'react'
import { trackCTAClick } from '@/lib/analytics'

const TUMBLBUG_URL = 'https://tumblbug.com/hi-sing' // TODO: 실제 URL

export function StickyTumblbugCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed || !visible) return null

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40">
      <div className="relative flex items-center gap-2 pr-3 pl-4 py-3 rounded-full bg-primary-400 text-white shadow-2xl shadow-primary-300/60 animate-[fadeIn_0.4s_ease]">
        <button
          onClick={() => setDismissed(true)}
          aria-label="닫기"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-ink-muted shadow-md flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          onClick={() => {
            trackCTAClick('sticky_tumblbug', '텀블벅 펀딩')
            window.open(TUMBLBUG_URL, '_blank')
          }}
          className="flex items-center gap-3 font-bold text-sm"
        >
          <span className="text-lg">🎁</span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[11px] font-medium opacity-90">어버이날 특가 31%↓</span>
            <span>텀블벅 펀딩 →</span>
          </span>
        </button>
      </div>
    </div>
  )
}
