'use strict';

/* -------------------- AFTERIMAGE: original secret track -------------------- */
function aKick(start){tone(musicBus,105,.16,.11,'sine',start,0,42);noise(musicBus,.035,.025,900,'lowpass',start)}
function aSnare(start){noise(musicBus,.12,.045,1800,'bandpass',start);tone(musicBus,180,.08,.015,'triangle',start)}
function aHat(start,open=false){noise(musicBus,open?.12:.045,open?.018:.012,6200,'highpass',start)}
function scheduleAfterimageBar(bar,delay){
 const B=AFTERIMAGE_BEAT;
 const chords=[[45,52,57],[41,48,53],[48,55,60],[43,50,55],[45,52,57],[41,48,53],[50,57,62],[43,50,55],
               [45,52,57],[48,55,60],[41,48,53],[43,50,55],[50,57,62],[48,55,60],[43,50,55],[45,52,57]];
 const lead=[69,72,76,72,69,72,77,76,67,69,72,69,64,67,71,72,69,72,76,81,79,76,72,69,67,71,74,79,76,74,71,67,
             69,72,76,72,77,76,72,69,67,69,72,76,74,72,69,67,74,77,81,79,76,74,72,69,67,71,74,76,72,71,69,64];
 const chord=chords[bar];
 chord.forEach((n,i)=>tone(musicBus,midi(n+12),B*3.7,.010,'triangle',delay,i===0?-.35:i===2?.35:0));
 const bassPattern=[0,0,7,0,0,7,10,7];
 for(let e=0;e<8;e++)tone(musicBus,midi(chord[0]+bassPattern[e]-12),B*.42,.034,'square',delay+e*B/2,(e%2?-.16:.16));
 for(let s=0;s<16;s++){const n=chord[s%3]+24;tone(musicBus,midi(n),B*.18,.008,'square',delay+s*B/4,(s%4<2?-.45:.45))}
 for(let b=0;b<4;b++){aKick(delay+b*B+(b===2?B*.06:0));if(b===1||b===3)aSnare(delay+b*B);aHat(delay+b*B);aHat(delay+b*B+B/2,b===3)}
 for(let q=0;q<4;q++){const idx=bar*4+q,n=lead[idx];tone(musicBus,midi(n),B*.72,.022,idx%8<4?'square':'sawtooth',delay+q*B,(q%2?.28:-.28))}
}

registerMusicTrack('afterimage',{title:'AfterImage',bpm:96,bars:16,schedule:scheduleAfterimageBar,secret:true});
