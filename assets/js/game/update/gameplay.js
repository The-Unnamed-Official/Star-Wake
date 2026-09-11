'use strict';

/* ========================= UPDATE ========================= */
function update(dt){
 for(const s of stars){s.y+=22*s.s*dt;if(s.y>H){s.y=-4;s.x=Math.random()*W}}
 updateVfx(dt);pollGamepad(dt);
 if(!state||!state.running||state.paused)return;

 state.y=playerFlightY();state.phaseTimer=Math.max(0,state.phaseTimer-dt);state.dashInvuln=Math.max(0,state.dashInvuln-dt);state.impactTimer=Math.max(0,state.impactTimer-dt);state.overdrive=Math.max(0,state.overdrive-dt);state.magnetBoost=Math.max(0,state.magnetBoost-dt);state.slow=Math.max(0,state.slow-dt);
 if(state.maxShield>0){
  if(state.shieldCoreTimer>0){
   const before=state.shieldCoreTimer;state.shieldCoreTimer=Math.max(0,state.shieldCoreTimer-dt);
   if(before>0&&state.shieldCoreTimer<=0)shieldCoreOnline()
  }else{
   state.shieldRechargeTimer=Math.max(0,state.shieldRechargeTimer-dt);
   if(state.shieldRechargeTimer<=0)state.shield=Math.min(state.maxShield,state.shield+state.shieldRegen*dt)
  }
 }
 if(state.regen>0&&state.hp>0&&state.hp<state.maxHp)state.hp=Math.min(state.maxHp,state.hp+state.regen*dt);
 state.comboTimer-=dt;if(state.comboTimer<=0)state.combo=Math.max(1,state.combo-state.comboDecay*dt);

 // free horizontal movement, all input types
 let axis=(input.right?1:0)-(input.left?1:0);if(Math.abs(input.gamepadX)>.12)axis=input.gamepadX;
 const mouseTarget=!persistent.settings.ignoreGameplayMouse&&input.mouseActive&&!input.left&&!input.right&&Math.abs(input.gamepadX)<.12?input.mouseX:null;
 const target=input.touchActive?input.touchX:mouseTarget;
 if(target!=null){
  const diffx=target-state.x;
  if(Math.abs(diffx)>2)state.lastDashDir=Math.sign(diffx);
  const desired=Math.max(-state.maxSpeed,Math.min(state.maxSpeed,diffx*7));
  state.vx+=(desired-state.vx)*Math.min(1,dt*12)
 }
 else if(Math.abs(axis)>.02){const desired=axis*state.maxSpeed;state.vx+=(desired-state.vx)*Math.min(1,dt*(state.accel/300))}
 else{const dec=state.brake*dt;if(Math.abs(state.vx)<=dec)state.vx=0;else state.vx-=Math.sign(state.vx)*dec}
 state.x+=state.vx*dt;if(state.x<25){state.x=25;state.vx=Math.max(0,state.vx)}if(state.x>W-25){state.x=W-25;state.vx=Math.min(0,state.vx)}

 fireClock-=dt;if(fireClock<=0){firePlayer();fireClock=1/(state.fireRate*(state.sectorMod?.fire||1))}
 droneClock-=dt;if(droneClock<=0){fireDrones();droneClock=1/Math.max(.25,state.droneRate)}

 state.grace=Math.max(0,state.grace-dt);
 if(state.grace<=0&&!state.boss&&state.sector%5!==0){spawnClock-=dt;const base=spawnIntervalForSector(state.sector);if(spawnClock<=0){spawnEnemy();spawnClock=base*(.84+Math.random()*.44)}}
 if(state.sector%5===0&&!state.boss&&state.kills===0&&state.grace<=0&&enemies.length===0)spawnBoss();

 const slow=state.slow>0?.52:1;
 for(const b of bullets){
  if(b.homing){
   const t=nearestTarget(b.x,b.y);
   if(t){
    const speed=Math.max(1,Math.hypot(b.vx,b.vy)),ev=estimatedEnemyVelocity(t),flight=Math.max(.04,Math.hypot(t.x-b.x,t.y-b.y)/speed);
    const tx=t.x+ev.vx*flight*state.leadStrength*.55,ty=t.y+ev.vy*flight*state.leadStrength*.35;
    const desired=Math.atan2(ty-b.y,tx-b.x),dvx=Math.cos(desired)*speed,dvy=Math.sin(desired)*speed,turn=Math.min(1,dt*((b.strength||state.homingStrength)/100));
    b.vx+=(dvx-b.vx)*turn;b.vy+=(dvy-b.vy)*turn
   }
  }
  b.angle=Math.atan2(b.vy,b.vx);b.x+=b.vx*dt;b.y+=b.vy*dt;
 }
 bullets=bullets.filter(b=>b.y>-60&&b.x>-60&&b.x<W+60);

 for(const eb of enemyBullets){eb.x+=eb.vx*dt*slow;eb.y+=eb.vy*dt*slow}
 for(let i=enemyBullets.length-1;i>=0;i--){
  const b=enemyBullets[i],dist=Math.hypot(b.x-state.x,b.y-state.y);
  if(dist<18){enemyBullets.splice(i,1);takeDamage(b.dmg)}
  else{
   if(!b.nearMissed&&dist<48&&Math.abs(b.y-state.y)<38){b.nearMissed=true;state.nearMisses++;state.combo=Math.min(state.comboCap,state.combo+.035);sfx('nearMiss',{x:b.x});if(persistent.settings.hitFeedback)floatText(state.x,state.y-48,'NEAR MISS','#ffd36a',7,.42)}
   if(b.y>H+30||b.x<-40||b.x>W+40)enemyBullets.splice(i,1)
  }
 }

 for(const e of enemies){
  if(e.dead)continue;e.phase+=dt*2.2;
  if(e.type==='boss')updateBossEntity(e,dt,slow);
  else{
   e.vx=0;e.vy=e.speed*slow;if(e.type==='zigzag')e.vx=Math.sin(e.phase*2.2)*50;if(e.type==='charger'&&e.y>H*.45)e.vy*=1.65;
   e.x+=e.vx*dt;e.y+=e.vy*dt;
   if(e.type==='sniper'||e.type==='shooter'){e.shoot-=dt;if(e.shoot<=0&&e.y>45&&e.y<H*.62){enemyShoot(e);e.shoot=e.type==='sniper'?1.55:2.2}}
  }
  if(e.type!=='boss'&&e.y>state.y-15&&Math.abs(e.x-state.x)<e.r+17){e.dead=true;takeDamage(e.dmg)}
  else if(e.type!=='boss'&&e.y>H+30){e.dead=true;takeDamage(e.dmg*.55)}
 }

 // robust bullet collisions: mark dead first, clean later
 for(let bi=bullets.length-1;bi>=0;bi--){
  const b=bullets[bi];let hit=null;
  for(const e of enemies){if(e.dead)continue;if(enemyHitTest(e,b.x,b.y,b.size+2)){hit=e;break}}
  if(!hit)continue;damageEnemy(hit,b.dmg,b);
  if(Math.random()<state.chainChance){const t=enemies.find(e=>!e.dead&&e!==hit&&Math.hypot(e.x-hit.x,e.y-hit.y)<130);if(t)damageEnemy(t,b.dmg*.42,null)}
  if(b.pierce>0)b.pierce--;else bullets.splice(bi,1)
 }
 enemies=enemies.filter(e=>!e.dead);

 for(let i=drops.length-1;i>=0;i--){
  const d=drops[i];d.x+=(d.vx||0)*dt;d.vx=(d.vx||0)*.985;d.y+=d.vy*dt;d.spin+=dt*6;
  const dx=state.x-d.x,dy=state.y-d.y,dist=Math.hypot(dx,dy),base=d.kind==='xp'?120*state.orbMagnet:88,range=base*state.magnet*(state.magnetBoost>0?2.1:1)*(state.sectorMod?.magnet||1);
  if(dist<range){const pull=d.kind==='xp'?8:5.5;d.x+=dx*dt*pull;d.y+=dy*dt*pull;if(dist<25+(d.size||5)*.25){if(d.kind==='xp'){gainXp(d.v);floatText(d.x,d.y-10,`+${Math.floor(d.v)} XP`,d.color,9);ring(d.x,d.y,d.color,2,20+(d.size||5),.2,1.5)}else{state.scrap+=d.v;persistent.totalSalvage+=d.v;state.missions[1].val+=d.v;floatText(d.x,d.y-10,`+${Math.floor(d.v)}`,'#72efa5',8)}sfx('pickup',{x:d.x});drops.splice(i,1);continue}}
  if(d.y>H+40)drops.splice(i,1)
 }
 for(let i=powerups.length-1;i>=0;i--){const p=powerups[i];p.y+=p.vy*dt;p.t+=dt;if(Math.hypot(p.x-state.x,p.y-state.y)<26){if(p.type==='heal')state.hp=Math.min(state.maxHp,state.hp+30);if(p.type==='shield'){state.shieldCoreTimer=0;state.shieldRechargeTimer=0;state.shield=Math.min(state.maxShield,Math.max(state.shield,30));sfx('coreOnline',{x:state.x})}if(p.type==='overdrive')state.overdrive=state.overdriveDuration;if(p.type==='magnet')state.magnetBoost=10;if(p.type==='bomb')state.bombs++;if(p.type==='slow')state.slow=state.slowDuration;ring(state.x,state.y,powerColor(p.type),3,45,.3,2);floatText(state.x,state.y-25,p.type.toUpperCase(),powerColor(p.type),10);powerups.splice(i,1)}else if(p.y>H+30)powerups.splice(i,1)}
 checkMissions()
}
