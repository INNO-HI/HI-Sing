---
name: song-generation
description: "클론된 음성으로 오리지널 노래를 작사/작곡하거나 기존 노래를 커버하는 파이프라인 구현 스킬. Lyria를 활용한 작곡, 가사 생성, 보컬 렌더링, 커버송 제작을 수행한다. '노래 만들기', '작사', '작곡', '커버', '18번 노래', '노래 생성', '송 제작' 관련 작업 시 반드시 이 스킬을 사용할 것."
---

# Song Generation — 노래 생성/커버 파이프라인

클론된 보이스 모델을 활용하여 오리지널 노래를 생성하거나 기존 노래의 커버 버전을 제작하는 파이프라인을 구현한다.

## 두 가지 핵심 파이프라인

### Pipeline A: 오리지널 노래 생성

사용자의 요청을 바탕으로 새로운 노래를 작사/작곡하고, 클론 음성으로 부르게 한다.

```
사용자 요청 → 요청 파싱 → 작사/작곡(Lyria) → 보컬 렌더링(Voice Model) → 후처리 → MP3 출력
```

**사용자 요청 파라미터:**
```typescript
interface SongRequest {
  voiceModelId: string;       // 사용할 보이스 모델
  mood: string;               // 분위기 (밝은, 잔잔한, 신나는 등)
  occasion?: string;          // 상황 (생일, 결혼기념일, 졸업 등)
  keywords?: string[];        // 포함할 키워드 ("사랑", "감사" 등)
  recipientName?: string;     // 받는 사람 이름
  genre?: string;             // 장르 (발라드, 팝, 트로트 등)
  duration?: '1min' | '2min' | '3min';  // 길이 (기본 2분)
}
```

### Pipeline B: 커버송 생성

사용자가 지정한 기존 노래를 클론 음성으로 커버한다.

```
원곡 지정 → 원곡 분석(멜로디/가사 분리) → 클론 음성 보컬 합성 → 믹싱 → MP3 출력
```

**커버 요청 파라미터:**
```typescript
interface CoverRequest {
  voiceModelId: string;       // 사용할 보이스 모델
  songTitle: string;          // 원곡 제목
  artist?: string;            // 원곡 아티스트
  key?: string;               // 키 조절 (원키, +1, -1 등)
  style?: string;             // 편곡 스타일 (원곡 유지, 어쿠스틱, 재즈 등)
}
```

## 비동기 작업 관리

노래 생성은 1~5분 소요되므로 비동기 처리가 필수다.

```typescript
interface SongJob {
  jobId: string;
  type: 'original' | 'cover';
  status: 'queued' | 'processing' | 'rendering' | 'done' | 'failed';
  progress: number;           // 0~100
  estimatedTime: number;      // 예상 남은 시간(초)
  resultUrl?: string;         // 완성 시 다운로드 URL
  errorMessage?: string;      // 실패 시 에러 메시지
}
```

**상태 알림:**
- 큐 진입 → 처리 시작 → 렌더링 중 → 완료 (각 단계에서 사용자에게 알림)
- WebSocket 또는 Server-Sent Events로 실시간 진행률 전달

## 출력 포맷

- **기본:** MP3 (320kbps)
- **고품질:** WAV (44.1kHz, 16bit)
- 메타데이터 포함: 제목, 아티스트(가족 이름), 생성일, 앨범아트(자동 생성)

## 법적 고려사항

- 커버송의 경우 원곡 저작권 이슈가 있다
- MVP에서는 저작권 프리 곡 또는 한국 저작권 협회 허가 곡만 지원하는 것을 권장한다
- 오리지널 노래의 저작권은 서비스 이용약관에서 명확히 정의해야 한다
- 사용자에게 "개인 감상용" 안내를 제공한다

## 품질 관리

- 생성된 노래의 자동 품질 평가 (음정 정확도, 리듬 일치도, 음성 자연스러움)
- 품질 점수가 임계값 미만이면 자동 재생성 (최대 2회)
- 재생성 후에도 품질 미달이면 사용자에게 알리고 샘플 개선 안내
