'use strict';

/* ========================= FRONT SCREENS ========================= */
function showFront(html,screen='main'){
 frontScreen=screen;frontContent.innerHTML=html;frontLayer.classList.remove('hidden');
 if(audioUnlocked)menuMusic(true);
 focusFirstSoon()
}
function hideFront(){frontLayer.classList.add('hidden')}
function focusFirstSoon(){setTimeout(()=>{const b=frontContent.querySelector('.menu-button.primary,.front-action.primary,button');if(b)b.focus()},20)}
