'use strict';

const E=id=>document.getElementById(id);
const C=E('game'),ctx=C.getContext('2d'),wrap=E('gamewrap'),frontLayer=E('frontLayer'),frontContent=E('frontContent');
const overlay=E('overlay'),overlayCard=E('overlayCard'),sidecontent=E('sidecontent'),drawer=E('runDrawer');

const ui={
 sector:E('sectorTop'),level:E('levelTop'),scrap:E('scrapTop'),alloy:E('alloyTop'),
 hp:E('hpText'),shield:E('shieldText'),xp:E('xpText'),combo:E('comboText'),dash:E('dashText'),
 hullFill:E('hullFill'),shieldFill:E('shieldFill'),xpFill:E('xpFill'),phaseFill:E('phaseFill'),
 bombs:E('bombCount'),rerolls:E('rerollCount'),wave:E('waveText'),waveBar:E('waveBar'),sectorMod:E('sectorModText'),
 bossBar:E('bossBar'),bossName:E('bossName'),bossHp:E('bossHpText'),bossFill:E('bossFill'),
 overdriveStatus:E('overdriveStatus'),overdriveText:E('overdriveText'),overdriveFill:E('overdriveFill'),
 magnetStatus:E('magnetStatus'),magnetText:E('magnetText'),magnetFill:E('magnetFill'),
 slowStatus:E('slowStatus'),slowText:E('slowText'),slowFill:E('slowFill'),
 shieldCoreState:E('shieldCoreState'),damageFlash:E('damageScreenFlash')
};

let W=900,H=650,dpr=1;
function playerFlightY(){return Math.max(145,H-(W<=650?182:W<=1050?150:112))}
function resize(){
 const r=wrap.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);
 W=Math.max(320,r.width);H=Math.max(360,r.height);C.width=Math.round(W*dpr);C.height=Math.round(H*dpr);
 C.style.width=W+'px';C.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
 if(state){state.y=playerFlightY();state.x=Math.max(26,Math.min(W-26,state.x))}
}
addEventListener('resize',resize);
