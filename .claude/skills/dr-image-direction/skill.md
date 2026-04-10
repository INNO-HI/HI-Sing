---
name: dr-image-direction
description: "DR 랜딩페이지용 브랜드 일관 이미지 디렉션 및 Gemini API 기반 AI 이미지 생성. 이미지 스타일 가이드 관리, 섹션별 이미지 프롬프트 작성, 누끼/배경 제거/색보정 디렉션을 수행한다. '이미지 생성', '이미지 디렉션', '스타일 가이드', '컨셉 이미지', '일러스트 생성', '비주얼 디자인' 관련 작업 시 반드시 이 스킬을 사용할 것."
---

# DR Image Direction

HI-Sing 랜딩페이지 전용 이미지 디렉션 및 AI 생성 스킬.

## 브랜드 스타일 가이드

### 색감
- 메인: #448CFF 계열 악센트
- 배경: 따뜻한 중성톤, 파스텔
- 인물 의상: 자연스러운 색감

### 인물
- 한국인 가족, 30~70대
- 자연스러운 표정 (포즈 아닌 순간 포착)
- 옷차림: 깔끔한 캐주얼

### 분위기
- 감성적, 온기, 실물감
- AI스러운 과장 금지
- 네온, 글로우, 사이버 느낌 금지

### 구도
- 여백 충분
- 텍스트 오버레이 공간 확보
- 배경 심플 (흰색 또는 연한 톤)

## Gemini API 사용법

### 모델 선택
- 고품질: `gemini-3-pro-image-preview`
- 빠른 생성: `gemini-3.1-flash-image-preview`

### 프롬프트 패턴
```
[스타일: watercolor/flat illustration/minimal line art]
+ [주제: Korean family scene]
+ [구도: portrait/landscape, centered/rule-of-thirds]
+ [색감: warm tones, blue #448CFF accents]
+ [분위기: emotional, warm, heartfelt]
+ [금지: no neon, no glow, no AI-looking, no text]
```

### API 호출 (Python)
```python
GOOGLE_API_KEY="키" python3 << 'EOF'
from google import genai
from google.genai import types
import os
client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])
response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents="프롬프트",
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(aspect_ratio="16:9"),
    )
)
for part in response.parts:
    if image := part.as_image():
        image.save("public/images/dr-이름.png")
EOF
```

### 비율 가이드
- 히어로: 16:9 또는 3:2
- 카드 이미지: 1:1
- Before/After: 3:4
- 인라인 아이콘: 1:1

## 기존 이미지 참조
- `public/images/before-stress.png` — 고민하는 사람 (회색톤)
- `public/images/after-happy.png` — 기뻐하는 사람 (파란톤)
- `public/images/cta-family.png` — 가족 장면 (수채화)

신규 이미지는 이 톤과 일관성을 유지해야 한다.

## 폴백 전략
- API 키 없음: 이미지 디렉션 시트만 작성
- 생성 실패: 2회 재시도 후 이모지/SVG 폴백
- 품질 불만족: 프롬프트 수정 후 재생성
