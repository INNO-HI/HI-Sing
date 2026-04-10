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
            <svg className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" viewBox="0 0 32 32" fill="none">
              <path d="M16 28s-1.5-1-3.5-2.8C7 20.5 4 17 4 13a6 6 0 0 1 6-6c2.2 0 4.2 1.2 6 3.2C17.8 8.2 19.8 7 22 7a6 6 0 0 1 6 6c0 4-3 7.5-8.5 12.2C17.5 27 16 28 16 28z" stroke="currentColor" strokeWidth="1.8" className="text-primary-400" />
              <path d="M9 16h2l1.5-3 2 6 2-4 1.5 3 1.5-5 2 6 1-2H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400" />
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
