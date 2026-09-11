'use strict';

/* ========================= VFX ========================= */
function ring(x,y,color='#67defe',r0=4,r1=45,d=.35,w=2){if(!persistent.settings.particles)return;rings.push({x,y,color,r0,r1,d,l:d,w})}
function floatText(x,y,t,color='#fff',size=11,d=.55){if(!persistent.settings.particles)return;texts.push({x,y,t,color,size,l:d,d,vy:-28})}
function burst(x,y,color='#67defe',n=8,p=100){if(!persistent.settings.particles)return;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=(.4+Math.random()*.7)*p;shards.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:.28+Math.random()*.35,m:.63,color,size:2+Math.random()*3})}}
function celebrate(){for(let i=0;i<34;i++)confetti.push({x:W*.5+(Math.random()-.5)*220,y:H*.28,vx:(Math.random()-.5)*210,vy:-80-Math.random()*150,g:280,l:1.2+Math.random()*.5,c:['#67defe','#a57bff','#72efa5','#ffd36a'][i%4]})}
function flash(color='#67defe',a=.13){screenFlash=Math.max(screenFlash,a);screenFlashColor=color}
function damageNumber(x,y,value,type='hull'){
 if(!persistent.settings.hitFeedback)return;
 texts.push({x,y,t:`-${Math.max(1,Math.ceil(value))} ${type==='shield'?'SHIELD':'HULL'}`,color:type==='shield'?'#67defe':'#ff657b',size:type==='shield'?9:11,l:.72,d:.72,vy:-31})
}
function shieldCoreBreak(){
 if(state.maxShield<=0||state.shieldCoreTimer>0)return;
 state.shield=0;state.shieldCoreTimer=state.shieldCoreBase;state.shieldRechargeTimer=0;state.shieldBreaks++;
 sfx('shieldBreak',{x:state.x});ring(state.x,state.y,'#67defe',8,72,.38,3);ring(state.x,state.y,'#ff657b',8,48,.26,2);burst(state.x,state.y,'#67defe',15,145);
 enemyBullets=enemyBullets.filter(b=>Math.hypot(b.x-state.x,b.y-state.y)>state.shieldBreakRadius);
 floatText(state.x,state.y-37,'SHIELD CORE OFFLINE','#ff657b',11,.85);log(`Shield core offline — rebooting in ${state.shieldCoreBase.toFixed(1)}s.`)
}
function shieldCoreOnline(){
 if(state.maxShield<=0)return;
 state.shield=Math.max(state.shield,Math.max(1,state.maxShield*state.shieldRestartFraction));
 state.shieldRechargeTimer=0;sfx('coreOnline',{x:state.x});ring(state.x,state.y,'#72efa5',7,64,.42,3);burst(state.x,state.y,'#72efa5',10,95);
 floatText(state.x,state.y-34,'SHIELD CORE ONLINE','#72efa5',10,.8);log('Shield core reboot complete.')
}
function critShotVfx(x,y){ring(x,y,'#ffd36a',2,24,.18,1.8);burst(x,y,'#ffd36a',4,65)}
