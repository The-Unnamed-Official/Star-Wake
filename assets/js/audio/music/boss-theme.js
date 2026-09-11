'use strict';

function bossMusicScale(def){return def.musicMode==='phrygian'?[0,1,3,5,7,8,10,12]:[0,3,5,7,10,12,15,17]}
function scheduleBossThemeBar(def,bar,delay){
 const B=.625,root=def.musicRoot,scale=bossMusicScale(def),seed=def.seed,pick=(i,salt=0)=>scale[Math.floor(bossRand(seed,bar*31+i+salt)*scale.length)%scale.length];
 tone(musicBus,midi(root-24),B*3.72,.020,'sine',delay,0);tone(musicBus,midi(root),B*3.70,.0068,'triangle',delay,-.35);tone(musicBus,midi(root+7),B*3.70,.0064,'triangle',delay,.35);
 for(let e=0;e<8;e++){const n=root-12+(e%2?7:0)+(def.musicPulse===2&&e>=4?12:0);tone(musicBus,midi(n),B*.27,.015,'sawtooth',delay+e*B/2,e%2?.12:-.12)}
 for(let e=0;e<8;e++){const n=root+24+pick(e,71)+(def.musicLead>=3&&e>=4?12:0);tone(musicBus,midi(n),B*.31,.0105,e%3?'square':'sawtooth',delay+e*B/2,e%2?.30:-.30)}
 tone(musicBus,78,B*.28,.036,'sine',delay,0,36);noise(musicBus,.05,.007,650,'lowpass',delay);tone(musicBus,78,B*.28,.032,'sine',delay+B*2,0,36);
 noise(musicBus,.12,.014,1750,'bandpass',delay+B);noise(musicBus,.12,.015,1750,'bandpass',delay+B*3);
 if(bar===0){noise(musicBus,.30,.012,4300,'highpass',delay);tone(musicBus,54,B*.75,.022,'sawtooth',delay,0,32)}
 if(bar===3)for(let i=0;i<3;i++)tone(musicBus,130-i*22,.12,.012+i*.003,'triangle',delay+B*(3+i*.28),0,76-i*12)
}
function startBossTheme(boss){
 if(!boss?.bossDef)return;const def=boss.bossDef,id=`boss-${def.id}`;
 registerMusicTrack(id,{title:`${def.name} // ${def.archetype}`,bpm:96,bars:4,schedule:(bar,delay)=>scheduleBossThemeBar(def,bar,delay)});
 bossMusicReturn={secret:secretTrackActive,rotationIndex,current:musicCurrentTrack};bossThemeActive=true;secretTrackActive=false;musicCurrentTrack=id;
 if(!audioUnlocked||!persistent.settings.music)return;
 stopMusicScheduler();musicGeneration++;makeFreshMusicBus(.12);const gen=musicGeneration;musicArmed=true;musicTrackBar=0;musicTrackStart=audioCtx.currentTime+.15;musicVolumeOn();pumpMusic(gen);musicScheduler=setInterval(()=>pumpMusic(gen),180)
}
function stopBossTheme(){
 if(!bossThemeActive)return;const back=bossMusicReturn;bossThemeActive=false;bossMusicReturn=null;
 if(back?.secret){secretTrackActive=true;musicCurrentTrack='afterimage'}else{secretTrackActive=false;rotationIndex=back?.rotationIndex??rotationIndex;musicCurrentTrack=MUSIC_ROTATION.includes(back?.current)?back.current:MUSIC_ROTATION[rotationIndex]}
 if(!audioUnlocked||!persistent.settings.music)return;
 stopMusicScheduler();musicGeneration++;makeFreshMusicBus(.14);const gen=musicGeneration;musicArmed=true;musicTrackBar=0;musicTrackStart=audioCtx.currentTime+.20;musicVolumeOn();updateSongLabel();pumpMusic(gen);musicScheduler=setInterval(()=>pumpMusic(gen),180)
}
