'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, Play, Pause } from 'lucide-react'

function Waveform({ color = 'bg-primary-300', bars = 24 }: { color?: string; bars?: number }) {
  return (
    <div className="flex items-end gap-[2px] h-8 w-full">
      {Array.from({ length: bars }, (_, i) => {
        const h = 20 + Math.sin(i * 0.5) * 25 + Math.cos(i * 0.9) * 12 + 15
        return <div key={i} className={`flex-1 rounded-full ${color}`} style={{ height: `${Math.max(10, Math.min(85, h))}%` }} />
      })}
    </div>
  )
}

function MiniPlayer({ src, title, sub }: { src: string; title: string; sub: string }) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    if (!ref.current) return
    if (playing) ref.current.pause()
    else ref.current.play().catch(() => {})
    setPlaying(!playing)
  }
  useEffect(() => {
    const a = ref.current
    if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end)
    return () => a.removeEventListener('ended', end)
  }, [])
  return (
    <div className="bg-white rounded-xl border border-primary-100 p-4 flex items-center gap-4 cursor-pointer hover:border-primary-300 transition-colors" onClick={toggle}>
      <audio ref={ref} src={src} preload="none" />
      <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center flex-shrink-0">
        {playing ? <Pause className="w-4 h-4 text-white" fill="currentColor" /> : <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{title}</p>
        <p className="text-xs text-ink-muted">{playing ? '재생 중...' : sub}</p>
      </div>
    </div>
  )
}

