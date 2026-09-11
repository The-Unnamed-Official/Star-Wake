'use strict';

/* ========================= SIDE DRAWER ========================= */
function renderSide(){
 document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===sideTab));
 if(!state){sidecontent.innerHTML='';return}
 if(sideTab==='build'){
  const groups={};for(const id of state.chosen){const u=upgrades.find(x=>x.id===id);if(!u)continue;groups[u.family]??={u,n:0};groups[u.family].n++}
  sidecontent.innerHTML=`<div class="side-stats">
   <div class="side-stat"><b>${state.damage.toFixed(1)}</b><span>DAMAGE</span></div><div class="side-stat"><b>${state.fireRate.toFixed(1)}/s</b><span>FIRE RATE</span></div>
   <div class="side-stat"><b>${Math.round(state.aimAccuracy*100)}%</b><span>AIM ACCURACY</span></div><div class="side-stat"><b>${Math.round(state.homingChance*100)}%</b><span>HOMING</span></div>
   <div class="side-stat"><b>${Math.round(state.homingStrength)}</b><span>HOMING POWER</span></div><div class="side-stat"><b>${Math.round(state.droneAccuracy*100)}%</b><span>DRONE AIM</span></div>
   <div class="side-stat"><b>${state.multishot}</b><span>PROJECTILES</span></div><div class="side-stat"><b>${state.drones}</b><span>DRONES</span></div>
   <div class="side-stat"><b>${state.shieldCoreBase.toFixed(1)}s</b><span>CORE REBOOT</span></div><div class="side-stat"><b>${state.nearMisses}</b><span>NEAR MISSES</span></div></div>
   <div class="drawer-section">INSTALLED · ${state.chosen.length}</div><div class="build-list">${Object.values(groups).slice(0,16).map(g=>`<div class="build-item"><div class="build-icon">${g.u.icon}</div><div><h4>${g.u.name}</h4><p>${g.u.desc}</p></div><div class="build-level">×${g.n}</div></div>`).join('')||'<div class="log">No upgrades installed yet.</div>'}</div>
   <div class="drawer-section">EVENT FEED</div><div class="eventlog">${logs.map(x=>`<div class="log">${x}</div>`).join('')}</div>`
 }
 if(sideTab==='missions')sidecontent.innerHTML=`<div class="drawer-section" style="margin-top:0">RUN MISSIONS</div>${state.missions.map(m=>`<div class="mission"><b>${m.name}</b><div>${Math.min(m.goal,Math.floor(m.val))} / ${m.goal} · ${m.reward} Alloy</div><div class="progress"><div style="width:${Math.min(100,m.val/m.goal*100)}%"></div></div></div>`).join('')}<div class="drawer-section">ACHIEVEMENTS</div>${achievements.map(([id,n])=>`<div class="achievement ${persistent.achievements[id]?'done':''}"><h3>${n}</h3><div>${persistent.achievements[id]?'Unlocked':'Locked'}</div></div>`).join('')}`;
 if(sideTab==='hangar')sidecontent.innerHTML=`<div class="drawer-section" style="margin-top:0">PERMANENT HANGAR</div>${hangarRows().map(([id,ic,n,d,b],i)=>{const lv=persistent.perma[id]||0,c=b+lv*Math.ceil(b*.75);return `<button class="side-buy" data-buy="${i}"><h3>${ic} ${n} · Lv.${lv}</h3><div>${d}</div><div style="color:var(--gold)">${c} Alloy</div></button>`}).join('')}`;
 if(sideTab==='stats')sidecontent.innerHTML=`<div class="side-stats"><div class="side-stat"><b>${persistent.best}</b><span>BEST SECTOR</span></div><div class="side-stat"><b>${persistent.totalKills}</b><span>KILLS</span></div><div class="side-stat"><b>${persistent.totalBosses}</b><span>BOSSES</span></div><div class="side-stat"><b>${persistent.totalRuns}</b><span>RUNS</span></div><div class="side-stat"><b>${TOTAL_UPGRADES}</b><span>UPGRADES</span></div><div class="side-stat"><b>${Math.floor(persistent.alloy)}</b><span>ALLOY</span></div></div><div class="drawer-section">CURRENT MODIFIER</div><div class="log">${state.sectorMod?.name||'STANDARD'} · ${state.sectorMod?.desc||'No sector modifier yet.'}</div>`;
 if(sideTab==='settings')sidecontent.innerHTML=renderMidRunSettings()
}
function buyHangar(i){const row=hangarRows()[i];if(!row)return;const [id,ic,n,d,b]=row,lv=persistent.perma[id]||0,c=b+lv*Math.ceil(b*.75);if(persistent.alloy>=c){persistent.alloy-=c;persistent.perma[id]=lv+1;sfx('ui');save();frontScreen==='hangar'?showHangar():renderSide()}}
