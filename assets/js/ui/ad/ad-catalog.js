'use strict';

/* STARWAKE v0.97 — six intentionally terrible 55-second fake gameplay ads */

const REROLL_AD_SECONDS=55;
const REROLL_AD_LIBRARY=[
 {id:'kingdom-climb',kind:'runner',title:'KINGDOM CLIMB 3D',subtitle:'Only geniuses choose the correct gate',icon:'♛',accent:'#ffb43b',accent2:'#ff4d70',store:'4.9 ★ · 98M+ DOWNLOADS',cta:'INSTALL FOR FREE',captions:['BRO PICK +80','WHY DID HE PICK -50??','LEVEL 2 IS IMPOSSIBLE','NO WAY HE MISSED THAT','ONLY 0.03% CAN DO THIS','DOWNLOAD TO PROVE YOU ARE SMART']},
 {id:'pin-panic',kind:'pins',title:'SAVE HIM: PIN PANIC',subtitle:'Pull the correct pin. Please.',icon:'♟',accent:'#7ae8ff',accent2:'#ff745e',store:'Editors Choice* (*not really)',cta:'PLAY NOW',captions:['DO NOT PULL THE LAVA PIN','he pulled the lava pin','TRY AGAIN??','THE WATER IS RIGHT THERE','WHY WOULD YOU DO THAT','CAN YOU SAVE HIM?']},
 {id:'merge-miner',kind:'merge',title:'MERGE MINER EMPIRE',subtitle:'Merge rocks. Become inexplicably rich.',icon:'⛏',accent:'#72efa5',accent2:'#ffd36a',store:'#1 rock merging app somewhere',cta:'GET 9,000 GEMS',captions:['MERGE THE TWO 8s','NO NOT THE 2 AND 64','+$7,000,000 CASH','LEVEL UP YOUR PICKAXE','HE SOLD THE LEGENDARY ROCK','YOU WOULD DO BETTER']},
 {id:'parking-panic',kind:'parking',title:'PARKING MASTER IQ',subtitle:'Draw the line. Avoid literally everything.',icon:'▣',accent:'#a57bff',accent2:'#67defe',store:'Rated E for Extremely Frustrating',cta:'TRY LEVEL 3',captions:['JUST DRAW A STRAIGHT LINE','WHY IS HE GOING THERE','CAR #2 IS RIGHT THERE','99% FAIL THIS LEVEL','THE PARKING SPACE IS EMPTY','CAN YOU FIX THIS?']},
 {id:'bridge-rush',kind:'bridge',title:'BRIDGE RUSH HERO',subtitle:'Collect planks. Somehow still fall.',icon:'═',accent:'#ff9b61',accent2:'#ffd36a',store:'10/10 bridge physics probably',cta:'BUILD BETTER',captions:['TAKE THE BLUE PLANKS','HE WALKED PAST ALL OF THEM','YOU NEED 12 PLANKS','BRO HAS 3','WHY DID HE JUMP','YOU CAN BEAT THIS']},
 {id:'factory-cash',kind:'factory',title:'IDLE FACTORY BILLIONAIRE',subtitle:'Tap upgrade. Number becomes more number.',icon:'⚙',accent:'#67defe',accent2:'#72efa5',store:'$999B fake revenue generated',cta:'CLAIM ×500',captions:['UPGRADE THE CONVEYOR','HE BOUGHT A CHAIR INSTEAD','×500 PROFIT IS RIGHT THERE','MONEY MONEY MONEY','WHY IS THE FACTORY ON FIRE','BECOME A BILLIONAIRE NOW']}
];
let lastRerollAdId=null;
function pickRerollAd(){
 const pool=REROLL_AD_LIBRARY.filter(a=>a.id!==lastRerollAdId);
 const ad=pool[Math.floor(Math.random()*pool.length)]||REROLL_AD_LIBRARY[0];
 lastRerollAdId=ad.id;return ad
}
