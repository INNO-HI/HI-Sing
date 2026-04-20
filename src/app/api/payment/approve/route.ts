import { NextRequest, NextResponse } from 'next/server'

// ─── 허용된 리워드 금액만 화이트리스트로 검증 ───
// 정가: 얼리버드 29,000 / 기본 49,000 / 프리미엄 79,000
// AI 학습 동의 시 10% 할인: 26,100 / 44,100 / 71,100
const ALLOWED_AMOUNTS = [29000, 49000, 79000, 26100, 44100, 71100]

// ─── 중복 승인 방지 (인메모리, 프로덕션은 Redis/DB 권장) ───
const processedTids = new Map<string, number>()
const TID_TTL = 10 * 60 * 1000 // 10분

function cleanupOldTids() {
  const now = Date.now()
  for (const [tid, time] of processedTids.entries()) {
    if (now - time > TID_TTL) processedTids.delete(tid)
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

  let body: { tid?: string; amount?: number; orderId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { tid, amount, orderId } = body

  // ─── 입력값 검증 ───
  if (!tid || typeof tid !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(tid)) {
    return NextResponse.json({ error: 'Invalid tid' }, { status: 400 })
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
  cleanupOldTids()
  if (processedTids.has(tid)) {
    return NextResponse.json({ error: 'Duplicate transaction' }, { status: 409 })
  }
  processedTids.set(tid, Date.now())

  // ─── 환경변수 체크 ───
  const secretKey = process.env.NICEPAY_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  // ─── 나이스페이 승인 API 호출 ───
  const authHeader = 'Basic ' + Buffer.from(secretKey + ':').toString('base64')

  try {
    const response = await fetch(`https://api.nicepay.co.kr/v1/payments/${tid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ amount }),
    })

    const result = await response.json()

    if (result.resultCode === '0000') {
      // ─── 승인 후 금액 재검증 (나이스페이가 반환한 금액과 요청 금액 일치 확인) ───
      if (Number(result.amount) !== amount) {
        return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 })
      }
      return NextResponse.json({
        success: true,
        orderId,
        tid: result.tid,
        amount: result.amount,
        paidAt: result.paidAt,
        cardName: result.card?.cardName,
      })
    } else {
      // 승인 실패 시 TID 재사용 가능하도록 제거
      processedTids.delete(tid)
      return NextResponse.json({
        success: false,
        error: result.resultMsg,
        resultCode: result.resultCode,
      }, { status: 400 })
    }
  } catch (err) {
    processedTids.delete(tid)
    console.error('[Payment Approve] Error:', err)
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 })
  }
}
