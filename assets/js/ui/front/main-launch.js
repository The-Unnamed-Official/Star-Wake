'use strict';

function showMain(){
 const cleared=Math.max(0,(persistent.best||1)-1);
 showFront(`<div class="menu-layout">
  <section class="menu-left">
   <div class="menu-eyebrow">ARCADE ROGUELITE</div>
   <div class="logo-lockup">${logoSvg()}<div class="logo-word"><span>STAR</span><span>WAKE</span></div></div>
   <p class="menu-subtitle">Ride deeper into an escalating star-current, vacuum physical XP, build increasingly absurd targeting systems, and keep your route alive as long as you can.</p>
   <button class="version-chip" type="button" data-front="changelog">v0.97 BETA · CHANGELOG</button>
   <div class="menu-music"><i class="music-dot"></i><span>SOUNDTRACK:</span><button class="song-name" type="button" data-song-toggle>${secretTrackActive?'AFTERIMAGE':musicTrackTitle(musicCurrentTrack).toUpperCase()}</button><span>· 40 SECOND CHIPTUNE LOOP · <span class="song-secret-note">${secretTrackActive?'secret track active':`rotation ${rotationIndex+1}/${MUSIC_ROTATION.length} · click for secret`}</span></span></div>
   <div class="menu-nav">
    <button class="menu-button primary" data-front="play"><strong>▶ START RUN</strong><span>Configure threat and enter the wake.</span></button>
    <button class="menu-button" data-front="map"><strong>⌁ STAR MAP</strong><span>${cleared} sectors cleared · frontier ${persistent.best||1}</span></button>
    <button class="menu-button" data-front="hangar"><strong>◇ HANGAR</strong><span>Spend Alloy on permanent ship systems.</span></button>
    <button class="menu-button" data-front="records"><strong>▦ RECORDS</strong><span>${TOTAL_UPGRADES} possible run upgrades.</span></button>
    <button class="menu-button" data-front="settings"><strong>⚙ SETTINGS</strong><span>Audio, visuals, controls and save data.</span></button>
   </div>
  </section>
  <aside class="menu-right">
   <div class="menu-stage"><div class="menu-ring"></div>${logoSvg('logo-mark')}</div>
   <div class="menu-record"><div><b>${persistent.best||1}</b><span>BEST SECTOR</span></div><div><b>${persistent.totalKills||0}</b><span>KILLS</span></div><div><b>${Math.floor(persistent.alloy||0)}</b><span>ALLOY</span></div></div>
  </aside>
 </div>`,'main')
}
function showLaunch(){
 showFront(`<div class="front-screen">
  <div class="front-top"><div><h2>Launch Configuration</h2><p>Threat keeps scaling every sector. Pick the pace you want.</p></div><button class="back-button" data-front="main">BACK</button></div>
  <div class="content-scroll"><div class="launch-grid">${Object.entries(difficulty).map(([k,v],i)=>`<button class="launch-card ${diff===k?'selected':''}" data-diff="${i}"><div class="tile-icon">${['○','◇','✦'][i]}</div><h3>${v.name.toUpperCase()}</h3><p>${v.desc}</p><div style="font-size:6px;color:${diff===k?'var(--cyan)':'var(--muted)'}">${diff===k?'SELECTED':'SELECT'}</div></button>`).join('')}</div></div>
  <div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="front-action primary" data-front="launch">LAUNCH ${difficulty[diff].name.toUpperCase()}</button></div>
 </div>`,'play')
}
function chooseDifficulty(i){diff=['chill','normal','intense'][i]||'normal';sfx('ui');showLaunch()}
