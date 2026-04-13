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
              <rect x="2" y="2" width="28" height="28" rx="7" fill="#F0F0F0"/>
              <rect x="5" y="5" width="22" height="22" rx="4.5" fill="#FFFFFF"/>
              <path d="M14 9 L14 18 A3.5 3.5 0 0 1 10.5 21.5 L10.5 14 A5 5 0 0 1 15.5 9 L14 9 Z" fill="#F5583E"/>
              <circle cx="21" cy="13" r="2.3" fill="#FDBDB5"/>
              <circle cx="21" cy="19" r="2.3" fill="#FDBDB5"/>
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
