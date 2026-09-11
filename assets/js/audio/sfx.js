'use strict';

function sfx(name,data={}){
 if(!persistent.settings.sound||!ensureAudio())return;
 const now=performance.now(),throttle={shot:42,hit:24,kill:35,pickup:46,enemyShot:70}[name]||0;
 if(throttle&&now-(lastSfx[name]||0)<throttle)return;lastSfx[name]=now;
 const p=panFor(data.x);
 if(name==='shot'){tone(sfxBus,300,0.05,.010,'square',0,p,105);tone(sfxBus,720,.025,.004,'triangle',0,p,330)}
 if(name==='critShot'){tone(sfxBus,180,.075,.023,'sawtooth',0,p,72);tone(sfxBus,980,.06,.018,'square',0,p,420);noise(sfxBus,.04,.011,2400,'highpass',0,p)}
 if(name==='hit'){noise(sfxBus,.035,.010,1700,'highpass',0,p);tone(sfxBus,120,.04,.007,'triangle',0,p,68)}
 if(name==='critHit'){tone(sfxBus,860,.09,.021,'sine',0,p,1420);tone(sfxBus,410,.11,.012,'triangle',.01,p,690)}
 if(name==='kill'){noise(sfxBus,.07,.016,850,'bandpass',0,p);tone(sfxBus,data.heavy?180:130,.11,data.heavy?.022:.014,'sawtooth',0,p,48)}
 if(name==='pickup'){tone(sfxBus,680+Math.random()*100,.055,.008,'sine',0,p,980)}
 if(name==='dash'){noise(sfxBus,.13,.02,1600,'bandpass',0,p);tone(sfxBus,105,.16,.028,'sawtooth',0,p,740)}
 if(name==='hurt'){noise(sfxBus,.13,.03,380,'lowpass');tone(sfxBus,100,.18,.032,'sawtooth',0,0,42)}
 if(name==='shield'){tone(sfxBus,520,.12,.025,'sine',0,p,190);noise(sfxBus,.08,.014,2600,'highpass',0,p)}
 if(name==='shieldBreak'){noise(sfxBus,.18,.035,1100,'bandpass',0,p);tone(sfxBus,210,.24,.045,'sawtooth',0,p,48);tone(sfxBus,760,.11,.018,'square',0,p,170)}
 if(name==='coreOnline'){tone(sfxBus,220,.12,.018,'triangle');tone(sfxBus,440,.14,.020,'triangle',.08);tone(sfxBus,720,.20,.023,'sine',.16)}
 if(name==='nearMiss'){tone(sfxBus,920,.045,.007,'sine',0,p,620)}
 if(name==='bomb'){noise(sfxBus,.45,.065,260,'lowpass');tone(sfxBus,82,.55,.075,'sawtooth',0,0,27)}
 if(name==='level'){[330,440,660,880].forEach((f,i)=>tone(sfxBus,f,.16,.015+i*.002,'triangle',i*.07,0))}
 if(name==='upgrade'){const rank={common:0,uncommon:1,rare:2,epic:3,legendary:4}[data.rarity]||0;[0,4,7,12].forEach((n,i)=>tone(sfxBus,midi(62+rank+n),.14,.013+rank*.002,'triangle',i*.055,0))}
 if(name==='sector'){[260,390,590,780].forEach((f,i)=>tone(sfxBus,f,.17,.015+i*.002,'triangle',i*.075,0))}
 if(name==='boss'){tone(sfxBus,76,.42,.05,'sawtooth',0,0,50);tone(sfxBus,112,.42,.04,'sawtooth',.34,0,58)}
 if(name==='death'){noise(sfxBus,.3,.045,430,'lowpass');tone(sfxBus,170,.6,.055,'sawtooth',0,0,38)}
 if(name==='ui'){tone(sfxBus,440,.05,.012,'triangle',0,0,520)}
}
