import { Play, Volume2 } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'

export function SampleTab() {
  return (
    <div className="pt-24 lg:pt-28">
      {/* ── Header ───────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center">
              <p className="text-coral-400 font-semibold text-sm mb-3">Sample</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                이런 노래가 만들어집니다
              </h1>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Sample Card ──────────────────────────────── */}
      <section className="pb-16 sm:pb-24 lg:pb-[100px]">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden border border-coral-100/30 shadow-sm">
              {/* Album art area */}
              <div className="relative bg-gradient-to-br from-coral-100 to-ivory-300 aspect-[16/9] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center">
                      <Play className="w-7 h-7 text-coral-400 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-coral-200/40 blur-xl" />
                <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-coral-300/30 blur-2xl" />
              </div>

              {/* Song info */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <button className="flex-shrink-0 w-14 h-14 rounded-full bg-coral-400 flex items-center justify-center hover:bg-coral-500 transition-colors shadow-lg shadow-coral-200/50">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                  </button>
                  <div>
                    <h3 className="text-xl font-bold text-ink">새벽의 도시락</h3>
                    <p className="text-ink-muted text-sm mt-1">오리지널 -- 엄마 칠순 선물</p>
                  </div>
                </div>

                {/* Fake waveform bar */}
                <div className="mt-6 flex items-end gap-[2px] h-10 w-full">
                  {Array.from({ length: 60 }, (_, i) => {
                    const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-coral-200"
                        style={{ height: `${Math.min(h, 100)}%` }}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-ink-faint">
                  <span>0:00</span>
                  <span>3:24</span>
                </div>

                <div className="mt-6 bg-ivory-100 rounded-xl p-5">
                  <p className="text-ink-light text-[15px] leading-relaxed">
                    40대 아들이 엄마 칠순에 선물한 오리지널 노래. 매일 새벽 도시락 싸주시던 엄마에게 전하는 30년 치 감사.
                  </p>
                  <p className="mt-4 text-ink-muted text-sm italic border-l-2 border-coral-300 pl-4">
                    "칠순잔치에서 틀어드렸는데 온 가족이 울었어요."
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Before / After ───────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-[100px] bg-white">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink">
                같은 목소리인데, 노래가 되면 이렇게 다릅니다
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Before */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-ink-muted" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">Before</p>
                    <p className="text-xs text-ink-muted">원본 음성 파일</p>
                  </div>
                </div>
                {/* Rough waveform */}
                <div className="flex items-center gap-[2px] h-12 w-full">
                  {Array.from({ length: 40 }, (_, i) => {
                    const h = 15 + Math.random() * 70
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-gray-300"
                        style={{ height: `${h}%` }}
                      />
                    )
                  })}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                  </button>
                  <p className="text-xs text-ink-muted">일상 대화 녹음</p>
                </div>
              </div>

              {/* After */}
              <div className="rounded-2xl border border-coral-200/50 bg-coral-50 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-coral-200/60 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-coral-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">After</p>
                    <p className="text-xs text-ink-muted">완성된 노래</p>
                  </div>
                </div>
                {/* Smooth waveform */}
                <div className="flex items-center gap-[2px] h-12 w-full">
                  {Array.from({ length: 40 }, (_, i) => {
                    const h = 30 + Math.sin(i * 0.3) * 35 + 20
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-coral-300"
                        style={{ height: `${Math.min(h, 100)}%` }}
                      />
                    )
                  })}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button className="w-9 h-9 rounded-full bg-coral-400 flex items-center justify-center hover:bg-coral-500 transition-colors shadow-md shadow-coral-200/40">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                  </button>
                  <p className="text-xs text-ink-muted">새벽의 도시락</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
