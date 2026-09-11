'use strict';

function showChangelog(version='0.96'){
 const item=CHANGELOG.find(x=>x.v===version)||CHANGELOG[0];
 showFront(`<div class="front-screen">
  <div class="front-top"><div><h2>Changelog</h2><p>STARWAKE build history and major systems introduced in each playable milestone.</p></div><button class="back-button" data-front="main">BACK</button></div>
  <div class="changelog-shell">
   <div class="changelog-list">${CHANGELOG.map(x=>`<button class="change-version ${x.v===item.v?'active':''}" data-version="${x.v}"><b>v${x.v}</b><span>${x.date}</span></button>`).join('')}</div>
   <div class="changelog-detail"><div class="date">VERSION ${item.v} · ${item.date.toUpperCase()}</div><h3>${item.title}</h3><p style="font-size:8px;color:var(--muted);line-height:1.55;margin:0">${item.intro}</p>
    <div class="change-grid">${item.items.map(([h,p])=>`<div class="change-card"><b>${h}</b><p>${p}</p></div>`).join('')}</div>
   </div>
  </div>
 </div>`,'changelog')
}
