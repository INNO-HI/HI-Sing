'use client'

import { useState, useEffect, useRef } from 'react'
import { Tag, Music, Star, ArrowRight, ArrowLeft, Check, Upload, X, Clock, Shield, Gift, Headphones, Share2, Image as ImageIcon, FileCheck, Ban, RefreshCw } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { trackViewItem, trackPaymentAttempt, trackBeginCheckout, trackFileUpload, trackViewItemList, trackOutboundClick, trackFormProgress } from '@/lib/analytics'

const NICEPAY_CLIENT_KEY = process.env.NEXT_PUBLIC_NICEPAY_CLIENT_KEY || ''

const rewards = [
  {
    icon: Tag, tier: '얼리버드', price: '29,000', priceNum: 29000,
    badge: '한정 100명', badgeColor: 'bg-primary-400 text-white', highlight: true,
    features: [
      { icon: Music, text: '맞춤 노래 1곡' },
      { icon: Headphones, text: '고음질 mp3 음원' },
      { icon: Share2, text: '카카오톡 공유 링크' },
      { icon: FileCheck, text: '1회 무료 수정' },
    ],
    desc: '가장 먼저 응원해주시는 분들을 위한 감사 리워드.\n정가 대비 약 40% 할인.',
    process: [
      { title: '주문 정보 접수', desc: '음성 파일, 이야기, 받는 분 정보를 확인합니다.', time: '즉시' },
      { title: '가사 작성', desc: '전하고 싶은 마음과 추억을 바탕으로 가사를 씁니다.', time: '1일' },
      { title: '멜로디 작곡', desc: '가사와 분위기에 어울리는 멜로디를 만듭니다.', time: '1~2일' },
      { title: '보컬 합성 & 믹싱', desc: '가족 목소리로 노래를 부르게 하고 음향을 다듬습니다.', time: '1일' },
      { title: '완성곡 전달', desc: '카카오톡 링크로 완성된 노래를 보내드립니다.', time: '3~5일 이내' },
      { title: '1회 무료 수정', desc: '원하시는 방향으로 수정해드립니다.', time: '요청 시' },
    ],
    delivery: '3~5일',
  },
  {
    icon: Music, tier: '기본', price: '49,000', priceNum: 49000,
    badge: '가장 많이 선택', badgeColor: 'bg-neutral-800 text-white', highlight: false,
    features: [
      { icon: Music, text: '맞춤 노래 1곡' },
      { icon: Headphones, text: '무손실 음원 (mp3 + wav)' },
      { icon: Share2, text: '카카오톡 공유 링크' },
      { icon: FileCheck, text: '2회 무료 수정' },
    ],
    desc: '무손실 wav 음원 + 2회 수정으로\n더 완성도 높은 결과물을 원하시는 분께.',
    process: [
      { title: '주문 정보 접수', desc: '음성 파일, 이야기, 받는 분 정보를 확인합니다.', time: '즉시' },
      { title: '가사 작성', desc: '전하고 싶은 마음과 추억을 바탕으로 가사를 씁니다.', time: '1일' },
      { title: '멜로디 작곡', desc: '가사와 분위기에 어울리는 멜로디를 만듭니다.', time: '1~2일' },
      { title: '보컬 합성 & 믹싱', desc: '가족 목소리로 노래를 부르게 하고 음향을 다듬습니다.', time: '1일' },
      { title: '완성곡 전달', desc: '카카오톡 링크로 mp3 + wav 음원을 전달드립니다.', time: '3~5일 이내' },
      { title: '2회 무료 수정', desc: '원하시는 방향으로 2회까지 수정해드립니다.', time: '요청 시' },
    ],
    delivery: '3~5일',
  },
  {
    icon: Star, tier: '프리미엄', price: '79,000', priceNum: 79000,
    badge: '프리미엄', badgeColor: 'bg-primary-500 text-white', highlight: false,
    features: [
      { icon: Music, text: '맞춤 노래 1곡' },
      { icon: Headphones, text: '무손실 음원 (mp3 + wav)' },
      { icon: ImageIcon, text: '감성 가사 카드 이미지 (JPG · 인쇄용)' },
      { icon: Share2, text: '카카오톡 공유 링크' },
      { icon: FileCheck, text: '3회 무료 수정' },
    ],
    desc: '인쇄 가능한 감성 가사 카드 + 3회 수정.\n이번 선물을 액자에 걸어두고 싶을 만큼 특별하게.',
    process: [
      { title: '주문 정보 접수', desc: '음성 파일, 이야기, 받는 분 정보를 확인합니다.', time: '즉시' },
      { title: '가사 작성', desc: '전하고 싶은 마음과 추억을 바탕으로 가사를 씁니다.', time: '1일' },
      { title: '멜로디 작곡', desc: '가사와 분위기에 어울리는 멜로디를 만듭니다.', time: '1~2일' },
      { title: '보컬 합성 & 믹싱', desc: '가족 목소리로 노래를 부르게 하고 음향을 다듬습니다.', time: '1일' },
      { title: '가사 카드 제작', desc: '손편지 느낌의 감성 가사 카드를 인쇄용 고해상도로 디자인합니다.', time: '1일' },
      { title: '완성곡 전달', desc: '카카오톡 링크로 mp3 + wav + 가사 카드 JPG를 함께 전달드립니다.', time: '3~5일 이내' },
      { title: '3회 무료 수정', desc: '가사, 멜로디, 분위기 등을 3회까지 수정해드립니다.', time: '요청 시' },
    ],
    delivery: '3~5일',
  },
]

