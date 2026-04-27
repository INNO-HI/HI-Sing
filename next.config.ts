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
  // CSP — GA, 나이스페이, Pretendard 폰트 허용
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com js.tosspayments.com *.tosspayments.com",
      "style-src 'self' 'unsafe-inline' cdn.jsdelivr.net",
      "img-src 'self' data: blob: *.google-analytics.com *.googletagmanager.com *.tosspayments.com",
      "font-src 'self' data: cdn.jsdelivr.net",
      "connect-src 'self' *.google-analytics.com *.googletagmanager.com *.tosspayments.com api.tosspayments.com",
      "frame-src 'self' *.tosspayments.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' *.tosspayments.com",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // X-Powered-By 헤더 제거
  generateBuildId: () => null, // Next 기본값 명시 (일부 환경에서 env 주입으로 누락되는 케이스 대응)
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
}

export default nextConfig
