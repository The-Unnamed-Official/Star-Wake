'use strict';

function enemyShoot(e){if(e.type==='boss')return bossFire(e);const dx=state.x-e.x,dy=state.y-e.y,l=Math.hypot(dx,dy)||1,s=165*(state.sectorMod?.bullet||1);enemyBullets.push({x:e.x,y:e.y,vx:dx/l*s,vy:dy/l*s,r:4,dmg:e.dmg*.72,color:e.color})}
function damageEnemy(e,dmg,b){
 if(e.dead)return;
 if(e.type==='boss')dmg*=state.bossDamage;else if(e.type==='elite'||e.type==='shielded')dmg*=state.eliteDamage;
 e.hp-=dmg;sfx(b?.crit?'critHit':'hit',{x:e.x});if(b?.crit){floatText(e.x,e.y-16,`CRIT ${Math.round(dmg)}`,'#ffd36a',11);ring(e.x,e.y,'#ffd36a',2,30,.22,2)}
 burst(e.x,e.y,b?.crit?'#ffd36a':e.color,b?.crit?8:4,b?.crit?100:60);
 if(Math.random()<state.lifesteal)state.hp=Math.min(state.maxHp,state.hp+1);
 if(e.hp<=0)killEnemy(e)
}
function killEnemy(e){
 if(e.dead)return;e.dead=true;state.kills++;state.runKills++;persistent.totalKills++;state.combo=Math.min(state.comboCap,state.combo+.1);state.comboTimer=2.5;
 sfx('kill',{x:e.x,heavy:e.type==='tank'||e.type==='elite'||e.type==='boss'});dropEnemy(e);burst(e.x,e.y,e.color,e.type==='boss'?42:e.type==='elite'?20:10,e.type==='boss'?250:150);ring(e.x,e.y,e.color,4,e.type==='boss'?145:52,e.type==='boss'?.75:.34,e.type==='boss'?5:2);
 if(Math.random()<state.killHealChance)state.hp=Math.min(state.maxHp,state.hp+4);if(state.shieldCoreTimer<=0)state.shield=Math.min(state.maxShield,state.shield+state.shieldOnKill);
 state.missions[0].val++;if(e.type==='boss'){persistent.totalBosses++;stopBossTheme();state.boss=null;ui.bossBar.style.display='none';checkAchievements();sectorClear();return}
 if(state.kills>=state.targetKills)sectorClear()
}
