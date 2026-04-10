import type { NextConfig } from 'next'

const securityHeaders = [
  // 프레임 임베드 차단 (Clickjacking 방지)
  { key: 'X-Frame-Options', value: 'DENY' },
  // MIME 타입 스니핑 차단
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // XSS 방지
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Referrer 정보 제한
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // HTTPS 강제 (1년)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // 권한 정책
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // CSP — GA, 나이스페이, 카카오 허용
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.nicepay.co.kr pay.nicepay.co.kr",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: *.google-analytics.com *.googletagmanager.com",
      "font-src 'self' data:",
      "connect-src 'self' *.google-analytics.com *.googletagmanager.com *.nicepay.co.kr api.nicepay.co.kr",
      "frame-src 'self' *.nicepay.co.kr pay.nicepay.co.kr",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' *.nicepay.co.kr",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // X-Powered-By 헤더 제거
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
}

export default nextConfig
