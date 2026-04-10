---
name: dr-layout-system
description: "전환율 높은 DR 랜딩페이지 레이아웃 설계 및 Tailwind CSS 기반 컴포넌트 코드 작성. F패턴/Z패턴 시선 흐름, CTA 배치 최적화, 모바일 퍼스트 반응형 설계를 수행한다. '레이아웃', '섹션 배치', 'CTA 위치', '반응형', '컴포넌트 코드', '디자인 시스템' 관련 작업 시 반드시 이 스킬을 사용할 것."
---

# DR Layout System

HI-Sing 랜딩페이지 전용 레이아웃 시스템.

## 기존 코드베이스 컨벤션 (필수 준수)

### 컬러 시스템 (tailwind.config.cjs)
- primary: `50~600` (#448CFF 기준)
- neutral: `50~400`
- ink: `DEFAULT(#222)`, `light`, `muted`, `faint`

### 레이아웃
- 컨테이너: `max-w-container` (960px), 고객후기만 `max-w-[1200px]`
- 패딩: `px-5 sm:px-8 lg:px-14`
- 섹션 간격: `py-20 sm:py-32`

### 컴포넌트 패턴
- 카드: `rounded-2xl border border-neutral-200 bg-white shadow-sm`
- CTA: `rounded-full bg-primary-400 text-white hover:bg-primary-500 px-8 py-4`
- 애니메이션: `<FadeIn delay={N}>` 래핑
- 아이콘: `lucide-react`

### 배경 리듬
white → neutral-50 → ink(다크) → primary gradient → white

## DR 레이아웃 원칙

### CTA 3포인트 규칙
1. 히어로 CTA (스크롤 0%)
2. 중간 CTA (가격 비교 직후, 50~60%)
3. 하단 CTA (풀 그라데이션 배너, 90%+)

### F패턴 읽기 흐름
- 헤드라인 좌측 정렬
- 서브 텍스트 좌측 시작
- CTA 좌측 또는 중앙

### 시각적 계층
- 제목: `font-black text-2xl sm:text-3xl lg:text-[2.125rem]`
- 소제목: `font-bold text-xl`
- 본문: `text-base text-ink-muted leading-relaxed`

### 색상 대비 원칙
- CTA 버튼은 주변 배경과 최대 대비
- 다크 배경 위 흰색 카드 = 플로팅 효과
- 가격 숫자는 `font-black text-5xl` 이상으로 시각적 앵커
