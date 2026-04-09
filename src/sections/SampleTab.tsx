'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { trackSamplePlay, trackCTAClick } from '@/lib/analytics'

const samples = [
  {
    title: '식탁 위의 온기', type: '오리지널', duration: '3:24',
    to: '엄마 칠순 선물', from: '40대 아들',
    src: '/audio/식탁_위의_온기.mp3', color: 'from-primary-400 to-sky-500',
    story: '매일 새벽 4시에 일어나 도시락을 싸주시던 엄마. 한 번도 고맙다는 말을 제대로 못 했습니다. 칠순을 앞두고, 30년 치 감사를 노래에 담았습니다.',
    quote: '"칠순잔치에서 틀어드렸는데 온 가족이 울었어요."',
    result: '어머니가 핸드폰에 저장해두고 매일 아침 들으신다고 합니다.',
  },
  {
    title: '바쁘다는 핑계', type: '오리지널', duration: '4:02',
    to: '아빠 팔순 선물', from: '30대 딸',
    src: '/audio/바쁘다는_핑계.mp3', color: 'from-amber-400 to-orange-500',
    story: '서울에서 직장 생활하면서 명절에도 못 내려가는 날이 많았습니다. 전화할 때마다 "괜찮다, 바쁘면 오지 마라" 하시던 아빠. 그 말이 항상 마음에 걸렸습니다.',
    quote: '"아빠가 차에서 반복 재생하신대요."',
    result: '팔순잔치 당일, 아버지가 처음으로 딸 앞에서 눈물을 보이셨다고 합니다.',
  },
  {
    title: '수화기 너머의 핑계', type: '오리지널', duration: '3:48',
    to: '부모님 결혼기념일', from: '40대 아들',
    src: '/audio/수화기_너머의_핑계.mp3', color: 'from-rose-400 to-pink-500',
    story: '매주 일요일 전화 드리면 항상 "잘 지내지?" 한마디. 그 짧은 말에 담긴 걱정을 알면서도 "네, 잘 지내요"로만 대답했습니다. 결혼기념일에 그동안 못 한 말을 담았습니다.',
    quote: '"부모님이 전화하실 때마다 이 노래 생각나신대요."',
    result: '결혼기념일 저녁, 부모님이 손을 잡고 함께 들으셨다고 합니다.',
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
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
      <div className="grid md:grid-cols-5 gap-0">
        {/* 왼쪽: LP + 재생 */}
        <div className="md:col-span-2 p-6 sm:p-8 flex flex-col items-center justify-center bg-neutral-50">
          <div className="relative cursor-pointer" onClick={onToggle}>
            <LpDisc color={s.color} />
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
              <div className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center">
                {isPlaying
                  ? <Pause className="w-4 h-4 text-primary-400" fill="currentColor" />
                  : <Play className="w-4 h-4 text-primary-400 ml-0.5" fill="currentColor" />
                }
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="font-bold text-ink-light text-base">{s.title}</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-xs font-medium text-primary-400 bg-primary-50 rounded-full px-2.5 py-0.5">{s.type}</span>
              <span className="text-xs text-ink-faint">{s.duration}</span>
            </div>
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

      {/* 샘플 스토리 카드 */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-14 space-y-6">
          {samples.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <SampleStoryCard s={s} isPlaying={playingIdx === i} onToggle={() => handleToggle(i)} />
            </FadeIn>
          ))}
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
