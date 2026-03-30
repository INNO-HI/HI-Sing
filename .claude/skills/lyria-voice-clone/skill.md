---
name: lyria-voice-clone
description: "Google Lyria API를 활용한 음성 클론(Voice Cloning) 파이프라인 구현 스킬. 음성 샘플 전처리, Lyria API 호출, 보이스 모델 생성/관리를 수행한다. 'Lyria', '음성 클론', 'voice clone', '목소리 학습', '보이스 모델', '음성 샘플' 관련 작업 시 반드시 이 스킬을 사용할 것."
---

# Lyria Voice Clone — 음성 클론 파이프라인

Google Lyria API를 활용하여 사용자가 업로드한 음성 샘플로부터 보이스 모델을 생성하는 파이프라인을 구현한다.

## 왜 이 스킬이 필요한가

sing 서비스의 핵심 가치는 "가족의 실제 목소리"로 노래를 만드는 것이다. 음성 클론 품질이 서비스 전체 품질을 결정하므로, 전처리부터 모델 생성까지의 파이프라인이 견고해야 한다.

## 파이프라인 설계

### 1. 음성 샘플 수집 요구사항

- **최소 길이:** 30초 이상 (권장 1~3분)
- **지원 포맷:** mp3, wav, m4a, webm
- **권장 환경:** 조용한 공간, 말하기/노래 모두 가능
- **샘플 가이드:** 사용자에게 "가족에게 편지 읽듯이 자연스럽게 말해주세요" 안내

### 2. 전처리 파이프라인

```
업로드 파일 → 포맷 검증 → WAV 변환(FFmpeg) → 노이즈 제거 → 무음 구간 제거 → 볼륨 정규화 → 품질 검증
```

**품질 검증 기준:**
- SNR(Signal-to-Noise Ratio) > 20dB
- 유효 음성 구간 > 20초
- 클리핑 없음

### 3. Lyria API 연동

```typescript
// Voice Clone 요청 구조
interface VoiceCloneRequest {
  audioSample: Buffer;        // 전처리된 음성 데이터
  sampleRate: 44100;          // 샘플링 레이트
  language: 'ko';             // 한국어
  voiceName: string;          // 사용자 지정 이름 (예: "엄마 목소리")
}

// Voice Model 응답
interface VoiceModel {
  modelId: string;            // 고유 모델 ID
  status: 'processing' | 'ready' | 'failed';
  createdAt: Date;
  expiresAt: Date;            // 모델 유효기간
  quality: 'low' | 'medium' | 'high';
}
```

### 4. 보이스 모델 관리

- 모델 ID를 DB에 저장하고 사용자 계정과 연결한다
- 모델 유효기간을 추적하고 만료 전 갱신 알림을 보낸다
- 한 사용자당 최대 10개 보이스 모델 허용

## 에러 처리

| 에러 | 원인 | 대응 |
|------|------|------|
| 샘플 품질 부족 | 배경 소음, 너무 짧음 | 구체적 가이드와 함께 재업로드 요청 |
| API 타임아웃 | Lyria 서버 지연 | 3회 재시도, 실패 시 사용자에게 알림 |
| 클론 품질 낮음 | 샘플 다양성 부족 | 추가 샘플 요청 안내 |
| 모델 생성 실패 | API 내부 오류 | 에러 로깅 후 자동 재시도 |

## 주의사항

- Lyria API는 현재 프리뷰/베타 단계일 수 있다. 실제 API 문서를 반드시 확인하라
- 음성 클론 동의서(consent)를 반드시 받아야 한다 — 본인 또는 가족 동의 필수
- 클론 모델은 서비스 외부로 유출되지 않도록 접근 제어를 엄격히 한다
