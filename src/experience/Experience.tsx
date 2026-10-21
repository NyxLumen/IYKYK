import React from 'react';
import { ResponsiveFrame } from '@/components/ResponsiveFrame';

/**
 * Phase 1 Experience Shell
 * Validates canonical tokens, typography, responsive frame, and scroll foundation.
 */
export const Experience: React.FC = () => {
  return (
    <div className="experience-container" style={{ width: '100%', minHeight: '180vh', position: 'relative' }}>
      {/* Viewport Frame Baseline Test */}
      <section
        style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-xl)',
          position: 'relative',
        }}
      >
        <ResponsiveFrame
          mobile={{ scale: 1, x: 0, y: 0 }}
          desktop={{ scale: 1, x: 0, y: 0 }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <div className="badge-tape badge-purple" style={{ marginBottom: 'var(--space-md)' }}>
              PHASE 1 — FOUNDATION READY
            </div>
            <h1 className="headline-hero" style={{ color: 'var(--color-paper)', marginBottom: 'var(--space-sm)' }}>
              IYKYK
            </h1>
            <p className="body-lg" style={{ color: 'var(--color-green)', marginBottom: 'var(--space-md)' }}>
              SAME BRAIN. DIFFERENT WORLD.
            </p>
            <p className="body-sm" style={{ maxWidth: '480px', margin: '0 auto' }}>
              Moving printed collage pushed into digital space. Scroll down to test the Lenis smooth-scroll engine and GSAP ticker integration.
            </p>
          </div>
        </ResponsiveFrame>
      </section>

      {/* Test Section to verify scroll travel and frame boundary */}
      <section
        style={{
          height: '80dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid rgba(237, 228, 217, 0.1)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <span className="badge-tape badge-green">SCROLL ENGINE ACTIVE</span>
          <p className="body-sm" style={{ marginTop: 'var(--space-sm)' }}>
            Lenis + GSAP ScrollTrigger ticker synchronized.
          </p>
        </div>
      </section>
    </div>
  );
};
