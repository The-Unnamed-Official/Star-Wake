'use strict';

/* ========================= INPUT ========================= */
const input={left:false,right:false,mouseActive:false,mouseX:0,touchActive:false,touchX:0,gamepadX:0};
let gpPrev={},focusIndex=0,navCooldown=0;
function openDrawer(){renderSide();drawer.classList.add('open')}function closeDrawer(){drawer.classList.remove('open')}
function pause(){
 if(!state||state.dead||state.choosing)return;state.paused=!state.paused;state.running=!state.paused;
 if(state.paused){overlayCard.innerHTML=`<div class="modal-head"><div><small>PAUSED</small><h2>Wake suspended</h2></div><p>Nothing moves while paused.</p></div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px"><button class="modal-btn" data-action="resume">RESUME</button><button class="modal-btn" data-action="main">MAIN MENU</button></div>`;overlay.style.display='grid';focusOverlay()}else overlay.style.display='none'
}
function focusOverlay(){setTimeout(()=>{const b=overlayCard.querySelector('button');if(b)b.focus()},10)}
function interactiveButtons(){
 if(typeof wipeInteractiveButtons==='function'){
  const wb=wipeInteractiveButtons();if(wb.length)return wb
 }
 const root=!frontLayer.classList.contains('hidden')?frontContent:overlay.style.display==='grid'?overlayCard:drawer.classList.contains('open')?drawer:null;
 return root?[...root.querySelectorAll('button:not([disabled])')]:[]
}
function gamepadNav(buttons){
 if(!buttons.length)return;focusIndex=Math.max(0,Math.min(buttons.length-1,focusIndex));buttons[focusIndex]?.focus()
}
