'use strict';

function makeCinematicTrackScheduler(cfg){
 const B=60/(cfg.bpm||96);
 const qualities={minor:[0,3,7,12],major:[0,4,7,12],sus:[0,5,7,12],power:[0,7,12,19]};
 function kick(at,p=1){tone(musicBus,cfg.kick||88,.19,.050*p,'sine',at,0,36);noise(musicBus,.04,.007*p,720,'lowpass',at)}
 function snare(at,p=1){noise(musicBus,.14,.018*p,cfg.snare||1850,'bandpass',at);tone(musicBus,155,.08,.006*p,'triangle',at)}
 function hat(at,open=false){noise(musicBus,open?.14:.04,open?.006:.0035,cfg.hat||6400,'highpass',at)}
 function impact(at,p=1){tone(musicBus,cfg.impact||62,.40,.027*p,'sine',at,0,29);noise(musicBus,.20,.009*p,500,'lowpass',at)}
 return function scheduleGeneratedBar(bar,delay){
  const prog=cfg.progression[bar%cfg.progression.length],root=prog[0],quality=prog[1]||'minor',tones=qualities[quality]||qualities.minor;
  const section=bar<4?0:bar<8?1:bar<12?2:3;
  // sustained harmonic mass
  tones.forEach((n,i)=>{const pan=[-.58,-.18,.18,.58][i];tone(musicBus,midi(root+n+12),B*3.88,(cfg.chordVol||.0075)*(section>=2?1.08:1),cfg.chordWave||'triangle',delay,pan)});
  // sub + pulse bass
  tone(musicBus,midi(root-24),B*1.82,cfg.subVol||.016,'sine',delay,0);tone(musicBus,midi(root-24),B*1.55,(cfg.subVol||.016)*.85,'sine',delay+B*2.12,0);
  const bass=cfg.bass||[0,0,7,0,12,7,10,7];
  for(let e=0;e<8;e++)tone(musicBus,midi(root-12+bass[e%bass.length]),B*.30,(cfg.bassVol||.014)*(e===0||e===4?1.12:1),cfg.bassWave||'sawtooth',delay+e*B/2,e%2?.12:-.12);
  // lead motif
  const motif=cfg.motifs[bar%cfg.motifs.length];
  for(let e=0;e<8;e++){
   const n=motif[e%motif.length]+(section===3&&cfg.finalLift&&e>=4?12:0),at=delay+e*B/2;
   tone(musicBus,midi(n),B*(e===3||e===7?.54:.38),cfg.leadVol||.0115,cfg.leadWave||'sawtooth',at,e%2?.24:-.24);
   if(section>=1&&cfg.octaveLead!==false)tone(musicBus,midi(n-12),B*.34,(cfg.leadVol||.0115)*.31,'triangle',at,e%2?-.16:.16)
  }
  // restrained sparkle
  const arp=cfg.arp||[0,2,1,3,2,1,0,2];
  for(let e=0;e<8;e++)tone(musicBus,midi(root+tones[arp[e]%tones.length]+36),B*.16,cfg.arpVol||.0029,cfg.arpWave||'square',delay+e*B/2,e%2?-.62:.62);
  // drums
  kick(delay,1.05);kick(delay+B*2,.94);snare(delay+B);snare(delay+B*3,1.04);
  if(section>=1&&cfg.syncKick!==false)kick(delay+B*2.5,.54);
  for(let h=0;h<8;h++)hat(delay+h*B/2,h===7&&bar%2===1);
  if([0,4,8,12].includes(bar))impact(delay,bar===12?1.12:1);
  if([3,7,11,15].includes(bar)){
   const toms=cfg.toms||[138,112,88];
   toms.forEach((f,i)=>tone(musicBus,f,.16,.012+i*.0018,'triangle',delay+B*(3+i*.28),0,f*.62))
  }
  if(cfg.counter&&section>=2){
   for(let q=0;q<4;q++)tone(musicBus,midi(root+cfg.counter[q%cfg.counter.length]+(section===3&&q>=2?12:0)),B*.50,.0045,'sine',delay+q*B+B*.13,q%2?-.45:.45)
  }
 }
}
