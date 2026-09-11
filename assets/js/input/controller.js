'use strict';

function pollGamepad(dt){
 const gp=[...(navigator.getGamepads?.()||[])].find(Boolean);if(!gp){input.gamepadX=0;return}
 if(!audioUnlocked&&(gp.buttons.some(b=>b?.pressed)||Math.abs(gp.axes[0]||0)>.2||Math.abs(gp.axes[1]||0)>.2))unlockAudioAndStartMenu();
 const ax=Math.abs(gp.axes[0]||0)>.16?gp.axes[0]:0;
 const wipeOpen=typeof wipeExperience!=='undefined'&&wipeExperience&&!wipeExperience.hidden;
 const modal=wipeOpen||!frontLayer.classList.contains('hidden')||overlay.style.display==='grid'||drawer.classList.contains('open');
 if(!modal&&state?.running)input.gamepadX=ax;else input.gamepadX=0;
 navCooldown=Math.max(0,navCooldown-dt);
 const left=(gp.buttons[14]?.pressed)||(ax<-.55),right=(gp.buttons[15]?.pressed)||(ax>.55),up=gp.buttons[12]?.pressed||(gp.axes[1]||0)<-.65,down=gp.buttons[13]?.pressed||(gp.axes[1]||0)>.65;
 if(modal&&navCooldown<=0&&(left||right||up||down)){const bs=interactiveButtons();if(bs.length){focusIndex=(focusIndex+(left||up?-1:1)+bs.length)%bs.length;gamepadNav(bs);navCooldown=.18}}
 const pressed=i=>gp.buttons[i]?.pressed&&!gpPrev[i];
 if(modal&&pressed(0)){const bs=interactiveButtons();bs[focusIndex]?.click()}
 if(modal&&pressed(1)){if(wipeOpen)return;if(frontScreen!=='main'&&!frontLayer.classList.contains('hidden'))showMain();else if(drawer.classList.contains('open'))closeDrawer();else if(state?.paused)pause()}
 if(!modal&&state?.running){if(pressed(0))phaseShift();if(pressed(1))useBomb();if(pressed(9))pause();if(pressed(4)||pressed(5))openDrawer()}
 gpPrev={};for(let i=0;i<gp.buttons.length;i++)gpPrev[i]=gp.buttons[i]?.pressed
}
