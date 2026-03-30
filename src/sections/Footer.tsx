import { Music } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-coral-100/40">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
        <div className="py-10 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo + Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-coral-400 flex items-center justify-center">
                <Music className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-ink">
                HI-<span className="text-coral-400">Sing</span>
              </span>
            </div>
            <p className="text-sm text-ink-muted">노래로 전하는 우리 가족 이야기</p>
          </div>

          {/* Contact */}
          <a
            href="mailto:contact@innohi.ai.kr"
            className="text-sm text-ink-muted hover:text-coral-400 transition-colors"
          >
            contact@innohi.ai.kr
          </a>
        </div>

        <div className="border-t border-coral-100/30 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} INNO-HI Inc. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            HI-Sing은 INNO-HI의 서비스입니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
