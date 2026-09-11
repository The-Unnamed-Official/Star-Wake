'use strict';

/* STARWAKE v0.97 — procedural fake-ad gameplay renderer */

function adRect(c,x,y,w,h,r,fill,stroke=null,lw=2){
 c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=lw;c.stroke()}
}
function adText(c,t,x,y,size,color='#fff',align='center',weight=900){
 c.fillStyle=color;c.font=`${weight} ${size}px system-ui`;c.textAlign=align;c.textBaseline='middle';c.fillText(t,x,y)
}
function adHand(c,x,y,press=0){
 c.save();c.translate(x,y);c.rotate(-.18);c.fillStyle='#ffd6bb';c.strokeStyle='#6b3e32';c.lineWidth=3;
 adRect(c,-16,-8,34,42,15,'#ffd6bb','#6b3e32',3);
 adRect(c,4,-42,13,40,7,'#ffd6bb','#6b3e32',3);
 c.fillStyle='rgba(0,0,0,.16)';c.beginPath();c.arc(10,-21,5+press*2,0,Math.PI*2);c.fill();c.restore()
}
function adPhoneBackground(c,w,h,ad,t){
 const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,ad.accent+'44');g.addColorStop(.5,'#111827');g.addColorStop(1,ad.accent2+'44');c.fillStyle=g;c.fillRect(0,0,w,h);
 for(let i=0;i<28;i++){const x=(i*137+t*18)%w,y=(i*211+t*27)%h;c.fillStyle='rgba(255,255,255,.04)';c.fillRect(x,y,2,2)}
}
function renderRunnerAd(c,ad,t,w,h){
 const cycle=t%9,roadX=w*.18,roadW=w*.64;c.fillStyle='#23334b';c.fillRect(roadX,0,roadW,h);
 for(let i=0;i<10;i++){const y=(i*150+t*190)%h;c.fillStyle='rgba(255,255,255,.12)';c.fillRect(w/2-5,y,10,74)}
 const py=h*.78,px=w/2+Math.sin(t*2.2)*55;
 c.fillStyle='#ffe4c0';c.beginPath();c.arc(px,py-38,22,0,Math.PI*2);c.fill();c.fillStyle='#4e8bff';c.fillRect(px-22,py-18,44,72);
 const gy=h*.36+((cycle*95)%280);[['+80','#72efa5',roadX+roadW*.27],['-50','#ff657b',roadX+roadW*.72]].forEach(([txt,col,gx])=>{adRect(c,gx-70,gy-60,140,120,18,col+'33',col,5);adText(c,txt,gx,gy,34,col)});
 adHand(c,cycle<4?roadX+roadW*.72:roadX+roadW*.27,h*.62,Math.sin(t*8)*.5+.5)
}
function renderPinsAd(c,ad,t,w,h){
 const roomX=w*.13,roomW=w*.74;adRect(c,roomX,h*.20,roomW,h*.56,24,'#26354a','#fff3',4);
 c.fillStyle='#ff6b4a';c.fillRect(roomX,h*.20,roomW*.44,h*.18);for(let i=0;i<14;i++){c.fillStyle=i%2?'#ffcc4d':'#ff8b33';c.beginPath();c.arc(roomX+20+i*25,h*.37,20,0,Math.PI*2);c.fill()}
 c.fillStyle='#59c9ff';c.fillRect(roomX+roomW*.56,h*.20,roomW*.44,h*.18);
 c.fillStyle='#ffe3bf';c.beginPath();c.arc(w/2,h*.66,27,0,Math.PI*2);c.fill();c.fillStyle='#48a36f';c.fillRect(w/2-25,h*.68,50,76);
 const pinY=h*.43;for(let i=0;i<3;i++){c.strokeStyle='#e5edf7';c.lineWidth=12;c.beginPath();c.moveTo(roomX+65+i*(roomW-130)/2,pinY);c.lineTo(roomX+65+i*(roomW-130)/2,pinY+110);c.stroke();c.fillStyle='#dbe7f5';c.beginPath();c.arc(roomX+65+i*(roomW-130)/2,pinY,15,0,Math.PI*2);c.fill()}
 const wrong=roomX+65;adHand(c,wrong+Math.sin(t*3)*10,pinY-70,1)
}
function renderMergeAd(c,ad,t,w,h){
 const startX=w*.18,startY=h*.27,cell=110,gap=20;
 let nums=[2,8,8,16,32,64,2,4,128];
 for(let i=0;i<9;i++){const col=i%3,row=Math.floor(i/3),x=startX+col*(cell+gap),y=startY+row*(cell+gap),n=nums[i];adRect(c,x,y,cell,cell,20,['#24364f','#24554f','#5a3f69'][row],ad.accent+'88',3);adText(c,String(n),x+cell/2,y+cell/2,32,'#fff')}
 const drag=(Math.sin(t*1.4)+1)/2;adHand(c,startX+cell*.5+(cell+gap)*2*drag,startY+cell*.5+(cell+gap)*2,1);
 adText(c,'$ 7,203,991',w/2,h*.17,28,ad.accent)
}
function renderParkingAd(c,ad,t,w,h){
 c.fillStyle='#35455a';c.fillRect(0,h*.18,w,h*.72);
 for(let i=0;i<5;i++){c.strokeStyle='rgba(255,255,255,.45)';c.lineWidth=4;c.strokeRect(75+i*120,h*.30,90,170)}
 c.fillStyle='#72efa5';c.fillRect(w*.72,h*.31,75,145);adText(c,'P',w*.72+38,h*.38,38,'#173624');
 c.save();c.translate(w*.27+Math.sin(t*.7)*120,h*.68-Math.cos(t*.9)*55);c.rotate(t*.5);adRect(c,-34,-58,68,116,18,'#ff657b','#fff',4);c.fillStyle='#bceaff';c.fillRect(-24,-38,48,30);c.restore();
 c.strokeStyle='#ffd36a';c.lineWidth=8;c.setLineDash([16,14]);c.beginPath();c.moveTo(w*.27,h*.68);c.quadraticCurveTo(w*.12,h*.42,w*.82,h*.58);c.stroke();c.setLineDash([]);
 adHand(c,w*.45+Math.sin(t)*110,h*.78,0)
}
function renderBridgeAd(c,ad,t,w,h){
 c.fillStyle='#78c9ff';c.fillRect(0,0,w,h*.55);c.fillStyle='#365936';c.fillRect(0,h*.55,w,h*.45);
 c.fillStyle='#0d2038';c.fillRect(w*.40,h*.55,w*.20,h*.45);
 for(let i=0;i<8;i++){const x=70+i*70;c.fillStyle=i%2?ad.accent:ad.accent2;c.fillRect(x,h*.48,52,18)}
 const x=w*.18+((t%7)/7)*w*.52;c.fillStyle='#ffe0bc';c.beginPath();c.arc(x,h*.45,19,0,Math.PI*2);c.fill();c.fillStyle='#8b5cf6';c.fillRect(x-18,h*.47,36,58);
 for(let i=0;i<3;i++){c.fillStyle='#d89a5a';c.fillRect(x-35+i*25,h*.57+i*16,80,14)}
 adText(c,'3 / 12 PLANKS',w/2,h*.20,28,'#fff')
}
function renderFactoryAd(c,ad,t,w,h){
 c.fillStyle='#1d2938';c.fillRect(0,h*.24,w,h*.58);
 for(let line=0;line<3;line++){const y=h*.37+line*150;c.fillStyle='#4f6478';c.fillRect(40,y,w-80,46);for(let i=0;i<6;i++){const x=60+((i*150+t*90*(line%2?1:-1))%(w-120));c.fillStyle=[ad.accent,ad.accent2,'#ff9b61'][line];c.fillRect(x,y-22,54,44)}}
 adRect(c,w*.12,h*.14,w*.76,76,18,'#09131e','#fff2',3);adText(c,'$ 999,883,442',w/2,h*.18,30,ad.accent);
 const upgrades=[['CONVEYOR ×500',w*.24],['CHAIR +1',w*.70]];upgrades.forEach(([txt,x],i)=>{adRect(c,x-100,h*.77,200,90,18,i?'#ff657b33':'#72efa533',i?'#ff657b':'#72efa5',4);adText(c,txt,x,h*.81,21,i?'#ffb4c0':'#b8ffd0')});adHand(c,w*.70,h*.70,1)
}
function renderFakeAdGameplay(canvas,ad,t){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);adPhoneBackground(c,w,h,ad,t);
 if(ad.kind==='runner')renderRunnerAd(c,ad,t,w,h);
 if(ad.kind==='pins')renderPinsAd(c,ad,t,w,h);
 if(ad.kind==='merge')renderMergeAd(c,ad,t,w,h);
 if(ad.kind==='parking')renderParkingAd(c,ad,t,w,h);
 if(ad.kind==='bridge')renderBridgeAd(c,ad,t,w,h);
 if(ad.kind==='factory')renderFactoryAd(c,ad,t,w,h);
 const caption=ad.captions[Math.min(ad.captions.length-1,Math.floor(t/9.15))];
 c.fillStyle='rgba(0,0,0,.72)';c.fillRect(35,h*.075,w-70,100);adText(c,caption,w/2,h*.12,27,'#fff');
 const pulse=.96+Math.sin(t*4)*.04;adText(c,Math.floor(t%8)<4?'FAIL!':'LEVEL '+(1+Math.floor(t/11)),w/2,h*.91,38,Math.floor(t%8)<4?'#ff657b':'#72efa5');
 c.save();c.translate(w/2,h*.95);c.scale(pulse,pulse);adText(c,'NOOB GAMEPLAY FOOTAGE',0,0,17,'#ffffffaa');c.restore()
}
