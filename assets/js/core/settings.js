'use strict';

const SAVE_KEY='starwake-v097-save';
const LEGACY_SAVE_KEYS=['starwake-v06-save','voidrunner-v2-save'];
const LEGACY_DEFAULT_CONTROLS={
 moveLeft:'KeyA',moveRight:'KeyD',phase:'Space',nova:'KeyF',pause:'KeyP',build:'KeyQ'
};
const DEFAULT_CONTROLS={
 moveLeft:'ArrowLeft',moveRight:'ArrowRight',phase:'ShiftLeft',nova:'KeyQ',pause:'KeyZ',build:'KeyX'
};
const DEFAULT_PERSIST={
 alloy:0,best:1,totalKills:0,totalRuns:0,totalBosses:0,totalSalvage:0,
 perma:{damage:0,hp:0,shield:0,magnet:0,phase:0,luck:0,core:0},
 settings:{
  sound:true,music:true,particles:true,shake:true,hitFeedback:true,ignoreGameplayMouse:false,
  musicVolume:.17,sfxVolume:.78
 },
 controls:{...DEFAULT_CONTROLS},
 achievements:{}
};
function cloneDefaults(){return JSON.parse(JSON.stringify(DEFAULT_PERSIST))}
let stored={};
try{
 let raw=localStorage.getItem(SAVE_KEY);
 if(!raw)for(const key of LEGACY_SAVE_KEYS){raw=localStorage.getItem(key);if(raw)break}
 stored=JSON.parse(raw||'{}')
}catch{}
const persistent=Object.assign(cloneDefaults(),stored);
persistent.perma=Object.assign({},DEFAULT_PERSIST.perma,persistent.perma||{});
persistent.settings=Object.assign({},DEFAULT_PERSIST.settings,persistent.settings||{});
const loadedControls=Object.assign({},persistent.controls||{});
const hadLegacyDefaults=Object.keys(LEGACY_DEFAULT_CONTROLS).every(k=>!loadedControls[k]||loadedControls[k]===LEGACY_DEFAULT_CONTROLS[k]);
persistent.controls=hadLegacyDefaults?Object.assign({},DEFAULT_CONTROLS):Object.assign({},DEFAULT_CONTROLS,loadedControls);
persistent.achievements=persistent.achievements||{};
function save(){
 try{localStorage.setItem(SAVE_KEY,JSON.stringify(persistent))}catch{}
 if(ui?.alloy)ui.alloy.textContent=Math.floor(persistent.alloy)
}
function resetPersistentSave(){
 try{localStorage.removeItem(SAVE_KEY);for(const key of LEGACY_SAVE_KEYS)localStorage.removeItem(key)}catch{}
 const fresh=cloneDefaults();
 for(const key of Object.keys(persistent))delete persistent[key];
 Object.assign(persistent,fresh);
 save()
}

const difficulty={
 chill:{name:'Chill',spawn:.88,hp:.82,damage:.70,reward:.92,desc:'Relaxed opening and a slower threat curve.'},
 normal:{name:'Normal',spawn:1,hp:1,damage:1,reward:1,desc:'The intended escalating grind.'},
 intense:{name:'Intense',spawn:1.16,hp:1.20,damage:1.18,reward:1.28,desc:'Threat ramps quickly, rewards do too.'}
};
let diff='normal',frontScreen='main',lastRun=null,sideTab='build';
