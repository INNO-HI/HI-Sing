'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/FadeIn'
import { trackCTAClick, trackOutboundClick } from '@/lib/analytics'
import type { TabId } from '@/types'

type FaqCategory = '전체' | '제작' | '결제·환불' | '저작권·AI' | '개인정보'

interface Faq {
  category: Exclude<FaqCategory, '전체'>
  q: string
  a: string
}

const faqs: Faq[] = [
  // 제작
  {
    category: '제작',
    q: '목소리 파일은 어떤 걸 보내야 하나요?',
    a: 'mp3, m4a, wav, webm 등 대부분의 음성 파일을 지원합니다. 전화 녹음, 영상에 담긴 목소리, 일상 대화 녹음 무엇이든 30초 이상이면 충분합니다.',
  },
  {
    category: '제작',
    q: '여러 사람 목소리가 섞여 있어도 되나요?',
    a: '네, 괜찮습니다. 여러 목소리가 섞여 있어도 원하는 분의 목소리만 추출해서 사용합니다. 주문 시 누구의 목소리인지 간단히 적어주세요.',
  },
  {
    category: '제작',
    q: '본인 목소리로도 만들 수 있나요?',
    a: '물론입니다. 본인, 가족, 친구, 연인 등 동의를 받은 사람의 목소리라면 누구든 가능합니다.',
  },
  {
    category: '제작',
    q: '노래는 얼마나 걸려서 완성되나요?',
    a: '영업일 기준 3~5일 이내에 완성되며, 완성곡이 준비되면 입력하신 연락처로 안내드립니다. 선물 날짜가 급하시면 주문 시 별도로 알려주세요.',
  },
  {
    category: '제작',
    q: '마음에 안 들면 수정할 수 있나요?',
    a: '모든 리워드에 1회 무료 수정이 포함되어 있습니다. 가사, 멜로디, 분위기, 보컬 톤 등 합리적인 범위 내에서 수정 가능합니다. 전체 컨셉을 바꾸는 재제작 수준의 요청은 별도 비용이 발생할 수 있습니다.',
  },
  {
    category: '제작',
    q: '커버곡은 어떤 노래든 가능한가요?',
    a: '대부분의 한국 가요와 팝송이 가능하지만, 저작권 확보가 어려운 일부 곡은 제작이 제한될 수 있습니다. 주문 시 원하시는 곡을 적어주시면 사전에 확인 후 안내드립니다.',
  },

  // 결제·환불
  {
    category: '결제·환불',
    q: '결제는 어떻게 진행되나요?',
    a: '나이스페이먼츠를 통해 신용카드·체크카드 결제가 가능합니다. 결제 정보는 회사에 저장되지 않으며, 결제 대행사를 통해 안전하게 처리됩니다.',
  },
  {
    category: '결제·환불',
    q: '환불은 가능한가요?',
    a: '제작 시작 전에는 100% 환불됩니다. 제작 시작 후에는 진행 단계에 따라 부분 환불(50%)이 가능하며, 보컬 합성 이후에는 환불이 제한됩니다. 자세한 내용은 가격 페이지의 환불 정책 또는 서비스이용약관 제13조를 참고해주세요.',
  },
  {
    category: '결제·환불',
    q: '선물용으로 보내려면 어떻게 하나요?',
    a: '완성곡은 카카오톡 공유 링크로 받아보실 수 있어, 링크만 전달하시면 바로 선물이 됩니다. 프리미엄 리워드는 가사 카드 이미지도 함께 제공되어 더욱 특별한 선물이 가능합니다.',
  },

  // 저작권·AI
  {
    category: '저작권·AI',
    q: '완성곡의 저작권은 누구에게 있나요?',
    a: '완성곡의 사적 이용권(다운로드, 재생, 가족·지인 간 공유)은 이용자에게 있습니다. 다만 현행 저작권법상 AI 생성물의 저작권 귀속은 명확히 정립되지 않은 점을 고려하여, 회사는 상업적 이용(음원 유통, 광고, 방송, NFT 등)은 사전 서면 동의가 필요하도록 운영하고 있습니다.',
  },
  {
    category: '저작권·AI',
    q: '완성곡을 유튜브/스트리밍 플랫폼에 올려도 되나요?',
    a: '개인 계정의 비상업적 공유(가족 단톡방, 개인 블로그 등)는 가능합니다. 그러나 유튜브 수익화, 멜론·지니·Spotify 등 음원 유통, 광고·방송 사용 등 상업적 이용은 사전에 회사의 서면 동의를 받아주세요. 자세한 내용은 서비스이용약관 제16조를 참고해주세요.',
  },
  {
    category: '저작권·AI',
    q: '커버곡 완성본도 자유롭게 쓸 수 있나요?',
    a: '커버곡은 원곡의 저작권이 별도로 존재하므로, 저작권법 제30조에 따른 사적 이용(본인 및 가까운 가족·지인과의 개인적 감상) 범위로만 사용하실 수 있습니다. 공개 방송이나 공연, 온라인 업로드는 원곡 저작권자의 별도 이용허락이 필요합니다.',
  },
  {
    category: '저작권·AI',
    q: 'AI가 만든 건데 목소리가 진짜 똑같이 재현되나요?',
    a: 'AI는 음성 샘플의 톤, 억양, 음색을 학습해 자연스러운 보컬로 합성합니다. 다만 AI는 확률적 모델이기 때문에 100% 완벽한 재현을 보장하지는 않으며, 음성 샘플의 품질·분량·잡음 수준에 따라 결과가 달라질 수 있습니다. 결과가 기대와 다르면 1회 무료 수정으로 조정해드립니다.',
  },
  {
    category: '저작권·AI',
    q: '타인의 목소리도 사용할 수 있나요?',
    a: '반드시 음성 주체(목소리 당사자)의 사전 동의가 필요합니다. 동의 없이 타인의 목소리를 업로드하는 행위는 법적으로 문제될 수 있으며, 이로 인한 모든 책임은 이용자 본인에게 있습니다. 정치인·연예인·고인 등의 목소리는 어떠한 경우에도 사용할 수 없습니다.',
  },
  {
    category: '저작권·AI',
    q: '제 음성이 AI 학습에 사용되나요?',
    a: '아니요. 업로드하신 음성은 오직 주문하신 노래 제작 목적으로만 사용되며, 별도 동의 없이 AI 학습 데이터로 활용되지 않습니다. 제작 완료 후 30일이 지나면 서버에서 완전히 삭제됩니다.',
  },

  // 개인정보
  {
    category: '개인정보',
    q: '내 목소리 데이터는 안전한가요?',
    a: '업로드하신 음성은 HTTPS/TLS로 암호화되어 전송·저장되며, 노래 제작 목적으로만 사용됩니다. 제작 완료 후 30일이 지나면 서버에서 완전 삭제되며, 이후 복구되지 않습니다. 즉시 삭제를 원하시면 언제든 요청하실 수 있습니다.',
  },
  {
    category: '개인정보',
    q: '개인정보 관련 문의는 어디로 해야 하나요?',
    a: '개인정보 보호책임자(김민수) 또는 담당자(한민우)에게 contact@innohi.ai.kr로 문의하실 수 있습니다. 자세한 내용은 개인정보 처리방침 페이지를 참고해주세요.',
  },
]

