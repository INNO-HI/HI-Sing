'use client'

import { useEffect, useState } from 'react'
import { Home, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { trackPageView, trackOutboundClick } from '@/lib/analytics'

export default function PaymentFail() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    trackPageView('payment_fail')
    const params = new URLSearchParams(window.location.search)
    setCode(params.get('code') || '')
    setMessage(params.get('message') || '결제가 취소되었거나 실패했습니다.')
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-ink-light mb-2">결제가 완료되지 않았습니다</h1>
        <p className="text-ink-muted text-sm leading-relaxed mb-6">
          {message}
          {code && <span className="block text-xs text-ink-faint mt-2">오류 코드: {code}</span>}
        </p>
        <p className="text-ink-muted text-sm leading-relaxed mb-8">
          다시 시도하시거나, 카카오톡 채널로 문의주시면 즉시 도와드리겠습니다.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="http://pf.kakao.com/_vxbvdX"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick('http://pf.kakao.com/_vxbvdX', 'payment_fail_kakao')}
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
