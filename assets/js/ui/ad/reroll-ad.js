'use strict';

let rerollAdTimer=null;
const REROLL_AD_SECONDS=55;
const REROLL_AD_SCENES=[
 ['AIR 2™','Air. But gamer.','$39.99 per inhalation. Bottle sold separately.'],
 ['SQUARE WATER','Finally: water with corners.','Scientifically less round than competing water.'],
 ['PRO GAMER SPOON','+0.0004% cereal accuracy.','Now with RGB-compatible reflective metal.'],
 ['CLOUD STORAGE BOX','We put a cloud in a box.','Do not open indoors. Legal requested we say that.'],
 ['BANANA+','Subscription fruit.','Peel functionality requires the Premium Peel Pass.'],
 ['CHAIR DLC','Unlock the backrest.','Sitting sold separately in selected regions.'],
 ['INSTANT GRASS','Touch grass from home.','Contains one ethically sourced pixel of lawn.'],
 ['ULTRA FORK X','Four prongs. Zero compromises.','Fork benchmark score: somehow 14,002.'],
 ['NOT A ROCK','It is absolutely a rock.','But this one has a companion app.'],
 ['WAKE COIN','The currency of maybe.','Value has moved 700% while you read this sentence.'],
 ['FINAL AD BOSS','Congratulations. You watched all of this.','We are sorry. Here is your reroll.']
];
function renderRerollAd(elapsed){
 const remain=Math.max(0,REROLL_AD_SECONDS-elapsed),idx=Math.min(REROLL_AD_SCENES.length-1,Math.floor(elapsed/5)),scene=REROLL_AD_SCENES[idx],p=Math.min(1,elapsed/REROLL_AD_SECONDS);
 overlayCard.innerHTML=`<div class="fake-ad">
  <div class="fake-ad-top"><span>STARWAKE VERY REAL AD NETWORK</span><b>AD ${idx+1}/${REROLL_AD_SCENES.length}</b></div>
  <div class="fake-ad-product"><div class="fake-ad-orbit"><span>${['◇','□','✦','◌','△'][idx%5]}</span></div><div><small>SPONSORED BY QUESTIONABLE DECISIONS</small><h2>${scene[0]}</h2><h3>${scene[1]}</h3><p>${scene[2]}</p></div></div>
  <div class="fake-ad-review">★★★★★ <span>“I clicked this because I had zero rerolls.” — verified desperate pilot</span></div>
  <div class="fake-ad-progress"><div style="width:${p*100}%"></div></div>
  <div class="fake-ad-bottom"><span>Reward: +1 reroll</span><b>${remain.toFixed(1)}s</b></div>
 </div>`
}
function startRerollAd(){
 if(!state?.choosing||state.rerolls>0||rerollAdTimer)return;
 const started=performance.now();renderRerollAd(0);
 rerollAdTimer=setInterval(()=>{
  const elapsed=(performance.now()-started)/1000;renderRerollAd(elapsed);
  if(elapsed>=REROLL_AD_SECONDS){
   clearInterval(rerollAdTimer);rerollAdTimer=null;state.rerolls=1;sfx('level');
   overlayCard.innerHTML=`<div class="fake-ad-finish"><small>ADVERTISEMENT SURVIVED</small><h2>YOU ACTUALLY WATCHED IT.</h2><p>Fine. Have the reroll.</p><b>+1 REROLL</b></div>`;
   setTimeout(()=>showUpgrade('Ad survived'),1200)
  }
 },200)
}
