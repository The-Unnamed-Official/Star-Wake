'use strict';

function initRun(){
 state=createState();stars=Array.from({length:110},()=>({x:Math.random()*W,y:Math.random()*H,s:.4+Math.random()*1.6,a:.12+Math.random()*.5}));
 bullets=[];enemyBullets=[];enemies=[];drops=[];powerups=[];particles=[];rings=[];texts=[];shards=[];confetti=[];logs=[];spawnClock=0;fireClock=0;droneClock=0;screenShake=0;damagePulse=0;
 log('Pilot link ready.');
 renderSide()
}
function log(msg){logs.unshift(msg);logs=logs.slice(0,7);if(sideTab==='build')renderSide()}
function checkAchievements(){for(const [id,name,fn] of achievements)if(!persistent.achievements[id]&&fn()){persistent.achievements[id]=true;persistent.alloy+=3;log(`Achievement: ${name} (+3 Alloy)`)}save()}
