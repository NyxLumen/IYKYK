import React from 'react';
import { SCENE_REGISTRY } from './data/scenes';
import { Scene } from './scenes/Scene';

/**
 * Experience maps declarative scene data to the continuous interactive scroll film (architecture.md Section 06 & 26).
 */
export const Experience: React.FC = () => {
  return (
    <div className="iykyk-experience" style={{ width: '100%', position: 'relative' }}>
      {SCENE_REGISTRY.map((scene) => (
        <Scene key={scene.id} scene={scene} />
      ))}
    </div>
  );
};