type Step = 'list' | 'detail' | 'form'

type DetailTab = 'product' | 'process' | 'policy'

const detailTabs: { id: DetailTab; label: string }[] = [
  { id: 'product', label: '상품 소개' },
  { id: 'process', label: '제작 과정' },
  { id: 'policy', label: '환불 · FAQ' },
]

/* ═══ 상세 페이지 — 와이드 2컬럼 ═══════════════════ */
function RewardDetail({ reward, onBack, onNext }: { reward: typeof rewards[0]; onBack: () => void; onNext: () => void }) {
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>('product')

  const recommendFor =
    reward.tier === '얼리버드' || reward.tier === '기본'
      ? [
          '부모님 생신에 의미 있는 선물을 준비하고 싶은 분',
          '마음은 가득한데 전할 방법을 모르겠는 분',
          '가성비 좋은 감동 선물을 찾는 분',
        ]
      : [
          '디지털 선물에 감성을 더하고 싶은 분',
          '감성적인 가사 카드까지 함께 선물하고 싶은 분',
          '프리미엄 퀄리티의 노래를 원하는 분',
        ]

  return (
    <div className="pt-24 lg:pt-28 bg-neutral-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> 리워드 목록
        </button>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* 왼쪽: 상품 정보 (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            {/* 헤더 — 큰 비주얼 (항상 표시) */}
            <FadeIn>
              <div className="bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl p-8 sm:p-10 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <reward.icon className="w-6 h-6 text-white/70" />
                  {reward.badge && <span className="text-xs font-bold bg-white/20 rounded-full px-3 py-0.5">{reward.badge}</span>}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black mb-2">{reward.tier}</h1>
                <p className="text-white/70 text-[15px] leading-relaxed max-w-md whitespace-pre-line">{reward.desc}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-black">{reward.price}</span>
                  <span className="text-white/60 text-base mb-1">원</span>
                </div>
              </div>
            </FadeIn>

            {/* 신뢰 띠 — 4개 키 포인트 */}
            <FadeIn delay={0.02}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
                  {[
                    { Icon: Ban, title: 'AI 학습 비사용 기본', desc: '동의 시 10% 할인' },
                    { Icon: Shield, title: '음성 30일 후 자동 삭제', desc: '제3자 공유 없음' },
                    { Icon: Clock, title: '영업일 3~5일 완성', desc: '어버이날 전 배송 가능' },
                    { Icon: RefreshCw, title: '1회 무료 수정 포함', desc: '마음에 들 때까지' },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-primary-50 flex-shrink-0 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] sm:text-sm font-semibold text-ink leading-tight">{title}</p>
                        <p className="text-[11px] sm:text-xs text-ink-faint mt-0.5 leading-tight">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 탭 네비게이션 */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-1.5 flex items-center sticky top-20 z-20 shadow-sm">
              {detailTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id)}
                  className={`flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                    activeDetailTab === tab.id
                      ? 'bg-primary-400 text-white shadow-md shadow-primary-200/40'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                  aria-pressed={activeDetailTab === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 탭 1: 상품 소개 */}
            {activeDetailTab === 'product' && (
              <div className="space-y-6">
                <FadeIn>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-ink mb-4">이런 분께 추천드려요</h3>
                    <div className="space-y-3">
                      {recommendFor.map((text, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-ink-light">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.05}>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-ink-light mb-6">구성 상품</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {reward.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 bg-neutral-50 rounded-xl p-4">
                          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                            <f.icon className="w-5 h-5 text-primary-400" />
                          </div>
                          <span className="text-sm text-ink-light font-medium">{f.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-ink mb-2">전문가 의뢰 vs 하이싱</h3>
                    <p className="text-sm text-ink-muted mb-5">같은 결과, 다른 가격</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-neutral-200">
                            <th className="text-left py-3 pr-4 text-ink-muted font-medium">항목</th>
                            <th className="text-center py-3 px-4 text-ink-faint font-medium">전문가 의뢰</th>
                            <th className="text-center py-3 pl-4 text-primary-400 font-bold">하이싱</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ['보컬 포함 완성곡', '50~100만원+', reward.price + '원'],
                            ['제작 기간', '2~4주', reward.delivery],
                            ['수정 횟수', '별도 비용', '1회 무료'],
                            ['전달 방식', '파일 전송', '카카오톡 링크'],
                            ['작사/작곡', '별도 의뢰', '포함'],
                          ].map(([item, expert, hising], i) => (
                            <tr key={i} className="border-b border-neutral-100 last:border-0">
                              <td className="py-3 pr-4 text-ink-light">{item}</td>
                              <td className="py-3 px-4 text-center text-ink-faint line-through">{expert}</td>
                              <td className="py-3 pl-4 text-center text-ink-light font-medium">{hising}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FadeIn>
              </div>
            )}

            {/* 탭 2: 제작 과정 */}
            {activeDetailTab === 'process' && (
              <div className="space-y-6">
                <FadeIn>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-ink-light mb-2">제작 진행 과정</h3>
                    <p className="text-sm text-ink-muted mb-6">결제 완료 후 아래 순서대로 진행되며, 각 단계마다 소요 시간이 다릅니다.</p>
                    <div className="relative">
                      <div className="absolute left-[18px] top-4 bottom-4 w-px bg-neutral-200" />
                      <div className="space-y-6">
                        {reward.process.map((step, i) => (
                          <div key={i} className="flex items-start gap-5 relative">
                            <div className="w-9 h-9 rounded-full bg-primary-400 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 z-10 shadow-md shadow-primary-200/40">
                              {i + 1}
                            </div>
                            <div className="flex-1 pt-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-sm font-bold text-ink-light">{step.title}</h4>
                                <span className="text-[11px] font-medium text-primary-400 bg-primary-50 rounded-full px-2 py-0.5">{step.time}</span>
                              </div>
                              <p className="text-xs text-ink-muted leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.05}>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-ink mb-5">실제 제작 사례</h3>
                    <div className="space-y-5">
                      {[
                        { title: '식탁 위의 온기', from: '40대 아들 → 엄마 칠순', story: '매일 새벽 도시락 싸주시던 엄마에게 전하는 30년 치 감사를 담았습니다.', result: '칠순잔치에서 틀어드렸더니 온 가족이 울었다고 합니다.' },
                        { title: '바쁘다는 핑계', from: '30대 딸 → 아빠 팔순', story: '바쁘다는 핑계로 자주 못 찾아뵌 미안함과 고마움을 전했습니다.', result: '아버지가 차에서 매일 반복 재생하신다고 합니다.' },
                      ].map((c, i) => (
                        <div key={i} className="bg-neutral-50 rounded-xl p-5">
                          <p className="font-bold text-ink text-sm mb-1">{c.title}</p>
                          <p className="text-xs text-ink-muted mb-2">{c.from}</p>
                          <p className="text-sm text-ink-light leading-relaxed">{c.story}</p>
                          <p className="text-sm text-ink-muted italic mt-2 border-l-2 border-primary-300 pl-3">{c.result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-400 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink mb-2">만족 보증</h3>
                        <p className="text-sm text-ink-muted leading-relaxed">
                          완성된 노래가 마음에 들지 않으시면 1회 무료 수정을 제공합니다.
                          가사, 멜로디, 분위기, 보컬 스타일 등 원하시는 방향으로 수정해드립니다.
                          제작 시작 전이라면 100% 환불도 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            )}

            {/* 탭 3: 환불 · FAQ */}
            {activeDetailTab === 'policy' && (
              <div className="space-y-6">
                <FadeIn>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-ink mb-5">자주 묻는 질문</h3>
                    <div className="space-y-4">
                      {[
                        { q: '음성 파일은 어떤 걸 보내야 하나요?', a: 'mp3, m4a, wav 등 대부분의 음성 파일을 지원합니다. 전화 녹음, 영상 속 목소리, 일상 대화 등 최소 60초부터 접수되며, 1분 이상이면 더 자연스러운 결과물이 나옵니다. 배경음·잡음 일부는 허용됩니다.' },
                        { q: '여러 사람 목소리가 섞여 있어도 되나요?', a: '네. 단, 한 분 목소리가 주된 음성일 때 가장 잘 나옵니다. 주된 화자가 누구인지 주문 시 적어주세요.' },
                        { q: '마음에 안 들면 수정할 수 있나요?', a: '모든 리워드에 1회 무료 수정이 포함되어 있습니다. 가사, 멜로디, 분위기 등 수정 요청이 가능합니다.' },
                        { q: '선물 날짜에 맞출 수 있나요?', a: `${reward.tier} 리워드 기준 ${reward.delivery} 이내 완성됩니다. 급한 경우 사전에 말씀해주시면 최대한 맞춰드립니다.` },
                        { q: '어떤 장르의 노래가 가능한가요?', a: '발라드, 트로트, 팝, 어쿠스틱, R&B, 동요/자장가 등 대부분의 장르가 가능합니다. 주문 시 원하시는 장르를 선택해주세요.' },
                        { q: '음성 데이터는 안전한가요?', a: '업로드한 음성은 노래 제작 목적으로만 사용되며, 완료 후 30일 뒤 서버에서 삭제됩니다.' },
                      ].map((faq, i) => (
                        <div key={i} className="border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                          <p className="text-sm font-semibold text-ink">{faq.q}</p>
                          <p className="text-sm text-ink-muted mt-1 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.05}>
                  <div className="bg-neutral-100 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-sm font-bold text-ink mb-3">주의사항</h3>
                    <ul className="space-y-1.5 text-xs text-ink-muted leading-relaxed">
                      <li>· 음성 파일 품질에 따라 결과물 품질이 달라질 수 있습니다</li>
                      <li>· 60초 미만의 음성은 보컬 합성이 어려울 수 있습니다</li>
                      <li>· 완성곡은 사적 이용 범위로 제공됩니다 (상업적 이용 시 별도 동의 필요)</li>
                      <li>· 제작 시작 후에는 환불 정책에 따라 부분 환불이 진행됩니다</li>
                      <li>· 음성 데이터는 제작 완료 후 30일이 지나면 자동 삭제됩니다</li>
                    </ul>
                  </div>
                </FadeIn>
              </div>
            )}
          </div>

          {/* 오른쪽: 결제 사이드바 (2/5) — sticky */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-5">
                {/* 가격 카드 */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-ink-muted">{reward.tier} 리워드</p>
                    <reward.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="text-4xl font-black text-ink mb-1">
                    {reward.price}<span className="text-base font-normal text-ink-muted ml-1">원</span>
                  </div>
                  <div className="h-px bg-neutral-200 my-5" />
                  <div className="space-y-3.5 mb-6">
                    <div className="flex items-center gap-3 text-sm text-ink-light">
                      <Clock className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span>예상 제작 기간 <strong className="text-ink">{reward.delivery}</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-ink-light">
                      <Shield className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span>제작 시작 전 <strong className="text-ink">100% 환불</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-ink-light">
                      <Gift className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span><strong className="text-ink">1회 무료 수정</strong> 포함</span>
                    </div>
                  </div>
                  <button
                    onClick={onNext}
                    className="w-full py-4 bg-primary-400 text-white font-semibold text-base rounded-xl hover:bg-primary-500 transition-colors flex items-center justify-center gap-2"
                  >
                    주문하기
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[11px] text-ink-faint text-center mt-3">나이스페이를 통해 안전하게 결제됩니다</p>
                </div>

                {/* 환불 정책 */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <h4 className="text-sm font-bold text-ink mb-4">환불 정책</h4>
                  <div className="space-y-3">
                    {[
                      { stage: '결제 후 ~ 제작 시작 전', refund: '전액 환불', percent: '100%', color: 'text-ink-light', bgColor: 'bg-neutral-50', desc: '접수 확인 전까지 언제든 취소 가능' },
                      { stage: '제작 시작 ~ 작사/작곡 중', refund: '50% 환불', percent: '50%', color: 'text-ink-muted', bgColor: 'bg-neutral-50', desc: '이미 진행된 작업 비용을 제외하고 환불' },
                      { stage: '보컬 합성 이후', refund: '환불 불가', percent: '0%', color: 'text-ink-faint', bgColor: 'bg-neutral-50', desc: '완성 단계 진입 후에는 환불이 어렵습니다' },
                      { stage: '완성곡 전달 후', refund: '1회 무료 수정', percent: '', color: 'text-ink-light', bgColor: 'bg-neutral-50', desc: '가사, 멜로디, 분위기 등 수정 가능' },
                    ].map((r, i) => (
                      <div key={i} className={`${r.bgColor} rounded-xl p-3`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-ink-light">{r.stage}</span>
                          <span className={`text-xs font-bold ${r.color}`}>{r.refund}</span>
                        </div>
                        <p className="text-[11px] text-ink-muted">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <p className="text-[11px] text-ink-faint">
                      환불 요청:{' '}
                      <a
                        href="http://pf.kakao.com/_vxbvdX"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOutboundClick('http://pf.kakao.com/_vxbvdX', 'pricing_refund_kakao')}
                        className="text-primary-400 hover:underline"
                      >
                        카카오톡 채널
                      </a>
                      {' '}또는 contact@innohi.ai.kr
                    </p>
                  </div>
                </div>

                {/* 문의 */}
                <a
                  href="http://pf.kakao.com/_vxbvdX"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('http://pf.kakao.com/_vxbvdX', 'pricing_inquiry_kakao')}
                  className="block bg-[#FEE500] hover:bg-[#FDD835] rounded-2xl p-5 text-center transition-colors"
                >
                  <p className="text-xs text-[#3C1E1E]/70">궁금한 점이 있으신가요?</p>
                  <p className="text-sm font-bold text-[#3C1E1E] mt-1 flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.9 1.92 5.45 4.8 6.87-.21.68-.76 2.42-.87 2.8-.14.47.17.47.36.34.15-.1 2.39-1.63 3.36-2.3.77.11 1.55.17 2.35.17 5.52 0 10-3.58 10-8S17.52 3 12 3z"/></svg>
                    카카오톡 문의하기
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

      {/* 모바일 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-neutral-200 px-5 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-ink-muted">{reward.tier}</p>
            <p className="text-lg font-black text-ink-light">{reward.price}<span className="text-xs font-normal text-ink-muted ml-0.5">원</span></p>
          </div>
          <button onClick={onNext} className="px-6 py-3 bg-primary-400 text-white font-semibold text-sm rounded-xl hover:bg-primary-500 transition-colors flex items-center gap-2">
            주문하기<ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* 하단 바 높이만큼 패딩 */}
      <div className="h-16 lg:hidden" />
    </div>
  )
}

/* ═══ 주문 정보 입력 — 와이드 2컬럼 ════════════════ */
type OrderFormState = {
  name: string
  phone: string
  emailId: string
  emailDomain: string
  emailCustom: string
  recipient: string
  relation: string
  occasion: string
  occasionCustom: string
  giftDate: string
  voiceGender: string
  voiceAge: string
  memory: string
  unsaid: string
  episode: string
  story: string
  genre: string
  genreCustom: string
  mood: string
  extra: string
  aiTraining: boolean
}

const EMPTY_FORM: OrderFormState = {
  name: '', phone: '', emailId: '', emailDomain: 'gmail.com', emailCustom: '',
  recipient: '', relation: '', occasion: '', occasionCustom: '', giftDate: '',
  voiceGender: '', voiceAge: '',
  memory: '', unsaid: '', episode: '', story: '',
  genre: '', genreCustom: '', mood: '',
  extra: '',
  aiTraining: false,
}

const FORM_STORAGE_KEY = 'hising-order-form-v1'

function OrderForm({ reward, onBack }: { reward: typeof rewards[0]; onBack: () => void }) {
  const [form, setForm] = useState<OrderFormState>(EMPTY_FORM)
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const scriptLoaded = useRef(false)
  const trackedFields = useRef<Set<string>>(new Set())

  // 필드별 최초 값 입력 시 1회만 GA4 발화 (중복 방지)
  const handleFieldProgress = (step: string, field: string) => {
    const key = `${step}:${field}`
    if (trackedFields.current.has(key)) return
    trackedFields.current.add(key)
    trackFormProgress(step, field)
  }

  // localStorage 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<OrderFormState>
        setForm(prev => ({ ...prev, ...parsed }))
      }
    } catch {
      // 파싱 실패 시 무시하고 기본값 사용
    }
  }, [])

  // localStorage 저장 (입력 변경마다)
  useEffect(() => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form))
    } catch {
      // 용량 초과 등은 무시
    }
  }, [form])

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true
    const script = document.createElement('script')
    script.src = 'https://pay.nicepay.co.kr/v1/js/'
    script.async = true
    document.head.appendChild(script)
  }, [])

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.recipient) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }
    if (!form.memory && !form.unsaid && !form.episode && !form.story) {
      alert('노래에 담고 싶은 이야기를 최소 한 가지 이상 적어주세요.')
      return
    }
    const emailDomain = form.emailDomain === 'custom' ? form.emailCustom : form.emailDomain
    if (form.emailId && !emailDomain) {
      alert('이메일 도메인을 입력해주세요.')
      return
    }
    if (!/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(form.phone.replace(/-/g, ''))) {
      alert('연락처를 올바르게 입력해주세요. (예: 010-0000-0000)')
      return
    }
    if (!file) {
      alert('음성 파일을 업로드해주세요.')
      return
    }
    const orderId = `HISING_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const finalAmount = form.aiTraining ? Math.round(reward.priceNum * 0.9) : reward.priceNum
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trackPaymentAttempt(reward.tier, finalAmount)
    const AUTHNICE = (window as any).AUTHNICE
    if (!AUTHNICE) { alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.'); return }
    AUTHNICE.requestPay({
      clientId: NICEPAY_CLIENT_KEY, method: 'card', orderId, amount: finalAmount,
      goodsName: `하이싱 ${reward.tier}${form.aiTraining ? ' (AI 학습 동의)' : ''}`,
      returnUrl: `${window.location.origin}/api/payment/approve`,
      fnError: (r: { errorMsg: string }) => alert(`결제 오류: ${r.errorMsg}`),
    })
  }

  const update = <K extends keyof OrderFormState>(key: K, value: OrderFormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const inputClass = 'w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20 transition-all'

  return (
    <div className="pt-24 lg:pt-28 bg-neutral-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> 상세 페이지
        </button>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* 왼쪽: 입력 폼 (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            <FadeIn>
              <h1 className="text-2xl font-bold text-ink mb-1">주문 정보 입력</h1>
              <p className="text-ink-muted text-sm mb-8">노래 제작에 필요한 정보를 입력해주세요</p>
            </FadeIn>

            {/* 주문자 정보 */}
            <FadeIn delay={0.05}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                <h3 className="text-base font-bold text-ink mb-5">주문자 정보</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">이름 <span className="text-primary-400">*</span></label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      onBlur={() => form.name && handleFieldProgress('order_info', 'name')}
                      placeholder="홍길동"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">연락처 <span className="text-primary-400">*</span></label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => { const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 11); const v = raw.length <= 3 ? raw : raw.length <= 7 ? `${raw.slice(0,3)}-${raw.slice(3)}` : `${raw.slice(0,3)}-${raw.slice(3,7)}-${raw.slice(7)}`; update('phone', v) }}
                      onBlur={() => form.phone && handleFieldProgress('order_info', 'phone')}
                      placeholder="010-0000-0000"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">이메일</label>
                    <div className="flex gap-2 items-center">
                      <input type="text" value={form.emailId} onChange={e => update('emailId', e.target.value)} placeholder="example" className={`${inputClass} flex-1`} />
                      <span className="text-ink-muted text-sm">@</span>
                      {form.emailDomain === 'custom' ? (
                        <div className="flex gap-1 flex-1">
                          <input type="text" value={form.emailCustom} onChange={e => update('emailCustom', e.target.value)} placeholder="직접 입력" className={`${inputClass} flex-1`} />
                          <button type="button" onClick={() => { update('emailDomain', 'gmail.com'); update('emailCustom', '') }} className="px-2 text-xs text-ink-muted border border-neutral-200 rounded-lg hover:bg-neutral-50 flex-shrink-0">목록</button>
                        </div>
                      ) : (
                        <select value={form.emailDomain} onChange={e => update('emailDomain', e.target.value)} className={`${inputClass} flex-1`}>
                          <option value="gmail.com">gmail.com</option>
                          <option value="naver.com">naver.com</option>
                          <option value="kakao.com">kakao.com</option>
                          <option value="hanmail.net">hanmail.net</option>
                          <option value="custom">직접 입력</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 노래 정보 */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                <h3 className="text-base font-bold text-ink mb-5">노래 정보</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-muted mb-1.5">누구에게 선물하나요? <span className="text-primary-400">*</span></label>
                      <input
                        type="text"
                        value={form.recipient}
                        onChange={e => update('recipient', e.target.value)}
                        onBlur={() => form.recipient && handleFieldProgress('song_info', 'recipient')}
                        placeholder="엄마, 아빠, 배우자 등"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-muted mb-1.5">받는 분과의 관계 <span className="text-primary-400">*</span></label>
                      <input
                        type="text"
                        value={form.relation}
                        onChange={e => update('relation', e.target.value)}
                        onBlur={() => form.relation && handleFieldProgress('song_info', 'relation')}
                        placeholder="아들, 딸, 남편, 아내 등"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-muted mb-1.5">어떤 날인가요? <span className="text-primary-400">*</span></label>
                      {form.occasion === '기타' ? (
                        <div className="flex gap-2">
                          <input type="text" value={form.occasionCustom} onChange={e => update('occasionCustom', e.target.value)} placeholder="직접 입력" className={`${inputClass} flex-1`} />
                          <button onClick={() => { update('occasion', ''); update('occasionCustom', '') }} className="px-3 text-xs text-ink-muted border border-neutral-200 rounded-lg hover:bg-neutral-50">변경</button>
                        </div>
                      ) : (
                        <select value={form.occasion} onChange={e => update('occasion', e.target.value)} className={inputClass}>
                          <option value="">선택해주세요</option>
                          <option value="생신">생신</option>
                          <option value="칠순">칠순</option>
                          <option value="팔순">팔순</option>
                          <option value="결혼기념일">결혼기념일</option>
                          <option value="어버이날">어버이날</option>
                          <option value="환갑">환갑</option>
                          <option value="기타">기타</option>
                        </select>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-muted mb-1.5">선물 날짜</label>
                      <input type="date" value={form.giftDate} onChange={e => update('giftDate', e.target.value)} min={new Date().toISOString().split('T')[0]} className={inputClass} />
                    </div>
                  </div>
                  {/* 이야기 가이드 */}
                  <div className="bg-neutral-50 rounded-xl p-5 space-y-4">
                    <label className="block text-sm font-medium text-ink mb-1">노래에 담고 싶은 이야기 <span className="text-primary-400">*</span></label>
                    <p className="text-[11px] text-ink-faint -mt-2 mb-3">아래 질문에 답하듯 편하게 적어주세요. 구체적일수록 더 감동적인 노래가 됩니다.</p>
                    <div>
                      <p className="text-xs text-ink-muted mb-1">그 분에게 가장 고마운 기억이 있나요?</p>
                      <textarea
                        value={form.memory}
                        onChange={e => update('memory', e.target.value)}
                        onBlur={() => form.memory && handleFieldProgress('song_info', 'story_written')}
                        rows={2}
                        placeholder="예: 매일 새벽 도시락 싸주셨던 기억이 아직도 생생해요"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted mb-1">평소에 전하지 못한 말이 있다면?</p>
                      <textarea
                        value={form.unsaid}
                        onChange={e => update('unsaid', e.target.value)}
                        onBlur={() => form.unsaid && handleFieldProgress('song_info', 'story_written')}
                        rows={2}
                        placeholder="예: 바쁘다는 핑계로 자주 못 찾아뵈서 항상 미안해요"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted mb-1">함께한 특별한 추억이 있나요?</p>
                      <textarea
                        value={form.episode}
                        onChange={e => update('episode', e.target.value)}
                        onBlur={() => form.episode && handleFieldProgress('song_info', 'story_written')}
                        rows={2}
                        placeholder="예: 어릴 때 손잡고 학교 데려다주시던 길이 아직도 기억나요"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted mb-1">그 외 노래에 담고 싶은 이야기</p>
                      <textarea
                        value={form.story}
                        onChange={e => update('story', e.target.value)}
                        onBlur={() => form.story && handleFieldProgress('song_info', 'story_written')}
                        rows={2}
                        placeholder="자유롭게 적어주세요"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>

                  {/* 노래 장르 */}
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-2">노래 장르 <span className="text-primary-400">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {['발라드', '트로트', '팝', '어쿠스틱', 'R&B', '동요/자장가', '기타'].map(genre => (
                        <button key={genre} onClick={() => update('genre', genre)} className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${form.genre === genre ? 'bg-primary-400 text-white border-primary-400' : 'bg-white text-ink-muted border-neutral-200 hover:border-neutral-300'}`}>
                          {genre}
                        </button>
                      ))}
                    </div>
                    {form.genre === '기타' && (
                      <input type="text" value={form.genreCustom} onChange={e => update('genreCustom', e.target.value)} placeholder="원하는 장르를 적어주세요" className={`${inputClass} mt-2`} />
                    )}
                  </div>

                  {/* 분위기 */}
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-2">원하는 분위기</label>
                    <div className="flex flex-wrap gap-2">
                      {['따뜻한', '밝고 경쾌한', '잔잔한', '감성적인', '힘이 되는'].map(mood => (
                        <button key={mood} onClick={() => update('mood', mood)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${form.mood === mood ? 'bg-primary-400 text-white border-primary-400' : 'bg-white text-ink-muted border-neutral-200 hover:border-neutral-300'}`}>
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">추가 요청사항</label>
                    <textarea value={form.extra} onChange={e => update('extra', e.target.value)} rows={2} placeholder="특별히 넣고 싶은 가사, 참고할 노래 스타일 등" className={`${inputClass} resize-none`} />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 음성 파일 */}
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                <h3 className="text-base font-bold text-ink mb-2">음성 파일 업로드 <span className="text-primary-400">*</span></h3>
                <p className="text-xs text-ink-faint mb-5">전화 녹음·영상 속 목소리·일상 대화 모두 OK · 한 분 목소리 위주 · 최소 60초 (1분 이상 권장)</p>
                <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={e => { const f = e.target.files?.[0] || null; setFile(f); if (f) trackFileUpload(f.name, f.size) }} />
                {file ? (
                  <div className="flex items-center justify-between bg-primary-50 border border-primary-100 rounded-xl px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-400 flex items-center justify-center"><Check className="w-5 h-5 text-white" /></div>
                      <div>
                        <p className="text-sm font-medium text-ink">{file.name}</p>
                        <p className="text-xs text-ink-faint">{(file.size / 1024 / 1024).toFixed(1)}MB</p>
                      </div>
                    </div>
                    <button onClick={() => setFile(null)} className="text-ink-muted hover:text-ink p-1"><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-neutral-200 rounded-xl py-10 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all group">
                    <Upload className="w-8 h-8 text-neutral-300 group-hover:text-primary-400 mx-auto mb-3 transition-colors" />
                    <p className="text-sm text-ink-muted font-medium">클릭하여 파일 업로드</p>
                    <p className="text-xs text-ink-faint mt-1">mp3, wav, m4a 지원</p>
                  </button>
                )}
              </div>
            </FadeIn>

            {/* AI 학습 동의 — 10% 할인 */}
            <FadeIn delay={0.2}>
              <button
                type="button"
                onClick={() => update('aiTraining', !form.aiTraining)}
                className={`w-full text-left rounded-2xl border-2 p-6 sm:p-7 transition-all ${
                  form.aiTraining
                    ? 'border-primary-400 bg-primary-50/50'
                    : 'border-neutral-200 bg-white hover:border-primary-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                    form.aiTraining
                      ? 'bg-primary-400 border-primary-400'
                      : 'bg-white border-neutral-300'
                  }`}>
                    {form.aiTraining && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="text-base font-bold text-ink">AI 품질 개선에 동의하고 10% 할인</h3>
                      <span className="text-[11px] font-bold text-white bg-primary-400 rounded-full px-2 py-0.5">SAVE 10%</span>
                    </div>
                    <p className="text-[13px] text-ink-muted leading-relaxed">
                      업로드하신 음성·가사·완성곡 일부를 하이싱의 AI 보이스 품질 향상 목적으로만 사용합니다.
                      <span className="block mt-1 text-ink-faint text-xs">제3자 판매·외부 공유 없음 · 언제든 메일로 철회 가능 · 동의하지 않아도 서비스 이용에는 제약 없음</span>
                    </p>
                    <div className="mt-3 flex items-baseline gap-2 text-sm">
                      <span className="text-ink-muted">예상 절감</span>
                      <span className="font-bold text-primary-500">-{Math.round(reward.priceNum * 0.1).toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              </button>
            </FadeIn>

          </div>

          {/* 오른쪽: 주문 요약 (2/5) — sticky */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
                  <h3 className="text-base font-bold text-ink mb-5">주문 요약</h3>

                  <div className="flex items-center gap-3 pb-5 border-b border-neutral-100">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                      <reward.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="font-bold text-ink text-sm">{reward.tier}</p>
                      <p className="text-xs text-ink-muted">{reward.features[0].text}</p>
                    </div>
                  </div>

                  <div className="py-5 border-b border-neutral-100 space-y-3">
                    {reward.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-ink-light">
                        <Check className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                        <span>{f.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-5 space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-ink-muted">상품 금액</span>
                      <span className="text-ink font-medium">{reward.price}원</span>
                    </div>
                    {form.aiTraining && (
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-500 font-medium">AI 학습 동의 할인 (-10%)</span>
                        <span className="text-primary-500 font-semibold">-{Math.round(reward.priceNum * 0.1).toLocaleString()}원</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-ink-muted">예상 제작 기간</span>
                      <span className="text-ink font-medium">{reward.delivery}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-5 border-t border-neutral-200 mb-6">
                    <span className="text-sm font-medium text-ink">결제 금액</span>
                    <span className="text-2xl font-black text-ink">
                      {(form.aiTraining ? Math.round(reward.priceNum * 0.9) : reward.priceNum).toLocaleString()}
                      <span className="text-sm font-normal text-ink-muted ml-0.5">원</span>
                    </span>
                  </div>

                  <button onClick={handleSubmit} className="w-full py-4 bg-primary-400 text-white font-semibold text-base rounded-xl hover:bg-primary-500 transition-colors">
                    결제하기
                  </button>

                  <p className="text-[11px] text-ink-faint text-center mt-3">나이스페이를 통해 안전하게 결제됩니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

/* ═══ 리워드 목록 ══════════════════════════════════ */
function RewardList({ onSelect }: { onSelect: (i: number) => void }) {
  useEffect(() => {
    trackViewItemList(rewards.map(r => ({ name: r.tier, price: r.priceNum })))
  }, [])

  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-primary-400 font-semibold text-sm mb-3">Pricing</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-light">
                마음의 크기에 맞는<br />리워드를 골라주세요
              </h1>
              <p className="text-ink-muted text-sm mt-4">전문가 의뢰 50~100만원이 부담스럽다면, 하이싱은 <strong className="text-primary-400">29,000원부터</strong> 시작할 수 있습니다</p>
            </div>
          </FadeIn>

          {/* 신뢰 배지 */}
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
              {['1회 무료 수정', '제작 전 100% 환불', '5~7일 완성', '나이스페이 안전결제'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <Check className="w-3.5 h-3.5 text-primary-400" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {rewards.map((r, i) => (
              <FadeIn key={r.tier} delay={i * 0.08}>
                <div className={`relative rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${r.highlight ? 'shadow-lg shadow-primary-100/50' : 'shadow-sm hover:shadow-md hover:border-primary-200'}`}>
                  {r.badge && <span className={`absolute -top-3 left-6 px-3 py-1 text-xs font-bold rounded-full ${r.badgeColor}`}>{r.badge}</span>}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center"><r.icon className="w-5 h-5 text-primary-400" /></div>
                    <span className="text-base font-bold text-ink-light">{r.tier}</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-ink-light">{r.price}</span>
                    <span className="text-ink-muted text-sm ml-1">원</span>
                  </div>
                  <hr className="border-neutral-200 mb-4" />
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {r.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-light">
                        <Check className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" /><span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-ink-muted text-[13px] leading-relaxed mb-5">{r.desc}</p>
                  <button onClick={() => onSelect(i)} className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-colors bg-primary-400 text-white hover:bg-primary-500">
                    자세히 보기<ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* 하단 안내 */}
          <FadeIn delay={0.3}>
            <p className="text-center text-xs text-ink-faint mt-10">모든 리워드에 1회 무료 수정이 포함되어 있습니다 · 제작 시작 전 100% 환불 가능</p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

/* ═══ 메인 ═════════════════════════════════════════ */
export function PricingTab() {
  const [step, setStep] = useState<Step>('list')
  const [selectedIdx, setSelectedIdx] = useState(0)

  const handleSelect = (i: number) => {
    setSelectedIdx(i); setStep('detail'); window.scrollTo({ top: 0, behavior: 'smooth' })
    trackViewItem(rewards[i].tier, rewards[i].priceNum)
  }
  const goBack = (to: Step) => { setStep(to); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  if (step === 'detail') return <RewardDetail reward={rewards[selectedIdx]} onBack={() => goBack('list')} onNext={() => { setStep('form'); window.scrollTo({ top: 0, behavior: 'smooth' }); trackBeginCheckout(rewards[selectedIdx].tier, rewards[selectedIdx].priceNum) }} />
  if (step === 'form') return <OrderForm reward={rewards[selectedIdx]} onBack={() => goBack('detail')} />
  return <RewardList onSelect={handleSelect} />
}
