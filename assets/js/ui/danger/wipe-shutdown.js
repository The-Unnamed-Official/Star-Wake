'use strict';

function waitMs(ms){return new Promise(r=>setTimeout(r,ms))}
function playStartupChime(){
 if(!audioUnlocked||!audioCtx)return;
 tone(sfxBus,midi(48),.18,.025,'square');tone(sfxBus,midi(60),.18,.024,'triangle',.17);tone(sfxBus,midi(67),.38,.030,'sine',.34);noise(sfxBus,.10,.006,3200,'highpass',.34)
}
async function beginFakeShutdown(){
 stopMusicScheduler();musicVolumeOff();document.body.classList.add('site-failure');
 wipeExperience.innerHTML=`<div class="wipe-grid"></div><div class="wipe-card" style="left:50%;top:50%;transform:translate(-50%,-50%)"><small>FATAL USER DECISION</small><h2>oh no.</h2><p>STARWAKE has encountered an unrecoverable quantity of confirmation.</p></div>`;
 await waitMs(1300);document.body.classList.remove('site-failure');wipeExperience.hidden=true;
 const shut=document.createElement('div');shut.className='shutdown-screen crt';document.body.appendChild(shut);
 await waitMs(1100);shut.classList.remove('crt');shut.innerHTML='';
 resetPersistentSave();diff='normal';secretTrackActive=false;rotationIndex=0;musicCurrentTrack=MUSIC_ROTATION[0];applyAudioSettings();refreshControlHints();
 await waitMs(5000);
 const log=document.createElement('div');log.className='boot-log boot-cursor';shut.appendChild(log);
 const lines=['STARWAKE BOOT ROM 0.96','checking wake core ........ OK','rebuilding navigation map .. OK','clearing pilot archive ..... COMPLETE','restoring audio matrix ..... OK','mounting empty save ........ OK','warning: user learned nothing','launch shell ready.'];
 for(const line of lines){log.textContent+=line+'\n';await waitMs(390)}
 await waitMs(420);playStartupChime();await waitMs(1100);shut.remove();frontLayer.classList.remove('hidden');initRun();
 makeFreshMusicBus(.05);showMain();if(audioUnlocked)startSoundtrack(.15)
}
