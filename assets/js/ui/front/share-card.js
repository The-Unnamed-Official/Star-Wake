'use strict';

function runScore(r){return Math.round(r.sector*180+r.level*95+r.kills*18+r.salvage*1.3+r.bosses*550)}
function paintShare(canvas,r){
 const c=canvas.getContext('2d'),w=1200,h=675;canvas.width=w;canvas.height=h;
 const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#071421');g.addColorStop(.55,'#050a12');g.addColorStop(1,'#160d25');c.fillStyle=g;c.fillRect(0,0,w,h);
 c.fillStyle='rgba(103,222,254,.06)';for(let x=0;x<w;x+=48)c.fillRect(x,0,1,h);for(let y=0;y<h;y+=48)c.fillRect(0,y,w,1);
 c.fillStyle='#67defe';c.font='800 26px system-ui';c.fillText('STARWAKE // v0.96 BETA',64,72);
 c.fillStyle='#f4f9ff';c.font='900 82px system-ui';c.fillText('WAKE ENDED',64,168);
 c.fillStyle='#7890a8';c.font='500 23px system-ui';c.fillText(`Difficulty: ${difficulty[r.diff]?.name||r.diff}   •   Frontier: Sector ${persistent.best}`,68,211);
 c.fillStyle='#ffd36a';c.font='900 112px system-ui';c.fillText(runScore(r).toLocaleString(),64,344);c.fillStyle='#7890a8';c.font='700 21px system-ui';c.fillText('RUN SCORE',70,379);
 [['SECTOR',r.sector],['LEVEL',r.level],['KILLS',r.kills],['SALVAGE',Math.floor(r.salvage)],['BOSSES',r.bosses],['ALLOY BANKED',r.bank]].forEach(([l,v],i)=>{const x=64+(i%3)*260,y=463+Math.floor(i/3)*104;c.fillStyle='rgba(255,255,255,.055)';c.fillRect(x,y-42,225,76);c.fillStyle='#f4f9ff';c.font='900 30px system-ui';c.fillText(String(v),x+15,y-5);c.fillStyle='#7890a8';c.font='700 12px system-ui';c.fillText(l,x+15,y+18)});
 c.save();c.translate(970,330);c.strokeStyle='#67defe';c.fillStyle='rgba(103,222,254,.14)';c.lineWidth=5;
 c.beginPath();for(let i=0;i<8;i++){const a=-Math.PI/2+i*Math.PI/4,r=i%2===0?82:39,x=Math.cos(a)*r,y=Math.sin(a)*r;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath();c.fill();c.stroke();
 c.fillStyle='#f4f9ff';c.beginPath();for(let i=0;i<8;i++){const a=-Math.PI/2+i*Math.PI/4,r=i%2===0?38:17,x=Math.cos(a)*r,y=Math.sin(a)*r;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath();c.fill();
 c.strokeStyle='rgba(103,222,254,.65)';c.lineWidth=4;c.beginPath();c.moveTo(-64,78);c.quadraticCurveTo(0,104,64,78);c.stroke();c.beginPath();c.moveTo(-45,94);c.quadraticCurveTo(0,110,45,94);c.stroke();c.restore();
 c.fillStyle='#f4f9ff';c.font='800 17px system-ui';c.fillText('RIDE THE WAKE',900,526)
}
