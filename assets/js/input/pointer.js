'use strict';

/* STARWAKE v0.97 — gameplay pointer input */

function gameplayMouseEnabled(){return !persistent.settings.ignoreGameplayMouse}
function px(e){const r=C.getBoundingClientRect();return Math.max(25,Math.min(W-25,(e.clientX-r.left)*(W/r.width)))}
function rememberMouseDashDirection(targetX){
 if(!state)return;
 const delta=targetX-state.x;
 if(Math.abs(delta)>2)state.lastDashDir=Math.sign(delta)
}
C.addEventListener('pointermove',e=>{
 if(!state?.running)return;
 if(e.pointerType==='mouse'){
  if(!gameplayMouseEnabled()){input.mouseActive=false;return}
  input.mouseActive=true;input.mouseX=px(e);rememberMouseDashDirection(input.mouseX)
 }else if(input.touchActive){
  input.touchX=px(e);
  if(state&&Math.abs(input.touchX-state.x)>3)state.lastDashDir=Math.sign(input.touchX-state.x)
 }
});
C.addEventListener('pointerdown',e=>{
 if(!state?.running)return;
 ensureAudio();
 if(e.pointerType==='mouse'){
  if(!gameplayMouseEnabled())return;
  input.mouseActive=true;input.mouseX=px(e);rememberMouseDashDirection(input.mouseX);
  if(e.button===0)phaseShift();
  if(e.button===2)useBomb()
 }else{
  e.preventDefault();input.touchActive=true;input.touchX=px(e);
  try{C.setPointerCapture(e.pointerId)}catch{}
 }
});
C.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')input.touchActive=false});
C.addEventListener('pointercancel',()=>input.touchActive=false);
C.addEventListener('mouseleave',()=>{input.mouseActive=false});
C.addEventListener('contextmenu',e=>{if(gameplayMouseEnabled())e.preventDefault()});
