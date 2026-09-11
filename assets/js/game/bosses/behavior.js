'use strict';

function enemyHitTest(e,x,y,pad=0){
 if(e.type==='boss'){
  const rx=(e.rx||e.r)+pad,ry=(e.ry||e.r)+pad,dx=(x-e.x)/Math.max(1,rx),dy=(y-e.y)/Math.max(1,ry);
  return dx*dx+dy*dy<=1
 }
 return Math.hypot(x-e.x,y-e.y)<e.r+pad
}
function pushEnemyBullet(x,y,vx,vy,r,dmg,color='#ff8193'){enemyBullets.push({x,y,vx,vy,r,dmg,color})}
function bossFire(e){
 const d=e.bossDef,baseSpeed=150*(state.sectorMod?.bullet||1),damage=e.dmg*.62,aim=Math.atan2(state.y-e.y,state.x-e.x);
 const shot=(ang,speed=baseSpeed,r=5,mult=1)=>pushEnemyBullet(e.x,e.y,Math.cos(ang)*speed,Math.sin(ang)*speed,r,damage*mult,d?.accent||'#ff8193');
 switch(d.firePattern){
  case 'radial':for(let i=0;i<10;i++)shot(i*Math.PI/5+e.phase*.18,baseSpeed*.86,5,.72);break;
  case 'cross':for(let a=-2;a<=2;a++)shot(aim+a*.20,baseSpeed*(a===0?1.10:.92),5,a===0?1:.76);break;
  case 'rain':for(let i=0;i<6;i++){const x=20+Math.random()*(W-40);pushEnemyBullet(x,e.y+12,(Math.random()-.5)*25,baseSpeed*.9,5,damage*.72,d?.accent)}break;
  case 'burst':for(let i=-1;i<=1;i++)shot(aim+i*.11,baseSpeed*(1+Math.abs(i)*.05),6,i===0?1.05:.82);break;
  case 'fan':for(let i=-3;i<=3;i++)shot(aim+i*.13,baseSpeed*.92,5,i===0?.95:.68);break;
  default:shot(aim,baseSpeed*1.12,6,1.08)
 }
}
function updateBossEntity(e,dt,slow){
 const d=e.bossDef,t=e.moveClock+=dt*(e.moveScale||1),oldX=e.x,oldY=e.y,rx=e.rx||45,margin=rx+22,span=Math.max(35,W*.5-margin);
 switch(d.movement){
  case 'pendulum':e.x=W/2+Math.sin(t*.62)*span*.62;e.y=82+Math.sin(t*1.25)*13;break;
  case 'glide':e.x=W/2+Math.sin(t*.42)*span*.92;e.y=82+Math.sin(t*.68)*7;break;
  case 'dart':
   if(!e.dartTarget||Math.abs(e.x-e.dartTarget)<12||e.dartClock<=0){e.dartTarget=margin+Math.random()*Math.max(1,W-margin*2);e.dartClock=.8+Math.random()*1.1}
   e.dartClock-=dt;e.x+=(e.dartTarget-e.x)*Math.min(1,dt*2.3*(e.moveScale||1));e.y=80+Math.sin(t*1.8)*10;break;
  case 'orbit':e.x=W/2+Math.sin(t*.92)*span*.60;e.y=91+Math.cos(t*.72)*31;break;
  case 'zigzag':e.x=W/2+Math.sin(t*1.25)*span*.72;e.y=79+Math.sin(t*2.50)*13;break;
  case 'sweep':e.x=W/2+Math.sin(t*.36)*span*.98;e.y=76+Math.abs(Math.sin(t*.72))*18;break;
  case 'hover':e.x=W/2+Math.sin(t*.35)*span*.28;e.y=84+Math.sin(t*.90)*18;break;
  default:e.x=W/2+Math.sin(t*.70)*span*.68;e.y=84+Math.sin(t*1.38)*10
 }
 e.x=Math.max(margin,Math.min(W-margin,e.x));e.vx=(e.x-oldX)/Math.max(.001,dt);e.vy=(e.y-oldY)/Math.max(.001,dt);
 e.shoot-=dt*slow;if(e.shoot<=0){bossFire(e);e.shoot=Math.max(.22,e.baseShoot*(.86+Math.random()*.26))}
}
