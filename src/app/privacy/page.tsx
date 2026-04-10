export const metadata = {
  title: '개인정보 처리방침 | 하이싱',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-light mb-2">개인정보 처리방침</h1>
          <p className="text-sm text-ink-faint mb-10">최종 업데이트: 2026년 4월 9일</p>

          <div className="space-y-8 text-ink-light">
            <section>
              <p className="text-sm leading-relaxed text-ink-muted">
                주식회사 이노하이(INNO-HI, 이하 &quot;회사&quot;)는 이용자의 개인정보를 중요시하며,
                「개인정보 보호법」 및 관련 법령을 준수하고 있습니다. 본 방침은 회사가 제공하는
                하이싱(HI-Sing) 서비스(이하 &quot;서비스&quot;)의 개인정보 처리에 관한 사항을 안내합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제1조 (수집하는 개인정보 항목)</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-2">회사는 다음의 개인정보를 수집합니다.</p>
              <div className="text-sm text-ink-muted leading-relaxed space-y-2 pl-4">
                <p><strong>1. 필수 항목</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>주문자 정보: 이름, 연락처, 이메일</li>
                  <li>주문 정보: 받는 분 정보, 선물 사연, 음성 파일</li>
                  <li>결제 정보: 결제 수단, 결제 내역 (나이스페이먼츠를 통해 처리)</li>
                </ul>
                <p className="mt-3"><strong>2. 자동 수집 항목</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>접속 IP, 접속 일시, 쿠키, 브라우저 정보</li>
                  <li>Google Analytics를 통한 서비스 이용 통계</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제2조 (개인정보의 수집 및 이용 목적)</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-2">수집한 개인정보는 다음 목적으로 이용됩니다.</p>
              <ul className="list-disc pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                <li>서비스 제공 (노래 제작, 완성곡 전달)</li>
                <li>주문 접수 및 결제 처리</li>
                <li>고객 문의 응대</li>
                <li>서비스 개선을 위한 통계 분석</li>
                <li>법령상 의무 이행</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제3조 (개인정보의 보유 및 이용 기간)</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후 해당 정보를 지체 없이 파기합니다.
                단, 다음의 정보는 아래의 기간 동안 보관합니다.
              </p>
              <ul className="list-disc pl-5 text-sm text-ink-muted leading-relaxed space-y-1 mt-2">
                <li>음성 파일: 노래 제작 완료 후 30일 (이후 서버에서 완전 삭제)</li>
                <li>계약 또는 청약철회 기록: 5년 (전자상거래법)</li>
                <li>대금 결제 및 재화 공급 기록: 5년 (전자상거래법)</li>
                <li>소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래법)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제4조 (개인정보의 제3자 제공)</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우는 예외로 합니다.
              </p>
              <ul className="list-disc pl-5 text-sm text-ink-muted leading-relaxed space-y-1 mt-2">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제5조 (개인정보 처리의 위탁)</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-2">
                회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다.
              </p>
              <div className="bg-neutral-50 rounded-xl p-4 text-sm text-ink-muted">
                <div className="grid grid-cols-2 gap-3">
                  <div><strong className="text-ink-light">수탁업체</strong></div>
                  <div><strong className="text-ink-light">위탁 업무</strong></div>
                  <div>(주)나이스페이먼츠</div>
                  <div>결제 처리</div>
                  <div>Vercel Inc.</div>
                  <div>웹 호스팅</div>
                  <div>Google LLC</div>
                  <div>서비스 이용 통계 (Google Analytics)</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제6조 (이용자의 권리)</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                이용자는 언제든지 자신의 개인정보를 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다.
                권리 행사는 이메일(contact@innohi.ai.kr)로 연락주시면 지체 없이 조치하겠습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제7조 (개인정보의 안전성 확보 조치)</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                회사는 개인정보의 안전성 확보를 위해 다음의 조치를 취하고 있습니다.
              </p>
              <ul className="list-disc pl-5 text-sm text-ink-muted leading-relaxed space-y-1 mt-2">
                <li>개인정보 암호화 저장 및 전송 (HTTPS/TLS)</li>
                <li>개인정보 접근 권한 관리</li>
                <li>해킹 등에 대비한 보안 프로그램 적용</li>
                <li>개인정보 처리 직원 최소화 및 교육</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제8조 (쿠키 운영)</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                회사는 이용자에게 개인화된 서비스를 제공하기 위해 쿠키를 사용합니다. 이용자는 브라우저 설정을 통해
                쿠키 저장을 거부할 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제9조 (개인정보 보호책임자)</h2>
              <div className="bg-neutral-50 rounded-xl p-4 text-sm text-ink-muted">
                <p><strong className="text-ink-light">책임자:</strong> 김민수</p>
                <p><strong className="text-ink-light">이메일:</strong> contact@innohi.ai.kr</p>
                <p><strong className="text-ink-light">소속:</strong> 주식회사 이노하이(INNO-HI)</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink-light mb-3">제10조 (고지의 의무)</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                본 개인정보 처리방침의 내용 변경이 있는 경우, 회사는 변경 사항의 시행 7일 전부터 웹사이트
                공지사항을 통해 고지할 것입니다.
              </p>
            </section>

            <section className="pt-6 border-t border-neutral-200">
              <p className="text-xs text-ink-faint">본 방침은 2026년 4월 9일부터 시행됩니다.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
