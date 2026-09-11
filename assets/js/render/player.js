'use strict';

function drawPlayer(){
 const lean=Math.max(-.28,Math.min(.28,state.vx/state.maxSpeed*.26));ctx.save();ctx.translate(state.x,state.y);ctx.rotate(lean);if(state.dashInvuln>0){ctx.globalAlpha=.55;ctx.shadowColor='#67defe';ctx.shadowBlur=28}
 // engines
 const flame=9+Math.random()*5;ctx.fillStyle='#a57bff';ctx.shadowColor='#a57bff';ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(-10,16);ctx.lineTo(-4,16);ctx.lineTo(-7,16+flame);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(10,16);ctx.lineTo(4,16);ctx.lineTo(7,16+flame);ctx.closePath();ctx.fill();
 // wings/body
 ctx.shadowColor='#67defe';ctx.shadowBlur=16;ctx.fillStyle='#174c70';ctx.strokeStyle='#67defe';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,-24);ctx.lineTo(13,-5);ctx.lineTo(22,17);ctx.lineTo(6,10);ctx.lineTo(0,17);ctx.lineTo(-6,10);ctx.lineTo(-22,17);ctx.lineTo(-13,-5);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#dffbff';ctx.beginPath();ctx.moveTo(0,-18);ctx.lineTo(6,3);ctx.lineTo(0,11);ctx.lineTo(-6,3);ctx.closePath();ctx.fill();ctx.fillStyle='#6b91ff';ctx.beginPath();ctx.ellipse(0,-5,4,8,0,0,Math.PI*2);ctx.fill();
 if(state.hp/state.maxHp<=.25){ctx.fillStyle='#ff657b';ctx.shadowColor='#ff657b';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(-12,7,2.3,0,Math.PI*2);ctx.arc(12,7,2.3,0,Math.PI*2);ctx.fill()}
 ctx.restore()
}
