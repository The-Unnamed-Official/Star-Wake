'use strict';

function renderHud(){
 if(!state)return;ui.sector.textContent=state.sector;ui.level.textContent=state.level;ui.scrap.textContent=Math.floor(state.scrap);ui.alloy.textContent=Math.floor(persistent.alloy);
 ui.hp.textContent=`${Math.max(0,Math.ceil(state.hp))} / ${Math.ceil(state.maxHp)}`;ui.shield.textContent=`${Math.ceil(state.shield)} / ${Math.ceil(state.maxShield)}`;ui.xp.textContent=`${Math.floor(state.xp)} / ${state.xpNeed}`;ui.combo.textContent=state.combo.toFixed(1);ui.bombs.textContent=state.bombs;ui.rerolls.textContent=state.rerolls;
 ui.hullFill.style.width=`${Math.max(0,state.hp/state.maxHp*100)}%`;ui.xpFill.style.width=`${state.xp/state.xpNeed*100}%`;
 if(state.maxShield<=0){
  ui.shieldCoreState.textContent='NO CORE';ui.shieldCoreState.className='core-state';ui.shieldFill.classList.remove('rebooting');ui.shieldFill.style.width='0%'
 }else if(state.shieldCoreTimer>0){
  ui.shieldCoreState.textContent=`OFFLINE ${state.shieldCoreTimer.toFixed(1)}s`;ui.shieldCoreState.className='core-state offline';ui.shieldFill.classList.add('rebooting');ui.shieldFill.style.width=`${(1-state.shieldCoreTimer/state.shieldCoreBase)*100}%`
 }else if(state.shieldRechargeTimer>0){
  ui.shieldCoreState.textContent=`RECOVERY ${state.shieldRechargeTimer.toFixed(1)}s`;ui.shieldCoreState.className='core-state recovering';ui.shieldFill.classList.remove('rebooting');ui.shieldFill.style.width=`${state.shield/state.maxShield*100}%`
 }else{
  ui.shieldCoreState.textContent='CORE ONLINE';ui.shieldCoreState.className='core-state';ui.shieldFill.classList.remove('rebooting');ui.shieldFill.style.width=`${state.shield/state.maxShield*100}%`
 }
 wrap.classList.toggle('critical-hull',state.hp/state.maxHp<=.25);
 ui.dash.textContent=state.phaseTimer<=0?'READY':state.phaseTimer.toFixed(1)+'s';ui.phaseFill.style.width=`${state.phaseTimer<=0?100:(1-state.phaseTimer/state.phaseCd)*100}%`;
 const threat=(state.sector*(diff==='intense'?1.25:diff==='chill'?.82:1)+enemies.length*.08).toFixed(1);
 ui.wave.textContent=state.boss?'BOSS':`${state.kills} / ${state.targetKills}`;ui.waveBar.style.width=state.boss?'100%':`${state.kills/state.targetKills*100}%`;ui.sectorMod.textContent=`THREAT ${threat} · ${state.sectorMod?state.sectorMod.name:(state.grace>0?`GRACE ${state.grace.toFixed(1)}s`:'STANDARD')}`;
 ui.overdriveStatus.classList.toggle('active',state.overdrive>0);ui.overdriveText.textContent=state.overdrive>0?state.overdrive.toFixed(1)+'s':'OFF';ui.overdriveFill.style.width=`${Math.min(100,state.overdrive/state.overdriveDuration*100)}%`;
 ui.magnetStatus.classList.toggle('active',state.magnetBoost>0);ui.magnetText.textContent=state.magnetBoost>0?state.magnetBoost.toFixed(1)+'s':'OFF';ui.magnetFill.style.width=`${Math.min(100,state.magnetBoost/10*100)}%`;
 ui.slowStatus.classList.toggle('active',state.slow>0);ui.slowText.textContent=state.slow>0?state.slow.toFixed(1)+'s':'OFF';ui.slowFill.style.width=`${Math.min(100,state.slow/state.slowDuration*100)}%`;
 if(state.boss){ui.bossBar.style.display='block';ui.bossFill.style.width=`${Math.max(0,state.boss.hp/state.boss.maxHp*100)}%`;ui.bossHp.textContent=Math.max(0,Math.ceil(state.boss.hp/state.boss.maxHp*100))+'%'}else ui.bossBar.style.display='none'
}
