import { chromium } from 'playwright';
import { join } from 'path';

const OUT = join(import.meta.dirname, '..', 'public', 'images', 'tumblbuk');
const W = 1200;
const H = 630;

const pages = [
  // 1. 메인
  {
    name: '01-main.jpg',
    html: `
      <div style="width:${W}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#FFF5F0 0%,#FFFFFF 40%,#FFF0EB 100%);font-family:-apple-system,'Helvetica Neue',sans-serif;text-align:center;padding:40px 60px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px;">
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <path d="M16 28s-1.5-1-3.5-2.8C7 20.5 4 17 4 13a6 6 0 0 1 6-6c2.2 0 4.2 1.2 6 3.2C17.8 8.2 19.8 7 22 7a6 6 0 0 1 6 6c0 4-3 7.5-8.5 12.2C17.5 27 16 28 16 28z" stroke="#F59E8B" stroke-width="1.5"/>
            <path d="M9 16h2l1.5-3 2 6 2-4 1.5 3 1.5-5 2 6 1-2H23" stroke="#F59E8B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span style="color:#AAAAAA;font-size:18px;letter-spacing:5px;">HI-Sing</span>
        </div>
        <h1 style="color:#2C2C2C;font-size:58px;font-weight:600;line-height:1.25;margin:0 0 20px;">노래로 전하는 우리 가족 이야기</h1>
        <p style="color:#6B7280;font-size:22px;margin:0 0 36px;">가족 목소리로 만드는 세상에 하나뿐인 맞춤 노래</p>
        <div style="display:inline-flex;align-items:center;gap:12px;background:white;border:2px solid #FFEDE5;border-radius:100px;padding:10px 30px 10px 10px;box-shadow:0 4px 20px rgba(245,158,139,0.15);">
          <span style="background:#F59E8B;color:white;font-size:15px;font-weight:600;border-radius:100px;padding:8px 18px;">얼리버드</span>
          <span style="font-size:22px;color:#2C2C2C;font-weight:600;">29,000원</span>
          <span style="font-size:16px;color:#AAAAAA;">부터</span>
        </div>
      </div>`,
  },
  // 2. 공감
  {
    name: '02-empathy.jpg',
    html: `
      <div style="width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;background:#2C2C2C;font-family:-apple-system,'Helvetica Neue',sans-serif;padding:40px 80px;">
        <div style="flex:1;text-align:left;">
          <p style="color:#F4BFA7;font-size:16px;margin:0 0 24px;letter-spacing:3px;">솔직히,</p>
          <p style="color:white;font-size:36px;line-height:1.6;margin:0;">부모님 생신마다<br>상품권 드리면서<br>마음이 편하셨나요?</p>
        </div>
        <div style="width:1px;height:200px;background:rgba(255,255,255,0.1);margin:0 60px;"></div>
        <div style="flex:1;text-align:left;">
          <p style="color:rgba(255,255,255,0.5);font-size:16px;margin:0 0 20px;">마음이 없는 게 아닙니다.</p>
          <p style="color:white;font-size:28px;line-height:1.6;margin:0;">전할 <span style="color:#F4BFA7;">방법</span>을<br>몰랐을 뿐입니다.</p>
          <p style="color:rgba(255,255,255,0.4);font-size:16px;margin:24px 0 0;line-height:1.7;">편지는 손이 안 가고<br>영상은 할 말이 사라지고<br>결국 또 "건강하세요"</p>
        </div>
      </div>`,
  },
  // 3. 프로세스
  {
    name: '03-process.jpg',
    html: `
      <div style="width:${W}px;height:${H}px;display:flex;flex-direction:column;justify-content:center;background:#FAFAFA;font-family:-apple-system,'Helvetica Neue',sans-serif;padding:50px 80px;">
        <p style="color:#2C2C2C;font-size:36px;font-weight:500;margin:0 0 40px;text-align:center;">딱 3가지만 보내주세요</p>
        <div style="display:flex;gap:24px;justify-content:center;">
          ${[
            { n: '1', title: '목소리', desc: '전화 녹음, 영상, 일상 대화\n30초면 충분합니다' },
            { n: '2', title: '마음 한 줄', desc: '"감사한 마음을\n전하고 싶어요"' },
            { n: '3', title: '3~5일 후 완성', desc: '카카오톡 링크로\n바로 선물하세요' },
          ].map(s => `
            <div style="flex:1;background:white;border-radius:20px;padding:36px 28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
              <div style="width:56px;height:56px;border-radius:16px;background:#F59E8B;color:white;font-size:26px;font-weight:600;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">${s.n}</div>
              <p style="color:#2C2C2C;font-size:22px;font-weight:500;margin:0 0 10px;">${s.title}</p>
              <p style="color:#6B7280;font-size:16px;margin:0;line-height:1.6;white-space:pre-line;">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>`,
  },
  // 4. 완성곡
  {
    name: '04-result.jpg',
    html: `
      <div style="width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#F59E8B,#E88773);font-family:-apple-system,'Helvetica Neue',sans-serif;padding:40px 80px;gap:60px;">
        <div style="background:white;border-radius:24px;padding:36px;width:320px;box-shadow:0 20px 60px rgba(0,0,0,0.15);">
          <div style="width:180px;height:180px;border-radius:20px;background:linear-gradient(135deg,#FFE0D6,#F59E8B);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" stroke="white" stroke-width="1.5"/><circle cx="18" cy="16" r="3" stroke="white" stroke-width="1.5"/></svg>
          </div>
          <p style="color:#2C2C2C;font-size:22px;font-weight:600;margin:0 0 4px;text-align:center;">식탁 위의 온기</p>
          <p style="color:#AAAAAA;font-size:14px;margin:0;text-align:center;">맞춤 노래 · 3:24</p>
          <div style="display:flex;gap:2px;height:36px;align-items:center;justify-content:center;margin-top:16px;">
            ${Array.from({length:36}, (_, i) => {
              const h = 20 + Math.sin(i * 0.45) * 25 + Math.cos(i * 0.9) * 12 + 15;
              return `<div style="flex:1;height:${Math.max(12, Math.min(34, h))}%;background:#F59E8B;border-radius:100px;"></div>`;
            }).join('')}
          </div>
        </div>
        <div style="flex:1;color:white;">
          <p style="font-size:14px;opacity:0.7;margin:0 0 16px;letter-spacing:2px;">실제 완성된 노래</p>
          <p style="font-size:32px;font-weight:500;line-height:1.5;margin:0 0 24px;">팔순잔치에서 틀어드렸는데<br>온 가족이 울었어요.</p>
          <p style="font-size:16px;opacity:0.8;line-height:1.7;margin:0 0 24px;">40대 아들이 어머니 팔순에 선물한 노래.<br>매일 새벽 도시락 싸주시던 어머니에게<br>30년 치 감사를 담았습니다.</p>
          <p style="font-size:14px;opacity:0.6;margin:0;">지금도 매일 아침 이 노래를 틀어두신다고 합니다.</p>
        </div>
      </div>`,
  },
  // 5. 가격
  {
    name: '05-price.jpg',
    html: `
      <div style="width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;background:white;font-family:-apple-system,'Helvetica Neue',sans-serif;padding:40px 80px;gap:80px;">
        <div style="text-align:center;">
          <p style="color:#AAAAAA;font-size:18px;margin:0 0 12px;">전문가에게 의뢰하면</p>
          <p style="color:#CCCCCC;font-size:52px;font-weight:500;text-decoration:line-through;margin:0 0 6px;">50~100만원</p>
          <p style="color:#AAAAAA;font-size:16px;margin:0;">2~4주 이상</p>
        </div>
        <div style="width:2px;height:160px;background:linear-gradient(180deg,transparent,#F59E8B,transparent);"></div>
        <div style="text-align:center;">
          <p style="color:#F59E8B;font-size:18px;font-weight:500;margin:0 0 8px;">하이싱은</p>
          <p style="color:#2C2C2C;font-size:84px;font-weight:600;margin:0;letter-spacing:-2px;">29,000<span style="font-size:28px;color:#6B7280;">원</span></p>
          <p style="color:#F59E8B;font-size:20px;margin:10px 0 0;">3~5일이면 됩니다</p>
          <div style="margin-top:20px;display:inline-flex;align-items:center;gap:10px;">
            <span style="background:#F59E8B;color:white;font-size:14px;font-weight:600;border-radius:100px;padding:8px 20px;">얼리버드 한정 100명</span>
            <span style="color:#AAAAAA;font-size:14px;">40% 할인</span>
          </div>
        </div>
      </div>`,
  },
];

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
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
