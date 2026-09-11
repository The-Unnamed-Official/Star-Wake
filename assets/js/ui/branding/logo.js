'use strict';

function logoSvg(cls='logo-mark'){
 return `<svg class="${cls}" viewBox="0 0 120 120" role="img" aria-label="STARWAKE logo">
  <defs>
   <linearGradient id="logoA" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4fbff"/><stop offset=".36" stop-color="#67defe"/><stop offset="1" stop-color="#a57bff"/></linearGradient>
   <linearGradient id="logoB" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#67defe" stop-opacity=".25"/><stop offset="1" stop-color="#a57bff" stop-opacity=".7"/></linearGradient>
  </defs>
  <path d="M60 5 78 40 115 60 78 80 60 115 42 80 5 60 42 40Z" fill="url(#logoB)" stroke="url(#logoA)" stroke-width="4"/>
  <path d="M60 19 68 49 99 60 68 71 60 101 52 71 21 60 52 49Z" fill="url(#logoA)"/>
  <circle cx="60" cy="60" r="13" fill="#06111b" stroke="#f1fbff" stroke-width="2"/>
  <path d="M16 83c23 11 64 11 88 0M24 94c20 8 52 8 72 0M34 103c13 4 39 4 52 0" fill="none" stroke="#67defe" stroke-width="3" stroke-linecap="round" opacity=".6"/>
 </svg>`
}
