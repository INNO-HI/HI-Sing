---
name: sing-webapp
description: "sing 서비스의 Next.js 웹 애플리케이션 개발 스킬. 음성 업로드, 노래 요청, 오디오 플레이어, 결과 공유, 인증, 결제 등 웹앱 전반을 구현한다. '웹앱', '프론트엔드', 'UI', '페이지', '컴포넌트', 'API', '백엔드', '업로드', '플레이어' 관련 작업 시 반드시 이 스킬을 사용할 것."
---

# Sing Webapp — Next.js 웹 애플리케이션 개발

sing 서비스의 프론트엔드 및 백엔드를 Next.js로 구현한다.

## 기술 스택

| 영역 | 기술 | 선택 이유 |
|------|------|----------|
| Framework | Next.js 14+ (App Router) | SSR + API Routes 통합 |
| Language | TypeScript | 타입 안전성 |
| Styling | Tailwind CSS | 빠른 UI 개발, 모바일 퍼스트 |
| Auth | Supabase Auth | 소셜 로그인 + 이메일 |
| DB | Supabase PostgreSQL | Auth/Storage 통합 |
| Storage | Supabase Storage | 음성/노래 파일 저장 |
| State | Zustand | 경량 상태 관리 |
| Audio | Howler.js | 크로스 브라우저 오디오 |

## 핵심 페이지 구조

```
/                     → 랜딩 페이지 (서비스 소개 + CTA)
/auth/login           → 로그인/회원가입
/dashboard            → 내 보이스 모델 + 노래 목록
/voice/upload         → 음성 업로드 + 가이드
/voice/[id]           → 보이스 모델 상세 (샘플 재생)
/song/create          → 노래 생성 요청 폼
/song/cover           → 커버송 요청 폼
/song/[id]            → 노래 상세 (재생 + 다운로드 + 공유)
/song/[id]/share      → 공유 페이지 (비로그인 재생 가능)
```

## 핵심 컴포넌트

### VoiceUploader
- 드래그&드롭 + 파일 선택
- 실시간 업로드 진행률
- 업로드 전 클라이언트 사이드 검증 (포맷, 크기, 길이)
- 녹음 기능 (Web Audio API)

### AudioPlayer
- 재생/일시정지, 시크바, 볼륨
- 웨이브폼 시각화
- 다운로드 버튼
- 공유 버튼 (카카오톡, 링크 복사)

### SongRequestForm
- 스텝 위자드 (보이스 선택 → 스타일 선택 → 상세 입력 → 확인)
- 실시간 미리보기 (텍스트 기반 요약)
- 크레딧/결제 연동

### JobStatusTracker
- 실시간 진행률 (SSE/WebSocket)
- 예상 완료 시간
- 완료 시 알림 (브라우저 Push)

## DB 스키마 (핵심)

```sql
-- 사용자
users (id, email, name, created_at)

-- 보이스 모델
voice_models (id, user_id, name, model_id, status, quality, created_at, expires_at)

-- 노래
songs (id, user_id, voice_model_id, type, title, status, progress, file_url, created_at)

-- 노래 요청
song_requests (id, song_id, request_type, params_json, created_at)

-- 크레딧/결제
credits (id, user_id, amount, source, created_at)
```

## API 라우트 설계

```
POST   /api/voice/upload      → 음성 파일 업로드 + 클론 시작
GET    /api/voice/[id]        → 보이스 모델 상태 조회
POST   /api/song/create       → 오리지널 노래 생성 요청
POST   /api/song/cover        → 커버송 생성 요청
GET    /api/song/[id]         → 노래 상태/결과 조회
GET    /api/song/[id]/stream  → SSE 진행률 스트림
GET    /api/dashboard         → 대시보드 데이터
```

## 모바일 최적화

- 모든 페이지 모바일 퍼스트 디자인
- 터치 영역 최소 44px
- 음성 업로드: 모바일에서 바로 녹음 가능
- 오디오 플레이어: iOS/Android 미디어 세션 연동
- 하단 네비게이션 바 (홈, 내 보이스, 노래 만들기, 마이페이지)

## 성능 기준

- LCP < 2.5s, FID < 100ms, CLS < 0.1
- 오디오 파일은 CDN 캐싱
- 이미지는 Next.js Image 최적화
