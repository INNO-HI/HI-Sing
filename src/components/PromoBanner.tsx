'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { trackCTAClick } from '@/lib/analytics'

const TUMBLBUG_URL = 'https://tumblbug.com/hi-sing'
const DEADLINE = new Date('2026-04-24T23:59:59+09:00')
const STORAGE_KEY = 'hising-promo-modal-dismissed-at'
const COOLDOWN_MS = 24 * 60 * 60 * 1000
const OPEN_DELAY_MS = 1500

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
  const [open, setOpen] = useState(false)
  const [t, setT] = useState(calcRemaining())

  // 쿨다운 체크 후 지연 오픈
  useEffect(() => {
    try {
      const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) || 0)
      if (Date.now() - dismissedAt < COOLDOWN_MS) return
    } catch {
      // localStorage 접근 실패 시 그대로 오픈 진행
    }
    const id = setTimeout(() => setOpen(true), OPEN_DELAY_MS)
    return () => clearTimeout(id)
  }, [])

  // 카운트다운 갱신
  useEffect(() => {
    if (!open) return
    const id = setInterval(() => setT(calcRemaining()), 60_000)
    return () => clearInterval(id)
  }, [open])

  // ESC 닫기 + body 스크롤 락
  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onEsc)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {
      // 저장 실패는 무시
    }
    setOpen(false)
  }

  const handleClick = () => {
    trackCTAClick('promo_modal', '텀블벅 바로가기')
    close()
    window.open(TUMBLBUG_URL, '_blank')
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-sm animate-[fadeIn_180ms_ease-out]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-modal-title"
    >
      <div
        className="relative w-full max-w-[520px] bg-white rounded-xl shadow-2xl overflow-hidden animate-[scaleIn_220ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={close}
          aria-label="닫기"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-neutral-100 flex items-center justify-center z-10 transition-colors"
        >
          <X className="w-5 h-5 text-ink-muted" />
        </button>

        {/* 배경 장식 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100/50 to-primary-50 pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-primary-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-primary-200/40 blur-3xl pointer-events-none" />

        <div className="relative p-7 sm:p-9 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-400 text-white text-[11px] font-bold mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            LIVE · 텀블벅 펀딩 진행 중
          </div>

          <h2 id="promo-modal-title" className="text-xl sm:text-2xl font-bold text-ink-light leading-tight">
            5월 8일 어버이날 <span className="text-primary-500">특가 31% 할인</span>
          </h2>

          <p className="text-sm sm:text-base text-ink-muted mt-2">
            정가 29,000원 → <span className="font-bold text-primary-500 text-lg">19,900원</span>
            <span className="block text-xs text-ink-faint mt-1">(얼리버드 100명 한정)</span>
          </p>

          {/* 포함 사항 — 가격 수용성 강화 */}
          <div className="mt-5 bg-white/70 rounded-xl border border-primary-100 p-4 text-left">
            <p className="text-[11px] font-bold text-primary-500 mb-2 text-center">이 가격에 포함된 것</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px] text-ink-light">
              {['작사 (사연 기반)', '작곡 (오리지널)', '보컬 합성·믹싱', 'mp3 음원 + 카카오톡 전달', '1회 무료 수정', '3~5일 완성'].map((x) => (
                <div key={x} className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{x}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 카운트다운 */}
          <div className="mt-5">
            <p className="text-xs font-medium text-ink-muted mb-2">주문 마감까지</p>
            <div className="flex items-center justify-center gap-1.5">
              {[
                { v: t.days, u: '일' },
                { v: t.hours, u: '시간' },
                { v: t.mins, u: '분' },
              ].map((x, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="inline-flex items-center justify-center min-w-[42px] h-11 px-2 rounded-lg bg-white border border-primary-200 font-bold text-lg text-primary-500 shadow-sm">
                    {x.v}
                  </span>
                  <span className="text-xs text-ink-muted">{x.u}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-ink-faint mt-3">* 4/24 이후 주문 시 어버이날 배송 불가</p>

          <div className="mt-6 flex flex-col gap-1.5">
            <button
              onClick={handleClick}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-sm sm:text-base font-bold text-white bg-primary-400 hover:bg-primary-500 rounded-xl shadow-lg shadow-primary-300/50 transition-all"
            >
              🎁 텀블벅에서 지금 주문하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button onClick={close} className="text-xs text-ink-muted hover:text-ink py-2">
              오늘은 그만 보기
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
