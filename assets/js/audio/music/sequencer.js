'use strict';

function makeFreshMusicBus(fadeOld=.12){
 if(!audioCtx||!compressor)return;
 const old=musicBus;
 if(old){
  const t=audioCtx.currentTime;
  try{old.gain.cancelScheduledValues(t);old.gain.setValueAtTime(old.gain.value,t);old.gain.linearRampToValueAtTime(0,t+fadeOld)}catch{}
 }
 musicBus=audioCtx.createGain();musicBus.gain.value=0;musicBus.connect(compressor)
}
function currentMusicGain(){return persistent.settings.music?Math.max(0,Math.min(1,persistent.settings.musicVolume)) : 0}
function musicVolumeOn(){
 if(!musicBus||!audioCtx)return;
 const t=audioCtx.currentTime,target=currentMusicGain();
 musicBus.gain.cancelScheduledValues(t);musicBus.gain.setValueAtTime(musicBus.gain.value,t);musicBus.gain.linearRampToValueAtTime(target,t+.18)
}
function musicVolumeOff(){
 if(!musicBus||!audioCtx)return;
 const t=audioCtx.currentTime;musicBus.gain.cancelScheduledValues(t);musicBus.gain.setValueAtTime(musicBus.gain.value,t);musicBus.gain.linearRampToValueAtTime(0,t+.18)
}
function applyAudioSettings(){
 if(sfxBus)sfxBus.gain.value=persistent.settings.sound?Math.max(0,Math.min(1,persistent.settings.sfxVolume)):0;
 if(musicBus){const t=audioCtx?.currentTime||0;try{musicBus.gain.cancelScheduledValues(t);musicBus.gain.setValueAtTime(currentMusicGain(),t)}catch{}}
}
function stopMusicScheduler(){if(musicScheduler){clearInterval(musicScheduler);musicScheduler=null}musicArmed=false}
function trackBeat(id=musicCurrentTrack){return 60/musicTrackMeta(id).bpm}
function trackBarSeconds(id=musicCurrentTrack){return trackBeat(id)*4}
function updateSongLabel(){
 const song=frontContent?.querySelector?.('[data-song-toggle]');
 if(song)song.textContent=secretTrackActive?'AFTERIMAGE':musicTrackTitle(musicCurrentTrack).toUpperCase();
 const now=frontContent?.querySelector?.('[data-now-playing]');
 if(now)now.textContent=secretTrackActive?'SECRET TRACK':`ROTATION ${rotationIndex+1}/${MUSIC_ROTATION.length}`
}
function setRotationTrackByIndex(index){
 rotationIndex=(index+MUSIC_ROTATION.length)%MUSIC_ROTATION.length;
 musicCurrentTrack=MUSIC_ROTATION[rotationIndex];updateSongLabel()
}
function advanceRotationTrack(){
 if(secretTrackActive){musicCurrentTrack='afterimage';return}
 setRotationTrackByIndex(rotationIndex+1)
}
function scheduleCurrentBar(delay){
 const meta=musicTrackMeta(musicCurrentTrack);
 if(typeof meta.schedule==='function')meta.schedule(musicTrackBar,delay)
}
function pumpMusic(generation){
 if(!audioCtx||audioCtx.state!=='running'||generation!==musicGeneration||!musicArmed)return;
 const horizon=audioCtx.currentTime+2.25;
 let safety=0;
 while(safety++<4){
  const meta=musicTrackMeta(musicCurrentTrack),barLen=trackBarSeconds(musicCurrentTrack);
  const absoluteStart=musicTrackStart+musicTrackBar*barLen;
  if(absoluteStart>=horizon)break;
  scheduleCurrentBar(Math.max(.01,absoluteStart-audioCtx.currentTime));
  musicTrackBar++;
  if(musicTrackBar>=meta.bars){
   musicTrackStart+=meta.bars*barLen;
   musicTrackBar=0;
   advanceRotationTrack()
  }
 }
}
function startSoundtrack(delaySeconds=0){
 if(!audioUnlocked||!ensureAudio()||audioCtx.state!=='running')return;
 stopMusicScheduler();musicGeneration++;const gen=musicGeneration;
 musicArmed=true;musicTrackBar=0;musicTrackStart=audioCtx.currentTime+Math.max(0,delaySeconds);
 musicVolumeOn();updateSongLabel();pumpMusic(gen);musicScheduler=setInterval(()=>pumpMusic(gen),180)
}
function startMenuMusic(delaySeconds=0){startSoundtrack(delaySeconds)}
function menuMusic(on){
 if(!audioUnlocked||!audioCtx||!musicBus)return;
 if(on){musicVolumeOn();if(!musicArmed)startSoundtrack(0)}else musicVolumeOff()
}
async function activateAfterimage(){
 await unlockAudioAndStartMenu();if(!audioUnlocked)return;
 secretTrackActive=true;musicCurrentTrack='afterimage';stopMusicScheduler();musicGeneration++;makeFreshMusicBus(.18);
 const gen=musicGeneration;musicArmed=true;musicTrackBar=0;musicTrackStart=audioCtx.currentTime+1.0;
 const t=audioCtx.currentTime;musicBus.gain.setValueAtTime(0,t);musicBus.gain.setValueAtTime(0,t+.78);musicBus.gain.linearRampToValueAtTime(currentMusicGain(),t+1.0);
 updateSongLabel();pumpMusic(gen);musicScheduler=setInterval(()=>pumpMusic(gen),180)
}
async function returnToRotation(){
 await unlockAudioAndStartMenu();if(!audioUnlocked)return;
 secretTrackActive=false;setRotationTrackByIndex(rotationIndex);stopMusicScheduler();musicGeneration++;makeFreshMusicBus(.18);
 const gen=musicGeneration;musicArmed=true;musicTrackBar=0;musicTrackStart=audioCtx.currentTime+1.0;
 const t=audioCtx.currentTime;musicBus.gain.setValueAtTime(0,t);musicBus.gain.setValueAtTime(0,t+.78);musicBus.gain.linearRampToValueAtTime(currentMusicGain(),t+1.0);
 pumpMusic(gen);musicScheduler=setInterval(()=>pumpMusic(gen),180)
}
async function restartMenuTrack(track){if(track==='afterimage')return activateAfterimage();return returnToRotation()}
