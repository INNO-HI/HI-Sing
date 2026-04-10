'use client'

import { useState, useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { trackCTAClick } from '@/lib/analytics'
import type { TabId } from '@/types'

interface HomeTabProps {
  onNavigate: (tab: TabId) => void
}

const CTA_LABEL = '바로 구매하기'

/* ── 타이핑 애니메이션 훅 ──────────────────────── */
function useTypewriter(text: string, speed = 60, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(delayTimer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed)
    return () => clearTimeout(timer)
  }, [displayed, started, text, speed])

  return displayed
}

/* ── 파형 애니메이션 컴포넌트 ──────────────────── */
/* ── 히어로 파형 — 부드러운 곡선 ──────────────── */
function HeroWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 3개 레이어의 고유 속도/진폭
    const layers = [
      { speed: 0.008, freq: 0.015, amp: 0.28, alpha: 0.12 },
      { speed: 0.012, freq: 0.02,  amp: 0.22, alpha: 0.15 },
      { speed: 0.006, freq: 0.025, amp: 0.18, alpha: 0.10 },
    ]

    let animId: number
    const draw = () => {
      const t = frameRef.current
      frameRef.current++

      const w = canvas.width / 2
      const h = canvas.height / 2
      ctx.setTransform(2, 0, 0, 2, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const midY = h / 2

      for (const layer of layers) {
        // 양쪽 끝에서 서서히 사라지는 envelope
        const envelope = (x: number) => {
          const fadeLen = w * 0.25
          if (x < fadeLen) return x / fadeLen
          if (x > w - fadeLen) return (w - x) / fadeLen
          return 1
        }

        // 위쪽 곡선
        ctx.beginPath()
        ctx.moveTo(0, midY)
        for (let x = 0; x <= w; x += 2) {
          const env = envelope(x)
          const y = midY - (
            Math.sin(x * layer.freq + t * layer.speed) *
            Math.sin(x * layer.freq * 0.7 + t * layer.speed * 1.3) *
            h * layer.amp * env
          )
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, midY)
        ctx.closePath()
        ctx.fillStyle = `rgba(245, 158, 139, ${layer.alpha})`
        ctx.fill()

        // 아래쪽 곡선 (미러)
        ctx.beginPath()
        ctx.moveTo(0, midY)
        for (let x = 0; x <= w; x += 2) {
          const env = envelope(x)
          const y = midY + (
            Math.sin(x * layer.freq + t * layer.speed + 0.5) *
            Math.sin(x * layer.freq * 0.7 + t * layer.speed * 1.3 + 0.5) *
            h * layer.amp * env
          )
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, midY)
        ctx.closePath()
        ctx.fillStyle = `rgba(245, 158, 139, ${layer.alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full lg:w-[340px] xl:w-[400px] h-28 sm:h-40 lg:h-52"
    />
  )
}

/* ── 핸드폰 목업 + 앨범 슬라이드 인터랙션 ──────── */
const albums = [
  { title: '어머니 팔순잔치', sub: '팔순 잔치 · 3:24', img: '/images/album-1.png', time: '1:08', to: '식탁 위의 온기', story: '' },
  { title: '부모님 결혼기념일', sub: '결혼기념일 · 4:02', img: '/images/album-2.png', time: '2:15', to: '우리의 계절', story: '' },
  { title: '아기 첫 생일', sub: '돌잔치 · 3:15', img: '/images/album-3.png', time: '1:40', to: '첫 번째 노래', story: '' },
  { title: '우리 아기에게', sub: '자장가 · 3:48', img: '/images/album-4.png', time: '0:52', to: '엄마의 자장가', story: '' },
  { title: '고등학교 졸업', sub: '졸업식 · 3:36', img: '/images/album-5.png', time: '1:52', to: '졸업 축가', story: '' },
  { title: '군 입대 전', sub: '입대 전 · 3:52', img: '/images/album-6.png', time: '2:08', to: '다녀올게요', story: '' },
  { title: '취업 합격', sub: '취업 축하 · 3:08', img: '/images/album-7.png', time: '1:20', to: '고생했어', story: '' },
  { title: '프로포즈', sub: '프로포즈 · 4:11', img: '/images/album-8.png', time: '1:35', to: '평생 함께', story: '' },
]

function PhoneMockup() {
  const [idx, setIdx] = useState(0)
  const [transition, setTransition] = useState(true)
  const [paused, setPaused] = useState(false)
  const TOTAL_SETS = 10
  const totalCards = albums.length * TOTAL_SETS
  const resetPoint = albums.length * (TOTAL_SETS - 2)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setIdx(prev => {
        const next = prev + 1
        if (next >= resetPoint) {
          // 트랜지션 끄고 처음으로 리셋
          setTimeout(() => {
            setTransition(false)
            setIdx(0)
            // 다음 프레임에 트랜지션 다시 켜기
            requestAnimationFrame(() => requestAnimationFrame(() => setTransition(true)))
          }, 700)
        }
        return next
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [resetPoint, paused])

  const realIdx = idx % albums.length
  const album = albums[realIdx]

  return (
    <div className="relative mt-14 overflow-visible group/phone" style={{ height: '480px' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* 메인색 원형 그라데이션 */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-[5]" style={{ background: 'radial-gradient(circle, rgba(245,158,139,0.7) 0%, rgba(245,158,139,0.4) 30%, rgba(245,158,139,0.15) 55%, transparent 75%)' }} />

      {/* 핸드폰 목업 — 가운데 하단 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[270px] sm:w-[290px] rounded-t-[38px] bg-white border border-neutral-200 border-b-0 p-3 shadow-2xl">
          <div className="w-20 h-5 rounded-full bg-neutral-900 mx-auto mb-2" />
          <div className="rounded-t-[26px] bg-neutral-50 px-5 pt-4 pb-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-ink-faint">9:41</p>
              <div className="w-4 h-2 rounded-sm border border-ink-faint/40" />
            </div>
            {/* 앨범아트 — 가로 슬라이드 (핸드폰 위를 스쳐 지나감) */}
            {/* 앨범 슬라이드 — 핸드폰 위를 스쳐 지나감 */}
            <div className="relative mx-auto mb-4" style={{ width: 220, height: 220, overflow: 'visible' }}>
              <div
                className={`absolute top-0 flex ${transition ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{
                  left: 0,
                  gap: 100,
                  transform: `translateX(${-idx * (220 + 100)}px)`,
                }}
              >
                {[...albums, ...albums, ...albums, ...albums, ...albums, ...albums, ...albums, ...albums, ...albums, ...albums].map((a, i) => (
                  <div
                    key={i}
                    className={`flex-shrink-0 w-[220px] h-[220px] rounded-2xl overflow-hidden relative shadow-lg transition-all duration-700 ${
                      i === idx ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-40 hover:opacity-70 hover:scale-[0.9]'
                    } cursor-pointer`}
                  >
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover" style={{ filter: 'sepia(0.25) saturate(0.85) brightness(1.02) contrast(0.95) hue-rotate(-5deg)' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-bold text-sm leading-tight">{a.title}</p>
                      <p className="text-white/70 text-xs mt-1">{a.to}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-bold text-ink-light text-center text-sm transition-all duration-500">{album.title}</p>
            <p className="text-ink-muted text-center text-[11px] mt-0.5">{album.sub}</p>
            <div className="flex items-center justify-center gap-7 mt-4">
              <svg className="w-4 h-4 text-ink-faint" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
              <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-primary-400">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <svg className="w-4 h-4 text-ink-faint" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnimatedWaveform() {
  return (
    <div className="flex items-end gap-[1.5px] h-10 w-full">
      {Array.from({ length: 40 }, (_, i) => {
        const baseDelay = (Math.sin(i * 0.7) * 0.5 + 0.5) * 0.8
        const duration = 0.6 + Math.random() * 0.8
        return (
          <div
            key={i}
            className="flex-1 rounded-full bg-white/80"
            style={{
              animation: `waveform ${duration}s ease-in-out ${baseDelay}s infinite alternate`,
              height: `${15 + Math.random() * 20}%`,
            }}
          />
        )
      })}
    </div>
  )
}

/* ── 파일 드래그 애니메이션 컴포넌트 ──────────── */
function DragFileAnimation() {
  const [show, setShow] = useState(false)
  const [dropped, setDropped] = useState(false)

  useEffect(() => {
    const loop = () => {
      setShow(false)
      setDropped(false)
      const t1 = setTimeout(() => setShow(true), 400)
      const t2 = setTimeout(() => setDropped(true), 1600)
      const t3 = setTimeout(loop, 3500)
      return [t1, t2, t3]
    }
    const timers = loop()
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative">
      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
        show && !dropped ? 'border-primary-400 bg-primary-50/30' : 'border-neutral-300'
      }`}>
        <p className="text-ink-muted text-sm">mp3, wav, m4a</p>
        <p className="text-ink-faint text-xs mt-1">클릭하거나 파일을 드래그하세요</p>
      </div>
      {/* 파일이 위에서 내려오며 드래그되는 효과 */}
      <div
        className="absolute -right-2 transition-all duration-700 ease-out"
        style={{
          top: show ? (dropped ? '50%' : '-8px') : '-40px',
          opacity: show ? 1 : 0,
          transform: dropped ? 'translateY(-50%) scale(0.95)' : 'scale(1)',
        }}
      >
        <div className={`bg-primary-50 border rounded-lg px-3 py-2 shadow-md flex items-center gap-2 transition-all duration-300 ${
          dropped ? 'border-primary-400 shadow-primary-200/40' : 'border-primary-200'
        }`}>
          <div className="w-4 h-4 rounded bg-primary-400 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></div>
          <span className="text-xs text-ink font-medium">음성파일.wav</span>
        </div>
      </div>
    </div>
  )
}

/* ── 메인 컴포넌트 ─────────────────────────────── */
export function HomeTab({ onNavigate }: HomeTabProps) {
  const step2To = useTypewriter('엄마 (칠순 생신)', 150, 1200)
  const step2Text = useTypewriter('매일 새벽 도시락 싸주셨던 감사한 마음을 전하고 싶어요', 100, 4000)

  const handleHeroCTA = () => {
    trackCTAClick('hero', CTA_LABEL)
    onNavigate('pricing')
  }

  const handleBottomCTA = () => {
    trackCTAClick('bottom_cta', CTA_LABEL)
    onNavigate('pricing')
  }

  return (
    <>
      {/* ═══ 1. Hero ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center bg-gradient-to-b from-neutral-50 to-white pt-20 pb-0 overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-100/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-ink-muted text-base sm:text-lg mb-3">마음을 직접 전하기 쑥스럽다면, 하이싱으로 먼저 전해보세요.</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-light tracking-tight leading-tight">
                <span className="text-primary-400">노래</span>로 전하는 우리 가족 이야기
              </h1>

              <div className="mt-8">
                <button
                  onClick={handleHeroCTA}
                  className="px-8 py-3.5 text-[15px] font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors cursor-pointer"
                >
                  {CTA_LABEL}
                </button>
              </div>
            </div>
          </FadeIn>

          {/* 하단: 핸드폰 목업 — 하단 짤림 + 앨범 슬라이드 */}
          <FadeIn delay={0.15}>
            <PhoneMockup />
          </FadeIn>
        </div>
      </section>

      {/* ═══ 2. 공감 (말풍선) ══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-ink text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-primary-300 text-sm font-medium mb-6">혹시, 이런 고민하신 적 있으신가요?</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ lineHeight: 1.5 }}>
                마음은 가득한데,<br />전하기가 참 어렵습니다
              </h2>
            </div>
          </FadeIn>

          <div className="mt-20 max-w-xl mx-auto space-y-8">
            {[
              { text: '부모님 생신인데 올해도 상품권밖에 생각이 안 나요', align: 'left' },
              { text: '마음을 전하고 싶은데 방법을 모르겠어요', align: 'right' },
              { text: '편지는 쑥스럽고 영상은 부담스럽고...', align: 'left' },
              { text: '뭔가 특별한 건 비용이 너무 비싸요', align: 'right' },
            ].map((b, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className={`flex ${b.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <div className="relative max-w-[85%]">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/15">
                      <p className="text-white text-[15px] leading-relaxed">{b.text}</p>
                    </div>
                    <div className={`absolute -bottom-2 ${b.align === 'left' ? 'left-5' : 'right-5'}`}>
                      <svg width="14" height="8" viewBox="0 0 14 8" className={b.align === 'right' ? 'scale-x-[-1]' : ''}>
                        <path d="M0 0 L7 8 L14 0 Z" fill="rgba(255,255,255,0.1)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.7}>
            <div className="mt-20 text-center">
              <p className="text-neutral-400 text-[15px] leading-[1.8]">
                마음이 없는 게 아닙니다.<br />어떻게 전해야 할지 몰랐을 뿐이죠.
              </p>
              <p className="mt-6 text-primary-300 font-semibold text-lg">
                그래서 하이싱을 만들었습니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ═══ 3. 가장 쉽고 빠른 방법 ═══════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light">
                나만의 노래를 만드는 가장 쉽고 빠른 방법
              </h2>
            </div>
          </FadeIn>

          {/* STEP 1 */}
          <FadeIn delay={0.1}>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
              <div>
                <span className="text-primary-400 text-sm font-bold">STEP 1</span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink-light mt-2 mb-4">사랑하는 사람의<br />목소리를 보내주세요.</h3>
                <p className="text-ink-muted text-base leading-relaxed">
                  가족의 목소리가 담긴 파일을 업로드하세요.<br />
                  일상 대화, 전화 녹음, 영상 속 목소리<br />
                  뭐든 괜찮습니다.<br /><br />
                  <strong className="text-primary-400">30초 이상이면 충분합니다.</strong>
                </p>
              </div>
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 shadow-lg shadow-neutral-200/30">
                <div className="bg-white rounded-xl border border-neutral-200 p-5">
                  <p className="text-sm font-medium text-ink mb-3">음성 파일 업로드</p>
                  <DragFileAnimation />
                  <div className="mt-3 bg-primary-50 rounded-lg p-3 flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-primary-400 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
                    <span className="text-xs text-ink-light">엄마_전화통화_0315.m4a</span>
                    <span className="text-[10px] text-ink-faint ml-auto">2.4MB</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* STEP 2 */}
          <FadeIn delay={0.15}>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-24">
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 md:order-1 order-2 shadow-lg shadow-neutral-200/30">
                <div className="bg-white rounded-xl border border-neutral-200 p-5">
                  <p className="text-sm font-medium text-ink mb-3">이야기 입력</p>
                  <div className="space-y-3">
                    <div><p className="text-[11px] text-ink-muted mb-1">누구에게</p><div className="bg-neutral-50 rounded px-3 py-2 text-sm text-ink min-h-[2.25rem]">{step2To}{step2To.length < 9 && <span className="animate-pulse text-primary-400">|</span>}</div></div>
                    <div>
                      <p className="text-[11px] text-ink-muted mb-1">전하고 싶은 마음</p>
                      <div className="bg-neutral-50 rounded px-3 py-2 text-sm text-ink leading-relaxed h-[4.5rem] overflow-hidden">
                        {step2Text}<span className="animate-pulse text-primary-400">|</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-primary-400 text-white text-xs rounded px-3 py-1.5 font-medium">오리지널</div>
                      <div className="bg-neutral-100 text-ink-muted text-xs rounded px-3 py-1.5">커버</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:order-2 order-1">
                <span className="text-primary-400 text-sm font-bold">STEP 2</span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink-light mt-2 mb-4">마음과 이야기를<br />적어주세요.</h3>
                <p className="text-ink-muted text-base leading-relaxed">
                  누구에게, 어떤 마음을 전하고 싶은지<br />
                  간단히 적어주세요.<br /><br />
                  <strong className="text-primary-400">이야기에 맞는 가사와 멜로디가 만들어집니다.</strong>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* STEP 3 */}
          <FadeIn delay={0.2}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-primary-400 text-sm font-bold">STEP 3</span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink-light mt-2 mb-4">노래로 도착합니다.</h3>
                <p className="text-ink-muted text-base leading-relaxed">
                  <strong className="text-ink">3~5일(영업일 기준)</strong> 이내에<br />
                  완성된 노래를 보내드립니다.<br /><br />
                  카카오톡 링크로 바로 선물할 수 있고,<br />
                  프리미엄 리워드는 가사 카드 이미지도 함께 제공됩니다.
                </p>
              </div>
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 shadow-lg shadow-neutral-200/30">
                <div className="bg-white rounded-xl border border-neutral-200 p-5">
                  <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-lg p-5 text-white mb-3">
                    <p className="font-bold">새벽의 도시락</p>
                    <p className="text-white/60 text-xs mt-0.5">오리지널 · 3분 24초</p>
                    <div className="mt-3"><AnimatedWaveform /></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-neutral-200 text-ink-muted text-xs rounded-lg py-2.5 text-center font-medium">카카오톡 공유</div>
                    <div className="flex-1 bg-neutral-100 text-ink text-xs rounded-lg py-2.5 text-center font-medium">다운로드</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 6. 추천 ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-primary-50 via-white to-primary-50/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn><h2 className="text-2xl sm:text-3xl font-bold text-ink-light mb-10 text-center">이런 분들께 추천드립니다</h2></FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl border border-primary-100 p-8 sm:p-12 shadow-lg shadow-primary-100/30">
                <ul className="space-y-7">
                  {([
                    { text: '부모님 칠순/팔순 잔치에 ', bold: '특별한 선물', after: '을 준비하고 싶은 분' },
                    { text: '부모님 생신에 "감사합니다" 한마디가 ', bold: '쑥스러운', after: ' 분' },
                    { text: '부모님 결혼기념일에 꽃다발 말고 ', bold: '오래 남는 선물', after: '을 드리고 싶은 분' },
                    { text: '배우자에게 직접 말하긴 쑥스럽지만 ', bold: '마음을 전하고', after: ' 싶은 분' },
                    { text: '특별한 날이 아니어도, ', bold: '이유 없이 마음을 전하고', after: ' 싶은 분' },
                  ] as const).map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-3 h-3 text-white" /></div>
                      <span className="text-base sm:text-lg text-ink font-medium leading-relaxed">{item.text}<strong className="text-primary-500 font-bold">{item.bold}</strong>{item.after}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ═══ 5. 특별함 ═════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light">하이싱의 특별함</h2>
              <p className="text-ink-muted text-base mt-3">누구나 쉽게 마음을<br className="sm:hidden" /> 노래로 전할 수 있는 이유</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { img: `/images/special-voice.png`, title: '30초 음성이면 충분', desc: '전화 녹음, 영상 속 목소리,\n일상 대화 뭐든 괜찮습니다.\n30초 이상이면 충분해요.' },
              { img: `/images/special-nomusic.png`, title: '작곡/작사 몰라도 OK', desc: '전하고 싶은 마음만 적어주세요.\n멜로디와 가사를 만들고, 가족 목소리를 보컬로 얹어드립니다.' },
              { img: `/images/special-compose.png`, title: '프리미엄 작사/작곡', desc: '단순 변환이 아닙니다.\n마음에 어울리는 가사를 쓰고,\n그에 맞는 멜로디를 작곡합니다.' },
              { img: `/images/special-fast.png`, title: '3~5일이면 완성', desc: '영업일 기준 3~5일이면 완성된 노래를 받아보실 수 있습니다.\n1회 무료 수정 포함.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-44 h-44 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary-100 shadow-md">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-ink-light mb-4">{item.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed whitespace-pre-line">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. CTA ════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-neutral-50">
        {/* 배경: 왼쪽 메인색 그라데이션 + 오른쪽 사진 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden sm:block">
          <img src={`/images/cta-family-new.png`} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ink-light mb-6" style={{ lineHeight: 1.5 }}>
                이번 부모님 생신에는 &ldquo;건강하세요&rdquo; 대신,
                <br className="hidden sm:inline" />
                <span className="sm:hidden"> </span>노래 한 곡 어떠세요?
              </h2>
              <button onClick={handleBottomCTA} className="px-8 py-4 text-base font-semibold text-white bg-primary-400 rounded-lg hover:bg-primary-500 transition-colors cursor-pointer">
                {CTA_LABEL}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
