'use strict';

function showSecretTrackToast(){
 let toast=document.querySelector('.secret-toast');
 if(!toast){toast=document.createElement('div');toast.className='secret-toast';document.body.appendChild(toast)}
 toast.innerHTML='<b>AFTERIMAGE</b> — this was the first banger I made with pure code 🔥';
 requestAnimationFrame(()=>toast.classList.add('show'));clearTimeout(toast._timer);toast._timer=setTimeout(()=>toast.classList.remove('show'),3600)
}

frontContent.addEventListener('click',async e=>{
 await unlockAudioAndStartMenu();
 if(audioUnlocked&&!musicArmed)startSoundtrack(0);
 const song=e.target.closest('[data-song-toggle]');
 if(song){
  const note=frontContent.querySelector('.song-secret-note');if(note)note.textContent='switching in 1.0s…';
  if(secretTrackActive)await returnToRotation();else{await activateAfterimage();showSecretTrackToast()}
  updateSongLabel();if(note)setTimeout(()=>{if(note.isConnected)note.textContent=secretTrackActive?'secret track active':`rotation ${rotationIndex+1}/${MUSIC_ROTATION.length} · click for secret`},1000);return
 }
 const ver=e.target.closest('[data-version]');if(ver){showChangelog(ver.dataset.version);return}
 const f=e.target.closest('[data-front]')?.dataset.front;if(f){
  if(f==='main')showMain();if(f==='play')showLaunch();if(f==='map')showMap();if(f==='hangar')showHangar();if(f==='records')showRecords();if(f==='settings')showSettings();if(f==='changelog')showChangelog();if(f==='launch')startRun();if(f==='retry')startRun();if(f==='share')showShare();if(f==='death')showDeath();return
 }
 const d=e.target.closest('[data-diff]');if(d){chooseDifficulty(+d.dataset.diff);return}
 const b=e.target.closest('[data-buy]');if(b){buyHangar(+b.dataset.buy);return}
 const setting=e.target.closest('[data-setting]');if(setting){toggleSetting(setting.dataset.setting);return}
 const volumeStep=e.target.closest('[data-volume-step]');if(volumeStep){const [kind,delta]=volumeStep.dataset.volumeStep.split(':');const current=kind==='music'?persistent.settings.musicVolume:persistent.settings.sfxVolume;setVolume(kind,current+Number(delta));showSettings();return}
 const remap=e.target.closest('[data-remap]');if(remap){beginControlRemap(remap.dataset.remap,remap);return}
 if(e.target.closest('[data-reset-controls]')){resetControlBindings();return}
 if(e.target.closest('[data-wipe-start]')){showWipeWarning();return}
 if(e.target.closest('[data-wipe-confirm]')){startWipeGauntlet();return}
 const sh=e.target.closest('[data-share]')?.dataset.share;if(sh==='copy')copyImage();if(sh==='download')downloadImage();if(sh==='native')nativeShare()
});
frontContent.addEventListener('input',e=>{const slider=e.target.closest('[data-volume]');if(slider)setVolume(slider.dataset.volume,slider.value)});

overlayCard.addEventListener('click',e=>{const c=e.target.closest('[data-choice]');if(c){pickUpgrade(+c.dataset.choice);return}const a=e.target.closest('[data-action]')?.dataset.action;if(a==='reroll')reroll();if(a==='resume')pause();if(a==='main'){state.running=false;state.paused=false;overlay.style.display='none';showMain()}});

document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{sideTab=t.dataset.tab;renderSide()}));
sidecontent.addEventListener('click',e=>{const b=e.target.closest('[data-buy]');if(b)buyHangar(+b.dataset.buy)});
E('runMenuBtn').onclick=openDrawer;E('pauseBtn').onclick=pause;E('drawerClose').onclick=closeDrawer;E('touchBuild').onclick=openDrawer;E('touchPause').onclick=pause;E('touchPhase').onpointerdown=e=>{e.preventDefault();phaseShift()};E('touchBomb').onpointerdown=e=>{e.preventDefault();useBomb()};
