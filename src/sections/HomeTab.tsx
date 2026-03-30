import { Play, Upload, PenLine, Music2, Mic, Headphones, Cake, Heart, Gift, Flower2, Sun } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import type { TabId } from '@/App'

interface HomeTabProps {
  onNavigate: (tab: TabId) => void
}

export function HomeTab({ onNavigate }: HomeTabProps) {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-ivory-200 to-ivory-100">
        {/* Decorative circles */}
        <div className="absolute top-20 right-[-100px] w-[400px] h-[400px] rounded-full bg-coral-100/60 blur-3xl" />
        <div className="absolute bottom-10 left-[-60px] w-[300px] h-[300px] rounded-full bg-coral-50/80 blur-2xl" />

        <div className="relative z-10 w-full max-w-container mx-auto px-5 sm:px-8 lg:px-14 py-32 lg:py-40">
          <div className="max-w-[640px]">
            <FadeIn>
              <p className="text-coral-400 font-semibold text-sm tracking-wide mb-4">
                HI-Sing
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="font-bold text-ink leading-[1.15] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 3.5rem)' }}
              >
                노래로 전하는<br />
                우리 가족 이야기
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-5 text-ink-light text-lg sm:text-xl leading-relaxed">
                마음을 직접 전하기 쑥스럽다면,<br className="sm:hidden" />
                HI-Sing으로 먼저 전해보세요.
              </p>
            </FadeIn>

            {/* Sample play button (UI only) */}
            <FadeIn delay={0.3}>
              <div className="mt-8 flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 max-w-md border border-coral-100/50">
                <button className="flex-shrink-0 w-12 h-12 rounded-full bg-coral-400 flex items-center justify-center hover:bg-coral-500 transition-colors shadow-lg shadow-coral-200/50">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </button>
                <div className="min-w-0">
                  <p className="font-semibold text-ink text-sm truncate">새벽의 도시락</p>
                  <p className="text-ink-muted text-xs mt-0.5">40대 아들이 엄마 칠순에 선물한 노래</p>
                </div>
                {/* Fake waveform */}
                <div className="hidden sm:flex items-end gap-[3px] h-8 ml-auto">
                  {[40, 65, 50, 80, 45, 70, 55, 75, 40, 60, 50, 72, 48, 68, 42].map((h, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-full bg-coral-300/70"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <button
                onClick={() => {
                  onNavigate('pricing')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-coral-400 rounded-full hover:bg-coral-500 transition-colors shadow-lg shadow-coral-200/40"
              >
                바로 주문하기
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 3 Steps ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-[100px]">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-coral-400 font-semibold text-sm mb-3">How it works</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                HI-Sing은 이렇게 만들어집니다
              </h2>
              <p className="mt-4 text-ink-muted text-base sm:text-lg max-w-md mx-auto">
                복잡한 건 없습니다. 목소리를 보내주시면,<br />
                그 목소리로 노래를 만들어드립니다.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                icon: Upload,
                title: '목소리를 보내주세요',
                desc: '가족의 목소리가 담긴 파일을 업로드합니다. 일상 대화, 전화 녹음, 영상 속 목소리 — 뭐든 괜찮습니다. 30초 이상이면 충분합니다.',
                note: '여러 사람 목소리가 섞여 있어도 걱정 마세요. AI가 화자를 구분해서 원하는 목소리만 골라냅니다.',
                color: 'bg-blue-brand/10 text-blue-brand',
              },
              {
                step: '02',
                icon: PenLine,
                title: '이야기를 알려주세요',
                desc: '누구에게, 어떤 마음을 전하고 싶은지 적어주세요.',
                examples: [
                  '"엄마 생신에 감사한 마음을 전하고 싶어요"',
                  '"아빠의 18번을 아빠 목소리로 듣고 싶어요"',
                  '"결혼 10주년, 아내에게 고마운 마음을 담고 싶어요"',
                ],
                color: 'bg-coral-400/10 text-coral-400',
              },
              {
                step: '03',
                icon: Music2,
                title: '노래가 완성됩니다',
                desc: '영업일 기준 5~7일 이내에 완성된 노래를 보내드립니다. 이메일로 알려드리고, 웹에서 바로 들을 수 있습니다. 카카오톡 링크로 가족에게 바로 선물하실 수도 있고요.',
                color: 'bg-emerald-500/10 text-emerald-600',
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 sm:p-8 border border-coral-100/30 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-ink-faint tracking-widest">STEP {item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-3">{item.title}</h3>
                  <p className="text-ink-muted text-[15px] leading-relaxed">{item.desc}</p>
                  {item.examples && (
                    <div className="mt-4 space-y-2">
                      {item.examples.map((ex, j) => (
                        <p key={j} className="text-sm text-ink-muted/80 italic">{ex}</p>
                      ))}
                    </div>
                  )}
                  {item.note && (
                    <p className="mt-4 text-sm text-blue-brand/80 bg-blue-brand/5 rounded-lg px-3 py-2">
                      {item.note}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Song Types ─────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-[100px] bg-white">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                두 가지 노래를 만들 수 있습니다
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <FadeIn delay={0}>
              <div className="rounded-2xl border border-coral-100/50 overflow-hidden h-full">
                <div className="bg-coral-50 p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-coral-400/15 flex items-center justify-center mb-4">
                    <Mic className="w-6 h-6 text-coral-400" />
                  </div>
                  <h3 className="text-xl font-bold text-ink">오리지널 노래</h3>
                </div>
                <div className="p-6 sm:p-8 bg-white">
                  <p className="text-ink-light leading-relaxed">
                    세상에 없던 새로운 노래. 전하고 싶은 이야기를 가사로, 가족 목소리를 보컬로.
                  </p>
                  <p className="mt-3 text-ink-muted text-sm">
                    우리 가족만을 위해 작사/작곡된 단 하나의 노래.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-blue-brand/20 overflow-hidden h-full">
                <div className="bg-blue-brand/5 p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-brand/15 flex items-center justify-center mb-4">
                    <Headphones className="w-6 h-6 text-blue-brand" />
                  </div>
                  <h3 className="text-xl font-bold text-ink">18번 커버</h3>
                </div>
                <div className="p-6 sm:p-8 bg-white">
                  <p className="text-ink-light leading-relaxed">
                    엄마가 좋아하는 노래, 아빠의 18번 노래. 그 노래를 가족의 목소리로 다시 부릅니다.
                  </p>
                  <p className="mt-3 text-ink-muted text-sm">
                    익숙한 멜로디에 사랑하는 사람의 목소리가 얹어지는 순간, 평범한 노래가 세상에서 가장 특별한 노래로 바뀝니다.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Use Cases ──────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-[100px]">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                이런 순간에 선물하세요
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Cake,
                title: '부모님 칠순/팔순',
                desc: '잔치 자리에서 자녀들의 목소리로 만든 노래를 틀어드리세요. 상품권보다 오래 남는 선물입니다.',
                accent: 'bg-coral-50 border-coral-100/50',
                iconColor: 'text-coral-400',
              },
              {
                icon: Heart,
                title: '부모님 생신',
                desc: '"감사합니다" 한마디가 쑥스러웠다면, 노래에 담아보세요. 30년 치 감사를 3분짜리 노래 한 곡에.',
                accent: 'bg-rose-50 border-rose-100/50',
                iconColor: 'text-rose-400',
              },
              {
                icon: Flower2,
                title: '부모님 결혼기념일',
                desc: '꽃다발은 시들지만, 노래는 남습니다. 아버지 목소리로 어머니에게, 자녀가 대신 전하는 사랑.',
                accent: 'bg-purple-50 border-purple-100/50',
                iconColor: 'text-purple-400',
              },
              {
                icon: Gift,
                title: '배우자에게',
                desc: '결혼 10주년, 20주년. 직접 말하긴 쑥스럽지만 노래라면 전할 수 있는 말.',
                accent: 'bg-blue-50 border-blue-100/50',
                iconColor: 'text-blue-brand',
              },
              {
                icon: Sun,
                title: '그냥, 아무 날도 아닌 날',
                desc: '특별한 날이 아니어도 괜찮습니다. 이유 없이 전하는 마음이 사실 제일 특별하니까요.',
                accent: 'bg-amber-50 border-amber-100/50',
                iconColor: 'text-amber-500',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className={`rounded-2xl border p-6 sm:p-7 h-full ${item.accent}`}>
                  <item.icon className={`w-7 h-7 ${item.iconColor} mb-4`} />
                  <h3 className="text-base font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-[100px]">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="bg-gradient-to-br from-coral-400 to-coral-500 rounded-3xl px-8 py-14 sm:px-14 sm:py-20 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
                이번 부모님 생신에는<br />
                "건강하세요" 대신,<br className="sm:hidden" />
                노래 한 곡 선물해보시겠어요?
              </h2>
              <p className="mt-5 text-white/80 text-base sm:text-lg max-w-lg mx-auto">
                당신의 마음을 노래로 만들어, 세상에서 가장 익숙하고 따뜻한 목소리에 실어 전해드립니다.
              </p>
              <button
                onClick={() => {
                  onNavigate('pricing')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-coral-500 bg-white rounded-full hover:bg-ivory-100 transition-colors"
              >
                리워드 보러가기
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
