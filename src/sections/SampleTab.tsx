'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Check, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { trackSamplePlay, trackCTAClick } from '@/lib/analytics'
import type { TabId } from '@/types'

interface Sample {
  title: string
  duration: string
  to: string
  from: string
  src: string
  color: string
  img: string
  tags: string[]
  background: string
  trigger: string
  lyricsExcerpt: string
  reaction: string
  afterStory: string
}

const samples: Sample[] = [
  {
    title: '식탁 위의 온기',

    duration: '3:24',
    to: '어머니 팔순',
    from: '40대 아들',
    src: '/audio/식탁_위의_온기.mp3',
    color: 'from-primary-400 to-sky-500',
    img: '/images/album-1.png',
    tags: ['팔순', '어머니', '감사'],
    background:
      '새벽 다섯 시, 어머니는 30년을 같은 시간에 일어나 도시락을 싸셨습니다. 학창시절 반찬 투정을 부리던 날도, 고등학생 때 도시락이 창피하다며 떼쓰던 날도 어머니의 식탁 위 불빛은 꺼지지 않았습니다.',
    trigger:
      '팔순이 다가오는데 선물을 고민하던 중, 어머니 핸드폰 속 30년 전 흑백 사진 한 장이 눈에 들어왔습니다. 그날 사진을 찍어주신 건 평생 사진첩에 들어간 적 없는 어머니 본인이었다는 걸 그제야 알았습니다.',
    lyricsExcerpt:
      '"새벽 다섯 시, 작은 불빛 하나 / 엄마의 손끝에서 하루가 시작됐지 / 그땐 몰랐죠, 그 따뜻함이 / 평생 내 인생의 도시락이 될 줄은"',
    reaction:
      '"팔순잔치에서 틀어드렸는데 후렴 첫 소절이 나오자 어머니가 숟가락을 놓으셨어요. 온 가족이 다 울었고, 제가 가장 많이 울었던 것 같아요."',
    afterStory:
      '어머니는 지금도 매일 아침 설거지를 하실 때 이 노래를 틀어두신다고 합니다. 형님이 몇 번을 전화로 \"어머니가 동네 이웃분들한테 자랑하느라 바쁘시다\"고 전해주셨습니다.',
  },
  {
    title: '바쁘다는 핑계',

    duration: '4:02',
    to: '아버지 생신',
    from: '30대 딸',
    src: '/audio/바쁘다는_핑계.mp3',
    color: 'from-amber-400 to-orange-500',
    img: '/images/album-7.png',
    tags: ['생신', '아버지', '미안함'],
    background:
      '서울로 올라온 지 10년. 처음엔 매달 가던 본가가 어느새 명절에나 가는 곳이 됐습니다. 전화를 걸면 늘 "괜찮다, 바쁠 텐데 오지 마라" 하시던 아버지. 정말 괜찮으신 줄 알았습니다.',
    trigger:
      '지난 설날, 어머니가 몰래 귀띔해주셨습니다. "아빠가 너 내려오는 날이면 일주일 전부터 달력에 동그라미를 그려놓으셔." 그 말을 듣고 돌아오는 KTX에서 처음으로 아버지 생신 선물을 진지하게 고민했습니다.',
    lyricsExcerpt:
      '"바쁘다는 말로 숨어있었어요 / 사실은 할 말이 없어서였죠 / 아빠, 오늘만큼은 고백할게요 / 제가 가장 닮고 싶은 사람은 당신이에요"',
    reaction:
      '"아빠가 듣는 내내 창밖만 보셨어요. 끝나고 아무 말 없이 방에 들어가셨는데, 저녁 먹을 때 눈이 빨개져 계시더라고요. 아빠 눈물, 태어나서 처음 봤습니다."',
    afterStory:
      '아버지는 출퇴근 길 차 안에서 이 노래를 반복 재생하신다고 합니다. 어머니 말씀으로는 요즘 회사 동료분들께도 자랑하시느라 카톡으로 링크를 보내신다고 해요.',
  },
  {
    title: '수화기 너머의 핑계',

    duration: '3:48',
    to: '부모님 결혼기념일',
    from: '40대 아들',
    src: '/audio/수화기_너머의_핑계.mp3',
    color: 'from-rose-400 to-pink-500',
    img: '/images/album-2.png',
    tags: ['결혼기념일', '부모님', '가족'],
    background:
      '매주 일요일 저녁 여섯 시, 어머니에게서 전화가 옵니다. "잘 지내지?" 한마디. 제 대답은 늘 "네, 잘 지내요." 20년 넘게 이 문답만 반복했습니다. 정작 두 분이 40년째 같은 밥상에서 식사하신다는 걸 잊고 살았습니다.',
    trigger:
      '부모님 40주년 결혼기념일이 다가오자 누나가 물었습니다. "엄마 아빠 연애 시절 이야기 들어본 적 있어?" 생각해보니 한 번도 없었습니다. 그 주말, 엄마에게 두 분이 처음 만난 날 이야기를 녹음해달라 부탁드렸습니다.',
    lyricsExcerpt:
      '"수화기 너머 짧은 안부 하나로 / 참 오래도 숨었어요, 미안함을 / 오늘 이 노래가 수화기 대신 / 두 분의 40년을 안아드릴게요"',
    reaction:
      '"결혼기념일 저녁, 두 분이 거실 소파에 나란히 앉아 함께 들으셨대요. 중간에 아버지가 어머니 손을 잡으셨다고, 누나가 전화로 울면서 이야기해줬어요."',
    afterStory:
      '부모님은 이 노래를 결혼기념일마다 틀기로 하셨다고 합니다. 매해 같은 날, 같은 노래. 이제 저도 매주 일요일 여섯 시에 먼저 전화를 겁니다.',
  },
]


