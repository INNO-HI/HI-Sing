'use client'

import { useEffect, useState } from 'react'
import { trackCTAClick } from '@/lib/analytics'

const TUMBLBUG_URL = 'https://tumblbug.com/hi-sing' // TODO: 실제 펀딩 URL
const DEADLINE = new Date('2026-04-24T23:59:59+09:00') // 주문 마감 (어버이날 배송 보장선)

function calcRemaining(): { days: number; hours: number; mins: number } {
  const diff = DEADLINE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    mins: Math.floor((diff % 3_600_000) / 60_000),
  }
}

export function PromoBanner() {
  const [t, setT] = useState(calcRemaining())

  useEffect(() => {
    const id = setInterval(() => setT(calcRemaining()), 60_000)
    return () => clearInterval(id)
  }, [])

  const handleClick = () => {
    trackCTAClick('promo_banner', '텀블벅 바로가기')
    window.open(TUMBLBUG_URL, '_blank')
  }

  return (
    <section className="relative py-10 sm:py-14 bg-gradient-to-r from-primary-50 via-primary-100/60 to-primary-50 overflow-hidden">
      <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-primary-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-primary-200/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-400 text-white text-xs font-bold mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
              LIVE · 텀블벅 펀딩 진행 중
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ink-light leading-tight">
              5월 8일 어버이날 <span className="text-primary-500">특가 31% 할인</span>
            </h3>
            <p className="text-sm sm:text-base text-ink-muted mt-2">
              정가 29,000원 → <span className="font-bold text-primary-500">19,900원</span> (얼리버드 100명 한정)
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-ink-light">
              <span className="text-xs font-medium text-ink-muted">주문 마감까지</span>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center justify-center min-w-[44px] h-11 px-2 rounded-lg bg-white border border-primary-200 font-bold text-lg text-primary-500 shadow-sm">
                  {t.days}
                </span>
                <span className="text-xs text-ink-muted">일</span>
                <span className="inline-flex items-center justify-center min-w-[44px] h-11 px-2 rounded-lg bg-white border border-primary-200 font-bold text-lg text-primary-500 shadow-sm">
                  {t.hours}
                </span>
                <span className="text-xs text-ink-muted">시간</span>
                <span className="inline-flex items-center justify-center min-w-[44px] h-11 px-2 rounded-lg bg-white border border-primary-200 font-bold text-lg text-primary-500 shadow-sm">
                  {t.mins}
                </span>
                <span className="text-xs text-ink-muted">분</span>
              </div>
            </div>
            <p className="text-[11px] text-ink-faint">* 4/24 이후 주문 시 어버이날 배송 불가</p>
          </div>

          <button
            onClick={handleClick}
            className="flex-shrink-0 flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-primary-400 hover:bg-primary-500 hover:scale-[1.03] active:scale-[0.98] rounded-full shadow-lg shadow-primary-300/50 transition-all"
          >
            🎁 텀블벅 바로가기
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
