'use strict';

/* ========================= GAME STATE ========================= */
const achievements=[
 ['first','First Wake',()=>persistent.totalKills>=1],['s5','Into The Wake',()=>persistent.best>=5],['s10','Deep Current',()=>persistent.best>=10],
 ['boss','Breaker',()=>persistent.totalBosses>=1],['k100','Hundred Down',()=>persistent.totalKills>=100],['k1000','Storm Cleaner',()=>persistent.totalKills>=1000],
 ['runs10','One More Run',()=>persistent.totalRuns>=10],['alloy100','Alloy Rich',()=>persistent.alloy>=100]
];
const mods=[
 {name:'CALM CURRENT',desc:'Enemies move slightly slower.',speed:.88},
 {name:'RICH FIELD',desc:'Salvage is worth more.',salvage:1.45},
 {name:'ION HAZE',desc:'Enemy bullets travel slower.',bullet:.78},
 {name:'ELITE SIGNAL',desc:'More elites appear.',elite:1.8},
 {name:'REPAIR CURRENT',desc:'Periodic hull restoration.',repair:true},
 {name:'TRACTOR TIDE',desc:'Pickup range doubled.',magnet:2},
 {name:'OVERCLOCK',desc:'Everything fires faster.',fire:1.18}
];
