# STARWAKE v0.97 Beta — Modular Project

STARWAKE is split into small, focused HTML/CSS/JavaScript modules. There is no bundler, framework, npm dependency, or build step.

## Current soundtrack

The soundtrack is continuous: it does **not** stop when leaving the main menu. It keeps playing through gameplay, upgrade screens, pause, death/results, and the front-end screens.

Normal rotation contains eight 40-second coded tracks:

1. Redline
2. Iron Halo
3. Event Horizon
4. Glass Comet
5. Solar Wound
6. Terminal Bloom
7. Blackout Drive
8. Astral Crown

**AfterImage is intentionally excluded from rotation.** It can only be activated by clicking the current song name on the main menu. Activating it shows the secret-track popup and keeps AfterImage looping until the player returns to the regular rotation.

## Settings

The dedicated Settings screen contains:

- Music on/off and music volume
- SFX on/off and SFX volume
- Particles
- Screen shake
- Hit feedback
- Persistent keyboard control remapping
- Optional **Ignore Gameplay Mouse** mode (menus remain mouse-accessible)
- Keyboard binding reset
- A polished **in-run Settings panel** for audio, feedback and controls
- Full save-data Danger Zone

The save wipe is intentionally ridiculous: a warning screen leads into 33 unique confirmation stages with an evasive confirmation button, teleport VFX, a fake website failure, CRT shutdown, five seconds of black, a boot log, startup chime, and then a genuine reset of the local save.

The current save key is `starwake-v097-save`; older STARWAKE/VOIDRUNNER saves are migrated automatically.

## Combat behavior

Normal player and drone projectiles **do not auto-target enemies**. Accuracy upgrades reduce shot drift. Target acquisition only occurs when a projectile actually has Homing, which must be gained through Homing upgrades. Drone Guidance similarly unlocks/increases drone homing rather than making every drone shot auto-aim.

Phase Shift status is presented as a button-like visual in the bottom-right HUD, but it is deliberately non-interactive; it is a status display, not another button.

When mouse steering is enabled, moving toward the mouse also updates the remembered Phase direction. That means both left-click Phase and the remapped Phase key blink toward the direction the ship was most recently following with the mouse.

## Architecture

- `assets/css/core/` — design tokens and global browser/reset rules
- `assets/css/front/` — shell, menus, settings, changelog, save-wipe presentation
- `assets/css/game/` — stage, HUD, drawer, upgrade modal, touch controls
- `assets/css/responsive/` — tablet, phone, and short-display adjustments
- `assets/js/core/` — DOM setup, save/settings, remappable controls, loop, bootstrap
- `assets/js/audio/` — WebAudio context, SFX, soundtrack sequencer, reusable composer
- `assets/js/audio/music/tracks/rotation/` — individual rotation-track definitions
- `assets/js/upgrades/` — 550-upgrade catalog, presentation and selection pool
- `assets/js/game/state/` — run state and progression data
- `assets/js/game/entities/` — enemy/drop/power-up creation
- `assets/js/game/combat/` — firing, Homing targeting, damage and defense
- `assets/js/game/run/` — sector and run flow
- `assets/js/game/update/` — frame simulation
- `assets/js/input/` — keyboard, controller, touch, pointer and UI input
- `assets/js/render/` — scene/player/enemy rendering
- `assets/js/effects/` — VFX helpers
- `assets/js/ui/front/` — main screens, Settings, map, records and results
- `assets/js/ui/danger/` — save-wipe content, chase sequence and fake shutdown


## v0.97 Boss Foundry

- 128 generated boss identities with distinct proportions, silhouettes, movement personalities, stats and projectile patterns.
- Each boss identity has a deterministic 10-second procedural boss theme that loops for that fight, then the normal soundtrack resumes.
- Directional enemy sprites rotate along their actual movement velocity.
- Enemy/boss scaling uses polynomial pressure curves rather than runaway exponential scaling, so strong upgrade choices remain meaningful.
- At 0 rerolls, one of **six** intentionally terrible **fullscreen 55-second procedural fake gameplay ads** can award one free reroll.
- Default keyboard controls:
  - Left / Right Arrow: movement
  - Left Shift: Phase Shift
  - Q: Nova Bomb
  - Z: Pause
  - X: Build
- Physical Left/Right Arrow presses still set keyboard Phase direction independently of remapped movement bindings.
- Mouse-follow, touch and controller movement update Phase direction through their own active movement input.
- The Settings UI is available during a run, and the STARWAKE SVG identity now has multi-layer idle animation.


## v0.97 Fullscreen Ad / UI Polish Pass

- Six randomized 55-second fullscreen fake mobile-game ads: Kingdom Climb 3D, Save Him: Pin Panic, Merge Miner Empire, Parking Master IQ, Bridge Rush Hero, and Idle Factory Billionaire.
- Procedural canvas gameplay footage, bad decisions, fake captions, install CTA, progress and reward presentation.
- In-run Settings tab and header Settings button.
- Ignore Gameplay Mouse option.
- Animated multi-layer SVG logo and improved main-menu/action-button motion.
