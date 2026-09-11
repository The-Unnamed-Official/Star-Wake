'use strict';

/* ========================= AUDIO ========================= */
let audioCtx=null,sfxBus=null,musicBus=null,compressor=null,noiseBuffer=null;
let musicScheduler=null,musicArmed=false,musicTrackStart=0,musicTrackBar=0,musicGeneration=0;
let musicCurrentTrack='redline',secretTrackActive=false,rotationIndex=0,bossThemeActive=false,bossMusicReturn=null;
const SONG_SECONDS=40;
const REDLINE_BPM=96,REDLINE_BEAT=60/REDLINE_BPM,REDLINE_BARS=16;
const AFTERIMAGE_BPM=96,AFTERIMAGE_BEAT=60/AFTERIMAGE_BPM,AFTERIMAGE_BARS=16;
const MUSIC_TRACKS=Object.create(null);
const MUSIC_ROTATION=['redline','iron-halo','event-horizon','glass-comet','solar-wound','terminal-bloom','blackout-drive','astral-crown'];
const lastSfx={};
function registerMusicTrack(id,meta){MUSIC_TRACKS[id]=Object.assign({id,bpm:96,bars:16,title:id.toUpperCase()},meta)}
function musicTrackMeta(id=musicCurrentTrack){return MUSIC_TRACKS[id]||{id,title:id.toUpperCase(),bpm:96,bars:16,schedule:scheduleRedlineBar}}
function musicTrackTitle(id=musicCurrentTrack){return musicTrackMeta(id).title}


function ensureAudio(){
 try{
  if(!audioCtx){
   audioCtx=new (window.AudioContext||window.webkitAudioContext)();
   compressor=audioCtx.createDynamicsCompressor();
   compressor.threshold.value=-10;compressor.knee.value=18;compressor.ratio.value=2.6;
   compressor.attack.value=.008;compressor.release.value=.24;
   compressor.connect(audioCtx.destination);
   sfxBus=audioCtx.createGain();sfxBus.gain.value=persistent.settings.sound?persistent.settings.sfxVolume:0;sfxBus.connect(compressor);
   musicBus=audioCtx.createGain();musicBus.gain.value=0;musicBus.connect(compressor);
   noiseBuffer=audioCtx.createBuffer(1,Math.ceil(audioCtx.sampleRate*.5),audioCtx.sampleRate);
   const d=noiseBuffer.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  }
  return true;
 }catch{return false}
}
let audioUnlocked=false,audioUnlocking=false;
async function unlockAudioAndStartMenu(){
 if(audioUnlocked||audioUnlocking)return;
 audioUnlocking=true;
 if(!ensureAudio()){audioUnlocking=false;return}
 try{
  if(audioCtx.state==='suspended')await audioCtx.resume();
  audioUnlocked=audioCtx.state==='running';
 }catch{}
 audioUnlocking=false;
 if(audioUnlocked)startSoundtrack(0);
}

const midi=n=>440*Math.pow(2,(n-69)/12);
function tone(bus,freq,dur,vol,type='square',start=0,pan=0,endFreq=null){
 if(!audioCtx||!bus)return;
 const t=audioCtx.currentTime+Math.max(0,start),o=audioCtx.createOscillator(),g=audioCtx.createGain(),p=audioCtx.createStereoPanner?audioCtx.createStereoPanner():null;
 o.type=type;o.frequency.setValueAtTime(Math.max(20,freq),t);if(endFreq)o.frequency.exponentialRampToValueAtTime(Math.max(20,endFreq),t+dur);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,vol),t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
 if(p){p.pan.value=Math.max(-1,Math.min(1,pan));o.connect(g);g.connect(p);p.connect(bus)}else{o.connect(g);g.connect(bus)}
 o.start(t);o.stop(t+dur+.025)
}
function noise(bus,dur,vol,freq=1200,type='bandpass',start=0,pan=0){
 if(!audioCtx||!bus||!noiseBuffer)return;
 const t=audioCtx.currentTime+Math.max(0,start),s=audioCtx.createBufferSource(),f=audioCtx.createBiquadFilter(),g=audioCtx.createGain(),p=audioCtx.createStereoPanner?audioCtx.createStereoPanner():null;
 s.buffer=noiseBuffer;f.type=type;f.frequency.value=freq;f.Q.value=1.1;
 g.gain.setValueAtTime(Math.max(.0002,vol),t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
 if(p){p.pan.value=Math.max(-1,Math.min(1,pan));s.connect(f);f.connect(g);g.connect(p);p.connect(bus)}else{s.connect(f);f.connect(g);g.connect(bus)}
 s.start(t);s.stop(t+dur+.025)
}
function panFor(x){return x==null?0:Math.max(-1,Math.min(1,(x/Math.max(1,W))*2-1))}