interface SampleTabProps {
  onNavigate?: (tab: TabId) => void
}

export function SampleTab({ onNavigate }: SampleTabProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnd = () => setPlayingIdx(null)
    audio.addEventListener('ended', onEnd)
    return () => audio.removeEventListener('ended', onEnd)
  }, [playingIdx])

  const handleToggle = (idx: number) => {
    const audio = audioRef.current
    if (!audio) return
    if (playingIdx === idx) {
      audio.pause()
      setPlayingIdx(null)
    } else {
      audio.src = samples[idx].src
      audio.play().catch(() => {})
      setPlayingIdx(idx)
      trackSamplePlay(samples[idx].title)
    }
  }

  const s1 = samples[0]
  const s2 = samples[1]
  const goOrder = () => {
    trackCTAClick('sample_page', '나도 부모님께 노래 선물하기')
    onNavigate?.('pricing')
  }

  return (
    <div className="pt-24 lg:pt-28">
      <audio ref={audioRef} preload="metadata" />

      {/* ═══ 1. 히어로 — 반응 훅 + 즉시 재생 + 즉시 CTA ═══ */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-14 text-center">
          <FadeIn>
            <span className="inline-block text-[11px] font-semibold text-primary-500 bg-primary-50 border border-primary-100 rounded-full px-3 py-1 mb-5">실제 전달 반응</span>
            <h1 className="text-[26px] sm:text-4xl lg:text-5xl font-bold text-ink-light leading-tight break-keep">
              후렴 첫 소절에<br className="sm:hidden" />{' '}
              <span className="text-primary-500">어머니가 숟가락을 놓으셨어요</span>
            </h1>
            <p className="mt-5 text-sm sm:text-base text-ink-muted leading-relaxed break-keep">
              단 한 번도 말로 전하지 못했던 마음을,<br className="sm:hidden" /> 노래로 대신 전했습니다.
            </p>
          </FadeIn>

          {/* 즉시 재생 플레이어 */}
          <FadeIn delay={0.1}>
            <button
              onClick={() => handleToggle(0)}
              className="mt-8 inline-flex items-center gap-4 bg-white rounded-2xl border border-primary-200 shadow-xl shadow-primary-100/40 px-6 py-5 sm:px-8 sm:py-6 hover:-translate-y-0.5 transition-all"
              aria-label="대표 샘플곡 재생"
            >
              <span className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-400 flex items-center justify-center shadow-lg transition-transform ${playingIdx === 0 ? 'scale-105' : ''}`}>
                {playingIdx === 0
                  ? <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" />
                  : <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" fill="currentColor" />
                }
              </span>
              <span className="text-left">
                <span className="block text-base sm:text-lg font-bold text-ink-light">&lt;{s1.title}&gt;</span>
                <span className="block text-xs sm:text-sm text-ink-muted mt-0.5">
                  {playingIdx === 0 ? '재생 중…' : `${s1.to} · ${s1.from} · ${s1.duration}`}
                </span>
              </span>
            </button>
          </FadeIn>

          {/* 즉시 CTA */}
          <FadeIn delay={0.2}>
            <div className="mt-7">
              {onNavigate && (
                <button
                  onClick={goOrder}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors"
                >
                  나도 부모님께 노래 선물하기
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 2. 상황 설명 ═══ */}
      <section className="py-14 sm:py-16 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <p className="text-primary-400 font-semibold text-xs tracking-[0.2em] uppercase mb-3 text-center">사례 · 어머니 팔순잔치</p>
            <h2 className="text-xl sm:text-2xl font-bold text-ink-light leading-snug text-center mb-5 break-keep">
              평생 고생하셨다는 말을,<br />한 번도 제대로 드린 적이 없었습니다
            </h2>
            <p className="text-[15px] sm:text-base text-ink-muted leading-relaxed text-center break-keep">
              {s1.background}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. 노래 구간 (가사 한 구절) ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="rounded-3xl bg-gradient-to-br from-primary-50 via-white to-primary-50 border border-primary-100 p-8 sm:p-12">
              <p className="text-center text-primary-500 font-semibold text-xs tracking-[0.2em] uppercase mb-5">
                가사 한 구절
              </p>
              <p className="text-center text-[17px] sm:text-xl text-ink leading-[1.9] italic font-medium whitespace-pre-line break-keep">
                {s1.lyricsExcerpt}
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => handleToggle(0)}
                  className="inline-flex items-center gap-3 bg-white rounded-full border border-primary-200 px-5 py-3 hover:shadow-md transition-all"
                >
                  <span className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center">
                    {playingIdx === 0
                      ? <Pause className="w-4 h-4 text-white" fill="currentColor" />
                      : <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                    }
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {playingIdx === 0 ? '재생 중…' : '전체 곡 다시 듣기'}
                  </span>
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 4. 감정 폭발 — 가족 반응 ═══ */}
      <section className="py-16 sm:py-20 bg-ink text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14 text-center">
          <FadeIn>
            <p className="text-primary-300 font-semibold text-xs tracking-[0.2em] uppercase mb-4">그날, 팔순잔치</p>
            <blockquote className="text-[18px] sm:text-2xl font-medium leading-[1.8] break-keep">
              {s1.reaction}
            </blockquote>
            <p className="mt-6 text-sm text-neutral-400 leading-relaxed break-keep">
              {s1.afterStory}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 5. Before / After — 감정형 대조 ═══ */}
      <section className="py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <h2 className="text-xl sm:text-2xl font-bold text-ink-light text-center mb-10 break-keep">
              한 곡이 바꾼 것
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 max-w-3xl mx-auto">
            <FadeIn delay={0.05}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-7 h-full">
                <p className="text-[11px] font-bold text-ink-faint tracking-[0.2em] uppercase mb-4">Before</p>
                <ul className="space-y-3 text-[15px] text-ink-muted leading-relaxed">
                  <li>· 표현이 서툴러서 매번 미루던 감사 인사</li>
                  <li>· 상품권·꽃다발로 대신하던 생신 선물</li>
                  <li>· &ldquo;잘 지내지?&rdquo; 한 마디로 끝나던 통화</li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-primary-50/60 rounded-2xl border border-primary-200 p-7 h-full">
                <p className="text-[11px] font-bold text-primary-500 tracking-[0.2em] uppercase mb-4">After</p>
                <ul className="space-y-3 text-[15px] text-ink leading-relaxed">
                  <li>· 노래로 처음 전한 평생의 감사</li>
                  <li>· 어머니가 매일 틀어두는 선물</li>
                  <li>· 가족 모두가 기억할 팔순 저녁</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 6. 신뢰 4줄 체크리스트 (구매 직전) ═══ */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
              <p className="text-center text-[11px] font-bold text-primary-500 tracking-[0.2em] uppercase mb-4">안심하고 맡기세요</p>
              <ul className="space-y-3">
                {[
                  '가족 목소리 기반 맞춤 노래 제작',
                  '주문 1회 제작에만 사용 · 외부 미공유',
                  '제작 후 30일 내 원본 음성 자동 삭제',
                  '결과가 마음에 안 들 경우 1회 무료 수정',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary-400 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-[15px] text-ink-light leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. 3단계 간단 ═══ */}
      <section className="py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <h2 className="text-xl sm:text-2xl font-bold text-ink-light text-center mb-10 break-keep">
              단 3단계로 완성됩니다
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {[
              { n: 1, t: '목소리 업로드', d: '전화 녹음·영상·일상 대화 60초 (1분 이상 권장)' },
              { n: 2, t: '사연 입력', d: '전하고 싶은 마음·기억·못다 한 말' },
              { n: 3, t: '노래로 도착', d: 'mp3 + 카카오톡 공유 링크 · 3~5일' },
            ].map(({ n, t, d }) => (
              <FadeIn key={n} delay={n * 0.05}>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 h-full">
                  <div className="w-9 h-9 rounded-full bg-primary-400 text-white font-bold text-sm flex items-center justify-center mb-4">{n}</div>
                  <h3 className="text-[15px] font-bold text-ink-light mb-2">{t}</h3>
                  <p className="text-[13px] text-ink-muted leading-relaxed break-keep">{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. 두 번째 사례 (간단) ═══ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-8">
              <span className="inline-block text-[11px] font-semibold text-primary-500 bg-primary-50 border border-primary-100 rounded-full px-3 py-1 mb-3">두 번째 사례</span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-light leading-snug break-keep">
                아빠 눈물, 태어나서 처음 봤습니다
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                <img src={s2.img} alt={s2.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" style={{ filter: 'sepia(0.15) saturate(0.95)' }} />
                <div className="min-w-0">
                  <p className="font-bold text-ink text-base">&lt;{s2.title}&gt;</p>
                  <p className="text-xs text-ink-muted mt-0.5">{s2.to} · {s2.from} · {s2.duration}</p>
                </div>
              </div>
              <p className="text-[14px] text-ink-light leading-relaxed break-keep mb-5">
                {s2.reaction}
              </p>
              <button
                onClick={() => handleToggle(1)}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-white rounded-xl border border-primary-200 px-5 py-3 hover:bg-primary-50/40 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-primary-400 flex items-center justify-center">
                  {playingIdx === 1
                    ? <Pause className="w-4 h-4 text-white" fill="currentColor" />
                    : <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                  }
                </span>
                <span className="text-sm font-semibold text-ink">
                  {playingIdx === 1 ? '재생 중…' : '이 노래 들어보기'}
                </span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 9. 가격 + 구성 (전환 핵심) ═══ */}
      <section className="py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="rounded-3xl bg-white border border-primary-200 shadow-xl shadow-primary-100/30 p-8 sm:p-10 text-center">
              <p className="text-[11px] font-bold text-primary-500 tracking-[0.2em] uppercase mb-3">얼리버드 한정 · 100명</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-ink-faint text-base line-through">29,000원</span>
                <span className="text-primary-500 text-4xl font-black">19,900원</span>
              </div>
              <p className="text-xs text-ink-muted mt-2">어버이날 시즌 31% 할인</p>

              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-ink-light text-left max-w-md mx-auto">
                {['맞춤 작사 (사연 기반)', '오리지널 작곡', '음성 기반 보컬 생성', 'mp3 음원 + 카카오톡 전달', '1회 무료 수정', '3~5일 완성'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" strokeWidth={3} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 10. 마지막 강 CTA ═══ */}
      {onNavigate && (
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-14 text-center">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light leading-tight break-keep">
                지금 아니면,<br className="sm:hidden" />{' '}
                <span className="text-primary-500">이 말을 또 미루게 됩니다</span>
              </h2>
              <p className="mt-4 text-ink-muted text-sm sm:text-base break-keep">
                어버이날 전 전달 마감 임박 · 오늘 주문 시에만 제작 일정 보장
              </p>
              <button
                onClick={goOrder}
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-primary-400 rounded-full hover:bg-primary-500 shadow-lg shadow-primary-200/50 transition-all"
              >
                지금 노래로 마음 전하기
                <ArrowRight className="w-5 h-5" />
              </button>
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  )
}
