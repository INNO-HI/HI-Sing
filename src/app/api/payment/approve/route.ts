import { NextRequest, NextResponse } from 'next/server'

// ─── 허용된 리워드 금액만 화이트리스트로 검증 ───
// 정가: 얼리버드 29,000 / 기본 49,000 / 프리미엄 79,000
const ALLOWED_AMOUNTS = [29000, 49000, 79000]

// ─── 중복 승인 방지 (인메모리, 프로덕션은 Redis/DB 권장) ───
const processedKeys = new Map<string, number>()
const KEY_TTL = 10 * 60 * 1000 // 10분

function cleanupOldKeys() {
  const now = Date.now()
  for (const [key, time] of processedKeys.entries()) {
    if (now - time > KEY_TTL) processedKeys.delete(key)
  }
}

// ─── 간단한 Rate Limiting (IP별 분당 10회) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
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

  // ─── Origin 검증 (CSRF 방지) ───
  const origin = req.headers.get('origin') || req.headers.get('referer') || ''
  const allowedOrigins = ['https://hisolution.site', 'https://www.hisolution.site', 'http://localhost:3000']
  const isAllowed = allowedOrigins.some(o => origin.startsWith(o))
  if (!isAllowed && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 })
  }

  let body: { paymentKey?: string; amount?: number; orderId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { paymentKey, amount, orderId } = body

  // ─── 입력값 검증 ───
  if (!paymentKey || typeof paymentKey !== 'string' || !/^[a-zA-Z0-9_-]{1,200}$/.test(paymentKey)) {
    return NextResponse.json({ error: 'Invalid paymentKey' }, { status: 400 })
  }
  if (!orderId || typeof orderId !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(orderId)) {
    return NextResponse.json({ error: 'Invalid orderId' }, { status: 400 })
  }
  if (typeof amount !== 'number' || !Number.isInteger(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }

  // ─── 금액 화이트리스트 검증 (위변조 방지) ───
  if (!ALLOWED_AMOUNTS.includes(amount)) {
    return NextResponse.json({ error: 'Amount not allowed' }, { status: 400 })
  }

  // ─── 중복 승인 방지 ───
  cleanupOldKeys()
  if (processedKeys.has(paymentKey)) {
    return NextResponse.json({ error: 'Duplicate transaction' }, { status: 409 })
  }
  processedKeys.set(paymentKey, Date.now())

  // ─── 환경변수 체크 ───
  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  // ─── 토스페이먼츠 승인 API 호출 ───
  const authHeader = 'Basic ' + Buffer.from(secretKey + ':').toString('base64')

  try {
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })

    const result = await response.json()

    if (response.ok && result.status === 'DONE') {
      // ─── 승인 후 금액 재검증 (토스가 반환한 금액과 요청 금액 일치 확인) ───
      if (Number(result.totalAmount) !== amount) {
        return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 })
      }
      return NextResponse.json({
        success: true,
        orderId,
        paymentKey: result.paymentKey,
        amount: result.totalAmount,
        approvedAt: result.approvedAt,
        method: result.method,
        cardCompany: result.card?.company,
      })
    } else {
      // 승인 실패 시 paymentKey 재사용 가능하도록 제거
      processedKeys.delete(paymentKey)
      return NextResponse.json({
        success: false,
        error: result.message || '결제 승인에 실패했습니다',
        code: result.code,
      }, { status: response.status >= 400 ? response.status : 400 })
    }
  } catch (err) {
    processedKeys.delete(paymentKey)
    console.error('[Payment Approve] Error:', err)
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 })
  }
}
