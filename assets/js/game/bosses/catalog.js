'use strict';

const BOSS_VARIANT_COUNT=128;
const BOSS_ARCHETYPES=[
 {key:'bulwark',label:'BULWARK',w:1.72,h:.66,move:.58,hp:1.34,dmg:1.08,fire:1.10,pattern:'fan'},
 {key:'citadel',label:'CITADEL',w:1.30,h:1.22,move:.64,hp:1.48,dmg:1.10,fire:1.12,pattern:'burst'},
 {key:'needle',label:'NEEDLE',w:.58,h:1.58,move:1.55,hp:.78,dmg:1.18,fire:.86,pattern:'aimed'},
 {key:'manta',label:'MANTA',w:1.92,h:.52,move:.76,hp:1.10,dmg:1.04,fire:1.00,pattern:'rain'},
 {key:'spindle',label:'SPINDLE',w:.72,h:1.38,move:1.34,hp:.88,dmg:1.12,fire:.90,pattern:'cross'},
 {key:'crown',label:'CROWN',w:1.18,h:.92,move:.94,hp:1.08,dmg:1.10,fire:.94,pattern:'radial'},
 {key:'gate',label:'GATE',w:2.08,h:.44,move:.52,hp:1.26,dmg:1.02,fire:1.16,pattern:'fan'},
 {key:'reaper',label:'REAPER',w:.82,h:1.18,move:1.26,hp:.92,dmg:1.22,fire:.88,pattern:'aimed'},
 {key:'monolith',label:'MONOLITH',w:.92,h:1.48,move:.62,hp:1.42,dmg:1.12,fire:1.08,pattern:'burst'},
 {key:'leviathan',label:'LEVIATHAN',w:1.76,h:.84,move:.68,hp:1.38,dmg:1.14,fire:1.04,pattern:'rain'},
 {key:'rapier',label:'RAPIER',w:.48,h:1.72,move:1.68,hp:.72,dmg:1.24,fire:.82,pattern:'aimed'},
 {key:'harrow',label:'HARROW',w:1.42,h:.72,move:1.00,hp:1.05,dmg:1.18,fire:.96,pattern:'cross'},
 {key:'orbiter',label:'ORBITER',w:1.06,h:1.06,move:1.10,hp:1.00,dmg:1.08,fire:.92,pattern:'radial'},
 {key:'anvil',label:'ANVIL',w:1.34,h:1.05,move:.58,hp:1.55,dmg:1.20,fire:1.18,pattern:'burst'},
 {key:'wraith',label:'WRAITH',w:.70,h:1.28,move:1.48,hp:.82,dmg:1.17,fire:.84,pattern:'cross'},
 {key:'horizon',label:'HORIZON',w:2.16,h:.38,move:.46,hp:1.18,dmg:1.00,fire:1.08,pattern:'rain'}
];
const BOSS_PREFIX=['Abyss','Chrome','Grim','Solar','Null','Ivory','Vanta','Rift','Cinder','Astral','Iron','Glass','Neon','Black','Pale','Crimson'];
const BOSS_SUFFIX=['Warden','Regent','Tyrant','Oracle','Engine','Sentinel','Harvester','Monarch'];

function bossRand(seed,salt=0){
 let x=(seed+1)*0x9E3779B1+(salt+11)*0x85EBCA6B;x^=x>>>16;x=Math.imul(x,0x7FEB352D);x^=x>>>15;x=Math.imul(x,0x846CA68B);x^=x>>>16;
 return (x>>>0)/4294967296
}
function makeBossVariant(i){
 const a=BOSS_ARCHETYPES[i%BOSS_ARCHETYPES.length],style=Math.floor(i/BOSS_ARCHETYPES.length),seed=1009+i*7919;
 const spokes=5+Math.floor(bossRand(seed,1)*7),rings=1+Math.floor(bossRand(seed,2)*3),spikes=2+Math.floor(bossRand(seed,3)*8);
 const hue=Math.floor((i*47+bossRand(seed,4)*55)%360),accent=(hue+48+style*17)%360;
 const movement=['sway','pendulum','glide','dart','orbit','zigzag','sweep','hover'][(i+style*3)%8];
 return {
  id:i,name:`${BOSS_PREFIX[i%16]} ${BOSS_SUFFIX[Math.floor(i/16)%8]}`,archetype:a.label,key:a.key,seed,style,
  width:a.w*(.90+bossRand(seed,5)*.20),height:a.h*(.90+bossRand(seed,6)*.20),
  hpMult:a.hp*(.93+bossRand(seed,7)*.16),damageMult:a.dmg*(.94+bossRand(seed,8)*.14),
  moveMult:a.move*(.92+bossRand(seed,9)*.18),fireMult:a.fire*(.92+bossRand(seed,10)*.16),
  rewardMult:1+(a.hp-1)*.30+(a.dmg-1)*.22,movement,firePattern:a.pattern,spokes,rings,spikes,
  coreSize:.25+bossRand(seed,11)*.22,armLength:.42+bossRand(seed,12)*.42,notch:.18+bossRand(seed,13)*.22,
  color:`hsl(${hue} 88% 66%)`,accent:`hsl(${accent} 92% 72%)`,dark:`hsl(${hue} 64% 18%)`,
  musicRoot:34+Math.floor(bossRand(seed,20)*12),musicMode:bossRand(seed,21)>.52?'minor':'phrygian',
  musicPulse:Math.floor(bossRand(seed,22)*4),musicLead:Math.floor(bossRand(seed,23)*6)
 }
}
const BOSS_VARIANTS=Array.from({length:BOSS_VARIANT_COUNT},(_,i)=>makeBossVariant(i));
function chooseBossVariant(history=[]){
 const recent=new Set(history.slice(-5));let choices=BOSS_VARIANTS.filter(b=>!recent.has(b.id));
 if(!choices.length)choices=BOSS_VARIANTS;
 return choices[Math.floor(Math.random()*choices.length)]
}
