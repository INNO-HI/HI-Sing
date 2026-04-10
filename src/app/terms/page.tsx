export const metadata = {
  title: '서비스이용약관 | 하이싱',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-light mb-2">하이싱(HI-Sing) 서비스 이용약관</h1>
          <p className="text-sm text-ink-faint mb-10">시행일: 2026년 4월 9일</p>

          <div className="space-y-10">
            {/* 제1장 총칙 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제1장 총칙</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제1조 (목적)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  본 약관은 주식회사 이노하이(이하 &quot;회사&quot;)가 운영하는 하이싱(HI-Sing, 이하 &quot;서비스&quot;)을
                  이용하는 이용자와 회사 간의 권리, 의무 및 책임사항, 서비스 이용 조건 및 절차, 기타 필요한
                  사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제2조 (용어의 정의)</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-2">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>&quot;서비스&quot;란 회사가 제공하는 AI 기반 음성 맞춤 노래 제작 서비스 및 부가 서비스 일체를 의미합니다.</li>
                  <li>&quot;이용자&quot;란 본 약관에 따라 서비스를 이용하는 개인 또는 법인을 말합니다.</li>
                  <li>&quot;음성 파일&quot;이란 이용자가 서비스 이용 목적으로 제공하는 가족 또는 지인의 음성 데이터를 말합니다.</li>
                  <li>&quot;완성곡&quot;이란 회사가 이용자의 요청 및 제공 자료를 바탕으로 제작한 맞춤형 음원을 말합니다.</li>
                  <li>&quot;리워드&quot;란 이용자가 선택할 수 있는 서비스 상품 패키지(얼리버드, 기본, 프리미엄 등)를 말합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제3조 (약관의 효력 및 변경)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.</li>
                  <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있습니다.</li>
                  <li>약관이 변경되는 경우 회사는 변경 사항의 시행 7일 전부터(이용자에게 불리한 변경의 경우 30일 전부터) 서비스 내 공지사항을 통해 고지합니다.</li>
                  <li>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있으며, 변경 후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주됩니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제4조 (약관 외 준칙)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  본 약관에 명시되지 않은 사항은 「전자상거래 등에서의 소비자보호에 관한 법률」,
                  「약관의 규제에 관한 법률」, 「개인정보 보호법」, 「저작권법」 등 관련 법령 및 상관례에 따릅니다.
                </p>
              </section>
            </div>

            {/* 제2장 서비스 이용 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제2장 서비스 이용</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제5조 (서비스의 내용)</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-2">회사가 제공하는 서비스는 다음과 같습니다.</p>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용자가 제공한 음성 파일 및 스토리 기반 맞춤 노래 제작</li>
                  <li>AI 기반 작사·작곡 및 보컬 합성</li>
                  <li>완성곡의 디지털 파일 전달(카카오톡 공유 링크, 다운로드)</li>
                  <li>가사 카드 이미지 제공(프리미엄 리워드)</li>
                  <li>1회 무료 수정 서비스</li>
                  <li>기타 회사가 정하는 부가 서비스</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제6조 (서비스 이용 계약의 성립)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용 계약은 이용자가 리워드를 선택하고 주문 정보를 입력한 후 결제를 완료한 시점에 성립됩니다.</li>
                  <li>이용자는 결제 전 본 약관 및 개인정보 처리방침에 동의해야 합니다.</li>
                  <li>회사는 다음의 경우 이용 신청을 거부할 수 있습니다.
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li>이용자가 본 약관을 위반하여 서비스 이용 자격을 상실한 경우</li>
                      <li>신청 내용에 허위 정보를 기재한 경우</li>
                      <li>타인의 명의 또는 정보를 도용한 경우</li>
                      <li>기타 서비스 운영상 부적절하다고 판단되는 경우</li>
                    </ul>
                  </li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제7조 (서비스 이용 시간)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  서비스는 원칙적으로 연중무휴 24시간 이용 가능합니다. 단, 시스템 점검, 장애, 불가항력적 사유 등으로
                  인해 서비스 제공이 일시 중단될 수 있으며, 이 경우 회사는 사전 또는 사후에 공지합니다.
                </p>
              </section>
            </div>

            {/* 제3장 주문 및 결제 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제3장 주문 및 결제</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제8조 (주문)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용자는 서비스 내 제공되는 주문 양식을 통해 필수 정보를 입력하고 리워드를 선택하여 주문할 수 있습니다.</li>
                  <li>이용자는 음성 파일, 받는 분 정보, 전하고 싶은 이야기 등 노래 제작에 필요한 정보를 정확히 제공해야 합니다.</li>
                  <li>이용자가 제공한 정보의 부정확성 또는 누락으로 인해 발생하는 불이익은 이용자 본인이 부담합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제9조 (결제)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>결제는 신용카드, 체크카드 등 회사가 지정하는 결제 수단을 통해 이루어집니다.</li>
                  <li>결제 대행은 (주)나이스페이먼츠를 통해 처리되며, 관련 약관은 해당 사업자의 정책을 따릅니다.</li>
                  <li>이용자는 결제 시 본인 명의의 결제 수단을 사용해야 하며, 타인의 결제 수단을 무단으로 사용하는 경우 발생하는 모든 책임은 이용자가 부담합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제10조 (리워드 및 가격)</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-3">회사가 제공하는 리워드와 가격은 다음과 같습니다.</p>
                <div className="bg-neutral-50 rounded-xl p-4 text-sm text-ink-muted space-y-2">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span><strong className="text-ink-light">얼리버드</strong> — 오리지널 1곡, 고음질 음원, 카카오톡 공유</span>
                    <strong className="text-ink-light">29,000원</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span><strong className="text-ink-light">기본</strong> — 오리지널 1곡, 고음질 음원, 카카오톡 공유</span>
                    <strong className="text-ink-light">39,000원</strong>
                  </div>
                  <div className="flex justify-between">
                    <span><strong className="text-ink-light">프리미엄</strong> — 오리지널 1곡, 가사 카드 이미지, 카카오톡 공유</span>
                    <strong className="text-ink-light">69,000원</strong>
                  </div>
                </div>
                <p className="text-xs text-ink-faint mt-2">* 가격 및 구성은 변경될 수 있으며, 변경 시 사전 공지합니다.</p>
              </section>
            </div>

            {/* 제4장 청약철회 및 환불 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제4장 청약철회 및 환불</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제11조 (청약철회)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용자는 결제 완료 후 제작이 시작되기 전까지 언제든지 청약을 철회할 수 있습니다.</li>
                  <li>본 서비스는 「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 제2항에 따른
                    &quot;이용자의 주문에 따라 개별적으로 생산되는 재화&quot;에 해당하므로, 제작이 시작된 이후에는
                    청약철회권이 일부 제한될 수 있습니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제12조 (환불 규정)</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-3">환불은 서비스 진행 단계에 따라 다음과 같이 처리됩니다.</p>
                <div className="bg-neutral-50 rounded-xl p-4 text-sm text-ink-muted space-y-2">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>결제 후 ~ 제작 시작 전</span>
                    <strong className="text-ink-light">100% 환불</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>제작 시작 ~ 작사/작곡 진행 중</span>
                    <strong className="text-ink-light">50% 환불</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>보컬 합성 이후</span>
                    <strong className="text-ink-light">환불 불가</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>완성곡 전달 후</span>
                    <strong className="text-ink-light">1회 무료 수정 제공</strong>
                  </div>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed mt-3">
                  환불 요청은 contact@innohi.ai.kr로 접수하시면 영업일 기준 3일 이내에 처리됩니다.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제13조 (무료 수정)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>완성곡 전달 후 이용자는 1회에 한하여 무료 수정을 요청할 수 있습니다.</li>
                  <li>수정 가능 범위는 가사, 멜로디, 분위기, 보컬 스타일 등 합리적인 범위 내로 제한됩니다.</li>
                  <li>전체 컨셉을 완전히 바꾸는 등 재제작 수준의 요청은 별도 비용이 발생할 수 있습니다.</li>
                </ol>
              </section>
            </div>

            {/* 제5장 저작권 및 지식재산권 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제5장 저작권 및 지식재산권</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제14조 (완성곡의 저작권)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사가 제작한 완성곡의 저작권은 원칙적으로 이용자에게 귀속됩니다.</li>
                  <li>이용자는 완성곡을 개인적·가정적 용도로 자유롭게 사용할 수 있습니다.</li>
                  <li>상업적 이용(음원 판매, 광고, 방송 등)을 원하는 경우 회사의 사전 서면 동의를 받아야 합니다.</li>
                  <li>회사는 서비스 홍보 및 포트폴리오 목적으로 완성곡을 사용할 수 있으며, 이용자가 원하지 않는 경우 사전에 거부 의사를 표시할 수 있습니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제15조 (이용자 제공 자료의 권리)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용자는 자신이 제공하는 음성 파일 및 기타 자료에 대한 정당한 권리를 보유해야 합니다.</li>
                  <li>이용자는 제3자(가족 포함)의 음성을 사용할 경우 해당 당사자의 동의를 사전에 받아야 합니다.</li>
                  <li>이용자의 자료 제공으로 인해 발생하는 저작권, 초상권, 개인정보 침해 등의 문제는 전적으로 이용자가 책임집니다.</li>
                </ol>
              </section>
            </div>

            {/* 제6장 이용자의 의무 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제6장 이용자의 의무</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제16조 (이용자의 의무)</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-2">이용자는 다음 행위를 하여서는 안 됩니다.</p>
                <ul className="list-disc pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>타인의 명의, 결제 수단, 음성 데이터를 무단으로 도용하는 행위</li>
                  <li>저작권이 있는 음원을 무단으로 사용하는 행위</li>
                  <li>음란물, 혐오 표현, 폭력 등 공공질서 및 미풍양속에 반하는 내용의 제작 요청</li>
                  <li>특정 개인 또는 집단을 비방, 명예훼손하는 내용의 제작 요청</li>
                  <li>허위 정보를 제공하거나 서비스를 악의적으로 이용하는 행위</li>
                  <li>서비스의 정상 운영을 방해하는 일체의 행위</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제17조 (서비스 이용 제한)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  회사는 이용자가 본 약관을 위반하는 경우 사전 통보 없이 서비스 이용을 제한하거나 계약을 해지할 수 있으며,
                  이로 인한 결제 금액은 제12조의 환불 규정에 따라 처리됩니다. 단, 이용자의 고의 또는 중대한 과실로 인한
                  위반의 경우 환불이 제한될 수 있습니다.
                </p>
              </section>
            </div>

            {/* 제7장 회사의 의무 및 책임 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제7장 회사의 의무 및 책임</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제18조 (회사의 의무)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 관련 법령과 본 약관이 금지하는 행위를 하지 않으며, 안정적이고 지속적인 서비스 제공을 위해 최선을 다합니다.</li>
                  <li>회사는 이용자의 개인정보 보호를 위해 「개인정보 보호법」 등 관련 법령을 준수하며, 별도의 개인정보 처리방침에 따라 개인정보를 관리합니다.</li>
                  <li>회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우 이를 처리해야 합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제19조 (회사의 책임 제한)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 천재지변, 전쟁, 네트워크 장애 등 불가항력적 사유로 인한 서비스 제공 지연에 대해 책임지지 않습니다.</li>
                  <li>회사는 이용자의 귀책사유(잘못된 정보 제공, 저품질 음성 파일 등)로 인한 결과물 품질 저하에 대해 책임지지 않습니다.</li>
                  <li>회사는 이용자 간 또는 이용자와 제3자 간의 분쟁에 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임이 없습니다.</li>
                  <li>회사는 무료로 제공되는 서비스와 관련하여 이용자에게 발생한 손해에 대해 책임지지 않습니다.</li>
                </ol>
              </section>
            </div>

            {/* 제8장 기타 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제8장 기타</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제20조 (개인정보 보호)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  회사는 이용자의 개인정보를 보호하기 위해 별도의 개인정보 처리방침을 수립·운영하며,
                  이는 회사 웹사이트를 통해 확인할 수 있습니다.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제21조 (분쟁 해결)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 이용자와의 분쟁 발생 시 원만한 해결을 위해 성실히 협의합니다.</li>
                  <li>협의로 해결되지 않는 경우, 「전자문서 및 전자거래 기본법」 제32조 및 「전자거래기본법 시행령」
                    제16조에 따라 설치된 전자거래분쟁조정위원회에 분쟁 조정을 신청할 수 있습니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제22조 (준거법 및 관할법원)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  본 약관과 관련된 분쟁에는 대한민국 법률이 적용되며, 분쟁이 소송으로 이어질 경우 민사소송법상의
                  관할 법원을 전속 관할 법원으로 합니다.
                </p>
              </section>
            </div>

            {/* 사업자 정보 */}
            <section className="pt-6 border-t border-neutral-200">
              <div className="bg-neutral-50 rounded-xl p-5 text-sm text-ink-muted">
                <p className="font-bold text-ink-light mb-2">사업자 정보</p>
                <p>상호: 주식회사 이노하이(INNO-HI)</p>
                <p>대표자: 김민수, 한민우</p>
                <p>소재지: 서울특별시 중구 퇴계로36길 2, B257</p>
                <p>이메일: contact@innohi.ai.kr</p>
              </div>
              <p className="text-xs text-ink-faint mt-4">본 약관은 2026년 4월 9일부터 시행됩니다.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
