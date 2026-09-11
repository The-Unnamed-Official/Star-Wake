'use strict';

function mapSvg(){
 const best=Math.max(1,persistent.best||1),start=best<=18?1:Math.max(1,best-10),end=Math.max(18,Math.min(start+23,best+9)),nodes=[],cols=6;
 for(let n=start;n<=end;n++){const idx=n-start,row=Math.floor(idx/cols),col=idx%cols,zig=row%2===0?col:cols-1-col;nodes.push({n,x:90+zig*142,y:70+row*87,boss:n%5===0})}
 const paths=nodes.slice(1).map((p,i)=>`<line class="map-path ${nodes[i].n<best?'complete':''}" x1="${nodes[i].x}" y1="${nodes[i].y}" x2="${p.x}" y2="${p.y}"/>`).join('');
 const marks=nodes.map(p=>{const s=p.n<best?'completed':p.n===best?'current':'locked',shape=p.boss?`<polygon points="${p.x},${p.y-20} ${p.x+20},${p.y} ${p.x},${p.y+20} ${p.x-20},${p.y}"/>`:`<circle cx="${p.x}" cy="${p.y}" r="18"/>`;return `<g class="map-node ${s} ${p.boss?'boss':''}">${shape}<text x="${p.x}" y="${p.y}">${p.n}</text></g>`}).join('');
 return `<svg class="sector-map" viewBox="0 0 900 430" role="img" aria-label="Sector progression map">${paths}${marks}</svg>`
}
function showMap(){showFront(`<div class="front-screen"><div class="front-top"><div><h2>Star Map</h2><p>Your furthest route through the wake. Boss sectors appear every five.</p></div><button class="back-button" data-front="main">BACK</button></div><div class="screen-card map-card"><div class="map-summary"><b>${Math.max(0,persistent.best-1)}</b><span>SECTORS CLEARED</span></div>${mapSvg()}</div></div>`,'map')}
