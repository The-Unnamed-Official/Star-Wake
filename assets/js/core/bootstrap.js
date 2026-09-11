'use strict';

/* start */
resize();initRun();showMain();refreshControlHints();requestAnimationFrame(loop);save();
document.addEventListener('pointerdown',()=>{unlockAudioAndStartMenu()},{once:true});
document.addEventListener('touchstart',()=>{unlockAudioAndStartMenu()},{once:true,passive:true});
