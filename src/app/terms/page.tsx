export const metadata = {
  title: '서비스이용약관 | 하이싱',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-light mb-2">하이싱(HI-Sing) 서비스 이용약관</h1>
          <p className="text-sm text-ink-faint mb-10">시행일: 2026년 4월 10일</p>

          <div className="space-y-10">
            {/* 제1장 총칙 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제1장 총칙</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제1조 (목적)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  본 약관은 주식회사 이노하이(이하 &quot;회사&quot;)가 운영하는 하이싱(HI-Sing, 이하 &quot;서비스&quot;)을
                  이용함에 있어 회사와 이용자 간의 권리, 의무, 책임사항 및 서비스 이용 조건·절차에 관한 사항을
                  규정함을 목적으로 합니다.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제2조 (용어의 정의)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>&quot;서비스&quot;란 회사가 인공지능(AI) 기술을 활용하여 이용자가 제공한 음성 샘플과 이야기를 바탕으로 맞춤형 음원을 제작·제공하는 서비스 및 부가 서비스 일체를 말합니다.</li>
                  <li>&quot;이용자&quot;란 본 약관에 동의하고 서비스를 이용하는 개인을 말합니다. 회사는 만 19세 이상의 성년만을 직접 이용자로 받으며, 미성년자의 이용은 제6조에 따릅니다.</li>
                  <li>&quot;음성 데이터&quot;란 이용자가 서비스 이용 목적으로 업로드하는 본인 또는 제3자의 음성이 녹음된 파일을 말합니다.</li>
                  <li>&quot;음성 주체&quot;란 음성 데이터에 녹음된 목소리의 당사자를 말합니다.</li>
                  <li>&quot;완성곡&quot;이란 회사가 이용자의 요청·자료를 기반으로 AI 기술을 활용하여 제작한 맞춤형 음원을 말합니다.</li>
                  <li>&quot;리워드&quot;란 회사가 제공하는 서비스 상품 패키지(얼리버드, 기본, 프리미엄 등)를 말합니다.</li>
                  <li>&quot;AI 생성물&quot;이란 AI 모델이 가사, 멜로디, 보컬 합성 등의 과정을 거쳐 산출한 결과물을 말합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제3조 (약관의 게시 및 효력)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 본 약관을 서비스 초기화면 또는 연결화면을 통해 이용자가 쉽게 확인할 수 있도록 게시합니다.</li>
                  <li>본 약관은 이용자가 서비스 이용 신청 시 동의함으로써 효력이 발생합니다.</li>
                  <li>약관에 동의하지 않는 이용자는 서비스를 이용할 수 없습니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제4조 (약관의 개정)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 「약관의 규제에 관한 법률」, 「전자상거래 등에서의 소비자보호에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
                  <li>회사는 약관을 개정할 경우 적용일자 및 개정사유를 명시하여 시행일 7일 이전부터 시행일 전일까지 공지합니다. 이용자에게 불리한 개정의 경우에는 시행일 30일 이전부터 공지합니다.</li>
                  <li>이용자가 개정 약관의 적용에 동의하지 않는 경우 개정 약관의 시행일 전까지 서비스 이용을 중단하고 이용 계약을 해지할 수 있습니다. 시행일 이후에도 서비스를 계속 이용하는 경우 개정된 약관에 동의한 것으로 간주됩니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제5조 (약관 외 준칙)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  본 약관에 명시되지 않은 사항은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」,
                  「개인정보 보호법」, 「저작권법」, 「콘텐츠산업진흥법」, 공정거래위원회가 고시하는 「소비자분쟁해결기준」 등
                  관련 법령 및 상관례에 따릅니다.
                </p>
              </section>
            </div>

            {/* 제2장 이용 자격 및 계약 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제2장 이용 자격 및 계약</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제6조 (미성년자의 이용)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>만 14세 미만의 아동은 본 서비스를 이용할 수 없습니다.</li>
                  <li>만 14세 이상 만 19세 미만의 미성년자가 서비스를 이용하거나 결제하기 위해서는 법정대리인(부모 등)의 사전 동의가 필요합니다.</li>
                  <li>미성년자가 법정대리인의 동의 없이 결제한 경우, 본인 또는 법정대리인은 「민법」에 따라 취소를 요청할 수 있습니다.</li>
                  <li>회사는 법정대리인의 동의 여부를 확인할 수 있으며, 확인이 되지 않는 경우 서비스 이용을 제한할 수 있습니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제7조 (이용 계약의 성립)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용 계약은 이용자가 본 약관 및 개인정보 처리방침에 동의하고, 리워드를 선택하여 주문 정보를 입력한 후 결제를 완료한 시점에 성립됩니다.</li>
                  <li>이용자는 결제 전에 본 약관, 개인정보 처리방침, 청약철회 제한 사항(제13조) 및 제3자 음성 사용 시 동의 의무(제9조)를 반드시 확인해야 합니다.</li>
                  <li>회사는 다음 각 호의 경우 이용 신청을 승낙하지 아니하거나 사후에 이용 계약을 해지할 수 있습니다.
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li>이용자가 본 약관에 위반하여 이용 자격을 상실한 경우</li>
                      <li>허위 정보를 기재하거나 타인의 명의·결제 수단을 도용한 경우</li>
                      <li>제9조에 따른 음성 주체의 동의를 확인할 수 없는 경우</li>
                      <li>사회 질서 및 미풍양속에 반하는 내용의 제작을 요청한 경우</li>
                      <li>기타 서비스 운영상 부적절하다고 판단되는 합리적 사유가 있는 경우</li>
                    </ul>
                  </li>
                </ol>
              </section>
            </div>

            {/* 제3장 서비스 이용 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제3장 서비스 이용</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제8조 (서비스의 내용)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용자가 제공한 음성 데이터와 이야기를 기반으로 한 맞춤형 노래 제작</li>
                  <li>AI 기반 작사·작곡, 보컬 합성 및 믹싱·마스터링</li>
                  <li>완성곡의 디지털 파일 전달(mp3, wav 등) 및 카카오톡 공유 링크 제공</li>
                  <li>가사 카드 이미지 등 부가 콘텐츠(프리미엄 리워드에 한함)</li>
                  <li>1회 무료 수정 서비스</li>
                  <li>기타 회사가 정하는 부가 서비스</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제9조 (음성 데이터 제공 및 동의 의무) <span className="text-xs text-primary-500 font-normal">핵심 조항</span></h3>
                <div className="bg-primary-50/40 border-l-4 border-primary-400 rounded-r-lg p-4 mb-3">
                  <p className="text-sm text-ink-light leading-relaxed font-medium">
                    본 조는 음성권, 초상권, 개인정보 보호와 직접 관련되는 핵심 조항이므로 반드시 확인하여 주시기 바랍니다.
                  </p>
                </div>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-2">
                  <li>이용자는 업로드하는 음성 데이터에 대하여 적법한 이용 권한을 가지고 있음을 보증하며, 다음 중 하나에 해당해야 합니다.
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li>이용자 본인의 음성인 경우</li>
                      <li>음성 주체(본인이 아닌 경우)의 사전 동의를 받은 경우</li>
                      <li>음성 주체가 미성년자인 경우, 법정대리인의 사전 동의를 받은 경우</li>
                      <li>음성 주체가 의사능력이 없는 경우, 법정대리인 또는 보호자의 사전 동의를 받은 경우</li>
                    </ul>
                  </li>
                  <li>이용자는 다음 각 목의 행위를 위하여 서비스를 이용할 수 없습니다.
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li>정치인, 연예인, 공인 등 유명인의 음성을 무단으로 사용하여 이들의 목소리를 재현하거나 모방하는 행위</li>
                      <li>고인(故人)의 음성을 유족 동의 없이 사용하는 행위</li>
                      <li>타인을 사칭·기망·명예훼손·모욕할 목적으로 음성을 사용하는 행위</li>
                      <li>허위정보·가짜뉴스·딥페이크 콘텐츠 제작을 목적으로 하는 행위</li>
                      <li>성적 불쾌감이나 혐오 표현 등 공서양속에 반하는 목적의 콘텐츠 제작</li>
                    </ul>
                  </li>
                  <li>이용자는 제1항 및 제2항을 위반하여 발생한 모든 법적 분쟁(민사·형사·행정 불문) 및 손해에 대하여 전적인 책임을 부담하며, 회사 및 회사의 임직원에게 일체의 손해가 발생하지 않도록 방어하고 면책시켜야 합니다.</li>
                  <li>회사는 업로드된 음성 데이터가 본 조에 위반되는 것으로 의심되는 합리적 사유가 있는 경우 제작을 중단하거나 계약을 해지할 수 있으며, 수사기관의 요청이 있는 경우 관련 법령에 따라 협조할 수 있습니다.</li>
                </ol>
              </section>


              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제11조 (서비스 이용 시간 및 중단)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>서비스는 원칙적으로 연중무휴 24시간 이용 가능합니다.</li>
                  <li>회사는 시스템 점검, 보수, 교체, 설비 장애, 통신 두절, 천재지변, 전쟁, 정전, 서비스 제공 업체의 귀책사유 등 불가항력적 사유가 발생한 경우 서비스 제공을 일시적으로 중단할 수 있으며, 이 경우 사전 또는 사후에 공지합니다.</li>
                  <li>제2항에 따른 서비스 중단으로 인하여 완성곡 제작이 완료되지 못한 경우, 회사는 제13조의 환불 규정을 준용하여 처리합니다.</li>
                </ol>
              </section>
            </div>

            {/* 제4장 결제, 청약철회 및 환불 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제4장 결제, 청약철회 및 환불</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제12조 (결제 및 리워드)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>결제는 신용카드, 체크카드 등 회사가 지정하는 결제 수단으로 이루어지며, 결제 대행은 (주)나이스페이먼츠를 통해 처리됩니다.</li>
                  <li>이용자는 본인 명의의 결제 수단을 사용해야 하며, 타인의 결제 수단을 무단으로 사용하여 발생하는 모든 책임은 이용자 본인이 부담합니다.</li>
                </ol>
                <div className="bg-neutral-50 rounded-xl p-4 text-sm text-ink-muted space-y-2 mt-3">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span><strong className="text-ink-light">얼리버드</strong> — 맞춤 노래 1곡, mp3 음원, 1회 무료 수정</span>
                    <strong className="text-ink-light whitespace-nowrap ml-3">29,000원</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span><strong className="text-ink-light">기본</strong> — 맞춤 노래 1곡, mp3+wav, 2회 무료 수정</span>
                    <strong className="text-ink-light whitespace-nowrap ml-3">49,000원</strong>
                  </div>
                  <div className="flex justify-between">
                    <span><strong className="text-ink-light">프리미엄</strong> — 맞춤 노래 1곡, mp3+wav, 감성 가사 카드, 3회 무료 수정</span>
                    <strong className="text-ink-light whitespace-nowrap ml-3">79,000원</strong>
                  </div>
                </div>
                <p className="text-xs text-ink-faint mt-2">* 가격 및 구성은 변경될 수 있으며, 변경 시 시행일 전에 공지합니다.</p>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제13조 (청약철회의 제한 및 환불)</h3>
                <div className="bg-amber-50 border-l-4 border-amber-300 rounded-r-lg p-4 mb-3">
                  <p className="text-sm text-amber-900 leading-relaxed font-medium">
                    완성곡은 이용자의 주문에 따라 개별적으로 제작되는 재화로서,
                    「전자상거래 등에서의 소비자보호에 관한 법률」 제17조 제2항 제5호 및 같은 법 시행령 제21조 제4호에 따라
                    제작에 착수한 이후에는 원칙적으로 청약철회가 제한됩니다.
                  </p>
                </div>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용자는 결제 완료 후 회사가 제작에 착수하기 전까지는 언제든지 청약을 철회할 수 있으며, 이 경우 전액 환불됩니다.</li>
                  <li>제작이 착수된 이후에는 아래 표에 따라 부분 환불되며, 보컬 합성 단계 이후에는 환불이 불가합니다.</li>
                  <li>다만 다음의 경우에는 단계와 관계없이 전액 환불됩니다.
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li>회사의 귀책사유로 인해 완성곡 제작이 불가능한 경우</li>
                      <li>회사가 제공한 완성곡이 본 약관에서 정한 서비스 내용과 현저히 다른 경우</li>
                      <li>법령에서 환불을 보장하는 경우</li>
                    </ul>
                  </li>
                </ol>
                <div className="bg-neutral-50 rounded-xl p-4 text-sm text-ink-muted space-y-2 mt-3">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>결제 후 ~ 제작 착수 전</span>
                    <strong className="text-ink-light">100% 환불</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>제작 착수 ~ 작사·작곡 진행 중</span>
                    <strong className="text-ink-light">50% 환불</strong>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span>보컬 합성 이후</span>
                    <strong className="text-ink-light">환불 불가 (무료 수정으로 갈음)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>완성곡 전달 후</span>
                    <strong className="text-ink-light">1회 무료 수정 제공</strong>
                  </div>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed mt-3">
                  환불 요청은 contact@innohi.ai.kr 또는 공식 카카오톡 채널로 접수하실 수 있으며, 접수 후 영업일 기준 3일 이내에 처리됩니다.
                  환불은 원결제 수단으로 이루어지며, 결제 수단의 정책에 따라 실제 환급까지 추가 영업일이 소요될 수 있습니다.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제14조 (무료 수정)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>완성곡 전달 후 이용자는 1회에 한하여 무료 수정을 요청할 수 있으며, 요청은 완성곡 전달일로부터 7일 이내에 하여야 합니다.</li>
                  <li>수정 가능 범위는 가사 일부, 멜로디 뉘앙스, 분위기, 보컬 톤·스타일 등 합리적인 범위로 제한됩니다.</li>
                  <li>전체 컨셉을 완전히 바꾸는 수준의 요청은 재제작에 해당하여 별도 비용이 발생할 수 있으며, 이 경우 사전에 이용자에게 비용을 안내한 후 진행합니다.</li>
                  <li>이용자의 추상적·주관적 감정(예: &quot;감동이 부족하다&quot;)만으로는 수정 범위가 확정되지 않으며, 구체적이고 실현 가능한 수정 포인트의 제시가 필요합니다.</li>
                </ol>
              </section>
            </div>

            {/* 제5장 AI 결과물의 특수성 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제5장 AI 결과물의 특수성</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제15조 (AI 생성물의 특성 및 한계)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>완성곡은 인공지능 모델을 활용하여 제작되는 창작물로서, 동일한 입력에 대하여도 결과물이 달라질 수 있는 확률적 특성을 가집니다.</li>
                  <li>입력된 음성 데이터의 품질, 분량, 잡음 수준 등에 따라 보컬 합성의 자연스러움이나 음색 재현도가 달라질 수 있습니다. 회사는 합리적인 수준의 품질을 보장하되, 특정 수준의 &quot;완벽한&quot; 재현을 보증하지 않습니다.</li>
                  <li>이용자가 기대한 감동·분위기·예술성 등 주관적 만족도에 대해서는 제14조의 1회 무료 수정으로 해결하며, 이를 이유로 한 환불은 제13조의 범위 내에서만 가능합니다.</li>
                  <li>회사는 AI 모델의 알고리즘 특성상 예상하지 못한 출력이 발생할 수 있으며, 이러한 경우 수정 또는 재작업으로 대응합니다.</li>
                  <li>회사는 「인공지능 발전과 신뢰 기반 조성 등에 관한 기본법」 제31조에 따라 완성곡이 생성형 AI 기술로 보컬이 합성된 결과물임을 결제 단계 및 완성곡 전달 시 이용자에게 명시적으로 고지합니다.</li>
                  <li>완성곡은 이용자가 제공한 사연·가사 디렉션·기념일 맥락 등 인간의 창작 기여가 반영된 결과물로, 본 약관은 회사와 이용자가 공동으로 기여한 창작물에 준하여 사적 이용권을 부여하는 방식으로 권리관계를 규율합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제16조 (저작권 및 이용권)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 완성곡에 대한 사적 이용권(다운로드, 재생, 가족·지인 간 공유)을 이용자에게 부여합니다. 현행 「저작권법」상 AI 생성물의 저작권 귀속에 관한 법리가 명확히 정립되지 않은 점을 감안하여, 본 약관에서는 상업적 이용 제한을 전제로 이용권 부여 방식으로 규정합니다.</li>
                  <li>이용자는 완성곡을 다음 목적으로 이용할 수 없으며, 이를 원할 경우 회사의 사전 서면 동의가 필요합니다.
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      <li>음원 스트리밍 서비스(멜론, 지니, Spotify 등)에 유통 및 판매</li>
                      <li>광고, 방송, 영화, 게임 등 상업적 영상물에 사용</li>
                      <li>NFT·디지털 자산으로 발행 및 거래</li>
                      <li>AI 모델 학습 데이터로 사용</li>
                      <li>기타 영리 목적의 공중 전달·배포 행위</li>
                    </ul>
                  </li>
                  <li>회사는 포트폴리오, 광고, 서비스 홍보 목적으로 완성곡의 일부 또는 전체를 사용할 수 있습니다. 단, 이용자는 주문 시 또는 완성곡 전달 후 이의를 제기함으로써 이를 거부할 수 있으며, 회사는 이를 지체 없이 반영합니다.</li>
                  <li>이용자가 제공한 음성 데이터는 주문하신 1곡의 완성곡 제작 목적으로만 사용되며, 그 외 어떠한 목적(AI 모델 학습, 외부 공유, 제3자 제공, 추가 콘텐츠 생성 등)으로도 사용되지 아니합니다. 완성곡 전달 후 30일이 경과하면 서버에서 자동으로 영구 파기됩니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제17조 (데이터 보관 및 파기)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>이용자가 업로드한 음성 데이터는 노래 제작 완료 후 30일이 지나면 회사의 서버에서 완전 파기되며, 이후에는 복구할 수 없습니다.</li>
                  <li>이용자는 음성 데이터 또는 완성곡의 즉시 삭제를 요청할 수 있으며, 회사는 요청 접수 후 지체 없이 처리합니다. 단, 법령상 보존 의무가 있는 결제·청약철회 기록은 해당 기간 동안 별도 보관됩니다.</li>
                  <li>회사는 음성 데이터 보관 중 기술적·관리적 보호조치를 취하되, 해킹·천재지변 등 통상의 주의로 막을 수 없는 사고에 대해서는 회사의 귀책사유가 없는 한 책임지지 아니합니다.</li>
                </ol>
              </section>
            </div>

            {/* 제6장 이용자의 의무 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제6장 이용자의 의무</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제18조 (이용자의 의무)</h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-2">이용자는 다음 각 호의 행위를 하여서는 안 됩니다.</p>
                <ul className="list-disc pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>타인의 명의, 결제 수단, 음성 데이터를 도용하거나 허위로 이용 신청하는 행위</li>
                  <li>제9조에 따른 음성 주체의 동의 없이 음성 데이터를 업로드하는 행위</li>
                  <li>정치인·연예인·공인·고인 등의 음성을 무단으로 재현하거나 모방하는 행위</li>
                  <li>저작권자의 허락 없이 저작물을 무단으로 사용하거나 복제·배포하는 행위</li>
                  <li>음란·선정·혐오·폭력·차별 등 공서양속에 반하는 내용의 제작을 요청하는 행위</li>
                  <li>특정 개인·단체·집단을 비방·모욕·명예훼손하는 내용의 제작을 요청하는 행위</li>
                  <li>딥페이크·허위정보·가짜뉴스 콘텐츠 제작을 목적으로 하는 행위</li>
                  <li>회사의 서비스를 역공학·크롤링·자동화 도구 등으로 무단 복제·분석하는 행위</li>
                  <li>서비스의 정상적인 운영을 방해하는 일체의 행위</li>
                  <li>기타 관계 법령에 위반되는 행위</li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제19조 (이용 제한 및 계약 해지)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 이용자가 본 약관을 위반하는 경우 사전 통보 후 서비스 이용을 제한하거나 이용 계약을 해지할 수 있습니다. 다만 긴급한 보호 필요가 있는 경우 사전 통보 없이 조치할 수 있습니다.</li>
                  <li>제1항에 따른 이용 제한 또는 해지로 인해 이용자에게 발생하는 결제 금액은 제13조의 환불 규정에 따라 처리합니다. 다만 이용자의 고의 또는 중대한 과실로 인한 위반의 경우 환불이 제한될 수 있습니다.</li>
                  <li>이용자는 본 약관을 위반하여 회사 또는 제3자에게 손해를 입힌 경우, 해당 손해를 배상할 책임을 부담합니다.</li>
                </ol>
              </section>
            </div>

            {/* 제7장 회사의 의무 및 책임 제한 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제7장 회사의 의무 및 책임 제한</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제20조 (회사의 의무)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 관계 법령과 본 약관이 금지하는 행위를 하지 않으며, 이용자에게 안정적이고 지속적인 서비스 제공을 위해 최선을 다합니다.</li>
                  <li>회사는 이용자의 개인정보를 보호하기 위하여 별도의 개인정보 처리방침을 수립·운영하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.</li>
                  <li>회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우 신속히 처리하며, 즉시 처리가 곤란한 경우에는 그 사유와 처리 일정을 이용자에게 통지합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제21조 (회사의 책임 제한)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 천재지변, 전쟁, 정전, 네트워크 장애, 클라우드 서비스 제공 업체의 장애 등 불가항력 사유로 인한 서비스 제공의 지연 또는 중단에 대해 책임지지 아니합니다.</li>
                  <li>회사는 이용자의 귀책사유(부정확한 정보 제공, 저품질 음성 파일, 주관적 기대의 불일치 등)로 인한 결과물의 품질 저하에 대해 책임지지 아니합니다.</li>
                  <li>회사는 이용자 간 또는 이용자와 제3자 간에 서비스를 매개로 발생한 분쟁에 대하여 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임이 없습니다.</li>
                  <li>회사는 제9조(음성 동의 의무)의 위반으로 인해 이용자 또는 제3자에게 발생한 모든 손해에 대해 책임지지 아니합니다.</li>
                  <li>회사가 고의 또는 중과실이 없는 한, 회사의 손해배상 책임은 해당 이용자가 해당 거래에서 지급한 금액을 한도로 합니다.</li>
                  <li>회사는 무료로 제공되는 서비스와 관련하여 이용자에게 발생한 손해에 대해 책임지지 아니합니다. 단, 회사의 고의 또는 중대한 과실로 인한 경우에는 그러하지 아니합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제22조 (이용자의 면책 의무)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  이용자가 본 약관, 특히 제9조(음성 동의)를 위반하여 제3자로부터 회사에게 제기된 청구·소송·조사 등과 관련하여,
                  이용자는 회사 및 그 임직원을 방어하고 해당 청구로 인해 회사가 지출한 소송비용·변호사비용·배상금 등 일체의 손해를 보상해야 합니다.
                </p>
              </section>
            </div>

            {/* 제8장 기타 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">제8장 기타</h2>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제23조 (개인정보 보호)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  회사는 이용자의 개인정보를 보호하기 위해 별도의 개인정보 처리방침을 수립·운영하며, 해당 내용은 서비스 내
                  개인정보 처리방침 페이지를 통해 확인하실 수 있습니다.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제24조 (통지)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사가 이용자에 대하여 통지를 하는 경우, 이용자가 제공한 전자우편 주소 또는 SMS로 할 수 있습니다.</li>
                  <li>회사는 불특정 다수 이용자에 대한 통지의 경우 서비스 화면에 게시함으로써 개별 통지에 갈음할 수 있습니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제25조 (분쟁 해결)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>회사는 이용자와의 분쟁이 발생한 경우 상호 협의를 통해 원만히 해결하기 위해 성실히 노력합니다.</li>
                  <li>이용자는 회사와의 분쟁에 대하여 「전자거래기본법」 제32조에 따른 전자거래분쟁조정위원회, 공정거래위원회 또는 한국소비자원 등에 분쟁 조정을 신청할 수 있습니다.</li>
                  <li>공정거래위원회가 고시하는 「소비자분쟁해결기준」이 본 약관보다 이용자에게 유리한 경우에는 해당 기준을 우선 적용합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제26조 (준거법 및 관할법원)</h3>
                <ol className="list-decimal pl-5 text-sm text-ink-muted leading-relaxed space-y-1">
                  <li>본 약관과 관련된 분쟁에는 대한민국 법률을 적용합니다.</li>
                  <li>본 약관과 관련하여 회사와 이용자 간에 소송이 제기될 경우, 「민사소송법」이 정한 관할 법원을 관할 법원으로 합니다.</li>
                </ol>
              </section>

              <section className="mb-6">
                <h3 className="text-base font-bold text-ink-light mb-3">제27조 (분리 가능성)</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  본 약관의 일부 조항이 관련 법령에 따라 무효이거나 집행할 수 없는 것으로 판단되는 경우에도, 해당 조항은
                  가장 가까운 범위에서 유효하게 해석되며 나머지 조항의 효력에는 영향을 미치지 않습니다.
                </p>
              </section>
            </div>

            {/* 부칙 */}
            <div>
              <h2 className="text-xl font-bold text-ink-light mb-6 pb-2 border-b-2 border-primary-400">부칙</h2>
              <section className="mb-6">
                <p className="text-sm text-ink-muted leading-relaxed">
                  본 약관은 2026년 4월 10일부터 시행됩니다. 개정 약관의 시행으로 인해 종전 약관은 효력을 상실하나,
                  종전 약관의 적용을 받던 이용자의 이용 계약에 대하여는 종전 약관의 해당 조항이 계속 적용됩니다.
                </p>
              </section>
            </div>

            {/* 사업자 정보 */}
            <section className="pt-6 border-t border-neutral-200">
              <div className="bg-neutral-50 rounded-xl p-5 text-sm text-ink-muted space-y-1">
                <p className="font-bold text-ink-light mb-2">사업자 정보</p>
                <p>상호: 주식회사 이노하이(INNO-HI)</p>
                <p>대표자: 김민수, 한민우</p>
                <p>사업자등록번호: 758-86-03814</p>
                <p>통신판매업 신고번호: 제2026-서울중구-643호</p>
                <p>소재지: 서울특별시 중구 퇴계로36길 2, B257</p>
                <p>대표 전화: 010-8225-4024 (평일 10:00–18:00, 주말·공휴일 제외)</p>
                <p>이메일: contact@innohi.ai.kr</p>
                <p>개인정보 보호책임자: 김민수 / 개인정보 보호 담당자: 한민우</p>
              </div>
              <p className="text-xs text-ink-faint mt-4">
                본 약관은 한국공정거래조정원 표준약관(전자상거래·디지털콘텐츠) 및 「전자상거래 등에서의 소비자보호에 관한 법률」, 「인공지능 발전과 신뢰 기반 조성 등에 관한 기본법」, 「개인정보 보호법」을 기준으로 작성되었으며, 2026년 4월 28일부터 시행됩니다. 본 약관에 명시되지 않은 사항은 위 법령 및 표준약관을 준용합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
