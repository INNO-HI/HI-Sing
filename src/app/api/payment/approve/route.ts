import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { tid, amount, orderId } = await req.json()

  const secretKey = process.env.NICEPAY_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  // Basic 인증 헤더: secretKey + ':'를 base64 인코딩
  const authHeader = 'Basic ' + Buffer.from(secretKey + ':').toString('base64')

  // 나이스페이 승인 API 호출
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
    // 승인 성공 — 주문 처리 로직 추가 가능
    return NextResponse.json({
      success: true,
      orderId,
      tid: result.tid,
      amount: result.amount,
      paidAt: result.paidAt,
      cardName: result.card?.cardName,
    })
  } else {
    return NextResponse.json({
      success: false,
      error: result.resultMsg,
      resultCode: result.resultCode,
    }, { status: 400 })
  }
}
