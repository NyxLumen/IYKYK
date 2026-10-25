import React, { useRef } from 'react';
import { Clock } from '../components/Clock';
import { Meter } from '../components/Meter';
import { SCENE_REGISTRY } from '../data/scenes';
import type { SceneId } from '../data/types';
import { useSceneTimeline } from '../animation/useSceneTimeline';
import { SceneArtwork } from './SceneArtwork';

type StorySceneId = Extract<SceneId, 'plan' | 'first-drink' | 'buzzed' | 'drunk' | 'party-peak' | 'passed-out'>;

interface NarrativeSceneProps {
  sceneId: StorySceneId;
}

/** Shared composition shell for the six narrative states before the question pause. */
export const NarrativeScene: React.FC<NarrativeSceneProps> = ({ sceneId }) => {
  const containerRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const scene = SCENE_REGISTRY.find((item) => item.id === sceneId);

  useSceneTimeline(containerRef, {
    sceneId,
    start: 'top 75%',
    end: 'bottom 20%',
    scrub: 0.8,
    buildTimeline: (timeline) => {
      if (!collageRef.current) return;
      const startState = sceneId === 'drunk' || sceneId === 'party-peak'
        ? { y: 18, rotation: 1.5, scale: 0.97, opacity: 0.78 }
        : { y: 24, opacity: 0.72 };
      const endState = sceneId === 'drunk' || sceneId === 'party-peak'
        ? { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
        : { y: 0, opacity: 1, duration: 1, ease: 'power2.out' };
      timeline.fromTo(collageRef.current, startState, endState);
    },
  });

  if (!scene) return null;

  return (
    <section
      ref={containerRef}
      id={`scene-${scene.id}`}
      data-scene-id={scene.id}
      aria-label={`Scene ${scene.sceneNumber}: ${scene.title}${scene.time ? `, ${scene.time}` : ''}`}
      className={`scene-section scene-${scene.id} scene-vertical-pass`}
    >
      <SceneArtwork sceneId={sceneId} compositionRef={collageRef} />
      <div className={`scene-texture-layer scene-texture-${scene.id}`} aria-hidden="true" />

      <header className={`scene-hud ${sceneId === 'drunk' || sceneId === 'party-peak' ? 'scene-hud-chaotic' : ''}`}>
        {scene.clock?.visible && (
          <Clock time={scene.clock.time ?? scene.time} variant={scene.clock.variant ?? 'digital'} visible />
        )}
        {scene.meter?.visible && (
          <Meter value={scene.meter.value} mode={scene.meter.mode ?? 'story'} visible />
        )}
      </header>

      <div className="scene-copy">
        <span className={`badge-tape ${scene.meter && scene.meter.value <= 20 ? 'badge-green' : 'badge-purple'}`}>
          SCENE {scene.sceneNumber} // {scene.time ?? scene.title} // {scene.meter?.value ?? 0}%
        </span>
        <h2 className="headline-hero font-display">{scene.copy?.headline ?? scene.title}</h2>
        {scene.copy?.note && <p className="scene-note">{scene.copy.note}</p>}
        <p className="scene-description">{scene.storyAction}</p>
      </div>
      <span className="scene-edge-mark" aria-hidden="true">IYKYK / {scene.id.toUpperCase()}</span>
    </section>
  );
};
