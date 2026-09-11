'use strict';

document.addEventListener('keydown',e=>{
 if(controlRemapActive)return;
 unlockAudioAndStartMenu();
 if(typeof rerollAdActive!=='undefined'&&rerollAdActive){e.preventDefault();return}
 const wipeOpen=typeof wipeExperience!=='undefined'&&wipeExperience&&!wipeExperience.hidden;
 if(wipeOpen){
  const bs=interactiveButtons();
  if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Tab'].includes(e.code)&&bs.length){e.preventDefault();focusIndex=(focusIndex+((e.code==='ArrowUp'||e.code==='ArrowLeft')?-1:1)+bs.length)%bs.length;gamepadNav(bs);return}
  if((e.code==='Enter'||e.code==='Space')&&bs.length){e.preventDefault();const active=document.activeElement,target=bs.includes(active)?active:bs[focusIndex];target?.click();return}
  return
 }
 if(['ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();
 if(!frontLayer.classList.contains('hidden')){
  if(document.activeElement?.matches?.('input[type=range]')&&['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.code))return;
  const bs=interactiveButtons();
  if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.code)&&bs.length){e.preventDefault();focusIndex=(focusIndex+((e.code==='ArrowUp'||e.code==='ArrowLeft')?-1:1)+bs.length)%bs.length;gamepadNav(bs);return}
  if(e.code==='Enter'&&bs.length){e.preventDefault();const active=document.activeElement,target=bs.includes(active)?active:bs[focusIndex];target?.click();return}
  if(e.code==='Escape'&&frontScreen!=='main'){showMain();return}
  return
 }
 if(state?.choosing){if(e.code==='Digit1')pickUpgrade(0);if(e.code==='Digit2')pickUpgrade(1);if(e.code==='Digit3')pickUpgrade(2);if(e.code==='KeyR')reroll();return}
 if(state?.paused){if(controlMatches('pause',e.code)||e.code==='Enter')pause();return}
 if(!state?.running)return;
 // Keyboard Phase direction is based only on physical arrow-key input,
 // never the remapped movement bindings.
 if(e.code==='ArrowLeft')state.lastDashDir=-1;
 if(e.code==='ArrowRight')state.lastDashDir=1;
 if(controlMatches('moveLeft',e.code)){input.left=true;e.preventDefault()}
 if(controlMatches('moveRight',e.code)){input.right=true;e.preventDefault()}
 if(controlMatches('phase',e.code)&&!e.repeat){phaseShift();e.preventDefault()}
 if(controlMatches('nova',e.code)&&!e.repeat){useBomb();e.preventDefault()}
 if(controlMatches('pause',e.code)&&!e.repeat){pause();e.preventDefault()}
 if(controlMatches('build',e.code)&&!e.repeat){toggleBuildMenu();e.preventDefault()}
});
document.addEventListener('keyup',e=>{
 if(controlMatches('moveLeft',e.code))input.left=false;
 if(controlMatches('moveRight',e.code))input.right=false
});
addEventListener('blur',()=>{input.left=input.right=false});
