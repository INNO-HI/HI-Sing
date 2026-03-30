import { useState, useEffect, useRef } from 'react'
import { Menu, X, Music } from 'lucide-react'
import type { TabId } from '@/App'

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
          isScrolled
            ? 'bg-ivory-100/95 backdrop-blur-md border-b border-coral-200/30 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-coral-400 flex items-center justify-center group-hover:bg-coral-500 transition-colors">
                <Music className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-ink">
                HI-<span className="text-coral-400">Sing</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-5 py-2 text-[15px] font-medium rounded-full transition-all ${
                    activeTab === item.id
                      ? 'text-coral-400 bg-coral-50'
                      : 'text-ink-muted hover:text-ink hover:bg-ivory-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleTabClick('pricing')}
                className="hidden sm:block px-5 py-2 text-sm font-semibold text-white bg-coral-400 rounded-full hover:bg-coral-500 transition-colors"
              >
                주문하기
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-ink-light hover:bg-ivory-200 transition-colors"
                aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="absolute right-0 top-0 bottom-0 w-72 bg-ivory-100 shadow-xl">
            <div className="pt-20 px-6">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`block w-full text-left px-4 py-3.5 text-base font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'text-coral-400 bg-coral-50'
                        : 'text-ink-light hover:text-ink hover:bg-ivory-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-coral-100">
                <button
                  onClick={() => handleTabClick('pricing')}
                  className="w-full px-5 py-3 text-sm font-semibold text-white bg-coral-400 rounded-xl hover:bg-coral-500 transition-colors"
                >
                  주문하기
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
