'use strict';

/* STARWAKE v0.97 — animated wake-star identity */

let starwakeLogoSerial=0;
function logoSvg(cls='logo-mark'){
 const n=++starwakeLogoSerial,a=`logoA${n}`,b=`logoB${n}`;
 return `<svg class="${cls} sw-logo" viewBox="0 0 120 120" role="img" aria-label="STARWAKE logo">
  <defs>
   <linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4fbff"/><stop offset=".36" stop-color="#67defe"/><stop offset="1" stop-color="#a57bff"/></linearGradient>
   <linearGradient id="${b}" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#67defe" stop-opacity=".25"/><stop offset="1" stop-color="#a57bff" stop-opacity=".7"/></linearGradient>
  </defs>
  <g class="sw-logo-outer"><path d="M60 5 78 40 115 60 78 80 60 115 42 80 5 60 42 40Z" fill="url(#${b})" stroke="url(#${a})" stroke-width="4"/></g>
  <g class="sw-logo-inner"><path d="M60 19 68 49 99 60 68 71 60 101 52 71 21 60 52 49Z" fill="url(#${a})"/></g>
  <g class="sw-logo-core"><circle cx="60" cy="60" r="13" fill="#06111b" stroke="#f1fbff" stroke-width="2"/><circle class="sw-logo-core-dot" cx="60" cy="60" r="4" fill="#67defe"/></g>
  <g class="sw-logo-wake">
   <path class="sw-logo-wave wave-a" d="M16 83c23 11 64 11 88 0" fill="none" stroke="#67defe" stroke-width="3" stroke-linecap="round" opacity=".62"/>
   <path class="sw-logo-wave wave-b" d="M24 94c20 8 52 8 72 0" fill="none" stroke="#67defe" stroke-width="3" stroke-linecap="round" opacity=".50"/>
   <path class="sw-logo-wave wave-c" d="M34 103c13 4 39 4 52 0" fill="none" stroke="#67defe" stroke-width="3" stroke-linecap="round" opacity=".38"/>
  </g>
 </svg>`
}
