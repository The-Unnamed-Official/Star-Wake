'use strict';

const settingLabels={music:'MUSIC',sound:'SFX',particles:'PARTICLES',shake:'SCREEN SHAKE',hitFeedback:'HIT FEEDBACK'};
function toggleSetting(k){
 persistent.settings[k]=!persistent.settings[k];
 if(k==='hitFeedback'&&!persistent.settings.hitFeedback){damagePulse=0;if(ui.damageFlash)ui.damageFlash.style.opacity='0'}
 applyAudioSettings();save();showSettings()
}
function setVolume(kind,value){
 const v=Math.max(0,Math.min(1,Number(value)||0));
 if(kind==='music')persistent.settings.musicVolume=v;else persistent.settings.sfxVolume=v;
 applyAudioSettings();save();
 const out=E(kind==='music'?'musicVolumeValue':'sfxVolumeValue');if(out)out.textContent=Math.round(v*100)+'%'
}
function settingsToggleRow(key,title,desc){
 return `<div class="setting-row"><div class="setting-copy"><b>${title}</b><span>${desc}</span></div><button class="setting-toggle ${persistent.settings[key]?'on':''}" data-setting="${key}">${persistent.settings[key]?'ON':'OFF'}</button></div>`
}
function volumeRow(kind,title,desc){
 const v=kind==='music'?persistent.settings.musicVolume:persistent.settings.sfxVolume;
 return `<div class="setting-row"><div class="setting-copy"><b>${title}</b><span>${desc}</span></div><div class="volume-control"><button class="volume-step" data-volume-step="${kind}:-0.05" aria-label="Lower ${title}">−</button><input type="range" min="0" max="1" step="0.01" value="${v}" data-volume="${kind}" aria-label="${title}"><button class="volume-step" data-volume-step="${kind}:0.05" aria-label="Raise ${title}">+</button><span class="volume-value" id="${kind}VolumeValue">${Math.round(v*100)}%</span></div></div>`
}
function showSettings(){
 const controls=Object.entries(CONTROL_LABELS).map(([a,label])=>`<div class="control-bind"><div><b>${label}</b><span>${a==='moveLeft'||a==='moveRight'?'Continuous horizontal movement. Arrow-key presses also set Phase Shift direction.':a==='phase'?'Defensive blink. Keyboard direction uses the last physical ← / → arrow pressed.':a==='nova'?'Use one Nova charge.':a==='pause'?'Pause or resume the run.':'Open run systems.'}</span></div><button class="bind-button" data-remap="${a}">${prettyKey(persistent.controls[a])}</button></div>`).join('');
 const tracks=MUSIC_ROTATION.map(id=>`<span class="soundtrack-chip">${musicTrackTitle(id)}</span>`).join('')+`<span class="soundtrack-chip secret">AfterImage · secret only</span>`;
 showFront(`<div class="front-screen">
  <div class="front-top"><div><h2>Settings</h2><p>Audio, presentation, controls and the catastrophically unnecessary danger zone.</p></div><button class="back-button" data-front="main">BACK</button></div>
  <div class="content-scroll"><div class="settings-grid">
   <section class="settings-section"><h3>Audio</h3><p>The soundtrack now continues through menus and gameplay.</p>${settingsToggleRow('music','Music','Enable the rotating STARWAKE soundtrack.')}${volumeRow('music','Music Volume','Overall soundtrack level.')}${settingsToggleRow('sound','Sound Effects','Weapons, hits, UI and combat audio.')}${volumeRow('sfx','SFX Volume','Overall effects level.')}<div class="soundtrack-list">${tracks}</div></section>
   <section class="settings-section"><h3>Visual Feedback</h3><p>Keep the combat readable without forcing effects you do not want.</p>${settingsToggleRow('particles','Particles','Kill bursts, trails, pickup effects and celebrations.')}${settingsToggleRow('shake','Screen Shake','Camera micro-shake during impacts and major events.')}${settingsToggleRow('hitFeedback','Hit Feedback','Damage counters and the red full-screen hit pulse.')}</section>
   <section class="settings-section wide"><h3>Keyboard Remapping</h3><p>Click any binding, then press the replacement key. Duplicate keys automatically swap. Controller and touch layouts remain standardized so they are always usable.</p><div class="control-grid">${controls}</div><div style="margin-top:8px"><button class="front-action" data-reset-controls>RESET KEYBOARD CONTROLS</button></div></section>
   <section class="settings-section wide danger-zone"><h3>Danger Zone</h3><p>This is not a normal reset button. It is a terrible decision wrapped in far too much ceremony.</p><button class="danger-button" data-wipe-start>WIPE ALL SAVE DATA</button><div class="danger-warning">Deletes Alloy, Hangar upgrades, records, achievements, settings and remapped controls. There is no undo. STARWAKE will make absolutely sure you meant it.</div></section>
  </div></div>
 </div>`,'settings')
}
