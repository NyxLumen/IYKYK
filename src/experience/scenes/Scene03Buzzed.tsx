import React, { useRef } from 'react';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { useCollageMotion } from '../animation/useCollageMotion';
import { SceneArtwork } from './SceneArtwork';
import { SCENE_CHOREOGRAPHY } from '../animation/sceneChoreography';
import { ASSET_MANIFEST } from '../data/assets';

/**
 * Scene 03 — BUZZED (11:40 PM, Progress / battery 60%)
 *
 * Rebuilt strictly adhering to the Scene 3 collage reference blueprint:
 * - Full-bleed background: env-party-living-room-master
 * - Large dominant protagonist on the right side (occupying ~50vw, emerging from party)
 * - Upper-left graphic collage cluster acting as text surface for "ONE MORE?"
 * - Clock fragment large on lower-right edge, partially cropped by viewport
 * - Lower-left audio system: speaker, vibration soundwaves, and red cup
 * - Layered physical textures: crumpled paper substrate, taped scrap, surface scratches
 * - ZERO explanatory HUD widgets, headers, subtitles, or paragraphs
 */
export const Scene03Buzzed: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const choreography = SCENE_CHOREOGRAPHY['buzzed'];

  useSceneTimeline(containerRef, {
    sceneId: 'buzzed',
    pin: choreography.scroll.pin,
    pinSpacing: choreography.scroll.pinSpacing,
    start: choreography.scroll.start,
    end: choreography.scroll.end,
    scrub: choreography.scroll.scrub,
    anticipatePin: choreography.scroll.anticipatePin,
    buildTimeline: (timeline, container) => {
      choreography.buildTimeline(timeline, container, collageRef.current);
    },
  });

  useCollageMotion(containerRef, 'buzzed');

  const envSrc = ASSET_MANIFEST.find((a) => a.id === 'environments.partyLivingRoomMaster')?.src ?? '';

  return (
    <section
      ref={containerRef}
      id="scene-buzzed"
      data-scene-id="buzzed"
      aria-label="Scene 03: Buzzed, 11:40 PM"
      className="scene-section scene-buzzed scene-vertical-pass"
    >
      {/* 1. Full-bleed living room party environment */}
      <div className="buzzed-env" aria-hidden="true">
        <img src={envSrc} alt="" loading="eager" />
        <div className="buzzed-env-atmosphere" />
      </div>

      {/* 2. Structured 5-plane collage composition */}
      <SceneArtwork sceneId="buzzed" compositionRef={collageRef} />
    </section>
  );
};
