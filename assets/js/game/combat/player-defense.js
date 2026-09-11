'use strict';

function takeDamage(n){
 if(state.dashInvuln>0||state.impactTimer>0)return;
 const original=n;n*=1-state.armor;const shieldBefore=state.shield;
 let absorbed=Math.min(state.shield,n);
 if(absorbed>0){
  state.shield-=absorbed;n-=absorbed;state.shieldRechargeTimer=state.shieldRechargeDelay;sfx('shield',{x:state.x});
  damageNumber(state.x-14,state.y-29,absorbed,'shield')
 }
 if(shieldBefore>0&&state.shield<=0&&state.maxShield>0)shieldCoreBreak();
 if(n>0){
  state.hp-=n;state.damageTaken+=n;state.sectorHullDamage+=n;sfx('hurt');
  damageNumber(state.x+13,state.y-39,n,'hull');
 }
 state.impactTimer=state.impactGrace;
 if(persistent.settings.hitFeedback){
  damagePulse=Math.max(damagePulse,n>0?.19:.12);
  screenShake=Math.max(screenShake,n>0?5.5:3.2);
  flash('#ff657b',n>0?.045:.022)
 }
 state.combo=1;
 if(state.hp<=0)die()
}
function useBomb(){if(!state.running||state.bombs<=0)return;state.bombs--;sfx('bomb');enemyBullets=[];ring(state.x,state.y,'#ff9b61',10,Math.max(W,H)*.72,.58,6);flash('#ff9b61',.25);for(const e of enemies)damageEnemy(e,state.damage*state.bombPower,null);enemies=enemies.filter(e=>!e.dead)}
function phaseShift(){
 if(!state.running||state.phaseTimer>0)return;const old=state.x,dir=state.lastDashDir||1;let nx=old+dir*state.phaseRange;if(nx<26||nx>W-26)nx=old-dir*state.phaseRange;nx=Math.max(26,Math.min(W-26,nx));
 state.x=nx;state.vx=dir*state.maxSpeed*.55;state.phaseTimer=state.phaseCd;state.dashInvuln=.42;enemyBullets=enemyBullets.filter(b=>!(b.x>=Math.min(old,nx)-45&&b.x<=Math.max(old,nx)+45&&Math.abs(b.y-state.y)<140));
 sfx('dash',{x:nx});ring(old,state.y,'#a57bff',5,42,.25,2);ring(nx,state.y,'#67defe',6,58,.34,3);burst(old,state.y,'#a57bff',9,110);burst(nx,state.y,'#67defe',12,130);floatText((old+nx)/2,state.y-34,'PHASE','#67defe',10)
}
