'use strict';

/* STARWAKE v0.97 — settings surfaces */

const settingLabels={
 music:'MUSIC',sound:'SFX',particles:'PARTICLES',shake:'SCREEN SHAKE',
 hitFeedback:'HIT FEEDBACK',ignoreGameplayMouse:'IGNORE GAMEPLAY MOUSE'
};

function refreshSettingsSurface(){
 if(!frontLayer.classList.contains('hidden')&&frontScreen==='settings'){showSettings();return}
 if(state&&sideTab==='settings'){renderSide();return}
}

function toggleSetting(k){
 persistent.settings[k]=!persistent.settings[k];
 if(k==='hitFeedback'&&!persistent.settings.hitFeedback){damagePulse=0;if(ui.damageFlash)ui.damageFlash.style.opacity='0'}
 if(k==='ignoreGameplayMouse'&&persistent.settings.ignoreGameplayMouse){
  input.mouseActive=false;
 }
 applyAudioSettings();
 save();
 refreshSettingsSurface()
}

function setVolume(kind,value){
 const v=Math.max(0,Math.min(1,Number(value)||0));
 if(kind==='music')persistent.settings.musicVolume=v;else persistent.settings.sfxVolume=v;
 applyAudioSettings();save();
 document.querySelectorAll(`#${kind}VolumeValue,[data-volume-value="${kind}"]`).forEach(out=>out.textContent=Math.round(v*100)+'%')
}

function settingsToggleRow(key,title,desc){
 return `<div class="setting-row">
  <div class="setting-copy"><b>${title}</b><span>${desc}</span></div>
  <button class="setting-toggle ${persistent.settings[key]?'on':''}" data-setting="${key}" aria-pressed="${persistent.settings[key]}">
   <span class="toggle-track"><i></i></span><strong>${persistent.settings[key]?'ON':'OFF'}</strong>
  </button>
 </div>`
}
function volumeRow(kind,title,desc){
 const v=kind==='music'?persistent.settings.musicVolume:persistent.settings.sfxVolume;
 return `<div class="setting-row volume-row">
  <div class="setting-copy"><b>${title}</b><span>${desc}</span></div>
  <div class="volume-control">
   <button class="volume-step" data-volume-step="${kind}:-0.05" aria-label="Lower ${title}">−</button>
   <input type="range" min="0" max="1" step="0.01" value="${v}" data-volume="${kind}" aria-label="${title}">
   <button class="volume-step" data-volume-step="${kind}:0.05" aria-label="Raise ${title}">+</button>
   <span class="volume-value" id="${kind}VolumeValue" data-volume-value="${kind}">${Math.round(v*100)}%</span>
  </div>
 </div>`
}
function controlDescription(action){
 if(action==='moveLeft'||action==='moveRight')return 'Continuous horizontal movement. Physical arrow presses also set keyboard Phase direction.';
 if(action==='phase')return 'Phase in the most recent active movement direction. Mouse-follow movement is remembered too.';
 if(action==='nova')return 'Spend one Nova charge.';
 if(action==='pause')return 'Pause or resume the run.';
 return 'Open the in-run Build panel.'
}
function controlsMarkup(){
 return Object.entries(CONTROL_LABELS).map(([a,label])=>`<div class="control-bind">
  <div class="control-bind-icon">${a==='moveLeft'?'←':a==='moveRight'?'→':a==='phase'?'»':a==='nova'?'✹':a==='pause'?'Ⅱ':'▦'}</div>
  <div class="control-bind-copy"><b>${label}</b><span>${controlDescription(a)}</span></div>
  <button class="bind-button" data-remap="${a}">${prettyKey(persistent.controls[a])}</button>
 </div>`).join('')
}
function soundtrackMarkup(){
 return MUSIC_ROTATION.map(id=>`<span class="soundtrack-chip">${musicTrackTitle(id)}</span>`).join('')+
  `<span class="soundtrack-chip secret">AfterImage · secret only</span>`
}
function settingsSectionsMarkup(midRun=false){
 return `
  <section class="settings-section">
   <div class="settings-section-title"><span>♫</span><div><h3>Audio</h3><p>Soundtrack and combat mix.</p></div></div>
   ${settingsToggleRow('music','Music','Keep the STARWAKE soundtrack running.')}
   ${volumeRow('music','Music Volume','Overall soundtrack level.')}
   ${settingsToggleRow('sound','Sound Effects','Weapons, UI, impacts and combat audio.')}
   ${volumeRow('sfx','SFX Volume','Overall effects level.')}
   ${midRun?'':`<div class="soundtrack-list">${soundtrackMarkup()}</div>`}
  </section>
  <section class="settings-section">
   <div class="settings-section-title"><span>◉</span><div><h3>Presentation</h3><p>Choose how much combat feedback you want.</p></div></div>
   ${settingsToggleRow('particles','Particles','Kill bursts, trails, pickup effects and celebrations.')}
   ${settingsToggleRow('shake','Screen Shake','Camera micro-shake during impacts and major events.')}
   ${settingsToggleRow('hitFeedback','Hit Feedback','Damage counters and the red full-screen hit pulse.')}
  </section>
  <section class="settings-section wide controls-section">
   <div class="settings-section-title"><span>⌨</span><div><h3>Controls</h3><p>Persistent keyboard remapping and mouse behavior.</p></div></div>
   ${settingsToggleRow('ignoreGameplayMouse','Ignore Gameplay Mouse','Disables mouse steering, left-click Phase and right-click Nova during gameplay. Menus still use the mouse normally.')}
   <div class="control-grid">${controlsMarkup()}</div>
   <div class="settings-actions"><button class="front-action" data-reset-controls>RESET KEYBOARD CONTROLS</button></div>
  </section>
  ${midRun?'':`<section class="settings-section wide danger-zone">
   <div class="settings-section-title"><span>!</span><div><h3>Danger Zone</h3><p>The catastrophically unnecessary save-data section.</p></div></div>
   <button class="danger-button" data-wipe-start>WIPE ALL SAVE DATA</button>
   <div class="danger-warning">Deletes Alloy, Hangar upgrades, records, achievements, settings and remapped controls. There is no undo. STARWAKE will make absolutely sure you meant it.</div>
  </section>`}`
}
function showSettings(){
 showFront(`<div class="front-screen settings-screen">
  <div class="front-top">
   <div><h2>Settings</h2><p>Audio, presentation, controls and save data.</p></div>
   <button class="back-button" data-front="main">BACK</button>
  </div>
  <div class="content-scroll"><div class="settings-grid">${settingsSectionsMarkup(false)}</div></div>
 </div>`,'settings')
}
function renderMidRunSettings(){
 return `<div class="run-settings-intro">
  <small>LIVE SETTINGS</small><b>Changes apply immediately.</b>
  <span>The run stays paused only if you opened Settings from Pause.</span>
 </div>
 <div class="settings-grid in-run">${settingsSectionsMarkup(true)}</div>`
}
