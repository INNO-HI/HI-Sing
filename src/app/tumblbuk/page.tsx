export const metadata = {
  title: '텀블벅 캠페인 미리보기 | 하이싱',
  robots: { index: false, follow: false },
}

export default function TumblbukPreview() {
  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      {/* 미리보기 알림 */}
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-center sticky top-0 z-50">
        <p className="text-xs text-amber-900">텀블벅 캠페인 미리보기 · 외부 비공개</p>
      </div>

      {/* ── 히어로 ── */}
      <section
        className="px-5 sm:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 text-center"
        style={{ background: 'linear-gradient(180deg, #FFF5F0 0%, #FDF8F5 100%)' }}
      >
        <div className="max-w-[680px] mx-auto">
          <p className="text-primary-400 text-sm font-medium tracking-widest mb-8">HI-Sing</p>
          <h1 className="text-2xl sm:text-[32px] font-semibold text-ink leading-snug mb-6">
            가족 목소리로 만드는<br />맞춤 노래 선물
          </h1>
          <p className="text-ink-muted text-sm sm:text-base">
            목소리 파일 하나면, 그 목소리로 노래를 만들어드립니다
          </p>
          <img src="/images/tumblbuk/01-main.jpg" alt="하이싱" className="mt-12 w-full rounded-2xl shadow-sm" />
        </div>
      </section>

      {/* ── 공감 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[680px] mx-auto">
          <div className="space-y-8 text-center">
            <p className="text-ink text-base sm:text-lg leading-relaxed">
              부모님 생신마다<br />비슷한 선물 드리면서 아쉬웠던 적 있으신가요?
            </p>
            <p className="text-ink text-base sm:text-lg leading-relaxed">
              &ldquo;감사합니다&rdquo; 한마디를<br />제대로 전해본 게 언제인지 기억나시나요?
            </p>
          </div>

          <img src="/images/tumblbuk/02-empathy.jpg" alt="공감" className="mt-12 w-full rounded-2xl shadow-sm" />

          <p className="text-ink text-center mt-14 text-base sm:text-lg font-medium">
            말로 하긴 쑥스럽고, 편지는 부담스럽고.<br />
            그래서 노래로 전하면 어떨까 생각했습니다.
          </p>
        </div>
      </section>

      {/* ── 어떻게 만들어지나요 ── */}
      <section
        className="px-5 sm:px-8 py-16 sm:py-20"
        style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF1EB 50%, #FDF8F5 100%)' }}
      >
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-4">이렇게 만들어집니다</p>
          <p className="text-ink-muted text-sm text-center mb-12">
            목소리 파일을 보내주시면, 가사를 쓰고 멜로디를 만들고<br className="hidden sm:inline" />
            그 목소리를 보컬로 얹어 노래를 완성합니다.
          </p>
          <img src="/images/tumblbuk/03-process.jpg" alt="3단계" className="w-full rounded-2xl shadow-sm mb-12" />

          <div className="space-y-5">
            {[
              { num: '1', title: '목소리 파일 보내기', desc: '전화 녹음, 영상 속 목소리, 일상 대화. 30초면 됩니다.' },
              { num: '2', title: '전하고 싶은 이야기 적기', desc: '누구에게, 어떤 마음인지. 한두 줄이면 충분합니다.' },
              { num: '3', title: '카카오톡으로 받기', desc: '3~5일 후, 링크 하나가 옵니다. 부모님께 보내시면 됩니다.' },
            ].map(step => (
              <div key={step.num} className="bg-white rounded-xl p-5 border border-primary-100/60">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center text-sm font-semibold">
                    {step.num}
                  </span>
                  <div>
                    <p className="text-ink font-medium mb-1">{step.title}</p>
                    <p className="text-ink-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 실제 사례 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20" style={{ background: '#FFF9F6' }}>
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-14">실제로 만들어진 노래</p>

          {/* 사례 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-primary-100/40">
            <p className="text-ink text-sm leading-[1.9] mb-5">
              새벽 다섯 시, 어머니는 30년을 같은 시간에 일어나 도시락을 싸셨습니다.
              반찬 투정을 부리던 날도, 도시락이 창피하다며 떼쓰던 날도
              어머니의 식탁 위 불빛은 꺼지지 않았습니다.
            </p>
            <div className="border-l-2 border-primary-300 pl-4 py-2 mb-5 bg-primary-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;새벽 다섯 시, 작은 불빛 하나 / 엄마의 손끝에서 하루가 시작됐지 /
                그땐 몰랐죠, 그 따뜻함이 / 평생 내 인생의 도시락이 될 줄은&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-2">&lt;식탁 위의 온기&gt; 중</p>
            </div>
            <p className="text-ink text-sm leading-[1.9]">
              팔순잔치에서 틀어드렸는데 어머니가 숟가락을 놓으셨대요.
              온 가족이 울었다고 합니다.
            </p>
            <p className="text-ink-faint text-xs mt-4">40대 아들, 어머니 팔순</p>
          </div>

          <img src="/images/tumblbuk/04-result.jpg" alt="식탁 위의 온기" className="w-full rounded-2xl shadow-sm mb-6" />

          {/* 사례 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-amber-100/60">
            <p className="text-ink text-sm leading-[1.9] mb-5">
              서울에서 10년. 전화를 걸면 &ldquo;괜찮다, 오지 마라&rdquo; 하시던 아버지.
              설날에 어머니가 말씀해주셨습니다.
              &ldquo;아빠가 네가 오는 날이면 달력에 동그라미를 그려놓으셔.&rdquo;
            </p>
            <div className="border-l-2 border-amber-300 pl-4 py-2 mb-5 bg-amber-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;바쁘다는 말로 숨어있었어요 / 사실은 할 말이 없어서였죠 /
                아빠, 오늘만큼은 고백할게요 / 제가 가장 닮고 싶은 사람은 당신이에요&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-2">&lt;바쁘다는 핑계&gt; 중</p>
            </div>
            <p className="text-ink text-sm leading-[1.9]">
              아빠가 듣는 내내 창밖만 보셨대요. 저녁에 눈이 빨개져 계시더라고요.
              아빠 눈물, 태어나서 처음 봤다고 합니다.
            </p>
            <p className="text-ink-faint text-xs mt-4">30대 딸, 아버지 생신</p>
          </div>

          {/* 사례 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-100/60">
            <p className="text-ink text-sm leading-[1.9] mb-5">
              매주 일요일 여섯 시, 어머니에게서 전화가 옵니다. &ldquo;잘 지내지?&rdquo;
              &ldquo;네, 잘 지내요.&rdquo; 20년 넘게 같은 대화만 반복했습니다.
            </p>
            <div className="border-l-2 border-rose-300 pl-4 py-2 mb-5 bg-rose-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;수화기 너머 짧은 안부 하나로 / 참 오래도 숨었어요, 미안함을 /
                오늘 이 노래가 수화기 대신 / 두 분의 40년을 안아드릴게요&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-2">&lt;수화기 너머의 핑계&gt; 중</p>
            </div>
            <p className="text-ink text-sm leading-[1.9]">
              결혼기념일에 두 분이 소파에 나란히 앉아 함께 들으셨대요.
              아버지가 어머니 손을 잡으셨다고 합니다.
            </p>
            <p className="text-ink-faint text-xs mt-4">40대 아들, 부모님 결혼기념일</p>
          </div>
        </div>
      </section>

      {/* ── 가격 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-ink-muted text-sm mb-6">전문가에게 맞춤 노래를 의뢰하면 50~100만원, 2~4주.</p>

          <p className="text-primary-500 text-sm font-medium mb-2">하이싱은</p>
          <p className="text-ink text-4xl sm:text-5xl font-semibold">
            29,000<span className="text-lg font-normal text-ink-muted">원</span>
          </p>
          <p className="text-ink-muted text-sm mt-2">3~5일이면 됩니다.</p>

          <img src="/images/tumblbuk/05-price.jpg" alt="가격 비교" className="mt-10 w-full rounded-2xl shadow-sm" />
        </div>
      </section>

      {/* ── 이런 순간에 ── */}
      <section
        className="px-5 sm:px-8 py-16 sm:py-20"
        style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF3EE 50%, #FDF8F5 100%)' }}
      >
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-10">이런 분들이 주문하셨습니다</p>
          <div className="space-y-3">
            {[
              '부모님 칠순·팔순에 상품권 말고 다른 걸 드리고 싶었던 분',
              '생신에 "감사합니다" 한마디가 쑥스러웠던 분',
              '결혼기념일에 꽃다발 말고 오래 남는 걸 드리고 싶었던 분',
              '배우자에게 직접 말하긴 어렵지만 마음을 전하고 싶었던 분',
            ].map((text, i) => (
              <div key={i} className="bg-white rounded-lg px-5 py-4 border border-primary-100/40">
                <p className="text-ink text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 리워드 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-12">리워드</p>

          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-primary-400 overflow-hidden">
              <span className="absolute top-0 right-0 bg-primary-400 text-white text-xs font-medium px-4 py-1.5 rounded-bl-xl">한정 100명</span>
              <p className="text-ink text-xl sm:text-2xl font-semibold mb-1">29,000<span className="text-sm font-normal">원</span></p>
              <p className="text-ink font-medium mb-3">얼리버드</p>
              <ul className="text-ink-muted text-sm space-y-1.5">
                <li>맞춤 노래 1곡</li>
                <li>고음질 mp3 음원</li>
                <li>카카오톡 공유 링크</li>
                <li>1회 무료 수정</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <p className="text-ink text-xl sm:text-2xl font-semibold mb-1">49,000<span className="text-sm font-normal">원</span></p>
              <p className="text-ink font-medium mb-3">기본</p>
              <ul className="text-ink-muted text-sm space-y-1.5">
                <li>맞춤 노래 1곡</li>
                <li>무손실 음원 (mp3 + wav)</li>
                <li>카카오톡 공유 링크</li>
                <li>2회 무료 수정</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <p className="text-ink text-xl sm:text-2xl font-semibold mb-1">79,000<span className="text-sm font-normal">원</span></p>
              <p className="text-ink font-medium mb-3">프리미엄</p>
              <ul className="text-ink-muted text-sm space-y-1.5">
                <li>맞춤 노래 1곡</li>
                <li>무손실 음원 (mp3 + wav)</li>
                <li>감성 가사 카드 이미지 (인쇄용)</li>
                <li>카카오톡 공유 링크</li>
                <li>3회 무료 수정</li>
              </ul>
            </div>
          </div>

          <p className="text-ink-muted text-xs text-center mt-8">
            모든 리워드에 무료 수정 포함 · 제작 시작 전 100% 환불 가능
          </p>
        </div>
      </section>

      {/* ── 안심 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20" style={{ background: '#FFF9F6' }}>
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-10">걱정되시는 부분</p>
          <div className="space-y-4">
            {[
              { q: '음성 파일은 안전한가요?', a: '제작 목적으로만 사용하고, 완료 후 30일 뒤 삭제합니다. AI 학습에 쓰지 않습니다.' },
              { q: '마음에 안 들면?', a: '리워드별 무료 수정 횟수 내에서 가사, 멜로디, 분위기 등 수정해드립니다.' },
              { q: '환불은?', a: '제작 시작 전 전액 환불. 작사·작곡 중 50% 환불. 보컬 합성 이후 무료 수정으로 대체.' },
            ].map(item => (
              <div key={item.q} className="bg-white rounded-xl p-5 border border-primary-100/40">
                <p className="text-ink font-medium text-sm mb-1">{item.q}</p>
                <p className="text-ink-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 팀 ── */}
      <section className="px-5 sm:px-8 py-14 sm:py-16">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-ink font-medium mb-2">만드는 사람들</p>
          <p className="text-ink-muted text-sm">주식회사 이노하이(INNO-HI)</p>
          <p className="text-ink-faint text-xs mt-3">김민수 · 한민우 | contact@innohi.ai.kr | hisolution.site</p>
        </div>
      </section>

      {/* ── 클로징 ── */}
      <section
        className="px-5 sm:px-8 py-16 sm:py-20"
        style={{ background: 'linear-gradient(180deg, #3D2B26 0%, #2C1E1A 100%)' }}
      >
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[#F5D5C8] text-xl sm:text-2xl font-medium leading-relaxed mb-4">
            이번 부모님 생신에는
          </p>
          <p className="text-white text-2xl sm:text-3xl font-semibold mb-8">
            노래 한 곡 어떠세요?
          </p>
          <p className="text-[#D4A999] text-sm">얼리버드 한정 100명 · 29,000원부터</p>
        </div>
      </section>
    </div>
  )
}
