---
name: sing-build
description: "sing 서비스 전체 빌드를 조율하는 오케스트레이터 스킬. 에이전트 팀(product-designer, fullstack-dev, ai-engineer, campaign-writer)을 구성하고 서비스 기획 → 개발 → 마케팅까지 전 과정을 관리한다. '서비스 만들기', '빌드', '프로젝트 시작', 'sing 개발', '전체 작업' 시 반드시 이 스킬을 사용할 것."
---

# Sing Build — 서비스 빌드 오케스트레이터

sing 서비스의 전체 빌드 프로세스를 에이전트 팀으로 조율한다.

## 실행 모드

**에이전트 팀 (Agent Team)** — Fan-out/Fan-in + Pipeline 패턴

## 팀 구성

| 에이전트 | 역할 | 빌트인 타입 | 주요 스킬 |
|---------|------|-----------|----------|
| product-designer | 서비스 기획, UX 설계 | general-purpose | — |
| fullstack-dev | 웹앱 개발 | general-purpose | sing-webapp |
| ai-engineer | AI 파이프라인 | general-purpose | lyria-voice-clone, song-generation |
| campaign-writer | 마케팅/펀딩 | general-purpose | tumblbuk-campaign |

## 워크플로우

> **전략: 홍보 선행 → 결제 유입 후 개발**
> 기획과 홍보물을 먼저 완성하여 텀블벅에 올리고, 결제가 들어오면 실제 개발을 진행한다.

### Phase 1: 기획 (product-designer + ai-engineer)

1. product-designer가 사용자 플로우, 기능 명세, 화면 구조를 설계한다
2. ai-engineer가 Lyria API 기술적 제약을 조사하고 실현 가능 범위를 확정한다
3. 양측 협의하여 MVP 기능 범위를 확정한다
4. 산출물: `_workspace/01_designer_*.md`, `_workspace/01_ai_*.md`

### Phase 2: 홍보물 제작 (campaign-writer + product-designer)

1. 기획 결과를 바탕으로 텀블벅 캠페인 페이지 작성
2. 랜딩 페이지 카피, 리워드 구조, SNS 콘텐츠 제작
3. 서비스 컨셉 이미지/목업 제작 (데모 영상 포함)
4. 산출물: `_workspace/02_campaign_*.md`

### Phase 3: 배포 & 펀딩 (텀블벅 오픈)

1. 텀블벅 캠페인 등록 및 오픈
2. SNS 마케팅 집행
3. 펀딩 현황 모니터링 및 Q&A 대응

### Phase 4: 개발 (결제 유입 후 — fullstack-dev + ai-engineer 병렬)

**결제가 확인된 후 진행:**
- **fullstack-dev:** 웹앱 개발 (프론트엔드 + API)
  - 산출물: `src/`, `_workspace/04_dev_*.md`
- **ai-engineer:** AI 파이프라인 구현 (음성 클론 + 노래 생성)
  - 산출물: `src/lib/ai/`, `_workspace/04_ai_*.md`

**팀원 간 협업:**
- fullstack-dev ↔ ai-engineer: API 인터페이스 협의 (SendMessage)
- 양측 API 스펙이 일치하는지 교차 검증

### Phase 5: 통합 & 서비스 오픈

1. 전체 시스템 통합 테스트
2. 펀딩 후원자에게 서비스 제공
3. 피드백 수집 및 개선

## 데이터 전달 프로토콜

| 전략 | 용도 |
|------|------|
| **메시지 기반 (SendMessage)** | 팀원 간 실시간 질의/협의 |
| **태스크 기반 (TaskCreate)** | 작업 진행 상황 추적 |
| **파일 기반** | 산출물 공유 (`_workspace/` 디렉토리) |

**파일명 컨벤션:** `{phase}_{agent}_{artifact}.{ext}`
- `01_designer_user-flow.md`
- `01_ai_lyria-feasibility.md`
- `02_campaign_tumblbuk-page.md`
- `04_dev_api-spec.md`
- `04_ai_pipeline-design.md`

## 에러 핸들링

| 에러 | 전략 |
|------|------|
| 에이전트 실패 | 1회 재시도, 재실패 시 가용 결과로 진행 |
| API 인터페이스 불일치 | fullstack-dev ↔ ai-engineer 재협의 |
| Lyria API 제한 발견 | ai-engineer가 대안 제시 → product-designer가 기획 조정 |
| 마케팅 메시지와 실제 기능 괴리 | campaign-writer ↔ ai-engineer 크로스체크 |

## 실행 방법

```
# 오케스트레이터 실행 예시 (에이전트 팀 모드)

1. TeamCreate: "sing-build-team"
   - members: [product-designer, ai-engineer, campaign-writer]
   (fullstack-dev는 Phase 4에서 합류)

2. TaskCreate: Phase 1 작업들 (product-designer + ai-engineer)

3. Phase 1 완료 → TaskCreate: Phase 2 작업들 (campaign-writer + product-designer)

4. Phase 2 완료 → 텀블벅 등록 (Phase 3, 수동)

5. 결제 유입 확인 후 → fullstack-dev 합류, Phase 4 개발 시작

6. 전체 결과 수집 및 서비스 오픈
```

## 테스트 시나리오

### 정상 흐름
1. "기획부터 시작하자" → Phase 1 트리거
2. product-designer + ai-engineer 병렬 작업
3. 기획 완료 → "홍보물 만들자" → Phase 2 트리거
4. campaign-writer가 텀블벅 페이지 + 마케팅 콘텐츠 제작
5. 텀블벅 오픈 → 결제 유입 → "개발 시작하자" → Phase 4 트리거

### 에러 흐름
1. Phase 1에서 Lyria API가 커버송을 지원하지 않음을 발견
2. ai-engineer → product-designer에게 알림
3. product-designer가 기획 수정 (커버송 → 오리지널만 MVP 포함)
4. campaign-writer에게 리워드 구조 수정 전달
5. 수정된 기획으로 Phase 2 홍보물 제작 진행
