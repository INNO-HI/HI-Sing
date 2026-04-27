// GA4 Analytics 유틸리티
// 모든 이벤트를 한 곳에서 관리

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

function gtag(...args: any[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// ─── 페이지/탭 전환 ─────────────────────────────
export function trackPageView(tabName: string) {
  gtag('event', 'page_view', {
    page_title: tabName,
    page_location: `${window.location.origin}/${tabName}`,
    page_path: `/${tabName}`,
  })
}

// ─── 스크롤 깊이 (섹션 도달) ────────────────────
export function trackSectionView(sectionName: string) {
  gtag('event', 'section_view', {
    section_name: sectionName,
  })
}

// ─── CTA 버튼 클릭 ──────────────────────────────
export function trackCTAClick(location: string, label: string) {
  gtag('event', 'cta_click', {
    cta_location: location,      // hero, nav, cta_section, sample, faq
    cta_label: label,            // 바로 구매하기, 주문하기 등
  })
}

// ─── 리워드 목록 조회 (ecommerce) ────────────────
export function trackViewItemList(items: { name: string; price: number }[]) {
  gtag('event', 'view_item_list', {
    item_list_name: '리워드 목록',
    items: items.map((item, i) => ({
      item_id: item.name.toLowerCase().replace(/\s/g, '_'),
      item_name: item.name,
      price: item.price,
      currency: 'KRW',
      index: i,
    })),
  })
}

// ─── 리워드 상세 조회 (ecommerce) ────────────────
export function trackViewItem(tier: string, price: number) {
  gtag('event', 'view_item', {
    currency: 'KRW',
    value: price,
    items: [{
      item_id: tier.toLowerCase().replace(/\s/g, '_'),
      item_name: `HI-Sing ${tier}`,
      price,
      currency: 'KRW',
    }],
  })
}

// ─── 주문폼 진입 ────────────────────────────────
export function trackBeginCheckout(tier: string, price: number) {
  gtag('event', 'begin_checkout', {
    currency: 'KRW',
    value: price,
    items: [{
      item_id: tier.toLowerCase().replace(/\s/g, '_'),
      item_name: `HI-Sing ${tier}`,
      price,
      currency: 'KRW',
    }],
  })
}

// ─── 결제 시도 ──────────────────────────────────
export function trackPaymentAttempt(tier: string, price: number) {
  gtag('event', 'add_payment_info', {
    currency: 'KRW',
    value: price,
    payment_type: 'toss_card',
    items: [{
      item_id: tier.toLowerCase().replace(/\s/g, '_'),
      item_name: `HI-Sing ${tier}`,
      price,
      currency: 'KRW',
    }],
  })
}

// ─── 결제 완료 ──────────────────────────────────
export function trackPurchase(tier: string, price: number, orderId: string) {
  gtag('event', 'purchase', {
    transaction_id: orderId,
    currency: 'KRW',
    value: price,
    items: [{
      item_id: tier.toLowerCase().replace(/\s/g, '_'),
      item_name: `HI-Sing ${tier}`,
      price,
      currency: 'KRW',
    }],
  })
}

// ─── 샘플 재생 ──────────────────────────────────
export function trackSamplePlay(songTitle: string) {
  gtag('event', 'sample_play', {
    song_title: songTitle,
  })
}

// ─── 파일 업로드 ────────────────────────────────
export function trackFileUpload(fileName: string, fileSize: number) {
  gtag('event', 'file_upload', {
    file_name: fileName,
    file_size_mb: (fileSize / 1024 / 1024).toFixed(1),
  })
}

// ─── 폼 필드 입력 (어디까지 작성했는지) ──────────
export function trackFormProgress(step: string, field: string) {
  gtag('event', 'form_progress', {
    form_step: step,     // order_info, song_info, voice_file
    field_name: field,   // name, phone, recipient, story 등
  })
}

// ─── 외부 링크 클릭 ─────────────────────────────
export function trackOutboundClick(url: string, label: string) {
  gtag('event', 'click', {
    link_url: url,
    link_text: label,
    outbound: true,
  })
}
