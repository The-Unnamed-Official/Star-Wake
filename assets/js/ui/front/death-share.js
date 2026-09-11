'use strict';

function showDeath(){
 const r=lastRun;showFront(`<div class="front-screen"><div class="front-top"><div><h2>Wake Ended</h2><p>Your route was recorded and Alloy was banked.</p></div><div style="color:var(--red);font-size:9px;font-weight:900">HULL FAILURE</div></div><div class="stats-grid">
 <div class="big-stat"><b>${runScore(r).toLocaleString()}</b><span>RUN SCORE</span></div><div class="big-stat"><b>${r.sector}</b><span>SECTOR</span></div><div class="big-stat"><b>${r.level}</b><span>LEVEL</span></div>
 <div class="big-stat"><b>${r.kills}</b><span>KILLS</span></div><div class="big-stat"><b>${r.damageTaken}</b><span>HULL DAMAGE</span></div><div class="big-stat"><b>${r.nearMisses}</b><span>NEAR MISSES</span></div></div>
 <div style="font-size:7px;color:var(--muted);margin-top:8px">Salvage ${Math.floor(r.salvage)} · Shield breaks ${r.shieldBreaks} · Alloy banked ${r.bank}</div>
 <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:auto"><button class="front-action primary" data-front="retry">RETRY</button><button class="front-action" data-front="share">SHARE RUN</button><button class="front-action" data-front="main">MAIN MENU</button></div></div>`,'death')
}
function showShare(){
 const r=lastRun;showFront(`<div class="front-screen"><div class="front-top"><div><h2>Share Run</h2><p>Copy a 1200×675 score image directly when your browser permits image clipboard access.</p></div><button class="back-button" data-front="death">BACK</button></div>
 <div class="share-layout"><div class="share-preview"><canvas id="shareCanvas"></canvas></div><div class="share-actions"><div class="screen-card"><h3>${runScore(r).toLocaleString()} POINTS</h3><p>Sector ${r.sector} · Level ${r.level} · ${r.kills} kills</p></div>
 <button class="front-action primary" data-share="copy">COPY IMAGE</button><button class="front-action" data-share="native">SHARE / SAVE</button><button class="front-action" data-share="download">DOWNLOAD PNG</button><div class="share-status" id="shareStatus">Ready.</div></div></div></div>`,'share');
 requestAnimationFrame(()=>{const c=E('shareCanvas');if(c)paintShare(c,r)})
}
async function shareBlob(){const c=E('shareCanvas');return c?await new Promise(res=>c.toBlob(res,'image/png')):null}
async function copyImage(){const s=E('shareStatus'),blob=await shareBlob();if(!blob)return;try{if(!navigator.clipboard||typeof ClipboardItem==='undefined')throw 0;await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);s.textContent='Copied. Paste it directly into Discord, chat, or an editor.'}catch{s.textContent='Your browser blocked image clipboard access. Use Share / Save or Download PNG.'}}
async function downloadImage(){const b=await shareBlob();if(!b)return;const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='starwake-score.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500)}
async function nativeShare(){const s=E('shareStatus'),b=await shareBlob();if(!b)return;const f=new File([b],'starwake-score.png',{type:'image/png'});try{if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[f]}))){await navigator.share({title:'STARWAKE Run',text:`Score ${runScore(lastRun)} · Sector ${lastRun.sector}`,files:[f]});s.textContent='Share sheet opened.'}else{await downloadImage();s.textContent='Native sharing unavailable, so the PNG was downloaded.'}}catch{s.textContent='Share cancelled.'}}
