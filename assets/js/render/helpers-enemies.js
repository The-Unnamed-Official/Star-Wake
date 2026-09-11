'use strict';

/* ========================= DRAW ========================= */
function powerColor(t){return {heal:'#72efa5',shield:'#67defe',overdrive:'#ffd36a',magnet:'#a57bff',bomb:'#ff9b61',slow:'#91d8ff'}[t]||'#fff'}
function drawShape(shape,size,color,glow){
 ctx.fillStyle=color;ctx.shadowColor=glow||color;ctx.shadowBlur=16;ctx.beginPath();
 if(shape==='star'){for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?size*.45:size,x=Math.cos(a)*r,y=Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath()}
 else if(shape==='hex'){for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3,x=Math.cos(a)*size,y=Math.sin(a)*size;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath()}
 else if(shape==='diamond'){ctx.moveTo(0,-size);ctx.lineTo(size*.8,0);ctx.lineTo(0,size);ctx.lineTo(-size*.8,0);ctx.closePath()}
 else if(shape==='triangle'){ctx.moveTo(0,-size);ctx.lineTo(size*.9,size*.75);ctx.lineTo(-size*.9,size*.75);ctx.closePath()}
 else ctx.arc(0,0,size,0,Math.PI*2);
 ctx.fill();ctx.shadowBlur=0
}
function drawEnemy(e){
 ctx.save();ctx.translate(e.x,e.y);ctx.shadowColor=e.color;ctx.shadowBlur=e.type==='boss'?30:e.type==='elite'?19:10;ctx.strokeStyle=e.color;ctx.fillStyle=e.color;ctx.lineWidth=2;
 if(e.rank==='veteran'){ctx.save();ctx.strokeStyle='#ffd36a';ctx.globalAlpha=.58;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(0,0,e.r+7,0,Math.PI*2);ctx.stroke();ctx.restore()}
 if(e.rank==='apex'){ctx.save();ctx.strokeStyle='#ff657b';ctx.globalAlpha=.82;ctx.lineWidth=2.2;ctx.beginPath();ctx.arc(0,0,e.r+9,0,Math.PI*2);ctx.stroke();ctx.rotate(e.phase*.4);ctx.strokeRect(-e.r-7,-e.r-7,(e.r+7)*2,(e.r+7)*2);ctx.restore()}
 if(e.type==='boss'){ctx.rotate(e.phase*.15);ctx.fillStyle='rgba(255,155,97,.16)';ctx.beginPath();for(let i=0;i<12;i++){const a=i*Math.PI/6,r=i%2?30:42,x=Math.cos(a)*r,y=Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#ffd3b8';ctx.beginPath();ctx.arc(0,0,12,0,Math.PI*2);ctx.fill()}
 else if(e.type==='tank'||e.type==='shielded'){ctx.fillStyle=e.type==='shielded'?'rgba(104,230,210,.14)':'rgba(255,155,97,.14)';ctx.beginPath();ctx.roundRect(-e.r,-e.r,e.r*2,e.r*2,5);ctx.fill();ctx.stroke();ctx.fillStyle=e.color;ctx.fillRect(-5,-5,10,10);if(e.type==='shielded'){ctx.beginPath();ctx.arc(0,0,e.r+5,0,Math.PI*2);ctx.stroke()}}
 else if(e.type==='sniper'){ctx.fillStyle='rgba(121,168,255,.16)';ctx.beginPath();ctx.moveTo(0,-e.r);ctx.lineTo(e.r*.65,e.r);ctx.lineTo(0,e.r*.55);ctx.lineTo(-e.r*.65,e.r);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#d8e4ff';ctx.fillRect(-2,-e.r,4,e.r*1.2)}
 else if(e.type==='charger'){ctx.fillStyle='rgba(255,123,142,.14)';ctx.beginPath();ctx.moveTo(0,-e.r-4);ctx.lineTo(e.r,e.r);ctx.lineTo(0,e.r*.45);ctx.lineTo(-e.r,e.r);ctx.closePath();ctx.fill();ctx.stroke()}
 else if(e.type==='zigzag'){ctx.fillStyle='rgba(255,211,106,.14)';ctx.beginPath();ctx.moveTo(0,-e.r);ctx.lineTo(e.r,0);ctx.lineTo(0,e.r);ctx.lineTo(-e.r,0);ctx.closePath();ctx.fill();ctx.stroke()}
 else if(e.type==='elite'){ctx.fillStyle='rgba(216,138,255,.14)';ctx.rotate(e.phase*.4);ctx.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3,r=e.r+(i%2?3:0),x=Math.cos(a)*r,y=Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.fill();ctx.stroke()}
 else{ctx.fillStyle=e.type==='swarm'?'rgba(255,179,107,.16)':'rgba(255,101,123,.14)';ctx.beginPath();ctx.moveTo(0,-e.r);ctx.lineTo(e.r,e.r);ctx.lineTo(0,e.r*.45);ctx.lineTo(-e.r,e.r);ctx.closePath();ctx.fill();ctx.stroke()}
 if(e.type!=='boss'){const q=Math.max(0,e.hp/e.maxHp);ctx.shadowBlur=0;ctx.fillStyle='rgba(0,0,0,.55)';ctx.fillRect(-16,e.r+7,32,3);ctx.fillStyle='#72efa5';ctx.fillRect(-16,e.r+7,32*q,3)}
 ctx.restore()
}
