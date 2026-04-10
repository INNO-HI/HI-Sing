export const metadata = {
  title: '텀블벅 캠페인 미리보기 | 하이싱',
  robots: { index: false, follow: false },
}

export default function TumblbukPreview() {
  return (
    <div className="min-h-screen bg-white">
      {/* 미리보기 알림 */}
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-center sticky top-0 z-50">
        <p className="text-xs sm:text-sm text-amber-900 font-medium">
          텀블벅 캠페인 미리보기 · 외부 비공개
        </p>
      </div>

      {/* ━━━ 1. 히어로 — 감정 후크 ━━━ */}
      <section className="bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <p className="text-primary-500 font-semibold text-sm mb-5 tracking-wider">HI-Sing</p>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-ink-light leading-[1.35] tracking-tight">
            30년 치 감사를<br />
            <span className="text-primary-400">3분짜리 노래 한 곡</span>에<br />
            담을 수 있다면
          </h1>
          <p className="text-ink-muted text-base sm:text-lg mt-8 max-w-md mx-auto leading-relaxed">
            가족의 목소리로 만드는<br className="sm:hidden" />
            세상에 하나뿐인 맞춤 노래
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white border border-primary-200 rounded-full pl-2 pr-5 py-2 shadow-sm">
              <span className="bg-primary-400 text-white text-[10px] font-extrabold rounded-full px-2.5 py-1">얼리버드</span>
              <span className="text-sm font-bold text-ink">29,000원</span>
              <span className="text-xs text-ink-faint line-through ml-1">49,000원</span>
            </div>
            <span className="text-xs text-primary-500 font-semibold">한정 100명 · 40% 할인</span>
          </div>
        </div>
      </section>

      {/* ━━━ 2. 감정 공감 ━━━ */}
      <section className="bg-ink">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <p className="text-primary-300 text-sm font-medium mb-8 tracking-wider">솔직히,</p>
          <div className="space-y-6 text-white text-lg sm:text-xl font-medium leading-relaxed">
            <p>부모님 생신마다<br />상품권 드리면서<br />마음이 편하셨나요?</p>
            <div className="w-12 h-px bg-white/20 mx-auto" />
            <p>&ldquo;감사합니다&rdquo; 한마디가<br />왜 이렇게 어려울까요?</p>
            <div className="w-12 h-px bg-white/20 mx-auto" />
            <p>편지는 손이 안 가고<br />영상은 카메라 앞에서 할 말이 사라지고<br />결국 또 &ldquo;건강하세요&rdquo;</p>
          </div>
          <div className="mt-14 space-y-3">
            <p className="text-neutral-400 text-[15px]">마음이 없는 게 아닙니다.</p>
            <p className="text-white text-xl sm:text-2xl font-bold">전할 <span className="text-primary-300">방법</span>을 몰랐을 뿐입니다.</p>
          </div>
        </div>
      </section>

      {/* ━━━ 3. 서비스 한 줄 소개 ━━━ */}
      <section className="bg-gradient-to-b from-primary-400 to-primary-500">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center text-white">
          <p className="text-white/70 text-sm mb-4">그래서 만들었습니다</p>
          <h2 className="text-2xl sm:text-3xl font-black leading-snug">
            목소리 파일 하나와<br />마음 한 줄이면<br />노래가 됩니다
          </h2>
          <p className="text-white/80 text-sm mt-6 max-w-sm mx-auto leading-relaxed">
            가족의 목소리가 담긴 파일을 보내주시고, 전하고 싶은 마음을 적어주시면 —
            가사와 멜로디를 만들고, 가족 목소리를 보컬로 얹어 노래를 완성해드립니다.
          </p>
        </div>
      </section>

      {/* ━━━ 4. 실제 사례 — 사회적 증거 ━━━ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <p className="text-primary-400 font-semibold text-sm text-center mb-3">실제로 이런 일이 일어났습니다</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-14">노래를 받은 순간</h2>

          {/* 사례 1 */}
          <div className="mb-16">
            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 mb-5">
              <p className="text-sm sm:text-[15px] text-ink-light leading-[1.8]">
                새벽 다섯 시, 어머니는 30년을 같은 시간에 일어나 도시락을 싸셨습니다.
                학창시절 반찬 투정을 부리던 날도, 도시락이 창피하다며 떼쓰던 날도
                어머니의 식탁 위 불빛은 꺼지지 않았습니다.
              </p>
            </div>
            <div className="border-l-4 border-primary-400 pl-5 py-1 mb-4">
              <p className="text-sm sm:text-[15px] text-ink italic leading-relaxed">
                &ldquo;새벽 다섯 시, 작은 불빛 하나 / 엄마의 손끝에서 하루가 시작됐지 /
                그땐 몰랐죠, 그 따뜻함이 / 평생 내 인생의 도시락이 될 줄은&rdquo;
              </p>
              <p className="text-xs text-ink-muted mt-2">— &lt;식탁 위의 온기&gt; 가사 중</p>
            </div>
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-5">
              <p className="text-sm text-ink-light leading-relaxed">
                <strong className="text-primary-500">팔순잔치에서 틀어드렸는데</strong> 후렴 첫 소절이 나오자
                어머니가 숟가락을 놓으셨어요. 온 가족이 다 울었고,
                제가 가장 많이 울었던 것 같아요.
              </p>
              <p className="text-xs text-ink-muted mt-3">40대 아들 → 어머니 팔순 선물</p>
            </div>
            <p className="text-xs text-ink-faint mt-3 text-right">
              지금도 매일 아침 설거지하실 때 이 노래를 틀어두신다고 합니다.
            </p>
          </div>

          {/* 사례 2 */}
          <div className="mb-16">
            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 mb-5">
              <p className="text-sm sm:text-[15px] text-ink-light leading-[1.8]">
                서울로 올라온 지 10년. 전화를 걸면 늘 &ldquo;괜찮다, 바쁠 텐데 오지 마라&rdquo; 하시던 아버지.
                정말 괜찮으신 줄 알았습니다. 설날에 어머니가 몰래 말씀해주셨습니다.
                &ldquo;아빠가 너 내려오는 날이면 일주일 전부터 달력에 동그라미를 그려놓으셔.&rdquo;
              </p>
            </div>
            <div className="border-l-4 border-amber-400 pl-5 py-1 mb-4">
              <p className="text-sm sm:text-[15px] text-ink italic leading-relaxed">
                &ldquo;바쁘다는 말로 숨어있었어요 / 사실은 할 말이 없어서였죠 /
                아빠, 오늘만큼은 고백할게요 / 제가 가장 닮고 싶은 사람은 당신이에요&rdquo;
              </p>
              <p className="text-xs text-ink-muted mt-2">— &lt;바쁘다는 핑계&gt; 가사 중</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <p className="text-sm text-ink-light leading-relaxed">
                <strong className="text-amber-600">아빠가 듣는 내내 창밖만 보셨어요.</strong> 끝나고 아무 말 없이 방에 들어가셨는데,
                저녁 먹을 때 눈이 빨개져 계시더라고요. 아빠 눈물, 태어나서 처음 봤습니다.
              </p>
              <p className="text-xs text-ink-muted mt-3">30대 딸 → 아버지 생신 선물</p>
            </div>
            <p className="text-xs text-ink-faint mt-3 text-right">
              지금은 출퇴근 길에 매일 반복 재생하신다고 합니다.
            </p>
          </div>

          {/* 사례 3 */}
          <div>
            <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 mb-5">
              <p className="text-sm sm:text-[15px] text-ink-light leading-[1.8]">
                매주 일요일 저녁 여섯 시, 어머니에게서 전화가 옵니다. &ldquo;잘 지내지?&rdquo; 한마디.
                제 대답은 늘 &ldquo;네, 잘 지내요.&rdquo; 20년 넘게 이 문답만 반복했습니다.
                부모님 40주년 결혼기념일이 다가오자 누나가 물었습니다.
                &ldquo;엄마 아빠 연애 시절 이야기 들어본 적 있어?&rdquo; 한 번도 없었습니다.
              </p>
            </div>
            <div className="border-l-4 border-rose-400 pl-5 py-1 mb-4">
              <p className="text-sm sm:text-[15px] text-ink italic leading-relaxed">
                &ldquo;수화기 너머 짧은 안부 하나로 / 참 오래도 숨었어요, 미안함을 /
                오늘 이 노래가 수화기 대신 / 두 분의 40년을 안아드릴게요&rdquo;
              </p>
              <p className="text-xs text-ink-muted mt-2">— &lt;수화기 너머의 핑계&gt; 가사 중</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
              <p className="text-sm text-ink-light leading-relaxed">
                <strong className="text-rose-500">결혼기념일 저녁, 두 분이 거실 소파에 나란히 앉아 함께 들으셨대요.</strong>
                중간에 아버지가 어머니 손을 잡으셨다고, 누나가 전화로 울면서 이야기해줬어요.
              </p>
              <p className="text-xs text-ink-muted mt-3">40대 아들 → 부모님 결혼기념일 선물</p>
            </div>
            <p className="text-xs text-ink-faint mt-3 text-right">
              이제 매주 일요일 여섯 시에 먼저 전화를 겁니다.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ 5. 이렇게 간단합니다 ━━━ */}
      <section className="bg-neutral-50">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-4">
            복잡한 건 없습니다
          </h2>
          <p className="text-ink-muted text-sm text-center mb-14">작곡도 작사도 몰라도 됩니다. 마음만 있으면 됩니다.</p>

          <div className="space-y-10">
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary-400 text-white text-lg font-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-200/40">1</div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-ink-light mb-1">목소리를 보내주세요</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  전화 녹음, 영상 속 목소리, 일상 대화.<br />
                  뭐든 괜찮습니다. <strong className="text-ink-light">30초면 충분합니다.</strong>
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary-400 text-white text-lg font-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-200/40">2</div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-ink-light mb-1">마음을 적어주세요</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  &ldquo;엄마 생신에 감사한 마음을 전하고 싶어요&rdquo;<br />
                  한두 줄이면 됩니다. 장르도 골라주세요.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary-400 text-white text-lg font-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-200/40">3</div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-ink-light mb-1">노래가 완성됩니다</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  3~5일 후, 카카오톡 링크로 완성된 노래를 받으실 수 있습니다.<br />
                  그 링크를 부모님께 보내시면 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 6. 가격 앵커링 ━━━ */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light mb-12">
            전문가에게 맡기면<br />
            <span className="line-through text-ink-faint">50~100만원</span>
          </h2>
          <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-300 rounded-3xl p-8 sm:p-12 max-w-sm mx-auto shadow-lg shadow-primary-100/50">
            <p className="text-ink-muted text-sm mb-2">하이싱은</p>
            <p className="text-5xl sm:text-6xl font-black text-ink-light">29,000<span className="text-xl font-bold text-ink-muted">원</span></p>
            <p className="text-primary-500 text-sm font-semibold mt-3">부터. 3~5일이면 됩니다.</p>
            <div className="mt-6 w-full h-px bg-primary-100" />
            <p className="text-xs text-ink-faint mt-4">커피 5잔 값으로 평생 남는 선물</p>
          </div>
        </div>
      </section>

      {/* ━━━ 7. 이런 순간에 ━━━ */}
      <section className="bg-neutral-50">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-12">이런 순간에 선물하세요</h2>
          <div className="space-y-5">
            {[
              { emoji: '🎂', label: '부모님 칠순·팔순', desc: '잔치 자리에서 틀어드리세요. 상품권보다 오래 남습니다.' },
              { emoji: '🙏', label: '부모님 생신', desc: '"감사합니다" 한마디가 쑥스러웠다면, 노래에 담아보세요.' },
              { emoji: '💐', label: '결혼기념일', desc: '꽃다발은 시들지만, 노래는 남습니다.' },
              { emoji: '💝', label: '배우자에게', desc: '직접 말하긴 쑥스럽지만 노래라면 전할 수 있는 말.' },
              { emoji: '💛', label: '아무 날도 아닌 날', desc: '이유 없이 전하는 마음이 사실 제일 특별합니다.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-neutral-100">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <p className="font-bold text-ink-light text-sm">{item.label}</p>
                  <p className="text-sm text-ink-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 8. 리워드 ━━━ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-3">리워드 안내</h2>
          <p className="text-ink-muted text-sm text-center mb-12">모든 리워드에 무료 수정이 포함되어 있습니다</p>

          <div className="space-y-5">
            {/* 얼리버드 */}
            <div className="relative bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 sm:p-8 border-2 border-primary-400 shadow-lg shadow-primary-100/50">
              <div className="absolute -top-3 left-6 bg-primary-400 text-white text-[11px] font-extrabold rounded-full px-4 py-1">
                얼리버드 · 한정 100명
              </div>
              <div className="flex items-end justify-between mt-2 mb-5">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-ink-light">29,000<span className="text-sm font-normal text-ink-muted ml-1">원</span></p>
                  <p className="text-xs text-ink-faint line-through">정가 49,000원</p>
                </div>
                <span className="text-xs font-bold text-primary-500 bg-primary-100 rounded-full px-3 py-1">40% 할인</span>
              </div>
              <div className="space-y-2">
                {['맞춤 노래 1곡', '고음질 mp3 음원', '카카오톡 공유 링크', '1회 무료 수정'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink-light">
                    <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* 기본 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-xs text-ink-faint mb-1">기본</p>
                  <p className="text-2xl font-black text-ink-light">49,000<span className="text-sm font-normal text-ink-muted ml-1">원</span></p>
                </div>
              </div>
              <div className="space-y-2">
                {['맞춤 노래 1곡', '무손실 음원 (mp3 + wav)', '카카오톡 공유 링크', '2회 무료 수정'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink-light">
                    <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* 프리미엄 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-xs text-ink-faint mb-1">프리미엄</p>
                  <p className="text-2xl font-black text-ink-light">79,000<span className="text-sm font-normal text-ink-muted ml-1">원</span></p>
                </div>
              </div>
              <div className="space-y-2">
                {['맞춤 노래 1곡', '무손실 음원 (mp3 + wav)', '감성 가사 카드 이미지 (인쇄용)', '카카오톡 공유 링크', '3회 무료 수정'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink-light">
                    <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 9. 안심 보장 ━━━ */}
      <section className="bg-neutral-50">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-12">안심하고 후원하세요</h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: '🔒', title: '음성 보호', desc: '제작 완료 30일 후 서버에서 완전 삭제. AI 학습에 사용하지 않습니다.' },
              { icon: '✏️', title: '무료 수정', desc: '마음에 안 드시면 리워드별 무료 수정 횟수 내에서 수정해드립니다.' },
              { icon: '💸', title: '환불 가능', desc: '제작 시작 전이라면 100% 환불. 진행 중이면 50% 환불.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-neutral-100 text-center">
                <span className="text-2xl">{item.icon}</span>
                <p className="font-bold text-ink-light text-sm mt-3 mb-1">{item.title}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 10. 팀 ━━━ */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <p className="text-ink-faint text-xs mb-3">만드는 사람들</p>
          <p className="text-ink-light font-bold text-base mb-2">주식회사 이노하이(INNO-HI)</p>
          <p className="text-ink-muted text-sm">&ldquo;기술은 뒤에 있고, 사람의 마음이 앞에 서는 서비스&rdquo;</p>
          <p className="text-ink-faint text-xs mt-4">김민수 · 한민우 | contact@innohi.ai.kr | hisolution.site</p>
        </div>
      </section>

      {/* ━━━ 11. 클로징 CTA ━━━ */}
      <section className="bg-ink">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug">
            이번 부모님 생신에는<br />
            &ldquo;건강하세요&rdquo; 대신,<br />
            <span className="text-primary-300">노래 한 곡</span> 어떠세요?
          </p>
          <p className="text-neutral-400 text-sm mt-8">얼리버드 한정 100명 · 29,000원부터</p>
          <div className="mt-8 inline-flex items-center gap-2 px-10 py-4 bg-[#FF4D00] text-white text-base font-bold rounded-full shadow-lg shadow-[#FF4D00]/30">
            텀블벅에서 펀딩하기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </div>
        </div>
      </section>
    </div>
  )
}
