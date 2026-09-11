'use strict';

function checkMissions(){for(const m of state.missions){if(m.done)continue;if(m.id==='sector')m.val=Math.max(m.val,state.sector);if(m.val>=m.goal){m.done=true;persistent.alloy+=m.reward;log(`Mission complete: +${m.reward} Alloy`);save()}}}
function updateVfx(dt){
 for(const r of rings)r.l-=dt;for(const t of texts){t.l-=dt;t.y+=t.vy*dt}for(const s of shards){s.l-=dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.vx*=.96;s.vy*=.96}for(const c of confetti){c.l-=dt;c.x+=c.vx*dt;c.y+=c.vy*dt;c.vy+=c.g*dt}
 rings=rings.filter(x=>x.l>0);texts=texts.filter(x=>x.l>0);shards=shards.filter(x=>x.l>0);confetti=confetti.filter(x=>x.l>0);screenFlash=Math.max(0,screenFlash-dt*.9);screenShake=Math.max(0,screenShake-dt*45);
 damagePulse=Math.max(0,damagePulse-dt*.82);ui.damageFlash.style.opacity=persistent.settings.hitFeedback?String(damagePulse):'0'
}
