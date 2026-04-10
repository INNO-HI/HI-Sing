import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

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

  // ─── Raw body 확보 (서명 검증용) ───
  const rawBody = await req.text()

  // ─── 서명 검증 ───
  const signature = req.headers.get('x-nicepay-signature') || req.headers.get('x-signature')
  const secretKey = process.env.NICEPAY_SECRET_KEY

  if (!secretKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  if (signature) {
    const expected = crypto
      .createHmac('sha256', secretKey)
      .update(rawBody)
      .digest('hex')

    // timingSafeEqual로 타이밍 공격 방지
    try {
      const sigBuf = Buffer.from(signature, 'hex')
      const expBuf = Buffer.from(expected, 'hex')
      if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
        console.warn('[Webhook] Invalid signature from IP:', ip)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ error: 'Invalid signature format' }, { status: 401 })
    }
  } else if (process.env.NODE_ENV === 'production') {
    // 프로덕션에서 서명 없으면 거부
    console.warn('[Webhook] Missing signature from IP:', ip)
    return NextResponse.json({ error: 'Signature required' }, { status: 401 })
  }

  // ─── Body 파싱 ───
  let body: Record<string, unknown>
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // 로그 (민감정보 제외)
  console.log('[NicePay Webhook]', {
    resultCode: body.resultCode,
    tid: body.tid,
    orderId: body.orderId,
    status: body.status,
  })

  // TODO: DB에 결제 상태 업데이트

  return NextResponse.json({ received: true })
}
