import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/FadeIn'

const faqs = [
  {
    q: '목소리 파일은 어떤 걸 보내야 하나요?',
    a: 'mp3, m4a, wav, webm 등 대부분의 음성 파일을 지원합니다. 30초 이상이면 충분합니다.',
  },
  {
    q: '여러 사람 목소리가 섞여 있어도 되나요?',
    a: '네. 여러 목소리가 섞여 있어도 원하는 분의 목소리만 골라서 사용합니다.',
  },
  {
    q: '본인 목소리로도 만들 수 있나요?',
    a: '물론입니다. 본인, 가족, 지인 등 누구의 목소리든 가능합니다.',
  },
  {
    q: '노래는 얼마나 걸려서 완성되나요?',
    a: '영업일 기준 5~7일 이내. 완성되면 이메일로 안내드립니다.',
  },
  {
    q: '마음에 안 들면 수정할 수 있나요?',
    a: '모든 리워드에 1회 무료 수정이 포함되어 있습니다.',
  },
  {
    q: '커버곡은 어떤 노래든 가능한가요?',
    a: '대부분의 한국 가요와 팝송이 가능합니다. 저작권 사유로 어려운 곡은 사전에 안내드립니다.',
  },
  {
    q: '환불은 가능한가요?',
    a: '제작 시작 전 100% 환불 가능합니다. 제작 시작 후에는 환불이 불가하며, 텀블벅 정책을 따릅니다.',
  },
  {
    q: '내 목소리 데이터는 안전한가요?',
    a: '노래 제작 목적으로만 사용되며, 완료 후 30일 뒤 서버에서 삭제됩니다. 별도 동의 없이 AI 학습에 사용하지 않습니다.',
  },
  {
    q: '선물용으로 보내려면?',
    a: '카카오톡 공유 링크가 생성됩니다. 프리미엄/스페셜 리워드는 USB로 직접 전달하실 수도 있습니다.',
  },
]

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FadeIn delay={index * 0.04}>
      <div className="border-b border-neutral-200 last:border-b-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-5 sm:py-6 text-left gap-4 group"
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
              <p className="pb-5 sm:pb-6 text-ink-muted text-[15px] leading-relaxed pr-10">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

import type { TabId } from '@/types'

export function FaqTab({ onNavigate }: { onNavigate?: (tab: TabId) => void }) {
  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-primary-400 font-semibold text-sm mb-3">FAQ</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                자주 묻는 질문
              </h1>
            </div>
          </FadeIn>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-neutral-200 px-6 sm:px-8 shadow-sm">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <FadeIn>
              <p className="text-ink-muted text-sm mb-4">더 궁금한 점이 있으시면 010-4056-1754로 연락주세요</p>
              <button onClick={() => onNavigate?.('pricing')} className="px-8 py-3.5 text-[15px] font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors cursor-pointer">
                29,000원부터 시작하기
              </button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
