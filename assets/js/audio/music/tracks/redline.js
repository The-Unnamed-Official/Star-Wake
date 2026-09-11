'use strict';

/* -------------------- REDLINE: GRAND MIX / 96 BPM --------------------
   40 seconds exactly: 16 bars at 96 BPM.
   Intensity comes from scale, harmony and dynamics rather than speed.
   Arrangement:
   - deep sub + restrained pulse bass
   - wide sustained synth-brass / string-like chords
   - central heroic lead with octave reinforcement
   - sparse high arpeggio for shimmer
   - large kick/snare/tom impacts
   - controlled risers and transitions
   - deliberate quieter spaces so the mix can breathe
----------------------------------------------------------------------- */
function rKick(start,p=1){
 tone(musicBus,92,.18,.058*p,'sine',start,0,38);
 noise(musicBus,.045,.010*p,760,'lowpass',start)
}
function rSnare(start,p=1){
 noise(musicBus,.16,.024*p,1850,'bandpass',start);
 tone(musicBus,162,.10,.008*p,'triangle',start)
}
function rHat(start,open=false,p=1){
 noise(musicBus,open?.16:.045,(open?.008:.0045)*p,6500,'highpass',start)
}
function rImpact(start,p=1){
 tone(musicBus,66,.42,.035*p,'sine',start,0,31);
 tone(musicBus,132,.30,.015*p,'triangle',start,0,70);
 noise(musicBus,.24,.016*p,520,'lowpass',start)
}
function rTom(start,f=118,p=1){tone(musicBus,f,.18,.016*p,'triangle',start,0,f*.60)}
function rRiser(start,dur=1.2,p=1){
 noise(musicBus,dur,.0065*p,2600,'highpass',start);
 tone(musicBus,180,dur,.0045*p,'sawtooth',start,-.4,720);
 tone(musicBus,210,dur,.0045*p,'sawtooth',start,.4,840)
}
function rChord(root,quality,start,dur,vol=.0085,oct=0){
 const notes=quality==='major'?[0,4,7,12]:quality==='sus'?[0,5,7,12]:[0,3,7,12];
 notes.forEach((n,i)=>{
  const pan=[-.58,-.18,.18,.58][i];
  tone(musicBus,midi(root+n+oct),dur,vol*(i===0?.88:1),'triangle',start,pan);
  if(i===1||i===2)tone(musicBus,midi(root+n+oct-12),dur,vol*.34,'sine',start,-pan*.55)
 })
}
function scheduleRedlineBar(bar,delay){
 const B=REDLINE_BEAT;

 // 16-bar harmonic journey. Roots are deliberately low and cinematic.
 const progression=[
  [38,'minor'],[38,'minor'],[34,'major'],[36,'minor'],
  [38,'minor'],[41,'major'],[34,'major'],[36,'sus'],
  [38,'minor'],[43,'minor'],[41,'major'],[36,'minor'],
  [34,'major'],[36,'minor'],[38,'minor'],[38,'minor']
 ];
 const [root,quality]=progression[bar];
 const section=bar<4?0:bar<8?1:bar<12?2:3;

 // Broad sustained harmonic bed. The last ~0.08 beat is left free between bars.
 rChord(root,quality,delay,B*3.90,section>=2?.0095:.0082,12);

 // Deep sub fundamental: long notes, extremely low level.
 tone(musicBus,midi(root-24),B*1.85,.021,'sine',delay,0);
 tone(musicBus,midi(root-24),B*1.65,.018,'sine',delay+B*2.10,0);

 // Pulse bass gives movement without making the composition faster.
 const pulse=[0,0,7,0,12,7,10,7];
 for(let e=0;e<8;e++){
  const accent=e===0||e===4?1.15:1;
  tone(musicBus,midi(root-12+pulse[e]),B*.31,.017*accent,e%2?'square':'sawtooth',delay+e*B/2,e%2?.12:-.12)
 }

 // Main heroic melody — mostly quarter/eighth rhythm, large interval shape.
 const motifs=[
  [74,77,81,86, 84,81,77,74],
  [74,77,82,81, 77,74,72,69],
  [70,74,77,82, 81,77,74,72],
  [72,77,81,84, 82,81,77,74],
  [74,81,86,84, 81,77,79,81],
  [77,81,86,89, 86,84,81,77],
  [70,74,79,82, 81,79,77,74],
  [72,77,82,81, 77,74,72,69],
  [74,77,81,86, 89,86,84,81],
  [79,82,86,91, 89,86,84,82],
  [77,81,84,89, 91,89,86,84],
  [72,77,81,84, 86,84,81,77],
  [70,74,79,82, 86,82,79,77],
  [72,77,81,86, 84,81,79,77],
  [74,81,86,89, 86,84,81,77],
  [86,84,81,77, 74,77,81,74]
 ];
 const lead=motifs[bar];
 for(let e=0;e<8;e++){
  const note=lead[e];
  const at=delay+e*B/2;
  const dur=e===3||e===7?B*.56:B*.39;
  tone(musicBus,midi(note),dur,.0135+(section>=2?.0018:0),'sawtooth',at,e%2?.22:-.22);
  // Quiet octave/triangle reinforcement gives scale without clipping.
  if(section>=1||e%2===0)tone(musicBus,midi(note-12),dur*.95,.0048,'triangle',at,-(e%2?.22:-.22))
 }

 // Sparse shimmer. Only eight notes per bar; much less voice pressure.
 const chordTones=quality==='major'?[0,4,7,12]:quality==='sus'?[0,5,7,12]:[0,3,7,12];
 const arp=[0,2,1,3,2,1,0,2];
 for(let e=0;e<8;e++){
  const octave=section===3&&e>=4?12:0;
  tone(musicBus,midi(root+chordTones[arp[e]]+36+octave),B*.18,.0038,'square',delay+e*B/2,e%2?-.62:.62)
 }

 // Counter-line only in the second half; leaves the intro more open.
 if(section>=2){
  const counter=[root+31,root+34,root+36,root+38];
  for(let q=0;q<4;q++){
   const lift=section===3&&q>=2?12:0;
   tone(musicBus,midi(counter[q]+lift),B*.56,.0055,'sine',delay+q*B+B*.15,q%2?-.48:.48)
  }
 }

 // Grand drums: slower, larger, more intentional.
 rKick(delay,1.10);
 rKick(delay+B*2,1.00);
 rSnare(delay+B,1.00);
 rSnare(delay+B*3,1.08);

 // Additional syncopated kick only after the first section.
 if(section>=1)rKick(delay+B*2.5,.62);

 // Hats stay subtle and never dominate.
 for(let h=0;h<8;h++)rHat(delay+h*B/2,h===7&&bar%2===1,section>=2?1.05:.88);

 // Large transitions, not constant crashes.
 if([0,4,8,12].includes(bar))rImpact(delay,bar===12?1.18:1.0);
 if([3,7,11].includes(bar))rRiser(delay+B*3.0,B*.92,.78);

 // Tom fills make section boundaries feel physical.
 if([3,7,11,15].includes(bar)){
  rTom(delay+B*3.00,142,.82);
  rTom(delay+B*3.30,116,.90);
  rTom(delay+B*3.60,91,1.00)
 }

 // Bar 12 is the biggest lift: wider chord and low octave emphasis.
 if(bar===12){
  rChord(root,quality,delay,B*3.88,.0058,24);
  tone(musicBus,midi(root-36),B*3.6,.010,'sine',delay,0)
 }

 // Final bar releases rather than smashing into the next loop.
 if(bar===15){
  tone(musicBus,midi(74),B*2.8,.010,'triangle',delay+B,.0);
  noise(musicBus,B*.85,.005,4200,'highpass',delay+B*3.0)
 }
}

registerMusicTrack('redline',{title:'Redline',bpm:96,bars:16,schedule:scheduleRedlineBar});
