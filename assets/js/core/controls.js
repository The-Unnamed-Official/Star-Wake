'use strict';

const CONTROL_LABELS={
 moveLeft:'Move Left',moveRight:'Move Right',phase:'Phase Shift',nova:'Nova Bomb',pause:'Pause',build:'Build Menu'
};
let controlRemapActive=false;
function prettyKey(code){
 const map={Space:'SPACE',ArrowLeft:'←',ArrowRight:'→',ArrowUp:'↑',ArrowDown:'↓',Escape:'ESC',Enter:'ENTER',ShiftLeft:'L-SHIFT',ShiftRight:'R-SHIFT'};
 if(map[code])return map[code];
 return code.replace(/^Key/,'').replace(/^Digit/,'')
}
function controlMatches(action,code){return persistent.controls[action]===code}
function beginControlRemap(action,button){
 if(!CONTROL_LABELS[action]||controlRemapActive)return;
 controlRemapActive=true;button?.classList.add('waiting');if(button)button.textContent='PRESS KEY…';
 const capture=e=>{
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  document.removeEventListener('keydown',capture,true);controlRemapActive=false;
  if(e.code==='Escape'){showSettings();return}
  const old=persistent.controls[action];
  for(const [other,code] of Object.entries(persistent.controls))if(other!==action&&code===e.code)persistent.controls[other]=old;
  persistent.controls[action]=e.code;save();refreshControlHints();showSettings()
 };
 document.addEventListener('keydown',capture,true)
}
function resetControlBindings(){persistent.controls=Object.assign({},DEFAULT_CONTROLS);save();refreshControlHints();showSettings()}
function refreshControlHints(){
 const ids={moveLeft:'hintMoveLeft',moveRight:'hintMoveRight',phase:'hintPhase',nova:'hintNova',pause:'hintPause',build:'hintBuild'};
 for(const [a,id] of Object.entries(ids)){const el=E(id);if(el)el.textContent=prettyKey(persistent.controls[a])}
 const phaseVisual=E('phaseKeyVisual');if(phaseVisual)phaseVisual.textContent=prettyKey(persistent.controls.phase)
}
