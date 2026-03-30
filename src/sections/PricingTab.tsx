import { Tag, Music, Star, Users, Gem } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'

const rewards = [
  {
    icon: Tag,
    tier: '얼리버드',
    price: '29,000',
    badge: '한정 100명',
    badgeColor: 'bg-coral-400 text-white',
    features: [
      '오리지널 1곡 또는 커버 1곡',
      '고음질 음원 (mp3/wav)',
      '카카오톡 공유 링크',
      '1회 무료 수정',
    ],
    desc: '가장 먼저 응원해주시는 분들을 위한 감사 리워드. 정가 대비 26% 할인.',
    highlight: true,
  },
  {
    icon: Music,
    tier: '기본',
    price: '39,000',
    badge: null,
    badgeColor: '',
    features: [
      '오리지널 1곡 또는 커버 1곡',
      '고음질 음원 (mp3/wav)',
      '카카오톡 공유 링크',
      '1회 무료 수정',
    ],
    desc: '마음을 전하는 데 이 정도면 충분합니다.',
    highlight: false,
  },
  {
    icon: Star,
    tier: '프리미엄',
    price: '69,000',
    badge: '인기',
    badgeColor: 'bg-blue-brand text-white',
    features: [
      '오리지널 1곡',
      '고음질 음원 (mp3/wav)',
      '가사 카드 이미지 (감성 디자인)',
      'USB 실물 배송',
      '카카오톡 공유 링크',
      '1회 무료 수정',
    ],
    desc: '디지털에 실물 감성을 더했습니다. USB를 직접 건네는 순간, 마음이 손에 잡히는 선물.',
    highlight: false,
  },
  {
    icon: Users,
    tier: '패밀리',
    price: '99,000',
    badge: null,
    badgeColor: '',
    features: [
      '노래 2곡 (오리지널/커버 자유)',
      '가족 구성원별 각 1곡 가능',
      '고음질 음원 (mp3/wav)',
      '카카오톡 공유 링크',
      '각 곡당 1회 무료 수정',
    ],
    desc: '아버지 팔순엔 딸 목소리로, 어머니 칠순엔 아들 목소리로. 두 분에게 각각 특별한 노래를.',
    highlight: false,
  },
  {
    icon: Gem,
    tier: '스페셜',
    price: '149,000',
    badge: '최고 구성',
    badgeColor: 'bg-purple-500 text-white',
    features: [
      '노래 2곡 (오리지널/커버 자유)',
      '가사 카드 이미지',
      '뮤직비디오 1편 (가족 사진 기반, 1~2분)',
      'USB 실물 배송 (노래 + 뮤직비디오)',
      '카카오톡 공유 링크',
      '각 곡당 1회 무료 수정',
    ],
    desc: 'HI-Sing의 가장 완전한 선물. 명절에 온 가족이 함께 보기에도 좋습니다.',
    highlight: false,
  },
]

export function PricingTab() {
  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-coral-400 font-semibold text-sm mb-3">Pricing</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                마음의 크기에 맞는<br />리워드를 골라주세요
              </h1>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {rewards.map((r, i) => (
              <FadeIn key={r.tier} delay={i * 0.08}>
                <div
                  className={`relative rounded-2xl border bg-white p-6 sm:p-7 h-full flex flex-col ${
                    r.highlight
                      ? 'border-coral-400 shadow-lg shadow-coral-100/50'
                      : 'border-coral-100/40'
                  }`}
                >
                  {r.badge && (
                    <span className={`absolute -top-3 left-6 px-3 py-1 text-xs font-bold rounded-full ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-ivory-200 flex items-center justify-center">
                      <r.icon className="w-5 h-5 text-coral-400" />
                    </div>
                    <span className="text-base font-bold text-ink">{r.tier}</span>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-ink">{r.price}</span>
                    <span className="text-ink-muted text-sm ml-1">원</span>
                  </div>

                  <hr className="border-ivory-200 mb-4" />

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {r.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-light">
                        <span className="text-coral-400 mt-0.5 flex-shrink-0">+</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-ink-muted text-[13px] leading-relaxed mb-5">{r.desc}</p>

                  <a
                    href="#"
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                      r.highlight
                        ? 'bg-coral-400 text-white hover:bg-coral-500'
                        : 'bg-ivory-200 text-ink hover:bg-ivory-300'
                    }`}
                  >
                    주문하기
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
