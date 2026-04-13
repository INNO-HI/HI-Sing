'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import type { TabId } from '@/types'
import { trackCTAClick } from '@/lib/analytics'

interface NavigationProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const navItems: { id: TabId; label: string }[] = [
  { id: 'home', label: '홈' },
  { id: 'sample', label: '샘플' },
  { id: 'pricing', label: '가격' },
  { id: 'faq', label: 'FAQ' },
]

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const isTransparent = false
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 50)
      setIsHidden(currentY > 80 && currentY > lastScrollY.current)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTabClick = (id: TabId) => {
    onTabChange(id)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled || !isTransparent
            ? 'bg-white border-b border-neutral-200 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="flex items-center justify-between h-16 lg:h-[76px]">
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2.5 group"
            >
              <img src="/favicon.svg" alt="하이싱" className="h-6 sm:h-7 w-auto flex-shrink-0" />
              <span className={`flex items-baseline gap-2.5 transition-colors ${isScrolled || !isTransparent ? 'text-ink' : 'text-white'}`}>
                <span className="text-lg sm:text-xl font-bold">하이싱</span>
                <span className="hidden sm:inline text-[11px] text-ink-muted font-normal">목소리로 만드는 노래 선물</span>
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-7 ml-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-1 py-1 text-[15px] transition-all ${
                    activeTab === item.id
                      ? isScrolled || !isTransparent ? 'text-ink font-bold' : 'text-white font-bold'
                      : isScrolled || !isTransparent
                        ? 'text-ink-muted font-medium hover:text-ink'
                        : 'text-white/60 font-medium hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary-400 rounded-full" />
                  )}
                </button>
              ))}
              <button
                onClick={() => {
                  trackCTAClick('nav', '노래 선물하기')
                  handleTabClick('pricing')
                }}
                className="ml-5 px-5 py-2.5 text-sm font-bold text-white bg-primary-400 rounded-full shadow-md shadow-primary-200/60 hover:bg-primary-500 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                노래 선물하기
              </button>
            </nav>

            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${isScrolled || !isTransparent ? 'text-ink-light hover:bg-neutral-100' : 'text-white hover:bg-white/10'}`}
                aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="pt-20 px-6">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`block w-full text-left px-4 py-3.5 text-base font-medium transition-colors border-l-2 ${
                      activeTab === item.id
                        ? 'text-ink border-primary-400'
                        : 'text-ink-light hover:text-ink border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
