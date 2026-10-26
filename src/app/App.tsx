import React from 'react';
import { ExperienceShell } from '@/experience/ExperienceShell';
import { Experience } from '@/experience/Experience';
import { ComponentVerificationView } from '@/experience/components/ComponentVerificationView';
import { NarrativeScene } from '@/experience/scenes/NarrativeScene';
import { RebuildScene } from '@/experience/scenes/RebuildScene';

export const App: React.FC = () => {
  const isVerificationMode =
    typeof window !== 'undefined' &&
    (window.location.search.includes('verify') || window.location.search.includes('preview=components'));

  if (isVerificationMode) {
    return <ComponentVerificationView />;
  }

  const sceneParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('scene') : null;

  if (sceneParam) {
    if (sceneParam === 'rebuild') {
      return (
        <ExperienceShell>
          <RebuildScene />
        </ExperienceShell>
      );
    }
    const validStoryScenes = ['plan', 'first-drink', 'buzzed', 'drunk', 'party-peak', 'passed-out'] as const;
    const match = validStoryScenes.find((s) => s === sceneParam);
    if (match) {
      return (
        <ExperienceShell>
          <NarrativeScene sceneId={match} />
        </ExperienceShell>
      );
    }
  }

  return (
    <ExperienceShell>
      <Experience />
    </ExperienceShell>
  );
};
