'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { trackSamplePlay, trackCTAClick } from '@/lib/analytics'

const samples = [
  {
    title: '식탁 위의 온기', type: '오리지널', duration: '3:24',
    to: '어머니 팔순', from: '40대 아들',
    src: '/audio/식탁_위의_온기.mp3', color: 'from-primary-400 to-sky-500',
    img: '/images/album-1.png',
    story: '매일 새벽 도시락을 싸주시던 어머니. 제대로 고맙다는 말 한 번 못 한 채 30년이 흘렀습니다. 팔순 앞에, 한 번은 노래로라도 전하고 싶었습니다.',
    quote: '"팔순잔치에서 틀어드렸는데 온 가족이 울었어요."',
    result: '어머니가 핸드폰에 저장해두고 매일 아침 들으신다고 합니다.',
  },
  {
    title: '바쁘다는 핑계', type: '오리지널', duration: '4:02',
    to: '아버지 생신', from: '30대 딸',
    src: '/audio/바쁘다는_핑계.mp3', color: 'from-amber-400 to-orange-500',
    img: '/images/album-7.png',
    story: '서울에서 직장 생활하면서 명절에도 못 내려간 날이 많았습니다. 전화할 때마다 "괜찮다, 오지 마라" 하시던 아버지. 그 말이 계속 마음에 남았습니다.',
    quote: '"아버지가 차에서 반복 재생하신대요."',
    result: '생신 당일, 아버지가 처음으로 딸 앞에서 눈물을 보이셨다고 합니다.',
  },
  {
    title: '수화기 너머의 핑계', type: '오리지널', duration: '3:48',
    to: '부모님 결혼기념일', from: '40대 아들',
    src: '/audio/수화기_너머의_핑계.mp3', color: 'from-rose-400 to-pink-500',
    img: '/images/album-2.png',
    story: '매주 일요일 전화를 드릴 때마다 들려오던 "잘 지내지?" 한마디. 그 짧은 말에 담긴 걱정을 알면서도 늘 "네, 잘 지내요"로만 답했습니다.',
    quote: '"부모님이 전화하실 때마다 이 노래 생각나신대요."',
    result: '결혼기념일 저녁, 두 분이 손을 잡고 함께 들으셨다고 합니다.',
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

function SampleStoryCard({ s, isPlaying, onToggle }: { s: typeof samples[0]; isPlaying: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="grid md:grid-cols-5 gap-0">
        {/* 왼쪽: 사진 + 재생 */}
        <div className="md:col-span-2 relative aspect-square md:aspect-auto cursor-pointer overflow-hidden" onClick={onToggle}>
          <img src={s.img} alt={s.title} className="w-full h-full object-cover" style={{ filter: 'sepia(0.25) saturate(0.85) brightness(1.02) contrast(0.95) hue-rotate(-5deg)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          {/* 재생 버튼 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-14 h-14 rounded-full bg-white/95 shadow-lg flex items-center justify-center transition-all ${isPlaying ? 'scale-110' : 'scale-100 hover:scale-110'}`}>
              {isPlaying
                ? <Pause className="w-5 h-5 text-primary-400" fill="currentColor" />
                : <Play className="w-5 h-5 text-primary-400 ml-0.5" fill="currentColor" />
              }
            </div>
          </div>
          {/* 곡 정보 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-white/70">{s.duration}</span>
            </div>
            <p className="font-bold text-white text-base">{s.title}</p>
          </div>
        </div>
        {/* 오른쪽: 스토리 */}
        <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-ink-light">{s.to}</span>
              <span className="text-xs text-ink-faint">·</span>
              <span className="text-xs text-ink-muted">{s.from}</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">{s.story}</p>
          </div>
          <div className="mt-5 pt-4 border-t border-neutral-100">
            <p className="text-sm text-ink-muted italic">{s.quote}</p>
            <p className="text-xs text-primary-400 mt-2">{s.result}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import type { TabId } from '@/types'

export function SampleTab({ onNavigate }: { onNavigate?: (tab: TabId) => void }) {
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
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light">
                같은 목소리인데, 노래가 되면 이렇게 다릅니다
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-ink-muted" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink-light text-sm">Before</p>
                    <p className="text-xs text-ink-muted">원본 음성 파일</p>
                  </div>
                </div>
                <div className="flex items-center gap-[2px] h-12 w-full">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div key={i} className="flex-1 rounded-full bg-neutral-300" style={{ height: `${15 + Math.random() * 70}%` }} />
                  ))}
                </div>
                <p className="text-xs text-ink-faint mt-3">일상 대화 녹음 · 42초</p>
              </div>
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink-light text-sm">After</p>
                    <p className="text-xs text-ink-muted">완성된 노래</p>
                  </div>
                </div>
                <div className="flex items-center gap-[2px] h-12 w-full">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div key={i} className="flex-1 rounded-full bg-primary-300" style={{ height: `${30 + Math.sin(i * 0.3) * 35 + 20}%` }} />
                  ))}
                </div>
                <p className="text-xs text-ink-muted mt-3">식탁 위의 온기 · 3:24</p>
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
              <p className="text-primary-400 font-semibold text-sm mb-3">실제 제작 사례</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light">이런 이야기가 노래가 되었어요</h2>
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
              <button onClick={() => onNavigate('pricing')} className="px-8 py-3.5 text-[15px] font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors cursor-pointer">
                29,000원부터 시작하기
              </button>
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  )
}
