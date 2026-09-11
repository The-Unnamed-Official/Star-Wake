'use strict';

let state=null;
let stars=[],bullets=[],enemyBullets=[],enemies=[],drops=[],powerups=[],particles=[],rings=[],texts=[],shards=[],confetti=[];
let last=performance.now(),spawnClock=0,fireClock=0,droneClock=0,screenShake=0,screenFlash=0,screenFlashColor='#67defe',damagePulse=0;
let logs=[];
