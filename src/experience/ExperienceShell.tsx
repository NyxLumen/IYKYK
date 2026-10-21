import React from 'react';
import { AnimationProvider } from '@/app/providers/AnimationProvider';

interface ExperienceShellProps {
  children: React.ReactNode;
}

/**
 * ExperienceShell wraps the application with scroll controllers, texture filters,
 * and high-level viewport bounds (architecture.md Section 06).
 */
export const ExperienceShell: React.FC<ExperienceShellProps> = ({ children }) => {
  return (
    <AnimationProvider>
      <div className="experience-shell" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        {/* Global Film Grain & Texture Layer */}
        <div className="texture-noise" aria-hidden="true" />
        
        {/* Core Narrative Experience Container */}
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </AnimationProvider>
  );
};
