'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Shield, Info, ChevronDown } from 'lucide-react'
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

function LpDisc({ color }: { color: string }) {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <div className="w-24 h-24 rounded-full border-[5px] border-neutral-800 shadow-lg" style={{ background: 'conic-gradient(from 0deg, #1a1a1a 0%, #333 25%, #1a1a1a 50%, #333 75%, #1a1a1a 100%)' }}>
        <div className="absolute inset-[8px] rounded-full border border-neutral-600/30" />
        <div className="absolute inset-[16px] rounded-full border border-neutral-600/20" />
        <div className={`absolute inset-[24px] rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}>
          <div className="w-2 h-2 rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  )
}

function SampleStoryCard({ s, isPlaying, onToggle }: { s: Sample; isPlaying: boolean; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="grid md:grid-cols-5 gap-0">
        {/* 왼쪽: 사진 + 재생 */}
        <div className="md:col-span-2 relative aspect-square md:aspect-auto cursor-pointer overflow-hidden min-h-[300px]" onClick={onToggle}>
          <img src={s.img} alt={s.title} className="w-full h-full object-cover" style={{ filter: 'sepia(0.25) saturate(0.85) brightness(1.02) contrast(0.95) hue-rotate(-5deg)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 shadow-xl flex items-center justify-center transition-all ${isPlaying ? 'scale-110' : 'scale-100 hover:scale-110'}`}>
              {isPlaying
                ? <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-primary-400" fill="currentColor" />
                : <Play className="w-6 h-6 sm:w-7 sm:h-7 text-primary-400 ml-1" fill="currentColor" />
              }
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-block text-[10px] font-medium bg-white/20 backdrop-blur-sm text-white rounded-full px-2.5 py-0.5 mb-2">
              {s.duration}
            </span>
            <p className="font-bold text-white text-xl leading-tight">{s.title}</p>
            <p className="text-white/80 text-xs mt-1.5">{s.to} · {s.from}</p>
          </div>
        </div>

        {/* 오른쪽: 임팩트 인용구 중심 */}
        <div className="md:col-span-3 p-7 sm:p-10 flex flex-col">
          {/* 핵심: 받은 날의 반응 인용구 — 대형 */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-primary-300 text-4xl font-serif leading-none mb-3 select-none">“</div>
            <p className="text-ink text-base sm:text-lg leading-relaxed font-medium">
              {s.reaction.replace(/^"|"$/g, '')}
            </p>
            <p className="text-ink-muted text-xs mt-4">— {s.from}, {s.to}을(를) 위한 노래</p>
          </div>

          {/* 확장 토글 */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-6 flex items-center justify-between w-full px-4 py-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors text-sm text-ink-light font-medium"
          >
            <span>{expanded ? '접기' : '이 노래가 만들어진 이야기'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          {expanded && (
            <div className="mt-5 space-y-5 pt-5 border-t border-neutral-100">
              <div>
                <p className="text-[10px] font-semibold text-ink-faint tracking-wider uppercase mb-1.5">시작</p>
                <p className="text-[13px] sm:text-sm text-ink-light leading-relaxed">{s.background}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-ink-faint tracking-wider uppercase mb-1.5">주문 계기</p>
                <p className="text-[13px] sm:text-sm text-ink-light leading-relaxed">{s.trigger}</p>
              </div>
              <div className="bg-primary-50/60 border-l-2 border-primary-300 rounded-r-lg px-4 py-3">
                <p className="text-[10px] font-semibold text-primary-500 tracking-wider uppercase mb-1">가사 한 구절</p>
                <p className="text-[13px] sm:text-sm text-ink leading-relaxed italic whitespace-pre-line">{s.lyricsExcerpt}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-primary-400 tracking-wider uppercase mb-1.5">그 후…</p>
                <p className="text-[13px] sm:text-sm text-ink-light leading-relaxed">{s.afterStory}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {s.tags.map(t => (
                  <span key={t} className="text-[11px] font-medium text-primary-500 bg-primary-50 rounded-full px-2.5 py-0.5">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface SampleTabProps {
  onNavigate?: (tab: TabId) => void
}

export function SampleTab({ onNavigate }: SampleTabProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)

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
      audio.play()
      setPlayingIdx(idx)
      trackSamplePlay(samples[idx].title)
    }
  }

  return (
    <div className="pt-24 lg:pt-28">
      <audio ref={audioRef} preload="metadata" />

      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center">
              <p className="text-primary-400 font-semibold text-sm mb-3">Sample</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-light">
                이런 노래가 만들어집니다
              </h1>
              <p className="text-ink-muted text-sm mt-3">클릭하면 실제 샘플을 들어볼 수 있습니다</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-16 sm:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn delay={0.15}>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Before — 개인정보 보호 안내 */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-ink-muted" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink-light text-sm">Before</p>
                    <p className="text-xs text-ink-muted">원본 음성 샘플</p>
                  </div>
                </div>
                <div className="flex items-center gap-[2px] h-12 w-full opacity-60">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-neutral-300"
                      style={{ height: `${15 + (Math.sin(i * 1.3) * 0.5 + 0.5) * 55}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* After — 실제 재생 가능 */}
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6 sm:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink-light text-sm">After</p>
                    <p className="text-xs text-ink-muted">완성된 노래 · 실제 샘플</p>
                  </div>
                </div>
                <div className="flex items-center gap-[2px] h-12 w-full">
                  {Array.from({ length: 40 }, (_, i) => {
                    const base = 30 + Math.sin(i * 0.35) * 25 + Math.cos(i * 0.8) * 12 + 20
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-primary-300"
                        style={{ height: `${Math.max(15, Math.min(90, base))}%` }}
                      />
                    )
                  })}
                </div>
                <button
                  onClick={() => handleToggle(0)}
                  className="mt-4 flex items-center gap-3 bg-white rounded-xl px-4 py-3 hover:bg-primary-100/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {playingIdx === 0
                      ? <Pause className="w-4 h-4 text-white" fill="currentColor" />
                      : <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                    }
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-bold text-ink-light truncate">식탁 위의 온기</p>
                    <p className="text-[11px] text-ink-muted">{playingIdx === 0 ? '재생 중…' : '맞춤 노래 · 3:24'}</p>
                  </div>
                </button>
                <p className="text-[11px] text-ink-faint mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  실제 고객에게 전달된 완성곡입니다
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 샘플 스토리 슬라이더 */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-primary-400 font-semibold text-sm mb-3">Real Stories</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light">누군가에겐 평생 기억될 순간이었습니다</h2>
              <p className="text-ink-muted text-sm mt-3">카드 아래 버튼으로 다른 사연도 들어보세요</p>
            </div>
          </FadeIn>

          {/* 탭 버튼 */}
          <FadeIn delay={0.05}>
            <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
              {samples.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveIdx(i)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    activeIdx === i
                      ? 'bg-primary-400 text-white shadow-md shadow-primary-200/50'
                      : 'bg-white text-ink-muted border border-neutral-200 hover:border-primary-200'
                  }`}
                >
                  {s.to}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* 슬라이드 카드 */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIdx * 100}%)` }}
            >
              {samples.map((s, i) => (
                <div key={s.title} className="w-full flex-shrink-0 px-1">
                  <SampleStoryCard s={s} isPlaying={playingIdx === i} onToggle={() => handleToggle(i)} />
                </div>
              ))}
            </div>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-8">
            {samples.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-2 rounded-full transition-all ${activeIdx === i ? 'w-8 bg-primary-400' : 'w-2 bg-neutral-300'}`}
                aria-label={`샘플 ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {onNavigate && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 text-center">
            <FadeIn>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-light mb-3">마음에 드셨나요?</h2>
              <p className="text-ink-muted text-sm mb-6">지금 바로 나만의 노래를 만들어보세요</p>
              <button
                onClick={() => {
                  trackCTAClick('sample_bottom', '29,000원부터 시작하기')
                  onNavigate('pricing')
                }}
                className="px-8 py-3.5 text-[15px] font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors cursor-pointer"
              >
                29,000원부터 시작하기
              </button>
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  )
}
