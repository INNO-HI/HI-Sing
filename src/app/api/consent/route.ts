import { NextRequest, NextResponse } from 'next/server'

// ─── Rate Limiting (IP별 분당 20회) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
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

type ConsentBody = {
  orderId?: string
  tier?: string
  consents?: {
    voiceConsent?: boolean
    usagePolicy?: boolean
    sensitiveData?: boolean
    aiDisclosure?: boolean
    ageConfirm?: boolean
  }
  consentedAt?: string
  userAgent?: string
}

/**
 * 동의 로그 수집 — 음성권 분쟁·개인정보 분쟁 시 입증용 자료.
 * 현재는 서버 콘솔에 구조화 로그로 남기며, 추후 DB(예: Supabase, Vercel KV)로 영구 보관 권장.
 * IP·시각·동의문 항목·UA를 함께 보관해 동의의 진정성을 입증한다.
 */
export async function POST(req: NextRequest) {
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

  let body: ConsentBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { orderId, tier, consents, consentedAt, userAgent } = body

  // ─── 입력값 검증 ───
  if (!orderId || typeof orderId !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(orderId)) {
    return NextResponse.json({ error: 'Invalid orderId' }, { status: 400 })
  }
  if (!consents || typeof consents !== 'object') {
    return NextResponse.json({ error: 'Invalid consents' }, { status: 400 })
  }

  // ─── 5가지 동의 모두 true 여부 검증 ───
  const required: Array<keyof NonNullable<ConsentBody['consents']>> = [
    'voiceConsent',
    'usagePolicy',
    'sensitiveData',
    'aiDisclosure',
    'ageConfirm',
  ]
  const missing = required.filter(k => consents[k] !== true)
  if (missing.length > 0) {
    return NextResponse.json({ error: 'Missing consents', missing }, { status: 400 })
  }

  // ─── 구조화 로그 출력 (추후 DB 연동 권장) ───
  // 약관 분쟁 시 이 로그가 동의 입증 자료가 되므로 구조 변경 시 주의.
  console.log('[Consent]', JSON.stringify({
    orderId,
    tier: tier ?? null,
    consents,
    consentedAt: consentedAt ?? new Date().toISOString(),
    ip,
    userAgent: userAgent ?? null,
    receivedAt: new Date().toISOString(),
  }))

  return NextResponse.json({ received: true })
}
