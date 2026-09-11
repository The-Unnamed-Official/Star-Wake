'use strict';

/*
 v0.97 pressure curve:
 - grows forever
 - avoids exponential brick walls
 - is tuned around the upgrade choices a competent run can reasonably earn
 - never counter-scales to the player's current damage, so strong builds stay strong
*/
function enemyScalingForSector(sector){
 const d=Math.max(0,sector-1),D=difficulty[diff];
 return {
  hp:(1+.082*d+.0046*d*d)*D.hp,
  damage:(1+.038*d+.00145*d*d)*D.damage,
  speed:Math.min(1.72,1+.014*d),
  spawn:Math.max(.30,1.48/(1+.036*d))/D.spawn
 }
}
function bossScalingForSector(sector,def){
 const d=Math.max(0,sector-1),tier=Math.max(1,Math.ceil(sector/5)),D=difficulty[diff],normal=enemyScalingForSector(sector);
 return {
  hp:470*normal.hp*(1+.10*tier)*(def.hpMult||1),
  damage:(18+sector*.45)*(1+.014*d)*(def.damageMult||1)*D.damage,
  move:Math.min(1.48,1+.012*d)*(def.moveMult||1),
  fire:Math.max(.62,1-.010*d)*(def.fireMult||1),
  reward:(1+.12*tier)*(def.rewardMult||1)
 }
}
function spawnIntervalForSector(sector){return enemyScalingForSector(sector).spawn}
