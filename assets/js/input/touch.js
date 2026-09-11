'use strict';

function bindHold(el,key,dir){el.addEventListener('pointerdown',e=>{e.preventDefault();input[key]=true;if(state)state.lastDashDir=dir;try{el.setPointerCapture(e.pointerId)}catch{}});const up=()=>input[key]=false;el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)}
bindHold(E('touchLeft'),'left',-1);bindHold(E('touchRight'),'right',1);
