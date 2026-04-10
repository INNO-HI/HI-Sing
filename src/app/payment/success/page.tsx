'use client'

import { useEffect } from 'react'
import { Check, Home } from 'lucide-react'
import Link from 'next/link'
import { trackPurchase, trackOutboundClick, trackPageView } from '@/lib/analytics'

export default function PaymentSuccess() {
  useEffect(() => {
    trackPageView('payment_success')
    const params = new URLSearchParams(window.location.search)
    const tier = params.get('tier') || ''
    const price = Number(params.get('price') || '0')
    const orderId = params.get('orderId') || ''
    if (orderId) trackPurchase(tier, price, orderId)
    // 주문 성공 시 임시 저장된 폼 값 삭제
    try {
      localStorage.removeItem('hising-order-form-v1')
    } catch {
      // 접근 불가 환경에서는 무시
    }
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        {/* 성공 아이콘 */}
        <div className="w-20 h-20 rounded-full bg-primary-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-200/50">
          <Check className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-ink-light mb-2">결제가 완료되었습니다</h1>
        <p className="text-ink-muted text-sm leading-relaxed mb-8">
          주문해주셔서 감사합니다.<br />
          입력해주신 정보를 바탕으로 노래 제작을 시작합니다.
        </p>

        {/* 안내 카드 */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 text-left mb-8">
          <h3 className="font-bold text-ink-light text-sm mb-4">앞으로의 진행 과정</h3>
          <div className="space-y-4">
            {[
              { step: '1', text: '음성 파일과 이야기를 확인합니다', time: '1일 이내' },
              { step: '2', text: '작사/작곡을 진행합니다', time: '3~5일' },
              { step: '3', text: '보컬 합성 + 믹싱 후 완성', time: '1~2일' },
              { step: '4', text: '카카오톡 링크로 전달드립니다', time: '' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm text-ink-light">{item.text}</p>
                  {item.time && <p className="text-xs text-ink-faint mt-0.5">{item.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 text-left mb-8">
          <p className="text-xs text-ink-muted leading-relaxed">
            진행 상황은 입력하신 연락처로 안내드립니다.<br />
            수정 요청이나 문의사항은{' '}
            <a
              href="http://pf.kakao.com/_vxbvdX"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick('http://pf.kakao.com/_vxbvdX', 'payment_success_kakao')}
              className="text-primary-400 font-semibold hover:underline"
            >
              카카오톡 채널
            </a>
            로 연락주세요.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary-400 border border-primary-200 rounded-full hover:bg-primary-50 transition-colors"
        >
          <Home className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
