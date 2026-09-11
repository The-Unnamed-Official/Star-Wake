'use strict';

/* ========================= RUN FLOW ========================= */
function startRun(){initRun();hideFront();overlay.style.display='none';state.running=true;state.grace=4.5;log('Wake entered.')}
function gainXp(v){
 state.xp+=v*state.xpMult;
 if(state.xp>=state.xpNeed&&!state.choosing){state.xp-=state.xpNeed;state.level++;state.xpNeed=Math.floor(state.xpNeed*1.28+8);sfx('level');celebrate();floatText(W/2,H*.28,'LEVEL '+state.level,'#ffd36a',23,1);state.choicePool=randomChoices();showUpgrade(`Level ${state.level}`)}
}
function showUpgrade(reason){
 state.running=false;state.choosing=true;if(!state.choicePool)state.choicePool=randomChoices();
 overlayCard.innerHTML=`<div class="modal-head"><div><small>${reason.toUpperCase()}</small><h2>Install one system</h2></div><p>${TOTAL_UPGRADES} upgrades in pool</p></div>
 <div class="choicegrid">${state.choicePool.map((u,i)=>`<button class="choice" data-choice="${i}"><span class="choice-key">${i+1}</span><div class="choice-icon" style="color:${rarityColor[u.rarity]};border-color:${rarityColor[u.rarity]}55">${u.icon}</div><div class="choice-cat">${u.category}</div><h3>${u.name}</h3><div class="choice-tier">TIER ${u.tier}</div><div class="choice-effect">${u.effect}</div><p>${u.desc}</p><div class="rarity" style="color:${rarityColor[u.rarity]}">${u.rarity}</div></button>`).join('')}</div>
 <div class="modal-foot"><span>1 / 2 / 3 choose · ${state.rerolls>0?'R reroll':'free reroll available through terrible advertising'}</span>${state.rerolls>0?`<button class="modal-btn" data-action="reroll">REROLL · ${state.rerolls}</button>`:`<button class="modal-btn ad-reroll-button" data-action="ad-reroll">WATCH 55s DUMB AD · +1 REROLL</button>`}</div>`;
 overlay.style.display='grid';focusOverlay()
}
function pickUpgrade(i){if(!state.choosing||!state.choicePool?.[i])return;const u=state.choicePool[i];u.apply(state);state.chosen.push(u.id);sfx('upgrade',{rarity:u.rarity});ring(state.x,state.y,rarityColor[u.rarity],8,u.rarity==='legendary'?100:65,.5,3);burst(state.x,state.y,rarityColor[u.rarity],u.rarity==='legendary'?26:14,150);floatText(state.x,state.y-38,u.name.toUpperCase(),rarityColor[u.rarity],13,.8);state.choicePool=null;state.choosing=false;overlay.style.display='none';state.running=true;renderSide()}
function reroll(){if(!state.choosing||state.rerolls<=0)return;state.rerolls--;state.choicePool=randomChoices();showUpgrade('Reroll')}
function sectorClear(){
 if(state.choosing||state.dead)return;state.running=false;sfx('sector');celebrate();floatText(W/2,H*.30,`SECTOR ${state.sector} CLEARED`,'#72efa5',21,1);
 let alloyGain=Math.max(1,Math.floor(state.sector*.4));
 if(state.sectorHullDamage<=0){
  state.flawlessStreak++;const flawlessBonus=1+Math.floor(state.sector/5);alloyGain+=flawlessBonus;
  floatText(W/2,H*.36,`FLAWLESS +${flawlessBonus} ALLOY`,'#ffd36a',11,.9);log(`Flawless sector ×${state.flawlessStreak}.`)
 }else state.flawlessStreak=0;
 persistent.alloy+=alloyGain;persistent.best=Math.max(persistent.best,state.sector+1);save();checkAchievements();
 state.sector++;state.kills=0;state.sectorHullDamage=0;state.targetKills=Math.min(45,7+Math.floor(state.sector*1.45));state.grace=2.4;state.sectorMod=mods[Math.floor(Math.random()*mods.length)];state.missions[2].val=Math.max(state.missions[2].val,state.sector);enemies=[];enemyBullets=[];bullets=[];state.choicePool=randomChoices();showUpgrade(`Sector ${state.sector-1} cleared`)
}
function die(){
 if(state.dead)return;state.dead=true;state.running=false;if(bossThemeActive)stopBossTheme();sfx('death');persistent.totalRuns++;const bank=Math.floor(state.scrap/45)+Math.max(1,state.sector-1);persistent.alloy+=bank;persistent.best=Math.max(persistent.best,state.sector);persistent.totalSalvage+=state.scrap;save();checkAchievements();
 lastRun={sector:state.sector,level:state.level,kills:state.runKills,salvage:state.scrap,bank,diff,bosses:Math.floor(state.sector/5),damageTaken:Math.round(state.damageTaken),nearMisses:state.nearMisses,shieldBreaks:state.shieldBreaks,flawless:state.flawlessStreak};overlay.style.display='none';setTimeout(showDeath,240)
}
