'use strict';

/* Target selection is reserved for HOMING projectiles. Normal shots never auto-aim. */
function nearestTarget(x,y){
 let best=null,score=Infinity;
 for(const e of enemies){
  if(e.dead||e.y>y+24)continue;
  const vertical=Math.max(1,y-e.y),horizontal=Math.abs(e.x-x);
  const threatBias=e.type==='boss'?-120:e.rank==='apex'?-45:e.type==='elite'?-24:0;
  const scoreNow=vertical+horizontal*.72+threatBias;
  if(scoreNow<score){score=scoreNow;best=e}
 }
 return best
}
function estimatedEnemyVelocity(e){
 if(Number.isFinite(e.vx)&&Number.isFinite(e.vy))return {vx:e.vx,vy:e.vy};
 let vx=0,vy=e.type==='boss'?0:e.speed;
 if(e.type==='zigzag')vx=Math.sin(e.phase*2.2)*50;
 return {vx,vy}
}
function straightShotVector(speed,accuracy,fanAngle=0,serial=0){
 // Accuracy only reduces deterministic weapon drift. It never acquires a target.
 const a=Math.max(0,Math.min(1,accuracy));
 const drift=(Math.sin((serial+1)*2.3999632297)+Math.sin((serial+1)*.731))*.5;
 const angle=-Math.PI/2+fanAngle+(1-a)*.085*drift;
 return {vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,angle}
}
function firePlayer(){
 const count=Math.min(9,state.multishot),boost=state.overdrive>0?1+state.overdrivePower:1,serial=++state.shotSerial;let crits=0;
 for(let i=0;i<count;i++){
  const center=(count-1)/2,off=(i-center)*Math.min(10,state.spread*.65),x=state.x+off,y=state.y-24;
  const crit=Math.random()<state.critChance,homing=Math.random()<state.homingChance;
  const shot=straightShotVector(state.projectileSpeed,state.aimAccuracy,(i-center)*(state.spread*.00145),serial+i*7);
  bullets.push({x,y,vx:shot.vx,vy:shot.vy,dmg:state.damage*boost,size:state.projectileSize,crit,pierce:state.pierce,homing,strength:state.homingStrength,bounces:0,angle:shot.angle});
  if(crit){crits++;critShotVfx(x,y)}
 }
 sfx(crits?'critShot':'shot',{x:state.x})
}
function fireDrones(){
 if(!state.drones)return;
 for(let i=0;i<state.drones;i++){
  const a=performance.now()/750+i*Math.PI*2/state.drones,x=state.x+Math.cos(a)*31,y=state.y+Math.sin(a)*18,speed=state.projectileSpeed*.9;
  const shot=straightShotVector(speed,state.droneAccuracy,0,state.shotSerial+i*13+200);
  const homing=Math.random()<state.droneHomingChance;
  bullets.push({x,y,vx:shot.vx,vy:shot.vy,dmg:state.damage*state.droneDamage,size:state.projectileSize*.85,crit:false,pierce:0,homing,strength:state.droneHomingStrength,bounces:0,drone:true,angle:shot.angle})
 }
}
