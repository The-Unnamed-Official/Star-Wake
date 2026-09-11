'use strict';

const upgrades=[];
for(const f of families){
 for(let t=1;t<=10;t++){
  const rarity=t<=3?'common':t<=5?'uncommon':t<=7?'rare':t<=9?'epic':'legendary';
  const info=upgradePresentation(f[0],t),parts=info[0].match(/^(.*?)(\s[+-].*)$/);
  const simpleName=parts?parts[1]:info[0],effectText=parts?parts[2].trim():info[0];
  upgrades.push({id:`${f[0]}_${t}`,family:f[0],name:simpleName,effect:effectText,category:f[2],icon:f[3],tier:t,rarity,
    desc:info[1],apply:s=>f[4](s,t)})
 }
}
const TOTAL_UPGRADES=upgrades.length; // 550
function weightedUpgrade(){
 let total=0;const pool=upgrades.map(u=>{const w=rarityWeight[u.rarity]*(1+state.luck*.05);total+=w;return [u,w]});
 let r=Math.random()*total;for(const [u,w] of pool){r-=w;if(r<=0)return u}return upgrades[0]
}
function randomChoices(){const a=[];while(a.length<3){const u=weightedUpgrade();if(!a.includes(u))a.push(u)}return a}
