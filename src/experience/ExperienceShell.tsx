import React from 'react';
import { AnimationProvider } from '@/app/providers/AnimationProvider';
import { CustomScrollbar } from '@/components/CustomScrollbar';

interface ExperienceShellProps {
  children: React.ReactNode;
  enableOverlayScrollbar?: boolean;
}

/**
 * ExperienceShell wraps the application with scroll controllers, texture filters,
 * custom scrollbar system, and high-level viewport bounds (architecture.md Section 06).
 */
export const ExperienceShell: React.FC<ExperienceShellProps> = ({
  children,
  enableOverlayScrollbar = true,
}) => {
  const isNativeRequested =
    typeof window !== 'undefined' && window.location.search.includes('scrollbar=native');
  const showCustomScrollbar = enableOverlayScrollbar && !isNativeRequested;

  return (
    <AnimationProvider>
      <div className="experience-shell" style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        {/* Global Film Grain & Texture Layer */}
        <div className="texture-noise" aria-hidden="true" />

        {/* Custom Purple Scrollbar (Replaces default browser scrollbar) */}
        {showCustomScrollbar && <CustomScrollbar />}

        {/* Core Narrative Experience Container */}
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </AnimationProvider>
  );
};
