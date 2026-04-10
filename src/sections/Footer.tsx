export function Footer() {
  return (
    <footer className="bg-ink">
      {/* 텀블벅 펀딩 배너 */}
      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF4D00] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base">텀블벅에서 펀딩 진행 중</p>
                <p className="text-neutral-400 text-xs sm:text-sm">얼리버드 한정 100명 · 29,000원부터</p>
              </div>
            </div>
            <a
              href="https://tumblbug.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF4D00] hover:bg-[#E64500] text-white text-sm font-bold rounded-full transition-colors flex-shrink-0"
            >
              텀블벅에서 펀딩하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </div>
        </div>
      </div>

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
