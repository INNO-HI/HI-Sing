import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // 나이스페이 웹훅 수신 — 결제 상태 변경 알림
  console.log('[NicePay Webhook]', JSON.stringify(body, null, 2))

  // TODO: DB에 결제 상태 업데이트

  return NextResponse.json({ received: true })
}
