'use client'

import { useState, useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { PromoBanner } from '@/components/PromoBanner'
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
// 어버이날 캠페인 기간: 부모님 2장(album-1/2)을 맨 앞에 유지
// 이미지와 이름 매칭은 기존 album-N.png 그대로, sub 텍스트에만 어버이날 태그 추가
const albums = [
  { title: '어머니 팔순잔치', sub: '어버이날 · 팔순 · 3:24', img: '/images/album-1.png', time: '1:08', to: '식탁 위의 온기', story: '' },
  { title: '부모님 결혼기념일', sub: '어버이날 · 기념일 · 4:02', img: '/images/album-2.png', time: '2:15', to: '우리의 계절', story: '' },
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
  const TOTAL_SETS = 3
  const totalCards = albums.length * TOTAL_SETS
  const resetPoint = albums.length

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

  const cardSize = 250
  const cardGap = 90
  return (
    <div className="relative w-full h-full min-h-[520px] overflow-visible group/phone" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* 메인색 원형 그라데이션 — 폰 뒤에 위치 */}
      <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none z-[5] blur-3xl opacity-55" style={{ background: 'radial-gradient(circle, rgba(253,189,181,0.4) 0%, rgba(254,219,214,0.2) 45%, transparent 70%)' }} />
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none z-[5] blur-2xl opacity-65" style={{ background: 'radial-gradient(circle, rgba(254,219,214,0.45) 0%, rgba(255,241,237,0.2) 50%, transparent 75%)' }} />

      {/* 핸드폰 목업 — 가운데 하단 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[290px] sm:w-[340px] rounded-t-[36px] sm:rounded-t-[40px] bg-white border border-neutral-200 border-b-0 p-3 sm:p-3.5 shadow-2xl">
          <div className="w-20 sm:w-24 h-5 sm:h-6 rounded-full bg-neutral-500 mx-auto mb-2.5" />
          <div className="rounded-t-[26px] sm:rounded-t-[30px] bg-neutral-50 px-5 sm:px-6 pt-6 sm:pt-8 pb-5 sm:pb-6">
            {/* 앨범아트 — 가로 슬라이드 (핸드폰 위를 스쳐 지나감) */}
            <div className="relative mx-auto mb-5 w-[250px] h-[250px]" style={{ overflow: 'visible' }}>
              <div
                className={`absolute top-0 flex ${transition ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{
                  left: 0,
                  gap: `${cardGap}px`,
                  transform: `translateX(${-idx * (cardSize + cardGap)}px)`,
                }}
              >
                {Array.from({ length: TOTAL_SETS }).flatMap(() => albums).map((a, i) => (
                  <div
                    key={i}
                    aria-hidden={i !== idx}
                    className={`flex-shrink-0 w-[250px] h-[250px] rounded-2xl overflow-hidden relative shadow-lg transition-all duration-700 ${
                      i === idx ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-40 hover:opacity-70 hover:scale-[0.9]'
                    } cursor-pointer`}
                  >
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover" style={{ filter: 'sepia(0.15) saturate(1) brightness(1.12) contrast(0.98) hue-rotate(-3deg)' }} />
                    {/* 프로스티드 글래스 바 — 하단만 */}
                    <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/25 border-t border-white/20 px-5 py-3">
                      <p className="text-white font-bold text-base leading-tight drop-shadow">{a.title}</p>
                      <p className="text-white/90 text-sm mt-0.5 drop-shadow">{a.to}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="font-bold text-ink-light text-center text-base transition-all duration-500">{album.title}</p>
            <p className="text-ink-muted text-center text-sm mt-1">{album.sub}</p>
            <div className="flex items-center justify-center gap-8 mt-5">
              <svg className="w-5 h-5 text-ink-faint" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
              <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md bg-primary-400">
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <svg className="w-5 h-5 text-ink-faint" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnimatedWaveform({ primary = false }: { primary?: boolean } = {}) {
  const BARS = 32
  return (
    <div className="flex items-end gap-[2px] h-10 w-full">
      {Array.from({ length: BARS }, (_, i) => {
        const center = BARS / 2
        const distFromCenter = Math.abs(i - center) / center
        const envelope = 1 - distFromCenter * 0.55
        const minH = 18 + (Math.sin(i * 0.9) * 0.5 + 0.5) * 10 * envelope
        const maxH = minH + 35 * envelope + Math.cos(i * 1.4) * 10 * envelope
        const duration = 0.55 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 0.7
        const delay = (Math.sin(i * 1.3) * 0.5 + 0.5) * duration
        return (
          <div
            key={i}
            className={`flex-1 rounded-full ${primary ? 'bg-primary-400' : 'bg-white/85'}`}
            style={{
              animation: `waveformBar-${i % 4} ${duration}s ease-in-out ${delay}s infinite alternate`,
              animationFillMode: 'both',
              ['--wf-min' as string]: `${Math.max(10, Math.min(40, minH))}%`,
              ['--wf-max' as string]: `${Math.max(30, Math.min(95, maxH))}%`,
              height: `${Math.max(10, Math.min(95, (minH + maxH) / 2))}%`,
            }}
          />
        )
      })}
      <style jsx>{`
        @keyframes waveformBar-0 { 0% { height: var(--wf-min); } 100% { height: var(--wf-max); } }
        @keyframes waveformBar-1 { 0% { height: var(--wf-max); } 50% { height: var(--wf-min); } 100% { height: var(--wf-max); } }
        @keyframes waveformBar-2 { 0% { height: var(--wf-min); } 40% { height: var(--wf-max); } 60% { height: var(--wf-min); } 100% { height: var(--wf-max); } }
        @keyframes waveformBar-3 { 0% { height: var(--wf-max); } 100% { height: var(--wf-min); } }
      `}</style>
    </div>
  )
}

/* ── 파일 드래그 애니메이션 — 파일이 서서히 생겨나 업로드 영역으로 들어감 ── */
function DragFileAnimation() {
  // phase: 0 = 비어있음, 1 = 파일 생겨남(페이드 인), 2 = 드래그(내려감), 3 = 업로드 완료
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const loop = () => {
      setPhase(0)
      const t1 = setTimeout(() => setPhase(1), 800)   // 파일 나타남
      const t2 = setTimeout(() => setPhase(2), 2000)  // 드래그 시작
      const t3 = setTimeout(() => setPhase(3), 2700)  // 업로드 완료
      const t4 = setTimeout(loop, 4800)
      return [t1, t2, t3, t4]
    }
    const timers = loop()
    return () => timers.forEach(clearTimeout)
  }, [])

  const dropActive = phase === 2
  const uploaded = phase === 3

  return (
    <div className="relative h-[140px]">
      {/* 업로드 영역 */}
      <div className={`absolute inset-0 border-2 border-dashed rounded-lg p-6 text-center transition-all duration-500 ${
        uploaded ? 'border-primary-400 bg-primary-50/60' : dropActive ? 'border-primary-400 bg-primary-50/30' : 'border-neutral-300'
      }`}>
        {uploaded ? (
          <div className="flex items-center justify-center gap-2 h-full">
            <div className="w-5 h-5 rounded-full bg-primary-400 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
            <span className="text-sm text-ink font-medium">음성파일.wav</span>
            <span className="text-[10px] text-ink-faint">2.4MB</span>
          </div>
        ) : (
          <>
            <p className="text-ink-muted text-sm">mp3, wav, m4a</p>
            <p className="text-ink-faint text-xs mt-1">클릭하거나 파일을 드래그하세요</p>
          </>
        )}
      </div>

      {/* 날아오는 파일 카드 — phase 1, 2에만 보임 */}
      {!uploaded && (
        <div
          className="absolute right-2 transition-all duration-700 ease-out pointer-events-none"
          style={{
            top: phase === 0 ? '-8px' : phase === 1 ? '-8px' : '50%',
            opacity: phase === 0 ? 0 : 1,
            transform: phase === 0 ? 'translateY(-10px) scale(0.9)' : phase === 2 ? 'translateY(-50%) scale(0.95)' : 'translateY(0) scale(1)',
          }}
        >
          <div className="bg-white border border-primary-300 rounded-lg px-3 py-2 shadow-lg shadow-primary-200/40 flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary-400 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></div>
            <span className="text-xs text-ink font-medium">음성파일.wav</span>
          </div>
        </div>
      )}
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
      {/* ═══ 1. Hero — 반응형: sm~lg 세로 / xl+ 2컬럼 ═══════════════ */}
      <section className="relative min-h-screen xl:h-screen flex flex-col bg-gradient-to-b from-white via-neutral-50 to-primary-50/40 pt-20 pb-0 overflow-hidden">
        {/* 배경 장식 — 하단 primary glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[900px] xl:w-[1200px] h-[700px] xl:h-[900px] rounded-full bg-primary-100/50 blur-3xl pointer-events-none" />

        {/* 히어로 전체 좌우 비네트 — xl 이상에선 약화 */}
        <div
          className="absolute inset-0 pointer-events-none z-30 xl:hidden"
          style={{
            background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.85) 10%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.85) 90%, #ffffff 100%)',
          }}
        />

        <div className="relative z-10 w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col xl:flex-row xl:items-center xl:gap-12 2xl:gap-16 flex-1 min-h-0 xl:justify-between">
          {/* 텍스트/CTA 블록 */}
          <FadeIn className="xl:flex-1 xl:max-w-[640px] 2xl:max-w-[720px]">
            <div className="text-center xl:text-left mt-10 sm:mt-20 xl:mt-0">
              <p className="text-sm sm:text-lg xl:text-xl text-ink-muted mb-4 sm:mb-5 break-keep">
                평소에 못 하던 말을,<br className="sm:hidden" /> 노래로 대신 전할 수 있게 만들었습니다.
              </p>
              <h1 className="text-[22px] sm:text-4xl lg:text-5xl xl:text-[56px] 2xl:text-[68px] font-bold text-ink-light tracking-tight leading-[1.35] break-keep">
                노래로 전하는<br className="sm:hidden xl:inline" /> <span className="text-primary-400">우리 가족</span> 이야기
              </h1>
              <p className="mt-3 sm:mt-4 xl:mt-6 text-[13px] sm:text-base xl:text-lg text-ink-muted break-keep xl:max-w-[560px]">
                가족의 <strong className="text-ink-light">실제 목소리</strong>와 <strong className="text-ink-light">직접 쓴 사연</strong>을 바탕으로<br className="sm:hidden" /> 새로 만드는 맞춤 노래입니다.
              </p>

              <div className="mt-6 sm:mt-8 xl:mt-10">
                <button
                  onClick={handleHeroCTA}
                  className="px-8 xl:px-10 py-3.5 xl:py-4 text-[15px] xl:text-base font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 shadow-lg shadow-primary-200/50 transition-all cursor-pointer"
                >
                  {CTA_LABEL}
                </button>
              </div>
            </div>
          </FadeIn>

          {/* 목업 블록 — xl 이상은 오른쪽 컬럼 (가운데 정렬로 좌우 균형 유지) */}
          <FadeIn delay={0.15} className="flex justify-center mt-10 sm:mt-12 lg:mt-8 xl:mt-0 xl:flex-1 xl:flex xl:justify-center">
            <div className="xl:scale-95 2xl:scale-105">
              <PhoneMockup />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 1.5 텀블벅 프로모 모달 (페이지 로드 후 자동 오픈) ═══════════════════ */}
      <PromoBanner />

      {/* ═══ 2. 공감 (말풍선) ══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-ink text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-primary-300 text-sm font-medium mb-6">혹시, 이런 고민하신 적 있으신가요?</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ lineHeight: 1.5 }}>
                표현은 하고 싶은데,<br />막상 하려면 어렵습니다
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
                    <div className={`rounded-2xl px-6 py-5 shadow-lg ${b.align === 'right' ? 'bg-primary-400 text-white' : 'bg-white text-ink-light'}`}>
                      <p className="text-[15px] leading-relaxed">{b.text}</p>
                    </div>
                    {/* 말풍선 꼬리 */}
                    <div className={`absolute -bottom-2 ${b.align === 'left' ? 'left-6' : 'right-6'}`}>
                      <svg width="16" height="10" viewBox="0 0 16 10" className={b.align === 'right' ? 'scale-x-[-1]' : ''}>
                        <path d="M0 0 L8 10 L16 0 Z" fill={b.align === 'right' ? '#FF6E59' : '#ffffff'} />
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
            <div className="grid md:grid-cols-2 gap-10 items-center mb-40">
              <div>
                <span className="text-primary-400 text-sm font-bold">STEP 1</span>
                <h3 className="text-xl sm:text-2xl font-bold text-ink-light mt-2 mb-4">사랑하는 사람의<br />목소리를 보내주세요.</h3>
                <p className="text-ink-muted text-base leading-relaxed">
                  가족의 목소리가 담긴 파일을 업로드하세요.<br />
                  일상 대화, 전화 녹음, 영상 속 목소리<br />
                  뭐든 괜찮습니다.<br /><br />
                  <strong className="text-primary-400">한 분 목소리 기준 최소 60초 · 1분 이상 권장</strong>
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
            <div className="grid md:grid-cols-2 gap-10 items-center mb-40">
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
                  작성해주신 이야기와<br />
                  가족의 목소리를 바탕으로<br />
                  맞춤 노래 한 곡을 만들어드립니다.<br /><br />
                  <strong className="text-primary-400">mp3 음원으로 3~5일 안에 도착합니다.</strong>
                </p>
              </div>
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 shadow-lg shadow-neutral-200/30">
                <div className="bg-white rounded-xl border border-neutral-200 p-5">
                  <div className="bg-primary-50 border border-primary-100 rounded-lg p-5 mb-3">
                    <p className="font-bold text-ink-light">세아의 첫 생일</p>
                    <p className="text-ink-muted text-xs mt-0.5">돌잔치 · 3:24</p>
                    <div className="mt-3"><AnimatedWaveform primary /></div>
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


      {/* ═══ 6.5 실제 받은 분들의 반응 ═══════════════════ */}
      <section className="py-20 sm:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block text-[11px] font-semibold text-primary-500 bg-white border border-primary-100 rounded-full px-3 py-1 mb-3">실제 전달 후 반응</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light leading-tight">
                한 번 듣고 끝나는 선물보다,<br className="sm:hidden" /> 오래 남는 방식으로 전하고 싶을 때
              </h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: '부모님이 처음 듣고 두 분 다 우셨어요. 팔순 잔치에서 틀어드렸는데 후렴 첫 소절에 어머니가 숟가락을 놓으셨어요.',
                from: '40대 아들',
                situation: '어머니 팔순 선물',
              },
              {
                quote: '상품권 드리던 예년보다 훨씬 기억에 남았다고 하셔요. 어머니는 매일 아침 설거지하실 때 이 노래를 틀어두신대요.',
                from: '30대 딸',
                situation: '어버이날 선물',
              },
              {
                quote: '아버지 눈물, 태어나서 처음 봤어요. 지금도 차에서 매일 반복 재생하시고 동료분들께 자랑하신다고 해요.',
                from: '30대 딸',
                situation: '아버지 생신',
              },
            ].map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 h-full flex flex-col">
                  <svg className="w-6 h-6 text-primary-300 mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                  </svg>
                  <p className="text-[15px] text-ink-light leading-relaxed flex-1">&ldquo;{r.quote}&rdquo;</p>
                  <div className="mt-5 pt-4 border-t border-neutral-100">
                    <p className="text-sm font-semibold text-ink">{r.from}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{r.situation}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="mt-8 text-center text-xs text-ink-faint">
              실제 주문 고객의 전달 후 반응 (이름·세부 내용은 고객 동의 하 편집)
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 5. 특별함 ═════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-light">이런 방식으로 만듭니다</h2>
              <p className="text-ink-muted text-base mt-3">다른 AI 노래 생성 서비스와<br className="sm:hidden" /> 어떻게 다른지</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              { img: `/images/special-voice.png`, title: '한 사람 목소리면 충분', desc: '가족 중 한 분 목소리가 담긴\n1분 이상 음성이면 됩니다.\n배경음·잡음 일부 허용.' },
              { img: `/images/special-nomusic.png`, title: '작곡/작사 몰라도 OK', desc: '전하고 싶은 마음만 적어주세요.\n멜로디와 가사를 만들고, 가족 목소리를\n보컬로 얹어드립니다.' },
              { img: `/images/special-compose.png`, title: '사연을 읽고 가사를 씁니다', desc: 'AI로 찍어내지 않습니다.\n사연을 읽고 사람이 가사를 쓰고,\n어울리는 멜로디를 작곡합니다.' },
              { img: `/images/special-fast.png`, title: '오리지널 곡 · 커버 아님', desc: '기존 곡의 가사만 바꾸지 않습니다.\n새 멜로디와 가사로\n처음부터 만들어드려요.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-44 h-44 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary-100 shadow-md">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-ink-light mb-4 whitespace-nowrap">{item.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed whitespace-pre-line break-keep">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. CTA ════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-neutral-50">
        {/* 배경: 왼쪽 primary 은은한 그라데이션 + 오른쪽 사진 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden sm:block">
          <img src={`/images/cta-family-new.png`} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-ink-light mb-6" style={{ lineHeight: 1.5 }}>
                이번 생신에는 평소에 못 하던 말을,
                <br className="hidden sm:inline" />
                <span className="sm:hidden"> </span>다른 방식으로 전해보세요.
              </h2>
              <button onClick={handleBottomCTA} className="px-8 py-4 text-base font-semibold text-white bg-primary-400 rounded-lg hover:bg-primary-500 transition-colors cursor-pointer">
                {CTA_LABEL}
              </button>
              <p className="mt-3 text-xs text-ink-muted">
                오늘 주문 시 어버이날 전 전달 가능 · 1회 무료 수정 · 3~5일 완성
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
