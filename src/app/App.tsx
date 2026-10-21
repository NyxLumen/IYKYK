import React from 'react';
import { ExperienceShell } from '@/experience/ExperienceShell';
import { Experience } from '@/experience/Experience';

export const App: React.FC = () => {
  return (
    <ExperienceShell>
      <Experience />
    </ExperienceShell>
  );
};
