import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '@/app/providers/AnimationProvider';
import { assets } from '@/experience/data/assets';

gsap.registerPlugin(ScrollTrigger);

export interface ContinuousBackgroundProps {
  className?: string;
}

/**
 * ContinuousBackground establishes the shared, persistent background-environment system.
 *
 * Task 02C Refinements:
 * 1. Party wide-shot brightness & color continuity:
 *    - Stable, environment-specific tonal correction (.env-plate-livingroom img.env-plate-art)
 *      balances living room highlights to bridge hallway entrance and near speakers.
 *    - Harmonized radial atmospheric progression removes sudden linear-gradient jumps or hue flashes.
 * 2. Seamless transition handoffs (C0 continuity):
 *    - Strictly continuous transform and opacity values across all scene boundaries.
 *    - Outgoing plates maintain their exit transforms during adjacent holds, preventing snap on reverse scroll.
 * 3. Individual physical print textures:
 *    - Completely eliminated tiled/repeating textures.
 *    - Embedded art-directed, non-repeating physical print scans into each environment plate
 *      so textures translate, scale, and crossfade in lockstep with the environment.
 *    - Question pause is pure ink-black with zero textures mounted.
 */
export const ContinuousBackground: React.FC<ContinuousBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  // Plate Refs
  const plateBedroomRef = useRef<HTMLDivElement>(null);
  const plateHallwayRef = useRef<HTMLDivElement>(null);
  const plateLivingRoomRef = useRef<HTMLDivElement>(null);
  const plateSpeakersRef = useRef<HTMLDivElement>(null);
  const plateCrowdRef = useRef<HTMLDivElement>(null);
  const plateMessyRef = useRef<HTMLDivElement>(null);
  const plateTidyRef = useRef<HTMLDivElement>(null);

  const { isReducedMotion } = useAnimation();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const bedroom = plateBedroomRef.current;
      const hallway = plateHallwayRef.current;
      const livingRoom = plateLivingRoomRef.current;
      const speakers = plateSpeakersRef.current;
      const crowd = plateCrowdRef.current;
      const messy = plateMessyRef.current;
      const tidy = plateTidyRef.current;
      const atmosphere = atmosphereRef.current;

      if (!bedroom || !hallway || !livingRoom || !speakers || !crowd || !messy || !tidy || !atmosphere) {
        return;
      }

      const setPlate = (
        el: HTMLElement,
        opacity: number,
        transform: string = 'none'
      ) => {
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = transform;
      };

      const setAtmosphere = (bg: string, opacity: number = 1) => {
        atmosphere.style.background = bg;
        atmosphere.style.opacity = opacity.toFixed(2);
      };

      const getScenePositions = () => {
        const getTop = (id: string) => {
          const el = document.querySelector(id);
          if (!el) return 0;
          const anchor = el.closest('.pin-spacer') || el;
          const rect = anchor.getBoundingClientRect();
          return Math.round(rect.top + window.scrollY);
        };

        return {
          scene0: getTop('#scene-0'),
          plan: getTop('#scene-plan'),
          firstDrink: getTop('#scene-first-drink'),
          buzzed: getTop('#scene-buzzed'),
          drunk: getTop('#scene-drunk'),
          partyPeak: getTop('#scene-party-peak'),
          passedOut: getTop('#scene-passed-out'),
          question: getTop('#scene-question'),
          rebuild: getTop('#scene-rebuild'),
          reveal: getTop('#scene-reveal'),
        };
      };

      if (isReducedMotion) {
        const updateReduced = () => {
          const sy = window.scrollY;
          const pos = getScenePositions();

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (sy >= pos.reveal) {
            setPlate(tidy, 0.48);
            setAtmosphere('radial-gradient(circle at 75% 75%, rgba(57, 239, 136, 0.08) 0%, rgba(237, 228, 217, 0.16) 45%, rgba(11, 11, 11, 0.68) 100%)');
          } else if (sy >= pos.rebuild) {
            setPlate(tidy, 0.44);
            setAtmosphere('linear-gradient(180deg, rgba(237, 228, 217, 0.14) 0%, rgba(11, 11, 11, 0.68) 100%)');
          } else if (sy >= pos.question) {
            setAtmosphere('rgba(11, 11, 11, 1)');
          } else if (sy >= pos.passedOut) {
            setPlate(messy, 1.0);
            setAtmosphere('linear-gradient(180deg, rgba(185, 205, 225, 0.16) 0%, rgba(11, 11, 11, 0.72) 100%)');
          } else if (sy >= pos.partyPeak) {
            setPlate(crowd, 1.0);
            setAtmosphere('radial-gradient(circle at 50% 40%, rgba(122, 59, 255, 0.52) 0%, rgba(57, 239, 136, 0.26) 70%, rgba(11, 11, 11, 0.50) 100%)');
          } else if (sy >= pos.drunk) {
            setPlate(speakers, 1.0);
            setAtmosphere('radial-gradient(circle at 50% 45%, rgba(122, 59, 255, 0.42) 0%, rgba(11, 11, 11, 0.68) 100%)');
          } else if (sy >= pos.buzzed) {
            setPlate(livingRoom, 1.0);
            setAtmosphere('radial-gradient(circle at 50% 50%, rgba(122, 59, 255, 0.34) 0%, rgba(11, 11, 11, 0.65) 100%)');
          } else if (sy >= pos.firstDrink) {
            setPlate(hallway, 1.0);
            setAtmosphere('radial-gradient(circle at 50% 50%, rgba(122, 59, 255, 0.28) 0%, rgba(11, 11, 11, 0.62) 100%)');
          } else if (sy >= (pos.scene0 || pos.plan)) {
            setPlate(bedroom, 1.0);
            setAtmosphere('radial-gradient(circle at center, rgba(11, 11, 11, 0.42) 0%, rgba(11, 11, 11, 0.75) 100%)');
          } else {
            setPlate(bedroom, 0);
            setAtmosphere('rgba(11, 11, 11, 1)');
          }
        };

        window.addEventListener('scroll', updateReduced, { passive: true });
        updateReduced();
        return () => window.removeEventListener('scroll', updateReduced);
      }

      let positions = getScenePositions();

      const refreshPositions = () => {
        positions = getScenePositions();
      };

      const updateState = () => {
        const sy = window.scrollY;

        if (sy >= positions.reveal) {
          // ================================================================
          // SCENE 08: THE REVEAL (Persistent tidy morning continues + refines)
          // ================================================================
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight - positions.reveal);
          const p = Math.min(1, Math.max(0, (sy - positions.reveal) / maxScroll));
          const tidyOp = 0.44 + 0.04 * p;
          const tidyScale = 1.0 + 0.02 * p;
          const tidyY = -2 * p;

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0, 'translate(0%, 3%) scale(0.97)');
          setPlate(tidy, tidyOp, `translate(0%, ${tidyY}%) scale(${tidyScale})`);

          setAtmosphere('radial-gradient(circle at 75% 75%, rgba(57, 239, 136, 0.08) 0%, rgba(237, 228, 217, 0.16) 45%, rgba(11, 11, 11, 0.68) 100%)');
        } else if (sy >= positions.rebuild) {
          // ================================================================
          // SCENE 07: REBUILD (Tidy morning reconstructs into place)
          // ================================================================
          const dist = Math.max(1, positions.reveal - positions.rebuild);
          const p = Math.min(1, Math.max(0, (sy - positions.rebuild) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0, 'translate(0%, 3%) scale(0.97)');

          if (p < 0.08) {
            setPlate(tidy, 0, 'translate(0%, 6%) scale(0.96)');
            setAtmosphere('rgba(11, 11, 11, 1)');
          } else {
            const t = Math.min(1, (p - 0.08) / 0.65);
            const tidyOp = 0.44 * t;
            const tidyScale = 0.96 + 0.04 * t;
            const tidyY = 6 * (1 - t);
            setPlate(tidy, tidyOp, `translate(0%, ${tidyY}%) scale(${tidyScale})`);

            const alphaAtm = 0.14 * t;
            setAtmosphere(`linear-gradient(180deg, rgba(237, 228, 217, ${alphaAtm.toFixed(2)}) 0%, rgba(11, 11, 11, 0.68) 100%)`);
          }
        } else if (sy >= positions.question) {
          // ================================================================
          // SCENE 06.5: THE QUESTION (Pivotal graphic pause - pure ink-black field)
          // ================================================================
          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0, 'translate(0%, 3%) scale(0.97)');
          setPlate(tidy, 0, 'translate(0%, 6%) scale(0.96)');

          setAtmosphere('rgba(11, 11, 11, 1)');
        } else if (sy >= positions.passedOut) {
          // ================================================================
          // SCENE 06: PASSED OUT (Cold morning bed stillness -> empties to black)
          // Pacing: ~0.7 vh stillness hold, ~1.05 vh transition to black
          // ================================================================
          const dist = Math.max(1, positions.question - positions.passedOut);
          const p = Math.min(1, Math.max(0, (sy - positions.passedOut) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0, 'translate(0%, 6%) scale(0.92)');
          setPlate(tidy, 0);

          if (p < 0.40) {
            // Beat 1: Cold morning bed stillness hold
            setPlate(messy, 1.0, 'none');
            setAtmosphere('linear-gradient(180deg, rgba(185, 205, 225, 0.16) 0%, rgba(11, 11, 11, 0.72) 100%)');
          } else if (p < 0.88) {
            // Beat 2: Departure & Fade into pure black void
            const t = (p - 0.40) / 0.48;
            const messyOp = Math.max(0, 1 - t);
            const messyScale = 1 - 0.03 * t;
            const messyY = 3 * t;
            setPlate(messy, messyOp, `translate(0%, ${messyY}%) scale(${messyScale})`);

            const alphaAtm = Math.max(0.72, 0.72 + 0.28 * t);
            setAtmosphere(`linear-gradient(180deg, rgba(185, 205, 225, ${(0.16 * (1 - t)).toFixed(2)}) 0%, rgba(11, 11, 11, ${alphaAtm.toFixed(2)}) 100%)`);
          } else {
            // Beat 3: Total blackout void pause before question card appears
            setPlate(messy, 0, 'translate(0%, 3%) scale(0.97)');
            setAtmosphere('rgba(11, 11, 11, 1)');
          }
        } else if (sy >= positions.partyPeak) {
          // ================================================================
          // SCENE 05: PARTY PEAK (Dance floor & sticker arrival synchronization)
          // Beat A (offset <= 30px): Stable base arrival (no stickers yet)
          // Beat B (offset 30-80px): First sticker begins to arrive -> color shift begins
          // Beat C (offset 80-380px): Stickers burst & scale -> background color develops
          // Beat D (offset 380-650px): Composition settles -> full party-peak color hold
          // Collapse (offset 650-850px): Sudden emotional collapse into ink black
          // Blackout (offset 850-1000px): Pure void pause before morning
          // Emergence (offset > 1000px): Cold morning messy emerges
          // ================================================================
          const offset = sy - positions.partyPeak;
          const distPeak = Math.max(1, positions.passedOut - positions.partyPeak);

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0, 'rotate(2deg) scale(1.14)');
          setPlate(tidy, 0);

          if (offset <= 30) {
            // Beat A: Environment arrival hold in stable base color (zero stickers arrived)
            setPlate(crowd, 1.0, 'none');
            setPlate(messy, 0, 'scale(1.02)');
            setAtmosphere('radial-gradient(circle at 50% 45%, rgba(122, 59, 255, 0.42) 0%, rgba(11, 11, 11, 0.68) 100%)');
          } else if (offset <= 380) {
            // Beats B & C: Synchronized with sticker arrival (timeline 0.03 -> 0.38)
            // Color transforms progressively as stickers burst in from edges and settle
            const tSticker = (offset - 30) / 350;
            const alphaP = 0.42 + 0.10 * tSticker;     // 0.42 -> 0.52
            const alphaG = 0.26 * tSticker;            // 0.00 -> 0.26
            const alphaRim = 0.68 - 0.18 * tSticker;   // 0.68 -> 0.50
            const cy = 45 - 5 * tSticker;              // 45% -> 40%

            setPlate(crowd, 1.0, 'none');
            setPlate(messy, 0, 'scale(1.02)');
            setAtmosphere(`radial-gradient(circle at 50% ${cy.toFixed(1)}%, rgba(122, 59, 255, ${alphaP.toFixed(2)}) 0%, rgba(57, 239, 136, ${alphaG.toFixed(2)}) 70%, rgba(11, 11, 11, ${alphaRim.toFixed(2)}) 100%)`);
          } else if (offset <= 650) {
            // Beat D: Final composition settled hold with subtle breathing pulse
            const tPulse = (offset - 380) / 270;
            const pulse = 1.0 + 0.025 * Math.sin(tPulse * Math.PI);
            setPlate(crowd, 1.0, `scale(${pulse})`);
            setPlate(messy, 0, 'scale(1.02)');
            setAtmosphere('radial-gradient(circle at 50% 40%, rgba(122, 59, 255, 0.52) 0%, rgba(57, 239, 136, 0.26) 70%, rgba(11, 11, 11, 0.50) 100%)');
          } else if (offset <= 850) {
            // Sudden emotional rupture / collapse into ink black (timeline 0.65 -> 0.85)
            const t = (offset - 650) / 200;
            const crowdOp = Math.max(0, 1 - t);
            const crowdScale = 1.0 - 0.08 * t;
            const crowdY = 6 * t;
            setPlate(crowd, crowdOp, `translate(0%, ${crowdY}%) scale(${crowdScale})`);
            setPlate(messy, 0, 'scale(1.02)');
            setAtmosphere('rgba(11, 11, 11, 1)');
          } else if (offset <= 1000) {
            // Blackout pause hold in pure void
            setPlate(crowd, 0, 'translate(0%, 6%) scale(0.92)');
            setPlate(messy, 0, 'scale(1.02)');
            setAtmosphere('rgba(11, 11, 11, 1)');
          } else {
            // Cold morning messy emerges beyond pin spacer towards passed out
            const t = Math.min(1, (offset - 1000) / Math.max(1, distPeak - 1000));
            setPlate(crowd, 0, 'translate(0%, 6%) scale(0.92)');
            setPlate(messy, t, `scale(${1.02 - 0.02 * t})`);
            setAtmosphere(`linear-gradient(180deg, rgba(185, 205, 225, ${(0.16 * t).toFixed(2)}) 0%, rgba(11, 11, 11, 0.72) 100%)`);
          }
        } else if (sy >= positions.drunk) {
          // ================================================================
          // SCENE 04: DRUNK (Tight distorted crop -> crowd arrival)
          // Pacing: ~0.5 vh distortion hold, ~1.34 vh transition to crowd
          // ================================================================
          const dist = Math.max(1, positions.partyPeak - positions.drunk);
          const p = Math.min(1, Math.max(0, (sy - positions.drunk) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0, 'translate(-12%, -4%) scale(1.08)');
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (p < 0.28) {
            // Stable hold: tight distorted crop with subtle drunken tilt
            // Starts precisely at 0.0deg and scale 1.04 matching arrival from Buzzed
            const tHold = p / 0.28;
            const rot = 0.0 + 0.8 * tHold;
            const sc = 1.04 + 0.02 * tHold;
            setPlate(speakers, 1.0, `rotate(${rot}deg) scale(${sc})`);
            setPlate(crowd, 0, 'scale(0.94)');
            setAtmosphere('radial-gradient(circle at 50% 45%, rgba(122, 59, 255, 0.42) 0%, rgba(11, 11, 11, 0.68) 100%)');
          } else {
            // Transition: Departure -> Overlap -> Handoff -> Arrival
            const t = (p - 0.28) / 0.72;

            // Speakers spins and fades out smoothly (1.0 -> 0.0)
            const spkOp = Math.max(0, 1 - t * 1.15);
            const spkSc = 1.06 + 0.08 * t;
            const spkRot = 0.8 + 1.2 * t;
            setPlate(speakers, spkOp, `rotate(${spkRot}deg) scale(${spkSc})`);

            // Crowd scales in from 0.94 and reaches exactly scale(1.00) at t = 1.0
            const crowdOp = Math.min(1, t * 1.25);
            const crowdSc = 0.94 + 0.06 * Math.min(1, t);
            setPlate(crowd, crowdOp, `scale(${crowdSc})`);

            // Beat A: Dance-floor background arrives with stable base party color
            // ZERO early color shift: keeps stable purple (0.42) and deep rim (0.68)
            setAtmosphere('radial-gradient(circle at 50% 45%, rgba(122, 59, 255, 0.42) 0%, rgba(11, 11, 11, 0.68) 100%)');
          }
        } else if (sy >= positions.buzzed) {
          // ================================================================
          // SCENE 03: BUZZED (Living room expands -> shifts toward speakers)
          // Pacing: ~0.55 vh hold, ~1.29 vh transition into speakers
          // ================================================================
          const dist = Math.max(1, positions.drunk - positions.buzzed);
          const p = Math.min(1, Math.max(0, (sy - positions.buzzed) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0, 'translate(-18%, 0%) scale(1.06)');
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (p < 0.30) {
            // Stable hold in living room
            setPlate(livingRoom, 1.0, 'none');
            setPlate(speakers, 0, 'rotate(-1.2deg) scale(1.08)');
            setAtmosphere('radial-gradient(circle at 50% 50%, rgba(122, 59, 255, 0.34) 0%, rgba(11, 11, 11, 0.65) 100%)');
          } else {
            // Transition: Departure -> Overlap -> Handoff -> Arrival
            const t = (p - 0.30) / 0.70;

            // Living room shifts left and tilts
            const livOp = Math.max(0, 1 - t * 1.15);
            const livX = -12 * t;
            const livY = -4 * t;
            const livSc = 1 + 0.08 * t;
            setPlate(livingRoom, livOp, `translate(${livX}%, ${livY}%) scale(${livSc})`);

            // Speakers enters from bottom-left angle and arrives cleanly at rotate(0deg) scale(1.04)
            const spkOp = Math.min(1, t * 1.25);
            const spkSc = 1.08 - 0.04 * Math.min(1, t);
            const spkRot = -1.2 * (1 - t);
            setPlate(speakers, spkOp, `rotate(${spkRot}deg) scale(${spkSc})`);

            // Seamless atmosphere evolution into Drunk
            const alphaP = 0.34 + 0.08 * t;
            const cy = 50 - 5 * t;
            setAtmosphere(`radial-gradient(circle at 50% ${cy.toFixed(1)}%, rgba(122, 59, 255, ${alphaP.toFixed(2)}) 0%, rgba(11, 11, 11, 0.68) 100%)`);
          }
        } else if (sy >= positions.firstDrink) {
          // ================================================================
          // SCENE 02: FIRST DRINK (Hallway shifts into living room)
          // Pacing: ~0.55 vh hold, ~1.29 vh transition into living room
          // ================================================================
          const dist = Math.max(1, positions.buzzed - positions.firstDrink);
          const p = Math.min(1, Math.max(0, (sy - positions.firstDrink) / dist));

          setPlate(bedroom, 0, 'translate(-14%, 0%) scale(1.04)');
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (p < 0.30) {
            // Stable hold in party hallway
            setPlate(hallway, 1.0, 'none');
            setPlate(livingRoom, 0, 'translate(6%, 0%) scale(1.06)');
            setAtmosphere('radial-gradient(circle at 50% 50%, rgba(122, 59, 255, 0.28) 0%, rgba(11, 11, 11, 0.62) 100%)');
          } else {
            // Transition: Departure -> Overlap -> Handoff -> Arrival
            const t = (p - 0.30) / 0.70;

            // Hallway moves left and expands
            const halOp = Math.max(0, 1 - t * 1.15);
            const halX = -18 * t;
            const halSc = 1 + 0.06 * t;
            setPlate(hallway, halOp, `translate(${halX}%, 0%) scale(${halSc})`);

            // Living room expands into view from right-center and settles at (0, 0) scale(1)
            const livOp = Math.min(1, t * 1.25);
            const livX = 6 * (1 - t);
            const livSc = 1.06 - 0.06 * Math.min(1, t);
            setPlate(livingRoom, livOp, `translate(${livX}%, 0%) scale(${livSc})`);

            // Seamless atmosphere transition into Buzzed
            const alphaP = 0.28 + 0.06 * t;
            const alphaRim = 0.62 + 0.03 * t;
            setAtmosphere(`radial-gradient(circle at 50% 50%, rgba(122, 59, 255, ${alphaP.toFixed(2)}) 0%, rgba(11, 11, 11, ${alphaRim.toFixed(2)}) 100%)`);
          }
        } else if (sy >= positions.plan) {
          // ================================================================
          // SCENE 01: THE PLAN (Bedroom study calm composition -> shifts to hallway)
          // Pacing: ~0.72 vh hold, ~1.12 vh transition into hallway
          // ================================================================
          const dist = Math.max(1, positions.firstDrink - positions.plan);
          const p = Math.min(1, Math.max(0, (sy - positions.plan) / dist));

          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (p < 0.38) {
            // Stable hold in bedroom study
            setPlate(bedroom, 1.0, 'none');
            setPlate(hallway, 0, 'translate(12%, 0%) scale(1.06)');
            setAtmosphere('radial-gradient(circle at center, rgba(11, 11, 11, 0.42) 0%, rgba(11, 11, 11, 0.75) 100%)');
          } else {
            // Transition: Departure -> Overlap -> Handoff -> Arrival
            const t = (p - 0.38) / 0.62;

            // Bedroom drifts left
            const bedOp = Math.max(0, 1 - t * 1.15);
            const bedX = -14 * t;
            const bedSc = 1 + 0.04 * t;
            setPlate(bedroom, bedOp, `translate(${bedX}%, 0%) scale(${bedSc})`);

            // Hallway enters directionally from right and arrives at (0, 0) scale(1)
            const halOp = Math.min(1, t * 1.25);
            const halX = 12 * (1 - t);
            const halSc = 1.06 - 0.06 * Math.min(1, t);
            setPlate(hallway, halOp, `translate(${halX}%, 0%) scale(${halSc})`);

            // Atmosphere shifts towards party purple
            const alphaP = 0.0 + 0.28 * t;
            const alphaRim = 0.75 - 0.13 * t;
            setAtmosphere(`radial-gradient(circle at 50% 50%, rgba(122, 59, 255, ${alphaP.toFixed(2)}) 0%, rgba(11, 11, 11, ${alphaRim.toFixed(2)}) 100%)`);
          }
        } else if (positions.scene0 && sy >= positions.scene0) {
          // ================================================================
          // SCENE 00: COMIC OPENING (Establishing Card - Bedroom study)
          // ================================================================
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);
          setPlate(bedroom, 1.0, 'none');
          setAtmosphere('radial-gradient(circle at center, rgba(11, 11, 11, 0.42) 0%, rgba(11, 11, 11, 0.75) 100%)');
        } else {
          // ================================================================
          // HERO: OPENING COVER POSTER (Pure Ink-Black field -> transition to bedroom)
          // ================================================================
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          const heroDist = Math.max(1, positions.scene0 || positions.plan);
          const pHero = Math.min(1, Math.max(0, sy / heroDist));

          if (pHero < 0.45) {
            // Pure ink-black poster field
            setPlate(bedroom, 0);
            setAtmosphere('rgba(11, 11, 11, 1)');
          } else {
            // Crossfade bedroom plate in as poster camera transitions into film
            const t = (pHero - 0.45) / 0.55;
            setPlate(bedroom, t, 'none');
            setAtmosphere(`radial-gradient(circle at center, rgba(11, 11, 11, ${(0.42 * t).toFixed(2)}) 0%, rgba(11, 11, 11, ${(1 - 0.25 * t).toFixed(2)}) 100%)`);
          }
        }
      };

      // Listen on scroll and ticker
      window.addEventListener('scroll', updateState, { passive: true });
      ScrollTrigger.addEventListener('refresh', refreshPositions);
      ScrollTrigger.addEventListener('scrollEnd', updateState);
      gsap.ticker.add(updateState);

      // Refresh positions after initial layout cycle
      requestAnimationFrame(() => {
        refreshPositions();
        updateState();
      });

      return () => {
        window.removeEventListener('scroll', updateState);
        ScrollTrigger.removeEventListener('refresh', refreshPositions);
        ScrollTrigger.removeEventListener('scrollEnd', updateState);
        gsap.ticker.remove(updateState);
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`continuous-background ${className}`}
      aria-hidden="true"
    >
      {/* Narrative Environment Plates Stack with Art-Directed Physical Print Textures */}
      <div className="env-plates-container">
        {/* 1. Bedroom (Plan) - restrained physical paper fibers */}
        <div ref={plateBedroomRef} className="env-plate env-plate-bedroom">
          <img
            className="env-plate-art"
            src={assets.environments.bedroomStudyNight.src}
            srcSet={assets.environments.bedroomStudyNight.srcSet}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-paper-fiber"
            src={assets.textures.paperFiber01.src}
            srcSet={assets.textures.paperFiber01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 2. Party Hallway (First Drink) - expressive photocopy grain & halftone dots */}
        <div ref={plateHallwayRef} className="env-plate env-plate-hallway">
          <img
            className="env-plate-art"
            src={assets.environments.partyHallwayEntrance.src}
            srcSet={assets.environments.partyHallwayEntrance.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-photocopy-grime"
            src={assets.textures.photocopyGrime01.src}
            srcSet={assets.textures.photocopyGrime01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-halftone-dots"
            src={assets.textures.halftoneDots01.src}
            srcSet={assets.textures.halftoneDots01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 3. Living Room (Buzzed) - paper ink speckles & photocopy edge wear */}
        <div ref={plateLivingRoomRef} className="env-plate env-plate-livingroom">
          <img
            className="env-plate-art"
            src={assets.environments.partyLivingRoomMaster.src}
            srcSet={assets.environments.partyLivingRoomMaster.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-ink-speckle"
            src={assets.textures.paperInkSpeckle01.src}
            srcSet={assets.textures.paperInkSpeckle01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-photocopy-edge"
            src={assets.textures.photocopyEdge01.src}
            srcSet={assets.textures.photocopyEdge01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 4. Near Speakers (Drunk) - heavy ink contamination bleed & surface scratches */}
        <div ref={plateSpeakersRef} className="env-plate env-plate-speakers">
          <img
            className="env-plate-art"
            src={assets.environments.partyNearSpeakers.src}
            srcSet={assets.environments.partyNearSpeakers.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-ink-contamination"
            src={assets.textures.inkContamination01.src}
            srcSet={assets.textures.inkContamination01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-surface-scratches"
            src={assets.textures.surfaceScratches01.src}
            srcSet={assets.textures.surfaceScratches01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 5. Crowd Peak (Party Peak) - high photocopy distress & color halftone screen */}
        <div ref={plateCrowdRef} className="env-plate env-plate-crowd">
          <img
            className="env-plate-art"
            src={assets.environments.partyCrowdPeak.src}
            srcSet={assets.environments.partyCrowdPeak.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-photocopy-grime"
            src={assets.textures.photocopyGrime01.src}
            srcSet={assets.textures.photocopyGrime01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-color-halftone"
            src={assets.textures.colorHalftone01.src}
            srcSet={assets.textures.colorHalftone01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 6. Morning Messy (Passed Out) - cold recycled paper fiber */}
        <div ref={plateMessyRef} className="env-plate env-plate-messy">
          <img
            className="env-plate-art"
            src={assets.environments.bedroomMorningMessy.src}
            srcSet={assets.environments.bedroomMorningMessy.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-paper-recycled"
            src={assets.textures.paperRecycled01.src}
            srcSet={assets.textures.paperRecycled01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 7. Morning Tidy (Rebuild & Reveal) - clean, stable physical paper surfaces */}
        <div ref={plateTidyRef} className="env-plate env-plate-tidy">
          <img
            className="env-plate-art"
            src={assets.environments.bedroomMorningTidy.src}
            srcSet={assets.environments.bedroomMorningTidy.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <img
            className="env-texture-plate env-texture-paper-fiber-clean"
            src={assets.textures.paperFiber01.src}
            srcSet={assets.textures.paperFiber01.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Persistent Background Darkening Scrim (Task 02B) */}
      <div className="env-darkening-scrim" aria-hidden="true" />

      {/* Atmospheric Hue & Vignette Overlay */}
      <div ref={atmosphereRef} className="env-atmosphere" />
    </div>
  );
};
