export const metadata = {
  title: '텀블벅 캠페인 미리보기 | 하이싱',
  robots: { index: false, follow: false },
}

export default function TumblbukPreview() {
  const sections = [
    // 카드 1: 히어로
    {
      bg: 'bg-gradient-to-b from-primary-50 to-white',
      content: (
        <div className="text-center py-16 sm:py-24">
          <p className="text-ink-muted text-base sm:text-lg mb-4">마음을 직접 전하기 쑥스럽다면,</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-light leading-tight tracking-tight">
            <span className="text-primary-400">노래</span>로 전하는<br />우리 가족 이야기
          </h1>
          <p className="text-ink-muted text-sm sm:text-base mt-6 max-w-lg mx-auto leading-relaxed">
            가족 목소리로 세상에 하나뿐인 맞춤 노래를 만들어드립니다.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-white border border-primary-100 rounded-full pl-1.5 pr-4 py-1.5 shadow-sm">
            <span className="bg-primary-400 text-white text-[11px] font-bold rounded-full px-2.5 py-1">얼리버드</span>
            <span className="text-sm"><strong className="text-ink">29,000원</strong><span className="text-ink-faint">부터</span></span>
          </div>
        </div>
      ),
    },
    // 카드 2: 공감
    {
      bg: 'bg-ink text-white',
      content: (
        <div className="py-16 sm:py-24 max-w-2xl mx-auto text-center">
          <p className="text-primary-300 text-sm font-medium mb-6">혹시, 이런 고민하신 적 있으신가요?</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10" style={{ lineHeight: 1.5 }}>
            마음은 가득한데,<br />전하기가 참 어렵습니다
          </h2>
          <div className="space-y-5 text-left max-w-md mx-auto">
            {[
              '부모님 칠순인데 올해도 상품권을 드리려니 마음이 걸리시나요?',
              '"감사합니다" 한마디가 쑥스러워 결국 건강식품만 택배로 보내셨나요?',
              '뭔가 특별한 걸 해드리고 싶은데 방법을 모르겠나요?',
            ].map((text, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/15">
                <p className="text-white text-[15px] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-neutral-400 text-[15px] leading-[1.8]">
              우리는 마음이 없는 게 아닙니다.<br />다 커서 더 쑥스러울 뿐이죠.
            </p>
            <p className="mt-6 text-primary-300 font-semibold text-lg">
              그래서 HI-Sing을 만들었습니다.
            </p>
          </div>
        </div>
      ),
    },
    // 카드 3: 3단계 프로세스
    {
      bg: 'bg-white',
      content: (
        <div className="py-16 sm:py-24 max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-light">복잡한 건 없습니다</h2>
            <p className="text-ink-muted text-sm mt-3">목소리를 보내주시면, 그 목소리로 노래를 만들어드립니다.</p>
          </div>
          <div className="space-y-8">
            {[
              { step: 1, title: '목소리를 보내주세요', desc: '가족의 목소리가 담긴 파일을 업로드합니다. 일상 대화, 전화 녹음, 영상 속 목소리 — 뭐든 괜찮습니다. 30초 이상이면 충분합니다.', tip: '여러 사람 목소리가 섞여 있어도 AI가 화자를 구분해서 원하는 목소리만 골라냅니다.' },
              { step: 2, title: '이야기를 알려주세요', desc: '누구에게, 어떤 마음을 전하고 싶은지 적어주세요. "엄마 생신에 감사한 마음을 전하고 싶어요" 같이 간단하게.' },
              { step: 3, title: '노래가 완성됩니다', desc: '영업일 기준 3~5일 이내에 완성된 노래를 보내드립니다. 카카오톡 링크로 가족에게 바로 선물하실 수 있습니다.' },
            ].map(s => (
              <div key={s.step} className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-primary-400 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-md">
                  {s.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-ink-light mb-2">STEP {s.step}. {s.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{s.desc}</p>
                  {s.tip && <p className="text-xs text-primary-500 mt-2 bg-primary-50 rounded-lg px-3 py-2">{s.tip}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 카드 5: 활용 장면
    {
      bg: 'bg-white',
      content: (
        <div className="py-16 sm:py-24 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-10">이런 순간에 선물하세요</h2>
          <div className="space-y-6">
            {[
              { label: '부모님 칠순/팔순', desc: '잔치 자리에서 자녀들의 목소리로 만든 노래를 틀어드리세요. 상품권보다 오래 남는 선물입니다.' },
              { label: '부모님 생신', desc: '"감사합니다" 한마디가 쑥스러웠다면, 노래에 담아보세요. 30년 치 감사를 3분짜리 노래 한 곡에.' },
              { label: '부모님 결혼기념일', desc: '꽃다발은 시들지만, 노래는 남습니다. 자녀가 대신 전하는 사랑.' },
              { label: '배우자에게', desc: '결혼 10주년, 20주년. 직접 말하긴 쑥스럽지만 노래라면 전할 수 있는 말.' },
              { label: '그냥, 아무 날도 아닌 날', desc: '특별한 날이 아니어도 괜찮습니다. 이유 없이 전하는 마음이 사실 제일 특별하니까요.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-500 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-ink-light text-sm">{item.label}</p>
                  <p className="text-sm text-ink-muted mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // 카드 6: 리워드
    {
      bg: 'bg-neutral-50',
      content: (
        <div className="py-16 sm:py-24 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-3">리워드 안내</h2>
          <p className="text-ink-muted text-sm text-center mb-10">모든 리워드에 무료 수정이 포함되어 있습니다</p>
          <div className="space-y-4">
            {[
              { tier: '얼리버드', price: '29,000원', badge: '한정 100명', highlight: true, features: ['맞춤 노래 1곡', '고음질 mp3 음원', '카카오톡 공유 링크', '1회 무료 수정'] },
              { tier: '기본', price: '49,000원', badge: '가장 많이 선택', highlight: false, features: ['맞춤 노래 1곡', '무손실 음원 (mp3 + wav)', '카카오톡 공유 링크', '2회 무료 수정'] },
              { tier: '프리미엄', price: '79,000원', badge: '프리미엄', highlight: false, features: ['맞춤 노래 1곡', '무손실 음원 (mp3 + wav)', '감성 가사 카드 이미지 (인쇄용)', '카카오톡 공유 링크', '3회 무료 수정'] },
            ].map(r => (
              <div key={r.tier} className={`bg-white rounded-2xl p-6 sm:p-8 border ${r.highlight ? 'border-primary-400 ring-1 ring-primary-200 shadow-lg' : 'border-neutral-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-ink-light">{r.tier}</span>
                    {r.badge && <span className={`text-[10px] font-bold rounded-full px-2.5 py-0.5 ${r.highlight ? 'bg-primary-400 text-white' : 'bg-neutral-100 text-ink-muted'}`}>{r.badge}</span>}
                  </div>
                  <span className="text-2xl font-black text-ink-light">{r.price}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.features.map((f, i) => (
                    <span key={i} className="text-xs text-ink-muted bg-neutral-50 rounded-full px-3 py-1">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-faint text-center mt-6">전문가에게 맡기면 50~100만원, 하이싱은 커피 5잔 값이면 됩니다</p>
        </div>
      ),
    },
    // 카드 7: 환불 정책
    {
      bg: 'bg-white',
      content: (
        <div className="py-16 sm:py-24 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light text-center mb-10">안심하고 후원하세요</h2>
          <div className="space-y-4">
            {[
              { stage: '결제 후 ~ 제작 시작 전', refund: '100% 환불', desc: '접수 확인 전까지 언제든 취소 가능' },
              { stage: '제작 시작 ~ 작사/작곡 중', refund: '50% 환불', desc: '이미 진행된 작업 비용을 제외하고 환불' },
              { stage: '보컬 합성 이후', refund: '환불 불가', desc: '완성 단계 진입 후에는 환불이 어렵습니다' },
              { stage: '완성곡 전달 후', refund: '무료 수정', desc: '가사, 멜로디, 분위기 등 수정 가능' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between bg-neutral-50 rounded-xl p-4">
                <div>
                  <p className="text-sm font-medium text-ink-light">{r.stage}</p>
                  <p className="text-xs text-ink-faint mt-0.5">{r.desc}</p>
                </div>
                <span className="text-sm font-bold text-ink-light flex-shrink-0 ml-4">{r.refund}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
            <p className="text-sm text-ink-light font-medium">음성 데이터는 제작 완료 후 30일 뒤 서버에서 완전 삭제됩니다.</p>
            <p className="text-xs text-ink-muted mt-1">별도 동의 없이 AI 학습에 사용되지 않습니다.</p>
          </div>
        </div>
      ),
    },
    // 카드 8: 팀 소개
    {
      bg: 'bg-neutral-50',
      content: (
        <div className="py-16 sm:py-24 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-light mb-6">만드는 사람들</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-8">
            주식회사 이노하이(INNO-HI)는 AI 기술로 사람의 마음을 전하는 서비스를 만듭니다.<br />
            &ldquo;기술은 뒤에 있고, 사람의 마음이 앞에 서는&rdquo; 서비스를 지향합니다.
          </p>
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 text-sm text-ink-muted text-left">
            <p><strong className="text-ink-light">상호:</strong> 주식회사 이노하이(INNO-HI)</p>
            <p><strong className="text-ink-light">대표자:</strong> 김민수, 한민우</p>
            <p><strong className="text-ink-light">소재지:</strong> 서울특별시 중구 퇴계로36길 2, B257</p>
            <p><strong className="text-ink-light">이메일:</strong> contact@innohi.ai.kr</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 알림 바 */}
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-center sticky top-0 z-50">
        <p className="text-xs sm:text-sm text-amber-900 font-medium">
          이 페이지는 텀블벅 캠페인 미리보기입니다 · 외부에 공개되지 않습니다
        </p>
      </div>

      {/* 카드 섹션들 */}
      {sections.map((section, i) => (
        <section key={i} className={section.bg}>
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-14">
            {section.content}
          </div>
        </section>
      ))}

      {/* 하단 CTA */}
      <section className="bg-ink text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            이번 부모님 생신에는<br />&ldquo;건강하세요&rdquo; 대신, 노래 한 곡 어떠세요?
          </h2>
          <p className="text-neutral-400 text-sm mb-8">얼리버드 한정 100명 · 29,000원부터</p>
          <div className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-base font-bold rounded-full">
            텀블벅에서 펀딩하기
          </div>
        </div>
      </section>
    </div>
  )
}
