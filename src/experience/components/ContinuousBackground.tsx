import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '@/app/providers/AnimationProvider';

gsap.registerPlugin(ScrollTrigger);

export interface ContinuousBackgroundProps {
  className?: string;
}

/**
 * ContinuousBackground establishes the shared, persistent background-environment system (Task 02A).
 * Features:
 * - Persistent #0B0B0B ink-black base field
 * - 7 approved narrative environment plates layered above base
 * - Controlled atmospheric colour washes (amber -> purple -> chaotic green -> cold blue -> black -> warm clarity)
 * - Restrained, continuous paper/print texture that does not reset across scene boundaries
 * - Deliberate graphic interruption reducing the environment to pure black during Scene 06.5 (The Question)
 * - Seamless continuation of the tidy morning bedroom between Rebuild (Scene 07) and Reveal (Scene 08)
 * - Deterministic, idempotent state projection that prevents tween collisions and sticking in reverse scroll
 */
export const ContinuousBackground: React.FC<ContinuousBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);

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
      const texture = textureRef.current;

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

      const setTexture = (opacity: number) => {
        if (texture) {
          texture.style.opacity = opacity.toFixed(2);
        }
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
            setPlate(tidy, 0.5);
            setAtmosphere('rgba(11, 11, 11, 0.7)');
          } else if (sy >= pos.rebuild) {
            setPlate(tidy, 0.5);
            setAtmosphere('rgba(11, 11, 11, 0.7)');
          } else if (sy >= pos.question) {
            // Graphic pause - pure black
            setAtmosphere('rgba(11, 11, 11, 1)');
          } else if (sy >= pos.passedOut) {
            setPlate(messy, 0.5);
            setAtmosphere('rgba(11, 11, 11, 0.7)');
          } else if (sy >= pos.partyPeak) {
            setPlate(crowd, 0.5);
            setAtmosphere('rgba(11, 11, 11, 0.7)');
          } else if (sy >= pos.drunk) {
            setPlate(speakers, 0.5);
            setAtmosphere('rgba(11, 11, 11, 0.7)');
          } else if (sy >= pos.buzzed) {
            setPlate(livingRoom, 0.5);
            setAtmosphere('rgba(11, 11, 11, 0.7)');
          } else if (sy >= pos.firstDrink) {
            setPlate(hallway, 0.5);
            setAtmosphere('rgba(11, 11, 11, 0.7)');
          } else {
            setPlate(bedroom, 0.6);
            setAtmosphere('rgba(11, 11, 11, 0.6)');
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
          // ----------------------------------------------------------------
          // SCENE 08: THE REVEAL (Persistent tidy morning continues + refines)
          // ----------------------------------------------------------------
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
          setPlate(messy, 0);
          setPlate(tidy, tidyOp, `translate(0%, ${tidyY}%) scale(${tidyScale})`);

          setAtmosphere('radial-gradient(circle at 75% 75%, rgba(57, 239, 136, 0.08) 0%, rgba(237, 228, 217, 0.16) 45%, rgba(11, 11, 11, 0.68) 100%)');
          setTexture(0.10);
        } else if (sy >= positions.rebuild) {
          // ----------------------------------------------------------------
          // SCENE 07: REBUILD (Tidy morning reconstructs into place)
          // ----------------------------------------------------------------
          const dist = Math.max(1, positions.reveal - positions.rebuild);
          const p = Math.min(1, Math.max(0, (sy - positions.rebuild) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);

          if (p < 0.08) {
            setPlate(tidy, 0);
            setAtmosphere('rgba(11, 11, 11, 1)');
            setTexture(0.04);
          } else {
            const t = Math.min(1, (p - 0.08) / 0.65);
            const tidyOp = 0.44 * t;
            const tidyScale = 0.96 + 0.04 * t;
            const tidyY = 6 * (1 - t);
            setPlate(tidy, tidyOp, `translate(0%, ${tidyY}%) scale(${tidyScale})`);

            setAtmosphere('linear-gradient(180deg, rgba(237, 228, 217, 0.14) 0%, rgba(11, 11, 11, 0.68) 100%)');
            setTexture(0.04 + 0.06 * t);
          }
        } else if (sy >= positions.question) {
          // ----------------------------------------------------------------
          // SCENE 06.5: THE QUESTION (Pivotal graphic pause - pure ink-black field)
          // ----------------------------------------------------------------
          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          setAtmosphere('rgba(11, 11, 11, 1)');
          setTexture(0.04);
        } else if (sy >= positions.passedOut) {
          // ----------------------------------------------------------------
          // SCENE 06: PASSED OUT (Cold morning bed stillness -> empties to black)
          // ----------------------------------------------------------------
          const dist = Math.max(1, positions.question - positions.passedOut);
          const p = Math.min(1, Math.max(0, (sy - positions.passedOut) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(tidy, 0);

          if (p < 0.30) {
            // Cold morning bed stillness
            setPlate(messy, 1.0, 'none');
            setAtmosphere('linear-gradient(180deg, rgba(185, 205, 225, 0.16) 0%, rgba(11, 11, 11, 0.72) 100%)');
            setTexture(0.12);
          } else if (p < 0.48) {
            // Empties into pure black void
            const t = (p - 0.30) / 0.18;
            const messyOp = Math.max(0, 1 - t);
            const messyScale = 1 - 0.03 * t;
            const messyY = 4 * t;
            setPlate(messy, messyOp, `translate(0%, ${messyY}%) scale(${messyScale})`);

            setAtmosphere('rgba(11, 11, 11, 1)');
            setTexture(Math.max(0.04, 0.12 - 0.08 * t));
          } else {
            // Screen has emptied completely before question
            setPlate(messy, 0);
            setAtmosphere('rgba(11, 11, 11, 1)');
            setTexture(0.04);
          }
        } else if (sy >= positions.partyPeak) {
          // ----------------------------------------------------------------
          // SCENE 05: PARTY PEAK (Maximum density -> sudden emotional collapse)
          // ----------------------------------------------------------------
          const dist = Math.max(1, positions.passedOut - positions.partyPeak);
          const p = Math.min(1, Math.max(0, (sy - positions.partyPeak) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(tidy, 0);

          if (p < 0.35) {
            // Peak chaos pulse
            const pulse = 1.08 + 0.04 * Math.sin(p * Math.PI * 6);
            setPlate(crowd, 1.0, `scale(${pulse})`);
            setPlate(messy, 0);
            setAtmosphere('radial-gradient(circle at 50% 40%, rgba(122, 59, 255, 0.52) 0%, rgba(57, 239, 136, 0.28) 70%, rgba(11, 11, 11, 0.5) 100%)');
            setTexture(0.28);
          } else if (p < 0.46) {
            // Emotional rupture / collapse into ink black
            const t = (p - 0.35) / 0.11;
            const crowdOp = Math.max(0, 1 - t);
            const crowdScale = 1.12 - 0.24 * t;
            const crowdY = 8 * t;
            setPlate(crowd, crowdOp, `translate(0%, ${crowdY}%) scale(${crowdScale})`);
            setPlate(messy, 0);
            setAtmosphere('rgba(11, 11, 11, 1)');
            setTexture(Math.max(0.05, 0.28 - 0.23 * t));
          } else if (p < 0.55) {
            // Cold morning messy cuts in
            const t = (p - 0.46) / 0.09;
            setPlate(crowd, 0);
            setPlate(messy, t, `scale(${1.02 - 0.02 * t})`);
            setAtmosphere('linear-gradient(180deg, rgba(185, 205, 225, 0.16) 0%, rgba(11, 11, 11, 0.72) 100%)');
            setTexture(0.12);
          } else {
            // Cold morning messy settled
            setPlate(crowd, 0);
            setPlate(messy, 1.0, 'none');
            setAtmosphere('linear-gradient(180deg, rgba(185, 205, 225, 0.16) 0%, rgba(11, 11, 11, 0.72) 100%)');
            setTexture(0.12);
          }
        } else if (sy >= positions.drunk) {
          // ----------------------------------------------------------------
          // SCENE 04: DRUNK (Tight distorted crop -> crowd explosion)
          // ----------------------------------------------------------------
          const dist = Math.max(1, positions.partyPeak - positions.drunk);
          const p = Math.min(1, Math.max(0, (sy - positions.drunk) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(livingRoom, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (p < 0.34) {
            const rot = -0.5 + 1.5 * (p / 0.34);
            const sc = 1.08 + 0.06 * (p / 0.34);
            setPlate(speakers, 1.0, `rotate(${rot}deg) scale(${sc})`);
            setPlate(crowd, 0);
            setAtmosphere('radial-gradient(circle at 50% 35%, rgba(122, 59, 255, 0.46) 0%, rgba(57, 239, 136, 0.22) 65%, rgba(11, 11, 11, 0.6) 100%)');
            setTexture(0.24);
          } else if (p < 0.50) {
            const t = (p - 0.34) / 0.16;
            const spkOp = Math.max(0.15, 1 - 0.85 * t);
            const spkSc = 1.14 + 0.11 * t;
            const spkRot = 1 + 1.5 * t;
            setPlate(speakers, spkOp, `rotate(${spkRot}deg) scale(${spkSc})`);

            const crowdOp = t;
            const crowdSc = 0.9 + 0.18 * t;
            setPlate(crowd, crowdOp, `scale(${crowdSc})`);

            setAtmosphere('radial-gradient(circle at 50% 35%, rgba(122, 59, 255, 0.46) 0%, rgba(57, 239, 136, 0.22) 65%, rgba(11, 11, 11, 0.6) 100%)');
            setTexture(0.24 + 0.04 * t);
          } else {
            setPlate(speakers, 0);
            setPlate(crowd, 1.0, 'none');
            setAtmosphere('radial-gradient(circle at 50% 35%, rgba(122, 59, 255, 0.46) 0%, rgba(57, 239, 136, 0.22) 65%, rgba(11, 11, 11, 0.6) 100%)');
            setTexture(0.28);
          }
        } else if (sy >= positions.buzzed) {
          // ----------------------------------------------------------------
          // SCENE 03: BUZZED (Living room expands -> shifts toward speakers)
          // ----------------------------------------------------------------
          const dist = Math.max(1, positions.drunk - positions.buzzed);
          const p = Math.min(1, Math.max(0, (sy - positions.buzzed) / dist));

          setPlate(bedroom, 0);
          setPlate(hallway, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (p < 0.45) {
            setPlate(livingRoom, 1.0, 'none');
            setPlate(speakers, 0);
            setAtmosphere('linear-gradient(135deg, rgba(122, 59, 255, 0.38) 0%, rgba(57, 239, 136, 0.12) 50%, rgba(11, 11, 11, 0.68) 100%)');
            setTexture(0.20);
          } else {
            const t = (p - 0.45) / 0.55;
            const livOp = Math.max(0.18, 1 - 0.82 * t);
            const livX = -12 * t;
            const livY = -4 * t;
            const livSc = 1 + 0.12 * t;
            setPlate(livingRoom, livOp, `translate(${livX}%, ${livY}%) scale(${livSc})`);

            const spkOp = t;
            const spkSc = 1.2 - 0.12 * t;
            const spkRot = -2 * (1 - t) - 0.5 * t;
            setPlate(speakers, spkOp, `rotate(${spkRot}deg) scale(${spkSc})`);

            setAtmosphere('linear-gradient(135deg, rgba(122, 59, 255, 0.38) 0%, rgba(57, 239, 136, 0.12) 50%, rgba(11, 11, 11, 0.68) 100%)');
            setTexture(0.20);
          }
        } else if (sy >= positions.firstDrink) {
          // ----------------------------------------------------------------
          // SCENE 02: FIRST DRINK (Hallway shifts into living room)
          // ----------------------------------------------------------------
          const dist = Math.max(1, positions.buzzed - positions.firstDrink);
          const p = Math.min(1, Math.max(0, (sy - positions.firstDrink) / dist));

          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          const bedOp = Math.max(0, 0.15 * (1 - p * 3));
          setPlate(bedroom, bedOp, `translate(-14%, 0%) scale(1.04)`);

          if (p < 0.45) {
            setPlate(hallway, 1.0, 'none');
            setPlate(livingRoom, 0);
            setAtmosphere('radial-gradient(circle at 50% 50%, rgba(122, 59, 255, 0.32) 0%, rgba(11, 11, 11, 0.6) 100%)');
            setTexture(0.16);
          } else {
            const t = (p - 0.45) / 0.55;
            const halOp = Math.max(0.12, 1 - 0.88 * t);
            const halX = -18 * t;
            const halSc = 1 + 0.08 * t;
            setPlate(hallway, halOp, `translate(${halX}%, 0%) scale(${halSc})`);

            const livOp = t;
            const livX = 6 * (1 - t);
            const livSc = 1.1 - 0.1 * t;
            setPlate(livingRoom, livOp, `translate(${livX}%, 0%) scale(${livSc})`);

            setAtmosphere('radial-gradient(circle at 50% 50%, rgba(122, 59, 255, 0.32) 0%, rgba(11, 11, 11, 0.6) 100%)');
            setTexture(0.16);
          }
        } else {
          // ----------------------------------------------------------------
          // SCENE 01: THE PLAN (Bedroom study calm composition -> shifts to hallway)
          // ----------------------------------------------------------------
          const dist = Math.max(1, positions.firstDrink - positions.plan);
          const p = Math.min(1, Math.max(0, (sy - positions.plan) / dist));

          setPlate(livingRoom, 0);
          setPlate(speakers, 0);
          setPlate(crowd, 0);
          setPlate(messy, 0);
          setPlate(tidy, 0);

          if (p < 0.38) {
            setPlate(bedroom, 1.0, 'none');
            setPlate(hallway, 0);
            setAtmosphere('radial-gradient(circle at center, rgba(11, 11, 11, 0.42) 0%, rgba(11, 11, 11, 0.75) 100%)');
            setTexture(0.10);
          } else if (p < 0.55) {
            const t = (p - 0.38) / 0.17;
            const bedOp = Math.max(0.15, 1 - 0.85 * t);
            const bedX = -14 * t;
            const bedSc = 1 + 0.04 * t;
            setPlate(bedroom, bedOp, `translate(${bedX}%, 0%) scale(${bedSc})`);

            const halOp = t;
            const halX = 12 * (1 - t);
            const halSc = 1.06 - 0.06 * t;
            setPlate(hallway, halOp, `translate(${halX}%, 0%) scale(${halSc})`);

            setAtmosphere('radial-gradient(circle at 65% 45%, rgba(122, 59, 255, 0.22) 0%, rgba(11, 11, 11, 0.65) 100%)');
            setTexture(0.10 + 0.05 * t);
          } else {
            setPlate(bedroom, 0.15, `translate(-14%, 0%) scale(1.04)`);
            setPlate(hallway, 1.0, 'none');
            setAtmosphere('radial-gradient(circle at 65% 45%, rgba(122, 59, 255, 0.22) 0%, rgba(11, 11, 11, 0.65) 100%)');
            setTexture(0.15);
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
      {/* Narrative Environment Plates Stack */}
      <div className="env-plates-container">
        {/* 1. Bedroom (Plan) */}
        <div ref={plateBedroomRef} className="env-plate env-plate-bedroom">
          <img
            src="/production/source/assetsReady/environments/env-bedroom-study-night.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 2. Party Hallway (First Drink) */}
        <div ref={plateHallwayRef} className="env-plate env-plate-hallway">
          <img
            src="/production/source/assetsReady/environments/env-party-hallway-entrance.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 3. Living Room (Buzzed) */}
        <div ref={plateLivingRoomRef} className="env-plate env-plate-livingroom">
          <img
            src="/production/source/assetsReady/environments/env-party-living-room-master.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 4. Near Speakers (Drunk) */}
        <div ref={plateSpeakersRef} className="env-plate env-plate-speakers">
          <img
            src="/production/source/assetsReady/environments/env-party-near-speakers.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 5. Crowd Peak (Party Peak) */}
        <div ref={plateCrowdRef} className="env-plate env-plate-crowd">
          <img
            src="/production/source/assetsReady/environments/env-party-crowd-peak.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 6. Morning Messy (Passed Out) */}
        <div ref={plateMessyRef} className="env-plate env-plate-messy">
          <img
            src="/production/source/assetsReady/environments/env-bedroom-morning-messy.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 7. Morning Tidy (Rebuild & Reveal) - Persistent across both */}
        <div ref={plateTidyRef} className="env-plate env-plate-tidy">
          <img
            src="/production/source/assetsReady/environments/env-bedroom-morning-tidy.png"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Atmospheric Hue & Vignette Overlay */}
      <div ref={atmosphereRef} className="env-atmosphere" />

      {/* Shared Restrained Print Texture Overlay */}
      <div ref={textureRef} className="env-texture-layer" />
      <div className="env-texture-halftone" />
    </div>
  );
};
