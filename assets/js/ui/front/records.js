'use strict';

function showRecords(){
 const unlocked=Object.values(persistent.achievements).filter(Boolean).length;
 showFront(`<div class="front-screen"><div class="front-top"><div><h2>Records</h2><p>Lifetime pilot telemetry stored locally.</p></div><button class="back-button" data-front="main">BACK</button></div><div class="content-scroll"><div class="stats-grid">
  <div class="big-stat"><b>${persistent.best}</b><span>BEST SECTOR</span></div><div class="big-stat"><b>${persistent.totalKills}</b><span>TOTAL KILLS</span></div><div class="big-stat"><b>${persistent.totalBosses}</b><span>BOSSES</span></div>
  <div class="big-stat"><b>${persistent.totalRuns}</b><span>RUNS</span></div><div class="big-stat"><b>${Math.floor(persistent.totalSalvage)}</b><span>SALVAGE</span></div><div class="big-stat"><b>${unlocked}/${achievements.length}</b><span>ACHIEVEMENTS</span></div>
 </div><div class="screen-card" style="margin-top:9px"><h3>${TOTAL_UPGRADES} RUN UPGRADES</h3><p>Weapons, aiming accuracy, homing strength, drone aim, drone guidance, movement, defense, sustain, economy, criticals, ordnance, power systems, hunter bonuses and synergies.</p></div></div></div>`,'records')
}
