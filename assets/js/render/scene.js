'use strict';

function draw(){
 ctx.clearRect(0,0,W,H);ctx.save();if(screenShake&&persistent.settings.shake)ctx.translate((Math.random()-.5)*screenShake,(Math.random()-.5)*screenShake);
 // background
 for(let i=0;i<5;i++){const x=W*(i+1)/6;ctx.strokeStyle='rgba(103,222,254,.035)';ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
 for(const s of stars){ctx.fillStyle=`rgba(225,244,255,${s.a})`;ctx.fillRect(s.x,s.y,s.s,s.s*2)}
 for(const b of bullets){
  const color=b.crit?'#ffd36a':b.drone?'#a57bff':'#67defe',ang=Math.atan2(b.vy,b.vx)+Math.PI/2,len=11+b.size*1.5,wid=2.2+b.size*.45;
  ctx.save();ctx.translate(b.x,b.y);ctx.rotate(ang);ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=b.crit?16:8;
  ctx.beginPath();ctx.moveTo(0,-len);ctx.lineTo(wid,4);ctx.lineTo(0,1);ctx.lineTo(-wid,4);ctx.closePath();ctx.fill();
  ctx.globalAlpha=.36;ctx.fillRect(-wid*.32,3,wid*.64,7+b.size);ctx.restore()
 }
 for(const b of enemyBullets){ctx.fillStyle='#ff8193';ctx.shadowColor='#ff657b';ctx.shadowBlur=9;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}
 for(const d of drops){ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.spin);if(d.kind==='xp'){const pulse=1+Math.sin(performance.now()/130+d.spin)*.10;ctx.scale(pulse,pulse);drawShape(d.shape,d.size,d.color,d.glow);ctx.fillStyle='rgba(255,255,255,.88)';ctx.beginPath();ctx.arc(-d.size*.22,-d.size*.22,Math.max(1.3,d.size*.22),0,Math.PI*2);ctx.fill()}else{ctx.fillStyle='#72efa5';ctx.shadowColor='#baffd4';ctx.shadowBlur=10;ctx.fillRect(-d.size,-d.size,d.size*2,d.size*2)}ctx.restore()}
 for(const p of powerups){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.t*.8);const c=powerColor(p.type);ctx.strokeStyle=c;ctx.fillStyle=c+'25';ctx.shadowColor=c;ctx.shadowBlur=14;ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3,x=Math.cos(a)*11,y=Math.sin(a)*11;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.fill();ctx.stroke();ctx.rotate(-p.t*.8);ctx.fillStyle=c;ctx.shadowBlur=0;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='900 9px system-ui';ctx.fillText({heal:'+',shield:'⬡',overdrive:'⚡',magnet:'⌁',bomb:'✹',slow:'◷'}[p.type],0,1);ctx.restore()}
 for(const e of enemies)drawEnemy(e);
 if(state){for(let i=0;i<state.drones;i++){const a=performance.now()/750+i*Math.PI*2/state.drones,x=state.x+Math.cos(a)*31,y=state.y+Math.sin(a)*18;ctx.fillStyle='#a57bff';ctx.shadowColor='#a57bff';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0}drawPlayer()}
 // vfx
 for(const r of rings){const p=1-r.l/r.d,rad=r.r0+(r.r1-r.r0)*p;ctx.globalAlpha=Math.sin(Math.PI*p)*.9;ctx.strokeStyle=r.color;ctx.lineWidth=r.w;ctx.beginPath();ctx.arc(r.x,r.y,rad,0,Math.PI*2);ctx.stroke()}ctx.globalAlpha=1;
 for(const s of shards){ctx.globalAlpha=Math.max(0,s.l/s.m);ctx.fillStyle=s.color;ctx.fillRect(s.x,s.y,s.size,2)}ctx.globalAlpha=1;
 for(const c of confetti){ctx.globalAlpha=Math.min(1,c.l/.25);ctx.fillStyle=c.c;ctx.fillRect(c.x,c.y,4,3)}ctx.globalAlpha=1;
 for(const t of texts){ctx.globalAlpha=Math.min(1,t.l/.18);ctx.fillStyle=t.color;ctx.shadowColor=t.color;ctx.shadowBlur=10;ctx.textAlign='center';ctx.font=`900 ${t.size}px system-ui`;ctx.fillText(t.t,t.x,t.y)}ctx.globalAlpha=1;ctx.shadowBlur=0;
 if(screenFlash>0){ctx.globalAlpha=screenFlash;ctx.fillStyle=screenFlashColor;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}
 ctx.restore();renderHud()
}
