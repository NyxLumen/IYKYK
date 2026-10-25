import React from 'react';
import { ContinuousBackground } from './components/ContinuousBackground';
import { Scene01Plan } from './scenes/Scene01Plan';
import { Scene02FirstDrink } from './scenes/Scene02FirstDrink';
import { Scene03Buzzed } from './scenes/Scene03Buzzed';
import { Scene04Drunk } from './scenes/Scene04Drunk';
import { Scene05PartyPeak } from './scenes/Scene05PartyPeak';
import { Scene06PassedOut } from './scenes/Scene06PassedOut';
import { QuestionScene } from './scenes/QuestionScene';
import { RebuildScene } from './scenes/RebuildScene';
import { RevealScene } from './scenes/RevealScene';

/**
 * Experience maps the complete 9-scene narrative progression (architecture.md Section 06 & 26).
 * Integrates the continuous background-environment system (Task 02A).
 * Scene Order:
 * 1. plan (9:30 PM, 100%)
 * 2. first-drink (10:15 PM, 80%)
 * 3. buzzed (11:40 PM, 60%)
 * 4. drunk (1:20 AM, 40%)
 * 5. party-peak (3:17 AM, 20%)
 * 6. passed-out (7:58 AM, 0%)
 * 7. question (0% graphic pause)
 * 8. rebuild (0% → 100% reconstruction)
 * 9. reveal (Morning, 100%, IYKYK brand reveal & CTA)
 */
export const Experience: React.FC = () => {
  return (
    <div className="iykyk-experience" style={{ width: '100%', position: 'relative' }}>
      {/* Narrative Foreground Scene Stack */}
      <div className="iykyk-scenes" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <Scene01Plan />
        <Scene02FirstDrink />
        <Scene03Buzzed />
        <Scene04Drunk />
        <Scene05PartyPeak />
        <Scene06PassedOut />
        <QuestionScene />
        <RebuildScene />
        <RevealScene />
      </div>

      {/* Persistent Continuous Background Environment System */}
      <ContinuousBackground />
    </div>
  );
};
