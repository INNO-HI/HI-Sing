# HI-Sing 작업 인수인계

> 작성일: 2026-04-02
> 서비스명: HI-Sing — 노래로 전하는 우리 가족 이야기

---

## ⚠️ Pull 받기 전에 읽어주세요

최근 커밋이 amend + force push로 변경되었습니다.
이전 버전(`ceee76e`)을 이미 pull 받은 상태라면 아래 순서대로 실행해주세요.

**작업 중인 변경사항이 있는 경우 (커밋 안 한 상태):**
```bash
git stash                # 내 변경사항 임시 저장
git pull --rebase        # 원격 변경사항 받기
git stash pop            # 내 변경사항 복원
```

**이미 커밋까지 한 경우:**
```bash
git pull --rebase        # 이것만 실행
```

**충돌이 나면:**
```bash
git status               # 충돌 파일 확인
# 충돌 파일을 열어서 수동 해결 후
git add <충돌파일>
git rebase --continue
```

---

## 최신 변경사항 (2026-04-02)

### 추가된 파일

| 파일 | 내용 |
|------|------|
| `.claude/agents/growth-strategist.md` | 마케팅 전략 에이전트 정의 |
| `.claude/skills/growth-strategy/skill.md` | 마케팅 전략 스킬 |
| `_workspace/03_growth_marketing-strategy.md` | 마케팅 전략서 |
| `_workspace/03_growth_viral-references.md` | 바이럴 마케팅 레퍼런스 (5개 사례 분석) |
| `_workspace/04_growth_action-plan.md` | 실행 액션플랜 (지표 세팅~에이전시 위탁) |

### 수정된 파일

| 파일 | 변경 내용 |
|------|----------|
| `.claude/skills/sing-build/skill.md` | 팀 구성에 growth-strategist 추가 |

### 웹사이트 코드(`src/`)는 변경 없음
웹 코드 수정 작업과 충돌할 가능성은 낮습니다. 충돌이 발생하면 `_workspace/` 또는 `.claude/` 쪽일 가능성이 높고, 본인이 수정한 파일을 우선하면 됩니다.

---

## 서비스 한 줄 요약

목소리 파일을 업로드하면 AI가 그 목소리로 오리지널 노래를 작사/작곡하거나, 좋아하는 노래(18번)를 커버해주는 서비스.

**태그라인:** 노래로 전하는 우리 가족 이야기
**서브카피:** 마음을 직접 전하기 쑥스럽다면, HI-Sing으로 먼저 전해보세요.

---

## 현재 완료된 작업

### 1. 서비스 플로우 설계
- **파일:** `_workspace/01_designer_user-flow.md`
- 사용자 여정, 핵심 화면 플로우, MVP 기능 정의, 사용자 시나리오 포함
- 3채널 병행: 텀블벅 + 자체 스토어 + 글로벌

### 2. 텀블벅 캠페인 페이지 카피
- **파일:** `_workspace/02_campaign_tumblbuk-page.md`
- 이미지 카드 기획서 형태 (카드 11장 구성)
- 각 카드별 카피 + `[IMG]` 표시로 이미지 필요 위치 명시
- 하단 이미지 총 정리표 참고 (필수 8개 / 권장 3개 / 총 11개)

### 3. 자체 스토어 웹사이트 (초안)
- **기술스택:** React + Vite + TypeScript + Tailwind CSS + Framer Motion
- **실행:** `npm install && npm run dev` → http://localhost:5173
- **구조:** 탭 4개 (홈 / 샘플 / 가격 / FAQ)
- INNO-HI 웹사이트(www.innohi.ai.kr) 디자인 참고하여 제작

### 4. 마케팅 전략 (신규)
- **전략서:** `_workspace/03_growth_marketing-strategy.md`
- **레퍼런스:** `_workspace/03_growth_viral-references.md` (꾸까/라라스윗/당근마켓 등 5개 사례)
- **액션플랜:** `_workspace/04_growth_action-plan.md`
- 3채널 동시 런칭 (텀블벅 + 자체 스토어 + 글로벌)
- 사전 홍보 없이 즉시 결제 가능 (모방 리스크 대응)
- 팀 내부 1~2주 운영 → 외부 에이전시 위탁 (월 90만원)

