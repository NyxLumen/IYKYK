import React from 'react';
import { SCENE_REGISTRY } from './data/scenes';
import { Scene } from './scenes/Scene';
import { QuestionScene } from './scenes/QuestionScene';
import { RebuildScene } from './scenes/RebuildScene';
import { RevealScene } from './scenes/RevealScene';

/**
 * Experience maps declarative scene data to the continuous interactive scroll film (architecture.md Section 06 & 26).
 * Special narrative scenes (Question, Rebuild, Reveal) utilize dedicated orchestrated machinery.
 */
export const Experience: React.FC = () => {
  return (
    <div className="iykyk-experience" style={{ width: '100%', position: 'relative' }}>
      {SCENE_REGISTRY.map((scene) => {
        if (scene.id === 'question') {
          return <QuestionScene key={scene.id} id={scene.id} />;
        }
        if (scene.id === 'rebuild') {
          return <RebuildScene key={scene.id} id={scene.id} />;
        }
        if (scene.id === 'reveal') {
          return <RevealScene key={scene.id} id={scene.id} />;
        }
        return <Scene key={scene.id} scene={scene} />;
      })}
    </div>
  );
};