export default function TumblbukPreview() {
  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 text-center sticky top-0 z-50">
        <p className="text-xs text-amber-900">텀블벅 캠페인 미리보기 · 외부 비공개</p>
      </div>

      {/* ── 히어로 ── */}
      <section className="px-5 sm:px-8 pt-16 pb-14 text-center" style={{ background: 'linear-gradient(180deg, #FFF5F0 0%, #FDF8F5 100%)' }}>
        <div className="max-w-[480px] mx-auto">
          <p className="text-primary-400 text-sm font-medium tracking-widest mb-8">HI-Sing</p>
          <h1 className="text-2xl sm:text-[28px] font-semibold text-ink leading-snug mb-5">
            가족 목소리로 만드는<br />맞춤 노래 선물
          </h1>
          <p className="text-ink-muted text-sm mb-8">
            목소리 파일 하나면, 그 목소리로 노래를 만들어드립니다
          </p>

          {/* 히어로 미니 플레이어 */}
          <div className="bg-white rounded-2xl border border-primary-100 p-5 text-left">
            <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl p-4 text-white mb-3">
              <p className="text-xs font-medium">식탁 위의 온기</p>
              <p className="text-white/50 text-[10px] mt-0.5">실제 완성된 노래 · 3:24</p>
              <div className="mt-2"><Waveform color="bg-white/60" /></div>
            </div>
            <MiniPlayer src="/audio/식탁_위의_온기.mp3" title="지금 바로 들어보세요" sub="식탁 위의 온기 · 3:24" />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-white border border-primary-200 rounded-full pl-2 pr-5 py-2 shadow-sm">
            <span className="bg-primary-400 text-white text-[10px] font-semibold rounded-full px-2.5 py-1">얼리버드</span>
            <span className="text-sm font-semibold text-ink">29,000원</span>
            <span className="text-xs text-ink-faint">· 한정 100명</span>
          </div>
        </div>
      </section>

      {/* ── 공감 ── */}
      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-[480px] mx-auto space-y-6 text-center">
          <p className="text-ink text-base leading-relaxed">
            부모님 생신마다<br />비슷한 선물 드리면서 아쉬웠던 적 있으신가요?
          </p>
          <p className="text-ink text-base leading-relaxed">
            &ldquo;감사합니다&rdquo; 한마디를<br />제대로 전해본 게 언제인지 기억나시나요?
          </p>
          <p className="text-ink text-center text-base font-medium pt-4">
            말로 하긴 쑥스럽고, 편지는 부담스럽고.<br />
            그래서 노래로 전하면 어떨까 생각했습니다.
          </p>
        </div>
      </section>

      {/* ── 이렇게 만들어집니다 ── */}
      <section className="px-5 sm:px-8 py-14" style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF1EB 50%, #FDF8F5 100%)' }}>
        <div className="max-w-[480px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-3">이렇게 만들어집니다</p>
          <p className="text-ink-muted text-sm text-center mb-10">
            목소리 파일을 보내주시면, 가사를 쓰고 멜로디를 만들고<br />그 목소리를 보컬로 얹어 노래를 완성합니다.
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 border border-primary-100/60">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-400 text-white flex items-center justify-center text-sm font-semibold">1</span>
                <div>
                  <p className="text-ink font-medium mb-1">목소리 파일 보내기</p>
                  <p className="text-ink-muted text-sm leading-relaxed">전화 녹음, 영상 속 목소리, 일상 대화. 30초면 됩니다.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-primary-100/60">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-400 text-white flex items-center justify-center text-sm font-semibold">2</span>
                <div>
                  <p className="text-ink font-medium mb-1">전하고 싶은 이야기 적기</p>
                  <p className="text-ink-muted text-sm leading-relaxed">누구에게, 어떤 마음인지. 한두 줄이면 충분합니다.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-primary-100/60">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-400 text-white flex items-center justify-center text-sm font-semibold">3</span>
                <div className="flex-1">
                  <p className="text-ink font-medium mb-1">카카오톡으로 받기</p>
                  <p className="text-ink-muted text-sm leading-relaxed mb-3">3~5일 후, 링크 하나가 옵니다. 부모님께 보내시면 됩니다.</p>
                  <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-lg p-3 text-white">
                    <p className="text-xs font-medium">새벽의 도시락</p>
                    <p className="text-white/50 text-[10px] mt-0.5">맞춤 노래 · 3:24</p>
                    <div className="mt-2"><Waveform color="bg-white/60" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 실제 사례 ── */}
      <section className="px-5 sm:px-8 py-14" style={{ background: '#FFF9F6' }}>
        <div className="max-w-[480px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-12">실제로 만들어진 노래</p>

          {/* 사례 1 + 사진 */}
          <div className="mb-10">
            <img src="/images/album-1.png" alt="" className="w-full rounded-xl mb-5" />
            <p className="text-ink text-sm leading-[1.9] mb-4">
              새벽 다섯 시, 어머니는 30년을 같은 시간에 일어나 도시락을 싸셨습니다.
              반찬 투정을 부리던 날도, 도시락이 창피하다며 떼쓰던 날도
              어머니의 식탁 위 불빛은 꺼지지 않았습니다.
            </p>
            <div className="border-l-2 border-primary-300 pl-4 py-2 mb-4 bg-primary-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;새벽 다섯 시, 작은 불빛 하나 / 엄마의 손끝에서 하루가 시작됐지&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-1">&lt;식탁 위의 온기&gt; 중</p>
            </div>
            <MiniPlayer src="/audio/식탁_위의_온기.mp3" title="식탁 위의 온기" sub="팔순 선물 · 3:24" />
            <p className="text-ink-muted text-xs mt-3">
              팔순잔치에서 틀어드렸는데 어머니가 숟가락을 놓으셨대요.
              <span className="block text-ink-faint mt-1">— 40대 아들</span>
            </p>
          </div>

          {/* 사례 2 + 사진 */}
          <div className="mb-10">
            <img src="/images/album-7.png" alt="" className="w-full rounded-xl mb-5" />
            <p className="text-ink text-sm leading-[1.9] mb-4">
              서울에서 10년. 전화를 걸면 &ldquo;괜찮다, 오지 마라&rdquo; 하시던 아버지.
              어머니가 말씀해주셨습니다.
              &ldquo;아빠가 네가 오는 날이면 달력에 동그라미를 그려놓으셔.&rdquo;
            </p>
            <div className="border-l-2 border-amber-300 pl-4 py-2 mb-4 bg-amber-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;바쁘다는 말로 숨어있었어요 / 사실은 할 말이 없어서였죠&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-1">&lt;바쁘다는 핑계&gt; 중</p>
            </div>
            <MiniPlayer src="/audio/바쁘다는_핑계.mp3" title="바쁘다는 핑계" sub="생신 선물 · 4:02" />
            <p className="text-ink-muted text-xs mt-3">
              아빠가 듣는 내내 창밖만 보셨대요. 저녁에 눈이 빨개져 계시더라고요.
              <span className="block text-ink-faint mt-1">— 30대 딸</span>
            </p>
          </div>

          {/* 사례 3 */}
          <div>
            <p className="text-ink text-sm leading-[1.9] mb-4">
              매주 일요일 여섯 시, 어머니에게서 전화가 옵니다. &ldquo;잘 지내지?&rdquo;
              &ldquo;네, 잘 지내요.&rdquo; 20년 넘게 같은 대화만 반복했습니다.
            </p>
            <div className="border-l-2 border-rose-300 pl-4 py-2 mb-4 bg-rose-50/50 rounded-r-lg">
              <p className="text-ink-muted text-sm italic leading-relaxed">
                &ldquo;수화기 너머 짧은 안부 하나로 / 참 오래도 숨었어요, 미안함을&rdquo;
              </p>
              <p className="text-xs text-ink-faint mt-1">&lt;수화기 너머의 핑계&gt; 중</p>
            </div>
            <MiniPlayer src="/audio/수화기_너머의_핑계.mp3" title="수화기 너머의 핑계" sub="결혼기념일 선물 · 3:48" />
            <p className="text-ink-muted text-xs mt-3">
              결혼기념일에 두 분이 소파에 나란히 앉아 함께 들으셨대요.
              <span className="block text-ink-faint mt-1">— 40대 아들</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 가격 ── */}
      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-[480px] mx-auto text-center">
          <p className="text-ink-muted text-sm mb-6">전문가에게 맞춤 노래를 의뢰하면 50~100만원, 2~4주.</p>
          <p className="text-primary-500 text-sm font-medium mb-2">하이싱은</p>
          <p className="text-ink text-4xl font-semibold">29,000<span className="text-lg font-normal text-ink-muted">원</span></p>
          <p className="text-ink-muted text-sm mt-2">3~5일이면 됩니다.</p>
        </div>
      </section>

      {/* ── 중간 CTA ── */}
      <section className="px-5 sm:px-8 py-10">
        <div className="max-w-[480px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-400 text-white rounded-full px-6 py-3 text-sm font-medium shadow-md shadow-primary-200/40">
            <span>얼리버드 29,000원으로 시작하기</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </div>
          <p className="text-ink-faint text-xs mt-3">한정 100명 · 3~5일 완성 · 마음에 안 들면 무료 수정</p>
        </div>
      </section>

      {/* ── 이런 분들이 ── */}
      <section className="px-5 sm:px-8 py-14" style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #FFF3EE 50%, #FDF8F5 100%)' }}>
        <div className="max-w-[480px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-8">이런 분들이 주문하셨습니다</p>
          <div className="space-y-2.5">
            {[
              '부모님 칠순·팔순에 상품권 말고 다른 걸 드리고 싶었던 분',
              '생신에 "감사합니다" 한마디가 쑥스러웠던 분',
              '결혼기념일에 꽃다발 말고 오래 남는 걸 드리고 싶었던 분',
              '배우자에게 직접 말하긴 어렵지만 마음을 전하고 싶었던 분',
            ].map((text, i) => (
              <div key={i} className="bg-white rounded-lg px-4 py-3.5 border border-primary-100/40 flex items-center gap-3">
                <Check className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <p className="text-ink text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 리워드 ── */}
      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-[480px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-10">리워드</p>
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl p-6 border-2 border-primary-400 overflow-hidden">
              <span className="absolute top-0 right-0 bg-primary-400 text-white text-xs font-medium px-3 py-1 rounded-bl-xl">한정 100명</span>
              <p className="text-ink text-xl font-semibold mb-0.5">29,000<span className="text-sm font-normal">원</span></p>
              <p className="text-ink font-medium text-sm mb-3">얼리버드</p>
              <ul className="text-ink-muted text-sm space-y-1">
                {['맞춤 노래 1곡', '고음질 mp3', '카카오톡 공유 링크', '1회 무료 수정'].map(f => <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary-400" />{f}</li>)}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <p className="text-ink text-xl font-semibold mb-0.5">49,000<span className="text-sm font-normal">원</span></p>
              <p className="text-ink font-medium text-sm mb-3">기본</p>
              <ul className="text-ink-muted text-sm space-y-1">
                {['맞춤 노래 1곡', '무손실 음원 (mp3 + wav)', '카카오톡 공유 링크', '2회 무료 수정'].map(f => <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary-400" />{f}</li>)}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <p className="text-ink text-xl font-semibold mb-0.5">79,000<span className="text-sm font-normal">원</span></p>
              <p className="text-ink font-medium text-sm mb-3">프리미엄</p>
              <ul className="text-ink-muted text-sm space-y-1">
                {['맞춤 노래 1곡', '무손실 음원 (mp3 + wav)', '감성 가사 카드 (인쇄용)', '카카오톡 공유 링크', '3회 무료 수정'].map(f => <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary-400" />{f}</li>)}
              </ul>
            </div>
          </div>
          <p className="text-ink-muted text-xs text-center mt-6">모든 리워드에 무료 수정 포함 · 제작 시작 전 100% 환불 가능</p>
        </div>
      </section>

      {/* ── 걱정되시는 부분 ── */}
      <section className="px-5 sm:px-8 py-14" style={{ background: '#FFF9F6' }}>
        <div className="max-w-[480px] mx-auto">
          <p className="text-ink text-lg font-medium text-center mb-8">걱정되시는 부분</p>
          <div className="space-y-3">
            {[
              { q: '음성 파일은 안전한가요?', a: '제작 목적으로만 사용하고, 완료 후 30일 뒤 삭제합니다. AI 학습에 쓰지 않습니다.' },
              { q: '마음에 안 들면?', a: '리워드별 무료 수정 횟수 내에서 수정해드립니다.' },
              { q: '환불은?', a: '제작 시작 전 전액 환불. 작사·작곡 중 50% 환불.' },
            ].map(item => (
              <div key={item.q} className="bg-white rounded-xl p-4 border border-primary-100/40">
                <p className="text-ink font-medium text-sm mb-1">{item.q}</p>
                <p className="text-ink-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 팀 ── */}
      <section className="px-5 sm:px-8 py-10">
        <div className="max-w-[480px] mx-auto text-center">
          <p className="text-ink font-medium text-sm mb-1">만드는 사람들</p>
          <p className="text-ink-muted text-sm">주식회사 이노하이(INNO-HI)</p>
          <p className="text-ink-faint text-xs mt-2">김민수 · 한민우 | contact@innohi.ai.kr</p>
        </div>
      </section>

      {/* ── 클로징 ── */}
      <section className="px-5 sm:px-8 py-14 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-[480px] mx-auto text-center">
          <p className="text-ink-muted text-lg font-medium leading-relaxed mb-3">이번 부모님 생신에는</p>
          <p className="text-ink text-2xl font-semibold mb-6">노래 한 곡 어떠세요?</p>
          <p className="text-primary-400 text-sm">얼리버드 한정 100명 · 29,000원부터</p>
        </div>
      </section>
    </div>
  )
}
