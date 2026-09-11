'use strict';

function bossPoly(spokes,outer,inner){
 ctx.beginPath();for(let i=0;i<spokes*2;i++){const a=-Math.PI/2+i*Math.PI/spokes,r=i%2?inner:outer,x=Math.cos(a)*r,y=Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath()
}
function drawBoss(e){
 const d=e.bossDef;if(!d)return;ctx.save();ctx.translate(e.x,e.y);
 const pulse=1+Math.sin(e.phase*1.7+d.seed)*.025;ctx.scale(d.width*pulse,d.height/pulse);ctx.shadowColor=d.color;ctx.shadowBlur=30;ctx.lineWidth=2.2/Math.max(.65,d.width);ctx.strokeStyle=d.color;
 ctx.save();ctx.rotate(e.phase*.10*(d.style%2?1:-1));ctx.fillStyle=d.dark;bossPoly(d.spokes,37,20+d.notch*18);ctx.fill();ctx.stroke();
 ctx.globalAlpha=.72;ctx.strokeStyle=d.accent;ctx.lineWidth=2/Math.max(.6,d.width);
 for(let i=0;i<d.spikes;i++){const a=i*Math.PI*2/d.spikes+d.seed*.001,inner=18,outer=30+d.armLength*23;ctx.beginPath();ctx.moveTo(Math.cos(a)*inner,Math.sin(a)*inner);ctx.lineTo(Math.cos(a)*outer,Math.sin(a)*outer);ctx.stroke()}ctx.restore();
 for(let r=0;r<d.rings;r++){ctx.save();ctx.rotate(e.phase*(.16+r*.05)*(r%2?-1:1)+r*.6);ctx.globalAlpha=.34-r*.05;ctx.strokeStyle=r%2?d.accent:d.color;ctx.beginPath();ctx.ellipse(0,0,26-r*4,16+r*3,0,0,Math.PI*2);ctx.stroke();ctx.restore()}
 ctx.shadowBlur=18;ctx.fillStyle=d.accent;ctx.beginPath();ctx.arc(0,0,7+d.coreSize*12,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f5fbff';ctx.globalAlpha=.92;ctx.beginPath();ctx.arc(-2,-2,2.5+d.coreSize*2,0,Math.PI*2);ctx.fill();ctx.restore();
 ctx.save();ctx.translate(e.x,e.y);ctx.globalAlpha=.6;ctx.strokeStyle=d.accent;ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,Math.max(e.rx,e.ry)+5+Math.sin(e.phase)*2,0,Math.PI*2);ctx.stroke();ctx.restore()
}