---

## 팀원 요청사항

### 웹사이트 수정 필요 사항

1. **디자인 보완**
   - 현재는 텍스트 중심 — 실제 이미지/일러스트 삽입 필요
   - INNO-HI 사이트 톤 참고하되, 더 따뜻하고 감성적인 느낌으로
   - AI틱한 디자인 지양 (네온 글로우, 과한 그라데이션 X)

2. **이미지 제작 필요 (텀블벅 + 웹사이트 공용)**
   - 히어로 메인 비주얼 (가족/따뜻한 감성)
   - 3단계 인포그래픽 (STEP 1~3)
   - 노래 유형 비교 카드 (오리지널 vs 커버)
   - 샘플 앨범아트 ("새벽의 도시락")
   - 비포/애프터 비교 (음성 파형 vs 음악 파형)
   - 리워드 카드 디자인
   - 타임라인 인포그래픽
   - 상세 목록은 `_workspace/02_campaign_tumblbuk-page.md` 하단 이미지 총 정리표 참고

3. **CTA 분기 검토 (미확정)**
   - 현재 "바로 주문하기" 버튼은 자체 스토어용
   - 텀블벅 펀딩용 유입 시 "텀블벅에서 펀딩하기"로 전환 필요
   - URL 파라미터(`?from=funding`)로 분기하는 방안 검토 중

4. **샘플 오디오**
   - 현재 재생 UI만 목업 — 실제 샘플 노래 파일 필요
   - 데모용 AI 생성 노래 1곡 이상 준비 필요

5. **글로벌 대응**
   - 자체 웹사이트에 영문 탭 추가 검토
   - 글로벌 결제는 Stripe 연동 예정

### 텀블벅 등록 준비

- 캠페인 카피는 `_workspace/02_campaign_tumblbuk-page.md`에 완성
- 이미지 카드 제작 후 텀블벅에 등록 가능
- 심사 소요: 약 3~7영업일
- 수수료: 8% (VAT 별도)
- 필요 서류: 신분증 + 통장사본 + 사전확인서(기술 프로젝트)

---

## 핵심 타겟/톤 가이드

- **타겟:** 30~50대, 부모님(칠순/팔순/생신)에게 선물하려는 다 큰 자녀
- **톤:** 감성적이되 과장하지 않음. 기술 용어 최소화.
- **핵심 감정:** "쑥스러움" — 마음은 있는데 직접 전하기 어려운 감정
- **금지:** AI 강조, 기술 자랑, 네온/사이버 느낌

---

## 프로젝트 구조

```
HI-Sing/
├── _workspace/                           # 기획/마케팅 산출물
│   ├── 01_designer_user-flow.md          # 서비스 플로우 설계서
│   ├── 02_campaign_tumblbuk-page.md      # 텀블벅 캠페인 카피
│   ├── 03_growth_marketing-strategy.md   # 마케팅 전략서
│   ├── 03_growth_viral-references.md     # 바이럴 레퍼런스 리서치
│   └── 04_growth_action-plan.md          # 실행 액션플랜
├── .claude/                              # AI 에이전트/스킬 설정
│   ├── agents/                           # 에이전트 정의 5개
│   └── skills/                           # 스킬 정의 6개
├── src/                                  # 웹사이트 소스코드
│   ├── sections/                         # 페이지 섹션 컴포넌트
│   ├── components/                       # 공통 컴포넌트
│   ├── App.tsx                           # 메인 앱
│   └── index.css                         # 글로벌 스타일
├── package.json
└── HANDOFF.md                            # 이 파일
```

---

## 다음 단계 우선순위

1. **이미지 제작** → 텀블벅 캠페인 등록에 필수
2. **웹사이트 디자인 보완** → 이미지 삽입 + 스타일 조정
3. **샘플 노래 준비** → 데모용 AI 생성 노래
4. **3채널 동시 런칭** → 텀블벅 + 자체 스토어 + 글로벌
5. **마케팅 액션플랜 실행** → `_workspace/04_growth_action-plan.md` 참고

---

## 문의

질문 있으면 이 레포의 Issue로 남기거나, 직접 연락주세요.

**GitHub:** https://github.com/INNO-HI/HI-Sing
