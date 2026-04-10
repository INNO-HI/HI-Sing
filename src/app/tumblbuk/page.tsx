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
        style={{
          background: 'linear-gradient(180deg, #FFF5F0 0%, #FDF8F5 100%)',
        }}
      >
        <div className="max-w-[680px] mx-auto">
          <p className="text-primary-400 text-sm font-medium tracking-widest mb-8">
            HI-Sing
          </p>
          <h1 className="text-2xl sm:text-[32px] font-semibold text-ink leading-snug mb-6">
            30년 치 감사를<br />3분짜리 노래 한 곡에 담을 수 있다면
          </h1>
          <p className="text-ink-muted text-sm sm:text-base">
            가족 목소리로 만드는 세상에 하나뿐인 맞춤 노래
          </p>

          {/* [IMG] 히어로 이미지 자리 */}
          <div className="mt-12 bg-white/60 rounded-2xl h-64 sm:h-80 flex items-center justify-center border border-primary-100">
            <p className="text-ink-faint text-sm">[히어로 이미지]</p>
          </div>
        </div>
      </section>

      {/* ── 공감 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[680px] mx-auto">
          <div className="space-y-8 text-center">
            <p className="text-ink text-base sm:text-lg leading-relaxed">
              부모님 생신마다 상품권 드리면서<br />마음이 편하셨나요?
            </p>
            <p className="text-ink text-base sm:text-lg leading-relaxed">
              &ldquo;감사합니다&rdquo; 한마디가<br />왜 이렇게 어려울까요?
            </p>
            <p className="text-ink text-base sm:text-lg leading-relaxed">
              편지는 손이 안 가고<br />영상은 카메라 앞에서 할 말이 사라지고<br />결국 또 &ldquo;건강하세요&rdquo;
            </p>
          </div>

          <div className="text-center mt-14">
            <p className="text-ink-muted text-sm mb-3">마음이 없는 게 아닙니다.</p>
            <p className="text-ink text-base sm:text-lg font-medium">전할 방법을 몰랐을 뿐입니다.</p>
          </div>
        </div>
      </section>

      {/* ── 서비스 소개 ── */}
      <section
        className="px-5 sm:px-8 py-16 sm:py-20"
        style={{
          background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF1EB 50%, #FDF8F5 100%)',
        }}
      >
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary-500 text-sm font-medium mb-3">그래서 만들었습니다</p>
            <p className="text-ink text-lg sm:text-xl font-medium leading-relaxed">
              목소리 파일 하나와 마음 한 줄이면<br />노래가 됩니다.
            </p>
          </div>

          <p className="text-ink-muted text-sm leading-relaxed text-center mb-14">
            가족의 목소리가 담긴 파일을 보내주시고, 전하고 싶은 마음을 적어주시면<br className="hidden sm:inline" />
            가사와 멜로디를 만들고, 가족 목소리를 보컬로 얹어 노래를 완성해드립니다.
          </p>

          {/* [IMG] 서비스 흐름도 이미지 자리 */}
          <div className="bg-white/60 rounded-2xl h-48 sm:h-64 flex items-center justify-center border border-primary-100">
            <p className="text-ink-faint text-sm">[서비스 흐름도 이미지]</p>
          </div>
        </div>
      </section>

      {/* ── 3단계 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-center text-lg font-medium mb-12">어렵지 않습니다. 딱 3가지만 보내주세요.</p>

          <div className="space-y-6">
            {[
              {
                num: '1',
                title: '목소리를 보내주세요',
                desc: '전화 녹음, 영상 속 목소리, 일상 대화. 뭐든 괜찮습니다. 30초면 충분합니다.',
              },
              {
                num: '2',
                title: '마음을 적어주세요',
                desc: '\u201c엄마 생신에 감사한 마음을 전하고 싶어요\u201d \u2014 한두 줄이면 됩니다. 장르도 골라주세요.',
              },
              {
                num: '3',
                title: '노래가 완성됩니다',
                desc: '3~5일 후, 카카오톡 링크로 완성된 노래를 받으실 수 있습니다. 그 링크를 부모님께 보내시면 됩니다.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-xl p-6 border border-primary-100/60"
              >
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
          <p className="text-primary-500 text-sm font-medium text-center mb-3">실제로 이런 일이 일어났습니다</p>
          <p className="text-ink text-lg sm:text-xl font-medium text-center mb-14">노래를 받은 순간</p>

          {/* 사례 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-primary-100/40">
            <p className="text-ink text-sm leading-[1.9] mb-5">
              새벽 다섯 시, 어머니는 30년을 같은 시간에 일어나 도시락을 싸셨습니다.
              학창시절 반찬 투정을 부리던 날도, 도시락이 창피하다며 떼쓰던 날도
              어머니의 식탁 위 불빛은 꺼지지 않았습니다.
            </p>
            <div className="border-l-2 border-primary-300 pl-4 py-2 mb-5 bg-primary-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;새벽 다섯 시, 작은 불빛 하나 / 엄마의 손끝에서 하루가 시작됐지 /
                그땐 몰랐죠, 그 따뜻함이 / 평생 내 인생의 도시락이 될 줄은&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-2">&lt;식탁 위의 온기&gt; 가사 중</p>
            </div>
            <p className="text-ink text-sm leading-[1.9]">
              팔순잔치에서 틀어드렸는데 후렴 첫 소절이 나오자 어머니가 숟가락을 놓으셨어요.
              온 가족이 다 울었고, 제가 가장 많이 울었던 것 같아요.
            </p>
            <p className="text-ink-faint text-xs mt-4">— 40대 아들, 어머니 팔순 선물</p>
          </div>

          {/* [IMG] 앨범아트 이미지 자리 */}
          <div className="bg-white/60 rounded-2xl h-48 flex items-center justify-center border border-primary-100 mb-6">
            <p className="text-ink-faint text-sm">[앨범아트 이미지]</p>
          </div>

          {/* 사례 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-amber-100/60">
            <p className="text-ink text-sm leading-[1.9] mb-5">
              서울로 올라온 지 10년. 전화를 걸면 늘 &ldquo;괜찮다, 바쁠 텐데 오지 마라&rdquo; 하시던 아버지.
              정말 괜찮으신 줄 알았습니다. 설날에 어머니가 몰래 말씀해주셨습니다.
              &ldquo;아빠가 너 내려오는 날이면 일주일 전부터 달력에 동그라미를 그려놓으셔.&rdquo;
            </p>
            <div className="border-l-2 border-amber-300 pl-4 py-2 mb-5 bg-amber-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;바쁘다는 말로 숨어있었어요 / 사실은 할 말이 없어서였죠 /
                아빠, 오늘만큼은 고백할게요 / 제가 가장 닮고 싶은 사람은 당신이에요&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-2">&lt;바쁘다는 핑계&gt; 가사 중</p>
            </div>
            <p className="text-ink text-sm leading-[1.9]">
              아빠가 듣는 내내 창밖만 보셨어요. 끝나고 아무 말 없이 방에 들어가셨는데,
              저녁 먹을 때 눈이 빨개져 계시더라고요. 아빠 눈물, 태어나서 처음 봤습니다.
            </p>
            <p className="text-ink-faint text-xs mt-4">— 30대 딸, 아버지 생신 선물</p>
          </div>

          {/* 사례 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-100/60">
            <p className="text-ink text-sm leading-[1.9] mb-5">
              매주 일요일 저녁 여섯 시, 어머니에게서 전화가 옵니다. &ldquo;잘 지내지?&rdquo; 한마디.
              제 대답은 늘 &ldquo;네, 잘 지내요.&rdquo; 20년 넘게 이 문답만 반복했습니다.
            </p>
            <div className="border-l-2 border-rose-300 pl-4 py-2 mb-5 bg-rose-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;수화기 너머 짧은 안부 하나로 / 참 오래도 숨었어요, 미안함을 /
                오늘 이 노래가 수화기 대신 / 두 분의 40년을 안아드릴게요&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-2">&lt;수화기 너머의 핑계&gt; 가사 중</p>
            </div>
            <p className="text-ink text-sm leading-[1.9]">
              결혼기념일 저녁, 두 분이 거실 소파에 나란히 앉아 함께 들으셨대요.
              중간에 아버지가 어머니 손을 잡으셨다고, 누나가 전화로 울면서 이야기해줬어요.
            </p>
            <p className="text-ink-faint text-xs mt-4">— 40대 아들, 부모님 결혼기념일 선물</p>
          </div>
        </div>
      </section>

      {/* ── 가격 비교 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-ink-muted text-sm mb-8">전문가에게 맞춤 노래를 의뢰하면</p>

          <div className="bg-neutral-100 rounded-xl py-6 px-8 inline-block mb-4">
            <p className="text-ink-faint text-2xl sm:text-3xl line-through">50~100만원</p>
            <p className="text-ink-muted text-sm mt-1">2~4주 이상</p>
          </div>

          <div className="flex items-center justify-center my-6">
            <div className="w-10 h-[1px] bg-neutral-300" />
            <svg className="mx-3 text-primary-400" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="w-10 h-[1px] bg-neutral-300" />
          </div>

          <p className="text-primary-500 text-sm font-medium mb-2">하이싱은</p>
          <p className="text-ink text-4xl sm:text-5xl font-bold">
            29,000<span className="text-lg font-medium">원</span>
          </p>
          <p className="text-ink-muted text-sm mt-3">부터. 3~5일이면 됩니다.</p>
        </div>
      </section>

      {/* ── 이런 순간에 ── */}
      <section
        className="px-5 sm:px-8 py-16 sm:py-20"
        style={{
          background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF3EE 50%, #FDF8F5 100%)',
        }}
      >
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-10">이런 순간에 선물하세요</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: '부모님 칠순\u00B7팔순', desc: '잔치 자리에서 틀어드리세요. 상품권보다 오래 남습니다.' },
              { title: '부모님 생신', desc: '\u201c감사합니다\u201d 한마디가 쑥스러웠다면, 노래에 담아보세요.' },
              { title: '결혼기념일', desc: '꽃다발은 시들지만, 노래는 남습니다.' },
              { title: '배우자에게', desc: '직접 말하긴 쑥스럽지만 노래라면 전할 수 있는 말.' },
              { title: '아무 날도 아닌 날', desc: '이유 없이 전하는 마음이 사실 제일 특별합니다.', span: true },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-white rounded-xl p-5 border border-primary-100/40 ${item.span ? 'sm:col-span-2' : ''}`}
              >
                <p className="text-ink font-medium text-sm mb-1">{item.title}</p>
                <p className="text-ink-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 리워드 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-12">리워드 안내</p>

          <div className="space-y-4">
            {/* 얼리버드 — 강조 */}
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-primary-400 overflow-hidden">
              <span className="absolute top-0 right-0 bg-primary-400 text-white text-xs font-medium px-4 py-1.5 rounded-bl-xl">
                한정 100명
              </span>
              <p className="text-primary-500 text-xs font-medium tracking-widest mb-2">EARLYBIRD</p>
              <p className="text-ink text-xl sm:text-2xl font-bold mb-1">
                29,000<span className="text-sm font-medium">원</span>
              </p>
              <p className="text-ink font-medium mb-3">얼리버드</p>
              <ul className="text-ink-muted text-sm space-y-1.5">
                <li>맞춤 노래 1곡</li>
                <li>고음질 mp3 음원</li>
                <li>카카오톡 공유 링크</li>
                <li>1회 무료 수정</li>
              </ul>
            </div>

            {/* 기본 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <p className="text-ink text-xl sm:text-2xl font-bold mb-1">
                49,000<span className="text-sm font-medium">원</span>
              </p>
              <p className="text-ink font-medium mb-3">기본</p>
              <ul className="text-ink-muted text-sm space-y-1.5">
                <li>맞춤 노래 1곡</li>
                <li>무손실 음원 (mp3 + wav)</li>
                <li>카카오톡 공유 링크</li>
                <li>2회 무료 수정</li>
              </ul>
            </div>

            {/* 프리미엄 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <p className="text-ink text-xl sm:text-2xl font-bold mb-1">
                79,000<span className="text-sm font-medium">원</span>
              </p>
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
            모든 리워드에 무료 수정이 포함되어 있습니다.<br />
            제작 시작 전이라면 100% 환불 가능합니다.
          </p>
        </div>
      </section>

      {/* ── 안심 ── */}
      <section className="px-5 sm:px-8 py-16 sm:py-20" style={{ background: '#FFF9F6' }}>
        <div className="max-w-[680px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-10">안심하고 후원하세요</p>

          <div className="space-y-4">
            {[
              {
                title: '음성 보호',
                desc: '업로드하신 음성 파일은 노래 제작 목적으로만 사용되며, 제작 완료 후 30일 뒤 서버에서 완전 삭제됩니다. 별도 동의 없이 AI 학습에 사용되지 않습니다.',
              },
              {
                title: '무료 수정',
                desc: '마음에 안 드시면 리워드별 무료 수정 횟수 내에서 가사, 멜로디, 분위기, 보컬 톤 등을 수정해드립니다.',
              },
              {
                title: '환불',
                desc: '제작 시작 전 100% 환불. 작사\u00B7작곡 진행 중 50% 환불. 보컬 합성 이후 환불 불가 (무료 수정으로 대체).',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 sm:p-6 border border-primary-100/40">
                <p className="text-ink font-medium text-sm mb-2">{item.title}</p>
                <p className="text-ink-muted text-sm leading-[1.9]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 팀 ── */}
      <section className="px-5 sm:px-8 py-14 sm:py-16">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-ink font-medium mb-2">만드는 사람들</p>
          <p className="text-ink-muted text-sm mb-1">주식회사 이노하이(INNO-HI)</p>
          <p className="text-ink-muted text-xs">&ldquo;기술은 뒤에 있고, 사람의 마음이 앞에 서는 서비스&rdquo;</p>
          <p className="text-ink-faint text-xs mt-4">김민수 · 한민우 | contact@innohi.ai.kr | hisolution.site</p>
        </div>
      </section>

      {/* ── 클로징 CTA ── */}
      <section
        className="px-5 sm:px-8 py-16 sm:py-20"
        style={{
          background: 'linear-gradient(180deg, #3D2B26 0%, #2C1E1A 100%)',
        }}
      >
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[#F5D5C8] text-lg sm:text-xl font-medium leading-relaxed mb-6">
            이번 부모님 생신에는<br />
            &ldquo;건강하세요&rdquo; 대신,<br />
            노래 한 곡 어떠세요?
          </p>
          <p className="text-[#D4A999] text-sm">얼리버드 한정 100명 · 29,000원부터</p>
        </div>
      </section>
    </div>
  )
}
