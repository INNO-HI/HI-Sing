import { NextRequest, NextResponse } from 'next/server'

// ─── Rate Limiting ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 30
const RATE_WINDOW = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  // ─── Rate Limiting ───
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventType = typeof body.eventType === 'string' ? body.eventType : undefined
  const data = (body.data ?? {}) as Record<string, unknown>
  const paymentKey = typeof data.paymentKey === 'string' ? data.paymentKey : undefined

  // ─── paymentKey 재조회로 위변조 검증 ───
  // 토스페이먼츠는 별도 서명 헤더를 제공하지 않으므로,
  // 이벤트 수신 후 paymentKey로 토스 API를 다시 조회하여 실제 결제 상태를 확인한다.
  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) {
    console.error('[Toss Webhook] Server configuration error')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  if (paymentKey) {
    try {
      const authHeader = 'Basic ' + Buffer.from(secretKey + ':').toString('base64')
      const verifyRes = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}`, {
        method: 'GET',
        headers: { 'Authorization': authHeader },
      })
      const verified = await verifyRes.json()

      if (!verifyRes.ok) {
        console.warn('[Toss Webhook] Verification failed for paymentKey:', paymentKey)
        return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
      }

      console.log('[Toss Webhook]', {
        eventType,
        paymentKey,
        orderId: verified.orderId,
        status: verified.status,
        totalAmount: verified.totalAmount,
      })

      // TODO: DB에 결제 상태 업데이트 (verified.status에 따라)
    } catch (err) {
      console.error('[Toss Webhook] Verification error:', err)
      return NextResponse.json({ error: 'Verification error' }, { status: 500 })
    }
  } else {
    console.log('[Toss Webhook] event without paymentKey:', { eventType })
  }

  return NextResponse.json({ received: true })
}