const categories: FaqCategory[] = ['전체', '제작', '결제·환불', '저작권·AI', '개인정보']

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FadeIn delay={Math.min(index * 0.04, 0.3)}>
      <div className="border-b border-neutral-200 last:border-b-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-5 sm:py-6 text-left gap-4 group"
          aria-expanded={isOpen}
        >
          <span className="text-[15px] sm:text-base font-semibold text-ink group-hover:text-primary-400 transition-colors">
            {q}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-ink-faint flex-shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <p className="pb-5 sm:pb-6 text-ink-muted text-[15px] leading-relaxed pr-4 sm:pr-10 whitespace-pre-line">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

interface FaqTabProps {
  onNavigate?: (tab: TabId) => void
}

export function FaqTab({ onNavigate }: FaqTabProps) {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('전체')

  const filteredFaqs = useMemo(
    () => (activeCategory === '전체' ? faqs : faqs.filter(f => f.category === activeCategory)),
    [activeCategory]
  )

  const handleCTA = () => {
    trackCTAClick('faq_bottom', '29,000원부터 시작하기')
    onNavigate?.('pricing')
  }

  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-primary-400 font-semibold text-sm mb-3">FAQ</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                자주 묻는 질문
              </h1>
              <p className="text-ink-muted text-sm mt-3">궁금한 카테고리를 선택해주세요</p>
            </div>
          </FadeIn>

          {/* 카테고리 탭 */}
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl mx-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                    activeCategory === cat
                      ? 'bg-primary-400 text-white border-primary-400 shadow-md shadow-primary-200/40'
                      : 'bg-white text-ink-muted border-neutral-200 hover:border-primary-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* 질문 목록 */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-neutral-200 px-5 sm:px-8 shadow-sm">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <AccordionItem key={`${activeCategory}-${i}`} q={faq.q} a={faq.a} index={i} />
              ))
            ) : (
              <p className="text-center text-ink-muted text-sm py-12">해당 카테고리에 질문이 없습니다.</p>
            )}
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <FadeIn>
              <p className="text-ink-muted text-sm mb-4">
                찾으시는 답변이 없으신가요?{' '}
                <a
                  href="http://pf.kakao.com/_vxbvdX"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('http://pf.kakao.com/_vxbvdX', 'faq_kakao_channel')}
                  className="text-primary-400 font-semibold hover:underline"
                >
                  카카오톡 채널
                </a>
                로 문의주세요
              </p>
              <button
                onClick={handleCTA}
                className="px-8 py-3.5 text-[15px] font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors cursor-pointer"
              >
                29,000원부터 시작하기
              </button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
