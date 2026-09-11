'use strict';

let wipeStep=0,wipeEvasions=0,wipeExperience=null,wipeCard=null,wipeButton=null;
function ensureWipeExperience(){
 if(wipeExperience)return wipeExperience;
 wipeExperience=document.createElement('div');wipeExperience.id='wipeExperience';wipeExperience.className='wipe-experience';wipeExperience.hidden=true;document.body.appendChild(wipeExperience);return wipeExperience
}
function showWipeWarning(){
 showFront(`<div class="front-screen"><div class="front-top"><div><h2 style="color:var(--red)">Wipe Save Data</h2><p>This action permanently resets STARWAKE on this browser.</p></div><button class="back-button" data-front="settings">BACK</button></div>
 <div class="content-scroll"><div class="screen-card danger-zone" style="max-width:720px;margin:auto"><h3>⚠ EVERYTHING GOES</h3><p>Alloy, Hangar upgrades, best sector, lifetime stats, achievements, settings and custom controls will be deleted. This cannot be undone.</p><div class="warning-stack"><div class="warning-sign">NO UNDO</div><div class="warning-sign">NO CLOUD BACKUP</div><div class="warning-sign">FULL RESET</div><div class="warning-sign">ALL RECORDS ERASED</div><div class="warning-sign">HANGAR TO LEVEL 0</div><div class="warning-sign">YES, EVEN CONTROLS</div></div><p>If you continue, STARWAKE is going to be intentionally obnoxious about verifying your decision.</p><div style="display:flex;gap:8px;margin-top:14px"><button class="front-action" data-front="settings">NEVER MIND</button><button class="danger-button" data-wipe-confirm>YES, BEGIN THE RIDICULOUS CONFIRMATION</button></div></div></div></div>`,'wipe-warning')
}
function wipeRandomPosition(){
 const margin=14,w=Math.min(390,innerWidth-24),h=wipeCard?.offsetHeight||230;
 const x=margin+Math.random()*Math.max(1,innerWidth-w-margin*2),y=margin+Math.random()*Math.max(1,innerHeight-h-margin*2);
 wipeCard.style.left=`${x}px`;wipeCard.style.top=`${y}px`
}
function wipeTeleportFx(x,y){
 const fx=document.createElement('div');fx.className='wipe-teleport-flash';fx.style.left=x+'px';fx.style.top=y+'px';wipeExperience.appendChild(fx);setTimeout(()=>fx.remove(),450)
}
function teleportWipeCard(){
 if(!wipeCard)return;const r=wipeCard.getBoundingClientRect();wipeTeleportFx(r.left+r.width/2,r.top+r.height/2);wipeEvasions=Math.max(0,wipeEvasions-1);wipeRandomPosition();if(wipeButton)wipeButton.classList.toggle('ready',wipeEvasions===0)
}
function renderWipeStep(){
 const [title,body,label]=WIPE_STEPS[wipeStep];wipeEvasions=1+(wipeStep%4);
 wipeExperience.innerHTML=`<div class="wipe-grid"></div><div class="wipe-card"><small>CONFIRMATION ${wipeStep+1} / ${WIPE_STEPS.length}</small><h2>${title}</h2><p>${body}</p><div class="wipe-progress"><div style="width:${((wipeStep+1)/WIPE_STEPS.length)*100}%"></div></div><button class="wipe-chase-button" type="button">${label}</button><div class="wipe-counter">evasion protocol active</div></div>`;
 wipeCard=wipeExperience.querySelector('.wipe-card');wipeButton=wipeExperience.querySelector('.wipe-chase-button');wipeRandomPosition();
 wipeButton.addEventListener('click',e=>{if(wipeEvasions>0){e.preventDefault();teleportWipeCard();return}if(wipeStep<WIPE_STEPS.length-1){wipeStep++;renderWipeStep()}else beginFakeShutdown()});
 wipeButton.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'&&wipeEvasions>0){e.preventDefault();teleportWipeCard()}});
 wipeButton.focus()
}
function startWipeGauntlet(){
 wipeStep=0;ensureWipeExperience();wipeExperience.hidden=false;frontLayer.classList.add('hidden');renderWipeStep();
 wipeExperience.onpointermove=e=>{
  if(!wipeButton||wipeEvasions<=0||e.pointerType!=='mouse')return;
  const r=wipeButton.getBoundingClientRect(),m=5;
  if(e.clientX>=r.left-m&&e.clientX<=r.right+m&&e.clientY>=r.top-m&&e.clientY<=r.bottom+m)teleportWipeCard()
 }
}
function wipeInteractiveButtons(){return wipeExperience&&!wipeExperience.hidden?[...wipeExperience.querySelectorAll('button:not([disabled])')]:[]}
