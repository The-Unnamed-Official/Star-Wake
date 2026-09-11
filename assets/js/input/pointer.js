'use strict';

/* mouse + touch direct steering */
function px(e){const r=C.getBoundingClientRect();return Math.max(25,Math.min(W-25,(e.clientX-r.left)*(W/r.width)))}
C.addEventListener('pointermove',e=>{if(!state?.running)return;if(e.pointerType==='mouse'){input.mouseActive=true;input.mouseX=px(e)}else if(input.touchActive){input.touchX=px(e)}});
C.addEventListener('pointerdown',e=>{if(!state?.running)return;ensureAudio();if(e.pointerType==='mouse'){input.mouseActive=true;input.mouseX=px(e);if(e.button===0)phaseShift();if(e.button===2)useBomb()}else{e.preventDefault();input.touchActive=true;input.touchX=px(e);try{C.setPointerCapture(e.pointerId)}catch{}}});
C.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')input.touchActive=false});C.addEventListener('pointercancel',()=>input.touchActive=false);
C.addEventListener('mouseleave',()=>{input.mouseActive=false});
C.addEventListener('contextmenu',e=>e.preventDefault());
