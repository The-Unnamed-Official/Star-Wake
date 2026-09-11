'use strict';

/* ========================= SPAWN / DROPS ========================= */
const enemyDefs={
 scout:{hp:16,speed:46,r:11,dmg:9,color:'#ff657b'},
 tank:{hp:48,speed:30,r:18,dmg:16,color:'#ff9b61'},
 zigzag:{hp:25,speed:42,r:12,dmg:11,color:'#ffd36a'},
 shooter:{hp:30,speed:30,r:13,dmg:10,color:'#a57bff'},
 elite:{hp:62,speed:48,r:16,dmg:18,color:'#d88aff'},
 sniper:{hp:34,speed:25,r:13,dmg:15,color:'#79a8ff'},
 shielded:{hp:72,speed:34,r:17,dmg:13,color:'#68e6d2'},
 charger:{hp:38,speed:62,r:14,dmg:20,color:'#ff7b8e'},
 swarm:{hp:11,speed:70,r:8,dmg:7,color:'#ffb36b'}
};
function spawnEnemy(type=null){
 const s=state.sector,r=Math.random();
 if(!type){
  if(s>=11&&r<.06)type='shielded';else if(s>=9&&r<.12)type='sniper';else if(s>=7&&r<.19)type='charger';else if(s>=6&&r<.28)type='shooter';
  else if(s>=4&&r<.38*(state.sectorMod?.elite||1))type='elite';else if(s>=3&&r<.51)type='zigzag';else if(s>=2&&r<.65)type='tank';else if(s>=8&&r<.78)type='swarm';else type='scout'
 }
 const d=enemyDefs[type],depth=s-1,D=difficulty[diff],hpScale=Math.pow(1.10,depth)*(1+depth*.035)*D.hp,speedScale=Math.min(2.05,1+depth*.025)*(state.sectorMod?.speed||1),dmgScale=Math.pow(1.055,depth)*D.damage;
 const rankRoll=Math.random();let rank='standard',rankHp=1,rankDmg=1,rankSpeed=1,rewardMult=1;
 if(s>=18&&rankRoll<Math.min(.08,.025+(s-18)*.002)){rank='apex';rankHp=2.05;rankDmg=1.45;rankSpeed=1.14;rewardMult=2.15}
 else if(s>=8&&rankRoll<Math.min(.24,.10+(s-8)*.007)){rank='veteran';rankHp=1.48;rankDmg=1.20;rankSpeed=1.08;rewardMult=1.45}
 const x=24+Math.random()*(W-48);
 enemies.push({type,rank,rewardMult,x,y:-30,r:d.r,hp:d.hp*hpScale*rankHp,maxHp:d.hp*hpScale*rankHp,speed:d.speed*speedScale*rankSpeed,dmg:d.dmg*dmgScale*rankDmg,color:d.color,phase:Math.random()*6.28,shoot:1.4+Math.random(),dead:false});
 if(rank==='apex')log('APEX contact entered the sector.')
}
function spawnBoss(){
 const tier=Math.max(0,Math.floor(state.sector/5)-1),hp=520*Math.pow(1.68,tier)*difficulty[diff].hp;
 const e={type:'boss',x:W/2,y:84,r:40,hp,maxHp:hp,speed:18,dmg:24*Math.pow(1.09,tier)*difficulty[diff].damage,color:'#ff9b61',phase:0,shoot:Math.max(.34,.8-tier*.04),dead:false};
 enemies.push(e);state.boss=e;ui.bossBar.style.display='block';sfx('boss');log('Boss signal detected.')
}
function xpStyle(e,v,i){
 if(e.type==='boss')return {color:i%2?'#ffb86b':'#ffd36a',glow:'#fff0b0',size:10+v*.12,shape:i%2?'hex':'star',trail:true};
 if(e.type==='elite'||e.type==='shielded')return {color:'#c88cff',glow:'#e4c0ff',size:7.5+v*.15,shape:i%2?'hex':'diamond',trail:true};
 if(e.type==='tank'||e.type==='charger')return {color:'#7ce7ff',glow:'#c9f9ff',size:6.5+v*.16,shape:'hex',trail:true};
 if(e.type==='sniper')return {color:'#82aaff',glow:'#d0dcff',size:6.2+v*.12,shape:'diamond',trail:false};
 if(e.type==='zigzag')return {color:'#7ef0d2',glow:'#c6fff1',size:5.7+v*.11,shape:'triangle',trail:false};
 return {color:'#67defe',glow:'#e8fbff',size:4.8+v*.08,shape:'orb',trail:false}
}
function dropEnemy(e){
 let xp=Math.max(1,Math.round((e.type==='boss'?55:e.type==='elite'||e.type==='shielded'?14:e.type==='tank'||e.type==='charger'?9:e.type==='sniper'||e.type==='shooter'?7:5)*(e.rewardMult||1)));
 const count=e.type==='boss'?10:e.type==='elite'||e.type==='shielded'?4:e.type==='tank'||e.type==='charger'?3:2;let left=xp;
 for(let i=0;i<count;i++){const rem=count-i,v=i===count-1?left:Math.max(1,Math.floor(left/rem));left-=v;const st=xpStyle(e,v,i);drops.push({kind:'xp',x:e.x+(Math.random()-.5)*20,y:e.y,v,vx:(Math.random()-.5)*55,vy:17+Math.random()*17,spin:Math.random()*6.28,...st})}
 const chance=e.type==='boss'?1:e.type==='elite'?.74:e.type==='tank'?.50:.24;
 if(Math.random()<chance)drops.push({kind:'salvage',x:e.x,y:e.y,v:(e.type==='boss'?42:e.type==='elite'?9:e.type==='tank'?6:3)*(e.rewardMult||1)*state.salvageMult*difficulty[diff].reward*(state.sectorMod?.salvage||1),vx:(Math.random()-.5)*30,vy:22,spin:0,color:'#72efa5',glow:'#baffd4',size:5})
 if(Math.random()<.055+state.powerupLuck)spawnPowerup(e.x,e.y)
}
function spawnPowerup(x,y){const types=['heal','shield','overdrive','magnet','bomb','slow'],type=types[Math.floor(Math.random()*types.length)];powerups.push({x,y,type,vy:20,t:0})}
