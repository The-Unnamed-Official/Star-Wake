'use strict';

function createState(){
 const p=persistent.perma;
 return {
  running:false,paused:false,dead:false,choosing:false,sector:1,kills:0,targetKills:8,grace:4.5,level:1,xp:0,xpNeed:35,scrap:0,runKills:0,
  hp:100+p.hp*12,maxHp:100+p.hp*12,shield:p.shield*10,maxShield:p.shield*10,shieldRegen:2.4,
  shieldCoreBase:Math.max(4,10-(p.core||0)*.45),shieldCoreTimer:0,shieldRechargeDelay:1.65,shieldRechargeTimer:0,shieldRestartFraction:.08,shieldBreakRadius:95,shieldBreaks:0,
  armor:0,regen:0,lifesteal:0,killHealChance:0,shieldOnKill:0,impactGrace:.16,impactTimer:0,
  damage:10*(1+p.damage*.10),fireRate:3,projectileSpeed:560,projectileSize:3.8,spread:12,multishot:1,pierce:0,
  aimAccuracy:.82,leadStrength:.68,homingChance:0,homingStrength:210,homingDamping:.97,
  shotSerial:0,critChance:.05+p.luck*.01,critDamage:2,combo:1,comboCap:8,comboTimer:0,comboDecay:.72,
  magnet:1+p.magnet*.15,orbMagnet:1,xpMult:1,salvageMult:1,powerupLuck:0,luck:p.luck*.04,rerolls:1,
  maxSpeed:520,accel:2800,brake:3600,vx:0,x:W/2,y:playerFlightY(),lastDashDir:1,phaseCd:1.4*Math.pow(.95,p.phase),phaseTimer:0,phaseRange:230,dashInvuln:0,
  drones:0,droneDamage:.42,droneAccuracy:.68,droneHomingChance:0,droneHomingStrength:240,droneRate:1,
  bombs:1,bombPower:8,bossDamage:1,eliteDamage:1,bounceChance:0,chainChance:0,
  overdrive:0,overdrivePower:.35,overdriveDuration:8,magnetBoost:0,slow:0,slowDuration:7,
  sectorHullDamage:0,flawlessStreak:0,nearMisses:0,damageTaken:0,
  sectorMod:null,boss:null,bossHistory:[],chosen:[],choicePool:null,missions:[
   {id:'kills',name:'Destroy 25 hostiles',goal:25,val:0,reward:4,done:false},
   {id:'salvage',name:'Collect 250 salvage',goal:250,val:0,reward:5,done:false},
   {id:'sector',name:'Reach Sector 4',goal:4,val:1,reward:6,done:false}
  ]
 }
}
