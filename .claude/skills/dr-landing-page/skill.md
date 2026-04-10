---
name: dr-landing-page
description: "DR(Direct Response) 랜딩페이지 제작을 위한 에이전트 팀 오케스트레이터. dr-conversion, dr-copywriter, dr-designer, dr-image-director 4명의 전문가 팀을 조율하여 전환율 높은 랜딩페이지를 제작한다. '랜딩페이지 최적화', 'DR 페이지', '직접반응', '전환율 높이기', 'CTA 최적화', '마케팅 페이지 개선', '가격 앵커링 강화', '랜딩 리디자인' 관련 작업 시 반드시 이 스킬을 사용할 것."
---

# DR Landing Page Orchestrator

HI-Sing 서비스의 Direct Response 랜딩페이지를 제작/최적화하는 에이전트 팀 오케스트레이터.

## 팀 구성

| 에이전트 | 역할 | 타입 |
|---------|------|------|
| dr-conversion | 전환 전략 수립, 심리학 기반 섹션 구성 | general-purpose |
| dr-copywriter | AIDA/PAS 기반 카피, CTA, 긴급성 문구 | general-purpose |
| dr-designer | 레이아웃 설계, Tailwind 코드 작성 | general-purpose |
| dr-image-director | 이미지 스타일 가이드, Gemini 프롬프트 | general-purpose |

## 워크플로우

### Phase 1: 전환 전략 수립 (dr-conversion 단독)
1. 기존 코드 분석: `src/sections/HomeTab.tsx`, `PricingTab.tsx`, `HANDOFF.md`
2. 타겟 심리 여정 설계
3. 섹션 최적 순서 재배치 제안
4. 전환 포인트/CTA 위치 전략
5. 산출물: `_workspace/dr-01_conversion_strategy.md`

### Phase 2: 카피 + 레이아웃 + 이미지 (병렬)
1. dr-copywriter + dr-designer 병렬 시작
2. dr-image-director가 이미지 디렉션 + 생성
3. 산출물: `_workspace/dr-02_*.md`, `public/images/dr-*.png`

### Phase 3: 통합 구현
1. dr-designer가 카피 + 이미지 통합하여 TSX 코드 작성
2. 빌드 확인

### Phase 4: 교차 리뷰
1. 전체 팀이 각자 관점에서 리뷰
2. A/B 테스트 가설 문서화

## 실행 방법

```
Agent(subagent_type="general-purpose", prompt="
dr-landing-page 오케스트레이터로서 작업합니다.
.claude/agents/dr-conversion.md를 읽고 Phase 1을 시작하세요.
")
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 전략 미완 | 기존 섹션 순서를 기본으로 진행 |
| 카피-레이아웃 불일치 | 3회 조율 후 dr-conversion 중재 |
| 이미지 생성 실패 | 이모지 폴백 + 디렉션 시트만 보존 |
| 빌드 실패 | dr-designer 즉시 수정 |
