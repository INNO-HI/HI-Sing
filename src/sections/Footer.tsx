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
            <img src="/favicon.svg" alt="하이싱" className="h-7 sm:h-8 w-auto flex-shrink-0" />
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

        {/* 사업자 정보 — 2줄 좌우 분배 */}
        <div className="pt-4 border-t border-white/5 space-y-1.5 text-[11px] sm:text-xs text-neutral-500 leading-relaxed">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-6">
            <p>
              상호: 주식회사 이노하이(INNO-HI) <span className="text-neutral-600">|</span> 대표자: 김민수, 한민우 <span className="text-neutral-600">|</span> 사업자등록번호: 758-86-03814
            </p>
            <p className="sm:text-right flex-shrink-0">
              통신판매업 신고번호: 제2026-서울중구-643호
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-6">
            <p>
              소재지: 서울특별시 중구 퇴계로36길 2, B257 <span className="text-neutral-600">|</span> 대표 전화: 010-8225-4024 <span className="text-neutral-600">|</span> 이메일: contact@innohi.ai.kr
            </p>
            <p className="sm:text-right text-neutral-600 flex-shrink-0">
              &copy; {new Date().getFullYear()} 하이싱(HI-Sing) by INNO-HI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
