'use strict';

const SAVE_KEY='starwake-v06-save';
const LEGACY_SAVE_KEY='voidrunner-v2-save';
const DEFAULT_CONTROLS={
 moveLeft:'KeyA',moveRight:'KeyD',phase:'Space',nova:'KeyF',pause:'KeyP',build:'KeyQ'
};
const DEFAULT_PERSIST={
 alloy:0,best:1,totalKills:0,totalRuns:0,totalBosses:0,totalSalvage:0,
 perma:{damage:0,hp:0,shield:0,magnet:0,phase:0,luck:0,core:0},
 settings:{
  sound:true,music:true,particles:true,shake:true,hitFeedback:true,
  musicVolume:.17,sfxVolume:.78
 },
 controls:{...DEFAULT_CONTROLS},
 achievements:{}
};
function cloneDefaults(){return JSON.parse(JSON.stringify(DEFAULT_PERSIST))}
let stored={};
try{stored=JSON.parse(localStorage.getItem(SAVE_KEY)||localStorage.getItem(LEGACY_SAVE_KEY)||'{}')}catch{}
const persistent=Object.assign(cloneDefaults(),stored);
persistent.perma=Object.assign({},DEFAULT_PERSIST.perma,persistent.perma||{});
persistent.settings=Object.assign({},DEFAULT_PERSIST.settings,persistent.settings||{});
persistent.controls=Object.assign({},DEFAULT_CONTROLS,persistent.controls||{});
persistent.achievements=persistent.achievements||{};
function save(){
 try{localStorage.setItem(SAVE_KEY,JSON.stringify(persistent))}catch{}
 if(ui?.alloy)ui.alloy.textContent=Math.floor(persistent.alloy)
}
function resetPersistentSave(){
 try{localStorage.removeItem(SAVE_KEY);localStorage.removeItem(LEGACY_SAVE_KEY)}catch{}
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
