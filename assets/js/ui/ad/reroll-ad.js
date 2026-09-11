'use strict';

/* STARWAKE v0.97 — fullscreen 55-second procedural fake ad break */

let rerollAdActive=false,rerollAdRaf=0,rerollAdStarted=0,rerollAdCurrent=null;

function ensureRerollAdExperience(){
 let root=E('rerollAdExperience');
 if(root)return root;
 root=document.createElement('div');root.id='rerollAdExperience';root.className='reroll-ad-experience';root.hidden=true;
 root.innerHTML=`<div class="reroll-ad-backdrop"></div>
  <div class="reroll-ad-topbar">
   <div><span class="ad-network-dot"></span><b>QUESTIONABLE MOBILE AD NETWORK</b><small>Rewarded advertisement · definitely worth it</small></div>
   <div class="reroll-ad-timer"><span>REWARD IN</span><b id="rerollAdTime">55.0s</b></div>
  </div>
  <main class="reroll-ad-stage">
   <section class="reroll-ad-phone">
    <div class="reroll-ad-phone-top"><span id="rerollAdApp">FAKE GAME</span><b>ADVERTISEMENT</b></div>
    <canvas id="rerollAdCanvas" width="720" height="1280"></canvas>
    <div class="reroll-ad-install">
     <div class="reroll-ad-appicon" id="rerollAdIcon">?</div>
     <div><b id="rerollAdTitle">GAME</b><span id="rerollAdStore">4.9 ★</span></div>
     <div class="reroll-ad-cta" id="rerollAdCta">INSTALL</div>
    </div>
   </section>
   <aside class="reroll-ad-copy">
    <small>SPONSORED CONTENT</small>
    <h1 id="rerollAdBigTitle">VERY REAL GAME</h1>
    <p id="rerollAdSubtitle">This ad was created by questionable decisions.</p>
    <div class="reroll-ad-badges"><span>NO SKIP</span><span>+1 REROLL</span><span>55 SECONDS</span></div>
    <div class="reroll-ad-review">★★★★★ <span>“I had zero rerolls and things got desperate.”</span></div>
   </aside>
  </main>
  <footer class="reroll-ad-footer">
   <div class="reroll-ad-progress"><div id="rerollAdProgress"></div></div>
   <span>Watching this entire disaster awards one reroll.</span>
  </footer>`;
 document.body.appendChild(root);return root
}
function configureRerollAd(ad){
 E('rerollAdApp').textContent=ad.title;
 E('rerollAdIcon').textContent=ad.icon;
 E('rerollAdTitle').textContent=ad.title;
 E('rerollAdStore').textContent=ad.store;
 E('rerollAdCta').textContent=ad.cta;
 E('rerollAdBigTitle').textContent=ad.title;
 E('rerollAdSubtitle').textContent=ad.subtitle;
 const root=E('rerollAdExperience');root.style.setProperty('--ad-accent',ad.accent);root.style.setProperty('--ad-accent-2',ad.accent2)
}
function renderRerollAdFrame(now){
 if(!rerollAdActive)return;
 const elapsed=(now-rerollAdStarted)/1000,remain=Math.max(0,REROLL_AD_SECONDS-elapsed),p=Math.min(1,elapsed/REROLL_AD_SECONDS);
 E('rerollAdTime').textContent=remain.toFixed(1)+'s';E('rerollAdProgress').style.width=(p*100)+'%';
 renderFakeAdGameplay(E('rerollAdCanvas'),rerollAdCurrent,Math.min(elapsed,REROLL_AD_SECONDS));
 if(elapsed>=REROLL_AD_SECONDS){finishRerollAd();return}
 rerollAdRaf=requestAnimationFrame(renderRerollAdFrame)
}
function startRerollAd(){
 if(!state?.choosing||state.rerolls>0||rerollAdActive)return;
 rerollAdActive=true;rerollAdCurrent=pickRerollAd();rerollAdStarted=performance.now();
 const root=ensureRerollAdExperience();configureRerollAd(rerollAdCurrent);
 overlay.style.display='none';root.hidden=false;document.body.classList.add('reroll-ad-running');
 sfx('ui');rerollAdRaf=requestAnimationFrame(renderRerollAdFrame)
}
function finishRerollAd(){
 if(!rerollAdActive)return;
 rerollAdActive=false;cancelAnimationFrame(rerollAdRaf);rerollAdRaf=0;
 state.rerolls=1;sfx('level');
 const root=E('rerollAdExperience');
 root.classList.add('rewarding');
 root.querySelector('.reroll-ad-stage').innerHTML=`<div class="reroll-ad-reward"><small>55 SECONDS OF YOUR LIFE: GONE</small><h1>+1 REROLL</h1><p>You actually watched the whole thing. Respectfully, why?</p></div>`;
 setTimeout(()=>{
  root.hidden=true;root.classList.remove('rewarding');root.remove();document.body.classList.remove('reroll-ad-running');
  showUpgrade('Advertisement survived')
 },1400)
}
