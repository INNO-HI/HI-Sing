import { chromium } from 'playwright';
import { join } from 'path';

const OUT = join(import.meta.dirname, '..', 'public', 'images', 'tumblbuk');
const S = 1000;

const pages = [
  // 1. 메인
  {
    name: '01-main.jpg',
    html: `
      <div style="width:${S}px;height:${S}px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(160deg,#FFF5F0,#FFFFFF 40%,#FFF0EB);font-family:-apple-system,'Helvetica Neue',sans-serif;text-align:center;padding:50px;">
        <svg width="80" height="80" viewBox="0 0 32 32" fill="none" style="margin-bottom:30px;">
          <path d="M16 28s-1.5-1-3.5-2.8C7 20.5 4 17 4 13a6 6 0 0 1 6-6c2.2 0 4.2 1.2 6 3.2C17.8 8.2 19.8 7 22 7a6 6 0 0 1 6 6c0 4-3 7.5-8.5 12.2C17.5 27 16 28 16 28z" stroke="#F59E8B" stroke-width="1.5"/>
          <path d="M9 16h2l1.5-3 2 6 2-4 1.5 3 1.5-5 2 6 1-2H23" stroke="#F59E8B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="color:#AAAAAA;font-size:22px;letter-spacing:6px;margin:0 0 30px;">HI-Sing</p>
        <h1 style="color:#2C2C2C;font-size:72px;font-weight:600;line-height:1.25;margin:0 0 30px;">노래로 전하는<br>우리 가족 이야기</h1>
        <p style="color:#6B7280;font-size:26px;margin:0 0 50px;line-height:1.5;">가족 목소리로 만드는<br>세상에 하나뿐인 맞춤 노래</p>
        <div style="display:inline-flex;align-items:center;gap:14px;background:white;border:2px solid #FFEDE5;border-radius:100px;padding:12px 36px 12px 12px;box-shadow:0 4px 16px rgba(245,158,139,0.2);">
          <span style="background:#F59E8B;color:white;font-size:18px;font-weight:600;border-radius:100px;padding:10px 22px;">얼리버드</span>
          <span style="font-size:26px;color:#2C2C2C;font-weight:600;">29,000원</span>
          <span style="font-size:20px;color:#AAAAAA;">부터</span>
        </div>
      </div>`,
  },
  // 2. 공감
  {
    name: '02-empathy.jpg',
    html: `
      <div style="width:${S}px;height:${S}px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#2C2C2C;font-family:-apple-system,'Helvetica Neue',sans-serif;text-align:center;padding:60px;">
        <p style="color:#F4BFA7;font-size:20px;margin:0 0 50px;letter-spacing:4px;">솔직히,</p>
        <p style="color:white;font-size:38px;line-height:1.7;margin:0 0 40px;">부모님 생신마다<br>상품권 드리면서<br>마음이 편하셨나요?</p>
        <div style="width:50px;height:2px;background:rgba(255,255,255,0.2);margin:0 auto 40px;"></div>
        <p style="color:white;font-size:38px;line-height:1.7;margin:0 0 40px;">"감사합니다" 한마디가<br>왜 이렇게 어려울까요?</p>
        <div style="width:50px;height:2px;background:rgba(255,255,255,0.2);margin:0 auto 40px;"></div>
        <p style="color:white;font-size:34px;line-height:1.7;margin:0 0 60px;">편지는 손이 안 가고<br>영상은 할 말이 사라지고<br>결국 또 "건강하세요"</p>
        <p style="color:#888;font-size:22px;margin:0 0 12px;">마음이 없는 게 아닙니다.</p>
        <p style="color:white;font-size:30px;font-weight:500;margin:0;">전할 <span style="color:#F4BFA7;">방법</span>을 몰랐을 뿐입니다.</p>
      </div>`,
  },
  // 3. 프로세스
  {
    name: '03-process.jpg',
    html: `
      <div style="width:${S}px;height:${S}px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#FAFAFA;font-family:-apple-system,'Helvetica Neue',sans-serif;padding:60px 80px;">
        <p style="color:#2C2C2C;font-size:44px;font-weight:500;margin:0 0 12px;text-align:center;">복잡한 건 없습니다</p>
        <p style="color:#AAAAAA;font-size:22px;margin:0 0 70px;text-align:center;">딱 3가지만 보내주세요</p>
        ${[
          { n: '1', title: '목소리를 보내주세요', desc: '전화 녹음, 영상, 일상 대화\n30초면 충분합니다' },
          { n: '2', title: '마음을 적어주세요', desc: '"감사한 마음을 전하고 싶어요"\n한 줄이면 됩니다' },
          { n: '3', title: '노래가 완성됩니다', desc: '3~5일 후, 카카오톡 링크로\n받아보실 수 있습니다' },
        ].map(s => `
          <div style="display:flex;gap:28px;align-items:center;margin-bottom:50px;width:100%;">
            <div style="width:72px;height:72px;border-radius:20px;background:#F59E8B;color:white;font-size:32px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${s.n}</div>
            <div>
              <p style="color:#2C2C2C;font-size:30px;font-weight:500;margin:0 0 8px;">${s.title}</p>
              <p style="color:#6B7280;font-size:22px;margin:0;line-height:1.5;white-space:pre-line;">${s.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>`,
  },
  // 4. 완성곡
  {
    name: '04-result.jpg',
    html: `
      <div style="width:${S}px;height:${S}px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#F59E8B,#E88773);font-family:-apple-system,'Helvetica Neue',sans-serif;text-align:center;padding:50px;">
        <p style="color:rgba(255,255,255,0.8);font-size:20px;margin:0 0 40px;letter-spacing:3px;">실제 완성된 노래</p>
        <div style="background:white;border-radius:32px;padding:50px 60px;width:600px;box-shadow:0 30px 80px rgba(0,0,0,0.2);">
          <div style="width:240px;height:240px;border-radius:24px;background:linear-gradient(135deg,#FFE0D6,#F59E8B);margin:0 auto 30px;display:flex;align-items:center;justify-content:center;">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" stroke="white" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="white" stroke-width="1.5"/></svg>
          </div>
          <p style="color:#2C2C2C;font-size:32px;font-weight:600;margin:0 0 8px;">식탁 위의 온기</p>
          <p style="color:#AAAAAA;font-size:20px;margin:0 0 28px;">맞춤 노래 · 3:24</p>
          <div style="display:flex;gap:3px;height:50px;align-items:center;justify-content:center;">
            ${Array.from({length:40}, (_, i) => {
              const h = 20 + Math.sin(i * 0.4) * 25 + Math.cos(i * 0.8) * 12 + 15;
              return `<div style="flex:1;height:${Math.max(12, Math.min(45, h))}%;background:#F59E8B;border-radius:100px;"></div>`;
            }).join('')}
          </div>
          <p style="color:#AAAAAA;font-size:16px;margin:20px 0 0;">40대 아들 → 어머니 팔순 선물</p>
        </div>
        <p style="color:rgba(255,255,255,0.9);font-size:24px;margin:40px 0 0;font-style:italic;">
          "칠순잔치에서 틀어드렸는데<br>온 가족이 울었어요."
        </p>
      </div>`,
  },
  // 5. 가격
  {
    name: '05-price.jpg',
    html: `
      <div style="width:${S}px;height:${S}px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:white;font-family:-apple-system,'Helvetica Neue',sans-serif;text-align:center;padding:60px;">
        <p style="color:#AAAAAA;font-size:24px;margin:0 0 20px;">전문가에게 맞춤 노래를 의뢰하면</p>
        <p style="color:#CCCCCC;font-size:64px;font-weight:500;text-decoration:line-through;margin:0 0 8px;">50~100만원</p>
        <p style="color:#AAAAAA;font-size:22px;margin:0 0 70px;">2~4주 이상</p>
        <p style="color:#6B7280;font-size:24px;margin:0 0 12px;">하이싱은</p>
        <p style="color:#2C2C2C;font-size:110px;font-weight:600;margin:0;letter-spacing:-3px;">29,000<span style="font-size:36px;font-weight:400;color:#6B7280;">원</span></p>
        <p style="color:#F59E8B;font-size:26px;font-weight:500;margin:14px 0 0;">부터. 3~5일이면 됩니다.</p>
        <div style="margin-top:50px;display:flex;gap:16px;align-items:center;">
          <div style="background:#F59E8B;color:white;font-size:20px;font-weight:600;border-radius:100px;padding:14px 28px;">얼리버드 한정 100명</div>
          <span style="color:#AAAAAA;font-size:20px;">40% 할인</span>
        </div>
      </div>`,
  },
];

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: S, height: S }, deviceScaleFactor: 1 });
  for (const pg of pages) {
    const p = await ctx.newPage();
    await p.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box;}</style></head><body>${pg.html}</body></html>`);
    await p.screenshot({ path: join(OUT, pg.name), type: 'jpeg', quality: 95 });
    console.log('✓', pg.name);
    await p.close();
  }
  await browser.close();
  console.log('\n완료 →', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
