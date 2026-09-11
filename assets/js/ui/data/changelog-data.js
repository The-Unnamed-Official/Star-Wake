'use strict';

const CHANGELOG=[
 {v:'0.97',title:'Boss Foundry',date:'Current beta',intro:'Bosses, directional readability and encounter variety received a major expansion.',items:[
  ['128 boss identities','Boss sectors now pick from 128 procedural silhouettes, including wide slow gates, chunky citadels, slim high-speed needles and many hybrids.'],
  ['Unique boss themes','Every boss identity derives its own 10-second looping battle motif and temporarily takes over the soundtrack during the encounter.'],
  ['Directional enemies','Arrow-shaped contacts now rotate along their real movement vector instead of visually pointing the wrong way.'],
  ['Endless pressure curve','Enemy hull, damage and spawn pressure continue scaling through later sectors with polynomial curves tuned around attainable upgrade growth.'],
  ['Fullscreen ad disasters','At zero rerolls, one of six 55-second fullscreen fake mobile-gameplay ads takes over the entire display before awarding a reroll.'],
  ['Phase direction rules','Arrow keys, controller/touch steering and mouse-follow movement all feed the most recent Phase direction; remapped movement keys remain independent of the physical arrow-key memory.'],
  ['Ignore gameplay mouse','Controls now include an option to disable mouse steering and mouse combat buttons while leaving menu mouse input untouched.'],
  ['Live settings','Audio, presentation and remapping controls are now directly accessible during a run.'],
  ['Animated identity','The STARWAKE SVG emblem now animates its star layers, core and wake lines independently, with improved menu button motion.'],
  ['New defaults','Movement defaults to arrow keys, Phase to Left Shift, Nova to Q, Pause to Z and Build to X.']
 ]},
 {v:'0.96',title:'Identity / Arsenal Readability',date:'Beta',intro:'A presentation, targeting and identity overhaul.',items:[
  ['New STARWAKE identity','A fully redrawn wake-star logo and a deeper interface treatment across the front end and run HUD.'],
  ['Readable upgrades','Upgrade cards now say exactly what changes, show the numeric increase, tier and a short explanation.'],
  ['Weapon accuracy','Normal shots now fly straight with controllable drift; target acquisition only happens through Homing upgrades.'],
  ['Directional projectiles','Bullets visibly point along their actual velocity, including homing turns.'],
  ['Soundtrack rotation','REDLINE plus seven new 40-second coded tracks rotate continuously through menus and gameplay. AFTERIMAGE remains secret-only.'],
  ['Combat HUD dock','Hull, shield, XP, bombs, rerolls, combo and the button-like Phase status now live in a deliberate bottom HUD away from the ship.'],
  ['Settings & controls','Dedicated settings, volume controls and persistent keyboard remapping were added.'],
  ['Danger Zone','Save wiping now requires surviving an intentionally ridiculous 33-stage confirmation gauntlet and fake reboot.']
 ]},
 {v:'0.7',title:'Shield Core',date:'Beta',intro:'Survivability received a proper subsystem model.',items:[
  ['Core reboot','A depleted shield core requires 10 seconds to restart.'],
  ['Hit feedback','Damage numbers, red impact vignette and optional micro-shake.'],
  ['Enemy ranks','Veteran and Apex contacts appear deeper into a run.'],
  ['Skill rewards','Near misses and flawless sectors reward cleaner play.']
 ]},
 {v:'0.6',title:'STARWAKE',date:'Beta',intro:'The game became STARWAKE and gained its actual front end.',items:[
  ['Main menu','Launch, hangar, records and star-map screens.'],
  ['Star map','Persistent visual route of cleared sectors and your current frontier.'],
  ['Share card','Death results can be rendered into a 1200×675 score image.'],
  ['Input expansion','Keyboard, mouse, touch and standard browser gamepads all supported.']
 ]},
 {v:'0.5',title:'Control Rewrite',date:'Beta',intro:'Movement stopped being lane based.',items:[
  ['Free movement','Full continuous horizontal control replaced the old five positions.'],
  ['Phase Shift','The former dash became a defensive horizontal blink.'],
  ['Crit feedback','Critical fire and hit events received separate audio and VFX.'],
  ['Spatial audio','Combat events use stronger stereo directionality.']
 ]},
 {v:'0.4',title:'Physical XP',date:'Prototype',intro:'Experience became something you physically collect.',items:[
  ['XP orbs','Kills drop XP instead of granting it instantly.'],
  ['Visual value','Stronger enemies drop larger and more distinctive XP models.'],
  ['Loot split','Green salvage and XP are visually and mechanically separate.']
 ]},
 {v:'0.3',title:'Juice Pass',date:'Prototype',intro:'Combat began receiving presentation and feel.',items:[
  ['Death VFX','Enemy, elite and boss kills received dedicated destruction effects.'],
  ['Celebrations','Level-up and sector-clear sequences were added.'],
  ['Upgrade VFX','Install effects communicate rarity and progression.']
 ]},
 {v:'0.2',title:'Systems Expansion',date:'Prototype',intro:'The small arcade prototype became a roguelite.',items:[
  ['Bosses and variants','Multiple enemy archetypes, bosses, modifiers and power-ups.'],
  ['Persistent hangar','Alloy and permanent progression were added.'],
  ['Missions','Run objectives and achievements created additional goals.']
 ]},
 {v:'0.1',title:'First Wake',date:'Prototype',intro:'The first playable vertical slice.',items:[
  ['Core loop','Move, auto-fire, destroy contacts and advance sectors.'],
  ['Runs','Death, restart and escalating sector pressure established the base loop.']
 ]}
];
