import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import type { TabId } from '@/types'

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
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2 group"
            >
              <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none">
                {/* 하트 외곽선 */}
                <path d="M16 28s-1.5-1-3.5-2.8C7 20.5 4 17 4 13a6 6 0 0 1 6-6c2.2 0 4.2 1.2 6 3.2C17.8 8.2 19.8 7 22 7a6 6 0 0 1 6 6c0 4-3 7.5-8.5 12.2C17.5 27 16 28 16 28z" stroke="currentColor" strokeWidth="1.8" className={`transition-colors ${isScrolled || !isTransparent ? 'text-primary-400' : 'text-white'}`} />
                {/* 하트 안의 파형 */}
                <path d="M9 16h2l1.5-3 2 6 2-4 1.5 3 1.5-5 2 6 1-2H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400" />
              </svg>
              <span className={`text-lg font-bold transition-colors ${isScrolled || !isTransparent ? 'text-ink' : 'text-white'}`}>
                하이싱 <span className="text-xs text-ink-faint ml-1">HI-Sing</span>
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-6 ml-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-1 py-1 text-[15px] font-medium transition-all ${
                    activeTab === item.id
                      ? isScrolled || !isTransparent ? 'text-ink' : 'text-white'
                      : isScrolled || !isTransparent
                        ? 'text-ink-muted hover:text-ink'
                        : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-400 rounded-full" />
                  )}
                </button>
              ))}
              <button
                onClick={() => handleTabClick('pricing')}
                className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors"
              >
                주문하기
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
