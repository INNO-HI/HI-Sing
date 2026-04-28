'use client'

import { useEffect, useState } from 'react'
import { Check, Home, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { trackPurchase, trackOutboundClick, trackPageView } from '@/lib/analytics'

type Status = 'pending' | 'success' | 'error'

export default function PaymentSuccess() {
  const [status, setStatus] = useState<Status>('pending')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    trackPageView('payment_success')
    const params = new URLSearchParams(window.location.search)
    const paymentKey = params.get('paymentKey') || ''
    const orderId = params.get('orderId') || ''
    const amount = Number(params.get('amount') || '0')
    const tier = params.get('tier') || ''

    if (!paymentKey || !orderId || !amount) {
      setStatus('error')
      setErrorMessage('결제 정보가 올바르지 않습니다.')
      return
    }

    fetch('/api/payment/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })
      .then(async r => {
        const data = await r.json()
        if (r.ok && data.success) {
          setStatus('success')
          trackPurchase(tier, amount, orderId)
          try {
            localStorage.removeItem('hising-order-form-v1')
          } catch {
            // 접근 불가 환경에서는 무시
          }
        } else {
          setStatus('error')
          setErrorMessage(data.error || '결제 승인에 실패했습니다.')
        }
      })
      .catch(() => {
        setStatus('error')
        setErrorMessage('서버와의 연결에 실패했습니다. 잠시 후 다시 시도해주세요.')
      })
  }, [])

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-5">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary-400 animate-spin mx-auto mb-4" />
          <p className="text-sm text-ink-muted">결제를 확인하고 있습니다...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-ink-light mb-2">결제 승인에 실패했습니다</h1>
          <p className="text-ink-muted text-sm leading-relaxed mb-8">
            {errorMessage}<br />
            결제가 정상적으로 처리되지 않았습니다.<br />
            카카오톡 채널로 문의주시면 즉시 도와드리겠습니다.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="http://pf.kakao.com/_vxbvdX"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick('http://pf.kakao.com/_vxbvdX', 'payment_error_kakao')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary-400 rounded-full hover:bg-primary-500 transition-colors"
            >
              카카오톡 문의하기
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-primary-400 border border-primary-200 rounded-full hover:bg-primary-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

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

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 text-left mb-4">
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

        {/* 영수증 안내 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-left mb-3">
          <p className="text-xs font-semibold text-ink mb-1.5">영수증·증빙</p>
          <p className="text-[11px] text-ink-muted leading-relaxed">
            현금영수증은 신용카드 결제 건에 한해 토스페이먼츠를 통해 자동 발행됩니다. 별도 발행 또는 사업자용 세금계산서가 필요하신 경우 결제 후 <a href="mailto:contact@innohi.ai.kr" className="text-primary-400 underline">contact@innohi.ai.kr</a>로 사업자등록증 사본과 함께 요청해주세요.
          </p>
        </div>

        {/* AI 생성물 고지 (AI 기본법 제31조 / 개인정보보호법) */}
        <div className="bg-amber-50/70 rounded-xl border border-amber-200/60 p-4 text-left mb-8">
          <p className="text-[11px] text-amber-900/80 leading-relaxed">
            <strong className="font-semibold">AI 생성물 고지</strong> · 완성곡은 생성형 AI 기술로 보컬이 합성된 결과물입니다. 「인공지능 발전과 신뢰 기반 조성 등에 관한 기본법」 제31조에 따라 안내드립니다. 업로드하신 음성은 본 주문 1곡 제작에만 사용되며, 완성곡 전달 후 30일이 지나면 서버에서 자동으로 영구 파기됩니다.
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
