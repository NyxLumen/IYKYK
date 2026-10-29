import React from 'react';
import { ExperienceShell } from '@/experience/ExperienceShell';
import { Experience } from '@/experience/Experience';
import { ComponentVerificationView } from '@/experience/components/ComponentVerificationView';
import { ComicComponentsPlayground } from '@/pages/ComicComponentsPlayground';
import { NarrativeScene } from '@/experience/scenes/NarrativeScene';
import { Scene03Buzzed } from '@/experience/scenes/Scene03Buzzed';
import { RebuildScene } from '@/experience/scenes/RebuildScene';
import { Scene00Opening } from '@/experience/scenes/Scene00Opening';

export const App: React.FC = () => {
  const isComicComponentsDev =
    typeof window !== 'undefined' &&
    (window.location.pathname.startsWith('/dev/comic-components') ||
      window.location.search.includes('comic-components'));

  if (isComicComponentsDev) {
    return <ComicComponentsPlayground />;
  }

  const isVerificationMode =
    typeof window !== 'undefined' &&
    (window.location.search.includes('verify') || window.location.search.includes('preview=components'));

  if (isVerificationMode) {
    return <ComponentVerificationView />;
  }

  const sceneParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('scene') : null;

  if (sceneParam) {
    if (sceneParam === 'scene-0' || sceneParam === '0' || sceneParam === 'opening') {
      return (
        <ExperienceShell>
          <Scene00Opening standalone />
        </ExperienceShell>
      );
    }
    if (sceneParam === 'rebuild') {
      return (
        <ExperienceShell>
          <RebuildScene />
        </ExperienceShell>
      );
    }
    if (sceneParam === 'buzzed') {
      return (
        <ExperienceShell>
          <Scene03Buzzed />
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
