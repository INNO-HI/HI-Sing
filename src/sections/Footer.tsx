export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 py-8 sm:py-10 space-y-5">
        {/* 문의 + 로고 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            문의:{' '}
            <a
              href="mailto:contact@innohi.ai.kr"
              className="text-white font-bold text-base sm:text-lg hover:text-primary-300 transition-colors break-all"
            >
              contact@innohi.ai.kr
            </a>
          </p>
          <div className="flex items-center gap-2">
            <svg className="h-7 sm:h-8 w-auto flex-shrink-0" viewBox="0 0 48 32" fill="none">
              <g fill="#F5583E">
                <rect x="2" y="13" width="2.5" height="6" rx="1.25"/>
                <rect x="7" y="7" width="3" height="18" rx="1.5"/>
                <rect x="12.5" y="7" width="3" height="18" rx="1.5"/>
                <path d="M24 7 L25.5 14.5 L31 16 L25.5 17.5 L24 25 L22.5 17.5 L17 16 L22.5 14.5 Z"/>
                <rect x="32.5" y="7" width="3" height="18" rx="1.5"/>
                <rect x="38" y="7" width="3" height="18" rx="1.5"/>
                <rect x="43.5" y="13" width="2.5" height="6" rx="1.25"/>
              </g>
            </svg>
            <span className="text-sm sm:text-base font-bold text-white">
              하이싱 <span className="text-[10px] sm:text-xs text-neutral-500 ml-1">HI-Sing</span>
            </span>
          </div>
        </div>

        {/* 링크 */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs sm:text-sm">
          <a href="/terms" className="text-neutral-400 hover:text-white transition-colors">서비스이용약관</a>
          <a href="/privacy" className="text-neutral-400 hover:text-white transition-colors">개인정보처리방침</a>
        </div>

        {/* 사업자 정보 + 카피라이트 */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between pt-4 border-t border-white/5">
          <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
            주식회사 이노하이(INNO-HI) | 대표자 김민수, 한민우
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span>
            서울특별시 중구 퇴계로36길 2, B257
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-600 flex-shrink-0">
            &copy; {new Date().getFullYear()} 하이싱(HI-Sing) by INNO-HI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
